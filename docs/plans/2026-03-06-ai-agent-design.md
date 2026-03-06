# AI Agent Design

**Goal:** Two AI features powered by `@convex-dev/agent` + Claude Haiku 4.5: a gig description generator at `/add-services`, and an AI assistant tab in the messaging system.

**Architecture:** `@convex-dev/agent` registered as a Convex component. Two agents defined in `convex/ai/agents.ts`. Gig generator is one-shot (no thread). Chat assistant uses persistent threads per conversation, with the last 5 real messages injected as context. A small `aiThreads` table maps `conversationId → threadId`.

**Tech Stack:** `@convex-dev/agent`, `@ai-sdk/anthropic`, `claude-haiku-4-5-20251001`, Next.js 15, Convex mutations/actions/queries.

---

## Feature 1: Gig Description Generator

### UI
Button "Generate with AI ✨" below the description textarea in `AddServiceInfo.jsx`. While loading: button disabled + spinner. On success: textarea fills with generated text (user can edit freely).

### Convex action
```typescript
// convex/ai/actions.ts
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
```

### Agent definition
```typescript
export const gigDescriptionAgent = new Agent(components.agent, {
  name: "Gig Description Generator",
  languageModel: anthropic("claude-haiku-4-5-20251001"),
  instructions: `You are an expert marketplace copywriter for SkillLinkup, a freelance platform.
Write professional, compelling gig descriptions in English (150-250 words).
Structure: 1 hook sentence, 3-4 bullet points of what the client gets, 1 closing CTA.
Do NOT include pricing. Do NOT use first person ("I"). Write in second person about what the client receives.`,
});
```

---

## Feature 2: AI Chat Assistant

### UI
`MessageBox.jsx` gets a tab bar: **[Chat] [AI Assistant]**. Clicking "AI Assistant" renders `AiAssistantPanel.jsx` in place of the message thread. The panel shows:
- A short intro: "I have context of your conversation. Ask me anything."
- Chat history of AI conversation (stored in agent thread)
- Input field + Send button

### Schema addition
```typescript
// convex/schema.ts
aiThreads: defineTable({
  conversationId: v.id("conversations"),
  threadId: v.string(),
  createdAt: v.number(),
}).index("by_conversation", ["conversationId"]),
```

### Convex functions
```typescript
// convex/ai/actions.ts

// Get or create a persistent thread for this conversation
export const getOrCreateAiThread = mutation({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, { conversationId }) => {
    const existing = await ctx.db
      .query("aiThreads")
      .withIndex("by_conversation", q => q.eq("conversationId", conversationId))
      .first();
    if (existing) return existing.threadId;

    const { threadId } = await chatAssistantAgent.createThread(ctx, {});
    await ctx.db.insert("aiThreads", { conversationId, threadId, createdAt: Date.now() });
    return threadId;
  },
});

// Send a message to the AI assistant
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
      .map(m => `${m.senderName}: ${m.content}`)
      .join("\n");

    const { thread } = await chatAssistantAgent.continueThread(ctx, { threadId });
    const result = await thread.generateText({
      prompt: message,
      system: `Current conversation context (last 5 messages):\n${contextBlock}`,
    });
    return result.text;
  },
});

// List AI thread messages (for displaying history)
export const listAiMessages = query({
  args: { threadId: v.string() },
  handler: async (ctx, { threadId }) => {
    return await listMessages(ctx, components.agent, { threadId, limit: 50 });
  },
});
```

### Agent definition
```typescript
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

### AiAssistantPanel component
```jsx
"use client";
// src/components/dashboard/element/AiAssistantPanel.jsx
// Props: conversationId
// State: messages[], input, isLoading, threadId
// On mount: calls getOrCreateAiThread mutation → stores threadId
// On send: calls askChatAssistant action → appends response to messages
// Renders: scrollable message list + input box
```

---

## Files to create / modify

| File | Change |
|------|--------|
| `convex/convex.config.ts` | Create — register agent component |
| `convex/ai/agents.ts` | Create — define both agents |
| `convex/ai/actions.ts` | Create — generateGigDescription, getOrCreateAiThread, askChatAssistant, listAiMessages |
| `convex/schema.ts` | Add `aiThreads` table |
| `convex/chat/messages.ts` | Add `getRecentForAi` internal query |
| `src/components/dashboard/element/AiAssistantPanel.jsx` | Create — AI chat panel |
| `src/components/dashboard/element/MessageBox.jsx` | Add Chat/AI tab switcher |
| `src/components/dashboard/section/AddServiceInfo.jsx` | Add "Generate with AI" button |

---

## Install

```bash
npm install @convex-dev/agent @ai-sdk/anthropic
```

Add to `.env.local` (already present): `ANTHROPIC_API_KEY=sk-ant-...`
