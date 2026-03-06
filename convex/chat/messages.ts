import { v, ConvexError } from "convex/values";
import { query, mutation } from "../_generated/server";
import { internal } from "../_generated/api";
import { Id } from "../_generated/dataModel";
import { MutationCtx, QueryCtx } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";

const CONTACT_PATTERNS = [
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  /(\+?\d[\d\s\-().]{6,}\d)/,
  /(https?:\/\/|www\.)/i,
  /(wa\.me|t\.me|telegram|whatsapp|instagram\.com|linkedin\.com)/i,
];

function containsContactInfo(text: string): boolean {
  return CONTACT_PATTERNS.some((p) => p.test(text));
}

async function requireConversationParticipant(
  ctx: QueryCtx | MutationCtx,
  conversationId: Id<"conversations">
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
  handler: async (ctx, args) => {
    await requireConversationParticipant(ctx, args.conversationId);
    const limit = args.limit ?? 50;

    // Use the by_conversation index which covers [conversationId, createdAt]
    const allMessages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .order("asc") // newest last = ascending createdAt
      .collect();

    // Cap to the most recent `limit` messages
    const messages =
      allMessages.length > limit
        ? allMessages.slice(allMessages.length - limit)
        : allMessages;

    // Enrich with sender user doc
    const enriched = await Promise.all(
      messages.map(async (message) => {
        const sender = message.senderId ? await ctx.db.get(message.senderId) : null;

        return {
          ...message,
          sender: sender
            ? {
                _id: sender._id,
                name: sender.name,
                image: sender.image ?? sender.avatar,
              }
            : null,
        };
      })
    );

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
  handler: async (ctx, args) => {
    const { user: currentUser, conversation } =
      await requireConversationParticipant(ctx, args.conversationId);

    const now = Date.now();
    const messageType = args.messageType ?? "text";

    // Block messages containing contact info (anti-bypass)
    if (args.content && containsContactInfo(args.content)) {
      throw new ConvexError("Contactgegevens mogen niet gedeeld worden via de chat. Gebruik het platform voor verdere afspraken.");
    }

    // Insert the message
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      senderId: currentUser._id,
      content: args.content,
      messageType,
      fileUrl: args.fileUrl,
      fileName: args.fileName,
      fileSize: args.fileSize,
      isRead: false,
      createdAt: now,
    });

    // Build the preview text for the conversation
    let preview = args.content ?? "";
    if (!preview && args.fileName) {
      preview = `[File] ${args.fileName}`;
    }

    // Determine which participant is the OTHER one and increment their unreadCount
    const isParticipant1 = conversation.participant1 === currentUser._id;

    const conversationPatch: Record<string, unknown> = {
      lastMessageAt: now,
      lastMessagePreview: preview.slice(0, 100),
      updatedAt: now,
    };

    if (isParticipant1) {
      // Sender is participant1, increment participant2's unread count
      conversationPatch.unreadCount2 =
        (conversation.unreadCount2 ?? 0) + 1;
    } else {
      // Sender is participant2, increment participant1's unread count
      conversationPatch.unreadCount1 =
        (conversation.unreadCount1 ?? 0) + 1;
    }

    await ctx.db.patch(args.conversationId, conversationPatch);

    // Send new message email notification (only for non-system messages)
    if (messageType !== "system" && messageType !== "order_update") {
      const recipientId = isParticipant1
        ? conversation.participant2
        : conversation.participant1;
      const recipient = await ctx.db.get(recipientId);

      if (recipient?.email) {
        await ctx.scheduler.runAfter(0, internal.lib.email.sendNewMessage, {
          recipientEmail: recipient.email,
          recipientName: recipient.name || "User",
          senderName: currentUser.name || "User",
          messagePreview: (args.content || "").slice(0, 200),
          conversationId: args.conversationId,
        });
      }
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
  handler: async (ctx, args) => {
    const { user: currentUser, conversation } =
      await requireConversationParticipant(ctx, args.conversationId);

    // Determine the other participant (whose messages we are marking as read)
    const otherParticipantId =
      conversation.participant1 === currentUser._id
        ? conversation.participant2
        : conversation.participant1;

    // Fetch all unread messages from the other participant
    const unreadMessages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .collect();

    const toMark = unreadMessages.filter(
      (m) => m.senderId === otherParticipantId && m.isRead === false
    );

    // Mark each as read
    await Promise.all(
      toMark.map((message) => ctx.db.patch(message._id, { isRead: true }))
    );

    // Reset the current user's unreadCount to 0
    const isParticipant1 = conversation.participant1 === currentUser._id;

    await ctx.db.patch(args.conversationId, {
      ...(isParticipant1
        ? { unreadCount1: 0 }
        : { unreadCount2: 0 }),
      updatedAt: Date.now(),
    });

    return { markedCount: toMark.length };
  },
});
