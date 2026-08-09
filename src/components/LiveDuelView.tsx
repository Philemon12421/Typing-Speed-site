import React, { useState, useEffect, useRef } from 'react';
import { UserSettings, AiOpponent, TestResult } from '../types';
import { calculateStats } from '../utils/typingUtils';
import { soundSynth } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  Swords,
  Bot,
  User,
  Trophy,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  Clock,
  Target,
  Flame,
  CheckCircle2,
  AlertCircle,
  Flag
} from 'lucide-react';

interface LiveDuelViewProps {
  settings: UserSettings;
  personalBestWpm: number;
  onSaveResult: (result: TestResult) => void;
}

const AI_OPPONENTS: AiOpponent[] = [
  {
    id: 'bot_turtle',
    name: 'Turtle Bot',
    title: 'Beginner Trainee',
    avatar: '🐢',
    targetWpm: 30,
    accuracy: 92,
    description: 'Slow and steady typist. Perfect for beginners testing their rhythm.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'bot_coder',
    name: 'Dev Coder Bot',
    title: 'Intermediate Typist',
    avatar: '🤖',
    targetWpm: 50,
    accuracy: 95,
    description: 'Maintains steady developer typing velocity with high accuracy.',
    color: 'from-sky-500 to-indigo-600',
  },
  {
    id: 'bot_speedster',
    name: 'Cyber Speedster',
    title: 'Advanced Racer',
    avatar: '🏎️',
    targetWpm: 75,
    accuracy: 96,
    description: 'Rapid touch typist that maintains blistering momentum.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'bot_grandmaster',
    name: 'Grandmaster Pulse',
    title: 'Elite Pro',
    avatar: '⚡',
    targetWpm: 100,
    accuracy: 98,
    description: 'Master touch-typist with lightning fast key transitions.',
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 'bot_dragon',
    name: 'Quantum Dragon',
    title: 'Legendary Boss',
    avatar: '🐉',
    targetWpm: 125,
    accuracy: 99,
    description: 'Near-instant typing speed! Test your ultimate speed limits.',
    color: 'from-rose-600 to-red-700',
  },
];

const DUEL_PASSAGES = [
  "In the quiet depths of software engineering, precision and speed flow in perfect harmony. Every keypress is a rhythm, every word a stroke of functional mastery.",
  "Technology evolves when dedicated minds push beyond traditional boundaries. Mastery comes not from avoiding mistakes, but from developing flawless muscle memory.",
  "The secret to fast touch typing is relaxing your hands and letting your fingers locate home row instinctively without looking down at the keyboard.",
  "Velocity and consistency drive success in high pressure environments. Concentrate on rhythm, maintain high accuracy, and watch your speed soar naturally."
];

