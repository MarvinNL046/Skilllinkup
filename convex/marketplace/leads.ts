// Local pay-per-lead: credit balance and history, a professional's claimed
// leads, claim eligibility, claiming a lead and the server-only credit top-up.
// Lead prices come from ./leadPricing and are zero during the free private beta.
// Readable source restored on 2026-09-19; behaviour is identical to the
// reconciled deployment version and is pinned by scripts/check-readable-convex.mjs.
import { v } from "convex/values";
import type { Doc } from "../_generated/dataModel";
import { mutation, query } from "../_generated/server";
import {
  getOptionalAuthUser,
  getProviderProfile,
  requireAuthUser,
  requireMarketplaceContext,
  requireServerSecret,
} from "../lib/authHelpers";
import { applyCreditPurchase } from "../lib/creditPurchases";
import { requireLivePaymentsEnabled } from "../lib/paymentPolicy";
import { rateLimiter } from "../lib/rateLimits";
import { getLeadCreditCost, MAX_SHARED_SLOTS } from "./leadPricing";

/** Country spellings that mean the same place, keyed by their normalised form. */
const COUNTRY_ALIASES: Record<string, string> = {
  be: "be",
  belgie: "be",
  belgique: "be",
  belgium: "be",
  de: "de",
  deutschland: "de",
  germany: "de",
  nl: "nl",
  nederland: "nl",
  netherlands: "nl",
  thenetherlands: "nl",
  uk: "gb",
  gb: "gb",
  greatbritain: "gb",
  unitedkingdom: "gb",
};

const EARTH_RADIUS_KM = 6371;

type ServiceArea = {
  locationCountry?: string;
  locationCity?: string;
  locationPostcode?: string;
  latitude?: number;
  longitude?: number;
  serviceRadiusKm?: number;
};

/** Lower-case letters and digits only, without accents; null when nothing is left. */
function normalizeAreaValue(value: string | undefined | null): string | null {
  return (
    value
      ?.normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "") || null
  );
}

function normalizeCountry(value: string | undefined | null): string | null {
  const normalized = normalizeAreaValue(value);
  return normalized ? (COUNTRY_ALIASES[normalized] ?? normalized) : null;
}

function isLatitude(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= -90 && value <= 90;
}

function isLongitude(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= -180 && value <= 180;
}

/** Great-circle distance between two coordinates (haversine). */
function distanceKm(
  fromLatitude: number,
  fromLongitude: number,
  toLatitude: number,
  toLongitude: number,
): number {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDelta = toRadians(toLatitude - fromLatitude);
  const longitudeDelta = toRadians(toLongitude - fromLongitude);
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(toRadians(fromLatitude)) *
      Math.cos(toRadians(toLatitude)) *
      Math.sin(longitudeDelta / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a));
}

/**
 * Whether a request falls inside a professional's service area. The country must
 * match. With coordinates and a positive radius on both sides the distance
 * decides; otherwise the same city or the same postcode is enough.
 */
function coversLocalServiceArea(profile: ServiceArea, request: ServiceArea): boolean {
  const profileCountry = normalizeCountry(profile.locationCountry);
  const requestCountry = normalizeCountry(request.locationCountry);
  if (!profileCountry || !requestCountry || profileCountry !== requestCountry)
    return false;

  if (
    isLatitude(profile.latitude) &&
    isLongitude(profile.longitude) &&
    isLatitude(request.latitude) &&
    isLongitude(request.longitude) &&
    typeof profile.serviceRadiusKm === "number" &&
    Number.isFinite(profile.serviceRadiusKm) &&
    profile.serviceRadiusKm > 0
  ) {
    return (
      distanceKm(
        profile.latitude,
        profile.longitude,
        request.latitude,
        request.longitude,
      ) <= profile.serviceRadiusKm
    );
  }

  const profileCity = normalizeAreaValue(profile.locationCity);
  const requestCity = normalizeAreaValue(request.locationCity);
  if (profileCity && requestCity && profileCity === requestCity) return true;

  const profilePostcode = normalizeAreaValue(profile.locationPostcode);
  const requestPostcode = normalizeAreaValue(request.locationPostcode);
  return !!(profilePostcode && requestPostcode && profilePostcode === requestPostcode);
}

/** The reason this professional may not claim this request, or null when they may. */
function profileClaimBlock(
  user: Doc<"users">,
  profile: Doc<"freelancerProfiles"> | null,
  request: Doc<"quoteRequests">,
): string | null {
  if (!profile || profile.providerRole !== "local_professional")
    return "Complete your Local professional profile before claiming requests.";
  if (
    profile.status !== "active" ||
    !["local", "hybrid"].includes(profile.workType as string)
  )
    return "Your Local professional profile is not active for local work. Contact support to review it.";
  if (profile.tenantId !== user.tenantId || request.tenantId !== user.tenantId)
    return "This request or profile belongs to another workspace.";
  if (profile.isVerified !== true)
    return "Your Local professional profile is not eligible to claim leads until it is verified. Contact support to arrange an identity, business and service-area review.";
  if (!coversLocalServiceArea(profile, request))
    return "This quote request is outside your verified service area.";
  return null;
}

