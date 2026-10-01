// PHONIXIA - Interactive 2.5D Stylized Voxel Realm Canvas
// Inspired by Minecraft, Roblox, and Zelda pixel-fantasy aesthetics

import React, { useRef, useEffect, useState } from 'react';
import { AvatarCustomization, RealmId, RealmInfo } from '../../types/game';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import { Volume2, Sparkles, Navigation } from 'lucide-react';

interface VoxelWorldCanvasProps {
  realm: RealmInfo;
  avatar: AvatarCustomization;
  assignedCompanion: 'kam' | 'celine';
  onInteractPOI: (poiType: string, poiData: any) => void;
  onOpenCompanion: () => void;
  playerPos?: { x: number; y: number };
  playerFacing?: 'left' | 'right';
  onMovePlayer?: (x: number, y: number, facing?: 'left' | 'right') => void;
  isJumping?: boolean;
}

interface PointOfInterest {
  id: string;
  name: string;
  x: number;
  y: number;
  type: 'phoneme_shrine' | 'blending_forge' | 'heart_altar' | 'morphology_gate' | 'scriptorium' | 'npc_guide' | 'montessori_shelf';
  color: string;
  label: string;
  data?: any;
}

interface OtherPlayer {
  id: string;
  name: string;
  x: number;
  y: number;
  rank: string;
  outfitColor: string;
  chatBubble?: string;
}

