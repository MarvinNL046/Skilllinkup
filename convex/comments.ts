import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Get approved comments for a post, ordered by createdAt descending.
 */
export const getByPost = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .collect();

    return comments
      .filter((c) => c.status === "approved")
      .sort((a, b) => b.createdAt - a.createdAt);
  },
});

/**
 * Create a new comment with status "pending".
 * Derives tenantId from the parent post document.
 */
export const create = mutation({
  args: {
    postId: v.id("posts"),
    authorName: v.string(),
    authorEmail: v.string(),
    authorWebsite: v.optional(v.string()),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Post not found");
    }

    const commentId = await ctx.db.insert("comments", {
      tenantId: post.tenantId,
      postId: args.postId,
      authorName: args.authorName,
      authorEmail: args.authorEmail,
      authorWebsite: args.authorWebsite,
      content: args.content,
      status: "pending",
      createdAt: Date.now(),
    });

    return commentId;
  },
});

/**
 * Approve a comment by setting its status to "approved".
 */
export const approve = mutation({
  args: {
    commentId: v.id("comments"),
  },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }

    await ctx.db.patch(args.commentId, {
      status: "approved",
    });
  },
});

/**
 * Count all pending comments across all posts.
 */
export const getPendingCount = query({
  args: {},
  handler: async (ctx) => {
    const pending = await ctx.db
      .query("comments")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect();

    return pending.length;
  },
});
