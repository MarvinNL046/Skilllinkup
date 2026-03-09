# AI Agent Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add two AI features powered by `@convex-dev/agent` + Claude Haiku 4.5: a gig description generator at `/add-services`, and an AI assistant tab in the messaging system.

**Architecture:** `@convex-dev/agent` registered as a Convex component via `convex/convex.config.ts`. Two agents defined in `convex/ai/agents.ts`. Gig generator is one-shot (no thread). Chat assistant uses persistent threads per conversation, with the last 5 real messages injected as context. A small `aiThreads` table maps `conversationId → threadId`.

**Tech Stack:** `@convex-dev/agent`, `@ai-sdk/anthropic`, `claude-haiku-4-5-20251001`, Next.js 15, Convex mutations/actions/queries.

---

## Task 1: Install packages + register Convex agent component

**Files:**
- Create: `convex/convex.config.ts`
- Modify: `package.json` (via npm install)

**Step 1: Install AI packages**

```bash
cd /home/marvin/Projecten/Skilllinkup
npm install @convex-dev/agent @ai-sdk/anthropic
```

Expected: packages added to node_modules and package.json.

**Step 2: Create `convex/convex.config.ts`**

```typescript
import { defineApp } from "convex/server";
import agent from "@convex-dev/agent/convex";

const app = defineApp();
app.use(agent);

export default app;
```

**Step 3: Run Convex dev to generate the components API**

```bash
npx convex dev --once
```

Expected: `convex/_generated/api.js` (and `.d.ts`) now includes `components.agent`. No TypeScript errors.

**Step 4: Commit**

```bash
git add convex/convex.config.ts package.json package-lock.json
git commit -m "feat: register @convex-dev/agent component in convex.config.ts"
```

---

## Task 2: Add aiThreads table to schema + getRecentForAi internal query

**Files:**
- Modify: `convex/schema.ts` (add aiThreads table at the end)
- Modify: `convex/chat/messages.ts` (add getRecentForAi internal query)

**Step 1: Add `aiThreads` table to schema**

In `convex/schema.ts`, add this block before the closing `});` of `defineSchema`:

```typescript
  // ============================================================
  // AI: THREAD MAPPING
  // ============================================================

  aiThreads: defineTable({
    conversationId: v.id("conversations"),
    threadId: v.string(),
    createdAt: v.number(),
  }).index("by_conversation", ["conversationId"]),
```

**Step 2: Add `getRecentForAi` internal query to `convex/chat/messages.ts`**

At the bottom of `convex/chat/messages.ts`, add (needs `internalQuery` import — add it to the existing destructured import from `"../\_generated/server"`):

```typescript
/**
 * Internal query: fetch last N messages in a conversation for AI context.
 * Returns { content, senderName } pairs only — no auth check (internal use only).
 */
export const getRecentForAi = internalQuery({
  args: {
    conversationId: v.id("conversations"),
    limit: v.number(),
  },
  handler: async (ctx, { conversationId, limit }) => {
    const allMessages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversationId", conversationId)
      )
      .order("desc")
      .take(limit);

    const enriched = await Promise.all(
      allMessages.reverse().map(async (m) => {
        const sender = m.senderId ? await ctx.db.get(m.senderId) : null;
        return {
          content: m.content ?? "",
          senderName: sender?.name ?? "User",
        };
      })
    );

    return enriched;
  },
});
```

The existing import at line 2 of `convex/chat/messages.ts` is:
```typescript
import { query, mutation } from "../_generated/server";
```
Change it to:
```typescript
import { query, mutation, internalQuery } from "../_generated/server";
```

**Step 3: Verify TypeScript compiles**

```bash
npx convex dev --once
```

Expected: No errors. `aiThreads` table appears in generated types.

**Step 4: Commit**

```bash
git add convex/schema.ts convex/chat/messages.ts
git commit -m "feat: add aiThreads table and getRecentForAi internal query"
```

---

## Task 3: Create convex/ai/agents.ts

**Files:**
- Create: `convex/ai/agents.ts`

**Step 1: Create the agents file**

