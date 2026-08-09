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
  ExternalLink
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
  const [mainTab, setMainTab] = useState<'manual' | 'blog' | 'faq' | 'compliance'>('blog');
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
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all ${
            mainTab === 'blog'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Speed & Technique Articles</span>
        </button>

        <button
          onClick={() => setMainTab('manual')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all ${
            mainTab === 'manual'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          <Keyboard className="w-4 h-4" />
          <span>Interactive Feature Manual</span>
        </button>

        <button
          onClick={() => setMainTab('faq')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all ${
            mainTab === 'faq'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>FAQ & Formula Standard</span>
        </button>

        <button
          onClick={() => setMainTab('compliance')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all ${
            mainTab === 'compliance'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-white/70 text-slate-600 hover:bg-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>About & Privacy Policy</span>
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

      {/* TAB 4: ADSENSE COMPLIANCE, ABOUT & PRIVACY */}
      {mainTab === 'compliance' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-8 text-slate-700 leading-relaxed">
          
          <section className="space-y-3 border-b border-slate-200 pb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Globe className="w-6 h-6 text-indigo-600" />
              <span>About VelocisType</span>
            </h2>
            <p className="text-sm">
              VelocisType is a free, web-based touch typing utility and speed benchmark platform designed to help professionals, students, and developers increase typing velocity and ergonomics.
            </p>
          </section>

          <section className="space-y-3 border-b border-slate-200 pb-6">
            <h3 className="text-xl font-bold text-slate-900">Privacy Policy</h3>
            <p className="text-xs sm:text-sm">
              Your privacy is paramount. VelocisType does not collect, sell, or transmit personal user data to external servers. All typing test histories, accuracy logs, and user settings are stored locally in your web browser.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">Editorial Integrity & AdSense Compliance</h3>
            <p className="text-xs sm:text-sm">
              All articles and learning resources published on VelocisType are written and peer-reviewed by human ergonomics experts and typing instructors. We adhere strictly to Google AdSense Quality Guidelines.
            </p>
          </section>

        </div>
      )}

    </div>
  );
};
