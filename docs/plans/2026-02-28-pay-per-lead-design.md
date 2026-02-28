# Pay-Per-Lead Design — Local Marketplace

## Overview

Craftsmen (freelancers in the Local world) pay credits to claim leads (quote requests). Credits are purchased via Stripe and stored in Convex. Each lead can be claimed by up to 3 craftsmen (shared) or 1 craftsman (exclusive, costs 2x).

## Credit System

### Packages

| Package | Credits | Price | Per Credit |
|---------|---------|-------|------------|
| Starter | 5 | €25 | €5.00 |
| Popular | 10 | €45 | €4.50 |
| Pro | 25 | €99 | €3.96 |

Credits never expire. Purchased via Stripe Checkout, credited to freelancer profile on webhook confirmation.

### Lead Pricing (Variable by Budget)

| Quote Request Budget | Credit Cost (Shared) | Credit Cost (Exclusive) |
|---------------------|---------------------|------------------------|
| < €500 | 2 credits | 4 credits |
| €500 – €2,000 | 4 credits | 8 credits |
| > €2,000 | 6 credits | 12 credits |
| "Flexible" / no budget | 3 credits | 6 credits |

### Claim Rules

- **Shared**: Up to 3 craftsmen per lead. Each pays the shared credit cost.
- **Exclusive**: Only available when 0 slots are filled. Costs 2x. Locks out other craftsmen.
- Once 3 slots filled (or 1 exclusive), lead is closed to new claims.

## Data Model

### Schema Changes

**Existing `freelancerProfiles` — add field:**
```
creditBalance: v.optional(v.number())  // default 0
```

**Existing `quoteRequests` — add fields:**
```
maxSlots: v.optional(v.number())       // default 3
claimedSlots: v.optional(v.number())   // default 0
isExclusive: v.optional(v.boolean())   // default false
```

**New table: `leadClaims`**
```
quoteRequestId: v.id("quoteRequests")
freelancerId: v.id("users")
creditsSpent: v.number()
claimType: v.union(v.literal("shared"), v.literal("exclusive"))
claimedAt: v.number()  // Date.now()
```

**New table: `creditTransactions`**
```
freelancerId: v.id("users")
amount: v.number()           // positive = purchase, negative = spend
type: v.union(v.literal("purchase"), v.literal("spend"), v.literal("refund"))
description: v.string()      // e.g. "Purchased 10 credits", "Claimed lead #abc"
referenceId: v.optional(v.string())  // Stripe session ID or leadClaim ID
createdAt: v.number()
```

### Indexes

- `leadClaims` by `quoteRequestId` (check slot availability)
- `leadClaims` by `freelancerId` (my claimed leads)
- `creditTransactions` by `freelancerId` (transaction history)

## User Flows

### Flow 1: Buy Credits

1. Craftsman opens `/dashboard/credits` page
2. Sees current balance + 3 package options
3. Clicks "Buy" → Stripe Checkout session created
4. Pays → Stripe webhook fires → Convex mutation adds credits
5. Redirected back to dashboard with updated balance

### Flow 2: Browse & Claim Lead (Shared)

1. Craftsman visits `/local/quote-requests`
2. Sees list of open leads with: category, location, budget tier, slots remaining
3. **Before claim**: Client contact details are hidden
4. Clicks "Claim Lead" → confirmation modal shows credit cost
5. Credits deducted → `leadClaim` created → `claimedSlots` incremented
6. **After claim**: Client name, phone, email, full description revealed
7. Lead appears in craftsman's `/dashboard/my-leads` page

### Flow 3: Claim Lead (Exclusive)

1. Same as shared, but "Claim Exclusive" button only visible when 0 slots filled
2. Shows 2x credit cost in confirmation
3. On claim: `isExclusive = true`, `claimedSlots = 1`, `maxSlots = 1`
4. No other craftsmen can claim this lead

### Flow 4: Insufficient Credits

1. Craftsman clicks "Claim Lead" but balance too low
2. Modal shows: "You need X credits. You have Y."
3. CTA button: "Buy Credits" → redirects to `/dashboard/credits`

## Dashboard Pages

### `/dashboard/credits`
- Current credit balance (large number)
- 3 purchase cards (Starter / Popular / Pro)
- Transaction history table (date, type, amount, description)

### `/dashboard/my-leads`
- List of claimed leads with full client details
- Status indicators (new, contacted, quoted, completed)
- Filter by claim type (shared/exclusive)

## Architecture

- **Credits stored in Convex**: `freelancerProfiles.creditBalance` field
- **Stripe for purchases only**: One-time Checkout sessions, webhook credits account
- **Atomic claim**: Convex mutation checks balance + slot availability in single transaction
- **No refunds on claims**: Credits are non-refundable once a lead is claimed
- **Credit purchase refunds**: Handled manually via Stripe dashboard if needed

## Security

- Claim mutation verifies: authenticated user, sufficient balance, slots available, not already claimed by same user
- Credit balance changes only via server-side mutations (purchase webhook or claim)
- Client details only returned in queries where user has an active claim
