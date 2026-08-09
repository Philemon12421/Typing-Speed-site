import React, { useEffect, useState, useCallback } from 'react';
import {
  TabType,
  TestMode,
  TimeOption,
  WordsOption,
  QuoteLength,
  TestResult,
  UserSettings,
  AIAnalysis,
  TypingChallenge,
} from './types';
import {
  getUserSettings,
  saveUserSettings,
  getTestResults,
  saveTestResult,
  getOverallAnalytics,
  getTodayGoalProgress,
  getCompletedChallengeIds,
  saveCompletedChallengeId,
} from './utils/storage';
import { generateWordsText, getRandomQuote } from './utils/typingUtils';
import { Navbar } from './components/Navbar';
import { TestControls } from './components/TestControls';
import { TypingArea } from './components/TypingArea';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { ResultsModal } from './components/ResultsModal';
import { ProAnalytics } from './components/ProAnalytics';
import { CertificateModal } from './components/CertificateModal';
import { GoalSoundModal } from './components/GoalSoundModal';
import { ChallengesView } from './components/ChallengesView';
import { AnimatedGuideView } from './components/AnimatedGuideView';
import { Eye, EyeOff, Sparkles, Award, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('test');
  const [settings, setSettings] = useState<UserSettings>(getUserSettings());
  const [results, setResults] = useState<TestResult[]>(getTestResults());

  // Challenges State
  const [completedChallengeIds, setCompletedChallengeIds] = useState<string[]>(getCompletedChallengeIds());
  const [activeChallenge, setActiveChallenge] = useState<TypingChallenge | null>(null);
  const [challengeSuccessMessage, setChallengeSuccessMessage] = useState<string | null>(null);

  // Goal & Sound Modal State
  const [isGoalSoundModalOpen, setIsGoalSoundModalOpen] = useState<boolean>(false);

  // Test Mode Configurations
  const [mode, setMode] = useState<TestMode>('time');
  const [timeOption, setTimeOption] = useState<TimeOption>(30);
  const [wordsOption, setWordsOption] = useState<WordsOption>(25);
  const [quoteLength, setQuoteLength] = useState<QuoteLength>('medium');
  const [customText, setCustomText] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('');

  // Active Passage Text
  const [targetText, setTargetText] = useState<string>('');

  // Live Keyboard Guidance Character
  const [activeChar, setActiveChar] = useState<string>('');
  const [nextChar, setNextChar] = useState<string>('');

  const handleActiveCharChange = useCallback((char: string, next: string) => {
    setActiveChar((prev) => (prev === char ? prev : char));
    setNextChar((prev) => (prev === next ? prev : next));
  }, []);

  // Keyboard Visibility Toggle
  const [showKeyboard, setShowKeyboard] = useState<boolean>(true);

  // Result & Modal States
  const [latestResult, setLatestResult] = useState<TestResult | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | undefined>(undefined);

  // Handler for updating user settings & saving to local storage
  const handleUpdateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    saveUserSettings(newSettings);
  };

  // Sync keyboard toggle with settings
  useEffect(() => {
    setShowKeyboard(settings.showKeyboard);
  }, [settings.showKeyboard]);

  // Regenerate passage when mode or options change
  const generateNewPassage = useCallback(() => {
    setLatestResult(null);
    setAiAnalysis(undefined);

    if (mode === 'time') {
      // For time mode, generate enough words (150 words) so text doesn't run out
      setTargetText(generateWordsText(150));
    } else if (mode === 'words') {
      setTargetText(generateWordsText(wordsOption));
    } else if (mode === 'quote') {
      setTargetText(getRandomQuote(quoteLength));
    } else if (mode === 'custom' || mode === 'drill') {
      if (customText) {
        setTargetText(customText);
      } else {
        setTargetText(generateWordsText(30));
      }
    }
  }, [mode, wordsOption, quoteLength, customText]);

  useEffect(() => {
    generateNewPassage();
  }, [generateNewPassage]);

  // Handle starting a challenge
  const handleStartChallenge = (challenge: TypingChallenge) => {
    setActiveChallenge(challenge);
    setChallengeSuccessMessage(null);
    setMode(challenge.mode);

    if (challenge.timeSeconds) setTimeOption(challenge.timeSeconds as TimeOption);
    if (challenge.wordCount) setWordsOption(challenge.wordCount as WordsOption);
    if (challenge.customText) {
      setCustomText(challenge.customText);
      setCustomTitle(challenge.title);
    }
    setActiveTab('test');
    setTimeout(() => {
      generateNewPassage();
    }, 50);
  };

  // Handle test completion
  const handleTestComplete = (data: {
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
    wpmHistory: any[];
    keyErrors: Record<string, number>;
    fingerStats: Record<string, { hits: number; errors: number }>;
  }) => {
    let modeDetail = `${timeOption}s`;
    if (mode === 'words') modeDetail = `${wordsOption} words`;
    if (mode === 'quote') modeDetail = `Quote (${quoteLength})`;
    if (mode === 'custom') modeDetail = customTitle || 'Custom Text';
    if (mode === 'drill') modeDetail = customTitle || 'Drill';

    if (activeChallenge) {
      modeDetail = `Challenge: ${activeChallenge.title}`;
      if (data.wpm >= activeChallenge.targetWpm && data.accuracy >= activeChallenge.targetAccuracy) {
        const updatedIds = saveCompletedChallengeId(activeChallenge.id);
        setCompletedChallengeIds(updatedIds);
        setChallengeSuccessMessage(`🎉 Challenge Unlocked: ${activeChallenge.title}! (+${activeChallenge.xpReward} XP)`);
      } else {
        setChallengeSuccessMessage(`Target was ${activeChallenge.targetWpm} WPM & ${activeChallenge.targetAccuracy}% ACC. Try again!`);
      }
    }

    const newResult: TestResult = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: Date.now(),
      ...data,
      mode,
      modeDetail,
    };

    const updatedList = saveTestResult(newResult);
    setResults(updatedList);
    setLatestResult(newResult);
  };

  // Run Gemini AI Analysis for current completed test
  const handleRunAIAnalysis = async () => {
    if (!latestResult) return;
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wpm: latestResult.wpm,
          rawWpm: latestResult.rawWpm,
          accuracy: latestResult.accuracy,
          timeSeconds: latestResult.timeSeconds,
          mistakes: latestResult.incorrectChars,
          keyErrors: latestResult.keyErrors,
          fingerStats: latestResult.fingerStats,
          mode: latestResult.mode,
        }),
      });

      const data = await res.json();
      if (res.ok && data.rating) {
        setAiAnalysis(data);
      }
    } catch (e) {
      console.error('Failed to run AI analysis:', e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const overallAnalytics = getOverallAnalytics();
  const todayProgress = getTodayGoalProgress(
    results,
    settings.dailyGoalType || 'words',
    settings.dailyGoalTarget || 500
  );

  const isZenModeActive = settings.zenMode && activeTab === 'test' && !latestResult;

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans antialiased relative overflow-hidden selection:bg-indigo-600 selection:text-white pb-12">
      {/* Frosted Glass Ambient Soft Blurred Light Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none" />

      {/* Zen Mode Floating Exit Overlay Button */}
      {isZenModeActive ? (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in duration-300">
          <button
            onClick={() => handleUpdateSettings({ ...settings, zenMode: false })}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900/80 hover:bg-slate-900 text-emerald-400 font-bold text-xs shadow-xl border border-slate-700/80 backdrop-blur-md transition-all active:scale-95"
          >
            <Eye className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Zen Mode Active • Click to Exit</span>
          </button>
        </div>
      ) : (
        /* Top Glassy Navigation Header */
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          bestWpm={overallAnalytics.bestWpm}
          streakDays={overallAnalytics.currentStreakDays}
          userName={settings.userName}
          soundProfile={settings.soundProfile}
          todayProgress={todayProgress}
          onOpenGoalSoundModal={() => setIsGoalSoundModalOpen(true)}
        />
      )}

      {/* Main Container */}
      <main className={`relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center ${isZenModeActive ? 'pt-16 sm:pt-24' : 'pt-8'}`}>
        
        {/* VIEW 1: PRACTICE / TYPING TEST */}
        {activeTab === 'test' && (
          <div className="w-full flex flex-col items-center gap-6">
            
            {/* Top Control Toolbar */}
            <TestControls
              mode={mode}
              setMode={setMode}
              timeOption={timeOption}
              setTimeOption={setTimeOption}
              wordsOption={wordsOption}
              setWordsOption={setWordsOption}
              quoteLength={quoteLength}
              setQuoteLength={setQuoteLength}
              showKeyboard={showKeyboard}
              setShowKeyboard={setShowKeyboard}
              zenMode={settings.zenMode}
              onToggleZenMode={() => handleUpdateSettings({ ...settings, zenMode: !settings.zenMode })}
              onRestart={generateNewPassage}
              onOpenCustomModal={() => {}}
              isCustomActive={mode === 'custom' || mode === 'drill'}
            />

            {/* Challenge Banner Notification */}
            {challengeSuccessMessage && (
              <div className="w-full max-w-2xl p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white font-bold text-xs sm:text-sm shadow-xl flex items-center justify-between gap-3 animate-in slide-in-from-top-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>{challengeSuccessMessage}</span>
                </div>
                <button
                  onClick={() => setChallengeSuccessMessage(null)}
                  className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Test Results Screen or Active Typing Area */}
            {latestResult ? (
              <ResultsModal
                result={latestResult}
                personalBestWpm={overallAnalytics.bestWpm}
                onRestart={generateNewPassage}
                onViewAnalytics={() => setActiveTab('analytics')}
                onViewCertificate={() => setIsCertificateOpen(true)}
                onRunAIAnalysis={handleRunAIAnalysis}
                isAiLoading={isAiLoading}
                aiAnalysis={aiAnalysis}
              />
            ) : (
              <>
                <TypingArea
                  targetText={targetText}
                  settings={settings}
                  timeLimit={mode === 'time' ? timeOption : undefined}
                  wordLimit={mode === 'words' ? wordsOption : undefined}
                  onTestComplete={handleTestComplete}
                  onActiveCharChange={handleActiveCharChange}
                  onRestart={generateNewPassage}
                />

                {/* Virtual Keyboard */}
                {showKeyboard && (
                  <VirtualKeyboard
                    activeChar={activeChar}
                    nextChar={nextChar}
                    showFingerGuide={settings.highlightFinger}
                    keyErrors={overallAnalytics.keyErrors}
                  />
                )}
              </>
            )}
          </div>
        )}

        {/* VIEW 2: CHALLENGES */}
        {activeTab === 'challenges' && (
          <ChallengesView
            completedIds={completedChallengeIds}
            testResults={results}
            onStartChallenge={handleStartChallenge}
          />
        )}

        {/* VIEW 3: PRO ANALYTICS */}
        {activeTab === 'analytics' && (
          <ProAnalytics
            results={results}
            onRefreshResults={() => setResults(getTestResults())}
          />
        )}

        {/* VIEW 4: ANIMATED GUIDE & README */}
        {activeTab === 'guide' && (
          <AnimatedGuideView />
        )}
      </main>

      {/* Footer Hotkey Guide */}
      {!isZenModeActive && (
        <footer className="relative z-10 px-8 py-4 bg-white/20 backdrop-blur-md border-t border-white/20 flex flex-wrap justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-7xl mx-auto w-full mt-auto gap-4">
          <div>&copy; VelocisType • Precision Touch Typing Engine</div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('guide')}
              className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Interactive Guide & Manual</span>
            </button>
            <span>•</span>
            <span className="text-indigo-600">TAB</span>
            <span className="text-slate-500">Reset</span>
            <span className="text-indigo-600 ml-2">ESC</span>
            <span className="text-slate-500">Restart</span>
          </div>
        </footer>
      )}

      {/* Typing Certificate Modal */}
      {isCertificateOpen && latestResult && (
        <CertificateModal
          result={latestResult}
          userName={settings.userName}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      {/* Goal & Sound Settings Modal */}
      <GoalSoundModal
        isOpen={isGoalSoundModalOpen}
        onClose={() => setIsGoalSoundModalOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        todayProgress={todayProgress}
      />
    </div>
  );
}

