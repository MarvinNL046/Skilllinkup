"use client";
import { useState, useEffect } from "react";
import useConvexUser from "@/hook/useConvexUser";
import useConvexMessages from "@/hook/useConvexMessages";
import DashboardNavigation from "../header/DashboardNavigation";
import UserChatList1 from "../card/UserChatList1";
import MessageBox from "../element/MessageBox";

function useIsMobile(breakpoint = 992) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export default function MessageInfo() {
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

  // Filter conversations by search query
  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery.trim()) return true;
    const name = conv.otherParticipant?.name || "";
    const preview = conv.lastMessagePreview || "";
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Find selected conversation object
  const selectedConversation = conversations.find(
    (c) => c._id === selectedConversationId
  );

  async function handleSelectConversation(conversationId) {
    setSelectedConversationId(conversationId);
    if (isMobile) setMobileShowChat(true);
    // Mark messages as read when selecting a conversation
    if (conversationId) {
      try {
        await markRead({ conversationId });
      } catch (err) {
        // Silently ignore read mark errors
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

  // On mobile: show either conversation list OR chat
  const showConversationList = !isMobile || !mobileShowChat;
  const showChatBox = !isMobile || mobileShowChat;

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Messages</h2>
              <p className="text">Communicate with your clients and freelancers.</p>
            </div>
          </div>
        </div>
        <div className="row mb40">
          {showConversationList && (
            <div className={isMobile ? "col-12" : "col-lg-6 col-xl-5 col-xxl-4"}>
              <div className="message_container">
                <div className="inbox_user_list">
                  <div className="iu_heading pr35">
                    <div className="chat_user_search">
                      <form className="d-flex align-items-center" onSubmit={(e) => e.preventDefault()}>
                        <button className="btn" type="button">
                          <span className="far fa-magnifying-glass" />
                        </button>
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search conversations"
                          aria-label="Search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </form>
                    </div>
                  </div>
                  <div className="chat-member-list pr20">
                    {convexUser === undefined ? (
                      <div className="text-center py-4">
                        <div className="spinner-border spinner-border-sm text-success" role="status" />
                      </div>
                    ) : !userId ? (
                      <div className="text-center py-4">
                        <p className="text mb-0">Setting up your account...</p>
                      </div>
                    ) : conversations === null || conversations.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text mb-0">No conversations yet.</p>
                      </div>
                    ) : filteredConversations.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text mb-0">No conversations match your search.</p>
                      </div>
                    ) : (
                      filteredConversations.map((conv) => (
                        <div
                          key={conv._id}
                          className={`list-item pt5 ${selectedConversationId === conv._id ? "active" : ""}`}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSelectConversation(conv._id)}
                        >
                          <UserChatList1
                            data={conv}
                            isSelected={selectedConversationId === conv._id}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {showChatBox && (
            <div className={isMobile ? "col-12" : "col-lg-6 col-xl-7 col-xxl-8"}>
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
    </>
  );
}
