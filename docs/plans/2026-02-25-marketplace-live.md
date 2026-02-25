# Marketplace Live Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Wire the complete Convex backend to the Freeio template UI, add email notifications via Resend, and create a functional marketplace (without Stripe payments).

**Architecture:** Convex provides all backend operations (queries/mutations). Frontend hooks fetch data and map to Freeio template component props. Email notifications sent via Convex HTTP actions calling Resend API. Messaging uses 3-second polling intervals.

**Tech Stack:** Next.js 15, React 19, Convex, Clerk auth, Resend (email), Freeio template components

---

## Phase 1: Email Infrastructure

### Task 1: Install Resend and create email utility

**Files:**
- Modify: `package.json` (add dependencies)
- Create: `convex/lib/email.ts` (email sending action)

**Step 1: Install dependencies**

```bash
npm install resend @react-email/render
```

**Step 2: Create Convex email action**

Create `convex/lib/email.ts`:

```typescript
"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = action({
  args: {
    to: v.string(),
    subject: v.string(),
    html: v.string(),
  },
  handler: async (ctx, { to, subject, html }) => {
    const { error } = await resend.emails.send({
      from: "SkillLinkup <noreply@skilllinkup.com>",
      to,
      subject,
      html,
    });
    if (error) {
      console.error("Email send failed:", error);
      throw new Error(`Email failed: ${error.message}`);
    }
    return { success: true };
  },
});
```

**Step 3: Add RESEND_API_KEY to environment**

The user already has `RESEND_API_KEY` in `.env.local`. Verify it exists. If not, add placeholder.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add Resend email infrastructure"
```

---

### Task 2: Add email triggers to order mutations

**Files:**
- Modify: `convex/marketplace/orders.ts` (add email calls after create, deliver, approve)
- Reference: `emails/order-confirmation.tsx`, `emails/new-order.tsx`, `emails/order-delivered.tsx`, `emails/order-completed.tsx`

**Step 1: Create email rendering action**

Create `convex/lib/renderEmail.ts` - a Node action that imports React Email templates, renders them to HTML, and calls the send action:

```typescript
"use node";
import { action, internalAction } from "../_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { OrderConfirmationEmail } from "../../emails/order-confirmation";
import { NewOrderEmail } from "../../emails/new-order";
import { OrderDeliveredEmail } from "../../emails/order-delivered";
import { OrderCompletedEmail } from "../../emails/order-completed";
import { NewBidEmail } from "../../emails/new-bid";
import { BidAcceptedEmail } from "../../emails/bid-accepted";
import { BidRejectedEmail } from "../../emails/bid-rejected";
import { NewMessageEmail } from "../../emails/new-message";
import { ReviewReceivedEmail } from "../../emails/review-received";
import { PaymentFailedEmail } from "../../emails/payment-failed";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to: string, subject: string, component: React.ReactElement) {
  const html = await render(component);
  const { error } = await resend.emails.send({
    from: "SkillLinkup <noreply@skilllinkup.com>",
    to,
    subject,
    html,
  });
  if (error) console.error("Email failed:", error);
}

export const sendOrderConfirmation = internalAction({
  args: {
    clientEmail: v.string(),
    clientName: v.string(),
    orderNumber: v.string(),
    orderTitle: v.string(),
    amount: v.number(),
    currency: v.string(),
    deliveryDays: v.number(),
    orderId: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    await sendEmail(
      args.clientEmail,
      `Order Confirmed: ${args.orderTitle}`,
      OrderConfirmationEmail(args)
    );
  },
});

export const sendNewOrderNotification = internalAction({
  args: {
    freelancerEmail: v.string(),
    freelancerName: v.string(),
    orderNumber: v.string(),
    orderTitle: v.string(),
    amount: v.number(),
    currency: v.string(),
    deliveryDays: v.number(),
    orderId: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    await sendEmail(
      args.freelancerEmail,
      `New Order: ${args.orderTitle}`,
      NewOrderEmail(args)
    );
  },
});

