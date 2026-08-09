import React from 'react';
import { TestResult } from '../types';
import { getWpmGrade } from '../utils/typingUtils';
import { Award, Printer, ShieldCheck, X, Sparkles, Medal, CheckCircle } from 'lucide-react';

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
  const grade = getWpmGrade(result.wpm);
  const formattedDate = new Date(result.timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const certificateId = `VT-${new Date(result.timestamp).getFullYear()}-${(result.id || '99').slice(0, 8).toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-slate-200 font-sans print:shadow-none print:border-none print:p-0 print:m-0 print:w-full print:max-w-none">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 print:hidden transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Outer Gold Frame */}
        <div className="relative border-8 border-amber-500/20 rounded-2xl p-2 sm:p-3 bg-gradient-to-b from-amber-50/40 via-white to-indigo-50/20">
          {/* Inner Double Line Border */}
          <div className="border-2 border-double border-amber-600/60 rounded-xl p-6 sm:p-10 flex flex-col items-center text-center gap-5 relative overflow-hidden bg-white/95">
            
            {/* Watermark Crest */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
              <Award className="w-96 h-96 text-amber-900" />
            </div>

            {/* Header Badge / Crest */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-0.5 shadow-xl shadow-amber-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <Medal className="w-8 h-8 text-amber-400" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 text-amber-700 font-black text-[11px] uppercase tracking-[0.25em]">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>VelocisType Assessment Standard</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
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
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Verification ID: <strong className="font-mono text-indigo-700">{certificateId}</strong></span>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-0.5">
                <span className="font-serif italic text-base font-bold text-slate-900">VelocisType Engine</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Official Certification Board</span>
              </div>
            </div>

          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 mt-6 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print or Save PDF Certificate</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

