# Auth Guard + Anti-bypass Messaging — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Protect the Contact button with an auth redirect that returns users to the freelancer profile after login, and block contact info (email, phone, URLs) in chat messages to prevent platform bypass.

**Architecture:** Four targeted changes — fix ContactButton redirect URL, add auth check to GigPackageTable links, add client-side regex validation in MessageBox, add server-side ConvexError in the send mutation. No new files.

**Tech Stack:** Next.js 15, React 19, Clerk (useUser, useRouter), Convex (ConvexError), regex.

**Dependency:** Execute AFTER `docs/plans/2026-03-04-services-on-profile-plan.md` — Task 2 modifies GigPackageTable which is added by that plan.

---

## Task 1: Fix ContactButton auth redirect

**Files:**
- Modify: `src/components/ui/ContactButton.jsx`

**Context:** The current redirect goes to `/login` without preserving context. Clerk's sign-in page at `/sign-in` natively supports a `redirect_url` query param — after successful sign-in Clerk follows it automatically. We pass the current pathname so the user lands back on the freelancer profile.

**Step 1: Read the file**

Open `src/components/ui/ContactButton.jsx`. Find lines 17–19:
```js
if (!isSignedIn) {
  router.push("/login");
  return;
}
```

**Step 2: Replace the redirect**

Replace those lines with:
```js
if (!isSignedIn) {
  const returnUrl = typeof window !== "undefined" ? window.location.pathname : "";
  router.push(`/sign-in?redirect_url=${encodeURIComponent(returnUrl)}`);
  return;
}
```

**Step 3: Verify visually**

Open a freelancer profile page while logged out. Click the main Contact button in the profile sidebar. Confirm you are redirected to `/sign-in` (not `/login`). Sign in — confirm you land back on the freelancer profile, not the dashboard.

**Step 4: Commit**

```bash
git add src/components/ui/ContactButton.jsx
git commit -m "fix: preserve return URL in ContactButton auth redirect"
```

---

## Task 2: Add auth guard to GigPackageTable Contact links

**Files:**
- Modify: `src/components/section/FreelancerDetails3.jsx`

**Prerequisite:** The services plan must be implemented first — this task modifies `GigPackageTable` which is added by that plan. If `GigPackageTable` does not exist yet, implement the services plan first.

**Context:** The Contact links inside `GigPackageTable` are plain `<a>` tags that go directly to `/dashboard/messages?...`. They bypass the `ContactButton` auth check. We need to intercept clicks when the user is not signed in.

**Step 1: Add imports at the top of FreelancerDetails3.jsx**

Find the existing imports block. Add `useUser` and ensure `useRouter` is imported:
```js
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
```

(If `useRouter` is already imported, skip that line.)

**Step 2: Add hooks inside `GigPackageTable`**

Find the `GigPackageTable` function definition:
```jsx
function GigPackageTable({ gig, recipientUserId }) {
  const packages = gig.packages;
```

Replace with:
```jsx
function GigPackageTable({ gig, recipientUserId }) {
  const packages = gig.packages;
  const { isSignedIn } = useUser();
  const router = useRouter();

  function handleContactClick(e, href) {
    if (!isSignedIn) {
      e.preventDefault();
      const returnUrl = typeof window !== "undefined" ? window.location.pathname : "";
      router.push(`/sign-in?redirect_url=${encodeURIComponent(returnUrl)}`);
    }
    // signed in: normal link navigation proceeds
  }
```

**Step 3: Add onClick to the Contact anchor**

Find the Contact `<a>` tag inside the CTA row of `GigPackageTable`:
```jsx
<a href={href} className="ud-btn btn-thm btn-sm w-100">
  Contact
  <i className="fal fa-arrow-right-long ms-1" />
</a>
```

Replace with:
```jsx
<a
  href={href}
  className="ud-btn btn-thm btn-sm w-100"
  onClick={(e) => handleContactClick(e, href)}
>
  Contact
  <i className="fal fa-arrow-right-long ms-1" />
</a>
```

**Step 4: Verify visually**

Open a freelancer profile page while logged out. Scroll to the Services section. Click a "Contact" button in the package table. Confirm redirect to `/sign-in?redirect_url=/freelancer/[id]`. Sign in — confirm landing on the freelancer profile.

**Step 5: Commit**

```bash
git add src/components/section/FreelancerDetails3.jsx
git commit -m "fix: add auth guard to GigPackageTable Contact links"
```

---

## Task 3: Add client-side content filtering to MessageBox

**Files:**
- Modify: `src/components/dashboard/element/MessageBox.jsx`

**Context:** `MessageBox` has `inputValue` state and a `handleSend` function. We add a regex check on every input change. If blocked: disable the submit button and show a red error below the input. The server is the real backstop (Task 4) — this is for UX.

**Step 1: Add the regex constant and helper at the top of the file**

After the `"use client";` line and imports, add:
```js
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
```

**Step 2: Add `blockError` derived value**

Inside the `MessageBox` component, after the existing state declarations (`isSending`, `messagesEndRef`), add:
```js
const blockError = inputValue.trim() && containsContactInfo(inputValue) ? BLOCK_ERROR : null;
```

This is a derived value (no useState needed) — it recalculates on every render when `inputValue` changes.

**Step 3: Update the submit button's disabled condition**

Find:
```jsx
disabled={isSending || !inputValue.trim()}
```

Replace with:
```jsx
disabled={isSending || !inputValue.trim() || !!blockError}
```

**Step 4: Add the error message below the input**

