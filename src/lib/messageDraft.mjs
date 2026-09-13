import { MESSAGE_MAX_LENGTH } from "./messagePolicy.mjs";

const drafts = new Map();
const pending = new Map();
const attempts = new Map();
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
  let attempt = key ? attempts.get(key) : null;
  if (key && !attempt) {
    try { attempt = JSON.parse(window.sessionStorage.getItem(`${key}:attempt`)); } catch { /* Memory fallback below. */ }
  }
  if (!attempt || attempt.content !== content || typeof attempt.id !== "string") {
    attempt = { id: crypto.randomUUID(), content };
  }
  if (key) {
    attempts.set(key, attempt);
    // Persist before sending so a reload can reuse the same request identifier.
    try { window.sessionStorage.setItem(`${key}:attempt`, JSON.stringify(attempt)); } catch { /* The composer already warns about unavailable storage. */ }
  }
  const task = (async () => send(content, attempt.id))().then(result => {
    if (key && readMessageDraft(key) === content) writeMessageDraft(key, "");
    if (key && attempts.get(key)?.id === attempt.id) {
      attempts.delete(key);
      try { window.sessionStorage.removeItem(`${key}:attempt`); } catch { /* Memory was cleared. */ }
    }
    return result;
  }).finally(() => {
    if (key) pending.delete(key);
    listeners.forEach(listener => listener(key));
  });
  if (key) pending.set(key, task);
  listeners.forEach(listener => listener(key));
  return task;
}
