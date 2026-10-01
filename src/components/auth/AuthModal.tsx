// PHONIXIA - Login, Sign-Up & Profile Selection Portal

import React, { useState } from 'react';
import { authService, UserAccount, LearnerProfile } from '../../services/authService';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import {
  Lock,
  User,
  Mail,
  KeyRound,
  Sparkles,
  Cloud,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';

interface AuthModalProps {
  onAuthenticated: (account: UserAccount, activeProfile: LearnerProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'select_profile'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [accountType, setAccountType] = useState<'parent' | 'teacher' | 'student'>('parent');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Authenticated state for profile selection
  const [authenticatedAccount, setAuthenticatedAccount] = useState<UserAccount | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const res = authService.login(username, password);
    if (res.success) {
      phonemeAudio.playFanfare();
      const account = authService.getAccount()!;
      setAuthenticatedAccount(account);

      // If user has multiple profiles (like parent test account), show profile picker
      if (account.profiles.length > 1) {
        setMode('select_profile');
      } else {
        onAuthenticated(account, authService.getActiveProfile());
      }
    } else {
      setErrorMessage(res.error || 'Login failed. Please check credentials.');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const res = authService.signup(username, email, password, accountType);
    if (res.success) {
      phonemeAudio.playFanfare();
      const account = authService.getAccount()!;
      onAuthenticated(account, authService.getActiveProfile());
    } else {
      setErrorMessage(res.error || 'Signup failed.');
    }
  };

  const handleSelectProfile = (profileId: string) => {
    phonemeAudio.playCompanionChime();
    const active = authService.switchProfile(profileId);
    if (authenticatedAccount) {
      onAuthenticated(authenticatedAccount, active);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-slate-100 flex flex-col relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center pb-5 border-b border-slate-800">
          <img
            src="/logo.jpeg"
            alt="PHONIXIA"
            className="h-24 w-auto rounded-2xl shadow-xl border border-amber-500/30 mb-3 object-contain hover:scale-105 transition"
          />
          <h1 className="text-2xl font-black text-white font-heading tracking-wide">
            PHONIXIA
          </h1>
          <div className="text-xs text-amber-400 font-semibold mt-0.5 flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5" />
            <span>Cross-Device Cloud Syncing Portal</span>
          </div>
        </div>

        {/* Profile Selector Mode (For multi-profile parent accounts) */}
        {mode === 'select_profile' && authenticatedAccount && (
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <h2 className="text-base font-bold text-white">Select Learner Profile</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Logged in as <strong>{authenticatedAccount.username}</strong> ({authenticatedAccount.accountType})
              </p>
            </div>

            <div className="space-y-3">
              {authenticatedAccount.profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => handleSelectProfile(profile.id)}
                  className="w-full p-4 rounded-2xl bg-slate-950 border-2 border-slate-800 hover:border-amber-400 text-left transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black shadow-md text-white"
                      style={{ backgroundColor: profile.avatarOutfitColor }}
                    >
                      {profile.gradeTier === 'beginner' ? '🐣' : '🦅'}
                    </div>
                    <div>
                      <div className="text-sm font-black text-white group-hover:text-amber-300">
                        {profile.name}
                      </div>
                      <div className="text-[11px] text-amber-400 font-medium">
                        {profile.gradeDisplay}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Level {profile.level} • Companion: <strong className="capitalize">{profile.assignedCompanion}</strong>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition" />
                </button>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setMode('login')}
                className="text-xs text-slate-400 hover:text-white"
              >
                Log in as a different user
              </button>
            </div>
          </div>
        )}

        {/* Login & Sign Up Forms */}
        {mode !== 'select_profile' && (
          <div className="mt-6">
            {/* Mode Switcher Tabs */}
            <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 mb-5">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                  mode === 'login'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage(null);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${
                  mode === 'signup'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Log In & Sync Data</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose username"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create secure password"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Account Type
                  </label>
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="parent">Parent Account (Family Oversight & Profiles)</option>
                    <option value="teacher">Teacher / Classroom Account</option>
                    <option value="student">Independent Student Account</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Create Cloud-Synced Account</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-[10px] text-slate-500">
          Encrypted Session • COPPA / FERPA Verified • Ready for Any Device
        </div>
      </div>
    </div>
  );
};
