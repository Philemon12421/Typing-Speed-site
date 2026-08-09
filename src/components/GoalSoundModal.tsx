import React from 'react';
import { UserSettings, SoundProfile, DailyGoalType, CaretStyle } from '../types';
import { soundSynth } from '../utils/soundEffects';
import {
  X,
  Target,
  Volume2,
  VolumeX,
  Keyboard,
  Sliders,
  Check,
  Eye,
  AlertTriangle,
} from 'lucide-react';

interface GoalSoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
  todayProgress: {
    completed: number;
    target: number;
    percent: number;
    unit: string;
    type: DailyGoalType;
  };
}

export const GoalSoundModal: React.FC<GoalSoundModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  todayProgress,
}) => {
  if (!isOpen) return null;

  const soundOptions: { id: SoundProfile; label: string; desc: string; icon: string }[] = [
    { id: 'typewriter', label: 'Typewriter', desc: 'Classic mechanical snap & spring', icon: '⌨️' },
    { id: 'cherry_mx', label: 'Cherry MX', desc: 'Crisp tactile switch click', icon: '🎹' },
    { id: 'click', label: 'Digital Click', desc: 'Modern clean UI tick', icon: '🖱️' },
    { id: 'soft', label: 'Soft Pop', desc: 'Warm gentle bubble sound', icon: '🫧' },
    { id: 'silent', label: 'Silent', desc: 'Disable audio feedback', icon: '🔇' },
  ];

  const handleTestSound = (profile: SoundProfile) => {
    soundSynth.playKeyPress(profile, settings.soundVolume, false, false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-2xl border border-white/80 rounded-3xl shadow-2xl p-6 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Practice Goals & Preferences</h2>
              <p className="text-xs text-slate-500 font-medium">Daily targets, audio feedback, and test options</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SECTION 1: DAILY PRACTICE GOAL */}
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/40 border border-indigo-100/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Daily Practice Goal</span>
            </div>
            <span className="text-xs font-extrabold text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
              {todayProgress.percent}% Completed Today
            </span>
          </div>

          {/* Goal Progress Bar */}
          <div className="flex flex-col gap-1.5 my-1">
            <div className="flex items-baseline justify-between text-xs font-semibold text-slate-700">
              <span>Today's Progress:</span>
              <span className="font-bold text-slate-900">
                {todayProgress.completed} / {todayProgress.target} {todayProgress.unit}
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden border border-slate-300/40">
              <div
                className="h-full bg-indigo-600 transition-all duration-500 rounded-full"
                style={{ width: `${todayProgress.percent}%` }}
              />
            </div>
          </div>

          {/* Goal Type Switcher */}
          <div className="flex items-center gap-2 pt-2 border-t border-indigo-100/60">
            <span className="text-xs font-semibold text-slate-600">Goal Metric:</span>
            <div className="flex p-1 bg-white border border-slate-200 rounded-xl">
              <button
                onClick={() => onUpdateSettings({ ...settings, dailyGoalType: 'words' })}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  settings.dailyGoalType === 'words'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Word Count
              </button>
              <button
                onClick={() => onUpdateSettings({ ...settings, dailyGoalType: 'time' })}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  settings.dailyGoalType === 'time'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Time Spent
              </button>
            </div>
          </div>

          {/* Target Presets */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-xs font-semibold text-slate-600 shrink-0">Target Amount:</span>
            {settings.dailyGoalType === 'words'
              ? [200, 500, 1000, 2000].map((val) => (
                  <button
                    key={val}
                    onClick={() => onUpdateSettings({ ...settings, dailyGoalTarget: val })}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      settings.dailyGoalTarget === val
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {val} w
                  </button>
                ))
              : [5, 10, 20, 30].map((val) => (
                  <button
                    key={val}
                    onClick={() => onUpdateSettings({ ...settings, dailyGoalTarget: val })}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      settings.dailyGoalTarget === val
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {val} m
                  </button>
                ))}
          </div>
        </div>

        {/* SECTION 2: AUDIO FEEDBACK SETTINGS */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Volume2 className="w-4 h-4 text-indigo-600" />
              <span>Keypress Audio Feedback</span>
            </div>
            <button
              onClick={() => handleTestSound(settings.soundProfile)}
              className="px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-all active:scale-95"
            >
              🔊 Test Keypress Sound
            </button>
          </div>

          {/* Sound Profiles List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {soundOptions.map((opt) => {
              const isSelected = settings.soundProfile === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    onUpdateSettings({ ...settings, soundProfile: opt.id });
                    handleTestSound(opt.id);
                  }}
                  className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                      : 'bg-white/80 text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{opt.icon}</span>
                    <div>
                      <div className="font-bold text-xs">{opt.label}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {opt.desc}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                </button>
              );
            })}
          </div>

          {/* Volume Slider */}
          {settings.soundProfile !== 'silent' && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 mt-1">
              <VolumeX className="w-4 h-4 text-slate-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.soundVolume}
                onChange={(e) => {
                  const vol = parseFloat(e.target.value);
                  onUpdateSettings({ ...settings, soundVolume: vol });
                  soundSynth.playKeyPress(settings.soundProfile, vol, false, false);
                }}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <Volume2 className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-700 w-10 text-right">
                {Math.round(settings.soundVolume * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* SECTION 3: TYPING VISUAL & INTERACTION PREFERENCES */}
        <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider text-slate-400">
            Typing Preferences
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Blind Mode Toggle */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-all">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <Eye className="w-4 h-4 text-slate-500" />
                <span>Blind Mode</span>
              </div>
              <input
                type="checkbox"
                checked={settings.blindMode}
                onChange={(e) => onUpdateSettings({ ...settings, blindMode: e.target.checked })}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </label>

            {/* Stop on Error Toggle */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-all">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <AlertTriangle className="w-4 h-4 text-slate-500" />
                <span>Stop on Error</span>
              </div>
              <input
                type="checkbox"
                checked={settings.stopOnError}
                onChange={(e) => onUpdateSettings({ ...settings, stopOnError: e.target.checked })}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </label>
          </div>

          {/* Caret Style Selector */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <span className="font-semibold text-slate-700">Caret Cursor Style:</span>
            <div className="flex items-center gap-1">
              {(['line', 'smooth', 'block', 'underline'] as CaretStyle[]).map((st) => (
                <button
                  key={st}
                  onClick={() => onUpdateSettings({ ...settings, caretStyle: st })}
                  className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-all ${
                    settings.caretStyle === st
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-200 transition-all active:scale-[0.99]"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
