import React from 'react';
import {
  Github,
  Star,
  Keyboard,
  BookOpen,
  Shield,
  Mail
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
  return (
    <footer className="w-full bg-white/60 backdrop-blur-xl text-slate-600 border-t border-white/60 mt-auto text-xs transition-all shadow-[0_-8px_32px_rgba(15,23,42,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 sm:pt-7 sm:pb-5 flex flex-col gap-6">
        
        {/* GitHub Open Source Strip */}
        <div className="mx-auto w-full sm:w-auto max-w-md sm:max-w-none py-2 px-3.5 rounded-lg bg-slate-900/70 backdrop-blur-md border border-white/10 text-white flex items-center justify-center sm:justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <Github className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-xs text-slate-200 tracking-tight truncate">Typing-Speed-site</span>
            <span className="hidden sm:inline text-slate-500 text-xs">is open source</span>
          </div>

          <a
            href="https://github.com/Philemon12421/Typing-Speed-site"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-100 font-semibold text-xs flex items-center gap-1.5 transition-all hover:-translate-y-0.5"
          >
            <Star className="w-3 h-3" />
            <span>Star on GitHub</span>
          </a>
        </div>

        {/* 4-Column Semantic Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6">
          
          {/* Column 1: Core Tools */}
          <div className="space-y-3 min-w-0">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 pb-1.5 border-b border-slate-900/5">
              <Keyboard className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Practice & Tools</span>
            </h4>
            <ul className="space-y-2 text-slate-600 font-semibold">
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
                <button onClick={onOpenRegisterModal} className="hover:text-indigo-600 transition-colors truncate block max-w-full text-left">
                  {userName ? `Profile: @${userName}` : 'Claim Username'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Guides & Articles */}
          <div className="space-y-3 min-w-0">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 pb-1.5 border-b border-slate-900/5">
              <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Guides & Science</span>
            </h4>
            <ul className="space-y-2 text-slate-600 font-semibold">
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
          <div className="space-y-3 min-w-0">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 pb-1.5 border-b border-slate-900/5">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Legal & Compliance</span>
            </h4>
            <ul className="space-y-2 text-slate-600 font-semibold">
              <li>
                <button onClick={() => navigateToGuideSubTab('privacy')} className="hover:text-indigo-600 transition-colors flex items-center gap-1">
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
          <div className="space-y-3 min-w-0">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 pb-1.5 border-b border-slate-900/5">
              <Mail className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Company & Support</span>
            </h4>
            <ul className="space-y-2 text-slate-600 font-semibold">
              <li>
                <button onClick={() => navigateToGuideSubTab('about')} className="hover:text-indigo-600 transition-colors">
                  About Us & Mission
                </button>
              </li>
              <li>
                <span className="text-slate-800 font-bold block">Drenchack Tech Company</span>
              </li>
              <li>
                <span className="text-slate-500 block text-[11px] font-medium">Developer: Philemon Osei Kusi</span>
              </li>
              <li>
                <button onClick={onOpenContactModal} className="hover:text-indigo-700 font-bold transition-colors flex items-center gap-1 text-indigo-600">
                  <span>Contact Us / Feedback</span>
                </button>
              </li>
              <li>
                <a href="mailto:philemonkusi292@gmail.com" className="text-indigo-600 hover:text-indigo-800 font-mono text-[11px] font-semibold underline break-all">
                  philemonkusi292@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Entity Notice */}
        <div className="border-t border-white/60 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div className="text-center sm:text-left font-medium">
            &copy; {new Date().getFullYear()} <strong className="text-slate-800">Typerca</strong>. Built & Operated by <strong className="text-slate-800">Drenchack Tech Company</strong>. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-bold text-slate-600">
            <button onClick={() => navigateToGuideSubTab('privacy')} className="hover:text-indigo-600">Privacy</button>
            <span>•</span>
            <button onClick={() => navigateToGuideSubTab('terms')} className="hover:text-indigo-600">Terms</button>
            <span>•</span>
            <button onClick={() => navigateToGuideSubTab('cookies')} className="hover:text-indigo-600">Cookies</button>
            <span>•</span>
            <button onClick={() => navigateToGuideSubTab('faq')} className="hover:text-indigo-600">FAQ</button>
            <span>•</span>
            <button onClick={onOpenContactModal} className="hover:text-indigo-600">Contact</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
