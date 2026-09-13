"use client";
import { useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import useConvexUser from "./useConvexUser";
import { safeAuthRedirect } from "@/lib/authRedirect.mjs";

export default function useConvexNotifications(limit = 20) {
  const { convexUser, isAuthenticated } = useConvexUser();
  const userId = isAuthenticated ? convexUser?._id : undefined;
  const notifications = useQuery(api.marketplace.notifications.list, userId ? { userId, limit } : "skip");
  const unreadCount = useQuery(api.marketplace.notifications.getUnreadCount, userId ? { userId } : "skip");
  const readMutation = useMutation(api.marketplace.notifications.markRead);
  const allReadMutation = useMutation(api.marketplace.notifications.markAllRead);
  const pending = useRef(new Set());
  const [markingAll, setMarkingAll] = useState(false);
  const allPending = useRef(false);

  async function markRead({ notificationId }) {
    if (!userId || pending.current.has(notificationId)) return;
    pending.current.add(notificationId);
    try { return await readMutation({ notificationId }); }
    catch { toast.error("This update could not be marked as read. Please try again from notifications."); }
    finally { pending.current.delete(notificationId); }
  }

  async function markAllRead() {
    if (!userId || allPending.current) return;
    allPending.current = true;
    setMarkingAll(true);
    try { return await allReadMutation({ userId }); }
    catch { toast.error("Notifications could not be marked as read. Please try again."); }
    finally { allPending.current = false; setMarkingAll(false); }
  }

  return {
    notifications: userId ? notifications?.map(item => ({ ...item, link: item.link ? safeAuthRedirect(item.link) : undefined })) : undefined,
    unreadCount: userId ? unreadCount ?? 0 : 0,
    markRead, markAllRead, markingAll, userId,
  };
}
