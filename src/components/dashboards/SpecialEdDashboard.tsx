// PHONIXIA - Special Education, IEP, 504, RTI & MTSS Inclusion Suite
// Multi-Tiered Support System ensuring all learners can become MASTER OF PHONIXIA

import React, { useState } from 'react';
import { MOCK_IEP_GOALS, MOCK_RTI_TIERS } from '../../services/mockGameData';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import {
  Sparkles,
  Shield,
  FileCheck2,
  Users,
  Eye,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Volume2,
  Grid,
} from 'lucide-react';

interface SpecialEdDashboardProps {
  onToggleDyslexiaFont: () => void;
  dyslexiaFontEnabled: boolean;
}

export const SpecialEdDashboard: React.FC<SpecialEdDashboardProps> = ({
  onToggleDyslexiaFont,
  dyslexiaFontEnabled,
}) => {
  const [activeTab, setActiveTab] = useState<'iep_tracker' | '504_accommodations' | 'rti_mtss' | 'aac_board'>('iep_tracker');

  // 504 Accommodations toggles
  const [accommodations, setAccommodations] = useState({
    dyslexiaFont: dyslexiaFontEnabled,
    tactileVowels: true,
    visualMouthModel: true,
    extendedTime: true,
    reducedSensoryMotion: false,
    audioReadAloud: true,
    highContrastRunes: false,
  });

  // AAC Board symbols
  const aacTiles = [
    { label: 'Yes', symbol: '👍', sound: 'Yes' },
    { label: 'No', symbol: '👎', sound: 'No' },
    { label: 'Sound', symbol: '🔊', sound: 'Sound' },
    { label: 'Repeat', symbol: '🔁', sound: 'Repeat' },
    { label: 'Help Kam', symbol: '🧭', sound: 'Help Kam' },
    { label: 'Help Celine', symbol: '📖', sound: 'Help Celine' },
    { label: 'Blend', symbol: '🔨', sound: 'Blend' },
    { label: 'Take Break', symbol: '☕', sound: 'Take Break' },
  ];

  const handleToggleAccom = (key: keyof typeof accommodations) => {
    if (key === 'dyslexiaFont') {
      onToggleDyslexiaFont();
    }
    setAccommodations((prev) => ({ ...prev, [key]: !prev[key] }));
    phonemeAudio.playCompanionChime();
  };

  const handleSpeakAAC = (word: string) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(u);
    }
    phonemeAudio.playCompanionChime();
  };

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 max-w-6xl mx-auto my-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" />
            <span>Inclusive Learning & Special Education Architecture</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1 font-heading">
            IEP, Section 504, RTI & MTSS Command Center
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Individualized pathways to Master of Phonixia for Dyslexia, ADHD, Autism, SLP, AAC, and All Diverse Learners.
          </p>
        </div>

        {/* Global Dyslexia Quick Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleToggleAccom('dyslexiaFont')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              accommodations.dyslexiaFont
                ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>OpenDyslexic Mode {accommodations.dyslexiaFont ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mt-6 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-thin flex-nowrap">
        <button
          onClick={() => setActiveTab('iep_tracker')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'iep_tracker'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          1. IEP Goals & Evidence Logging
        </button>
        <button
          onClick={() => setActiveTab('504_accommodations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === '504_accommodations'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          2. Section 504 Universal Accommodations
        </button>
        <button
          onClick={() => setActiveTab('rti_mtss')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'rti_mtss'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          3. MTSS & RTI Tier 1 / 2 / 3 Matrix
        </button>
        <button
          onClick={() => setActiveTab('aac_board')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'aac_board'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          4. Integrated AAC Speech Communication Board
        </button>
      </div>

      {/* Tab 1: IEP Goals Tracker */}
      {activeTab === 'iep_tracker' && (
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Active IEP Literacy Goals (Real-Time In-Game Assessment Telemetry)
            </div>
            <span className="text-xs text-indigo-400 font-medium">FERPA / IDEA Compliant</span>
          </div>

          <div className="space-y-4">
            {MOCK_IEP_GOALS.map((goal) => (
              <div
                key={goal.id}
                className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 mr-2">
                      {goal.domain}
                    </span>
                    <span className="text-sm font-bold text-white">{goal.studentName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Target Date: {goal.targetDate}</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {goal.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block mb-1">Baseline:</span>
                    <p className="text-slate-300 leading-relaxed">{goal.baseline}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block mb-1">Target IEP Mastery Objective:</span>
                    <p className="text-indigo-200 leading-relaxed font-medium">{goal.targetGoal}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Mastery Trajectory</span>
                    <span className="font-bold text-indigo-300">{goal.currentProgressPct}% Progress</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                      style={{ width: `${goal.currentProgressPct}%` }}
                    />
                  </div>
                </div>

                {/* Evidence Data Points */}
                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <span className="text-slate-500 font-bold self-center">Evidence Log:</span>
                  {goal.evidenceDataPoints.map((pt, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {pt.date}: <strong className="text-emerald-400">{pt.scorePct}%</strong> ({pt.assessmentType})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: 504 Accommodations */}
      {activeTab === '504_accommodations' && (
        <div className="mt-6 space-y-6">
          <div className="text-xs text-slate-400 leading-relaxed bg-indigo-950/20 p-4 rounded-xl border border-indigo-800/30">
            <span className="font-bold text-indigo-300">Section 504 Accessibility Mandate: </span>
            Every gameplay mechanic and assessment in Phonixia is bound to adaptive accessibility parameters that operate seamlessly across all 5 realms.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                id: 'dyslexiaFont',
                title: 'OpenDyslexic Weighted Font',
                desc: 'Applies weighted letter bottoms, increased character spacing, and prevents visual rotation.',
              },
              {
                id: 'visualMouthModel',
                title: 'Interactive Articulation Mouth Models',
                desc: 'Always displays anatomical lips, tongue, and teeth guides during sound challenges.',
              },
              {
                id: 'tactileVowels',
                title: 'Color-Coded Vowel & Consonant Runes',
                desc: 'Highlights vowels in warm red/amber and consonants in cool blue/teal (Montessori alignment).',
              },
              {
                id: 'extendedTime',
                title: 'Extended Response Pacing (1.5x - 2.0x)',
                desc: 'Removes all rush timers during spellcasting and realm challenges.',
              },
              {
                id: 'audioReadAloud',
                title: 'Multimodal Audio Read-Aloud Overlay',
                desc: 'Highlights text synchronously as human-recorded narration plays.',
              },
              {
                id: 'reducedSensoryMotion',
                title: 'Reduced Motion & Sensory Calming',
                desc: 'Dims intense particle bursts and screen shakes for learners with sensory sensitivity.',
              },
            ].map((item) => {
              const key = item.id as keyof typeof accommodations;
              const isEnabled = accommodations[key];
              return (
                <div
                  key={item.id}
                  onClick={() => handleToggleAccom(key)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition flex items-start justify-between ${
                    isEnabled
                      ? 'border-indigo-500 bg-indigo-950/30 shadow-md'
                      : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                  }`}
                >
                  <div className="pr-4">
                    <div className="text-sm font-bold text-white">{item.title}</div>
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                      isEnabled ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-600'
                    }`}
                  >
                    {isEnabled ? '✓' : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: MTSS & RTI */}
      {activeTab === 'rti_mtss' && (
        <div className="mt-6 space-y-6">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            MTSS Multi-Tiered Intervention Tracking Roster
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">RTI Tier</th>
                  <th className="py-3 px-4">Instructional Focus Area</th>
                  <th className="py-3 px-4">Minutes / Week</th>
                  <th className="py-3 px-4">Progress Trend</th>
                  <th className="py-3 px-4">Latest Score</th>
                  <th className="py-3 px-4">Recommended Intervention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {MOCK_RTI_TIERS.map((tier) => (
                  <tr key={tier.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-bold text-white">{tier.name}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black ${
                          tier.tier === 3
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : tier.tier === 2
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        Tier {tier.tier}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{tier.focusArea}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{tier.interventionMinutesWeekly} min</td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-400 font-bold capitalize">↗ {tier.progressMonitoringTrend}</span>
                    </td>
                    <td className="py-3 px-4 font-bold font-mono text-indigo-300">{tier.lastAssessmentScore}%</td>
                    <td className="py-3 px-4 text-slate-400 italic">{tier.recommendedPractice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: AAC Speech Board */}
      {activeTab === 'aac_board' && (
        <div className="mt-6 space-y-6">
          <div className="text-xs text-slate-300 leading-relaxed bg-indigo-950/20 p-4 rounded-xl border border-indigo-800/30">
            <span className="font-bold text-indigo-300">Augmentative and Alternative Communication (AAC): </span>
            Non-verbal and speech-delayed adventurers can communicate with party members, companions Kam and Celine, and complete quests using this high-contrast symbol board.
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {aacTiles.map((tile, idx) => (
              <button
                key={idx}
                onClick={() => handleSpeakAAC(tile.sound)}
                className="p-5 rounded-2xl bg-slate-950 border-2 border-indigo-500/40 hover:border-amber-400 hover:scale-105 active:scale-95 transition flex flex-col items-center justify-center shadow-lg group"
              >
                <div className="text-4xl mb-2">{tile.symbol}</div>
                <div className="text-sm font-black text-white group-hover:text-amber-300">
                  {tile.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
