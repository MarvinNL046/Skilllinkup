"use client";
import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { Bell } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";

/**
 * Notification bell + DS-native dropdown. Replaces Bootstrap's
 * data-bs-toggle="dropdown" pattern with a controlled popover that
 * closes on outside-click + ESC. Only rendered for authenticated
 * users with a matching Convex user record.
 */
export default function NotificationBell() {
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const userId = convexUser?._id;
  const authUser = useQuery(
    api.users.getCurrentUser,
    isLoaded && isAuthenticated ? {} : "skip"
  );
  const canReadNotifications =
    !!userId &&
    !!authUser &&
    authUser._id === userId;

  const unreadCount = useQuery(
    api.marketplace.notifications.getUnreadCount,
    canReadNotifications ? { userId } : "skip"
  );

  const notifications = useQuery(
    api.marketplace.notifications.list,
    canReadNotifications ? { userId, limit: 10 } : "skip"
  );

  const markRead = useMutation(api.marketplace.notifications.markRead);
  const markAllRead = useMutation(api.marketplace.notifications.markAllRead);

  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!isLoaded || !isAuthenticated || !userId || !canReadNotifications) {
    return null;
  }

  function formatDate(timestamp) {
    if (!timestamp) return "";
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Notifications"
        className="btn btn--ghost btn--icon btn--sm"
        style={{ position: "relative" }}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              minWidth: 16,
              height: 16,
              padding: "0 4px",
              borderRadius: 999,
              background: "var(--error-500, oklch(62% 0.2 22))",
              color: "var(--neutral-0)",
              fontSize: 10,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
              boxShadow: "0 0 0 2px var(--bg-elevated)",
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: 340,
            maxHeight: 420,
            overflowY: "auto",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-3)",
            zIndex: 60,
          }}
        >
          <div style={{ padding: "var(--space-4) var(--space-5)" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "var(--space-3)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h5)",
                  fontWeight: 600,
                }}
              >
                Notifications
              </div>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={() => markAllRead({ userId })}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    fontSize: "var(--text-body-sm)",
                    fontWeight: 500,
                    color: "var(--primary-600)",
                  }}
                >
                  Mark all read
                </button>
              )}
            </div>

            {!notifications || notifications.length === 0 ? (
              <p
                className="body-sm"
                style={{
                  textAlign: "center",
                  color: "var(--text-tertiary)",
                  padding: "var(--space-6) 0",
                  margin: 0,
                }}
              >
                No notifications yet
              </p>
            ) : (
              <div style={{ display: "grid", gap: 4 }}>
                {notifications.map((notif) => (
                  <a
                    key={notif._id}
                    href={notif.link || "#"}
                    onClick={(e) => {
                      if (!notif.link) e.preventDefault();
                      if (!notif.isRead) {
                        markRead({ notificationId: notif._id });
                      }
                      setOpen(false);
                    }}
                    style={{
                      display: "block",
                      padding: "var(--space-3)",
                      borderRadius: "var(--radius-md)",
                      textDecoration: "none",
                      background: notif.isRead ? "transparent" : "var(--primary-50)",
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        fontSize: "var(--text-body-sm)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {notif.title}
                    </strong>
                    {notif.body && (
                      <span
                        className="body-sm"
                        style={{
                          display: "block",
                          color: "var(--text-secondary)",
                          marginTop: 2,
                        }}
                      >
                        {notif.body}
                      </span>
                    )}
                    <span
                      style={{
                        display: "block",
                        fontSize: "var(--text-caption, 12px)",
                        color: "var(--text-tertiary)",
                        marginTop: 4,
                      }}
                    >
                      {formatDate(notif.createdAt || notif._creationTime)}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
