import React, { useEffect, useRef, useState } from 'react';
import { UserSettings, WpmPoint } from '../types';
import { calculateStats, getKeyFingerInfo } from '../utils/typingUtils';
import { soundSynth } from '../utils/soundEffects';
import { RotateCcw, Zap, Target, AlertTriangle, Play } from 'lucide-react';

interface TypingAreaProps {
  targetText: string;
  settings: UserSettings;
  timeLimit?: number; // In seconds, if mode === 'time'
  wordLimit?: number; // Word count target, if mode === 'words'
  onTestComplete: (result: {
    wpm: number;
    rawWpm: number;
    accuracy: number;
    cpm: number;
    timeSeconds: number;
    totalChars: number;
    correctChars: number;
    incorrectChars: number;
    extraChars: number;
    missedChars: number;
    consistency: number;
    wpmHistory: WpmPoint[];
    keyErrors: Record<string, number>;
    fingerStats: Record<string, { hits: number; errors: number }>;
  }) => void;
  onActiveCharChange?: (char: string, nextChar?: string) => void;
  onRestart: () => void;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  targetText,
  settings,
  timeLimit,
  wordLimit,
  onTestComplete,
  onActiveCharChange,
  onRestart,
}) => {
  const [typedChars, setTypedChars] = useState<string>('');
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  
  // Real-time error tracking maps
  const [keyErrors, setKeyErrors] = useState<Record<string, number>>({});
  const [fingerStats, setFingerStats] = useState<Record<string, { hits: number; errors: number }>>({});
  
  // WPM history recorded every second
  const [wpmHistory, setWpmHistory] = useState<WpmPoint[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);

  // Focus input automatically
  useEffect(() => {
    inputRef.current?.focus();
  }, [targetText]);

  // Reset local state when target text changes
  useEffect(() => {
    setTypedChars('');
    setIsStarted(false);
    setIsFinished(false);
    setTimeElapsed(0);
    setKeyErrors({});
    setFingerStats({});
    setWpmHistory([]);
  }, [targetText]);

  // Scroll active char into view seamlessly
  useEffect(() => {
    if (activeCharRef.current) {
      activeCharRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }, [typedChars]);

  // Notify parent component of current active character for Virtual Keyboard guidance
  useEffect(() => {
    if (isFinished) return;
    const currentChar = targetText[typedChars.length] || '';
    const nextChar = targetText[typedChars.length + 1] || '';
    if (onActiveCharChange) {
      onActiveCharChange(currentChar, nextChar);
    }
  }, [typedChars, targetText, isFinished, onActiveCharChange]);

  // Main Timer Effect
  useEffect(() => {
    if (!isStarted || isFinished) return;

    const interval = setInterval(() => {
      setTimeElapsed((prevTime) => {
        const newTime = prevTime + 1;

        // Calculate stats for current second
        let correct = 0;
        let incorrect = 0;
        for (let i = 0; i < typedChars.length; i++) {
          if (typedChars[i] === targetText[i]) correct++;
          else incorrect++;
        }

        const stats = calculateStats(
          typedChars.length,
          correct,
          incorrect,
          0,
          newTime,
          wpmHistory
        );

        setWpmHistory((prevHistory) => [
          ...prevHistory,
          {
            second: newTime,
            wpm: stats.wpm,
            rawWpm: stats.rawWpm,
            errors: incorrect,
            accuracy: stats.accuracy,
          },
        ]);

        // Check time limit condition
        if (timeLimit && newTime >= timeLimit) {
          setIsFinished(true);
          clearInterval(interval);
          finishTest(newTime, typedChars);
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isFinished, timeLimit, typedChars, targetText]);

  // Finish Test Logic
  const finishTest = (finalTimeSeconds: number, currentTyped: string) => {
    let correctChars = 0;
    let incorrectChars = 0;

    for (let i = 0; i < currentTyped.length; i++) {
      if (currentTyped[i] === targetText[i]) {
        correctChars++;
      } else {
        incorrectChars++;
      }
    }

    const missedChars = Math.max(0, targetText.length - currentTyped.length);
    const finalTime = Math.max(1, finalTimeSeconds);

    const stats = calculateStats(
      currentTyped.length,
      correctChars,
      incorrectChars,
      0,
      finalTime,
      wpmHistory
    );

    onTestComplete({
      wpm: stats.wpm,
      rawWpm: stats.rawWpm,
      accuracy: stats.accuracy,
      cpm: stats.cpm,
      timeSeconds: finalTime,
      totalChars: currentTyped.length,
      correctChars,
      incorrectChars,
      extraChars: 0,
      missedChars,
      consistency: stats.consistency,
      wpmHistory,
      keyErrors,
      fingerStats,
    });
  };

  // Keyboard Event Handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;

    const newTyped = e.target.value;

    // First keypress triggers timer start
    if (!isStarted && newTyped.length > 0) {
      setIsStarted(true);
    }

    const lastInputIndex = newTyped.length - 1;
    const lastChar = newTyped[lastInputIndex];
    const expectedChar = targetText[lastInputIndex];

    // Sound effect trigger
    if (newTyped.length > typedChars.length) {
      const isError = lastChar !== expectedChar;
      soundSynth.playKeyPress(
        settings.soundProfile,
        settings.soundVolume,
        lastChar === ' ',
        isError
      );

      // Track key errors and finger statistics
      if (expectedChar) {
        const fingerInfo = getKeyFingerInfo(expectedChar);
        const fName = fingerInfo.name;

        setFingerStats((prev) => {
          const current = prev[fName] || { hits: 0, errors: 0 };
          return {
            ...prev,
            [fName]: {
              hits: current.hits + 1,
              errors: current.errors + (isError ? 1 : 0),
            },
          };
        });

        if (isError) {
          setKeyErrors((prev) => ({
            ...prev,
            [expectedChar]: (prev[expectedChar] || 0) + 1,
          }));
        }
      }
    }

    // Stop on Error check
    if (settings.stopOnError && newTyped.length > typedChars.length) {
      if (lastChar !== expectedChar) {
        return; // Don't allow typing past mistake
      }
    }

    setTypedChars(newTyped);

    // Check completion condition for text/word/quote modes
    if (newTyped.length >= targetText.length) {
      setIsFinished(true);
      finishTest(timeElapsed || 1, newTyped);
    }
  };

  // Calculate live stats for HUD
  let currentCorrect = 0;
  let currentIncorrect = 0;
  for (let i = 0; i < typedChars.length; i++) {
    if (typedChars[i] === targetText[i]) currentCorrect++;
    else currentIncorrect++;
  }

  const liveStats = calculateStats(
    typedChars.length,
    currentCorrect,
    currentIncorrect,
    0,
    timeElapsed || 1,
    wpmHistory
  );

  // Font size classes
  const fontClasses: Record<string, string> = {
    sm: 'text-lg leading-relaxed sm:text-xl',
    md: 'text-xl leading-relaxed sm:text-2xl',
    lg: 'text-2xl leading-relaxed sm:text-3xl',
    xl: 'text-3xl leading-relaxed sm:text-4xl',
  };

  // Caret style classes
  const caretClasses: Record<string, string> = {
    line: 'w-0.5 bg-indigo-600 animate-pulse',
    block: 'w-3.5 bg-indigo-500/40 border-b-2 border-indigo-600 animate-pulse',
    underline: 'w-3.5 border-b-2 border-indigo-600 animate-pulse',
    smooth: 'w-0.5 bg-gradient-to-b from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/50 animate-pulse',
  };

  const progressPercent = timeLimit
    ? Math.min(100, (timeElapsed / timeLimit) * 100)
    : Math.min(100, (typedChars.length / targetText.length) * 100);

  // Calculate current active word for Mobile/Desktop HUD Visibility
  const getCurrentWordHUD = () => {
    const currentIndex = typedChars.length;
    let start = targetText.lastIndexOf(' ', currentIndex - 1);
    start = start === -1 ? 0 : start + 1;
    let end = targetText.indexOf(' ', currentIndex);
    if (end === -1) end = targetText.length;

    const wordChars = targetText.substring(start, end).split('');
    return { start, end, wordChars };
  };

  const activeWordHUD = getCurrentWordHUD();

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full flex flex-col items-center gap-4 cursor-text select-none my-2"
    >
      {/* Hidden HTML Input for receiving key events seamlessly */}
      <input
        ref={inputRef}
        type="text"
        value={typedChars}
        onChange={handleInputChange}
        disabled={isFinished}
        className="opacity-0 absolute top-0 left-0 w-1 h-1 pointer-events-none"
        autoFocus
      />

      {/* Progress & Live HUD Bar */}
      <div className="w-full max-w-4xl flex flex-col gap-2 p-3 sm:p-4 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 flex-wrap gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            {/* Live WPM */}
            {settings.showLiveWpm && !settings.blindMode && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 text-indigo-800">
                <Zap className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
                <span className="text-xs sm:text-sm font-black">{liveStats.wpm}</span>
                <span className="text-[10px] text-indigo-600 font-semibold uppercase">WPM</span>
              </div>
            )}

            {/* Live Accuracy */}
            {!settings.blindMode && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-800">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs sm:text-sm font-black">{liveStats.accuracy}%</span>
                <span className="text-[10px] text-emerald-600 font-semibold uppercase">ACC</span>
              </div>
            )}

            {/* Error Counter */}
            {currentIncorrect > 0 && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>{currentIncorrect} errors</span>
              </div>
            )}
          </div>

          {/* Time or Character Counter */}
          <div className="flex items-center gap-2 font-black text-slate-800 text-xs sm:text-sm">
            {timeLimit ? (
              <span>{timeLimit - timeElapsed}s</span>
            ) : (
              <span>
                {typedChars.length} / {targetText.length}
              </span>
            )}
          </div>
        </div>

        {/* Live Top Gradient Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-100/80 overflow-hidden border border-white/40">
          <div
            className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Active Word Focus Bar - Ideal for Mobile Clarity */}
      {!isFinished && activeWordHUD.wordChars.length > 0 && (
        <div className="w-full max-w-4xl px-4 py-2 rounded-2xl bg-slate-900/90 text-white shadow-lg flex items-center justify-between gap-3 text-xs font-semibold backdrop-blur-md border border-slate-800">
          <div className="flex items-center gap-2 shrink-0 text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">Current Word:</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-base sm:text-xl font-bold tracking-wider overflow-x-auto">
            {activeWordHUD.wordChars.map((char, idx) => {
              const charGlobalIdx = activeWordHUD.start + idx;
              const isTyped = charGlobalIdx < typedChars.length;
              const isCurrent = charGlobalIdx === typedChars.length;
              const typedVal = typedChars[charGlobalIdx];
              const isCorrect = isTyped && typedVal === char;

              let style = 'text-slate-400';
              if (isCorrect) style = 'text-emerald-400 font-extrabold';
              else if (isTyped) style = 'text-rose-400 underline font-extrabold bg-rose-950/60 rounded px-0.5';
              else if (isCurrent) style = 'text-indigo-300 underline font-extrabold animate-pulse bg-indigo-900/50 rounded px-0.5';

              return (
                <span key={idx} className={style}>
                  {char === ' ' ? '␣' : char}
                </span>
              );
            })}
          </div>
          <span className="text-[10px] text-slate-400 hidden sm:inline">Keep typing...</span>
        </div>
      )}

      {/* Main Glassy Typing Canvas Box */}
      <div
        ref={textContainerRef}
        className="w-full max-w-4xl min-h-[160px] sm:min-h-[200px] p-4 sm:p-8 md:p-12 rounded-[28px] sm:rounded-[32px] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-sm relative overflow-hidden flex flex-wrap items-center content-start gap-y-2 font-mono tracking-wide text-slate-400 transition-all max-h-[360px] overflow-y-auto"
      >
        {/* Unfocused overlay prompt if input loses focus */}
        {!isFinished && (
          <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[2px] opacity-0 hover:opacity-100 focus-within:opacity-0 transition-opacity flex flex-col items-center justify-center pointer-events-none p-4 text-center">
            <button
              onClick={() => inputRef.current?.focus()}
              className="px-5 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold shadow-xl flex items-center gap-2 pointer-events-auto active:scale-95 transition-all"
            >
              <span>📱 Tap to focus & bring up keyboard</span>
            </button>
          </div>
        )}

        {/* Start typing prompt callout */}
        {!isStarted && (
          <div className="absolute top-3 right-4 sm:top-4 sm:right-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-200 animate-pulse">
            <Play className="w-3 h-3 fill-indigo-600" />
            <span>Start typing to begin...</span>
          </div>
        )}

        {/* Character by character rendering */}
        {targetText.split('').map((char, index) => {
          const typedChar = typedChars[index];
          const isTyped = index < typedChars.length;
          const isCurrent = index === typedChars.length;
          const isCorrect = isTyped && typedChar === char;
          const isIncorrect = isTyped && typedChar !== char;

          let colorClass = 'text-slate-400 font-light';
          if (isCorrect) colorClass = 'text-slate-800 font-semibold';
          if (isIncorrect)
            colorClass =
              'text-rose-600 bg-rose-100/80 rounded px-0.5 underline decoration-rose-500 font-bold';

          return (
            <span
              key={index}
              ref={isCurrent ? activeCharRef : null}
              className={`relative inline-block ${fontClasses[settings.fontSize]} ${colorClass}`}
            >
              {/* Active Caret */}
              {isCurrent && (
                <span
                  className={`absolute left-0 top-1 bottom-1 ${
                    caretClasses[settings.caretStyle]
                  }`}
                />
              )}
              {/* Spacebar visualization */}
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
      </div>

      {/* Footer Hotkey Restart Tip */}
      <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-500 pt-2">
        <button
          onClick={onRestart}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 shadow-sm transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart Test</span>
        </button>
        <span className="hidden sm:inline text-slate-400">Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[11px]">Tab</kbd> then <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[11px]">Enter</kbd> to quick restart</span>
      </div>
    </div>
  );
};
