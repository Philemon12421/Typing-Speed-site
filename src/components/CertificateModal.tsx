import React, { useEffect, useRef } from 'react';
import { TestResult } from '../types';
import { getWpmGrade } from '../utils/typingUtils';
import { X, Download, Printer } from 'lucide-react';

interface CertificateModalProps {
  result: TestResult;
  userName: string;
  onClose: () => void;
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

  // Draw Clean High-Res (1400 x 950) Canvas for Pure PNG Download
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1400;
    canvas.height = 950;

    // Pure White Clean Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1400, 950);

    // Outer Gold Frame
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 12;
    ctx.strokeRect(40, 40, 1320, 870);

    // Inner Double Line Frame
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 60, 1280, 830);
    ctx.strokeRect(66, 66, 1268, 818);

    // Corner Accent Dots
    ctx.fillStyle = '#b45309';
    const drawDot = (x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    };
    drawDot(63, 63);
    drawDot(1337, 63);
    drawDot(63, 887);
    drawDot(1337, 887);

    // Header Standard
    ctx.fillStyle = '#b45309';
    ctx.font = '800 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('◆ TYPERCA ASSESSMENT STANDARD ◆', 700, 130);

    // Title
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 46px Georgia, serif';
    ctx.fillText('Certificate of Typing Proficiency', 700, 190);

    // Subtitle
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('THIS OFFICIAL CREDENTIAL CERTIFIES THAT', 700, 235);

    // Recipient Name
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold italic 52px Georgia, serif';
    ctx.fillText(userName || 'Pro Typist', 700, 315);

    // Underline
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(420, 335);
    ctx.lineTo(980, 335);
    ctx.stroke();

    // Performance statement
    ctx.fillStyle = '#475569';
    ctx.font = '500 19px sans-serif';
    ctx.fillText('has completed a standardized touch-typing velocity and rhythm consistency evaluation', 700, 385);
    ctx.fillText('with the following certified performance results:', 700, 412);

    // Metric Cards (4 Cards)
    const drawCard = (x: number, title: string, value: string, sub: string, bg: string, border: string, textCol: string) => {
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.roundRect(x, 455, 260, 145, 16);
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = textCol;
      ctx.font = '800 15px sans-serif';
      ctx.fillText(title.toUpperCase(), x + 130, 490);

      ctx.fillStyle = '#0f172a';
      ctx.font = '900 40px sans-serif';
      ctx.fillText(value, x + 130, 545);

      ctx.fillStyle = textCol;
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(sub, x + 130, 580);
    };

    drawCard(110, 'Net Speed', `${result.wpm}`, 'WPM Velocity', '#f0f3ff', '#c7d2fe', '#4338ca');
    drawCard(400, 'Accuracy', `${result.accuracy}%`, 'Verified Clean', '#ecfdf5', '#a7f3d0', '#047857');
    drawCard(690, 'Consistency', `${result.consistency}%`, 'Rhythm Score', '#fffbeb', '#fde68a', '#b45309');
    drawCard(980, 'Rank Tier', grade.title, grade.badge, '#f8fafc', '#e2e8f0', '#334155');

    // Details Strip
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.roundRect(250, 635, 900, 48, 12);
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`Mode: ${result.mode} (${result.modeDetail})  •  Duration: ${result.timeSeconds}s  •  Raw Speed: ${result.rawWpm} WPM`, 700, 665);

    // Line
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 720);
    ctx.lineTo(1300, 720);
    ctx.stroke();

    // Footer Info
    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('Date Issued:', 100, 760);
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 17px sans-serif';
    ctx.fillText(formattedDate, 100, 788);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#e0e7ff';
    ctx.beginPath();
    ctx.roundRect(500, 745, 400, 48, 12);
    ctx.fill();
    ctx.strokeStyle = '#c7d2fe';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#3730a3';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`Verification ID: ${certificateId}`, 700, 775);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold italic 22px Georgia, serif';
    ctx.fillText('Typerca Engine Board', 1300, 765);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText('OFFICIAL CERTIFICATION BOARD', 1300, 788);

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
      <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-slate-200 font-sans cursor-default certificate-print-area">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 print:hidden transition-all z-20 flex items-center justify-center font-bold text-sm shadow-xs active:scale-95 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Outer Gold Frame */}
        <div className="relative border-8 border-amber-500/20 rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-amber-50/40 via-white to-indigo-50/20 print:border-amber-500/40">
          {/* Inner Double Line Border */}
          <div className="border-2 border-double border-amber-600/60 rounded-xl p-6 sm:p-10 flex flex-col items-center text-center gap-5 relative overflow-hidden bg-white">
            
            {/* Watermark Crest SVG */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none text-amber-900">
              <svg className="w-80 h-80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>

            {/* Header Badge / Crest */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-0.5 shadow-xl shadow-amber-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-amber-400">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 text-amber-700 font-black text-[11px] uppercase tracking-[0.25em]">
                <span className="text-amber-500">◆</span>
                <span>Typerca Assessment Standard</span>
                <span className="text-amber-500">◆</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1 font-serif tracking-tight">
                Certificate of Typing Proficiency
              </h1>
              <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase mt-2">
                This official credential certifies that
              </p>
            </div>

            {/* Recipient Name */}
            <div className="border-b-2 border-slate-900/80 px-10 py-1.5 min-w-[240px] my-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 font-serif italic tracking-wide">
                {userName || 'Pro Typist'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed font-medium">
              has completed a standardized, verified touch-typing velocity and rhythm consistency evaluation with the following certified performance results:
            </p>

            {/* Verified Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl my-2">
              <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 flex flex-col items-center">
                <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-wider">Net Speed</span>
                <span className="text-2xl sm:text-3xl font-black text-indigo-950 mt-0.5">{result.wpm}</span>
                <span className="text-[10px] font-bold text-indigo-600">WPM</span>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col items-center">
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider">Accuracy</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-950 mt-0.5">{result.accuracy}%</span>
                <span className="text-[10px] font-bold text-emerald-600">Verified</span>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col items-center">
                <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider">Consistency</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-950 mt-0.5">{result.consistency}%</span>
                <span className="text-[10px] font-bold text-amber-600">Rhythm Score</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center">
                <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">Rank Tier</span>
                <span className="text-xs font-black text-slate-900 mt-1.5 px-2 py-0.5 rounded-lg bg-white border border-slate-300">
                  {grade.title}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 mt-0.5">{grade.badge}</span>
              </div>
            </div>

            {/* Test Details Strip */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/80">
              <span>Mode: <strong className="text-slate-800 capitalize">{result.mode}</strong> ({result.modeDetail})</span>
              <span>•</span>
              <span>Duration: <strong className="text-slate-800">{result.timeSeconds}s</strong></span>
              <span>•</span>
              <span>Raw Speed: <strong className="text-slate-800">{result.rawWpm} WPM</strong></span>
            </div>

            {/* Footer Signature & Serial Seal */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between border-t border-slate-200/80 pt-6 gap-4 text-xs text-slate-500 font-medium mt-2">
              <div className="flex flex-col items-center sm:items-start gap-0.5">
                <span className="font-bold text-slate-800">Date Issued:</span>
                <span className="font-semibold text-slate-600">{formattedDate}</span>
              </div>

              <div className="flex items-center gap-2 text-indigo-900 font-bold bg-indigo-50 px-3.5 py-1.5 rounded-xl border border-indigo-200 text-xs shadow-sm">
                <svg className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>Verification ID: <strong className="font-mono text-indigo-700">{certificateId}</strong></span>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-0.5">
                <span className="font-serif italic text-base font-bold text-slate-900">Typerca Engine</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Official Certification Board</span>
              </div>
            </div>

          </div>
        </div>

        {/* Hidden Canvas for Crisp High-Res Image Export */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 print:hidden">
          <button
            onClick={handleDownloadPNG}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Clean Certificate PNG</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print or Save PDF</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

