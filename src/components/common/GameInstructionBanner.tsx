// PHONIXIA - Video Game Style Quest Directive HUD
// Replaces sterile educational 1. 2. 3. steps with high-energy arcade gaming directives
// Auto-speaks on entry + prominent Repeat Prompt (🔊) button

import React, { useEffect } from 'react';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import { Volume2, Sparkles, Target, Zap, ShieldAlert, Crosshair } from 'lucide-react';

interface GameInstructionBannerProps {
  gameTitle: string;
  spokenPrompt: string;
  targetObjective: string; // Punchy 1-sentence game goal
  actionControl: string;   // How to play with buttons / taps
  bossRule?: string;       // Crucial rule (e.g. No schwa sound!)
  companionName?: string;
  // Backward compatibility
  steps?: string[];
  tips?: string;
}

export const GameInstructionBanner: React.FC<GameInstructionBannerProps> = ({
  gameTitle,
  spokenPrompt,
  targetObjective,
  actionControl,
  bossRule,
  companionName = 'Kam',
  steps,
  tips,
}) => {
  // Auto read-aloud spoken instructions on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      phonemeAudio.speakInstruction(spokenPrompt);
    }, 250);

    return () => clearTimeout(timer);
  }, [spokenPrompt]);

  const handleRepeatPrompt = () => {
    phonemeAudio.playCompanionChime();
    phonemeAudio.speakInstruction(spokenPrompt);
  };

  // Derive objective & controls if passed via legacy steps array
  const displayObjective = targetObjective || (steps && steps[0]) || 'Master the target spell!';
  const displayControls = actionControl || (steps && steps.slice(1).join(' • ')) || 'Tap runes to cast!';
  const displayRule = bossRule || tips || 'Execute with pure precision!';

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-amber-500/50 rounded-2xl p-3.5 my-3 text-slate-100 shadow-2xl relative overflow-hidden">
      {/* Decorative corner gamer glows */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Top HUD Row */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow flex items-center gap-1">
            <Zap className="w-3 h-3 fill-current" />
            <span>QUEST DIRECTIVE</span>
          </div>
          <span className="font-heading font-black text-sm text-white tracking-wide">
            {gameTitle}
          </span>
        </div>

        {/* Repeat Voice Prompt Button */}
        <button
          type="button"
          onClick={handleRepeatPrompt}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-black text-xs shadow-md transition shrink-0"
          title="Repeat spoken instructions aloud"
        >
          <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Repeat Voice (🔊)</span>
        </button>
      </div>

      {/* Punchy Arcade Directive Badges (No 1. 2. 3. textbook list!) */}
      <div className="mt-2.5 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
        {/* Target Objective */}
        <div className="p-2 rounded-xl bg-slate-950/70 border border-amber-500/30 flex items-start gap-2">
          <Target className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-300">
              MISSION GOAL
            </div>
            <div className="text-slate-200 font-medium text-[11px] leading-snug">
              {displayObjective}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-2 rounded-xl bg-slate-950/70 border border-cyan-500/30 flex items-start gap-2">
          <Crosshair className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-cyan-300">
              ACTION CONTROLS
            </div>
            <div className="text-slate-200 font-medium text-[11px] leading-snug">
              {displayControls}
            </div>
          </div>
        </div>
      </div>

      {/* Critical Boss Rule / Companion Tip */}
      <div className="mt-2 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-amber-300 font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>RULE:</span>
          <span className="font-normal text-amber-100">{displayRule}</span>
        </div>
        <span className="text-[10px] text-amber-400/80 font-mono hidden sm:inline">
          {companionName}'s Codex
        </span>
      </div>
    </div>
  );
};
