# Marketplace Live Design

Date: 2026-02-25
Status: Approved

## Goal

Wire the existing Convex backend (40+ tables, full CRUD operations) to the Freeio template UI to create a working marketplace. Add email notifications via Resend. Stripe payments deferred to separate project.

## Existing Infrastructure

### Already Built (Convex Backend)
- **Schema**: freelancerProfiles, gigs, gigPackages, gigImages, projects, bids, jobs, orders, orderMilestones, orderDeliverables, transactions, marketplaceReviews, disputes, marketplaceCategories, conversations, messages, notifications, quoteRequests, quotes, savedItems, users, skills
- **Queries/Mutations**: Full CRUD for gigs, freelancers, projects, orders, reviews, disputes, messages, notifications, quotes, saved items
- **Platform fee model**: 15% (<$50), 12% ($50-500), 10% (>$500)
- **Hooks**: useConvexGigs, useConvexFreelancers, useConvexProjects, useConvexJobs (listing data)
- **Email templates**: 14 templates (React Email, EN/NL translations)
- **Auth**: Clerk with user sync to Convex

### Already Connected to UI
- Listing pages: /services, /freelancers, /projects, /jobs (via hooks)
- Auth: login/register via Clerk

### Template/Placeholder (Needs Work)
- Dashboard pages (14 pages, all using template placeholder data)
- Detail pages (service/[id], freelancer/[id], project/[id], job/[id])
- Email sending (no Resend installed, no triggers)
- Messaging UI (no polling frontend)
- Notification UI (no bell icon, no dropdown)

## Architecture Decisions

1. **UI approach**: Keep Freeio template components, wire to Convex data
2. **Messaging**: Polling-based (3-5 sec intervals), no WebSockets
3. **Payments**: Order creation without payment (status: pending_payment). Stripe later.
4. **Emails**: Resend via Convex HTTP actions
5. **No new dependencies** except: `resend`, `@react-email/render`

## Scope

### In Scope
1. Dashboard pages wired to Convex (14 pages)
2. Detail pages wired to Convex (4 page types with [id])
3. Messaging inbox with polling
4. Notification bell + dropdown
5. Email sending via Resend (triggers on marketplace events)
6. Order creation flow (without payment)
7. Bid/proposal submission
8. Review submission
9. Profile editing (freelancer)
10. Saved items (favorites)

### Out of Scope
- Stripe payments (separate project)
- Admin panel / dispute resolution UI
- Quote requests (local services)
- Analytics / reporting
- Custom UI rebuild (using Freeio template)

## Data Flow

```
User Action → Convex Mutation → DB Update + Notification + Email Trigger
                                          ↓
                                   Convex HTTP Action → Resend API → Email
```

## Email Triggers

| Event | Email Template | Recipient |
|-------|---------------|-----------|
| Order created | OrderConfirmationEmail | Client |
| Order created | NewOrderEmail | Freelancer |
| Bid placed | NewBidEmail | Project client |
| Bid accepted | BidAcceptedEmail | Freelancer |
| Bid rejected | BidRejectedEmail | Freelancer |
| Message sent | NewMessageEmail | Recipient (debounced) |
| Review created | ReviewReceivedEmail | Reviewed user |
| Order delivered | OrderDeliveredEmail | Client |
| Order completed | OrderCompletedEmail | Freelancer |
| Payment failed | PaymentFailedEmail | Client |

## Dashboard Pages

| Route | Data Source | Key Actions |
|-------|-----------|-------------|
| /dashboard | Aggregated stats | Overview |
| /manage-services | gigs.getByFreelancer() | View/edit/delete gigs |
| /add-services | gigs.create() | Create gig with packages |
| /manage-projects | projects.getByUser() | View projects + bids |
| /create-projects | projects.create() | Create project |
| /manage-jobs | jobs.getByUser() | Manage job postings |
| /message | conversations + messages | Polling inbox |
| /proposal | bids.getByFreelancer() | View sent proposals |
| /reviews | reviews.getByUserId() | View received reviews |
| /saved | savedItems.list() | Favorites |
| /my-profile | freelancers.updateProfile() | Edit profile |
| /payouts | orders earnings summary | Earnings (prep for Stripe) |
| /statements | transactions.getByUser() | Transaction history |
| /invoice | Template-based | Invoice generator |
