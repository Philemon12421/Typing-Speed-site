import React, { useState, useRef, useEffect } from 'react';
import { TabType, SoundProfile, DailyGoalType } from '../types';
import { Keyboard, BarChart2, Flame, Trophy, Target, Volume2, VolumeX, Sliders, Award, BookOpen, User, AtSign, Sun, Moon, Monitor, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  bestWpm: number;
  streakDays: number;
  userName: string;
  soundProfile: SoundProfile;
  theme?: 'system' | 'light' | 'dark';
  onToggleTheme?: (theme: 'system' | 'light' | 'dark') => void;
  todayProgress: {
    completed: number;
    target: number;
    percent: number;
    unit: string;
    type: DailyGoalType;
  };
  completedChallengesCount?: number;
  totalChallengesCount?: number;
  onOpenGoalSoundModal: () => void;
  onOpenRegisterModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bestWpm,
  streakDays,
  userName = '',
  soundProfile,
  theme = 'system',
  onToggleTheme,
  todayProgress,
  completedChallengesCount = 0,
  totalChallengesCount = 15,
  onOpenGoalSoundModal,
  onOpenRegisterModal,
}) => {
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState<boolean>(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsThemeDropdownOpen(false);
      }
    };

    if (isThemeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isThemeDropdownOpen]);

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'test', label: 'Practice', icon: <Keyboard className="w-4 h-4" /> },
    { id: 'challenges', label: 'Challenges', icon: <Award className="w-4 h-4 text-amber-500" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'guide', label: 'Guide & Blog', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const challengePercent = Math.min(
    100,
    Math.round((completedChallengesCount / Math.max(1, totalChallengesCount)) * 100)
  );

  const themeOptions: { id: 'dark' | 'light' | 'system'; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'dark',
      label: 'Dark Screen',
      desc: 'Clean Black / Pitch Dark Mode',
      icon: <Moon className="w-4 h-4 text-indigo-400 shrink-0" />,
    },
    {
      id: 'light',
      label: 'Light Screen',
      desc: 'Crisp High-Contrast Daylight',
      icon: <Sun className="w-4 h-4 text-amber-500 shrink-0" />,
    },
    {
      id: 'system',
      label: 'System Default',
      desc: 'Auto-detect OS preference',
      icon: <Monitor className="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" />,
    },
  ];

  const getCurrentThemeLabel = () => {
    if (theme === 'dark') return 'Dark';
    if (theme === 'light') return 'Light';
    return 'System';
  };

  const getThemeIcon = () => {
    if (theme === 'dark') return <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />;
    if (theme === 'light') return <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />;
    return <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500 dark:text-indigo-400" />;
  };

  const handleSelectTheme = (newTheme: 'system' | 'light' | 'dark') => {
    if (onToggleTheme) {
      onToggleTheme(newTheme);
    }
    setIsThemeDropdownOpen(false);
  };

  return (
    <>
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/80 dark:bg-black border-b border-slate-200/80 dark:border-zinc-800 shadow-2xs transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4 max-w-full">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('test')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200 dark:shadow-none group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span className="text-base sm:text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-zinc-100 dark:to-zinc-300">
              Typerca
            </span>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden sm:flex items-center gap-1 p-1 rounded-2xl bg-white/80 dark:bg-black border border-slate-200/60 dark:border-zinc-800 shadow-xs">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-zinc-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabDesktop"
                      className="absolute inset-0 bg-indigo-600 rounded-xl shadow-md shadow-indigo-200 dark:shadow-none"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* User Stats & Animated Progress Bars */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Daily Goal Animated Progress Widget */}
            <div 
              onClick={onOpenGoalSoundModal}
              title={`Daily Goal: ${todayProgress.completed}/${todayProgress.target} ${todayProgress.unit} (${todayProgress.percent}% completed)`}
              className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-black border border-slate-200/80 dark:border-zinc-800 shadow-2xs cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-600 transition-all"
            >
              <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div className="flex flex-col sm:gap-1">
                <div className="flex items-center gap-1 text-[11px] font-extrabold text-slate-800 dark:text-zinc-200 leading-none">
                  <span className="text-indigo-600 dark:text-indigo-400 font-black">{todayProgress.percent}%</span>
                  <span className="hidden md:inline text-slate-500 dark:text-zinc-500">Goal</span>
                </div>
                
                {/* Framer Motion Progress Bar (Desktop & Tablet) */}
                <div className="hidden sm:block w-16 sm:w-20 h-1.5 rounded-full bg-slate-100 dark:bg-zinc-900 overflow-hidden mt-0.5">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, todayProgress.percent)}%` }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  />
                </div>
              </div>
            </div>

            {/* Challenge Animated Progress Bar */}
            <div 
              onClick={() => setActiveTab('challenges')}
              title={`Challenge Progress: ${completedChallengesCount}/${totalChallengesCount} unlocked (${challengePercent}%)`}
              className="hidden md:flex flex-col gap-1 px-3 py-1.5 rounded-2xl bg-white/90 dark:bg-black border border-slate-200/80 dark:border-zinc-800 shadow-xs cursor-pointer hover:border-amber-300 dark:hover:border-amber-600 transition-all"
            >
              <div className="flex items-center justify-between gap-3 text-[11px] font-extrabold text-slate-800 dark:text-zinc-200">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>Quests</span>
                </span>
                <span className="text-amber-600 dark:text-amber-400">{completedChallengesCount}/{totalChallengesCount}</span>
              </div>

              {/* Framer Motion Smooth Progress Bar */}
              <div className="w-16 sm:w-20 h-1.5 rounded-full bg-slate-100 dark:bg-zinc-900 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${challengePercent}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                />
              </div>
            </div>

            {/* Quick Controls: Theme Toggle, Sound, Streak & Settings */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Theme Dropdown Selector */}
              <div className="relative" ref={themeDropdownRef}>
                <button
                  type="button"
                  id="theme-dropdown-trigger"
                  onClick={() => setIsThemeDropdownOpen((prev) => !prev)}
                  title="Toggle Dark / Light Screen Theme (Dropdown)"
                  aria-haspopup="true"
                  aria-expanded={isThemeDropdownOpen}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs cursor-pointer ${
                    isThemeDropdownOpen
                      ? 'bg-indigo-50 dark:bg-zinc-900 border-indigo-400 dark:border-indigo-500 text-indigo-600 dark:text-indigo-300'
                      : 'bg-white/80 dark:bg-black border-slate-200/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-950 hover:border-slate-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {getThemeIcon()}
                  <span className="hidden xs:inline sm:inline text-[11px] font-extrabold tracking-tight">
                    {getCurrentThemeLabel()}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-slate-400 dark:text-zinc-500 transition-transform duration-200 ${
                      isThemeDropdownOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu Popup */}
                <AnimatePresence>
                  {isThemeDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute right-0 mt-1.5 w-56 sm:w-60 p-1.5 rounded-2xl bg-white dark:bg-black border border-slate-200/90 dark:border-zinc-800 shadow-xl shadow-slate-900/10 dark:shadow-black/80 z-50"
                    >
                      <div className="px-2.5 py-1.5 border-b border-slate-100 dark:border-zinc-800/80 mb-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                          Screen Theme
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        {themeOptions.map((opt) => {
                          const isSelected = (theme || 'system') === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectTheme(opt.id)}
                              className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800/80 text-indigo-950 dark:text-indigo-200'
                                  : 'hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-700 dark:text-zinc-300 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="p-1 rounded-lg bg-white dark:bg-zinc-950 shadow-2xs border border-slate-200/60 dark:border-zinc-800 shrink-0">
                                  {opt.icon}
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-xs font-bold leading-tight truncate">
                                    {opt.label}
                                  </span>
                                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 leading-tight truncate">
                                    {opt.desc}
                                  </span>
                                </div>
                              </div>

                              {isSelected && (
                                <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 ml-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sound Toggle */}
              <button
                onClick={onOpenGoalSoundModal}
                title={`Sound Profile: ${soundProfile}`}
                className="p-1.5 sm:p-2 rounded-xl bg-white/80 dark:bg-black border border-slate-200/70 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-900 transition-all shadow-2xs"
              >
                {soundProfile === 'silent' ? (
                  <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 dark:text-zinc-600" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400" />
                )}
              </button>

              {/* Streak Badge */}
              <div 
                onClick={() => setActiveTab('analytics')}
                title="Current Practice Streak"
                className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 border border-orange-200/60 dark:border-orange-500/30 text-orange-700 dark:text-orange-300 text-xs font-black shadow-2xs cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 shrink-0" />
                <span>{streakDays}d</span>
              </div>

              {/* Settings / Goals Modal Launcher */}
              <button
                onClick={onOpenGoalSoundModal}
                title="Settings & Daily Goals"
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-slate-100 dark:bg-black hover:bg-slate-200 dark:hover:bg-zinc-900 border border-slate-300/80 dark:border-zinc-800 shadow-2xs flex items-center justify-center text-slate-700 dark:text-zinc-300 transition-all"
              >
                <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Floating Bottom Mobile Navigation Bar */}
      <nav className="sm:hidden fixed bottom-3 left-3 right-3 z-50 max-w-sm mx-auto bg-slate-900/90 dark:bg-black/95 border border-slate-700/60 dark:border-zinc-800 backdrop-blur-2xl p-1.5 rounded-2xl shadow-2xl shadow-indigo-950/40 flex items-center justify-around ring-1 ring-white/10 dark:ring-white/5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[44px] rounded-xl text-[11px] font-extrabold transition-all duration-200 ease-in-out ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-transparent text-slate-400 dark:text-zinc-500 hover:text-slate-200 dark:hover:text-zinc-300'
              }`}
            >
              <div className="flex flex-col items-center gap-0.5">
                {item.icon}
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </>
  );
};

