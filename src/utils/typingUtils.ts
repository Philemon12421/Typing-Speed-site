import { FingerName, WpmPoint, DifficultyLevel, QuoteLength } from '../types';
import { SIMPLE_WORDS, COMMON_WORDS, EXPERT_WORDS, QUOTES_BY_DIFFICULTY, QUOTES } from '../data/sampleTexts';

export function calculateStats(
  typedLength: number,
  correctCount: number,
  incorrectCount: number,
  extraCount: number,
  timeElapsedSeconds: number,
  wpmHistory: WpmPoint[]
) {
  if (timeElapsedSeconds <= 0 || typedLength === 0) {
    return { wpm: 0, rawWpm: 0, accuracy: 100, cpm: 0, consistency: 100 };
  }

  const minutes = timeElapsedSeconds / 60;
  
  // Standard calculation: 1 standardized word = 5 characters (including spaces & punctuation)
  // Gross WPM (Raw WPM): (Total typed characters / 5) / time in minutes
  const rawWpm = Math.max(0, Math.round((typedLength / 5) / minutes));
  
  // Net WPM (Official WPM): (Correctly typed characters / 5) / time in minutes
  const wpm = Math.max(0, Math.round((correctCount / 5) / minutes));
  
  // CPM: Characters per minute
  const cpm = Math.max(0, Math.round(correctCount / minutes));
  
  // Accuracy: (Correct / (Correct + Incorrect + Extra)) * 100
  const totalAttempts = correctCount + incorrectCount + extraCount;
  const accuracy = totalAttempts > 0 
    ? Math.max(0, Math.min(100, Math.round((correctCount / totalAttempts) * 100))) 
    : 100;

  // Calculate consistency based on WPM variance across recorded points
  let consistency = 100;
  if (wpmHistory.length > 2) {
    const wpms = wpmHistory.map(p => p.wpm);
    const mean = wpms.reduce((a, b) => a + b, 0) / wpms.length;
    if (mean > 0) {
      const variance = wpms.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / wpms.length;
      const stdDev = Math.sqrt(variance);
      const cv = (stdDev / mean) * 100; // Coefficient of Variation
      consistency = Math.max(0, Math.min(100, Math.round(100 - cv)));
    }
  }

  return { wpm, rawWpm, accuracy, cpm, consistency };
}

