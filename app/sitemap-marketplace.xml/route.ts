// app/sitemap-marketplace.xml/route.ts
import { NextResponse } from "next/server";
import {
  getMarketplaceGigSlugsCached,
  getMarketplaceProjectSlugsCached,
  getMarketplaceCategorySlugsCached,
} from "@/lib/sitemap-data";

/**
 * MARKETPLACE SITEMAP
 *
 * Includes:
 * - Static marketplace pages (marketplace, gigs, projects, local, quote-request, freelancers)
 * - Individual gig pages from DB (active gigs)
 * - Individual project pages from DB (open projects)
 * - Category landing pages (active parent categories)
 * - Category filter pages for gigs (/marketplace/gigs?category=[slug])
 */

export const revalidate = 900;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";
const locales = ["en", "nl"] as const;

// Static marketplace pages with their priorities and change frequencies
const STATIC_MARKETPLACE_PAGES = [
  { path: "/marketplace", priority: 0.9, changefreq: "daily" },
  { path: "/marketplace/gigs", priority: 0.9, changefreq: "daily" },
  { path: "/marketplace/projects", priority: 0.8, changefreq: "daily" },
  { path: "/marketplace/local", priority: 0.8, changefreq: "weekly" },
  { path: "/marketplace/quote-request", priority: 0.7, changefreq: "monthly" },
  { path: "/marketplace/freelancers", priority: 0.8, changefreq: "daily" },
];

export async function GET() {
  try {
    const [gigs, projects, categories] = await Promise.all([
      getMarketplaceGigSlugsCached(),
      getMarketplaceProjectSlugsCached(),
      getMarketplaceCategorySlugsCached(),
    ]);

    const now = new Date().toISOString();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

    // Static marketplace pages
    for (const page of STATIC_MARKETPLACE_PAGES) {
      for (const locale of locales) {
        xml += `  <url>
    <loc>${baseUrl}/${locale}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page.path}" />
    <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl${page.path}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en${page.path}" />
  </url>
`;
      }
    }

    // Individual gig pages grouped by slug
    // Group by slug to find if both EN and NL versions exist
    const gigsBySlug = new Map<string, { en?: string; nl?: string; updated_at: string }>();
    for (const gig of gigs) {
      const existing = gigsBySlug.get(gig.slug);
      const lastmod = new Date(gig.updated_at).toISOString();
      if (existing) {
        gigsBySlug.set(gig.slug, {
          ...existing,
          [gig.locale]: gig.locale,
          updated_at: lastmod,
        });
      } else {
        gigsBySlug.set(gig.slug, {
          [gig.locale]: gig.locale,
          updated_at: lastmod,
        } as { en?: string; nl?: string; updated_at: string });
      }
    }

    // Add all gig pages (per locale)
    for (const gig of gigs) {
      const lastmod = new Date(gig.updated_at).toISOString();
      const hasNl = gigsBySlug.get(gig.slug)?.nl !== undefined;
      const hasEn = gigsBySlug.get(gig.slug)?.en !== undefined;

      // Only add the URL for the correct locale
      xml += `  <url>
    <loc>${baseUrl}/${gig.locale}/marketplace/gigs/${gig.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>`;

      if (hasEn) {
        xml += `
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/marketplace/gigs/${gig.slug}" />`;
      }
      if (hasNl) {
        xml += `
    <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl/marketplace/gigs/${gig.slug}" />`;
      }
      xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/marketplace/gigs/${gig.slug}" />
  </url>
`;
    }

    // Individual project pages (per locale)
    for (const project of projects) {
      const lastmod = new Date(project.updated_at).toISOString();
      xml += `  <url>
    <loc>${baseUrl}/${project.locale}/marketplace/projects/${project.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/marketplace/projects/${project.slug}" />
  </url>
`;
    }

    // Category landing pages: /[locale]/marketplace/category/[slug]
    // Group by slug to detect bilingual categories
    const categoriesBySlug = new Map<string, Set<string>>();
    for (const cat of categories) {
      const localeSet = categoriesBySlug.get(cat.slug) ?? new Set<string>();
      localeSet.add(cat.locale);
      categoriesBySlug.set(cat.slug, localeSet);
    }

    for (const cat of categories) {
      const localeSet = categoriesBySlug.get(cat.slug) ?? new Set<string>();
      const hasEn = localeSet.has("en");
      const hasNl = localeSet.has("nl");

      xml += `  <url>
    <loc>${baseUrl}/${cat.locale}/marketplace/category/${cat.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>`;

      if (hasEn) {
        xml += `
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/marketplace/category/${cat.slug}" />`;
      }
      if (hasNl) {
        xml += `
    <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl/marketplace/category/${cat.slug}" />`;
      }
      xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/marketplace/category/${cat.slug}" />
  </url>
`;
    }

    // Category filter pages: /[locale]/marketplace/gigs?category=[slug]
    // These are SEO-friendly discovery pages for each category
    for (const cat of categories) {
      for (const locale of locales) {
        xml += `  <url>
    <loc>${baseUrl}/${locale}/marketplace/gigs?category=${cat.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/marketplace/gigs?category=${cat.slug}" />
    <xhtml:link rel="alternate" hreflang="nl" href="${baseUrl}/nl/marketplace/gigs?category=${cat.slug}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/marketplace/gigs?category=${cat.slug}" />
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
    console.error("Error generating marketplace sitemap:", error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,
      {
        headers: { "Content-Type": "application/xml" },
        status: 500,
      }
    );
  }
}
