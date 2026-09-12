"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import useConversationMessages from "./useConversationMessages";

export default function useConvexMessages(userId, active = true) {
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  // Convex useQuery is reactive - auto-updates when data changes
  const conversations = useQuery(
    api.chat.conversations.list,
    userId ? { userId } : "skip",
  );

  const history = useConversationMessages(
    selectedConversationId,
    userId,
    active,
  );

  const sendMessage = useMutation(api.chat.messages.send);

  return {
    conversations: conversations || [],
    ...history,
    conversationsLoading: Boolean(userId) && conversations === undefined,
    selectedConversationId,
    setSelectedConversationId,
    sendMessage,
  };
}
