# Full Marketplace MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform SkillLinkup from a template with mock data into a production-ready freelance marketplace powered entirely by Convex, with Clerk auth, Stripe payments, and clean empty states.

**Architecture:** Next.js 15 App Router + Convex backend (already built with 30+ tables). Clerk for auth. Stripe Connect for payments. All mock `src/data/` imports replaced with Convex hooks. Template UI kept but cleaned of lorem ipsum and fake data.

**Tech Stack:** Next.js 15.3, React 19, Convex, Clerk, Stripe Connect, Tailwind/Bootstrap, Vercel deployment

---

## Phase 1: Cleanup & Foundations (remove mock data, add empty states, platforms page)

### Task 1: Create shared EmptyState component

**Files:**
- Create: `src/components/ui/EmptyState.jsx`

**Step 1: Create the EmptyState component**

```jsx
"use client";

export default function EmptyState({ icon, title, description, actionLabel, actionHref }) {
  return (
    <div className="text-center py-5">
      {icon && <div className="mb-3" style={{ fontSize: "3rem", opacity: 0.4 }}>{icon}</div>}
      <h4 className="mb-2">{title || "Nothing here yet"}</h4>
      {description && <p className="text-muted mb-3">{description}</p>}
      {actionLabel && actionHref && (
        <a href={actionHref} className="ud-btn btn-thm">
          {actionLabel}<i className="fal fa-arrow-right-long"></i>
        </a>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ui/EmptyState.jsx
git commit -m "feat: add shared EmptyState component for empty data states"
```

---

### Task 2: Clean homepage - remove mock sections, keep Convex-connected ones

**Files:**
- Modify: `src/app/(home)/page.jsx`

The homepage currently uses these sections. Keep Convex-connected ones, remove or simplify the rest:

**KEEP (real data or useful static):**
- Header19 (navigation - already cleaned)
- Hero20 (search/CTA - static but useful)
- TrendingService14 (uses useConvexGigs - REAL)
- NeedSomething2 (how it works - static but useful)
- CtaBanner18 (find work/talent CTA - static but useful)
- Footer14 (already cleaned)

**REMOVE (pure mock/template filler):**
- OurPartners20 (fake partner logos)
- BrowserCategory20 (mock category carousel)
- Testimonial2 (fake testimonials)
- InspireingWork20 (hardcoded gallery)
- InspiringService11 (mock "inspiring" services)
- CtaBanner21 (duplicate CTA)

**Step 1: Update homepage to remove mock sections**

Remove imports and JSX for: OurPartners20, BrowserCategory20, Testimonial2, InspireingWork20, InspiringService11, CtaBanner21.

Keep: Header19, Hero20, TrendingService14, NeedSomething2, CtaBanner18, Footer14.

**Step 2: Update TrendingService14 to show EmptyState when no gigs**

In the component, when Convex returns empty and there's no fallback, show:
```jsx
<EmptyState
  icon="🚀"
  title="Services coming soon"
  description="Be the first to offer your services on SkillLinkup"
  actionLabel="Become a Seller"
  actionHref="/become-seller"
/>
```

**Step 3: Remove static fallback from useConvexGigs.js**

Change the hook so it returns `[]` instead of falling back to `product1` mock data. Do the same for useConvexFreelancers.js, useConvexJobs.js, useConvexProjects.js.

**Step 4: Commit**

```bash
git add src/app/\(home\)/page.jsx src/hook/useConvex*.js src/components/section/TrendingService14.jsx
git commit -m "feat: clean homepage - remove mock sections, add empty states"
```

---

### Task 3: Clean listing pages - Services, Freelancers, Jobs, Projects

**Files:**
- Modify: `src/app/(service)/services/page.jsx` and its listing component
- Modify: `src/app/(freelancer)/freelancers/page.jsx` and its listing component
- Modify: `src/app/(job)/jobs/page.jsx` and its listing component
- Modify: `src/app/(project)/projects/page.jsx` and its listing component

**Step 1: For each listing page**

Find the section component that renders the list (e.g., `Listing6` for services). Ensure it:
1. Uses the Convex hook (useConvexGigs, useConvexFreelancers, etc.)
2. Shows a loading spinner while data is undefined
3. Shows EmptyState when data is an empty array
4. Does NOT import from `src/data/product.js`, `src/data/job.js`, etc.