```typescript
import { Agent } from "@convex-dev/agent";
import { components } from "../_generated/api";
import { anthropic } from "@ai-sdk/anthropic";

export const gigDescriptionAgent = new Agent(components.agent, {
  name: "Gig Description Generator",
  languageModel: anthropic("claude-haiku-4-5-20251001"),
  instructions: `You are an expert marketplace copywriter for SkillLinkup, a freelance platform.
Write professional, compelling gig descriptions in English (150-250 words).
Structure: 1 hook sentence, 3-4 bullet points of what the client gets, 1 closing CTA.
Do NOT include pricing. Do NOT use first person ("I"). Write in second person about what the client receives.`,
});

export const chatAssistantAgent = new Agent(components.agent, {
  name: "Chat Assistant",
  languageModel: anthropic("claude-haiku-4-5-20251001"),
  instructions: `You are a helpful assistant for SkillLinkup, a freelance marketplace.
You help freelancers and clients with:
- Writing professional quotes and proposals
- Answering questions about projects and deliverables
- Communication advice between freelancer and client
- Estimating project scope and timelines

Be concise, friendly, and professional. Respond in the same language as the user (Dutch or English).`,
});
```

**Step 2: Verify TypeScript compiles**

```bash
npx convex dev --once
```

Expected: No errors. `components.agent` resolves correctly.

**Step 3: Commit**

```bash
git add convex/ai/agents.ts
git commit -m "feat: define gigDescriptionAgent and chatAssistantAgent"
```

---

## Task 4: Create convex/ai/actions.ts

**Files:**
- Create: `convex/ai/actions.ts`

**Step 1: Create the actions file**

```typescript
import { v } from "convex/values";
import { action, mutation, query } from "../_generated/server";
import { internal } from "../_generated/api";
import { gigDescriptionAgent, chatAssistantAgent } from "./agents";

/**
 * One-shot: generate a gig description from title, category, and tags.
 * No thread — fresh call every time.
 */
export const generateGigDescription = action({
  args: {
    title: v.string(),
    categoryName: v.optional(v.string()),
    tags: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { text } = await gigDescriptionAgent.generateText(ctx, {}, {
      prompt: `Title: ${args.title}\nCategory: ${args.categoryName ?? "General"}\nTags: ${args.tags ?? "none"}\n\nWrite a professional gig description.`,
    });
    return text;
  },
});

/**
 * Get or create a persistent AI thread for this conversation.
 * Stores the mapping in the aiThreads table.
 */
export const getOrCreateAiThread = mutation({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, { conversationId }) => {
    const existing = await ctx.db
      .query("aiThreads")
      .withIndex("by_conversation", (q) =>
        q.eq("conversationId", conversationId)
      )
      .first();
    if (existing) return existing.threadId;

    const { threadId } = await chatAssistantAgent.createThread(ctx, {});
    await ctx.db.insert("aiThreads", {
      conversationId,
      threadId,
      createdAt: Date.now(),
    });
    return threadId;
  },
});

/**
 * Send a message to the AI assistant in the context of a conversation.
 * Fetches the last 5 real messages and injects them as system context.
 */
export const askChatAssistant = action({
  args: {
    threadId: v.string(),
    conversationId: v.id("conversations"),
    message: v.string(),
  },
  handler: async (ctx, { threadId, conversationId, message }) => {
    // Fetch last 5 real messages for context
    const recentMessages = await ctx.runQuery(
      internal.chat.messages.getRecentForAi,
      { conversationId, limit: 5 }
    );
    const contextBlock = recentMessages
      .map((m) => `${m.senderName}: ${m.content}`)
      .join("\n");

    const { thread } = await chatAssistantAgent.continueThread(ctx, { threadId });
    const result = await thread.generateText({
      prompt: message,
      system: contextBlock
        ? `Current conversation context (last 5 messages):\n${contextBlock}`
        : undefined,
    });
    return result.text;
  },
});
```

**Step 2: Verify TypeScript compiles**

```bash
npx convex dev --once
```

Expected: No errors. All three exports (`generateGigDescription`, `getOrCreateAiThread`, `askChatAssistant`) visible in generated API.

