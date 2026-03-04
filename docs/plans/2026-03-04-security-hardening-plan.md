# Security Hardening — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Eliminate IDOR/privilege vulnerabilities in Convex backend functions, harden Stripe API routes with server-side auth, fix infinite loading states, and remove broken dashboard routes.

**Architecture:** Three layers of fixes: (1) Create a shared Convex auth helper, then apply ownership checks to all affected queries/mutations. (2) Add Clerk `currentUser()` auth to all three Stripe routes so userId is never trusted from the client body. (3) Fix UX bugs: loading state logic, broken CTA links, hydration mismatch.

**Tech Stack:** Next.js 15, Convex, Clerk (`@clerk/nextjs/server`), TypeScript/JavaScript.

---

## Task 1: Create Convex auth helper

**Files:**
- Create: `convex/lib/authHelpers.ts`

**Context:** Multiple Convex functions need to (a) verify the caller is authenticated and (b) verify the caller owns the resource they're requesting. This helper avoids code duplication across 8+ files.

**Step 1: Create the file**

Create `convex/lib/authHelpers.ts`:

```typescript
import { MutationCtx, QueryCtx } from "../_generated/server";
import { Doc } from "../_generated/dataModel";

/**
 * Resolve the authenticated caller to their Convex user doc.
 * Throws if not authenticated or user not found in the database.
 */
export async function requireAuthUser(
  ctx: QueryCtx | MutationCtx
): Promise<Doc<"users">> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Authentication required.");

  const user = await ctx.db
    .query("users")
    .withIndex("by_email", (q) => q.eq("email", identity.email!))
    .first();

  if (!user) throw new Error("User not found.");
  return user;
}

/**
 * Verify the authenticated caller IS the owner of a resource.
 * Throws if not authenticated or if caller's ID !== expectedOwnerId.
 */
export async function requireOwner(
  ctx: QueryCtx | MutationCtx,
  expectedOwnerId: string
): Promise<Doc<"users">> {
  const user = await requireAuthUser(ctx);
  if (user._id !== expectedOwnerId) throw new Error("Unauthorized.");
  return user;
}
```

**Step 2: Verify TypeScript compiles**

```bash
npx convex dev --once
```

Expected: `✔ Convex functions ready!` — no TypeScript errors.

**Step 3: Commit**

```bash
git add convex/lib/authHelpers.ts
git commit -m "feat: add Convex auth helper (requireAuthUser, requireOwner)"
```

---

## Task 2: Harden users.ts — remove email from args

**Files:**
- Modify: `convex/marketplace/users.ts` (or `convex/users.ts`)
- Modify: callers — find them first

**Context:** `setUserType` (line 153) and `setPreferredWorld` (line 204) accept `email: v.string()` from the client to look up and modify the user. Any caller can pass someone else's email and modify their account. Fix: use `requireAuthUser(ctx)` to resolve the caller from their JWT instead of trusting client input.

**Step 1: Find callers of setPreferredWorld**

```bash
grep -r "setPreferredWorld" src/ --include="*.jsx" --include="*.tsx" --include="*.js" -l
```

Note the files returned — you'll update those in Step 4.

**Step 2: Modify `convex/users.ts` — setUserType**

Find:
```typescript
export const setUserType = mutation({
  args: {
    email: v.string(),
    userType: v.string(),
    preferredWorld: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) throw new Error("User not found");
```

Replace with:
```typescript
export const setUserType = mutation({
  args: {
    userType: v.string(),
    preferredWorld: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
```

Add the import at the top of the file:
```typescript
import { requireAuthUser } from "./lib/authHelpers";
```

**Step 3: Modify `convex/users.ts` — setPreferredWorld**

Find:
```typescript
export const setPreferredWorld = mutation({
  args: {
    email: v.string(),
    preferredWorld: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) throw new Error("User not found");
```

Replace with:
```typescript
export const setPreferredWorld = mutation({
  args: {
    preferredWorld: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
```

**Step 4: Update client callers**

In `src/components/dashboard/section/SettingsTab.jsx`, find:
```javascript
await setUserType({ email: convexUser.email, userType: accountType });
```
Replace with:
```javascript
await setUserType({ userType: accountType });
```

For `setPreferredWorld` callers (found in Step 1): remove the `email` field from each call. For example:
```javascript
// Before:
await setPreferredWorld({ email: convexUser.email, preferredWorld: "marketplace" });
// After:
await setPreferredWorld({ preferredWorld: "marketplace" });
```

**Step 5: Push and verify**

```bash
npx convex dev --once
npm run build
```

Expected: both pass without errors.

**Step 6: Commit**