**Step 2: Remove mock data imports from listing section components**

Grep for `from "@/data/product"`, `from "@/data/job"`, `from "@/data/project"`, `from "@/data/blog"` in the listing components and remove those imports + any fallback usage.

**Step 3: Commit**

```bash
git commit -m "feat: listing pages use only Convex data with empty states"
```

---

### Task 4: Create Platforms page from Convex data

**Files:**
- Create: `src/app/platforms/page.jsx`
- Create: `src/components/section/PlatformListing.jsx`
- Create: `src/components/card/PlatformCard.jsx`
- Create: `src/hook/useConvexPlatforms.js`

**Step 1: Create the Convex hook**

Check what queries exist in `convex/platforms.ts` (or similar). Create a hook:

```jsx
"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useConvexPlatforms(locale = "en") {
  return useQuery(api.platforms.list, { locale }) ?? [];
}
```

**Step 2: Create PlatformCard component**

Display: name, logo/image, rating, short description, fees, link to detail page.

**Step 3: Create PlatformListing section component**

Fetches platforms via hook, renders grid of PlatformCards. Shows EmptyState if none.

**Step 4: Create the page**

```jsx
import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import PlatformListing from "@/components/section/PlatformListing";

export const metadata = { title: "SkillLinkup | Freelance Platforms" };

export default function PlatformsPage() {
  return (
    <>
      <Header20 />
      <PlatformListing />
      <Footer14 />
    </>
  );
}
```

**Step 5: Add to navigation**

Update `src/data/navigation.js` to include Platforms link under Browse or as top-level.

**Step 6: Commit**

```bash
git add src/app/platforms/ src/components/section/PlatformListing.jsx src/components/card/PlatformCard.jsx src/hook/useConvexPlatforms.js src/data/navigation.js
git commit -m "feat: add platforms page connected to Convex"
```

---

### Task 5: Clean detail pages - remove lorem ipsum, show real or empty data

**Files:**
- Modify: `src/components/section/FreelancerDetails3.jsx`
- Modify: `src/components/section/ServiceDetails3.jsx` (or whichever is used)
- Modify: Similar for project/job detail components

**Step 1: FreelancerDetails3 - remove hardcoded education, work experience, awards**

Replace the hardcoded lorem ipsum sections (Education, Work & Experience, Awards) with:
- If data comes from Convex: show real bio, skills, hourly rate
- If no data: show a clean profile with available info only
- Remove the fake "Job Success 98%", "Total Jobs 921", "Total Hours 1,499" stats
- Only show stats that come from real Convex data (ratingAverage, ratingCount)

**Step 2: ServiceDetails3 - similar cleanup**

Remove hardcoded reviews, fake pricing. Show real packages from Convex or empty state.

**Step 3: Commit**

```bash
git commit -m "feat: clean detail pages - real Convex data only, no lorem ipsum"
```

---

## Phase 2: User Flows (auth, onboarding, profile management)

### Task 6: Verify Clerk auth flow end-to-end

**Files:**
- Check: `src/app/(auth)/login/page.jsx`
- Check: `src/app/(auth)/register/page.jsx`
- Check: `src/app/(dashboard)/onboarding/page.jsx`
- Check: `middleware.ts`

**Step 1: Test login flow**

Navigate to /login, verify Clerk SignIn renders. After login, verify redirect to /dashboard.

**Step 2: Test register flow**

Navigate to /register, verify Clerk SignUp renders. After signup, verify redirect to /onboarding.

**Step 3: Test onboarding flow**

On /onboarding, verify:
- User can select "Freelancer" or "Client"
- Selection calls `api.users.setUserType` mutation
- Freelancer selection auto-creates freelancerProfile in Convex
- Redirects to /dashboard after selection

**Step 4: Fix any issues found and commit**

```bash
git commit -m "fix: verify and fix auth + onboarding flow"
```

---

### Task 7: Connect dashboard to real Convex data

**Files:**
- Modify: `src/components/dashboard/section/DashboardInfo.jsx` (or similar)
- Modify: Dashboard navigation to show correct links per role

**Step 1: Dashboard stats from Convex**

Use `api.marketplace.dashboard.getStats` to show:
- For freelancers: active gigs, pending orders, total earnings, rating
- For clients: active projects, pending orders, messages