/** The signed-in professional's credit balance; null for visitors. */
const getMyCredits = query({
  args: {},
  handler: async (ctx) => {
    const user = await getOptionalAuthUser(ctx);
    if (!user) return null;
    const profile = await getProviderProfile(ctx, user._id, "local_professional");
    return {
      balance: profile?.creditBalance ?? 0,
      userId: user._id,
      profileId: profile?._id ?? null,
    };
  },
});

const getMyTransactions = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getOptionalAuthUser(ctx);
    if (!user) return [];
    return await ctx.db
      .query("creditTransactions")
      .withIndex("by_freelancer", (q) => q.eq("freelancerId", user._id))
      .order("desc")
      .take(Math.min(Math.max(args.limit ?? 50, 1), 100));
  },
});

/**
 * Leads this professional has claimed. A claim unlocks the request details and
 * the client's name and email, which is the purpose of claiming a lead.
 */
const getMyClaims = query({
  args: {},
  handler: async (ctx) => {
    const user = await getOptionalAuthUser(ctx);
    if (!user) return [];
    const profile = await getProviderProfile(ctx, user._id, "local_professional");
    if (!profile) return [];

    const claims = await ctx.db
      .query("leadClaims")
      .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
      .order("desc")
      .take(200);

    const requestIds = [
      ...new Set(claims.map((claim) => claim.quoteRequestId).filter(Boolean)),
    ];
    const requests = await Promise.all(requestIds.map((id) => ctx.db.get(id)));
    const requestsById = new Map(
      requests.filter(Boolean).map((request) => [request!._id, request!]),
    );

    const clientIds = [
      ...new Set(
        requests
          .filter(Boolean)
          .map((request) => request!.clientId)
          .filter(Boolean),
      ),
    ];
    const categoryIds = [
      ...new Set(
        requests
          .filter(Boolean)
          .map((request) => request!.categoryId)
          .filter(Boolean),
      ),
    ];
    const [clients, categories] = await Promise.all([
      Promise.all(clientIds.map((id) => ctx.db.get(id))),
      Promise.all(categoryIds.map((id) => ctx.db.get(id))),
    ]);
    const clientsById = new Map(
      clients.filter(Boolean).map((client) => [client!._id, client!]),
    );
    const categoriesById = new Map(
      categories.filter(Boolean).map((category) => [category!._id, category!]),
    );

    return claims.map((claim) => {
      const request = requestsById.get(claim.quoteRequestId);
      if (!request)
        return { ...claim, request: null, client: null, categoryName: null };

      const client = clientsById.get(request.clientId);
      const category = categoriesById.get(request.categoryId);
      return {
        ...claim,
        request: {
          _id: request._id,
          title: request.title,
          description: request.description,
          locationCity: request.locationCity,
          locationPostcode: request.locationPostcode,
          budgetIndication: request.budgetIndication,
          preferredDate: request.preferredDate,
          status: request.status,
          createdAt: request.createdAt,
        },
        client: client ? { name: client.name, email: client.email } : null,
        categoryName: category?.name ?? null,
      };
    });
  },
});

/** Slot availability, prices and, for a signed-in caller, why they cannot claim. */
const getLeadStatus = query({
  args: {
    quoteRequestId: v.id("quoteRequests"),
  },
  returns: v.union(
    v.null(),
    v.object({
      claimedSlots: v.number(),
      maxSlots: v.number(),
      slotsRemaining: v.number(),
      isExclusive: v.boolean(),
      alreadyClaimed: v.boolean(),
      creditCost: v.number(),
      exclusiveCost: v.number(),
      canClaimExclusive: v.boolean(),
      claimBlockReason: v.union(v.string(), v.null()),
    }),
  ),
  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.quoteRequestId);
    if (!request) return null;

    const claims = await ctx.db
      .query("leadClaims")
      .withIndex("by_quoteRequest", (q) => q.eq("quoteRequestId", args.quoteRequestId))
      .take(MAX_SHARED_SLOTS);
    const maxSlots = request.isExclusive ? 1 : (request.maxSlots ?? MAX_SHARED_SLOTS);
    const claimedSlots = request.claimedSlots ?? 0;
    const slotsRemaining = Math.max(0, maxSlots - claimedSlots);

    let alreadyClaimed = false;
    let claimBlockReason: string | null = null;
    const user = await getOptionalAuthUser(ctx);
    if (user) {
      const profile = await getProviderProfile(ctx, user._id, "local_professional");
      if (profile)
        alreadyClaimed = claims.some((claim) => claim.freelancerId === profile._id);

      if (user.role === "admin") {
        claimBlockReason = "Administrators cannot claim Local leads.";
      } else {
        try {
          requireMarketplaceContext(user, "local_professional", "local", "claiming a lead");
        } catch (error) {
          claimBlockReason =
            error instanceof Error
              ? error.message
              : "Complete Local professional onboarding before claiming a lead.";
        }
        claimBlockReason ??= profileClaimBlock(user, profile, request);
      }
    }

    return {
      claimedSlots,
      maxSlots,
      slotsRemaining,
      isExclusive: request.isExclusive ?? false,
      alreadyClaimed,
      creditCost: getLeadCreditCost(request.budgetIndication, "shared"),
      exclusiveCost: getLeadCreditCost(request.budgetIndication, "exclusive"),
      canClaimExclusive: claimedSlots === 0 && !request.isExclusive,
      claimBlockReason,
    };
  },
});