**Step 3: Commit**

```bash
git add convex/ai/actions.ts
git commit -m "feat: add generateGigDescription, getOrCreateAiThread, askChatAssistant actions"
```

---

## Task 5: Create AiAssistantPanel.jsx

**Files:**
- Create: `src/components/dashboard/element/AiAssistantPanel.jsx`

**Step 1: Create the component**

```jsx
"use client";
import { useState, useEffect, useRef } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function AiAssistantPanel({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const getOrCreateThread = useMutation(api.ai.actions.getOrCreateAiThread);
  const askAssistant = useAction(api.ai.actions.askChatAssistant);

  // Get or create the AI thread on mount
  useEffect(() => {
    if (!conversationId) return;
    getOrCreateThread({ conversationId })
      .then((id) => setThreadId(id))
      .catch((err) => setError("Could not start AI session: " + err.message));
  }, [conversationId]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || isLoading || !threadId) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const reply = await askAssistant({ threadId, conversationId, message: userMessage });
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setError("AI kon niet antwoorden. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  }

  return (
    <div className="message_container mt30-md">
      <div className="user_heading px-0 mx30">
        <div className="wrap">
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ef2b70, #1e1541)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 20 }}>✨</span>
          </div>
          <div className="meta d-sm-flex justify-content-sm-between align-items-center ml10">
            <div className="authors">
              <h6 className="name mb-0">AI Assistant</h6>
              <p className="preview fz12">I have context of your conversation. Ask me anything.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="inbox_chatting_box">
        <ul className="chatting_content">
          {messages.length === 0 && (
            <li className="text-center py-4">
              <p className="text mb-0 fz14">
                I can help you write proposals, answer questions about the project, or give communication advice.
              </p>
            </li>
          )}
          {messages.map((msg, i) => (
            <li
              key={i}
              className={msg.role === "user" ? "reply float-end" : "sent float-start"}
            >
              {msg.role === "assistant" && (
                <div className="d-flex align-items-center mb15">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ef2b70, #1e1541)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 8,
                      flexShrink: 0,
                      fontSize: 14,
                    }}
                  >
                    ✨
                  </div>
                  <div className="title fz15">AI Assistant</div>
                </div>
              )}
              <p style={{ whiteSpace: "pre-wrap" }}>{msg.content}</p>
            </li>
          ))}
          {isLoading && (
            <li className="sent float-start">
              <p className="text mb-0">
                <span className="spinner-border spinner-border-sm mr5" role="status" />
                Thinking...
              </p>
            </li>
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
              placeholder={threadId ? "Ask the AI assistant..." : "Loading..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading || !threadId}
            />
            <button
              type="submit"
              className="btn ud-btn btn-thm"
              disabled={isLoading || !input.trim() || !threadId}
            >
              {isLoading ? "..." : "Send"}
              <i className="fal fa-arrow-right-long" />
            </button>
          </form>
          {error && (
            <p className="text-danger fz12 mt5 mb0 px10">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify no import errors**

```bash
npx convex dev --once
```

Check that `api.ai.actions.getOrCreateAiThread` and `api.ai.actions.askChatAssistant` exist in the generated types.

**Step 3: Commit**

```bash
git add src/components/dashboard/element/AiAssistantPanel.jsx
git commit -m "feat: create AiAssistantPanel component"
```

---

## Task 6: Update MessageBox.jsx — add conversationId prop + tab switcher

**Files:**
- Modify: `src/components/dashboard/element/MessageBox.jsx`

**Step 1: Add tab switcher to MessageBox**

The component needs:
1. Accept `conversationId` as a new prop
2. Add `activeTab` state (`"chat"` | `"ai"`)
3. Show tab bar when `hasConversation` is true
4. Conditionally render `AiAssistantPanel` or the chat UI

Replace the `export default function MessageBox(...)` signature and add the tab state. The full updated component:

```jsx
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AiAssistantPanel from "./AiAssistantPanel";

