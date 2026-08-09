import React, { useState } from 'react';
import { TestResult, MilestoneBadge, LeaderboardEntry } from '../types';
import { getOverallAnalytics, clearTestHistory, deleteTestResult, exportUserDataJSON, importUserDataJSON } from '../utils/storage';
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
} from 'lucide-react';

interface ProAnalyticsProps {
  results: TestResult[];
  onRefreshResults: () => void;
  userName?: string;
  onOpenRegisterModal?: () => void;
}

const MILESTONE_BADGES_DEF = [
  { id: 'novice', title: 'Novice Typist', description: 'Reach 30+ WPM peak speed', category: 'wpm', reqValue: 30, iconSymbol: '🌱', badgeLabel: '30 WPM', color: 'from-emerald-500 to-teal-600' },
  { id: 'speedster', title: 'Speedster', description: 'Reach 50+ WPM peak speed', category: 'wpm', reqValue: 50, iconSymbol: '⚡', badgeLabel: '50 WPM', color: 'from-blue-500 to-cyan-600' },
  { id: 'pro_typist', title: 'Pro Typist', description: 'Reach 70+ WPM peak speed', category: 'wpm', reqValue: 70, iconSymbol: '🔥', badgeLabel: '70 WPM', color: 'from-indigo-500 to-purple-600' },
  { id: 'typing_master', title: 'Typing Master', description: 'Reach 90+ WPM peak speed', category: 'wpm', reqValue: 90, iconSymbol: '👑', badgeLabel: '90 WPM', color: 'from-amber-500 to-yellow-600' },
  { id: 'grandmaster', title: 'Grandmaster', description: 'Reach 110+ WPM peak speed', category: 'wpm', reqValue: 110, iconSymbol: '🏆', badgeLabel: '110 WPM', color: 'from-rose-500 to-pink-600' },
  { id: 'god_speed', title: 'God Speed', description: 'Reach 130+ WPM peak speed', category: 'wpm', reqValue: 130, iconSymbol: '🚀', badgeLabel: '130 WPM', color: 'from-fuchsia-600 to-violet-700' },
  { id: 'accuracy_pro', title: 'Laser Precision', description: 'Score 98%+ accuracy in a completed test', category: 'accuracy', reqValue: 98, iconSymbol: '🎯', badgeLabel: '98% Acc', color: 'from-teal-500 to-emerald-600' },
  { id: 'centurion', title: 'Test Centurion', description: 'Complete 25+ practice tests', category: 'tests', reqValue: 25, iconSymbol: '🛡️', badgeLabel: '25 Tests', color: 'from-sky-500 to-indigo-600' },
  { id: 'marathoner', title: 'Typing Veteran', description: 'Complete 50+ practice tests', category: 'tests', reqValue: 50, iconSymbol: '🏅', badgeLabel: '50 Tests', color: 'from-purple-500 to-indigo-700' },
  { id: 'streak_master', title: 'Streak Warrior', description: 'Maintain a 5-day practice streak', category: 'streak', reqValue: 5, iconSymbol: '🔥', badgeLabel: '5d Streak', color: 'from-orange-500 to-amber-600' },
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

  // Compute Unlocked Badges
  const badgesWithStatus = MILESTONE_BADGES_DEF.map((badge) => {
    let currentValue = 0;
    if (badge.category === 'wpm') currentValue = analytics.bestWpm;
    if (badge.category === 'tests') currentValue = analytics.totalTests;
    if (badge.category === 'accuracy') currentValue = maxAccuracy;
    if (badge.category === 'streak') currentValue = analytics.currentStreakDays;

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

  // Global Mock Weekly Leaderboard
  const mockLeaderboard: LeaderboardEntry[] = [
    { id: '1', rank: 1, username: 'ApexTypist', uniqueHandle: '@apextypist', wpm: 124, accuracy: 99, testsCount: 142, registeredDate: 'Weekly Champion', badge: '👑 Grandmaster' },
    { id: '2', rank: 2, username: 'CyberKeys', uniqueHandle: '@cyberkeys', wpm: 112, accuracy: 98, testsCount: 98, registeredDate: 'Top 3', badge: '🏆 Master' },
    { id: '3', rank: 3, username: 'VelocityPro', uniqueHandle: '@velocitypro', wpm: 104, accuracy: 97, testsCount: 84, registeredDate: 'Top 3', badge: '⚡ Speedster' },
    { id: '4', rank: 4, username: 'PhantomFingers', uniqueHandle: '@phantomfingers', wpm: 94, accuracy: 99, testsCount: 65, registeredDate: 'Top 10', badge: '🎯 Precision' },
    { id: '5', rank: 5, username: 'MatrixTyper', uniqueHandle: '@matrixtyper', wpm: 88, accuracy: 96, testsCount: 71, registeredDate: 'Top 10', badge: '🔥 Veteran' },
    { id: '6', rank: 6, username: 'QuantumKey', uniqueHandle: '@quantumkey', wpm: 81, accuracy: 95, testsCount: 52, registeredDate: 'Top 10', badge: '⚡ Speedster' },
    { id: '7', rank: 7, username: 'SwiftPaws', uniqueHandle: '@swiftpaws', wpm: 75, accuracy: 96, testsCount: 44, registeredDate: 'Top 10', badge: '🌱 Pro' },
  ];

  // User Row insertion if registered & has test results
  const isUserRegistered = Boolean(userName && userName.trim().length >= 3);
  const userHandle = isUserRegistered ? `@${userName.toLowerCase().replace(/[^a-z0-9]/g, '')}` : '@guest';

  let userLeaderboardRank = 8;
  const userEntry: LeaderboardEntry = {
    id: 'user_current',
    rank: userLeaderboardRank,
    username: userName || 'You',
    uniqueHandle: userHandle,
    wpm: analytics.bestWpm,
    accuracy: analytics.avgAccuracy || 98,
    testsCount: analytics.totalTests,
    isCurrentUser: true,
    registeredDate: 'Active Week',
    badge: analytics.bestWpm >= 90 ? '👑 Master' : analytics.bestWpm >= 60 ? '⚡ Speedster' : '🌱 Novice',
  };

  // Combine and sort leaderboard according to WPM
  const fullLeaderboardList = [...mockLeaderboard];
  if (isUserRegistered && analytics.bestWpm > 0) {
    fullLeaderboardList.push(userEntry);
    fullLeaderboardList.sort((a, b) => b.wpm - a.wpm);
    fullLeaderboardList.forEach((entry, idx) => {
      entry.rank = idx + 1;
    });
  }

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

            {/* Leaderboard Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-2xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                    <th className="p-3.5 pl-5">Rank</th>
                    <th className="p-3.5">Typist</th>
                    <th className="p-3.5 text-center">Net WPM</th>
                    <th className="p-3.5 text-center">Accuracy</th>
                    <th className="p-3.5 text-center">Tests</th>
                    <th className="p-3.5 text-right pr-5">Tier Badge</th>
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
                          {isTop1 && <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 text-amber-950 shadow-xs">🥇 1</span>}
                          {isTop2 && <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-900 shadow-xs">🥈 2</span>}
                          {isTop3 && <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700/20 text-amber-900 shadow-xs">🥉 3</span>}
                          {!isTop1 && !isTop2 && !isTop3 && <span className="text-slate-500 pl-2">#{entry.rank}</span>}
                        </td>

                        {/* Typist */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs uppercase text-white ${
                              entry.isCurrentUser ? 'bg-indigo-600' : 'bg-slate-800'
                            }`}>
                              {entry.username.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-extrabold text-slate-900 flex items-center gap-1">
                                {entry.username}
                                {entry.isCurrentUser && <span className="px-1.5 py-0.2 rounded bg-indigo-200 text-indigo-900 text-[9px]">YOU</span>}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">{entry.uniqueHandle}</span>
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

                        {/* Tier Badge */}
                        <td className="p-3.5 text-right pr-5">
                          <span className="px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 font-extrabold text-slate-800 text-[11px]">
                            {entry.badge}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
