"use client";

import { useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { api } from "../../convex/_generated/api";

// The inbox is bounded; a notification can point to an older conversation.
// Resolve that link through the same participant-authorized backend query.
export default function useRequestedConversation(userId, conversationId, recent, loading) {
  const client = useConvex();
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);
  const listed = recent.some((item) => item._id === conversationId);
  const key = `${userId || ""}/${conversationId || ""}/${attempt}`;
  const needed = Boolean(userId && conversationId && !listed && !loading);

  useEffect(() => {
    if (!needed) return;
    let cancelled = false;
    client.query(api.chat.conversations.getById, { conversationId }).then(
      (conversation) => {
        if (cancelled) return;
        const participant1 = conversation?.participant1 === userId;
        if (!conversation || (!participant1 && conversation.participant2 !== userId)) {
          setResult({ key, conversation: null });
          return;
        }
        setResult({ key, conversation: {
          ...conversation,
          otherParticipant: participant1 ? conversation.participant2User : conversation.participant1User,
          unreadCount: participant1 ? conversation.unreadCount1 ?? 0 : conversation.unreadCount2 ?? 0,
        } });
      },
      () => { if (!cancelled) setResult({ key, conversation: null }); },
    );
    return () => { cancelled = true; };
  }, [client, conversationId, userId, needed, key]);

  const resolved = needed && result?.key === key ? result : null;
  return {
    conversations: resolved?.conversation ? [resolved.conversation, ...recent] : recent,
    requestedLoading: Boolean(conversationId && !listed && (!userId || loading || !resolved)),
    requestedError: Boolean(needed && resolved && !resolved.conversation),
    retryRequested: () => setAttempt((value) => value + 1),
  };
}