```bash
git add convex/users.ts
git add -A src/
git commit -m "fix: remove email arg from setUserType/setPreferredWorld, use identity instead"
```

---

## Task 3: Harden orders.ts, projects.ts, jobs.ts — ownership checks on private queries

**Files:**
- Modify: `convex/marketplace/orders.ts`
- Modify: `convex/marketplace/projects.ts`
- Modify: `convex/marketplace/jobs.ts`

**Context:** `orders.getByUser` (line 207), `projects.getByClient` (line 168), and `jobs.getByClient` (line 94) each accept a `userId`/`clientId` from the client and return that user's private data without verifying the caller owns that ID. Fix: add `requireOwner` at the start of each handler.

**Step 1: Add import to each file**

At the top of each file, add:
```typescript
import { requireOwner } from "../lib/authHelpers";
```

**Step 2: Harden `orders.getByUser`**

Find in `convex/marketplace/orders.ts` (around line 213):
```typescript
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
```

Replace with:
```typescript
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.userId);
    const limit = args.limit ?? 20;
```

**Step 3: Harden `projects.getByClient`**

Find in `convex/marketplace/projects.ts` (around line 173):
```typescript
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
```

Replace with:
```typescript
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.clientId);
    const limit = args.limit ?? 50;
```

**Step 4: Harden `jobs.getByClient`**

Find in `convex/marketplace/jobs.ts` (around line 99):
```typescript
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
```

Replace with:
```typescript
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.clientId);
    const limit = args.limit ?? 50;
```

**Step 5: Push and verify**

```bash
npx convex dev --once
```

Expected: no errors.

**Step 6: Commit**

```bash
git add convex/marketplace/orders.ts convex/marketplace/projects.ts convex/marketplace/jobs.ts
git commit -m "fix: add ownership checks to orders/projects/jobs private queries"
```

---

## Task 4: Harden savedItems.ts — remove userId from args, get from identity

**Files:**
- Modify: `convex/marketplace/savedItems.ts`
- Modify: `src/components/dashboard/section/SavedInfo.jsx`
- Modify: `src/components/element/SaveButton.jsx`

**Context:** All saved items functions accept `userId` from the client. This allows any authenticated user to read or modify someone else's saved items. Fix: remove `userId` from args and resolve it from the caller's JWT.

**Step 1: Add import to savedItems.ts**

```typescript
import { requireAuthUser } from "../lib/authHelpers";
```

**Step 2: Rewrite `savedItems.list`**

Find:
```typescript
export const list = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("savedItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
    return items;
  },
});
```

Replace with:
```typescript
export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireAuthUser(ctx);
    const items = await ctx.db
      .query("savedItems")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
    return items;
  },
});
```

**Step 3: Rewrite `savedItems.isSaved`**

Find:
```typescript
export const isSaved = query({
  args: {
    userId: v.id("users"),
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("savedItems")
      .withIndex("by_user_item", (q) =>
        q.eq("userId", args.userId).eq("itemId", args.itemId)
      )
      .first();
    return existing !== null;
  },
});
```

Replace with:
```typescript
export const isSaved = query({
  args: {
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false; // not logged in = not saved

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) return false;

    const existing = await ctx.db
      .query("savedItems")
      .withIndex("by_user_item", (q) =>
        q.eq("userId", user._id).eq("itemId", args.itemId)
      )
      .first();
    return existing !== null;
  },
});
```

**Step 4: Rewrite `savedItems.save`**

Find:
```typescript
export const save = mutation({
  args: {
    userId: v.id("users"),
    itemType: v.string(),
    itemId: v.string(),
    itemTitle: v.optional(v.string()),
    itemImage: v.optional(v.string()),
    itemUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("savedItems")
      .withIndex("by_user_item", (q) =>
        q.eq("userId", args.userId).eq("itemId", args.itemId)
      )
      .first();

    if (existing) return existing._id;

    const id = await ctx.db.insert("savedItems", {
      userId: args.userId,
```

Replace with:
```typescript
export const save = mutation({
  args: {
    itemType: v.string(),
    itemId: v.string(),
    itemTitle: v.optional(v.string()),
    itemImage: v.optional(v.string()),
    itemUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const userId = user._id;

    const existing = await ctx.db
      .query("savedItems")
      .withIndex("by_user_item", (q) =>
        q.eq("userId", userId).eq("itemId", args.itemId)
      )
      .first();

    if (existing) return existing._id;

    const id = await ctx.db.insert("savedItems", {
      userId,
```

**Step 5: Rewrite `savedItems.remove`**

