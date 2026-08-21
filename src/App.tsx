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
import { AnimatedGuideView, GuideSubTab } from './components/AnimatedGuideView';
import { getSEOMetadata, updateDOMMetaTags } from './utils/seo';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { ContactModal } from './components/ContactModal';
import { TYPING_CHALLENGES } from './data/challenges';
import { Eye, EyeOff, Sparkles, Award, User, Github, Star, GitFork, GitPullRequest, Mail, Shield, Scale, AlertTriangle, Cookie, BookOpen, Keyboard } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('test');
  const [guideSubTab, setGuideSubTab] = useState<GuideSubTab>('blog');
  const [settings, setSettings] = useState<UserSettings>(getUserSettings());
  const [results, setResults] = useState<TestResult[]>(getTestResults());

  // Challenges State
  const [completedChallengeIds, setCompletedChallengeIds] = useState<string[]>(getCompletedChallengeIds());
  const [activeChallenge, setActiveChallenge] = useState<TypingChallenge | null>(null);
  const [challengeSuccessMessage, setChallengeSuccessMessage] = useState<string | null>(null);

  // Goal & Sound Modal State
  const [isGoalSoundModalOpen, setIsGoalSoundModalOpen] = useState<boolean>(false);
  const [isUserRegistrationModalOpen, setIsUserRegistrationModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  // Navigation helpers for legal & educational sections
  const navigateToGuideSubTab = (subTab: GuideSubTab) => {
    setGuideSubTab(subTab);
    setActiveTab('guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // URL Hash Listener for direct deep-linking & SEO updates
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash === 'privacy' || hash === 'terms' || hash === 'about' || hash === 'faq' || hash === 'disclaimer' || hash === 'cookies' || hash === 'contact' || hash === 'manual' || hash === 'blog' || hash === 'guide') {
        setActiveTab('guide');
        if (hash === 'privacy' || hash === 'terms' || hash === 'about' || hash === 'faq' || hash === 'disclaimer' || hash === 'cookies' || hash === 'contact' || hash === 'manual' || hash === 'blog') {
          setGuideSubTab(hash as GuideSubTab);
        }
      } else if (hash === 'challenges') {
        setActiveTab('challenges');
      } else if (hash === 'analytics') {
        setActiveTab('analytics');
      } else if (hash === 'test' || hash === 'practice') {
        setActiveTab('test');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Dynamic Meta Tags & JSON-LD Structured Data Synchronization
  useEffect(() => {
    const seoConfig = getSEOMetadata(activeTab, guideSubTab);
    updateDOMMetaTags(seoConfig);
  }, [activeTab, guideSubTab]);

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
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans antialiased relative overflow-x-hidden selection:bg-indigo-600 selection:text-white w-full">
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

      {/* Main Content Area (flex-1 ensures footer stays pinned to bottom) */}
      <main className={`relative z-10 flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col items-center overflow-x-hidden ${isZenModeActive ? 'pt-10 sm:pt-14' : 'pt-1 sm:pt-2'} pb-4 sm:pb-6`}>
        
        {/* VIEW 1: PRACTICE / TYPING TEST */}
        {activeTab === 'test' && (
          <div className="w-full flex flex-col items-center gap-4 sm:gap-5">
            
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

        {/* VIEW 4: ANIMATED GUIDE & KNOWLEDGE BASE */}
        {activeTab === 'guide' && (
          <AnimatedGuideView
            initialSubTab={guideSubTab}
            onSubTabChange={(sub) => setGuideSubTab(sub)}
          />
        )}
      </main>

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

      {/* Contact Us Interactive Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* GDPR & CCPA Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenPrivacyPolicy={() => navigateToGuideSubTab('privacy')}
      />

      {/* Comprehensive AdSense Compliant White Footer */}
      {!settings.zenMode && (
        <footer className="w-full bg-white text-slate-600 border-t border-slate-200 mt-auto text-xs transition-all shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 sm:pt-7 sm:pb-5 flex flex-col gap-6">
            
            {/* GitHub Open Source Banner */}
            <div className="w-full py-3 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-2 flex-wrap text-center sm:text-left">
                  <span className="font-extrabold text-white text-sm">Typing-Speed-site</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold">Open Source</span>
                  <span className="hidden md:inline text-slate-300 text-xs">• Star, fork or contribute on GitHub</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://github.com/Philemon12421/Typing-Speed-site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-300 font-extrabold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>Star Repo</span>
                </a>

                <a
                  href="https://github.com/Philemon12421/Typing-Speed-site/fork"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                >
                  <GitFork className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Fork</span>
                </a>

                <a
                  href="https://github.com/Philemon12421/Typing-Speed-site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all active:scale-95"
                >
                  <GitPullRequest className="w-3.5 h-3.5" />
                  <span>Contribute</span>
                </a>
              </div>
            </div>

            {/* 4-Column Semantic Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
              
              {/* Column 1: Core Tools */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                  <Keyboard className="w-4 h-4 text-indigo-600" />
                  <span>Practice & Tools</span>
                </h4>
                <ul className="space-y-2 text-slate-600 font-medium">
                  <li>
                    <button onClick={() => { setActiveTab('test'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors">
                      Touch Typing Speed Test
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setActiveTab('challenges'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors">
                      Typing Challenges & Quests
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { setActiveTab('analytics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 transition-colors">
                      Pro Analytics & Error Heatmap
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateToGuideSubTab('manual')} className="hover:text-indigo-600 transition-colors">
                      Interactive Feature Manual
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setIsUserRegistrationModalOpen(true)} className="hover:text-indigo-600 transition-colors">
                      {settings.userName ? `Profile: @${settings.userName}` : 'Claim Username'}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 2: Guides & Articles */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Guides & Science</span>
                </h4>
                <ul className="space-y-2 text-slate-600 font-medium">
                  <li>
                    <button onClick={() => navigateToGuideSubTab('blog')} className="hover:text-indigo-600 transition-colors">
                      Break the 100 WPM Plateau
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateToGuideSubTab('blog')} className="hover:text-indigo-600 transition-colors">
                      Neuroscience of Muscle Memory
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateToGuideSubTab('blog')} className="hover:text-indigo-600 transition-colors">
                      Ergonomics & RSI Prevention
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateToGuideSubTab('blog')} className="hover:text-indigo-600 transition-colors">
                      Mechanical Switches Comparison
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateToGuideSubTab('blog')} className="hover:text-indigo-600 transition-colors">
                      Global WPM Benchmarks
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 3: Legal & Trust (AdSense Essentials) */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Legal & Compliance</span>
                </h4>
                <ul className="space-y-2 text-slate-600 font-medium">
                  <li>
                    <button onClick={() => navigateToGuideSubTab('privacy')} className="hover:text-indigo-600 font-semibold transition-colors flex items-center gap-1">
                      <span>Privacy Policy (GDPR & CCPA)</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateToGuideSubTab('terms')} className="hover:text-indigo-600 transition-colors">
                      Terms of Service
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateToGuideSubTab('cookies')} className="hover:text-indigo-600 transition-colors">
                      Cookie & Storage Policy
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateToGuideSubTab('disclaimer')} className="hover:text-indigo-600 transition-colors">
                      Website Disclaimer
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateToGuideSubTab('faq')} className="hover:text-indigo-600 transition-colors">
                      Frequently Asked Questions (FAQ)
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 4: Company & Support */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-sky-600" />
                  <span>Company & Support</span>
                </h4>
                <ul className="space-y-2 text-slate-600 font-medium">
                  <li>
                    <button onClick={() => navigateToGuideSubTab('about')} className="hover:text-indigo-600 transition-colors">
                      About Us & Mission
                    </button>
                  </li>
                  <li>
                    <span className="text-slate-800 font-bold block">Drenchack Tech Company</span>
                  </li>
                  <li>
                    <span className="text-slate-500 block text-[11px]">Developer: Philemon Osei Kusi</span>
                  </li>
                  <li>
                    <button onClick={() => setIsContactModalOpen(true)} className="hover:text-indigo-700 font-bold transition-colors flex items-center gap-1 text-indigo-600">
                      <span>Contact Us / Feedback</span>
                    </button>
                  </li>
                  <li>
                    <a href="mailto:philemonkusi292@gmail.com" className="text-indigo-600 hover:text-indigo-800 font-mono text-[11px] font-semibold underline">
                      philemonkusi292@gmail.com
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Bar with Copyright & Entity Notice */}
            <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
              <div>
                &copy; {new Date().getFullYear()} <strong className="text-slate-800">Typerca</strong>. Built & Operated by <strong className="text-slate-800">Drenchack Tech Company</strong>. All rights reserved.
              </div>
              <div className="flex items-center gap-4 font-semibold text-slate-600">
                <button onClick={() => navigateToGuideSubTab('privacy')} className="hover:text-indigo-600">Privacy</button>
                <span>•</span>
                <button onClick={() => navigateToGuideSubTab('terms')} className="hover:text-indigo-600">Terms</button>
                <span>•</span>
                <button onClick={() => navigateToGuideSubTab('cookies')} className="hover:text-indigo-600">Cookies</button>
                <span>•</span>
                <button onClick={() => navigateToGuideSubTab('faq')} className="hover:text-indigo-600">FAQ</button>
                <span>•</span>
                <button onClick={() => setIsContactModalOpen(true)} className="hover:text-indigo-600">Contact</button>
              </div>
            </div>

          </div>
        </footer>
      )}
    </div>
  );
}

