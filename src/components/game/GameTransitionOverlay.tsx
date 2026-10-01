// PHONIXIA - Full Screen Arcade / RPG Transition Animation
// Provides cinematic realm warp, mission start leap, and archive access transitions

import React, { useEffect, useState } from 'react';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import { Sparkles, Zap, Compass, Shield, Rocket } from 'lucide-react';

export type TransitionType = 'mission_start' | 'realm_warp' | 'dashboard_access';

interface GameTransitionOverlayProps {
  active: boolean;
  type: TransitionType;
  title: string;
  subtitle?: string;
  themeColor?: string;
  onComplete: () => void;
}

export const GameTransitionOverlay: React.FC<GameTransitionOverlayProps> = ({
  active,
  type,
  title,
  subtitle = 'CHANNELING ACOUSTIC LEY LINES...',
  themeColor = '#f59e0b',
  onComplete,
}) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      return;
    }

    phonemeAudio.playMagicCastSound();

    let frame = 0;
    const totalFrames = 30; // ~500ms at 60fps
    const interval = setInterval(() => {
      frame++;
      setProgress(Math.min(100, Math.round((frame / totalFrames) * 100)));

      if (frame >= totalFrames) {
        clearInterval(interval);
        setTimeout(onComplete, 120);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center overflow-hidden bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-150">
      {/* Dynamic Speedlines & Runic Vortex */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Pulsing Outer Magic Shockwave Ring */}
        <div
          className="absolute rounded-full border-4 animate-ping duration-700 opacity-60"
          style={{
            borderColor: themeColor,
            width: `${120 + progress * 8}px`,
            height: `${120 + progress * 8}px`,
          }}
        />

        {/* Inner Swirling Energy Ring */}
        <div
          className="absolute rounded-full border-2 border-dashed animate-spin"
          style={{
            borderColor: themeColor,
            width: '280px',
            height: '280px',
            animationDuration: '2s',
          }}
        />

        {/* Ambient Glow Center */}
        <div
          className="w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ backgroundColor: themeColor }}
        />
      </div>

      {/* Center Cinematic Mission Banner */}
      <div className="relative z-10 text-center px-6 max-w-lg mx-auto flex flex-col items-center">
        {/* Animated Gaming Icon */}
        <div
          className="w-20 h-20 rounded-2xl border-2 flex items-center justify-center shadow-2xl mb-4 animate-bounce"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            borderColor: themeColor,
            boxShadow: `0 0 40px ${themeColor}60`,
          }}
        >
          {type === 'mission_start' ? (
            <Zap className="w-10 h-10 animate-pulse" style={{ color: themeColor }} />
          ) : type === 'realm_warp' ? (
            <Compass className="w-10 h-10 animate-spin" style={{ color: themeColor, animationDuration: '3s' }} />
          ) : (
            <Shield className="w-10 h-10 animate-pulse" style={{ color: themeColor }} />
          )}
        </div>

        {/* Type Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-black tracking-widest uppercase mb-2 text-slate-300 shadow">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>
            {type === 'mission_start'
              ? 'MISSION ENGAGED'
              : type === 'realm_warp'
              ? 'HYPERSPACE REALM WARP'
              : 'ENCRYPTED SYSTEM ACCESS'}
          </span>
        </div>

        {/* Main Title */}
        <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-wider uppercase mb-1 drop-shadow-md">
          {title}
        </h2>

        {/* Subtitle */}
        <p className="text-xs font-mono tracking-widest text-slate-400 mb-6 uppercase">
          {subtitle}
        </p>

        {/* High-Tech Gaming Loading Bar */}
        <div className="w-64 sm:w-80 h-3 rounded-full bg-slate-900 border border-slate-700 p-0.5 shadow-inner relative overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-75 relative"
            style={{
              width: `${progress}%`,
              backgroundColor: themeColor,
              boxShadow: `0 0 16px ${themeColor}`,
            }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse" />
          </div>
        </div>

        <div className="text-[10px] font-mono text-slate-500 mt-2 font-bold tracking-wider">
          LOADING {progress}%
        </div>
      </div>
    </div>
  );
};
