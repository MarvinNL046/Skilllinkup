import { v, ConvexError } from "convex/values";
import { query, mutation } from "../_generated/server";
import { internal } from "../_generated/api";
import { Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";
import { notifyUser } from "../lib/notifications";
import { rateLimiter } from "../lib/rateLimits";
import { paginationOptsValidator } from "convex/server";
import { getMessagePolicyError } from "../../src/lib/messagePolicy.mjs";

const enrichedMessageValidator = v.object({
  _id: v.id("messages"),
  _creationTime: v.number(),
  conversationId: v.id("conversations"),
  senderId: v.optional(v.id("users")),
  content: v.optional(v.string()),
  messageType: v.optional(v.string()),
  fileUrl: v.optional(v.string()),
  fileName: v.optional(v.string()),
  fileSize: v.optional(v.number()),
  isRead: v.optional(v.boolean()),
  createdAt: v.number(),
  sender: v.union(
    v.object({
      _id: v.id("users"),
      name: v.string(),
      image: v.optional(v.string()),
    }),
    v.null(),
  ),
});

async function requireConversationParticipant(
  ctx: QueryCtx | MutationCtx,
  conversationId: Id<"conversations">,
) {
  const user = await requireAuthUser(ctx);
  const conversation = await ctx.db.get(conversationId);
  if (!conversation) {
    throw new Error("Conversation not found.");
  }

  const isParticipant =
    conversation.participant1 === user._id ||
    conversation.participant2 === user._id;
  if (!isParticipant) {
    throw new Error("Unauthorized.");
  }

  return { user, conversation };
}

/**
 * Get messages for a conversation, sorted newest last (ascending by createdAt).
 * Enriches each message with the sender's user doc (name, image).
 * Args: conversationId, optional limit (default 50).
 */
export const getByConversation = query({
  args: {
    conversationId: v.id("conversations"),
    limit: v.optional(v.number()),
  },
  returns: v.array(enrichedMessageValidator),
  handler: async (ctx, args) => {
    const { conversation } = await requireConversationParticipant(ctx, args.conversationId);
    const limit = Math.max(1, Math.min(args.limit ?? 50, 100));

    // Query in descending order and take only the last N messages.
    // This avoids loading the entire conversation history into memory.
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversationId", args.conversationId),
      )
      .order("desc")
      .take(limit);

    // Restore chronological order (oldest → newest) for the frontend.
    messages.reverse();

    // Batch-load all unique senders in a single round of Promise.all
    // instead of one ctx.db.get per message (N+1 → 1 batch).
    const senderIds = [
      ...new Set(
        messages.map((m) => m.senderId).filter(Boolean) as Id<"users">[],
      ),
    ];
    const senderDocs = await Promise.all(senderIds.map((id) => ctx.db.get(id)));
    const senderMap = new Map(
      senderDocs
        .filter((s): s is NonNullable<typeof s> => s !== null)
        .map((s) => [s._id, s]),
    );

    const enriched = messages.map((msg) => ({
      ...msg,
      isRead: Boolean(msg.isRead || msg._creationTime <=
        (msg.senderId === conversation.participant1 ? conversation.readThrough2 ?? 0 : conversation.readThrough1 ?? 0)),
      sender: msg.senderId
        ? (() => {
            const s = senderMap.get(msg.senderId as Id<"users">);
            return s
              ? { _id: s._id, name: s.name, image: s.image ?? s.avatar }
              : null;
          })()
        : null,
    }));

    return enriched;
  },
});

/**
 * Send a message to a conversation.
 * Authentication required.
 * Also updates the conversation's lastMessageAt, lastMessagePreview,
 * and increments the other participant's unreadCount.
 */