Read the current `remove` function (lines ~82-101). It likely takes `{ userId, itemId }`. Replace with:
```typescript
export const remove = mutation({
  args: {
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);

    const existing = await ctx.db
      .query("savedItems")
      .withIndex("by_user_item", (q) =>
        q.eq("userId", user._id).eq("itemId", args.itemId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});
```

**Step 6: Update `SavedInfo.jsx`**

Find the call to `savedItems.list`:
```javascript
convexUser?._id ? { userId: convexUser._id } : "skip"
```
Replace with:
```javascript
convexUser?._id ? {} : "skip"
```

Find any call to `savedItems.remove` that includes `userId`. Remove `userId` from the args object.

**Step 7: Update `SaveButton.jsx`**

Find the call to `savedItems.isSaved`:
```javascript
{ userId, itemId: String(itemId) }
```
Replace with:
```javascript
{ itemId: String(itemId) }
```

Find the call to `savedItems.save` and remove `userId` from args.
Find the call to `savedItems.remove` and remove `userId` from args.

**Step 8: Push and verify**

```bash
npx convex dev --once
npm run build
```

Expected: both pass.

**Step 9: Commit**

```bash
git add convex/marketplace/savedItems.ts src/components/dashboard/section/SavedInfo.jsx src/components/element/SaveButton.jsx
git commit -m "fix: remove userId from savedItems args, resolve from identity"
```

---

## Task 5: Harden notifications.ts — make create internal, add ownership checks

**Files:**
- Modify: `convex/marketplace/notifications.ts`
- Modify: any Convex files that call `api.marketplace.notifications.create`

**Context:** `notifications.create` (line 47) is a public mutation — any authenticated user can create a notification for any other user (spam/harassment). It should be `internalMutation` since notifications are side effects of other server operations.

Additionally, `list`, `getUnreadCount`, and `markRead` accept `userId` from the client without ownership checks.

**Step 1: Find all callers of notifications.create**

```bash
grep -r "notifications.create\|notifications\.create" convex/ --include="*.ts" -l
```

Note the files. They will need to import `internal` and use `internal.marketplace.notifications.create` instead of `api.marketplace.notifications.create`. If no callers exist (only from client), skip step 3.

**Step 2: Add imports to notifications.ts**

```typescript
import { v } from "convex/values";
import { query, internalMutation, mutation } from "../_generated/server";
import { requireAuthUser, requireOwner } from "../lib/authHelpers";
```

**Step 3: Change `create` to `internalMutation`**

Find:
```typescript
export const create = mutation({
```
Replace with:
```typescript
export const create = internalMutation({
```

**Step 4: Update any callers of notifications.create in other Convex files**

For each file found in Step 1, change:
```typescript
await ctx.runMutation(api.marketplace.notifications.create, {...});
// or
await ctx.scheduler.runAfter(0, api.marketplace.notifications.create, {...});
```
to:
```typescript
await ctx.runMutation(internal.marketplace.notifications.create, {...});
// or
await ctx.scheduler.runAfter(0, internal.marketplace.notifications.create, {...});
```

Also add `import { internal } from "../_generated/api";` to those files if not already present.

**Step 5: Add ownership check to `list`**

Find:
```typescript
export const list = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
```

Replace start of handler:
```typescript
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.userId);
    const limit = args.limit ?? 20;
```

**Step 6: Add ownership check to `getUnreadCount`**

Find:
```typescript
export const getUnreadCount = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const unread = await ctx.db
```

Replace start of handler:
```typescript
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.userId);
    const unread = await ctx.db
```

**Step 7: Add ownership check to `markRead`**

Find (around line 75):
```typescript
export const markRead = mutation({
  args: {
    notificationId: v.id("notifications"),
  },
  handler: async (ctx, args) => {
    const notification = await ctx.db.get(args.notificationId);
```

Replace handler start:
```typescript
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const notification = await ctx.db.get(args.notificationId);
    if (!notification) throw new Error("Notification not found.");
    if (notification.userId !== user._id) throw new Error("Unauthorized.");
```

**Step 8: Push and verify**

```bash
npx convex dev --once
```

Expected: no errors. If there are errors about callers of `notifications.create`, fix them in Step 4.

**Step 9: Commit**

```bash
git add convex/marketplace/notifications.ts
git commit -m "fix: make notifications.create internal, add ownership checks to list/getUnreadCount/markRead"
```

---

## Task 6: Fix reviews.ts — filter isPublic for non-owners

**Files:**
- Modify: `convex/marketplace/reviews.ts`

