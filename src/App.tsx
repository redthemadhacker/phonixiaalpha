/**
 * PHONIXIA
 * @license Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  RealmId,
  AccountRole,
  AvatarCustomization,
  MageRank,
  Quest,
} from './types/game';
import { REALMS, INITIAL_QUESTS } from './services/mockGameData';
import { phonemeAudio } from './services/phonemeAudioEngine';
import { authService, UserAccount, LearnerProfile } from './services/authService';

// Authentication & Security Modals
import { AuthModal } from './components/auth/AuthModal';
import { DashboardPinModal } from './components/auth/DashboardPinModal';

// Components
import { Navbar } from './components/layout/Navbar';
import { VoxelWorldCanvas } from './components/game/VoxelWorldCanvas';
import { VirtualGamepad } from './components/game/VirtualGamepad';
import { CharacterCreator } from './components/game/CharacterCreator';
import { CompanionDrawer } from './components/game/CompanionDrawer';
import { PhonemeArticulationModal } from './components/game/PhonemeArticulationModal';
import { BlendingForgeModal } from './components/game/BlendingForgeModal';
import { HeartWordAltarModal } from './components/game/HeartWordAltarModal';
import { MorphologyMatrixModal } from './components/game/MorphologyMatrixModal';
import { MontessoriSensorialModal } from './components/game/MontessoriSensorialModal';
import { GameTransitionOverlay, TransitionType } from './components/game/GameTransitionOverlay';

// Dashboards
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { ParentDashboard } from './components/dashboards/ParentDashboard';
import { DistrictDashboard } from './components/dashboards/DistrictDashboard';
import { SpecialEdDashboard } from './components/dashboards/SpecialEdDashboard';
import { MasterSpecViewer } from './components/dashboards/MasterSpecViewer';

// Icons
import {
  Sparkles,
  BookOpen,
  Volume2,
  Hammer,
  Compass,
  KeyRound,
  Layers,
  Award,
  ChevronRight,
  Cloud,
  Lock,
} from 'lucide-react';

export default function App() {
  // Authentication & Profile State
  const [showAuthModal, setShowAuthModal] = useState<boolean>(!authService.isUserAuthenticated());
  const [activeProfile, setActiveProfile] = useState<LearnerProfile>(authService.getActiveProfile());
  const [cloudSyncTime, setCloudSyncTime] = useState<string>(
    authService.getAccount()?.lastCloudSynced || new Date().toLocaleTimeString()
  );

  // Secure 8-Digit PIN Dashboard Gate
  const [showPinModalForRole, setShowPinModalForRole] = useState<AccountRole | 'master_spec' | null>(null);
  const [dashboardPinUnlocked, setDashboardPinUnlocked] = useState<boolean>(false);

  // Navigation & Role State
  const [currentRealmId, setCurrentRealmId] = useState<RealmId>(activeProfile.currentRealm);
  const [activeRole, setActiveRole] = useState<AccountRole | 'master_spec'>('student');
  const [dyslexiaFontEnabled, setDyslexiaFontEnabled] = useState<boolean>(false);

  // Character Jump & Arcade Transition Overlay State
  const [isPlayerJumping, setIsPlayerJumping] = useState<boolean>(false);
  const [transitionState, setTransitionState] = useState<{
    active: boolean;
    type: TransitionType;
    title: string;
    subtitle?: string;
    themeColor?: string;
    onFinish: () => void;
  }>({
    active: false,
    type: 'mission_start',
    title: '',
    onFinish: () => {},
  });

  // Player World Coordinates for Movement (Touchpad + Click + Keys)
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>({ x: 420, y: 360 });
  const [playerFacing, setPlayerFacing] = useState<'left' | 'right'>('right');

  // Player Progression State (Synced with active learner profile)
  const [level, setLevel] = useState<number>(activeProfile.level);
  const [xp, setXp] = useState<number>(activeProfile.xp);
  const [xpToNextLevel, setXpToNextLevel] = useState<number>(activeProfile.xpToNextLevel);
  const [rank, setRank] = useState<MageRank>(activeProfile.rank as MageRank);
  const [lexiconRunes, setLexiconRunes] = useState<number>(activeProfile.lexiconRunes);
  const [activeQuests, setActiveQuests] = useState<Quest[]>(INITIAL_QUESTS);

  // Player Avatar Customization
  const [avatar, setAvatar] = useState<AvatarCustomization>({
    gender: 'boy',
    skinTone: '#fed7aa',
    eyeColor: '#0284c7',
    eyeStyle: 'curious',
    hairStyle: 'spikes',
    hairColor: '#451a03',
    outfit: 'explorer_tunic',
    outfitColor: activeProfile.avatarOutfitColor,
    cloak: activeProfile.gradeTier === 'high_school' ? 'star_mantle' : 'none',
    backpack: 'rune_satchel',
    footwear: 'traveler_boots',
    accessory: activeProfile.gradeTier === 'high_school' ? 'runic_monocle' : 'echo_goggles',
    auraEffect: activeProfile.gradeTier === 'high_school' ? 'golden_ink' : 'letter_sparks',
    profileBanner: 'celestial_scroll',
    title: activeProfile.title,
  });

  // Companion Assignment (Kam for Beginner / Celine for High School)
  const [assignedCompanion, setAssignedCompanion] = useState<'kam' | 'celine'>(activeProfile.assignedCompanion);

  // Modals & Panels State
  const [showCharacterCreator, setShowCharacterCreator] = useState<boolean>(false);
  const [showCompanionHub, setShowCompanionHub] = useState<boolean>(false);
  const [showStudentDashboard, setShowStudentDashboard] = useState<boolean>(false);
  const [activePhonemeModalKey, setActivePhonemeModalKey] = useState<string | null>(null);
  const [showBlendingForge, setShowBlendingForge] = useState<boolean>(false);
  const [showHeartAltar, setShowHeartAltar] = useState<boolean>(false);
  const [showMorphologyMatrix, setShowMorphologyMatrix] = useState<boolean>(false);
  const [showMontessoriSensorial, setShowMontessoriSensorial] = useState<boolean>(false);

  // Success Notification
  const [rewardToast, setRewardToast] = useState<{ message: string; xp: number; runes: number } | null>(null);

  const currentRealm = REALMS[currentRealmId];

  // Auto-speak opening game briefing when user enters the game realm
  useEffect(() => {
    if (activeRole === 'student' && !showAuthModal) {
      const timer = setTimeout(() => {
        phonemeAudio.speakInstruction(
          "Welcome to Phonixia! Use WASD to explore the realm and press A to leap into ancient literacy trials!"
        );
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [activeRole, showAuthModal]);

  // Sync profile data when profile switches
  const applyProfile = (profile: LearnerProfile) => {
    setActiveProfile(profile);
    setLevel(profile.level);
    setXp(profile.xp);
    setXpToNextLevel(profile.xpToNextLevel);
    setRank(profile.rank as MageRank);
    setLexiconRunes(profile.lexiconRunes);
    setCurrentRealmId(profile.currentRealm);
    setAssignedCompanion(profile.assignedCompanion);
    setAvatar((prev) => ({
      ...prev,
      outfitColor: profile.avatarOutfitColor,
      title: profile.title,
      cloak: profile.gradeTier === 'high_school' ? 'star_mantle' : 'none',
    }));
  };

  // Launch any task with an animated jump + arcade screen transition
  const launchTaskWithJumpAndTransition = (
    type: TransitionType,
    title: string,
    subtitle: string,
    themeColor: string,
    action: () => void
  ) => {
    // 1. Character leaps into the air with acoustic sound!
    setIsPlayerJumping(true);
    phonemeAudio.playMagicCastSound();

    setTimeout(() => {
      setIsPlayerJumping(false);
      // 2. Launch arcade screen warp transition!
      setTransitionState({
        active: true,
        type,
        title,
        subtitle,
        themeColor,
        onFinish: () => {
          setTransitionState((prev) => ({ ...prev, active: false }));
          action();
        },
      });
    }, 320);
  };

  // Realm travel with hyperspace warp transition
  const handleSelectRealmWithTransition = (id: RealmId) => {
    const target = REALMS[id];
    setTransitionState({
      active: true,
      type: 'realm_warp',
      title: `WARP: ${target.name}`,
      subtitle: 'ALIGNING ACOUSTIC LEY LINES...',
      themeColor: target.themeColor,
      onFinish: () => {
        setTransitionState((prev) => ({ ...prev, active: false }));
        setCurrentRealmId(id);
        phonemeAudio.playCompanionChime();
      },
    });
  };

  // Handle Role Selection (With 8-Digit PIN Gate & Transition Animation)
  const handleSelectRoleWithPinGate = (role: AccountRole | 'master_spec') => {
    if (role === 'student') {
      setTransitionState({
        active: true,
        type: 'mission_start',
        title: 'ENTERING PHONIXIA REALM',
        subtitle: 'SUMMONING LANGUAGE MAGE...',
        themeColor: '#f59e0b',
        onFinish: () => {
          setTransitionState((prev) => ({ ...prev, active: false }));
          setActiveRole('student');
        },
      });
      return;
    }

    const triggerDashboardTransition = () => {
      const title =
        role === 'teacher'
          ? 'EDUCATOR ARCHIVE'
          : role === 'parent'
          ? 'PARENT OVERSIGHT PORTAL'
          : role === 'special_ed'
          ? 'IEP / MTSS SUITE'
          : role === 'district_admin'
          ? 'DISTRICT COMMAND'
          : 'MASTER GAMEPLAY SPEC';

      setTransitionState({
        active: true,
        type: 'dashboard_access',
        title,
        subtitle: 'DECRYPTING ENCRYPTED ARCHIVES...',
        themeColor: '#6366f1',
        onFinish: () => {
          setTransitionState((prev) => ({ ...prev, active: false }));
          setActiveRole(role);
        },
      });
    };

    if (dashboardPinUnlocked) {
      triggerDashboardTransition();
    } else {
      setShowPinModalForRole(role);
    }
  };

  // Points of Interest locations for Spacebar Jump-to-Open proximity
  const POI_LOCATIONS = [
    { type: 'phoneme_shrine', x: 340, y: 220 },
    { type: 'phoneme_shrine', x: 480, y: 125 },
    { type: 'blending_forge', x: 580, y: 240 },
    { type: 'heart_altar', x: 260, y: 480 },
    { type: 'morphology_gate', x: 640, y: 470 },
    { type: 'montessori_shelf', x: 480, y: 520 },
    { type: 'npc_guide', x: 480, y: 190 },
  ];

  // Jump Action (Triggered by Spacebar or 5th Keypad Button)
  const handlePlayerJump = () => {
    setIsPlayerJumping(true);
    phonemeAudio.playMagicCastSound();

    // Check if player is near any POI (within 120px) to jump into task
    const nearby = POI_LOCATIONS.find((poi) => {
      const dist = Math.hypot(playerPos.x - poi.x, playerPos.y - poi.y);
      return dist <= 120;
    });

    if (nearby) {
      setTimeout(() => {
        setIsPlayerJumping(false);
        handleInteractPOI(nearby.type);
      }, 250);
    } else {
      setTimeout(() => {
        setIsPlayerJumping(false);
      }, 450);
    }
  };

  // Keyboard controls for desktop WASD / Arrow movement + SPACEBAR to Jump
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const step = 28;
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        handlePlayerJump();
        return;
      }

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        movePlayer(0, -step, 'up');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        movePlayer(0, step, 'down');
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        movePlayer(-step, 0, 'left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        movePlayer(step, 0, 'right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, currentRealmId]);

  // Player Movement Boundary Constrainer
  const movePlayer = (dx: number, dy: number, dir: 'left' | 'right' | 'up' | 'down') => {
    setPlayerPos((prev) => {
      const newX = Math.max(80, Math.min(920, prev.x + dx));
      const newY = Math.max(120, Math.min(540, prev.y + dy));
      return { x: newX, y: newY };
    });

    if (dir === 'left') setPlayerFacing('left');
    else if (dir === 'right') setPlayerFacing('right');
  };

  // Handle POI Interactions from the Canvas or Action Key [A]
  const handleInteractPOI = (type: string, data?: any) => {
    switch (type) {
      case 'phoneme_shrine':
        launchTaskWithJumpAndTransition('mission_start', 'PURE PHONEME ALTAR', 'CALIBRATING ACOUSTIC FORMANT...', '#06b6d4', () => {
          setActivePhonemeModalKey('a');
        });
        break;
      case 'blending_forge':
        launchTaskWithJumpAndTransition('mission_start', 'ANVIL OF BLENDS', 'HEATING ORTHOGRAPHIC FORGE...', '#f59e0b', () => {
          setShowBlendingForge(true);
        });
        break;
      case 'heart_altar':
        launchTaskWithJumpAndTransition('mission_start', 'HEART WORD ALTAR', 'TARGETING IRREGULAR RUNES...', '#ec4899', () => {
          setShowHeartAltar(true);
        });
        break;
      case 'morphology_gate':
        launchTaskWithJumpAndTransition('mission_start', 'ARCH OF MORPHEMES', 'SYNTHESIZING GREEK & LATIN ROOTS...', '#eab308', () => {
          setShowMorphologyMatrix(true);
        });
        break;
      case 'montessori_shelf':
        launchTaskWithJumpAndTransition('mission_start', 'SENSORIAL PAVILION', 'PREPARING MOVABLE ALPHABET...', '#10b981', () => {
          setShowMontessoriSensorial(true);
        });
        break;
      case 'npc_guide':
        launchTaskWithJumpAndTransition('mission_start', 'COMPANION GUILD', 'SUMMONING KAM & CELINE...', '#8b5cf6', () => {
          setShowCompanionHub(true);
        });
        break;
      default:
        launchTaskWithJumpAndTransition('mission_start', 'PURE PHONEME ALTAR', 'CALIBRATING ACOUSTIC FORMANT...', '#06b6d4', () => {
          setActivePhonemeModalKey('a');
        });
    }
  };

  // Virtual Gamepad Action [A]: Interacts with nearest POI
  const handleGamepadActionA = () => {
    if (currentRealmId === 'lexicon_empire') {
      handleInteractPOI('morphology_gate');
    } else if (currentRealmId === 'builders_guild') {
      handleInteractPOI('blending_forge');
    } else if (currentRealmId === 'tricky_trails') {
      handleInteractPOI('heart_altar');
    } else {
      handleInteractPOI('phoneme_shrine');
    }
  };

  // Award XP and Runes on quest/challenge mastery
  const handleAwardReward = (earnedXp: number, earnedRunes: number, questId?: string) => {
    phonemeAudio.playFanfare();
    const newXp = xp + earnedXp;
    let newLevel = level;
    let newXpToNext = xpToNextLevel;

    if (newXp >= xpToNextLevel) {
      newLevel += 1;
      newXpToNext = Math.round(xpToNextLevel * 1.35);
      if (newLevel >= 15) setRank('MASTER OF PHONIXIA');
      else if (newLevel >= 10) setRank('Lore Archmage');
      else if (newLevel >= 7) setRank('Lexicon Knight');
      else if (newLevel >= 4) setRank('Syllable Smith');
    }

    setLevel(newLevel);
    setXp(newXp);
    setXpToNextLevel(newXpToNext);
    setLexiconRunes((prev) => prev + earnedRunes);

    // Save to auth service profile
    authService.updateActiveProfile((p) => ({
      ...p,
      level: newLevel,
      xp: newXp,
      xpToNextLevel: newXpToNext,
      lexiconRunes: p.lexiconRunes + earnedRunes,
    }));

    if (questId) {
      setActiveQuests((prev) =>
        prev.map((q) => (q.id === questId ? { ...q, completed: true } : q))
      );
    }

    setRewardToast({
      message: 'Literacy Spell Formed & Anchored into Grimoire!',
      xp: earnedXp,
      runes: earnedRunes,
    });
    setTimeout(() => setRewardToast(null), 4000);
  };

  const handleManualCloudSync = () => {
    const time = authService.syncCloud();
    setCloudSyncTime(time);
    phonemeAudio.playCompanionChime();
    setRewardToast({
      message: `Cloud Synced Across All Devices at ${time}`,
      xp: 0,
      runes: 0,
    });
    setTimeout(() => setRewardToast(null), 3000);
  };

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${
        dyslexiaFontEnabled ? 'dyslexia-mode' : ''
      }`}
    >
      {/* Full-Screen Arcade / RPG Warp Transition Overlay */}
      <GameTransitionOverlay
        active={transitionState.active}
        type={transitionState.type}
        title={transitionState.title}
        subtitle={transitionState.subtitle}
        themeColor={transitionState.themeColor}
        onComplete={transitionState.onFinish}
      />

      {/* Top Main Navigation */}
      <Navbar
        currentRealmId={currentRealmId}
        onSelectRealm={handleSelectRealmWithTransition}
        activeRole={activeRole}
        onSelectRole={handleSelectRoleWithPinGate}
        dyslexiaFontEnabled={dyslexiaFontEnabled}
        onToggleDyslexiaFont={() => setDyslexiaFontEnabled(!dyslexiaFontEnabled)}
        playerName={avatar.title}
        playerRank={rank}
        playerLevel={level}
        activeProfileName={activeProfile.name}
        activeProfileTier={activeProfile.gradeTier === 'beginner' ? 'Beginner' : 'High School'}
        onOpenProfilePicker={() => setShowAuthModal(true)}
        cloudSyncTime={cloudSyncTime}
        onSyncCloud={handleManualCloudSync}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col pb-28">
        {/* Dynamic Reward Banner Toast */}
        {rewardToast && (
          <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm shadow-2xl flex items-center justify-between animate-bounce border-2 border-yellow-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>{rewardToast.message}</span>
            </div>
            {rewardToast.xp > 0 && (
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="bg-slate-950/20 px-3 py-1 rounded-lg">+{rewardToast.xp} XP</span>
                <span className="bg-slate-950/20 px-3 py-1 rounded-lg">+{rewardToast.runes} Runes</span>
              </div>
            )}
          </div>
        )}

        {/* View 1: Main Interactive Game World */}
        {activeRole === 'student' && (
          <div className="space-y-6">
            {/* Top Official Banner with logo.jpeg */}
            <div className="bg-gradient-to-r from-slate-900 via-stone-900 to-slate-900 border border-amber-600/30 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="/logo.jpeg"
                  alt="PHONIXIA"
                  className="h-20 w-auto rounded-xl shadow-xl border border-amber-500/20 object-contain hover:scale-105 transition"
                />
                <div>
                  <h1 className="font-heading font-black text-2xl md:text-3xl text-white tracking-wide">
                    PHONIXIA
                  </h1>
                  <p className="text-xs text-amber-300/90 font-medium">
                    Language is Magic • Every Sound Has Power
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    launchTaskWithJumpAndTransition('mission_start', 'COMPANION HUB', 'SUMMONING GUIDE...', '#8b5cf6', () => {
                      setShowCompanionHub(true);
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500 hover:text-slate-950 font-bold text-xs transition"
                >
                  Companion: <strong className="capitalize">{assignedCompanion}</strong>
                </button>
                <button
                  onClick={() => {
                    launchTaskWithJumpAndTransition('mission_start', 'STUDENT GRIMOIRE', 'OPENING SPELL INVENTORY...', '#3b82f6', () => {
                      setShowStudentDashboard(true);
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
                >
                  Grimoire
                </button>
              </div>
            </div>

            {/* Voxel Realm Canvas with Jump Animation */}
            <VoxelWorldCanvas
              realm={currentRealm}
              avatar={avatar}
              assignedCompanion={assignedCompanion}
              playerPos={playerPos}
              playerFacing={playerFacing}
              isJumping={isPlayerJumping}
              onMovePlayer={(x, y, facing) => {
                setPlayerPos({ x, y });
                if (facing) setPlayerFacing(facing);
              }}
              onInteractPOI={handleInteractPOI}
              onOpenCompanion={() => setShowCompanionHub(true)}
            />

            {/* Quick Spellcast & Interaction Dock */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <button
                onClick={() => handleInteractPOI('phoneme_shrine')}
                className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 hover:bg-slate-800 transition flex flex-col items-center text-center shadow group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300 font-mono font-bold mb-1.5 group-hover:scale-110 transition">
                  /æ/
                </div>
                <div className="text-xs font-bold text-white">Pure Phonemes</div>
                <div className="text-[10px] text-slate-400">Mouth Visualizer</div>
              </button>

              <button
                onClick={() => handleInteractPOI('blending_forge')}
                className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 hover:bg-slate-800 transition flex flex-col items-center text-center shadow group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 mb-1.5 group-hover:scale-110 transition">
                  <Hammer className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-white">Blending Forge</div>
                <div className="text-[10px] text-slate-400">CVC / CCVC Spells</div>
              </button>

              <button
                onClick={() => handleInteractPOI('heart_altar')}
                className="p-3.5 rounded-xl bg-slate-900 border border-pink-500/40 hover:border-pink-400 hover:bg-slate-800 transition flex flex-col items-center text-center shadow group"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-300 mb-1.5 group-hover:scale-110 transition">
                  <Compass className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-white">Heart Word Altar</div>
                <div className="text-[10px] text-slate-400">Irregular Mapping</div>
              </button>

              <button
                onClick={() => handleInteractPOI('morphology_gate')}
                className="p-3.5 rounded-xl bg-slate-900 border border-yellow-500/40 hover:border-yellow-400 hover:bg-slate-800 transition flex flex-col items-center text-center shadow group"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-300 mb-1.5 group-hover:scale-110 transition">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-white">Morphology Matrix</div>
                <div className="text-[10px] text-slate-400">Latin & Greek Roots</div>
              </button>

              <button
                onClick={() => handleInteractPOI('montessori_shelf')}
                className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 hover:bg-slate-800 transition flex flex-col items-center text-center shadow group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 mb-1.5 group-hover:scale-110 transition">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-white">Montessori Pavilion</div>
                <div className="text-[10px] text-slate-400">Movable Alphabet</div>
              </button>

              <button
                onClick={() => {
                  launchTaskWithJumpAndTransition('mission_start', 'STUDENT GRIMOIRE', 'OPENING SPELL INVENTORY...', '#3b82f6', () => {
                    setShowStudentDashboard(true);
                  });
                }}
                className="p-3.5 rounded-xl bg-slate-900 border border-purple-500/40 hover:border-purple-400 hover:bg-slate-800 transition flex flex-col items-center text-center shadow group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 mb-1.5 group-hover:scale-110 transition">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-white">Grimoire & Pets</div>
                <div className="text-[10px] text-slate-400">Profile & Quests</div>
              </button>
            </div>
          </div>
        )}

        {/* View 2: Teacher Dashboard */}
        {activeRole === 'teacher' && <TeacherDashboard />}

        {/* View 3: Parent Dashboard */}
        {activeRole === 'parent' && <ParentDashboard />}

        {/* View 4: District & School Admin Dashboard */}
        {activeRole === 'district_admin' && <DistrictDashboard />}

        {/* View 5: Special Education, IEP, 504 & MTSS Suite */}
        {activeRole === 'special_ed' && (
          <SpecialEdDashboard
            dyslexiaFontEnabled={dyslexiaFontEnabled}
            onToggleDyslexiaFont={() => setDyslexiaFontEnabled(!dyslexiaFontEnabled)}
          />
        )}

        {/* View 6: Master Game Design Specification Viewer */}
        {activeRole === 'master_spec' && <MasterSpecViewer />}
      </main>

      {/* On-Screen Virtual WASD + Space Touch Gamepad for Phone & Tablet Play */}
      {activeRole === 'student' && (
        <VirtualGamepad
          onMove={movePlayer}
          onJump={handlePlayerJump}
        />
      )}

      {/* MODALS */}

      {/* Login, Sign Up & Profile Selection Modal */}
      {showAuthModal && (
        <AuthModal
          onAuthenticated={(account, selectedProfile) => {
            applyProfile(selectedProfile);
            setShowAuthModal(false);
          }}
        />
      )}

      {/* Secure 8-Digit PIN Modal for Dashboards */}
      {showPinModalForRole && (
        <DashboardPinModal
          dashboardTitle={
            showPinModalForRole === 'parent'
              ? 'Parent Oversight'
              : showPinModalForRole === 'teacher'
              ? 'Educator Portal'
              : showPinModalForRole === 'special_ed'
              ? 'IEP / Special Ed Suite'
              : showPinModalForRole === 'district_admin'
              ? 'District Administration'
              : 'Master Blueprint'
          }
          onUnlocked={() => {
            setDashboardPinUnlocked(true);
            const target = showPinModalForRole;
            setShowPinModalForRole(null);
            handleSelectRoleWithPinGate(target);
          }}
          onCancel={() => setShowPinModalForRole(null)}
        />
      )}

      {/* Character Creator Modal */}
      {showCharacterCreator && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md overflow-y-auto p-4 flex items-center justify-center">
          <div className="w-full max-w-5xl">
            <CharacterCreator
              initialAvatar={avatar}
              onSaveAvatar={(newAvatar, compId) => {
                setAvatar(newAvatar);
                setAssignedCompanion(compId);
                setShowCharacterCreator(false);
              }}
              onCancel={() => setShowCharacterCreator(false)}
            />
          </div>
        </div>
      )}

      {/* Companion Drawer (Kam & Celine Hub) */}
      {showCompanionHub && (
        <CompanionDrawer
          currentCompanionId={assignedCompanion}
          onSwitchCompanion={(id) => setAssignedCompanion(id)}
          onClose={() => setShowCompanionHub(false)}
          onLaunchReviewMission={(type) => {
            setShowCompanionHub(false);
            if (type === 'pure_phonemes') handleInteractPOI('phoneme_shrine');
            else if (type === 'blending') handleInteractPOI('blending_forge');
            else if (type === 'roots') handleInteractPOI('morphology_gate');
          }}
        />
      )}

      {/* Student Grimoire Dashboard Modal */}
      {showStudentDashboard && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md overflow-y-auto p-4 flex items-center justify-center">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setShowStudentDashboard(false)}
              className="absolute top-4 right-4 z-10 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs"
            >
              ✕ Close Grimoire
            </button>
            <StudentDashboard
              avatar={avatar}
              assignedCompanion={assignedCompanion}
              rank={rank}
              level={level}
              xp={xp}
              xpToNextLevel={xpToNextLevel}
              lexiconRunes={lexiconRunes}
              activeQuests={activeQuests}
              onOpenCharacterCreator={() => {
                setShowStudentDashboard(false);
                setShowCharacterCreator(true);
              }}
              onOpenCompanionHub={() => {
                setShowStudentDashboard(false);
                setShowCompanionHub(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Science of Reading Phoneme Articulation Modal with Instructions & Repeat Prompt */}
      {activePhonemeModalKey && (
        <PhonemeArticulationModal
          initialPhonemeKey={activePhonemeModalKey}
          assignedCompanion={assignedCompanion}
          onClose={() => setActivePhonemeModalKey(null)}
          onMasteryEarned={(key) => handleAwardReward(100, 25)}
        />
      )}

      {/* Science of Reading Blending Forge Modal with Instructions & Repeat Prompt */}
      {showBlendingForge && (
        <BlendingForgeModal
          assignedCompanion={assignedCompanion}
          onClose={() => setShowBlendingForge(false)}
          onSuccess={(xpEarned, runesEarned) => {
            setShowBlendingForge(false);
            handleAwardReward(xpEarned, runesEarned, 'quest_2');
          }}
        />
      )}

      {/* Heart Word Altar Modal with Instructions & Repeat Prompt */}
      {showHeartAltar && (
        <HeartWordAltarModal
          assignedCompanion={assignedCompanion}
          onClose={() => setShowHeartAltar(false)}
          onSuccess={(xpEarned, runesEarned) => {
            setShowHeartAltar(false);
            handleAwardReward(xpEarned, runesEarned, 'quest_3');
          }}
        />
      )}

      {/* Morphology Matrix Modal with Instructions & Repeat Prompt */}
      {showMorphologyMatrix && (
        <MorphologyMatrixModal
          assignedCompanion={assignedCompanion}
          onClose={() => setShowMorphologyMatrix(false)}
          onSuccess={(xpEarned, runesEarned) => {
            setShowMorphologyMatrix(false);
            handleAwardReward(xpEarned, runesEarned, 'quest_4');
          }}
        />
      )}

      {/* Montessori Sensorial Modal with Instructions & Repeat Prompt */}
      {showMontessoriSensorial && (
        <MontessoriSensorialModal onClose={() => setShowMontessoriSensorial(false)} />
      )}
    </div>
  );
}
