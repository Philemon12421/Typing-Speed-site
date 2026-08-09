import React, { useState } from 'react';
import { TestResult } from '../types';
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
  AlertCircle,
  CheckCircle2,
  Search,
  FileSpreadsheet,
} from 'lucide-react';

interface ProAnalyticsProps {
  results: TestResult[];
  onRefreshResults: () => void;
}

export const ProAnalytics: React.FC<ProAnalyticsProps> = ({ results, onRefreshResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const analytics = getOverallAnalytics();

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
    a.download = `velocistype-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleExportCSV = () => {
    if (results.length === 0) return;
    const headers = [
      'ID',
      'Date & Time',
      'Net WPM',
      'Raw WPM',
      'Accuracy (%)',
      'CPM',
      'Duration (s)',
      'Total Chars',
      'Correct Chars',
      'Incorrect Chars',
      'Consistency (%)',
      'Mode',
      'Mode Detail',
    ];

    const rows = results.map((r) => [
      r.id,
      `"${new Date(r.timestamp).toLocaleString().replace(/"/g, '""')}"`,
      r.wpm,
      r.rawWpm,
      r.accuracy,
      r.cpm,
      r.timeSeconds,
      r.totalChars,
      r.correctChars,
      r.incorrectChars,
      r.consistency,
      `"${r.mode}"`,
      `"${(r.modeDetail || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `velocistype-results-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importUserDataJSON(content);
      if (success) {
        setImportStatus('Data imported successfully!');
        onRefreshResults();
      } else {
        setImportStatus('Failed to import data. Invalid JSON format.');
      }
      setTimeout(() => setImportStatus(null), 3000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-6 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm">
      
      {/* Title & Data Export Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/40 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-black text-slate-900">Performance Analytics</h1>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Detailed speed trends, accuracy distribution, and historical logs
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            title="Export test history as CSV file for Excel/Sheets tracking"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200/80 shadow-sm transition-all"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportJSON}
            title="Export full backup JSON"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-700 font-bold text-xs border border-white/60 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export JSON</span>
          </button>

          <label className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-700 font-bold text-xs border border-white/60 shadow-sm cursor-pointer transition-all">
            <Upload className="w-3.5 h-3.5" />
            <span>Import Data</span>
            <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
          </label>

          {results.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 shadow-sm transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>
      </div>

      {importStatus && (
        <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
          <span>{importStatus}</span>
        </div>
      )}

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

        <div className="p-4 rounded-2xl bg-white/70 border border-white/50 flex flex-col gap-1">
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

        <div className="p-4 rounded-2xl bg-white/70 border border-white/50 flex flex-col gap-1">
          <div className="flex items-center justify-between text-slate-600 text-xs font-semibold">
            <span>Total Tests</span>
            <BarChart2 className="w-4 h-4 text-slate-500" />
          </div>
          <span className="text-3xl font-black text-slate-800">{analytics.totalTests}</span>
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Completed</span>
        </div>

        <div className="p-4 rounded-2xl bg-white/70 border border-white/50 flex flex-col gap-1">
          <div className="flex items-center justify-between text-slate-600 text-xs font-semibold">
            <span>Practice Time</span>
            <Clock className="w-4 h-4 text-slate-500" />
          </div>
          <span className="text-2xl font-black text-slate-800">
            {Math.round(analytics.totalTimeSeconds / 60)}m
          </span>
          <span className="text-[10px] text-slate-500 font-semibold uppercase">Total</span>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 text-sm font-medium">
          No typing test records found yet. Take your first typing test to start tracking progress!
        </div>
      ) : (
        <>
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Speed Progression Line Chart */}
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-800">WPM Progress Over Tests</span>
              <div className="w-full h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="index" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} domain={[0, 'auto']} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="wpm"
                      name="WPM"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={{ r: 3, fill: '#4f46e5' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      name="Accuracy %"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Speed Distribution Bar Chart */}
            <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-800">Speed Distribution</span>
              <div className="w-full h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distributionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="range" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="count" name="Tests Count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Top Error-Prone Keys Matrix */}
          {analytics.topWeakKeys.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col gap-2">
              <span className="text-xs font-bold text-amber-900">
                Top Error-Prone Keys (Lifetime Weakness Matrix)
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {analytics.topWeakKeys.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-amber-200/80 text-xs font-bold text-amber-900 shadow-sm"
                  >
                    <span className="font-mono text-base text-amber-600 font-extrabold uppercase">
                      '{item.key === ' ' ? 'Space' : item.key}'
                    </span>
                    <span className="text-[11px] text-amber-700">{item.errors} total mistakes</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Test History Log Table */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-slate-900">Historical Test Log</h3>
              
              {/* Search Filter Input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter mode or WPM..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Mode</th>
                    <th className="p-3">WPM</th>
                    <th className="p-3">Accuracy</th>
                    <th className="p-3">CPM</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Errors</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredResults.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 text-slate-500">
                        {new Date(r.timestamp).toLocaleDateString()} {new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-3 font-semibold text-slate-800 capitalize">
                        {r.mode} ({r.modeDetail})
                      </td>
                      <td className="p-3 font-extrabold text-blue-600">{r.wpm}</td>
                      <td className="p-3 font-bold text-emerald-600">{r.accuracy}%</td>
                      <td className="p-3 text-slate-600">{r.cpm}</td>
                      <td className="p-3 text-slate-500">{r.timeSeconds}s</td>
                      <td className="p-3 text-rose-600 font-bold">{r.incorrectChars}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="p-1 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete test record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
