import React, { useState } from 'react';
import { User, Trophy, CheckCircle, Sparkles, X, Shield, AtSign } from 'lucide-react';

interface UserRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsername: string;
  onSaveUsername: (newUsername: string) => void;
  userBestWpm?: number;
}

export const UserRegistrationModal: React.FC<UserRegistrationModalProps> = ({
  isOpen,
  onClose,
  currentUsername,
  onSaveUsername,
  userBestWpm = 0,
}) => {
  const [usernameInput, setUsernameInput] = useState<string>(currentUsername || '');
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = usernameInput.trim();
    if (!trimmed) {
      setError('Please enter a valid username');
      return;
    }
    if (trimmed.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }
    if (trimmed.length > 20) {
      setError('Username must be 20 characters or fewer');
      return;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
      setError('Username can only contain letters, numbers, underscores, and hyphens');
      return;
    }

    setError(null);
    onSaveUsername(trimmed);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  // Generate deterministic handle and unique ID
  const cleanHandle = usernameInput.trim().toLowerCase().replace(/[^a-z0-9]/g, '') || 'typist';
  const uniqueTag = `#TYP-${(cleanHandle.charCodeAt(0) || 65) * 123 % 9000 + 1000}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 flex flex-col gap-5 text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-200/80 flex items-center justify-center text-indigo-600 shrink-0 shadow-xs">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Leaderboard Username</h2>
            <p className="text-xs text-slate-500 font-medium">Claim your handle to enter the Typerca Weekly Rankings</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Choose Unique Display Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 font-bold text-sm">@</span>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                  setError(null);
                }}
                placeholder="e.g. SpeedDemon"
                maxLength={20}
                autoFocus
                className="w-full pl-8 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-300/80 focus:border-indigo-500 focus:bg-white text-slate-900 font-bold text-sm outline-none transition-all"
              />
            </div>

            {error && <p className="text-xs font-bold text-rose-600 mt-1.5">{error}</p>}
          </div>

          {/* Unique Generated Handle Preview */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <AtSign className="w-4 h-4 text-indigo-600" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Leaderboard Handle</span>
                <span className="font-mono font-bold text-slate-800">@{cleanHandle} <span className="text-slate-400 font-normal">{uniqueTag}</span></span>
              </div>
            </div>
            {userBestWpm > 0 && (
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Best Speed</span>
                <span className="font-extrabold text-indigo-600">{userBestWpm} WPM</span>
              </div>
            )}
          </div>

          {/* Benefits List */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Automatically submit your high scores to the Weekly Top Typists chart</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Earn official verified certificates under your name</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>Unlock special milestone badges as your WPM increases</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            {isSaved ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-300" />
                <span>Username Registered & Active!</span>
              </>
            ) : (
              <span>Register & Enter Weekly Leaderboard</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
