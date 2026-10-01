// PHONIXIA - Character Creator & Roblox/RPG Depth Customization
// Boy / Girl base, Kam / Celine companion pairing, and cosmetic visualizer

import React, { useState } from 'react';
import { AvatarCustomization, CharacterGender } from '../../types/game';
import { COMPANION_KAM, COMPANION_CELINE } from '../../services/mockGameData';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import { Sparkles, User, Shield, Check, Wand2 } from 'lucide-react';

interface CharacterCreatorProps {
  initialAvatar?: AvatarCustomization;
  onSaveAvatar: (avatar: AvatarCustomization, companionId: 'kam' | 'celine') => void;
  onCancel?: () => void;
}

export const CharacterCreator: React.FC<CharacterCreatorProps> = ({
  initialAvatar,
  onSaveAvatar,
  onCancel,
}) => {
  const [gender, setGender] = useState<CharacterGender>(initialAvatar?.gender || 'boy');
  const [skinTone, setSkinTone] = useState(initialAvatar?.skinTone || '#fed7aa');
  const [eyeColor, setEyeColor] = useState(initialAvatar?.eyeColor || '#0284c7');
  const [eyeStyle, setEyeStyle] = useState<AvatarCustomization['eyeStyle']>(initialAvatar?.eyeStyle || 'curious');
  const [hairStyle, setHairStyle] = useState<AvatarCustomization['hairStyle']>(initialAvatar?.hairStyle || 'spikes');
  const [hairColor, setHairColor] = useState(initialAvatar?.hairColor || '#451a03');
  const [outfit, setOutfit] = useState<AvatarCustomization['outfit']>(initialAvatar?.outfit || 'explorer_tunic');
  const [outfitColor, setOutfitColor] = useState(initialAvatar?.outfitColor || '#0d9488');
  const [cloak, setCloak] = useState<AvatarCustomization['cloak']>(initialAvatar?.cloak || 'none');
  const [backpack, setBackpack] = useState<AvatarCustomization['backpack']>(initialAvatar?.backpack || 'rune_satchel');
  const [footwear, setFootwear] = useState<AvatarCustomization['footwear']>(initialAvatar?.footwear || 'traveler_boots');
  const [accessory, setAccessory] = useState<AvatarCustomization['accessory']>(initialAvatar?.accessory || 'echo_goggles');
  const [auraEffect, setAuraEffect] = useState<AvatarCustomization['auraEffect']>(initialAvatar?.auraEffect || 'letter_sparks');
  const [profileBanner, setProfileBanner] = useState<AvatarCustomization['profileBanner']>(initialAvatar?.profileBanner || 'celestial_scroll');
  const [title, setTitle] = useState(initialAvatar?.title || 'Rune Novice');

  // Franchise rule: Boy character starts with Kam, Girl starts with Celine (player can also toggle)
  const [assignedCompanion, setAssignedCompanion] = useState<'kam' | 'celine'>(
    gender === 'boy' ? 'kam' : 'celine'
  );

  const [activeTab, setActiveTab] = useState<'identity' | 'hair_face' | 'robes_gear' | 'auras_titles'>('identity');

  // Skin tones
  const skinTones = [
    { name: 'Porcelain', color: '#ffedd5' },
    { name: 'Peach', color: '#fed7aa' },
    { name: 'Warm Honey', color: '#fdba74' },
    { name: 'Golden Olive', color: '#fb923c' },
    { name: 'Almond Tan', color: '#d97706' },
    { name: 'Chestnut', color: '#b45309' },
    { name: 'Espresso', color: '#78350f' },
    { name: 'Obsidian Rich', color: '#451a03' },
  ];

  // Eye colors
  const eyeColors = [
    { name: 'Sapphire Blue', color: '#0284c7' },
    { name: 'Emerald Green', color: '#16a34a' },
    { name: 'Amethyst Purple', color: '#9333ea' },
    { name: 'Amber Gold', color: '#d97706' },
    { name: 'Ruby Glow', color: '#e11d48' },
    { name: 'Obsidian Black', color: '#1e293b' },
  ];

  // Hair colors
  const hairColors = [
    { name: 'Midnight Obsidian', color: '#0f172a' },
    { name: 'Espresso Brown', color: '#451a03' },
    { name: 'Chestnut Auburn', color: '#7c2d12' },
    { name: 'Golden Honey', color: '#eab308' },
    { name: 'Starlight Silver', color: '#e2e8f0' },
    { name: 'Arcane Amethyst', color: '#7c3aed' },
    { name: 'Oceanic Teal', color: '#0d9488' },
    { name: 'Flame Crimson', color: '#dc2626' },
  ];

  // Outfit colors
  const outfitColors = [
    { name: 'Teal Tide', color: '#0d9488' },
    { name: 'Amber Forge', color: '#d97706' },
    { name: 'Royal Starlight', color: '#6366f1' },
    { name: 'Forest Emerald', color: '#15803d' },
    { name: 'Crimson Scribe', color: '#b91c1c' },
    { name: 'Shadow Obsidian', color: '#334155' },
  ];

  const handleGenderChange = (newGender: CharacterGender) => {
    setGender(newGender);
    if (newGender === 'boy') {
      setAssignedCompanion('kam');
      setHairStyle('spikes');
    } else {
      setAssignedCompanion('celine');
      setHairStyle('braids');
    }
    phonemeAudio.playCompanionChime();
  };

  const handleSave = () => {
    phonemeAudio.playFanfare();
    const finalAvatar: AvatarCustomization = {
      gender,
      skinTone,
      eyeColor,
      eyeStyle,
      hairStyle,
      hairColor,
      outfit,
      outfitColor,
      cloak,
      backpack,
      footwear,
      accessory,
      auraEffect,
      profileBanner,
      title,
    };
    onSaveAvatar(finalAvatar, assignedCompanion);
  };

  const companion = assignedCompanion === 'kam' ? COMPANION_KAM : COMPANION_CELINE;

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 max-w-5xl mx-auto my-4 text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-4">
          <img
            src="/logo.jpeg"
            alt="PHONIXIA"
            className="h-16 w-auto rounded-xl shadow-lg border border-amber-500/20 object-contain"
          />
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Wand2 className="w-4 h-4" />
              <span>PHONIXIA Character Forge</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-1 font-heading">
              Forge Your Language Mage
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Every cosmetic item is earned through literacy exploration. No pay-to-win, 100% mastery.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition transform active:scale-95"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Confirm & Enter Phonixia</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Avatar Preview Left + Customization Tabs Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Column: Live Stylized Voxel Character & Companion Preview */}
        <div className="lg:col-span-4 flex flex-col items-center">
          <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-slate-800 to-slate-950 rounded-2xl border-2 border-amber-500/40 p-6 flex flex-col items-center justify-between overflow-hidden shadow-inner">
            {/* Background Aura Glow */}
            {auraEffect !== 'none' && (
              <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent pointer-events-none animate-pulse" />
            )}

            {/* Title Banner */}
            <div className="z-10 bg-slate-900/90 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold text-amber-300 shadow">
              {title}
            </div>

            {/* Stylized Pixel/Voxel Avatar Composite Rendering */}
            <div className="relative my-auto flex flex-col items-center">
              {/* Head & Hair */}
              <div className="relative">
                {/* Hair */}
                <div
                  className="w-20 h-10 rounded-t-xl absolute -top-4 -left-2 z-10"
                  style={{ backgroundColor: hairColor }}
                />
                {/* Head / Face */}
                <div
                  className="w-16 h-16 rounded-lg relative z-0 flex items-center justify-center shadow-md"
                  style={{ backgroundColor: skinTone }}
                >
                  {/* Eyes */}
                  <div className="flex gap-4 mt-2">
                    <div
                      className="w-2.5 h-3 rounded-sm shadow-sm"
                      style={{ backgroundColor: eyeColor }}
                    />
                    <div
                      className="w-2.5 h-3 rounded-sm shadow-sm"
                      style={{ backgroundColor: eyeColor }}
                    />
                  </div>
                  {/* Smile */}
                  <div className="absolute bottom-2 w-4 h-1 bg-amber-900/40 rounded-full" />
                </div>
                {/* Accessory */}
                {accessory === 'echo_goggles' && (
                  <div className="absolute top-2 -left-3 w-22 h-4 bg-amber-500 border border-slate-900 rounded-sm z-20 flex justify-around items-center px-1">
                    <div className="w-3.5 h-3 bg-cyan-300 rounded-sm" />
                    <div className="w-3.5 h-3 bg-cyan-300 rounded-sm" />
                  </div>
                )}
              </div>

              {/* Body Outfit */}
              <div
                className="w-20 h-24 rounded-b-lg mt-1 relative z-10 shadow-lg flex flex-col items-center justify-center"
                style={{ backgroundColor: outfitColor }}
              >
                {/* Robe Collar / Crest */}
                <div className="w-8 h-8 border-t-2 border-yellow-200/50 rotate-45 mb-4" />
                <div className="w-10 h-1 bg-amber-400/80 rounded" />
              </div>

              {/* Legs / Footwear */}
              <div className="flex gap-3 -mt-1">
                <div className="w-6 h-10 bg-slate-800 rounded-b-md" />
                <div className="w-6 h-10 bg-slate-800 rounded-b-md" />
              </div>

              {/* Backpack / Cloak */}
              {cloak !== 'none' && (
                <div className="absolute -inset-2 bg-indigo-950/70 -z-10 rounded-2xl blur-[1px]" />
              )}
            </div>

            {/* Companion Badge at Avatar's Side */}
            <div className="z-10 w-full bg-slate-900/90 border border-slate-700 p-2.5 rounded-xl flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow ${
                  companion.id === 'kam' ? 'bg-teal-600' : 'bg-purple-600'
                }`}
              >
                {companion.id === 'kam' ? 'KAM' : 'CEL'}
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  Partner Companion
                </div>
                <div className="text-xs font-bold text-white truncate">{companion.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{companion.specialAbility}</div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-center text-xs text-slate-400">
            Selected Base: <span className="text-amber-400 capitalize font-bold">{gender} Character</span>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Customization Category Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
            <button
              onClick={() => setActiveTab('identity')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'identity'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              1. Base Hero & Companion
            </button>
            <button
              onClick={() => setActiveTab('hair_face')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'hair_face'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              2. Face, Skin & Hair
            </button>
            <button
              onClick={() => setActiveTab('robes_gear')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'robes_gear'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              3. Robes, Cloaks & Gear
            </button>
            <button
              onClick={() => setActiveTab('auras_titles')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'auras_titles'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              4. Auras, Titles & Emotes
            </button>
          </div>

          {/* Tab 1: Base Character & Companion */}
          {activeTab === 'identity' && (
            <div className="mt-5 space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Choose Base Character
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleGenderChange('boy')}
                    className={`p-4 rounded-xl border-2 text-left flex items-start gap-4 transition ${
                      gender === 'boy'
                        ? 'border-amber-400 bg-amber-500/10 shadow-lg'
                        : 'border-slate-800 bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">Boy Character</div>
                      <div className="text-xs text-amber-300 font-medium mt-0.5">
                        Begins journey with <span className="underline">Kam</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Dynamic phonetic scout equipped with Echo Goggles and rhythm-based phoneme detection.
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleGenderChange('girl')}
                    className={`p-4 rounded-xl border-2 text-left flex items-start gap-4 transition ${
                      gender === 'girl'
                        ? 'border-amber-400 bg-amber-500/10 shadow-lg'
                        : 'border-slate-800 bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">Girl Character</div>
                      <div className="text-xs text-purple-300 font-medium mt-0.5">
                        Begins journey with <span className="underline">Celine</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Brilliant morphology scholar carrying the Starlight Compass and ancient root grimoire.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Companion Partner Selector (Option to switch companion bond) */}
              <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs font-bold text-slate-300">Permanent Franchise Companion Pair</div>
                    <div className="text-[11px] text-slate-400">
                      Kam & Celine are permanent mascots and partners. You can adjust your active companion bond anytime.
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setAssignedCompanion('kam')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        assignedCompanion === 'kam'
                          ? 'bg-teal-500 text-slate-950 font-black'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      Bond with Kam
                    </button>
                    <button
                      onClick={() => setAssignedCompanion('celine')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        assignedCompanion === 'celine'
                          ? 'bg-purple-500 text-white font-black'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      Bond with Celine
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-teal-500/30">
                    <div className="text-xs font-bold text-teal-300">{COMPANION_KAM.name} — {COMPANION_KAM.title}</div>
                    <p className="text-[11px] text-slate-300 mt-1 italic">"{COMPANION_KAM.catchphrase}"</p>
                    <div className="text-[10px] text-slate-400 mt-2">
                      <span className="text-teal-400 font-semibold">Special Ability:</span> {COMPANION_KAM.specialAbilityDesc}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/80 border border-purple-500/30">
                    <div className="text-xs font-bold text-purple-300">{COMPANION_CELINE.name} — {COMPANION_CELINE.title}</div>
                    <p className="text-[11px] text-slate-300 mt-1 italic">"{COMPANION_CELINE.catchphrase}"</p>
                    <div className="text-[10px] text-slate-400 mt-2">
                      <span className="text-purple-400 font-semibold">Special Ability:</span> {COMPANION_CELINE.specialAbilityDesc}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Hair, Face & Skin */}
          {activeTab === 'hair_face' && (
            <div className="mt-5 space-y-6">
              {/* Skin Tone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Skin Tone Palette
                </label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {skinTones.map((tone) => (
                    <button
                      key={tone.color}
                      onClick={() => setSkinTone(tone.color)}
                      className={`h-12 rounded-xl flex items-center justify-center transition border-2 ${
                        skinTone === tone.color ? 'border-amber-400 scale-105 shadow-md' : 'border-slate-700'
                      }`}
                      style={{ backgroundColor: tone.color }}
                      title={tone.name}
                    >
                      {skinTone === tone.color && <Check className="w-5 h-5 text-slate-950 stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Style */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Hairstyle
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(['spikes', 'braids', 'pixie', 'curls', 'locks', 'wizard_flow', 'bob', 'topknot'] as AvatarCustomization['hairStyle'][]).map((style) => (
                    <button
                      key={style}
                      onClick={() => setHairStyle(style)}
                      className={`p-2.5 rounded-xl border text-xs font-bold capitalize transition ${
                        hairStyle === style
                          ? 'border-amber-400 bg-amber-500/20 text-white'
                          : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:text-white'
                      }`}
                    >
                      {style.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Color */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Hair Color
                </label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {hairColors.map((color) => (
                    <button
                      key={color.color}
                      onClick={() => setHairColor(color.color)}
                      className={`h-10 rounded-xl flex items-center justify-center transition border-2 ${
                        hairColor === color.color ? 'border-amber-400 scale-105 shadow-md' : 'border-slate-700'
                      }`}
                      style={{ backgroundColor: color.color }}
                      title={color.name}
                    >
                      {hairColor === color.color && <Check className="w-4 h-4 text-white stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Eye Color */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Eye Color
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {eyeColors.map((color) => (
                    <button
                      key={color.color}
                      onClick={() => setEyeColor(color.color)}
                      className={`h-10 rounded-xl flex items-center justify-center transition border-2 ${
                        eyeColor === color.color ? 'border-amber-400 scale-105 shadow-md' : 'border-slate-700'
                      }`}
                      style={{ backgroundColor: color.color }}
                      title={color.name}
                    >
                      {eyeColor === color.color && <Check className="w-4 h-4 text-white stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Robes, Cloaks & Gear */}
          {activeTab === 'robes_gear' && (
            <div className="mt-5 space-y-6">
              {/* Outfit Choice */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Starting Robes / Outfit
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'explorer_tunic', name: 'Explorer Tunic', desc: 'Lightweight linen with brass compass clip' },
                    { id: 'rookie_robes', name: 'Rookie Mage Robes', desc: 'Apprentice vestments embroidered with vowel runes' },
                    { id: 'scribe_vest', name: 'Scribe Vest', desc: 'Durable leather with quill holsters' },
                    { id: 'rune_cloak', name: 'Runic Mantle', desc: 'Enchanted wool that shimmers with soft phonemes' },
                    { id: 'scholar_greatcoat', name: 'Scholar Greatcoat', desc: 'Formal Lexicon Empire tailoring' },
                    { id: 'guardian_mail', name: 'Guardian Scribe Mail', desc: 'Reinforced light armor for treacherous trails' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setOutfit(item.id as AvatarCustomization['outfit'])}
                      className={`p-3 rounded-xl border text-left transition ${
                        outfit === item.id
                          ? 'border-amber-400 bg-amber-500/15'
                          : 'border-slate-800 bg-slate-800/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{item.name}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Outfit Color Palette */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Fabric Dye Palette
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {outfitColors.map((color) => (
                    <button
                      key={color.color}
                      onClick={() => setOutfitColor(color.color)}
                      className={`h-10 rounded-xl flex items-center justify-center transition border-2 ${
                        outfitColor === color.color ? 'border-amber-400 scale-105 shadow-md' : 'border-slate-700'
                      }`}
                      style={{ backgroundColor: color.color }}
                      title={color.name}
                    >
                      {outfitColor === color.color && <Check className="w-4 h-4 text-white stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessories */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Literacy Equipment & Accessories
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    { id: 'echo_goggles', name: 'Echo Goggles', desc: 'Kam’s signature sound-wave lenses' },
                    { id: 'quill_earpiece', name: 'Quill Earpiece', desc: 'Writing instrument worn by royal scribes' },
                    { id: 'leaf_circlet', name: 'Verdant Circlet', desc: 'Woven from Tricky Trail laurel' },
                    { id: 'runic_monocle', name: 'Runic Monocle', desc: 'Translates ancient morphology shards' },
                    { id: 'mage_headband', name: 'Language Headband', desc: 'Focuses mental concentration during blending' },
                    { id: 'none', name: 'No Accessory', desc: 'Clean, unencumbered appearance' },
                  ].map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => setAccessory(acc.id as AvatarCustomization['accessory'])}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        accessory === acc.id
                          ? 'border-amber-400 bg-amber-500/15'
                          : 'border-slate-800 bg-slate-800/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{acc.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{acc.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Auras & Titles */}
          {activeTab === 'auras_titles' && (
            <div className="mt-5 space-y-6">
              {/* Magical Aura */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Magical Literacy Aura (Pure Visual Effect)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'letter_sparks', name: 'Letter Sparks', desc: 'Gentle glowing consonant and vowel sparks float around you' },
                    { id: 'star_glyphs', name: 'Starlight Glyphs', desc: 'Ancient runic constellations orbit your footsteps' },
                    { id: 'golden_ink', name: 'Golden Scribe Ink', desc: 'Radiant calligraphy motes illuminate your aura' },
                    { id: 'autumn_phonemes', name: 'Autumn Phonemes', desc: 'Crisp amber vowel leaves swirl softly' },
                    { id: 'void_ether', name: 'Lapis Etymology Glow', desc: 'Deep indigo arcane particles from Lexicon Empire' },
                    { id: 'none', name: 'Subtle / No Aura', desc: 'No surrounding particle effects' },
                  ].map((aura) => (
                    <button
                      key={aura.id}
                      onClick={() => setAuraEffect(aura.id as AvatarCustomization['auraEffect'])}
                      className={`p-3 rounded-xl border text-left transition ${
                        auraEffect === aura.id
                          ? 'border-amber-400 bg-amber-500/15'
                          : 'border-slate-800 bg-slate-800/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{aura.name}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{aura.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Banner */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Apprentice Title
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    'Rune Novice',
                    'Acoustic Wanderer',
                    'Syllable Seeker',
                    'Companion of Kam',
                    'Companion of Celine',
                    'Scribe Initiate',
                  ].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTitle(t)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition ${
                        title === t
                          ? 'border-amber-400 bg-amber-500/20 text-white'
                          : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
