// app/sitemap-blog.xml/route.ts
import { NextResponse } from "next/server";
import { getPostsCached, getCategoriesCached } from "@/lib/sitemap-data";

/**
 * BLOG SITEMAP
 *
 * Includes: All published blog posts and categories
 * Supports: hreflang for EN/NL versions
 */

export const revalidate = 900;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";
const locales = ["en", "nl"] as const;

export async function GET() {
 try {
 const [enPosts, nlPosts, enCategories, nlCategories] = await Promise.all([
 getPostsCached("en"),
 getPostsCached("nl"),
 getCategoriesCached("en"),
 getCategoriesCached("nl"),
 ]);

 let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
 xmlns:xhtml="http://www.w3.org/1999/xhtml"
 xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;

 // Blog index pages
 for (const locale of locales) {
 xml += ` <url>
 <loc>${baseUrl}/${locale}/blog</loc>
 <lastmod>${new Date().toISOString()}</lastmod>
 <changefreq>daily</changefreq>
 <priority>0.9</priority>
 <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/blog" />
 <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl/blog" />
 <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/blog" />
 </url>
`;
 }

 // English posts
 for (const post of enPosts) {
 const nlVersion = nlPosts.find(p =>p.slug === post.slug);
 const lastmod = new Date(post.updated_at).toISOString();

 xml += ` <url>
 <loc>${baseUrl}/en/post/${post.slug}</loc>
 <lastmod>${lastmod}</lastmod>
 <changefreq>weekly</changefreq>
 <priority>0.8</priority>
 <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/post/${post.slug}" />`;

 if (nlVersion) {
 xml += `
 <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl/post/${post.slug}" />`;
 }
 xml += `
 <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/post/${post.slug}" />
 </url>
`;
 }

 // Dutch posts (only those without English version)
 for (const post of nlPosts) {
 const enVersion = enPosts.find(p =>p.slug === post.slug);
 if (enVersion) continue; // Already included above

 const lastmod = new Date(post.updated_at).toISOString();
 xml += ` <url>
 <loc>${baseUrl}/nl/post/${post.slug}</loc>
 <lastmod>${lastmod}</lastmod>
 <changefreq>weekly</changefreq>
 <priority>0.8</priority>
 <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl/post/${post.slug}" />
 <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/nl/post/${post.slug}" />
 </url>
`;
 }

 // Categories
 for (const category of enCategories) {
 const nlVersion = nlCategories.find(c =>c.slug === category.slug);
 const lastmod = new Date(category.updated_at).toISOString();

 for (const locale of locales) {
 xml += ` <url>
 <loc>${baseUrl}/${locale}/category/${category.slug}</loc>
 <lastmod>${lastmod}</lastmod>
 <changefreq>weekly</changefreq>
 <priority>0.7</priority>
 <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/category/${category.slug}" />`;

 if (nlVersion) {
 xml += `
 <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl/category/${category.slug}" />`;
 }
 xml += `
 <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/category/${category.slug}" />
 </url>
`;
 }
 }

 xml += `</urlset>`;

 return new NextResponse(xml, {
 headers: {
 "Content-Type": "application/xml",
 "Cache-Control": "public, max-age=900, s-maxage=900",
 },
 });
 } catch (error) {
 console.error("Error generating blog sitemap:", error);
 return new NextResponse(
 `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
 {
 headers: { "Content-Type": "application/xml" },
 status: 500,
 }
 );
 }
}
