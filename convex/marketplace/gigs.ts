import type { Doc, Id } from "../_generated/dataModel";
// Reconciled with the existing development deployment (2026-09-07).
import { getMarketplaceCategoryBySlug } from "../lib/marketplaceCategories";
import { getMarketplaceDescendantIds } from "../lib/marketplaceCategories";
import { assertOnlineWorkType } from "../lib/onlineMarketplace";
import { assertActiveOnlineProviderProfile } from "../lib/onlineMarketplace";
import { assertOnlineGig } from "../lib/onlineMarketplace";
import { assertOnlineMarketplaceCategory } from "../lib/onlineMarketplace";
import { publicFreelancerProfileValidator } from "../lib/publicData";
import { isPublicOnlineFreelancerProfile } from "../lib/publicData";
import { toPublicFreelancerProfile } from "../lib/publicData";
import { query } from "../_generated/server";
import { mutation } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";
import { requireMarketplaceContext } from "../lib/authHelpers";
import { requireServerSecret } from "../lib/authHelpers";
import { gigStatusValidator } from "../lib/marketplaceState";
import { v } from "convex/values";
var b = v.union(v.number(), v.null()),
  publicCategoryValidator = v.object({
    _id: v.id("marketplaceCategories"),
    _creationTime: v.number(),
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    parentId: v.optional(v.id("marketplaceCategories")),
    serviceType: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
    locale: v.string(),
    createdAt: v.number(),
    updatedAt: v.number()
  }),
  w = {
    _id: v.id("gigs"),
    _creationTime: v.number(),
    freelancerId: v.id("freelancerProfiles"),
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    categoryId: v.optional(v.id("marketplaceCategories")),
    tags: v.optional(v.array(v.string())),
    workType: v.optional(v.string()),
    locationCity: v.optional(v.string()),
    locationCountry: v.optional(v.string()),
    serviceRadiusKm: v.optional(v.number()),
    views: v.optional(v.number()),
    orderCount: v.optional(v.number()),
    ratingAverage: v.optional(v.number()),
    ratingCount: v.optional(v.number()),
    isFeatured: v.optional(v.boolean()),
    status: gigStatusValidator,
    locale: v.string(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number()
  },
  S = v.object({
    _id: v.id("gigPackages"),
    _creationTime: v.number(),
    gigId: v.id("gigs"),
    tier: v.string(),
    title: v.string(),
    description: v.string(),
    price: v.number(),
    currency: v.optional(v.string()),
    deliveryDays: v.number(),
    revisionCount: v.optional(v.number()),
    features: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.number()
  }),
  D = v.object({
    _id: v.id("gigImages"),
    _creationTime: v.number(),
    gigId: v.id("gigs"),
    imageUrl: v.string(),
    altText: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
    createdAt: v.number()
  }),
  R = v.object({
    ...w,
    freelancerProfile: publicFreelancerProfileValidator,
    category: v.union(publicCategoryValidator, v.null()),
    minPrice: b,
    minDeliveryDays: b,
    firstImage: v.union(D, v.null())
  }),
  N = v.object({
    ...w,
    category: v.union(publicCategoryValidator, v.null()),
    minPrice: b,
    minDeliveryDays: b,
    firstImage: v.union(D, v.null())
  }),
  H = v.object({
    ...w,
    tenantId: v.id("tenants"),
    category: v.union(publicCategoryValidator, v.null()),
    minPrice: b,
    minDeliveryDays: b,
    firstImage: v.union(D, v.null())
  });
function toPublicCategory(category: Doc<"marketplaceCategories"> | null) {
  return category ? {
    _id: category._id,
    _creationTime: category._creationTime,
    name: category.name,
    slug: category.slug,
    description: category.description,
    icon: category.icon,
    imageUrl: category.imageUrl,
    parentId: category.parentId,
    serviceType: category.serviceType,
    sortOrder: category.sortOrder,
    isActive: category.isActive,
    locale: category.locale,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt
  } : null;
}
function toPublicGig(gig: Doc<"gigs">) {
  return {
    _id: gig._id,
    _creationTime: gig._creationTime,
    freelancerId: gig.freelancerId,
    title: gig.title,
    slug: gig.slug,
    description: gig.description,
    categoryId: gig.categoryId,
    tags: gig.tags,
    workType: gig.workType,
    locationCity: gig.locationCity,
    locationCountry: gig.locationCountry,
    serviceRadiusKm: gig.serviceRadiusKm,
    views: gig.views,
    orderCount: gig.orderCount,
    ratingAverage: gig.ratingAverage,
    ratingCount: gig.ratingCount,
    isFeatured: gig.isFeatured,
    status: gig.status,
    locale: gig.locale,
    publishedAt: gig.publishedAt,
    createdAt: gig.createdAt,
    updatedAt: gig.updatedAt
  };
}
function toSafePackage(pkg: Doc<"gigPackages">) {
  return {
    ...pkg,
    features: pkg.features?.filter(t => typeof t == "string")
  };
}
function requireOwnedOnlineProfile(profile: Doc<"freelancerProfiles"> | null, userId: Id<"users">) {
  if (!profile) throw new Error("Freelancer profile not found.");
  if (profile.userId !== userId) throw new Error("Unauthorized.");
  if (profile.providerRole === "local_professional" || !profile.providerRole && profile.workType === "local") throw new Error("Use your Online freelancer profile for this service.");
  return profile;
}
async function enrichGigsPublic(ctx: any, gigs: Doc<"gigs">[]): Promise<Array<Doc<"gigs"> & {
  freelancerProfile: ReturnType<typeof toPublicFreelancerProfile>;
  category: Doc<"marketplaceCategories"> | null;
  minPrice: number | null;
  minDeliveryDays: number | null;
  firstImage: Doc<"gigImages"> | null;
}>> {
  if (gigs.length === 0) return [];
  let a = [...new Set(gigs.map(l => l.freelancerId).filter(Boolean))],
    n = await Promise.all(a.map(l => ctx.db.get(l))),
    s = new Map(n.filter(Boolean).map(l => [l._id, l])),
    o = [...new Set(gigs.map(l => l.categoryId).filter(Boolean))],
    g = await Promise.all(o.map(l => ctx.db.get(l))),
    i = new Map(g.filter(Boolean).map(l => [l._id, l])),
    d = await Promise.all(gigs.map(l => ctx.db.query("gigPackages").withIndex("by_gig_price", p => p.eq("gigId", l._id)).order("asc").first())),
    m = await Promise.all(gigs.map(l => ctx.db.query("gigImages").withIndex("by_gig_sortOrder", p => p.eq("gigId", l._id)).order("asc").first())),
    u = [];
  for (let l = 0; l < gigs.length; l++) {
    let p = gigs[l],
      k = s.get(p.freelancerId) ?? null;
    if (!isPublicOnlineFreelancerProfile(k)) continue;
    let L = p.categoryId ? i.get(p.categoryId) ?? null : null,
      E = d[l],
      z = m[l];
    u.push({
      ...toPublicGig(p),
      freelancerProfile: toPublicFreelancerProfile(k),
      category: toPublicCategory(L),
      minPrice: E?.price ?? null,
      minDeliveryDays: E?.deliveryDays ?? null,
      firstImage: z ?? null
    });
  }
  return u;
}
async function enrichGigsOwner(ctx: any, gigs: Doc<"gigs">[]): Promise<Array<Doc<"gigs"> & {
  category: Exclude<ReturnType<typeof toPublicCategory>, null> | null;
  minPrice: number | null;
  minDeliveryDays: number | null;
  firstImage: Doc<"gigImages"> | null;
}>> {
  if (gigs.length === 0) return [];
  let a = [...new Set(gigs.map(i => i.categoryId).filter(Boolean))],
    n = await Promise.all(a.map(i => ctx.db.get(i))),
    s = new Map(n.filter(Boolean).map(i => [i._id, i])),
    o = await Promise.all(gigs.map(i => ctx.db.query("gigPackages").withIndex("by_gig_price", d => d.eq("gigId", i._id)).order("asc").first())),
    g = await Promise.all(gigs.map(i => ctx.db.query("gigImages").withIndex("by_gig_sortOrder", d => d.eq("gigId", i._id)).order("asc").first()));
  return gigs.map((i, d) => {
    let m = i.categoryId ? s.get(i.categoryId) ?? null : null,
      u = o[d],
      l = g[d];
    return {
      ...i,
      category: toPublicCategory(m),
      minPrice: u?.price ?? null,
      minDeliveryDays: u?.deliveryDays ?? null,
      firstImage: l ?? null
    };
  });
}
var list = query({
    args: {
      locale: v.string(),
      limit: v.optional(v.number())
    },
    returns: v.array(R),
    handler: async (ctx, args) => {
      let a = Math.min(Math.max(args.limit ?? 20, 1), 100),
        s = (await ctx.db.query("gigs").withIndex("by_status_locale", o => o.eq("status", "active").eq("locale", args.locale)).take(Math.min(a * 5, 500))).slice().sort((o, g) => {
          let i = o.isFeatured ? 1 : 0,
            d = g.isFeatured ? 1 : 0;
          return d !== i ? d - i : (g.ratingAverage ?? 0) - (o.ratingAverage ?? 0);
        }).slice(0, a);
      return enrichGigsPublic(ctx, s);
    }
  }),
  listByCategory = query({
    args: {
      categorySlug: v.string(),
      locale: v.string(),
      limit: v.optional(v.number())
    },
    returns: v.object({
      category: v.union(publicCategoryValidator, v.null()),
      gigs: v.array(R)
    }),
    handler: async (ctx, args) => {
      let a = Math.max(1, Math.min(args.limit ?? 50, 100)),
        n = await ctx.db.query("marketplaceCategories").withIndex("by_locale", u => u.eq("locale", args.locale)).take(500),
        s = getMarketplaceCategoryBySlug(n, args.categorySlug);
      if (!s) return {
        category: null,
        gigs: []
      };
      let o = getMarketplaceDescendantIds(s),
        g = [];
      for (let u of o) {
        let l = await ctx.db.query("gigs").withIndex("by_category_status_locale", p => p.eq("categoryId", u as Id<"marketplaceCategories">).eq("status", "active").eq("locale", args.locale)).take(Math.min(a, 100));
        g.push(...l);
      }
      let i = g.sort((u, l) => {
          let p = u.isFeatured ? 1 : 0,
            k = l.isFeatured ? 1 : 0;
          return k !== p ? k - p : (l.ratingAverage ?? 0) - (u.ratingAverage ?? 0);
        }).slice(0, a),
        d = await enrichGigsPublic(ctx, i),
        m = n.find(u => u._id === s._id) ?? null;
      return {
        category: toPublicCategory(m),
        gigs: d
      };
    }
  }),
  getBySlug = query({
    args: {
      slug: v.string(),
      locale: v.string()
    },
    returns: v.union(v.null(), v.object({
      ...w,
      freelancerProfile: publicFreelancerProfileValidator,
      category: v.union(publicCategoryValidator, v.null()),
      packages: v.array(S),
      images: v.array(D)
    })),
    handler: async (ctx, args) => {
      let a = await ctx.db.query("gigs").withIndex("by_slug_locale", i => i.eq("slug", args.slug).eq("locale", args.locale)).first();
      if (!a || a.status !== "active") return null;
      let n = await ctx.db.get(a.freelancerId);
      if (!isPublicOnlineFreelancerProfile(n)) return null;
      let s = a.categoryId ? await ctx.db.get(a.categoryId) : null,
        o = await ctx.db.query("gigPackages").withIndex("by_gig_price", i => i.eq("gigId", a._id)).order("asc").take(10),
        g = await ctx.db.query("gigImages").withIndex("by_gig_sortOrder", i => i.eq("gigId", a._id)).order("asc").take(20);
      return {
        ...toPublicGig(a),
        freelancerProfile: toPublicFreelancerProfile(n),
        category: toPublicCategory(s),
        packages: o.map(toSafePackage),
        images: g
      };
    }
  }),
  getByFreelancer = query({
    args: {
      freelancerId: v.id("freelancerProfiles"),
      locale: v.string()
    },
    returns: v.array(N),
    handler: async (ctx, args) => {
      let a = await ctx.db.get("freelancerProfiles", args.freelancerId);
      if (!isPublicOnlineFreelancerProfile(a)) return [];
      let n = await ctx.db.query("gigs").withIndex("by_freelancer", o => o.eq("freelancerId", args.freelancerId)).filter(o => o.and(o.eq(o.field("status"), "active"), o.eq(o.field("locale"), args.locale))).take(100);
      return (await enrichGigsOwner(ctx, n)).map(o => ({
        ...toPublicGig(o),
        category: o.category,
        minPrice: o.minPrice,
        minDeliveryDays: o.minDeliveryDays,
        firstImage: o.firstImage
      }));
    }
  }),
  search = query({
    args: {
      query: v.string(),
      locale: v.string()
    },
    returns: v.array(R),
    handler: async (ctx, args) => {
      let a = await ctx.db.query("gigs").withSearchIndex("search_gigs", n => n.search("title", args.query).eq("status", "active").eq("locale", args.locale)).take(50);
      return enrichGigsPublic(ctx, a);
    }
  }),
  getById = query({
    args: {
      gigId: v.id("gigs"),
      serverSecret: v.optional(v.string())
    },
    returns: v.union(v.null(), v.object({
      ...w,
      tenantId: v.id("tenants")
    })),
    handler: async (ctx, args) => (requireServerSecret(args.serverSecret), (await ctx.db.get("gigs", args.gigId)) ?? null)
  }),
  getPackageById = query({
    args: {
      packageId: v.id("gigPackages"),
      serverSecret: v.optional(v.string())
    },
    returns: v.union(v.null(), S),
    handler: async (ctx, args) => {
      requireServerSecret(args.serverSecret);
      let a = await ctx.db.get("gigPackages", args.packageId);
      return a ? toSafePackage(a) : null;
    }
  }),
  create = mutation({
    args: {
      tenantId: v.id("tenants"),
      freelancerId: v.id("freelancerProfiles"),
      title: v.string(),
      slug: v.string(),
      description: v.string(),
      categoryId: v.optional(v.id("marketplaceCategories")),
      tags: v.optional(v.array(v.string())),
      workType: v.optional(v.string()),
      locationCity: v.optional(v.string()),
      locationCountry: v.optional(v.string()),
      serviceRadiusKm: v.optional(v.number()),
      locale: v.string()
    },
    returns: v.id("gigs"),
    handler: async (ctx, args) => {
      let a = await requireAuthUser(ctx);
      if (requireMarketplaceContext(a, "freelancer", "online", "publishing a service"), args.tenantId !== a.tenantId) throw new Error("Online marketplace tenant mismatch.");
      let n = await ctx.db.get("freelancerProfiles", args.freelancerId);
      assertActiveOnlineProviderProfile(n, {
        ownerId: a._id,
        accountTenantId: a.tenantId,
        resourceTenantId: a.tenantId
      });
      let s = args.workType ?? "remote";
      assertOnlineWorkType(s, "Online service"), await assertOnlineMarketplaceCategory(ctx, args.categoryId, a.tenantId, args.locale);
      let o = Date.now();
      return await ctx.db.insert("gigs", {
        tenantId: a.tenantId,
        freelancerId: args.freelancerId,
        title: args.title,
        slug: args.slug,
        description: args.description,
        categoryId: args.categoryId,
        tags: args.tags,
        workType: s,
        locationCity: args.locationCity,
        locationCountry: args.locationCountry,
        serviceRadiusKm: args.serviceRadiusKm,
        locale: args.locale,
        status: "active",
        views: 0,
        orderCount: 0,
        ratingAverage: 0,
        ratingCount: 0,
        isFeatured: !1,
        createdAt: o,
        updatedAt: o
      });
    }
  }),
  getAllByFreelancer = query({
    args: {
      freelancerId: v.id("freelancerProfiles")
    },
    returns: v.array(H),
    handler: async (ctx, args) => {
      let a = await requireAuthUser(ctx);
      requireMarketplaceContext(a, "freelancer", "online", "viewing your services");
      let n = await ctx.db.get("freelancerProfiles", args.freelancerId);
      requireOwnedOnlineProfile(n, a._id);
      let s = await ctx.db.query("gigs").withIndex("by_freelancer", o => o.eq("freelancerId", args.freelancerId)).order("desc").take(250);
      return enrichGigsOwner(ctx, s);
    }
  }),
  remove = mutation({
    args: {
      gigId: v.id("gigs")
    },
    returns: v.id("gigs"),
    handler: async (ctx, args) => {
      let a = await requireAuthUser(ctx);
      requireMarketplaceContext(a, "freelancer", "online", "removing a service");
      let n = await ctx.db.get("gigs", args.gigId);
      if (!n) throw new Error("Gig not found.");
      let s = await ctx.db.get("freelancerProfiles", n.freelancerId);
      return requireOwnedOnlineProfile(s, a._id), await ctx.db.patch(args.gigId, {
        status: "deleted",
        updatedAt: Date.now()
      }), args.gigId;
    }
  }),
  createPackage = mutation({
    args: {
      gigId: v.id("gigs"),
      tier: v.string(),
      title: v.string(),
      description: v.string(),
      price: v.number(),
      currency: v.optional(v.string()),
      deliveryDays: v.number(),
      revisionCount: v.optional(v.number()),
      features: v.optional(v.array(v.string()))
    },
    returns: v.id("gigPackages"),
    handler: async (ctx, args) => {
      let a = await requireAuthUser(ctx);
      requireMarketplaceContext(a, "freelancer", "online", "adding a service package");
      let n = await ctx.db.get("gigs", args.gigId);
      if (!n) throw new Error("Gig not found.");
      let s = await ctx.db.get("freelancerProfiles", n.freelancerId),
        o = assertActiveOnlineProviderProfile(s, {
          ownerId: a._id,
          accountTenantId: a.tenantId,
          resourceTenantId: n.tenantId
        });
      assertOnlineGig(n, o, {
        expectedTenantId: a.tenantId
      }), await assertOnlineMarketplaceCategory(ctx, n.categoryId, a.tenantId, n.locale);
      let g = Date.now();
      return await ctx.db.insert("gigPackages", {
        gigId: args.gigId,
        tier: args.tier,
        title: args.title,
        description: args.description,
        price: args.price,
        currency: args.currency ?? "EUR",
        deliveryDays: args.deliveryDays,
        revisionCount: args.revisionCount,
        features: args.features ?? [],
        createdAt: g,
        updatedAt: g
      });
    }
  }),
  update = mutation({
    args: {
      gigId: v.id("gigs"),
      title: v.optional(v.string()),
      slug: v.optional(v.string()),
      description: v.optional(v.string()),
      categoryId: v.optional(v.id("marketplaceCategories")),
      tags: v.optional(v.array(v.string())),
      workType: v.optional(v.string()),
      locationCity: v.optional(v.string()),
      locationCountry: v.optional(v.string()),
      serviceRadiusKm: v.optional(v.number()),
      status: v.optional(gigStatusValidator),
      locale: v.optional(v.string())
    },
    returns: v.id("gigs"),
    handler: async (ctx, args) => {
      let a = await requireAuthUser(ctx);
      requireMarketplaceContext(a, "freelancer", "online", "updating a service");
      let n = await ctx.db.get("gigs", args.gigId);
      if (!n) throw new Error("Gig not found.");
      let s = await ctx.db.get("freelancerProfiles", n.freelancerId),
        o = assertActiveOnlineProviderProfile(s, {
          ownerId: a._id,
          accountTenantId: a.tenantId,
          resourceTenantId: n.tenantId
        }),
        g = args.workType ?? n.workType;
      assertOnlineGig(n, o, {
        expectedTenantId: a.tenantId,
        workType: g
      }), await assertOnlineMarketplaceCategory(ctx, args.categoryId ?? n.categoryId, a.tenantId, args.locale ?? n.locale);
      let {
          gigId: i,
          ...d
        } = args,
        m = {
          updatedAt: Date.now()
        };
      for (let [u, l] of Object.entries(d)) l !== void 0 && (m[u] = l);
      return await ctx.db.patch(i, m), i;
    }
  }),
  getByFreelancerWithPackages = query({
    args: {
      freelancerId: v.id("freelancerProfiles")
    },
    returns: v.array(v.object({
      ...w,
      packages: v.array(S)
    })),
    handler: async (ctx, args) => {
      let a = await ctx.db.get("freelancerProfiles", args.freelancerId);
      if (!isPublicOnlineFreelancerProfile(a)) return [];
      let n = await ctx.db.query("gigs").withIndex("by_freelancer_status", i => i.eq("freelancerId", args.freelancerId).eq("status", "active")).take(100);
      if (n.length === 0) return [];
      let s = await Promise.all(n.map(i => ctx.db.query("gigPackages").withIndex("by_gig", d => d.eq("gigId", i._id)).take(3))),
        o = {
          basic: 0,
          standard: 1,
          premium: 2
        };
      return n.map((i, d) => {
        let u = s[d].map(toSafePackage).sort((l, p) => (o[l.tier] ?? 99) - (o[p.tier] ?? 99));
        return {
          ...toPublicGig(i),
          packages: u
        };
      }).filter(i => i.packages.length > 0);
    }
  });
export { create, createPackage, getAllByFreelancer, getByFreelancer, getByFreelancerWithPackages, getById, getBySlug, getPackageById, list, listByCategory, remove, search, update };
