"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";

export default function NotificationBell() {
  const { convexUser } = useConvexUser();
  const userId = convexUser?._id;

  const unreadCount = useQuery(
    api.marketplace.notifications.getUnreadCount,
    userId ? { userId } : "skip"
  );

  const notifications = useQuery(
    api.marketplace.notifications.list,
    userId ? { userId, limit: 10 } : "skip"
  );

  const markRead = useMutation(api.marketplace.notifications.markRead);
  const markAllRead = useMutation(api.marketplace.notifications.markAllRead);

  if (!userId) return null;

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
    <div className="dropdown">
      <a
        className="text-center mr5 text-thm2 dropdown-toggle fz20 position-relative"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ cursor: "pointer" }}
      >
        <span className="flaticon-notification"></span>
        {unreadCount > 0 && (
          <span
            className="position-absolute badge bg-danger rounded-circle"
            style={{
              top: "-8px",
              right: "-8px",
              fontSize: "10px",
              minWidth: "16px",
              height: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </a>
      <div
        className="dropdown-menu dropdown-menu-end"
        style={{ width: "340px", maxHeight: "400px", overflowY: "auto" }}
      >
        <div className="dboard_notific_dd px30 pt10 pb15">
          <div className="d-flex justify-content-between align-items-center mb10">
            <h6 className="mb-0 fw600">Notifications</h6>
            {unreadCount > 0 && (
              <button
                className="btn btn-sm btn-link text-decoration-none fz12 text-thm p-0"
                onClick={() => markAllRead({ userId })}
              >
                Mark all read
              </button>
            )}
          </div>
          <hr className="my-2" />
          {!notifications || notifications.length === 0 ? (
            <p className="text-center text mb-0 py-3">No notifications yet</p>
          ) : (
            notifications.map((notif) => (
              <a
                key={notif._id}
                href={notif.link || "#"}
                className={`d-block p-2 rounded mb-1 text-decoration-none notif_list ${!notif.isRead ? "bgc-thm3" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  if (!notif.link) e.preventDefault();
                  if (!notif.isRead) {
                    markRead({ notificationId: notif._id });
                  }
                }}
              >
                <strong className="d-block fz14 dark-color">{notif.title}</strong>
                {notif.body && <span className="fz13 text">{notif.body}</span>}
                <span className="d-block fz12 text mt-1">
                  {formatDate(notif.createdAt || notif._creationTime)}
                </span>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
