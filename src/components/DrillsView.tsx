import React from 'react';
import { DrillPreset } from '../types';
import { DRILL_PRESETS } from '../data/sampleTexts';
import { generateWeakKeyText } from '../utils/typingUtils';
import { Target, Play, AlignLeft, ArrowUp, ArrowDown, Binary, Code, Sparkles } from 'lucide-react';

interface DrillsViewProps {
  onSelectDrill: (drillText: string, drillTitle: string) => void;
  weakKeys: string[];
}

export const DrillsView: React.FC<DrillsViewProps> = ({ onSelectDrill, weakKeys }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'AlignLeft':
        return <AlignLeft className="w-5 h-5 text-blue-600" />;
      case 'ArrowUp':
        return <ArrowUp className="w-5 h-5 text-emerald-600" />;
      case 'ArrowDown':
        return <ArrowDown className="w-5 h-5 text-indigo-600" />;
      case 'Binary':
        return <Binary className="w-5 h-5 text-amber-600" />;
      case 'Code':
        return <Code className="w-5 h-5 text-purple-600" />;
      default:
        return <Target className="w-5 h-5 text-blue-600" />;
    }
  };

  const handleWeakKeyDrill = () => {
    const customText = generateWeakKeyText(weakKeys);
    onSelectDrill(customText, 'Weak Key Mastery Drill');
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-6 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-slate-200 shadow-2xl shadow-slate-200/50">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-black text-slate-900">Mavis Beacon Finger Drills</h1>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Structured touch-typing lessons targeting specific rows, fingers, and key combinations
          </p>
        </div>

        {weakKeys.length > 0 && (
          <button
            onClick={handleWeakKeyDrill}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>Generate Custom Weak Keys Drill ({weakKeys.join(', ')})</span>
          </button>
        )}
      </div>

      {/* Grid of Lesson Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DRILL_PRESETS.map((drill) => (
          <div
            key={drill.id}
            className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 hover:bg-white transition-all shadow-sm flex flex-col justify-between gap-4 group"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-sm group-hover:scale-110 transition-transform">
                    {getIcon(drill.iconName)}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{drill.title}</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100/80 text-blue-800 uppercase tracking-wide">
                  {drill.category.replace('_', ' ')}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{drill.description}</p>

              <div className="flex items-center gap-2 pt-1 text-[11px] font-medium text-slate-500">
                <span className="font-bold text-slate-700">Finger Focus:</span>
                <span className="px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-800">
                  {drill.fingerFocus}
                </span>
              </div>

              {/* Sample snippet */}
              <div className="p-2.5 rounded-xl bg-slate-100/80 border border-slate-200 font-mono text-xs text-slate-600 truncate">
                {drill.text}
              </div>
            </div>

            <button
              onClick={() => onSelectDrill(drill.text, drill.title)}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start Drill</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