const CONTACT_PATTERNS = [
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  /(\+?\d[\d\s\-().]{6,}\d)/,
  /(https?:\/\/|www\.)/i,
  /(wa\.me|t\.me|telegram|whatsapp|instagram\.com|linkedin\.com)/i,
];

function containsContactInfo(text) {
  return CONTACT_PATTERNS.some((p) => p.test(text));
}

const BLOCK_ERROR = "Contactgegevens mogen niet gedeeld worden via de chat. Gebruik het platform voor verdere afspraken.";

export default function MessageBox({
  messages = [],
  currentUserId,
  otherParticipant,
  onSend,
  hasConversation = false,
  conversationId,
}) {
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef(null);
  const blockError = inputValue.trim() && containsContactInfo(inputValue) ? BLOCK_ERROR : null;

  // Reset tab to chat when conversation changes
  useEffect(() => {
    setActiveTab("chat");
  }, [conversationId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
      {/* Tab bar */}
      <div className="d-flex mb0" style={{ borderBottom: "2px solid #f0f0f0" }}>
        <button
          className={`btn px20 py10 fw500 fz14 ${activeTab === "chat" ? "text-thm" : "text-muted"}`}
          style={{
            borderBottom: activeTab === "chat" ? "2px solid #ef2b70" : "2px solid transparent",
            marginBottom: -2,
            borderRadius: 0,
            background: "none",
          }}
          onClick={() => setActiveTab("chat")}
        >
          <i className="fal fa-comment-lines mr5" /> Chat
        </button>
        <button
          className={`btn px20 py10 fw500 fz14 ${activeTab === "ai" ? "text-thm" : "text-muted"}`}
          style={{
            borderBottom: activeTab === "ai" ? "2px solid #ef2b70" : "2px solid transparent",
            marginBottom: -2,
            borderRadius: 0,
            background: "none",
          }}
          onClick={() => setActiveTab("ai")}
        >
          ✨ AI Assistant
        </button>
      </div>

      {activeTab === "ai" && conversationId ? (
        <AiAssistantPanel conversationId={conversationId} />
      ) : (
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
          <div className="inbox_chatting_box">
            <ul className="chatting_content">
              {messages.length === 0 ? (
                <li className="text-center py-4">
                  <p className="text mb-0">No messages yet. Say hello!</p>
                </li>
              ) : (
                messages.map((message) => {
                  const isSent = message.senderId !== currentUserId;
                  const senderName = message.sender?.name || "User";
                  const senderAvatar =
                    message.sender?.image || "/images/resource/user.png";

                  if (isSent) {
                    return (
                      <li key={message._id} className="sent float-start">
                        <div className="d-flex align-items-center mb15">
                          <Image
                            height={50}
                            width={50}
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
                      <li key={message._id} className="reply float-end">
                        <div className="d-flex align-items-center justify-content-end mb15">
                          <div className="title fz15">
                            <small className="mr10">{formatTime(message.createdAt)}</small> You
                          </div>
                          <Image
                            height={50}
                            width={50}
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
      )}
    </>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/dashboard/element/MessageBox.jsx
git commit -m "feat: add Chat/AI Assistant tab switcher to MessageBox"
```

---

## Task 7: Update MessageInfo.jsx — pass conversationId to MessageBox

**Files:**
- Modify: `src/components/dashboard/section/MessageInfo.jsx`

**Step 1: Add `conversationId` prop to the MessageBox usage**

In `MessageInfo.jsx`, find the `<MessageBox ...>` usage (around line 133) and add `conversationId={selectedConversationId}`:

Old:
```jsx
<MessageBox
  messages={messages}
  currentUserId={userId}
  otherParticipant={selectedConversation?.otherParticipant}
  onSend={handleSendMessage}
  hasConversation={!!selectedConversationId}
/>
```

New:
```jsx
<MessageBox
  messages={messages}
  currentUserId={userId}
  otherParticipant={selectedConversation?.otherParticipant}
  onSend={handleSendMessage}
  hasConversation={!!selectedConversationId}
  conversationId={selectedConversationId}
/>
```

**Step 2: Commit**

```bash
git add src/components/dashboard/section/MessageInfo.jsx
git commit -m "feat: pass conversationId to MessageBox for AI assistant"
```

---

## Task 8: Update AddServiceInfo.jsx — add Generate with AI button

**Files:**
- Modify: `src/components/dashboard/section/AddServiceInfo.jsx`

**Step 1: Add imports and state**

At the top of `AddServiceInfo.jsx`, add `useAction` to the convex import and import `api`:
```jsx
import { useMutation, useAction } from "convex/react";
```
(Replace the existing `useMutation` import)

After the `const [saving, setSaving] = useState(false);` lines, add:
```jsx
const [aiLoading, setAiLoading] = useState(false);
```

Add the action hook after the mutation hooks:
```jsx
const generateDescription = useAction(api.ai.actions.generateGigDescription);
```

**Step 2: Add the handler function**

After the `isPkgFilled` function, add:
```jsx
const handleGenerateDescription = async () => {
  if (!title.trim()) {
    setSaveError("Please enter a service title first so the AI has something to work with.");
    return;
  }
  setSaveError(null);
  setAiLoading(true);
  try {
    const selectedCategory = flatCategories.find((c) => c._id === categoryId);
    const text = await generateDescription({
      title: title.trim(),
      categoryName: selectedCategory?.label,
      tags: tags.trim() || undefined,
    });
    setDescription(text);
  } catch (err) {
    setSaveError("AI generation failed. Please try again.");
  } finally {
    setAiLoading(false);
  }
};
```

**Step 3: Add the button below the description textarea**

Find the description textarea block in the JSX (around line 306-318):
```jsx
<div className="col-md-12">
  <div className="mb10">
    <label className="heading-color ff-heading fw500 mb10">
      Service Description
    </label>
    <textarea
      cols={30}
      rows={6}
      placeholder="Describe your service in detail"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </div>
</div>
```

Replace with:
```jsx
<div className="col-md-12">
  <div className="mb10">
    <label className="heading-color ff-heading fw500 mb10">
      Service Description
    </label>
    <textarea
      cols={30}
      rows={6}
      placeholder="Describe your service in detail"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <div className="mt10">
      <button
        type="button"
        className="ud-btn btn-thm2 bdrs8 fz14"
        onClick={handleGenerateDescription}
        disabled={aiLoading || !title.trim()}
        style={{ padding: "8px 18px" }}
      >
        {aiLoading ? (
          <>
            <span className="spinner-border spinner-border-sm mr5" role="status" />
            Generating...
          </>
        ) : (
          "Generate with AI ✨"
        )}
      </button>
      <span className="text fz12 ml10" style={{ color: "#999" }}>
        Fill in the title first, then let AI write a draft you can edit.
      </span>
    </div>
  </div>
</div>
```

**Step 4: Commit**

```bash
git add src/components/dashboard/section/AddServiceInfo.jsx
git commit -m "feat: add Generate with AI button to AddServiceInfo gig description field"
```

---

## Task 9: Deploy Convex + Vercel

**Step 1: Run full build to catch any TypeScript errors**

```bash
npm run build
```

Expected: Build succeeds. Fix any TypeScript or import errors before deploying.

**Step 2: Deploy Convex functions (REQUIRED before Vercel)**

```bash
npx convex deploy -y
```

Expected: All functions deployed including `ai/actions` and the `aiThreads` table migration.

**Step 3: Verify ANTHROPIC_API_KEY is set in Convex dashboard**

The key should already be in `.env.local`. But Convex cloud needs it too. Run:

```bash
npx convex env list
```

If `ANTHROPIC_API_KEY` is missing from the output:
```bash
npx convex env set ANTHROPIC_API_KEY <value-from-.env.local>
```

**Step 4: Deploy to Vercel**

```bash
vercel --prod
```

**Step 5: Smoke test**

1. Go to `/dashboard/messages` → select a conversation → verify **Chat** and **✨ AI Assistant** tabs appear
2. Click **AI Assistant** → ask a question → verify AI responds
3. Go to `/add-services` → enter a title → click **Generate with AI ✨** → verify description fills in
