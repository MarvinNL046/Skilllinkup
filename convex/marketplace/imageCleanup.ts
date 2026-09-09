import { v } from "convex/values";
import { internalMutation } from "../_generated/server";

/** Only explicitly scheduled service-gallery uploads are eligible. Legacy files are preserved. */
export const removeUnused = internalMutation({
  args: { assetId: v.id("fileAssets"), cleanupAfter: v.number() },
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const asset = await ctx.db.get(args.assetId);
    if (!asset || asset.purpose !== "gig_image" || asset.cleanupAfter !== args.cleanupAfter || args.cleanupAfter > Date.now() || !asset.publicUrl) return false;
    const reference = await ctx.db.query("gigImages").withIndex("by_imageUrl", q => q.eq("imageUrl", asset.publicUrl!)).first();
    if (reference) return false;
    // Preserve a URL reused in another supported owner-facing profile or portfolio field.
    const profiles = await ctx.db.query("freelancerProfiles").withIndex("by_userId", q => q.eq("userId", asset.ownerId)).take(10);
    const portfolio = await ctx.db.query("portfolioProjects").withIndex("by_user", q => q.eq("userId", asset.ownerId)).take(100);
    const owner = await ctx.db.get(asset.ownerId);
    if (profiles.length === 10 || portfolio.length === 100 || [...profiles, ...portfolio, owner].some(row => row && JSON.stringify(row).includes(asset.publicUrl!))) return false;
    await ctx.storage.delete(asset.storageId);
    await ctx.db.delete(asset._id);
    return true;
  },
});
