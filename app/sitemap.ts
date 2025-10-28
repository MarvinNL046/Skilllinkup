// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getCategoriesCached, getPostsCached, getPlatformsCached } from "@/lib/sitemap-data";
import { generateSeoSitemapEntries } from "@/lib/sitemap-seo";

export const revalidate = 900; // extra veiligheid (15 min)

const locales = ['en', 'nl'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";

  // Generate static routes for each locale
  const staticPages = [
    { path: '/', priority: 1, changeFrequency: 'daily' as const },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/platforms', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/comparisons', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/reviews', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/disclosure', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page.path === '/' ? '' : page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page.path === '/' ? '' : page.path}`])
        ),
      },
    }))
  );

  try {
    // Fetch content per locale separately
    const [enCategories, nlCategories, enPosts, nlPosts, enPlatforms, nlPlatforms] = await Promise.all([
      getCategoriesCached('en'),
      getCategoriesCached('nl'),
      getPostsCached('en'),
      getPostsCached('nl'),
      getPlatformsCached('en'),
      getPlatformsCached('nl'),
    ]);

    // Helper to generate URLs only for existing content with smart alternates
    const generateLocalizedUrls = (
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
          // Only add alternates if NL version exists
          alternates: nlVersion ? {
            languages: {
              en: `${baseUrl}/en${pathPrefix}/${item.slug}`,
              nl: `${baseUrl}/nl${pathPrefix}/${item.slug}`,
            },
          } : undefined,
        });
      });

      // Generate NL URLs (both NL-only and items with EN versions)
      nlItems.forEach((item) => {
        const enVersion = enItems.find((en) => en.slug === item.slug);
        urls.push({
          url: `${baseUrl}/nl${pathPrefix}/${item.slug}`,
          lastModified: new Date(item.updated_at),
          changeFrequency: "weekly" as const,
          priority,
          // Only add alternates if EN version exists
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

    // Generate URLs only for existing content
    const categoryUrls = generateLocalizedUrls(enCategories, nlCategories, '/category', 0.7);
    const postUrls = generateLocalizedUrls(enPosts, nlPosts, '/post', 0.8);
    const platformUrls = generateLocalizedUrls(enPlatforms, nlPlatforms, '/platforms', 0.8);

    // Add SEO landing pages (50+ pages)
    const seoUrls = generateSeoSitemapEntries();

    return [...staticRoutes, ...categoryUrls, ...postUrls, ...platformUrls, ...seoUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least static pages and SEO pages if database fails
    const seoUrls = generateSeoSitemapEntries();
    return [...staticRoutes, ...seoUrls];
  }
}
