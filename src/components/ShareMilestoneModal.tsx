import React, { useRef, useState, useEffect } from 'react';
import { MilestoneBadge } from '../types';
import { Share2, Download, Copy, Check, X, Twitter, Trophy, Sparkles, Award } from 'lucide-react';

interface ShareMilestoneModalProps {
  badge: MilestoneBadge & { currentValue: number; isUnlocked: boolean };
  userName: string;
  onClose: () => void;
}

export const ShareMilestoneModal: React.FC<ShareMilestoneModalProps> = ({
  badge,
  userName = 'Pro Typist',
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cleanName = userName && userName.trim() !== 'Pro Typist' ? userName.trim() : 'Pro Typist';
  const formattedDate = new Date().toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const shareText = `🏆 I just unlocked the "${badge.title}" Milestone Badge (${badge.badgeLabel}) on Typerca! ${badge.iconSymbol}\n\n"${badge.description}"\n\nTry it out on Typerca Typing Speed Platform! 🚀`;

  // Draw Canvas Badge for High-Res Image Export
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas size 1200 x 630 (Standard Social Share Card)
    canvas.width = 1200;
    canvas.height = 630;

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
    bgGrad.addColorStop(0, '#0f172a'); // slate-900
    bgGrad.addColorStop(0.5, '#1e1b4b'); // indigo-950
    bgGrad.addColorStop(1, '#020617'); // slate-950
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 630);

    // Subtle Grid Overlay Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1200; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 630);
      ctx.stroke();
    }
    for (let y = 0; y < 630; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1200, y);
      ctx.stroke();
    }

    // Outer Glowing Border Box
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)'; // Amber glow
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 1140, 570);

    // Inner Corner Accent Marks
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 6;
    // Top-Left
    ctx.beginPath(); ctx.moveTo(30, 70); ctx.lineTo(30, 30); ctx.lineTo(70, 30); ctx.stroke();
    // Top-Right
    ctx.beginPath(); ctx.moveTo(1130, 30); ctx.lineTo(1170, 30); ctx.lineTo(1170, 70); ctx.stroke();
    // Bottom-Left
    ctx.beginPath(); ctx.moveTo(30, 560); ctx.lineTo(30, 600); ctx.lineTo(70, 600); ctx.stroke();
    // Bottom-Right
    ctx.beginPath(); ctx.moveTo(1130, 600); ctx.lineTo(1170, 600); ctx.lineTo(1170, 560); ctx.stroke();

    // Top Platform Brand Tag
    ctx.fillStyle = '#f59e0b';
    ctx.font = '800 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TYPERCA OFFICIAL MILESTONE ACHIEVEMENT', 600, 95);

    // Badge Icon Symbol Big Circle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.arc(600, 230, 85, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = '100px sans-serif';
    ctx.fillText(badge.iconSymbol, 600, 265);

    // Badge Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 52px sans-serif';
    ctx.fillText(badge.title, 600, 370);

    // Badge Requirement Label Tag
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(`[ ${badge.badgeLabel} ]`, 600, 420);

    // Description text
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 24px sans-serif';
    ctx.fillText(badge.description, 600, 470);

    // Recipient & Date Footer
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText(`Unlocked by ${cleanName} • ${formattedDate}`, 600, 555);

  }, [badge, cleanName, formattedDate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `typerca-milestone-${badge.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto cursor-pointer"
    >
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200 cursor-default">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex items-center justify-center font-bold shadow-xs active:scale-95 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Milestone Achievement Unlocked</span>
            </div>
            <h2 className="text-xl font-extrabold text-white mt-0.5">Share Milestone</h2>
          </div>
        </div>

        {/* Badge Visual Card Preview */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 via-indigo-950/50 to-slate-900 border border-indigo-500/30 shadow-xl flex flex-col items-center text-center gap-3 relative overflow-hidden">
          <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-400/40 flex items-center justify-center text-4xl shadow-inner">
            {badge.iconSymbol}
          </div>
          
          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">{badge.title}</h3>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-extrabold text-xs inline-block mt-1">
              {badge.badgeLabel}
            </span>
          </div>

          <p className="text-xs font-medium text-slate-300 max-w-sm leading-relaxed">
            {badge.description}
          </p>

          <div className="text-[11px] font-bold text-slate-400 mt-2 pt-3 border-t border-slate-800/80 w-full flex items-center justify-between px-2">
            <span>Achieved by: <strong className="text-indigo-300">{cleanName}</strong></span>
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Hidden Offscreen Canvas for High-Res Image Generation */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Share Action Buttons */}
        <div className="flex flex-col gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
          >
            <Twitter className="w-4 h-4 fill-current" />
            <span>Share on X (Twitter)</span>
          </a>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-indigo-400" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Share Text'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Card PNG</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors mt-1"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
