import { TypingChallenge } from '../types';

// Curated Code Snippets for Programming Challenges
const CODE_SNIPPETS = [
  'function sum(a: number, b: number): number { return a + b; }',
  'const [state, setState] = useState<boolean>(false);',
  'async function fetchData(url: string) { const res = await fetch(url); return res.json(); }',
  'export interface User { id: string; name: string; email: string; createdAt: Date; }',
  'const filtered = items.filter((item) => item.active && item.score >= 80);',
  'SELECT users.id, users.email, COUNT(orders.id) FROM users JOIN orders ON users.id = orders.user_id GROUP BY users.id;',
  'def calculate_fibonacci(n: int) -> int:\n    if n <= 1: return n\n    return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)',
  'div.container { display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; }',
  'git commit -m "feat(auth): implement JWT token verification middleware" && git push origin main',
  'const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);',
  'npm install lucide-react motion clsx tailwind-merge --save',
  'docker run -d -p 3000:3000 --name my-app-container my-image:latest',
  'struct Point { x: f64, y: f64 } impl Point { fn origin() -> Self { Point { x: 0.0, y: 0.0 } } }',
  'const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;',
  'try { await db.transaction(async (tx) => { await tx.insert(users).values(newUser); }); } catch (err) { console.error(err); }',
];

const QUOTE_SNIPPETS = [
  'Simplicity is prerequisite for reliability. Software engineering is the art of mastering complexity.',
  'Code is like humor. When you have to explain it, it is bad. Strive for clarity above all else.',
  'First, solve the problem. Then, write the code. Premature optimization is the root of all evil.',
  'The function of good software is to make the complex appear simple & effortless.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Talk is cheap. Show me the code. Action speaks louder than words in software craftsmanship.',
  'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.',
  'Continuous improvement is better than delayed perfection. Keep typing, keep refining & stay sharp.',
  'Work with @team to deliver 100% test coverage & save £500 on infrastructure costs.',
  'Knowledge is power, but practice is the "key" that unlocks mastery & lightning velocity.'
];

const WORD_LISTS = [
  'apple banana cherry dragon elephant falcon giraffe horizon iceberg jungle',
  'keyboard monitor process algorithm memory buffer socket pipeline stream async',
  'precision velocity accuracy rhythm cadence tactile switch mechanical keystroke',
  'quantum electron photon galaxy cosmos nebula orbit gravity pulsar eclipse',
  'mountain river forest ocean glacier canyon valley island volcano plateau',
  'champion victory trophy medal dynamic impact energy momentum triumph crest',
  'architecture component framework infrastructure deployment container database reactive',
  'serenity tranquility harmony balance focus clarity instinct flow pulse',
  '"speed & focus" @team £50 #1 test & "accuracy" £25 @user cats & dogs £100 "flow"',
  'email@domain.com £75 & 100% "precision" #code @expert £200 trial & error'
];

