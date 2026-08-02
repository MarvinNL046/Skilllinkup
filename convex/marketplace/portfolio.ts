import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import type { MutationCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";
import { requireAuthUser } from "../lib/authHelpers";
import {
  claimStoredFile,
  IMAGE_CONTENT_TYPES,
  setStoredFilePublicUrl,
} from "../lib/storageValidation";

const portfolioProjectValidator = v.object({
  _id: v.id("portfolioProjects"),
  _creationTime: v.number(),
  userId: v.id("users"),
  tenantId: v.id("tenants"),
  title: v.string(),
  description: v.optional(v.string()),
  imageUrls: v.optional(v.array(v.string())),
  tags: v.optional(v.array(v.string())),
  externalUrl: v.optional(v.string()),
  sortOrder: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),
});

function validateFields(fields: {
  title?: string;
  description?: string;
  imageUrls?: string[];
  tags?: string[];
  externalUrl?: string;
}) {
  if (
    fields.title !== undefined &&
    (fields.title.trim().length < 3 || fields.title.length > 160)
  ) {
    throw new Error("Portfolio title must be between 3 and 160 characters.");
  }
  if (fields.description !== undefined && fields.description.length > 3000) {
    throw new Error("Portfolio description is too long.");
  }
  if ((fields.imageUrls?.length ?? 0) > 20 || (fields.tags?.length ?? 0) > 20) {
    throw new Error("Portfolio projects support up to 20 images and 20 tags.");
  }
  for (const imageUrl of fields.imageUrls ?? []) {
    const isLocalAsset =
      /^\/images\/[a-zA-Z0-9/_-]+\.(?:jpe?g|png|webp)$/i.test(imageUrl);
    const isConvexStorageUrl =
      /^https:\/\/[^/]+\.convex\.(?:cloud|site)\/api\/storage\//i.test(
        imageUrl,
      );
    if (!isLocalAsset && !isConvexStorageUrl) {
      throw new Error("Portfolio images must be uploaded through Skilllinkup.");
    }
  }
  if (fields.externalUrl && fields.externalUrl.length > 500) {
    throw new Error("Portfolio URL is too long.");
  }
}

async function requireOwnedPortfolioImages(
  ctx: MutationCtx,
  userId: Id<"users">,
  imageUrls?: string[],
) {
  for (const imageUrl of imageUrls ?? []) {
    if (imageUrl.startsWith("/images/")) continue;
    const asset = await ctx.db
      .query("fileAssets")
      .withIndex("by_publicUrl", (q) => q.eq("publicUrl", imageUrl))
      .unique();
    if (
      !asset ||
      asset.ownerId !== userId ||
      asset.purpose !== "portfolio_image"
    ) {
      throw new Error(
        "Portfolio images must belong to your Skilllinkup account.",
      );
    }
  }
}

export const getByUser = query({
  args: { userId: v.id("users") },
  returns: v.array(portfolioProjectValidator),
  handler: async (ctx, args) =>
    ctx.db
      .query("portfolioProjects")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("asc")
      .take(100),
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    imageUrls: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    externalUrl: v.optional(v.string()),
  },
  returns: v.id("portfolioProjects"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    validateFields(args);
    await requireOwnedPortfolioImages(ctx, user._id, args.imageUrls);
    const now = Date.now();
    return ctx.db.insert("portfolioProjects", {
      userId: user._id,
      tenantId: user.tenantId,
      title: args.title.trim(),
      description: args.description?.trim(),
      imageUrls: args.imageUrls,
      tags: args.tags?.map((tag) => tag.trim()).filter(Boolean),
      externalUrl: args.externalUrl?.trim(),
      sortOrder: now,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    projectId: v.id("portfolioProjects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    imageUrls: v.optional(v.array(v.string())),
    tags: v.optional(v.array(v.string())),
    externalUrl: v.optional(v.string()),
  },
  returns: v.id("portfolioProjects"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const { projectId, ...fields } = args;
    validateFields(fields);
    const project = await ctx.db.get(projectId);
    if (!project) throw new Error("Project not found.");
    if (project.userId !== user._id) throw new Error("Unauthorized.");
    await requireOwnedPortfolioImages(
      ctx,
      user._id,
      fields.imageUrls?.filter(
        (imageUrl) => !project.imageUrls?.includes(imageUrl),
      ),
    );
    const patch: Record<string, string | string[] | number | undefined> = {
      updatedAt: Date.now(),
    };
    if (fields.title !== undefined) patch.title = fields.title.trim();
    if (fields.description !== undefined)
      patch.description = fields.description.trim();
    if (fields.imageUrls !== undefined) patch.imageUrls = fields.imageUrls;
    if (fields.tags !== undefined)
      patch.tags = fields.tags.map((tag) => tag.trim()).filter(Boolean);
    if (fields.externalUrl !== undefined)
      patch.externalUrl = fields.externalUrl.trim();
    await ctx.db.patch(projectId, patch);
    return projectId;
  },
});

export const remove = mutation({
  args: { projectId: v.id("portfolioProjects") },
  returns: v.id("portfolioProjects"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found.");
    if (project.userId !== user._id) throw new Error("Unauthorized.");
    await ctx.db.delete(args.projectId);
    return args.projectId;
  },
});

export const generateImageUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    await requireAuthUser(ctx);
    return ctx.storage.generateUploadUrl();
  },
});

export const resolveImageUpload = mutation({
  args: { storageId: v.id("_storage") },
  returns: v.string(),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const { assetId } = await claimStoredFile(
      ctx,
      user._id,
      args.storageId,
      "portfolio_image",
      {
        maxBytes: 8 * 1024 * 1024,
        allowedContentTypes: IMAGE_CONTENT_TYPES,
        typeError: "Upload a JPG, PNG or WebP portfolio image.",
      },
    );
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) throw new Error("The portfolio image could not be resolved.");
    await setStoredFilePublicUrl(ctx, assetId, url);
    return url;
  },
});
