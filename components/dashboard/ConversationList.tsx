'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Search, MessageSquare } from 'lucide-react';

interface OtherUser {
  id: string;
  name: string;
  image: string | null;
}

interface Conversation {
  id: string;
  orderId: string | null;
  projectId: string | null;
  participant1: string;
  participant2: string;
  lastMessageAt: string | null;
  lastMessagePreview: string | null;
  unreadCount: number;
  status: string;
  createdAt: string;
  otherUser: OtherUser;
}

interface ConversationListProps {
  locale: string;
  activeConversationId?: string;
  onSelectConversation: (
    id: string,
    otherUserId: string,
    otherUserName: string,
    otherUserImage: string | null
  ) => void;
}

function formatTime(dateStr: string | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString([], { weekday: 'short' });
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
}

function Avatar({ name, image, size = 10 }: { name: string; image: string | null; size?: number }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={`w-${size} h-${size} rounded-full object-cover flex-shrink-0`}
      />
    );
  }

  return (
    <div
      className={`w-${size} h-${size} rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0`}
    >
      <span className="text-primary text-sm font-semibold">{initials}</span>
    </div>
  );
}

export function ConversationList({
  locale,
  activeConversationId,
  onSelectConversation,
}: ConversationListProps) {
  const t = useTranslations('messages');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch('/api/messages/conversations', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json() as { conversations: Conversation[] };
      setConversations(data.conversations ?? []);
    } catch {
      // silently ignore network errors during polling
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Poll every 4 seconds
  useEffect(() => {
    const interval = setInterval(fetchConversations, 4000);
    return () => clearInterval(interval);
  }, [fetchConversations]);

  const filtered = conversations.filter((c) =>
    c.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.lastMessagePreview ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3">
          {t('title')}
        </h2>
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchConversations')}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent rounded-lg focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-colors"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {searchQuery ? 'No results found' : t('noConversations')}
            </p>
            {!searchQuery && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {t('noConversationsDesc')}
              </p>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((conv) => {
              const isActive = conv.id === activeConversationId;
              const hasUnread = conv.unreadCount > 0;

              return (
                <li key={conv.id}>
                  <button
                    onClick={() =>
                      onSelectConversation(
                        conv.id,
                        conv.otherUser.id,
                        conv.otherUser.name,
                        conv.otherUser.image
                      )
                    }
                    className={[
                      'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors',
                      isActive
                        ? 'bg-primary/5 dark:bg-primary/10'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800',
                    ].join(' ')}
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0 mt-0.5">
                      <Avatar name={conv.otherUser.name} image={conv.otherUser.image} size={10} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={[
                            'text-sm truncate',
                            hasUnread
                              ? 'font-semibold text-gray-900 dark:text-white'
                              : 'font-medium text-gray-700 dark:text-gray-300',
                          ].join(' ')}
                        >
                          {conv.otherUser.name}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
                          {formatTime(conv.lastMessageAt)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <p
                          className={[
                            'text-xs truncate',
                            hasUnread
                              ? 'text-gray-700 dark:text-gray-300'
                              : 'text-gray-400 dark:text-gray-500',
                          ].join(' ')}
                        >
                          {conv.lastMessagePreview ?? ''}
                        </p>
                        {hasUnread && (
                          <span className="flex-shrink-0 min-w-[20px] h-5 flex items-center justify-center bg-primary text-white text-xs font-bold rounded-full px-1.5">
                            {conv.unreadCount > 99 ? '99+' : conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
