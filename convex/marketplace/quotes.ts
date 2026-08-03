import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { getOptionalAuthUser, requireAuthUser } from "../lib/authHelpers";
import {
  assertTransition,
  quoteRequestTransitions,
  quoteTransitions,
} from "../lib/marketplaceState";
import { notifyUser } from "../lib/notifications";
import { rateLimiter } from "../lib/rateLimits";

function requireClientRole(user: Awaited<ReturnType<typeof requireAuthUser>>) {
  const roles = user.accountRoles ?? [];
  if (roles.length && !roles.includes("client") && user.role !== "admin") {
    throw new Error("Add the client role before requesting a local quote.");
  }
}

function requireLocalProfessionalRole(user: Awaited<ReturnType<typeof requireAuthUser>>) {
  const roles = user.accountRoles ?? [];
  if (roles.length && !roles.includes("local_professional") && user.role !== "admin") {
    throw new Error("Add the local professional role before submitting a quote.");
  }
}

function betaLocalOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `LOCAL-BETA-${date}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

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

    const requests = await ctx.db
      .query("quoteRequests")
      .withIndex("by_status", (q) => q.eq("status", "open"))
      .order("desc")
      .take(Math.min(Math.max(limit, 1), 100));

    // Enrich with client name and category name
    const enriched = await Promise.all(
      requests.map(async (request) => {
        const category = await ctx.db.get(request.categoryId);

        return {
          ...request,
          clientName: null,
          descriptionPreview:
            request.description.length > 120
              ? `${request.description.slice(0, 120)}...`
              : request.description,
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

    const category = await ctx.db.get(request.categoryId);
    const currentUser = await getOptionalAuthUser(ctx);
    let currentUserId = currentUser?._id ?? null;
    let currentFreelancerProfileId = null;
    if (currentUser) {
      const profile = await ctx.db
        .query("freelancerProfiles")
        .withIndex("by_userId", (q) => q.eq("userId", currentUser._id))
        .first();
      currentFreelancerProfileId = profile?._id ?? null;
    }

    const claims = await ctx.db
      .query("leadClaims")
      .withIndex("by_quoteRequest", (q) => q.eq("quoteRequestId", args.requestId))
      .take(10);
    const isOwner = currentUserId === request.clientId;
    const alreadyClaimed =
      !!currentFreelancerProfileId &&
      claims.some((claim) => claim.freelancerId === currentFreelancerProfileId);
    const canViewFullDetails = isOwner || alreadyClaimed;
    const client = canViewFullDetails ? await ctx.db.get(request.clientId) : null;

    const quotes = isOwner
      ? await ctx.db
          .query("quotes")
          .withIndex("by_quoteRequest", (q) =>
            q.eq("quoteRequestId", args.requestId)
          )
          .take(100)
          .then((quotesRaw) =>
            Promise.all(
              quotesRaw.map(async (quote) => {
                const freelancerProfile = await ctx.db.get(quote.freelancerId);
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
            )
          )
      : [];

    return {
      ...request,
      isOwner,
      clientName: client?.name ?? null,
      categoryName: category?.name ?? null,
      description: canViewFullDetails ? request.description : null,
      descriptionPreview:
        request.description.length > 150
          ? `${request.description.slice(0, 150)}...`
          : request.description,
      canViewFullDetails,
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
    const currentUser = await requireAuthUser(ctx);
    requireClientRole(currentUser);
    await rateLimiter.limit(ctx, "localRequest", { key: currentUser._id, throws: true });
    const title = args.title.trim();
    const description = args.description.trim();
    if (title.length < 8 || title.length > 120) throw new Error("Use a title between 8 and 120 characters.");
    if (description.length < 40 || description.length > 5000) throw new Error("Use a description between 40 and 5,000 characters.");

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
      title,
      description,
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
    const currentUser = await requireAuthUser(ctx);
    requireLocalProfessionalRole(currentUser);
    await rateLimiter.limit(ctx, "localQuote", { key: currentUser._id, throws: true });

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
    if (quoteRequest.clientId === currentUser._id) {
      throw new Error("You cannot submit a quote to your own request.");
    }

    if (!Number.isFinite(args.amount) || args.amount <= 0 || args.amount > 1_000_000) {
      throw new Error("Enter a valid quote amount.");
    }
    const description = args.description.trim();
    if (description.length < 20 || description.length > 5000) {
      throw new Error("Use a quote description between 20 and 5,000 characters.");
    }
    const existingQuote = await ctx.db
      .query("quotes")
      .withIndex("by_quoteRequest_freelancer", (q) =>
        q.eq("quoteRequestId", args.quoteRequestId).eq("freelancerId", freelancerProfile._id)
      )
      .unique();
    if (existingQuote) throw new Error("You already submitted a quote for this request.");

    const leadClaim = await ctx.db
      .query("leadClaims")
      .withIndex("by_quoteRequest", (q) => q.eq("quoteRequestId", args.quoteRequestId))
      .take(10)
      .then((claims) => claims.find((claim) => claim.freelancerId === freelancerProfile._id));
    if (!leadClaim) {
      throw new Error("Claim this lead before submitting a quote.");
    }

    const now = Date.now();

    const quoteId = await ctx.db.insert("quotes", {
      quoteRequestId: args.quoteRequestId,
      freelancerId: freelancerProfile._id,
      amount: args.amount,
      currency: args.currency,
      description,
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

    await notifyUser(ctx, {
      userId: quoteRequest.clientId,
      type: "local_quote_received",
      title: "New local quote received",
      body: `${freelancerProfile.displayName} sent a quote for ${quoteRequest.title}.`,
      link: `/local/quote-request/${quoteRequest._id}`,
      metadata: { quoteRequestId: quoteRequest._id, quoteId },
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
    const currentUser = await requireAuthUser(ctx);
    requireClientRole(currentUser);

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

    if (!['open', 'matched'].includes(quoteRequest.status)) {
      throw new Error("This quote request can no longer be awarded.");
    }
    assertTransition(quoteTransitions, quote.status, "accepted");
    assertTransition(quoteRequestTransitions, quoteRequest.status, "accepted");

    const existingOrder = await ctx.db
      .query("orders")
      .withIndex("by_quote", (q) => q.eq("quoteId", quote._id))
      .unique();
    if (existingOrder) {
      const appointment = await ctx.db
        .query("localAppointments")
        .withIndex("by_order", (q) => q.eq("orderId", existingOrder._id))
        .unique();
      return { success: true, quoteId: quote._id, orderId: existingOrder._id, appointmentId: appointment?._id ?? null };
    }

    const professional = await ctx.db.get(quote.freelancerId);
    if (!professional) throw new Error("Local professional profile not found.");
    const professionalUser = await ctx.db.get(professional.userId);
    if (!professionalUser) throw new Error("Local professional account not found.");

    const now = Date.now();

    // Accept the selected quote
    await ctx.db.patch(args.quoteId, {
      status: "accepted",
      updatedAt: now,
    });

    // Close the quote request
    await ctx.db.patch(quote.quoteRequestId, {
      status: "accepted",
      updatedAt: now,
    });
    const pendingQuotes = await ctx.db
      .query("quotes")
      .withIndex("by_quoteRequest_status", (q) =>
        q.eq("quoteRequestId", quote.quoteRequestId).eq("status", "pending")
      )
      .take(100);
    await Promise.all(
      pendingQuotes
        .filter((item) => item._id !== quote._id)
        .map((item) => ctx.db.patch(item._id, { status: "rejected", updatedAt: now }))
    );

    const orderId = await ctx.db.insert("orders", {
      tenantId: quoteRequest.tenantId,
      orderNumber: betaLocalOrderNumber(),
      orderType: "local_quote",
      clientId: quoteRequest.clientId,
      freelancerId: quote.freelancerId,
      quoteRequestId: quoteRequest._id,
      quoteId: quote._id,
      title: quoteRequest.title,
      description: quote.description,
      amount: quote.amount,
      platformFee: 0,
      freelancerEarnings: quote.amount,
      currency: quote.currency ?? "EUR",
      revisionsUsed: 0,
      status: "active",
      escrowStatus: "beta_no_payment",
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("conversations", {
      tenantId: quoteRequest.tenantId,
      orderId,
      participant1: quoteRequest.clientId,
      participant2: professionalUser._id,
      unreadCount1: 0,
      unreadCount2: 0,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });

    const appointmentId = await ctx.db.insert("localAppointments", {
      tenantId: quoteRequest.tenantId,
      quoteRequestId: quoteRequest._id,
      quoteId: quote._id,
      orderId,
      clientId: quoteRequest.clientId,
      professionalId: quote.freelancerId,
      scheduledStart: quoteRequest.preferredDate,
      timezone: "Europe/Amsterdam",
      locationAddress: [quoteRequest.locationPostcode, quoteRequest.locationCity, quoteRequest.locationCountry].filter(Boolean).join(", ") || undefined,
      status: "requested",
      createdAt: now,
      updatedAt: now,
    });

    await notifyUser(ctx, {
      userId: professionalUser._id,
      type: "local_quote_accepted",
      title: "Your local quote was accepted",
      body: `${quoteRequest.title} is ready in your private workspace.`,
      link: `/orders/${orderId}`,
      metadata: { orderId, appointmentId },
    });

    return { success: true, quoteId: args.quoteId, orderId, appointmentId };
  },
});

/**
 * Private customer overview for Local. Ownership comes from the authenticated
 * identity, so callers can never request another customer's quote requests.
 */
export const listMyRequests = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("quoteRequests"),
    title: v.string(),
    status: v.string(),
    categoryName: v.union(v.string(), v.null()),
    locationCity: v.union(v.string(), v.null()),
    budgetIndication: v.union(v.string(), v.null()),
    preferredDate: v.union(v.number(), v.null()),
    quoteCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })),
  handler: async (ctx) => {
    const currentUser = await requireAuthUser(ctx);
    requireClientRole(currentUser);
    const requests = await ctx.db
      .query("quoteRequests")
      .withIndex("by_client", (q) => q.eq("clientId", currentUser._id))
      .order("desc")
      .take(100);
    const categoryIds = [...new Set(requests.map((request) => request.categoryId))];
    const categories = await Promise.all(categoryIds.map((categoryId) => ctx.db.get(categoryId)));
    const categoryNames = new Map(categories.filter(Boolean).map((category) => [category!._id, category!.name]));

    return requests.map((request) => ({
      _id: request._id,
      title: request.title,
      status: request.status,
      categoryName: categoryNames.get(request.categoryId) ?? null,
      locationCity: request.locationCity ?? null,
      budgetIndication: request.budgetIndication ?? null,
      preferredDate: request.preferredDate ?? null,
      quoteCount: request.quoteCount ?? 0,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
    }));
  },
});
