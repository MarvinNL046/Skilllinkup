// lib/sitemap-seo.ts
import type { MetadataRoute } from "next";

/**
 * SEO Landing Pages Sitemap Configuration
 *
 * Contains all 50 SEO-optimized landing pages organized by pillar topics.
 * These pages are statically generated and don't require database queries.
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";
const locales = ['en', 'nl'] as const;

interface SeoPage {
  slug: string;
  pillar: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

/**
 * All 50 SEO landing pages organized by pillar topics
 */
const SEO_PAGES: SeoPage[] = [
  // Pillar 1: Freelance Platform Selection Guides (5 pages)
  { slug: '/resources/choose-best-freelance-platform', pillar: 'Platform Selection', priority: 0.9, changeFrequency: 'weekly' },
  { slug: '/resources/beginner-vs-expert-platforms', pillar: 'Platform Selection', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/resources/key-factors-choosing-freelance-marketplace', pillar: 'Platform Selection', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/resources/multiple-freelance-platforms-pros-cons', pillar: 'Platform Selection', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/resources/platform-selection-quiz', pillar: 'Platform Selection', priority: 0.7, changeFrequency: 'monthly' },

  // Pillar 2: Platform-Specific Deep Dives (5 pages)
  { slug: '/resources/upwork-complete-guide', pillar: 'Platform Reviews', priority: 0.9, changeFrequency: 'weekly' },
  { slug: '/resources/fiverr-beginner-guide', pillar: 'Platform Reviews', priority: 0.9, changeFrequency: 'weekly' },
  { slug: '/resources/toptal-review', pillar: 'Platform Reviews', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/resources/freelancer-platform-deep-dive', pillar: 'Platform Reviews', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/resources/guru-platform-analysis', pillar: 'Platform Reviews', priority: 0.8, changeFrequency: 'weekly' },

  // Pillar 3: Freelance Pricing & Earnings Optimization (5 pages)
  { slug: '/resources/calculate-freelance-hourly-rate', pillar: 'Pricing & Earnings', priority: 0.9, changeFrequency: 'monthly' },
  { slug: '/resources/freelance-pricing-strategies', pillar: 'Pricing & Earnings', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/upwork-pricing-tactics', pillar: 'Pricing & Earnings', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/negotiate-higher-rates', pillar: 'Pricing & Earnings', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/platform-fees-maximize-earnings', pillar: 'Pricing & Earnings', priority: 0.8, changeFrequency: 'monthly' },

  // Pillar 4: Getting Started as a Freelancer (5 pages)
  { slug: '/resources/freelance-beginners-guide', pillar: 'Getting Started', priority: 0.9, changeFrequency: 'monthly' },
  { slug: '/resources/freelance-profile-templates', pillar: 'Getting Started', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/first-freelance-proposal', pillar: 'Getting Started', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/freelance-beginner-mistakes', pillar: 'Getting Started', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/freelance-platform-setup', pillar: 'Getting Started', priority: 0.7, changeFrequency: 'monthly' },

  // Pillar 5: Freelance Tools & Productivity (5 pages)
  { slug: '/resources/essential-freelance-tools', pillar: 'Tools & Productivity', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/resources/best-time-tracking-tools-freelancers', pillar: 'Tools & Productivity', priority: 0.7, changeFrequency: 'weekly' },
  { slug: '/resources/freelance-invoice-generator', pillar: 'Tools & Productivity', priority: 0.7, changeFrequency: 'monthly' },
  { slug: '/resources/project-management-tools-freelancers', pillar: 'Tools & Productivity', priority: 0.7, changeFrequency: 'weekly' },
  { slug: '/resources/freelance-accounting-software', pillar: 'Tools & Productivity', priority: 0.7, changeFrequency: 'weekly' },

  // Pillar 6: Platform Comparisons & Head-to-Head Reviews (5 pages)
  { slug: '/resources/upwork-vs-fiverr', pillar: 'Platform Comparisons', priority: 0.9, changeFrequency: 'weekly' },
  { slug: '/resources/toptal-vs-upwork', pillar: 'Platform Comparisons', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/resources/freelancer-vs-guru', pillar: 'Platform Comparisons', priority: 0.7, changeFrequency: 'weekly' },
  { slug: '/resources/best-platform-writers', pillar: 'Platform Comparisons', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/resources/best-platform-designers', pillar: 'Platform Comparisons', priority: 0.8, changeFrequency: 'weekly' },

  // Pillar 7: Freelance Success Strategies (5 pages)
  { slug: '/resources/how-to-stand-out-on-crowded-freelance-platforms', pillar: 'Success Strategies', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/advanced-bidding-strategies-to-win-more-freelance-projects', pillar: 'Success Strategies', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/building-long-term-client-relationships-on-freelance-platforms', pillar: 'Success Strategies', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/how-to-get-5-star-reviews-on-every-freelance-project', pillar: 'Success Strategies', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/scaling-your-freelance-business-from-solo-to-agency', pillar: 'Success Strategies', priority: 0.8, changeFrequency: 'monthly' },

  // Pillar 8: Niche-Specific Platform Guides (5 pages)
  { slug: '/resources/best-freelance-platforms-web-developers-2025', pillar: 'Niche Guides', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/top-freelance-platforms-graphic-designers-creatives', pillar: 'Niche Guides', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/best-platforms-freelance-writers-content-creators', pillar: 'Niche Guides', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/freelance-platforms-virtual-assistants-complete-guide', pillar: 'Niche Guides', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/best-freelance-platforms-marketing-consultants', pillar: 'Niche Guides', priority: 0.8, changeFrequency: 'monthly' },

  // Pillar 9: Freelance Business Management (5 pages)
  { slug: '/resources/freelance-invoicing-guide', pillar: 'Business Management', priority: 0.7, changeFrequency: 'monthly' },
  { slug: '/resources/freelance-tax-guide', pillar: 'Business Management', priority: 0.8, changeFrequency: 'yearly' },
  { slug: '/resources/freelance-contracts-101', pillar: 'Business Management', priority: 0.7, changeFrequency: 'monthly' },
  { slug: '/resources/managing-multiple-clients', pillar: 'Business Management', priority: 0.7, changeFrequency: 'monthly' },
  { slug: '/resources/freelance-business-insurance', pillar: 'Business Management', priority: 0.7, changeFrequency: 'yearly' },

  // Pillar 10: Platform Features & Best Practices (5 pages)
  { slug: '/resources/optimizing-freelance-profile-maximum-visibility', pillar: 'Best Practices', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/how-to-write-proposals-that-win', pillar: 'Best Practices', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/mastering-freelance-platform-algorithms', pillar: 'Best Practices', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/building-portfolio-that-converts', pillar: 'Best Practices', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/resources/freelance-platform-communication', pillar: 'Best Practices', priority: 0.7, changeFrequency: 'monthly' },
];

/**
 * Generate sitemap entries for all SEO pages
 * Includes localized versions and proper alternates
 */
export function generateSeoSitemapEntries(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add Resources index page
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/resources`])
        ),
      },
    });
  });

  // Add all 50 SEO pages
  SEO_PAGES.forEach((page) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page.slug}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page.slug}`])
          ),
        },
      });
    });
  });

  return sitemapEntries;
}

/**
 * Get SEO pages by pillar for navigation purposes
 */
export function getSeoPagesByPillar(pillar: string): SeoPage[] {
  return SEO_PAGES.filter((page) => page.pillar === pillar);
}

/**
 * Get all unique pillar names
 */
export function getSeoPillars(): string[] {
  return Array.from(new Set(SEO_PAGES.map((page) => page.pillar)));
}

/**
 * Get total count of SEO pages
 */
export function getSeoPageCount(): number {
  return SEO_PAGES.length;
}

export { SEO_PAGES };
