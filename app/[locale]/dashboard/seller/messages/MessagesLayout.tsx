'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { ConversationList } from '@/components/dashboard/ConversationList';
import { ChatWindow } from '@/components/dashboard/ChatWindow';

interface ActiveConversation {
  id: string;
  otherUserId: string;
  otherUserName: string;
  otherUserImage: string | null;
}

interface MessagesLayoutProps {
  locale: string;
  currentUserId: string;
  pageTitle: string;
  emptyStateText: string;
}

export function MessagesLayout({
  locale,
  currentUserId,
  pageTitle,
  emptyStateText,
}: MessagesLayoutProps) {
  const [activeConversation, setActiveConversation] = useState<ActiveConversation | null>(null);

  function handleSelectConversation(
    id: string,
    otherUserId: string,
    otherUserName: string,
    otherUserImage: string | null
  ) {
    setActiveConversation({ id, otherUserId, otherUserName, otherUserImage });
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden bg-white dark:bg-gray-900">
      {/* Left panel: Conversation list (1/3 width on md+) */}
      <div
        className={[
          'flex-shrink-0 border-r border-gray-200 dark:border-gray-800 overflow-hidden',
          activeConversation
            ? 'hidden md:flex md:flex-col md:w-1/3'
            : 'flex flex-col w-full md:w-1/3',
        ].join(' ')}
      >
        <ConversationList
          locale={locale}
          activeConversationId={activeConversation?.id}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {/* Right panel: Chat window (2/3 width on md+) */}
      <div
        className={[
          'flex-1 overflow-hidden flex flex-col',
          activeConversation ? 'flex' : 'hidden md:flex',
        ].join(' ')}
      >
        {activeConversation ? (
          <ChatWindow
            conversationId={activeConversation.id}
            currentUserId={currentUserId}
            otherUserName={activeConversation.otherUserName}
            otherUserImage={activeConversation.otherUserImage}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <MessageSquare size={28} className="text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
              {emptyStateText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
