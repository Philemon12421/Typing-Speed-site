import React, { useEffect, useRef, useState } from 'react';
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
  Share2,
  Download,
  Copy,
  X,
  Check
} from 'lucide-react';

interface ResultsModalProps {
  result: TestResult;
  personalBestWpm?: number;
  userName?: string;
  onRestart: () => void;
  onViewAnalytics: () => void;
  onViewCertificate: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  result,
  personalBestWpm = 0,
  userName = 'Typist',
  onRestart,
  onViewAnalytics,
  onViewCertificate,
}) => {
  const grade = getWpmGrade(result.wpm);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        particleCount: isNewPB ? 140 : 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#6366f1', '#10b981', '#f59e0b', '#8b5cf6'],
      });
    } catch (e) {
      // Ignore confetti errors
    }
  }, [isNewPB]);

  // Render Canvas Card Image
  useEffect(() => {
    if (!isShareModalOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;

    // Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#0f172a');
    bgGradient.addColorStop(0.5, '#1e1b4b');
    bgGradient.addColorStop(1, '#020617');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative Ambient Light Orbs
    ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
    ctx.beginPath();
    ctx.arc(1000, 150, 300, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.beginPath();
    ctx.arc(200, 500, 250, 0, Math.PI * 2);
    ctx.fill();

    // Glass Container Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(60, 60, width - 120, height - 120, 32);
    ctx.fill();
    ctx.stroke();

    // Header Brand Tag
    ctx.fillStyle = '#818cf8';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('TYPERCA • TOUCH TYPING BENCHMARK', 100, 125);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 16px sans-serif';
    ctx.fillText(new Date(result.timestamp).toLocaleDateString(undefined, { dateStyle: 'medium' }), width - 320, 125);

    // User Name Banner
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 32px sans-serif';
    ctx.fillText(userName, 100, 180);

    // WPM Main Stat & Score Badge
    ctx.font = '900 130px sans-serif';
    const wpmText = `${result.wpm}`;
    const wpmWidth = ctx.measureText(wpmText).width;

    ctx.fillStyle = '#fbbf24';
    ctx.fillText(wpmText, 100, 330);

    // "WPM" Unit Label - clearly spaced out after the WPM digits
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 28px sans-serif';
    const wpmLabelX = 100 + wpmWidth + 28;
    ctx.fillText('WPM', wpmLabelX, 275);

    // Score / Grade Rank Tag beside WPM with generous spacing
    ctx.fillStyle = '#a5b4fc';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(`Grade: ${grade.title}  ${grade.badge}`, wpmLabelX, 320);

    // Divider Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.moveTo(100, 370);
    ctx.lineTo(width - 100, 370);
    ctx.stroke();

    // Sub Stats Grid
    const stats = [
      { label: 'ACCURACY', val: `${result.accuracy}%`, color: '#34d399' },
      { label: 'CONSISTENCY', val: `${result.consistency}%`, color: '#a78bfa' },
      { label: 'RAW SPEED', val: `${result.rawWpm} WPM`, color: '#38bdf8' },
      { label: 'MODE', val: `${result.mode} (${result.timeSeconds}s)`, color: '#f472b6' },
    ];

    stats.forEach((st, idx) => {
      const x = 100 + idx * 260;
      const y = 430;

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(st.label, x, y);

      ctx.fillStyle = st.color;
      ctx.font = '800 32px sans-serif';
      ctx.fillText(st.val, x, y + 40);
    });

    // Footer Verification Badge & Seal
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(108, 532, 10, 0, Math.PI * 2);
    ctx.fill();

    // Checkmark inside footer verified badge
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(103, 532);
    ctx.lineTo(107, 536);
    ctx.lineTo(113, 528);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '600 15px sans-serif';
    ctx.fillText('Official Performance Card  •  Verified by Typerca Assessment Engine', 128, 537);
  }, [isShareModalOpen, result, userName]);

  // Download Card Image Handler
  const handleDownloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `typerca-${result.wpm}wpm.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  // Copy Image Handler
  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (blob && navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      });
    } catch (e) {
      // Fallback
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-black border border-slate-200/60 dark:border-zinc-800 shadow-sm animate-in fade-in zoom-in-95 duration-300 transition-colors">
      
      {/* Header Badge */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/60 dark:border-zinc-800/80 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 dark:bg-indigo-500 shadow-lg shadow-indigo-600/30 flex items-center justify-center">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-2xl font-black text-slate-900 dark:text-zinc-100">Test Complete!</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
                {grade.badge}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Verified</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              Mode: <span className="font-semibold text-slate-700 dark:text-zinc-300 capitalize">{result.mode}</span> ({result.modeDetail})
            </p>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Next Test (Tab)</span>
          </button>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-zinc-900 hover:bg-indigo-100 dark:hover:bg-zinc-800 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-zinc-700 font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Share Results</span>
          </button>
          <button
            onClick={onViewCertificate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-zinc-900 hover:bg-amber-100 dark:hover:bg-zinc-800 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-zinc-700 font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Certificate</span>
          </button>
        </div>
      </div>

      {/* Personal Best (PB) Performance Benchmark Banner */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm transition-all ${
        isNewPB
          ? 'bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-yellow-500/10 dark:from-amber-950/40 dark:via-amber-900/30 dark:to-yellow-950/40 border-amber-300 dark:border-amber-700/60 text-amber-950 dark:text-amber-200'
          : isTiedPB
          ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200'
          : 'bg-slate-50 dark:bg-zinc-900/70 border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 ${
            isNewPB ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30' : 'bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
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
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                }`}>
                  {percentImprovement > 0 ? `+${percentImprovement}% Improvement` : `${percentImprovement}% vs PB`}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium mt-0.5">
              {isNewPB ? (
                <>You outperformed your previous personal record of <strong className="font-bold text-slate-900 dark:text-zinc-100">{personalBestWpm} WPM</strong> by <strong className="font-bold text-emerald-700 dark:text-emerald-400">+{pbDiff} WPM</strong>!</>
              ) : personalBestWpm > 0 ? (
                <>Your top personal best is <strong className="font-bold text-slate-900 dark:text-zinc-100">{personalBestWpm} WPM</strong> ({Math.abs(pbDiff)} WPM difference in this run).</>
              ) : (
                <>First baseline score logged as your starting Personal Best!</>
              )}
            </p>
          </div>
        </div>

        {personalBestWpm > 0 && (
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <div className="text-right">
              <div className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Personal Best</div>
              <div className="text-base font-black text-slate-900 dark:text-zinc-100">{personalBestWpm} WPM</div>
            </div>
          </div>
        )}
      </div>

      {/* Headline Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* WPM Card */}
        <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-zinc-900/80 border border-indigo-200/80 dark:border-zinc-800 shadow-sm flex flex-col gap-1">
          <div className="flex items-center justify-between text-indigo-700 dark:text-indigo-400 text-xs font-semibold">
            <span>Net Speed</span>
            <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-indigo-900 dark:text-indigo-200">{result.wpm}</span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">WPM</span>
          </div>
          <span className="text-[10px] text-indigo-600/80 dark:text-indigo-400/80 font-medium">Raw: {result.rawWpm} WPM</span>
        </div>

        {/* Accuracy Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/50 dark:from-zinc-900/80 dark:to-zinc-900/60 border border-emerald-200/80 dark:border-zinc-800 shadow-sm flex flex-col gap-1">
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <span>Accuracy</span>
            <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-emerald-900 dark:text-emerald-300">{result.accuracy}%</span>
          </div>
          <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 font-medium">
            {result.correctChars} correct / {result.incorrectChars} errors
          </span>
        </div>

        {/* CPM & Time */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200/80 dark:border-zinc-800 shadow-sm flex flex-col gap-1">
          <div className="flex items-center justify-between text-slate-600 dark:text-zinc-400 text-xs font-semibold">
            <span>CPM & Time</span>
            <Clock className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800 dark:text-zinc-100">{result.cpm}</span>
            <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">CPM</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Duration: {result.timeSeconds}s</span>
        </div>

        {/* Consistency */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200/80 dark:border-zinc-800 shadow-sm flex flex-col gap-1">
          <div className="flex items-center justify-between text-slate-600 dark:text-zinc-400 text-xs font-semibold">
            <span>Consistency</span>
            <Activity className="w-4 h-4 text-slate-500 dark:text-zinc-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-800 dark:text-zinc-100">{result.consistency}%</span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium">Rhythm stability</span>
        </div>
      </div>

      {/* Recharts Performance Line Graph */}
      {result.wpmHistory && result.wpmHistory.length > 1 && (
        <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300">
            <span>WPM & Accuracy Progression Over Time</span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-500 font-normal">Recorded every second</span>
          </div>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={result.wpmHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="second" unit="s" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} domain={[0, 'auto']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderRadius: '12px',
                    borderColor: '#27272a',
                    color: '#f4f4f5',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="wpm"
                  name="WPM"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="rawWpm"
                  name="Raw WPM"
                  stroke="#71717a"
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
        <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 dark:text-rose-300">
            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>Mistakes Breakdown (Top Weak Keys)</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {(Object.entries(result.keyErrors) as [string, number][])
              .sort((a, b) => b[1] - a[1])
              .map(([key, count]) => (
                <div
                  key={key}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-zinc-900 border border-rose-200 dark:border-rose-900/60 text-xs font-bold text-rose-900 dark:text-rose-300 shadow-sm"
                >
                  <span className="uppercase font-mono font-extrabold text-rose-600 dark:text-rose-400">
                    '{key === ' ' ? 'Space' : key}'
                  </span>
                  <span className="text-[10px] text-rose-500 dark:text-rose-400 font-semibold">{count} error(s)</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex items-center justify-between border-t border-slate-200/80 dark:border-zinc-800 pt-4 text-xs font-semibold text-slate-600 dark:text-zinc-400">
        <button
          onClick={onViewAnalytics}
          className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-bold transition-colors cursor-pointer"
        >
          <BarChart2 className="w-4 h-4" />
          <span>View All Pro Analytics & History →</span>
        </button>

        <button
          onClick={onRestart}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-800 font-bold transition-all cursor-pointer"
        >
          Close & Practice Again
        </button>
      </div>

      {/* Share Card Modal */}
      {isShareModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsShareModalOpen(false);
          }}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-pointer"
        >
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col gap-6 shadow-2xl relative cursor-default">
            <button
              onClick={() => setIsShareModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <Share2 className="w-6 h-6 text-indigo-400" />
              <div>
                <h3 className="text-xl font-extrabold text-white">Share Typing Milestone</h3>
                <p className="text-xs text-slate-400 font-medium">Generated Canvas card ready for social sharing or downloading.</p>
              </div>
            </div>

            <div className="w-full bg-slate-950 rounded-2xl p-2 border border-slate-800 shadow-inner flex justify-center">
              <canvas ref={canvasRef} className="w-full h-auto rounded-xl shadow-lg border border-slate-800 max-h-[380px] object-contain" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadImage}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PNG Image</span>
                </button>

                <button
                  onClick={handleCopyImage}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm transition-all active:scale-95"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Image'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just scored ${result.wpm} WPM with ${result.accuracy}% accuracy on Typerca! 🚀 #typing #typerca`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
                >
                  <span>Share to X / Twitter</span>
                </a>

                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs sm:text-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
