// app/sitemap-pages.xml/route.ts
import { NextResponse } from "next/server";
import pagesManifest from "@/lib/pages-manifest.json";

/**
 * STATIC PAGES SITEMAP
 *
 * Includes: homepage, about, contact, tools, privacy, terms, etc.
 * Excludes: blog posts, platforms, guides (they have their own sitemaps)
 */

export const revalidate = 900;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";
const locales = ["en", "nl"] as const;

// Pages to exclude (they have their own sitemaps)
const EXCLUDED_PREFIXES = ["/gids/", "/guides/", "/resources/", "/post/", "/platforms/"];
const EXCLUDED_PATHS = ["/gids", "/guides", "/resources", "/blog", "/platforms", "/reviews", "/comparisons", "/category", "/blog/category"];

interface PageEntry {
 path: string;
 lastModified: string;
 hasSubpages: boolean;
}

function shouldIncludePage(path: string): boolean {
 // Exclude pages that have their own sitemaps
 if (EXCLUDED_PATHS.includes(path)) return false;
 if (EXCLUDED_PREFIXES.some(prefix =>path.startsWith(prefix))) return false;
 return true;
}

function getPriority(path: string): number {
 if (path === "/") return 1.0;
 if (["/tools", "/newsletter"].includes(path)) return 0.9;
 if (path.startsWith("/tools/")) return 0.8;
 if (["/about", "/faq"].includes(path)) return 0.6;
 if (["/privacy", "/terms", "/disclosure", "/contact"].includes(path)) return 0.3;
 return 0.5;
}

function getChangeFrequency(path: string): string {
 if (path === "/") return "daily";
 if (path.startsWith("/tools")) return "monthly";
 if (["/privacy", "/terms", "/disclosure"].includes(path)) return "yearly";
 return "monthly";
}

export async function GET() {
 const manifest = pagesManifest as { homepage: { lastModified: string }; pages: PageEntry[] };

 // Filter to only static pages
 const staticPages = manifest.pages.filter(page =>shouldIncludePage(page.path));

 let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
 xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

 // Homepage
 for (const locale of locales) {
 xml += ` <url>
 <loc>${baseUrl}/${locale}</loc>
 <lastmod>${manifest.homepage.lastModified}</lastmod>
 <changefreq>daily</changefreq>
 <priority>1.0</priority>
 <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en" />
 <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl" />
 <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en" />
 </url>
`;
 }

 // Static pages
 for (const page of staticPages) {
 const priority = getPriority(page.path);
 const changefreq = getChangeFrequency(page.path);

 for (const locale of locales) {
 xml += ` <url>
 <loc>${baseUrl}/${locale}${page.path}</loc>
 <lastmod>${page.lastModified}</lastmod>
 <changefreq>${changefreq}</changefreq>
 <priority>${priority}</priority>
 <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page.path}" />
 <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl${page.path}" />
 <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en${page.path}" />
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
}
