import Image from "next/image";
import { cn } from "@/lib/utils";

export default function UserChatList1({ data, isSelected, onClick }) {
  const otherParticipant = data?.otherParticipant;
  const name = otherParticipant?.name || data?.name || "Unknown User";
  const preview = data?.lastMessagePreview || data?.title || "No messages yet";
  const unreadCount = data?.unreadCount || 0;
  const avatarSrc = otherParticipant?.image || data?.img || "/images/resource/user.png";

  function formatTime(timestamp) {
    if (!timestamp) return "";
    const diff = Date.now() - timestamp;
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
    <div
      className={cn(
        "flex items-center gap-3 cursor-pointer",
        isSelected && "bg-primary/10 rounded-md"
      )}
      onClick={onClick}
    >
      <div className="relative flex-shrink-0">
        <Image
          height={50}
          width={50}
          className="rounded-full object-cover h-[50px] w-[50px]"
          src={avatarSrc}
          alt={name}
          onError={(e) => {
            e.target.src = "/images/resource/user.png";
          }}
        />
        {unreadCount > 0 && (
          <span
            className="absolute -right-1 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground px-1"
            aria-label={`${unreadCount} unread messages`}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </div>
      <div className="flex-grow flex items-start gap-2 overflow-hidden">
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              "text-sm text-foreground mb-0.5 truncate",
              unreadCount > 0 ? "font-semibold" : "font-medium"
            )}
          >
            {name}
          </div>
          <p
            className={cn(
              "truncate text-xs text-[var(--text-secondary)] mb-0",
              unreadCount > 0 && "font-semibold"
            )}
          >
            {preview}
          </p>
        </div>
        <span className="text-xs text-[var(--text-tertiary)] flex-shrink-0">
          {formatTime(data?.lastMessageAt)}
        </span>
      </div>
    </div>
  );
}
