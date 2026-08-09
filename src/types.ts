export type TestMode = 'time' | 'words' | 'quote' | 'drill' | 'custom';
export type TimeOption = 15 | 30 | 60 | 120;
export type WordsOption = 10 | 25 | 50 | 100;
export type QuoteLength = 'short' | 'medium' | 'long';
export type DrillCategory = 'home_row' | 'top_row' | 'bottom_row' | 'numbers' | 'symbols' | 'weak_keys';

export type CaretStyle = 'line' | 'block' | 'underline' | 'smooth';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
export type SoundProfile = 'click' | 'cherry_mx' | 'typewriter' | 'soft' | 'silent';
export type DailyGoalType = 'words' | 'time';

export type FingerName =
  | 'left_pinky'
  | 'left_ring'
  | 'left_middle'
  | 'left_index'
  | 'thumb'
  | 'right_index'
  | 'right_middle'
  | 'right_ring'
  | 'right_pinky';

export interface UserSettings {
  userName: string;
  fontSize: FontSize;
  caretStyle: CaretStyle;
  soundProfile: SoundProfile;
  soundVolume: number;
  blindMode: boolean;
  stopOnError: boolean;
  showLiveWpm: boolean;
  showKeyboard: boolean;
  smoothCaret: boolean;
  highlightFinger: boolean;
  dailyGoalType: DailyGoalType;
  dailyGoalTarget: number;
  zenMode: boolean;
}

export interface WpmPoint {
  second: number;
  wpm: number;
  rawWpm: number;
  errors: number;
  accuracy: number;
}

export interface AIAnalysis {
  rating: string;
  summary: string;
  strengths: string[];
  areasToImprove: string[];
  coachingAdvice: string;
  recommendedCustomDrillText: string;
}

export interface TestResult {
  id: string;
  timestamp: number;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  cpm: number;
  timeSeconds: number;
  totalChars: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  consistency: number;
  mode: TestMode;
  modeDetail: string;
  wpmHistory: WpmPoint[];
  keyErrors: Record<string, number>;
  fingerStats: Record<string, { hits: number; errors: number }>;
  aiAnalysis?: AIAnalysis;
}

export interface DrillPreset {
  id: string;
  title: string;
  category: DrillCategory;
  description: string;
  fingerFocus: string;
  text: string;
  iconName: string;
}

export interface TypingChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
  targetWpm: number;
  targetAccuracy: number;
  mode: TestMode;
  modeDetail: string;
  timeSeconds?: number;
  wordCount?: number;
  customText?: string;
  blindMode?: boolean;
  xpReward: number;
  icon: string;
  badge: string;
}

export interface AiOpponent {
  id: string;
  name: string;
  title: string;
  avatar: string;
  targetWpm: number;
  accuracy: number;
  description: string;
  color: string;
}

export type TabType = 'test' | 'duel' | 'challenges' | 'analytics' | 'guide';
