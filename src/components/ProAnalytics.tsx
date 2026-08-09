import React, { useState } from 'react';
import { TestResult, MilestoneBadge, LeaderboardEntry } from '../types';
import { getOverallAnalytics, clearTestHistory, deleteTestResult, exportUserDataJSON, importUserDataJSON, getRegisteredUsers, saveOrUpdateRegisteredUser } from '../utils/storage';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import {
  Trophy,
  BarChart2,
  Flame,
  Clock,
  Target,
  Zap,
  Trash2,
  Download,
  Upload,
  CheckCircle2,
  Search,
  FileSpreadsheet,
  Award,
  Crown,
  Medal,
  User,
  Sparkles,
  Lock,
  ChevronRight,
  TrendingUp,
  UserCheck,
} from 'lucide-react';

interface ProAnalyticsProps {
  results: TestResult[];
  onRefreshResults: () => void;
  userName?: string;
  onOpenRegisterModal?: () => void;
}

const MILESTONE_BADGES_DEF: MilestoneBadge[] = [
  // WPM SPEED MILESTONES (18 badges)
  { id: 'wpm_15', title: 'First Keystrokes', description: 'Reach 15+ WPM typing speed', category: 'wpm', reqValue: 15, iconSymbol: '🌱', badgeLabel: '15 WPM', color: 'from-emerald-400 to-teal-500' },
  { id: 'wpm_25', title: 'Steady Pace', description: 'Reach 25+ WPM typing speed', category: 'wpm', reqValue: 25, iconSymbol: '🚶', badgeLabel: '25 WPM', color: 'from-emerald-500 to-teal-600' },
  { id: 'wpm_35', title: 'Flow State', description: 'Reach 35+ WPM typing speed', category: 'wpm', reqValue: 35, iconSymbol: '🌊', badgeLabel: '35 WPM', color: 'from-cyan-500 to-blue-500' },
  { id: 'wpm_45', title: 'Rapid Rhythm', description: 'Reach 45+ WPM typing speed', category: 'wpm', reqValue: 45, iconSymbol: '⚡', badgeLabel: '45 WPM', color: 'from-blue-500 to-indigo-500' },
  { id: 'wpm_55', title: 'Speedster', description: 'Reach 55+ WPM typing speed', category: 'wpm', reqValue: 55, iconSymbol: '🏃', badgeLabel: '55 WPM', color: 'from-indigo-500 to-violet-600' },
  { id: 'wpm_65', title: 'Keyboard Runner', description: 'Reach 65+ WPM typing speed', category: 'wpm', reqValue: 65, iconSymbol: '🚀', badgeLabel: '65 WPM', color: 'from-violet-500 to-purple-600' },
  { id: 'wpm_75', title: 'Pro Typist', description: 'Reach 75+ WPM typing speed', category: 'wpm', reqValue: 75, iconSymbol: '🔥', badgeLabel: '75 WPM', color: 'from-purple-500 to-fuchsia-600' },
  { id: 'wpm_85', title: 'Ninja Fingers', description: 'Reach 85+ WPM typing speed', category: 'wpm', reqValue: 85, iconSymbol: '🥷', badgeLabel: '85 WPM', color: 'from-fuchsia-500 to-pink-600' },
  { id: 'wpm_95', title: 'Typing Master', description: 'Reach 95+ WPM typing speed', category: 'wpm', reqValue: 95, iconSymbol: '👑', badgeLabel: '95 WPM', color: 'from-pink-500 to-rose-600' },
  { id: 'wpm_105', title: 'Century Club', description: 'Cross 100 WPM milestone (105+ WPM)', category: 'wpm', reqValue: 105, iconSymbol: '💯', badgeLabel: '105 WPM', color: 'from-rose-500 to-red-600' },
  { id: 'wpm_115', title: 'Grandmaster', description: 'Reach 115+ WPM typing speed', category: 'wpm', reqValue: 115, iconSymbol: '🏆', badgeLabel: '115 WPM', color: 'from-amber-500 to-yellow-600' },
  { id: 'wpm_125', title: 'Lightning Fingers', description: 'Reach 125+ WPM typing speed', category: 'wpm', reqValue: 125, iconSymbol: '⚡', badgeLabel: '125 WPM', color: 'from-yellow-400 to-amber-600' },
  { id: 'wpm_135', title: 'God Speed', description: 'Reach 135+ WPM typing speed', category: 'wpm', reqValue: 135, iconSymbol: '🌠', badgeLabel: '135 WPM', color: 'from-sky-400 to-blue-600' },
  { id: 'wpm_145', title: 'Sonic Speedster', description: 'Reach 145+ WPM typing speed', category: 'wpm', reqValue: 145, iconSymbol: '🌀', badgeLabel: '145 WPM', color: 'from-cyan-400 to-teal-600' },
  { id: 'wpm_155', title: 'Titan Velocity', description: 'Reach 155+ WPM typing speed', category: 'wpm', reqValue: 155, iconSymbol: '✨', badgeLabel: '155 WPM', color: 'from-indigo-600 to-purple-800' },
  { id: 'wpm_165', title: 'Hyper Drive', description: 'Reach 165+ WPM typing speed', category: 'wpm', reqValue: 165, iconSymbol: '💫', badgeLabel: '165 WPM', color: 'from-fuchsia-600 to-pink-800' },
  { id: 'wpm_175', title: 'Warp Speed', description: 'Reach 175+ WPM typing speed', category: 'wpm', reqValue: 175, iconSymbol: '🌌', badgeLabel: '175 WPM', color: 'from-purple-800 to-slate-900' },
  { id: 'wpm_200', title: 'Typing Deity 200', description: 'Achieve legendary 200+ WPM peak speed', category: 'wpm', reqValue: 200, iconSymbol: '🔱', badgeLabel: '200 WPM', color: 'from-amber-300 via-yellow-400 to-amber-600' },

  // ACCURACY MILESTONES (9 badges)
  { id: 'acc_90', title: 'Clean Touch', description: 'Achieve 90%+ accuracy in a completed test', category: 'accuracy', reqValue: 90, iconSymbol: '🎯', badgeLabel: '90% Acc', color: 'from-emerald-400 to-teal-500' },
  { id: 'acc_92', title: 'Sharpshooter', description: 'Achieve 92%+ accuracy in a completed test', category: 'accuracy', reqValue: 92, iconSymbol: '🏹', badgeLabel: '92% Acc', color: 'from-teal-500 to-emerald-600' },
  { id: 'acc_94', title: 'Precision Mind', description: 'Achieve 94%+ accuracy in a completed test', category: 'accuracy', reqValue: 94, iconSymbol: '🧠', badgeLabel: '94% Acc', color: 'from-cyan-500 to-blue-600' },
  { id: 'acc_96', title: 'Laser Focus', description: 'Achieve 96%+ accuracy in a completed test', category: 'accuracy', reqValue: 96, iconSymbol: '🔍', badgeLabel: '96% Acc', color: 'from-blue-500 to-indigo-600' },
  { id: 'acc_98', title: 'Laser Precision', description: 'Achieve 98%+ accuracy in a completed test', category: 'accuracy', reqValue: 98, iconSymbol: '💎', badgeLabel: '98% Acc', color: 'from-indigo-500 to-violet-600' },
  { id: 'acc_99', title: 'Surgical Accuracy', description: 'Achieve 99%+ accuracy in a completed test', category: 'accuracy', reqValue: 99, iconSymbol: '⚔️', badgeLabel: '99% Acc', color: 'from-violet-500 to-purple-600' },
  { id: 'acc_100', title: 'Flawless Perfection', description: 'Score 100% 0-error flawless accuracy in a completed test', category: 'accuracy', reqValue: 100, iconSymbol: '🌟', badgeLabel: '100% Perfect', color: 'from-amber-400 to-yellow-500' },
  { id: 'acc_98_3tests', title: 'Consistent Sniper', description: 'Maintain 98%+ peak accuracy benchmark', category: 'accuracy', reqValue: 98, iconSymbol: '🎯', badgeLabel: '98%+ Sniper', color: 'from-rose-500 to-pink-600' },
  { id: 'acc_99_master', title: 'Zero Drift', description: 'Reach 99% accuracy peak excellence', category: 'accuracy', reqValue: 99, iconSymbol: '🛡️', badgeLabel: 'Zero Drift', color: 'from-sky-400 to-indigo-600' },

  // TESTS COMPLETED MILESTONES (12 badges)
  { id: 'tests_1', title: 'First Flight', description: 'Complete your first practice test', category: 'tests', reqValue: 1, iconSymbol: '🐣', badgeLabel: '1 Test', color: 'from-emerald-400 to-teal-500' },
  { id: 'tests_5', title: 'Getting Started', description: 'Complete 5 practice tests', category: 'tests', reqValue: 5, iconSymbol: '🌱', badgeLabel: '5 Tests', color: 'from-emerald-500 to-teal-600' },
  { id: 'tests_10', title: 'Dedicated Typist', description: 'Complete 10 practice tests', category: 'tests', reqValue: 10, iconSymbol: '📚', badgeLabel: '10 Tests', color: 'from-cyan-500 to-blue-600' },
  { id: 'tests_25', title: 'Test Centurion', description: 'Complete 25 practice tests', category: 'tests', reqValue: 25, iconSymbol: '🛡️', badgeLabel: '25 Tests', color: 'from-blue-500 to-indigo-600' },
  { id: 'tests_50', title: 'Typing Veteran', description: 'Complete 50 practice tests', category: 'tests', reqValue: 50, iconSymbol: '🏅', badgeLabel: '50 Tests', color: 'from-indigo-500 to-purple-600' },
  { id: 'tests_75', title: 'Routine Master', description: 'Complete 75 practice tests', category: 'tests', reqValue: 75, iconSymbol: '🎗️', badgeLabel: '75 Tests', color: 'from-violet-500 to-purple-700' },
  { id: 'tests_100', title: 'Centennial Typist', description: 'Complete 100 practice tests', category: 'tests', reqValue: 100, iconSymbol: '💯', badgeLabel: '100 Tests', color: 'from-purple-600 to-pink-600' },
  { id: 'tests_150', title: 'Test Machine', description: 'Complete 150 practice tests', category: 'tests', reqValue: 150, iconSymbol: '🤖', badgeLabel: '150 Tests', color: 'from-pink-500 to-rose-600' },
  { id: 'tests_200', title: 'Endurance Legend', description: 'Complete 200 practice tests', category: 'tests', reqValue: 200, iconSymbol: '🏛️', badgeLabel: '200 Tests', color: 'from-rose-600 to-red-700' },
  { id: 'tests_300', title: 'Typing Immortal', description: 'Complete 300 practice tests', category: 'tests', reqValue: 300, iconSymbol: '👑', badgeLabel: '300 Tests', color: 'from-amber-500 to-yellow-600' },
  { id: 'tests_400', title: 'Steel Keyboards', description: 'Complete 400 practice tests', category: 'tests', reqValue: 400, iconSymbol: '⚔️', badgeLabel: '400 Tests', color: 'from-slate-700 to-slate-900' },
  { id: 'tests_500', title: 'Half Millennium', description: 'Complete 500 practice tests', category: 'tests', reqValue: 500, iconSymbol: '🌟', badgeLabel: '500 Tests', color: 'from-amber-400 via-yellow-500 to-amber-700' },

  // STREAK MILESTONES (11 badges)
  { id: 'streak_1', title: 'Daily Spark', description: 'Start your practice streak (1 day)', category: 'streak', reqValue: 1, iconSymbol: '🕯️', badgeLabel: '1d Streak', color: 'from-amber-400 to-orange-500' },
  { id: 'streak_2', title: 'Momentum', description: 'Maintain a 2-day practice streak', category: 'streak', reqValue: 2, iconSymbol: '⚡', badgeLabel: '2d Streak', color: 'from-orange-400 to-amber-600' },
  { id: 'streak_3', title: 'Habit Formed', description: 'Maintain a 3-day practice streak', category: 'streak', reqValue: 3, iconSymbol: '🔥', badgeLabel: '3d Streak', color: 'from-orange-500 to-rose-500' },
  { id: 'streak_5', title: 'Streak Warrior', description: 'Maintain a 5-day practice streak', category: 'streak', reqValue: 5, iconSymbol: '⚔️', badgeLabel: '5d Streak', color: 'from-rose-500 to-red-600' },
  { id: 'streak_7', title: 'Full Week Habit', description: 'Maintain a 7-day practice streak', category: 'streak', reqValue: 7, iconSymbol: '📅', badgeLabel: '7d Streak', color: 'from-purple-500 to-indigo-600' },
  { id: 'streak_10', title: 'Iron Discipline', description: 'Maintain a 10-day practice streak', category: 'streak', reqValue: 10, iconSymbol: '🛡️', badgeLabel: '10d Streak', color: 'from-indigo-600 to-blue-600' },
  { id: 'streak_14', title: 'Fortnight Focus', description: 'Maintain a 14-day practice streak', category: 'streak', reqValue: 14, iconSymbol: '🏹', badgeLabel: '14d Streak', color: 'from-blue-600 to-teal-600' },
  { id: 'streak_21', title: 'Habit Master', description: 'Maintain a 21-day practice streak', category: 'streak', reqValue: 21, iconSymbol: '🏆', badgeLabel: '21d Streak', color: 'from-teal-500 to-emerald-600' },
  { id: 'streak_30', title: 'Monthly Legend', description: 'Maintain a 30-day practice streak', category: 'streak', reqValue: 30, iconSymbol: '👑', badgeLabel: '30d Streak', color: 'from-amber-500 to-yellow-600' },
  { id: 'streak_60', title: 'Two Months Unstoppable', description: 'Maintain a 60-day practice streak', category: 'streak', reqValue: 60, iconSymbol: '🌋', badgeLabel: '60d Streak', color: 'from-rose-600 to-pink-700' },
  { id: 'streak_100', title: '100-Day Streak Titan', description: 'Maintain an incredible 100-day practice streak', category: 'streak', reqValue: 100, iconSymbol: '☀️', badgeLabel: '100d Streak', color: 'from-amber-300 via-yellow-400 to-amber-600' },

  // TOTAL WORDS TYPED MILESTONES (8 badges)
  { id: 'words_100', title: 'First Paragraph', description: 'Type 100 total correct words', category: 'words', reqValue: 100, iconSymbol: '📝', badgeLabel: '100 Words', color: 'from-emerald-400 to-teal-500' },
  { id: 'words_500', title: 'Essayist', description: 'Type 500 total correct words', category: 'words', reqValue: 500, iconSymbol: '📑', badgeLabel: '500 Words', color: 'from-teal-500 to-cyan-600' },
  { id: 'words_1000', title: 'Article Writer', description: 'Type 1,000 total correct words', category: 'words', reqValue: 1000, iconSymbol: '📰', badgeLabel: '1,000 Words', color: 'from-cyan-600 to-blue-600' },
  { id: 'words_2500', title: 'Short Story Scribe', description: 'Type 2,500 total correct words', category: 'words', reqValue: 2500, iconSymbol: '📖', badgeLabel: '2,500 Words', color: 'from-blue-600 to-indigo-600' },
  { id: 'words_5000', title: 'Novelist in Training', description: 'Type 5,000 total correct words', category: 'words', reqValue: 5000, iconSymbol: '📕', badgeLabel: '5,000 Words', color: 'from-indigo-600 to-purple-600' },
  { id: 'words_10000', title: 'Wordsmith Master', description: 'Type 10,000 total correct words', category: 'words', reqValue: 10000, iconSymbol: '🖋️', badgeLabel: '10,000 Words', color: 'from-purple-600 to-fuchsia-600' },
  { id: 'words_25000', title: 'Literary Titan', description: 'Type 25,000 total correct words', category: 'words', reqValue: 25000, iconSymbol: '📚', badgeLabel: '25,000 Words', color: 'from-fuchsia-600 to-rose-600' },
  { id: 'words_50000', title: '50,000 Words Author', description: 'Type a full novel volume of 50,000 words!', category: 'words', reqValue: 50000, iconSymbol: '📜', badgeLabel: '50,000 Words', color: 'from-amber-400 via-yellow-500 to-amber-700' },

  // PRACTICE TIME MILESTONES (8 badges)
  { id: 'time_5', title: '5-Minute Warmup', description: 'Accumulate 5 total minutes of typing practice', category: 'time', reqValue: 5, iconSymbol: '⏱️', badgeLabel: '5 Mins', color: 'from-emerald-400 to-teal-500' },
  { id: 'time_15', title: '15-Minute Session', description: 'Accumulate 15 total minutes of typing practice', category: 'time', reqValue: 15, iconSymbol: '⏲️', badgeLabel: '15 Mins', color: 'from-teal-500 to-cyan-600' },
  { id: 'time_30', title: 'Half Hour Focus', description: 'Accumulate 30 total minutes of typing practice', category: 'time', reqValue: 30, iconSymbol: '⏰', badgeLabel: '30 Mins', color: 'from-cyan-600 to-blue-600' },
  { id: 'time_60', title: '1 Hour Practiced', description: 'Accumulate 60 total minutes (1 Hour) of practice', category: 'time', reqValue: 60, iconSymbol: '⌛', badgeLabel: '1 Hour', color: 'from-blue-600 to-indigo-600' },
  { id: 'time_120', title: '2 Hours Master', description: 'Accumulate 2 hours of typing practice', category: 'time', reqValue: 120, iconSymbol: '🕰️', badgeLabel: '2 Hours', color: 'from-indigo-600 to-purple-600' },
  { id: 'time_300', title: '5 Hours Dedicated', description: 'Accumulate 5 hours of focused typing', category: 'time', reqValue: 300, iconSymbol: '🎓', badgeLabel: '5 Hours', color: 'from-purple-600 to-pink-600' },
  { id: 'time_600', title: '10 Hours Veteran', description: 'Accumulate 10 full hours of touch typing', category: 'time', reqValue: 600, iconSymbol: '🔮', badgeLabel: '10 Hours', color: 'from-pink-600 to-rose-600' },
  { id: 'time_1440', title: '24 Hours Clock', description: 'Accumulate a full 24 hours (1 Day) of active keystroke practice!', category: 'time', reqValue: 1440, iconSymbol: '👑', badgeLabel: '24 Hours', color: 'from-amber-400 via-yellow-500 to-amber-700' },
];

