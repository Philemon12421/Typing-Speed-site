import { TabType } from '../types';
import { GuideSubTab } from '../components/AnimatedGuideView';

interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogType?: string;
  jsonLd: Record<string, any>;
  breadcrumbs: Array<{ name: string; url: string }>;
}

const BASE_URL = 'https://typerca.vercel.app';

export function getSEOMetadata(activeTab: TabType, guideSubTab: GuideSubTab = 'blog'): SEOConfig {
  const organizationSchema = {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Drenchack Tech Company',
    url: BASE_URL,
    logo: `${BASE_URL}/og-image.png`,
    founder: {
      '@type': 'Person',
      name: 'Philemon Osei Kusi',
      jobTitle: 'Lead Software Engineer & Founder',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support & Feedback',
      email: 'philemonkusi292@gmail.com',
      availableLanguage: ['English'],
    },
  };

  if (activeTab === 'test') {
    return {
      title: 'Typerca — Precision Touch Typing Test, WPM Benchmark & Speed Training',
      description: 'Free online touch typing speed test & Net WPM benchmark calculator. Features real-time error heatmaps, mechanical switch acoustics, customized passages, and official speed badges.',
      keywords: 'typerca, typing test, wpm test, touch typing, speed typing test, typing benchmark, keyboard practice, typing speed test online, mechanical keyboard sounds, drenchack tech company',
      canonicalUrl: `${BASE_URL}/#practice`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', url: `${BASE_URL}/` },
        { name: 'Touch Typing Practice', url: `${BASE_URL}/#practice` },
      ],
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          organizationSchema,
          {
            '@type': 'WebApplication',
            '@id': `${BASE_URL}/#webapp`,
            name: 'Typerca Touch Typing Platform',
            url: BASE_URL,
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript and HTML5 Audio support',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              '15s, 30s, 60s, 120s WPM Timed Practice',
              'Real-Time Key Error Heatmaps',
              'Mechanical Key Switch Audio Synthesizer (Blue, Brown, Red, Topre, Thock)',
              '10-Finger Placement Visual Guide',
              '15+ Gamified Typing Quests',
              'Official Printable WPM Speed Certificates',
            ],
          },
        ],
      },
    };
  }

  if (activeTab === 'challenges') {
    return {
      title: 'Typing Challenges & Gamified Quests — Boost Speed | Typerca',
      description: 'Conquer 15+ structured touch typing quests ranging from Home Row Foundations and Programming Syntax to Speed Demon 100+ WPM benchmarks.',
      keywords: 'typing challenges, touch typing quests, coding typing test, home row drills, typing games, wpm milestone, typerca challenges',
      canonicalUrl: `${BASE_URL}/#challenges`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', url: `${BASE_URL}/` },
        { name: 'Challenges & Quests', url: `${BASE_URL}/#challenges` },
      ],
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          organizationSchema,
          {
            '@type': 'LearningResource',
            name: 'Typerca Gamified Typing Challenges',
            description: '15+ progressive touch typing levels designed to accelerate procedural muscle memory and typing velocity.',
            educationalLevel: 'Beginner to Expert Typist',
            learningResourceType: 'Interactive Challenge Suite',
            provider: organizationSchema,
          },
        ],
      },
    };
  }

  if (activeTab === 'analytics') {
    return {
      title: 'Pro Typing Analytics & Visual Error Heatmap Diagnostic | Typerca',
      description: 'Deep performance diagnostics for your typing speed. Track Net WPM progress curves, accuracy percentages, keystroke consistency ratings, and weak finger error maps.',
      keywords: 'typing analytics, error heatmap, typing diagnostics, wpm chart, keystroke tracker, touch typing stats, typerca pro analytics',
      canonicalUrl: `${BASE_URL}/#analytics`,
      ogType: 'website',
      breadcrumbs: [
        { name: 'Home', url: `${BASE_URL}/` },
        { name: 'Pro Analytics & Heatmap', url: `${BASE_URL}/#analytics` },
      ],
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          organizationSchema,
          {
            '@type': 'WebApplication',
            name: 'Typerca Typing Analytics & Heatmap Diagnostic',
            applicationCategory: 'AnalyticsApplication',
            description: 'Comprehensive diagnostic dashboard tracking WPM progress, accuracy trends, and physical key error distribution.',
          },
        ],
      },
    };
  }

  // Guide SubTab Routing
  switch (guideSubTab) {
    case 'privacy':
      return {
        title: 'Privacy Policy (GDPR, CCPA & AdSense Compliant) — Typerca',
        description: 'Official privacy policy for Typerca operated by Drenchack Tech Company. Transparent disclosures on zero-knowledge client-side storage, Google AdSense DART cookies, and GDPR/CCPA user rights.',
        keywords: 'typerca privacy policy, gdpr compliance, ccpa rights, adsense cookies, dart cookie policy, zero keystroke logging, drenchack tech company',
        canonicalUrl: `${BASE_URL}/#privacy`,
        ogType: 'website',
        breadcrumbs: [
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Guides & Legal', url: `${BASE_URL}/#guide` },
          { name: 'Privacy Policy', url: `${BASE_URL}/#privacy` },
        ],
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            {
              '@type': 'WebPage',
              name: 'Typerca Privacy Policy',
              url: `${BASE_URL}/#privacy`,
              description: 'Privacy Policy outlining data minimization, local storage architecture, and advertising cookie compliance.',
              publisher: organizationSchema,
              inLanguage: 'en-US',
            },
          ],
        },
      };

    case 'terms':
      return {
        title: 'Terms of Service & Free Educational License Agreement — Typerca',
        description: 'Terms of Service and conditions for Typerca. Explains the free educational license for individuals, schools, and developers, acceptable usage, and intellectual property terms.',
        keywords: 'typerca terms of service, educational license, typing software terms, drenchack tech company legal',
        canonicalUrl: `${BASE_URL}/#terms`,
        ogType: 'website',
        breadcrumbs: [
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Guides & Legal', url: `${BASE_URL}/#guide` },
          { name: 'Terms of Service', url: `${BASE_URL}/#terms` },
        ],
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            {
              '@type': 'WebPage',
              name: 'Typerca Terms of Service',
              url: `${BASE_URL}/#terms`,
              description: 'Terms and conditions governing the use of Typerca and its educational services.',
              publisher: organizationSchema,
            },
          ],
        },
      };

    case 'cookies':
      return {
        title: 'Cookie & Local Storage Policy — Typerca Transparency Disclosures',
        description: 'Complete breakdown of cookies, HTML5 web storage, retention durations, and browser cookie control procedures on Typerca.',
        keywords: 'cookie policy, localstorage disclosures, adsense cookies, typerca cookie banner, browser storage guide',
        canonicalUrl: `${BASE_URL}/#cookies`,
        ogType: 'website',
        breadcrumbs: [
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Guides & Legal', url: `${BASE_URL}/#guide` },
          { name: 'Cookie & Storage Policy', url: `${BASE_URL}/#cookies` },
        ],
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            {
              '@type': 'WebPage',
              name: 'Typerca Cookie and Storage Policy',
              url: `${BASE_URL}/#cookies`,
              description: 'Transparent disclosures regarding the use of cookies and HTML5 localStorage.',
              publisher: organizationSchema,
            },
          ],
        },
      };

    case 'faq':
      return {
        title: 'Frequently Asked Questions & WPM Calculation Standards — Typerca',
        description: 'Find answers about standardized Net WPM calculations, zero-keystroke logging architecture, certificate validation, and ergonomic practice tips on Typerca.',
        keywords: 'typing faq, net wpm formula, gross wpm vs net wpm, typing certificate validation, typing speed questions, typerca help',
        canonicalUrl: `${BASE_URL}/#faq`,
        ogType: 'website',
        breadcrumbs: [
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Guides & Legal', url: `${BASE_URL}/#guide` },
          { name: 'Frequently Asked Questions', url: `${BASE_URL}/#faq` },
        ],
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            {
              '@type': 'FAQPage',
              name: 'Typerca Touch Typing FAQ',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'How is Net WPM calculated on Typerca?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Net WPM is calculated using the international standardized formula: Net WPM = ((Total Correct Characters Typed / 5) - Uncorrected Errors) / Time in Minutes. One standardized word equals exactly 5 keystrokes.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is the difference between Gross WPM and Net WPM?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Gross WPM measures total raw characters typed divided by time, regardless of mistakes: (Total Keystrokes / 5) / Minutes. Net WPM subtracts uncorrected errors to reflect true commercial productivity.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is Typerca free for schools, bootcamps, and companies?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, Typerca is 100% free with unrestricted access to all typing tests, challenges, error heatmaps, audio feedback profiles, and printable certificates.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Does Typerca record or transmit my keystrokes?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. Typerca operates on a zero-knowledge, client-side architecture. Keystrokes and scores are calculated locally in your browser memory and persisted in HTML5 localStorage for complete privacy.',
                  },
                },
              ],
            },
          ],
        },
      };

    case 'about':
      return {
        title: 'About Typerca & Drenchack Tech Company — Mission & Founder',
        description: 'Discover the story behind Typerca, engineered by Philemon Osei Kusi at Drenchack Tech Company to deliver the world’s most precise, accessible touch typing platform.',
        keywords: 'about typerca, drenchack tech company, philemon osei kusi, typing software company, touch typing mission',
        canonicalUrl: `${BASE_URL}/#about`,
        ogType: 'website',
        breadcrumbs: [
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Guides & Legal', url: `${BASE_URL}/#guide` },
          { name: 'About Us', url: `${BASE_URL}/#about` },
        ],
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            {
              '@type': 'AboutPage',
              name: 'About Typerca & Drenchack Tech Company',
              url: `${BASE_URL}/#about`,
              mainEntity: organizationSchema,
              description: 'Mission, technological architecture, and engineering principles behind Typerca.',
            },
          ],
        },
      };

    case 'contact':
      return {
        title: 'Contact Us & Developer Support — Typerca',
        description: 'Get in touch with the Typerca development and support team at Drenchack Tech Company. Submit bug reports, request curriculum features, or give feedback.',
        keywords: 'contact typerca, drenchack tech support, philemon osei kusi email, typing test feedback',
        canonicalUrl: `${BASE_URL}/#contact`,
        ogType: 'website',
        breadcrumbs: [
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Guides & Legal', url: `${BASE_URL}/#guide` },
          { name: 'Contact Us', url: `${BASE_URL}/#contact` },
        ],
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            {
              '@type': 'ContactPage',
              name: 'Typerca Support & Feedback Contact',
              url: `${BASE_URL}/#contact`,
              mainEntity: {
                '@type': 'ContactPoint',
                contactType: 'Customer & Technical Support',
                email: 'philemonkusi292@gmail.com',
                availableLanguage: ['English'],
              },
            },
          ],
        },
      };

    case 'disclaimer':
      return {
        title: 'Website & Health Ergonomics Disclaimer — Typerca',
        description: 'Official legal and health disclaimer for Typerca regarding educational typing scores, repetitive strain injury (RSI) precautions, and third-party links.',
        keywords: 'typerca disclaimer, typing ergonomic health, rsi notice, typing test accuracy disclaimer',
        canonicalUrl: `${BASE_URL}/#disclaimer`,
        ogType: 'website',
        breadcrumbs: [
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Guides & Legal', url: `${BASE_URL}/#guide` },
          { name: 'Disclaimer', url: `${BASE_URL}/#disclaimer` },
        ],
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            {
              '@type': 'WebPage',
              name: 'Typerca Disclaimer',
              url: `${BASE_URL}/#disclaimer`,
              description: 'Legal disclaimer and health safety notices regarding typing speed training.',
            },
          ],
        },
      };

    case 'manual':
      return {
        title: 'Interactive Feature Manual & Touch Typing Guide — Typerca',
        description: 'Comprehensive manual detailing all Typerca features: custom word sets, quote modes, mechanical switch acoustic synthesizer, and certificate verification.',
        keywords: 'typerca manual, typing app instructions, typing sound settings, quote typing mode, touch typing guide',
        canonicalUrl: `${BASE_URL}/#manual`,
        ogType: 'article',
        breadcrumbs: [
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Guides & Legal', url: `${BASE_URL}/#guide` },
          { name: 'Interactive Feature Manual', url: `${BASE_URL}/#manual` },
        ],
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            {
              '@type': 'TechArticle',
              headline: 'Interactive Typerca Platform Manual',
              url: `${BASE_URL}/#manual`,
              description: 'Step-by-step user manual exploring mechanical switch audio options, error heatmaps, custom text drills, and certificate generation.',
              author: {
                '@type': 'Person',
                name: 'Philemon Osei Kusi',
              },
              publisher: organizationSchema,
            },
          ],
        },
      };

    case 'blog':
    default:
      return {
        title: 'Touch Typing Mastery Guides, Science & Hardware — Typerca',
        description: 'In-depth educational articles on breaking the 100 WPM typing plateau, the neuroscience of motor muscle memory, ergonomic RSI prevention, and mechanical switches.',
        keywords: 'typing guide, break 100 wpm, typing speed tips, typing neuroscience, mechanical switches for typing, rsi prevention',
        canonicalUrl: `${BASE_URL}/#guide`,
        ogType: 'article',
        breadcrumbs: [
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Guides & Legal', url: `${BASE_URL}/#guide` },
          { name: 'Educational Articles & Science', url: `${BASE_URL}/#guide` },
        ],
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            organizationSchema,
            {
              '@type': 'CollectionPage',
              name: 'Typerca Educational Typing Guides & Research',
              url: `${BASE_URL}/#guide`,
              description: 'Educational articles and technical guides covering touch typing acceleration, motor learning, and ergonomics.',
              publisher: organizationSchema,
            },
          ],
        },
      };
  }
}

