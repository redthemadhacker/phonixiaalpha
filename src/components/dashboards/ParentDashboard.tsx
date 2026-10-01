// PHONIXIA - Parent Dashboard
// Multi-child switcher, Screen time controls, COPPA/FERPA privacy, and Literacy Growth Reports

import React, { useState } from 'react';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import {
  Heart,
  Users,
  Clock,
  ShieldCheck,
  Award,
  BookOpen,
  Volume2,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const [activeChild, setActiveChild] = useState<'child_1' | 'child_2'>('child_1');
  const [screenTimeLimit, setScreenTimeLimit] = useState<number>(45);
  const [cameraPermission, setCameraPermission] = useState<boolean>(true);
  const [micPermission, setMicPermission] = useState<boolean>(true);

  const childrenData = {
    child_1: {
      name: 'Leo (Grade 2)',
      companion: 'Kam',
      level: 7,
      rank: 'Syllable Smith',
      screenTimeToday: 24,
      phonicsMastery: 84,
      fluencyWpm: 72,
      wordsMapped: 148,
      recentAchievement: 'Mastered Pure Stop Consonant /b/ without schwa',
    },
    child_2: {
      name: 'Maya (Kindergarten)',
      companion: 'Celine',
      level: 3,
      rank: 'Novice Soundseeker',
      screenTimeToday: 18,
      phonicsMastery: 92,
      fluencyWpm: 45,
      wordsMapped: 62,
      recentAchievement: 'Constructed 5 CVC words in Montessori Movable Alphabet',
    },
  };

  const currentChild = childrenData[activeChild];

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 max-w-5xl mx-auto my-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4 fill-rose-400" />
            <span>Parent Literacy Command & Family Oversight</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1 font-heading">
            Family Literacy Journey & Safety Controls
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Transparent evidence-based insights, screen time limits, and parent-guided home quests.
          </p>
        </div>

        {/* Multi-Child Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveChild('child_1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeChild === 'child_1'
                ? 'bg-rose-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Leo (Grade 2)
          </button>
          <button
            onClick={() => setActiveChild('child_2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeChild === 'child_2'
                ? 'bg-rose-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Maya (Kindergarten)
          </button>
        </div>
      </div>

      {/* Literacy Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase font-bold">Phonics Mastery</div>
          <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">{currentChild.phonicsMastery}%</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Science of Reading aligned</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase font-bold">Orthographic Words</div>
          <div className="text-2xl font-black text-amber-400 mt-1 font-mono">{currentChild.wordsMapped}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Mapped into long-term memory</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase font-bold">Reading Rate</div>
          <div className="text-2xl font-black text-cyan-400 mt-1 font-mono">{currentChild.fluencyWpm} WPM</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Optimal grade-level band</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase font-bold">Screen Time Today</div>
          <div className="text-2xl font-black text-rose-400 mt-1 font-mono">
            {currentChild.screenTimeToday} / {screenTimeLimit} min
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">Auto-pause when limit reached</div>
        </div>
      </div>

      {/* Parental Controls & COPPA Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Screen Time Slider */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between text-xs font-bold mb-3">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Daily Educational Screen-Time Governor
            </span>
            <span className="text-amber-400 font-mono text-sm">{screenTimeLimit} Minutes</span>
          </div>
          <input
            type="range"
            min={15}
            max={120}
            step={5}
            value={screenTimeLimit}
            onChange={(e) => setScreenTimeLimit(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>15 min</span>
            <span>45 min (Recommended)</span>
            <span>120 min</span>
          </div>
        </div>

        {/* Privacy & Camera/Microphone Permissions */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            COPPA & FERPA Privacy Safeguards
          </div>
          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-300">Microphone for Speech Articulation Analysis</span>
              <input
                type="checkbox"
                checked={micPermission}
                onChange={() => setMicPermission(!micPermission)}
                className="accent-emerald-500"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-slate-300">Reading Fluency Video Portfolio (Optional)</span>
              <input
                type="checkbox"
                checked={cameraPermission}
                onChange={() => setCameraPermission(!cameraPermission)}
                className="accent-emerald-500"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
