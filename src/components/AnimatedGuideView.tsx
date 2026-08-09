import React, { useState } from 'react';
import {
  BookOpen,
  Keyboard,
  Hand,
  Flame,
  Eye,
  Volume2,
  Award,
  BarChart2,
  Sparkles,
  Zap,
  CheckCircle2,
  Target,
  ShieldCheck,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export const AnimatedGuideView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'finger' | 'heatmap' | 'zen' | 'analytics' | 'certificate'>('finger');

  const guideSections = [
    { id: 'finger', label: '1. Finger Placement', icon: <Hand className="w-4 h-4 text-indigo-600" /> },
    { id: 'heatmap', label: '2. Error Heatmaps', icon: <Flame className="w-4 h-4 text-rose-500" /> },
    { id: 'zen', label: '3. Zen Mode', icon: <Eye className="w-4 h-4 text-emerald-600" /> },
    { id: 'analytics', label: '4. AI Analytics', icon: <BarChart2 className="w-4 h-4 text-sky-600" /> },
    { id: 'certificate', label: '5. Certificates', icon: <Award className="w-4 h-4 text-amber-500" /> },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 p-4 sm:p-8 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 backdrop-blur-md flex items-center justify-center shrink-0 shadow-xl">
            <BookOpen className="w-8 h-8 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-extrabold text-[10px] uppercase tracking-widest">
                Official User Manual & README
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">VelocisType Interactive Guide</h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 max-w-xl">
              Master professional touch-typing technique, learn key finger mappings, leverage real-time error heatmaps, and customize Zen mode for peak focus.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-xs font-bold text-indigo-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Interactive Visual Manual</span>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {guideSections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveTab(sec.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              activeTab === sec.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-[1.02]'
                : 'bg-white/70 text-slate-600 hover:text-slate-900 hover:bg-white border border-white/60'
            }`}
          >
            {sec.icon}
            <span>{sec.label}</span>
          </button>
        ))}
      </div>

      {/* Guide Content Display Container */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-sm transition-all min-h-[400px]">
        
        {/* Tab 1: Finger Placement & Home Row */}
        {activeTab === 'finger' && (
          <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Technique Mastery</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Home Row & Finger Assignment</h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-2xl">
                  Touch typing relies on muscle memory rather than looking down at the keyboard. Rest your fingers naturally on the Home Row (ASDF - JKL;).
                </p>
              </div>
            </div>

            {/* Interactive Color Coded Key Guide Diagram */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { finger: 'Left Pinky', color: 'bg-rose-500', keys: 'Q, A, Z, 1, Tab, Caps, Shift' },
                { finger: 'Left Ring', color: 'bg-amber-500', keys: 'W, S, X, 2' },
                { finger: 'Left Middle', color: 'bg-emerald-500', keys: 'E, D, C, 3' },
                { finger: 'Left Index', color: 'bg-sky-500', keys: 'R, T, F, G, V, B, 4, 5' },
                { finger: 'Thumbs', color: 'bg-indigo-500', keys: 'Spacebar (Both thumbs)' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2 hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="font-extrabold text-slate-800 text-xs">{item.finger}</span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    {item.keys}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 flex items-start gap-3">
              <Zap className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div className="text-xs text-indigo-950 font-medium leading-relaxed">
                <strong className="font-bold">Pro Tip:</strong> VelocisType's virtual keyboard dynamically highlights which finger to use for every active character in real-time. Look at the screen caret rather than your hands!
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Error Heatmaps */}
        {activeTab === 'heatmap' && (
          <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Analytics Innovation</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Real-Time Error Heatmaps</h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-2xl">
                Every typo you make is tracked and saved to build a personalized error heat density map on your virtual keyboard.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-900 font-black flex items-center justify-center text-xs">
                  Low
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Light Error Yellow</h4>
                <p className="text-xs text-slate-600">Keys with occasional mistypes (1-2 errors).</p>
              </div>

              <div className="p-5 rounded-2xl bg-orange-50 border border-orange-200 flex flex-col gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-300 text-orange-950 font-black flex items-center justify-center text-xs">
                  Mod
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Moderate Orange</h4>
                <p className="text-xs text-slate-600">Keys requiring focus (3-5 errors).</p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-500 text-white font-black flex items-center justify-center text-xs shadow-md shadow-rose-200">
                  High
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Hot Red Zone</h4>
                <p className="text-xs text-slate-600">Frequent error bottlenecks. Target these keys with custom drills!</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Zen Mode */}
        {activeTab === 'zen' && (
          <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Focus Feature</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Distraction-Free Zen Mode</h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-2xl">
                Eliminate peripheral visual clutter during tests. Zen mode seamlessly auto-hides the navbar, footer, and side controls when typing begins.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Maximize2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base">How Zen Mode Works</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Toggle the Zen Mode switch in the Test Controls toolbar. As soon as you press your first key, all surrounding UI fades out completely. Press Esc or click the floating top button to exit anytime!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: AI Analytics */}
        {activeTab === 'analytics' && (
          <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Deep Insights</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Pro Analytics & AI Coaching</h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-2xl">
                VelocisType analyzes your typing consistency, raw WPM vs net WPM gap, finger accuracy breakdown, and generates custom drill recommendations using Gemini AI.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-200 flex flex-col gap-2">
                <BarChart2 className="w-6 h-6 text-sky-600" />
                <h4 className="font-bold text-slate-900 text-sm">Consistency Metric</h4>
                <p className="text-xs text-slate-600">
                  Measures typing rhythm stability across the test session. High consistency means smooth flow without sudden stutters.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/80 border border-purple-200 flex flex-col gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <h4 className="font-bold text-slate-900 text-sm">Gemini AI Typing Coach</h4>
                <p className="text-xs text-slate-600">
                  Provides tailored coaching advice and generates customized practice paragraphs targeting your specific weak finger combinations.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Official Certificates */}
        {activeTab === 'certificate' && (
          <div className="flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Formal Verification</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">Official Proficiency Certificates</h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-2xl">
                Earn printable and verifiable Certificates of Typing Proficiency complete with gold seals, rank tiers, and serial verification IDs.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-10 h-10 text-amber-600 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">Print & Export PDFs</h4>
                  <p className="text-xs text-slate-600">Available from the Results screen after any completed typing test.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
