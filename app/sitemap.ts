// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getCategoriesCached, getPostsCached, getPlatformsCached } from "@/lib/sitemap-data";

export const revalidate = 900; // extra veiligheid (15 min)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";

  // Vaste routes (pas aan)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "daily", priority: 1, lastModified: new Date() },
    { url: `${baseUrl}/blog`, changeFrequency: "daily", priority: 0.9, lastModified: new Date() },
    { url: `${baseUrl}/platforms`, changeFrequency: "weekly", priority: 0.9, lastModified: new Date() },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.7, lastModified: new Date() },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.5, lastModified: new Date() },
    { url: `${baseUrl}/reviews`, changeFrequency: "daily", priority: 0.9, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly", priority: 0.3, lastModified: new Date() },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.3, lastModified: new Date() },
    { url: `${baseUrl}/disclosure`, changeFrequency: "yearly", priority: 0.3, lastModified: new Date() },
  ];

  try {
    const [categories, posts, platforms] = await Promise.all([getCategoriesCached(), getPostsCached(), getPlatformsCached()]);

    const categoryUrls: MetadataRoute.Sitemap = categories.map((p) => ({
      url: `${baseUrl}/category/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${baseUrl}/post/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const platformUrls: MetadataRoute.Sitemap = platforms.map((p) => ({
      url: `${baseUrl}/platforms/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...categoryUrls, ...postUrls, ...platformUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least static pages if database fails
    return staticRoutes;
  }
}
