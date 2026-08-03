import { v } from "convex/values";
import { query, internalMutation, mutation } from "../_generated/server";
import { requireAuthUser, requireOwner } from "../lib/authHelpers";

const notificationListItemValidator = v.object({
  _id: v.id("notifications"),
  _creationTime: v.number(),
  userId: v.id("users"),
  type: v.string(),
  title: v.string(),
  body: v.optional(v.string()),
  link: v.optional(v.string()),
  isRead: v.boolean(),
  createdAt: v.number(),
});

/**
 * Get notifications for a user, sorted by most recent first.
 */
export const list = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  returns: v.array(notificationListItemValidator),
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.userId);

    const limit = Math.max(1, Math.min(args.limit ?? 20, 50));

    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(limit);

    return notifications.map(({ metadata: _metadata, ...notification }) => notification);
  },
});

/**
 * Count unread notifications for a user.
 */
export const getUnreadCount = query({
  args: {
    userId: v.id("users"),
  },
  returns: v.number(),
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.userId);

    const unread = await ctx.db
      .query("notifications")
      .withIndex("by_user_read", (q) =>
        q.eq("userId", args.userId).eq("isRead", false)
      )
      .take(100);

    return unread.length;
  },
});

/**
 * Create a new notification for a user.
 * Internal only — clients cannot call this directly.
 */
export const create = internalMutation({
  args: {
    userId: v.id("users"),
    type: v.string(),
    title: v.string(),
    body: v.optional(v.string()),
    link: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  returns: v.id("notifications"),
  handler: async (ctx, args) => {
    const notificationId = await ctx.db.insert("notifications", {
      userId: args.userId,
      type: args.type,
      title: args.title,
      body: args.body,
      link: args.link,
      metadata: args.metadata,
      isRead: false,
      createdAt: Date.now(),
    });

    return notificationId;
  },
});

/**
 * Mark a single notification as read.
 */
export const markRead = mutation({
  args: {
    notificationId: v.id("notifications"),
  },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const notification = await ctx.db.get(args.notificationId);
    if (!notification) throw new Error("Notification not found.");
    if (notification.userId !== user._id) throw new Error("Unauthorized.");

    await ctx.db.patch(args.notificationId, { isRead: true });

    return { success: true };
  },
});

/**
 * Mark all unread notifications as read for a given user.
 */
export const markAllRead = mutation({
  args: {
    userId: v.id("users"),
  },
  returns: v.object({ success: v.boolean(), markedCount: v.number() }),
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.userId);

    const unread = await ctx.db
      .query("notifications")
      .withIndex("by_user_read", (q) =>
        q.eq("userId", args.userId).eq("isRead", false)
      )
      .take(500);

    await Promise.all(
      unread.map((notification) =>
        ctx.db.patch(notification._id, { isRead: true })
      )
    );

    return { success: true, markedCount: unread.length };
  },
});
