import type { MutationCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";
import type { UploadPurpose } from "./storageState";

type StoredFileRules = {
  maxBytes: number;
  allowedContentTypes: ReadonlySet<string>;
  typeError: string;
};

/** Validate authoritative Convex storage metadata, never client-supplied size/type. */
export async function requireStoredFile(
  ctx: MutationCtx,
  storageId: Id<"_storage">,
  rules: StoredFileRules,
) {
  const metadata = await ctx.db.system.get("_storage", storageId);
  if (!metadata) throw new Error("The uploaded file no longer exists.");
  if (metadata.size < 1 || metadata.size > rules.maxBytes) {
    throw new Error(
      `The uploaded file must be smaller than ${Math.floor(rules.maxBytes / 1024 / 1024)} MB.`,
    );
  }
  if (
    !metadata.contentType ||
    !rules.allowedContentTypes.has(metadata.contentType)
  ) {
    throw new Error(rules.typeError);
  }
  return metadata;
}

/**
 * Atomically records the authenticated owner and intended use of a stored file.
 * A storage object may be attached once, preventing leaked or replayed storage IDs
 * from being reused in another account or marketplace workflow.
 */
export async function claimStoredFile(
  ctx: MutationCtx,
  ownerId: Id<"users">,
  storageId: Id<"_storage">,
  purpose: UploadPurpose,
  rules: StoredFileRules,
) {
  const metadata = await requireStoredFile(ctx, storageId, rules);
  const existing = await ctx.db
    .query("fileAssets")
    .withIndex("by_storageId", (q) => q.eq("storageId", storageId))
    .unique();
  if (existing) {
    if (existing.ownerId !== ownerId)
      throw new Error("This uploaded file belongs to another account.");
    throw new Error("This uploaded file has already been attached.");
  }
  const now = Date.now();
  const assetId = await ctx.db.insert("fileAssets", {
    storageId,
    ownerId,
    purpose,
    contentType: metadata.contentType!,
    fileSize: metadata.size,
    createdAt: now,
    updatedAt: now,
  });
  return { metadata, assetId };
}

export async function setStoredFilePublicUrl(
  ctx: MutationCtx,
  assetId: Id<"fileAssets">,
  publicUrl: string,
) {
  await ctx.db.patch(assetId, { publicUrl, updatedAt: Date.now() });
}

export async function releaseStoredFile(
  ctx: MutationCtx,
  storageId: Id<"_storage">,
) {
  const asset = await ctx.db
    .query("fileAssets")
    .withIndex("by_storageId", (q) => q.eq("storageId", storageId))
    .unique();
  if (asset) await ctx.db.delete(asset._id);
  await ctx.storage.delete(storageId);
}

export const IMAGE_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export const DOCUMENT_CONTENT_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