export const LiveDuelView: React.FC<LiveDuelViewProps> = ({
  settings,
  personalBestWpm,
  onSaveResult,
}) => {
  const [selectedOpponent, setSelectedOpponent] = useState<AiOpponent>(AI_OPPONENTS[1]);
  const [passageText, setPassageText] = useState<string>(DUEL_PASSAGES[0]);

  // Game States: 'idle' | 'countdown' | 'racing' | 'finished'
  const [gameState, setGameState] = useState<'idle' | 'countdown' | 'racing' | 'finished'>('idle');
  const [countdown, setCountdown] = useState<number | null>(null);

  // User Race State
  const [userTyped, setUserTyped] = useState<string>('');
  const [userStartTime, setUserStartTime] = useState<number>(0);
  const [userEndTime, setUserEndTime] = useState<number>(0);

  // AI Race State
  const [aiCharIndex, setAiCharIndex] = useState<number>(0);
  const [aiEndTime, setAiEndTime] = useState<number>(0);

  // Result Winner State
  const [winner, setWinner] = useState<'user' | 'ai' | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Select a random passage
  const getRandomPassage = () => {
    const idx = Math.floor(Math.random() * DUEL_PASSAGES.length);
    setPassageText(DUEL_PASSAGES[idx]);
  };

  // Start Race Handler (Triggers 3, 2, 1, GO Countdown)
  const handleInitiateDuel = () => {
    getRandomPassage();
    setUserTyped('');
    setAiCharIndex(0);
    setUserStartTime(0);
    setUserEndTime(0);
    setAiEndTime(0);
    setWinner(null);
    setGameState('countdown');
    setCountdown(3);
  };

  // Countdown Interval Effect
  useEffect(() => {
    if (gameState !== 'countdown' || countdown === null) return;

    soundSynth.playKeyPress(settings.soundProfile, settings.soundVolume, false, false);

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => (prev !== null ? prev - 1 : 0));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Countdown finished -> Start Race!
      const now = Date.now();
      setGameState('racing');
      setUserStartTime(now);
      setCountdown(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [gameState, countdown]);

  // AI Opponent Progress Simulation Loop
  useEffect(() => {
    if (gameState !== 'racing') return;

    // Calculate AI char speed (Target WPM * 5 chars per word / 60 seconds)
    const charsPerSec = (selectedOpponent.targetWpm * 5) / 60;
    const intervalMs = Math.max(20, Math.round(1000 / charsPerSec));

    const aiInterval = setInterval(() => {
      setAiCharIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= passageText.length) {
          clearInterval(aiInterval);
          if (!aiEndTime) setAiEndTime(Date.now());
          return passageText.length;
        }
        return nextIndex;
      });
    }, intervalMs);

    return () => clearInterval(aiInterval);
  }, [gameState, selectedOpponent, passageText]);

  // Check Finish Conditions for User and AI
  useEffect(() => {
    if (gameState !== 'racing') return;

    const userFinished = userTyped.length >= passageText.length;
    const aiFinished = aiCharIndex >= passageText.length;

    if (userFinished || aiFinished) {
      const now = Date.now();
      if (userFinished && !winner) {
        setGameState('finished');
        setUserEndTime(now);
        setWinner('user');

        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
          });
        } catch (e) {}

        // Save result
        const elapsedSec = Math.max(1, Math.round((now - userStartTime) / 1000));
        let correct = 0;
        let incorrect = 0;
        for (let i = 0; i < userTyped.length; i++) {
          if (userTyped[i] === passageText[i]) correct++;
          else incorrect++;
        }
        const stats = calculateStats(userTyped.length, correct, incorrect, 0, elapsedSec, []);
        onSaveResult({
          id: `duel-${Date.now()}`,
          timestamp: Date.now(),
          wpm: stats.wpm,
          rawWpm: stats.rawWpm,
          accuracy: stats.accuracy,
          cpm: stats.cpm,
          timeSeconds: elapsedSec,
          totalChars: userTyped.length,
          correctChars: correct,
          incorrectChars: incorrect,
          extraChars: 0,
          missedChars: 0,
          consistency: stats.consistency,
          mode: 'time',
          modeDetail: `Duel vs ${selectedOpponent.name}`,
          wpmHistory: [],
          keyErrors: {},
          fingerStats: {},
        });
      } else if (aiFinished && !winner) {
        setGameState('finished');
        setWinner('ai');
      }
    }
  }, [userTyped, aiCharIndex, passageText, gameState, winner]);

  // User typing handler
  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (gameState !== 'racing') return;
    const val = e.target.value;
    soundSynth.playKeyPress(settings.soundProfile, settings.soundVolume, val.endsWith(' '), false);
    setUserTyped(val);
  };

  // Progress Calculations
  const userProgressPercent = Math.min(100, Math.round((userTyped.length / passageText.length) * 100));
  const aiProgressPercent = Math.min(100, Math.round((aiCharIndex / passageText.length) * 100));

  // Live Stats
  const elapsedSeconds = userStartTime ? Math.max(1, Math.round(((userEndTime || Date.now()) - userStartTime) / 1000)) : 1;
  let userCorrect = 0;
  let userIncorrect = 0;
  for (let i = 0; i < userTyped.length; i++) {
    if (userTyped[i] === passageText[i]) userCorrect++;
    else userIncorrect++;
  }
  const userLiveStats = calculateStats(userTyped.length, userCorrect, userIncorrect, 0, elapsedSeconds, []);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 p-4 sm:p-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 backdrop-blur-md flex items-center justify-center shrink-0 shadow-lg">
            <Swords className="w-9 h-9 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-black text-[10px] uppercase tracking-widest">
                Real-Time AI Arena
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-0.5">Live Typing Duel</h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 max-w-lg">
              Race head-to-head against calibrated AI opponents in real time. Select your rival, launch countdown, and race to the finish line!
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md flex items-center gap-3 shrink-0">
          <Trophy className="w-8 h-8 text-amber-400 shrink-0" />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Your Record</div>
            <div className="text-lg font-black text-white">{personalBestWpm} WPM</div>
          </div>
        </div>
      </div>

      {/* Opponent Selection Cards */}
      {gameState === 'idle' && (
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Bot className="w-5 h-5 text-indigo-600" />
            <span>Select Your AI Opponent:</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {AI_OPPONENTS.map((opp) => {
              const isSelected = selectedOpponent.id === opp.id;
              return (
                <div
                  key={opp.id}
                  onClick={() => setSelectedOpponent(opp)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between gap-3 relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-br from-indigo-50/90 via-white to-purple-50/80 border-indigo-500 shadow-md scale-[1.02]'
                      : 'bg-white/70 backdrop-blur-xl border-white/60 hover:border-indigo-200 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{opp.avatar}</span>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm">{opp.name}</h3>
                        <span className="text-[10px] font-bold uppercase text-slate-500">{opp.title}</span>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-black text-white bg-gradient-to-r ${opp.color} shadow-sm`}>
                      {opp.targetWpm} WPM
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pt-2 border-t border-slate-100">
                    <span>Target ACC: {opp.accuracy}%</span>
                    {isSelected && (
                      <span className="text-indigo-600 font-black flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleInitiateDuel}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base shadow-xl shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
            >
              <Swords className="w-5 h-5" />
              <span>Start Duel vs {selectedOpponent.name}</span>
            </button>
          </div>
        </div>
      )}

      {/* Countdown Modal Overlay */}
      {gameState === 'countdown' && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-4 text-white animate-in fade-in duration-200">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-4xl sm:text-5xl font-black text-indigo-400">
              Duel Starting vs {selectedOpponent.name}
            </div>
            <div className="text-8xl sm:text-9xl font-black text-amber-400 animate-bounce my-4">
              {countdown === 0 ? 'GO!' : countdown}
            </div>
            <p className="text-sm font-semibold text-slate-300">
              Get ready to type as fast as you can!
            </p>
          </div>
        </div>
      )}

      {/* Active Race / Results Display */}
      {(gameState === 'racing' || gameState === 'finished') && (
        <div className="flex flex-col gap-6">
          
          {/* Race Tracks HUD */}
          <div className="p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-md flex flex-col gap-6">
            
            {/* Track 1: USER TRACK */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2 text-slate-900">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-extrabold">{settings.userName || 'You'}</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px]">Your Speed: {userLiveStats.wpm} WPM</span>
                </div>
                <span className="text-indigo-600 font-extrabold">{userProgressPercent}%</span>
              </div>

              <div className="w-full h-5 rounded-2xl bg-slate-100 overflow-hidden p-1 border border-slate-200 relative flex items-center">
                <div
                  className="h-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-200 relative flex items-center justify-end pr-1 shadow-sm"
                  style={{ width: `${Math.max(4, userProgressPercent)}%` }}
                >
                  <span className="text-xs">🏃</span>
                </div>
              </div>
            </div>

            {/* Track 2: AI OPPONENT TRACK */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2 text-slate-900">
                  <span className="text-base">{selectedOpponent.avatar}</span>
                  <span className="text-sm font-extrabold">{selectedOpponent.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">{selectedOpponent.targetWpm} WPM Pace</span>
                </div>
                <span className="text-slate-700 font-extrabold">{aiProgressPercent}%</span>
              </div>

              <div className="w-full h-5 rounded-2xl bg-slate-100 overflow-hidden p-1 border border-slate-200 relative flex items-center">
                <div
                  className={`h-full rounded-xl bg-gradient-to-r ${selectedOpponent.color} transition-all duration-200 relative flex items-center justify-end pr-1 shadow-sm`}
                  style={{ width: `${Math.max(4, aiProgressPercent)}%` }}
                >
                  <span className="text-xs">{selectedOpponent.avatar}</span>
                </div>
              </div>
            </div>

            {/* Distance Lead Indicator */}
            <div className="text-center text-xs font-bold text-slate-600 pt-1">
              {userProgressPercent > aiProgressPercent ? (
                <span className="text-emerald-600 flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 fill-emerald-600" /> You are leading by +{userProgressPercent - aiProgressPercent}%!
                </span>
              ) : aiProgressPercent > userProgressPercent ? (
                <span className="text-rose-600 flex items-center justify-center gap-1">
                  <AlertCircle className="w-4 h-4" /> Opponent is leading by +{aiProgressPercent - userProgressPercent}%!
                </span>
              ) : (
                <span>Neck and neck race! Keep typing!</span>
              )}
            </div>
          </div>

          {/* Typing Area Box */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="w-full p-6 sm:p-10 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-md font-mono text-lg sm:text-2xl leading-relaxed tracking-wide text-slate-400 relative cursor-text select-none min-h-[160px]"
          >
            <input
              ref={inputRef}
              type="text"
              value={userTyped}
              onChange={handleUserInputChange}
              disabled={gameState === 'finished'}
              className="opacity-0 absolute top-0 left-0 w-1 h-1 pointer-events-none"
              autoFocus
            />

            {passageText.split('').map((char, index) => {
              const isTyped = index < userTyped.length;
              const isCurrent = index === userTyped.length;
              const isCorrect = isTyped && userTyped[index] === char;
              const isIncorrect = isTyped && userTyped[index] !== char;

              let style = 'text-slate-400';
              if (isCorrect) style = 'text-slate-900 font-bold';
              if (isIncorrect) style = 'text-rose-600 bg-rose-100 rounded underline font-bold';

              return (
                <span key={index} className={`relative ${style}`}>
                  {isCurrent && (
                    <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-indigo-600 animate-pulse" />
                  )}
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </div>

          {/* Finished Outcome Card */}
          {gameState === 'finished' && (
            <div className={`p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col items-center text-center gap-4 animate-in zoom-in-95 duration-300 ${
              winner === 'user'
                ? 'bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800'
                : 'bg-gradient-to-r from-rose-700 via-slate-900 to-slate-900'
            }`}>
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl shadow-lg border border-white/20">
                {winner === 'user' ? '🏆' : '💔'}
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black">
                  {winner === 'user' ? 'VICTORY! YOU WON THE DUEL!' : `${selectedOpponent.name} WON THE RACE`}
                </h2>
                <p className="text-xs sm:text-sm text-white/80 font-medium mt-1">
                  {winner === 'user'
                    ? `You defeated ${selectedOpponent.name} with an impressive speed of ${userLiveStats.wpm} WPM!`
                    : `Keep practicing your muscle memory and challenge ${selectedOpponent.name} again!`}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={handleInitiateDuel}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-xs sm:text-sm shadow-md hover:bg-slate-100 transition-all active:scale-95"
                >
                  <RotateCcw className="w-4 h-4 text-indigo-600" />
                  <span>Rematch Duel</span>
                </button>

                <button
                  onClick={() => setGameState('idle')}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
                >
                  Choose Different Opponent
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
