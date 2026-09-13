import { MESSAGE_MAX_LENGTH } from "./messagePolicy.mjs";

const drafts = new Map();
const pending = new Map();
const listeners = new Set();
export const messageDraftKey = (userId, conversationId) => userId && conversationId
  ? `skilllinkup-message:${userId}:${conversationId}` : null;
export function readMessageDraft(key) {
  if (!key) return "";
  if (drafts.has(key)) return drafts.get(key);
  try {
    const value = window.sessionStorage.getItem(key) || "";
    return value.slice(0, MESSAGE_MAX_LENGTH);
  } catch { return ""; }
}
export function writeMessageDraft(key, value) {
  if (!key) return false;
  drafts.set(key, value);
  let saved = true;
  try {
    if (value) window.sessionStorage.setItem(key, value);
    else window.sessionStorage.removeItem(key);
  } catch { saved = false; }
  listeners.forEach(listener => listener(key));
  return saved;
}
export const isMessagePending = key => Boolean(key && pending.has(key));
export function subscribeMessageDraft(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
// Reuse the in-flight mutation when the composer remounts in another view.
export function sendMessageDraft(key, content, send) {
  if (key && pending.has(key)) return pending.get(key);
  const task = (async () => send(content))().then(result => {
    if (key && readMessageDraft(key) === content) writeMessageDraft(key, "");
    return result;
  }).finally(() => {
    if (key) pending.delete(key);
    listeners.forEach(listener => listener(key));
  });
  if (key) pending.set(key, task);
  listeners.forEach(listener => listener(key));
  return task;
}
