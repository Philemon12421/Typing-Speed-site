import React, { useState } from 'react';
import { TYPING_CHALLENGES } from '../data/challenges';
import { TypingChallenge, TestResult } from '../types';
import { Trophy, Zap, Target, Flame, Code, Activity, EyeOff, Crown, CheckCircle2, Play, Sparkles, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface ChallengesViewProps {
  completedIds: string[];
  testResults: TestResult[];
  onStartChallenge: (challenge: TypingChallenge) => void;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({
  completedIds,
  testResults,
  onStartChallenge,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'easy' | 'medium' | 'hard' | 'legendary'>('all');

  // Calculate user XP and Level
  const totalXp = TYPING_CHALLENGES.reduce((sum, ch) => {
    return completedIds.includes(ch.id) ? sum + ch.xpReward : sum;
  }, 0);

  const level = Math.floor(totalXp / 250) + 1;
  const xpInCurrentLevel = totalXp % 250;
  const levelProgressPercent = Math.min(100, Math.round((xpInCurrentLevel / 250) * 100));

  const filteredChallenges = TYPING_CHALLENGES.filter((ch) => {
    if (selectedFilter === 'all') return true;
    return ch.difficulty === selectedFilter;
  });

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
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Typing Mastery Quests</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px]">
                {completedIds.length}/{TYPING_CHALLENGES.length} Unlocked
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-0.5">Typing Skill Challenges</h1>
            <p className="text-xs sm:text-sm text-indigo-100 font-medium mt-1 max-w-lg">
              Test your speed, accuracy, endurance, and precision under special constraints to earn XP and level up your typing rank!
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

      {/* Filter Tabs Bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/70 border border-white/60 backdrop-blur-md shadow-sm">
          {(['all', 'easy', 'medium', 'hard', 'legendary'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                selectedFilter === filter
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Showing <strong className="text-slate-800">{filteredChallenges.length}</strong> challenges
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChallenges.map((challenge) => {
          const isCompleted = completedIds.includes(challenge.id);

          return (
            <div
              key={challenge.id}
              className={`p-6 rounded-3xl border transition-all relative flex flex-col justify-between gap-4 ${
                isCompleted
                  ? 'bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/30 border-emerald-300 shadow-sm'
                  : 'bg-white/70 backdrop-blur-xl border-white/60 hover:border-indigo-300 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {/* Top Row: Icon, Badge, XP */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2.5 rounded-2xl flex items-center justify-center ${
                      isCompleted ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {getIconComponent(challenge.icon)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{challenge.title}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        {getDifficultyBadge(challenge.difficulty)}
                        <span className="text-[11px] font-bold text-indigo-600">+{challenge.xpReward} XP</span>
                      </div>
                    </div>
                  </div>

                  {isCompleted && (
                    <div className="flex items-center gap-1 text-emerald-700 bg-emerald-100/90 px-3 py-1 rounded-xl font-bold text-xs shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Passed</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {challenge.description}
                </p>

                {/* Target Criteria Pill */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80">
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
                  {isCompleted ? 'Challenge passed! You can replay anytime.' : 'Ready to test your limits?'}
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
                  <span>{isCompleted ? 'Replay Challenge' : 'Start Challenge'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
