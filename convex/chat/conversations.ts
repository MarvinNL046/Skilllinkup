import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { requireAuthUser, requireOwner } from "../lib/authHelpers";

/**
 * List all conversations for a user.
 * The user can be participant1 or participant2.
 * Sorted by lastMessageAt DESC.
 * Enriches each conversation with the OTHER participant's user doc.
 */
export const list = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.userId);

    // Fetch conversations where user is participant1.
    // .take(100) prevents unbounded reads for power users.
    const asParticipant1 = await ctx.db
      .query("conversations")
      .withIndex("by_participant1", (q) => q.eq("participant1", args.userId))
      .take(100);

    // Fetch conversations where user is participant2.
    // .take(100) prevents unbounded reads for power users.
    const asParticipant2 = await ctx.db
      .query("conversations")
      .withIndex("by_participant2", (q) => q.eq("participant2", args.userId))
      .take(100);

    // Merge and deduplicate
    const all = [...asParticipant1, ...asParticipant2];

    // Sort by lastMessageAt DESC (conversations without messages go last)
    const sorted = all
      .slice()
      .sort((a, b) => (b.lastMessageAt ?? 0) - (a.lastMessageAt ?? 0));

    // Collect all unique other-participant IDs, then batch-fetch them in one
    // round of Promise.all instead of one ctx.db.get per conversation (N+1 → 1 batch).
    const otherParticipantIds = [
      ...new Set(
        sorted.map((c) =>
          c.participant1 === args.userId ? c.participant2 : c.participant1
        )
      ),
    ];
    const otherUserDocs = await Promise.all(
      otherParticipantIds.map((id) => ctx.db.get(id))
    );
    const otherUserMap = new Map(
      otherUserDocs
        .filter((u): u is NonNullable<typeof u> => u !== null)
        .map((u) => [u._id, u])
    );

    // Enrich each conversation with the other participant's user doc
    const enriched = sorted.map((conversation) => {
      const otherParticipantId =
        conversation.participant1 === args.userId
          ? conversation.participant2
          : conversation.participant1;

      const otherUser = otherUserMap.get(otherParticipantId) ?? null;

      // Determine which unreadCount belongs to the current user
      const unreadCount =
        conversation.participant1 === args.userId
          ? (conversation.unreadCount1 ?? 0)
          : (conversation.unreadCount2 ?? 0);

      return {
        ...conversation,
        otherParticipant: otherUser
          ? {
              _id: otherUser._id,
              name: otherUser.name,
              image: otherUser.image ?? otherUser.avatar,
            }
          : null,
        unreadCount,
      };
    });

    return enriched;
  },
});

/**
 * Create a new conversation between two users.
 * Returns an existing conversation if one already exists between them.
 * Args: participant1, participant2, optional orderId, optional projectId.
 */
export const create = mutation({
  args: {
    participant1: v.id("users"),
    participant2: v.id("users"),
    orderId: v.optional(v.id("orders")),
    projectId: v.optional(v.id("projects")),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);

    if (
      args.participant1 !== user._id &&
      args.participant2 !== user._id
    ) {
      throw new Error("Unauthorized.");
    }
    if (args.participant1 === args.participant2) {
      throw new Error("Cannot create a conversation with yourself.");
    }
    if (args.orderId) {
      const order = await ctx.db.get(args.orderId);
      if (!order) throw new Error("Order not found.");
      const professional = order.freelancerId ? await ctx.db.get(order.freelancerId) : null;
      const allowed = new Set([order.clientId, professional?.userId].filter(Boolean));
      if (!allowed.has(args.participant1) || !allowed.has(args.participant2)) {
        throw new Error("Order conversations are limited to the order parties.");
      }
    }
    if (args.projectId && !args.orderId) {
      const project = await ctx.db.get(args.projectId);
      if (!project) throw new Error("Project not found.");
      if (project.clientId !== user._id) {
        throw new Error("Only the project owner can start a project conversation.");
      }
    }

    // Check if a conversation already exists between these two users (either order)
    const existing = await ctx.db
      .query("conversations")
      .withIndex("by_participants", (q) =>
        q.eq("participant1", args.participant1).eq("participant2", args.participant2)
      )
      .first();

    if (existing) return existing._id;

    const existingReverse = await ctx.db
      .query("conversations")
      .withIndex("by_participants", (q) =>
        q.eq("participant1", args.participant2).eq("participant2", args.participant1)
      )
      .first();

    if (existingReverse) return existingReverse._id;

    const now = Date.now();

    const conversationId = await ctx.db.insert("conversations", {
      tenantId: user.tenantId,
      participant1: args.participant1,
      participant2: args.participant2,
      orderId: args.orderId,
      projectId: args.projectId,
      unreadCount1: 0,
      unreadCount2: 0,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });

    return conversationId;
  },
});

/**
 * Get a single conversation by ID.
 * Enriches with both participants' user docs (name, image).
 */
export const getById = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) return null;

    const isParticipant =
      conversation.participant1 === user._id ||
      conversation.participant2 === user._id;
    if (!isParticipant) {
      throw new Error("Unauthorized.");
    }

    const participant1User = await ctx.db.get(conversation.participant1);
    const participant2User = await ctx.db.get(conversation.participant2);

    return {
      ...conversation,
      participant1User: participant1User
        ? {
            _id: participant1User._id,
            name: participant1User.name,
            image: participant1User.image ?? participant1User.avatar,
          }
        : null,
      participant2User: participant2User
        ? {
            _id: participant2User._id,
            name: participant2User.name,
            image: participant2User.image ?? participant2User.avatar,
          }
        : null,
    };
  },
});

/** Resolve the private workspace conversation attached to an order. */
export const getByOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .unique();
    if (!conversation) return null;
    if (conversation.participant1 !== user._id && conversation.participant2 !== user._id) {
      throw new Error("Unauthorized.");
    }
    const otherId = conversation.participant1 === user._id
      ? conversation.participant2
      : conversation.participant1;
    const other = await ctx.db.get(otherId);
    return {
      ...conversation,
      otherParticipant: other ? {
        _id: other._id,
        name: other.name,
        image: other.image ?? other.avatar ?? null,
      } : null,
    };
  },
});
