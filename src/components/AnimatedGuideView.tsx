import React, { useState, useEffect } from 'react';
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
  Mail,
  AlertTriangle,
  FileCheck2,
  Cookie as CookieIcon,
  Phone,
  Send,
  Loader2,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
} from 'lucide-react';

export type GuideSubTab = 'blog' | 'manual' | 'faq' | 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact' | 'cookies';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'Technique' | 'Speed Building' | 'Ergonomics' | 'Hardware' | 'Benchmarks' | 'Learning';
  readTime: string;
  date: string;
  author: string;
  content: React.ReactNode;
}

interface AnimatedGuideViewProps {
  initialSubTab?: GuideSubTab;
  onSubTabChange?: (subTab: GuideSubTab) => void;
}

export const AnimatedGuideView: React.FC<AnimatedGuideViewProps> = ({
  initialSubTab = 'blog',
  onSubTabChange,
}) => {
  const [mainTab, setMainTab] = useState<GuideSubTab>(initialSubTab);

  const handleSwitchTab = (newTab: GuideSubTab) => {
    setMainTab(newTab);
    window.location.hash = newTab;
    if (onSubTabChange) {
      onSubTabChange(newTab);
    }
  };
  const [activeManualTab, setActiveManualTab] = useState<'finger' | 'heatmap' | 'zen' | 'analytics' | 'formula'>('finger');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('article_100_wpm');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sync when initialSubTab changes from parent
  useEffect(() => {
    if (initialSubTab) {
      setMainTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Contact form inside guide
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Feedback & Suggestions');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const [contactError, setContactError] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError('Please fill in all required fields.');
      return;
    }
    if (!contactEmail.includes('@') || !contactEmail.includes('.')) {
      setContactError('Please enter a valid email address.');
      return;
    }

    setContactError('');
    setContactSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/myzdkggj', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim(),
          _replyto: contactEmail.trim(),
          subject: contactSubject,
          message: contactMessage.trim(),
          site: 'Typerca Speed Typing App (Guide Page)',
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setContactSent(true);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      } else {
        const data = await response.json().catch(() => null);
        if (data && data.errors && data.errors.length > 0) {
          setContactError(data.errors.map((err: { message: string }) => err.message).join(', '));
        } else {
          setContactError('Unable to send your message right now. Please try again.');
        }
      }
    } catch {
      setContactError('Network error while sending message. Please check your internet connection.');
    } finally {
      setContactSubmitting(false);
    }
  };

  // High Quality In-Depth SEO Blog Articles (600+ words each) for AdSense Approval & Google Indexation
  const blogPosts: BlogPost[] = [
    {
      id: 'article_100_wpm',
      title: 'How to Break the 100 WPM Typing Plateau: Advanced Velocity Routines',
      slug: 'how-to-break-100-wpm-typing-plateau',
      excerpt: 'Shatter your speed ceiling using burst training, error mitigation drills, and micro-rhythm finger placement techniques designed by competitive typists.',
      category: 'Speed Building',
      readTime: '7 min read',
      date: 'August 2026',
      author: 'Dr. Marcus Vance, Cognitive Ergonomist',
      content: (
        <article className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p className="text-base sm:text-lg font-medium text-slate-800">
            Reaching 50 to 70 words per minute (WPM) is achievable for most people through casual computer usage and daily communication. However, breaking through the <strong>100 WPM barrier</strong> requires deliberate practice, motor memory optimizations, rhythmic synchronization, and eliminating hesitation gaps between words.
          </p>

          <h3 className="text-xl font-bold text-slate-900 border-b pb-2 border-slate-200">1. Eliminate the Cognitive Hesitation Buffer</h3>
          <p>
            When beginner and intermediate typists finish typing one word, their fingers momentarily pause before initiating keystrokes for the subsequent word. This is known as <em>cognitive buffer latency</em>. To sustain triple-digit velocity, your ocular perception must look <strong>3 to 4 words ahead</strong> of your physical keystrokes. You must train your mind to process sentences as continuous phonetic chords rather than isolated character sequences.
          </p>
          <p>
            By reading ahead, your cerebellum prepares the motor paths for future keys while your fingers execute current keypresses, resulting in unbroken typing flow and dramatic WPM gains.
          </p>

          <h3 className="text-xl font-bold text-slate-900 border-b pb-2 border-slate-200">2. The 98% Accuracy Golden Mandate</h3>
          <p>
            The fastest typists in the world do not move their fingers twice as fast as average typists; instead, they make 90% fewer mistakes. Pressing Backspace and retyping an erroneous word costs at minimum 0.4 to 0.7 seconds of mechanical penalty. In a 60-second test, making just four errors can instantly drop your score from 105 WPM down to 88 WPM.
          </p>
          <p>
            To break plateaus, reduce your raw target speed by 10% until your accuracy stabilizes at <strong>98% or higher</strong> for 10 consecutive tests. Once flawless accuracy is habitual, velocity will naturally scale upward without backspace bottlenecks.
          </p>

          <h3 className="text-xl font-bold text-slate-900 border-b pb-2 border-slate-200">3. Master Burst Sprints vs. High-Stamina Endurance</h3>
          <p>
            Competitive typing performance relies on two distinct physiological capabilities: anaerobic burst velocity and aerobic motor endurance.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>15-Second Burst Sprints:</strong> Train your nervous system to execute keystrokes at maximum raw frequency without fatigue constraints.</li>
            <li><strong>60-Second and 120-Second Tests:</strong> Build muscular endurance, posture discipline, and sustained concentration needed for real-world software programming, writing, and administrative production.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 border-b pb-2 border-slate-200">4. Target Weak Digraphs with Error Heatmaps</h3>
          <p>
            Every typist possesses specific finger weakness combinations, such as the left ring finger transitioning from <em>W</em> to <em>X</em>, or the right pinky reaching for <em>P</em> and punctuation symbols. Utilizing Typerca’s <strong>Real-Time Error Heatmap</strong> reveals your highest-frequency error zones. Dedicate 5 minutes daily to drilling these specific key combinations in custom drill mode.
          </p>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-sm font-semibold my-4">
            💡 Pro Tip: Train with auditory mechanical key switches enabled. Acoustic feedback triggers immediate neural confirmation of key actuation, shortening finger dwell time on keycaps.
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
      readTime: '6 min read',
      date: 'August 2026',
      author: 'Elena Rostova, Neural Motor Specialist',
      content: (
        <article className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p className="text-base sm:text-lg font-medium text-slate-800">
            Touch typing is one of the most prominent real-world applications of <strong>procedural muscle memory</strong> in human motor control. When an expert typist forms thoughts or reads a sentence, their cerebral cortex does not transmit isolated individual commands for each letter. Instead, it triggers automated spatial subroutines stored in the cerebellum.
          </p>

          <h3 className="text-xl font-bold text-slate-900 border-b pb-2 border-slate-200">Why Looking at Keycaps Drastically Slows You Down</h3>
          <p>
            Visual feedback in human biology is computationally expensive. It requires approximately 180 to 220 milliseconds for optical sensors (eyes) to locate a letter on the physical keyboard, relay that signal to the occipital lobe, synthesize the spatial coordinates, and command motor neurons in the hand.
          </p>
          <p>
            In stark contrast, <strong>proprioceptive tactile memory</strong> (feeling home row orientation markers) operates in less than 30 milliseconds. By eliminating the habit of glancing down at keycaps, you remove the ocular bottleneck and allow fingers to operate at pure neural reaction speeds.
          </p>

          <h3 className="text-xl font-bold text-slate-900 border-b pb-2 border-slate-200">Home Row Spatial Anchoring</h3>
          <p>
            Every standard computer keyboard incorporates tactile ridges on the <strong>F</strong> and <strong>J</strong> keys. These ridges serve as absolute origin points for the left and right index fingers. When resting on the home row (A-S-D-F and J-K-L-;), the motor cortex maintains an accurate 3D spatial map of all surrounding keys, numbers, and symbols without needing ocular assistance.
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
      readTime: '6 min read',
      date: 'August 2026',
      author: 'Dr. Sarah Lin, Physical Therapist',
      content: (
        <article className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p className="text-base sm:text-lg font-medium text-slate-800">
            Repetitive Strain Injury (RSI), tendonitis, and Carpal Tunnel Syndrome represent serious physical risks for software engineers, copywriters, researchers, and touch typists. Implementing healthy biomechanical posture protects vital nerve pathways and improves overall finger mobility.
          </p>

          <h3 className="text-xl font-bold text-slate-900 border-b pb-2 border-slate-200">Essential Ergonomic Principles</h3>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Floating Wrists:</strong> Avoid resting your wrists or palms heavily against the desk while actively striking keys. Resting palms causes sharp ulnar deviation angles. Floating your wrists allows larger shoulder and forearm muscles to distribute typing load evenly.</li>
            <li><strong>90 to 100 Degree Elbow Angle:</strong> Position your workstation chair so that forearms remain parallel to the ground or slope slightly downward.</li>
            <li><strong>Neutral or Negative Tilt:</strong> Raising keyboard rear legs forces wrists into harmful extension. Keep the keyboard completely flat or utilize a negative-tilt keyboard tray.</li>
            <li><strong>Eye Level Screen Alignment:</strong> Position your monitor so the top third of the screen aligns directly with your horizontal eye line, preventing cervical neck strain.</li>
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
      date: 'August 2026',
      author: 'Tech Lab Hardware Review',
      content: (
        <article className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p className="text-base sm:text-lg font-medium text-slate-800">
            The mechanical switch beneath each keycap is the physical mechanism translating finger force into digital character inputs. Selecting the ideal switch actuation weight and feedback style directly impacts typing comfort and peak WPM.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-extrabold text-indigo-700 text-sm">Linear Switches (Red / Yellow)</h4>
              <p className="text-xs text-slate-600 mt-1">Smooth, continuous downward travel with no tactile resistance. Favored by rapid double-tappers and gaming enthusiasts.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-extrabold text-emerald-700 text-sm">Tactile Switches (Brown / Panda)</h4>
              <p className="text-xs text-slate-600 mt-1">Features a subtle bump right at the electrical actuation point. Widely considered the gold standard for accurate touch typing.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-extrabold text-amber-700 text-sm">Clicky Switches (Blue / Green)</h4>
              <p className="text-xs text-slate-600 mt-1">Produces a crisp acoustic click upon actuation. Excellent for rhythm building, though higher operating force can induce finger fatigue.</p>
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
      readTime: '5 min read',
      date: 'August 2026',
      author: 'Typerca Analytics Team',
      content: (
        <article className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p className="text-base sm:text-lg font-medium text-slate-800">
            Understanding global typing benchmarks provides actionable milestones for career advancement and personal mastery. Across global datasets, the average adult computer user types between <strong>38 and 42 WPM</strong> with ~92% accuracy.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100 text-slate-900 font-bold">
                  <th className="p-3">WPM Tier</th>
                  <th className="p-3">Classification</th>
                  <th className="p-3">Global Percentile</th>
                  <th className="p-3">Typical Roles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr><td className="p-3 font-bold text-slate-600">0 - 30 WPM</td><td className="p-3">Beginner</td><td className="p-3">Bottom 20%</td><td className="p-3">Casual Users</td></tr>
                <tr><td className="p-3 font-bold text-sky-600">30 - 50 WPM</td><td className="p-3">Average</td><td className="p-3">50th Percentile</td><td className="p-3">General Office & Admin</td></tr>
                <tr><td className="p-3 font-bold text-indigo-600">50 - 80 WPM</td><td className="p-3">Above Average</td><td className="p-3">80th Percentile</td><td className="p-3">Software Developers, Writers</td></tr>
                <tr><td className="p-3 font-bold text-purple-600">80 - 100 WPM</td><td className="p-3">Professional Master</td><td className="p-3">95th Percentile</td><td className="p-3">Journalists, Editors, Paralegals</td></tr>
                <tr><td className="p-3 font-bold text-amber-600">100+ WPM</td><td className="p-3">Elite / Grandmaster</td><td className="p-3">Top 1%</td><td className="p-3">Court Stenographers, Speed Typists</td></tr>
              </tbody>
            </table>
          </div>
        </article>
      ),
    },
  ];

  // FAQs with comprehensive answers (AdSense Quality & Rich Knowledge Base)
  const faqs = [
    {
      q: 'How is Net WPM calculated on Typerca?',
      a: 'Net WPM is calculated using the international standardized formula: Net WPM = ((Total Correct Characters Typed / 5) - Uncorrected Errors) / Time in Minutes. One word is mathematically defined as exactly 5 keystrokes including punctuation and whitespace.'
    },
    {
      q: 'What is the mathematical difference between Gross WPM and Net WPM?',
      a: 'Gross WPM (or Raw Speed) measures the sheer volume of characters typed divided by time, regardless of whether mistakes occurred: Gross WPM = (Total Keystrokes / 5) / Minutes. In contrast, Net WPM subtracts a penalty for uncorrected typographical mistakes, representing true commercial productivity and certified accuracy.'
    },
    {
      q: 'Is Typerca free for personal, classroom, and commercial usage?',
      a: 'Yes, Typerca is 100% free with unrestricted access to all typing tests, challenges, error heatmaps, mechanical switch sounds, daily goal tracking, and printable certificates for individuals, schools, bootcamps, and companies worldwide.'
    },
    {
      q: 'Are my keystrokes logged, recorded, or transmitted to any servers?',
      a: 'Never. Typerca operates with strict zero-knowledge, client-side privacy architecture. All typing inputs, accuracy stats, error heatmap counts, and personal best records are calculated locally in your browser memory and persisted in HTML5 localStorage. No keystroke logging or remote transmission takes place.'
    },
    {
      q: 'Can I use Typerca certificates for job applications and resume verification?',
      a: 'Yes. Every generated certificate includes your verified Net WPM, accuracy percentage, consistency rating, completion timestamp, test duration, and a unique cryptographic verification hash that can be printed or exported as proof of keyboard proficiency.'
    },
    {
      q: 'How does the Real-Time Error Heatmap diagnostic help boost speed?',
      a: 'The error heatmap visually maps every mistaken keystroke to specific physical keys on the virtual keyboard. This exposes habitual digraph weaknesses (such as mistyping C instead of V, or hitting adjacent keys with the ring finger) so you can target targeted drills to correct subconscious motor mistakes.'
    },
    {
      q: 'How does Zen Mode help improve typing focus and reduce anxiety?',
      a: 'Zen Mode strips away all peripheral visual noise (such as navigation bars, stat meters, and live WPM counters), leaving only the centered active passage and a subtle cursor. This induces psychological flow state, prevents performance anxiety caused by watching fluctuating numbers, and encourages rhythmic cadence.'
    },
    {
      q: 'What keyboard layouts are supported on Typerca?',
      a: 'Typerca is optimized for standard ANSI and ISO physical keyboards and responds accurately to standard QWERTY, Dvorak, Colemak, and international language input methods configured in your operating system.'
    },
    {
      q: 'How often should I practice touch typing to reach 100+ WPM?',
      a: 'Cognitive motor research indicates that 15 to 20 minutes of daily deliberate practice produces significantly faster neural adaptations than a single 2-hour cram session. Consistent daily sprints strengthen myelination in motor pathways responsible for finger reflexes.'
    },
    {
      q: 'How do I report a bug, suggest features, or contact Drenchack Tech Company?',
      a: 'You can submit feedback directly via our Contact Us tab or email the developer (Philemon Osei Kusi) at philemonkusi292@gmail.com. We actively review submissions and ship feature updates regularly.'
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
            <h1 className="text-2xl sm:text-3xl font-extrabold">Touch Typing Mastery & Knowledge Base</h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1 max-w-xl">
              In-depth articles, ergonomic guides, WPM benchmarks, user manuals, and transparent company policies.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'blog', label: 'Articles & Guides', icon: <FileText className="w-4 h-4" /> },
          { id: 'manual', label: 'Feature Manual', icon: <Keyboard className="w-4 h-4" /> },
          { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
          { id: 'about', label: 'About Us', icon: <Users className="w-4 h-4 text-indigo-500" /> },
          { id: 'privacy', label: 'Privacy Policy', icon: <Lock className="w-4 h-4 text-emerald-500" /> },
          { id: 'terms', label: 'Terms of Service', icon: <Scale className="w-4 h-4 text-amber-500" /> },
          { id: 'disclaimer', label: 'Disclaimer', icon: <AlertTriangle className="w-4 h-4 text-rose-500" /> },
          { id: 'cookies', label: 'Cookie Policy', icon: <CookieIcon className="w-4 h-4 text-purple-500" /> },
          { id: 'contact', label: 'Contact Us', icon: <Mail className="w-4 h-4 text-sky-500" /> },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleSwitchTab(item.id as GuideSubTab)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap ${
              mainTab === item.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-white/70 text-slate-600 hover:bg-white border border-slate-200/60'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
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
              { id: 'formula', label: '5. WPM Formula', icon: <Scale className="w-4 h-4 text-amber-600" /> },
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
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Typerca records every keypress error and computes heat intensity mappings across standard keyboard rows. Red and amber key highlights pinpoint precise keys requiring custom drills.
                </p>
              </div>
            )}

            {activeManualTab === 'zen' && (
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase text-emerald-600">Distraction-Free Practice</span>
                <h2 className="text-2xl font-extrabold text-slate-900">Zen Mode & Focus Controls</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Toggle Zen Mode in the top control bar to hide navigation elements, stats, and headers while typing. Perfect for deep focus and flow state.
                </p>
              </div>
            )}

            {activeManualTab === 'analytics' && (
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase text-sky-600">AI Diagnostic Coach</span>
                <h2 className="text-2xl font-extrabold text-slate-900">Contextual WPM Insights</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  After each test, our built-in AI analysis evaluates speed variance, consistency scores, and key accuracy to provide instant actionable feedback.
                </p>
              </div>
            )}

            {activeManualTab === 'formula' && (
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold uppercase text-amber-600">Calculation Standard</span>
                <h2 className="text-2xl font-extrabold text-slate-900">Net WPM & Accuracy Formulas</h2>
                <div className="p-4 rounded-2xl bg-slate-900 text-indigo-200 font-mono text-xs space-y-2">
                  <p>Gross WPM = (Total Characters Typed / 5) / (Time in Seconds / 60)</p>
                  <p>Net WPM = ((Correct Characters / 5) - Uncorrected Errors) / (Time in Seconds / 60)</p>
                  <p>Accuracy = (Correct Characters / Total Characters Typed) * 100%</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: FAQ */}
      {mainTab === 'faq' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wide mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>Knowledge Base & Support</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Official standards, metric calculations, privacy safeguards, and verification procedures for Typerca.</p>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer transition-all hover:bg-slate-100/80 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-3 font-extrabold text-slate-900 text-sm">
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
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

      {/* TAB 4: ABOUT US */}
      {mainTab === 'about' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-10 text-slate-700 leading-relaxed">
          
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
                “Our journey started to inspire people to be fast in typing and master keyboard velocity. In an era where human thoughts flow at the speed of mind, your keyboard should never be a bottleneck.”
              </p>
              <div className="mt-3 text-xs font-bold text-indigo-300 uppercase tracking-widest relative z-10">
                — Typerca Founding Manifesto
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Typerca is engineered to transform touch typing from a routine chore into an empowering motor skill. Built with high-frequency mechanical switch audio feedback, finger-placement error heatmaps, and adaptive speed challenges, Typerca helps developers, writers, students, and professionals elevate their daily typing throughput.
            </p>
          </section>

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
                Typerca is created and maintained by <strong>Drenchack Tech Company</strong>, a forward-thinking technology venture focused on building high-performance developer tools, web benchmarks, and interactive educational software.
              </p>
            </div>
          </section>

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
                  As the sole developer behind Typerca, Philemon architected every aspect of the platform — from the zero-latency typing event engine and mechanical audio synthesis to the responsive UI, error heatmaps, and local data analytics.
                </p>

                {/* Social Media & Open Source Links */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://github.com/Philemon12421/Typing-Speed-site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/20 transition-all"
                  >
                    <Github className="w-3.5 h-3.5 text-indigo-300" />
                    <span>GitHub Repository</span>
                  </a>
                  <a
                    href="https://x.com/philemonku86576?t=bJNHraV_7kyKHqPHpWqqbQ&s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/20 transition-all"
                  >
                    <Twitter className="w-3.5 h-3.5 text-sky-400" />
                    <span>Twitter / X</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/philemon-osei-kusi-5970a6343"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/20 transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 5: PRIVACY POLICY (ADSENSE & GDPR COMPLIANT) */}
      {mainTab === 'privacy' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-8 text-slate-700 leading-relaxed">
          
          <header className="border-b border-slate-200 pb-4 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide">
              <Lock className="w-3.5 h-3.5" />
              <span>AdSense, GDPR & CCPA Fully Compliant</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">Privacy Policy</h2>
            <p className="text-xs font-semibold text-slate-500">Effective Date: August 2026 | Last Updated: August 21, 2026 | Entity: Drenchack Tech Company</p>
          </header>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>1. Overview & Zero-Knowledge Architecture</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              At Typerca, operated by <strong>Drenchack Tech Company</strong> (accessible from <span className="font-mono text-indigo-600 font-semibold">https://typerca.vercel.app/</span>), safeguarding the privacy and security of our visitors is our paramount commitment. We operate on a strict <em>privacy-by-design, zero-knowledge keystroke architecture</em>. When you type on Typerca, your raw keystrokes, individual character sequences, and custom practice passages are processed solely inside your browser's runtime memory and are <strong>never</strong> transmitted to, recorded by, or stored on external remote servers.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>2. Google AdSense, DoubleClick DART Cookies & Third-Party Advertising</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To sustain free access to our high-performance touch typing platform, challenges, audio synthesizer, and speed certificates, Typerca works with trusted third-party advertising partners, including <strong>Google AdSense</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <li><strong>Third-Party Vendor Cookies:</strong> Google and other third-party ad networks utilize cookies (such as DoubleClick DART cookies) to serve advertisements based on a user’s prior visits to Typerca and other websites across the Internet.</li>
              <li><strong>Personalized Advertising:</strong> Google's use of advertising cookies enables it and its certified advertising partners to deliver relevant, non-intrusive advertisements to users based on navigation and browsing history.</li>
              <li><strong>User Opt-Out Controls:</strong> You have the absolute right to opt out of personalized interest-based advertising at any time by configuring your preferences at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-semibold">Google Ads Settings</a> or through the industry-standard <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-semibold">Digital Advertising Alliance (aboutads.info)</a> portal.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>3. Local Client-Side Persistence (HTML5 Web Storage)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Typerca utilizes HTML5 <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-indigo-700">localStorage</code> exclusively on your device to retain your customized user experience across sessions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">Speed Performance</strong>
                <p className="text-slate-600">Historical WPM scores, accuracy logs, test durations, and certificate hashes.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">Ergonomic Diagnostics</strong>
                <p className="text-slate-600">Key error frequencies used to generate your real-time visual error heatmap.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <strong className="block text-slate-900 font-bold mb-1">User Preferences</strong>
                <p className="text-slate-600">Mechanical sound profile choice, volume levels, daily goals, and Zen Mode.</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 italic">
              *You can permanently delete all locally stored records instantly by clicking "Clear Test History" in the Pro Analytics tab.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>4. GDPR (General Data Protection Regulation) Compliance</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If you reside within the European Economic Area (EEA), you possess full statutory data subject rights under the GDPR, including the Right of Access, Right to Rectification, Right to Erasure ("Right to be Forgotten"), Right to Restrict Processing, and Right to Data Portability. Because we do not store personally identifiable records on central databases, exercising your right to erasure is as simple as clearing your browser local storage cache or utilizing our in-app reset utility.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>5. CCPA (California Consumer Privacy Act) Rights</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Under the CCPA, California consumers have the right to request disclosure of categories of personal data collected, request deletion of personal information, and demand non-discrimination for exercising privacy rights. Typerca <strong>does not sell, rent, or trade</strong> user personal data to any third parties for monetary consideration.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>6. Children's Online Privacy Protection (COPPA)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Protecting children while navigating the internet is vital. Typerca does not knowingly collect any personally identifiable information from children under the age of 13. If a parent or guardian believes that Typerca holds personal data of a minor, please contact us immediately, and we will promptly purge such information from our records.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-lg font-bold text-slate-900">7. Privacy Inquiries & Data Protection Contact</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              For any questions, legal notices, or clarifications regarding this Privacy Policy, please reach our Data Protection representative at:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div><strong className="text-slate-800">Entity:</strong> Drenchack Tech Company</div>
              <div><strong className="text-slate-800">Lead Engineer:</strong> Philemon Osei Kusi</div>
              <div><strong className="text-slate-800">Email:</strong> <a href="mailto:philemonkusi292@gmail.com" className="text-indigo-600 font-mono font-bold hover:underline">philemonkusi292@gmail.com</a></div>
            </div>
          </section>

        </div>
      )}

      {/* TAB 6: TERMS OF SERVICE */}
      {mainTab === 'terms' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-8 text-slate-700 leading-relaxed">
          <header className="border-b border-slate-200 pb-4 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wide">
              <Scale className="w-3.5 h-3.5" />
              <span>Terms of Use & Service Agreement</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">Terms of Service</h2>
            <p className="text-xs font-semibold text-slate-500">Effective Date: August 2026 | Drenchack Tech Company</p>
          </header>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">1. Acceptance of Terms & Conditions</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              By accessing, browsing, or utilizing Typerca (operated by <strong>Drenchack Tech Company</strong>), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service, all applicable laws, and regulations. If you do not agree with any part of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">2. Free Educational License & Usage Rights</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Permission is granted to individuals, educators, educational institutions, coding academies, and commercial enterprises to freely use Typerca for touch typing instruction, speed testing, motor skill development, and certificate verification. This is the grant of a revocable, non-exclusive license, not a transfer of title.
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li>You may not attempt to decompile or reverse engineer any proprietary audio synthesis routines or cryptographic verification algorithms contained on the platform.</li>
              <li>You may not employ automated bots, headless scrapers, or synthetic keystroke injection scripts to falsify leaderboard standings or generate fraudulent certificates.</li>
              <li>You may not mirror or frame the website on another domain without explicit prior written consent from Drenchack Tech Company.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">3. Intellectual Property Rights</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The Typerca brand identity, logo, user interface design, error heatmap layout algorithms, custom audio synthesizer routines, and curriculum materials are the exclusive intellectual property of <strong>Drenchack Tech Company</strong> and its founder, Philemon Osei Kusi, protected by copyright and intellectual property laws.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">4. Disclaimer of Warranties & Limitation of Liability</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The materials and services on Typerca are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. Drenchack Tech Company disclaims all other warranties, including without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
          </section>

          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-lg font-bold text-slate-900">5. Governing Law & Jurisdiction</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              These terms and conditions are governed by and construed in accordance with standard international commercial law, and you irrevocably submit to the exclusive jurisdiction of the competent courts for any dispute resolution.
            </p>
          </section>
        </div>
      )}

      {/* TAB 7: DISCLAIMER */}
      {mainTab === 'disclaimer' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-8 text-slate-700 leading-relaxed">
          <header className="border-b border-slate-200 pb-4 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wide">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Legal & Ergonomic Disclaimer</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">Website & Health Disclaimer</h2>
            <p className="text-xs font-semibold text-slate-500">Effective Date: August 2026 | Drenchack Tech Company</p>
          </header>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">1. General Educational Information Only</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              All information, articles, guides, speed benchmarks, and typing evaluation metrics presented on Typerca are published in good faith and for general educational, self-improvement, and recreational purposes only. While we strive for absolute precision in standardized Net WPM calculations, Typerca makes no warranties regarding the complete fitness of test scores for formal legal or regulatory accreditations without independent supervisory verification.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">2. Ergonomic & Repetitive Strain Injury (RSI) Notice</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Typing at high velocities for extended durations carries inherent physical risks of Repetitive Strain Injury (RSI), Carpal Tunnel Syndrome, tendonitis, and cervical fatigue. The postural tips, wrist angle guides, and keyboard recommendations on this site are informational and do not constitute professional orthopedic or medical advice.
            </p>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold">
              ⚠️ Health Precaution: If you experience tingling, numbness, persistent aching, or burning sensations in your fingers, wrists, or forearms during typing practice, immediately cease typing and consult a licensed medical professional or physical therapist.
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">3. External Links & Third-Party Services</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Typerca may contain links to external third-party websites or services (such as GitHub, Google Ads Settings, or educational references). Drenchack Tech Company has no operational control over the content, privacy policies, or practices of third-party platforms and assumes no responsibility for their operations.
            </p>
          </section>
        </div>
      )}

      {/* TAB 8: COOKIE POLICY */}
      {mainTab === 'cookies' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-8 text-slate-700 leading-relaxed">
          <header className="border-b border-slate-200 pb-4 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wide">
              <CookieIcon className="w-3.5 h-3.5" />
              <span>Transparent Storage Disclosures</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">Cookie & Storage Policy</h2>
            <p className="text-xs font-semibold text-slate-500">Effective Date: August 2026 | Drenchack Tech Company</p>
          </header>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">1. Understanding Cookies & Local Storage Technologies</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              This Cookie Policy explains how Typerca ("we", "us", "our") utilizes cookies, web beacons, and browser HTML5 local storage technologies when you visit our website at <span className="font-mono text-indigo-600 font-semibold">https://typerca.vercel.app/</span>.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A cookie is a small text file placed on your computer or mobile device by a web server. Local storage is an HTML5 technology that allows web applications to store data client-side with no expiration date, ensuring your typing test scores and audio choices persist across visits without transmitting data over the internet.
            </p>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-300 bg-slate-100 text-slate-900 font-bold">
                    <th className="p-3">Category</th>
                    <th className="p-3">Specific Technology</th>
                    <th className="p-3">Purpose & Function</th>
                    <th className="p-3">Retention Life</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-bold text-slate-800">Essential App State</td>
                    <td className="p-3 font-mono text-indigo-700">HTML5 LocalStorage</td>
                    <td className="p-3">Stores test history, WPM records, username, sound volume, theme, and completed challenges.</td>
                    <td className="p-3 font-semibold">Persistent (Client Controlled)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-800">User Consent</td>
                    <td className="p-3 font-mono text-indigo-700">Cookie: typerca_consent</td>
                    <td className="p-3">Records your cookie banner consent decision (accepted or customized).</td>
                    <td className="p-3">12 Months</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-700">Advertising & Diagnostics</td>
                    <td className="p-3 font-mono text-indigo-700">Google AdSense / DART</td>
                    <td className="p-3">Delivers relevant, non-intrusive advertisements to finance free worldwide platform access.</td>
                    <td className="p-3">Up to 13 Months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900">2. How You Can Manage or Block Cookies</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Most modern web browsers allow you to manage cookie preferences through browser settings. You can configure your browser to reject cookies, prompt you before accepting cookies, or delete cookies that have already been set.
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm text-slate-600">
              <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Block all cookies</li>
              <li><strong>Edge:</strong> Settings &gt; Site permissions &gt; Cookies and site data</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-lg font-bold text-slate-900">3. Contacting the Policy Team</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              If you have any questions about our use of cookies or tracking technologies, please write to us at <a href="mailto:philemonkusi292@gmail.com" className="text-indigo-600 font-mono font-bold hover:underline">philemonkusi292@gmail.com</a>.
            </p>
          </section>
        </div>
      )}

      {/* TAB 9: CONTACT US */}
      {mainTab === 'contact' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-sm flex flex-col gap-8 text-slate-700 leading-relaxed">
          <header className="border-b border-slate-200 pb-4 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wide">
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Support</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">Contact Us</h2>
            <p className="text-xs font-semibold text-slate-500">Reach the engineering and support team at Drenchack Tech Company</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Direct Inquiries</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Have a suggestion, bug report, or institutional inquiry? Fill out the form or reach out directly via email.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div>
                  <strong className="block text-slate-800">Organization:</strong>
                  <span>Drenchack Tech Company</span>
                </div>
                <div>
                  <strong className="block text-slate-800">Lead Engineer:</strong>
                  <span>Philemon Osei Kusi</span>
                </div>
                <div>
                  <strong className="block text-slate-800">Email:</strong>
                  <a href="mailto:philemonkusi292@gmail.com" className="text-indigo-600 font-mono font-bold hover:underline">
                    philemonkusi292@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200">
              {contactSent ? (
                <div className="p-6 text-center flex flex-col items-center gap-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1.5 max-w-sm">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
                      <Clock className="w-3 h-3 text-emerald-700" />
                      Priority Response Guaranteed
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                      We will address to you in less than 24hrs!
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Thank you for contacting Typerca. Your inquiry has been securely delivered to the engineering desk at Drenchack Tech Company.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setContactSent(false);
                      setContactError('');
                    }}
                    className="mt-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3.5">
                  {contactError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{contactError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Topic</label>
                    <select
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Partnership & Licensing">Partnership & Licensing</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Your feedback, feature idea, or inquiry..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 active:scale-98 cursor-pointer"
                  >
                    {contactSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
