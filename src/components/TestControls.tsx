import React from 'react';
import { TestMode, TimeOption, WordsOption, QuoteLength, DifficultyLevel } from '../types';
import { Clock, Type, Quote, Keyboard, RotateCcw, Eye, EyeOff, Gauge } from 'lucide-react';

interface TestControlsProps {
  mode: TestMode;
  setMode: (mode: TestMode) => void;
  timeOption: TimeOption;
  setTimeOption: (time: TimeOption) => void;
  wordsOption: WordsOption;
  setWordsOption: (words: WordsOption) => void;
  quoteLength: QuoteLength;
  setQuoteLength: (length: QuoteLength) => void;
  difficulty: DifficultyLevel;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  showKeyboard: boolean;
  setShowKeyboard: (show: boolean) => void;
  zenMode?: boolean;
  onToggleZenMode?: () => void;
  onRestart: () => void;
  onOpenCustomModal?: () => void;
  isCustomActive?: boolean;
}

export const TestControls: React.FC<TestControlsProps> = ({
  mode,
  setMode,
  timeOption,
  setTimeOption,
  wordsOption,
  setWordsOption,
  quoteLength,
  setQuoteLength,
  difficulty,
  setDifficulty,
  showKeyboard,
  setShowKeyboard,
  zenMode = false,
  onToggleZenMode,
  onRestart,
}) => {
  const modes: { id: TestMode; label: string; icon: React.ReactNode }[] = [
    { id: 'time', label: 'Time', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'words', label: 'Words', icon: <Type className="w-3.5 h-3.5" /> },
    { id: 'quote', label: 'Quote', icon: <Quote className="w-3.5 h-3.5" /> },
  ];

  const difficulties: { id: DifficultyLevel; label: string; tooltip: string; badgeColor: string }[] = [
    {
      id: 'simple',
      label: 'Simple',
      tooltip: 'Smooth, high-frequency words without tricky symbols for pure rhythm',
      badgeColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'moderate',
      label: 'Moderate',
      tooltip: 'Standard vocabulary with light punctuation and common symbols (@, £, &, ")',
      badgeColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 'expert',
      label: 'Expert',
      tooltip: 'Complex irregular words, heavy special symbols (@, £, $, &, {}, []), and code-style syntax',
      badgeColor: 'text-rose-600 dark:text-rose-400',
    },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white/60 dark:bg-zinc-950/80 backdrop-blur-xl border border-slate-200/60 dark:border-zinc-800/80 shadow-sm transition-colors">
      
      {/* Left: Mode Selector Group */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white/50 dark:bg-zinc-900/70 p-1 rounded-xl border border-slate-200/40 dark:border-zinc-800/60 w-full lg:w-auto justify-center lg:justify-start">
        {modes.map((m) => {
          const isActive = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold scale-[1.02]'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-zinc-800/60'
              }`}
            >
              {m.icon}
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Middle: Difficulty Selector */}
      <div className="flex items-center gap-1 bg-white/50 dark:bg-zinc-900/70 p-1 rounded-xl border border-slate-200/40 dark:border-zinc-800/60 shadow-xs" title="Adjust complexity of the generated text">
        <div className="flex items-center gap-1 px-2 text-[11px] font-bold text-slate-500 dark:text-zinc-400 hidden sm:flex">
          <Gauge className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
          <span>Difficulty:</span>
        </div>
        {difficulties.map((diff) => {
          const isActive = difficulty === diff.id;
          return (
            <button
              key={diff.id}
              onClick={() => setDifficulty(diff.id)}
              title={diff.tooltip}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm font-bold scale-[1.02]'
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-zinc-800/60'
              }`}
            >
              <span>{diff.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Sub-Options & Action Pill Group */}
      <div className="flex items-center gap-2 overflow-x-auto max-w-full py-0.5 justify-center lg:justify-end w-full lg:w-auto">
        {mode === 'time' && (
          <div className="flex items-center gap-1 bg-white/50 dark:bg-zinc-900/70 p-1 rounded-xl border border-slate-200/40 dark:border-zinc-800/60">
            {([15, 30, 60, 120] as TimeOption[]).map((t) => (
              <button
                key={t}
                onClick={() => setTimeOption(t)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timeOption === t
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t}s
              </button>
            ))}
          </div>
        )}

        {mode === 'words' && (
          <div className="flex items-center gap-1 bg-white/50 dark:bg-zinc-900/70 p-1 rounded-xl border border-slate-200/40 dark:border-zinc-800/60">
            {([10, 25, 50, 100] as WordsOption[]).map((w) => (
              <button
                key={w}
                onClick={() => setWordsOption(w)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  wordsOption === w
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        )}

        {mode === 'quote' && (
          <div className="flex items-center gap-1 bg-white/50 dark:bg-zinc-900/70 p-1 rounded-xl border border-slate-200/40 dark:border-zinc-800/60">
            {(['short', 'medium', 'long'] as QuoteLength[]).map((q) => (
              <button
                key={q}
                onClick={() => setQuoteLength(q)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all capitalize cursor-pointer ${
                  quoteLength === q
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Zen Mode Toggle */}
        {onToggleZenMode && (
          <button
            onClick={onToggleZenMode}
            title={zenMode ? 'Zen Mode ON (Hides Navbar & Footer while typing)' : 'Enable Zen Mode (Distraction-Free)'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              zenMode
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30'
                : 'bg-white/60 dark:bg-zinc-900/70 text-slate-600 dark:text-zinc-400 border-slate-200/50 dark:border-zinc-800/60 hover:bg-white/80 dark:hover:bg-zinc-800'
            }`}
          >
            {zenMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{zenMode ? 'Zen ON' : 'Zen Mode'}</span>
          </button>
        )}

        {/* Keyboard Toggle */}
        <button
          onClick={() => setShowKeyboard(!showKeyboard)}
          title={showKeyboard ? 'Hide Virtual Keyboard' : 'Show Virtual Keyboard'}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            showKeyboard
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30'
              : 'bg-white/60 dark:bg-zinc-900/70 text-slate-600 dark:text-zinc-400 border-slate-200/50 dark:border-zinc-800/60 hover:bg-white/80 dark:hover:bg-zinc-800'
          }`}
        >
          <Keyboard className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Virtual Keyboard</span>
        </button>

        {/* Quick Restart Button */}
        <button
          onClick={onRestart}
          title="Restart Test (Tab + Enter or Esc)"
          className="p-2 rounded-xl bg-white/60 dark:bg-zinc-900/70 hover:bg-white/80 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 border border-slate-200/50 dark:border-zinc-800/60 shadow-sm hover:rotate-180 transition-all duration-300 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};


