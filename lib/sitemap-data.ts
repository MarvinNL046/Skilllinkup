// lib/sitemap-data.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { sql } from "./db";

type Row = { slug: string; updated_at: string | Date; published?: boolean };

async function _getPosts(): Promise<Row[]> {
  // Pas tabel/kolommen aan jouw schema
  const rows = await sql`
    SELECT slug, updated_at
    FROM posts
    WHERE status = 'published'
    ORDER BY updated_at DESC
  `;
  return rows as Row[];
}

async function _getPlatforms(): Promise<Row[]> {
  const rows = await sql`
    SELECT slug, updated_at
    FROM platforms
    WHERE status = 'published'
    ORDER BY updated_at DESC
  `;
  return rows as Row[];
}

async function _getCategories(): Promise<Row[]> {
  const rows = await sql`
    SELECT slug, created_at as updated_at
    FROM categories
    ORDER BY name ASC
  `;
  return rows as Row[];
}

// Cache + tags zodat revalidateTag('sitemap') deze data ongeldig kan maken
export const getPostsCached = unstable_cache(_getPosts, ["sitemap:posts"], {
  tags: ["sitemap"],
  revalidate: 900, // fallback auto-refresh (15 min)
});

export const getPlatformsCached = unstable_cache(_getPlatforms, ["sitemap:platforms"], {
  tags: ["sitemap"],
  revalidate: 900,
});

export const getCategoriesCached = unstable_cache(_getCategories, ["sitemap:categories"], {
  tags: ["sitemap"],
  revalidate: 900,
});
