/**
 * Dynamic XML Sitemap Generator Utility for Typerca (https://typerca.vercel.app/)
 * Ensures complete search engine crawlability and AdSense audit indexing.
 */

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const BASE_SITE_URL = 'https://typerca.vercel.app';

export const SITEMAP_ROUTES: SitemapEntry[] = [
  // Core Application Landing & Practice Tests
  {
    url: `${BASE_SITE_URL}/`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    url: `${BASE_SITE_URL}/#practice`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'daily',
    priority: 0.95,
  },

  // Interactive Challenges & Diagnostic Analytics
  {
    url: `${BASE_SITE_URL}/#challenges`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'weekly',
    priority: 0.85,
  },
  {
    url: `${BASE_SITE_URL}/#analytics`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'weekly',
    priority: 0.85,
  },

  // Educational Guides & Knowledge Hub Hub
  {
    url: `${BASE_SITE_URL}/#guide`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'weekly',
    priority: 0.90,
  },
  {
    url: `${BASE_SITE_URL}/#manual`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'weekly',
    priority: 0.85,
  },

  // Legal, AdSense Compliance & Organizational Pages
  {
    url: `${BASE_SITE_URL}/#privacy`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'monthly',
    priority: 0.80,
  },
  {
    url: `${BASE_SITE_URL}/#terms`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'monthly',
    priority: 0.75,
  },
  {
    url: `${BASE_SITE_URL}/#cookies`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'monthly',
    priority: 0.75,
  },
  {
    url: `${BASE_SITE_URL}/#disclaimer`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'monthly',
    priority: 0.75,
  },
  {
    url: `${BASE_SITE_URL}/#about`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'monthly',
    priority: 0.80,
  },
  {
    url: `${BASE_SITE_URL}/#contact`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'monthly',
    priority: 0.80,
  },
  {
    url: `${BASE_SITE_URL}/#faq`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'weekly',
    priority: 0.85,
  },

  // In-Depth Educational Articles & Touch Typing Research
  {
    url: `${BASE_SITE_URL}/#how-to-break-100-wpm-typing-plateau`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'monthly',
    priority: 0.80,
  },
  {
    url: `${BASE_SITE_URL}/#neurological-science-touch-typing-muscle-memory`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'monthly',
    priority: 0.80,
  },
  {
    url: `${BASE_SITE_URL}/#typing-ergonomics-posture-guide-rsi-prevention`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'monthly',
    priority: 0.80,
  },
  {
    url: `${BASE_SITE_URL}/#mechanical-keyboard-switches-linear-tactile-clicky-speed`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'monthly',
    priority: 0.80,
  },
  {
    url: `${BASE_SITE_URL}/#global-wpm-benchmark-standards-typing-speed`,
    lastmod: '2026-08-21T00:00:00+00:00',
    changefreq: 'monthly',
    priority: 0.80,
  },
];

export function generateSitemapXML(routes: SitemapEntry[] = SITEMAP_ROUTES): string {
  const urlTags = routes
    .map(
      (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlTags}
</urlset>`;
}
