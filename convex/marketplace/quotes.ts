import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

/**
 * List open quote requests.
 * Optional locale filter. Sorted by createdAt DESC, capped at limit.
 * Enriches each request with client name and category name.
 */
export const listRequests = query({
  args: {
    locale: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;

    const allOpen = await ctx.db
      .query("quoteRequests")
      .withIndex("by_status", (q) => q.eq("status", "open"))
      .order("desc")
      .collect();

    // Cap at limit
    const requests = allOpen.slice(0, limit);

    // Enrich with client name and category name
    const enriched = await Promise.all(
      requests.map(async (request) => {
        const client = await ctx.db.get(request.clientId);
        const category = await ctx.db.get(request.categoryId);

        return {
          ...request,
          clientName: client?.name ?? null,
          categoryName: category?.name ?? null,
        };
      })
    );

    return enriched;
  },
});

/**
 * Get a single quote request by ID, including all submitted quotes
 * with freelancer profile info.
 */
export const getRequestById = query({
  args: {
    requestId: v.id("quoteRequests"),
  },
  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.requestId);
    if (!request) return null;

    const client = await ctx.db.get(request.clientId);
    const category = await ctx.db.get(request.categoryId);

    // Fetch all quotes for this request
    const quotesRaw = await ctx.db
      .query("quotes")
      .withIndex("by_quoteRequest", (q) =>
        q.eq("quoteRequestId", args.requestId)
      )
      .collect();

    // Enrich quotes with freelancer profile info
    const quotes = await Promise.all(
      quotesRaw.map(async (quote) => {
        const freelancerProfile = await ctx.db.get(quote.freelancerId);

        // Fetch the user behind the freelancer profile for name/avatar
        const freelancerUser = freelancerProfile
          ? await ctx.db.get(freelancerProfile.userId)
          : null;

        return {
          ...quote,
          freelancerProfile: freelancerProfile
            ? {
                _id: freelancerProfile._id,
                displayName: freelancerProfile.displayName,
                tagline: freelancerProfile.tagline,
                avatarUrl:
                  freelancerProfile.avatarUrl ??
                  freelancerUser?.image ??
                  freelancerUser?.avatar,
                ratingAverage: freelancerProfile.ratingAverage,
                ratingCount: freelancerProfile.ratingCount,
                isVerified: freelancerProfile.isVerified,
              }
            : null,
        };
      })
    );

    return {
      ...request,
      clientName: client?.name ?? null,
      categoryName: category?.name ?? null,
      quotes,
    };
  },
});

/**
 * Create a new quote request. Authentication required.
 */
export const createRequest = mutation({
  args: {
    categoryId: v.id("marketplaceCategories"),
    title: v.string(),
    description: v.string(),
    locationCity: v.optional(v.string()),
    locationPostcode: v.optional(v.string()),
    locationCountry: v.optional(v.string()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    photos: v.optional(v.array(v.any())),
    budgetIndication: v.optional(v.string()),
    preferredDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required to create a quote request.");
    }

    // Resolve current user by email
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!currentUser) {
      throw new Error("User not found in database.");
    }

    // Get tenantId from first tenant
    const tenant = await ctx.db.query("tenants").first();
    if (!tenant) {
      throw new Error("No tenant found — run data migration first");
    }

    const now = Date.now();

    const requestId = await ctx.db.insert("quoteRequests", {
      tenantId: tenant._id,
      clientId: currentUser._id,
      categoryId: args.categoryId,
      title: args.title,
      description: args.description,
      locationCity: args.locationCity,
      locationPostcode: args.locationPostcode,
      locationCountry: args.locationCountry,
      latitude: args.latitude,
      longitude: args.longitude,
      photos: args.photos,
      budgetIndication: args.budgetIndication,
      preferredDate: args.preferredDate,
      status: "open",
      quoteCount: 0,
      createdAt: now,
      updatedAt: now,
    });

    return requestId;
  },
});

/**
 * Freelancer submits a quote for a quote request. Authentication required.
 */
export const submitQuote = mutation({
  args: {
    quoteRequestId: v.id("quoteRequests"),
    amount: v.number(),
    currency: v.optional(v.string()),
    description: v.string(),
    estimatedDays: v.optional(v.number()),
    validUntil: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required to submit a quote.");
    }

    // Resolve current user by email
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!currentUser) {
      throw new Error("User not found in database.");
    }

    // Resolve freelancer profile for this user
    const freelancerProfile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", currentUser._id))
      .first();

    if (!freelancerProfile) {
      throw new Error("Freelancer profile not found. Please create a profile first.");
    }

    // Verify the quote request exists and is still open
    const quoteRequest = await ctx.db.get(args.quoteRequestId);
    if (!quoteRequest) {
      throw new Error("Quote request not found.");
    }
    if (quoteRequest.status !== "open") {
      throw new Error("This quote request is no longer accepting quotes.");
    }

    const now = Date.now();

    const quoteId = await ctx.db.insert("quotes", {
      quoteRequestId: args.quoteRequestId,
      freelancerId: freelancerProfile._id,
      amount: args.amount,
      currency: args.currency,
      description: args.description,
      estimatedDays: args.estimatedDays,
      validUntil: args.validUntil,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });

    // Increment the quoteCount on the request
    await ctx.db.patch(args.quoteRequestId, {
      quoteCount: (quoteRequest.quoteCount ?? 0) + 1,
      updatedAt: now,
    });

    return quoteId;
  },
});

/**
 * Client accepts a quote. Authentication required.
 * Sets the accepted quote to "accepted" and closes the quote request.
 */
export const acceptQuote = mutation({
  args: {
    quoteId: v.id("quotes"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required to accept a quote.");
    }

    // Resolve current user by email
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!currentUser) {
      throw new Error("User not found in database.");
    }

    // Get the quote
    const quote = await ctx.db.get(args.quoteId);
    if (!quote) {
      throw new Error("Quote not found.");
    }

    // Get the quote request and verify the current user is the client
    const quoteRequest = await ctx.db.get(quote.quoteRequestId);
    if (!quoteRequest) {
      throw new Error("Quote request not found.");
    }
    if (quoteRequest.clientId !== currentUser._id) {
      throw new Error("Only the client who created this request can accept quotes.");
    }

    const now = Date.now();

    // Accept the selected quote
    await ctx.db.patch(args.quoteId, {
      status: "accepted",
      updatedAt: now,
    });

    // Close the quote request
    await ctx.db.patch(quote.quoteRequestId, {
      status: "closed",
      updatedAt: now,
    });

    return { success: true, quoteId: args.quoteId };
  },
});
