// lib/sitemap-auto.ts
import type { MetadataRoute } from "next";
import pagesManifest from "./pages-manifest.json";

/**
 * BUILD-TIME Auto-Discovery Sitemap Generator
 *
 * Reads from pages-manifest.json (generated at build time by prebuild script)
 * This works on Netlify Edge Functions since it doesn't require fs access at runtime.
 *
 * To regenerate the manifest locally: node scripts/generate-pages-manifest.mjs
 * The manifest is automatically regenerated during `npm run build` via prebuild script.
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";
const locales = ['en', 'nl'] as const;

interface PageEntry {
  path: string;
  lastModified: string;
  hasSubpages: boolean;
}

interface PagesManifest {
  generated: string;
  homepage: {
    lastModified: string;
  };
  pages: PageEntry[];
}

// Type assertion for imported JSON
const manifest = pagesManifest as PagesManifest;

/**
 * Determine priority based on path
 */
function getPriority(pagePath: string): number {
  // Homepage
  if (pagePath === '/') return 1.0;

  // Top-level important pages
  if (['/platforms', '/blog', '/comparisons', '/reviews', '/tools'].includes(pagePath)) {
    return 0.9;
  }

  // Pricing and "what is" pages (high SEO value)
  if (pagePath.includes('pricing') || pagePath.includes('what-is-')) {
    return 0.9;
  }

  // Complete guides and main reviews
  if (pagePath.includes('complete-guide') || pagePath.includes('review')) {
    return 0.85;
  }

  // Comparisons
  if (pagePath.includes('-vs-')) {
    return 0.8;
  }

  // Tool pages
  if (pagePath.startsWith('/tools/')) {
    return 0.8;
  }

  // Resource/guide pages
  if (pagePath.startsWith('/resources/')) {
    return 0.75;
  }

  // Secondary pages
  if (['/about', '/faq', '/newsletter'].includes(pagePath)) {
    return 0.6;
  }

  // Legal pages
  if (['/privacy', '/terms', '/disclosure', '/contact'].includes(pagePath)) {
    return 0.3;
  }

  // Default
  return 0.7;
}

/**
 * Determine change frequency based on path
 */
function getChangeFrequency(pagePath: string): 'daily' | 'weekly' | 'monthly' | 'yearly' {
  // Homepage and main listings
  if (['/', '/blog', '/reviews'].includes(pagePath)) {
    return 'daily';
  }

  // Pricing pages change frequently
  if (pagePath.includes('pricing') || pagePath.includes('cost')) {
    return 'weekly';
  }

  // Platform listings and comparisons
  if (['/platforms', '/comparisons'].includes(pagePath) || pagePath.includes('-vs-')) {
    return 'weekly';
  }

  // Tool pages
  if (pagePath.startsWith('/tools')) {
    return 'monthly';
  }

  // Legal pages rarely change
  if (['/privacy', '/terms', '/disclosure'].includes(pagePath)) {
    return 'yearly';
  }

  // Tax/insurance content
  if (pagePath.includes('tax') || pagePath.includes('insurance')) {
    return 'yearly';
  }

  // Default
  return 'monthly';
}

/**
 * Generate sitemap entries for ALL auto-discovered pages
 * Reads from build-time generated manifest (no fs access needed at runtime)
 */
export function generateAutoSitemapEntries(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add homepage for each locale
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(manifest.homepage.lastModified),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
      },
    });
  });

  // Add all discovered pages from manifest
  manifest.pages.forEach((page) => {
    const priority = getPriority(page.path);
    const changeFrequency = getChangeFrequency(page.path);

    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(page.lastModified),
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page.path}`])
          ),
        },
      });
    });
  });

  console.log(`[Sitemap] Loaded ${manifest.pages.length + 1} pages from manifest (${sitemapEntries.length} URLs with locales)`);
  console.log(`[Sitemap] Manifest generated at: ${manifest.generated}`);

  return sitemapEntries;
}

/**
 * Get count of all discovered pages
 */
export function getAutoDiscoveredPageCount(): number {
  return manifest.pages.length + 1; // +1 for homepage
}
