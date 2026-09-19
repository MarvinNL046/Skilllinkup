// Provider profiles for Online freelancers and Local professionals: public
// discovery, the owner's own profile, profile editing, image uploads and the
// server-only Stripe account fields.
// Readable source restored on 2026-09-19; behaviour is identical to the
// reconciled deployment version and is pinned by scripts/check-readable-convex.mjs.
import { v } from "convex/values";
import type { Doc } from "../_generated/dataModel";
import { internalQuery, mutation, query } from "../_generated/server";
import type { QueryCtx } from "../_generated/server";
import {
  getProviderProfile,
  requireAdmin,
  requireAuthUser,
  requireMarketplaceContext,
  requireOwner,
  requireServerSecret,
} from "../lib/authHelpers";
import {
  freelancerProfileStatusValidator,
  providerRoleValidator,
} from "../lib/marketplaceState";
import {
  isPublicLocalProfessionalProfile,
  isPublicOnlineFreelancerProfile,
  publicFreelancerProfileValidator,
  toPublicFreelancerProfile,
} from "../lib/publicData";
import {
  claimStoredFile,
  IMAGE_CONTENT_TYPES,
  setStoredFilePublicUrl,
} from "../lib/storageValidation";

const MB = 1024 * 1024;

/** The owner's full profile, including private fields never sent to the public. */
const ownerProfileValidator = v.object({
  _id: v.id("freelancerProfiles"),
  _creationTime: v.number(),
  userId: v.id("users"),
  providerRole: v.optional(providerRoleValidator),
  tenantId: v.id("tenants"),
  displayName: v.string(),
  slug: v.optional(v.string()),
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
  twitterUrl: v.optional(v.string()),
  githubUrl: v.optional(v.string()),
  profileVisibility: v.optional(v.string()),
  contactPermission: v.optional(v.string()),
  isVerified: v.optional(v.boolean()),
  verificationDate: v.optional(v.number()),
  stripeAccountId: v.optional(v.string()),
  stripeOnboardingComplete: v.optional(v.boolean()),
  responseTimeHours: v.optional(v.number()),
  completionRate: v.optional(v.number()),
  totalEarnings: v.optional(v.number()),
  totalOrders: v.optional(v.number()),
  ratingAverage: v.optional(v.number()),
  ratingCount: v.optional(v.number()),
  isAvailable: v.optional(v.boolean()),
  featured: v.optional(v.boolean()),
  creditBalance: v.optional(v.number()),
  level: v.optional(v.string()),
  status: freelancerProfileStatusValidator,
  locale: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const publicReviewValidator = v.object({
  _id: v.id("marketplaceReviews"),
  _creationTime: v.number(),
  reviewerRole: v.union(v.literal("client"), v.literal("freelancer")),
  overallRating: v.number(),
  communicationRating: v.optional(v.number()),
  qualityRating: v.optional(v.number()),
  timelinessRating: v.optional(v.number()),
  valueRating: v.optional(v.number()),
  content: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.number(),
  reviewerName: v.union(v.string(), v.null()),
  reviewerAvatar: v.union(v.string(), v.null()),
});

/** Fields that define where a local professional works. Changing them voids verification. */
const LOCAL_SERVICE_AREA_FIELDS = [
  "locationCity",
  "locationCountry",
  "locationPostcode",
  "serviceRadiusKm",
  "latitude",
  "longitude",
] as const;

/** Lower-case, accent-free, punctuation-free text for forgiving local search. */
function normalizeDiscoveryValue(value: string | undefined | null): string {
  return (value ?? "")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLocaleLowerCase("en")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

/** Every search word must appear somewhere in the name, tagline, bio or skills. */
function matchesLocalDiscoveryQuery(
  profile: Doc<"freelancerProfiles">,
  normalizedQuery: string,
): boolean {
  if (!normalizedQuery) return true;
  const searchable = normalizeDiscoveryValue(
    [profile.displayName, profile.tagline, profile.bio, ...(profile.skills ?? [])]
      .filter(Boolean)
      .join(" "),
  );
  return normalizedQuery.split(" ").every((word) => searchable.includes(word));
}

/** Matches city, postcode or country; postcodes also match without spaces. */
function matchesLocalDiscoveryLocation(
  profile: Doc<"freelancerProfiles">,
  normalizedLocation: string,
): boolean {
  if (!normalizedLocation) return true;
  const place = normalizeDiscoveryValue(
    [profile.locationCity, profile.locationPostcode, profile.locationCountry]
      .filter(Boolean)
      .join(" "),
  );
  const compactPlace = place.replace(/\s+/g, "");
  const compactLocation = normalizedLocation.replace(/\s+/g, "");
  return (
    place.includes(normalizedLocation) ||
    (compactLocation.length >= 3 && compactPlace.includes(compactLocation))
  );
}

/** A URL slug from the display name, with a random suffix when it is already taken. */
async function generateSlug(
  db: QueryCtx["db"],
  displayName: string,
  excludeId: string,
): Promise<string> {
  const base =
    displayName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "freelancer";
  const taken = await db
    .query("freelancerProfiles")
    .withIndex("by_slug", (q) => q.eq("slug", base))
    .first();
  if (!taken || taken._id === excludeId) return base;
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}

function isLocalProfessionalProfile(profile: Doc<"freelancerProfiles">): boolean {
  return (
    profile.providerRole === "local_professional" ||
    (!profile.providerRole && profile.workType === "local")
  );
}

/** Editing a profile requires the matching account mode to be active. */
function requireActiveProfileMode(
  user: Doc<"users">,
  profile: Doc<"freelancerProfiles">,
  action: string,
) {
  const role =
    profile.providerRole ??
    (profile.workType === "local" ? "local_professional" : "freelancer");
  requireMarketplaceContext(
    user,
    role,
    role === "local_professional" ? "local" : "online",
    action,
  );
}

/**
 * Public Online freelancer directory: verified first, then by rating.
 *
 * The list is cut to `limit` before private profiles are filtered out, so a
 * page can contain fewer rows than requested. Kept as-is for identical behaviour.
 */
const list = query({
  args: {
    locale: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  returns: v.array(publicFreelancerProfileValidator),
  handler: async (ctx, args) => {
    const limit = Math.min(Math.max(args.limit ?? 20, 1), 100);
    const scanSize = Math.min(limit * 5, 500);
    const profiles = args.locale
      ? await ctx.db
          .query("freelancerProfiles")
          .withIndex("by_status_locale", (q) =>
            q.eq("status", "active").eq("locale", args.locale),
          )
          .take(scanSize)
      : await ctx.db
          .query("freelancerProfiles")
          .withIndex("by_status", (q) => q.eq("status", "active"))
          .take(scanSize);

    return profiles
      .sort((first, second) => {
        const firstVerified = first.isVerified ? 1 : 0;
        const secondVerified = second.isVerified ? 1 : 0;
        if (secondVerified !== firstVerified) return secondVerified - firstVerified;
        return (second.ratingAverage ?? 0) - (first.ratingAverage ?? 0);
      })
      .slice(0, limit)
      .filter(isPublicOnlineFreelancerProfile)
      .map((profile) => toPublicFreelancerProfile(profile));
  },
});

/** Public Local professional directory: featured, then verified, then by rating. */
const listLocal = query({
  args: {
    locale: v.optional(v.string()),
    query: v.optional(v.string()),
    location: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  returns: v.array(publicFreelancerProfileValidator),
  handler: async (ctx, args) => {
    const limit = Math.min(Math.max(args.limit ?? 20, 1), 100);
    const scanSize = 500;
    const normalizedQuery = normalizeDiscoveryValue(args.query).slice(0, 120);
    const normalizedLocation = normalizeDiscoveryValue(args.location).slice(0, 120);

    const profiles = args.locale
      ? await ctx.db
          .query("freelancerProfiles")
          .withIndex("by_providerRole_and_status_and_locale", (q) =>
            q
              .eq("providerRole", "local_professional")
              .eq("status", "active")
              .eq("locale", args.locale),
          )
          .take(scanSize)
      : await ctx.db
          .query("freelancerProfiles")
          .withIndex("by_providerRole_and_status_and_locale", (q) =>
            q.eq("providerRole", "local_professional").eq("status", "active"),
          )
          .take(scanSize);

    return profiles
      .filter(isPublicLocalProfessionalProfile)
      .filter((profile) => matchesLocalDiscoveryQuery(profile, normalizedQuery))
      .filter((profile) => matchesLocalDiscoveryLocation(profile, normalizedLocation))
      .sort((first, second) => {
        const byFeatured = Number(second.featured) - Number(first.featured);
        if (byFeatured !== 0) return byFeatured;
        const byVerified = Number(second.isVerified) - Number(first.isVerified);
        if (byVerified !== 0) return byVerified;
        return (second.ratingAverage ?? 0) - (first.ratingAverage ?? 0);
      })
      .slice(0, limit)
      .map((profile) => toPublicFreelancerProfile(profile));
  },
});

/** The caller's own provider profile, including private fields. */
const getByUserId = query({
  args: {
    userId: v.id("users"),
    providerRole: v.optional(providerRoleValidator),
  },
  returns: v.union(v.null(), ownerProfileValidator),
  handler: async (ctx, args) => {
    const owner = await requireOwner(ctx, args.userId);
    const providerRole =
      args.providerRole ??
      (owner.activeRole === "local_professional" ? "local_professional" : "freelancer");
    return (await getProviderProfile(ctx, args.userId, providerRole)) ?? null;
  },
});

const getById = query({
  args: {
    profileId: v.id("freelancerProfiles"),
  },
  returns: v.union(v.null(), publicFreelancerProfileValidator),
  handler: async (ctx, args) => {
    const profile = await ctx.db.get(args.profileId);
    return isPublicOnlineFreelancerProfile(profile)
      ? toPublicFreelancerProfile(profile)
      : null;
  },
});

const getBySlug = query({
  args: {
    slug: v.string(),
  },
  returns: v.union(v.null(), publicFreelancerProfileValidator),
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    return isPublicOnlineFreelancerProfile(profile)
      ? toPublicFreelancerProfile(profile)
      : null;
  },
});

const getLocalById = query({
  args: {
    profileId: v.id("freelancerProfiles"),
  },
  returns: v.union(v.null(), publicFreelancerProfileValidator),
  handler: async (ctx, args) => {
    const profile = await ctx.db.get(args.profileId);
    return isPublicLocalProfessionalProfile(profile)
      ? toPublicFreelancerProfile(profile)
      : null;
  },
});

const getLocalBySlug = query({
  args: {
    slug: v.string(),
  },
  returns: v.union(v.null(), publicFreelancerProfileValidator),
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    return isPublicLocalProfessionalProfile(profile)
      ? toPublicFreelancerProfile(profile)
      : null;
  },
});

/** Full-text search over active Online freelancer bios. */
const search = query({
  args: {
    query: v.string(),
  },
  returns: v.array(publicFreelancerProfileValidator),
  handler: async (ctx, args) => {
    const matches = await ctx.db
      .query("freelancerProfiles")
      .withSearchIndex("search_freelancers", (q) =>
        q.search("bio", args.query).eq("status", "active"),
      )
      .take(50);
    return matches
      .filter(isPublicOnlineFreelancerProfile)
      .map((profile) => toPublicFreelancerProfile(profile));
  },
});

/** The owner edits their profile while the matching account mode is active. */
const updateProfile = mutation({
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
    twitterUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    isAvailable: v.optional(v.boolean()),
    profileVisibility: v.optional(v.string()),
    contactPermission: v.optional(v.string()),
    locale: v.optional(v.string()),
  },
  returns: v.id("freelancerProfiles"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const { profileId, ...changes } = args;
    const profile = await ctx.db.get(profileId);
    if (!profile) throw new Error("Profile not found.");
    if (profile.userId !== user._id) throw new Error("Unauthorized.");
    requireActiveProfileMode(user, profile, "updating this professional profile");

    if (
      changes.serviceRadiusKm !== undefined &&
      (!Number.isInteger(changes.serviceRadiusKm) ||
        changes.serviceRadiusKm < 1 ||
        changes.serviceRadiusKm > 100)
    )
      throw new Error("Service radius must be a whole number from 1 to 100 km.");
    if (
      changes.latitude !== undefined &&
      (!Number.isFinite(changes.latitude) ||
        changes.latitude < -90 ||
        changes.latitude > 90)
    )
      throw new Error("Latitude must be between -90 and 90.");
    if (
      changes.longitude !== undefined &&
      (!Number.isFinite(changes.longitude) ||
        changes.longitude < -180 ||
        changes.longitude > 180)
    )
      throw new Error("Longitude must be between -180 and 180.");

    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [field, value] of Object.entries(changes)) {
      if (value !== undefined) patch[field] = value;
    }
    if (changes.displayName || !profile.slug) {
      const name = changes.displayName || profile.displayName;
      patch.slug = await generateSlug(ctx.db, name, profileId);
    }

    // A verified local professional who moves their service area must be re-verified.
    const changesRecord = changes as Record<string, unknown>;
    const profileRecord = profile as Record<string, unknown>;
    const serviceAreaChanged = LOCAL_SERVICE_AREA_FIELDS.some(
      (field) =>
        changesRecord[field] !== undefined &&
        changesRecord[field] !== profileRecord[field],
    );
    if (
      isLocalProfessionalProfile(profile) &&
      serviceAreaChanged &&
      profile.isVerified === true
    ) {
      patch.isVerified = false;
      patch.verificationDate = undefined;
    }

    await ctx.db.patch(profileId, patch as Partial<Doc<"freelancerProfiles">>);
    return profileId;
  },
});

const generateAvatarUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    if (!(await ctx.auth.getUserIdentity()))
      throw new Error("Authentication required");
    return await ctx.storage.generateUploadUrl();
  },
});

