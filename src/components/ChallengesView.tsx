import React, { useState, useMemo } from 'react';
import { TYPING_CHALLENGES } from '../data/challenges';
import { TypingChallenge, TestResult } from '../types';
import { Trophy, Zap, Target, Flame, Code, Activity, EyeOff, Crown, CheckCircle2, Play, Award, Search, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface ChallengesViewProps {
  completedIds: string[];
  testResults: TestResult[];
  onStartChallenge: (challenge: TypingChallenge) => void;
}

const ITEMS_PER_PAGE = 24;

export const ChallengesView: React.FC<ChallengesViewProps> = ({
  completedIds,
  onStartChallenge,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'easy' | 'medium' | 'hard' | 'legendary' | 'passed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate user XP and Level across 1050+ challenges
  const totalXp = useMemo(() => {
    return TYPING_CHALLENGES.reduce((sum, ch) => {
      return completedIds.includes(ch.id) ? sum + ch.xpReward : sum;
    }, 0);
  }, [completedIds]);

  const level = Math.floor(totalXp / 250) + 1;
  const xpInCurrentLevel = totalXp % 250;
  const levelProgressPercent = Math.min(100, Math.round((xpInCurrentLevel / 250) * 100));

  // Filter & Search Logic
  const filteredChallenges = useMemo(() => {
    return TYPING_CHALLENGES.filter((ch) => {
      // Difficulty / Passed filter
      if (selectedFilter === 'passed') {
        if (!completedIds.includes(ch.id)) return false;
      } else if (selectedFilter !== 'all') {
        if (ch.difficulty !== selectedFilter) return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = ch.title.toLowerCase().includes(q);
        const matchDesc = ch.description.toLowerCase().includes(q);
        const matchBadge = ch.badge.toLowerCase().includes(q);
        const matchMode = ch.modeDetail.toLowerCase().includes(q);
        const matchId = ch.id.toLowerCase().includes(q);
        return matchTitle || matchDesc || matchBadge || matchMode || matchId;
      }

      return true;
    });
  }, [selectedFilter, searchQuery, completedIds]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredChallenges.length / ITEMS_PER_PAGE));
  const pageIndex = Math.min(currentPage, totalPages);
  
  const paginatedChallenges = useMemo(() => {
    const start = (pageIndex - 1) * ITEMS_PER_PAGE;
    return filteredChallenges.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredChallenges, pageIndex]);

  const handleFilterChange = (filter: 'all' | 'easy' | 'medium' | 'hard' | 'legendary' | 'passed') => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Target': return <Target className="w-5 h-5 text-emerald-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-rose-500" />;
      case 'Code': return <Code className="w-5 h-5 text-sky-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-indigo-500" />;
      case 'EyeOff': return <EyeOff className="w-5 h-5 text-purple-500" />;
      case 'Crown': return <Crown className="w-5 h-5 text-yellow-500" />;
      default: return <Trophy className="w-5 h-5 text-indigo-500" />;
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'easy':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">Easy</span>;
      case 'medium':
        return <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold uppercase">Medium</span>;
      case 'hard':
        return <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold uppercase">Hard</span>;
      case 'legendary':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold uppercase animate-pulse">Legendary</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 p-4 sm:p-8 animate-in fade-in duration-300">
      
      {/* Header Banner & Level XP Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Background Decorative Glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-lg">
            <Award className="w-9 h-9 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">1,050+ Challenge Library</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px]">
                {completedIds.length} / {TYPING_CHALLENGES.length} Unlocked
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-0.5">Typing Quests & Skill Challenges</h1>
            <p className="text-xs sm:text-sm text-indigo-100 font-medium mt-1 max-w-lg">
              Explore over 1,000 progressive challenges ranging from home-row warmups and code snippets to 150 WPM Sonic Apex bursts!
            </p>
          </div>
        </div>

        {/* Level & XP Card */}
        <div className="w-full md:w-64 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md relative z-10 flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-indigo-200">Typist Rank</span>
            <span className="text-amber-300 text-sm font-black">Level {level}</span>
          </div>

          {/* XP Progress Bar */}
          <div className="w-full h-2.5 rounded-full bg-black/20 overflow-hidden p-0.5 border border-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 shadow-xs"
              initial={{ width: 0 }}
              animate={{ width: `${levelProgressPercent}%` }}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-indigo-100 font-semibold">
            <span>{totalXp} Total XP</span>
            <span>{xpInCurrentLevel}/250 to Level {level + 1}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar + Search Box */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search 1,000+ challenges (e.g. Level 50, Code, 100 WPM)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Tier Filters */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/70 border border-slate-200/80 backdrop-blur-md shadow-xs overflow-x-auto scrollbar-none">
          {(['all', 'easy', 'medium', 'hard', 'legendary', 'passed'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition-all ${
                selectedFilter === filter
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {filter === 'passed' ? `Passed (${completedIds.length})` : filter}
            </button>
          ))}
        </div>
      </div>

      {/* Counter & Page Info Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>Showing <strong className="text-slate-900">{filteredChallenges.length}</strong> matching challenges</span>
        </div>
        <span>Page {pageIndex} of {totalPages}</span>
      </div>

      {/* Challenges Grid */}
      {paginatedChallenges.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/60 border border-slate-200 flex flex-col items-center justify-center gap-3">
          <Search className="w-8 h-8 text-slate-300" />
          <h3 className="text-lg font-bold text-slate-700">No challenges found</h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Try adjusting your search query or selecting a different difficulty filter above.
          </p>
          <button
            onClick={() => { setSelectedFilter('all'); setSearchQuery(''); }}
            className="mt-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-200"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedChallenges.map((challenge) => {
            const isCompleted = completedIds.includes(challenge.id);

            return (
              <div
                key={challenge.id}
                className={`p-5 rounded-3xl border transition-all relative flex flex-col justify-between gap-4 ${
                  isCompleted
                    ? 'bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/30 border-emerald-300 shadow-xs'
                    : 'bg-white/80 backdrop-blur-xl border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Row: Icon, Badge, XP */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2.5 rounded-2xl flex items-center justify-center ${
                        isCompleted ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {getIconComponent(challenge.icon)}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">{challenge.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getDifficultyBadge(challenge.difficulty)}
                          <span className="text-[11px] font-bold text-indigo-600">+{challenge.xpReward} XP</span>
                        </div>
                      </div>
                    </div>

                    {isCompleted && (
                      <div className="flex items-center gap-1 text-emerald-700 bg-emerald-100/90 px-2.5 py-1 rounded-xl font-bold text-[11px] shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Passed</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {challenge.description}
                  </p>

                  {/* Target Criteria Pill */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80">
                    <span className="flex items-center gap-1 font-bold text-slate-900">
                      <Zap className="w-3.5 h-3.5 text-indigo-600" /> Target: {challenge.targetWpm} WPM
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-bold text-slate-900">
                      <Target className="w-3.5 h-3.5 text-emerald-600" /> {challenge.targetAccuracy}% Accuracy
                    </span>
                    <span>•</span>
                    <span className="text-slate-500">{challenge.modeDetail}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-slate-400">
                    {isCompleted ? 'Replay anytime' : 'Ready to start?'}
                  </span>

                  <button
                    onClick={() => onStartChallenge(challenge)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all active:scale-95 ${
                      isCompleted
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isCompleted ? 'Replay' : 'Start'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-200/80 flex-wrap">
          <div className="text-xs font-semibold text-slate-500">
            Page <strong className="text-slate-800">{pageIndex}</strong> of <strong className="text-slate-800">{totalPages}</strong>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={pageIndex === 1}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={pageIndex === 1}
              className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 font-extrabold text-xs font-mono">
              {pageIndex} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={pageIndex === totalPages}
              className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={pageIndex === totalPages}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Last
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
