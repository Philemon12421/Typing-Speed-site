import { DrillPreset, DifficultyLevel, QuoteLength } from '../types';

export const SIMPLE_WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "it", "for", "not", "on", "with",
  "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if",
  "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just",
  "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see",
  "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back",
  "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "day",
  "hand", "part", "small", "place", "live", "where", "after", "back", "little", "round", "man", "year",
  "came", "show", "every", "good", "me", "give", "our", "under", "name", "very", "through", "just",
  "form", "sentence", "great", "think", "say", "help", "low", "line", "differ", "turn", "cause", "much",
  "mean", "before", "move", "right", "boy", "old", "too", "same", "tell", "does", "set", "three", "want",
  "air", "well", "also", "play", "small", "end", "put", "home", "read", "hand", "port", "large", "spell",
  "add", "even", "land", "here", "must", "big", "high", "such", "follow", "act", "why", "ask", "men",
  "change", "went", "light", "kind", "off", "need", "house", "picture", "try", "us", "again", "animal",
  "point", "mother", "world", "near", "build", "self", "earth", "father", "head", "stand", "own", "page",
  "should", "country", "found", "answer", "school", "grow", "study", "still", "learn", "plant", "cover"
];

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

export const EXPERT_WORDS = [
  "asynchronous", "juxtaposition", "polymorphism", "labyrinthine", "cryptography", "synthesizer",
  "quintessential", "microservice", "infrastructure", "concurrency", "phenomenon", "idiosyncrasy",
  "serendipity", "kaleidoscope", "paradigm", "trajectory", "orchestration", "pseudocode",
  "vulnerability", "equilibrium", "hierarchical", "fluorescence", "ubiquitous", "bureaucracy",
  "idempotent", "middleware", "immutability", "declarative", "imperative", "encapsulation",
  "synchronization", "dichotomy", "ephemeral", "anachronism", "hyperboloid", "quizzical",
  "flabbergasted", "ineffable", "circumspect", "magnanimous", "resilience", "surreptitious",
  "metamorphosis", "procrastination", "vicarious", "soliloquy", "mnemonic", "obfuscation",
  "quintessence", "algorithm", "bandwidth", "cybersecurity", "decentralized", "fingerprinting",
  "hexadecimal", "iteration", "json_parse", "kernel_panic", "logarithmic", "microcontroller",
  "neural_network", "optimization", "parallelism", "quantum_leap", "refactoring", "state_machine",
  "telemetry", "user_interface", "virtualization", "webassembly", "xenotransplant", "yield_curve",
  "zero_knowledge", "backpropagation", "coefficient", "deterministic", "electromagnetism"
];

export const QUOTES_BY_DIFFICULTY: Record<DifficultyLevel, Record<QuoteLength, string[]>> = {
  simple: {
    short: [
      "Simplicity is the soul of efficiency.",
      "Do what you can with what you have where you are.",
      "Small daily improvements lead to great results.",
      "The only way to do great work is to love what you do.",
      "Stay true to your path and keep your mind open.",
      "Fast typing is about smooth flow and steady hands."
    ],
    medium: [
      "Touch typing turns your keyboard into a smooth tool for your thoughts, making ideas move from mind to screen with ease.",
      "The secret of getting ahead is simply getting started. Break big tasks into small easy steps and take them one by one.",
      "Good habits build strength over time. Keep your fingers calm, stay relaxed, and velocity will naturally follow every single day."
    ],
    long: [
      "In the quiet space between each key strike, focus is born. Each letter typed with calm intent builds a rhythm that turns typing into a peaceful flow. Master the home row, keep your wrists light, and speed will grow steadily without strain."
    ]
  },
  moderate: {
    short: [
      "Simplicity is prerequisite for reliability. Write clean code.",
      "Fast typing is not about rushing; it is about smooth accuracy.",
      "Work smart & stay focused: \"precision beats velocity\" every time!",
      "Contact support @team for £50 discount & 100% satisfaction.",
      "Any fool can write code that computers understand. Strive for clarity."
    ],
    medium: [
      "Touch typing turns your keyboard into a seamless extension of your thoughts, eliminating the barrier between mind and screen.",
      "The secret of getting ahead is getting started. Break overwhelming tasks into \"small, manageable steps\" & execute with confidence.",
      "Mastery in typing requires consistency over speed. Email @admin or balance £100 budgets with 100% precision & zero typos.",
      "Remember: \"speed is a byproduct of precision\". When typing symbols like @, £, &, and \"quotes\", keep your wrists relaxed."
    ],
    long: [
      "In the quiet space between keypresses, true focus is cultivated. Each letter struck with intention builds a rhythm that transforms chaotic typing into an elegant dance across the keyboard. Master the fundamentals, honor the home row, and velocity will naturally follow.",
      "Programming is not just about writing code; it is about communicating logic to machines and clarity to fellow humans. High typing speed paired with zero error tolerance allows developers to stay in the zone without breaking creative flow."
    ]
  },
  expert: {
    short: [
      "const fn = async (req, res) => { return res.status(200).json({ ok: true, cost: '£150.00' }); };",
      "Debug @scale: [x, y, z] => ({ id: '#9021', rate: 99.85%, token: \"OAuth_Bearer_7a&f\" });",
      "Deploying microservice_v2.4 to cluster: `kubectl apply -f ./k8s/deployment.yaml` --wait=true & exit;",
      "Professional workflows require: \"quotes\", £250 & $500 balance sheets, and complex #tags!"
    ],
    medium: [
      "Architectural resilience requires idempotent microservices: parse JSON schema, validate payload @runtime, handle concurrency locks, and return HTTP 422 for malformed regex /^[a-z0-9_.-]+@[a-z0-9-]+\\.[a-z]{2,}$/i patterns.",
      "Professional engineering requires mastering irregular symbols: \"double_quotes\", email addresses like dev@typerca.internal, financial ledgers with £2,500.00 & $5,000.00 benchmarks, and boolean logic like (x && y) || !z.",
      "Modern WebAssembly pipelines execute near native speed: compile rust-core to *.wasm, bind memory buffers via SharedArrayBuffer, and minimize garbage collection pauses with zero-copy deserialization."
    ],
    long: [
      "Modern full-stack architectures balance asynchronous event loops with rigorous type safety: interface StateRecord<T> { readonly id: string; payload: T[]; is_active: boolean; timestamp: number; } // Ensure mutex locks prevent race conditions across parallel worker threads. Benchmark execution times: average latency <= 12.5ms with 99.99% uptime SLA and zero memory leaks!",
      "Professional workflows demand total keyboard mastery: striking rare characters like `~`, `!`, `@`, `#`, `$`, `%`, `^`, `&`, `*`, `(`, `)`, `_`, `+`, `{`, `}`, `[`, `]`, `|`, `\\`, `:`, `;`, `\"`, `'`, `<`, `>`, `?`, `/` without looking away from high-density terminal consoles or complex IDE configurations."
    ]
  }
};

export const QUOTES = QUOTES_BY_DIFFICULTY.moderate;

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
    id: 'symbols_common',
    title: 'Common Symbols (@, £, ", &, #)',
    category: 'symbols',
    description: 'Practice everyday symbols including quotes, email handles, currency, and ampersands.',
    fingerFocus: 'Shift combinations & pinky reaches',
    text: '"speed & focus" @team £50 #1 test & "accuracy" £25 @user cats & dogs £100 "flow" & steady!',
    iconName: 'Layers'
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