/** Attach an uploaded avatar. Each stored file can be claimed once, by its owner. */
const saveAvatarStorageId = mutation({
  args: {
    profileId: v.id("freelancerProfiles"),
    storageId: v.id("_storage"),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const profile = await ctx.db.get(args.profileId);
    if (!profile) throw new Error("Profile not found.");
    if (profile.userId !== user._id) throw new Error("Unauthorized.");
    requireActiveProfileMode(user, profile, "updating this profile avatar");

    const { assetId } = await claimStoredFile(ctx, user._id, args.storageId, "avatar", {
      maxBytes: 5 * MB,
      allowedContentTypes: IMAGE_CONTENT_TYPES,
      typeError: "Upload a JPG, PNG or WebP profile image.",
    });
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) throw new Error("Failed to get storage URL");
    await setStoredFilePublicUrl(ctx, assetId, url);
    await ctx.db.patch(args.profileId, { avatarUrl: url, updatedAt: Date.now() });
    return url;
  },
});

const generateCoverUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    if (!(await ctx.auth.getUserIdentity()))
      throw new Error("Authentication required");
    return await ctx.storage.generateUploadUrl();
  },
});

/** Attach an uploaded cover image. Each stored file can be claimed once, by its owner. */
const saveCoverStorageId = mutation({
  args: {
    profileId: v.id("freelancerProfiles"),
    storageId: v.id("_storage"),
  },
  returns: v.string(),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const profile = await ctx.db.get(args.profileId);
    if (!profile) throw new Error("Profile not found.");
    if (profile.userId !== user._id) throw new Error("Unauthorized.");
    requireActiveProfileMode(user, profile, "updating this profile cover");

    const { assetId } = await claimStoredFile(ctx, user._id, args.storageId, "cover", {
      maxBytes: 10 * MB,
      allowedContentTypes: IMAGE_CONTENT_TYPES,
      typeError: "Upload a JPG, PNG or WebP cover image.",
    });
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) throw new Error("Failed to get storage URL");
    await setStoredFilePublicUrl(ctx, assetId, url);
    await ctx.db.patch(args.profileId, { coverImageUrl: url, updatedAt: Date.now() });
    return url;
  },
});

