// PHONIXIA - Heart Word Altar (Tricky Trails)
// Science of Reading Orthographic Mapping of High-Frequency Irregular Words

import React, { useState } from 'react';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import { GameInstructionBanner } from '../common/GameInstructionBanner';
import { Sparkles, Heart, Compass, Volume2, CheckCircle2, X } from 'lucide-react';

interface HeartWordAltarModalProps {
  assignedCompanion: 'kam' | 'celine';
  wordData?: {
    word: string;
    parts: { text: string; sound: string; isHeart: boolean }[];
    explanation: string;
  };
  onClose: () => void;
  onSuccess: (xp: number, runes: number) => void;
}

export const HeartWordAltarModal: React.FC<HeartWordAltarModalProps> = ({
  assignedCompanion,
  wordData = {
    word: 'said',
    parts: [
      { text: 's', sound: '/s/ (regular continuous sound)', isHeart: false },
      { text: 'ai', sound: '/ɛ/ (tricky vowel sound spelled with "ai")', isHeart: true },
      { text: 'd', sound: '/d/ (regular voiced alveolar stop)', isHeart: false },
    ],
    explanation: 'In the word "SAID", the "s" and "d" make their regular sounds! Only the middle "ai" makes the short /ɛ/ sound, so we learn the "ai" part by heart!',
  },
  onClose,
  onSuccess,
}) => {
  const [selectedHeartPartIndex, setSelectedHeartPartIndex] = useState<number | null>(null);
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>(
    assignedCompanion === 'kam'
      ? 'Kam: "Tricky Trails ahead! Tap the letters in SAID. Which part does not follow regular rules? Place the Heart Rune there!"'
      : 'Celine: "Irregular words still follow logic. Two of these parts are completely regular; one is the heart part. Investigate each sound."'
  );

  const handleSelectPart = (index: number) => {
    const part = wordData.parts[index];
    setSelectedHeartPartIndex(index);

    if (part.isHeart) {
      setIsResolved(true);
      phonemeAudio.playMagicCastSound();
      setFeedback(
        assignedCompanion === 'kam'
          ? 'Kam: "BULLSEYE! The \'ai\' in SAID is the tricky heart part! The other sounds are completely regular! Word mapped!"'
          : 'Celine: "Splendid orthographic analysis! By anchoring the regular \'s\' and \'d\', our brain only has to remember the \'ai\' heart part!"'
      );
      setTimeout(() => {
        onSuccess(300, 75);
      }, 1800);
    } else {
      phonemeAudio.playCompanionChime();
      setFeedback(
        assignedCompanion === 'kam'
          ? `Kam: "Listen close: '${part.text}' actually makes its normal ${part.sound}! Look for the part that surprises your ears."`
          : `Celine: "'${part.text}' is a regular phoneme-grapheme match. Test the vowel sound in the middle!"`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-pink-500/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Tricky Trails • Heartwood Altar
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white font-heading">
                Orthographic Heart Word Mapping
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
          gameTitle="Heart Word Altar"
          spokenPrompt="Irregular spell detected! Inspect the regular sounds, then tap the tricky heart rune to lock it in!"
          targetObjective="Trap the irregular surprise letters and memorize them by heart!"
          actionControl="Tap sound boxes to test audio, then select the Heart Part to anchor!"
          bossRule="Most words are 80% regular! Only one or two tricky letters need heart power."
          companionName={assignedCompanion === 'kam' ? 'Kam' : 'Celine'}
        />

        {/* Companion Speech Bubble */}
        <div className="my-5 p-4 rounded-xl bg-slate-950/70 border border-pink-500/30 flex items-start gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0 shadow ${
              assignedCompanion === 'kam' ? 'bg-teal-600' : 'bg-purple-600'
            }`}
          >
            {assignedCompanion === 'kam' ? 'KAM' : 'CEL'}
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-pink-400">
              {assignedCompanion === 'kam' ? 'Kam (Companion Scout)' : 'Celine (Companion Scholar)'}
            </div>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">{feedback}</p>
          </div>
        </div>

        {/* Interactive Word Parts Altar */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 flex flex-col items-center">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Target Word: <span className="text-white text-sm font-black uppercase">"{wordData.word}"</span>
          </div>

          <div className="flex items-center gap-4">
            {wordData.parts.map((part, idx) => {
              const isSelected = selectedHeartPartIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectPart(idx)}
                  className={`w-24 h-28 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-200 relative group ${
                    isSelected && part.isHeart
                      ? 'border-pink-500 bg-pink-500/20 shadow-xl shadow-pink-500/30 scale-105'
                      : isSelected
                      ? 'border-amber-500 bg-amber-500/10'
                      : 'border-slate-700 bg-slate-900/60 hover:border-pink-400'
                  }`}
                >
                  <span className="text-3xl font-black text-white font-mono group-hover:scale-110 transition">
                    {part.text}
                  </span>

                  {/* Heart Marker if solved or selected correctly */}
                  {isSelected && part.isHeart && (
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white shadow-lg animate-bounce">
                      <Heart className="w-4 h-4 fill-white" />
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 mt-2 font-medium">
                    {part.isHeart && isSelected ? 'Heart Part!' : 'Test Sound'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 text-xs text-slate-400 text-center max-w-md">
            Click on the specific spelling chunk that must be remembered "by heart".
          </div>
        </div>

        {/* Explanation Card */}
        {isResolved && (
          <div className="mt-4 p-4 rounded-xl bg-pink-950/30 border border-pink-700/40 text-xs text-pink-200 space-y-2 animate-fade-in">
            <div className="font-bold text-pink-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-pink-400" />
              <span>Orthographic Mapping Certified:</span>
            </div>
            <p className="leading-relaxed">{wordData.explanation}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Tricky Trails • Evidence-Based Sight Word Architecture
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
          >
            Return to Trails
          </button>
        </div>
      </div>
    </div>
  );
};