export const sendOrderDelivered = internalAction({
  args: {
    clientEmail: v.string(),
    clientName: v.string(),
    orderNumber: v.string(),
    orderTitle: v.string(),
    orderId: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    await sendEmail(
      args.clientEmail,
      `Delivery Received: ${args.orderTitle}`,
      OrderDeliveredEmail(args)
    );
  },
});

export const sendOrderCompleted = internalAction({
  args: {
    freelancerEmail: v.string(),
    freelancerName: v.string(),
    orderNumber: v.string(),
    orderTitle: v.string(),
    amount: v.number(),
    currency: v.string(),
    orderId: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    await sendEmail(
      args.freelancerEmail,
      `Payment Released: ${args.orderTitle}`,
      OrderCompletedEmail(args)
    );
  },
});

export const sendNewBid = internalAction({
  args: {
    clientEmail: v.string(),
    clientName: v.string(),
    projectTitle: v.string(),
    bidAmount: v.number(),
    currency: v.string(),
    deliveryDays: v.number(),
    freelancerName: v.string(),
    projectId: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    await sendEmail(
      args.clientEmail,
      `New Bid on ${args.projectTitle}`,
      NewBidEmail(args)
    );
  },
});

export const sendBidAccepted = internalAction({
  args: {
    freelancerEmail: v.string(),
    freelancerName: v.string(),
    projectTitle: v.string(),
    amount: v.number(),
    currency: v.string(),
    orderId: v.optional(v.string()),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    await sendEmail(
      args.freelancerEmail,
      `Bid Accepted: ${args.projectTitle}`,
      BidAcceptedEmail(args)
    );
  },
});

export const sendBidRejected = internalAction({
  args: {
    freelancerEmail: v.string(),
    freelancerName: v.string(),
    projectTitle: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    await sendEmail(
      args.freelancerEmail,
      `Bid Update: ${args.projectTitle}`,
      BidRejectedEmail(args)
    );
  },
});

export const sendNewMessage = internalAction({
  args: {
    recipientEmail: v.string(),
    recipientName: v.string(),
    senderName: v.string(),
    messagePreview: v.string(),
    conversationId: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    await sendEmail(
      args.recipientEmail,
      `New message from ${args.senderName}`,
      NewMessageEmail(args)
    );
  },
});

export const sendReviewReceived = internalAction({
  args: {
    userEmail: v.string(),
    userName: v.string(),
    orderTitle: v.string(),
    rating: v.number(),
    orderId: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    await sendEmail(
      args.userEmail,
      `New Review Received`,
      ReviewReceivedEmail(args)
    );
  },
});
```

**Step 2: Wire email triggers into existing mutations**

Modify `convex/marketplace/orders.ts`:
- In `create` mutation: After creating order, schedule `sendOrderConfirmation` and `sendNewOrderNotification` via `ctx.scheduler.runAfter(0, ...)`.
- In `deliver` mutation: Schedule `sendOrderDelivered`.
- In `approve` mutation: Schedule `sendOrderCompleted`.

Modify `convex/marketplace/projects.ts`:
- In `submitBid` mutation: Schedule `sendNewBid`.
- In `acceptBid` mutation: Schedule `sendBidAccepted`.

Modify `convex/marketplace/reviews.ts`:
- In `create` mutation: Schedule `sendReviewReceived`.

Modify `convex/chat/messages.ts`:
- In `send` mutation: Schedule `sendNewMessage` (only for non-system messages).

**Important:** Use `ctx.scheduler.runAfter(0, internal.lib.renderEmail.sendX, args)` pattern - this runs asynchronously so mutations stay fast.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: wire email triggers to marketplace mutations"
```

---

## Phase 2: Detail Pages (Wire to Convex)

### Task 3: Service detail page with Convex data

**Files:**
- Create: `src/hook/useConvexGigDetail.js`
- Modify: `src/app/(service)/service/[id]/page.jsx`
- Reference: `convex/marketplace/gigs.ts` → `getBySlug` query

**Step 1: Create gig detail hook**

