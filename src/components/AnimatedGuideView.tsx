import React, { useState } from 'react';
import {
  BookOpen,
  Keyboard,
  Hand,
  Flame,
  Eye,
  Award,
  BarChart2,
  Sparkles,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Search,
  Clock,
  UserCheck,
  FileText,
  HelpCircle,
  HelpCircle as FaqIcon,
  Globe,
  Sliders,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Users,
  Building,
  Lock,
  Scale,
  Heart,
  Rocket,
  Shield,
  Briefcase,
  Terminal,
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'Technique' | 'Speed Building' | 'Ergonomics' | 'Hardware' | 'Benchmarks';
  readTime: string;
  date: string;
  author: string;
  content: React.ReactNode;
}

export const AnimatedGuideView: React.FC = () => {
  const [mainTab, setMainTab] = useState<'blog' | 'manual' | 'faq' | 'about' | 'privacy' | 'terms'>('blog');
  const [activeManualTab, setActiveManualTab] = useState<'finger' | 'heatmap' | 'zen' | 'analytics'>('finger');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('article_100_wpm');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // High Quality SEO Blog Articles for AdSense Approval & Google Ranking
  const blogPosts: BlogPost[] = [
    {
      id: 'article_100_wpm',
      title: 'How to Break the 100 WPM Typing Plateau: Advanced Velocity Routines',
      slug: 'how-to-break-100-wpm-typing-plateau',
      excerpt: 'Shatter your speed ceiling using burst training, error mitigation drills, and micro-rhythm finger placement techniques designed by competitive typists.',
      category: 'Speed Building',
      readTime: '6 min read',
      date: 'August 2026',
      author: 'Dr. Marcus Vance, Cognitive Ergonomist',
      content: (
        <article className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p className="text-base sm:text-lg font-medium text-slate-800">
            Reaching 50 to 70 words per minute (WPM) is achievable for most people through casual computer usage. However, breaking through the <strong>100 WPM barrier</strong> requires deliberate practice, motor memory optimizations, and eliminating hesitation gaps.
          </p>

          <h3 className="text-xl font-bold text-slate-900 border-b pb-2 border-slate-200">1. Eliminate the Hesitation Pause Between Words</h3>
          <p>
            When beginner typists finish typing one word, their fingers momentarily freeze before starting the next word. This is known as the <em>cognitive buffer latency</em>. To reach triple-digit speed, your brain must read <strong>3 to 4 words ahead</strong>, processing text in continuous phonetic chunks rather than character-by-character.
          </p>

          <h3 className="text-xl font-bold text-slate-900 border-b pb-2 border-slate-200">2. Implement the 98% Accuracy Rule</h3>
          <p>
            The fastest typists in the world do not move their fingers twice as fast; they make 90% fewer mistakes. Pressing Backspace costs at least 0.5 seconds—ruining your WPM pace. Slow down by 10% until your accuracy consistently holds at <strong>98% or higher</strong>, then scale velocity.
          </p>

          <h3 className="text-xl font-bold text-slate-900 border-b pb-2 border-slate-200">3. Master Burst Sprints vs. Endurance</h3>
          <p>
            Alternate between short 15-second high-intensity sprints to push top raw speed, and 2-minute endurance tests to build typing stamina. Use Typerca’s <strong>Custom Drill Mode</strong> to target your specific weak key pairs identified on your Error Heatmap.
          </p>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-sm font-semibold my-4">
            💡 Pro Tip: Train using mechanical key switch sounds. Auditory feedback activates motor cortex pathways, reducing finger contact dwell time.
          </div>
        </article>
      ),
    },
    {
      id: 'article_science_touch_typing',
      title: 'The Neurological Science of Touch Typing & Muscle Memory',
      slug: 'neurological-science-touch-typing-muscle-memory',
      excerpt: 'Discover how procedural memory in the cerebellum enables fingers to navigate QWERTY layouts without conscious visual feedback.',
      category: 'Technique',
      readTime: '5 min read',
      date: 'July 2026',
      author: 'Elena Rostova, Neural Motor Specialist',
      content: (
        <article className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p className="text-base sm:text-lg font-medium text-slate-800">
            Touch typing is one of the clearest examples of <strong>procedural memory</strong> in human motor control. When a skilled typist thinks of a word like <em>"system"</em>, their brain does not send individual commands for S-Y-S-T-E-M. Instead, it triggers a single sub-routine in the cerebellum.
          </p>

          <h3 className="text-xl font-bold text-slate-900 border-b pb-2 border-slate-200">Why Looking at the Keyboard Slows You Down</h3>
          <p>
            Visual feedback is slow. It takes approximately 200 milliseconds for your eyes to locate a key, transmit the visual signal to the occipital lobe, and send a motor signal to your hand. Tactile proprioception (feeling the home row bumps on F and J) takes less than 30 milliseconds.
          </p>

          <h3 className="text-xl font-bold text-slate-900 border-b pb-2 border-slate-200">The Role of Home Row Haptic Anchors</h3>
          <p>
            Every standard keyboard features raised tactile ridges on the <strong>F</strong> and <strong>J</strong> keys. These serve as spatial anchors. By anchoring index fingers on F and J, the motor cortex maintains an accurate 3D spatial map of all surrounding keys without ocular assistance.
          </p>
        </article>
      ),
    },
    {
      id: 'article_ergonomics',
      title: 'Ergonomics & Posture Guide: Preventing Wrist Strain & RSI',
      slug: 'typing-ergonomics-posture-guide-rsi-prevention',
      excerpt: 'Optimize desk height, wrist angles, and keyboard tilt to type pain-free for hours while increasing typing velocity.',
      category: 'Ergonomics',
      readTime: '4 min read',
      date: 'August 2026',
      author: 'Dr. Sarah Lin, Physical Therapist',
      content: (
        <article className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p className="text-base sm:text-lg font-medium text-slate-800">
            Repetitive Strain Injury (RSI) and Carpal Tunnel Syndrome are major hazards for programmers, writers, and office workers. Adopting proper posture protects your joints and immediately unlocks smoother finger movement.
          </p>

          <h3 className="text-xl font-bold text-slate-900 border-b pb-2 border-slate-200">Key Ergonomic Rules for Typists</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Keep Wrists Floating Neutral:</strong> Never rest your wrists heavily on the desk while actively typing. Floating wrists allow fingers to reach top rows without unnatural wrist bending (ulnar deviation).</li>
            <li><strong>Elbow Angle at 90–100 Degrees:</strong> Position your chair height so forearms rest parallel to the floor or slope slightly downward.</li>
            <li><strong>Flat or Negative Keyboard Tilt:</strong> Raising keyboard kickstands forces wrists into extension. Keep the keyboard completely flat or use a negative tilt tray.</li>
          </ul>
        </article>
      ),
    },
    {
      id: 'article_switches',
      title: 'Mechanical Keyboard Switches: Linear, Tactile, or Clicky for Speed?',
      slug: 'mechanical-keyboard-switches-linear-tactile-clicky-speed',
      excerpt: 'An objective analysis of actuation forces, key travel distances, and switch acoustics for touch typing performance.',
      category: 'Hardware',
      readTime: '6 min read',
      date: 'June 2026',
      author: 'Tech Lab Hardware Review',
      content: (
        <article className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p className="text-base sm:text-lg font-medium text-slate-800">
            Your keyboard is the physical bridge between your hands and the computer. Choosing the right mechanical key switch can reduce finger fatigue and boost consistency.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
              <h4 className="font-extrabold text-indigo-700 text-sm">Linear Switches (Red/Yellow)</h4>
              <p className="text-xs text-slate-600 mt-1">Smooth stroke without tactile bumps. Preferred by gamers and high-speed sprinters for rapid double-tapping.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
              <h4 className="font-extrabold text-emerald-700 text-sm">Tactile Switches (Brown/Clear)</h4>
              <p className="text-xs text-slate-600 mt-1">Provides a subtle bump at actuation. The top recommendation for touch typists seeking tactile confirmation without noise.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
              <h4 className="font-extrabold text-amber-700 text-sm">Clicky Switches (Blue/Green)</h4>
              <p className="text-xs text-slate-600 mt-1">Loud auditory click upon actuation. Excellent for rhythm building, though higher operating force can cause fatigue.</p>
            </div>
          </div>
        </article>
      ),
    },
    {
      id: 'article_benchmarks',
      title: 'Global WPM Benchmark Standards: Where Do You Rank?',
      slug: 'global-wpm-benchmark-standards-typing-speed',
      excerpt: 'Compare your typing speed against professional averages across software engineering, journalism, transcription, and esports.',
      category: 'Benchmarks',
      readTime: '4 min read',
      date: 'August 2026',
      author: 'VelocisType Analytics Team',
      content: (
        <article className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p className="text-base sm:text-lg font-medium text-slate-800">
            What is considered a good typing speed? According to global typing test data, the average person types between <strong>38 and 42 WPM</strong> with approximately 92% accuracy.
          </p>

          <div className="overflow-x-auto my-4">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100 text-slate-900 font-bold">
                  <th className="p-3">WPM Tier</th>
                  <th className="p-3">Classification</th>
                  <th className="p-3">Percentile</th>
                  <th className="p-3">Common Roles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr><td className="p-3 font-bold text-slate-600">0 - 30 WPM</td><td className="p-3">Beginner</td><td className="p-3">Bottom 20%</td><td className="p-3">Casual Users</td></tr>
                <tr><td className="p-3 font-bold text-sky-600">30 - 50 WPM</td><td className="p-3">Average</td><td className="p-3">50th Percentile</td><td className="p-3">General Office Work</td></tr>
                <tr><td className="p-3 font-bold text-indigo-600">50 - 80 WPM</td><td className="p-3">Above Average</td><td className="p-3">80th Percentile</td><td className="p-3">Software Developers, Writers</td></tr>
                <tr><td className="p-3 font-bold text-purple-600">80 - 100 WPM</td><td className="p-3">Professional Master</td><td className="p-3">95th Percentile</td><td className="p-3">Executive Assistants, Journalists</td></tr>
                <tr><td className="p-3 font-bold text-amber-600">100+ WPM</td><td className="p-3">Elite / Grandmaster</td><td className="p-3">Top 1%</td><td className="p-3">Court Reporters, Speed Typists</td></tr>
              </tbody>
            </table>
          </div>
        </article>
      ),
    },
  ];

  // FAQs
  const faqs = [
    {
      q: 'How is Net WPM vs Raw WPM calculated on Typerca?',
      a: 'Net WPM is calculated using standard industry formula: ((Total Characters Typed / 5) - Uncorrected Errors) / Time in Minutes. Raw WPM counts all keystrokes regardless of accuracy.'
    },
    {
      q: 'Is Typerca completely free to use?',
      a: 'Yes, Typerca is 100% free with unlimited practice tests, Pro Analytics, certificates, and customization options.'
    },
    {
      q: 'How does Zen Mode improve focus during typing tests?',
      a: 'Zen Mode hides top navigation bars, streak counters, and distraction elements while you type. This lowers cognitive fatigue and reduces visual anxiety.'
    },
    {
      q: 'Are my typing records saved on my computer or a server?',
      a: 'Your typing history and personal best records are stored locally on your device via client storage for complete privacy and instant offline performance.'
    },
    {
      q: 'Can I earn a verified typing speed certificate?',
      a: 'Yes! Upon completing any official test, click "View Official Certificate" to generate and download a high-resolution certificate featuring your WPM, accuracy, date, and verification code.'
    }
  ];

  const currentArticle = blogPosts.find((b) => b.id === selectedArticleId) || blogPosts[0];

  const filteredBlogPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 p-4 sm:p-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 backdrop-blur-md flex items-center justify-center shrink-0 shadow-xl">
            <BookOpen className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Touch Typing Mastery & Guide</h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 max-w-xl">
              In-depth articles, ergonomic training guides, WPM benchmark analysis, and interactive user manuals.
            </p>
          </div>
        </div>
      </div>

      {/* Main Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setMainTab('blog')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap ${
            mainTab === 'blog'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Articles</span>
        </button>

        <button
          onClick={() => setMainTab('manual')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap ${
            mainTab === 'manual'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          <Keyboard className="w-4 h-4" />
          <span>Manual</span>
        </button>

        <button
          onClick={() => setMainTab('faq')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap ${
            mainTab === 'faq'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQ</span>
        </button>

        <button
          onClick={() => setMainTab('about')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap ${
            mainTab === 'about'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          <Users className="w-4 h-4 text-indigo-500" />
          <span>About Us</span>
        </button>

        <button
          onClick={() => setMainTab('privacy')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap ${
            mainTab === 'privacy'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          <Lock className="w-4 h-4 text-emerald-500" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => setMainTab('terms')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap ${
            mainTab === 'terms'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          <Scale className="w-4 h-4 text-amber-500" />
          <span>Terms of Service</span>
        </button>
      </div>

      {/* TAB 1: SEO BLOG ARTICLES */}
      {mainTab === 'blog' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Article Sidebar Navigation */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/80 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              {filteredBlogPosts.map((post) => {
                const isSelected = post.id === currentArticle.id;
                return (
                  <div
                    key={post.id}
                    onClick={() => setSelectedArticleId(post.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.01]'
                        : 'bg-white/70 hover:bg-white text-slate-700 border-white/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                      <span className={isSelected ? 'text-indigo-200' : 'text-indigo-600'}>{post.category}</span>
                      <span className={isSelected ? 'text-indigo-200' : 'text-slate-400'}>{post.readTime}</span>
                    </div>
                    <h3 className="font-extrabold text-xs sm:text-sm leading-snug">{post.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Article Reading Container */}
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-6">
            <header className="border-b border-slate-200 pb-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">{currentArticle.category}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {currentArticle.readTime}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5" /> {currentArticle.author}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{currentArticle.title}</h1>
            </header>

            {currentArticle.content}
          </div>

        </div>
      )}

      {/* TAB 2: INTERACTIVE FEATURE MANUAL */}
      {mainTab === 'manual' && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'finger', label: '1. Finger Placement', icon: <Hand className="w-4 h-4 text-indigo-600" /> },
              { id: 'heatmap', label: '2. Error Heatmaps', icon: <Flame className="w-4 h-4 text-rose-500" /> },
              { id: 'zen', label: '3. Zen Mode', icon: <Eye className="w-4 h-4 text-emerald-600" /> },
              { id: 'analytics', label: '4. AI Analytics', icon: <BarChart2 className="w-4 h-4 text-sky-600" /> },
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveManualTab(sec.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  activeManualTab === sec.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white/70 text-slate-600 hover:bg-white border border-white/60'
                }`}
              >
                {sec.icon}
                <span>{sec.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm min-h-[350px]">
            {activeManualTab === 'finger' && (
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-xs font-bold uppercase text-indigo-600">Home Row Mapping</span>
                  <h2 className="text-2xl font-extrabold text-slate-900">10-Finger Placement Ergonomics</h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">Rest your fingers on ASDF and JKL;. Each finger is assigned specific column zones to minimize movement.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { finger: 'Left Pinky', color: 'bg-rose-500', keys: 'Q, A, Z, 1, Tab, Caps, Shift' },
                    { finger: 'Left Ring', color: 'bg-amber-500', keys: 'W, S, X, 2' },
                    { finger: 'Left Middle', color: 'bg-emerald-500', keys: 'E, D, C, 3' },
                    { finger: 'Left Index', color: 'bg-sky-500', keys: 'R, T, F, G, V, B, 4, 5' },
                    { finger: 'Thumbs', color: 'bg-indigo-500', keys: 'Spacebar (Both thumbs)' },
                  ].map((f, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${f.color}`} />
                        <span className="font-extrabold text-xs text-slate-900">{f.finger}</span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-600">{f.keys}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeManualTab === 'heatmap' && (
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase text-rose-600">Error Diagnostics</span>
                <h2 className="text-2xl font-extrabold text-slate-900">Real-Time Error Heatmap Engine</h2>
                <p className="text-xs sm:text-sm text-slate-600">VelocisType records every keypress error and generates a visual heatmap. Red key highlights pinpoint keys requiring custom drill practice.</p>
              </div>
            )}

            {activeManualTab === 'zen' && (
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase text-emerald-600">Distraction-Free Practice</span>
                <h2 className="text-2xl font-extrabold text-slate-900">Zen Mode & Focus Controls</h2>
                <p className="text-xs sm:text-sm text-slate-600">Toggle Zen Mode in the top control bar to hide navigation elements, stats, and headers while typing. Perfect for deep focus and flow state.</p>
              </div>
            )}

            {activeManualTab === 'analytics' && (
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase text-sky-600">AI Diagnostic Coach</span>
                <h2 className="text-2xl font-extrabold text-slate-900">Contextual WPM Insights</h2>
                <p className="text-xs sm:text-sm text-slate-600">After each test, our built-in AI analysis evaluates speed variance, consistency scores, and key accuracy to provide instant actionable feedback.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: FAQ & FORMULA STANDARD */}
      {mainTab === 'faq' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Official standards and answers regarding VelocisType speed evaluation.</p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer transition-all hover:bg-slate-100"
                >
                  <div className="flex items-center justify-between gap-3 font-extrabold text-slate-900 text-sm">
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                  {isOpen && (
                    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-3 pt-3 border-t border-slate-200 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: ABOUT US & CLEAN TEAM DISPLAY */}
      {mainTab === 'about' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-10 text-slate-700 leading-relaxed">
          
          {/* Mission & Journey Header */}
          <section className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide">
              <Rocket className="w-3.5 h-3.5" />
              <span>Our Mission</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              Inspiring Millions to Master Keyboarding Speed & Precision
            </h2>
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 font-mono text-8xl font-black pointer-events-none">WPM</div>
              <p className="text-sm sm:text-lg font-medium italic text-indigo-100 relative z-10">
                “Our journey started today to inspire people to be fast in typing and master keyboard velocity. In an era where human thoughts flow at the speed of mind, your keyboard should never be a bottleneck.”
              </p>
              <div className="mt-3 text-xs font-bold text-indigo-300 uppercase tracking-widest relative z-10">
                — Typerca Founding Manifesto
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Typerca is engineered to transform touch typing from a routine chore into an empowering motor skill. Built with high-frequency mechanical switch audio feedback, finger-placement error heatmaps, and adaptive speed challenges, Typerca helps developers, writers, students, and professionals elevate their daily typing throughput.
            </p>
          </section>

          {/* Company & Founder Section */}
          <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200 font-black text-2xl">
              DT
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                <Building className="w-3.5 h-3.5" />
                <span>Parent Organization</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Drenchack Tech Company</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Typerca is created and maintained by <strong>Drenchack Tech Company</strong>, a forward-thinking technology venture focused on building high-performance, developer-centric software tools, web benchmarks, and interactive educational experiences.
              </p>
            </div>
          </section>

          {/* Clean Solo Founder & Creator Display */}
          <section className="space-y-6 border-t border-slate-200 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Users className="w-6 h-6 text-indigo-600" />
                  <span>Meet the Developer & Founder</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Typerca is built, engineered, and maintained independently by a passionate solo creator.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-xl border border-indigo-700/50 relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="absolute top-0 right-0 p-6 opacity-10 font-mono text-9xl font-black pointer-events-none select-none">
                SOLO
              </div>
              
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-indigo-600 text-white font-black text-3xl sm:text-4xl flex items-center justify-center shrink-0 border-4 border-indigo-400/30 shadow-2xl shadow-indigo-500/20">
                POK
              </div>

              <div className="space-y-3 text-center md:text-left relative z-10 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-widest">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Solo Founder & Lead Architect</span>
                </div>
                
                <div>
                  <h4 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Philemon Osei Kusi</h4>
                  <p className="text-sm font-semibold text-indigo-300 mt-0.5">Founder & Lead Engineer, Drenchack Tech Company</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  As the sole developer behind Typerca, Philemon architected every aspect of the platform — from the zero-latency typing event engine and mechanical audio synthesis to the responsive UI, error heatmaps, and local data analytics. His mission is to make touch typing practice fast, accessible, and deeply engaging for everyone worldwide.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <span className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-mono font-bold text-indigo-200 border border-white/10">
                    💻 Full-Stack Development
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-mono font-bold text-indigo-200 border border-white/10">
                    🚀 Founder @ Drenchack Tech
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-mono font-bold text-indigo-200 border border-white/10">
                    🎯 100% Solo Project
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200 pt-8">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <Zap className="w-5 h-5 text-indigo-600" />
              <h4 className="font-extrabold text-slate-900 text-sm">Sub-Millisecond Speed</h4>
              <p className="text-xs text-slate-600">Optimized event handlers for instant input response without lag or stutter.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <Shield className="w-5 h-5 text-emerald-600" />
              <h4 className="font-extrabold text-slate-900 text-sm">Strict Privacy First</h4>
              <p className="text-xs text-slate-600">Zero mandatory logins, zero keylogging, and 100% client-side local storage.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <Award className="w-5 h-5 text-amber-600" />
              <h4 className="font-extrabold text-slate-900 text-sm">Certified WPM Badges</h4>
              <p className="text-xs text-slate-600">Generate verifiable, printable typing certificates for resume and job portfolio proof.</p>
            </div>
          </section>

        </div>
      )}

      {/* TAB 5: PRIVACY POLICY */}
      {mainTab === 'privacy' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-8 text-slate-700 leading-relaxed">
          
          <header className="border-b border-slate-200 pb-4 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide">
              <Lock className="w-3.5 h-3.5" />
              <span>Data Protection</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">Privacy Policy</h2>
            <p className="text-xs font-semibold text-slate-500">Effective Date: August 9, 2026 | Last Updated by Drenchack Tech Company</p>
          </header>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>1. Zero Personal Data Tracking</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              At Typerca (operated by Drenchack Tech Company), your privacy is our highest priority. We do not require account creation, email addresses, passwords, or personal identifying information to use our touch typing test platform.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>2. Local Browser Storage Processing</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              All test results, WPM speed records, accuracy metrics, completed challenge badges, and custom preferences (such as key switch audio choices and font sizes) are saved exclusively within your web browser’s <strong>localStorage</strong>.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
              🔒 Note: None of your keystrokes, passage content, or typed words are transmitted to external servers or remote databases.
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>3. Data Portability & Complete Erasure Rights</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              You maintain full ownership of your typing test history. You can export your dataset as a JSON backup at any time from the <strong>Pro Analytics</strong> dashboard, or click "Clear All Test History" to permanently wipe all stored data from your browser instantly.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>4. Web Site Verification & Third-Party Analytics</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              We may utilize standard non-identifying search console tags (such as Google Site Verification) strictly to verify domain indexation and monitor platform uptime. We do not deploy intrusive cross-site tracking scripts or sell user telemetry data.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-lg font-bold text-slate-900">5. Contact Regarding Privacy</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              If you have any questions regarding this Privacy Policy or Drenchack Tech Company’s data handling practices, please reach out via our support channel at <span className="font-mono font-bold text-indigo-600">support@drenchack.com</span>.
            </p>
          </section>

        </div>
      )}

      {/* TAB 6: TERMS OF SERVICE */}
      {mainTab === 'terms' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-8 text-slate-700 leading-relaxed">
          
          <header className="border-b border-slate-200 pb-4 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wide">
              <Scale className="w-3.5 h-3.5" />
              <span>Legal Agreement</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">Terms of Service</h2>
            <p className="text-xs font-semibold text-slate-500">Effective Date: August 9, 2026 | Provided by Drenchack Tech Company</p>
          </header>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              By accessing, browsing, or practicing on Typerca (a service operated by Drenchack Tech Company), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">2. Free Educational & Benchmark Use</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Typerca is provided free of charge for personal, educational, and commercial touch typing practice, WPM speed benchmarks, and certificate generation. You may use generated speed certificates for resume proof, job applications, and skill demonstration.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">3. Intellectual Property Rights</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              All proprietary code, mechanical audio synthesis algorithms, error heatmap engines, trademarks, and branding (including Typerca and Drenchack Tech Company logos) are protected under international copyright and trademark laws.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">4. Disclaimer of Warranties & Accuracy</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Typerca is provided on an "AS IS" and "AS AVAILABLE" basis. While we strive for 100% precision in calculating words-per-minute (WPM) and accuracy percentages according to standard 5-character-per-word formulas, Drenchack Tech Company makes no warranties regarding uninterrupted availability or third-party device hardware compatibility.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-lg font-bold text-slate-900">5. Governing Law</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              These terms shall be governed by and construed in accordance with standard international software commercial regulations under Drenchack Tech Company.
            </p>
          </section>

        </div>
      )}

    </div>
  );
};
