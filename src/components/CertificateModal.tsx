import React, { useEffect, useRef } from 'react';
import { TestResult } from '../types';
import { getWpmGrade } from '../utils/typingUtils';
import { X, Download, Printer } from 'lucide-react';

interface CertificateModalProps {
  result: TestResult;
  userName: string;
  onClose: () => void;
}

// Draws text along a circular arc on a canvas context — used for the seal ring copy.
// Helper to draw circular arc text with clean letter spacing
function drawArcText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
  radius: number,
  startAngleDeg: number,
  stepDeg: number,
  font: string,
  color: string
) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate((startAngleDeg * Math.PI) / 180);
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < text.length; i++) {
    ctx.save();
    ctx.rotate((i * stepDeg * Math.PI) / 180);
    ctx.fillText(text[i], 0, -radius);
    ctx.restore();
  }
  ctx.restore();
}

// Helper to draw a precision scalloped / star rosette
function drawRosette(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  points: number,
  outerR: number,
  innerR: number
) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i * Math.PI) / points;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  result,
  userName,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const grade = getWpmGrade(result.wpm);
  const formattedDate = new Date(result.timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const certificateId = `TYP-${new Date(result.timestamp).getFullYear()}-${(result.id || '99').slice(0, 8).toUpperCase()}`;

  // Draw a clean, professional (Coursera-style) certificate to canvas for PNG export.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1400;
    const H = 990;
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Faded background watermark word
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate((-8 * Math.PI) / 180);
    ctx.fillStyle = 'rgba(139, 92, 246, 0.03)';
    ctx.font = '900 220px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TYPERCA', 0, 0);
    ctx.restore();

    // Top accent bar
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(0, 0, W, 10);

    // Thin content border
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(48, 48, W - 96, H - 96);

    // Clean brand typography header (top-left)
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0f172a';
    ctx.font = '800 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('Typerca', 90, 102);
    ctx.fillStyle = '#64748b';
    ctx.font = '600 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText('TOUCH TYPING ASSESSMENT', 90, 122);

    // Certificate ID (top-right)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 12px sans-serif';
    ctx.fillText('CERTIFICATE ID', W - 90, 100);
    ctx.fillStyle = '#334155';
    ctx.font = '700 14px monospace';
    ctx.fillText(certificateId, W - 90, 120);

    // Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748b';
    ctx.font = '600 14px sans-serif';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', W / 2, 195);

    ctx.fillStyle = '#0f172a';
    ctx.font = '700 44px Georgia, serif';
    ctx.fillText('Typing Proficiency', W / 2, 245);

    ctx.fillStyle = '#475569';
    ctx.font = '500 16px sans-serif';
    ctx.fillText('This certifies that', W / 2, 290);

    // Recipient name
    ctx.fillStyle = '#0f172a';
    ctx.font = 'italic 700 46px Georgia, serif';
    ctx.fillText(userName || 'Pro Typist', W / 2, 350);

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 220, 368);
    ctx.lineTo(W / 2 + 220, 368);
    ctx.stroke();

    ctx.fillStyle = '#475569';
    ctx.font = '500 15px sans-serif';
    ctx.fillText('has successfully completed a verified touch-typing performance assessment,', W / 2, 405);
    ctx.fillText('achieving the following results:', W / 2, 427);

    // Stat row (minimalist, divider style — no boxes)
    const stats = [
      { label: 'NET SPEED', value: `${result.wpm}`, sub: 'WPM' },
      { label: 'ACCURACY', value: `${result.accuracy}%`, sub: 'Verified' },
      { label: 'CONSISTENCY', value: `${result.consistency}%`, sub: 'Rhythm' },
      { label: 'RANK TIER', value: grade.title, sub: grade.badge },
    ];
    const rowY = 495;
    const colW = 260;
    const startX = W / 2 - (colW * stats.length) / 2;

    stats.forEach((s, i) => {
      const cx = startX + colW * i + colW / 2;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '700 12px sans-serif';
      ctx.fillText(s.label, cx, rowY);

      ctx.fillStyle = '#0f172a';
      ctx.font = '800 34px sans-serif';
      ctx.fillText(s.value, cx, rowY + 46);

      ctx.fillStyle = '#1d4ed8';
      ctx.font = '600 13px sans-serif';
      ctx.fillText(s.sub, cx, rowY + 70);

      if (i < stats.length - 1) {
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX + colW * (i + 1), rowY - 24);
        ctx.lineTo(startX + colW * (i + 1), rowY + 78);
        ctx.stroke();
      }
    });

    // Detail strip
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.roundRect(startX, 618, colW * stats.length, 42, 10);
    ctx.fill();
    ctx.fillStyle = '#64748b';
    ctx.font = '600 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      `Mode: ${result.mode} (${result.modeDetail})   •   Duration: ${result.timeSeconds}s   •   Raw Speed: ${result.rawWpm} WPM`,
      W / 2,
      644
    );

    // Divider before footer
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(90, 730);
    ctx.lineTo(W - 90, 730);
    ctx.stroke();

    // Footer: Date (left)
    ctx.textAlign = 'left';
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(90, 830);
    ctx.lineTo(280, 830);
    ctx.stroke();
    ctx.fillStyle = '#0f172a';
    ctx.font = '700 15px sans-serif';
    ctx.fillText(formattedDate, 90, 815);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 12px sans-serif';
    ctx.fillText('DATE ISSUED', 90, 850);

    // Footer: Signature (right)
    ctx.textAlign = 'right';
    ctx.strokeStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.moveTo(W - 280, 830);
    ctx.lineTo(W - 90, 830);
    ctx.stroke();
    ctx.fillStyle = '#0f172a';
    ctx.font = 'italic 700 20px Georgia, serif';
    ctx.fillText('Typerca Engine Board', W - 90, 815);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 12px sans-serif';
    ctx.fillText('CERTIFICATION AUTHORITY', W - 90, 850);

    // --- HIGH-END AUTHENTIC VERIFICATION SEAL (Center Bottom) ---
    const sealX = W / 2;
    const sealY = 800;
    const sealR = 64;

    // 1. Hanging Ribbon Tails with Gold Stitching & Swallowtail Notches
    ctx.save();
    // Left Ribbon Tail
    const ribbonGradLeft = ctx.createLinearGradient(sealX - 45, sealY + 20, sealX - 10, sealY + 115);
    ribbonGradLeft.addColorStop(0, '#78350f');
    ribbonGradLeft.addColorStop(0.4, '#b45309');
    ribbonGradLeft.addColorStop(1, '#92400e');
    ctx.fillStyle = ribbonGradLeft;
    ctx.beginPath();
    ctx.moveTo(sealX - 16, sealY + 40);
    ctx.lineTo(sealX - 42, sealY + 114);
    ctx.lineTo(sealX - 24, sealY + 95);
    ctx.lineTo(sealX - 6, sealY + 114);
    ctx.lineTo(sealX - 6, sealY + 40);
    ctx.closePath();
    ctx.fill();

    // Left Ribbon Gold Border & Stitching
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Right Ribbon Tail
    const ribbonGradRight = ctx.createLinearGradient(sealX + 10, sealY + 20, sealX + 45, sealY + 115);
    ribbonGradRight.addColorStop(0, '#78350f');
    ribbonGradRight.addColorStop(0.4, '#b45309');
    ribbonGradRight.addColorStop(1, '#92400e');
    ctx.fillStyle = ribbonGradRight;
    ctx.beginPath();
    ctx.moveTo(sealX + 6, sealY + 40);
    ctx.lineTo(sealX + 6, sealY + 114);
    ctx.lineTo(sealX + 24, sealY + 95);
    ctx.lineTo(sealX + 42, sealY + 114);
    ctx.lineTo(sealX + 16, sealY + 40);
    ctx.closePath();
    ctx.fill();

    // Right Ribbon Gold Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // 2. Precision 32-Point Star Rosette (Metallic Golden Edge)
    ctx.save();
    const goldGrad = ctx.createRadialGradient(sealX, sealY, 20, sealX, sealY, sealR + 8);
    goldGrad.addColorStop(0, '#fbbf24');
    goldGrad.addColorStop(0.5, '#d97706');
    goldGrad.addColorStop(0.85, '#b45309');
    goldGrad.addColorStop(1, '#78350f');
    ctx.fillStyle = goldGrad;
    drawRosette(ctx, sealX, sealY, 32, sealR + 6, sealR - 2);
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // 3. Concentric Security Rings & Beaded Border
    ctx.strokeStyle = '#fef3c7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealR - 4, 0, Math.PI * 2);
    ctx.stroke();

    // Medallion Base
    ctx.fillStyle = '#fffdfa';
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealR - 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Security Micro-Beads (36 beads along outer ring)
    ctx.fillStyle = '#b45309';
    const beadCount = 36;
    const beadRadius = sealR - 10;
    for (let b = 0; b < beadCount; b++) {
      const bAngle = (b * Math.PI * 2) / beadCount;
      const bx = sealX + Math.cos(bAngle) * beadRadius;
      const by = sealY + Math.sin(bAngle) * beadRadius;
      ctx.beginPath();
      ctx.arc(bx, by, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Inner Rule Circle
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealR - 16, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Circular Arc Lettering
    drawArcText(
      ctx,
      '★ TYPERCA VERIFIED ASSESSMENT ★',
      sealX,
      sealY,
      sealR - 20,
      -94,
      5.8,
      '800 8.5px sans-serif',
      '#78350f'
    );

    // 5. Center Security Shield / Verification Medallion
    const innerCenterR = 24;
    const shieldGrad = ctx.createLinearGradient(sealX - innerCenterR, sealY - innerCenterR, sealX + innerCenterR, sealY + innerCenterR);
    shieldGrad.addColorStop(0, '#1e293b');
    shieldGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = shieldGrad;
    ctx.beginPath();
    ctx.arc(sealX, sealY + 2, innerCenterR, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 6. Crisp White Verified Checkmark
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(sealX - 11, sealY + 1);
    ctx.lineTo(sealX - 3, sealY + 9);
    ctx.lineTo(sealX + 12, sealY - 7);
    ctx.stroke();

    // Tiny 3-star authenticity markers below checkmark
    ctx.fillStyle = '#fbbf24';
    ctx.font = '700 7px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('★  ★  ★', sealX, sealY + 18);
  }, [result, userName, formattedDate, certificateId, grade]);

  const handlePrint = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      window.print();
      return;
    }

    const dataUrl = canvas.toDataURL('image/png');

    let iframe = document.getElementById('typerca-cert-print-iframe') as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'typerca-cert-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.opacity = '0';
      iframe.style.pointerEvents = 'none';
      document.body.appendChild(iframe);
    }

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Typerca Certificate - ${userName || 'Pro Typist'}</title>
            <style>
              @page {
                size: A4 landscape;
                margin: 0;
              }
              html, body {
                margin: 0;
                padding: 0;
                width: 100vw;
                height: 100vh;
                background: #ffffff !important;
                display: flex;
                align-items: center;
                justify-content: center;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              img {
                width: 100%;
                height: 100%;
                max-width: 100vw;
                max-height: 100vh;
                object-fit: contain;
                display: block;
              }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" id="cert-img" alt="Certificate" />
          </body>
        </html>
      `);
      doc.close();

      const img = doc.getElementById('cert-img') as HTMLImageElement;
      if (img) {
        const triggerPrint = () => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
          } catch {
            window.print();
          }
        };

        if (img.complete) {
          setTimeout(triggerPrint, 150);
        } else {
          img.onload = () => setTimeout(triggerPrint, 150);
        }
      }
    } else {
      window.print();
    }
  };

  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `typerca-certificate-${certificateId}.png`;
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
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto cursor-pointer certificate-print-overlay"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl font-sans cursor-default certificate-print-area overflow-hidden">

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 print:hidden transition-all z-20 flex items-center justify-center shadow-xs active:scale-95 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top accent bar */}
        <div className="h-2 w-full bg-blue-700" />

        <div className="relative p-6 sm:p-10 border border-slate-100 overflow-hidden">

          {/* Faded background watermark */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-0 -z-0 flex items-center justify-center text-[9rem] sm:text-[13rem] font-black font-serif text-violet-500/[0.03] -rotate-6 whitespace-nowrap"
          >
            TYPERCA
          </span>

          {/* Header: clean brand text + certificate ID */}
          <div className="relative z-10 flex items-start justify-between mb-8">
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight leading-none font-sans">Typerca</div>
              <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-1.5 font-sans">Touch Typing Assessment</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">Certificate ID</div>
              <div className="text-sm font-bold text-slate-700 font-mono">{certificateId}</div>
            </div>
          </div>

          {/* Title block */}
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-500 tracking-[0.2em] uppercase">Certificate of Achievement</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif mt-2">Typing Proficiency</h1>
            <p className="text-sm text-slate-500 font-medium mt-4">This certifies that</p>

            <div className="inline-block border-b border-slate-300 px-8 pb-2 mt-2 mb-2">
              <span className="text-3xl sm:text-4xl font-serif italic font-bold text-slate-900">
                {userName || 'Pro Typist'}
              </span>
            </div>

            <p className="text-sm text-slate-600 font-medium max-w-lg mx-auto mt-2 leading-relaxed">
              has successfully completed a verified touch-typing performance assessment, achieving the following results:
            </p>
          </div>

          {/* Stat row — minimalist, divider style */}
          <div className="flex items-stretch justify-center divide-x divide-slate-200 mt-8 max-w-2xl mx-auto">
            {[
              { label: 'Net Speed', value: `${result.wpm}`, sub: 'WPM' },
              { label: 'Accuracy', value: `${result.accuracy}%`, sub: 'Verified' },
              { label: 'Consistency', value: `${result.consistency}%`, sub: 'Rhythm' },
              { label: 'Rank Tier', value: grade.title, sub: grade.badge },
            ].map((s) => (
              <div key={s.label} className="flex-1 flex flex-col items-center px-2 sm:px-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{s.value}</span>
                <span className="text-xs font-semibold text-blue-700 mt-0.5">{s.sub}</span>
              </div>
            ))}
          </div>

          {/* Detail strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500 bg-slate-50 px-4 py-2.5 rounded-lg mt-6 max-w-2xl mx-auto text-center">
            <span>Mode: <strong className="text-slate-700 capitalize">{result.mode}</strong> ({result.modeDetail})</span>
            <span className="text-slate-300">•</span>
            <span>Duration: <strong className="text-slate-700">{result.timeSeconds}s</strong></span>
            <span className="text-slate-300">•</span>
            <span>Raw Speed: <strong className="text-slate-700">{result.rawWpm} WPM</strong></span>
          </div>

          {/* Footer: date / seal / signature */}
          <div className="grid grid-cols-3 items-end mt-10 pt-6 border-t border-slate-200">
            <div>
              <div className="border-b border-slate-300 pb-1.5 mb-1.5 w-32">
                <span className="text-sm font-bold text-slate-800">{formattedDate}</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Date Issued</span>
            </div>

            {/* Authentic High-End Verification Seal */}
            <div className="flex justify-center -mb-2">
              <svg viewBox="0 0 160 180" className="w-24 h-28 drop-shadow-md">
                <defs>
                  <radialGradient id="svgSealGold" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fde68a" />
                    <stop offset="45%" stopColor="#d97706" />
                    <stop offset="85%" stopColor="#b45309" />
                    <stop offset="100%" stopColor="#78350f" />
                  </radialGradient>
                  <linearGradient id="svgRibbonLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#78350f" />
                    <stop offset="50%" stopColor="#b45309" />
                    <stop offset="100%" stopColor="#92400e" />
                  </linearGradient>
                  <linearGradient id="svgRibbonRight" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#78350f" />
                    <stop offset="50%" stopColor="#b45309" />
                    <stop offset="100%" stopColor="#92400e" />
                  </linearGradient>
                  <linearGradient id="svgShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <path id="sealArcTop" d="M 28,80 A 52,52 0 1 1 132,80" fill="none" />
                  <path id="sealArcBottom" d="M 130,82 A 50,50 0 0 1 30,82" fill="none" />
                </defs>

                {/* Left Ribbon Tail */}
                <polygon points="62,110 32,168 52,150 72,168 72,110" fill="url(#svgRibbonLeft)" stroke="#f59e0b" strokeWidth="1.2" />
                {/* Right Ribbon Tail */}
                <polygon points="88,110 88,168 108,150 128,168 98,110" fill="url(#svgRibbonRight)" stroke="#f59e0b" strokeWidth="1.2" />

                {/* 32-Point Scalloped Gold Rosette */}
                <circle cx="80" cy="80" r="58" fill="url(#svgSealGold)" stroke="#78350f" strokeWidth="1.5" />
                
                {/* Outer Relief Ring */}
                <circle cx="80" cy="80" r="52" fill="none" stroke="#fef3c7" strokeWidth="1.5" strokeDasharray="3,2" />
                
                {/* Medallion Base Body */}
                <circle cx="80" cy="80" r="48" fill="#fffdfa" stroke="#d97706" strokeWidth="1.5" />
                
                {/* Inner Rule Ring */}
                <circle cx="80" cy="80" r="38" fill="none" stroke="#e2e8f0" strokeWidth="1" />

                {/* Circular Security Text */}
                <text fontSize="7.5" fontWeight="800" fill="#78350f" letterSpacing="1.2">
                  <textPath href="#sealArcTop" startOffset="50%" textAnchor="middle">
                    ★ TYPERCA VERIFIED ★
                  </textPath>
                </text>
                <text fontSize="6.5" fontWeight="700" fill="#92400e" letterSpacing="1">
                  <textPath href="#sealArcBottom" startOffset="50%" textAnchor="middle">
                    • OFFICIAL BENCHMARK •
                  </textPath>
                </text>

                {/* Center Navy Medallion */}
                <circle cx="80" cy="80" r="23" fill="url(#svgShieldGrad)" stroke="#d97706" strokeWidth="1.8" />

                {/* Crisp White Verified Checkmark */}
                <path d="M 69,79 L 77,87 L 92,72" fill="none" stroke="#ffffff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />

                {/* Stars below Checkmark */}
                <text x="80" y="96" fontSize="6.5" fontWeight="700" fill="#fbbf24" textAnchor="middle">
                  ★★★
                </text>
              </svg>
            </div>

            <div className="text-right">
              <div className="border-b border-slate-300 pb-1.5 mb-1.5">
                <span className="text-lg font-serif italic font-bold text-slate-900">Typerca Engine Board</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Certification Authority</span>
            </div>
          </div>

        </div>

        {/* Hidden Canvas for Crisp High-Res Image Export */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-6 print:hidden bg-slate-50 dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800">
          <button
            onClick={handleDownloadPNG}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Certificate PNG</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print or Save PDF</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
