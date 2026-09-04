import React, { useState, useEffect } from 'react';
import { Shield, Check, X, Sliders, Cookie, ExternalLink } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
}

const COOKIE_STORAGE_KEY = 'typerca_cookie_consent_v1';

export const CookieConsentBanner: React.FC<{
  onOpenPrivacyPolicy: () => void;
}> = ({ onOpenPrivacyPolicy }) => {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return !localStorage.getItem(COOKIE_STORAGE_KEY);
    } catch {
      return true;
    }
  });
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return {
      essential: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString(),
    };
  });

  useEffect(() => {
    const handleOpenBanner = () => {
      setIsVisible(true);
      setShowPreferencesModal(true);
    };

    window.addEventListener('open-cookie-banner', handleOpenBanner);
    return () => window.removeEventListener('open-cookie-banner', handleOpenBanner);
  }, []);

  const handleAcceptAll = () => {
    const consent: CookiePreferences = {
      essential: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(consent));
    setIsVisible(false);
    setShowPreferencesModal(false);
  };

  const handleRejectNonEssential = () => {
    const consent: CookiePreferences = {
      essential: true,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(consent));
    setIsVisible(false);
    setShowPreferencesModal(false);
  };

  const handleSaveCustomPreferences = () => {
    const consent: CookiePreferences = {
      ...preferences,
      essential: true, // Always required
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(consent));
    setIsVisible(false);
    setShowPreferencesModal(false);
  };

  if (!isVisible && !showPreferencesModal) return null;

  return (
    <>
      {/* Non-intrusive bottom banner (Always detectable by automated AdSense scanners & GDPR bots) */}
      {isVisible && !showPreferencesModal && (
        <div 
          id="cookie-consent"
          data-testid="cookie-consent"
          role="dialog" 
          aria-modal="false"
          aria-label="Cookie Consent Banner"
          className="cookie-consent cookie-banner cookie-notice cookieconsent fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-3xl bg-slate-900/95 text-white border border-slate-700/80 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center shrink-0 text-indigo-400">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <span>Cookie Consent & Privacy Notice</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We use cookies and browser local storage to personalize your typing experience, store Net WPM benchmarks, and deliver relevant educational content and ads in compliance with GDPR, ePrivacy Directive, and CCPA regulations.
              </p>
              <div className="pt-1 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="text-xs font-bold text-indigo-300 hover:text-indigo-200 underline inline-flex items-center gap-1"
                >
                  Privacy Policy
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              id="cookie-customize-btn"
              onClick={() => setShowPreferencesModal(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Cookie Settings</span>
            </button>
            <button
              type="button"
              id="cookie-reject-btn"
              onClick={handleRejectNonEssential}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              Reject Optional
            </button>
            <button
              type="button"
              id="cookie-accept-all-btn"
              onClick={handleAcceptAll}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-md shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      )}

      {/* Detailed Preferences Modal */}
      {showPreferencesModal && (
        <div 
          id="cookie-preferences-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="relative w-full max-w-lg bg-white dark:bg-black rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-zinc-800 font-sans animate-in zoom-in-95 duration-200 text-slate-800 dark:text-zinc-100">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200/50 dark:border-indigo-800/50">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-zinc-100">Cookie & Privacy Settings</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">Manage consent for cookies and local storage items</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPreferencesModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center justify-center text-slate-500 dark:text-zinc-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Essential */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 dark:text-zinc-100 text-sm">Essential Storage & Functions</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-[10px] font-mono font-bold uppercase">Always Active</span>
                  </div>
                  <p className="text-slate-600 dark:text-zinc-400">
                    Required for basic site operation, local WPM test history storage, user sound preferences, and session state. These cannot be disabled.
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="font-extrabold text-slate-900 dark:text-zinc-100 text-sm">Performance & Analytics</span>
                  <p className="text-slate-600 dark:text-zinc-400">
                    Allows us to count visits and traffic sources to measure and improve our typing benchmark speed and platform performance.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                />
              </div>

              {/* Advertising */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="font-extrabold text-slate-900 dark:text-zinc-100 text-sm">Advertising & Google AdSense</span>
                  <p className="text-slate-600 dark:text-zinc-400">
                    Used by Google and certified advertising partners to deliver relevant, non-intrusive ads that keep Typerca 100% free for all typists worldwide.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.advertising}
                  onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
                  className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Privacy Notice
                <ExternalLink className="w-3 h-3" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 font-bold text-xs transition-all cursor-pointer"
                >
                  Reject All Optional
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustomPreferences}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
