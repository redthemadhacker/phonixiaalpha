// PHONIXIA - Secure 8-Digit PIN Gate for Dashboards
// Prevents students/kids from viewing parent, teacher, district, and IEP dashboards

import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { phonemeAudio } from '../../services/phonemeAudioEngine';
import { Lock, KeyRound, ShieldAlert, CheckCircle2, RotateCcw, X, ShieldCheck } from 'lucide-react';

interface DashboardPinModalProps {
  dashboardTitle: string;
  onUnlocked: () => void;
  onCancel: () => void;
}

export const DashboardPinModal: React.FC<DashboardPinModalProps> = ({
  dashboardTitle,
  onUnlocked,
  onCancel,
}) => {
  const account = authService.getAccount();
  const [pin, setPin] = useState<string>('');
  const [isSettingUpPin, setIsSettingUpPin] = useState<boolean>(!account?.pinInitialized);
  const [accountPassword, setAccountPassword] = useState<string>('');
  const [newPin, setNewPin] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleKeyPress = (num: string) => {
    if (pin.length < 8) {
      const updated = pin + num;
      setPin(updated);
      phonemeAudio.playCompanionChime();

      // Automatically verify when 8 digits are reached
      if (updated.length === 8) {
        if (authService.verifyDashboardPin(updated)) {
          phonemeAudio.playFanfare();
          onUnlocked();
        } else {
          setErrorMessage('Incorrect 8-Digit PIN. Please try again or unlock with account password.');
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
    setErrorMessage(null);
  };

  const handleClear = () => {
    setPin('');
    setErrorMessage(null);
  };

  const handleSetupPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const res = authService.setupDashboardPin(newPin, accountPassword);
    if (res.success) {
      phonemeAudio.playFanfare();
      setIsSettingUpPin(false);
      onUnlocked();
    } else {
      setErrorMessage(res.error || 'Failed to initialize PIN. Check account password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-indigo-500/50 rounded-3xl max-w-sm w-full p-6 shadow-2xl text-slate-100 flex flex-col relative">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center pb-4 border-b border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 mb-2 shadow-lg">
            <Lock className="w-7 h-7" />
          </div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Dashboard Security Gate
          </div>
          <h2 className="text-lg font-black text-white font-heading mt-0.5">
            {dashboardTitle} Access
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Child-safe protection. Enter the 8-digit parental/educator PIN.
          </p>
        </div>

        {errorMessage && (
          <div className="my-3 p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs text-center font-medium">
            {errorMessage}
          </div>
        )}

        {isSettingUpPin ? (
          /* Initial PIN Setup or Reset using Account Password */
          <form onSubmit={handleSetupPinSubmit} className="mt-4 space-y-4">
            <div className="text-xs text-indigo-300 bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/40">
              Provide your account password to configure or reset your 8-digit dashboard PIN.
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Account Password
              </label>
              <input
                type="password"
                required
                value={accountPassword}
                onChange={(e) => setAccountPassword(e.target.value)}
                placeholder="Enter account password"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                New 8-Digit PIN
              </label>
              <input
                type="text"
                maxLength={8}
                pattern="\d{8}"
                required
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Enter 8-digit PIN"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono tracking-widest text-center focus:outline-none focus:border-indigo-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-lg transition"
            >
              Save 8-Digit PIN & Enter
            </button>
          </form>
        ) : (
          /* Normal 8-Digit PIN Numpad */
          <div className="mt-4 flex flex-col items-center">
            {/* 8-Digit Visual Indicator Dots */}
            <div className="flex gap-2 my-3">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded-full transition-all border ${
                    idx < pin.length
                      ? 'bg-indigo-400 border-indigo-300 scale-110 shadow-md shadow-indigo-400/50'
                      : 'bg-slate-950 border-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="text-[11px] text-slate-400 font-mono mb-4">
              Enter 8-Digit Parental / Educator PIN
            </div>

            {/* Numeric Keypad Grid */}
            <div className="grid grid-cols-3 gap-2.5 w-full max-w-[240px]">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handleKeyPress(digit)}
                  className="h-12 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-400 active:scale-90 text-lg font-black text-white transition flex items-center justify-center shadow"
                >
                  {digit}
                </button>
              ))}

              <button
                type="button"
                onClick={handleClear}
                className="h-12 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-400 transition flex items-center justify-center"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => handleKeyPress('0')}
                className="h-12 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-400 active:scale-90 text-lg font-black text-white transition flex items-center justify-center shadow"
              >
                0
              </button>

              <button
                type="button"
                onClick={handleBackspace}
                className="h-12 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-400 transition flex items-center justify-center"
              >
                ⌫
              </button>
            </div>

            {/* Forgot / Reset PIN toggle */}
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => setIsSettingUpPin(true)}
                className="text-[11px] text-slate-400 hover:text-indigo-300 underline transition"
              >
                Unlock / Reset PIN using Account Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
