import React, { useEffect, useState, useCallback } from 'react';
import {
  TabType,
  TestMode,
  TimeOption,
  WordsOption,
  QuoteLength,
  TestResult,
  UserSettings,
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
import { UserRegistrationModal } from './components/UserRegistrationModal';
import { ChallengesView } from './components/ChallengesView';
import { AnimatedGuideView } from './components/AnimatedGuideView';
import { TYPING_CHALLENGES } from './data/challenges';
import { Eye, EyeOff, Sparkles, Award, User, Github, Star, GitFork, GitPullRequest } from 'lucide-react';

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
  const [isUserRegistrationModalOpen, setIsUserRegistrationModalOpen] = useState<boolean>(false);

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
    if (challenge.quoteLength) setQuoteLength(challenge.quoteLength);
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

  const overallAnalytics = getOverallAnalytics();
  const todayProgress = getTodayGoalProgress(
    results,
    settings.dailyGoalType || 'words',
    settings.dailyGoalTarget || 500
  );

  const isZenModeActive = settings.zenMode && activeTab === 'test' && !latestResult;

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans antialiased relative overflow-x-hidden selection:bg-indigo-600 selection:text-white pb-24 sm:pb-12 max-w-full">
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
          completedChallengesCount={completedChallengeIds.length}
          totalChallengesCount={TYPING_CHALLENGES.length}
          onOpenGoalSoundModal={() => setIsGoalSoundModalOpen(true)}
          onOpenRegisterModal={() => setIsUserRegistrationModalOpen(true)}
        />
      )}

      {/* Main Container */}
      <main className={`relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 flex flex-col items-center max-w-full overflow-x-hidden ${isZenModeActive ? 'pt-16 sm:pt-24' : 'pt-4 sm:pt-8'}`}>
        
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
                userName={settings.userName}
                onRestart={generateNewPassage}
                onViewAnalytics={() => setActiveTab('analytics')}
                onViewCertificate={() => setIsCertificateOpen(true)}
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
            userName={settings.userName}
            onOpenRegisterModal={() => setIsUserRegistrationModalOpen(true)}
          />
        )}

        {/* VIEW 4: ANIMATED GUIDE & README */}
        {activeTab === 'guide' && (
          <AnimatedGuideView />
        )}
      </main>

      {/* Footer */}
      {!isZenModeActive && (
        <footer className="relative z-10 px-8 py-4 bg-white/20 backdrop-blur-md border-t border-white/20 flex flex-wrap justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-7xl mx-auto w-full mt-auto gap-4">
          <div>&copy; Typerca • Precision Touch Typing Engine</div>
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

      {/* User Registration Handle Modal */}
      <UserRegistrationModal
        isOpen={isUserRegistrationModalOpen}
        onClose={() => setIsUserRegistrationModalOpen(false)}
        currentUsername={settings.userName}
        userBestWpm={overallAnalytics.bestWpm}
        onSaveUsername={(newUsername) =>
          handleUpdateSettings({ ...settings, userName: newUsername })
        }
      />

      {/* Footer */}
      {!settings.zenMode && (
        <footer className="w-full max-w-6xl mx-auto px-4 py-8 mt-12 border-t border-slate-200/80 flex flex-col gap-6 text-xs text-slate-500 font-medium">
          
          {/* GitHub Open Source Banner (Star, Fork, Contribute) */}
          <div className="w-full py-3.5 px-4 sm:px-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                <Github className="w-5 h-5" />
              </div>
              <div className="text-center sm:text-left">
                <div className="font-black text-sm text-white flex items-center justify-center sm:justify-start gap-1.5">
                  <span>Typing-Speed-site</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono">Open Source</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Star, fork or contribute to this project on GitHub
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              <a
                href="https://github.com/Philemon12421/Typing-Speed-site"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-extrabold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                title="Star this repository on GitHub"
              >
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>Star Repo</span>
              </a>

              <a
                href="https://github.com/Philemon12421/Typing-Speed-site/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-extrabold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                title="Fork this repository on GitHub"
              >
                <GitFork className="w-3.5 h-3.5 text-indigo-400" />
                <span>Fork</span>
              </a>

              <a
                href="https://github.com/Philemon12421/Typing-Speed-site"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
                title="Contribute on GitHub"
              >
                <GitPullRequest className="w-3.5 h-3.5" />
                <span>Contribute</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-slate-800">Typerca</span>
              <span>•</span>
              <span>Powered by <strong className="text-slate-700">Drenchack Tech Company</strong></span>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-slate-600 font-semibold">
              {/* User Profile / Handle Button in Footer */}
              <button
                onClick={() => setIsUserRegistrationModalOpen(true)}
                title={settings.userName ? `Logged in as @${settings.userName}` : 'Register username for Weekly Leaderboard'}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50/90 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 text-xs font-bold font-mono shadow-2xs transition-all"
              >
                <User className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>{settings.userName && settings.userName.trim() ? `@${settings.userName}` : 'Register Handle'}</span>
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className="hover:text-indigo-600 transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className="hover:text-indigo-600 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className="hover:text-indigo-600 transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className="hover:text-indigo-600 transition-colors"
              >
                Speed Manual
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

