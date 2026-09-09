import type { Doc } from "../_generated/dataModel";
import type { QueryCtx } from "../_generated/server";
// Reconciled with the existing development deployment (2026-09-07).
import { claimStoredFile } from "../lib/storageValidation";
import { setStoredFilePublicUrl } from "../lib/storageValidation";
import { IMAGE_CONTENT_TYPES } from "../lib/storageValidation";
import { publicFreelancerProfileValidator } from "../lib/publicData";
import { isPublicOnlineFreelancerProfile } from "../lib/publicData";
import { isPublicLocalProfessionalProfile } from "../lib/publicData";
import { toPublicFreelancerProfile } from "../lib/publicData";
import { query } from "../_generated/server";
import { internalQuery } from "../_generated/server";
import { mutation } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";
import { requireAdmin } from "../lib/authHelpers";
import { requireOwner } from "../lib/authHelpers";
import { requireMarketplaceContext } from "../lib/authHelpers";
import { getProviderProfile } from "../lib/authHelpers";
import { requireServerSecret } from "../lib/authHelpers";
import { providerRoleValidator } from "../lib/marketplaceState";
import { freelancerProfileStatusValidator } from "../lib/marketplaceState";
import { v } from "convex/values";
var L = v.object({
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
    updatedAt: v.number()
  }),
  M = v.object({
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
    reviewerAvatar: v.union(v.string(), v.null())
  });