export const send = mutation({
  args: {
    conversationId: v.id("conversations"),
    content: v.optional(v.string()),
    messageType: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    fileName: v.optional(v.string()),
    fileSize: v.optional(v.number()),
  },
  returns: v.id("messages"),
  handler: async (ctx, args) => {
    const { user: currentUser, conversation } =
      await requireConversationParticipant(ctx, args.conversationId);

    const now = Date.now();
    const messageType = args.messageType ?? "text";
    const content = args.content?.trim();
    if (messageType !== "text") throw new Error("Unsupported message type.");
    if (args.fileUrl || args.fileName || args.fileSize !== undefined) {
      throw new Error(
        "Chat file attachments are unavailable until they use protected Skilllinkup storage.",
      );
    }
    const policyError = getMessagePolicyError(content);
    if (policyError) throw new ConvexError(policyError);
    if (!content) throw new ConvexError("Write a message.");

    await rateLimiter.limit(ctx, "sendMessage", {
      key: currentUser._id,
      throws: true,
    });

    // Insert the message
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      senderId: currentUser._id,
      content,
      messageType,
      isRead: false,
      createdAt: now,
    });

    // Build the preview text for the conversation
    const preview = content;

    // Determine which participant is the OTHER one and increment their unreadCount
    const isParticipant1 = conversation.participant1 === currentUser._id;

    const conversationPatch: Record<string, unknown> = {
      lastMessageAt: now,
      lastMessagePreview: preview.slice(0, 100),
      updatedAt: now,
    };

    if (isParticipant1) {
      // Sender is participant1, increment participant2's unread count
      conversationPatch.unreadCount2 = (conversation.unreadCount2 ?? 0) + 1;
    } else {
      // Sender is participant2, increment participant1's unread count
      conversationPatch.unreadCount1 = (conversation.unreadCount1 ?? 0) + 1;
    }

    await ctx.db.patch(args.conversationId, conversationPatch);

    const recipientId = isParticipant1
      ? conversation.participant2
      : conversation.participant1;
    await notifyUser(ctx, {
      userId: recipientId,
      type: "message_received",
      title: `New message from ${currentUser.name}`,
      body: preview.slice(0, 140),
      link: `/message?conversation=${conversation._id}`,
      metadata: {
        conversationId: conversation._id,
        contextType: conversation.contextType ?? null,
      },
    });

    const recipient = await ctx.db.get(recipientId);
    if (recipient?.email) {
      await ctx.scheduler.runAfter(0, internal.lib.email.sendNewMessage, {
        recipientEmail: recipient.email,
        recipientName: recipient.name || "User",
        senderName: currentUser.name || "User",
        messagePreview: content.slice(0, 200),
        conversationId: args.conversationId,
        messageId,
      });
    }

    return messageId;
  },
});

/**
 * Mark all messages in a conversation as read for the current user.
 * Authentication required.
 * Sets isRead=true on all unread messages from the other participant.
 * Resets the current user's unreadCount on the conversation to 0.
 */
export const markRead = mutation({
  args: {
    conversationId: v.id("conversations"),
  },
  returns: v.object({ markedCount: v.number() }),
  handler: async (ctx, args) => {
    const { user: currentUser, conversation } =
      await requireConversationParticipant(ctx, args.conversationId);

    // A read watermark covers the entire history without a capped batch of
    // writes. Convex serializes this read with concurrent message mutations.
    const latest = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversationId", args.conversationId),
      )
      .order("desc")
      .first();
    const isParticipant1 = conversation.participant1 === currentUser._id;
    const markedCount = isParticipant1 ? conversation.unreadCount1 ?? 0 : conversation.unreadCount2 ?? 0;
    if (!markedCount && !latest) return { markedCount: 0 };
    await ctx.db.patch(args.conversationId, {
      ...(isParticipant1
        ? { unreadCount1: 0, readThrough1: latest?._creationTime ?? 0 }
        : { unreadCount2: 0, readThrough2: latest?._creationTime ?? 0 }),
      updatedAt: Date.now(),
    });
    return { markedCount };
  },
});

export const list = query({
  args: { conversationId: v.id("conversations"), paginationOpts: paginationOptsValidator },
  returns: v.object({
    page: v.array(enrichedMessageValidator),
    isDone: v.boolean(),
    continueCursor: v.string(),
    splitCursor: v.optional(v.union(v.string(), v.null())),
    pageStatus: v.optional(v.union(v.literal("SplitRecommended"), v.literal("SplitRequired"), v.null())),
  }),
  handler: async (ctx, args) => {
    const { conversation } = await requireConversationParticipant(ctx, args.conversationId);
    const result = await ctx.db.query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .order("desc").paginate({ ...args.paginationOpts, numItems: Math.min(args.paginationOpts.numItems, 100) });
    const ids = [...new Set(result.page.flatMap((message) => message.senderId ? [message.senderId] : []))];
    const senders = new Map((await Promise.all(ids.map((id) => ctx.db.get(id))))
      .filter((sender) => sender !== null).map((sender) => [sender._id, sender]));
    return {
      ...result,
      page: result.page.map((message) => {
        const sender = message.senderId ? senders.get(message.senderId) : null;
        const readThrough = message.senderId === conversation.participant1
          ? conversation.readThrough2 : conversation.readThrough1;
        return {
          ...message,
          isRead: Boolean(message.isRead || message._creationTime <= (readThrough ?? 0)),
          sender: sender ? { _id: sender._id, name: sender.name, image: sender.image ?? sender.avatar } : null,
        };
      }),
    };
  },
});
