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
    const watch = client.watchQuery(api.chat.conversations.getById, { conversationId });
    const update = () => {
      if (cancelled) return;
      try {
        const conversation = watch.localQueryResult();
        if (conversation === undefined) return;
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
      } catch {
        setResult({ key, conversation: null });
      }
    };
    const unsubscribe = watch.onUpdate(update);
    update();
    return () => { cancelled = true; unsubscribe(); };
  }, [client, conversationId, userId, needed, key]);

  const resolved = needed && result?.key === key ? result : null;
  return {
    conversations: resolved?.conversation ? [resolved.conversation, ...recent] : recent,
    requestedLoading: Boolean(conversationId && !listed && (!userId || loading || !resolved)),
    requestedError: Boolean(needed && resolved && !resolved.conversation),
    retryRequested: () => setAttempt((value) => value + 1),
  };
}