/**
 * Attach a Stripe Connect account. Server only: never callable from the browser.
 *
 * Known limitation, kept as-is for identical behaviour: a user with both an
 * Online and a Local profile gets the account on whichever profile the index
 * returns first. Decide per-profile payouts before live payments are enabled.
 */
const updateStripeAccount = mutation({
  args: {
    userId: v.id("users"),
    stripeAccountId: v.string(),
    serverSecret: v.optional(v.string()),
  },
  returns: v.id("freelancerProfiles"),
  handler: async (ctx, args) => {
    // Payout accounts are attached only by the trusted server route, never from the browser.
    requireServerSecret(args.serverSecret);
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

/** Mark Stripe onboarding as complete. Server only. */
const setOnboardingComplete = mutation({
  args: {
    userId: v.id("users"),
    serverSecret: v.optional(v.string()),
  },
  returns: v.id("freelancerProfiles"),
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
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

/** Public reviews of a public Online freelancer, newest first. */
const getReviews = query({
  args: {
    freelancerId: v.id("freelancerProfiles"),
    limit: v.optional(v.number()),
  },
  returns: v.array(publicReviewValidator),
  handler: async (ctx, args) => {
    const limit = Math.max(1, Math.min(args.limit ?? 10, 100));
    const profile = await ctx.db.get(args.freelancerId);
    if (!isPublicOnlineFreelancerProfile(profile)) return [];

    const revieweeId = profile.userId;
    const reviews = (
      await ctx.db
        .query("marketplaceReviews")
        .withIndex("by_reviewee", (q) => q.eq("revieweeId", revieweeId))
        .order("desc")
        .take(limit)
    ).filter((review) => review.isPublic === true);

    return await Promise.all(
      reviews.map(async (review) => {
        const reviewer = review.reviewerId
          ? await ctx.db.get(review.reviewerId)
          : null;
        return {
          _id: review._id,
          _creationTime: review._creationTime,
          reviewerRole: review.reviewerRole,
          overallRating: review.overallRating,
          communicationRating: review.communicationRating,
          qualityRating: review.qualityRating,
          timelinessRating: review.timelinessRating,
          valueRating: review.valueRating,
          content: review.content,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          reviewerName: reviewer?.name ?? null,
          reviewerAvatar: reviewer?.avatar ?? reviewer?.image ?? null,
        };
      }),
    );
  },
});

const getProfileById = internalQuery({
  args: {
    profileId: v.id("freelancerProfiles"),
  },
  returns: v.union(v.null(), ownerProfileValidator),
  handler: async (ctx, args) => ctx.db.get(args.profileId),
});

/** One-off maintenance: give profiles without a slug one. Admin or server only. */
const backfillSlugs = mutation({
  args: {
    serverSecret: v.optional(v.string()),
  },
  returns: v.object({
    updated: v.number(),
    scanned: v.number(),
    hasMore: v.boolean(),
  }),
  handler: async (ctx, args) => {
    if (args.serverSecret) requireServerSecret(args.serverSecret);
    else await requireAdmin(ctx);

    const profiles = await ctx.db.query("freelancerProfiles").take(250);
    let updated = 0;
    for (const profile of profiles) {
      if (profile.slug) continue;
      const slug = await generateSlug(ctx.db, profile.displayName, profile._id);
      await ctx.db.patch(profile._id, { slug, updatedAt: Date.now() });
      updated++;
    }
    return {
      updated,
      scanned: profiles.length,
      hasMore: profiles.length === 250,
    };
  },
});

export {
  backfillSlugs,
  generateAvatarUploadUrl,
  generateCoverUploadUrl,
  getById,
  getBySlug,
  getByUserId,
  getLocalById,
  getLocalBySlug,
  getProfileById,
  getReviews,
  list,
  listLocal,
  saveAvatarStorageId,
  saveCoverStorageId,
  search,
  setOnboardingComplete,
  updateProfile,
  updateStripeAccount,
};
