// lib/sitemap-auto.ts
import type { MetadataRoute } from "next";
import fs from 'fs';
import path from 'path';

/**
 * FULL AUTO-DISCOVERY Sitemap Generator
 *
 * WordPress-style: Automatically finds ALL pages in the entire app.
 * No manual configuration needed - just create a page and it's in the sitemap!
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";
const locales = ['en', 'nl'] as const;

// Paths to skip (internal Next.js stuff, API routes, etc.)
const SKIP_PATHS = [
  'api',           // API routes
  'test',          // Test pages
  'loading-demo',  // Demo pages
  '_',             // Next.js internal
];

// Files/folders to ignore
const SKIP_PATTERNS = [
  /^_/,            // _components, _utils, etc.
  /^\[.*\]$/,      // [slug], [id], etc. (dynamic routes handled separately)
  /\.tsx?$/,       // Individual files (not directories)
  /^loading/,      // loading.tsx
  /^error/,        // error.tsx
  /^not-found/,    // not-found.tsx
];

interface DiscoveredPage {
  path: string;
  lastModified: Date;
  hasSubpages: boolean;
}

/**
 * Recursively discover all pages in a directory
 */
function discoverPages(dir: string, basePath: string = ''): DiscoveredPage[] {
  const pages: DiscoveredPage[] = [];

  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      // Skip non-directories
      if (!entry.isDirectory()) continue;

      // Skip patterns
      if (SKIP_PATTERNS.some(pattern => pattern.test(entry.name))) continue;

      // Skip explicit paths
      if (SKIP_PATHS.includes(entry.name)) continue;

      const fullPath = path.join(dir, entry.name);
      const urlPath = basePath ? `${basePath}/${entry.name}` : `/${entry.name}`;

      // Check if this directory has a page.tsx
      const pageTsxPath = path.join(fullPath, 'page.tsx');
      const hasPage = fs.existsSync(pageTsxPath);

      if (hasPage) {
        // Get modification time
        let lastModified = new Date();
        try {
          const stats = fs.statSync(pageTsxPath);
          lastModified = stats.mtime;
        } catch {}

        // Check for subpages
        const subEntries = fs.readdirSync(fullPath, { withFileTypes: true });
        const hasSubpages = subEntries.some(e =>
          e.isDirectory() &&
          !SKIP_PATTERNS.some(p => p.test(e.name)) &&
          fs.existsSync(path.join(fullPath, e.name, 'page.tsx'))
        );

        pages.push({
          path: urlPath,
          lastModified,
          hasSubpages,
        });

        // Recursively discover subpages
        const subPages = discoverPages(fullPath, urlPath);
        pages.push(...subPages);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }

  return pages;
}

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
 */
export function generateAutoSitemapEntries(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), 'app', '[locale]');
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Discover all pages
  const discoveredPages = discoverPages(appDir);

  // Add homepage manually (it's at /app/[locale]/page.tsx, not in a subdirectory)
  const homepagePath = path.join(appDir, 'page.tsx');
  if (fs.existsSync(homepagePath)) {
    let homeModified = new Date();
    try {
      homeModified = fs.statSync(homepagePath).mtime;
    } catch {}

    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}`,
        lastModified: homeModified,
        changeFrequency: 'daily',
        priority: 1.0,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}`])
          ),
        },
      });
    });
  }

  // Add all discovered pages
  discoveredPages.forEach((page) => {
    const priority = getPriority(page.path);
    const changeFrequency = getChangeFrequency(page.path);

    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: page.lastModified,
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

  console.log(`[Sitemap] Auto-discovered ${discoveredPages.length + 1} pages (${sitemapEntries.length} URLs with locales)`);

  return sitemapEntries;
}

/**
 * Get count of all discovered pages
 */
export function getAutoDiscoveredPageCount(): number {
  const appDir = path.join(process.cwd(), 'app', '[locale]');
  return discoverPages(appDir).length + 1; // +1 for homepage
}
