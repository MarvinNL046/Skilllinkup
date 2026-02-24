// lib/sitemap-data.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

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
  const posts = await fetchQuery(api.posts.list, { locale, limit: 500 });
  return posts.map((p: any) => ({
    slug: p.slug,
    updated_at: new Date(p.publishedAt ?? p._creationTime).toISOString(),
  }));
}

async function _getPlatforms(locale: string): Promise<Row[]> {
  const platforms = await fetchQuery(api.platforms.list, { locale, limit: 500 });
  return platforms.map((p: any) => ({
    slug: p.slug,
    updated_at: new Date(p._creationTime).toISOString(),
  }));
}

async function _getCategories(locale: string): Promise<Row[]> {
  const categories = await fetchQuery(api.categories.list, { locale });
  return categories.map((c: any) => ({
    slug: c.slug,
    updated_at: new Date(c._creationTime).toISOString(),
  }));
}

// ============================================================
// Marketplace Sitemap Queries
// ============================================================

async function _getMarketplaceGigSlugs(): Promise<MarketplaceRow[]> {
  try {
    const [enGigs, nlGigs] = await Promise.all([
      fetchQuery(api.marketplace.gigs.list, { locale: "en", limit: 1000 }),
      fetchQuery(api.marketplace.gigs.list, { locale: "nl", limit: 1000 }),
    ]);
    const all = [...enGigs, ...nlGigs];
    return all.map((g: any) => ({
      slug: g.slug,
      locale: g.locale ?? "en",
      updated_at: new Date(g.updatedAt ?? g._creationTime).toISOString(),
    }));
  } catch {
    // Table may not exist yet – return empty array gracefully
    return [];
  }
}

async function _getMarketplaceProjectSlugs(): Promise<MarketplaceRow[]> {
  try {
    const [enProjects, nlProjects] = await Promise.all([
      fetchQuery(api.marketplace.projects.list, { locale: "en", limit: 1000 }),
      fetchQuery(api.marketplace.projects.list, { locale: "nl", limit: 1000 }),
    ]);
    const all = [...enProjects, ...nlProjects];
    return all.map((p: any) => ({
      slug: p.slug,
      locale: p.locale ?? "en",
      updated_at: new Date(p.updatedAt ?? p._creationTime).toISOString(),
    }));
  } catch {
    return [];
  }
}

async function _getMarketplaceCategorySlugs(): Promise<MarketplaceCategoryRow[]> {
  try {
    const [enCats, nlCats] = await Promise.all([
      fetchQuery(api.marketplace.categories.list, { locale: "en" }),
      fetchQuery(api.marketplace.categories.list, { locale: "nl" }),
    ]);
    // The Convex list query already returns only root categories (no parentId)
    const roots = [...enCats, ...nlCats];
    return roots.map((c: any) => ({
      slug: c.slug,
      locale: c.locale ?? "en",
    }));
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