// Base curated iconic challenges
const BASE_CHALLENGES: TypingChallenge[] = [
  {
    id: 'ch_speed_starter',
    title: 'Speed Starter (Level 1)',
    description: 'Break into touch typing speed by sustaining at least 40 WPM in a quick 30-second sprint.',
    difficulty: 'easy',
    targetWpm: 40,
    targetAccuracy: 92,
    mode: 'time',
    modeDetail: '30s Time Sprint',
    timeSeconds: 30,
    xpReward: 100,
    icon: 'Zap',
    badge: '⚡ Speed Starter',
  },
  {
    id: 'ch_accuracy_master',
    title: 'Precision Perfectionist (Level 2)',
    description: 'Demonstrate surgical accuracy by typing 25 words with 98% accuracy or higher.',
    difficulty: 'easy',
    targetWpm: 35,
    targetAccuracy: 98,
    mode: 'words',
    modeDetail: '25 Words Precision',
    wordCount: 25,
    xpReward: 120,
    icon: 'Target',
    badge: '🎯 Precision Master',
  },
  {
    id: 'ch_home_row_rhythm',
    title: 'Home Row Foundation (Level 3)',
    description: 'Build core finger placement muscle memory! Complete 15 words focusing purely on natural rhythm.',
    difficulty: 'easy',
    targetWpm: 30,
    targetAccuracy: 95,
    mode: 'words',
    modeDetail: '15 Words Home Row',
    wordCount: 15,
    xpReward: 110,
    icon: 'Keyboard',
    badge: '⌨️ Home Row Ace',
  },
  {
    id: 'ch_speed_demon',
    title: 'Speed Demon Burst (Level 251)',
    description: 'Unleash raw typing speed! Reach an intense 75 WPM in a high-speed 15-second burst.',
    difficulty: 'medium',
    targetWpm: 75,
    targetAccuracy: 93,
    mode: 'time',
    modeDetail: '15s Burst',
    timeSeconds: 15,
    xpReward: 200,
    icon: 'Flame',
    badge: '🔥 Speed Demon',
  },
  {
    id: 'ch_symbol_wizard',
    title: 'Symbol & Code Syntax (Level 252)',
    description: 'Master non-alpha characters! Type a passage full of JSON, variables, numbers, and symbols.',
    difficulty: 'medium',
    targetWpm: 38,
    targetAccuracy: 92,
    mode: 'custom',
    modeDetail: 'Symbols & Code Syntax',
    customText: 'function compute(a, b) { const total = (a * 100) / (b + 5); return total >= 50.5 ? "SUCCESS" : "RETRY"; }',
    xpReward: 250,
    icon: 'Code',
    badge: '⚡ Symbol Wizard',
  },
  {
    id: 'ch_keyboard_ninja',
    title: 'Keyboard Ninja 85 WPM (Level 601)',
    description: 'Execute rapid finger alternation across 60 seconds with 85 WPM speed and 96% accuracy.',
    difficulty: 'hard',
    targetWpm: 85,
    targetAccuracy: 96,
    mode: 'time',
    modeDetail: '60s Ninja Sprint',
    timeSeconds: 60,
    xpReward: 480,
    icon: 'Terminal',
    badge: '🥷 Keyboard Ninja',
  },
  {
    id: 'ch_apex_140',
    title: 'Sonic Apex 140 WPM (Level 950)',
    description: 'Peak human typing velocity! Achieve 140 WPM in a 15-second burst with zero finger friction.',
    difficulty: 'legendary',
    targetWpm: 140,
    targetAccuracy: 97,
    mode: 'time',
    modeDetail: '15s 140 WPM Apex',
    timeSeconds: 15,
    xpReward: 1000,
    icon: 'Flame',
    badge: '🔥 Sonic Titan',
  },
];

