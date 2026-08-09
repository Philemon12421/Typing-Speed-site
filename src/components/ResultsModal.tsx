import React, { useEffect } from 'react';
import { TestResult, AIAnalysis } from '../types';
import { getWpmGrade } from '../utils/typingUtils';
import confetti from 'canvas-confetti';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  Trophy,
  RotateCcw,
  Sparkles,
  Award,
  BarChart2,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Target,
  Clock,
  Activity,
  Cpu,
} from 'lucide-react';

interface ResultsModalProps {
  result: TestResult;
  personalBestWpm?: number;
  onRestart: () => void;
  onViewAnalytics: () => void;
  onViewCertificate: () => void;
  onRunAIAnalysis: () => void;
  isAiLoading: boolean;
  aiAnalysis?: AIAnalysis;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  result,
  personalBestWpm = 0,
  onRestart,
  onViewAnalytics,
  onViewCertificate,
  onRunAIAnalysis,
  isAiLoading,
  aiAnalysis,
}) => {
  const grade = getWpmGrade(result.wpm);

  // PB Comparison logic
  const isNewPB = personalBestWpm > 0 && result.wpm > personalBestWpm;
  const isTiedPB = personalBestWpm > 0 && result.wpm === personalBestWpm;
  const pbDiff = result.wpm - personalBestWpm;
  const percentImprovement =
    personalBestWpm > 0 ? Math.round(((result.wpm - personalBestWpm) / personalBestWpm) * 100) : 0;

  // Trigger celebration confetti burst on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: isNewPB ? 120 : 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#6366f1', '#10b981', '#f59e0b', '#8b5cf6'],
      });
    } catch (e) {
      // Ignore confetti errors
    }
  }, [isNewPB]);

  return (
    <div className="w-full max-w-4xl mx-auto my-6 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm animate-in fade-in zoom-in-95 duration-300">
      
      {/* Header Badge */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/40 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200 flex items-center justify-center">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900">Test Complete!</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 border border-indigo-200 text-indigo-700`}>
                {grade.badge}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Mode: <span className="font-semibold text-slate-700 capitalize">{result.mode}</span> ({result.modeDetail})
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Next Test (Tab)</span>
          </button>
          <button
            onClick={onViewCertificate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-sm shadow-sm transition-all"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>Certificate</span>
          </button>
        </div>
      </div>

      {/* Personal Best (PB) Performance Benchmark Banner */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm transition-all ${
        isNewPB
          ? 'bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-yellow-500/10 border-amber-300 text-amber-950'
          : isTiedPB
          ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
          : 'bg-slate-50 border-slate-200 text-slate-800'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 ${
            isNewPB ? 'bg-amber-500 text-white shadow-md shadow-amber-300' : 'bg-slate-200 text-slate-700'
          }`}>
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm">
                {isNewPB
                  ? '🎉 NEW PERSONAL BEST RECORD!'
                  : isTiedPB
                  ? '🎯 TIED PERSONAL BEST RECORD!'
                  : 'Personal Best Benchmark'}
              </span>
              {percentImprovement !== 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                  percentImprovement > 0
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {percentImprovement > 0 ? `+${percentImprovement}% Improvement` : `${percentImprovement}% vs PB`}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              {isNewPB ? (
                <>You outperformed your previous personal record of <strong className="font-bold text-slate-900">{personalBestWpm} WPM</strong> by <strong className="font-bold text-emerald-700">+{pbDiff} WPM</strong>!</>
              ) : personalBestWpm > 0 ? (
                <>Your top personal best is <strong className="font-bold text-slate-900">{personalBestWpm} WPM</strong> ({Math.abs(pbDiff)} WPM difference in this run).</>
              ) : (
                <>First baseline score logged as your starting Personal Best!</>
              )}
            </p>
          </div>
        </div>

        {personalBestWpm > 0 && (
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Personal Best</div>
              <div className="text-base font-black text-slate-900">{personalBestWpm} WPM</div>
            </div>
          </div>
        )}
      </div>

      {/* Headline Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* WPM Card */}
        <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 shadow-sm flex flex-col gap-1">
          <div className="flex items-center justify-between text-indigo-700 text-xs font-semibold">
            <span>Net Speed</span>
            <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-indigo-900">{result.wpm}</span>
            <span className="text-xs font-bold text-indigo-600">WPM</span>
          </div>
          <span className="text-[10px] text-indigo-600/80 font-medium">Raw: {result.rawWpm} WPM</span>
        </div>

        {/* Accuracy Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/50 border border-emerald-200/80 shadow-sm flex flex-col gap-1">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
            <span>Accuracy</span>
            <Target className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-emerald-900">{result.accuracy}%</span>
          </div>
          <span className="text-[10px] text-emerald-600/80 font-medium">
            {result.correctChars} correct / {result.incorrectChars} errors
          </span>
        </div>

        {/* CPM & Time */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm flex flex-col gap-1">
          <div className="flex items-center justify-between text-slate-600 text-xs font-semibold">
            <span>CPM & Time</span>
            <Clock className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">{result.cpm}</span>
            <span className="text-xs font-bold text-slate-500">CPM</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">Duration: {result.timeSeconds}s</span>
        </div>

        {/* Consistency */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm flex flex-col gap-1">
          <div className="flex items-center justify-between text-slate-600 text-xs font-semibold">
            <span>Consistency</span>
            <Activity className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800">{result.consistency}%</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">Rhythm stability</span>
        </div>
      </div>

      {/* Recharts Performance Line Graph */}
      {result.wpmHistory && result.wpmHistory.length > 1 && (
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>WPM & Accuracy Progression Over Time</span>
            <span className="text-[11px] text-slate-500 font-normal">Recorded every second</span>
          </div>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={result.wpmHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="second" unit="s" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 'auto']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    borderColor: '#cbd5e1',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="wpm"
                  name="WPM"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="rawWpm"
                  name="Raw WPM"
                  stroke="#94a3b8"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Error-Prone Keys Section */}
      {result.keyErrors && Object.keys(result.keyErrors).length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Mistakes Breakdown (Top Weak Keys)</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {(Object.entries(result.keyErrors) as [string, number][])
              .sort((a, b) => b[1] - a[1])
              .map(([key, count]) => (
                <div
                  key={key}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-rose-200 text-xs font-bold text-rose-900 shadow-sm"
                >
                  <span className="uppercase font-mono font-extrabold text-rose-600">
                    '{key === ' ' ? 'Space' : key}'
                  </span>
                  <span className="text-[10px] text-rose-500 font-semibold">{count} error(s)</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* AI Diagnostic Report Banner / Results */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-sky-50/80 border border-blue-200/80 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600 animate-pulse" />
            <h3 className="text-sm font-black text-slate-900">AI Diagnostic Coach (Gemini Powered)</h3>
          </div>
          {!aiAnalysis && (
            <button
              onClick={onRunAIAnalysis}
              disabled={isAiLoading}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
            >
              {isAiLoading ? (
                <span>Analyzing test...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate AI Report</span>
                </>
              )}
            </button>
          )}
        </div>

        {aiAnalysis && (
          <div className="flex flex-col gap-3 pt-2 text-xs text-slate-700">
            <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
              <span>Rating:</span>
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 border border-blue-200 text-blue-800">
                {aiAnalysis.rating}
              </span>
            </div>
            <p className="font-medium text-slate-800">{aiAnalysis.summary}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-white/80 border border-emerald-200/80 flex flex-col gap-1">
                <span className="font-bold text-emerald-800 text-[11px]">Key Strengths</span>
                <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
                  {aiAnalysis.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-amber-200/80 flex flex-col gap-1">
                <span className="font-bold text-amber-800 text-[11px]">Improvement Focus</span>
                <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
                  {aiAnalysis.areasToImprove.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/90 border border-blue-200/80 text-[11px] text-blue-900 font-medium">
              <span className="font-bold">Coach Advice:</span> {aiAnalysis.coachingAdvice}
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between border-t border-slate-200/80 pt-4 text-xs font-semibold text-slate-600">
        <button
          onClick={onViewAnalytics}
          className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-bold transition-colors"
        >
          <BarChart2 className="w-4 h-4" />
          <span>View All Pro Analytics & History →</span>
        </button>

        <button
          onClick={onRestart}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-all"
        >
          Close & Practice Again
        </button>
      </div>
    </div>
  );
};