Replace hardcoded stats with real data. Show 0 for new users.

**Step 2: Dashboard navigation per role**

- Freelancer sees: Dashboard, My Gigs, Add Service, Orders, Messages, Reviews, Profile
- Client sees: Dashboard, My Projects, Post Project, Orders, Messages, Reviews, Profile

**Step 3: Commit**

```bash
git commit -m "feat: dashboard shows real Convex stats per user role"
```

---

### Task 8: Freelancer profile editing

**Files:**
- Modify: `src/app/(dashboard)/my-profile/page.jsx` and its form component

**Step 1: Connect profile form to Convex**

The profile page should:
1. Load current profile via `useConvexProfile()`
2. Allow editing: displayName, tagline, bio, hourlyRate, skills, location, languages
3. Save via `api.marketplace.freelancers.updateProfile` mutation
4. Show success toast on save

**Step 2: Commit**

```bash
git commit -m "feat: freelancer profile editing connected to Convex"
```

---

### Task 9: Gig creation flow

**Files:**
- Modify: `src/app/(dashboard)/add-services/page.jsx` and its form component

**Step 1: Connect gig creation form to Convex**

The form should:
1. Collect: title, description, category, tags, packages (basic/standard/premium pricing)
2. Auto-generate slug from title
3. Call `api.marketplace.gigs.create` mutation
4. Then call `api.marketplace.gigs.createPackage` for each pricing tier
5. Redirect to /dashboard/manage-services on success

**Step 2: Commit**

```bash
git commit -m "feat: gig creation form connected to Convex"
```

---

### Task 10: Project creation flow (for clients)

**Files:**
- Modify: `src/app/(dashboard)/create-projects/page.jsx` and its form component

**Step 1: Connect project creation to Convex**

The form should:
1. Collect: title, description, category, required skills, budget range, deadline
2. Auto-generate slug from title
3. Call `api.marketplace.projects.create` mutation
4. Redirect to /dashboard/manage-projects on success

**Step 2: Commit**

```bash
git commit -m "feat: project creation form connected to Convex"
```

---

## Phase 3: Marketplace Core (interactions between users)

### Task 11: Gig detail page with real packages + order button

**Files:**
- Modify: Service detail page component

**Step 1: Show real pricing packages**

The gig detail page (loaded via `useConvexGigDetail`) should:
1. Display all packages (basic/standard/premium) with real prices
2. Show "Continue" or "Order Now" button per package
3. Button leads to checkout (Phase 4) or shows "Login to order" if not authenticated

**Step 2: Commit**

```bash
git commit -m "feat: gig detail shows real packages with order buttons"
```

---

### Task 12: Bidding on projects

**Files:**
- Modify: Project detail page component
- Create: `src/components/element/BidForm.jsx`

**Step 1: Project detail shows existing bids count + bid form**

For authenticated freelancers viewing a project:
1. Show project details from Convex
2. Show "Submit a Bid" form: amount, delivery days, pitch text
3. Call `api.marketplace.projects.submitBid` mutation
4. Show success message after submission

For project owner:
1. Show all received bids with freelancer info
2. "Accept Bid" button calls `api.marketplace.projects.acceptBid`

**Step 2: Commit**

```bash
git commit -m "feat: project bidding system - submit and accept bids"
```

---

### Task 13: Messaging system

**Files:**
- Modify: `src/app/(dashboard)/message/page.jsx`
- Check: `src/hook/useConvexMessages.js`

**Step 1: Verify messaging works**

The messaging hook already exists. Verify:
1. Conversation list loads from Convex
2. Messages load for selected conversation
3. Sending a message works
4. "Contact Freelancer" button on profile/gig pages creates conversation

**Step 2: Add "Contact" button to freelancer profile and gig detail**

Button creates a conversation via `api.chat.conversations.create` and redirects to /dashboard/message.

**Step 3: Commit**

```bash
git commit -m "feat: messaging system connected and contact buttons added"
```

---

## Phase 4: Payments (Stripe Connect)

### Task 14: Set up Stripe Connect

**Files:**
- Create: `src/app/api/stripe/connect/route.ts` - Create Connect account
- Create: `src/app/api/stripe/connect/callback/route.ts` - OAuth callback
- Create: `src/app/api/stripe/checkout/route.ts` - Create checkout session
- Create: `src/app/api/stripe/webhook/route.ts` - Handle Stripe events
- Install: `stripe` npm package

