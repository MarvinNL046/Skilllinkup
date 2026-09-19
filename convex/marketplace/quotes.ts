// Local quote requests: the public request board, the participant view,
// creating a request, submitting a quote and accepting one, which opens the
// private workspace (order, conversation and appointment) without any payment.
// Readable source restored on 2026-09-19; behaviour is identical to the
// reconciled deployment version and is pinned by scripts/check-readable-convex.mjs.
import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import {
  getProviderProfile,
  requireAuthUser,
  requireMarketplaceContext,
} from "../lib/authHelpers";
import {
  assertTransition,
  quoteRequestTransitions,
  quoteTransitions,
} from "../lib/marketplaceState";
import { notifyUser } from "../lib/notifications";
import {
  participantLocalQuoteRequestValidator,
  publicLocalQuoteRequestValidator,
  toParticipantLocalQuoteRequest,
  toPublicLocalQuoteRequest,
} from "../lib/publicData";
import { rateLimiter } from "../lib/rateLimits";

function betaLocalOrderNumber(): string {
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `LOCAL-BETA-${day}-${suffix}`;
}

/** Public board of open requests, newest first, without private details. */
const listRequests = query({
  args: {
    limit: v.optional(v.number()),
  },
  returns: v.array(publicLocalQuoteRequestValidator),
  handler: async (ctx, args) => {
    const limit = Math.min(Math.max(args.limit ?? 20, 1), 100);
    const requests = await ctx.db
      .query("quoteRequests")
      .withIndex("by_status", (q) => q.eq("status", "open"))
      .order("desc")
      .take(limit);
    return await Promise.all(
      requests.map(async (request) => {
        const category = await ctx.db.get(request.categoryId);
        return toPublicLocalQuoteRequest(request, category?.name ?? null);
      }),
    );
  },
});

/** One open request in its public form; closed requests are not public. */
const getRequestById = query({
  args: {
    requestId: v.id("quoteRequests"),
  },
  returns: v.union(publicLocalQuoteRequestValidator, v.null()),
  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.requestId);
    if (!request || request.status !== "open") return null;
    const category = await ctx.db.get(request.categoryId);
    return toPublicLocalQuoteRequest(request, category?.name ?? null);
  },
});

/**
 * Full request for its two kinds of participant: the client who owns it, who
 * sees every quote, and a professional who claimed it, who sees only their own.
 */
const getParticipantRequestById = query({
  args: {
    requestId: v.id("quoteRequests"),
  },
  returns: v.union(participantLocalQuoteRequestValidator, v.null()),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const request = await ctx.db.get(args.requestId);
    if (!request) return null;

    const profile = await getProviderProfile(ctx, user._id, "local_professional");
    const claims = await ctx.db
      .query("leadClaims")
      .withIndex("by_quoteRequest", (q) => q.eq("quoteRequestId", args.requestId))
      .take(10);
    const isOwner = user._id === request.clientId;
    const hasClaimed =
      !!profile && claims.some((claim) => claim.freelancerId === profile._id);
    if (!isOwner && !hasClaimed) return null;

    const [category, client] = await Promise.all([
      ctx.db.get(request.categoryId),
      ctx.db.get(request.clientId),
    ]);

    const quotes = isOwner
      ? await ctx.db
          .query("quotes")
          .withIndex("by_quoteRequest", (q) => q.eq("quoteRequestId", args.requestId))
          .take(100)
          .then((rows) =>
            Promise.all(
              rows.map(async (quote) => {
                const quoteProfile = await ctx.db.get(quote.freelancerId);
                const quoteUser = quoteProfile
                  ? await ctx.db.get(quoteProfile.userId)
                  : null;
                return {
                  quote,
                  freelancerProfile: quoteProfile
                    ? {
                        _id: quoteProfile._id,
                        displayName: quoteProfile.displayName,
                        tagline: quoteProfile.tagline ?? null,
                        avatarUrl:
                          quoteProfile.avatarUrl ??
                          quoteUser?.image ??
                          quoteUser?.avatar ??
                          null,
                        ratingAverage: quoteProfile.ratingAverage ?? 0,
                        ratingCount: quoteProfile.ratingCount ?? 0,
                        isVerified: quoteProfile.isVerified ?? false,
                      }
                    : null,
                };
              }),
            ),
          )
      : [];

    const myQuote = profile
      ? await ctx.db
          .query("quotes")
          .withIndex("by_quoteRequest_freelancer", (q) =>
            q.eq("quoteRequestId", args.requestId).eq("freelancerId", profile._id),
          )
          .unique()
      : null;

    return toParticipantLocalQuoteRequest(request, {
      categoryName: category?.name ?? null,
      clientName: client?.name ?? null,
      isOwner,
      quotes,
      myQuote,
    });
  },
});

