// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

/**
 * SITEMAP INDEX - Professional Multi-Sitemap Architecture
 *
 * This generates a sitemap index that references individual sitemaps:
 * - /sitemap-pages.xml → Static pages (home, about, tools, etc.)
 * - /sitemap-blog.xml → Blog posts from database
 * - /sitemap-platforms.xml → Platform reviews from database
 * - /sitemap-guides-en.xml → English guides (/guides/*)
 * - /sitemap-guides-nl.xml → Dutch guides (/gids/*)
 * - /sitemap-marketplace.xml → Marketplace pages, gigs, projects, categories
 *
 * Benefits:
 * - Google can crawl sections independently
 * - Easier debugging and monitoring
 * - Better for large sites (max 50,000 URLs per sitemap)
 * - Faster index updates per content type
 */

export const revalidate = 900;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";

export async function GET() {
 const now = new Date().toISOString();

 const sitemaps = [
 { url: "sitemap-pages.xml", lastmod: now },
 { url: "sitemap-blog.xml", lastmod: now },
 { url: "sitemap-platforms.xml", lastmod: now },
 { url: "sitemap-guides-en.xml", lastmod: now },
 { url: "sitemap-guides-nl.xml", lastmod: now },
 { url: "sitemap-marketplace.xml", lastmod: now },
 ];

 const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
 .map(
 (s) =>` <sitemap>
 <loc>${baseUrl}/${s.url}</loc>
 <lastmod>${s.lastmod}</lastmod>
 </sitemap>`
 )
 .join("\n")}
</sitemapindex>`;

 return new NextResponse(xml, {
 headers: {
 "Content-Type": "application/xml",
 "Cache-Control": "public, max-age=900, s-maxage=900",
 },
 });
}
