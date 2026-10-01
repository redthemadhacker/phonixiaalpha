// PHONIXIA - Montessori Sensorial Mode
// Authentic Montessori Integration: Movable Alphabet (Red Vowels, Blue Consonants) & 3-Part Cards

import React, { useState } from 'react';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import { GameInstructionBanner } from '../common/GameInstructionBanner';
import { Sparkles, Palette, Layers, CheckCircle2, RotateCcw, X } from 'lucide-react';

interface MontessoriSensorialModalProps {
  onClose: () => void;
}

export const MontessoriSensorialModal: React.FC<MontessoriSensorialModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'movable_alphabet' | 'three_part_cards' | 'sandpaper_trace'>('movable_alphabet');

  // Movable Alphabet State
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  const [builtLetters, setBuiltLetters] = useState<string[]>([]);

  // 3-Part Cards State
  const [cardsMatched, setCardsMatched] = useState<boolean>(false);
  const [showControlOfError, setShowControlOfError] = useState<boolean>(false);

  const handleAddLetter = (letter: string) => {
    phonemeAudio.playPhoneme(letter);
    setBuiltLetters((prev) => [...prev, letter]);
  };

  const handleClear = () => {
    setBuiltLetters([]);
  };

  const handleVerifyWord = () => {
    if (builtLetters.length > 0) {
      phonemeAudio.playBlendingSweep(builtLetters);
      phonemeAudio.playMagicCastSound();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Montessori Sensorial Learning Pavilion
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white font-heading">
                Self-Directed Sensory & Orthographic Mastery
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
          gameTitle="Sensorial Pavilion"
          spokenPrompt="Movable Alphabet ready! Build spells on your wooden work mat and flip the control card to verify!"
          targetObjective="Freely assemble words using red vowel and blue consonant wooden runes!"
          actionControl="Tap red vowels & blue consonants to place on work mat; flip Control Card to check!"
          bossRule="Self-correcting mastery unlocks highest rank with zero penalty!"
          companionName="Celine"
        />

        {/* Tab navigation */}
        <div className="flex items-center gap-2 mt-4 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('movable_alphabet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'movable_alphabet'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            1. Authentic Movable Alphabet (Red/Blue)
          </button>
          <button
            onClick={() => setActiveTab('three_part_cards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'three_part_cards'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            2. Three-Part Cards (Control of Error)
          </button>
          <button
            onClick={() => setActiveTab('sandpaper_trace')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'sandpaper_trace'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            3. Sandpaper Letter Sensorial Trace
          </button>
        </div>

        {/* Tab 1: Movable Alphabet */}
        {activeTab === 'movable_alphabet' && (
          <div className="mt-4 space-y-6">
            <div className="text-xs text-slate-300 leading-relaxed bg-emerald-950/20 p-3 rounded-xl border border-emerald-800/30">
              <span className="font-bold text-emerald-300">Montessori Principle: </span>
              Vowels are distinguished in <span className="text-red-400 font-bold">Red</span> and consonants in{' '}
              <span className="text-sky-400 font-bold">Blue</span>. The child independently composes words before and during reading.
            </div>

            {/* Wooden Mat / Word Construction Rug */}
            <div className="bg-amber-950/30 border-2 border-amber-800/40 rounded-2xl p-6 min-h-36 flex flex-col items-center justify-center relative shadow-inner">
              <div className="text-[10px] uppercase font-bold tracking-widest text-amber-500/80 absolute top-3 left-4">
                Montessori Work Mat
              </div>

              {builtLetters.length === 0 ? (
                <div className="text-slate-500 text-xs italic">
                  Tap letters below to arrange words on your work mat...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {builtLetters.map((l, idx) => {
                    const isVowel = vowels.includes(l);
                    return (
                      <div
                        key={idx}
                        className={`w-16 h-20 rounded-xl flex items-center justify-center text-4xl font-serif font-black shadow-lg transition-transform hover:scale-105 ${
                          isVowel
                            ? 'bg-red-500/20 text-red-400 border-2 border-red-500/60'
                            : 'bg-sky-500/20 text-sky-400 border-2 border-sky-500/60'
                        }`}
                      >
                        {l}
                      </div>
                    );
                  })}
                </div>
              )}

              {builtLetters.length > 0 && (
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={handleVerifyWord}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition"
                  >
                    Blend & Auditory Sweep
                  </button>
                  <button
                    onClick={handleClear}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear Mat</span>
                  </button>
                </div>
              )}
            </div>

            {/* Movable Letter Compartments */}
            <div className="space-y-4">
              {/* Red Vowels */}
              <div>
                <div className="text-xs font-bold text-red-400 mb-2">Vowels (Red Compartment)</div>
                <div className="flex gap-2">
                  {vowels.map((v) => (
                    <button
                      key={v}
                      onClick={() => handleAddLetter(v)}
                      className="w-12 h-14 rounded-xl bg-red-950/40 border-2 border-red-500/60 text-red-300 text-2xl font-serif font-bold hover:scale-110 active:scale-95 transition shadow"
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blue Consonants */}
              <div>
                <div className="text-xs font-bold text-sky-400 mb-2">Consonants (Blue Compartment)</div>
                <div className="flex flex-wrap gap-2">
                  {consonants.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleAddLetter(c)}
                      className="w-12 h-14 rounded-xl bg-sky-950/40 border-2 border-sky-500/60 text-sky-300 text-2xl font-serif font-bold hover:scale-110 active:scale-95 transition shadow"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Three-Part Cards */}
        {activeTab === 'three_part_cards' && (
          <div className="mt-4 space-y-6">
            <div className="text-xs text-slate-300 bg-emerald-950/20 p-3 rounded-xl border border-emerald-800/30">
              <span className="font-bold text-emerald-300">Control of Error: </span>
              The child pairs the muted picture card with the word card, then flips the "Control Card" to self-correct without adult intervention.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Picture Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col items-center">
                <div className="text-xs font-bold text-slate-400 mb-3">1. Picture Card (Sensorial)</div>
                <div className="w-36 h-36 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-4xl shadow">
                  🌊
                </div>
                <div className="text-xs text-slate-400 mt-3 italic">"Tidepool Shell"</div>
              </div>

              {/* Card 2: Label Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col items-center">
                <div className="text-xs font-bold text-slate-400 mb-3">2. Word Label Card</div>
                <div className="w-36 h-36 rounded-xl bg-slate-900 border-2 border-dashed border-emerald-500/40 flex flex-col items-center justify-center p-3">
                  <div className="text-2xl font-bold font-serif text-white">SHELL</div>
                  <div className="text-[10px] text-slate-400 mt-1">/ʃ/ /ɛ/ /l/</div>
                </div>
                <button
                  onClick={() => {
                    setCardsMatched(true);
                    phonemeAudio.playPhoneme('sh');
                  }}
                  className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  Pair Label
                </button>
              </div>

              {/* Card 3: Control of Error Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col items-center">
                <div className="text-xs font-bold text-slate-400 mb-3">3. Control of Error Card</div>
                {showControlOfError ? (
                  <div className="w-36 h-36 rounded-xl bg-emerald-950/40 border-2 border-emerald-500 flex flex-col items-center justify-center p-2 text-center animate-flip">
                    <div className="text-3xl">🌊</div>
                    <div className="text-lg font-bold font-serif text-emerald-300 mt-1">SHELL</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">Control Verified ✓</div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowControlOfError(true)}
                    className="w-36 h-36 rounded-xl bg-slate-900 border border-slate-700 flex flex-col items-center justify-center p-3 text-slate-400 hover:text-white hover:border-slate-500 transition"
                  >
                    <span className="text-xs font-bold">Flip Control Card</span>
                    <span className="text-[10px] text-slate-500 mt-1">(Self-Correction)</span>
                  </button>
                )}
                {showControlOfError && (
                  <div className="text-xs text-emerald-400 mt-3 font-bold">100% Match!</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Sandpaper Trace */}
        {activeTab === 'sandpaper_trace' && (
          <div className="mt-4 space-y-6">
            <div className="text-xs text-slate-300 bg-emerald-950/20 p-3 rounded-xl border border-emerald-800/30">
              <span className="font-bold text-emerald-300">Tactile Memory: </span>
              Sandpaper letters engage the tactile, visual, and muscular memory simultaneously while pronouncing the isolated phoneme.
            </div>

            <div className="bg-amber-950/40 border-2 border-amber-700/50 rounded-2xl p-8 flex flex-col items-center justify-center">
              <div
                onClick={() => phonemeAudio.playPhoneme('m')}
                className="w-64 h-64 rounded-2xl bg-amber-900/60 border-4 border-amber-600 shadow-2xl flex flex-col items-center justify-center cursor-pointer transition hover:scale-105 active:scale-95 group relative"
              >
                <div className="text-8xl font-serif font-black text-amber-200 group-hover:text-amber-100 drop-shadow-md select-none">
                  m
                </div>
                <div className="text-xs text-amber-300/80 font-bold mt-2">
                  Tap to Trace & Sound /m/
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-4 text-center max-w-sm">
                Trace from top down, hum the continuous nasal /m/ through your nose.
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">Montessori Autonomy • Science of Reading Rigor</div>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