```javascript
"use client";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function useConvexGigDetail(slug) {
  const gig = useQuery(api.marketplace.gigs.getBySlug,
    slug ? { slug, locale: "en" } : "skip"
  );

  if (!gig) return null;

  return {
    _id: gig._id,
    title: gig.title,
    description: gig.description,
    category: gig.category?.name || "Uncategorized",
    categoryIcon: gig.category?.icon,
    rating: gig.ratingAverage || 0,
    reviewCount: gig.ratingCount || 0,
    views: gig.views || 0,
    orderCount: gig.orderCount || 0,
    tags: gig.tags || [],
    workType: gig.workType || "remote",
    location: {
      city: gig.locationCity,
      country: gig.locationCountry,
    },
    freelancer: {
      _id: gig.freelancerProfile?._id,
      name: gig.freelancerProfile?.displayName || "Freelancer",
      avatar: gig.freelancerProfile?.avatarUrl || "/images/team/fl-1.png",
      tagline: gig.freelancerProfile?.tagline,
      rating: gig.freelancerProfile?.ratingAverage || 0,
      reviewCount: gig.freelancerProfile?.ratingCount || 0,
      isVerified: gig.freelancerProfile?.isVerified,
      memberSince: gig.freelancerProfile?._creationTime,
    },
    packages: (gig.packages || []).map(pkg => ({
      _id: pkg._id,
      tier: pkg.tier,
      title: pkg.title,
      description: pkg.description,
      price: pkg.price,
      currency: pkg.currency || "EUR",
      deliveryDays: pkg.deliveryDays,
      revisionCount: pkg.revisionCount || 0,
      features: pkg.features || [],
    })),
    images: (gig.images || []).map(img => ({
      _id: img._id,
      url: img.url,
      alt: img.alt || gig.title,
    })),
  };
}
```

**Step 2: Update service/[id]/page.jsx**

Convert to client component that uses the hook. Keep the Freeio template structure (ServiceDetail3, Breadcumb3, etc.) but pass Convex data as props. The `[id]` param is used as the slug.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: wire service detail page to Convex"
```

---

### Task 4: Freelancer detail page with Convex data

**Files:**
- Create: `src/hook/useConvexFreelancerDetail.js`
- Modify: `src/app/(freelancer)/freelancer/[id]/page.jsx`
- Reference: `convex/marketplace/freelancers.ts` → `getById` + `getReviews`

**Step 1: Create freelancer detail hook**

Similar pattern to Task 3 but calls `freelancers.getById` and `freelancers.getReviews`.

**Step 2: Update freelancer/[id]/page.jsx**

Wire FreelancerDetail3 component to Convex data.

**Step 3: Commit**

---

### Task 5: Project detail page with Convex data + bid form

**Files:**
- Create: `src/hook/useConvexProjectDetail.js`
- Modify: `src/app/(project)/project/[id]/page.jsx`
- Reference: `convex/marketplace/projects.ts` → `getBySlug`, `getBids`, `submitBid`

**Step 1: Create project detail hook**

Calls `projects.getBySlug` and enriches with bid data.

**Step 2: Update project/[id]/page.jsx**

Wire to Convex data. Add "Place Bid" form that calls `projects.submitBid` mutation.

**Step 3: Commit**

---

### Task 6: Job detail page with Convex data

**Files:**
- Create: `src/hook/useConvexJobDetail.js`
- Modify: `src/app/(job)/job/[id]/page.jsx`
- Reference: `convex/marketplace/jobs.ts` → `getBySlug`

**Step 1-3:** Same pattern as Tasks 3-5.

---

## Phase 3: Dashboard - Profile & Services

### Task 7: My Profile page with Convex

**Files:**
- Create: `src/hook/useConvexProfile.js`
- Modify: `src/components/dashboard/section/MyProfileInfo.jsx`
- Modify: `src/components/dashboard/section/ProfileDetails.jsx`
- Reference: `convex/marketplace/freelancers.ts` → `getByUserId`, `updateProfile`

**Step 1: Create profile hook**

```javascript
"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function useConvexProfile() {
  const { user: clerkUser } = useUser();
  // Get the Convex user by Clerk email
  const convexUser = useQuery(api.users.getByEmail,
    clerkUser?.emailAddresses?.[0]?.emailAddress
      ? { email: clerkUser.emailAddresses[0].emailAddress }
      : "skip"
  );

  const profile = useQuery(api.marketplace.freelancers.getByUserId,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  const updateProfile = useMutation(api.marketplace.freelancers.updateProfile);

  return { convexUser, profile, updateProfile };
}
```

**Step 2: Wire ProfileDetails.jsx to Convex**

Replace static form with controlled inputs. On submit, call `updateProfile` mutation.

**Step 3: Wire Skill.jsx, Education.jsx, WorkExperience.jsx**

Map profile fields to form inputs.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: wire my-profile dashboard to Convex"
```

