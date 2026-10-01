// PHONIXIA - Teacher Dashboard
// Class management, Decodable text assignments, MTSS/RTI grouping, and Phoneme heatmaps

import React, { useState } from 'react';
import { MOCK_RTI_TIERS, CURRICULUM_MATRIX } from '../../services/mockGameData';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import {
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  Award,
  CheckCircle,
  FileText,
  Plus,
  Send,
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roster' | 'assignments' | 'phoneme_heatmap' | 'intervention'>('roster');
  const [assignedDecodable, setAssignedDecodable] = useState<string>('The Quest of the Consonant Cove');
  const [assignmentNotice, setAssignmentNotice] = useState<string | null>(null);

  const students = [
    { name: 'Marcus Taylor', rank: 'Novice Soundseeker', level: 5, xp: 850, phonemeAccuracy: 88, currentRealm: 'Sound Shallows', companion: 'Kam', status: 'Active Questing' },
    { name: 'Elena Rodriguez', rank: 'Syllable Smith', level: 8, xp: 1420, phonemeAccuracy: 74, currentRealm: 'Builders Guild', companion: 'Celine', status: 'Blending Anvil' },
    { name: 'Jayden Smith', rank: 'Decodable Ranger', level: 12, xp: 2300, phonemeAccuracy: 95, currentRealm: 'Tricky Trails', companion: 'Kam', status: 'Heart Word Mapping' },
    { name: 'Amira Khan', rank: 'Lexicon Knight', level: 16, xp: 3200, phonemeAccuracy: 91, currentRealm: 'Lexicon Empire', companion: 'Celine', status: 'Latin Roots' },
    { name: 'Lucas Chen', rank: 'Rune Apprentice', level: 6, xp: 980, phonemeAccuracy: 82, currentRealm: 'Sound Shallows', companion: 'Kam', status: 'Digraph Grotto' },
  ];

  const handleAssignDecodable = () => {
    phonemeAudio.playFanfare();
    setAssignmentNotice(`"${assignedDecodable}" successfully deployed to all 5 students' Quest Grimoires!`);
    setTimeout(() => setAssignmentNotice(null), 3500);
  };

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 max-w-6xl mx-auto my-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Educator Portal • Grade 2 Scribe Academy</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1 font-heading">
            Classroom Literacy Management & Analytics
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Real-time Science of Reading tracking, orthographic mapping data, and automated RTI groupings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAssignDecodable}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Deploy Decodable Quest</span>
          </button>
        </div>
      </div>

      {assignmentNotice && (
        <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{assignmentNotice}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 mt-6 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-thin flex-nowrap">
        <button
          onClick={() => setActiveTab('roster')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'roster'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          1. Class Student Roster ({students.length})
        </button>
        <button
          onClick={() => setActiveTab('phoneme_heatmap')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'phoneme_heatmap'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          2. Class Phoneme Accuracy Heatmap
        </button>
        <button
          onClick={() => setActiveTab('assignments')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'assignments'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          3. Decodable Readers & Homework Quests
        </button>
        <button
          onClick={() => setActiveTab('intervention')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'intervention'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          4. MTSS & RTI Intervention Groups
        </button>
      </div>

      {/* Tab 1: Student Roster */}
      {activeTab === 'roster' && (
        <div className="mt-6 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Mage Rank & Level</th>
                  <th className="py-3 px-4">Active Realm</th>
                  <th className="py-3 px-4">Companion</th>
                  <th className="py-3 px-4">Phoneme Accuracy</th>
                  <th className="py-3 px-4">In-Game Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {students.map((st, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-bold text-white">{st.name}</td>
                    <td className="py-3 px-4">
                      <span className="text-amber-400 font-bold">{st.rank}</span>
                      <span className="text-slate-400 ml-1.5 font-mono">(Lv. {st.level})</span>
                    </td>
                    <td className="py-3 px-4 text-cyan-300">{st.currentRealm}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          st.companion === 'Kam'
                            ? 'bg-teal-500/20 text-teal-300'
                            : 'bg-purple-500/20 text-purple-300'
                        }`}
                      >
                        {st.companion}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              st.phonemeAccuracy >= 85 ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${st.phonemeAccuracy}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-white">{st.phonemeAccuracy}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 italic">{st.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Phoneme Heatmap */}
      {activeTab === 'phoneme_heatmap' && (
        <div className="mt-6 space-y-6">
          <div className="text-xs text-slate-400 leading-relaxed bg-amber-950/20 p-4 rounded-xl border border-amber-800/30">
            <span className="font-bold text-amber-400">Science of Reading Articulation Heatmap: </span>
            Green indicates mastery (&gt;85%), Yellow indicates developing (70-84%), Red indicates diagnostic intervention needed (&lt;70%).
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {[
              { sound: '/æ/ Short A', acc: 94, status: 'mastered' },
              { sound: '/ɛ/ Short E', acc: 78, status: 'developing' },
              { sound: '/ɪ/ Short I', acc: 89, status: 'mastered' },
              { sound: '/ɒ/ Short O', acc: 92, status: 'mastered' },
              { sound: '/ʌ/ Short U', acc: 84, status: 'developing' },
              { sound: '/b/ Stop B', acc: 88, status: 'mastered' },
              { sound: '/t/ Stop T', acc: 96, status: 'mastered' },
              { sound: '/d/ Stop D', acc: 85, status: 'mastered' },
              { sound: '/p/ Stop P', acc: 91, status: 'mastered' },
              { sound: '/ʃ/ Digraph SH', acc: 68, status: 'needs_intervention' },
              { sound: '/tʃ/ Digraph CH', acc: 71, status: 'developing' },
              { sound: '/θ/ Unvoiced TH', acc: 62, status: 'needs_intervention' },
            ].map((p, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-between text-center ${
                  p.status === 'mastered'
                    ? 'border-emerald-500/50 bg-emerald-950/30'
                    : p.status === 'developing'
                    ? 'border-amber-500/50 bg-amber-950/30'
                    : 'border-rose-500/50 bg-rose-950/30'
                }`}
              >
                <div className="font-mono text-sm font-black text-white">{p.sound}</div>
                <div className="text-lg font-black mt-1 font-mono text-slate-100">{p.acc}%</div>
                <span
                  className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded mt-1.5 ${
                    p.status === 'mastered'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : p.status === 'developing'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {p.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Assignments */}
      {activeTab === 'assignments' && (
        <div className="mt-6 space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Assign Decodable Reader Quest
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={assignedDecodable}
                onChange={(e) => setAssignedDecodable(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={handleAssignDecodable}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
              >
                Send to All Students
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Intervention Groups */}
      {activeTab === 'intervention' && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/40">
              <div className="text-xs font-bold text-rose-400 uppercase">Tier 3 (Daily Intensive)</div>
              <div className="text-sm font-bold text-white mt-1">Elena Rodriguez</div>
              <div className="text-xs text-slate-400 mt-1">Focus: Phonemic segmentation with /sh/ and /th/</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40">
              <div className="text-xs font-bold text-amber-400 uppercase">Tier 2 (Targeted Support)</div>
              <div className="text-sm font-bold text-white mt-1">Marcus Taylor, Lucas Chen</div>
              <div className="text-xs text-slate-400 mt-1">Focus: CVCe Silent E & Builders Guild Foundry</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40">
              <div className="text-xs font-bold text-emerald-400 uppercase">Tier 1 (Core Enrichment)</div>
              <div className="text-sm font-bold text-white mt-1">Jayden Smith, Amira Khan</div>
              <div className="text-xs text-slate-400 mt-1">Focus: Fluency, Prosody & Latin roots</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
