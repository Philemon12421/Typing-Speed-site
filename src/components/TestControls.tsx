import React from 'react';
import { TestMode, TimeOption, WordsOption, QuoteLength } from '../types';
import { Clock, Type, Quote, Keyboard, RotateCcw, Eye, EyeOff } from 'lucide-react';

interface TestControlsProps {
  mode: TestMode;
  setMode: (mode: TestMode) => void;
  timeOption: TimeOption;
  setTimeOption: (time: TimeOption) => void;
  wordsOption: WordsOption;
  setWordsOption: (words: WordsOption) => void;
  quoteLength: QuoteLength;
  setQuoteLength: (length: QuoteLength) => void;
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

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm">
      
      {/* Mode Selector Group */}
      <div className="flex flex-wrap items-center gap-1 bg-white/50 p-1 rounded-xl border border-white/40 w-full sm:w-auto justify-center sm:justify-start">
        {modes.map((m) => {
          const isActive = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 font-bold scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {m.icon}
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-Options Pill Group */}
      <div className="flex items-center gap-2 overflow-x-auto max-w-full py-0.5">
        {mode === 'time' && (
          <div className="flex items-center gap-1 bg-white/50 p-1 rounded-xl border border-white/40">
            {([15, 30, 60, 120] as TimeOption[]).map((t) => (
              <button
                key={t}
                onClick={() => setTimeOption(t)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  timeOption === t
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {t}s
              </button>
            ))}
          </div>
        )}

        {mode === 'words' && (
          <div className="flex items-center gap-1 bg-white/50 p-1 rounded-xl border border-white/40">
            {([10, 25, 50, 100] as WordsOption[]).map((w) => (
              <button
                key={w}
                onClick={() => setWordsOption(w)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  wordsOption === w
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        )}

        {mode === 'quote' && (
          <div className="flex items-center gap-1 bg-white/50 p-1 rounded-xl border border-white/40">
            {(['short', 'medium', 'long'] as QuoteLength[]).map((q) => (
              <button
                key={q}
                onClick={() => setQuoteLength(q)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all capitalize ${
                  quoteLength === q
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-900'
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              zenMode
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200'
                : 'bg-white/60 text-slate-600 border-white/40 hover:bg-white/80'
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
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            showKeyboard
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
              : 'bg-white/60 text-slate-600 border-white/40 hover:bg-white/80'
          }`}
        >
          <Keyboard className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Virtual Keyboard</span>
        </button>

        {/* Quick Restart Button */}
        <button
          onClick={onRestart}
          title="Restart Test (Tab + Enter or Esc)"
          className="p-2 rounded-xl bg-white/60 hover:bg-white/80 text-slate-600 border border-white/40 shadow-sm hover:rotate-180 transition-all duration-300"
        >
          <RotateCcw className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    </div>
  );
};