**Step 1: Install Stripe**

```bash
npm install stripe
```

**Step 2: Create Stripe Connect onboarding endpoint**

When freelancer clicks "Set up payments":
1. API creates Stripe Express account
2. Generates onboarding link
3. Redirects freelancer to Stripe
4. Callback saves stripeAccountId to Convex via `api.marketplace.freelancers.updateStripeAccount`

**Step 3: Create checkout endpoint**

When client clicks "Order" on a gig package:
1. API creates Stripe Checkout Session
2. Sets up payment with platform fee (application_fee_amount)
3. Redirects to Stripe checkout
4. On success, creates order in Convex via `api.marketplace.orders.create`

**Step 4: Create webhook endpoint**

Handle events:
- `checkout.session.completed` → create order, update payment status
- `payment_intent.succeeded` → update escrow status to "held"

**Step 5: Add env vars**

```
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

**Step 6: Commit**

```bash
git commit -m "feat: Stripe Connect integration - onboarding, checkout, webhooks"
```

---

### Task 15: Order management flow

**Files:**
- Modify: `src/app/(dashboard)/orders/page.jsx`

**Step 1: Orders page shows real orders from Convex**

Use `api.marketplace.orders.getByUser` to show:
- For freelancers: received orders with status, delivery deadline
- For clients: placed orders with status

**Step 2: Order actions**

- Freelancer: "Deliver" button → calls `api.marketplace.orders.deliver`
- Client: "Approve" button → calls `api.marketplace.orders.approve`
- Client: "Request Revision" → calls `api.marketplace.orders.requestRevision`

**Step 3: Commit**

```bash
git commit -m "feat: order management - deliver, approve, request revision"
```

---

## Phase 5: Trust & Polish

### Task 16: Reviews system

**Files:**
- Create: `src/components/element/ReviewForm.jsx`

**Step 1: After order completion, both parties can leave reviews**

On completed orders, show review form:
- Rating (1-5 stars for overall, communication, quality, timeliness, value)
- Written review text
- Calls `api.marketplace.reviews.create`
- Blind review: only visible after both parties reviewed

**Step 2: Commit**

```bash
git commit -m "feat: blind review system for completed orders"
```

---

### Task 17: Notifications

**Files:**
- Create: `src/components/ui/NotificationBell.jsx`
- Modify: Header component to include bell

**Step 1: Add notification bell to header**

Shows unread count badge. Dropdown shows recent notifications from `api.marketplace.notifications.list`.
Click marks as read via `api.marketplace.notifications.markRead`.

**Step 2: Commit**

```bash
git commit -m "feat: notification bell with real-time unread count"
```

---

### Task 18: SEO & Meta tags

**Files:**
- Modify: All page.jsx files to have proper metadata

**Step 1: Add metadata to all pages**

Each page should have:
- Dynamic title based on content
- Meta description
- Open Graph tags for social sharing

**Step 2: Verify sitemap works**

Check if `app/sitemap.ts` generates correct URLs for all marketplace pages.

**Step 3: Commit**

```bash
git commit -m "feat: SEO meta tags and sitemap for all marketplace pages"
```

---

### Task 19: Final cleanup

**Step 1: Remove unused mock data files**

Delete or minimize files in `src/data/` that are no longer imported anywhere:
- `product.js` (if no longer imported)
- `job.js` (if no longer imported)
- `blog.js` (if no longer imported)
- `testimonials.js`
- `partners.js`

**Step 2: Remove unused template components**

Grep for components that are never imported and remove them (be conservative - only remove clearly unused ones).

**Step 3: Build test**

```bash
npm run build
```

Fix any build errors.

**Step 4: Commit**

```bash
git commit -m "chore: remove unused mock data and template components"
```

---

## Summary

| Phase | Tasks | Focus |
|-------|-------|-------|
| 1: Cleanup | 1-5 | Remove mock data, empty states, platforms page |
| 2: User Flows | 6-10 | Auth, onboarding, profile, gig/project creation |
| 3: Core | 11-13 | Packages, bidding, messaging |
| 4: Payments | 14-15 | Stripe Connect, checkout, order management |
| 5: Polish | 16-19 | Reviews, notifications, SEO, cleanup |

**Total: 19 tasks across 5 phases**