// QWERTY key to finger mapping
const FINGER_KEY_MAP: Record<string, { name: FingerName; label: string; color: string }> = {
  // Left Pinky
  '`': { name: 'left_pinky', label: 'Left Pinky', color: 'bg-rose-500' },
  '~': { name: 'left_pinky', label: 'Left Pinky (Shift+`)', color: 'bg-rose-500' },
  '1': { name: 'left_pinky', label: 'Left Pinky', color: 'bg-rose-500' },
  '!': { name: 'left_pinky', label: 'Left Pinky (Shift+1)', color: 'bg-rose-500' },
  'q': { name: 'left_pinky', label: 'Left Pinky', color: 'bg-rose-500' },
  'a': { name: 'left_pinky', label: 'Left Pinky', color: 'bg-rose-500' },
  'z': { name: 'left_pinky', label: 'Left Pinky', color: 'bg-rose-500' },

  // Left Ring
  '2': { name: 'left_ring', label: 'Left Ring', color: 'bg-amber-500' },
  '@': { name: 'left_ring', label: 'Left Ring (Shift+2)', color: 'bg-amber-500' },
  'w': { name: 'left_ring', label: 'Left Ring', color: 'bg-amber-500' },
  's': { name: 'left_ring', label: 'Left Ring', color: 'bg-amber-500' },
  'x': { name: 'left_ring', label: 'Left Ring', color: 'bg-amber-500' },

  // Left Middle
  '3': { name: 'left_middle', label: 'Left Middle', color: 'bg-emerald-500' },
  '#': { name: 'left_middle', label: 'Left Middle (Shift+3)', color: 'bg-emerald-500' },
  '£': { name: 'left_middle', label: 'Left Middle (Shift+3)', color: 'bg-emerald-500' },
  'e': { name: 'left_middle', label: 'Left Middle', color: 'bg-emerald-500' },
  'd': { name: 'left_middle', label: 'Left Middle', color: 'bg-emerald-500' },
  'c': { name: 'left_middle', label: 'Left Middle', color: 'bg-emerald-500' },

  // Left Index
  '4': { name: 'left_index', label: 'Left Index', color: 'bg-sky-500' },
  '$': { name: 'left_index', label: 'Left Index (Shift+4)', color: 'bg-sky-500' },
  '€': { name: 'left_index', label: 'Left Index (Shift+4)', color: 'bg-sky-500' },
  '5': { name: 'left_index', label: 'Left Index', color: 'bg-sky-500' },
  '%': { name: 'left_index', label: 'Left Index (Shift+5)', color: 'bg-sky-500' },
  'r': { name: 'left_index', label: 'Left Index', color: 'bg-sky-500' },
  't': { name: 'left_index', label: 'Left Index', color: 'bg-sky-500' },
  'f': { name: 'left_index', label: 'Left Index', color: 'bg-sky-500' },
  'g': { name: 'left_index', label: 'Left Index', color: 'bg-sky-500' },
  'v': { name: 'left_index', label: 'Left Index', color: 'bg-sky-500' },
  'b': { name: 'left_index', label: 'Left Index', color: 'bg-sky-500' },

  // Thumbs
  ' ': { name: 'thumb', label: 'Space Thumb', color: 'bg-indigo-500' },

  // Right Index
  '6': { name: 'right_index', label: 'Right Index', color: 'bg-blue-500' },
  '^': { name: 'right_index', label: 'Right Index (Shift+6)', color: 'bg-blue-500' },
  '7': { name: 'right_index', label: 'Right Index', color: 'bg-blue-500' },
  '&': { name: 'right_index', label: 'Right Index (Shift+7)', color: 'bg-blue-500' },
  'y': { name: 'right_index', label: 'Right Index', color: 'bg-blue-500' },
  'u': { name: 'right_index', label: 'Right Index', color: 'bg-blue-500' },
  'h': { name: 'right_index', label: 'Right Index', color: 'bg-blue-500' },
  'j': { name: 'right_index', label: 'Right Index', color: 'bg-blue-500' },
  'n': { name: 'right_index', label: 'Right Index', color: 'bg-blue-500' },
  'm': { name: 'right_index', label: 'Right Index', color: 'bg-blue-500' },

  // Right Middle
  '8': { name: 'right_middle', label: 'Right Middle', color: 'bg-teal-500' },
  '*': { name: 'right_middle', label: 'Right Middle (Shift+8)', color: 'bg-teal-500' },
  'i': { name: 'right_middle', label: 'Right Middle', color: 'bg-teal-500' },
  'k': { name: 'right_middle', label: 'Right Middle', color: 'bg-teal-500' },
  ',': { name: 'right_middle', label: 'Right Middle', color: 'bg-teal-500' },
  '<': { name: 'right_middle', label: 'Right Middle (Shift+,)', color: 'bg-teal-500' },

  // Right Ring
  '9': { name: 'right_ring', label: 'Right Ring', color: 'bg-purple-500' },
  '(': { name: 'right_ring', label: 'Right Ring (Shift+9)', color: 'bg-purple-500' },
  'o': { name: 'right_ring', label: 'Right Ring', color: 'bg-purple-500' },
  'l': { name: 'right_ring', label: 'Right Ring', color: 'bg-purple-500' },
  '.': { name: 'right_ring', label: 'Right Ring', color: 'bg-purple-500' },
  '>': { name: 'right_ring', label: 'Right Ring (Shift+.)', color: 'bg-purple-500' },

  // Right Pinky
  '0': { name: 'right_pinky', label: 'Right Pinky', color: 'bg-fuchsia-500' },
  ')': { name: 'right_pinky', label: 'Right Pinky (Shift+0)', color: 'bg-fuchsia-500' },
  '-': { name: 'right_pinky', label: 'Right Pinky', color: 'bg-fuchsia-500' },
  '_': { name: 'right_pinky', label: 'Right Pinky (Shift+-)', color: 'bg-fuchsia-500' },
  '=': { name: 'right_pinky', label: 'Right Pinky', color: 'bg-fuchsia-500' },
  '+': { name: 'right_pinky', label: 'Right Pinky (Shift+=)', color: 'bg-fuchsia-500' },
  'p': { name: 'right_pinky', label: 'Right Pinky', color: 'bg-fuchsia-500' },
  '[': { name: 'right_pinky', label: 'Right Pinky', color: 'bg-fuchsia-500' },
  '{': { name: 'right_pinky', label: 'Right Pinky (Shift+[)', color: 'bg-fuchsia-500' },
  ']': { name: 'right_pinky', label: 'Right Pinky', color: 'bg-fuchsia-500' },
  '}': { name: 'right_pinky', label: 'Right Pinky (Shift+])', color: 'bg-fuchsia-500' },
  '\\': { name: 'right_pinky', label: 'Right Pinky', color: 'bg-fuchsia-500' },
  '|': { name: 'right_pinky', label: 'Right Pinky (Shift+\\)', color: 'bg-fuchsia-500' },
  ';': { name: 'right_pinky', label: 'Right Pinky', color: 'bg-fuchsia-500' },
  ':': { name: 'right_pinky', label: 'Right Pinky (Shift+;)', color: 'bg-fuchsia-500' },
  '\'': { name: 'right_pinky', label: 'Right Pinky', color: 'bg-fuchsia-500' },
  '"': { name: 'right_pinky', label: 'Right Pinky (Shift+\')', color: 'bg-fuchsia-500' },
  '/': { name: 'right_pinky', label: 'Right Pinky', color: 'bg-fuchsia-500' },
  '?': { name: 'right_pinky', label: 'Right Pinky (Shift+/)', color: 'bg-fuchsia-500' },
};

