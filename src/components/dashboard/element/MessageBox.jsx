"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const CONTACT_PATTERNS = [
  /@/,
  /(\+?\d[\d\s\-().]{6,}\d)/,
  /(\d[\s.\-]?){6,}/,
  /(https?:\/\/|www\.)/i,
  /\b(wa\.me|t\.me|telegram|whatsapp|instagram|linkedin|facebook|messenger|snapchat|tiktok|signal|discord)\b/i,
  /\b(teams|zoom|loom|skype|google\s*meet|facetime|webex|jitsi|whereby)\b/i,
  /\b(gmail|hotmail|outlook|yahoo|protonmail|icloud|live\.com|msn|ziggo|kpn|xs4all)\b/i,
  /\b\w+\s*(at|apenstaartje)\s*\w+\s*(dot|punt)\s*\w+/i,
  /\b(bel\s*me|stuur.*sms|app\s*me|call\s*me|text\s*me|dm\s*me)\b/i,
];

function containsContactInfo(text) {
  return CONTACT_PATTERNS.some((p) => p.test(text));
}

export default function MessageBox({
  messages = [],
  currentUserId,
  otherParticipant,
  onSend,
  hasConversation = false,
  isMobile = false,
  onMobileBack,
}) {
  const t = useTranslations("messages");
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const chatBoxRef = useRef(null);
  const prevCountRef = useRef(0);
  const blockError =
    inputValue.trim() && containsContactInfo(inputValue) ? t("contactBlocked") : null;

  const scrollToBottom = () => {
    const el = chatBoxRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    });
  };

  useEffect(() => {
    const count = messages?.length ?? 0;
    if (count > prevCountRef.current) scrollToBottom();
    prevCountRef.current = count;
  }, [messages?.length]);

  useEffect(() => {
    if (hasConversation && messages?.length > 0) scrollToBottom();
  }, [hasConversation]);

  async function handleSend(e) {
    e.preventDefault();
    if (!inputValue.trim() || isSending || blockError) return;
    setSendError(null);
    setIsSending(true);
    try {
      await onSend(inputValue);
      setInputValue("");
      scrollToBottom();
    } catch (err) {
      setSendError(
        err?.data ?? err?.message ?? t("sendFailed")
      );
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  }

  function formatTime(timestamp) {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const otherName = otherParticipant?.name || "User";
  const otherAvatar =
    otherParticipant?.image || "/images/resource/user.png";

  if (!hasConversation) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 400,
          border: "1px solid #eee",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <i
            className="flaticon-chat"
            style={{ fontSize: 50, color: "var(--primary-600)", display: "block", marginBottom: 16 }}
          />
          <h5>{t("selectConversation")}</h5>
          <p style={{ color: "#6b7280" }}>
            {t("selectConversationHint")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: isMobile ? 0 : 12,
        border: isMobile ? "none" : "1px solid #eee",
        display: "flex",
        flexDirection: "column",
        height: isMobile ? "calc(100vh - 160px)" : "calc(100vh - 240px)",
        minHeight: isMobile ? 300 : 400,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: isMobile ? "12px 16px" : "16px 20px",
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        {isMobile && onMobileBack && (
          <button
            onClick={onMobileBack}
            style={{
              background: "none",
              border: "none",
              padding: "4px 8px",
              cursor: "pointer",
              fontSize: 18,
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
            }}
            aria-label={t("backToConversations")}
          >
            <i className="fal fa-arrow-left" />
          </button>
        )}
        <Image
          height={isMobile ? 36 : 44}
          width={isMobile ? 36 : 44}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          src={otherAvatar}
          alt={otherName}
          onError={(e) => {
            e.target.src = "/images/resource/user.png";
          }}
        />
        <div>
          <h6 style={{ margin: 0, fontSize: isMobile ? 14 : 15, fontWeight: 600 }}>
            {otherName}
          </h6>
          <p style={{ margin: 0, fontSize: 12, color: "var(--primary-600)" }}>{t("active")}</p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatBoxRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: isMobile ? 12 : 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            minHeight: "100%",
            justifyContent: messages.length === 0 ? "center" : "flex-end",
          }}
        >
          {messages.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6b7280" }}>
              {t("noMessagesYet")}
            </p>
          ) : (
            messages.map((message) => {
              const isOwn = message.senderId === currentUserId;
              const name = message.sender?.name || "User";
              const avatar =
                message.sender?.image || "/images/resource/user.png";
              const content =
                message.content ||
                (message.fileName ? `[File] ${message.fileName}` : "");

              return (
                <div
                  key={message._id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isOwn ? "flex-end" : "flex-start",
                    maxWidth: isMobile ? "88%" : "75%",
                    alignSelf: isOwn ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 4,
                      flexDirection: isOwn ? "row-reverse" : "row",
                    }}
                  >
                    <Image
                      height={32}
                      width={32}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                      src={avatar}
                      alt={name}
                      onError={(e) => {
                        e.target.src = "/images/resource/user.png";
                      }}
                    />
                    <span style={{ fontSize: 12, color: "#6b7280" }}>
                      {isOwn ? t("you") : name}{" "}
                      <span style={{ marginLeft: 4 }}>
                        {formatTime(message.createdAt)}
                      </span>
                    </span>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      padding: "10px 14px",
                      fontSize: 14,
                      lineHeight: 1.5,
                      borderRadius: isOwn
                        ? "12px 0 12px 12px"
                        : "0 12px 12px 12px",
                      background: isOwn ? "var(--primary-600)" : "#f3f4f6",
                      color: isOwn ? "#fff" : "#111827",
                      wordBreak: "break-word",
                    }}
                  >
                    {content}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Input */}
      <div
        style={{
          padding: isMobile ? "10px 12px" : "12px 16px",
          borderTop: "1px solid #eee",
          flexShrink: 0,
        }}
      >
        <form
          onSubmit={handleSend}
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <input
            type="text"
            placeholder={t("typeMessage")}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setSendError(null);
            }}
            onKeyDown={handleKeyDown}
            disabled={isSending}
            style={{
              flex: 1,
              padding: "10px 16px",
              fontSize: 14,
              border: "none",
              borderRadius: 10,
              background: "#f4f4f5",
              outline: "none",
              color: "#111827",
            }}
          />
          <button
            type="submit"
            disabled={isSending || !inputValue.trim() || !!blockError}
            style={{
              padding: isMobile ? "10px 14px" : "10px 20px",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              background:
                isSending || !inputValue.trim() || blockError
                  ? "#a3d48f"
                  : "var(--primary-600)",
              border: "none",
              borderRadius: 10,
              cursor:
                isSending || !inputValue.trim() || blockError
                  ? "not-allowed"
                  : "pointer",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {isSending ? (isMobile ? "..." : t("sending")) : (isMobile ? <i className="fal fa-paper-plane" /> : t("send"))}
            {!isMobile && <i className="fal fa-arrow-right-long" />}
          </button>
        </form>
        {blockError && (
          <p style={{ color: "#dc2626", fontSize: 12, margin: "6px 0 0", padding: "0 4px" }}>
            {blockError}
          </p>
        )}
        {sendError && !blockError && (
          <p style={{ color: "#dc2626", fontSize: 12, margin: "6px 0 0", padding: "0 4px" }}>
            {sendError}
          </p>
        )}
      </div>
    </div>
  );
}
