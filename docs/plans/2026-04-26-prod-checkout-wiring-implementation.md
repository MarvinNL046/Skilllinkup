# Prod-Ready Checkout Wiring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the SkillLinkup gig-purchase UI to the existing Stripe escrow backend so a buyer can actually complete a checkout, fix six route-group URL bugs, add a manual dispute button, and configure Stripe on Vercel production for an end-to-end test.

**Architecture:** No new Convex schema. No new API routes. Two existing UI components (`ServiceDetailPrice1.jsx` sidebar + `ServiceDetails3.jsx` comparison table) get their stub `router.push("/dashboard/orders")` replaced with a real `fetch("/api/stripe/checkout")` + `window.location.href = url`. `OrderCard.jsx` gains an "Open Dispute" button that calls the existing `disputes.open` Convex mutation. URL fixes are simple string replaces. Vercel env + Stripe Dashboard webhook are out-of-repo config.

**Tech Stack:** Next.js 16 App Router, Clerk, Convex, Stripe Node SDK v20.4.0, `sonner` (toast), Vercel CLI, Stripe CLI.

---

### Context for the implementer

**Reference design:** `docs/plans/2026-04-26-prod-checkout-wiring-design.md`.

**Key files (read these first):**
- `src/components/element/ServiceDetailPrice1.jsx` — sidebar with package tabs + Continue button (the primary purchase CTA)
- `src/components/section/ServiceDetails3.jsx` — page-level component that renders the sidebar + a "Compare Packages" table with redundant Select buttons
- `src/app/api/stripe/checkout/route.js` — existing Convex-aware checkout endpoint (reads body, creates Stripe session, returns URL)
- `src/app/api/stripe/connect/callback/route.js` — Stripe redirects here after Connect onboarding
- `src/components/card/OrderCard.jsx` — order-list item with Deliver/Approve/RequestRevision buttons
- `convex/marketplace/disputes.ts` — `open` mutation accepts `{ orderId, reason, description, evidence? }` from authenticated callers; auto-cancels the auto-release scheduler

**Current broken behaviour:** Both purchase entry points (`ServiceDetailPrice1.jsx:32-41 handleOrder` and `ServiceDetails3.jsx:24-32 handleSelectPackage`) just `router.push("/dashboard/orders")` — no Stripe call, plus that URL 404s due to the `(dashboard)` route group.

**No test suite exists.** Verification is via `npm run build` + Stripe CLI event triggering + manual UI testing. Do NOT add a test framework — match the established pattern.

**Working dir for all commands:** `/home/marvin/Projecten/Skilllinkup`.

---

### Task 1: Fix `success_url` in the Stripe Checkout route

**Files:**
- Modify: `src/app/api/stripe/checkout/route.js:151`

- [ ] **Step 1: Edit the success_url string**

The current line reads:

```js
success_url: `${baseUrl}/dashboard/orders?success=true&session_id={CHECKOUT_SESSION_ID}`,
```

Change `/dashboard/orders` to `/orders`. After the edit:

```js
success_url: `${baseUrl}/orders?success=true&session_id={CHECKOUT_SESSION_ID}`,
```

The `(dashboard)` route group means `(dashboard)/orders/page.jsx` maps to URL `/orders`. The literal `/dashboard` prefix never existed.

- [ ] **Step 2: Verify no other stale `/dashboard/orders` references in the codebase**

Run:
```bash
grep -rn "/dashboard/orders" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"
```
Expected: only `src/components/section/ServiceDetails3.jsx` and `src/components/element/ServiceDetailPrice1.jsx` (both touched in later tasks). NO hits in `src/app/api/`.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/stripe/checkout/route.js
git commit -m "fix(checkout): success_url targets /orders not /dashboard/orders (route group)"
```

---

### Task 2: Fix `/dashboard/payouts` redirects in the Connect callback

**Files:**
- Modify: `src/app/api/stripe/connect/callback/route.js` (8 occurrences, lines 39, 56, 63, 69, 85, 103, 109, 115)

- [ ] **Step 1: Replace all `/dashboard/payouts` with `/payouts` in the file**

Every redirect in `connect/callback/route.js` points to `/dashboard/payouts?…`. The `(dashboard)/payouts/page.jsx` route group maps to URL `/payouts`. Find every occurrence and change `${baseUrl}/dashboard/payouts` to `${baseUrl}/payouts` — they are all identical structurally, only the query string varies.

After the edit, this grep should return 0 hits in this file:
```bash
grep -n "/dashboard/payouts" src/app/api/stripe/connect/callback/route.js
```

- [ ] **Step 2: Verify no other code depends on the broken URL**

Run:
```bash
grep -rn "/dashboard/payouts" src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"
```
Expected: only matches inside `(dashboard)/payouts/...` (the actual route folder). NO hits in `src/app/api/` or in components.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/stripe/connect/callback/route.js
git commit -m "fix(connect): callback redirects target /payouts not /dashboard/payouts (route group)"
```

