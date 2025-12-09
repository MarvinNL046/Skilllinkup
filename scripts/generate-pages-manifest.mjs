#!/usr/bin/env node
/**
 * BUILD-TIME Pages Manifest Generator
 *
 * Scans the filesystem during build and generates a JSON manifest
 * that the sitemap can read at runtime (without needing fs access).
 *
 * Run: node scripts/generate-pages-manifest.mjs
 * Or automatically via: npm run prebuild
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

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

/**
 * Recursively discover all pages in a directory
 * Now also scans directories without page.tsx for nested pages (e.g., /gids/platform-reviews/*)
 */
function discoverPages(dir, basePath = '') {
  const pages = [];

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
        let lastModified = new Date().toISOString();
        try {
          const stats = fs.statSync(pageTsxPath);
          lastModified = stats.mtime.toISOString();
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
      }

      // ALWAYS recursively scan subdirectories, even if parent has no page.tsx
      // This ensures we find pages like /gids/platform-reviews/upwork-honest-review-2026
      const subPages = discoverPages(fullPath, urlPath);
      pages.push(...subPages);
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error);
  }

  return pages;
}

/**
 * Main function to generate the manifest
 */
function generateManifest() {
  console.log('[Pages Manifest] Starting filesystem scan...');

  const appDir = path.join(projectRoot, 'app', '[locale]');
  const outputPath = path.join(projectRoot, 'lib', 'pages-manifest.json');

  // Discover all pages
  const discoveredPages = discoverPages(appDir);

  // Check for homepage
  const homepagePath = path.join(appDir, 'page.tsx');
  let homepageLastModified = new Date().toISOString();

  if (fs.existsSync(homepagePath)) {
    try {
      homepageLastModified = fs.statSync(homepagePath).mtime.toISOString();
    } catch {}
  }

  // Create manifest
  const manifest = {
    generated: new Date().toISOString(),
    homepage: {
      lastModified: homepageLastModified,
    },
    pages: discoveredPages,
  };

  // Write manifest
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));

  console.log(`[Pages Manifest] Generated ${discoveredPages.length} pages`);
  console.log(`[Pages Manifest] Saved to: ${outputPath}`);

  // Log some stats
  const categories = {
    resources: discoveredPages.filter(p => p.path.startsWith('/resources')).length,
    tools: discoveredPages.filter(p => p.path.startsWith('/tools')).length,
    other: discoveredPages.filter(p => !p.path.startsWith('/resources') && !p.path.startsWith('/tools')).length,
  };

  console.log(`[Pages Manifest] Breakdown:`);
  console.log(`  - Resources: ${categories.resources}`);
  console.log(`  - Tools: ${categories.tools}`);
  console.log(`  - Other: ${categories.other}`);

  return manifest;
}

// Run
generateManifest();
