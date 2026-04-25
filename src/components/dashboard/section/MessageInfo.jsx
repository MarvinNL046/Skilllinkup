"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Search, ArrowLeft } from "lucide-react";
import useConvexUser from "@/hook/useConvexUser";
import useConvexMessages from "@/hook/useConvexMessages";
import DashboardNavigation from "../header/DashboardNavigation";
import UserChatList1 from "../card/UserChatList1";
import MessageBox from "../element/MessageBox";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

/**
 * /message — true 2-pane app layout. Conversation list on the left at
 * fixed 360px, message panel takes the rest of the dashboard content
 * width. The dashboard sidebar lives outside this component so the
 * effective layout is sidebar (264) + conv-list (360) + msg-panel
 * (flex 1). On <768px viewports the panes stack with a back button.
 */
export default function MessageInfo() {
  const t = useTranslations("messages");
  const { convexUser } = useConvexUser();
  const userId = convexUser?._id;
  const isMobile = useIsMobile();
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const {
    conversations,
    messages,
    selectedConversationId,
    setSelectedConversationId,
    sendMessage,
    markRead,
  } = useConvexMessages(userId);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery.trim()) return true;
    const name = conv.otherParticipant?.name || "";
    const preview = conv.lastMessagePreview || "";
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const selectedConversation = conversations.find(
    (c) => c._id === selectedConversationId
  );

  async function handleSelectConversation(conversationId) {
    setSelectedConversationId(conversationId);
    if (isMobile) setMobileShowChat(true);
    if (conversationId) {
      try {
        await markRead({ conversationId });
      } catch {
        // ignore
      }
    }
  }

  function handleMobileBack() {
    setMobileShowChat(false);
  }

  async function handleSendMessage(content) {
    if (!selectedConversationId || !content.trim()) return;
    await sendMessage({
      conversationId: selectedConversationId,
      content: content.trim(),
      messageType: "text",
    });
  }

  const showList = !isMobile || !mobileShowChat;
  const showPanel = !isMobile || mobileShowChat;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <DashboardNavigation />

      <div
        className="messages-2pane"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(280px, 360px) 1fr",
          gap: 0,
          flex: 1,
          minHeight: "calc(100vh - var(--dash-topbar-h, 64px) - 96px)",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          boxShadow: "var(--shadow-1)",
        }}
      >
        {showList && (
          <aside
            style={{
              borderRight: isMobile ? "none" : "1px solid var(--border-subtle)",
              background: "var(--bg)",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
            }}
          >
            <div
              style={{
                padding: "var(--space-4) var(--space-5)",
                borderBottom: "1px solid var(--border-subtle)",
                background: "var(--bg-elevated)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h4)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  margin: 0,
                  marginBottom: "var(--space-3)",
                }}
              >
                {t("title")}
              </h2>
              <form
                onSubmit={(e) => e.preventDefault()}
                style={{ position: "relative" }}
              >
                <Search
                  size={15}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-tertiary)",
                    pointerEvents: "none",
                  }}
                  aria-hidden="true"
                />
                <input
                  className="input"
                  type="search"
                  placeholder={t("searchConversations")}
                  aria-label={t("searchConversations")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: 36, width: "100%" }}
                />
              </form>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "var(--space-2)",
              }}
            >
              {convexUser === undefined ? (
                <div style={{ textAlign: "center", padding: "var(--space-8) 0" }}>
                  <div
                    role="status"
                    aria-label={t("loading", { default: "Loading" })}
                    style={{
                      width: 24,
                      height: 24,
                      margin: "0 auto",
                      border: "3px solid var(--border-subtle)",
                      borderTopColor: "var(--primary-600)",
                      borderRadius: "999px",
                      animation: "spin 0.9s linear infinite",
                    }}
                  />
                </div>
              ) : !userId ? (
                <div style={{ textAlign: "center", padding: "var(--space-8) var(--space-4)" }}>
                  <p className="body-sm" style={{ color: "var(--text-tertiary)", margin: 0 }}>
                    {t("settingUpAccount")}
                  </p>
                </div>
              ) : conversations === null || conversations.length === 0 ? (
                <div style={{ textAlign: "center", padding: "var(--space-8) var(--space-4)" }}>
                  <p className="body-sm" style={{ color: "var(--text-tertiary)", margin: 0 }}>
                    {t("noConversationsYet")}
                  </p>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div style={{ textAlign: "center", padding: "var(--space-8) var(--space-4)" }}>
                  <p className="body-sm" style={{ color: "var(--text-tertiary)", margin: 0 }}>
                    {t("noConversationsMatch")}
                  </p>
                </div>
              ) : (
                <div style={{ display: "grid", gap: 2 }}>
                  {filteredConversations.map((conv) => {
                    const active = selectedConversationId === conv._id;
                    return (
                      <button
                        key={conv._id}
                        type="button"
                        onClick={() => handleSelectConversation(conv._id)}
                        style={{
                          padding: "var(--space-3)",
                          borderRadius: "var(--radius-md)",
                          background: active ? "var(--primary-50)" : "transparent",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          fontFamily: "inherit",
                          color: "inherit",
                        }}
                      >
                        <UserChatList1 data={conv} isSelected={active} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>
        )}

        {showPanel && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              minHeight: 0,
            }}
          >
            {isMobile && mobileShowChat && (
              <div
                style={{
                  padding: "var(--space-3) var(--space-4)",
                  borderBottom: "1px solid var(--border-subtle)",
                  background: "var(--bg-elevated)",
                }}
              >
                <button
                  type="button"
                  onClick={handleMobileBack}
                  className="btn btn--ghost btn--sm"
                >
                  <ArrowLeft size={14} />
                  {t("backToConversations", { default: "Back" })}
                </button>
              </div>
            )}
            <MessageBox
              messages={messages}
              currentUserId={userId}
              otherParticipant={selectedConversation?.otherParticipant}
              onSend={handleSendMessage}
              hasConversation={!!selectedConversationId}
              isMobile={isMobile}
              onMobileBack={handleMobileBack}
            />
          </div>
        )}
      </div>
    </div>
  );
}