---

### Task 3: Verify gig query exposes `freelancer.stripeAccountId`

The checkout route accepts `freelancerStripeAccountId` as metadata-only (the actual transfer reads from Convex DB at release time). It's still useful to pass it through for debugging. The frontend reads it from `data.freelancer?.stripeAccountId`.

**Files:**
- Read-only: `convex/marketplace/gigs.ts`
- Read-only: `src/components/section/ServiceDetails3.jsx` (the `data` mapping at lines 37–58)

- [ ] **Step 1: Find the `getBySlug` query in `convex/marketplace/gigs.ts`**

Run:
```bash
grep -n "getBySlug\|freelancerProfile\|stripeAccountId" convex/marketplace/gigs.ts | head -20
```

- [ ] **Step 2: Confirm the query attaches the freelancer profile**

Look at `getBySlug` — it should fetch the gig and then `ctx.db.get(gig.freelancerId)` and attach as `freelancerProfile`. The `stripeAccountId` field lives on the freelancer profile schema.

- [ ] **Step 3: If `stripeAccountId` is NOT included in the returned shape**

Patch the `getBySlug` query to spread the freelancer profile (which is what `freelancerProfile` already is, so it's likely fine). If the query already returns the full profile doc — `stripeAccountId` is already accessible via `gig.freelancerProfile.stripeAccountId`. No change needed.

If the query returns a stripped-down shape (e.g. just `displayName`), add `stripeAccountId: profile.stripeAccountId` to the returned object.

- [ ] **Step 4: If a change was needed, deploy + commit**

```bash
npx convex dev --once
git add convex/marketplace/gigs.ts
git commit -m "feat(gigs): expose freelancer stripeAccountId on getBySlug for checkout metadata"
```

If no change was needed, skip the commit and proceed.

---

### Task 4: Wire `ServiceDetailPrice1.jsx` sidebar `Continue` button to Stripe Checkout

This is the primary buy CTA — the segmented tabs already track the active package via `activePackage`.

**Files:**
- Modify: `src/components/element/ServiceDetailPrice1.jsx` (lines 1–6, 13, 32–41)
- Modify: `src/components/section/ServiceDetails3.jsx` (the `<ServiceDetailPrice1 ... />` callsite, around line 388)

- [ ] **Step 1: Update imports + component signature in `ServiceDetailPrice1.jsx`**

Replace the imports at the top (lines 1–6):

```js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Clock, RefreshCcw, Check, ArrowRight } from "lucide-react";
```

Replace the function signature (line 13):

```js
export default function ServiceDetailPrice1({
  packages = [],
  gigId,
  gigTitle,
  freelancerStripeAccountId,
}) {
```

- [ ] **Step 2: Replace `handleOrder` to call the Stripe Checkout endpoint**

Replace lines 32–41 (the entire `handleOrder` function) with:

```js
const [isCheckingOut, setIsCheckingOut] = useState(false);

async function handleOrder() {
  if (!hasPackages || !activePackage) return;
  if (!isSignedIn) {
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/";
    router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    return;
  }

  setIsCheckingOut(true);
  try {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gigId,
        packageId: activePackage._id,
        gigTitle,
        packageTitle: activePackage.title || activePackage.tier || "",
        price: activePackage.price,
        currency: (activePackage.currency || "eur").toLowerCase(),
        freelancerStripeAccountId: freelancerStripeAccountId || "",
      }),
    });
    const json = await res.json();
    if (!res.ok || !json.url) {
      throw new Error(json.error || "Checkout failed to start");
    }
    window.location.href = json.url;
  } catch (err) {
    console.error("[checkout] error:", err);
    toast.error(err.message || "Could not start checkout");
    setIsCheckingOut(false);
  }
}
```

- [ ] **Step 3: Add the `disabled` + spinner state to the Continue button**

Replace the existing `<button>` block at lines 219–230 with:

```jsx
<button
  type="button"
  className="btn btn--primary btn--lg"
  onClick={handleOrder}
  disabled={!hasPackages || isCheckingOut}
  title={!hasPackages ? t("noPackagesTitle") : undefined}
  style={{ width: "100%", justifyContent: "center" }}
>
  {isCheckingOut ? (
    <span className="spinner-border spinner-border-sm" role="status" />
  ) : (
    <>
      {t("continue")} ({currencySymbol}
      {activePackage?.price})
      <ArrowRight size={16} />
    </>
  )}
</button>
```

- [ ] **Step 4: Pass the new props from `ServiceDetails3.jsx`**

Find the `<ServiceDetailPrice1 ... />` render in `src/components/section/ServiceDetails3.jsx` (there are two — one in the `Sticky` block and one outside it for non-matched screens, both around line 388). Update each callsite to pass:

```jsx
<ServiceDetailPrice1
  packages={packages}
  gigId={data?.id}
  gigTitle={data?.title}
  freelancerStripeAccountId={data?.freelancer?.stripeAccountId || ""}
/>
```

Use a `grep` to find both callsites first so you don't miss one:
```bash
grep -n "ServiceDetailPrice1" src/components/section/ServiceDetails3.jsx
```

- [ ] **Step 5: Build to verify no syntax errors**

Run:
```bash
npm run build 2>&1 | tail -20
```
Expected: build succeeds. If it fails on this file, fix and retry.

- [ ] **Step 6: Commit**

```bash
git add src/components/element/ServiceDetailPrice1.jsx src/components/section/ServiceDetails3.jsx
git commit -m "feat(checkout): wire sidebar Continue button to Stripe Checkout"
```

---

### Task 5: Wire `Compare Packages` table buttons in `ServiceDetails3.jsx`

The comparison table (lines 363–371) has a `Select` button per package, all calling the same broken `handleSelectPackage`. Make each button trigger Stripe Checkout for its specific package.

**Files:**
- Modify: `src/components/section/ServiceDetails3.jsx` (lines 1–13 imports, 24–32 handler, 363–371 button)

- [ ] **Step 1: Add `useState` and `toast` imports**

The existing imports at the top of `ServiceDetails3.jsx` already have `useState` (or do they? Confirm with `head -15` of the file). Add `toast` from `sonner`. After the change, the top should include:

```js
"use client";

import Sticky from "react-stickynode";
import { useState } from "react";
import { toast } from "sonner";
// … existing imports unchanged
```

If `useState` is already imported, only add the `toast` line.

- [ ] **Step 2: Replace the broken `handleSelectPackage` (lines 24–32)**

Replace the function with one that takes a package param and calls `/api/stripe/checkout`:

```js
const [orderingPackageId, setOrderingPackageId] = useState(null);

async function handleSelectPackage(pkg) {
  if (!pkg) return;
  if (!isSignedIn) {
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/";
    router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    return;
  }

  setOrderingPackageId(pkg._id);
  try {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gigId: data?.id,
        packageId: pkg._id,
        gigTitle: data?.title,
        packageTitle: pkg.title || pkg.tier || "",
        price: pkg.price,
        currency: (pkg.currency || "eur").toLowerCase(),
        freelancerStripeAccountId: data?.freelancer?.stripeAccountId || "",
      }),
    });
    const json = await res.json();
    if (!res.ok || !json.url) {
      throw new Error(json.error || "Checkout failed to start");
    }
    window.location.href = json.url;
  } catch (err) {
    console.error("[checkout] error:", err);
    toast.error(err.message || "Could not start checkout");
    setOrderingPackageId(null);
  }
}
```

Note: this function is defined *inside* `ServiceDetail3()` so it closes over `data`, `router`, and `isSignedIn`. The original `handleSelectPackage` already lived inside the component body (line 24).

- [ ] **Step 3: Update the per-package button (lines 363–371)**

The current button:

```jsx
<button
  type="button"
  className="btn btn--primary btn--sm"
  onClick={handleSelectPackage}
  style={{ width: "100%", justifyContent: "center" }}
>
  {t("select")}
  <ArrowRight size={14} />
</button>
```

Replace with one that passes the package and shows a spinner while loading:

```jsx
<button
  type="button"
  className="btn btn--primary btn--sm"
  onClick={() => handleSelectPackage(pkg)}
  disabled={orderingPackageId === pkg._id}
  style={{ width: "100%", justifyContent: "center" }}
>
  {orderingPackageId === pkg._id ? (
    <span className="spinner-border spinner-border-sm" role="status" />
  ) : (
    <>
      {t("select")}
      <ArrowRight size={14} />
    </>
  )}
</button>
```

- [ ] **Step 4: Build to verify**

```bash
npm run build 2>&1 | tail -20
```
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/section/ServiceDetails3.jsx
git commit -m "feat(checkout): wire Compare Packages table buttons to Stripe Checkout"
```

---

### Task 6: Add `OpenDisputeModal` component

A reusable modal for opening a dispute on an order. Plain React state + the existing project styles. No external modal library (project does not have one wired).

**Files:**
- Create: `src/components/dispute/OpenDisputeModal.jsx`

- [ ] **Step 1: Create the modal file**

```bash
mkdir -p src/components/dispute
```

Create `src/components/dispute/OpenDisputeModal.jsx` with this content:

```jsx
"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";

const REASONS = [
  { value: "not_delivered", labelKey: "disputeReasonNotDelivered" },
  { value: "quality_issues", labelKey: "disputeReasonQualityIssues" },
  { value: "communication", labelKey: "disputeReasonCommunication" },
  { value: "other", labelKey: "disputeReasonOther" },
];

export default function OpenDisputeModal({ orderId, onClose }) {
  const t = useTranslations("disputes");
  const openDispute = useMutation(api.marketplace.disputes.open);
  const [reason, setReason] = useState(REASONS[0].value);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isValid =
    reason && description.trim().length >= 30 && description.trim().length <= 1000;

  async function handleSubmit() {
    if (!isValid || submitting) return;
    setSubmitting(true);
    try {
      await openDispute({
        orderId,
        reason,
        description: description.trim(),
      });
      toast.success(t("disputeOpened"));
      onClose();
    } catch (err) {
      toast.error(err.message || t("disputeOpenFailed"));
      setSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "grid",
        placeItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          maxWidth: 520,
          width: "calc(100% - 32px)",
          padding: "var(--space-6)",
          background: "var(--bg-elevated, white)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-h4)",
            margin: 0,
            marginBottom: "var(--space-4)",
          }}
        >
          {t("openDisputeTitle")}
        </h3>

        <p
          className="body-sm"
          style={{
            color: "var(--text-secondary)",
            marginBottom: "var(--space-5)",
          }}
        >
          {t("openDisputeDescription")}
        </p>

        <label
          style={{
            display: "block",
            marginBottom: "var(--space-2)",
            fontWeight: 500,
          }}
        >
          {t("reasonLabel")}
        </label>
        <select
          className="form-control mb15"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ width: "100%", marginBottom: "var(--space-4)" }}
        >
          {REASONS.map((r) => (
            <option key={r.value} value={r.value}>
              {t(r.labelKey)}
            </option>
          ))}
        </select>

        <label
          style={{
            display: "block",
            marginBottom: "var(--space-2)",
            fontWeight: 500,
          }}
        >
          {t("descriptionLabel")} ({description.trim().length}/1000)
        </label>
        <textarea
          className="form-control"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t("descriptionPlaceholder")}
          maxLength={1000}
          style={{ width: "100%", marginBottom: "var(--space-5)" }}
        />

        <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "flex-end" }}>
          <button
            type="button"
            className="ud-btn btn-white fz14"
            onClick={onClose}
            disabled={submitting}
          >
            {t("cancel")}
          </button>
          <button
            type="button"
            className="ud-btn btn-thm fz14"
            disabled={!isValid || submitting}
            onClick={handleSubmit}
          >
            {submitting ? (
              <span className="spinner-border spinner-border-sm" role="status" />
            ) : (
              t("submitDispute")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add the i18n keys to `messages/en.json` (and `messages/nl.json` if present)**

Read `messages/en.json` to find the existing `"disputes"` namespace (or create it). Add these keys:

```json
"disputes": {
  "openDisputeTitle": "Open a dispute",
  "openDisputeDescription": "Tell us what went wrong. The freelancer will be notified and an admin will review the case. The funds will be frozen until the dispute is resolved.",
  "reasonLabel": "Reason",
  "descriptionLabel": "Description (30–1000 characters)",
  "descriptionPlaceholder": "Describe what happened in detail. Include dates, what was delivered, what was promised, and what's wrong.",
  "submitDispute": "Submit dispute",
  "cancel": "Cancel",
  "disputeOpened": "Dispute opened. An admin will review it shortly.",
  "disputeOpenFailed": "Failed to open dispute",
  "openDispute": "Open dispute",
  "disputeReasonNotDelivered": "Not delivered",
  "disputeReasonQualityIssues": "Quality issues",
  "disputeReasonCommunication": "Communication problems",
  "disputeReasonOther": "Other"
}
```

If a `"disputes"` namespace already exists, MERGE these keys into it (do not overwrite existing ones).

For `messages/nl.json`, add the same keys with Dutch translations:

```json
"disputes": {
  "openDisputeTitle": "Geschil openen",
  "openDisputeDescription": "Vertel ons wat er mis is gegaan. De freelancer wordt op de hoogte gesteld en een admin beoordeelt de zaak. De betaling wordt bevroren tot het geschil is afgehandeld.",
  "reasonLabel": "Reden",
  "descriptionLabel": "Omschrijving (30–1000 tekens)",
  "descriptionPlaceholder": "Beschrijf in detail wat er is gebeurd. Vermeld data, wat er is geleverd, wat was beloofd en wat er mis is.",
  "submitDispute": "Geschil indienen",
  "cancel": "Annuleren",
  "disputeOpened": "Geschil geopend. Een admin beoordeelt het zo snel mogelijk.",
  "disputeOpenFailed": "Kon geschil niet openen",
  "openDispute": "Geschil openen",
  "disputeReasonNotDelivered": "Niet geleverd",
  "disputeReasonQualityIssues": "Kwaliteit niet goed",
  "disputeReasonCommunication": "Communicatieproblemen",
  "disputeReasonOther": "Anders"
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/dispute/OpenDisputeModal.jsx messages/
git commit -m "feat(disputes): add OpenDisputeModal component with i18n strings"
```

---

### Task 7: Add `Open Dispute` button to `OrderCard.jsx`

**Files:**
- Modify: `src/components/card/OrderCard.jsx`

- [ ] **Step 1: Add the modal import + state**

At the top of `OrderCard.jsx`, after the existing imports, add:

```js
import OpenDisputeModal from "@/components/dispute/OpenDisputeModal";
```

Inside the component body (right after the existing `useState` hooks, around line 31), add:

```js
const [showDisputeModal, setShowDisputeModal] = useState(false);
```

- [ ] **Step 2: Add a `canOpenDispute` derived flag**

Below the existing `showDeliverButton` / `showClientButtons` constants (around line 102):

```js
const canOpenDispute =
  ["in_progress", "delivered", "revision_requested"].includes(order.status) &&
  order.escrowStatus !== "disputed" &&
  order.escrowStatus !== "released" &&
  order.escrowStatus !== "refunded";
```

- [ ] **Step 3: Render the Open Dispute button**

Inside the actions block (the `<div className="grid gap-2 mt10">` starting at line 164), add this AFTER the existing buttons but BEFORE the `</div>` of the grid:

```jsx
{canOpenDispute && (
  <button
    className="ud-btn btn-white fz14"
    type="button"
    onClick={() => setShowDisputeModal(true)}
    disabled={actionLoading}
    style={{ borderColor: "var(--danger-200, #fecaca)", color: "var(--danger-600, #dc2626)" }}
  >
    {t("openDispute")}
    <i className="fal fa-exclamation-triangle" />
  </button>
)}
```

The `t("openDispute")` key was added to `messages/en.json` in Task 6 step 2.

- [ ] **Step 4: Render the modal at the bottom of the component**

At the very end of the component, just before the final `</div>` and the component close, add:

```jsx
{showDisputeModal && (
  <OpenDisputeModal
    orderId={order._id}
    onClose={() => setShowDisputeModal(false)}
  />
)}
```

The exact insertion point: AFTER the `{isCompleted && showReviewForm && revieweeId && !alreadyReviewed && ( ... )}` block, BEFORE the final `</div>` at the end of the JSX return.

- [ ] **Step 5: Build to verify**

```bash
npm run build 2>&1 | tail -20
```
Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/components/card/OrderCard.jsx
git commit -m "feat(orders): Open Dispute button in OrderCard with modal"
```

---

### Task 8: Set Stripe env vars on Vercel production

The values come from the local `.env.local` file (test keys). The webhook secret will be filled in step 9 after registering the endpoint in Stripe Dashboard.

**Files:**
- None (config-only)

- [ ] **Step 1: Set `STRIPE_SECRET_KEY` on Vercel production**

Pipe the value from `.env.local` so it isn't echoed:

```bash
grep '^STRIPE_SECRET_KEY=' .env.local | cut -d= -f2- | npx vercel env add STRIPE_SECRET_KEY production
```

Expected: `✅  Added Environment Variable STRIPE_SECRET_KEY to Project skilllinkup`.

- [ ] **Step 2: Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` on Vercel production**

```bash
grep '^NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=' .env.local | cut -d= -f2- | npx vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
```

Expected: `✅  Added Environment Variable NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to Project skilllinkup`.

- [ ] **Step 3: Verify both vars are now in production env**

```bash
npx vercel env ls production 2>&1 | grep -i stripe
```
Expected: two entries showing `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` with environment `production`.

`STRIPE_WEBHOOK_SECRET` is intentionally not yet set — Task 9 produces the value.

---

### Task 9: Register the test-mode webhook endpoint in Stripe Dashboard

**Files:**
- None (external Stripe Dashboard config)

This step is performed in the Stripe Dashboard UI, not via CLI/MCP, because the webhook secret is generated once and shown only at creation.

- [ ] **Step 1: Open the test-mode webhooks page**

Open `https://dashboard.stripe.com/test/webhooks` in a browser. Verify the top-right shows **TEST MODE** (orange banner).

- [ ] **Step 2: Click `+ Add endpoint`**

Endpoint URL:
```
https://skilllinkup.com/api/stripe/webhook
```

Description: `SkillLinkup production (test mode)`.

- [ ] **Step 3: Select these events**

In the "Select events to listen to" picker, add:
- `checkout.session.completed`
- `payment_intent.succeeded`
- `charge.dispute.created`
- `account.updated`

- [ ] **Step 4: Click `Add endpoint`. Reveal the signing secret.**

After creation, the endpoint detail page shows a "Signing secret" with a `Reveal` button. Click it. The value is `whsec_…`. Copy it.

- [ ] **Step 5: Add it to Vercel production env**

```bash
echo "whsec_PASTE_THE_VALUE_HERE" | npx vercel env add STRIPE_WEBHOOK_SECRET production
```

Expected: `✅  Added Environment Variable STRIPE_WEBHOOK_SECRET to Project skilllinkup`.

- [ ] **Step 6: Verify the variable is set**

```bash
npx vercel env ls production 2>&1 | grep STRIPE_WEBHOOK_SECRET
```
Expected: one entry with `production` environment.

---

### Task 10: Deploy to production and run the manual e2e test

**Files:**
- None (deploys + manual UI test)

- [ ] **Step 1: Deploy to production**

The recent commits will trigger an auto-deploy if Vercel is wired to GitHub. Push first to make sure:

```bash
git push origin main
```

Then watch the deploy:

```bash
npx vercel ls 2>&1 | head -5
```

Wait until the most recent deployment shows `Ready`.

- [ ] **Step 2: Onboard one freelancer via Stripe Connect**

Open `https://skilllinkup.com/payouts` in a browser, logged in as a freelancer (e.g. *Bisha Bosi* or *Didi Fofa*).

Click the `Connect Stripe Account` button (`StripeConnectButton`). Complete the Stripe Express form with test data:
- Use email: any
- Phone: any (the form accepts a Dutch test number `+31600000000`)
- Address, DOB: any test values
- Bank: select country, IBAN: `NL39RABO0300065264` (Stripe test IBAN)
- Photo ID: skip if test mode allows

When charges_enabled flips true, Stripe redirects to `https://skilllinkup.com/payouts?stripe_connected=true`. The webhook also fires `account.updated` and the Convex profile gains `stripeAccountId`.

Verify in Convex:
```bash
npx convex data freelancerProfiles --limit 5 2>&1 | grep -E "stripeAccountId|displayName"
```
Expected: at least one row with `acct_...`.

- [ ] **Step 3: Buy a gig as a different user**

In an incognito window, log in as a different user (the *client*). Browse to a gig owned by the freelancer onboarded in step 2. The gig URL pattern is:

```
https://skilllinkup.com/online/service/<gig-slug>
```

In the sidebar, pick a package (Basic / Standard / Premium tab), click `Continue (€...)`. Stripe Checkout opens with `cs_test_…` URL.

Pay with:
- Card: `4242 4242 4242 4242`
- Expiry: any future date
- CVC: any 3 digits
- Postal: any

- [ ] **Step 4: Verify the order was created**

After Stripe redirects you to `/orders?success=true&session_id=...`, check the page — the new order should be visible with status `In progress` and amount displayed.

Also verify in Convex:
```bash
npx convex data orders --limit 1 2>&1 | grep -E "escrowStatus|stripePaymentIntentId|status"
```
Expected: a row with `escrowStatus: held`, `status: in_progress`, `stripePaymentIntentId: pi_…`.

- [ ] **Step 5: Deliver the order**

Log in as the freelancer, go to `/orders`, click `Mark as delivered` on the new order.

Verify in Convex:
```bash
npx convex data orders --limit 1 2>&1 | grep -E "status|autoReleaseJobId"
```
Expected: `status: delivered`, `autoReleaseJobId: <id>` set.

- [ ] **Step 6: Approve as client → real Stripe transfer**

Log in as the client, go to `/orders`, click `Approve & release payment` on the delivered order.

Verify in Convex:
```bash
npx convex data orders --limit 1 2>&1 | grep -E "status|escrowStatus|stripeTransferId"
```
Expected: `status: completed`, `escrowStatus: released`, `stripeTransferId: tr_…`.

Verify in Stripe Dashboard (`https://dashboard.stripe.com/test/transfers`): a new transfer to the connected account, amount = `freelancerEarnings` (after platform fee).

- [ ] **Step 7: Test the dispute path on a second order**

Repeat steps 3–5 to create another order in `delivered` status.

This time, instead of approving, click the new red `Open dispute` button on the order. Pick a reason, write 30+ characters of description, submit.

Verify in Convex:
```bash
npx convex data orders --limit 1 2>&1 | grep -E "status|escrowStatus|autoReleaseJobId"
```
Expected: `status: disputed`, `escrowStatus: disputed`, `autoReleaseJobId: undefined` (cancelled).

```bash
npx convex data disputes --limit 1 2>&1 | grep -E "status|reason"
```
Expected: a dispute doc with `status: open`, the reason you picked.

- [ ] **Step 8: Resolve the dispute as admin**

Log in as an admin (a user with `role: "admin"` on the `users` table). Go to `/admin/disputes`. Pick `freelancer_wins` on the open dispute and submit.

Verify in Convex:
```bash
npx convex data orders --limit 1 2>&1 | grep -E "escrowStatus|stripeTransferId"
```
Expected: `escrowStatus: released`, `stripeTransferId: tr_…` (transfer was just made).

- [ ] **Step 9: Document the verification result**

Append a note to `docs/plans/2026-04-26-prod-checkout-wiring-design.md` at the bottom under a new heading `## Verification (YYYY-MM-DD)` listing what was tested green and any deviations.

```bash
git add docs/plans/2026-04-26-prod-checkout-wiring-design.md
git commit -m "docs: record e2e verification of prod checkout wiring"
```

---

## Self-review

**Spec coverage:**
- Buyer flow + Stripe Checkout call → Tasks 4 + 5
- Package picker UX → existing `ServiceDetailPrice1` segmented tabs (already there) + Compare Packages buttons → Tasks 4 + 5
- success_url fix → Task 1
- Connect callback redirects → Task 2
- Manual dispute UI → Tasks 6 + 7
- Vercel prod env → Task 8
- Stripe Dashboard webhook → Task 9
- e2e verification → Task 10

**Out-of-scope items confirmed absent:** no order detail page, no confirmation modal, no live keys, no schema changes. ✓

**Placeholder scan:** no TBDs, no "implement later", every step has the actual code or command.

**Type consistency:** `activePackage._id`, `pkg._id`, `data.id`, `data.freelancer.stripeAccountId`, `order._id`, `order.status`, `order.escrowStatus` — same names used throughout. The `disputes.open` mutation arg names (`orderId`, `reason`, `description`) match `convex/marketplace/disputes.ts:73-78`.
