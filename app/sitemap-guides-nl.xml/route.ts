// app/sitemap-guides-nl.xml/route.ts
import { NextResponse } from "next/server";
import pagesManifest from "@/lib/pages-manifest.json";

/**
 * DUTCH GUIDES SITEMAP
 *
 * All /gids/* pages for Dutch locale
 * URLs use /nl/gids/... (native Dutch URLs)
 */

export const revalidate = 900;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";

interface PageEntry {
  path: string;
  lastModified: string;
  hasSubpages: boolean;
}

// Pillar categories with their Dutch names
const PILLAR_NAMES_NL: Record<string, string> = {
  "aan-de-slag": "Aan de Slag",
  "best-practices": "Best Practices",
  "niche-gidsen": "Niche Gidsen",
  "platform-reviews": "Platform Reviews",
  "platform-selectie": "Platform Selectie",
  "platform-vergelijkingen": "Platform Vergelijkingen",
  "prijzen-verdienen": "Prijzen & Verdienen",
  "succes-strategieen": "Succes Strategieën",
  "tools-productiviteit": "Tools & Productiviteit",
  "zakelijk-beheer": "Zakelijk Beheer",
};

function getPriority(path: string): number {
  // Gids overview
  if (path === "/gids") return 0.9;

  // Pillar pages
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 2 && segments[0] === "gids") return 0.85;

  // Pricing/cost pages (high SEO value)
  if (path.includes("prijzen") || path.includes("kosten") || path.includes("tarieven") || path.includes("uurtarief")) return 0.9;

  // Reviews (high SEO value)
  if (path.includes("review") || path.includes("eerlijke-review")) return 0.85;

  // Comparisons (high SEO value)
  if (path.includes("-vs-") || path.includes("vergelijk")) return 0.8;

  // Default guide pages
  return 0.8;
}

function getChangeFrequency(path: string): string {
  // Pricing pages change frequently
  if (path.includes("prijzen") || path.includes("kosten") || path.includes("tarieven")) return "weekly";

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
  const guidePages = manifest.pages.filter(page => page.path.startsWith("/gids"));

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  // Gids overview page
  xml += `  <url>
    <loc>${baseUrl}/nl/gids</loc>
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

    // Dutch uses /gids/*, English uses /guides/*
    const nlPath = page.path;
    const enPath = page.path.replace("/gids", "/guides");

    xml += `  <url>
    <loc>${baseUrl}/nl${nlPath}</loc>
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
