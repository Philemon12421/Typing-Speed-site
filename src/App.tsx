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
} from './types';
import {
  getUserSettings,
  saveUserSettings,
  getTestResults,
  saveTestResult,
  getOverallAnalytics,
  getTodayGoalProgress,
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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('test');
  const [settings, setSettings] = useState<UserSettings>(getUserSettings());
  const [results, setResults] = useState<TestResult[]>(getTestResults());

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

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans antialiased relative overflow-hidden selection:bg-indigo-600 selection:text-white pb-12">
      {/* Frosted Glass Ambient Soft Blurred Light Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-72 h-72 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none" />

      {/* Top Glassy Navigation Header */}
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

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col items-center">
        
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
              onRestart={generateNewPassage}
              onOpenCustomModal={() => {}}
              isCustomActive={mode === 'custom' || mode === 'drill'}
            />

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
                  onActiveCharChange={(char, next) => {
                    setActiveChar(char);
                    setNextChar(next || '');
                  }}
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

        {/* VIEW 2: PRO ANALYTICS */}
        {activeTab === 'analytics' && (
          <ProAnalytics
            results={results}
            onRefreshResults={() => setResults(getTestResults())}
          />
        )}
      </main>

      {/* Footer Hotkey Guide */}
      <footer className="relative z-10 px-8 py-4 bg-white/20 backdrop-blur-md border-t border-white/20 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-7xl mx-auto w-full mt-auto">
        <div>&copy; VelocisType</div>
        <div className="flex gap-6">
          <span className="text-indigo-600">TAB</span>
          <span className="text-slate-500">Reset Test</span>
          <span className="text-indigo-600 ml-4">ESC</span>
          <span className="text-slate-500">Quick Restart</span>
        </div>
      </footer>

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

