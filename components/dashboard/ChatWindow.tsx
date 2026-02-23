'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Paperclip } from 'lucide-react';

interface MessageSender {
  name: string;
  image: string | null;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string | null;
  content: string | null;
  messageType: string;
  fileUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  isRead: boolean;
  createdAt: string;
  sender: MessageSender;
}

interface ChatWindowProps {
  conversationId: string;
  currentUserId: string;
  otherUserName: string;
  otherUserImage: string | null;
}

function Avatar({ name, image, size = 8 }: { name: string; image: string | null; size?: number }) {
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
      <span className="text-primary text-xs font-semibold">{initials}</span>
    </div>
  );
}

function formatMessageTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDateDivider(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (msgDate.getTime() === today.getTime()) return 'Today';
  if (msgDate.getTime() === yesterday.getTime()) return 'Yesterday';
  return date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
}

export function ChatWindow({
  conversationId,
  currentUserId,
  otherUserName,
  otherUserImage,
}: ChatWindowProps) {
  const t = useTranslations('messages');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lastMessageIdRef = useRef<string | null>(null);

  const scrollToBottom = useCallback((smooth = false) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  const fetchMessages = useCallback(async (isInitial = false) => {
    try {
      const res = await fetch(`/api/messages/conversations/${conversationId}`, {
        cache: 'no-store',
      });
      if (!res.ok) return;
      const data = await res.json() as { messages: Message[] };
      const newMessages = data.messages ?? [];

      setMessages((prev) => {
        const lastNew = newMessages[newMessages.length - 1];
        if (lastNew && lastNew.id !== lastMessageIdRef.current) {
          lastMessageIdRef.current = lastNew.id;
          return newMessages;
        }
        if (prev.length === 0 && newMessages.length > 0) {
          lastMessageIdRef.current = newMessages[newMessages.length - 1]?.id ?? null;
          return newMessages;
        }
        return prev.length !== newMessages.length ? newMessages : prev;
      });

      if (isInitial) {
        setLoading(false);
      }
    } catch {
      if (isInitial) setLoading(false);
    }
  }, [conversationId]);

  // Initial fetch
  useEffect(() => {
    setLoading(true);
    setMessages([]);
    lastMessageIdRef.current = null;
    fetchMessages(true);
  }, [fetchMessages, conversationId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  // Poll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => fetchMessages(false), 3000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  async function handleSend() {
    const content = inputValue.trim();
    if (!content || sending) return;

    setSending(true);
    setInputValue('');

    try {
      const res = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, content }),
      });

      if (res.ok) {
        const data = await res.json() as { message: Message };
        const newMsg = data.message;
        setMessages((prev) => {
          // Avoid duplicate if poll already picked it up
          if (prev.some((m) => m.id === newMsg.id)) return prev;
          lastMessageIdRef.current = newMsg.id;
          return [...prev, newMsg];
        });
        setTimeout(() => scrollToBottom(true), 50);
      } else {
        // Restore input on failure
        setInputValue(content);
      }
    } catch {
      setInputValue(content);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  // Group messages by date for dividers
  const groupedMessages: Array<{ date: string; messages: Message[] }> = [];
  for (const msg of messages) {
    const dateKey = new Date(msg.createdAt).toDateString();
    const lastGroup = groupedMessages[groupedMessages.length - 1];
    if (lastGroup && lastGroup.date === dateKey) {
      lastGroup.messages.push(msg);
    } else {
      groupedMessages.push({ date: dateKey, messages: [msg] });
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <Avatar name={otherUserName} image={otherUserImage} size={9} />
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {otherUserName}
          </p>
          <p className="text-xs text-green-500 font-medium">{t('online')}</p>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              No messages yet. Send the first message!
            </p>
          </div>
        ) : (
          groupedMessages.map((group) => (
            <div key={group.date}>
              {/* Date divider */}
              <div className="flex items-center gap-3 py-3">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium flex-shrink-0">
                  {formatDateDivider(group.messages[0].createdAt)}
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              {/* Messages in this date group */}
              <div className="space-y-2">
                {group.messages.map((msg, idx) => {
                  const isSent = msg.senderId === currentUserId;
                  const showAvatar =
                    !isSent &&
                    (idx === group.messages.length - 1 ||
                      group.messages[idx + 1]?.senderId !== msg.senderId);

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2 ${isSent ? 'justify-end' : 'justify-start'}`}
                    >
                      {/* Avatar for received messages */}
                      {!isSent && (
                        <div className="w-8 flex-shrink-0">
                          {showAvatar && (
                            <Avatar name={msg.sender.name} image={msg.sender.image} size={8} />
                          )}
                        </div>
                      )}

                      {/* Bubble */}
                      <div
                        className={[
                          'max-w-[70%] rounded-2xl px-4 py-2.5 text-sm',
                          isSent
                            ? 'bg-primary text-white rounded-br-sm'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm',
                        ].join(' ')}
                      >
                        {msg.messageType === 'file' && msg.fileUrl ? (
                          <a
                            href={msg.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 underline ${
                              isSent ? 'text-white/90' : 'text-primary'
                            }`}
                          >
                            <Paperclip size={14} />
                            <span>{msg.fileName ?? 'attachment'}</span>
                          </a>
                        ) : (
                          <p className="whitespace-pre-wrap break-words leading-relaxed">
                            {msg.content}
                          </p>
                        )}
                        <p
                          className={`text-[10px] mt-1 text-right ${
                            isSent ? 'text-white/60' : 'text-gray-400 dark:text-gray-500'
                          }`}
                        >
                          {formatMessageTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('typeMessage')}
              rows={1}
              className="w-full resize-none px-4 py-2.5 pr-12 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-colors leading-relaxed max-h-32 overflow-y-auto"
              style={{ minHeight: '42px' }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = 'auto';
                el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
              }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || sending}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label={t('send')}
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 pl-1">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
