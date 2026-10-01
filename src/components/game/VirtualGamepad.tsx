// PHONIXIA - On-Screen Virtual Touch Gamepad for Phone & Tablet Play
// 5-Key WASD + Dedicated Spacebar / Jump Unit (Left-side arcade controller)

import React, { useState } from 'react';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Gamepad2,
  X,
} from 'lucide-react';

interface VirtualGamepadProps {
  onMove: (dx: number, dy: number, direction: 'left' | 'right' | 'up' | 'down') => void;
  onJump: () => void; // 5th Key: Spacebar / Jump
  onActionA?: () => void;
  onActionS?: () => void;
  onActionC?: () => void;
  onActionM?: () => void;
}

export const VirtualGamepad: React.FC<VirtualGamepadProps> = ({
  onMove,
  onJump,
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const step = 32;

  const handleDpadPress = (dx: number, dy: number, dir: 'left' | 'right' | 'up' | 'down') => {
    phonemeAudio.playCompanionChime();
    onMove(dx * step, dy * step, dir);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-30 pointer-events-auto">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-amber-500/40 text-amber-400 text-xs font-bold shadow-xl backdrop-blur-md hover:bg-slate-800 transition active:scale-95"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Show WASD Pad</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-30 pointer-events-none flex flex-col items-start gap-1.5">
      {/* Minimize Toggle Header */}
      <div className="pointer-events-auto">
        <button
          onClick={() => setIsMinimized(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white text-[10px] backdrop-blur-md shadow transition"
          title="Minimize on-screen gamepad"
        >
          <X className="w-3 h-3" />
          <span>Hide Keypad</span>
        </button>
      </div>

      {/* 5-Key Pad: WASD + SPACE / JUMP */}
      <div className="pointer-events-auto bg-slate-950/90 backdrop-blur-md p-3.5 rounded-3xl border-2 border-amber-500/40 shadow-2xl flex flex-col items-center">
        <div className="text-[10px] font-black uppercase tracking-wider text-amber-400 mb-2 select-none flex items-center gap-1.5">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>WASD + SPACE (5 KEYS)</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 w-32 h-32 items-center justify-center">
          {/* Row 1: Up (W) */}
          <div />
          <button
            onClick={() => handleDpadPress(0, -1, 'up')}
            className="w-10 h-10 rounded-xl bg-slate-800/90 active:bg-amber-500 border-2 border-amber-500/30 active:border-amber-400 active:scale-90 text-white flex flex-col items-center justify-center shadow-lg transition font-black text-sm"
            aria-label="Move Up (W)"
          >
            <ChevronUp className="w-3.5 h-3.5 text-amber-400 -mb-1" />
            <span>W</span>
          </button>
          <div />

          {/* Row 2: Left (A), Jump (Center 5th Key), Right (D) */}
          <button
            onClick={() => handleDpadPress(-1, 0, 'left')}
            className="w-10 h-10 rounded-xl bg-slate-800/90 active:bg-amber-500 border-2 border-amber-500/30 active:border-amber-400 active:scale-90 text-white flex flex-col items-center justify-center shadow-lg transition font-black text-sm"
            aria-label="Move Left (A)"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-amber-400 -mb-1" />
            <span>A</span>
          </button>

          {/* 5th Key: Center Jump / Space Button */}
          <button
            onClick={() => {
              phonemeAudio.playMagicCastSound();
              onJump();
            }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 active:from-amber-400 active:to-orange-400 border-2 border-yellow-300 text-slate-950 flex flex-col items-center justify-center shadow-lg shadow-amber-500/30 transition active:scale-90 font-black cursor-pointer"
            aria-label="Jump (Space Key)"
            title="Spacebar / Jump (5th Key)"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span className="text-[8px] font-black tracking-tighter -mt-0.5 leading-none">JUMP</span>
          </button>

          <button
            onClick={() => handleDpadPress(1, 0, 'right')}
            className="w-10 h-10 rounded-xl bg-slate-800/90 active:bg-amber-500 border-2 border-amber-500/30 active:border-amber-400 active:scale-90 text-white flex flex-col items-center justify-center shadow-lg transition font-black text-sm"
            aria-label="Move Right (D)"
          >
            <ChevronRight className="w-3.5 h-3.5 text-amber-400 -mb-1" />
            <span>D</span>
          </button>

          {/* Row 3: Down (S) */}
          <div />
          <button
            onClick={() => handleDpadPress(0, 1, 'down')}
            className="w-10 h-10 rounded-xl bg-slate-800/90 active:bg-amber-500 border-2 border-amber-500/30 active:border-amber-400 active:scale-90 text-white flex flex-col items-center justify-center shadow-lg transition font-black text-sm"
            aria-label="Move Down (S)"
          >
            <span>S</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-400 -mt-1" />
          </button>
          <div />
        </div>

        {/* Dedicated Spacebar Jump Bar */}
        <button
          onClick={() => {
            phonemeAudio.playMagicCastSound();
            onJump();
          }}
          className="w-full mt-2.5 py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/25 via-orange-500/35 to-amber-500/25 hover:from-amber-500/40 hover:to-orange-500/50 active:bg-amber-500 active:text-slate-950 border border-amber-400/60 text-amber-300 active:scale-95 transition text-[10px] font-black tracking-wider flex items-center justify-center gap-1.5 shadow"
          title="Spacebar: Jump / Leap"
        >
          <span>␣ SPACEBAR (JUMP)</span>
        </button>
      </div>
    </div>
  );
};