// Helper to generate 1,000+ challenges programmatically across 1,050 total levels
function generateAllChallenges(): TypingChallenge[] {
  const challenges: TypingChallenge[] = [...BASE_CHALLENGES];
  const targetCount = 1050;

  // Icons pool
  const icons = ['Zap', 'Target', 'Flame', 'Code', 'Activity', 'Crown', 'Trophy', 'Keyboard'];

  for (let i = challenges.length + 1; i <= targetCount; i++) {
    let difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
    let targetWpm: number;
    let targetAccuracy: number;
    let xpReward: number;
    let mode: 'time' | 'words' | 'custom';
    let modeDetail: string;
    let timeSeconds: number | undefined;
    let wordCount: number | undefined;
    let customText: string | undefined;
    let icon = icons[i % icons.length];
    let badge = '🏆 Level ' + i + ' Ace';

    if (i <= 250) {
      // EASY TIER (Levels 1 - 250)
      difficulty = 'easy';
      targetWpm = 25 + Math.floor((i / 250) * 30); // 25 to 55 WPM
      targetAccuracy = 90 + Math.floor((i % 10)); // 90 to 99%
      xpReward = 100 + (i % 50);
      
      const subType = i % 3;
      if (subType === 0) {
        mode = 'time';
        timeSeconds = (i % 2 === 0) ? 15 : 30;
        modeDetail = `${timeSeconds}s Time Sprint`;
      } else if (subType === 1) {
        mode = 'words';
        wordCount = 10 + ((i % 5) * 10);
        modeDetail = `${wordCount} Words Sprint`;
      } else {
        mode = 'custom';
        customText = WORD_LISTS[i % WORD_LISTS.length];
        modeDetail = 'Word Focus Drill';
      }
    } else if (i <= 600) {
      // MEDIUM TIER (Levels 251 - 600)
      difficulty = 'medium';
      targetWpm = 50 + Math.floor(((i - 250) / 350) * 35); // 50 to 85 WPM
      targetAccuracy = 92 + (i % 7); // 92 to 98%
      xpReward = 200 + ((i - 250) % 150);

      const subType = i % 4;
      if (subType === 0) {
        mode = 'time';
        timeSeconds = 30 + ((i % 3) * 15);
        modeDetail = `${timeSeconds}s Speed Test`;
      } else if (subType === 1) {
        mode = 'words';
        wordCount = 25 + ((i % 4) * 25);
        modeDetail = `${wordCount} Words Medium Challenge`;
      } else if (subType === 2) {
        mode = 'custom';
        customText = CODE_SNIPPETS[i % CODE_SNIPPETS.length];
        modeDetail = 'Code & Syntax Snippet';
        icon = 'Code';
      } else {
        mode = 'custom';
        customText = QUOTE_SNIPPETS[i % QUOTE_SNIPPETS.length];
        modeDetail = 'Quote Wisdom Sprint';
      }
    } else if (i <= 900) {
      // HARD TIER (Levels 601 - 900)
      difficulty = 'hard';
      targetWpm = 80 + Math.floor(((i - 600) / 300) * 45); // 80 to 125 WPM
      targetAccuracy = 95 + (i % 4); // 95 to 98%
      xpReward = 450 + ((i - 600) % 250);

      const subType = i % 4;
      if (subType === 0) {
        mode = 'time';
        timeSeconds = 60 + ((i % 2) * 60);
        modeDetail = `${timeSeconds}s Endurance Sprint`;
        icon = 'Flame';
      } else if (subType === 1) {
        mode = 'words';
        wordCount = 50 + ((i % 3) * 25);
        modeDetail = `${wordCount} Words High-Speed Test`;
      } else if (subType === 2) {
        mode = 'custom';
        customText = CODE_SNIPPETS[(i * 3) % CODE_SNIPPETS.length];
        modeDetail = 'Advanced Developer Code Block';
        icon = 'Code';
      } else {
        mode = 'custom';
        customText = QUOTE_SNIPPETS[(i * 2) % QUOTE_SNIPPETS.length];
        modeDetail = 'Precision Literature Quote';
      }
    } else {
      // LEGENDARY TIER (Levels 901 - 1050)
      difficulty = 'legendary';
      targetWpm = 125 + Math.floor(((i - 900) / 150) * 40); // 125 to 165 WPM
      targetAccuracy = 97 + (i % 3); // 97 to 99%
      xpReward = 850 + ((i - 900) * 5);

      const subType = i % 3;
      if (subType === 0) {
        mode = 'time';
        timeSeconds = 15;
        modeDetail = '15s Sonic Burst';
        icon = 'Flame';
        badge = '⚡ Sonic Apex Lvl ' + i;
      } else if (subType === 1) {
        mode = 'words';
        wordCount = 25;
        modeDetail = '25 Words Grandmaster';
        icon = 'Crown';
        badge = '👑 Titan Lvl ' + i;
      } else {
        mode = 'custom';
        customText = CODE_SNIPPETS[(i * 5) % CODE_SNIPPETS.length];
        modeDetail = 'Apex Code Matrix';
        icon = 'Code';
        badge = '💻 Code Deity Lvl ' + i;
      }
    }

    challenges.push({
      id: `ch_lvl_${i}`,
      title: `Challenge Level ${i}: ${getChallengeTitle(i, difficulty)}`,
      description: `Master level ${i} by reaching ${targetWpm} WPM with ${targetAccuracy}% precision.`,
      difficulty,
      targetWpm,
      targetAccuracy,
      mode,
      modeDetail,
      timeSeconds,
      wordCount,
      customText,
      xpReward,
      icon,
      badge,
    });
  }

  return challenges;
}

function getChallengeTitle(index: number, diff: string): string {
  const easyTitles = ['Warmup Flow', 'Finger Precision', 'Key Sprint', 'Cadence Drill', 'Smooth Rhythm'];
  const medTitles = ['Velocity Boost', 'Code Matrix', 'Punctuation Ace', 'Wisdom Sprint', 'Rapid Reflex'];
  const hardTitles = ['Ninja Velocity', 'Fullstack Master', 'Sniper Accuracy', 'Endurance Surge', 'Pro Typist'];
  const legTitles = ['Sonic Apex', 'Grandmaster Titan', 'Double Century', 'Deity Speed', 'Apex Overdrive'];

  if (diff === 'easy') return easyTitles[index % easyTitles.length];
  if (diff === 'medium') return medTitles[index % medTitles.length];
  if (diff === 'hard') return hardTitles[index % hardTitles.length];
  return legTitles[index % legTitles.length];
}

export const TYPING_CHALLENGES: TypingChallenge[] = generateAllChallenges();