---

### Task 8: Add Services page with Convex

**Files:**
- Modify: `src/components/dashboard/section/AddServiceInfo.jsx`
- Modify: `src/components/dashboard/section/BasicInformation.jsx`
- Modify: `src/components/dashboard/section/ServicePackage.jsx`
- Modify: `src/components/dashboard/section/ServiceGallery.jsx`
- Reference: `convex/marketplace/gigs.ts` → `create`, `createPackage`

**Step 1: Wire BasicInformation to form state**

Convert to controlled component with title, description, category select, tags.

**Step 2: Wire ServicePackage to form state**

Package tier inputs (basic/standard/premium) with price, delivery days, features.

**Step 3: Wire AddServiceInfo submit handler**

On form submit:
1. Call `gigs.create()` to create the gig
2. Call `gigs.createPackage()` for each package tier
3. Redirect to `/manage-services`

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: wire add-services form to Convex"
```

---

### Task 9: Manage Services page with Convex

**Files:**
- Modify: `src/components/dashboard/section/ManageServiceInfo.jsx`
- Modify: `src/components/dashboard/card/ManageServiceCard1.jsx`
- Reference: `convex/marketplace/gigs.ts` → `getAllByFreelancer`, `update`, `remove`

**Step 1: Create useConvexMyGigs hook**

Calls `gigs.getAllByFreelancer` with the current user's freelancer profile ID.

**Step 2: Wire ManageServiceInfo**

Replace `manageService` static data with Convex data. Filter by tab (Active, Pending, etc.) using gig.status field.

**Step 3: Wire ManageServiceCard1**

- Edit button: Opens modal or navigates to edit page
- Delete button: Calls `gigs.remove()` mutation
- Status display from Convex data

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: wire manage-services to Convex"
```

---

## Phase 4: Dashboard - Projects & Bids

### Task 10: Create Projects page with Convex

**Files:**
- Modify: `src/components/dashboard/section/CreateProjectInfo.jsx`
- Reference: `convex/marketplace/projects.ts` → `create`

**Step 1-3:** Wire form fields to `projects.create()` mutation. Fields: title, description, category, budget min/max, deadline, required skills, work type.

**Step 4: Commit**

---

### Task 11: Manage Projects page with Convex

**Files:**
- Modify: `src/components/dashboard/section/ManageProjectInfo.jsx`
- Modify: `src/components/dashboard/card/ManageProjectCard.jsx`
- Reference: `convex/marketplace/projects.ts` → `getByClient`, `getBids`, `acceptBid`

**Step 1: Wire ManageProjectInfo**

Fetch projects via `projects.getByClient`. Show bid count per project.

**Step 2: Wire bid viewing**

Click on project shows bids (via `projects.getBids`). Each bid shows freelancer info, amount, delivery time.

**Step 3: Wire bid acceptance**

"Accept Bid" button calls `projects.acceptBid`.

**Step 4: Commit**

---

### Task 12: Proposals page with Convex