Find the closing `</form>` tag in the message input section:
```jsx
            </form>
          </div>
        </div>
```

Replace with:
```jsx
            </form>
            {blockError && (
              <p className="text-danger fz12 mt5 mb0 px10">{blockError}</p>
            )}
          </div>
        </div>
```

**Step 5: Verify visually**

Go to a conversation in `/dashboard/message`. Type `test@gmail.com` in the input. Confirm: red error message appears below the input and the Send button is disabled. Clear the text — error disappears, button re-enables.

Repeat with: `06-12345678`, `https://instagram.com`, `wa.me/316`.

**Step 6: Commit**

```bash
git add src/components/dashboard/element/MessageBox.jsx
git commit -m "feat: client-side content filtering in MessageBox"
```

---

## Task 4: Add server-side content filtering to Convex send mutation

**Files:**
- Modify: `convex/chat/messages.ts`

**Context:** The `send` mutation inserts messages without any content validation. We add the same regex check as a backstop — anyone bypassing the UI (e.g. via Convex dashboard or direct API call) is blocked here. We use `ConvexError` (not plain `Error`) so the client can distinguish it from system errors.

**Step 1: Add the import for ConvexError**

At the top of `convex/chat/messages.ts`, find the existing imports:
```typescript
import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { internal } from "../_generated/api";
```

Add `ConvexError` to the import:
```typescript
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { query, mutation } from "../_generated/server";
import { internal } from "../_generated/api";
```

**Step 2: Add the regex helper after the imports**

After the import block, add:
```typescript
const CONTACT_PATTERNS = [
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  /(\+?\d[\d\s\-().]{6,}\d)/,
  /(https?:\/\/|www\.)/i,
  /(wa\.me|t\.me|telegram|whatsapp|instagram\.com|linkedin\.com)/i,
];

function containsContactInfo(text: string): boolean {
  return CONTACT_PATTERNS.some((p) => p.test(text));
}
```

**Step 3: Add the check inside the `send` mutation handler**

Find this block in the `send` handler (after `const messageType = ...`):
```typescript
    const now = Date.now();
    const messageType = args.messageType ?? "text";

    // Insert the message
    const messageId = await ctx.db.insert("messages", {
```

Insert the content check between those two sections:
```typescript
    const now = Date.now();
    const messageType = args.messageType ?? "text";

    // Block messages containing contact info (anti-bypass)
    if (args.content && containsContactInfo(args.content)) {
      throw new ConvexError("Contactgegevens mogen niet gedeeld worden via de chat. Gebruik het platform voor verdere afspraken.");
    }

    // Insert the message
    const messageId = await ctx.db.insert("messages", {
```

**Step 4: Push to Convex dev**

```bash
npx convex dev --once
```

Expected output: `✔ Convex functions ready!` — no TypeScript errors.

**Step 5: Verify (optional manual test)**

In the browser, open DevTools console on the messages page. Run:
```js
// This would normally be done via the Convex dashboard to test the mutation directly
// Instead: verify via UI that even if someone removes the client-side check, server blocks it
```

The easiest verification: temporarily comment out the `blockError` disabled condition in MessageBox, try sending `test@gmail.com`. Confirm you see a toast error or console error from Convex. Then revert your MessageBox change.

**Step 6: Commit**

```bash
git add convex/chat/messages.ts
git commit -m "feat: server-side content filtering in Convex send mutation"
```

---

## Task 5: Handle ConvexError in MessageBox

**Files:**
- Modify: `src/components/dashboard/element/MessageBox.jsx`

**Context:** When the Convex server throws a `ConvexError`, the error message is available via `err.message` (Convex surfaces it client-side). We need to display this message in the UI instead of just logging it to the console. This closes the loop for any bypass attempts.

**Step 1: Add `sendError` state**

In `MessageBox`, find the existing state declarations:
```js
const [inputValue, setInputValue] = useState("");
const [isSending, setIsSending] = useState(false);
```

Add:
```js
const [inputValue, setInputValue] = useState("");
const [isSending, setIsSending] = useState(false);
const [sendError, setSendError] = useState(null);
```

**Step 2: Update handleSend to capture errors**

Find:
```js
  async function handleSend(e) {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;

    setIsSending(true);
    try {
      await onSend(inputValue);
      setInputValue("");
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setIsSending(false);
    }
  }
```

Replace with:
```js
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
```

Note: Convex surfaces `ConvexError` data via `err.data` on the client.

**Step 3: Show sendError below the input**

Find the `blockError` display we added in Task 3:
```jsx
            {blockError && (
              <p className="text-danger fz12 mt5 mb0 px10">{blockError}</p>
            )}
```

Add `sendError` display right after it:
```jsx
            {blockError && (
              <p className="text-danger fz12 mt5 mb0 px10">{blockError}</p>
            )}
            {sendError && !blockError && (
              <p className="text-danger fz12 mt5 mb0 px10">{sendError}</p>
            )}
```

**Step 4: Clear sendError when input changes**

Find the existing `onChange` handler:
```jsx
onChange={(e) => setInputValue(e.target.value)}
```

Replace with:
```jsx
onChange={(e) => { setInputValue(e.target.value); setSendError(null); }}
```

**Step 5: Verify**

In the browser, go to a conversation. The server-side error from ConvexError (if the client-side check is somehow bypassed) will now show inline in the UI rather than silently failing.

**Step 6: Final commit**

```bash
git add src/components/dashboard/element/MessageBox.jsx
git commit -m "feat: show server-side ConvexError inline in MessageBox"
```
