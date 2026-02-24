// app/sitemap-guides-en.xml/route.ts
import { NextResponse } from "next/server";
import pagesManifest from "@/lib/pages-manifest.json";

/**
 * ENGLISH GUIDES SITEMAP
 *
 * All /guides/* pages for English locale
 * URLs use /en/guides/... (rewritten from /gids)
 */

export const revalidate = 900;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";

interface PageEntry {
 path: string;
 lastModified: string;
 hasSubpages: boolean;
}

// Pillar categories with their English names
const PILLAR_NAMES: Record<string, string>= {
 "aan-de-slag": "Getting Started",
 "best-practices": "Best Practices",
 "niche-gidsen": "Niche Guides",
 "platform-reviews": "Platform Reviews",
 "platform-selectie": "Platform Selection",
 "platform-vergelijkingen": "Platform Comparisons",
 "prijzen-verdienen": "Pricing & Earnings",
 "succes-strategieen": "Success Strategies",
 "tools-productiviteit": "Tools & Productivity",
 "zakelijk-beheer": "Business Management",
};

function getPriority(path: string): number {
 // Guides overview
 if (path === "/gids" || path === "/guides") return 0.9;

 // Pillar pages
 const segments = path.split("/").filter(Boolean);
 if (segments.length === 2 && segments[0] === "gids") return 0.85;

 // Pricing/cost pages (high SEO value)
 if (path.includes("pricing") || path.includes("kosten") || path.includes("rate")) return 0.9;

 // Reviews (high SEO value)
 if (path.includes("review") || path.includes("honest-review")) return 0.85;

 // Comparisons (high SEO value)
 if (path.includes("-vs-") || path.includes("vergelijk")) return 0.8;

 // Default guide pages
 return 0.8;
}

function getChangeFrequency(path: string): string {
 // Pricing pages change frequently
 if (path.includes("pricing") || path.includes("kosten") || path.includes("rate")) return "weekly";

 // Reviews need updates
 if (path.includes("review")) return "weekly";

 // Comparisons
 if (path.includes("-vs-")) return "weekly";

 // Most guides are monthly
 return "monthly";
}

export async function GET() {
 const manifest = pagesManifest as { pages: PageEntry[] };

 // Get all /gids/* pages
 const guidePages = manifest.pages.filter(page =>page.path.startsWith("/gids"));

 let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
 xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

 // Guides overview page
 xml += ` <url>
 <loc>${baseUrl}/en/guides</loc>
 <lastmod>${new Date().toISOString()}</lastmod>
 <changefreq>weekly</changefreq>
 <priority>0.9</priority>
 <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/guides" />
 <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl/gids" />
 <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/guides" />
 </url>
`;

 // All guide pages
 for (const page of guidePages) {
 if (page.path === "/gids") continue; // Already added overview

 const priority = getPriority(page.path);
 const changefreq = getChangeFrequency(page.path);

 // Convert /gids/* to /guides/* for English URLs
 const enPath = page.path.replace("/gids", "/guides");
 const nlPath = page.path;

 xml += ` <url>
 <loc>${baseUrl}/en${enPath}</loc>
 <lastmod>${page.lastModified}</lastmod>
 <changefreq>${changefreq}</changefreq>
 <priority>${priority}</priority>
 <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${enPath}" />
 <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl${nlPath}" />
 <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en${enPath}" />
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
}