**Files:**
- Modify: `src/components/dashboard/section/ProposalInfo.jsx`
- Modify: `src/components/dashboard/card/ProposalCard1.jsx`
- Reference: `convex/marketplace/projects.ts` → `getMyBids`

**Step 1-3:** Wire to `projects.getMyBids()` for freelancer's submitted bids. Show status (pending/accepted/rejected), project title, bid amount.

**Step 4: Commit**

---

## Phase 5: Dashboard - Overview & Transactions

### Task 13: Dashboard overview with real stats

**Files:**
- Modify: `src/components/dashboard/section/DashboardInfo.jsx`
- Reference: `convex/marketplace/dashboard.ts` → `getStats`, `getRecentOrders`

**Step 1: Wire DashboardInfo**

Replace hardcoded statistics with Convex data:
- Total services (gig count)
- Total orders
- Total earnings
- Unread messages
- Recent orders list
- Chart data from real transactions

**Step 2: Commit**

---

### Task 14: Payouts page with earnings data

**Files:**
- Modify: `src/components/dashboard/section/PayoutInfo.jsx`
- Modify: `src/components/dashboard/card/PayoutCard1.jsx`
- Reference: `convex/marketplace/orders.ts` → `getByUser`

**Step 1:** Wire to orders data, calculate total earnings (sum of freelancerEarnings from completed orders).

**Step 2: Commit**

---

### Task 15: Statements page with transaction history

**Files:**
- Modify: `src/components/dashboard/section/StatementInfo.jsx`
- Modify: `src/components/dashboard/card/StatementCard1.jsx`

**Step 1:** Create `useConvexTransactions` hook. Wire to transaction data.

**Step 2: Commit**

---

## Phase 6: Messaging

### Task 16: Message inbox with polling

**Files:**
- Create: `src/hook/useConvexMessages.js`
- Modify: `src/components/dashboard/section/MessageInfo.jsx`
- Modify: `src/components/dashboard/card/UserChatList1.jsx`
- Modify: `src/components/dashboard/element/MessageBox.jsx`
- Reference: `convex/chat/conversations.ts`, `convex/chat/messages.ts`

**Step 1: Create messaging hook**

```javascript
"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";

export default function useConvexMessages(userId) {
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  // Convex useQuery auto-subscribes to real-time updates
  // No manual polling needed - Convex handles reactivity
  const conversations = useQuery(api.chat.conversations.list,
    userId ? { userId } : "skip"
  );

  const messages = useQuery(api.chat.messages.getByConversation,
    selectedConversationId
      ? { conversationId: selectedConversationId }
      : "skip"
  );

  const sendMessage = useMutation(api.chat.messages.send);
  const markRead = useMutation(api.chat.messages.markRead);
  const createConversation = useMutation(api.chat.conversations.create);

  return {
    conversations: conversations || [],
    messages: messages || [],
    selectedConversationId,
    setSelectedConversationId,
    sendMessage,
    markRead,
    createConversation,
  };
}
```

**Note:** Convex `useQuery` is reactive - it automatically re-fetches when data changes on the server. This gives us real-time updates without polling. However, for updates from OTHER users, Convex subscriptions handle this natively.

**Step 2: Wire MessageInfo.jsx**

Replace `msgList` static data with `conversations` from hook. Left panel shows conversation list, right panel shows messages.

**Step 3: Wire UserChatList1.jsx**

Map conversation data to card props: other participant name, avatar, last message preview, unread status.

**Step 4: Wire MessageBox.jsx**

- Display messages from selected conversation
- Input field calls `sendMessage` mutation on submit
- Auto-scroll to bottom on new messages
- Call `markRead` when conversation is selected

**Step 5: Add "Contact" button on freelancer detail**

On `/freelancer/[id]` page, add button that calls `conversations.create()` and redirects to `/message`.

**Step 6: Commit**

```bash
git add -A && git commit -m "feat: wire messaging inbox to Convex"
```

---

## Phase 7: Notifications

### Task 17: Notification bell in header

