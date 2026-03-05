# Reward System Design

**Goal:** Increase retention and repeat orders for both clients and freelancers via a dual reward system — spend-based cashback tiers for clients, and performance-based levels for freelancers.

**Approach:** Lightweight tiers + levels (Aanpak A). Builds on existing `totalOrders`, `ratingAverage`, `completionRate` fields. No external payment integration — credits are platform-internal.

---

## 1. Client Rewards

### Tiers (based on yearly spend, Jan–Dec)

| Tier   | Annual Spend     | Cashback per completed order |
|--------|-----------------|------------------------------|
| Bronze | €0 – €999       | 3%                           |
| Silver | €1.000 – €4.999 | 5%                           |
| Gold   | €5.000+         | 7%                           |

### Rules
- Cashback is triggered automatically when a client approves an order (`orders.approve`)
- Credits land in `clientCreditBalance` on the `users` table
- Tier upgrades immediately when the yearly spend threshold is crossed (no downgrade during the year)
- Tier resets to Bronze on January 1st if spend falls below threshold (based on prior year)
- Only completed orders count toward spend and cashback
- Credits can be applied at checkout as a discount (max 50% of order amount)

### UI
- Dashboard widget: current tier badge, credit balance, yearly spend, progress bar to next tier
- Transaction history of earned/used credits
- Gold clients get a "Gold Client" badge on their public profile

---

## 2. Freelancer Levels

### Levels (automatic, based on existing profile metrics)

| Level      | Requirements                                                                 | Benefits                                              |
|------------|-----------------------------------------------------------------------------|-------------------------------------------------------|
| New        | Default starting level                                                       | Standard visibility                                   |
| Rising     | ≥5 orders + rating ≥4.5 + completion ≥85%                                 | "Rising" badge on profile, +1 priority in search     |
| Pro        | ≥20 orders + rating ≥4.7 + completion ≥90% + account ≥3 months old        | Verified-style badge, prominent placement, –1 credit on leads |
| Top Rated  | ≥50 orders + rating ≥4.9 + completion ≥95% + account ≥6 months old        | Blue "Top Rated" badge, top of search results, –2 credits on leads |

### Rules
- Level recalculated after every completed order via `rewards.recalculateFreelancerLevel()`
- Levels only go up — no automatic downgrade (admin can manually adjust)
- Existing fields used: `totalOrders`, `ratingAverage`, `completionRate`, `createdAt`

### UI
- Level badge visible on freelancer cards in search results
- Level badge + metrics on public profile
- Dashboard widget: current level, exact metrics vs. thresholds (progress bars)

---

## 3. Architecture

### Schema changes

**`users` table — 3 new fields:**
```
clientCreditBalance: number  (default 0, platform credits in cents)
clientTier: "bronze" | "silver" | "gold"  (default "bronze")
clientYearlySpend: number  (cumulative spend this calendar year in cents, reset Jan 1)
```

**`freelancerProfiles` table — 1 new field:**
```
level: "new" | "rising" | "pro" | "top_rated"  (default "new")
```

**`rewardTransactions` table — new:**
```
userId: Id<"users">
type: "cashback_earned" | "credit_used" | "tier_upgrade"
amount: number  (in cents)
orderId?: Id<"orders">
description: string
createdAt: number
```

### Convex functions — new file `convex/marketplace/rewards.ts`

| Function | Type | Description |
|---|---|---|
| `processOrderCashback(orderId)` | internal mutation | Called from `orders.approve`. Calculates cashback %, adds to `clientCreditBalance`, logs to `rewardTransactions`, upgrades tier if threshold crossed. |
| `recalculateFreelancerLevel(profileId)` | internal mutation | Called from `orders.approve`. Checks all level thresholds, updates `level` if needed. |
| `getClientRewards(userId)` | query | Dashboard: tier, balance, yearly spend, next tier progress. |
| `getFreelancerLevel(profileId)` | query | Profile + dashboard: level, exact metrics, progress to next level. |
| `applyCredits(orderId, creditsToUse)` | mutation | At checkout: deduct credits from balance, log transaction. |
| `getRewardHistory(userId)` | query | Paginated `rewardTransactions` for dashboard history tab. |

### Order approve flow

```
client calls orders.approve(orderId)
  → sets order status to "completed"
  → schedules rewards.processOrderCashback(orderId)      ← client gets cashback
  → schedules rewards.recalculateFreelancerLevel(profileId)  ← freelancer level check
```

### UI — new pages / components

| Location | What |
|---|---|
| `/dashboard/rewards` | Client rewards page: tier badge, credit balance, progress to next tier, transaction history |
| `/dashboard/profile` extended | Freelancer level widget with metrics progress bars |
| `FreelancerCard2` | Level badge chip below name |
| `FreelancerDetails3` | Level badge + tooltip on public profile |
| Checkout flow | "Apply credits" toggle (max 50% discount) |

---

## 4. Out of scope (YAGNI)

- Stripe integration for credit redemption (credits are internal-only)
- Automatic tier downgrade mid-year
- Referral bonuses
- Leaderboards
- Email notifications for tier upgrades (can add later via existing email system)
- Admin dashboard for manual credit/level adjustments (manual DB edits for now)
