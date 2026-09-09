import type { MutationCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";
import { internal } from "../_generated/api";

export const IMAGE_RETENTION_MS = 7 * 24 * 60 * 60 * 1000;
export async function trackGalleryImage(ctx: MutationCtx, imageUrl: string): Promise<void> {
  const asset = await ctx.db.query("fileAssets").withIndex("by_publicUrl", q => q.eq("publicUrl", imageUrl)).unique();
  if (!asset || asset.purpose !== "gig_image") return;
  const reference = await ctx.db.query("gigImages").withIndex("by_imageUrl", q => q.eq("imageUrl", imageUrl)).first();
  if (reference) { await ctx.db.patch(asset._id, { cleanupAfter: undefined }); return; }
  await scheduleImageCleanup(ctx, asset._id);
}
export async function scheduleImageCleanup(ctx: MutationCtx, assetId: Id<"fileAssets">): Promise<void> {
  const cleanupAfter = Date.now() + IMAGE_RETENTION_MS;
  await ctx.db.patch(assetId, { cleanupAfter });
  await ctx.scheduler.runAt(cleanupAfter, internal.marketplace.imageCleanup.removeUnused, { assetId, cleanupAfter });
}
