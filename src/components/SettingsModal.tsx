import React from 'react';
import { UserSettings, CaretStyle, FontSize, SoundProfile } from '../types';
import { Settings, Volume2, VolumeX, Eye, AlertOctagon, Type, Keyboard, User } from 'lucide-react';

interface SettingsModalProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const handleChange = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    onUpdateSettings({ ...settings, [key]: value });
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-6 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-2xl border border-slate-200 shadow-2xl shadow-slate-200/50">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200/80 pb-6">
        <Settings className="w-6 h-6 text-blue-600" />
        <div>
          <h1 className="text-2xl font-black text-slate-900">Customization & Preferences</h1>
          <p className="text-xs text-slate-500 font-medium">
            Personalize visual themes, sound profiles, caret behaviors, and test constraints
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* User Profile Name */}
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            <span>Profile Display Name</span>
          </label>
          <input
            type="text"
            value={settings.userName}
            onChange={(e) => handleChange('userName', e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Pro Typist"
          />
          <span className="text-[10px] text-slate-400">Used for typing certificates and report cards</span>
        </div>

        {/* Font Size Selector */}
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <Type className="w-4 h-4 text-blue-600" />
            <span>Typing Canvas Text Size</span>
          </label>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-200/60 rounded-xl">
            {(['sm', 'md', 'lg', 'xl'] as FontSize[]).map((size) => (
              <button
                key={size}
                onClick={() => handleChange('fontSize', size)}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${
                  settings.fontSize === size
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Caret Style */}
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-800">Caret Style</label>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-200/60 rounded-xl">
            {(['line', 'block', 'underline', 'smooth'] as CaretStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => handleChange('caretStyle', style)}
                className={`py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  settings.caretStyle === style
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Profile */}
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-3">
          <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span>Keyboard Sound Profile</span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              {Math.round(settings.soundVolume * 100)}%
            </span>
          </label>

          <select
            value={settings.soundProfile}
            onChange={(e) => handleChange('soundProfile', e.target.value as SoundProfile)}
            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none"
          >
            <option value="cherry_mx">Cherry MX Mechanical Switches</option>
            <option value="click">Clean Digital UI Click</option>
            <option value="typewriter">Vintage Typewriter Clack</option>
            <option value="soft">Soft Bubble Pop</option>
            <option value="silent">Mute / Silent</option>
          </select>

          {/* Volume Slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.soundVolume}
            onChange={(e) => handleChange('soundVolume', parseFloat(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Toggles Group */}
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col gap-3 md:col-span-2">
          <span className="text-xs font-bold text-slate-800">Behavioral Toggles</span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-slate-700">
            {/* Blind Mode */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 cursor-pointer hover:border-blue-300 transition-colors">
              <div className="flex flex-col">
                <span className="font-bold text-slate-800">Blind Mode</span>
                <span className="text-[10px] text-slate-400">Hides WPM and accuracy during the test</span>
              </div>
              <input
                type="checkbox"
                checked={settings.blindMode}
                onChange={(e) => handleChange('blindMode', e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </label>

            {/* Stop On Error */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 cursor-pointer hover:border-blue-300 transition-colors">
              <div className="flex flex-col">
                <span className="font-bold text-slate-800">Stop On Error</span>
                <span className="text-[10px] text-slate-400">Forces user to fix mistakes before advancing</span>
              </div>
              <input
                type="checkbox"
                checked={settings.stopOnError}
                onChange={(e) => handleChange('stopOnError', e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </label>

            {/* Virtual Keyboard */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 cursor-pointer hover:border-blue-300 transition-colors">
              <div className="flex flex-col">
                <span className="font-bold text-slate-800">Show Virtual Keyboard</span>
                <span className="text-[10px] text-slate-400">Mavis Beacon style finger layout guide</span>
              </div>
              <input
                type="checkbox"
                checked={settings.showKeyboard}
                onChange={(e) => handleChange('showKeyboard', e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </label>

            {/* Show Live WPM */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 cursor-pointer hover:border-blue-300 transition-colors">
              <div className="flex flex-col">
                <span className="font-bold text-slate-800">Show Live WPM HUD</span>
                <span className="text-[10px] text-slate-400">Display real-time speed header</span>
              </div>
              <input
                type="checkbox"
                checked={settings.showLiveWpm}
                onChange={(e) => handleChange('showLiveWpm', e.target.checked)}
                className="w-4 h-4 accent-blue-600 rounded"
              />
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};