**Files:**
- Create: `src/components/header/NotificationBell.jsx`
- Modify: `src/components/header/Header19.jsx` (authenticated header)
- Modify: `src/components/dashboard/header/DashboardHeader.jsx`
- Reference: `convex/marketplace/notifications.ts`

**Step 1: Create NotificationBell component**

```jsx
"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function NotificationBell({ userId }) {
  const unreadCount = useQuery(api.marketplace.notifications.getUnreadCount,
    userId ? { userId } : "skip"
  );
  const notifications = useQuery(api.marketplace.notifications.list,
    userId ? { userId, limit: 10 } : "skip"
  );
  const markRead = useMutation(api.marketplace.notifications.markRead);
  const markAllRead = useMutation(api.marketplace.notifications.markAllRead);

  return (
    <div className="dropdown">
      <button className="notification-bell" data-bs-toggle="dropdown">
        <i className="flaticon-notification" />
        {unreadCount > 0 && (
          <span className="badge">{unreadCount}</span>
        )}
      </button>
      <div className="dropdown-menu notification-dropdown">
        <div className="notification-header">
          <h6>Notifications</h6>
          {unreadCount > 0 && (
            <button onClick={() => markAllRead({ userId })}>
              Mark all read
            </button>
          )}
        </div>
        {(notifications || []).map(notif => (
          <a
            key={notif._id}
            href={notif.link || "#"}
            className={`notification-item ${!notif.isRead ? "unread" : ""}`}
            onClick={() => !notif.isRead && markRead({ notificationId: notif._id })}
          >
            <strong>{notif.title}</strong>
            <p>{notif.body}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Add to Header19 and DashboardHeader**

Insert `<NotificationBell userId={convexUser._id} />` in the authenticated section of both headers, between Dashboard link and user avatar.

**Step 3: Add notification creation to mutations**

Verify that existing mutations (orders.create, orders.deliver, projects.submitBid, etc.) already create notifications. If not, add `ctx.runMutation(internal.marketplace.notifications.create, ...)` calls.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: add notification bell to headers"
```

---

## Phase 8: Reviews & Saved Items

### Task 18: Reviews page with Convex

**Files:**
- Modify: `src/components/dashboard/section/ReviewsInfo.jsx`
- Modify: `src/components/dashboard/element/ReviewComment.jsx`
- Reference: `convex/marketplace/reviews.ts` → `getByUserId`

**Step 1:** Wire ReviewsInfo to `reviews.getByUserId()`. Display star ratings, reviewer info, review text.

**Step 2: Commit**

---

### Task 19: Saved items page with Convex

**Files:**
- Modify: `src/components/dashboard/section/SavedInfo.jsx`
- Reference: `convex/marketplace/savedItems.ts` → `list`, `remove`

**Step 1:** Wire SavedInfo to `savedItems.list()`. Add remove button that calls `savedItems.remove()`.

**Step 2: Add save/unsave buttons on listing pages**

On service, freelancer, and project cards: add heart icon that calls `savedItems.save()` / `savedItems.remove()`.

**Step 3: Commit**

---

### Task 20: Review submission on order detail

**Files:**
- Create: `src/components/dashboard/modal/ReviewModal.jsx`
- Reference: `convex/marketplace/reviews.ts` → `create`

**Step 1:** Create ReviewModal with star rating inputs (overall, communication, quality, timeliness, value) and text area. On submit, call `reviews.create()`.

**Step 2:** Add "Leave Review" button on completed orders in dashboard.

**Step 3: Commit**

---

## Phase 9: Order Flow (Without Stripe)

### Task 21: Order creation flow

**Files:**
- Create: `src/components/section/OrderButton.jsx`
- Modify: `src/app/(service)/service/[id]/page.jsx` (add order button)
- Reference: `convex/marketplace/orders.ts` → `create`

**Step 1: Create OrderButton component**

When user selects a package on the gig detail page, show "Order Now" button. On click:
1. Call `orders.create()` with gig ID, package ID, amount, delivery days
2. Create a conversation between client and freelancer
3. Redirect to order confirmation page or dashboard

