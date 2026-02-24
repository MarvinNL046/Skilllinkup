import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * List published posts with pagination.
 * Includes related category and author documents.
 */
export const list = query({
  args: {
    locale: v.string(),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    const offset = args.offset ?? 0;

    const posts = await ctx.db
      .query("posts")
      .withIndex("by_status_locale", (q) =>
        q.eq("status", "published").eq("locale", args.locale)
      )
      .order("desc")
      .collect();

    // Sort by publishedAt desc (index order is by _creationTime, so we sort manually)
    const sorted = posts
      .slice()
      .sort((a, b) => (b.publishedAt ?? 0) - (a.publishedAt ?? 0));

    const paginated = sorted.slice(offset, offset + limit);

    // Enrich each post with author and category
    const enriched = await Promise.all(
      paginated.map(async (post) => {
        const author = post.authorId ? await ctx.db.get(post.authorId) : null;
        const category = post.categoryId
          ? await ctx.db.get(post.categoryId)
          : null;
        return { ...post, author, category };
      })
    );

    return enriched;
  },
});

/**
 * Get a single post by slug + locale.
 * Returns null if not found.
 */
export const getBySlug = query({
  args: {
    slug: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale)
      )
      .first();

    if (!post) return null;

    const author = post.authorId ? await ctx.db.get(post.authorId) : null;
    const category = post.categoryId
      ? await ctx.db.get(post.categoryId)
      : null;

    return { ...post, author, category };
  },
});

/**
 * Get featured published posts.
 */
export const getFeatured = query({
  args: {
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 3;

    const posts = await ctx.db
      .query("posts")
      .withIndex("by_featured", (q) =>
        q.eq("featured", true).eq("status", "published").eq("locale", args.locale)
      )
      .order("desc")
      .take(limit);

    const enriched = await Promise.all(
      posts.map(async (post) => {
        const author = post.authorId ? await ctx.db.get(post.authorId) : null;
        const category = post.categoryId
          ? await ctx.db.get(post.categoryId)
          : null;
        return { ...post, author, category };
      })
    );

    return enriched;
  },
});

/**
 * Get posts ordered by views descending (trending).
 */
export const getTrending = query({
  args: {
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 6;

    const posts = await ctx.db
      .query("posts")
      .withIndex("by_status_locale", (q) =>
        q.eq("status", "published").eq("locale", args.locale)
      )
      .collect();

    // Sort by views desc
    const sorted = posts
      .slice()
      .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
      .slice(0, limit);

    const enriched = await Promise.all(
      sorted.map(async (post) => {
        const author = post.authorId ? await ctx.db.get(post.authorId) : null;
        const category = post.categoryId
          ? await ctx.db.get(post.categoryId)
          : null;
        return { ...post, author, category };
      })
    );

    return enriched;
  },
});

/**
 * Get published posts by category slug.
 * First resolves the category by slug + locale, then filters posts.
 */
export const getByCategory = query({
  args: {
    categorySlug: v.string(),
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;

    // Resolve category by slug + locale
    const category = await ctx.db
      .query("categories")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.categorySlug).eq("locale", args.locale)
      )
      .first();

    if (!category) return [];

    // Fetch posts for this category
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_category", (q) => q.eq("categoryId", category._id))
      .collect();

    // Filter to published posts for the requested locale
    const filtered = posts
      .filter((p) => p.status === "published" && p.locale === args.locale)
      .sort((a, b) => (b.publishedAt ?? 0) - (a.publishedAt ?? 0))
      .slice(0, limit);

    const enriched = await Promise.all(
      filtered.map(async (post) => {
        const author = post.authorId ? await ctx.db.get(post.authorId) : null;
        return { ...post, author, category };
      })
    );

    return enriched;
  },
});

/**
 * Get recent published posts (for sidebar widgets).
 */
export const getRecent = query({
  args: {
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 5;

    const posts = await ctx.db
      .query("posts")
      .withIndex("by_status_locale", (q) =>
        q.eq("status", "published").eq("locale", args.locale)
      )
      .order("desc")
      .take(limit);

    const enriched = await Promise.all(
      posts.map(async (post) => {
        const author = post.authorId ? await ctx.db.get(post.authorId) : null;
        const category = post.categoryId
          ? await ctx.db.get(post.categoryId)
          : null;
        return { ...post, author, category };
      })
    );

    return enriched;
  },
});

/**
 * Full-text search on post title using the "search_posts" search index.
 * Filters by locale and published status.
 */
export const search = query({
  args: {
    query: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("posts")
      .withSearchIndex("search_posts", (q) =>
        q
          .search("title", args.query)
          .eq("status", "published")
          .eq("locale", args.locale)
      )
      .collect();

    const enriched = await Promise.all(
      results.map(async (post) => {
        const author = post.authorId ? await ctx.db.get(post.authorId) : null;
        const category = post.categoryId
          ? await ctx.db.get(post.categoryId)
          : null;
        return { ...post, author, category };
      })
    );

    return enriched;
  },
});

/**
 * Increment the views counter for a post.
 */
export const incrementViews = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) return;

    await ctx.db.patch(args.postId, {
      views: (post.views ?? 0) + 1,
    });
  },
});
