import { v } from "convex/values";
import { mutation, query, MutationCtx, QueryCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { requireAuthUser } from "../lib/authHelpers";
import { claimStoredFile, releaseStoredFile } from "../lib/storageValidation";

const DELIVERABLE_CONTENT_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "application/x-zip-compressed",
  "image/jpeg",
  "image/png",
  "image/webp",
  "text/plain",
  "application/json",
]);

async function requireOrderParty(
  ctx: QueryCtx | MutationCtx,
  orderId: Id<"orders">,
) {
  const user = await requireAuthUser(ctx);
  const order = await ctx.db.get(orderId);
  if (!order) throw new Error("Order not found.");
  const freelancer = order.freelancerId
    ? await ctx.db.get(order.freelancerId)
    : null;
  const isClient = order.clientId === user._id;
  const isFreelancer = freelancer?.userId === user._id;
  if (!isClient && !isFreelancer && user.role !== "admin")
    throw new Error("Unauthorized.");
  return { user, order, isClient, isFreelancer };
}

export const list = query({
  args: { orderId: v.id("orders") },
  returns: v.array(
    v.object({
      id: v.id("orderDeliverables"),
      uploadedBy: v.union(v.id("users"), v.null()),
      uploaderName: v.string(),
      fileName: v.union(v.string(), v.null()),
      fileSize: v.union(v.number(), v.null()),
      fileType: v.union(v.string(), v.null()),
      downloadUrl: v.union(v.string(), v.null()),
      description: v.union(v.string(), v.null()),
      createdAt: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    await requireOrderParty(ctx, args.orderId);
    const items = await ctx.db
      .query("orderDeliverables")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .order("desc")
      .take(100);
    return await Promise.all(
      items.map(async (item) => {
        const uploader = item.uploadedBy
          ? await ctx.db.get(item.uploadedBy)
          : null;
        return {
          id: item._id,
          uploadedBy: item.uploadedBy ?? null,
          uploaderName: uploader?.name ?? "Skilllinkup user",
          fileName: item.fileName ?? null,
          fileSize: item.fileSize ?? null,
          fileType: item.fileType ?? null,
          downloadUrl: item.storageId
            ? await ctx.storage.getUrl(item.storageId)
            : (item.fileUrl ?? null),
          description: item.description ?? null,
          createdAt: item.createdAt,
        };
      }),
    );
  },
});

export const generateUploadUrl = mutation({
  args: { orderId: v.id("orders") },
  returns: v.string(),
  handler: async (ctx, args) => {
    await requireOrderParty(ctx, args.orderId);
    return await ctx.storage.generateUploadUrl();
  },
});

export const add = mutation({
  args: {
    orderId: v.id("orders"),
    storageId: v.optional(v.id("_storage")),
    fileName: v.optional(v.string()),
    fileSize: v.optional(v.number()),
    fileType: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  returns: v.id("orderDeliverables"),
  handler: async (ctx, args) => {
    const { user, order } = await requireOrderParty(ctx, args.orderId);
    if (["completed", "cancelled"].includes(order.status))
      throw new Error("This workspace is closed.");
    const description = args.description?.trim();
    if (!args.storageId && !description)
      throw new Error("Add a file or a delivery note.");
    if (args.storageId && !args.fileName?.trim())
      throw new Error("A file name is required.");
    const claimed = args.storageId
      ? await claimStoredFile(ctx, user._id, args.storageId, "deliverable", {
          maxBytes: 25 * 1024 * 1024,
          allowedContentTypes: DELIVERABLE_CONTENT_TYPES,
          typeError:
            "Use PDF, DOC, DOCX, ZIP, JPG, PNG, WebP, TXT or JSON files.",
        })
      : null;
    if (description && description.length > 3000)
      throw new Error("Notes cannot exceed 3,000 characters.");
    return await ctx.db.insert("orderDeliverables", {
      orderId: order._id,
      uploadedBy: user._id,
      storageId: args.storageId,
      fileName: args.fileName?.trim(),
      fileSize: claimed?.metadata.size,
      fileType: claimed?.metadata.contentType,
      description,
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { deliverableId: v.id("orderDeliverables") },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.deliverableId);
    if (!item) return { success: true };
    const { user, order } = await requireOrderParty(ctx, item.orderId);
    if (item.uploadedBy !== user._id && user.role !== "admin")
      throw new Error("Only the uploader can remove this item.");
    if (["delivered", "completed"].includes(order.status))
      throw new Error("Submitted delivery files cannot be removed.");
    if (item.storageId) await releaseStoredFile(ctx, item.storageId);
    await ctx.db.delete(item._id);
    return { success: true };
  },
});
