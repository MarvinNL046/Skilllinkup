import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireServerSecret } from "./lib/authHelpers";

// Public: fetch single resource by slug + locale
export const getBySlug = query({
  args: { slug: v.string(), locale: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("resources")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale)
      )
      .first()
      .then((resource) =>
        resource && resource.status === "published" ? resource : null
      );
  },
});

// Public: list published resources
export const list = query({
  args: {
    locale: v.optional(v.string()),
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const status = "published";
    if (args.status && args.status !== "published") {
      return [];
    }
    const results = args.locale
      ? await ctx.db
          .query("resources")
          .withIndex("by_status_locale", (q) =>
            q.eq("status", status).eq("locale", args.locale!)
          )
          .order("desc")
          .collect()
      : await ctx.db
          .query("resources")
          .withIndex("by_status", (q) => q.eq("status", status))
          .order("desc")
          .collect();
    return results.slice(0, Math.min(args.limit ?? 100, 500));
  },
});

// Script: create or update (upsert) a resource — used by scraper
export const upsert = mutation({
  args: {
    slug: v.string(),
    locale: v.string(),
    type: v.string(),
    status: v.string(),
    metaTitle: v.string(),
    metaDescription: v.string(),
    intro: v.string(),
    sections: v.array(v.object({ heading: v.string(), body: v.string() })),
    pricingData: v.optional(v.any()),
    comparisonData: v.optional(v.any()),
    faqItems: v.array(v.object({ question: v.string(), answer: v.string() })),
    keyTakeaways: v.optional(v.array(v.string())),
    publishedAt: v.optional(v.number()),
    serverSecret: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
    if (!["published", "draft"].includes(args.status)) {
      throw new Error("Invalid status value");
    }

    const existing = await ctx.db
      .query("resources")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale)
      )
      .first();

    const now = Date.now();
    const { serverSecret: _serverSecret, ...input } = args;
    const data = { ...input, updatedAt: now };

    if (existing) {
      const { slug: _slug, locale: _locale, ...patchData } = data;
      await ctx.db.patch(existing._id, patchData);
      return existing._id;
    } else {
      return await ctx.db.insert("resources", { ...data, createdAt: now });
    }
  },
});
