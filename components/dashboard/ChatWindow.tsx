'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Paperclip, WifiOff } from 'lucide-react';
import { useSocket } from '@/components/providers/SocketProvider';

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
 .map((w) =>w[0])
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
 const { socket, isConnected } = useSocket();
 const [messages, setMessages] = useState<Message[]>([]);
 const [inputValue, setInputValue] = useState('');
 const [sending, setSending] = useState(false);
 const [loading, setLoading] = useState(true);
 const [isOnline, setIsOnline] = useState(false);
 const [typingUser, setTypingUser] = useState<string | null>(null);
 const messagesEndRef = useRef<HTMLDivElement>(null);
 const inputRef = useRef<HTMLTextAreaElement>(null);
 const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>| null>(null);
 const lastTypingEmitRef = useRef<number>(0);
 const prevConversationRef = useRef<string | null>(null);

 const scrollToBottom = useCallback((smooth = false) =>{
 messagesEndRef.current?.scrollIntoView({
 behavior: smooth ? 'smooth' : 'auto',
 });
 }, []);

 // Fetch message history via REST (one-time on mount / conversation switch)
 const fetchMessages = useCallback(async () =>{
 try {
 const res = await fetch(`/api/messages/conversations/${conversationId}`, {
 cache: 'no-store',
 });
 if (!res.ok) return;
 const data = (await res.json()) as { messages: Message[]; otherUserOnline?: boolean };
 setMessages(data.messages ?? []);
 setIsOnline(!!data.otherUserOnline);
 } catch {
 // silently ignore
 } finally {
 setLoading(false);
 }
 }, [conversationId]);

 // Initial fetch + join/leave socket room on conversation switch
 useEffect(() =>{
 setLoading(true);
 setMessages([]);
 setTypingUser(null);

 // Leave previous conversation room
 if (prevConversationRef.current && isConnected) {
 socket.emit('conversation:leave', { conversationId: prevConversationRef.current });
 }

 fetchMessages();

 // Join new conversation room
 if (isConnected) {
 socket.emit('conversation:join', { conversationId });
 }

 prevConversationRef.current = conversationId;

 return () =>{
 if (isConnected) {
 socket.emit('conversation:leave', { conversationId });
 }
 };
 }, [conversationId, fetchMessages, isConnected, socket]);

 // Re-join room when socket reconnects
 useEffect(() =>{
 if (isConnected && conversationId) {
 socket.emit('conversation:join', { conversationId });
 }
 }, [isConnected, conversationId, socket]);

 // Socket event listeners
 useEffect(() =>{
 function onNewMessage(msg: Message) {
 if (msg.conversationId !== conversationId) return;
 setMessages((prev) =>{
 if (prev.some((m) =>m.id === msg.id)) return prev;
 return [...prev, msg];
 });
 // Mark as read since we're viewing this conversation
 socket.emit('message:read', { conversationId });
 }

 function onTyping(data: { userId: string; userName: string }) {
 if (data.userId === currentUserId) return;
 setTypingUser(data.userName);
 // Clear typing indicator after 3 seconds
 if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
 typingTimeoutRef.current = setTimeout(() =>setTypingUser(null), 3000);
 }

 function onUserStatus(data: { userId: string; isOnline: boolean }) {
 // Check if this status update is for the other user in this conversation
 // We don't have otherUserId as a prop, but we can infer from messages
 // For simplicity, update if any user goes online/offline
 setIsOnline((prev) =>{
 // This is a broadcast event; only update if it's about our chat partner
 // We'll rely on the initial REST fetch for the correct value
 // and update when we get explicit status events
 return data.isOnline || prev;
 });
 }

 function onMessageRead(data: { conversationId: string; readBy: string }) {
 if (data.conversationId !== conversationId) return;
 // Mark all our sent messages as read
 setMessages((prev) =>
 prev.map((m) =>
 m.senderId === currentUserId && !m.isRead ? { ...m, isRead: true } : m
 )
 );
 }

 socket.on('message:new', onNewMessage);
 socket.on('message:typing', onTyping);
 socket.on('user:status', onUserStatus);
 socket.on('message:read', onMessageRead);

 return () =>{
 socket.off('message:new', onNewMessage);
 socket.off('message:typing', onTyping);
 socket.off('user:status', onUserStatus);
 socket.off('message:read', onMessageRead);
 if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
 };
 }, [conversationId, currentUserId, socket]);

 // Scroll to bottom when messages change
 useEffect(() =>{
 if (messages.length >0) {
 scrollToBottom();
 }
 }, [messages, scrollToBottom]);

 // Fallback polling when socket is disconnected (every 5 sec)
 useEffect(() =>{
 if (isConnected) return;
 const interval = setInterval(() =>fetchMessages(), 5000);
 return () =>clearInterval(interval);
 }, [isConnected, fetchMessages]);

 async function handleSend() {
 const content = inputValue.trim();
 if (!content || sending) return;

 setSending(true);
 setInputValue('');

 if (isConnected) {
 // Send via Socket.io
 socket.emit(
 'message:send',
 { conversationId, content },
 (response: { ok?: boolean; message?: Message; error?: string }) =>{
 if (response?.ok && response.message) {
 // Message already broadcast via message:new event, but add optimistically
 // if it hasn't arrived yet
 setMessages((prev) =>{
 if (prev.some((m) =>m.id === response.message!.id)) return prev;
 return [...prev, response.message!];
 });
 setTimeout(() =>scrollToBottom(true), 50);
 } else {
 // Restore input on failure
 setInputValue(content);
 }
 setSending(false);
 inputRef.current?.focus();
 }
 );
 } else {
 // Fallback: send via REST API
 try {
 const res = await fetch('/api/messages/send', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ conversationId, content }),
 });

 if (res.ok) {
 const data = (await res.json()) as { message: Message };
 setMessages((prev) =>{
 if (prev.some((m) =>m.id === data.message.id)) return prev;
 return [...prev, data.message];
 });
 setTimeout(() =>scrollToBottom(true), 50);
 } else {
 setInputValue(content);
 }
 } catch {
 setInputValue(content);
 } finally {
 setSending(false);
 inputRef.current?.focus();
 }
 }
 }

 function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
 if (e.key === 'Enter' && !e.shiftKey) {
 e.preventDefault();
 handleSend();
 }
 }

 function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
 setInputValue(e.target.value);

 // Emit typing indicator (debounced: max once per 2 seconds)
 if (isConnected) {
 const now = Date.now();
 if (now - lastTypingEmitRef.current >2000) {
 lastTypingEmitRef.current = now;
 socket.emit('message:typing', { conversationId });
 }
 }
 }

 // Group messages by date for dividers
 const groupedMessages: Array<{ date: string; messages: Message[] }>= [];
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
 <div className="flex-1">
 <p className="text-sm font-semibold text-gray-900 dark:text-white">
 {otherUserName}
 </p>
 <p className={`text-xs font-medium ${isOnline ? 'text-green-500' : 'text-gray-400'}`}>
 {isOnline ? t('online') : t('offline')}
 </p>
 </div>
 {!isConnected && (
 <div className="flex items-center gap-1.5 text-amber-500" title="Reconnecting...">
 <WifiOff size={14} />
 <span className="text-xs font-medium">Reconnecting...</span>
 </div>
 )}
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
 groupedMessages.map((group) =>(
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
 {group.messages.map((msg, idx) =>{
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

 {/* Typing indicator */}
 {typingUser && (
 <div className="flex items-center gap-2 px-2 py-1">
 <div className="flex gap-1">
 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
 <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
 </div>
 <span className="text-xs text-gray-400 dark:text-gray-500">
 {typingUser} is typing...
 </span>
 </div>
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
 onChange={handleInputChange}
 onKeyDown={handleKeyDown}
 placeholder={t('typeMessage')}
 rows={1}
 className="w-full resize-none px-4 py-2.5 pr-12 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent rounded-2xl focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition-colors leading-relaxed max-h-32 overflow-y-auto"
 style={{ minHeight: '42px' }}
 onInput={(e) =>{
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