export function getKeyFingerInfo(char: string) {
  if (!char) return { name: 'thumb' as FingerName, label: 'Spacebar', color: 'bg-indigo-500' };
  const lower = char.toLowerCase();
  return FINGER_KEY_MAP[char] || FINGER_KEY_MAP[lower] || { name: 'thumb' as FingerName, label: 'Space Thumb', color: 'bg-indigo-500' };
}

// Symbol transforms for Moderate difficulty (gentle punctuation and common symbols)
const MODERATE_SYMBOL_TRANSFORMS = [
  (w: string) => `"${w}"`,
  (w: string) => `@${w}`,
  (w: string) => `£${Math.floor(Math.random() * 85 + 10)}`,
  (w: string) => `&`,
  (w: string) => `@${w}`,
  (w: string) => `£${Math.floor(Math.random() * 50 + 5)}`,
  (w: string) => `${w}!`,
  (w: string) => `${w}?`,
  (w: string) => `(${w})`,
  (w: string) => `#${w}`,
  (w: string) => `$${Math.floor(Math.random() * 80 + 15)}`,
  (w: string) => `${Math.floor(Math.random() * 85 + 15)}%`,
  (w: string) => `${w},`,
  (w: string) => `${w}.`,
  (w: string) => `${w};`,
];

// Symbol transforms for Expert difficulty (heavy code syntax, rare characters, brackets, operators)
const EXPERT_SYMBOL_TRANSFORMS = [
  (w: string) => `"${w}"`,
  (w: string) => `'${w}'`,
  (w: string) => `@${w}`,
  (w: string) => `£${Math.floor(Math.random() * 950 + 50)}.00`,
  (w: string) => `$${Math.floor(Math.random() * 950 + 50)}.00`,
  (w: string) => `&`,
  (w: string) => `#${w}_tag`,
  (w: string) => `${w}!`,
  (w: string) => `${w}?`,
  (w: string) => `(${w})`,
  (w: string) => `[${w}]`,
  (w: string) => `{${w}}`,
  (w: string) => `get_${w}()`,
  (w: string) => `handle${w.charAt(0).toUpperCase() + w.slice(1)}`,
  (w: string) => `${w.toUpperCase()}_MODE`,
  (w: string) => `${Math.floor(Math.random() * 95 + 5)}%`,
  (w: string) => `${w} === true`,
  (w: string) => `${w}: "${Math.floor(Math.random() * 900 + 100)}"`,
  (w: string) => `${w} + ${Math.floor(Math.random() * 50 + 1)}`,
  (w: string) => `/* ${w} */`,
  (w: string) => `<${w}>`,
  (w: string) => `${w};`,
  (w: string) => `~${w}`,
  (w: string) => `^${w}`,
  (w: string) => `${w} -> result`,
];

