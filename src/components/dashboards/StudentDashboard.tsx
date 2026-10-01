// PHONIXIA - Student Language Mage Dashboard
// Profile, Quest Grimoire, Mastery Radar, Pet Menagerie, and Inventory

import React, { useState } from 'react';
import { AvatarCustomization, MageRank, GradeLevel, Quest } from '../../types/game';
import { REALMS } from '../../services/mockGameData';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import {
  Sparkles,
  BookOpen,
  Backpack,
  Award,
  Compass,
  Volume2,
  CheckCircle2,
  Clock,
  Egg,
} from 'lucide-react';

interface StudentDashboardProps {
  avatar: AvatarCustomization;
  assignedCompanion: 'kam' | 'celine';
  rank: MageRank;
  level: number;
  xp: number;
  xpToNextLevel: number;
  lexiconRunes: number;
  activeQuests: Quest[];
  onOpenCharacterCreator: () => void;
  onOpenCompanionHub: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  avatar,
  assignedCompanion,
  rank,
  level,
  xp,
  xpToNextLevel,
  lexiconRunes,
  activeQuests,
  onOpenCharacterCreator,
  onOpenCompanionHub,
}) => {
  const [activeTab, setActiveTab] = useState<'grimoire' | 'inventory' | 'pets' | 'achievements'>('grimoire');

  const pets = [
    { name: 'Vowel Sprite Pip', type: 'Short Vowel Familiar', element: 'Sound Shallows', level: 3, icon: '✨' },
    { name: 'Bronze Digraph Drake', type: 'Consonant Guardian', element: 'Builders Guild', level: 4, icon: '🐲' },
    { name: 'Heartwood Owl', type: 'Sight Word Guide', element: 'Tricky Trails', level: 2, icon: '🦉' },
  ];

  const inventoryItems = [
    { name: 'Pure /æ/ Sound Crystal', count: 14, type: 'Acoustic Rune' },
    { name: 'Anvil Syllable Shard', count: 6, type: 'Crafting Material' },
    { name: 'Ancient Greek "Tele" Tablet', count: 2, type: 'Morphology Key' },
    { name: 'Starlight Calligraphy Ink', count: 8, type: 'Grimoire Ink' },
    { name: 'Heart Word Compass', count: 1, type: 'Navigation Artifact' },
  ];

  const achievements = [
    { title: 'Pure Sound Pioneer', desc: 'Distinguished 10 pure phonemes without schwa distortion', date: 'Earned' },
    { title: 'Anvil Striker', desc: 'Assembled 25 CVC and CCVC word spells in Builders Guild', date: 'Earned' },
    { title: 'Heart Mapper', desc: 'Identified the irregular heart part in 15 tricky words', date: 'Earned' },
    { title: 'Master of Phonixia (In Progress)', desc: 'Attain Level 100 and complete the Lexicon Empire Master Trial', date: 'Progressing' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 max-w-5xl mx-auto my-4">
      {/* Top Hero Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl border-2 border-amber-500/50 flex items-center justify-center text-2xl font-black shadow-lg"
            style={{ backgroundColor: avatar.outfitColor || '#0d9488' }}
          >
            🧙
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">{rank}</span>
              <span className="text-slate-400 text-xs">• Level {level}</span>
            </div>
            <h2 className="text-2xl font-black text-white font-heading">{avatar.title || 'Language Mage'}</h2>
            <div className="text-xs text-slate-400">
              Partner Companion: <strong className="text-white capitalize">{assignedCompanion}</strong>
            </div>
          </div>
        </div>

        {/* Currency & Level XP */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Lexicon Runes</div>
            <div className="text-lg font-black text-amber-400 font-mono">⚡ {lexiconRunes}</div>
          </div>
          <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 min-w-36">
            <div className="text-[10px] text-slate-400 uppercase font-bold flex justify-between">
              <span>Next Level</span>
              <span className="text-cyan-400 font-mono">{xp} / {xpToNextLevel} XP</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-1.5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-amber-500 rounded-full"
                style={{ width: `${(xp / xpToNextLevel) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={onOpenCharacterCreator}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition"
        >
          Customize Avatar & Robes
        </button>
        <button
          onClick={onOpenCompanionHub}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 transition"
        >
          Companion Hub ({assignedCompanion})
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 mt-6 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-thin flex-nowrap">
        <button
          onClick={() => setActiveTab('grimoire')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
            activeTab === 'grimoire'
              ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          1. Quest Grimoire ({activeQuests.length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
            activeTab === 'inventory'
              ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          2. Inventory & Runes
        </button>
        <button
          onClick={() => setActiveTab('pets')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
            activeTab === 'pets'
              ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          3. Familiar Pets ({pets.length})
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
            activeTab === 'achievements'
              ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          4. Literacy Achievements
        </button>
      </div>

      {/* Tab 1: Quest Grimoire */}
      {activeTab === 'grimoire' && (
        <div className="mt-6 space-y-3">
          {activeQuests.map((quest) => (
            <div
              key={quest.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {quest.curriculumCategory}
                  </span>
                  <span className="text-[10px] text-slate-500">• Realm: {quest.realm.replace('_', ' ')}</span>
                </div>
                <div className="text-sm font-bold text-white mt-0.5">{quest.title}</div>
                <p className="text-xs text-slate-400 mt-1">{quest.description}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-bold text-amber-300">+{quest.xpReward} XP</span>
                <span className="text-xs font-bold text-cyan-300">+{quest.runesReward} Runes</span>
                {quest.completed ? (
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                    Completed ✓
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold text-xs">
                    In Progress
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Inventory */}
      {activeTab === 'inventory' && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {inventoryItems.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">{item.name}</div>
                <div className="text-[10px] text-slate-400">{item.type}</div>
              </div>
              <span className="text-base font-black text-amber-400 font-mono">x{item.count}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Familiar Pets */}
      {activeTab === 'pets' && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pets.map((pet, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center text-center">
              <div className="text-4xl mb-2">{pet.icon}</div>
              <div className="text-sm font-bold text-white">{pet.name}</div>
              <div className="text-xs text-amber-300 mt-0.5">{pet.type}</div>
              <div className="text-[10px] text-slate-400 mt-1">Origin: {pet.element}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Achievements */}
      {activeTab === 'achievements' && (
        <div className="mt-6 space-y-3">
          {achievements.map((ach, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-white">{ach.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{ach.desc}</div>
              </div>
              <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded bg-emerald-950/40 border border-emerald-800/40">
                {ach.date}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
