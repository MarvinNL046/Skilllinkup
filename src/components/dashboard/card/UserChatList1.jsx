import Image from "next/image";

export default function UserChatList1({ data, isSelected, onClick }) {
  const otherParticipant = data?.otherParticipant;
  const name = otherParticipant?.name || data?.name || "Unknown User";
  const preview = data?.lastMessagePreview || data?.title || "No messages yet";
  const unreadCount = data?.unreadCount || 0;
  const avatarSrc = otherParticipant?.image || data?.img || "/images/resource/user.png";

  function formatTime(timestamp) {
    if (!timestamp) return "";
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return (
    <>
      <div
        className={`d-flex align-items-center position-relative ${isSelected ? "bgc-thm3 bdrs4 px10 py5" : ""}`}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <div className="position-relative flex-shrink-0 mr10">
          <Image
            height={50}
            width={50}
            className="img-fluid rounded-circle"
            src={avatarSrc}
            alt={name}
            onError={(e) => {
              e.target.src = "/images/resource/user.png";
            }}
          />
          {unreadCount > 0 && (
            <span
              className="position-absolute badge bg-danger rounded-circle"
              style={{ top: "-4px", right: "-4px", fontSize: "10px", minWidth: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </div>
        <div className="d-sm-flex flex-grow-1 overflow-hidden">
          <div className="d-inline-block overflow-hidden">
            <div className={`fz15 fw500 dark-color ff-heading mb-0 ${unreadCount > 0 ? "fw600" : ""}`}>
              {name}
            </div>
            <p
              className="preview mb-0"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "160px",
                fontWeight: unreadCount > 0 ? "600" : "normal",
              }}
            >
              {preview}
            </p>
          </div>
          <div className="iul_notific ms-auto flex-shrink-0">
            <small>{formatTime(data?.lastMessageAt)}</small>
          </div>
        </div>
      </div>
    </>
  );
}
