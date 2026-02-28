import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

/**
 * List active freelancer profiles.
 * Sorted by isVerified DESC, ratingAverage DESC.
 */
export const list = query({
  args: {
    locale: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;

    let profiles;
    if (args.locale) {
      // Use compound index for status + locale
      profiles = await ctx.db
        .query("freelancerProfiles")
        .withIndex("by_status_locale", (q) =>
          q.eq("status", "active").eq("locale", args.locale)
        )
        .collect();
    } else {
      profiles = await ctx.db
        .query("freelancerProfiles")
        .withIndex("by_status", (q) => q.eq("status", "active"))
        .collect();
    }

    // Sort by isVerified DESC, ratingAverage DESC
    const sorted = profiles
      .sort((a, b) => {
        const verifiedA = a.isVerified ? 1 : 0;
        const verifiedB = b.isVerified ? 1 : 0;
        if (verifiedB !== verifiedA) return verifiedB - verifiedA;
        return (b.ratingAverage ?? 0) - (a.ratingAverage ?? 0);
      })
      .slice(0, limit);

    return sorted;
  },
});

/**
 * Get a freelancer profile by their user ID.
 */
export const getByUserId = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    return profile ?? null;
  },
});

/**
 * Get a freelancer profile by its own document ID.
 */
export const getById = query({
  args: {
    profileId: v.id("freelancerProfiles"),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db.get(args.profileId);
    return profile ?? null;
  },
});

/**
 * Full-text search on freelancer bio using the "search_freelancers" search index.
 * Filters by active status.
 */
export const search = query({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("freelancerProfiles")
      .withSearchIndex("search_freelancers", (q) =>
        q.search("bio", args.query).eq("status", "active")
      )
      .collect();

    return results;
  },
});

/**
 * Update a freelancer profile. Authentication required.
 */
export const updateProfile = mutation({
  args: {
    profileId: v.id("freelancerProfiles"),
    displayName: v.optional(v.string()),
    tagline: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    coverImageUrl: v.optional(v.string()),
    hourlyRate: v.optional(v.number()),
    workType: v.optional(v.string()),
    locationCity: v.optional(v.string()),
    locationCountry: v.optional(v.string()),
    locationPostcode: v.optional(v.string()),
    serviceRadiusKm: v.optional(v.number()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    languages: v.optional(v.array(v.string())),
    skills: v.optional(v.array(v.string())),
    portfolioUrls: v.optional(v.array(v.string())),
    websiteUrl: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    isAvailable: v.optional(v.boolean()),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required to update a freelancer profile.");
    }

    const { profileId, ...fields } = args;

    // Build patch object with only defined fields
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    await ctx.db.patch(profileId, patch);

    return profileId;
  },
});

/**
 * Update the Stripe Express account ID for a freelancer profile.
 * Looks up the profile by the Convex user ID (not Clerk ID).
 */
export const updateStripeAccount = mutation({
  args: {
    userId: v.id("users"),
    stripeAccountId: v.string(),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!profile) throw new Error("Freelancer profile not found");

    await ctx.db.patch(profile._id, {
      stripeAccountId: args.stripeAccountId,
      updatedAt: Date.now(),
    });

    return profile._id;
  },
});

/**
 * Mark Stripe onboarding as complete for a freelancer profile.
 */
export const setOnboardingComplete = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!profile) throw new Error("Freelancer profile not found");

    await ctx.db.patch(profile._id, {
      stripeOnboardingComplete: true,
      updatedAt: Date.now(),
    });

    return profile._id;
  },
});

/**
 * Get public marketplace reviews for a freelancer.
 * Looks up the user_id from the freelancerProfiles table, then queries
 * marketplaceReviews by revieweeId. Enriches each review with the reviewer's name.
 */
export const getReviews = query({
  args: {
    freelancerId: v.id("freelancerProfiles"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;

    // Resolve the user_id from the freelancer profile
    const profile = await ctx.db.get(args.freelancerId);
    if (!profile) return [];

    const revieweeUserId = profile.userId;

    // Query reviews where revieweeId matches the freelancer's user ID
    const reviews = await ctx.db
      .query("marketplaceReviews")
      .withIndex("by_reviewee", (q) => q.eq("revieweeId", revieweeUserId))
      .order("desc")
      .take(limit);

    // Filter to public reviews only
    const publicReviews = reviews.filter((r) => r.isPublic !== false);

    // Enrich each review with the reviewer's name from the users table
    const enriched = await Promise.all(
      publicReviews.map(async (review) => {
        const reviewer = review.reviewerId
          ? await ctx.db.get(review.reviewerId)
          : null;

        return {
          ...review,
          reviewerName: reviewer?.name ?? null,
          reviewerAvatar: reviewer?.avatar ?? null,
        };
      })
    );

    return enriched;
  },
});