**Step 2: Create order confirmation page**

Show order details with status `pending_payment`. Display message: "Your order has been created. Payment integration coming soon."

**Step 3: Commit**

---

### Task 22: Order management in dashboard

**Files:**
- Create: `src/components/dashboard/section/OrdersInfo.jsx`
- Create: `src/components/dashboard/card/OrderCard.jsx`
- Create: `src/app/(dashboard)/orders/page.jsx` (new route)
- Reference: `convex/marketplace/orders.ts` → `getByUser`, `deliver`, `approve`, `requestRevision`

**Step 1:** Create orders dashboard page showing all orders for user (as client or freelancer). Display order status, amount, delivery date.

**Step 2:** Add action buttons based on role and status:
- Freelancer: "Mark as Delivered" (calls `orders.deliver()`)
- Client: "Approve" (calls `orders.approve()`), "Request Revision" (calls `orders.requestRevision()`)

**Step 3:** Add orders route to navigation and middleware.

**Step 4: Commit**

---

## Phase 10: Final Integration & Polish

### Task 23: Add missing Convex queries if needed

**Files:**
- Possibly modify: `convex/marketplace/dashboard.ts`
- Possibly modify: `convex/users.ts`

**Step 1:** Verify `users.getByEmail` query exists (needed by profile hook). If not, create it.

**Step 2:** Verify `dashboard.getStats` returns all needed data for DashboardInfo. Add missing aggregations.

**Step 3: Commit**

---

### Task 24: Update navigation for new order route

**Files:**
- Modify: `src/data/dashboard.js` (add orders to navigation)
- Modify: `src/data/navigation.js` (add orders to menu)
- Modify: `middleware.ts` (add /orders to protected routes if needed)

**Step 1-3:** Add "My Orders" nav item to dashboard sidebar, main nav.

**Step 4: Commit**

---

### Task 25: Build verification and smoke test

**Step 1: Build**
```bash
npm run build
```

**Step 2: Verify all routes**

Start dev server and verify:
- [ ] / (homepage)
- [ ] /services (listing)
- [ ] /service/[slug] (detail with Convex data)
- [ ] /freelancers (listing)
- [ ] /freelancer/[id] (detail with Convex data)
- [ ] /projects (listing)
- [ ] /project/[slug] (detail with bid form)
- [ ] /jobs (listing)
- [ ] /job/[slug] (detail)
- [ ] /dashboard (overview with stats)
- [ ] /manage-services (gig list from Convex)
- [ ] /add-services (create gig form)
- [ ] /manage-projects (projects + bids)
- [ ] /create-projects (create project form)
- [ ] /message (messaging inbox)
- [ ] /my-profile (profile editor)
- [ ] /reviews (received reviews)
- [ ] /saved (favorites)
- [ ] /proposal (sent bids)
- [ ] /payouts (earnings)
- [ ] /statements (transactions)

**Step 3: Grep verification**

```bash
# No remaining placeholder/static data in wired components
grep -r "product1\|job1\|msgList\|manageService" src/components/dashboard/section/ --include="*.jsx"
```

**Step 4: Final commit**

```bash
git add -A && git commit -m "feat: marketplace fully wired to Convex backend"
```

---

## Dependency Graph

```
Phase 1 (Email) ──────────────────────────────────────┐
Phase 2 (Detail Pages) ──────────┐                     │
Phase 3 (Profile & Services) ────┤                     │
Phase 4 (Projects & Bids) ───────┤── Phase 10 (Polish) │
Phase 5 (Dashboard Overview) ────┤                     │
Phase 6 (Messaging) ─────────────┤                     │
Phase 7 (Notifications) ─────────┤                     │
Phase 8 (Reviews & Saved) ───────┤                     │
Phase 9 (Order Flow) ────────────┘                     │
                                                        │
Email triggers fire from Phases 4, 6, 8, 9 ◄───────────┘
```

Phases 2-9 can be executed in parallel (independent features). Phase 1 should go first (email infra). Phase 10 goes last (integration test).
