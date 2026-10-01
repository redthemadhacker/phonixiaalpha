// PHONIXIA - Blending Forge Modal
// Strict No-Hint System: Companion guided reinforcement & Science of Reading orthographic mapping

import React, { useState } from 'react';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import { GameInstructionBanner } from '../common/GameInstructionBanner';
import { Sparkles, Hammer, Volume2, ShieldCheck, X, ArrowRight, HeartHandshake } from 'lucide-react';

interface BlendingForgeModalProps {
  assignedCompanion: 'kam' | 'celine';
  targetWord?: {
    word: string;
    phonemes: string[]; // e.g. ['k', 'a', 't']
    meaning: string;
  };
  onClose: () => void;
  onSuccess: (xp: number, runes: number) => void;
}

export const BlendingForgeModal: React.FC<BlendingForgeModalProps> = ({
  assignedCompanion,
  targetWord = { word: 'CAT', phonemes: ['k', 'a', 't'], meaning: 'A nimble feline companion spell' },
  onClose,
  onSuccess,
}) => {
  // Available pool of phoneme runes
  const runePool = [
    { key: 'k', symbol: '/k/', label: 'c/k' },
    { key: 'a', symbol: '/æ/', label: 'a' },
    { key: 't', symbol: '/t/', label: 't' },
    { key: 'm', symbol: '/m/', label: 'm' },
    { key: 'p', symbol: '/p/', label: 'p' },
    { key: 's', symbol: '/s/', label: 's' },
  ];

  const [placedSlots, setPlacedSlots] = useState<(string | null)[]>([null, null, null]);
  const [companionMessage, setCompanionMessage] = useState<string>(
    assignedCompanion === 'kam'
      ? 'Kam: "Welcome to the Syllable Anvil! Place the pure phonemes into the sound boxes from left to right. No shortcuts here—we forge mastery!"'
      : 'Celine: "Welcome to the Forge of Blends! Let us assemble each grapheme to build this ancient word. Listen to the vowels and consonants carefully."'
  );
  const [showCompanionMiniGame, setShowCompanionMiniGame] = useState<boolean>(false);
  const [blendSucceeded, setBlendSucceeded] = useState<boolean>(false);

  // Play individual phoneme
  const handleHearPhoneme = (key: string) => {
    phonemeAudio.playPhoneme(key);
  };

  // Place rune in first empty slot
  const handleSelectRune = (runeKey: string) => {
    phonemeAudio.playPhoneme(runeKey);
    const firstEmptyIndex = placedSlots.indexOf(null);
    if (firstEmptyIndex !== -1) {
      const updated = [...placedSlots];
      updated[firstEmptyIndex] = runeKey;
      setPlacedSlots(updated);
    }
  };

  // Remove rune from slot
  const handleRemoveSlot = (index: number) => {
    const updated = [...placedSlots];
    updated[index] = null;
    setPlacedSlots(updated);
  };

  // Clear all slots
  const handleResetSlots = () => {
    setPlacedSlots([null, null, null]);
  };

  // Test the blend (Science of Reading continuous sweep)
  const handleTestBlend = () => {
    if (placedSlots.some((slot) => slot === null)) {
      setCompanionMessage(
        assignedCompanion === 'kam'
          ? 'Kam: "We need all three sound boxes filled before we strike the anvil! Fill every slot."'
          : 'Celine: "Every sound box requires a phoneme before the spell can resonate. Let us fill the open slots."'
      );
      return;
    }

    const currentKeys = placedSlots as string[];
    // Play acoustic continuous sweep
    phonemeAudio.playBlendingSweep(currentKeys);

    // Check if matches target
    const isCorrect = currentKeys.every((k, idx) => k === targetWord.phonemes[idx]);

    if (isCorrect) {
      setBlendSucceeded(true);
      phonemeAudio.playMagicCastSound();
      setCompanionMessage(
        assignedCompanion === 'kam'
          ? `Kam: "BOOM! Look at that spark! /k/ + /æ/ + /t/ = CAT! The spell is forged into your grimoire!"`
          : `Celine: "Magnificent! You mapped the initial consonant, short vowel, and final stop perfectly into memory!"`
      );
      setTimeout(() => {
        onSuccess(250, 60);
      }, 1600);
    } else {
      // STRICT NO HINTS: Never reveal the answer. Offer companion reinforcement exploration!
      phonemeAudio.playCompanionChime();
      setCompanionMessage(
        assignedCompanion === 'kam'
          ? 'Kam: "Listen to the resonance! That combination sounds different than our target. Let\'s tap the Sound Isolation Review to practice the initial sound together!"'
          : 'Celine: "Notice the acoustic contrast! Language is shaped by precision. Would you like to do a companion sound-contrast drill to calibrate your ear?"'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Hammer className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Builders Guild • Anvil of Blends
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white font-heading">
                Spell of Blending: Forge Word Runes
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Punchy Arcade Directive HUD */}
        <GameInstructionBanner
          gameTitle="Anvil of Blends"
          spokenPrompt="Anvil hot! Slot the phoneme runes left-to-right, then smash the hammer to forge the spell!"
          targetObjective="Forge the continuous word spell from onset to vowel and rime!"
          actionControl="Tap runes into Elkonin boxes, then smash Hammer to blend!"
          bossRule="Follow the arrow trail! Always map sounds left-to-right without pauses."
          companionName={assignedCompanion === 'kam' ? 'Kam' : 'Celine'}
        />

        {/* Companion Guidance Speech Bubble (Adaptive, No Hints) */}
        <div className="my-5 p-4 rounded-xl bg-slate-950/70 border border-amber-500/30 flex items-start gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0 shadow ${
              assignedCompanion === 'kam' ? 'bg-teal-600' : 'bg-purple-600'
            }`}
          >
            {assignedCompanion === 'kam' ? 'KAM' : 'CEL'}
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-amber-400">
              {assignedCompanion === 'kam' ? 'Kam (Companion Scout)' : 'Celine (Companion Scholar)'}
            </div>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">{companionMessage}</p>
          </div>
        </div>

        {/* Elkonin Sound Boxes (Orthographic Mapping Matrix) */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col items-center">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Elkonin Sound Boxes (Left-to-Right Phonemic Sequence)
          </div>

          <div className="flex items-center gap-4">
            {placedSlots.map((slotKey, index) => {
              const phoneme = slotKey ? phonemeAudio.PHONEME_REGISTRY[slotKey] : null;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    onClick={() => slotKey && handleRemoveSlot(index)}
                    className={`w-24 h-28 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 relative ${
                      slotKey
                        ? 'border-amber-400 bg-amber-500/15 shadow-lg shadow-amber-500/10 hover:border-red-400'
                        : 'border-dashed border-slate-700 bg-slate-900/50 hover:border-slate-500'
                    }`}
                  >
                    {slotKey && phoneme ? (
                      <>
                        <span className="text-3xl font-black text-amber-300 font-mono">
                          {phoneme.symbol}
                        </span>
                        <span className="text-xs font-bold text-white uppercase mt-1">
                          {slotKey}
                        </span>
                        <div className="absolute top-1.5 right-1.5 text-[9px] text-slate-500">✕</div>
                      </>
                    ) : (
                      <span className="text-xs font-bold text-slate-600">Box {index + 1}</span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1.5 font-medium">
                    {index === 0 ? 'Initial Sound' : index === 1 ? 'Medial Vowel' : 'Final Sound'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Sound Sweep Controls */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleTestBlend}
              disabled={blendSucceeded}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 transition active:scale-95 disabled:opacity-50"
            >
              <Volume2 className="w-5 h-5 stroke-[2.5]" />
              <span>Strike Anvil & Continuous Blend</span>
            </button>

            <button
              onClick={handleResetSlots}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
            >
              Clear Slots
            </button>
          </div>
        </div>

        {/* Available Phoneme Runes Pool */}
        <div className="mt-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Available Phoneme Runes (Click to place in sound box)
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {runePool.map((rune) => (
              <div
                key={rune.key}
                className="bg-slate-800/80 border border-slate-700 hover:border-amber-400 rounded-xl p-3 flex flex-col items-center justify-between transition group shadow hover:shadow-md"
              >
                <button
                  onClick={() => handleSelectRune(rune.key)}
                  className="w-full flex flex-col items-center"
                >
                  <span className="text-xl font-black text-amber-300 font-mono group-hover:scale-110 transition">
                    {rune.symbol}
                  </span>
                  <span className="text-xs font-bold text-white uppercase mt-0.5">{rune.label}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHearPhoneme(rune.key);
                  }}
                  className="mt-2 p-1 text-slate-400 hover:text-cyan-300 rounded transition"
                  title="Hear pure phoneme sound"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Strict No-Hint Companion Support Drill Drawer */}
        {!blendSucceeded && (
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              <span>Stuck? Companions help with practice drills, never answer giveaways.</span>
            </div>

            <button
              onClick={() => {
                setShowCompanionMiniGame(!showCompanionMiniGame);
                phonemeAudio.playPhoneme('k');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold transition flex items-center gap-2"
            >
              <span>Launch Companion Acoustic Drill</span>
            </button>
          </div>
        )}

        {/* Companion Practice Drill Modal / Subview */}
        {showCompanionMiniGame && (
          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-cyan-500/40 text-xs space-y-3">
            <div className="font-bold text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Companion Sound-Contrast Exploration</span>
            </div>
            <p className="text-slate-300">
              Notice the contrast between the /k/ stop sound (back of the tongue taps the soft palate) and the /s/ continuous sound (teeth close, gentle hiss). Tap each below to train your phonological ear:
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => phonemeAudio.playPhoneme('k')}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
              >
                Hear /k/ (Stop sound)
              </button>
              <button
                onClick={() => phonemeAudio.playPhoneme('s')}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
              >
                Hear /s/ (Continuous sound)
              </button>
              <button
                onClick={() => phonemeAudio.playPhoneme('a')}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
              >
                Hear /æ/ (Short A)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
