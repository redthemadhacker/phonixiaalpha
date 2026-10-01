// PHONIXIA - Kam & Celine Companion Hub & Bond Progression System

import React, { useState } from 'react';
import { COMPANION_KAM, COMPANION_CELINE } from '../../services/mockGameData';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import { Sparkles, Heart, Shield, BookOpen, Volume2, Award, RefreshCw, X, MessageSquare } from 'lucide-react';

interface CompanionDrawerProps {
  currentCompanionId: 'kam' | 'celine';
  onSwitchCompanion: (id: 'kam' | 'celine') => void;
  onClose: () => void;
  onLaunchReviewMission: (missionType: string) => void;
}

export const CompanionDrawer: React.FC<CompanionDrawerProps> = ({
  currentCompanionId,
  onSwitchCompanion,
  onClose,
  onLaunchReviewMission,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'bond_skills' | 'review_missions'>('profile');
  const [companionSaying, setCompanionSaying] = useState<string | null>(null);

  const companion = currentCompanionId === 'kam' ? COMPANION_KAM : COMPANION_CELINE;

  const handleSpeak = (type: keyof typeof companion.supportDialogue) => {
    phonemeAudio.playCompanionChime();
    setCompanionSaying(companion.supportDialogue[type]);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l-2 border-amber-500/40 shadow-2xl p-6 text-slate-100 flex flex-col justify-between overflow-y-auto">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg ${
                companion.id === 'kam' ? 'bg-teal-600' : 'bg-purple-600'
              }`}
            >
              {companion.id === 'kam' ? 'KAM' : 'CEL'}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Permanent Franchise Companion
              </div>
              <h2 className="text-xl font-black text-white font-heading">{companion.name}</h2>
              <div className="text-xs text-slate-400">{companion.title}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Switch Companion Partner Toggle */}
        <div className="mt-4 p-1.5 bg-slate-950 rounded-xl flex items-center gap-1 border border-slate-800">
          <button
            onClick={() => {
              onSwitchCompanion('kam');
              phonemeAudio.playCompanionChime();
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
              currentCompanionId === 'kam'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Kam (Echo Scout)</span>
          </button>
          <button
            onClick={() => {
              onSwitchCompanion('celine');
              phonemeAudio.playCompanionChime();
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
              currentCompanionId === 'celine'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Celine (Lexicon Scholar)</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mt-4 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'profile' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Lore & Bond
          </button>
          <button
            onClick={() => setActiveTab('bond_skills')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'bond_skills' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Abilities & Gear
          </button>
          <button
            onClick={() => setActiveTab('review_missions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'review_missions' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Review Missions
          </button>
        </div>

        {/* Active Speech Box */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 relative">
          <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <MessageSquare className="w-3 h-3" />
            Companion Voice Line
          </div>
          <p className="text-xs text-slate-200 italic leading-relaxed">
            "{companionSaying || companion.catchphrase}"
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => handleSpeak('greeting')}
              className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Greeting
            </button>
            <button
              onClick={() => handleSpeak('practiceEncouragement')}
              className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Support Tip
            </button>
            <button
              onClick={() => handleSpeak('masteryCelebration')}
              className="text-[10px] px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              Celebration
            </button>
          </div>
        </div>

        {/* Tab 1: Profile & Lore */}
        {activeTab === 'profile' && (
          <div className="mt-4 space-y-4">
            {/* Bond Level Bar */}
            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-amber-400" />
                  Companion Bond Level {companion.bondLevel}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">{companion.bondXp} / 2500 XP</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                  style={{ width: `${(companion.bondXp / 2500) * 100}%` }}
                />
              </div>
            </div>

            {/* Lore Summary */}
            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-300">Franchise History & Lore</div>
              <p className="text-xs text-slate-400 leading-relaxed">{companion.lore}</p>
            </div>

            {/* Personality Traits */}
            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-slate-300">Companion Archetype</div>
              <p className="text-xs text-slate-400">{companion.personality}</p>
            </div>
          </div>
        )}

        {/* Tab 2: Abilities & Gear */}
        {activeTab === 'bond_skills' && (
          <div className="mt-4 space-y-4">
            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Special Ability: {companion.specialAbility}
              </div>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {companion.specialAbilityDesc}
              </p>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
              <div className="text-xs font-bold text-slate-300 mb-2">Unlocked Companion Outfits</div>
              <div className="space-y-1.5">
                {companion.unlockedOutfits.map((outfit) => (
                  <div
                    key={outfit}
                    className={`p-2 rounded-lg text-xs flex items-center justify-between border ${
                      companion.currentOutfit === outfit
                        ? 'border-amber-400 bg-amber-500/10 text-white font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <span>{outfit}</span>
                    {companion.currentOutfit === outfit && (
                      <span className="text-[10px] text-amber-400 uppercase font-black">Equipped</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Review Missions (No Hints Policy) */}
        {activeTab === 'review_missions' && (
          <div className="mt-4 space-y-3">
            <div className="text-xs text-slate-400 leading-relaxed bg-amber-950/20 p-3 rounded-xl border border-amber-800/30">
              <span className="font-bold text-amber-400">Adaptive Reinforcement: </span>
              If you struggle with a word or phoneme, {companion.name} invites you on a review mission to build muscle memory and acoustic accuracy without giving away answers!
            </div>

            <button
              onClick={() => onLaunchReviewMission('pure_phonemes')}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400 text-left transition group"
            >
              <div className="text-xs font-bold text-white group-hover:text-cyan-300">
                1. Pure Phoneme Isolation Drill
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Tune your ear to /æ/, /b/, and /t/ without schwa distortion.
              </div>
            </button>

            <button
              onClick={() => onLaunchReviewMission('blending')}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-left transition group"
            >
              <div className="text-xs font-bold text-white group-hover:text-amber-300">
                2. Continuous Sweep Practice
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Connect individual sounds smoothly into word units.
              </div>
            </button>

            <button
              onClick={() => onLaunchReviewMission('roots')}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-yellow-400 text-left transition group"
            >
              <div className="text-xs font-bold text-white group-hover:text-yellow-300">
                3. Root & Affix Investigation
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Dissect Greek and Latin morphemes for deeper comprehension.
              </div>
            </button>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
        Permanent Mascots of the Phonixia Universe
      </div>
    </div>
  );
};
