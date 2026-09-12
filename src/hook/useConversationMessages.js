"use client";
import { useEffect, useMemo, useState } from "react";
import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useConversationMessages(
  conversationId,
  userId,
  active = true,
) {
  const { results, status, loadMore } = usePaginatedQuery(
    api.chat.messages.list,
    conversationId && userId ? { conversationId } : "skip",
    { initialNumItems: 50 },
  );
  const messages = useMemo(() => [...results].reverse(), [results]);
  const markRead = useMutation(api.chat.messages.markRead);
  const [visible, setVisible] = useState(false);
  const [readError, setReadError] = useState("");
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    const update = () => setVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  const unread = messages
    .filter((item) => item.senderId !== userId && item.isRead === false)
    .map((item) => item._id)
    .join(",");
  useEffect(() => {
    if (!active || !visible || !conversationId || !unread) return;
    let cancelled = false;
    setReadError("");
    markRead({ conversationId }).catch(() => {
      if (!cancelled) setReadError("Read status could not be updated.");
    });
    return () => {
      cancelled = true;
    };
  }, [active, visible, conversationId, unread, markRead, retry]);
  return {
    messages,
    messageStatus: status,
    loadOlder: () => loadMore(50),
    readError,
    retryRead: () => setRetry((value) => value + 1),
  };
}
