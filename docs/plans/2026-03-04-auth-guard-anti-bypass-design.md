# Auth Guard + Anti-bypass Messaging — Design Document

**Date**: 2026-03-04
**Status**: Approved
**Scope**: Contact button auth guard on freelancer profile + content filtering in chat to prevent platform bypass

---

## Overview

Two related features that protect the platform's commission model:

1. **Auth Guard** — The Contact button on a freelancer's public profile redirects unauthenticated users to sign-in, then returns them to the freelancer profile after login.
2. **Anti-bypass Content Filtering** — Chat messages are validated both client-side (instant UX) and server-side (Convex backstop) to block sharing of contact details (email, phone, URLs, social handles).

---

## Feature 1: Auth Guard on Contact Button

### Current State
`src/components/ui/ContactButton.jsx` already checks `isSignedIn` and does `router.push("/login")` — but without preserving the freelancer profile URL, so the user lands on the generic dashboard after login.

### New Behavior

1. User clicks "Contact" on `/freelancer/[id]`
2. **Not signed in** → redirect to `/sign-in?redirect_url=/freelancer/[id]`
3. Clerk redirects back to `/freelancer/[id]` after successful sign-in
4. **Signed in** → normal flow to `/dashboard/messages?recipientId=...&subject=...`

### Implementation

**File**: `src/components/ui/ContactButton.jsx`

Change the unauthenticated redirect from:
```js
router.push("/login");
```
to:
```js
const returnUrl = typeof window !== "undefined" ? window.location.pathname : "";
router.push(`/sign-in?redirect_url=${encodeURIComponent(returnUrl)}`);
```

**File**: `src/components/section/FreelancerDetails3.jsx` (`GigPackageTable`)

The Contact `<a>` tag is a plain anchor — needs to become a button/component that checks auth before navigating.

Replace the static `<a href={href}>` with a `<ContactButton>` component (or inline the auth check) so unauthenticated clicks are intercepted.

---

## Feature 2: Anti-bypass Content Filtering

### Blocked Patterns

| Type | Regex |
|------|-------|
| Email | `/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/` |
| Phone | `/(\+?\d[\d\s\-().]{6,}\d)/` |
| URL | `/(https?:\/\/|www\.)/i` |
| Social/app | `/(wa\.me|t\.me|telegram|whatsapp|instagram\.com|linkedin\.com)/i` |

### Error Message (shown to user)
> "Contactgegevens mogen niet gedeeld worden via de chat. Gebruik de betalingsfunctie voor verdere afspraken."

### Client-side (MessageInput component)

**File**: Find the message input component in `src/components/dashboard/message/` or equivalent.

- On every input change: run regex check
- If match: disable submit button + show red error message below input
- If no match: normal state

### Server-side (Convex backstop)

**File**: `convex/chat/messages.ts` — `send` mutation

- Run same regex check on `body` arg before inserting
- If match: `throw new ConvexError("Contactgegevens mogen niet gedeeld worden via de chat.")`
- UI catches `ConvexError` and displays the message

---

## Data Flow

```
Auth Guard:
ContactButton (not signed in)
  → router.push("/sign-in?redirect_url=/freelancer/[id]")
  → Clerk sign-in
  → redirect back to /freelancer/[id]
  → user clicks Contact again → signed in → /dashboard/messages

Content Filtering:
User types in MessageInput
  → client regex → submit disabled (instant UX)
  ↓ (bypass via direct API call)
  Convex send mutation → server regex → ConvexError → UI error toast/message
```

---

## Technical Notes

- Clerk's sign-in page at `/sign-in` supports `redirect_url` query param natively
- `ContactButton.jsx` already has `useAuth` imported — minimal change needed
- The `GigPackageTable` Contact link in `FreelancerDetails3.jsx` uses a plain `<a>` — needs to be upgraded to use `ContactButton` or an equivalent auth-aware component
- Content filtering helper can be a pure function exported from a shared util file so client and server use identical logic
- No database changes needed

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/ui/ContactButton.jsx` | Add `redirect_url` with current pathname to login redirect |
| `src/components/section/FreelancerDetails3.jsx` | Replace `<a href>` Contact links with auth-aware ContactButton |
| `convex/chat/messages.ts` | Add regex validation before insert in `send` mutation |
| `src/components/dashboard/message/` (input component) | Add client-side regex check + error state |
