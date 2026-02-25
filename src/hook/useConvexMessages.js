"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

export default function useConvexMessages(userId) {
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  // Convex useQuery is reactive - auto-updates when data changes
  const conversations = useQuery(
    api.chat.conversations.list,
    userId ? { userId } : "skip"
  );

  const messages = useQuery(
    api.chat.messages.getByConversation,
    selectedConversationId
      ? { conversationId: selectedConversationId, limit: 50 }
      : "skip"
  );

  const sendMessage = useMutation(api.chat.messages.send);
  const markRead = useMutation(api.chat.messages.markRead);
  const createConversation = useMutation(api.chat.conversations.create);

  return {
    conversations: conversations || [],
    messages: messages || [],
    selectedConversationId,
    setSelectedConversationId,
    sendMessage,
    markRead,
    createConversation,
  };
}