export const VoxelWorldCanvas: React.FC<VoxelWorldCanvasProps> = ({
  realm,
  avatar,
  assignedCompanion,
  onInteractPOI,
  onOpenCompanion,
  playerPos,
  playerFacing,
  onMovePlayer,
  isJumping = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [internalPlayerPos, setInternalPlayerPos] = useState({ x: 420, y: 360 });
  const [internalPlayerFacing, setInternalPlayerFacing] = useState<'left' | 'right'>('right');

  const currentPos = playerPos || internalPlayerPos;
  const currentFacing = playerFacing || internalPlayerFacing;
  const [activeNearbyPOI, setActiveNearbyPOI] = useState<PointOfInterest | null>(null);
  const [chatLog, setChatLog] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'Marina the Scribe', text: 'Welcome to Sound Shallows, Language Mage! The Tide Shrine hums with pure phonemes.', time: 'Now' },
    { sender: assignedCompanion === 'kam' ? 'Kam' : 'Celine', text: assignedCompanion === 'kam' ? 'My Echo Goggles are picking up sound waves near the shore!' : 'The ancient root inscriptions here are waiting for our study!', time: 'Just now' },
  ]);

  // Points of Interest based on realm
  const pois: PointOfInterest[] = [
    {
      id: 'poi_phoenix',
      name: 'Phonix Guardian',
      x: 480,
      y: 125,
      type: 'phoneme_shrine',
      color: '#f97316',
      label: 'Commune with Phonix (Literacy Flame Guardian)',
    },
    {
      id: 'poi_shrine',
      name: 'Tidepool Phoneme Shrine',
      x: 340,
      y: 220,
      type: 'phoneme_shrine',
      color: '#38bdf8',
      label: 'Pure Phoneme Articulation Altar',
    },
    {
      id: 'poi_forge',
      name: 'Anvil of Blending',
      x: 580,
      y: 240,
      type: 'blending_forge',
      color: '#f59e0b',
      label: 'Science of Reading Blending Forge',
    },
    {
      id: 'poi_heart',
      name: 'Heartwood Clearing',
      x: 260,
      y: 480,
      type: 'heart_altar',
      color: '#ec4899',
      label: 'Heart Word Orthographic Altar',
    },
    {
      id: 'poi_morph',
      name: 'Arch of Roots',
      x: 640,
      y: 470,
      type: 'morphology_gate',
      color: '#eab308',
      label: 'Ancient Morphology Lock',
    },
    {
      id: 'poi_montessori',
      name: 'Sensorial Garden',
      x: 480,
      y: 520,
      type: 'montessori_shelf',
      color: '#10b981',
      label: 'Montessori Movable Alphabet & 3-Part Cards',
    },
    {
      id: 'poi_npc',
      name: realm.loreKeeper,
      x: 480,
      y: 190,
      type: 'npc_guide',
      color: '#a855f7',
      label: `Talk to ${realm.loreKeeper}`,
    },
  ];

  // Simulated other online players moving slightly
  const [otherPlayers, setOtherPlayers] = useState<OtherPlayer[]>([
    { id: 'p1', name: 'Aria_SoundSeeker', x: 280, y: 260, rank: 'Syllable Smith', outfitColor: '#3b82f6', chatBubble: 'Decoded the vowel reef!' },
    { id: 'p2', name: 'Kaelen_Mage', x: 620, y: 320, rank: 'Lexicon Knight', outfitColor: '#8b5cf6' },
    { id: 'p3', name: 'Zoe_Echo', x: 380, y: 460, rank: 'Novice', outfitColor: '#ec4899', chatBubble: 'Testing pure /b/!' },
  ]);

  // Handle keyboard movement if not controlled by parent
  useEffect(() => {
    if (onMovePlayer) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 16;
      setInternalPlayerPos((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') newY -= step;
        if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') newY += step;
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          newX -= step;
          setInternalPlayerFacing('left');
        }
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          newX += step;
          setInternalPlayerFacing('right');
        }

        // Clamp to canvas bounds
        newX = Math.max(80, Math.min(880, newX));
        newY = Math.max(120, Math.min(560, newY));

        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onMovePlayer]);

  // Check proximity to POIs
  useEffect(() => {
    const threshold = 75;
    const nearby = pois.find((poi) => {
      const dist = Math.hypot(currentPos.x - poi.x, currentPos.y - poi.y);
      return dist < threshold;
    });

    if (nearby && nearby.id !== activeNearbyPOI?.id) {
      phonemeAudio.playCompanionChime();
    }
    setActiveNearbyPOI(nearby || null);
  }, [currentPos]);

  // Canvas render loop for voxel world
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Distinctive Phonixia Runic Sanctum Terrain
      // (Original visual style: Obsidian bedrock, glowing ley lines, terracotta carved stone plates)
      const tileSize = 48;
      const cols = 21;
      const rows = 14;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * tileSize;
          const y = r * tileSize + 70;

          // Bedrock variations
          const isCenterSanctum = Math.abs(c - 10) <= 4 && Math.abs(r - 6) <= 3;
          const isLeyLine = Math.abs(c - 10) === 0 || Math.abs(r - 6) === 0;

          if (isCenterSanctum) {
            // Ancient carved terracotta & obsidian sanctum tiles
            ctx.fillStyle = (c + r) % 2 === 0 ? '#1e1b4b' : '#17153b';
            ctx.fillRect(x, y, tileSize - 1, tileSize - 1);

            // Carved stone seam
            ctx.fillStyle = '#312e81';
            ctx.fillRect(x + 2, y + 2, tileSize - 5, tileSize - 5);

            // Center spiral glyph etching
            if ((c + r) % 2 === 0) {
              ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
              ctx.lineWidth = 1.5;
              ctx.strokeRect(x + 12, y + 12, tileSize - 25, tileSize - 25);
            }
          } else if (isLeyLine) {
            // Glowing acoustic ley lines
            const pulse = (Math.sin(tick * 0.05 + c + r) + 1) * 0.5;
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(x, y, tileSize - 1, tileSize - 1);

            // Energy stream
            ctx.fillStyle = `rgba(6, 182, 212, ${0.25 + pulse * 0.35})`;
            ctx.fillRect(x + 8, y + 8, tileSize - 17, tileSize - 17);
          } else {
            // Deep twilight acoustic landscape
            const isDark = (c + r) % 2 === 0;
            ctx.fillStyle = isDark ? '#090d16' : '#0d131f';
            ctx.fillRect(x, y, tileSize - 1, tileSize - 1);
            // Subtle glowing starlight speckle
            if ((c * 7 + r * 13) % 9 === 0) {
              ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
              ctx.fillRect(x + 14, y + 14, 2, 2);
            }
          }
        }
      }

      // Draw Central Circular Magic Runic Circle
      const sanctumCenterX = 480;
      const sanctumCenterY = 360;
      const runePulse = Math.sin(tick * 0.04) * 4;

      ctx.save();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(sanctumCenterX, sanctumCenterY, 110 + runePulse, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(sanctumCenterX, sanctumCenterY, 80 - runePulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Twin Stone Fire Braziers (flanking the sanctuary matching logo.jpeg)
      const braziers = [
        { bx: 180, by: 200 },
        { bx: 780, by: 200 },
      ];
      braziers.forEach(({ bx, by }) => {
        // Carved stone pedestal
        ctx.fillStyle = '#855239'; // Terracotta wood/stone
        ctx.fillRect(bx - 14, by - 6, 28, 30);
        ctx.fillStyle = '#4a2618';
        ctx.strokeRect(bx - 12, by - 4, 24, 26);
        // Brazier bowl
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.arc(bx, by - 6, 16, 0, Math.PI, false);
        ctx.fill();

        // Flickering fire flames & floating embers
        ctx.save();
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = 15;
        const fireH = 16 + Math.sin(tick * 0.2 + bx) * 6;
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.moveTo(bx - 10, by - 6);
        ctx.lineTo(bx, by - 6 - fireH);
        ctx.lineTo(bx + 10, by - 6);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.moveTo(bx - 5, by - 6);
        ctx.lineTo(bx, by - 6 - fireH * 0.65);
        ctx.lineTo(bx + 5, by - 6);
        ctx.closePath();
        ctx.fill();

        // Floating ember spark
        const emberY = by - 16 - ((tick * 1.5 + bx) % 35);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(bx - 2 + Math.sin(tick * 0.1) * 6, emberY, 3, 3);
        ctx.restore();
      });

      // 2. Draw Points of Interest (Voxel Altars, Forges, Shrines)
      pois.forEach((poi) => {
        const floatOffset = Math.sin(tick * 0.06 + poi.x) * 4;

        // Base altar pedestal
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(poi.x - 22, poi.y - 10, 44, 26);
        ctx.fillStyle = '#334155';
        ctx.fillRect(poi.x - 20, poi.y - 8, 40, 22);

        // Floating glowing crystal / icon
        ctx.save();
        ctx.shadowColor = poi.color;
        ctx.shadowBlur = 14;
        ctx.fillStyle = poi.color;

        // Voxel Diamond / Crystal
        ctx.beginPath();
        ctx.moveTo(poi.x, poi.y - 28 + floatOffset);
        ctx.lineTo(poi.x + 14, poi.y - 18 + floatOffset);
        ctx.lineTo(poi.x, poi.y - 8 + floatOffset);
        ctx.lineTo(poi.x - 14, poi.y - 18 + floatOffset);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // Label above POI
        ctx.fillStyle = '#f8fafc';
        ctx.font = '11px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(poi.name, poi.x, poi.y - 36 + floatOffset);
      });

      // 2.5 Draw the PHONIX mascot bird (from logo.jpeg) hovering majestically
      const phxX = 480;
      const phxY = 125 + Math.sin(tick * 0.08) * 5;

      // Glow aura
      ctx.save();
      ctx.shadowColor = '#f97316';
      ctx.shadowBlur = 18;

      // Embers around Phonix
      for (let i = 0; i < 4; i++) {
        const emberX = phxX + Math.sin(tick * 0.05 + i * 1.5) * 28;
        const emberY = phxY - 24 + ((tick * 1.2 + i * 20) % 45) * -0.8;
        ctx.fillStyle = i % 2 === 0 ? '#fde047' : '#f97316';
        ctx.fillRect(emberX, emberY, 3, 3);
      }

      // Spread wings (Left wing)
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(phxX - 30, phxY - 14, 18, 16);
      ctx.fillStyle = '#f97316';
      ctx.fillRect(phxX - 26, phxY - 18, 14, 14);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(phxX - 30, phxY - 18, 5, 5);
      ctx.fillRect(phxX - 22, phxY - 20, 5, 5);

      // Spread wings (Right wing)
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(phxX + 12, phxY - 14, 18, 16);
      ctx.fillStyle = '#f97316';
      ctx.fillRect(phxX + 12, phxY - 18, 14, 14);
      ctx.fillStyle = '#fde047';
      ctx.fillRect(phxX + 25, phxY - 18, 5, 5);
      ctx.fillRect(phxX + 17, phxY - 20, 5, 5);

      // Body & Head
      ctx.fillStyle = '#ea580c';
      ctx.fillRect(phxX - 12, phxY - 10, 24, 22);
      ctx.fillStyle = '#f97316';
      ctx.fillRect(phxX - 10, phxY - 20, 20, 18);
      // Flame crest
      ctx.fillStyle = '#fde047';
      ctx.fillRect(phxX - 3, phxY - 26, 6, 8);
      ctx.fillStyle = '#f97316';
      ctx.fillRect(phxX - 5, phxY - 23, 10, 5);

      // Eyes (big anime shiny black eyes)
      ctx.fillStyle = '#18181b';
      ctx.fillRect(phxX - 8, phxY - 16, 5, 6);
      ctx.fillRect(phxX + 3, phxY - 16, 5, 6);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(phxX - 8, phxY - 16, 2, 2);
      ctx.fillRect(phxX + 3, phxY - 16, 2, 2);

      // Beak
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(phxX - 2, phxY - 11, 4, 4);

      // Feet
      ctx.fillStyle = '#78350f';
      ctx.fillRect(phxX - 6, phxY + 12, 3, 3);
      ctx.fillRect(phxX + 3, phxY + 12, 3, 3);

      ctx.restore();

      // Phonix label
      ctx.fillStyle = 'rgba(249, 115, 22, 0.9)';
      ctx.font = 'bold 9px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PHONIX', phxX, phxY - 30);

      // 3. Draw Other Online Players
      otherPlayers.forEach((op) => {
        // Player body
        ctx.fillStyle = op.outfitColor;
        ctx.fillRect(op.x - 10, op.y - 24, 20, 22);
        // Player head
        ctx.fillStyle = '#fbcfe8';
        ctx.fillRect(op.x - 8, op.y - 38, 16, 14);
        // Hair
        ctx.fillStyle = '#475569';
        ctx.fillRect(op.x - 9, op.y - 42, 18, 6);

        // Name tag
        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.fillRect(op.x - 36, op.y - 54, 72, 12);
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '9px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(op.name, op.x, op.y - 45);

        // Chat bubble if present
        if (op.chatBubble) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.beginPath();
          ctx.roundRect(op.x - 50, op.y - 78, 100, 20, [6]);
          ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 9px Outfit, sans-serif';
          ctx.fillText(op.chatBubble, op.x, op.y - 65);
        }
      });

      // 4. Draw Player Companion (Kam or Celine) walking alongside player
      const companionX = currentFacing === 'right' ? currentPos.x - 30 : currentPos.x + 30;
      const companionY = currentPos.y + 4;
      const companionBob = Math.sin(tick * 0.15) * 2;

      // Companion shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.beginPath();
      ctx.ellipse(companionX, companionY + 2, 12, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Companion Body
      if (assignedCompanion === 'kam') {
        // Kam: Explorer vest, teal tones, goggles
        ctx.fillStyle = '#0d9488';
        ctx.fillRect(companionX - 9, companionY - 24 + companionBob, 18, 20);
        // Head
        ctx.fillStyle = '#fed7aa';
        ctx.fillRect(companionX - 7, companionY - 37 + companionBob, 14, 13);
        // Echo Goggles
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(companionX - 9, companionY - 35 + companionBob, 18, 5);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(companionX - 6, companionY - 34 + companionBob, 4, 3);
        ctx.fillRect(companionX + 2, companionY - 34 + companionBob, 4, 3);
      } else {
        // Celine: Starlight cloak, purple tones, starlight compass
        ctx.fillStyle = '#7c3aed';
        ctx.fillRect(companionX - 9, companionY - 24 + companionBob, 18, 20);
        // Head
        ctx.fillStyle = '#fed7aa';
        ctx.fillRect(companionX - 7, companionY - 37 + companionBob, 14, 13);
        // Starlight Circlet
        ctx.fillStyle = '#eab308';
        ctx.fillRect(companionX - 8, companionY - 38 + companionBob, 16, 4);
      }

      // Companion Name Tag
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(companionX - 24, companionY - 50 + companionBob, 48, 12);
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 9px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(assignedCompanion === 'kam' ? 'Kam (Companion)' : 'Celine (Companion)', companionX, companionY - 41 + companionBob);

      // 5. Draw Player Avatar (Language Mage with Flowing Robes & Acoustic Staff)
      const jumpOffsetY = isJumping ? -Math.abs(Math.sin(tick * 0.15)) * 34 : 0;
      const playerBob = Math.sin(tick * 0.18) * 2 + jumpOffsetY;
      const shadowScale = isJumping ? Math.max(0.4, 1 - Math.abs(jumpOffsetY) / 45) : 1;

      // Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(currentPos.x, currentPos.y + 4, 14 * shadowScale, 6 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ground Magic Shockwave ring when leaping
      if (isJumping && Math.abs(jumpOffsetY) > 6) {
        ctx.save();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.65)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(currentPos.x, currentPos.y + 4, 16 + Math.abs(jumpOffsetY) * 0.35, 7 + Math.abs(jumpOffsetY) * 0.15, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Magical Aura effect around player
      if (avatar.auraEffect !== 'none') {
        ctx.save();
        ctx.shadowColor = avatar.auraEffect === 'letter_sparks' ? '#f59e0b' : '#38bdf8';
        ctx.shadowBlur = 16;
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
        ctx.lineWidth = 2;
        ctx.strokeRect(currentPos.x - 14, currentPos.y - 38 + playerBob, 28, 42);
        ctx.restore();
      }

      // Language Mage Flowing Robe (Unique curved silhouette)
      ctx.fillStyle = avatar.outfitColor || '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(currentPos.x - 12, currentPos.y - 25 + playerBob);
      ctx.lineTo(currentPos.x + 12, currentPos.y - 25 + playerBob);
      ctx.lineTo(currentPos.x + 15, currentPos.y - 3 + playerBob);
      ctx.lineTo(currentPos.x - 15, currentPos.y - 3 + playerBob);
      ctx.closePath();
      ctx.fill();

      // Golden Rune Belt
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(currentPos.x - 11, currentPos.y - 15 + playerBob, 22, 3);

      // Cloak
      if (avatar.cloak !== 'none') {
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(currentFacing === 'right' ? currentPos.x - 15 : currentPos.x + 4, currentPos.y - 23 + playerBob, 11, 24);
      }

      // Glowing Acoustic Staff in hand
      const staffX = currentFacing === 'right' ? currentPos.x + 14 : currentPos.x - 14;
      ctx.fillStyle = '#78350f';
      ctx.fillRect(staffX - 1.5, currentPos.y - 32 + playerBob, 3, 34);
      // Staff crystal head
      ctx.save();
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(staffX, currentPos.y - 34 + playerBob, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Head / Skin
      ctx.fillStyle = avatar.skinTone || '#fed7aa';
      ctx.fillRect(currentPos.x - 9, currentPos.y - 41 + playerBob, 18, 16);

      // Eyes
      ctx.fillStyle = avatar.eyeColor || '#0284c7';
      if (currentFacing === 'right') {
        ctx.fillRect(currentPos.x + 1, currentPos.y - 36 + playerBob, 3, 4);
        ctx.fillRect(currentPos.x + 6, currentPos.y - 36 + playerBob, 3, 4);
      } else {
        ctx.fillRect(currentPos.x - 8, currentPos.y - 36 + playerBob, 3, 4);
        ctx.fillRect(currentPos.x - 3, currentPos.y - 36 + playerBob, 3, 4);
      }

      // Hair
      ctx.fillStyle = avatar.hairColor || '#451a03';
      ctx.fillRect(currentPos.x - 10, currentPos.y - 45 + playerBob, 20, 8);
      if (avatar.hairStyle === 'spikes') {
        ctx.fillRect(currentPos.x - 6, currentPos.y - 49 + playerBob, 4, 4);
        ctx.fillRect(currentPos.x, currentPos.y - 50 + playerBob, 4, 5);
        ctx.fillRect(currentPos.x + 5, currentPos.y - 48 + playerBob, 4, 3);
      } else if (avatar.hairStyle === 'curls' || avatar.hairStyle === 'locks') {
        ctx.fillRect(currentPos.x - 12, currentPos.y - 40 + playerBob, 4, 12);
        ctx.fillRect(currentPos.x + 8, currentPos.y - 40 + playerBob, 4, 12);
      }

      // Player Name & Title banner
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(currentPos.x - 45, currentPos.y - 62 + playerBob, 90, 15);
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 9px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`YOU • ${avatar.title || 'Language Mage'}`, currentPos.x, currentPos.y - 51 + playerBob);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentPos, currentFacing, assignedCompanion, avatar, realm, isJumping]);

  // Click on canvas to move player
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newFacing = clickX > currentPos.x ? 'right' : 'left';
    if (onMovePlayer) {
      onMovePlayer(clickX, clickY, newFacing);
    } else {
      setInternalPlayerFacing(newFacing);
      setInternalPlayerPos({ x: clickX, y: clickY });
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl bg-slate-950">
      {/* Top Realm Navigation Bar */}
      <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/70 shadow-lg pointer-events-auto">
          <div
            className="w-3.5 h-3.5 rounded-full animate-ping"
            style={{ backgroundColor: realm.themeColor }}
          />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Realm Zone</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              {realm.name} <span className="text-xs font-normal text-slate-400">({realm.subtitle})</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Companion Quick Summon */}
          <button
            onClick={onOpenCompanion}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-xs shadow-lg transition"
          >
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span>Companion {assignedCompanion === 'kam' ? 'Kam' : 'Celine'} (Bond Lv.5)</span>
          </button>

          {/* Quick Sound Check */}
          <button
            onClick={() => phonemeAudio.playPhoneme('a')}
            className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 shadow"
            title="Science of Reading Pure Phoneme Sound Check (/æ/)"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Voxel Canvas */}
      <canvas
        ref={canvasRef}
        width={960}
        height={600}
        onClick={handleCanvasClick}
        className="w-full h-[540px] md:h-[600px] object-cover cursor-crosshair block"
      />

      {/* On-screen Controls Overlay */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
        <div className="bg-slate-900/85 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/60 text-xs text-slate-300 max-w-xs">
          <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            Voxel World Controls
          </div>
          <p className="text-[11px] text-slate-400">
            Use <span className="text-amber-300 font-mono">WASD</span> or <span className="text-amber-300 font-mono">Arrow Keys</span>, or <span className="text-cyan-300">Click anywhere</span> to walk.
          </p>
        </div>
      </div>

      {/* Active POI Interaction Prompt */}
      {activeNearbyPOI && (
        <div className="absolute bottom-4 right-4 z-10 animate-bounce">
          <button
            onClick={() => onInteractPOI(activeNearbyPOI.type, activeNearbyPOI)}
            className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm tracking-wide shadow-2xl transition border-2 border-yellow-200"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>INTERACT: {activeNearbyPOI.label}</span>
          </button>
        </div>
      )}

      {/* Live Mini Chat Feed */}
      <div className="absolute top-16 right-4 z-10 hidden lg:flex flex-col gap-1.5 w-72 pointer-events-none">
        {chatLog.map((chat, idx) => (
          <div
            key={idx}
            className="bg-slate-950/80 backdrop-blur-md border border-slate-800/80 px-3 py-1.5 rounded-lg text-xs shadow-md pointer-events-auto"
          >
            <span className="font-bold text-amber-400">{chat.sender}: </span>
            <span className="text-slate-200">{chat.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
