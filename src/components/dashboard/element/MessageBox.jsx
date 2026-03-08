"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const CONTACT_PATTERNS = [
  // Email addresses
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  // @ symbol (catches partial email attempts)
  /@/,
  // Phone numbers: 06-12345678, +31 6 1234, (020) 123-4567, etc.
  /(\+?\d[\d\s\-().]{6,}\d)/,
  // Digit sequences (6+ digits, even with spaces/dots between them)
  /(\d[\s.\-]?){6,}/,
  // URLs
  /(https?:\/\/|www\.)/i,
  // Social/messaging platforms
  /\b(wa\.me|t\.me|telegram|whatsapp|instagram|linkedin|facebook|messenger|snapchat|tiktok|signal|discord)\b/i,
  // Video/meeting platforms
  /\b(teams|zoom|loom|skype|google\s*meet|facetime|webex|jitsi|whereby)\b/i,
  // Email provider names
  /\b(gmail|hotmail|outlook|yahoo|protonmail|icloud|live\.com|msn|ziggo|kpn|xs4all)\b/i,
  // Common evasion patterns: "naam at gmail dot com", "apenstaartje"
  /\b\w+\s*(at|apenstaartje)\s*\w+\s*(dot|punt)\s*\w+/i,
  // "Bel me", "stuur sms", "app me" etc.
  /\b(bel\s*me|stuur.*sms|app\s*me|call\s*me|text\s*me|dm\s*me)\b/i,
];

function containsContactInfo(text) {
  return CONTACT_PATTERNS.some((p) => p.test(text));
}

const BLOCK_ERROR = "Contactgegevens delen is niet toegestaan. E-mailadressen, telefoonnummers, links en e-mailproviders (Gmail, Outlook, etc.) worden geblokkeerd.";

export default function MessageBox({
  messages = [],
  currentUserId,
  otherParticipant,
  onSend,
  hasConversation = false,
}) {
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const chatBoxRef = useRef(null);
  const messagesEndRef = useRef(null);
  const blockError = inputValue.trim() && containsContactInfo(inputValue) ? BLOCK_ERROR : null;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages?.length]);

  async function handleSend(e) {
    e.preventDefault();
    if (!inputValue.trim() || isSending || blockError) return;

    setSendError(null);
    setIsSending(true);
    try {
      await onSend(inputValue);
      setInputValue("");
    } catch (err) {
      const msg = err?.data ?? err?.message ?? "Bericht kon niet worden verstuurd.";
      setSendError(msg);
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
  const otherAvatar = otherParticipant?.image || "/images/resource/user.png";

  if (!hasConversation) {
    return (
      <div className="message_container mt30-md">
        <div className="d-flex align-items-center justify-content-center h-100" style={{ minHeight: "400px" }}>
          <div className="text-center">
            <i className="flaticon-chat fz50 text-thm mb20 d-block" />
            <h5 className="title">Select a conversation</h5>
            <p className="text">Choose a conversation from the left to start messaging.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="message_container mt30-md">
        <div className="user_heading px-0 mx30">
          <div className="wrap">
            <Image
              height={50}
              width={50}
              className="img-fluid mr10 rounded-circle"
              src={otherAvatar}
              alt={otherName}
              onError={(e) => {
                e.target.src = "/images/resource/user.png";
              }}
            />
            <div className="meta d-sm-flex justify-content-sm-between align-items-center">
              <div className="authors">
                <h6 className="name mb-0">{otherName}</h6>
                <p className="preview">Active</p>
              </div>
            </div>
          </div>
        </div>
        <div className="inbox_chatting_box" ref={chatBoxRef}>
          <ul className="chatting_content">
            {messages.length === 0 ? (
              <li className="text-center py-4" style={{ alignSelf: "center" }}>
                <p className="text mb-0">No messages yet. Say hello!</p>
              </li>
            ) : (
              messages.map((message) => {
                const isOwnMessage = message.senderId === currentUserId;
                const senderName = message.sender?.name || "User";
                const senderAvatar =
                  message.sender?.image || "/images/resource/user.png";

                if (!isOwnMessage) {
                  return (
                    <li key={message._id} className="sent">
                      <div className="d-flex align-items-center mb15">
                        <Image
                          height={40}
                          width={40}
                          className="img-fluid rounded-circle align-self-start mr10"
                          src={senderAvatar}
                          alt={senderName}
                          onError={(e) => {
                            e.target.src = "/images/resource/user.png";
                          }}
                        />
                        <div className="title fz15">
                          {senderName}{" "}
                          <small className="ml10">{formatTime(message.createdAt)}</small>
                        </div>
                      </div>
                      <p>{message.content || (message.fileName ? `[File] ${message.fileName}` : "")}</p>
                    </li>
                  );
                } else {
                  return (
                    <li key={message._id} className="reply">
                      <div className="d-flex align-items-center justify-content-end mb15">
                        <div className="title fz15">
                          <small className="mr10">{formatTime(message.createdAt)}</small> You
                        </div>
                        <Image
                          height={40}
                          width={40}
                          className="img-fluid rounded-circle align-self-end ml10"
                          src={senderAvatar}
                          alt="You"
                          onError={(e) => {
                            e.target.src = "/images/resource/user.png";
                          }}
                        />
                      </div>
                      <p>{message.content || (message.fileName ? `[File] ${message.fileName}` : "")}</p>
                    </li>
                  );
                }
              })
            )}
            <div ref={messagesEndRef} />
          </ul>
        </div>
        <div className="mi_text">
          <div className="message_input">
            <form className="d-flex align-items-center" onSubmit={handleSend}>
              <input
                className="form-control"
                type="text"
                placeholder="Type a Message"
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); setSendError(null); }}
                onKeyDown={handleKeyDown}
                disabled={isSending}
              />
              <button
                type="submit"
                className="btn ud-btn btn-thm"
                disabled={isSending || !inputValue.trim() || !!blockError}
              >
                {isSending ? "Sending..." : "Send Message"}
                <i className="fal fa-arrow-right-long" />
              </button>
            </form>
            {blockError && (
              <p className="text-danger fz12 mt5 mb0 px10">{blockError}</p>
            )}
            {sendError && !blockError && (
              <p className="text-danger fz12 mt5 mb0 px10">{sendError}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
