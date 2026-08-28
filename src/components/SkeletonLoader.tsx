import React from 'react';

/**
 * Universal Shimmer Effect utility class
 */
const shimmerClass = 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent';

/**
 * Skeleton for the Main Typing Test View & Keyboard
 */
export const TypingAreaSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-6 animate-in fade-in duration-300">
      {/* Top Test Controls Bar Skeleton */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm">
        {/* Mode Pills */}
        <div className="flex items-center gap-2">
          <div className={`h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
          <div className={`h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
          <div className={`h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
        </div>
        {/* Difficulty Pills */}
        <div className="flex items-center gap-2">
          <div className={`h-8 w-16 rounded-lg bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
          <div className={`h-8 w-20 rounded-lg bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
          <div className={`h-8 w-16 rounded-lg bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
        </div>
        {/* Sub-options */}
        <div className="flex items-center gap-2">
          <div className={`h-8 w-12 rounded-lg bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
          <div className={`h-8 w-12 rounded-lg bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
          <div className={`h-8 w-12 rounded-lg bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
        </div>
      </div>

      {/* Live Stats HUD Skeleton */}
      <div className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className={`h-6 w-24 rounded-md bg-indigo-200/60 dark:bg-indigo-900/40 ${shimmerClass}`} />
          <div className={`h-6 w-20 rounded-md bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
        </div>
        <div className="flex items-center gap-3">
          <div className={`h-6 w-16 rounded-md bg-emerald-200/60 dark:bg-emerald-900/40 ${shimmerClass}`} />
          <div className={`h-6 w-20 rounded-md bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
        </div>
      </div>

      {/* Main Typing Text Box Skeleton */}
      <div className="w-full p-8 sm:p-10 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl space-y-4">
        <div className={`h-7 w-11/12 rounded-lg bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
        <div className={`h-7 w-full rounded-lg bg-slate-200/80 dark:bg-slate-800/80 ${shimmerClass}`} />
        <div className={`h-7 w-4/5 rounded-lg bg-slate-200/70 dark:bg-slate-800/70 ${shimmerClass}`} />
        <div className={`h-7 w-5/6 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 ${shimmerClass}`} />
      </div>

      {/* Virtual Keyboard Skeleton */}
      <div className="w-full p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-2.5">
        {/* Row 1 */}
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className={`h-10 w-9 sm:w-11 rounded-lg bg-slate-800/90 ${shimmerClass}`} />
          ))}
          <div className={`h-10 w-14 sm:w-16 rounded-lg bg-slate-700/80 ${shimmerClass}`} />
        </div>
        {/* Row 2 */}
        <div className="flex justify-center gap-1.5">
          <div className={`h-10 w-12 sm:w-14 rounded-lg bg-slate-700/80 ${shimmerClass}`} />
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`h-10 w-9 sm:w-11 rounded-lg bg-slate-800/90 ${shimmerClass}`} />
          ))}
          <div className={`h-10 w-10 sm:w-12 rounded-lg bg-slate-800/90 ${shimmerClass}`} />
        </div>
        {/* Row 3 */}
        <div className="flex justify-center gap-1.5">
          <div className={`h-10 w-14 sm:w-16 rounded-lg bg-slate-700/80 ${shimmerClass}`} />
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className={`h-10 w-9 sm:w-11 rounded-lg bg-slate-800/90 ${shimmerClass}`} />
          ))}
          <div className={`h-10 w-16 sm:w-20 rounded-lg bg-indigo-900/60 ${shimmerClass}`} />
        </div>
        {/* Row 4 */}
        <div className="flex justify-center gap-1.5">
          <div className={`h-10 w-18 sm:w-20 rounded-lg bg-slate-700/80 ${shimmerClass}`} />
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`h-10 w-9 sm:w-11 rounded-lg bg-slate-800/90 ${shimmerClass}`} />
          ))}
          <div className={`h-10 w-18 sm:w-20 rounded-lg bg-slate-700/80 ${shimmerClass}`} />
        </div>
        {/* Row 5 - Spacebar */}
        <div className="flex justify-center gap-1.5">
          <div className={`h-10 w-12 rounded-lg bg-slate-800 ${shimmerClass}`} />
          <div className={`h-10 w-12 rounded-lg bg-slate-800 ${shimmerClass}`} />
          <div className={`h-10 w-56 sm:w-72 rounded-lg bg-indigo-800/60 ${shimmerClass}`} />
          <div className={`h-10 w-12 rounded-lg bg-slate-800 ${shimmerClass}`} />
          <div className={`h-10 w-12 rounded-lg bg-slate-800 ${shimmerClass}`} />
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton for the Pro Analytics Dashboard View
 */
