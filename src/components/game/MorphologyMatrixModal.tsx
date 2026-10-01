// PHONIXIA - Morphology Matrix Modal (Lexicon Empire)
// Greek and Latin Root Alchemical Synthesizer

import React, { useState } from 'react';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import { GameInstructionBanner } from '../common/GameInstructionBanner';
import { Sparkles, BookOpen, KeyRound, CheckCircle2, X } from 'lucide-react';

interface MorphologyMatrixModalProps {
  assignedCompanion: 'kam' | 'celine';
  onClose: () => void;
  onSuccess: (xp: number, runes: number) => void;
}

export const MorphologyMatrixModal: React.FC<MorphologyMatrixModalProps> = ({
  assignedCompanion,
  onClose,
  onSuccess,
}) => {
  const rootPieces = [
    { id: 'tele', form: 'tele', meaning: 'distant / across space', origin: 'Greek', type: 'prefix' },
    { id: 'graph', form: 'graph', meaning: 'to write / record', origin: 'Greek', type: 'root' },
    { id: 'bio', form: 'bio', meaning: 'life / living', origin: 'Greek', type: 'root' },
    { id: 'scope', form: 'scope', meaning: 'to view / examine', origin: 'Greek', type: 'root' },
    { id: 'port', form: 'port', meaning: 'to carry', origin: 'Latin', type: 'root' },
  ];

  const [selectedRoots, setSelectedRoots] = useState<string[]>([]);
  const [succeeded, setSucceeded] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>(
    assignedCompanion === 'celine'
      ? 'Celine: "The Arch of Roots guards the Imperial Archive. Combine \'tele\' (distant) with \'graph\' (write) to synthesize the ancient transmitter spell!"'
      : 'Kam: "Check out these ancient stone blocks! Combine the two Greek morphemes that create a word for writing across a distance!"'
  );

  const handleTogglePiece = (id: string) => {
    if (selectedRoots.includes(id)) {
      setSelectedRoots(selectedRoots.filter((r) => r !== id));
    } else {
      if (selectedRoots.length < 2) {
        setSelectedRoots([...selectedRoots, id]);
      }
    }
  };

  const handleSynthesize = () => {
    if (selectedRoots.includes('tele') && selectedRoots.includes('graph')) {
      setSucceeded(true);
      phonemeAudio.playMagicCastSound();
      setFeedback(
        'Celine: "EUREKA! \'tele\' (distant) + \'graph\' (write) = TELEGRAPH! The ancient communication gateway unlocks!"'
      );
      setTimeout(() => {
        onSuccess(400, 100);
      }, 1800);
    } else {
      phonemeAudio.playCompanionChime();
      setFeedback(
        'Celine: "Examine the meanings! We need a morpheme for \'distant\' and a morpheme for \'write\'. Read the etymological tags carefully."'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-yellow-500/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-slate-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400/40 flex items-center justify-center text-yellow-300">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Lexicon Empire • Arch of Roots
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white font-heading">
                Morphology Alchemical Synthesizer
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
          gameTitle="Arch of Morphemes"
          spokenPrompt="Runic gate ahead! Combine ancient Greek or Latin root stones to unlock the ancient portal!"
          targetObjective="Synthesize high-tier academic vocabulary from ancient root runes!"
          actionControl="Select 1 prefix + 1 root stone block, then hit Unlock Ancient Arch!"
          bossRule="Morphemes hold meaning across centuries! Combine roots like tele and graph."
          companionName={assignedCompanion === 'kam' ? 'Kam' : 'Celine'}
        />

        {/* Companion Guidance */}
        <div className="my-5 p-4 rounded-xl bg-slate-950/70 border border-yellow-500/30 flex items-start gap-3">
          <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white text-sm shrink-0 shadow">
            CEL
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-yellow-400">Celine (Morpheme Weaver)</div>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">{feedback}</p>
          </div>
        </div>

        {/* Morpheme Piece Selection Grid */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Available Ancient Greek & Latin Morphemes
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rootPieces.map((piece) => {
              const isSelected = selectedRoots.includes(piece.id);
              return (
                <button
                  key={piece.id}
                  onClick={() => handleTogglePiece(piece.id)}
                  className={`p-3.5 rounded-xl border text-left transition flex items-center justify-between ${
                    isSelected
                      ? 'border-yellow-400 bg-yellow-500/20 shadow-lg shadow-yellow-500/10'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-base font-black text-white font-mono">{piece.form}</div>
                    <div className="text-xs text-yellow-300 font-medium">{piece.meaning}</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase font-semibold">
                    {piece.origin}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Synthesizer Synthesis Action */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-300">
            Selected: <span className="font-mono font-bold text-yellow-300">{selectedRoots.join(' + ') || '(None)'}</span>
          </div>

          <button
            onClick={handleSynthesize}
            disabled={selectedRoots.length < 2 || succeeded}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg transition active:scale-95 disabled:opacity-50"
          >
            Unlock Ancient Morpheme Arch
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">Lexicon Empire • Advanced Root Synthesis</div>
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
