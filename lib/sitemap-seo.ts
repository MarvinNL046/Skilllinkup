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
  { slug: '/seo/choose-best-freelance-platform', pillar: 'Platform Selection', priority: 0.9, changeFrequency: 'weekly' },
  { slug: '/seo/beginner-vs-expert-platforms', pillar: 'Platform Selection', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/seo/key-factors-choosing-freelance-marketplace', pillar: 'Platform Selection', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/seo/multiple-freelance-platforms-pros-cons', pillar: 'Platform Selection', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/seo/platform-selection-quiz', pillar: 'Platform Selection', priority: 0.7, changeFrequency: 'monthly' },

  // Pillar 2: Platform-Specific Deep Dives (5 pages)
  { slug: '/seo/upwork-complete-guide', pillar: 'Platform Reviews', priority: 0.9, changeFrequency: 'weekly' },
  { slug: '/seo/fiverr-beginner-guide', pillar: 'Platform Reviews', priority: 0.9, changeFrequency: 'weekly' },
  { slug: '/seo/toptal-review', pillar: 'Platform Reviews', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/seo/freelancer-platform-deep-dive', pillar: 'Platform Reviews', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/seo/guru-platform-analysis', pillar: 'Platform Reviews', priority: 0.8, changeFrequency: 'weekly' },

  // Pillar 3: Freelance Pricing & Earnings Optimization (5 pages)
  { slug: '/seo/calculate-freelance-hourly-rate', pillar: 'Pricing & Earnings', priority: 0.9, changeFrequency: 'monthly' },
  { slug: '/seo/freelance-pricing-strategies', pillar: 'Pricing & Earnings', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/upwork-pricing-tactics', pillar: 'Pricing & Earnings', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/negotiate-higher-rates', pillar: 'Pricing & Earnings', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/platform-fees-maximize-earnings', pillar: 'Pricing & Earnings', priority: 0.8, changeFrequency: 'monthly' },

  // Pillar 4: Getting Started as a Freelancer (5 pages)
  { slug: '/seo/freelance-beginners-guide', pillar: 'Getting Started', priority: 0.9, changeFrequency: 'monthly' },
  { slug: '/seo/freelance-profile-templates', pillar: 'Getting Started', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/first-freelance-proposal', pillar: 'Getting Started', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/freelance-beginner-mistakes', pillar: 'Getting Started', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/freelance-platform-setup', pillar: 'Getting Started', priority: 0.7, changeFrequency: 'monthly' },

  // Pillar 5: Freelance Tools & Productivity (5 pages)
  { slug: '/seo/essential-freelance-tools', pillar: 'Tools & Productivity', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/seo/best-time-tracking-tools-freelancers', pillar: 'Tools & Productivity', priority: 0.7, changeFrequency: 'weekly' },
  { slug: '/seo/freelance-invoice-generator', pillar: 'Tools & Productivity', priority: 0.7, changeFrequency: 'monthly' },
  { slug: '/seo/project-management-tools-freelancers', pillar: 'Tools & Productivity', priority: 0.7, changeFrequency: 'weekly' },
  { slug: '/seo/freelance-accounting-software', pillar: 'Tools & Productivity', priority: 0.7, changeFrequency: 'weekly' },

  // Pillar 6: Platform Comparisons & Head-to-Head Reviews (5 pages)
  { slug: '/seo/upwork-vs-fiverr', pillar: 'Platform Comparisons', priority: 0.9, changeFrequency: 'weekly' },
  { slug: '/seo/toptal-vs-upwork', pillar: 'Platform Comparisons', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/seo/freelancer-vs-guru', pillar: 'Platform Comparisons', priority: 0.7, changeFrequency: 'weekly' },
  { slug: '/seo/best-platform-writers', pillar: 'Platform Comparisons', priority: 0.8, changeFrequency: 'weekly' },
  { slug: '/seo/best-platform-designers', pillar: 'Platform Comparisons', priority: 0.8, changeFrequency: 'weekly' },

  // Pillar 7: Freelance Success Strategies (5 pages)
  { slug: '/seo/how-to-stand-out-on-crowded-freelance-platforms', pillar: 'Success Strategies', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/advanced-bidding-strategies-to-win-more-freelance-projects', pillar: 'Success Strategies', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/building-long-term-client-relationships-on-freelance-platforms', pillar: 'Success Strategies', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/how-to-get-5-star-reviews-on-every-freelance-project', pillar: 'Success Strategies', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/scaling-your-freelance-business-from-solo-to-agency', pillar: 'Success Strategies', priority: 0.8, changeFrequency: 'monthly' },

  // Pillar 8: Niche-Specific Platform Guides (5 pages)
  { slug: '/seo/best-freelance-platforms-web-developers-2025', pillar: 'Niche Guides', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/top-freelance-platforms-graphic-designers-creatives', pillar: 'Niche Guides', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/best-platforms-freelance-writers-content-creators', pillar: 'Niche Guides', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/freelance-platforms-virtual-assistants-complete-guide', pillar: 'Niche Guides', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/best-freelance-platforms-marketing-consultants', pillar: 'Niche Guides', priority: 0.8, changeFrequency: 'monthly' },

  // Pillar 9: Freelance Business Management (5 pages)
  { slug: '/seo/freelance-invoicing-guide', pillar: 'Business Management', priority: 0.7, changeFrequency: 'monthly' },
  { slug: '/seo/freelance-tax-guide', pillar: 'Business Management', priority: 0.8, changeFrequency: 'yearly' },
  { slug: '/seo/freelance-contracts-101', pillar: 'Business Management', priority: 0.7, changeFrequency: 'monthly' },
  { slug: '/seo/managing-multiple-clients', pillar: 'Business Management', priority: 0.7, changeFrequency: 'monthly' },
  { slug: '/seo/freelance-business-insurance', pillar: 'Business Management', priority: 0.7, changeFrequency: 'yearly' },

  // Pillar 10: Platform Features & Best Practices (5 pages)
  { slug: '/seo/optimizing-freelance-profile-maximum-visibility', pillar: 'Best Practices', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/how-to-write-proposals-that-win', pillar: 'Best Practices', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/mastering-freelance-platform-algorithms', pillar: 'Best Practices', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/building-portfolio-that-converts', pillar: 'Best Practices', priority: 0.8, changeFrequency: 'monthly' },
  { slug: '/seo/freelance-platform-communication', pillar: 'Best Practices', priority: 0.7, changeFrequency: 'monthly' },
];

/**
 * Generate sitemap entries for all SEO pages
 * Includes localized versions and proper alternates
 */
export function generateSeoSitemapEntries(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add SEO index page
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}/seo`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}/seo`])
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
