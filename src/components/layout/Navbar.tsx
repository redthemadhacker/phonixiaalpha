// PHONIXIA - Navigation Bar, Realm Switcher & Role View Selector

import React from 'react';
import { RealmId, RealmInfo, AccountRole } from '../../types/game';
import { REALMS } from '../../services/mockGameData';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import {
  Sparkles,
  Compass,
  GraduationCap,
  Users,
  Building2,
  Shield,
  FileCode2,
  Volume2,
  Eye,
  Menu,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  currentRealmId: RealmId;
  onSelectRealm: (id: RealmId) => void;
  activeRole: AccountRole | 'master_spec';
  onSelectRole: (role: AccountRole | 'master_spec') => void;
  dyslexiaFontEnabled: boolean;
  onToggleDyslexiaFont: () => void;
  playerName: string;
  playerRank: string;
  playerLevel: number;
  activeProfileName?: string;
  activeProfileTier?: string;
  onOpenProfilePicker?: () => void;
  cloudSyncTime?: string;
  onSyncCloud?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRealmId,
  onSelectRealm,
  activeRole,
  onSelectRole,
  dyslexiaFontEnabled,
  onToggleDyslexiaFont,
  playerName,
  playerRank,
  playerLevel,
  activeProfileName = 'Leo',
  activeProfileTier = 'Beginner',
  onOpenProfilePicker,
  cloudSyncTime,
  onSyncCloud,
}) => {
  const currentRealm = REALMS[currentRealmId];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Phonixia Logo Brand & Realm Selector */}
        <div className="flex items-center justify-between md:justify-start gap-4">
          <div
            onClick={() => onSelectRole('student')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Official PHONIXIA Logo from logo.jpeg */}
            <img
              src="/logo.jpeg"
              alt="PHONIXIA"
              className="h-10 w-auto rounded-lg shadow-md hover:scale-105 transition object-contain"
            />
            <div className="flex items-center">
              <span className="font-heading font-black text-2xl tracking-tight text-white group-hover:text-amber-400 transition">
                PHONIXIA
              </span>
            </div>
          </div>

          {/* Active Profile Chip (Leo / Maya) */}
          {onOpenProfilePicker && (
            <button
              onClick={onOpenProfilePicker}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 text-xs font-bold text-white flex items-center gap-2 shadow transition group"
              title="Click to switch learner profile (Leo Beginner / Maya High School)"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-left">
                <span className="text-amber-300 group-hover:text-amber-200">{activeProfileName}</span>
                <span className="text-[10px] text-slate-400 block -mt-0.5">({activeProfileTier})</span>
              </div>
            </button>
          )}

          {/* Realm Switcher Dropdown */}
          <div className="hidden xl:flex items-center gap-1.5 ml-2 bg-slate-900/80 border border-slate-800 p-1 rounded-xl">
            {Object.values(REALMS).map((r) => {
              const isActive = r.id === currentRealmId;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    onSelectRealm(r.id);
                    phonemeAudio.playCompanionChime();
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-800 text-white shadow border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  style={{
                    color: isActive ? r.themeColor : undefined,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: r.themeColor }}
                  />
                  <span>{r.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center / Right: Portal Views Switcher & Controls */}
        <div className="flex items-center justify-start md:justify-end gap-2 overflow-x-auto scrollbar-thin pb-1 md:pb-0 w-full md:w-auto">
          {/* Cloud Sync Status */}
          {onSyncCloud && (
            <button
              onClick={onSyncCloud}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-[11px] text-slate-300 transition shrink-0"
              title="Click to sync data across all devices"
            >
              <span className="text-cyan-400">☁️</span>
              <span className="hidden sm:inline">Synced</span>
              {cloudSyncTime && <span className="font-mono text-[10px] text-slate-400">{cloudSyncTime}</span>}
            </button>
          )}

          {/* Horizontally Scrollable Dashboard Bar */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl overflow-x-auto scrollbar-thin flex-nowrap shrink-0 max-w-full">
            <button
              onClick={() => onSelectRole('student')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeRole === 'student'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Game World</span>
            </button>

            <button
              onClick={() => onSelectRole('teacher')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeRole === 'teacher'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Teacher 🔒</span>
            </button>

            <button
              onClick={() => onSelectRole('parent')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeRole === 'parent'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Parent 🔒</span>
            </button>

            <button
              onClick={() => onSelectRole('special_ed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeRole === 'special_ed'
                  ? 'bg-indigo-600 text-white font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>IEP / MTSS 🔒</span>
            </button>

            <button
              onClick={() => onSelectRole('district_admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeRole === 'district_admin'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>District 🔒</span>
            </button>

            <button
              onClick={() => onSelectRole('master_spec')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                activeRole === 'master_spec'
                  ? 'bg-yellow-500 text-slate-950 font-black shadow-md'
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Master Spec 🔒</span>
            </button>
          </div>

          {/* Dyslexia Toggle */}
          <button
            onClick={onToggleDyslexiaFont}
            className={`p-2 rounded-xl border text-xs font-bold transition shrink-0 ${
              dyslexiaFontEnabled
                ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="OpenDyslexic Font & Accessibility Adjustment"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