/**
 * Updates DOM head elements dynamically on tab or route changes.
 */
export function updateDOMMetaTags(config: SEOConfig): void {
  // 1. Update Title
  document.title = config.title;

  // 2. Helper to set or create meta tag
  const setMeta = (name: string, content: string, isProperty: boolean = false) => {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let element = document.querySelector(selector) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement('meta');
      if (isProperty) {
        element.setAttribute('property', name);
      } else {
        element.setAttribute('name', name);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Update primary metadata
  setMeta('description', config.description);
  setMeta('keywords', config.keywords);
  setMeta('title', config.title);

  // 4. Update Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', config.canonicalUrl);

  // 5. Open Graph Meta Tags
  setMeta('og:title', config.title, true);
  setMeta('og:description', config.description, true);
  setMeta('og:url', config.canonicalUrl, true);
  setMeta('og:type', config.ogType || 'website', true);

  // 6. Twitter Card Meta Tags
  setMeta('twitter:title', config.title);
  setMeta('twitter:description', config.description);
  setMeta('twitter:url', config.canonicalUrl);

  // 7. Inject Dynamic BreadcrumbList into Schema JSON-LD
  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: config.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  const finalJsonLd = {
    ...config.jsonLd,
    '@graph': [
      ...(config.jsonLd['@graph'] || []),
      breadcrumbSchema,
    ],
  };

  // 8. Inject/Update Dynamic JSON-LD script tag
  let jsonLdScript = document.getElementById('typerca-dynamic-jsonld') as HTMLScriptElement | null;
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'typerca-dynamic-jsonld';
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }
  jsonLdScript.textContent = JSON.stringify(finalJsonLd, null, 2);
}
