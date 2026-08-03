"use client";

import Link from "next/link";
import { Bell, CheckCheck, Circle, ExternalLink, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import useConvexNotifications from "@/hook/useConvexNotifications";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import styles from "./NotificationCentre.module.css";

function relativeTime(timestamp) {
  const difference = Date.now() - timestamp;
  const minutes = Math.max(0, Math.floor(difference / 60_000));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(timestamp);
}

export default function NotificationCentre() {
  const {
    notifications,
    unreadCount,
    markRead,
    markAllRead,
    userId,
  } = useConvexNotifications(50);

  async function handleMarkAll() {
    if (!userId) return;
    try {
      const result = await markAllRead({ userId });
      toast.success(
        result.markedCount
          ? `${result.markedCount} notifications marked as read.`
          : "You are already caught up.",
      );
    } catch (error) {
      toast.error(error?.message || "Notifications could not be updated.");
    }
  }

  if (notifications === undefined) {
    return (
      <div className={styles.loading} role="status">
        <LoaderCircle /> Loading notifications…
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <DashboardNavigation />
      <header className={styles.header}>
        <div>
          <span>Activity centre</span>
          <h1>Notifications</h1>
          <p>Updates from your projects, local work, applications and support—kept in one reliable timeline.</p>
        </div>
        <button type="button" onClick={handleMarkAll} disabled={!unreadCount}>
          <CheckCheck size={17} /> Mark all as read
        </button>
      </header>

      <section className={styles.summary} aria-label="Notification summary">
        <i><Bell size={22} /></i>
        <div><strong>{unreadCount}</strong><span>unread {unreadCount === 1 ? "update" : "updates"}</span></div>
        <p>Open an update to jump directly to the relevant Skilllinkup context.</p>
      </section>

      <section className={styles.list} aria-label="Recent notifications">
        {notifications.length === 0 ? (
          <div className={styles.empty}>
            <Bell size={28} />
            <h2>You’re all caught up</h2>
            <p>New project, quote, appointment and application updates will appear here.</p>
          </div>
        ) : notifications.map((notification) => {
          const content = (
            <>
              <i data-unread={notification.isRead ? "false" : "true"}>
                <Circle size={11} fill="currentColor" />
              </i>
              <div>
                <strong>{notification.title}</strong>
                {notification.body ? <p>{notification.body}</p> : null}
                <time>{relativeTime(notification.createdAt)}</time>
              </div>
              {notification.link ? <ExternalLink size={16} /> : null}
            </>
          );
          return notification.link ? (
            <Link
              href={notification.link}
              key={notification._id}
              data-unread={notification.isRead ? "false" : "true"}
              onClick={() => {
                if (!notification.isRead) {
                  void markRead({ notificationId: notification._id });
                }
              }}
            >
              {content}
            </Link>
          ) : (
            <button
              type="button"
              key={notification._id}
              data-unread={notification.isRead ? "false" : "true"}
              onClick={() => {
                if (!notification.isRead) {
                  void markRead({ notificationId: notification._id });
                }
              }}
            >
              {content}
            </button>
          );
        })}
      </section>
    </div>
  );
}
