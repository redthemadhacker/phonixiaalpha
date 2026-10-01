// PHONIXIA - District & School Administrator Dashboard
// Longitudinal literacy indices, MTSS compliance benchmarks, cohort analytics, and license provisioning

import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  Award,
  ShieldCheck,
  Users,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';

export const DistrictDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'schools' | 'licensing'>('metrics');

  const schools = [
    { name: 'Sound Shallows Elementary', students: 480, proficiency: 86, growthPct: '+14%', tier3Pct: '6%' },
    { name: 'Builders Academy of Literacy', students: 620, proficiency: 81, growthPct: '+19%', tier3Pct: '8%' },
    { name: 'Lexicon Middle School', students: 740, proficiency: 89, growthPct: '+11%', tier3Pct: '4%' },
    { name: 'Starlight Community School', students: 390, proficiency: 77, growthPct: '+22%', tier3Pct: '11%' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 max-w-6xl mx-auto my-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>District Superintendent & Leadership Suite</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mt-1 font-heading">
            District-Wide Literacy Index & MTSS Compliance
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Longitudinal growth analytics across 2,230 active students across all 5 realms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export State Compliance Report</span>
          </button>
        </div>
      </div>

      {/* High-Level KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase font-bold">Total Active Mages</div>
          <div className="text-2xl font-black text-cyan-400 mt-1 font-mono">2,230</div>
          <div className="text-[10px] text-slate-500 mt-0.5">4 District Campuses</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase font-bold">Science of Reading Index</div>
          <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">84.2%</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">↗ +16.4% YoY Gain</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase font-bold">MTSS Tier 3 Reductions</div>
          <div className="text-2xl font-black text-amber-400 mt-1 font-mono">-38%</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Accelerated Tier exits</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 uppercase font-bold">License Utilization</div>
          <div className="text-2xl font-black text-purple-400 mt-1 font-mono">98.4%</div>
          <div className="text-[10px] text-slate-500 mt-0.5">2,230 / 2,265 Allocated</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mt-6 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-thin flex-nowrap">
        <button
          onClick={() => setActiveTab('metrics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
            activeTab === 'metrics'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          1. School Performance Matrix
        </button>
        <button
          onClick={() => setActiveTab('schools')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
            activeTab === 'schools'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          2. Curriculum & Realm Telemetry
        </button>
      </div>

      {/* Tab 1: School Table */}
      {activeTab === 'metrics' && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Campus Name</th>
                <th className="py-3 px-4">Enrolled Students</th>
                <th className="py-3 px-4">Literacy Proficiency</th>
                <th className="py-3 px-4">Annual Growth</th>
                <th className="py-3 px-4">Tier 3 Intensive Pct</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {schools.map((sc, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">{sc.name}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{sc.students}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold font-mono text-emerald-400">{sc.proficiency}%</span>
                  </td>
                  <td className="py-3 px-4 font-bold font-mono text-cyan-300">{sc.growthPct}</td>
                  <td className="py-3 px-4 font-mono text-rose-300">{sc.tier3Pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Realm Telemetry */}
      {activeTab === 'schools' && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-xs font-bold text-slate-300 mb-2">District Realm Distribution</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Sound Shallows (K-1)</span>
                <span className="font-mono text-cyan-300 font-bold">34%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Builders Guild (1-3)</span>
                <span className="font-mono text-amber-300 font-bold">28%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tricky Trails (Heart Words)</span>
                <span className="font-mono text-pink-300 font-bold">18%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Whispering Peaks & Lexicon</span>
                <span className="font-mono text-purple-300 font-bold">20%</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <div className="text-xs font-bold text-slate-300 mb-2">Evidence-Based State Audits</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Phonixia logs zero-knowledge cryptographic hashes of assessment progress points, enabling automated certification for state Structured Literacy funding mandates.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