/**
 * Claim a lead as a verified Local professional inside their service area.
 * A shared claim takes one of the slots; an exclusive claim takes the whole lead
 * and is only possible while nobody else has claimed it.
 */
const claimLead = mutation({
  args: {
    quoteRequestId: v.id("quoteRequests"),
    claimType: v.union(v.literal("shared"), v.literal("exclusive")),
  },
  returns: v.object({
    claimId: v.id("leadClaims"),
    creditsSpent: v.number(),
    newBalance: v.number(),
  }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    if (user.role === "admin")
      throw new Error("Administrators cannot claim Local leads.");
    requireMarketplaceContext(user, "local_professional", "local", "claiming a lead");
    await rateLimiter.limit(ctx, "localLeadClaim", { key: user._id, throws: true });

    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId_and_providerRole", (q) =>
        q.eq("userId", user._id).eq("providerRole", "local_professional"),
      )
      .unique();
    const request = await ctx.db.get(args.quoteRequestId);
    if (!request) throw new Error("Quote request not found.");
    if (request.status !== "open")
      throw new Error("This quote request is no longer open.");

    const blocked = profileClaimBlock(user, profile, request);
    if (blocked) throw new Error(blocked);
    if (!profile) throw new Error("Local professional profile not found.");

    const existingClaims = await ctx.db
      .query("leadClaims")
      .withIndex("by_quoteRequest", (q) => q.eq("quoteRequestId", args.quoteRequestId))
      .take(MAX_SHARED_SLOTS);
    if (existingClaims.some((claim) => claim.freelancerId === profile._id))
      throw new Error("You have already claimed this lead.");

    const claimedSlots = request.claimedSlots ?? 0;
    const maxSlots = request.maxSlots ?? MAX_SHARED_SLOTS;
    if (args.claimType === "exclusive") {
      if (claimedSlots > 0)
        throw new Error("Exclusive claim not available — lead already has claims.");
    } else {
      if (request.isExclusive)
        throw new Error("This lead has been exclusively claimed.");
      if (claimedSlots >= maxSlots)
        throw new Error("All slots for this lead are taken.");
    }

    const cost = getLeadCreditCost(request.budgetIndication, args.claimType);
    const balance = profile.creditBalance ?? 0;
    if (balance < cost)
      throw new Error(
        `Insufficient credits. You need ${cost} credits but have ${balance}.`,
      );

    const now = Date.now();
    await ctx.db.patch(profile._id, { creditBalance: balance - cost });
    const claimId = await ctx.db.insert("leadClaims", {
      quoteRequestId: args.quoteRequestId,
      freelancerId: profile._id,
      creditsSpent: cost,
      claimType: args.claimType,
      claimedAt: now,
    });
    if (args.claimType === "exclusive") {
      await ctx.db.patch(args.quoteRequestId, {
        isExclusive: true,
        claimedSlots: 1,
        maxSlots: 1,
        updatedAt: now,
      });
    } else {
      await ctx.db.patch(args.quoteRequestId, {
        claimedSlots: claimedSlots + 1,
        updatedAt: now,
      });
    }
    await ctx.db.insert("creditTransactions", {
      freelancerId: user._id,
      amount: -cost,
      type: "spend",
      description: `Claimed lead: ${request.title}`,
      referenceId: claimId,
      createdAt: now,
    });

    return { claimId, creditsSpent: cost, newBalance: balance - cost };
  },
});

/**
 * Credit a Local professional for a paid Stripe Checkout session. Server only.
 *
 * Disabled while live payments are off. The caller passes what Stripe reported;
 * `applyCreditPurchase` verifies it against the known package and makes the
 * session id the idempotency key, so a replayed or concurrent webhook credits once.
 */
const addCredits = mutation({
  args: {
    freelancerUserId: v.id("users"),
    packageId: v.string(),
    stripeSessionId: v.string(),
    paymentStatus: v.string(),
    amountTotalCents: v.number(),
    currency: v.string(),
    serverSecret: v.optional(v.string()),
  },
  returns: v.object({
    newBalance: v.number(),
    credits: v.number(),
    alreadyProcessed: v.boolean(),
  }),
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
    requireLivePaymentsEnabled("Buying credits");
    return await applyCreditPurchase(ctx, {
      freelancerUserId: args.freelancerUserId,
      packageId: args.packageId,
      stripeSessionId: args.stripeSessionId,
      paymentStatus: args.paymentStatus,
      amountTotalCents: args.amountTotalCents,
      currency: args.currency,
    });
  },
});

export {
  addCredits,
  claimLead,
  getLeadStatus,
  getMyClaims,
  getMyCredits,
  getMyTransactions,
};
