import React, { useState } from 'react';
import { getKeyFingerInfo } from '../utils/typingUtils';
import { Hand, Flame, Layers } from 'lucide-react';

interface VirtualKeyboardProps {
  activeChar: string;
  nextChar?: string;
  showFingerGuide?: boolean;
  keyErrors?: Record<string, number>;
}

const SYMBOL_TO_BASE_KEY: Record<string, string> = {
  '~': '`',
  '!': '1',
  '@': '2',
  '#': '3',
  '£': '3',
  '$': '4',
  '€': '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  '_': '-',
  '+': '=',
  '{': '[',
  '}': ']',
  '|': '\\',
  ':': ';',
  '"': "'",
  '<': ',',
  '>': '.',
  '?': '/',
};

const KEYBOARD_ROWS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Space'],
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  activeChar,
  nextChar,
  showFingerGuide = true,
  keyErrors = {},
}) => {
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);

  const targetFingerInfo = activeChar ? getKeyFingerInfo(activeChar) : null;

  // Check if character requires Shift
  const requiresShift = (char: string) => {
    if (!char) return false;
    if (char in SYMBOL_TO_BASE_KEY) return true;
    return char >= 'A' && char <= 'Z';
  };

  const getBaseKey = (char: string) => {
    if (!char) return '';
    if (SYMBOL_TO_BASE_KEY[char]) return SYMBOL_TO_BASE_KEY[char];
    return char.toLowerCase();
  };

  // Find max errors across all keys for heatmap normalization
  const errorValues: number[] = Object.values(keyErrors);
  const maxErrors: number = errorValues.length > 0 ? Math.max(...errorValues, 1) : 1;
  const totalErrors: number = errorValues.reduce((a: number, b: number) => a + b, 0);

  // Helper to get heatmap styling for a key
  const getKeyHeatmapStyle = (keyLabel: string) => {
    let lookup = keyLabel.toLowerCase();
    if (keyLabel === 'Space') lookup = ' ';
    const count = keyErrors[lookup] || 0;
    if (count === 0) return null;

    const ratio = count / maxErrors;
    if (ratio > 0.6) {
      return {
        bg: 'bg-rose-500 text-white border-rose-600 font-extrabold shadow-md shadow-rose-300 ring-2 ring-rose-400',
        badge: `${count}`,
      };
    } else if (ratio > 0.3) {
      return {
        bg: 'bg-orange-300 text-orange-950 border-orange-400 font-bold',
        badge: `${count}`,
      };
    } else {
      return {
        bg: 'bg-amber-100 text-amber-900 border-amber-300 font-semibold',
        badge: `${count}`,
      };
    }
  };

  const activeBaseKey = getBaseKey(activeChar);
  const nextBaseKey = getBaseKey(nextChar || '');
  const activeNeedsShift = requiresShift(activeChar);
  const nextNeedsShift = requiresShift(nextChar || '');

  return (
    <div className="w-full flex flex-col items-center gap-3 p-4 rounded-3xl bg-white/60 dark:bg-zinc-950/80 backdrop-blur-xl border border-slate-200/60 dark:border-zinc-800/80 shadow-sm my-4 transition-colors">
      
      {/* Top Controls Bar: Finger Guidance & Heatmap Toggle */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 px-2 sm:px-4 py-2 rounded-2xl bg-white/50 dark:bg-zinc-900/70 border border-slate-200/40 dark:border-zinc-800/60 text-xs font-semibold text-slate-700 dark:text-zinc-300">
        {/* Finger Guidance Banner */}
        {showFingerGuide && targetFingerInfo ? (
          <div className="flex items-center gap-2">
            <Hand className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-bounce shrink-0" />
            <span className="hidden sm:inline">Target:</span>
            <span className="font-extrabold text-xs sm:text-sm px-2 py-0.5 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm uppercase">
              {activeChar === ' ' ? 'SPACEBAR' : activeChar}
            </span>
            <span className="text-slate-400 dark:text-zinc-600 font-normal">|</span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/80 dark:bg-zinc-800/80 border border-slate-200/60 dark:border-zinc-700/60 font-bold text-[11px]">
              <span className={`w-2 h-2 rounded-full ${targetFingerInfo.color}`} />
              <span className="text-slate-800 dark:text-zinc-200">{targetFingerInfo.label}</span>
            </div>
          </div>
        ) : (
          <div className="text-slate-500 dark:text-zinc-400 font-medium">Virtual Keyboard</div>
        )}

        {/* Heatmap Mode Toggle Button */}
        <div className="flex items-center gap-2">
          {totalErrors > 0 && (
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-bold text-xs transition-all border cursor-pointer ${
                showHeatmap
                  ? 'bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-500/30'
                  : 'bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${showHeatmap ? 'text-white' : 'text-rose-500'}`} />
              <span>{showHeatmap ? 'Heatmap Mode ON' : 'Show Error Heatmap'}</span>
              {totalErrors > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-[10px]">
                  {totalErrors} errs
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Keyboard Container */}
      <div className="w-full max-w-4xl flex flex-col gap-1.5 select-none text-xs font-semibold overflow-x-auto p-1">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1.5 w-full min-w-[580px]">
            {row.map((key, keyIndex) => {
              const isSpace = key === 'Space';
              const isShift = key === 'Shift';

              const isTarget =
                (isSpace && activeChar === ' ') ||
                (isShift && activeNeedsShift) ||
                (!isSpace && !isShift && key.toLowerCase() === activeBaseKey);

              const isNext =
                !isTarget &&
                ((isSpace && nextChar === ' ') ||
                  (isShift && nextNeedsShift) ||
                  (!isSpace && !isShift && key.toLowerCase() === nextBaseKey));

              const fingerInfo = getKeyFingerInfo(key);
              const heatmapStyle = showHeatmap ? getKeyHeatmapStyle(key) : null;

              // Special key widths
              let widthClass = 'w-9 sm:w-12 h-9 sm:h-12';
              if (key === 'Backspace' || key === 'Enter') widthClass = 'w-16 sm:w-24 h-9 sm:h-12';
              if (key === 'Tab') widthClass = 'w-12 sm:w-16 h-9 sm:h-12';
              if (key === 'Caps') widthClass = 'w-14 sm:w-18 h-9 sm:h-12';
              if (key === 'Shift') widthClass = 'w-16 sm:w-24 h-9 sm:h-12';
              if (isSpace) widthClass = 'w-52 sm:w-80 h-9 sm:h-12';

              return (
                <div
                  key={`${rowIndex}-${keyIndex}`}
                  className={`relative flex items-center justify-center rounded-xl transition-all duration-150 border ${widthClass} ${
                    isTarget
                      ? 'bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/40 scale-110 z-10 font-black'
                      : isNext
                      ? 'bg-indigo-100/80 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800 font-bold scale-[1.03]'
                      : heatmapStyle
                      ? heatmapStyle.bg
                      : 'bg-white/80 dark:bg-zinc-900/90 text-slate-700 dark:text-zinc-300 border-slate-200/60 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800 shadow-sm'
                  }`}
                >
                  <span className="capitalize text-[11px] sm:text-xs">
                    {key === 'Space' ? 'Spacebar' : key}
                  </span>

                  {/* Heatmap Error Count Badge */}
                  {showHeatmap && heatmapStyle && (
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-slate-900 dark:bg-black text-white text-[9px] font-extrabold shadow">
                      {heatmapStyle.badge}
                    </span>
                  )}

                  {/* Finger color dot indicator on key */}
                  {!isTarget && !showHeatmap && (
                    <span
                      className={`absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full ${fingerInfo.color} opacity-60`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      {showHeatmap ? (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-[11px] text-slate-600 dark:text-zinc-400 font-medium">
          <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-zinc-300">
            <Flame className="w-3.5 h-3.5 text-rose-500" /> Error Heatmap Density:
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300" /> Low Errors
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-orange-300 border border-orange-400" /> Moderate
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-rose-500 border border-rose-600" /> High Error Zone
          </span>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Pinky
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Ring
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Middle
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-500" /> Left Index
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Right Index
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-indigo-500" /> Thumb
          </span>
        </div>
      )}
    </div>
  );
};

