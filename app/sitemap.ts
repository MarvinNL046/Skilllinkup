// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getCategoriesCached, getPostsCached, getPlatformsCached } from "@/lib/sitemap-data";
import { generateAutoSitemapEntries } from "@/lib/sitemap-auto";

/**
 * AUTOMATIC SITEMAP GENERATOR
 *
 * WordPress-style: All pages are automatically discovered!
 *
 * Sources:
 * 1. Auto-discovered static pages (scans /app/[locale]/ filesystem)
 * 2. Database content (posts, platforms, categories)
 *
 * Just create a page anywhere in /app/[locale]/ and it's automatically in the sitemap!
 */

export const revalidate = 900; // Revalidate every 15 minutes

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";
const locales = ['en', 'nl'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. AUTO-DISCOVER all static pages from filesystem
  const autoDiscoveredPages = generateAutoSitemapEntries();

  try {
    // 2. Fetch DATABASE content per locale
    const [enCategories, nlCategories, enPosts, nlPosts, enPlatforms, nlPlatforms] = await Promise.all([
      getCategoriesCached('en'),
      getCategoriesCached('nl'),
      getPostsCached('en'),
      getPostsCached('nl'),
      getPlatformsCached('en'),
      getPlatformsCached('nl'),
    ]);

    // Helper to generate URLs for database content
    const generateDatabaseUrls = (
      enItems: { slug: string; updated_at: string | Date }[],
      nlItems: { slug: string; updated_at: string | Date }[],
      pathPrefix: string,
      priority: number
    ): MetadataRoute.Sitemap => {
      const urls: MetadataRoute.Sitemap = [];

      // Generate EN URLs
      enItems.forEach((item) => {
        const nlVersion = nlItems.find((nl) => nl.slug === item.slug);
        urls.push({
          url: `${baseUrl}/en${pathPrefix}/${item.slug}`,
          lastModified: new Date(item.updated_at),
          changeFrequency: "weekly" as const,
          priority,
          alternates: nlVersion ? {
            languages: {
              en: `${baseUrl}/en${pathPrefix}/${item.slug}`,
              nl: `${baseUrl}/nl${pathPrefix}/${item.slug}`,
            },
          } : undefined,
        });
      });

      // Generate NL URLs
      nlItems.forEach((item) => {
        const enVersion = enItems.find((en) => en.slug === item.slug);
        urls.push({
          url: `${baseUrl}/nl${pathPrefix}/${item.slug}`,
          lastModified: new Date(item.updated_at),
          changeFrequency: "weekly" as const,
          priority,
          alternates: enVersion ? {
            languages: {
              en: `${baseUrl}/en${pathPrefix}/${item.slug}`,
              nl: `${baseUrl}/nl${pathPrefix}/${item.slug}`,
            },
          } : undefined,
        });
      });

      return urls;
    };

    // Generate database content URLs
    const categoryUrls = generateDatabaseUrls(enCategories, nlCategories, '/category', 0.7);
    const postUrls = generateDatabaseUrls(enPosts, nlPosts, '/post', 0.8);
    const platformUrls = generateDatabaseUrls(enPlatforms, nlPlatforms, '/platforms', 0.8);

    // Combine all sources
    return [...autoDiscoveredPages, ...categoryUrls, ...postUrls, ...platformUrls];

  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least auto-discovered pages if database fails
    return autoDiscoveredPages;
  }
}