export const ProAnalytics: React.FC<ProAnalyticsProps> = ({
  results,
  onRefreshResults,
  userName = '',
  onOpenRegisterModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'badges' | 'leaderboard' | 'history'>('overview');

  const analytics = getOverallAnalytics();
  const maxAccuracy = results.length > 0 ? Math.max(...results.map((r) => r.accuracy)) : 0;

  // Compute Unlocked Badges across all 60+ milestone definitions
  const badgesWithStatus = MILESTONE_BADGES_DEF.map((badge) => {
    let currentValue = 0;
    if (badge.category === 'wpm') currentValue = analytics.bestWpm;
    if (badge.category === 'tests') currentValue = analytics.totalTests;
    if (badge.category === 'accuracy') currentValue = maxAccuracy;
    if (badge.category === 'streak') currentValue = analytics.currentStreakDays;
    if (badge.category === 'words') currentValue = analytics.totalWords || 0;
    if (badge.category === 'time') currentValue = Math.round((analytics.totalTimeSeconds || 0) / 60);

    const isUnlocked = currentValue >= badge.reqValue;
    const progressPercent = Math.min(100, Math.round((currentValue / badge.reqValue) * 100));

    return {
      ...badge,
      currentValue,
      isUnlocked,
      progressPercent,
    };
  });

  const unlockedCount = badgesWithStatus.filter((b) => b.isUnlocked).length;

  // Real Registered Users Weekly Leaderboard (ALL MOCK / FAKE USERS REMOVED)
  const isUserRegistered = Boolean(userName && userName.trim().length >= 3 && userName !== 'Pro Typist');

  // Sync active user to registered users database if registered
  if (isUserRegistered) {
    saveOrUpdateRegisteredUser(
      userName,
      analytics.bestWpm,
      analytics.avgAccuracy,
      analytics.totalTests
    );
  }

  const realRegisteredUsers = getRegisteredUsers();

  const fullLeaderboardList: LeaderboardEntry[] = realRegisteredUsers
    .map((u) => ({
      id: u.id,
      rank: 0,
      username: u.username,
      uniqueHandle: u.uniqueHandle,
      wpm: u.wpm,
      accuracy: u.accuracy,
      testsCount: u.testsCount,
      isCurrentUser: u.username.toLowerCase() === userName.trim().toLowerCase(),
      registeredDate: u.registeredDate,
      badge: u.badge,
    }))
    .sort((a, b) => b.wpm - a.wpm);

  fullLeaderboardList.forEach((entry, idx) => {
    entry.rank = idx + 1;
  });

  // Prepare chart data chronologically (oldest to newest)
  const chartData = [...results]
    .reverse()
    .map((r, i) => ({
      index: i + 1,
      wpm: r.wpm,
      rawWpm: r.rawWpm,
      accuracy: r.accuracy,
      date: new Date(r.timestamp).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      }),
    }));

  // WPM Distribution grouping
  const distributionData = [
    { range: '< 30 WPM', count: results.filter((r) => r.wpm < 30).length },
    { range: '30-49 WPM', count: results.filter((r) => r.wpm >= 30 && r.wpm < 50).length },
    { range: '50-69 WPM', count: results.filter((r) => r.wpm >= 50 && r.wpm < 70).length },
    { range: '70-89 WPM', count: results.filter((r) => r.wpm >= 70 && r.wpm < 90).length },
    { range: '90+ WPM', count: results.filter((r) => r.wpm >= 90).length },
  ];

  // 30-Day Typing Activity & WPM Trend Bar Chart data
  const last30DaysData = React.useMemo(() => {
    const daysMap: { [key: string]: { tests: number; totalWpm: number; maxWpm: number; dateStr: string } } = {};
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const dateStr = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      daysMap[key] = { tests: 0, totalWpm: 0, maxWpm: 0, dateStr };
    }

    results.forEach((r) => {
      const key = new Date(r.timestamp).toISOString().split('T')[0];
      if (daysMap[key]) {
        daysMap[key].tests += 1;
        daysMap[key].totalWpm += r.wpm;
        if (r.wpm > daysMap[key].maxWpm) {
          daysMap[key].maxWpm = r.wpm;
        }
      }
    });

    return Object.values(daysMap).map((item) => ({
      date: item.dateStr,
      testsCount: item.tests,
      avgWpm: item.tests > 0 ? Math.round(item.totalWpm / item.tests) : 0,
      peakWpm: item.maxWpm,
    }));
  }, [results]);

  // Filtered history table
  const filteredResults = results.filter(
    (r) =>
      r.mode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.modeDetail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.wpm.toString().includes(searchTerm)
  );

  const handleDelete = (id: string) => {
    deleteTestResult(id);
    onRefreshResults();
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all test history? This cannot be undone.')) {
      clearTestHistory();
      onRefreshResults();
    }
  };

  const handleExportJSON = () => {
    const jsonStr = exportUserDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `typerca_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    if (results.length === 0) return;
    const headers = ['Date', 'WPM', 'Raw WPM', 'Accuracy', 'Consistency', 'Mode', 'Mode Detail', 'Time (s)'];
    const rows = results.map((r) => [
      new Date(r.timestamp).toISOString(),
      r.wpm,
      r.rawWpm,
      `${r.accuracy}%`,
      `${r.consistency}%`,
      r.mode,
      r.modeDetail,
      r.timeSeconds,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `typerca_test_history_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importUserDataJSON(content);
      if (success) {
        setImportStatus('Successfully restored test records!');
        onRefreshResults();
      } else {
        setImportStatus('Failed to import file. Please check format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 backdrop-blur-md flex items-center justify-center shrink-0 shadow-xl text-indigo-400">
            <Trophy className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Typerca Analytics & Leaderboard</h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
              Track lifetime milestones, claim your weekly rank, and analyze speed metrics.
            </p>
          </div>
        </div>

        {/* Username Registration Button / Badge */}
        <div className="relative z-10 shrink-0">
          <button
            onClick={onOpenRegisterModal}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white font-bold text-xs shadow-lg transition-all active:scale-95"
          >
            <User className="w-4 h-4 text-amber-400" />
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] text-slate-300 uppercase font-semibold">
                {isUserRegistered ? 'Leaderboard Handle' : 'Join Leaderboard'}
              </span>
              <span className="text-xs font-black text-white">
                {isUserRegistered ? `@${userName}` : 'Claim Unique Username'}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Analytics Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200/80 shadow-xs overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
            activeSubTab === 'overview'
              ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Performance Overview</span>
        </button>

        <button
          onClick={() => setActiveSubTab('badges')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
            activeSubTab === 'badges'
              ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4 text-amber-500" />
          <span>Milestone Badges ({unlockedCount}/{MILESTONE_BADGES_DEF.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('leaderboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
            activeSubTab === 'leaderboard'
              ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Crown className="w-4 h-4 text-amber-500" />
          <span>Weekly Leaderboard</span>
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
            activeSubTab === 'history'
              ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/60'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Full Test History</span>
        </button>
      </div>

      {/* SUB-VIEW 1: OVERVIEW & CHARTS */}
      {activeSubTab === 'overview' && (
        <div className="flex flex-col gap-6">
          {/* Aggregate Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 flex flex-col gap-1">
              <div className="flex items-center justify-between text-indigo-700 text-xs font-semibold">
                <span>Best Speed</span>
                <Trophy className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-3xl font-black text-indigo-900">{analytics.bestWpm}</span>
              <span className="text-[10px] text-indigo-600 font-semibold uppercase">WPM</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/80 flex flex-col gap-1">
              <div className="flex items-center justify-between text-slate-600 text-xs font-semibold">
                <span>Avg Speed</span>
                <Zap className="w-4 h-4 text-indigo-600" />
              </div>
              <span className="text-3xl font-black text-slate-800">{analytics.avgWpm}</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase">WPM</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col gap-1">
              <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
                <span>Avg Accuracy</span>
                <Target className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-3xl font-black text-emerald-900">{analytics.avgAccuracy}%</span>
              <span className="text-[10px] text-emerald-600 font-semibold uppercase">Overall</span>
            </div>

            <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200/80 flex flex-col gap-1">
              <div className="flex items-center justify-between text-orange-700 text-xs font-semibold">
                <span>Streak</span>
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              </div>
              <span className="text-3xl font-black text-orange-900">{analytics.currentStreakDays}</span>
              <span className="text-[10px] text-orange-600 font-semibold uppercase">Days</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/80 flex flex-col gap-1">
              <div className="flex items-center justify-between text-slate-600 text-xs font-semibold">
                <span>Total Tests</span>
                <BarChart2 className="w-4 h-4 text-slate-500" />
              </div>
              <span className="text-3xl font-black text-slate-800">{analytics.totalTests}</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Completed</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-slate-200/80 flex flex-col gap-1">
              <div className="flex items-center justify-between text-slate-600 text-xs font-semibold">
                <span>Practice Time</span>
                <Clock className="w-4 h-4 text-slate-500" />
              </div>
              <span className="text-2xl font-black text-slate-800">{Math.round(analytics.totalTimeSeconds / 60)}m</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase">Total</span>
            </div>
          </div>

          {/* Chronological WPM Progression Chart */}
          <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>WPM Velocity Progression</span>
            </h3>

            {chartData.length > 0 ? (
              <div className="w-full h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        border: 'none',
                        borderRadius: '16px',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    />
                    <Line type="monotone" dataKey="wpm" name="Net WPM" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5' }} />
                    <Line type="monotone" dataKey="rawWpm" name="Raw WPM" stroke="#94a3b8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="p-8 text-center text-xs font-semibold text-slate-500">No test data recorded yet. Complete a test to view progression trends!</div>
            )}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: MILESTONE BADGES */}
      {activeSubTab === 'badges' && (
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Milestone Badges & Speed Achievements</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Unlock permanent badges as you increase your WPM velocity, test counts, and accuracy streak.
                </p>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-extrabold text-xs">
                {unlockedCount} / {MILESTONE_BADGES_DEF.length} Unlocked
              </div>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {badgesWithStatus.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-5 rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between gap-4 ${
                    badge.isUnlocked
                      ? 'bg-gradient-to-br from-white via-indigo-50/30 to-amber-50/20 border-indigo-200 shadow-md'
                      : 'bg-slate-50/80 border-slate-200/80 opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${
                        badge.isUnlocked ? 'bg-indigo-600/10 border border-indigo-200' : 'bg-slate-200/80 text-slate-400'
                      }`}>
                        {badge.iconSymbol}
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">{badge.title}</h3>
                        <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60 inline-block mt-0.5">
                          {badge.badgeLabel}
                        </span>
                      </div>
                    </div>

                    {badge.isUnlocked ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-[10px] shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Unlocked
                      </span>
                    ) : (
                      <span className="p-1.5 rounded-full bg-slate-200 text-slate-500 text-[10px]">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-medium text-slate-600 leading-snug">{badge.description}</p>

                  {/* Progress Bar */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                      <span>Progress</span>
                      <span>{badge.currentValue} / {badge.reqValue}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${badge.color}`}
                        style={{ width: `${badge.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: WEEKLY LEADERBOARD */}
      {activeSubTab === 'leaderboard' && (
        <div className="flex flex-col gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-slate-200/80 shadow-xs flex flex-col gap-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold text-amber-600 uppercase tracking-wider">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span>Typerca Weekly Speed Sprint</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mt-1">Global Weekly Typists Leaderboard</h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Top performing typists this week. Register your handle to automatically claim your ranking.
                </p>
              </div>

              {!isUserRegistered && (
                <button
                  onClick={onOpenRegisterModal}
                  className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2 shrink-0"
                >
                  <User className="w-4 h-4" />
                  <span>Register Username to Join</span>
                </button>
              )}
            </div>

            {/* Leaderboard Table / Empty State */}
            {fullLeaderboardList.length === 0 ? (
              <div className="p-10 text-center flex flex-col items-center justify-center gap-3 bg-slate-50/80 rounded-2xl border border-dashed border-slate-300/80 my-2">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-200 flex items-center justify-center text-amber-500 shadow-xs">
                  <Crown className="w-7 h-7" />
                </div>
                <div className="max-w-md">
                  <h3 className="text-base font-extrabold text-slate-900">No Registered Typists On Leaderboard Yet</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                    This weekly board displays scores exclusively from real registered typists. Claim your username and complete a test to take Rank #1!
                  </p>
                </div>
                <button
                  onClick={onOpenRegisterModal}
                  className="mt-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Register Username to Claim Rank #1</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-2xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                      <th className="p-3.5 pl-5">Rank</th>
                      <th className="p-3.5">Typist</th>
                      <th className="p-3.5 text-center">Net WPM</th>
                      <th className="p-3.5 text-center">Accuracy</th>
                      <th className="p-3.5 text-center">Tests</th>
                      <th className="p-3.5 text-right pr-5">Member Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 text-xs font-semibold text-slate-700">
                    {fullLeaderboardList.map((entry) => {
                      const isTop1 = entry.rank === 1;
                      const isTop2 = entry.rank === 2;
                      const isTop3 = entry.rank === 3;

                      return (
                        <tr
                          key={entry.id}
                          className={`transition-colors ${
                            entry.isCurrentUser
                              ? 'bg-indigo-50/90 font-bold border-l-4 border-l-indigo-600'
                              : 'hover:bg-slate-50/80'
                          }`}
                        >
                          {/* Rank */}
                          <td className="p-3.5 pl-5 font-black text-sm">
                            {isTop1 && <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-amber-950 shadow-xs font-black">🥇 1</span>}
                            {isTop2 && <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-900 shadow-xs font-black">🥈 2</span>}
                            {isTop3 && <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700/20 text-amber-900 shadow-xs font-black">🥉 3</span>}
                            {!isTop1 && !isTop2 && !isTop3 && <span className="text-slate-500 pl-2">#{entry.rank}</span>}
                          </td>

                          {/* Typist Name & Badges cleanly aligned */}
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs uppercase text-white shrink-0 shadow-xs ${
                                entry.isCurrentUser ? 'bg-indigo-600 ring-2 ring-indigo-300' : 'bg-slate-800'
                              }`}>
                                {entry.username.charAt(0)}
                              </div>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-extrabold text-slate-900 text-sm">
                                    {entry.username}
                                  </span>
                                  {entry.isCurrentUser && (
                                    <span className="px-1.5 py-0.5 rounded bg-indigo-100 border border-indigo-200 text-indigo-900 text-[9px] font-black uppercase tracking-wider">
                                      YOU
                                    </span>
                                  )}
                                  <span className="px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200/80 font-extrabold text-amber-900 text-[11px] inline-flex items-center gap-1 shadow-2xs">
                                    {entry.badge}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono mt-0.5">{entry.uniqueHandle}</span>
                              </div>
                            </div>
                          </td>

                          {/* WPM */}
                          <td className="p-3.5 text-center font-black text-indigo-950 text-base">
                            {entry.wpm} <span className="text-[10px] font-bold text-indigo-600">WPM</span>
                          </td>

                          {/* Accuracy */}
                          <td className="p-3.5 text-center font-extrabold text-emerald-700">
                            {entry.accuracy}%
                          </td>

                          {/* Tests */}
                          <td className="p-3.5 text-center font-bold text-slate-600">
                            {entry.testsCount}
                          </td>

                          {/* Date */}
                          <td className="p-3.5 text-right pr-5 font-mono text-[11px] text-slate-500">
                            {entry.registeredDate}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: FULL TEST HISTORY LOGS */}
      {activeSubTab === 'history' && (
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-white/80 border border-slate-200/80 shadow-xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Historical Test Log</h3>
                <p className="text-xs text-slate-500 font-medium">Export, search, or inspect all completed tests.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON</span>
                </button>
              </div>
            </div>

            {/* Filter Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search history by mode, WPM, or text..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold outline-none focus:bg-white focus:border-indigo-500"
              />
            </div>

            {/* History Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
              <table className="w-full text-left text-xs font-semibold text-slate-700">
                <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 border-b">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">WPM</th>
                    <th className="p-3">Accuracy</th>
                    <th className="p-3">Mode</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredResults.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="p-3 text-slate-500">{new Date(r.timestamp).toLocaleDateString()}</td>
                      <td className="p-3 font-black text-indigo-950">{r.wpm} WPM</td>
                      <td className="p-3 font-bold text-emerald-700">{r.accuracy}%</td>
                      <td className="p-3 capitalize">{r.mode} ({r.modeDetail})</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="p-1 rounded-lg text-rose-500 hover:bg-rose-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
