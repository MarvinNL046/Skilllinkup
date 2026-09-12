"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import useConvexUser from "@/hook/useConvexUser";
import useConvexMessages from "@/hook/useConvexMessages";
import useRequestedConversation from "@/hook/useRequestedConversation";
import DashboardNavigation from "../header/DashboardNavigation";
import UserChatList1 from "../card/UserChatList1";
import MessageBox from "../element/MessageBox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export default function MessageInfo() {
  const t = useTranslations("messages");
  const { convexUser } = useConvexUser();
  const userId = convexUser?._id;
  const isMobile = useIsMobile();
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestedConversation = searchParams.get("conversation");

  const {
    conversations: recentConversations,
    messages,
    selectedConversationId,
    setSelectedConversationId,
    sendMessage,
    messageStatus,
    loadOlder,
    readError,
    retryRead,
    conversationsLoading,
  } = useConvexMessages(userId, !isMobile || mobileShowChat);

  const { conversations, requestedLoading, requestedError, retryRequested } =
    useRequestedConversation(userId, requestedConversation, recentConversations, conversationsLoading);

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
    (c) => c._id === selectedConversationId,
  );

  const requestedAvailable = conversations.some((item) => item._id === requestedConversation);
  useEffect(() => {
    if (!requestedConversation || !requestedAvailable) return;
    setSelectedConversationId(requestedConversation);
    setMobileShowChat(true);
  }, [requestedConversation, requestedAvailable, userId, setSelectedConversationId]);

  async function handleSelectConversation(conversationId) {
    setSelectedConversationId(conversationId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("conversation", conversationId);
    router.replace(`/message?${params.toString()}`, { scroll: false });
    if (isMobile) setMobileShowChat(true);
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
    <div className="flex flex-col h-full">
      <DashboardNavigation />
      {requestedLoading && <p role="status" className="p-4 text-sm">Opening conversation…</p>}
      {requestedError && (
        <div role="alert" className="mb-4 rounded-lg border p-4">
          <p>This conversation could not be opened. It may be unavailable, or you may need to sign in with a different account.</p>
          <Button type="button" variant="outline" size="sm" onClick={retryRequested}>Try again</Button>
        </div>
      )}
      <div
        className={cn(
          "messages-2pane grid flex-1 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl overflow-hidden shadow-sm",
          isMobile ? "grid-cols-1" : "grid-cols-[minmax(280px,360px)_1fr]",
        )}
        style={{
          minHeight: "calc(100vh - var(--dash-topbar-h, 64px) - 96px)",
        }}
      >
        {showList && (
          <aside
            className={cn(
              "flex flex-col min-w-0 bg-[var(--bg)]",
              !isMobile && "border-r border-[var(--border-subtle)]",
            )}
          >
            <div className="p-4 px-5 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
              <h1
                className="text-xl font-medium tracking-tight mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("title")}
              </h1>
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
                  aria-hidden="true"
                />
                <Input
                  type="search"
                  placeholder={t("searchConversations")}
                  aria-label={t("searchConversations")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </form>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {convexUser === undefined || conversationsLoading ? (
                <div className="flex justify-center py-8">
                  <div
                    role="status"
                    aria-label="Loading"
                    className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
                  />
                </div>
              ) : !userId ? (
                <p className="text-center text-sm text-[var(--text-tertiary)] py-8 px-4">
                  {t("settingUpAccount")}
                </p>
              ) : conversations === null || conversations.length === 0 ? (
                <div className="text-center py-8 px-4">
                  <p className="text-sm text-[var(--text-tertiary)] mb-4">
                    {t("noConversationsYet")}
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link
                      href={
                        convexUser?.activeRole === "client"
                          ? convexUser.preferredWorld === "local"
                            ? "/local/craftsmen"
                            : "/online/freelancers"
                          : convexUser?.activeRole === "company"
                            ? "/manage-jobs"
                            : convexUser?.activeRole === "candidate"
                              ? "/jobs/browse"
                              : "/online/projects"
                      }
                    >
                      {convexUser?.activeRole === "client"
                        ? "Find professionals"
                        : convexUser?.activeRole === "company"
                          ? "Review vacancies"
                          : convexUser?.activeRole === "candidate"
                            ? "Find jobs"
                            : "Find work"}
                    </Link>
                  </Button>
                </div>
              ) : filteredConversations.length === 0 ? (
                <p className="text-center text-sm text-[var(--text-tertiary)] py-8 px-4">
                  {t("noConversationsMatch")}
                </p>
              ) : (
                <div className="grid gap-0.5">
                  {filteredConversations.map((conv) => {
                    const active = selectedConversationId === conv._id;
                    return (
                      <button
                        key={conv._id}
                        type="button"
                        onClick={() => handleSelectConversation(conv._id)}
                        className={cn(
                          "p-3 rounded-md text-left font-inherit cursor-pointer transition-colors",
                          active
                            ? "bg-primary/10"
                            : "hover:bg-[var(--surface-2)]",
                        )}
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

        {showPanel && !requestedLoading && !requestedError && (
          <div className="flex flex-col min-w-0 min-h-0">
            <MessageBox
              key={selectedConversationId || "empty"}
              messages={messages}
              messageStatus={messageStatus}
              onLoadOlder={loadOlder}
              readError={readError}
              onRetryRead={retryRead}
              currentUserId={userId}
              otherParticipant={selectedConversation?.otherParticipant}
              context={selectedConversation?.context}
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
