// app/sitemap-platforms.xml/route.ts
import { NextResponse } from "next/server";
import { getPlatformsCached } from "@/lib/sitemap-data";

/**
 * PLATFORMS SITEMAP
 *
 * Includes: All published platform reviews
 * Supports: hreflang for EN/NL versions
 */

export const revalidate = 900;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";
const locales = ["en", "nl"] as const;

export async function GET() {
 try {
 const [enPlatforms, nlPlatforms] = await Promise.all([
 getPlatformsCached("en"),
 getPlatformsCached("nl"),
 ]);

 let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
 xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

 // Platforms index pages
 for (const locale of locales) {
 xml += ` <url>
 <loc>${baseUrl}/${locale}/platforms</loc>
 <lastmod>${new Date().toISOString()}</lastmod>
 <changefreq>weekly</changefreq>
 <priority>0.9</priority>
 <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/platforms" />
 <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl/platforms" />
 <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/platforms" />
 </url>
`;
 }

 // Reviews index pages
 for (const locale of locales) {
 xml += ` <url>
 <loc>${baseUrl}/${locale}/reviews</loc>
 <lastmod>${new Date().toISOString()}</lastmod>
 <changefreq>weekly</changefreq>
 <priority>0.9</priority>
 <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/reviews" />
 <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl/reviews" />
 <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/reviews" />
 </url>
`;
 }

 // Comparisons index pages
 for (const locale of locales) {
 xml += ` <url>
 <loc>${baseUrl}/${locale}/comparisons</loc>
 <lastmod>${new Date().toISOString()}</lastmod>
 <changefreq>weekly</changefreq>
 <priority>0.9</priority>
 <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/comparisons" />
 <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl/comparisons" />
 <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/comparisons" />
 </url>
`;
 }

 // English platforms
 for (const platform of enPlatforms) {
 const nlVersion = nlPlatforms.find(p =>p.slug === platform.slug);
 const lastmod = new Date(platform.updated_at).toISOString();

 xml += ` <url>
 <loc>${baseUrl}/en/platforms/${platform.slug}</loc>
 <lastmod>${lastmod}</lastmod>
 <changefreq>weekly</changefreq>
 <priority>0.8</priority>
 <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/platforms/${platform.slug}" />`;

 if (nlVersion) {
 xml += `
 <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl/platforms/${platform.slug}" />`;
 }
 xml += `
 <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/platforms/${platform.slug}" />
 </url>
`;
 }

 // Dutch platforms (only those without English version)
 for (const platform of nlPlatforms) {
 const enVersion = enPlatforms.find(p =>p.slug === platform.slug);
 if (enVersion) continue;

 const lastmod = new Date(platform.updated_at).toISOString();
 xml += ` <url>
 <loc>${baseUrl}/nl/platforms/${platform.slug}</loc>
 <lastmod>${lastmod}</lastmod>
 <changefreq>weekly</changefreq>
 <priority>0.8</priority>
 <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl/platforms/${platform.slug}" />
 <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/nl/platforms/${platform.slug}" />
 </url>
`;
 }

 xml += `</urlset>`;

 return new NextResponse(xml, {
 headers: {
 "Content-Type": "application/xml",
 "Cache-Control": "public, max-age=900, s-maxage=900",
 },
 });
 } catch (error) {
 console.error("Error generating platforms sitemap:", error);
 return new NextResponse(
 `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
 {
 headers: { "Content-Type": "application/xml" },
 status: 500,
 }
 );
 }
}