/** A Local client posts a request. The private beta is limited to the Netherlands. */
const createRequest = mutation({
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
  returns: v.id("quoteRequests"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    requireMarketplaceContext(user, "client", "local", "requesting a local quote");
    await rateLimiter.limit(ctx, "localRequest", { key: user._id, throws: true });

    const title = args.title.trim();
    const description = args.description.trim();
    if (title.length < 8 || title.length > 120)
      throw new Error("Use a title between 8 and 120 characters.");
    if (description.length < 40 || description.length > 5000)
      throw new Error("Use a description between 40 and 5,000 characters.");

    const city = args.locationCity?.trim();
    const postcode = args.locationPostcode?.trim();
    if (!city && !postcode)
      throw new Error("Enter a city or postcode for the local request.");
    if (city && (city.length < 2 || city.length > 100))
      throw new Error("Use a city or region between 2 and 100 characters.");
    if (postcode && postcode.length > 20)
      throw new Error("Postcode must be at most 20 characters.");

    const country = args.locationCountry?.trim() || "Netherlands";
    if (!/^(netherlands|nederland|nl)$/i.test(country))
      throw new Error(
        "Local private-beta requests are currently limited to the Netherlands.",
      );
    if (
      args.latitude !== undefined &&
      (!Number.isFinite(args.latitude) || args.latitude < -90 || args.latitude > 90)
    )
      throw new Error("Latitude must be between -90 and 90.");
    if (
      args.longitude !== undefined &&
      (!Number.isFinite(args.longitude) ||
        args.longitude < -180 ||
        args.longitude > 180)
    )
      throw new Error("Longitude must be between -180 and 180.");

    const category = await ctx.db.get(args.categoryId);
    if (!category || category.tenantId !== user.tenantId)
      throw new Error("Local service category not found.");
    if (
      category.serviceType &&
      category.serviceType !== "local" &&
      category.serviceType !== "hybrid"
    )
      throw new Error("Choose a Local service category.");

    const now = Date.now();
    return await ctx.db.insert("quoteRequests", {
      tenantId: user.tenantId,
      clientId: user._id,
      categoryId: args.categoryId,
      title,
      description,
      locationCity: city,
      locationPostcode: postcode,
      locationCountry: "Netherlands",
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
  },
});

/** A professional who claimed the lead sends one quote for it. */
const submitQuote = mutation({
  args: {
    quoteRequestId: v.id("quoteRequests"),
    amount: v.number(),
    currency: v.optional(v.string()),
    description: v.string(),
    estimatedDays: v.optional(v.number()),
    validUntil: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    requireMarketplaceContext(user, "local_professional", "local", "submitting a quote");
    await rateLimiter.limit(ctx, "localQuote", { key: user._id, throws: true });

    const profile = await getProviderProfile(ctx, user._id, "local_professional");
    if (!profile)
      throw new Error("Freelancer profile not found. Please create a profile first.");
    const request = await ctx.db.get(args.quoteRequestId);
    if (!request) throw new Error("Quote request not found.");
    if (request.status !== "open")
      throw new Error("This quote request is no longer accepting quotes.");
    if (request.clientId === user._id)
      throw new Error("You cannot submit a quote to your own request.");
    if (!Number.isFinite(args.amount) || args.amount <= 0 || args.amount > 1_000_000)
      throw new Error("Enter a valid quote amount.");

    const description = args.description.trim();
    if (description.length < 20 || description.length > 5000)
      throw new Error("Use a quote description between 20 and 5,000 characters.");

    const existingQuote = await ctx.db
      .query("quotes")
      .withIndex("by_quoteRequest_freelancer", (q) =>
        q.eq("quoteRequestId", args.quoteRequestId).eq("freelancerId", profile._id),
      )
      .unique();
    if (existingQuote)
      throw new Error("You already submitted a quote for this request.");

    const claims = await ctx.db
      .query("leadClaims")
      .withIndex("by_quoteRequest", (q) => q.eq("quoteRequestId", args.quoteRequestId))
      .take(10);
    if (!claims.find((claim) => claim.freelancerId === profile._id))
      throw new Error("Claim this lead before submitting a quote.");

    const now = Date.now();
    const quoteId = await ctx.db.insert("quotes", {
      quoteRequestId: args.quoteRequestId,
      freelancerId: profile._id,
      amount: args.amount,
      currency: args.currency,
      description,
      estimatedDays: args.estimatedDays,
      validUntil: args.validUntil,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.patch(args.quoteRequestId, {
      quoteCount: (request.quoteCount ?? 0) + 1,
      updatedAt: now,
    });
    await notifyUser(ctx, {
      userId: request.clientId,
      type: "local_quote_received",
      title: "New local quote received",
      body: `${profile.displayName} sent a quote for ${request.title}.`,
      link: `/local/quote-request/${request._id}`,
      metadata: {
        quoteRequestId: request._id,
        quoteId,
      },
    });
    return quoteId;
  },
});

/**
 * The client accepts one quote. Other pending quotes are rejected and the
 * private workspace is created: a free beta order, a conversation and a
 * requested appointment. No payment is involved.
 */
const acceptQuote = mutation({
  args: {
    quoteId: v.id("quotes"),
  },
  returns: v.object({
    success: v.boolean(),
    quoteId: v.id("quotes"),
    orderId: v.id("orders"),
    appointmentId: v.union(v.id("localAppointments"), v.null()),
  }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    requireMarketplaceContext(user, "client", "local", "accepting a local quote");
    const quote = await ctx.db.get(args.quoteId);
    if (!quote) throw new Error("Quote not found.");
    const request = await ctx.db.get(quote.quoteRequestId);
    if (!request) throw new Error("Quote request not found.");
    if (request.clientId !== user._id)
      throw new Error("Only the client who created this request can accept quotes.");
    if (request.tenantId !== user.tenantId)
      throw new Error("This quote request belongs to another workspace.");

    // A retry returns the original result, including after the appointment advances.
    // Keep ownership checks above this branch; never create a second workspace.
    const existingOrder = await ctx.db
      .query("orders")
      .withIndex("by_quote", (q) => q.eq("quoteId", quote._id))
      .unique();
    if (existingOrder) {
      if (
        quote.status !== "accepted" ||
        existingOrder.clientId !== user._id ||
        existingOrder.tenantId !== request.tenantId ||
        existingOrder.quoteRequestId !== request._id ||
        existingOrder.freelancerId !== quote.freelancerId ||
        existingOrder.orderType !== "local_quote"
      )
        throw new Error("The accepted quote and order do not match.");
      const existingAppointment = await ctx.db
        .query("localAppointments")
        .withIndex("by_order", (q) => q.eq("orderId", existingOrder._id))
        .unique();
      return {
        success: true,
        quoteId: quote._id,
        orderId: existingOrder._id,
        appointmentId: existingAppointment?._id ?? null,
      };
    }

    if (!["open", "matched"].includes(request.status))
      throw new Error("This quote request can no longer be awarded.");
    assertTransition(quoteTransitions, quote.status, "accepted");
    assertTransition(quoteRequestTransitions, request.status, "accepted");

    const profile = await ctx.db.get(quote.freelancerId);
    if (!profile) throw new Error("Local professional profile not found.");
    const professional = await ctx.db.get(profile.userId);
    if (!professional) throw new Error("Local professional account not found.");

    const now = Date.now();
    await ctx.db.patch(args.quoteId, { status: "accepted", updatedAt: now });
    await ctx.db.patch(quote.quoteRequestId, { status: "accepted", updatedAt: now });

    const pendingQuotes = await ctx.db
      .query("quotes")
      .withIndex("by_quoteRequest_status", (q) =>
        q.eq("quoteRequestId", quote.quoteRequestId).eq("status", "pending"),
      )
      .take(100);
    await Promise.all(
      pendingQuotes
        .filter((other) => other._id !== quote._id)
        .map((other) =>
          ctx.db.patch(other._id, { status: "rejected", updatedAt: now }),
        ),
    );

    const orderId = await ctx.db.insert("orders", {
      tenantId: request.tenantId,
      orderNumber: betaLocalOrderNumber(),
      orderType: "local_quote",
      clientId: request.clientId,
      freelancerId: quote.freelancerId,
      quoteRequestId: request._id,
      quoteId: quote._id,
      title: request.title,
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
    const conversationId = await ctx.db.insert("conversations", {
      tenantId: request.tenantId,
      contextType: "local_appointment",
      contextTitle: request.title,
      contextHref: `/orders/${orderId}`,
      orderId,
      freelancerProfileId: quote.freelancerId,
      quoteId: quote._id,
      participant1: request.clientId,
      participant2: professional._id,
      unreadCount1: 0,
      unreadCount2: 0,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });
    const appointmentId = await ctx.db.insert("localAppointments", {
      tenantId: request.tenantId,
      quoteRequestId: request._id,
      quoteId: quote._id,
      orderId,
      clientId: request.clientId,
      professionalId: quote.freelancerId,
      scheduledStart: request.preferredDate,
      timezone: "Europe/Amsterdam",
      locationAddress:
        [request.locationPostcode, request.locationCity, request.locationCountry]
          .filter(Boolean)
          .join(", ") || undefined,
      status: "requested",
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.patch(conversationId, { localAppointmentId: appointmentId });

    await notifyUser(ctx, {
      userId: professional._id,
      type: "local_quote_accepted",
      title: "Your local quote was accepted",
      body: `${request.title} is ready in your private workspace.`,
      link: `/orders/${orderId}`,
      metadata: {
        orderId,
        appointmentId,
      },
    });
    return {
      success: true,
      quoteId: args.quoteId,
      orderId,
      appointmentId,
    };
  },
});

/** The signed-in Local client's own requests, newest first. */
const listMyRequests = query({
  args: {},
  returns: v.array(
    v.object({
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
    }),
  ),
  handler: async (ctx) => {
    const user = await requireAuthUser(ctx);
    requireMarketplaceContext(user, "client", "local", "updating a local request");
    const requests = await ctx.db
      .query("quoteRequests")
      .withIndex("by_client", (q) => q.eq("clientId", user._id))
      .order("desc")
      .take(100);

    const categoryIds = [...new Set(requests.map((request) => request.categoryId))];
    const categories = await Promise.all(categoryIds.map((id) => ctx.db.get(id)));
    const categoryNames = new Map(
      categories.filter(Boolean).map((category) => [category!._id, category!.name]),
    );

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

export {
  acceptQuote,
  createRequest,
  getParticipantRequestById,
  getRequestById,
  listMyRequests,
  listRequests,
  submitQuote,
};