**Context:** `getByUserId` (line 58) returns both `isPublic: true` and `isPublic: false` reviews (blind review system — reviews are private until both parties submit). A user visiting someone's public profile can currently see their pending/private reviews. Fix: only return `isPublic: true` reviews to callers who are not the reviewee.

**Step 1: Add import**

In `convex/marketplace/reviews.ts`, add at top:
```typescript
import { requireAuthUser } from "../lib/authHelpers";
```

(Only if the import doesn't already exist.)

**Step 2: Modify `getByUserId` handler**

Find the handler for `getByUserId` (around line 63):
```typescript
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    const reviews = await ctx.db
      .query("marketplaceReviews")
      .withIndex("by_reviewee", (q) => q.eq("revieweeId", args.userId))
      .collect();

    const sorted = reviews
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
```

Replace with:
```typescript
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    const allReviews = await ctx.db
      .query("marketplaceReviews")
      .withIndex("by_reviewee", (q) => q.eq("revieweeId", args.userId))
      .collect();

    // Only the reviewee themselves can see pending (isPublic: false) reviews.
    // Everyone else only sees published reviews.
    const identity = await ctx.auth.getUserIdentity();
    let isOwner = false;
    if (identity) {
      const caller = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", identity.email!))
        .first();
      isOwner = caller?._id === args.userId;
    }

    const reviews = isOwner
      ? allReviews
      : allReviews.filter((r) => r.isPublic !== false);

    const sorted = reviews
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
```

**Step 3: Push and verify**

```bash
npx convex dev --once
```

**Step 4: Commit**

```bash
git add convex/marketplace/reviews.ts
git commit -m "fix: filter pending reviews in getByUserId for non-owners"
```

---

## Task 7: Harden Stripe routes — add Clerk server-side auth

**Files:**
- Modify: `src/app/api/stripe/connect/route.js`
- Modify: `src/app/api/stripe/checkout/route.js`
- Modify: `src/app/api/stripe/credits/route.js`

**Context:** All three Stripe routes accept `userId`/`freelancerUserId` from the request body without verifying the caller is who they claim to be. A user could pass someone else's ID. Fix: use Clerk's `currentUser()` (server-side) to verify identity and get email/userId from Clerk, ignoring the client-provided value.

**Step 1: Read each route file fully** before making changes.

**Step 2: Harden `connect/route.js`**

Add Clerk import at the top:
```javascript
import { currentUser } from "@clerk/nextjs/server";
```

At the START of the `POST` handler (after the `if (!stripe)` guard), add:
```javascript
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const verifiedEmail = clerkUser.emailAddresses[0]?.emailAddress;
  if (!verifiedEmail) {
    return NextResponse.json({ error: "No verified email on account" }, { status: 401 });
  }
```

Then, where the route reads `freelancerUserId` from `body` and later uses it to call Convex: look up the Convex user by `verifiedEmail` server-side instead of using the client-provided ID. The Convex HTTP client already exists in this file — use it to call `api.users.getByEmail` (or whichever public query exists for email lookup). The exact implementation depends on what Convex queries are available; if no email lookup exists, add one.

Simplest approach that works without a new Convex query: ignore the `freelancerUserId` from body and look it up via email. If no `getByEmail` query exists, add:

In `convex/users.ts` (read first to check if it exists), add if missing:
```typescript
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});
```

Then in the connect route, replace:
```javascript
const { freelancerUserId } = body;
```
with:
```javascript
// Ignore client-provided userId — resolve from Clerk server-side
const convexUser = await convex.query(api.users.getByEmail, { email: verifiedEmail });
if (!convexUser) {
  return NextResponse.json({ error: "User not found in database" }, { status: 404 });
}
const freelancerUserId = convexUser._id;
```

**Step 3: Harden `checkout/route.js`**

Add Clerk import:
```javascript
import { currentUser } from "@clerk/nextjs/server";
```

After the `if (!stripe)` guard, add:
```javascript
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
```

The checkout route probably takes `gigId`/`packageId` (those are fine from client) but also `freelancerUserId` (the buyer's ID). Replace the buyer's ID lookup with the Clerk-verified user, similar to Step 2.

**Step 4: Harden `credits/route.js`**

Add Clerk import:
```javascript
import { currentUser } from "@clerk/nextjs/server";
```

After the `if (!stripe)` guard, add:
```javascript
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const verifiedEmail = clerkUser.emailAddresses[0]?.emailAddress;
```

Remove `freelancerUserId` from the body destructuring and resolve it from Clerk instead (same pattern as connect/route.js Step 2).

**Step 5: Verify build**

```bash
npm run build
```

Expected: passes.

**Step 6: Commit**

```bash
git add src/app/api/stripe/
git commit -m "fix: add Clerk server-side auth to Stripe routes, stop trusting userId from client body"
```

---

## Task 8: Fix infinite loading in useConvexOrders

**Files:**
- Modify: `src/hook/useConvexOrders.js`

**Context:** `isLoading: orders === undefined` is true both when the Convex query is loading AND when the query is skipped (because `convexUser` hasn't loaded yet). If the user is not logged in or if `convexUser` takes time to resolve, `orders === undefined` forever — the spinner never disappears.

Fix: use `isLoaded` from `useConvexUser` to separate "auth not yet resolved" from "query running".

**Step 1: Read the file**

Read `src/hook/useConvexOrders.js` (or `.ts`).

**Step 2: Update the hook**

Replace the full file content with:
```javascript
"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import useConvexUser from "./useConvexUser";

export default function useConvexOrders(role = "client") {
  const { convexUser, isLoaded } = useConvexUser();
  const orders = useQuery(
    api.marketplace.orders.getByUser,
    convexUser?._id ? { userId: convexUser._id, role, limit: 50 } : "skip"
  );
  // isLoading is true until auth resolves AND (if logged in) until the query returns data
  const isLoading = !isLoaded || (!!convexUser?._id && orders === undefined);
  return { orders: orders ?? [], isLoading, user: convexUser };
}
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/hook/useConvexOrders.js
git commit -m "fix: correct isLoading logic in useConvexOrders to prevent infinite spinner"
```

---

## Task 9: Fix broken routes and hydration mismatch

**Files:**
- Modify: `src/components/dashboard/section/ManageJobInfo.jsx`
- Modify: `src/data/dashboard.js`
- Modify: `src/components/breadcumb/Breadcumb18.jsx`

**Context:**
- ManageJobInfo.jsx lines 100 and 153 link to `/create-jobs` which does not exist. Since job creation hasn't been built yet, remove these CTAs or replace with a disabled state.
- `dashboard.js` line 22: `_quoteReqs` points to `/dashboard/quote-requests` which doesn't exist. Remove from all navigation arrays.
- `Breadcumb18.jsx` lines 16, 24, 29: `wow zoomIn` / `wow fadeInUp` CSS classes cause SSR→client hydration mismatch. Fix with `suppressHydrationWarning`.

**Step 1: Fix ManageJobInfo.jsx — remove broken create-jobs links**

Read the file first. Find line 100:
```jsx
<Link
  href="/create-jobs"
  className="ud-btn btn-dark default-box-shadow2"
>
  Post a Job
  <i className="fal fa-arrow-right-long" />
</Link>
```

Replace with:
```jsx
<span
  className="ud-btn btn-dark default-box-shadow2"
  style={{ opacity: 0.5, cursor: "not-allowed" }}
  title="Coming soon"
>
  Post a Job
  <i className="fal fa-arrow-right-long" />
</span>
```

Find line 153:
```jsx
<Link href="/create-jobs" className="ud-btn btn-thm mt10">
  Post Your First Job
  <i className="fal fa-arrow-right-long" />
</Link>
```

Replace with:
```jsx
<span className="ud-btn btn-thm mt10" style={{ opacity: 0.5, cursor: "not-allowed" }} title="Coming soon">
  Post Your First Job
  <i className="fal fa-arrow-right-long" />
</span>
```

**Step 2: Fix dashboard.js — remove _quoteReqs from navigation**

Read `src/data/dashboard.js`. Find all occurrences of `_quoteReqs` in navigation arrays and remove them. The `_quoteReqs` constant itself can stay (or be removed — your choice), but it must not appear in any exported navigation array.

For example, if you find:
```javascript
start: [_dashboard, _quoteReqs, _myProjects],
```
Change to:
```javascript
start: [_dashboard, _myProjects],
```

Do this for every occurrence.

**Step 3: Fix Breadcumb18.jsx — suppress hydration warnings**

Read the file. Find elements with `wow zoomIn` and `wow fadeInUp` classes (lines ~16, 24, 29). Add `suppressHydrationWarning` to each.

For example:
```jsx
className="left-top-img wow zoomIn"
```
Change to:
```jsx
className="left-top-img wow zoomIn"
suppressHydrationWarning
```

Do the same for all `wow` class elements in that file.

**Step 4: Verify build**

```bash
npm run build
```

Expected: passes without the hydration warning.

**Step 5: Commit**

```bash
git add src/components/dashboard/section/ManageJobInfo.jsx src/data/dashboard.js src/components/breadcumb/Breadcumb18.jsx
git commit -m "fix: disable broken create-jobs CTAs, remove missing quote-requests nav, fix hydration warnings"
```
