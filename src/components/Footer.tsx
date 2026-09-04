import React from 'react';
import {
  Github,
  Star,
  Keyboard,
  BookOpen,
  Shield,
  Mail,
  Sliders,
  Twitter,
  Linkedin,
  Globe
} from 'lucide-react';
import { GuideSubTab } from './AnimatedGuideView';

export interface FooterProps {
  setActiveTab: (tab: 'test' | 'challenges' | 'analytics' | 'guide') => void;
  navigateToGuideSubTab: (subTab: GuideSubTab) => void;
  userName?: string;
  onOpenRegisterModal: () => void;
  onOpenContactModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  navigateToGuideSubTab,
  userName,
  onOpenRegisterModal,
  onOpenContactModal,
}) => {
  const handleOpenCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-banner'));
  };

  return (
    <footer className="w-full bg-white/60 dark:bg-black text-slate-600 dark:text-zinc-400 border-t border-slate-200/60 dark:border-zinc-800 mt-auto text-xs transition-colors shadow-[0_-8px_32px_rgba(15,23,42,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 sm:pt-7 sm:pb-5 flex flex-col gap-6">
        
        {/* GitHub Open Source Strip & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-2 px-4 rounded-xl bg-slate-900/90 dark:bg-black/90 backdrop-blur-md border border-white/10 dark:border-zinc-800 text-white shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Github className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="font-semibold text-xs text-slate-200 tracking-tight">Typerca Platform</span>
            <span className="text-slate-400 text-xs">— Open Source Typing Benchmark</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Philemon12421/Typing-Speed-site"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-100 font-semibold text-xs flex items-center gap-1.5 transition-all"
              aria-label="Star Typerca on GitHub"
            >
              <Star className="w-3 h-3 text-amber-400" />
              <span>Star on GitHub</span>
            </a>
            <a
              href="https://x.com/philemonku86576?t=bJNHraV_7kyKHqPHpWqqbQ&s=09"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
              aria-label="Follow Philemon on Twitter / X"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/philemon-osei-kusi-5970a6343"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
              aria-label="Connect with Philemon on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 4-Column Semantic Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
          
          {/* Column 1: Core Tools */}
          <div className="space-y-3 min-w-0">
            <h4 className="font-extrabold text-slate-900 dark:text-zinc-100 text-sm flex items-center gap-1.5 pb-1.5 border-b border-slate-900/5 dark:border-zinc-800">
              <Keyboard className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>Practice & Tools</span>
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-zinc-400 font-semibold">
              <li>
                <button onClick={() => { setActiveTab('test'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Touch Typing Speed Test
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('challenges'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Typing Challenges & Quests
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('analytics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Pro Analytics & Error Heatmap
                </button>
              </li>
              <li>
                <button onClick={() => navigateToGuideSubTab('manual')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Interactive Feature Manual
                </button>
              </li>
              <li>
                <button onClick={onOpenRegisterModal} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate block max-w-full text-left cursor-pointer">
                  {userName ? `Profile: @${userName}` : 'Claim Username'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Guides & Articles */}
          <div className="space-y-3 min-w-0">
            <h4 className="font-extrabold text-slate-900 dark:text-zinc-100 text-sm flex items-center gap-1.5 pb-1.5 border-b border-slate-900/5 dark:border-zinc-800">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Guides & Science</span>
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-zinc-400 font-semibold">
              <li>
                <button onClick={() => navigateToGuideSubTab('blog')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Break 100 WPM Plateau
                </button>
              </li>
              <li>
                <button onClick={() => navigateToGuideSubTab('blog')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Neuroscience of Muscle Memory
                </button>
              </li>
              <li>
                <button onClick={() => navigateToGuideSubTab('blog')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Ergonomics & RSI Prevention
                </button>
              </li>
              <li>
                <button onClick={() => navigateToGuideSubTab('blog')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Mechanical Switches Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateToGuideSubTab('blog')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Global WPM Benchmarks
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust (AdSense Essentials) */}
          <div className="space-y-3 min-w-0">
            <h4 className="font-extrabold text-slate-900 dark:text-zinc-100 text-sm flex items-center gap-1.5 pb-1.5 border-b border-slate-900/5 dark:border-zinc-800">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Legal & Compliance</span>
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-zinc-400 font-semibold">
              <li>
                <button onClick={() => navigateToGuideSubTab('privacy')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 cursor-pointer">
                  <span>Privacy Policy (GDPR & CCPA)</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateToGuideSubTab('terms')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => navigateToGuideSubTab('cookies')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Cookie & Storage Policy
                </button>
              </li>
              <li>
                <button onClick={handleOpenCookiePreferences} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 text-slate-700 dark:text-zinc-300 cursor-pointer">
                  <Sliders className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                  <span>Cookie Preferences</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateToGuideSubTab('disclaimer')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Website Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => navigateToGuideSubTab('faq')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Support */}
          <div className="space-y-3 min-w-0">
            <h4 className="font-extrabold text-slate-900 dark:text-zinc-100 text-sm flex items-center gap-1.5 pb-1.5 border-b border-slate-900/5 dark:border-zinc-800">
              <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>Company & Support</span>
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-zinc-400 font-semibold">
              <li>
                <button onClick={() => navigateToGuideSubTab('about')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  About Us & Mission
                </button>
              </li>
              <li>
                <span className="text-slate-800 dark:text-zinc-200 font-bold block">Drenchack Tech Company</span>
              </li>
              <li>
                <span className="text-slate-500 dark:text-zinc-400 block text-[11px] font-medium">Founder: Philemon Osei Kusi</span>
              </li>
              <li>
                <button onClick={onOpenContactModal} className="hover:text-indigo-700 dark:hover:text-indigo-300 font-bold transition-colors flex items-center gap-1 text-indigo-600 dark:text-indigo-400 cursor-pointer">
                  <span>Contact Support / Feedback</span>
                </button>
              </li>
              <li>
                <a href="mailto:philemonkusi292@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-mono text-[11px] font-semibold underline break-all">
                  philemonkusi292@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Entity Notice */}
        <div className="border-t border-slate-200/60 dark:border-zinc-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 dark:text-zinc-400 text-[11px]">
          <div className="text-center sm:text-left font-medium">
            &copy; {new Date().getFullYear()} <strong className="text-slate-800 dark:text-zinc-200">Typerca</strong>. Built & Operated by <strong className="text-slate-800 dark:text-zinc-200">Drenchack Tech Company</strong>. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-bold text-slate-600 dark:text-zinc-400">
            <button onClick={() => navigateToGuideSubTab('privacy')} className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">Privacy</button>
            <span>•</span>
            <button onClick={() => navigateToGuideSubTab('terms')} className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">Terms</button>
            <span>•</span>
            <button onClick={() => navigateToGuideSubTab('cookies')} className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">Cookies</button>
            <span>•</span>
            <button onClick={handleOpenCookiePreferences} className="hover:text-indigo-600 dark:hover:text-indigo-400 text-indigo-600 dark:text-indigo-400 cursor-pointer">Cookie Settings</button>
            <span>•</span>
            <button onClick={() => navigateToGuideSubTab('faq')} className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">FAQ</button>
            <span>•</span>
            <button onClick={onOpenContactModal} className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer">Contact</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
