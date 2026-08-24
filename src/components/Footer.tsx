import React from 'react';
import { Github, Keyboard, BookOpen, Shield, Mail } from 'lucide-react';

export interface FooterProps {
  setActiveTab: (tab: 'test' | 'challenges' | 'analytics' | 'guide') => void;
  navigateToGuideSubTab: (subTab: string) => void;
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
  const goTo = (tab: 'test' | 'challenges' | 'analytics') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8">

          {/* Practice */}
          <div className="space-y-3 min-w-0">
            <h4 className="flex items-center gap-1.5 text-[13px] font-extrabold text-slate-900 uppercase tracking-wide">
              <Keyboard className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Practice</span>
            </h4>
            <ul className="space-y-2 text-sm font-bold text-slate-600">
              <li><button onClick={() => goTo('test')} className="hover:text-indigo-600 transition-colors">Speed Test</button></li>
              <li><button onClick={() => goTo('challenges')} className="hover:text-indigo-600 transition-colors">Challenges</button></li>
              <li><button onClick={() => goTo('analytics')} className="hover:text-indigo-600 transition-colors">Analytics</button></li>
              <li><button onClick={() => navigateToGuideSubTab('manual')} className="hover:text-indigo-600 transition-colors">Guide</button></li>
            </ul>
          </div>

          {/* Learn */}
          <div className="space-y-3 min-w-0">
            <h4 className="flex items-center gap-1.5 text-[13px] font-extrabold text-slate-900 uppercase tracking-wide">
              <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Learn</span>
            </h4>
            <ul className="space-y-2 text-sm font-bold text-slate-600">
              <li><button onClick={() => navigateToGuideSubTab('blog')} className="hover:text-indigo-600 transition-colors">Typing Tips</button></li>
              <li><button onClick={() => navigateToGuideSubTab('blog')} className="hover:text-indigo-600 transition-colors">WPM Benchmarks</button></li>
              <li>
                <button
                  onClick={onOpenRegisterModal}
                  className="hover:text-indigo-600 transition-colors truncate block max-w-full"
                >
                  {userName ? `@${userName}` : 'Claim Username'}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3 min-w-0">
            <h4 className="flex items-center gap-1.5 text-[13px] font-extrabold text-slate-900 uppercase tracking-wide">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Legal</span>
            </h4>
            <ul className="space-y-2 text-sm font-bold text-slate-600">
              <li><button onClick={() => navigateToGuideSubTab('privacy')} className="hover:text-indigo-600 transition-colors">Privacy</button></li>
              <li><button onClick={() => navigateToGuideSubTab('terms')} className="hover:text-indigo-600 transition-colors">Terms</button></li>
              <li><button onClick={() => navigateToGuideSubTab('cookies')} className="hover:text-indigo-600 transition-colors">Cookies</button></li>
              <li><button onClick={() => navigateToGuideSubTab('faq')} className="hover:text-indigo-600 transition-colors">FAQ</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 min-w-0">
            <h4 className="flex items-center gap-1.5 text-[13px] font-extrabold text-slate-900 uppercase tracking-wide">
              <Mail className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Contact</span>
            </h4>
            <ul className="space-y-2 text-sm font-bold text-slate-600">
              <li><button onClick={onOpenContactModal} className="hover:text-indigo-600 transition-colors">Feedback</button></li>
              <li>
                <a
                  href="https://github.com/Philemon12421/Typing-Speed-site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 shrink-0" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-bold text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Typerca — Drenchack Tech Company
          </p>
          <a
            href="mailto:philemonkusi292@gmail.com"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            philemonkusi292@gmail.com
          </a>
        </div>

      </div>
    </footer>
  );
};
