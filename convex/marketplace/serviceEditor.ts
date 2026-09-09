import { trackGalleryImage, scheduleImageCleanup } from "../lib/imageRetention";
import { v } from "convex/values";
import { mutation, query, type MutationCtx, type QueryCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";
import { requireAuthUser, requireMarketplaceContext } from "../lib/authHelpers";
import { claimStoredFile, IMAGE_CONTENT_TYPES, setStoredFilePublicUrl } from "../lib/storageValidation";
import { assertActiveOnlineProviderProfile, assertOnlineGig, assertOnlineMarketplaceCategory, assertOnlineWorkType } from "../lib/onlineMarketplace";

const packageInput = v.object({
  tier: v.union(v.literal("basic"), v.literal("standard"), v.literal("premium")),
  title: v.string(), description: v.string(), price: v.number(), deliveryDays: v.number(),
  revisionCount: v.optional(v.number()), features: v.optional(v.array(v.string())),
});
const fields = { title: v.string(), description: v.string(), packages: v.array(packageInput), imageUrls: v.array(v.string()) };

async function owner(ctx: QueryCtx | MutationCtx, gigId?: Id<"gigs">) {
  const user = await requireAuthUser(ctx);
  requireMarketplaceContext(user, "freelancer", "online", "managing services");
  const gig = gigId ? await ctx.db.get(gigId) : null;
  if (gigId) {
    const profile = gig ? await ctx.db.get(gig.freelancerId) : null;
    if (!gig || gig.status === "deleted" || !profile || profile.userId !== user._id || profile.providerRole === "local_professional") {
      throw new Error("Service not found or unavailable in this account.");
    }
    assertActiveOnlineProviderProfile(profile, { ownerId: user._id, accountTenantId: user.tenantId, resourceTenantId: gig.tenantId });
    assertOnlineGig(gig, profile, { expectedTenantId: user.tenantId });
  }
  return { user, gig };
}

type Package = { tier: "basic" | "standard" | "premium"; title: string; description: string; price: number; deliveryDays: number; revisionCount?: number; features?: string[] };
async function validate(ctx: MutationCtx, userId: Id<"users">, args: { title: string; description: string; packages: Package[]; imageUrls: string[] }, existingImages: string[] = []) {
  if (!args.title.trim() || args.title.length > 160 || !args.description.trim() || args.description.length > 10000) throw new Error("Add a title (up to 160 characters) and description (up to 10,000 characters).");
  if (args.packages.length < 1 || args.packages.length > 3 || !args.packages.some(p => p.tier === "basic") || new Set(args.packages.map(p => p.tier)).size !== args.packages.length) throw new Error("Provide one basic package and at most one standard and premium package.");
  for (const pkg of args.packages) {
    if (!pkg.title.trim() || pkg.title.length > 160 || pkg.description.length > 3000 || !Number.isFinite(pkg.price) || pkg.price <= 0 || pkg.price > 1000000 || !Number.isInteger(pkg.deliveryDays) || pkg.deliveryDays < 1 || pkg.deliveryDays > 365 || (pkg.revisionCount !== undefined && (!Number.isInteger(pkg.revisionCount) || pkg.revisionCount < 0 || pkg.revisionCount > 100)) || (pkg.features?.length ?? 0) > 30) throw new Error("Check your package names, prices, delivery days and revisions.");
  }
  if (args.imageUrls.length > 6 || new Set(args.imageUrls).size !== args.imageUrls.length) throw new Error("Choose up to six different gallery images.");
  for (const url of args.imageUrls) {
    if (existingImages.includes(url)) continue;
    const asset = await ctx.db.query("fileAssets").withIndex("by_publicUrl", q => q.eq("publicUrl", url)).unique();
    if (!asset || asset.ownerId !== userId || asset.purpose !== "gig_image") throw new Error("Gallery images must be uploaded through your account.");
  }
}

async function saveChildren(ctx: MutationCtx, gigId: Id<"gigs">, args: { packages: Package[]; imageUrls: string[] }, now: number) {
  const oldPackages = await ctx.db.query("gigPackages").withIndex("by_gig", q => q.eq("gigId", gigId)).take(10);
  if (oldPackages.some(p => !args.packages.some(next => next.tier === p.tier))) {
    throw new Error("Existing packages cannot be removed because orders may refer to them.");
  }
  for (const pkg of args.packages) {
    const existing = oldPackages.find(p => p.tier === pkg.tier);
    const value = { ...pkg, title: pkg.title.trim(), description: pkg.description.trim(), currency: "EUR", updatedAt: now };
    if (existing) await ctx.db.patch(existing._id, value);
    else await ctx.db.insert("gigPackages", { ...value, gigId, createdAt: now });
  }
  const images = await ctx.db.query("gigImages").withIndex("by_gig", q => q.eq("gigId", gigId)).take(20);
  for (const image of images) await ctx.db.delete(image._id);
  for (const [sortOrder, imageUrl] of args.imageUrls.entries()) await ctx.db.insert("gigImages", { gigId, imageUrl, sortOrder, createdAt: now });
  for (const url of new Set([...images.map(image => image.imageUrl), ...args.imageUrls])) await trackGalleryImage(ctx, url);
}

export const create = mutation({
  args: { ...fields, freelancerId: v.id("freelancerProfiles"), slug: v.string(), locale: v.string(), categoryId: v.optional(v.id("marketplaceCategories")), tags: v.optional(v.array(v.string())), workType: v.optional(v.string()), locationCity: v.optional(v.string()), locationCountry: v.optional(v.string()) },
  returns: v.id("gigs"),
  handler: async (ctx, args) => {
    const { user } = await owner(ctx);
    const profile = await ctx.db.get(args.freelancerId);
    if (!profile || profile.userId !== user._id || profile.providerRole === "local_professional" || profile.status !== "active") throw new Error("Complete your freelancer profile first.");
    assertActiveOnlineProviderProfile(profile, { ownerId: user._id, accountTenantId: user.tenantId });
    const workType = args.workType ?? "remote";
    assertOnlineWorkType(workType, "Service");
    await validate(ctx, user._id, args);
    if (!/^[a-z0-9-]{1,200}$/.test(args.slug)) throw new Error("Invalid service link.");
    const duplicate = await ctx.db.query("gigs").withIndex("by_slug_locale", q => q.eq("slug", args.slug).eq("locale", args.locale)).first();
    if (duplicate) throw new Error("This service link already exists. Try again.");
    await assertOnlineMarketplaceCategory(ctx, args.categoryId, user.tenantId, args.locale);
    const { packages, imageUrls, ...gigFields } = args;
    const now = Date.now();
    const gigId = await ctx.db.insert("gigs", { ...gigFields, workType, title: args.title.trim(), description: args.description.trim(), tenantId: user.tenantId, status: "active", createdAt: now, updatedAt: now, views: 0, orderCount: 0, ratingCount: 0, ratingAverage: 0, isFeatured: false });
    await saveChildren(ctx, gigId, { packages, imageUrls }, now);
    return gigId;
  },
});

export const get = query({
  args: { gigId: v.id("gigs") },
  returns: v.object({ title: v.string(), description: v.string(), packages: v.array(packageInput), imageUrls: v.array(v.string()) }),
  handler: async (ctx, args) => {
    const { gig } = await owner(ctx, args.gigId);
    const packages = await ctx.db.query("gigPackages").withIndex("by_gig", q => q.eq("gigId", args.gigId)).take(3);
    const images = await ctx.db.query("gigImages").withIndex("by_gig_sortOrder", q => q.eq("gigId", args.gigId)).take(20);
    return { title: gig!.title, description: gig!.description, packages: packages.map(p => ({ tier: p.tier as Package["tier"], title: p.title, description: p.description, price: p.price, deliveryDays: p.deliveryDays, revisionCount: p.revisionCount, features: p.features })), imageUrls: images.map(i => i.imageUrl) };
  },
});

export const update = mutation({
  args: { gigId: v.id("gigs"), ...fields }, returns: v.id("gigs"),
  handler: async (ctx, args) => {
    const { user } = await owner(ctx, args.gigId);
    const images = await ctx.db.query("gigImages").withIndex("by_gig", q => q.eq("gigId", args.gigId)).take(20);
    await validate(ctx, user._id, args, images.map(i => i.imageUrl));
    const now = Date.now();
    await ctx.db.patch(args.gigId, { title: args.title.trim(), description: args.description.trim(), updatedAt: now });
    await saveChildren(ctx, args.gigId, args, now);
    return args.gigId;
  },
});

export const generateImageUploadUrl = mutation({ args: {}, returns: v.string(), handler: async ctx => { await owner(ctx); return ctx.storage.generateUploadUrl(); } });
export const resolveImageUpload = mutation({
  args: { storageId: v.id("_storage") }, returns: v.string(),
  handler: async (ctx, args) => {
    const { user } = await owner(ctx);
    const { assetId } = await claimStoredFile(ctx, user._id, args.storageId, "gig_image", { maxBytes: 8 * 1024 * 1024, allowedContentTypes: IMAGE_CONTENT_TYPES, typeError: "Choose a JPG, PNG or WebP image." });
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) throw new Error("Could not resolve uploaded image.");
    await setStoredFilePublicUrl(ctx, assetId, url);
    await scheduleImageCleanup(ctx, assetId);
    return url;
  },
});
