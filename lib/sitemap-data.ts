// lib/sitemap-data.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { sql } from "./db";

type Row = { slug: string; updated_at: string | Date; published?: boolean };

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
