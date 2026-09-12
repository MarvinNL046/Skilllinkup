"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, Send, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getMessagePolicyError,
  MESSAGE_MAX_LENGTH,
} from "@/lib/messagePolicy.mjs";

export default function MessageBox({
  messages = [],
  currentUserId,
  otherParticipant,
  context,
  onSend,
  hasConversation = false,
  isMobile = false,
  onMobileBack,
  messageStatus = "Exhausted",
  onLoadOlder,
  readError,
  onRetryRead,
}) {
  const t = useTranslations("messages");
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const chatBoxRef = useRef(null);
  const previousNewest = useRef(null);
  const olderAnchor = useRef(null);
  const nearBottom = useRef(true);
  const sendingRef = useRef(false);
  const blockError = inputValue.trim()
    ? getMessagePolicyError(inputValue)
    : null;

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
    const newest = messages.at(-1)?._id;
    const element = chatBoxRef.current;
    if (!element) return;
    if (olderAnchor.current && messageStatus !== "LoadingMore") {
      element.scrollTop =
        olderAnchor.current.top +
        element.scrollHeight -
        olderAnchor.current.height;
      olderAnchor.current = null;
    } else if (newest !== previousNewest.current && nearBottom.current) {
      element.scrollTop = element.scrollHeight;
    }
    previousNewest.current = newest;
  }, [messages, messageStatus]);

  function loadOlder() {
    if (!onLoadOlder || messageStatus !== "CanLoadMore") return;
    const element = chatBoxRef.current;
    olderAnchor.current = {
      top: element?.scrollTop || 0,
      height: element?.scrollHeight || 0,
    };
    onLoadOlder();
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!inputValue.trim() || sendingRef.current || blockError) return;
    sendingRef.current = true;
    setSendError(null);
    setIsSending(true);
    try {
      await onSend(inputValue);
      setInputValue("");
      nearBottom.current = true;
      scrollToBottom();
    } catch (err) {
      setSendError(err?.data ?? err?.message ?? t("sendFailed"));
    } finally {
      sendingRef.current = false;
      setIsSending(false);
    }
  }

  function handleKeyDown(e) {
    if (e.nativeEvent?.isComposing || e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter" && !e.shiftKey && !isMobile) {
      return handleSend(e);
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
  const otherAvatar = otherParticipant?.image || "/images/resource/user.png";

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
            style={{
              fontSize: 50,
              color: "var(--primary-600)",
              display: "block",
              marginBottom: 16,
            }}
          />
          <h5>{t("selectConversation")}</h5>
          <p style={{ color: "#6b7280" }}>{t("selectConversationHint")}</p>
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
        height: isMobile ? "calc(100dvh - 160px)" : "calc(100dvh - 240px)",
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
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onMobileBack}
            aria-label={t("backToConversations")}
          >
            <ArrowLeft aria-hidden="true" />
          </Button>
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
        <div style={{ minWidth: 0, flex: 1 }}>
          <h6
            style={{ margin: 0, fontSize: isMobile ? 14 : 15, fontWeight: 600 }}
          >
            {otherName}
          </h6>
          {context?.title ? (
            context.href ? (
              <Link
                href={context.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  maxWidth: "100%",
                  color: "var(--primary-700)",
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {context.title}
                </span>
                <ArrowUpRight size={13} style={{ flex: "0 0 auto" }} />
              </Link>
            ) : (
              <p
                style={{ margin: 0, fontSize: 12, color: "var(--primary-700)" }}
              >
                {context.title}
              </p>
            )
          ) : (
            <p style={{ margin: 0, fontSize: 12, color: "var(--primary-600)" }}>
              {t("active")}
            </p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={chatBoxRef}
        onScroll={(event) => {
          const element = event.currentTarget;
          nearBottom.current =
            element.scrollHeight - element.scrollTop - element.clientHeight <
            100;
        }}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          padding: isMobile ? 12 : 20,
        }}
      >
        {messageStatus === "CanLoadMore" || messageStatus === "LoadingMore" ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mb-4"
            onClick={loadOlder}
            disabled={messageStatus === "LoadingMore"}
          >
            {messageStatus === "LoadingMore"
              ? "Loading earlier messages…"
              : "Load earlier messages"}
          </Button>
        ) : null}
        {readError ? (
          <p role="status" className="mb-3 text-sm text-amber-800">
            {readError}{" "}
            <Button type="button" variant="outline" size="sm" onClick={onRetryRead}>
              Retry
            </Button>
          </p>
        ) : null}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            minHeight: "100%",
            justifyContent: messages.length === 0 ? "center" : "flex-end",
          }}
        >
          {messageStatus === "LoadingFirstPage" ? (
            <p role="status">Loading messages…</p>
          ) : messages.length === 0 ? (
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
                      whiteSpace: "pre-wrap",
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
          style={{ display: "flex", alignItems: "flex-end", gap: 10 }}
          aria-busy={isSending}
        >
          <textarea
            rows={3}
            aria-label="Message"
            maxLength={MESSAGE_MAX_LENGTH}
            aria-describedby={
              blockError || sendError ? "message-compose-help message-send-error" : "message-compose-help"
            }
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
              minWidth: 0,
              padding: "10px 16px",
              fontSize: 16,
              lineHeight: 1.5,
              resize: "none",
              border: "none",
              borderRadius: 10,
              background: "#f4f4f5",
              color: "#111827",
            }}
          />
          <Button
            type="submit"
            size={isMobile ? "icon" : "default"}
            aria-label={isSending ? "Sending message" : "Send message"}
            disabled={isSending || !inputValue.trim() || !!blockError}
          >
            {isSending ? (
              isMobile ? (
                <LoaderCircle className="animate-spin" aria-hidden="true" />
              ) : (
                t("sending")
              )
            ) : isMobile ? (
              <Send aria-hidden="true" />
            ) : (
              t("send")
            )}
            {!isMobile && <i className="fal fa-arrow-right-long" />}
          </Button>
        </form>
        <p id="message-compose-help" style={{ fontSize: 12, margin: "6px 0 0", color: "#6b7280" }}>
          {isMobile ? "Enter adds a new line. Tap send when ready." : "Enter to send · Shift+Enter for a new line"}
        </p>
        {blockError && (
          <p
            id="message-send-error"
            role="alert"
            style={{
              color: "#dc2626",
              fontSize: 12,
              margin: "6px 0 0",
              padding: "0 4px",
            }}
          >
            {blockError}
          </p>
        )}
        {sendError && !blockError && (
          <p
            id="message-send-error"
            role="alert"
            style={{
              color: "#dc2626",
              fontSize: 12,
              margin: "6px 0 0",
              padding: "0 4px",
            }}
          >
            {sendError}
          </p>
        )}
      </div>
    </div>
  );
}
