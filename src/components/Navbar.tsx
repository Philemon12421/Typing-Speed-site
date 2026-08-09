import React from 'react';
import { TabType, SoundProfile, DailyGoalType } from '../types';
import { Keyboard, BarChart2, Flame, Trophy, Target, Volume2, VolumeX, Sliders, Award, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  bestWpm: number;
  streakDays: number;
  userName: string;
  soundProfile: SoundProfile;
  todayProgress: {
    completed: number;
    target: number;
    percent: number;
    unit: string;
    type: DailyGoalType;
  };
  onOpenGoalSoundModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bestWpm,
  streakDays,
  userName,
  soundProfile,
  todayProgress,
  onOpenGoalSoundModal,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'test', label: 'Practice', icon: <Keyboard className="w-4 h-4" /> },
    { id: 'challenges', label: 'Challenges', icon: <Award className="w-4 h-4 text-amber-500" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'guide', label: 'Guide', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/40 border-b border-white/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => setActiveTab('test')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
            VelocisType
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 p-1 rounded-2xl bg-white/60 border border-white/50 backdrop-blur-md shadow-sm">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Stats & Controls Quick Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Daily Goal Progress Ring Indicator */}
          <div 
            onClick={onOpenGoalSoundModal}
            title={`Daily Goal: ${todayProgress.completed}/${todayProgress.target} ${todayProgress.unit} (${todayProgress.percent}% completed)`}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/70 border border-white/60 backdrop-blur-md text-slate-800 text-xs font-extrabold shadow-sm cursor-pointer hover:bg-white/90 transition-all"
          >
            <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-600 transition-all duration-500"
                  strokeDasharray={`${todayProgress.percent}, 100`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <Target className="w-2.5 h-2.5 text-indigo-600 absolute" />
            </div>
            <span className="hidden md:inline text-slate-500 font-medium">Goal:</span>
            <span className="text-indigo-900">{todayProgress.percent}%</span>
          </div>

          {/* Sound Settings Quick Toggle Button */}
          <button
            onClick={onOpenGoalSoundModal}
            title={`Sound Profile: ${soundProfile}. Click to adjust sound settings.`}
            className="p-2 rounded-xl bg-white/70 border border-white/60 backdrop-blur-md text-slate-700 hover:bg-white/90 transition-all flex items-center justify-center shadow-sm"
          >
            {soundProfile === 'silent' ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Best WPM Pill */}
          <div 
            onClick={() => setActiveTab('analytics')}
            title="Personal Best WPM"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/70 border border-white/60 backdrop-blur-md text-slate-800 text-xs font-bold shadow-sm cursor-pointer hover:bg-white/90 transition-all"
          >
            <Trophy className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden md:inline text-slate-500 font-medium">Best:</span>
            <span>{bestWpm > 0 ? `${bestWpm} WPM` : '--'}</span>
          </div>

          {/* Streak Pill */}
          <div 
            onClick={() => setActiveTab('analytics')}
            title="Current Practice Streak"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-200/50 text-orange-700 text-xs font-bold shadow-sm cursor-pointer hover:bg-orange-500/20 transition-all"
          >
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>{streakDays}d</span>
          </div>

          {/* Open Settings Button / Avatar */}
          <button
            onClick={onOpenGoalSoundModal}
            title="Open Goals & Settings"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300/80 shadow-sm overflow-hidden flex items-center justify-center font-bold text-slate-700 text-xs transition-all cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

