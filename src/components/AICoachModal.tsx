import React, { useState } from 'react';
import { TestResult, AIAnalysis } from '../types';
import { Cpu, Sparkles, Send, Play, CheckCircle2, AlertTriangle, BookOpen, Code, Compass } from 'lucide-react';

interface AICoachModalProps {
  lastResult?: TestResult;
  onGenerateCustomPassage: (text: string, title: string) => void;
}

export const AICoachModal: React.FC<AICoachModalProps> = ({ lastResult, onGenerateCustomPassage }) => {
  const [topicPrompt, setTopicPrompt] = useState('Artificial Intelligence and Future Tech');
  const [wordCount, setWordCount] = useState(35);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPassage, setGeneratedPassage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const presets = [
    { title: 'Python Code Syntax', topic: 'Python Programming Code Syntax with functions and loops', difficulty: 'hard' },
    { title: 'Cybersecurity Fundamentals', topic: 'Cybersecurity principles and network protection terms', difficulty: 'medium' },
    { title: 'Space Exploration', topic: 'Astronomy, planets, galaxies, and rocket engineering', difficulty: 'easy' },
    { title: 'Business Email Etiquette', topic: 'Professional corporate communications and executive memos', difficulty: 'medium' },
  ];

  const handleGenerate = async (customTopic?: string, customDiff?: string) => {
    setIsGenerating(true);
    setErrorMessage(null);
    setGeneratedPassage(null);

    const activeTopic = customTopic || topicPrompt;
    const activeDiff = customDiff || difficulty;

    try {
      const res = await fetch('/api/gemini/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: activeTopic,
          wordCount,
          difficulty: activeDiff,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate custom passage.');
      }

      setGeneratedPassage(data.text);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to connect to Gemini AI server.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyPassage = () => {
    if (generatedPassage) {
      onGenerateCustomPassage(generatedPassage, `AI: ${topicPrompt}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-slate-200 shadow-2xl shadow-slate-200/50">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200/80 pb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
            <Cpu className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">Gemini AI Typing Coach & Generator</h1>
          <p className="text-xs text-slate-500 font-medium">
            Generate custom typing passages on any topic or run deep performance diagnostics
          </p>
        </div>
      </div>

      {/* Preset Topic Cards */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-slate-800">Quick AI Practice Presets</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {presets.map((p, i) => (
            <div
              key={i}
              onClick={() => {
                setTopicPrompt(p.topic);
                handleGenerate(p.topic, p.difficulty);
              }}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-200/80 cursor-pointer transition-all shadow-sm flex items-center justify-between group"
            >
              <div>
                <h3 className="font-bold text-slate-900 text-xs group-hover:text-blue-700 transition-colors">
                  {p.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1">{p.topic}</p>
              </div>
              <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Custom Topic Prompt Form */}
      <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-4">
        <span className="text-xs font-bold text-slate-800">Custom Topic Generator</span>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={topicPrompt}
            onChange={(e) => setTopicPrompt(e.target.value)}
            placeholder="e.g. Quantum Computing, Philosophy, Medical Terminology..."
            className="flex-1 w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={difficulty}
              onChange={(e: any) => setDifficulty(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard (Code/Symbols)</option>
            </select>

            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !topicPrompt.trim()}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {isGenerating ? (
                <span>Generating...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>Generate Text</span>
                </>
              )}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Generated Passage Result View */}
        {generatedPassage && (
          <div className="p-4 rounded-xl bg-white border border-blue-200 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900">Generated AI Passage</span>
              <span className="text-[10px] text-slate-400 font-mono">{generatedPassage.split(' ').length} words</span>
            </div>

            <p className="font-mono text-sm leading-relaxed text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100">
              {generatedPassage}
            </p>

            <button
              onClick={handleApplyPassage}
              className="flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Use This Text For Typing Test</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
