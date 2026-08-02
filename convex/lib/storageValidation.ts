import type { MutationCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";

type StoredFileRules = {
  maxBytes: number;
  allowedContentTypes: ReadonlySet<string>;
  typeError: string;
};

/** Validate authoritative Convex storage metadata, never client-supplied size/type. */
export async function requireStoredFile(
  ctx: MutationCtx,
  storageId: Id<"_storage">,
  rules: StoredFileRules
) {
  const metadata = await ctx.db.system.get("_storage", storageId);
  if (!metadata) throw new Error("The uploaded file no longer exists.");
  if (metadata.size < 1 || metadata.size > rules.maxBytes) {
    throw new Error(`The uploaded file must be smaller than ${Math.floor(rules.maxBytes / 1024 / 1024)} MB.`);
  }
  if (!metadata.contentType || !rules.allowedContentTypes.has(metadata.contentType)) {
    throw new Error(rules.typeError);
  }
  return metadata;
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