function normalizeDiscoveryValue(r) {
  return (r ?? "").normalize("NFKD").replace(/\p{M}/gu, "").toLocaleLowerCase("en").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
function matchesLocalDiscoveryQuery(r, t) {
  if (!t) return !0;
  let i = normalizeDiscoveryValue([r.displayName, r.tagline, r.bio, ...(r.skills ?? [])].filter(Boolean).join(" "));
  return t.split(" ").every(o => i.includes(o));
}
function matchesLocalDiscoveryLocation(r, t) {
  if (!t) return !0;
  let i = normalizeDiscoveryValue([r.locationCity, r.locationPostcode, r.locationCountry].filter(Boolean).join(" ")),
    o = i.replace(/\s+/g, ""),
    n = t.replace(/\s+/g, "");
  return i.includes(t) || n.length >= 3 && o.includes(n);
}
async function generateSlug(db: QueryCtx["db"], displayName: string, excludeId: string): Promise<string> {
  let o = displayName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "freelancer",
    n = await db.query("freelancerProfiles").withIndex("by_slug", c => c.eq("slug", o)).first();
  if (!n || n._id === excludeId) return o;
  let a = Math.random().toString(36).slice(2, 6);
  return `${o}-${a}`;
}
function requireActiveProfileMode(user: Doc<"users">, profile: Doc<"freelancerProfiles">, action: string) {
  let o = profile.providerRole ?? (profile.workType === "local" ? "local_professional" : "freelancer");
  requireMarketplaceContext(user, o, o === "local_professional" ? "local" : "online", action);
}
var list = query({
    args: {
      locale: v.optional(v.string()),
      limit: v.optional(v.number())
    },
    returns: v.array(publicFreelancerProfileValidator),
    handler: async (ctx, args) => {
      let i = Math.min(Math.max(args.limit ?? 20, 1), 100),
        o = Math.min(i * 5, 500),
        n;
      return args.locale ? n = await ctx.db.query("freelancerProfiles").withIndex("by_status_locale", c => c.eq("status", "active").eq("locale", args.locale)).take(o) : n = await ctx.db.query("freelancerProfiles").withIndex("by_status", c => c.eq("status", "active")).take(o), n.sort((c, d) => {
        let l = c.isVerified ? 1 : 0,
          u = d.isVerified ? 1 : 0;
        return u !== l ? u - l : (d.ratingAverage ?? 0) - (c.ratingAverage ?? 0);
      }).slice(0, i).filter(isPublicOnlineFreelancerProfile).map(c => toPublicFreelancerProfile(c));
    }
  }),
  listLocal = query({
    args: {
      locale: v.optional(v.string()),
      query: v.optional(v.string()),
      location: v.optional(v.string()),
      limit: v.optional(v.number())
    },
    returns: v.array(publicFreelancerProfileValidator),
    handler: async (ctx, args) => {
      let i = Math.min(Math.max(args.limit ?? 20, 1), 100),
        o = 500,
        n = normalizeDiscoveryValue(args.query).slice(0, 120),
        a = normalizeDiscoveryValue(args.location).slice(0, 120);
      return (args.locale ? await ctx.db.query("freelancerProfiles").withIndex("by_providerRole_and_status_and_locale", d => d.eq("providerRole", "local_professional").eq("status", "active").eq("locale", args.locale)).take(o) : await ctx.db.query("freelancerProfiles").withIndex("by_providerRole_and_status_and_locale", d => d.eq("providerRole", "local_professional").eq("status", "active")).take(o)).filter(isPublicLocalProfessionalProfile).filter(d => matchesLocalDiscoveryQuery(d, n)).filter(d => matchesLocalDiscoveryLocation(d, a)).sort((d, l) => {
        let u = Number(l.featured) - Number(d.featured);
        if (u !== 0) return u;
        let w = Number(l.isVerified) - Number(d.isVerified);
        return w !== 0 ? w : (l.ratingAverage ?? 0) - (d.ratingAverage ?? 0);
      }).slice(0, i).map(d => toPublicFreelancerProfile(d));
    }
  }),
  getByUserId = query({
    args: {
      userId: v.id("users"),
      providerRole: v.optional(providerRoleValidator)
    },
    returns: v.union(v.null(), L),
    handler: async (ctx, args) => {
      let i = await requireOwner(ctx, args.userId),
        o = args.providerRole ?? (i.activeRole === "local_professional" ? "local_professional" : "freelancer");
      return (await getProviderProfile(ctx, args.userId, o)) ?? null;
    }
  }),
  getById = query({
    args: {
      profileId: v.id("freelancerProfiles")
    },
    returns: v.union(v.null(), publicFreelancerProfileValidator),
    handler: async (ctx, args) => {
      let i = await ctx.db.get(args.profileId);
      return isPublicOnlineFreelancerProfile(i) ? toPublicFreelancerProfile(i) : null;
    }
  }),
  getBySlug = query({
    args: {
      slug: v.string()
    },
    returns: v.union(v.null(), publicFreelancerProfileValidator),
    handler: async (ctx, args) => {
      let i = await ctx.db.query("freelancerProfiles").withIndex("by_slug", o => o.eq("slug", args.slug)).first();
      return isPublicOnlineFreelancerProfile(i) ? toPublicFreelancerProfile(i) : null;
    }
  }),
  getLocalById = query({
    args: {
      profileId: v.id("freelancerProfiles")
    },
    returns: v.union(v.null(), publicFreelancerProfileValidator),
    handler: async (ctx, args) => {
      let i = await ctx.db.get(args.profileId);
      return isPublicLocalProfessionalProfile(i) ? toPublicFreelancerProfile(i) : null;
    }
  }),
  getLocalBySlug = query({
    args: {
      slug: v.string()
    },
    returns: v.union(v.null(), publicFreelancerProfileValidator),
    handler: async (ctx, args) => {
      let i = await ctx.db.query("freelancerProfiles").withIndex("by_slug", o => o.eq("slug", args.slug)).first();
      return isPublicLocalProfessionalProfile(i) ? toPublicFreelancerProfile(i) : null;
    }
  }),
  search = query({
    args: {
      query: v.string()
    },
    returns: v.array(publicFreelancerProfileValidator),
    handler: async (ctx, args) => (await ctx.db.query("freelancerProfiles").withSearchIndex("search_freelancers", o => o.search("bio", args.query).eq("status", "active")).take(50)).filter(isPublicOnlineFreelancerProfile).map(o => toPublicFreelancerProfile(o))
  }),
  updateProfile = mutation({
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
      locale: v.optional(v.string())
    },
    returns: v.id("freelancerProfiles"),
    handler: async (ctx, args) => {
      let i = await requireAuthUser(ctx),
        {
          profileId: o,
          ...n
        } = args,
        a = await ctx.db.get(o);
      if (!a) throw new Error("Profile not found.");
      if (a.userId !== i._id) throw new Error("Unauthorized.");
      requireActiveProfileMode(i, a, "updating this professional profile");
      let c = a.providerRole === "local_professional" || !a.providerRole && a.workType === "local";
      if (n.serviceRadiusKm !== void 0 && (!Number.isInteger(n.serviceRadiusKm) || n.serviceRadiusKm < 1 || n.serviceRadiusKm > 100)) throw new Error("Service radius must be a whole number from 1 to 100 km.");
      if (n.latitude !== void 0 && (!Number.isFinite(n.latitude) || n.latitude < -90 || n.latitude > 90)) throw new Error("Latitude must be between -90 and 90.");
      if (n.longitude !== void 0 && (!Number.isFinite(n.longitude) || n.longitude < -180 || n.longitude > 180)) throw new Error("Longitude must be between -180 and 180.");
      let d: Partial<Doc<"freelancerProfiles">> = {
        updatedAt: Date.now()
      };
      for (let [u, w] of Object.entries(n)) w !== void 0 && (d[u] = w);
      if (n.displayName || !a.slug) {
        let u = n.displayName || a.displayName;
        d.slug = await generateSlug(ctx.db, u, o);
      }
      return c && ["locationCity", "locationCountry", "locationPostcode", "serviceRadiusKm", "latitude", "longitude"].some(u => n[u] !== void 0 && n[u] !== a[u]) && a.isVerified === !0 && (d.isVerified = !1, d.verificationDate = void 0), await ctx.db.patch(o, d), o;
    }
  }),
  generateAvatarUploadUrl = mutation({
    args: {},
    returns: v.string(),
    handler: async ctx => {
      if (!(await ctx.auth.getUserIdentity())) throw new Error("Authentication required");
      return await ctx.storage.generateUploadUrl();
    }
  }),
  saveAvatarStorageId = mutation({
    args: {
      profileId: v.id("freelancerProfiles"),
      storageId: v.id("_storage")
    },
    returns: v.string(),
    handler: async (ctx, args) => {
      let i = await requireAuthUser(ctx),
        o = await ctx.db.get(args.profileId);
      if (!o) throw new Error("Profile not found.");
      if (o.userId !== i._id) throw new Error("Unauthorized.");
      requireActiveProfileMode(i, o, "updating this profile avatar");
      let {
          assetId: n
        } = await claimStoredFile(ctx, i._id, args.storageId, "avatar", {
          maxBytes: 5 * 1024 * 1024,
          allowedContentTypes: IMAGE_CONTENT_TYPES,
          typeError: "Upload a JPG, PNG or WebP profile image."
        }),
        a = await ctx.storage.getUrl(args.storageId);
      if (!a) throw new Error("Failed to get storage URL");
      return await setStoredFilePublicUrl(ctx, n, a), await ctx.db.patch(args.profileId, {
        avatarUrl: a,
        updatedAt: Date.now()
      }), a;
    }
  }),
  generateCoverUploadUrl = mutation({
    args: {},
    returns: v.string(),
    handler: async ctx => {
      if (!(await ctx.auth.getUserIdentity())) throw new Error("Authentication required");
      return await ctx.storage.generateUploadUrl();
    }
  }),
  saveCoverStorageId = mutation({
    args: {
      profileId: v.id("freelancerProfiles"),
      storageId: v.id("_storage")
    },
    returns: v.string(),
    handler: async (ctx, args) => {
      let i = await requireAuthUser(ctx),
        o = await ctx.db.get(args.profileId);
      if (!o) throw new Error("Profile not found.");
      if (o.userId !== i._id) throw new Error("Unauthorized.");
      requireActiveProfileMode(i, o, "updating this profile cover");
      let {
          assetId: n
        } = await claimStoredFile(ctx, i._id, args.storageId, "cover", {
          maxBytes: 10 * 1024 * 1024,
          allowedContentTypes: IMAGE_CONTENT_TYPES,
          typeError: "Upload a JPG, PNG or WebP cover image."
        }),
        a = await ctx.storage.getUrl(args.storageId);
      if (!a) throw new Error("Failed to get storage URL");
      return await setStoredFilePublicUrl(ctx, n, a), await ctx.db.patch(args.profileId, {
        coverImageUrl: a,
        updatedAt: Date.now()
      }), a;
    }
  }),
  updateStripeAccount = mutation({
    args: {
      userId: v.id("users"),
      stripeAccountId: v.string(),
      serverSecret: v.optional(v.string())
    },
    returns: v.id("freelancerProfiles"),
    handler: async (ctx, args) => {
      args.serverSecret ? requireServerSecret(args.serverSecret) : await requireOwner(ctx, args.userId);
      let i = await ctx.db.query("freelancerProfiles").withIndex("by_userId", o => o.eq("userId", args.userId)).first();
      if (!i) throw new Error("Freelancer profile not found");
      return await ctx.db.patch(i._id, {
        stripeAccountId: args.stripeAccountId,
        updatedAt: Date.now()
      }), i._id;
    }
  }),
  setOnboardingComplete = mutation({
    args: {
      userId: v.id("users"),
      serverSecret: v.optional(v.string())
    },
    returns: v.id("freelancerProfiles"),
    handler: async (ctx, args) => {
      requireServerSecret(args.serverSecret);
      let i = await ctx.db.query("freelancerProfiles").withIndex("by_userId", o => o.eq("userId", args.userId)).first();
      if (!i) throw new Error("Freelancer profile not found");
      return await ctx.db.patch(i._id, {
        stripeOnboardingComplete: !0,
        updatedAt: Date.now()
      }), i._id;
    }
  }),
  getReviews = query({
    args: {
      freelancerId: v.id("freelancerProfiles"),
      limit: v.optional(v.number())
    },
    returns: v.array(M),
    handler: async (ctx, args) => {
      let i = Math.max(1, Math.min(args.limit ?? 10, 100)),
        o = await ctx.db.get(args.freelancerId);
      if (!isPublicOnlineFreelancerProfile(o)) return [];
      let n = o.userId,
        c = (await ctx.db.query("marketplaceReviews").withIndex("by_reviewee", l => l.eq("revieweeId", n)).order("desc").take(i)).filter(l => l.isPublic === !0);
      return await Promise.all(c.map(async l => {
        let u = l.reviewerId ? await ctx.db.get(l.reviewerId) : null;
        return {
          _id: l._id,
          _creationTime: l._creationTime,
          reviewerRole: l.reviewerRole,
          overallRating: l.overallRating,
          communicationRating: l.communicationRating,
          qualityRating: l.qualityRating,
          timelinessRating: l.timelinessRating,
          valueRating: l.valueRating,
          content: l.content,
          createdAt: l.createdAt,
          updatedAt: l.updatedAt,
          reviewerName: u?.name ?? null,
          reviewerAvatar: u?.avatar ?? u?.image ?? null
        };
      }));
    }
  }),
  getProfileById = internalQuery({
    args: {
      profileId: v.id("freelancerProfiles")
    },
    returns: v.union(v.null(), L),
    handler: async (ctx, args) => ctx.db.get(args.profileId)
  }),
  backfillSlugs = mutation({
    args: {
      serverSecret: v.optional(v.string())
    },
    returns: v.object({
      updated: v.number(),
      scanned: v.number(),
      hasMore: v.boolean()
    }),
    handler: async (ctx, args) => {
      args.serverSecret ? requireServerSecret(args.serverSecret) : await requireAdmin(ctx);
      let i = await ctx.db.query("freelancerProfiles").take(250),
        o = 0;
      for (let n of i) {
        if (n.slug) continue;
        let a = await generateSlug(ctx.db, n.displayName, n._id);
        await ctx.db.patch(n._id, {
          slug: a,
          updatedAt: Date.now()
        }), o++;
      }
      return {
        updated: o,
        scanned: i.length,
        hasMore: i.length === 250
      };
    }
  });
export { backfillSlugs, generateAvatarUploadUrl, generateCoverUploadUrl, getById, getBySlug, getByUserId, getLocalById, getLocalBySlug, getProfileById, getReviews, list, listLocal, saveAvatarStorageId, saveCoverStorageId, search, setOnboardingComplete, updateProfile, updateStripeAccount };
