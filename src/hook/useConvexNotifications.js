"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import useConvexUser from "./useConvexUser";

export default function useConvexNotifications() {
  const { convexUser } = useConvexUser();
  const notifications = useQuery(
    api.marketplace.notifications.list,
    convexUser?._id ? { userId: convexUser._id, limit: 20 } : "skip"
  );
  const unreadCount = useQuery(
    api.marketplace.notifications.getUnreadCount,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );
  const markRead = useMutation(api.marketplace.notifications.markRead);
  const markAllRead = useMutation(api.marketplace.notifications.markAllRead);

  return {
    notifications,
    unreadCount: unreadCount ?? 0,
    markRead,
    markAllRead,
    userId: convexUser?._id,
  };
}
