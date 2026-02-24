import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required to send a message.");
    }

    // Resolve current user by email
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!currentUser) {
      throw new Error("User not found in database.");
    }

    // Get the conversation to update unread counts
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new Error("Conversation not found.");
    }

    const now = Date.now();
    const messageType = args.messageType ?? "text";

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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required to mark messages as read.");
    }

    // Resolve current user by email
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!currentUser) {
      throw new Error("User not found in database.");
    }

    // Get the conversation
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) {
      throw new Error("Conversation not found.");
    }

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
