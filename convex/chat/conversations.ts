import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

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
    // Fetch conversations where user is participant1
    const asParticipant1 = await ctx.db
      .query("conversations")
      .withIndex("by_participant1", (q) => q.eq("participant1", args.userId))
      .collect();

    // Fetch conversations where user is participant2
    const asParticipant2 = await ctx.db
      .query("conversations")
      .withIndex("by_participant2", (q) => q.eq("participant2", args.userId))
      .collect();

    // Merge and deduplicate
    const all = [...asParticipant1, ...asParticipant2];

    // Sort by lastMessageAt DESC (conversations without messages go last)
    const sorted = all
      .slice()
      .sort((a, b) => (b.lastMessageAt ?? 0) - (a.lastMessageAt ?? 0));

    // Enrich each conversation with the other participant's user doc
    const enriched = await Promise.all(
      sorted.map(async (conversation) => {
        const otherParticipantId =
          conversation.participant1 === args.userId
            ? conversation.participant2
            : conversation.participant1;

        const otherUser = await ctx.db.get(otherParticipantId);

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
      })
    );

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
    // Check if a conversation already exists between these two users (in either order)
    const existingAsP1 = await ctx.db
      .query("conversations")
      .withIndex("by_participant1", (q) =>
        q.eq("participant1", args.participant1)
      )
      .collect();

    const existing = existingAsP1.find(
      (c) => c.participant2 === args.participant2
    );

    if (existing) {
      return existing._id;
    }

    // Also check the reverse direction
    const existingAsP1Reverse = await ctx.db
      .query("conversations")
      .withIndex("by_participant1", (q) =>
        q.eq("participant1", args.participant2)
      )
      .collect();

    const existingReverse = existingAsP1Reverse.find(
      (c) => c.participant2 === args.participant1
    );

    if (existingReverse) {
      return existingReverse._id;
    }

    // Get tenantId from first tenant
    const tenant = await ctx.db.query("tenants").first();
    if (!tenant) {
      throw new Error("No tenant found — run data migration first");
    }

    const now = Date.now();

    const conversationId = await ctx.db.insert("conversations", {
      tenantId: tenant._id,
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
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) return null;

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
