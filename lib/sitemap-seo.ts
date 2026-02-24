// lib/sitemap-seo.ts
import type { MetadataRoute } from "next";
import fs from 'fs';
import path from 'path';

/**
 * AUTO-DISCOVERY Sitemap Generator
 *
 * WordPress-style: Automatically finds all pages in /resources/ directory.
 * No manual configuration needed - just create a page and it's in the sitemap!
 */

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";
const locales = ['en', 'nl'] as const;

/**
 * Automatically discover all resource pages by scanning the filesystem
 */
function discoverResourcePages(): string[] {
 const resourcesDir = path.join(process.cwd(), 'app', '[locale]', 'resources');

 try {
 const entries = fs.readdirSync(resourcesDir, { withFileTypes: true });

 return entries
 .filter(entry =>{
 // Only directories (each directory = a page)
 if (!entry.isDirectory()) return false;
 // Skip special Next.js directories
 if (entry.name.startsWith('[') || entry.name.startsWith('_')) return false;
 // Check if it has a page.tsx file
 const pagePath = path.join(resourcesDir, entry.name, 'page.tsx');
 return fs.existsSync(pagePath);
 })
 .map(entry =>entry.name);
 } catch (error) {
 console.error('Error scanning resources directory:', error);
 return [];
 }
}

/**
 * Get file modification time for lastModified
 */
function getPageModifiedDate(slug: string): Date {
 try {
 const pagePath = path.join(process.cwd(), 'app', '[locale]', 'resources', slug, 'page.tsx');
 const stats = fs.statSync(pagePath);
 return stats.mtime;
 } catch {
 return new Date();
 }
}

/**
 * Determine priority based on slug patterns
 */
function getPriority(slug: string): number {
 // High priority: main guides, pricing pages, "what is" pages
 if (slug.includes('complete-guide') || slug.includes('pricing') || slug.startsWith('what-is-')) {
 return 0.9;
 }
 // Medium-high: comparisons, reviews
 if (slug.includes('-vs-') || slug.includes('review') || slug.includes('best-')) {
 return 0.8;
 }
 // Medium: how-to guides
 if (slug.startsWith('how-to-') || slug.includes('guide')) {
 return 0.7;
 }
 // Default
 return 0.7;
}

/**
 * Determine change frequency based on content type
 */
function getChangeFrequency(slug: string): 'daily' | 'weekly' | 'monthly' | 'yearly' {
 // Pricing pages change more often
 if (slug.includes('pricing') || slug.includes('cost')) {
 return 'weekly';
 }
 // Reviews and comparisons
 if (slug.includes('review') || slug.includes('-vs-')) {
 return 'weekly';
 }
 // Evergreen content
 if (slug.includes('tax') || slug.includes('insurance')) {
 return 'yearly';
 }
 // Default
 return 'monthly';
}

/**
 * Generate sitemap entries for all resource pages (AUTO-DISCOVERED)
 *
 * Just create a page in /app/[locale]/resources/your-page/page.tsx
 * and it will automatically appear in the sitemap!
 */
export function generateSeoSitemapEntries(): MetadataRoute.Sitemap {
 const sitemapEntries: MetadataRoute.Sitemap = [];

 // Auto-discover all resource pages
 const resourceSlugs = discoverResourcePages();

 console.log(`[Sitemap] Auto-discovered ${resourceSlugs.length} resource pages`);

 // Add Resources index page
 locales.forEach((locale) =>{
 sitemapEntries.push({
 url: `${baseUrl}/${locale}/resources`,
 lastModified: new Date(),
 changeFrequency: 'weekly' as const,
 priority: 0.9,
 alternates: {
 languages: Object.fromEntries(
 locales.map((l) =>[l, `${baseUrl}/${l}/resources`])
 ),
 },
 });
 });

 // Add all auto-discovered pages
 resourceSlugs.forEach((slug) =>{
 const lastModified = getPageModifiedDate(slug);
 const priority = getPriority(slug);
 const changeFrequency = getChangeFrequency(slug);

 locales.forEach((locale) =>{
 sitemapEntries.push({
 url: `${baseUrl}/${locale}/resources/${slug}`,
 lastModified,
 changeFrequency,
 priority,
 alternates: {
 languages: Object.fromEntries(
 locales.map((l) =>[l, `${baseUrl}/${l}/resources/${slug}`])
 ),
 },
 });
 });
 });

 return sitemapEntries;
}

/**
 * Get all resource page slugs (for navigation, etc.)
 */
export function getResourceSlugs(): string[] {
 return discoverResourcePages();
}

/**
 * Get total count of resource pages
 */
export function getSeoPageCount(): number {
 return discoverResourcePages().length;
}
