import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [countdown, setCountdown] = useState<number | null>(null);
  
  // Real-time error tracking maps
  const [keyErrors, setKeyErrors] = useState<Record<string, number>>({});
  const [fingerStats, setFingerStats] = useState<Record<string, { hits: number; errors: number }>>({});
  
  // WPM history recorded every second
  const [wpmHistory, setWpmHistory] = useState<WpmPoint[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);
  const startTimeRef = useRef<number | null>(null);

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
    setCountdown(null);
    setKeyErrors({});
    setFingerStats({});
    setWpmHistory([]);
    startTimeRef.current = null;
  }, [targetText]);

  // Handle Start Test with Countdown
  const handleStartWithCountdown = () => {
    if (isStarted || countdown !== null) return;
    setCountdown(3);
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown === null) return;

    soundSynth.playKeyPress(settings.soundProfile, settings.soundVolume, false, false);

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => (prev !== null ? prev - 1 : 0));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      const timer = setTimeout(() => {
        setCountdown(null);
        setIsStarted(true);
        startTimeRef.current = performance.now();
        setTimeout(() => inputRef.current?.focus(), 50);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Scroll active char into view seamlessly inside container ONLY (never scrolling the page/keyboard)
  useEffect(() => {
    const container = textContainerRef.current;
    const activeChar = activeCharRef.current;
    if (container && activeChar) {
      const containerRect = container.getBoundingClientRect();
      const charRect = activeChar.getBoundingClientRect();

      // Scroll container ONLY when active character is hiding beyond visible container edges
      if (charRect.bottom > containerRect.bottom - 24) {
        container.scrollTop += (charRect.bottom - containerRect.bottom + 36);
      } else if (charRect.top < containerRect.top + 24) {
        container.scrollTop -= (containerRect.top - charRect.top + 36);
      }
    }
  }, [typedChars]);

  // Keep a ref to onActiveCharChange to avoid effect re-triggering loops
  const onActiveCharChangeRef = useRef(onActiveCharChange);
  useEffect(() => {
    onActiveCharChangeRef.current = onActiveCharChange;
  }, [onActiveCharChange]);

  // Notify parent component of current active character for Virtual Keyboard guidance
  useEffect(() => {
    if (isFinished) return;
    const currentChar = targetText[typedChars.length] || '';
    const nextChar = targetText[typedChars.length + 1] || '';
    if (onActiveCharChangeRef.current) {
      onActiveCharChangeRef.current(currentChar, nextChar);
    }
  }, [typedChars, targetText, isFinished]);

  // Main Timer Interval with exact millisecond synchronization
  useEffect(() => {
    if (!isStarted || isFinished) return;

    const interval = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Math.floor((performance.now() - startTimeRef.current) / 1000);
        setTimeElapsed(elapsed);
      } else {
        setTimeElapsed((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, isFinished]);

  // Per-second Stats & Time Limit Check
  useEffect(() => {
    if (!isStarted || isFinished || timeElapsed === 0) return;

    let correct = 0;
    let incorrect = 0;
    for (let i = 0; i < typedChars.length; i++) {
      if (typedChars[i] === targetText[i]) correct++;
      else incorrect++;
    }

    const exactElapsed = startTimeRef.current 
      ? Math.max(0.5, (performance.now() - startTimeRef.current) / 1000) 
      : timeElapsed;

    const stats = calculateStats(
      typedChars.length,
      correct,
      incorrect,
      0,
      exactElapsed,
      wpmHistory
    );

    setWpmHistory((prevHistory) => [
      ...prevHistory,
      {
        second: timeElapsed,
        wpm: stats.wpm,
        rawWpm: stats.rawWpm,
        errors: incorrect,
        accuracy: stats.accuracy,
      },
    ]);

    if (timeLimit && timeElapsed >= timeLimit) {
      setIsFinished(true);
      finishTest(exactElapsed, typedChars);
    }
  }, [timeElapsed]);

  // Finish Test Logic with mathematically exact elapsed time
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
    
    // Exact elapsed time in seconds with millisecond resolution
    const exactElapsed = startTimeRef.current
      ? Math.max(0.5, (performance.now() - startTimeRef.current) / 1000)
      : Math.max(0.5, finalTimeSeconds);

    const roundedSeconds = Math.max(1, Math.round(exactElapsed));

    const stats = calculateStats(
      currentTyped.length,
      correctChars,
      incorrectChars,
      0,
      exactElapsed,
      wpmHistory
    );

    onTestComplete({
      wpm: stats.wpm,
      rawWpm: stats.rawWpm,
      accuracy: stats.accuracy,
      cpm: stats.cpm,
      timeSeconds: roundedSeconds,
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
    if (isFinished || countdown !== null) return;

    const newTyped = e.target.value;

    // First keypress triggers timer start with precise timestamp
    if (!isStarted && newTyped.length > 0) {
      setIsStarted(true);
      startTimeRef.current = performance.now();
    }

    const lastInputIndex = newTyped.length - 1;
    const lastChar = newTyped[lastInputIndex];
    const expectedChar = targetText[lastInputIndex];

    // Sound effect trigger
    if (newTyped.length > typedChars.length) {
      const isError = lastChar !== expectedChar;
      const activeProfile = settings.soundEnabled === false ? 'silent' : settings.soundProfile;
      soundSynth.playKeyPress(
        activeProfile,
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
      const elapsed = startTimeRef.current
        ? (performance.now() - startTimeRef.current) / 1000
        : (timeElapsed || 1);
      finishTest(elapsed, newTyped);
    }
  };

  // Calculate live stats for HUD with precise elapsed time
  let currentCorrect = 0;
  let currentIncorrect = 0;
  for (let i = 0; i < typedChars.length; i++) {
    if (typedChars[i] === targetText[i]) currentCorrect++;
    else currentIncorrect++;
  }

  const liveElapsed = isStarted && startTimeRef.current
    ? Math.max(0.3, (performance.now() - startTimeRef.current) / 1000)
    : (timeElapsed || 0);

  const liveStats = calculateStats(
    typedChars.length,
    currentCorrect,
    currentIncorrect,
    0,
    liveElapsed,
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
    line: 'w-0.5 bg-indigo-600 dark:bg-indigo-400 animate-pulse',
    block: 'w-3.5 bg-indigo-500/40 dark:bg-indigo-400/40 border-b-2 border-indigo-600 dark:border-indigo-400 animate-pulse',
    underline: 'w-3.5 border-b-2 border-indigo-600 dark:border-indigo-400 animate-pulse',
    smooth: 'w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400 shadow-lg shadow-indigo-500/50 animate-pulse',
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

  // Group characters into whole words with their trailing whitespace so words are never cut across lines
  const wordTokens = useMemo(() => {
    const tokens: { id: number; chars: { char: string; index: number }[] }[] = [];
    let currentChars: { char: string; index: number }[] = [];

    for (let i = 0; i < targetText.length; i++) {
      const char = targetText[i];
      currentChars.push({ char, index: i });

      // Space or newline boundary groups the word and its trailing space together
      if (char === ' ' || char === '\n') {
        tokens.push({
          id: tokens.length,
          chars: currentChars,
        });
        currentChars = [];
      }
    }

    if (currentChars.length > 0) {
      tokens.push({
        id: tokens.length,
        chars: currentChars,
      });
    }

    return tokens;
  }, [targetText]);

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
      <div className="w-full max-w-4xl flex flex-col gap-2 p-3 sm:p-4 rounded-3xl bg-white/60 dark:bg-zinc-950/80 backdrop-blur-xl border border-slate-200/60 dark:border-zinc-800/80 shadow-sm transition-colors">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-zinc-400 flex-wrap gap-2">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            {/* Live WPM */}
            {settings.showLiveWpm && !settings.blindMode && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/50 text-indigo-800 dark:text-indigo-300">
                <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
                <span className="text-xs sm:text-sm font-black">{liveStats.wpm}</span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase">WPM</span>
              </div>
            )}

            {/* Live Accuracy */}
            {!settings.blindMode && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300">
                <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs sm:text-sm font-black">{liveStats.accuracy}%</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold uppercase">ACC</span>
              </div>
            )}

            {/* Error Counter */}
            {currentIncorrect > 0 && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-300 font-bold text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>{currentIncorrect} errors</span>
              </div>
            )}
          </div>

          {/* Time or Character Counter */}
          <div className="flex items-center gap-2 font-black text-slate-800 dark:text-zinc-200 text-xs sm:text-sm">
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
        <div className="w-full h-2 rounded-full bg-slate-100/80 dark:bg-zinc-800/80 overflow-hidden border border-slate-200/40 dark:border-zinc-800">
          <div
            className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Active Word Focus Bar - Ideal for Mobile Clarity */}
      {!isFinished && activeWordHUD.wordChars.length > 0 && (
        <div className="w-full max-w-4xl px-4 py-2 rounded-2xl bg-slate-900/90 dark:bg-black/95 text-white shadow-lg flex items-center justify-between gap-3 text-xs font-semibold backdrop-blur-md border border-slate-800 dark:border-zinc-800">
          <div className="flex items-center gap-2 shrink-0 text-slate-400 dark:text-zinc-400">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">Current Word:</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-base sm:text-xl font-bold tracking-wider overflow-x-auto">
            {activeWordHUD.wordChars.map((char, idx) => {
              const charGlobalIdx = activeWordHUD.start + idx;
              const isTyped = charGlobalIdx < typedChars.length;
              const isCurrent = charGlobalIdx === typedChars.length;
              const typedVal = typedChars[charGlobalIdx];
              const isCorrect = isTyped && typedVal === char;

              let style = 'text-slate-400 dark:text-zinc-500';
              if (isCorrect) style = 'text-emerald-400 font-extrabold';
              else if (isTyped) style = 'text-rose-400 underline font-extrabold bg-rose-950/60 rounded px-0.5';
              else if (isCurrent) style = 'text-indigo-300 dark:text-indigo-400 underline font-extrabold animate-pulse bg-indigo-900/50 dark:bg-indigo-950/70 rounded px-0.5';

              return (
                <span key={idx} className={style}>
                  {char === ' ' ? '␣' : char}
                </span>
              );
            })}
          </div>
          <span className="text-[10px] text-slate-400 dark:text-zinc-500 hidden sm:inline">Keep typing...</span>
        </div>
      )}

      {/* Main Glassy Typing Canvas Box */}
      <div
        ref={textContainerRef}
        className="w-full max-w-4xl h-[200px] sm:h-[240px] p-4 sm:p-8 md:p-12 rounded-[28px] sm:rounded-[32px] bg-white/40 dark:bg-zinc-950/90 backdrop-blur-2xl border border-slate-200/60 dark:border-zinc-800/90 shadow-sm relative overflow-y-auto flex flex-wrap items-start content-start gap-y-2 font-mono tracking-wide text-slate-400 dark:text-zinc-500 scroll-smooth transition-colors"
      >
        {/* Unfocused overlay prompt if input loses focus */}
        {!isFinished && !countdown && (
          <div className="absolute inset-0 z-10 bg-white/40 dark:bg-black/40 backdrop-blur-[2px] opacity-0 hover:opacity-100 focus-within:opacity-0 transition-opacity flex flex-col items-center justify-center pointer-events-none p-4 text-center">
            <button
              onClick={() => inputRef.current?.focus()}
              className="px-5 py-2.5 rounded-2xl bg-slate-900 dark:bg-zinc-800 text-white text-xs font-bold shadow-xl flex items-center gap-2 pointer-events-auto active:scale-95 transition-all"
            >
              <span>📱 Tap to focus & bring up keyboard</span>
            </button>
          </div>
        )}

        {/* Start Test Button Banner (Before starting) */}
        {!isStarted && countdown === null && (
          <div className="absolute inset-0 z-20 bg-slate-900/10 dark:bg-black/60 backdrop-blur-[3px] flex flex-col items-center justify-center p-4 text-center gap-3 animate-in fade-in duration-200">
            <button
              onClick={handleStartWithCountdown}
              className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm sm:text-base font-extrabold shadow-xl shadow-indigo-600/30 flex items-center gap-2.5 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Click to Start Test</span>
            </button>
            <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 bg-white/80 dark:bg-zinc-900/90 px-3 py-1 rounded-full shadow-sm border border-slate-200/80 dark:border-zinc-800">
              Or start typing directly to begin
            </span>
          </div>
        )}

        {/* Clean Countdown Popup Modal (3... 2... 1... GO!) */}
        {countdown !== null && (
          <div className="absolute inset-0 z-30 bg-slate-950/85 dark:bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 text-white text-center animate-in zoom-in-95 duration-200">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Get Ready</span>
            <div className="text-7xl sm:text-8xl font-black text-amber-400 my-2 animate-bounce">
              {countdown === 0 ? 'GO!' : countdown}
            </div>
            <span className="text-xs font-semibold text-slate-300">Hands on home row!</span>
          </div>
        )}

        {/* Whole-word rendering: words are kept complete on the same line and never cut */}
        {wordTokens.map((word) => (
          <span
            key={word.id}
            className="inline-flex flex-shrink-0 whitespace-nowrap"
          >
            {word.chars.map(({ char, index }) => {
              const typedChar = typedChars[index];
              const isTyped = index < typedChars.length;
              const isCurrent = index === typedChars.length;
              const isCorrect = isTyped && typedChar === char;
              const isIncorrect = isTyped && typedChar !== char;

              let colorClass = 'text-slate-400 dark:text-zinc-600 font-light';
              if (isCorrect) colorClass = 'text-slate-800 dark:text-zinc-100 font-semibold';
              if (isIncorrect)
                colorClass =
                  'text-rose-600 dark:text-rose-400 bg-rose-100/80 dark:bg-rose-950/80 rounded px-0.5 underline decoration-rose-500 font-bold';

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
                  {char === ' ' ? '\u00A0' : char === '\n' ? '\u21B5' : char}
                </span>
              );
            })}
          </span>
        ))}
      </div>

      {/* Footer Hotkey Restart Tip */}
      <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-zinc-400 pt-2">
        <button
          onClick={onRestart}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200/80 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 shadow-sm transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart Test</span>
        </button>
        <span className="hidden sm:inline text-slate-400 dark:text-zinc-500">Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-mono text-[11px]">Tab</kbd> then <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-mono text-[11px]">Enter</kbd> to quick restart</span>
      </div>
    </div>
  );
};
