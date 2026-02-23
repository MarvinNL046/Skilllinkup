// lib/sitemap-data.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { sql } from "./db";

type Row = { slug: string; updated_at: string | Date; published?: boolean };

type MarketplaceRow = {
  slug: string;
  locale: string;
  updated_at: string | Date;
};

type MarketplaceCategoryRow = {
  slug: string;
  locale: string;
};

async function _getPosts(locale: string): Promise<Row[]> {
  const rows = await sql`
    SELECT slug, updated_at
    FROM posts
    WHERE status = 'published'
      AND locale = ${locale}
    ORDER BY updated_at DESC
  `;
  return rows as Row[];
}

async function _getPlatforms(locale: string): Promise<Row[]> {
  const rows = await sql`
    SELECT slug, updated_at
    FROM platforms
    WHERE status = 'published'
      AND locale = ${locale}
    ORDER BY updated_at DESC
  `;
  return rows as Row[];
}

async function _getCategories(locale: string): Promise<Row[]> {
  const rows = await sql`
    SELECT slug, created_at as updated_at
    FROM categories
    WHERE locale = ${locale}
    ORDER BY name ASC
  `;
  return rows as Row[];
}

// ============================================================
// Marketplace Sitemap Queries
// ============================================================

async function _getMarketplaceGigSlugs(): Promise<MarketplaceRow[]> {
  try {
    const rows = await sql`
      SELECT slug, locale, updated_at
      FROM gigs
      WHERE status = 'active'
      ORDER BY updated_at DESC
    `;
    return rows as MarketplaceRow[];
  } catch {
    // Table may not exist yet – return empty array gracefully
    return [];
  }
}

async function _getMarketplaceProjectSlugs(): Promise<MarketplaceRow[]> {
  try {
    const rows = await sql`
      SELECT slug, locale, updated_at
      FROM projects
      WHERE status = 'open'
      ORDER BY updated_at DESC
    `;
    return rows as MarketplaceRow[];
  } catch {
    return [];
  }
}

async function _getMarketplaceCategorySlugs(): Promise<MarketplaceCategoryRow[]> {
  try {
    const rows = await sql`
      SELECT slug, locale
      FROM marketplace_categories
      WHERE is_active = true
        AND parent_id IS NULL
      ORDER BY slug ASC
    `;
    return rows as MarketplaceCategoryRow[];
  } catch {
    return [];
  }
}

// ============================================================
// Cache + tags
// ============================================================

// Cache + tags zodat revalidateTag('sitemap') deze data ongeldig kan maken
// Note: Cache keys now include locale for separate caching
export const getPostsCached = (locale: string) =>
  unstable_cache(_getPosts, [`sitemap:posts:${locale}`], {
    tags: ["sitemap"],
    revalidate: 900, // fallback auto-refresh (15 min)
  })(locale);

export const getPlatformsCached = (locale: string) =>
  unstable_cache(_getPlatforms, [`sitemap:platforms:${locale}`], {
    tags: ["sitemap"],
    revalidate: 900,
  })(locale);

export const getCategoriesCached = (locale: string) =>
  unstable_cache(_getCategories, [`sitemap:categories:${locale}`], {
    tags: ["sitemap"],
    revalidate: 900,
  })(locale);

export const getMarketplaceGigSlugsCached = () =>
  unstable_cache(_getMarketplaceGigSlugs, ["sitemap:marketplace:gigs"], {
    tags: ["sitemap", "marketplace-gigs"],
    revalidate: 900,
  })();

export const getMarketplaceProjectSlugsCached = () =>
  unstable_cache(_getMarketplaceProjectSlugs, ["sitemap:marketplace:projects"], {
    tags: ["sitemap", "marketplace-projects"],
    revalidate: 900,
  })();

export const getMarketplaceCategorySlugsCached = () =>
  unstable_cache(
    _getMarketplaceCategorySlugs,
    ["sitemap:marketplace:categories"],
    {
      tags: ["sitemap", "marketplace-categories"],
      revalidate: 900,
    }
  )();