export function generateWordsText(wordCount: number, difficulty: DifficultyLevel = 'moderate'): string {
  const result: string[] = [];

  if (difficulty === 'simple') {
    // Simple Mode: Smooth, high-frequency, comfortable vocabulary with no tricky symbols or punctuation
    for (let i = 0; i < wordCount; i++) {
      const randomIndex = Math.floor(Math.random() * SIMPLE_WORDS.length);
      result.push(SIMPLE_WORDS[randomIndex]);
    }
    return result.join(" ");
  }

  if (difficulty === 'expert') {
    // Expert Mode: Complex irregular multi-syllable words, frequent symbols (@, £, $, ", &, {}, []), mixed casing, code tokens
    let lastSymbolIndex = -3;
    const combinedPool = [...EXPERT_WORDS, ...COMMON_WORDS];

    for (let i = 0; i < wordCount; i++) {
      // 60% chance to pick an expert irregular word
      const useExpertWord = Math.random() < 0.6;
      const pool = useExpertWord ? EXPERT_WORDS : combinedPool;
      const randomIndex = Math.floor(Math.random() * pool.length);
      const word = pool[randomIndex];

      // Weave expert symbols frequently (every 2-4 words)
      if (i - lastSymbolIndex >= 2 && Math.random() < 0.45 && i < wordCount - 1) {
        const transform = EXPERT_SYMBOL_TRANSFORMS[Math.floor(Math.random() * EXPERT_SYMBOL_TRANSFORMS.length)];
        result.push(transform(word));
        lastSymbolIndex = i;
      } else {
        result.push(word);
      }
    }
    return result.join(" ");
  }

  // Moderate Mode (Default): Balanced real-world vocabulary, standard punctuation, light symbols
  let lastSymbolIndex = -4;
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * COMMON_WORDS.length);
    const word = COMMON_WORDS[randomIndex];

    if (i - lastSymbolIndex >= 4 && Math.random() < 0.35 && i < wordCount - 1) {
      const transform = MODERATE_SYMBOL_TRANSFORMS[Math.floor(Math.random() * MODERATE_SYMBOL_TRANSFORMS.length)];
      result.push(transform(word));
      lastSymbolIndex = i;
    } else {
      result.push(word);
    }
  }
  return result.join(" ");
}

export function getRandomQuote(length: QuoteLength, difficulty: DifficultyLevel = 'moderate'): string {
  const difficultyQuotes = QUOTES_BY_DIFFICULTY[difficulty] || QUOTES_BY_DIFFICULTY.moderate;
  const list = difficultyQuotes[length] || QUOTES[length];
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
}

export function generateWeakKeyText(weakKeys: string[]): string {
  if (!weakKeys || weakKeys.length === 0) {
    return generateWordsText(30, 'moderate');
  }

  const focusChars = weakKeys.map(k => k.toLowerCase());
  // Find words containing the focus chars
  const matchingWords = COMMON_WORDS.filter(word => 
    focusChars.some(char => word.toLowerCase().includes(char))
  );

  const wordPool = matchingWords.length >= 10 ? matchingWords : COMMON_WORDS;
  const result: string[] = [];
  
  for (let i = 0; i < 35; i++) {
    const randomIndex = Math.floor(Math.random() * wordPool.length);
    result.push(wordPool[randomIndex]);
  }

  return result.join(" ");
}

export function getWpmGrade(wpm: number) {
  if (wpm < 25) return { title: 'Beginner', color: 'text-amber-600', badge: '🌱 Novice' };
  if (wpm < 45) return { title: 'Intermediate', color: 'text-blue-600', badge: '⚡ Average Typist' };
  if (wpm < 70) return { title: 'Fast Typist', color: 'text-emerald-600', badge: '🚀 Pro Speeder' };
  if (wpm < 95) return { title: 'Touch Master', color: 'text-purple-600', badge: '👑 Touch Master' };
  return { title: 'Grandmaster', color: 'text-rose-600', badge: '🔥 Speed Demon' };
}