export const ProAnalyticsSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className={`h-4 w-20 rounded bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
              <div className={`h-8 w-8 rounded-xl bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
            </div>
            <div className={`h-8 w-28 rounded-lg bg-indigo-200/70 dark:bg-indigo-900/50 ${shimmerClass}`} />
            <div className={`h-3 w-32 rounded bg-slate-200/70 dark:bg-slate-800/70 ${shimmerClass}`} />
          </div>
        ))}
      </div>

      {/* Main Chart Card Skeleton */}
      <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className={`h-5 w-48 rounded bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
            <div className={`h-3.5 w-64 rounded bg-slate-200/70 dark:bg-slate-800/70 ${shimmerClass}`} />
          </div>
          <div className={`h-8 w-28 rounded-xl bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
        </div>
        <div className={`h-64 w-full rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center ${shimmerClass}`} />
      </div>

      {/* Secondary Metrics & Heatmap Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-4">
          <div className={`h-5 w-36 rounded bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
          <div className="grid grid-cols-4 gap-2.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={`h-14 rounded-xl bg-slate-200/70 dark:bg-slate-800/70 ${shimmerClass}`} />
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-4">
          <div className={`h-5 w-40 rounded bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`h-10 w-full rounded-xl bg-slate-200/60 dark:bg-slate-800/60 ${shimmerClass}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton for the Challenges / Quests View
 */
export const ChallengesSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`h-9 w-24 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shrink-0 ${shimmerClass}`} />
        ))}
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md flex flex-col justify-between h-64 space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`h-10 w-10 rounded-2xl bg-indigo-200/70 dark:bg-indigo-900/50 ${shimmerClass}`} />
                <div className={`h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
              </div>
              <div className={`h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
              <div className={`h-3.5 w-full rounded bg-slate-200/70 dark:bg-slate-800/70 ${shimmerClass}`} />
              <div className={`h-3.5 w-4/5 rounded bg-slate-200/60 dark:bg-slate-800/60 ${shimmerClass}`} />
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className={`h-4 w-20 rounded bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
              <div className={`h-8 w-24 rounded-xl bg-indigo-600/40 ${shimmerClass}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton for the Animated Guide & Knowledge Base View
 */
export const AnimatedGuideSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Search Bar */}
      <div className="p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-4">
        <div className={`h-8 w-64 rounded-xl bg-slate-200 dark:bg-slate-800 ${shimmerClass}`} />
        <div className={`h-4 w-96 max-w-full rounded bg-slate-200/70 dark:bg-slate-800/70 ${shimmerClass}`} />
        <div className={`h-11 w-full max-w-md rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${shimmerClass}`} />
      </div>

      {/* Sub Tabs Pill Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`h-9 w-28 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shrink-0 ${shimmerClass}`} />
        ))}
      </div>

      {/* Guide Content Area Skeleton */}
      <div className="p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-6">
        <div className={`h-6 w-72 rounded-lg bg-indigo-200/70 dark:bg-indigo-900/50 ${shimmerClass}`} />
        <div className="space-y-2.5">
          <div className={`h-4 w-full rounded bg-slate-200/80 dark:bg-slate-800/80 ${shimmerClass}`} />
          <div className={`h-4 w-11/12 rounded bg-slate-200/80 dark:bg-slate-800/80 ${shimmerClass}`} />
          <div className={`h-4 w-5/6 rounded bg-slate-200/70 dark:bg-slate-800/70 ${shimmerClass}`} />
        </div>
        <div className={`h-48 w-full rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 ${shimmerClass}`} />
      </div>
    </div>
  );
};
