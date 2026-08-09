import { DrillPreset } from '../types';

export const COMMON_WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with",
  "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if",
  "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just",
  "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see",
  "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back",
  "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because",
  "any", "these", "give", "day", "most", "us", "great", "between", "need", "feel", "high", "system",
  "program", "speed", "key", "pulse", "focus", "master", "code", "light", "glass", "screen", "typing",
  "rhythm", "finger", "smooth", "practice", "accuracy", "result", "future", "digital", "network",
  "power", "design", "clean", "swift", "effort", "mind", "motion", "action", "crystal", "clear", "bright",
  "learn", "memory", "sharp", "track", "steady", "rapid", "flow", "growth", "signal", "spark", "vision"
];

export const QUOTES = {
  short: [
    "Simplicity is the soul of efficiency.",
    "Do what you can, with what you have, where you are.",
    "Code is like humor. When you have to explain it, it's bad.",
    "The only way to do great work is to love what you do.",
    "Small daily improvements over time lead to stunning results.",
    "Fast typing is not about rushing, it is about smooth accuracy."
  ],
  medium: [
    "Touch typing turns your keyboard into a seamless extension of your thoughts, eliminating the barrier between mind and screen.",
    "The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks.",
    "Technology is best when it brings people together and allows ideas to flow as fast as human thought can generate them.",
    "Mastery in typing requires consistency over speed. Precision breeds muscle memory, and muscle memory unlocks effortless velocity."
  ],
  long: [
    "In the quiet space between keypresses, true focus is cultivated. Each letter struck with intention builds a rhythm that transforms chaotic typing into an elegant dance across the keyboard. Master the fundamentals, honor the home row, and velocity will naturally follow.",
    "Programming is not just about writing code; it is about communicating logic to machines and clarity to fellow humans. High typing speed paired with zero error tolerance allows developers to stay in the zone without breaking creative flow."
  ]
};

export const DRILL_PRESETS: DrillPreset[] = [
  {
    id: 'home_row_basic',
    title: 'Home Row Foundation',
    category: 'home_row',
    description: 'Master the core keys (A, S, D, F, J, K, L, ;). Anchor your hands and build baseline muscle memory.',
    fingerFocus: 'All Fingers (Home Position)',
    text: 'asdf jkl; asdf jkl; a fad ads ask fall glad flask fads dabs flak a fall asdf jkl;',
    iconName: 'Keyboard'
  },
  {
    id: 'home_row_words',
    title: 'Home Row Words',
    category: 'home_row',
    description: 'Practice real English words composed exclusively of home row characters.',
    fingerFocus: 'Home Row Fingers',
    text: 'fall glad flask salad dad fads asks alfalfa flaks dallas alas lad ska dads glass',
    iconName: 'AlignLeft'
  },
  {
    id: 'top_row_reach',
    title: 'Top Row Reaches (QWERTY UIOP)',
    category: 'top_row',
    description: 'Practice upward finger reaches to Q, W, E, R, T, Y, U, I, O, P while returning to home position.',
    fingerFocus: 'Index, Middle, Ring & Pinky Upper Reaches',
    text: 'quiet power quiet report power type quote writer perimeter tower report equip wiper write',
    iconName: 'ArrowUp'
  },
  {
    id: 'bottom_row_flex',
    title: 'Bottom Row Flexibility (ZXCV BNM)',
    category: 'bottom_row',
    description: 'Train downward finger stretches to Z, X, C, V, B, N, M without losing home row alignment.',
    fingerFocus: 'Index, Middle, Ring & Pinky Lower Reaches',
    text: 'zone civic cabin bacon vacant comb zinc venom zenith mobile vibrant branch calm climb',
    iconName: 'ArrowDown'
  },
  {
    id: 'numbers_drill',
    title: 'Number Row Precision',
    category: 'numbers',
    description: 'Develop confidence with the top number row without looking down at the keys.',
    fingerFocus: 'Top Row Reach for 0-9',
    text: '123 456 789 012 345 678 901 2026 100 850 492 371 905 812 634 507',
    iconName: 'Binary'
  },
  {
    id: 'symbols_code',
    title: 'Symbols & Code Punctuation',
    category: 'symbols',
    description: 'Essential drill for developers: curly braces, brackets, quotes, and math operators.',
    fingerFocus: 'Pinkies & Shift key combinations',
    text: 'function(x, y) { return x >= 10 ? [x + 1] : { val: y * 2 }; } => "Hello World!";',
    iconName: 'Code'
  }
];
