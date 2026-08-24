import React from 'react';
import {
  Github,
  Star,
  GitFork,
  GitPullRequest,
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
                <button onClick={onOpenRegisterModal} className="hover:text-indigo-600 transition-colors">
                  {userName ? `Profile: @${userName}` : 'Claim Username'}
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
                <button onClick={onOpenContactModal} className="hover:text-indigo-700 font-bold transition-colors flex items-center gap-1 text-indigo-600">
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
            <button onClick={onOpenContactModal} className="hover:text-indigo-600">Contact</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
