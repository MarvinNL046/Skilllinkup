# Services on Public Profile — Design Document

**Date**: 2026-03-04
**Status**: Approved
**Scope**: Public freelancer profile page (`/freelancer/[id]`) — read-only display of services/gigs with package pricing

---

## Overview

Add a "Services" section to the public freelancer profile page that displays the freelancer's active gigs with a package comparison table (Basic / Standard / Premium). Clicking a package opens the existing messaging system with the package name + gig title pre-filled as the subject.

The existing gig system (`/add-services`, `/manage-services`) is unchanged — this sprint is display-only.

---

## Route

**Existing route**: `/freelancer/[id]`
**Component**: `src/components/section/FreelancerDetails3.jsx`

---

## New Section: Services

Placed **above Portfolio**, below the profile header + bio.

### Layout per gig

Each active gig renders a package comparison table:

```
[Gig title]
┌─────────────────┬────────────────┬─────────────────┐
│    Basic        │   Standard     │    Premium      │
│   €800          │   €1.500       │   €3.000        │
├─────────────────┼────────────────┼─────────────────┤
│ Delivery: 7d    │ Delivery: 14d  │ Delivery: 21d   │
│ 2 revisies      │ 3 revisies     │ Onbeperkt       │
│ • Feature A     │ • Feature A    │ • Feature A     │
│                 │ • Feature B    │ • Feature B     │
│                 │                │ • Feature C     │
├─────────────────┼────────────────┼─────────────────┤
│ [Contact]       │ [Contact]      │ [Contact]       │
└─────────────────┴────────────────┴─────────────────┘
```

- Only packages that exist are shown (a gig may have only Basic, or Basic + Standard, etc.)
- If a gig has no packages, it is not shown
- Gig description shown above the table as context
- "Contact" button uses existing messaging: opens `/dashboard/messages` (or ContactButton component) with subject pre-filled as `"[Gig title] — [Package tier]"`

---

## Convex

### New query: `getByFreelancerWithPackages`

**File**: `convex/marketplace/gigs.ts`

Returns all active gigs for a freelancer, each enriched with their packages. Single call, no N+1.

```typescript
export const getByFreelancerWithPackages = query({
  args: { freelancerId: v.id("freelancerProfiles") },
  handler: async (ctx, args) => {
    const gigs = await ctx.db
      .query("gigs")
      .withIndex("by_freelancer", (q) => q.eq("freelancerId", args.freelancerId))
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();

    return await Promise.all(
      gigs.map(async (gig) => {
        const packages = await ctx.db
          .query("gigPackages")
          .withIndex("by_gig", (q) => q.eq("gigId", gig._id))
          .collect();
        return { ...gig, packages };
      })
    );
  },
});
```

---

## UI Component

### `GigsSection` (inline in FreelancerDetails3.jsx)

```jsx
function GigsSection({ freelancerProfileId, recipientUserId }) {
  const gigs = useQuery(
    api.marketplace.gigs.getByFreelancerWithPackages,
    freelancerProfileId ? { freelancerId: freelancerProfileId } : "skip"
  );

  // Filter gigs that have at least one package
  const gigsWithPackages = (gigs || []).filter(g => g.packages.length > 0);
  if (!gigsWithPackages.length) return null;

  return (
    <div className="...mb30">
      <h4>Services</h4>
      {gigsWithPackages.map(gig => (
        <GigPackageTable key={gig._id} gig={gig} recipientUserId={recipientUserId} />
      ))}
    </div>
  );
}
```

### `GigPackageTable`

- Renders gig title + description
- Renders a responsive Bootstrap table with one column per package (max 3)
- Tier order: basic → standard → premium
- Each column: tier label, price (€ formatted), delivery days, revision count, features list, Contact button
- Contact button: links to `/dashboard/messages?recipientId=X&subject=encodeURIComponent("[Gig] — [Tier]")`

---

## Data Flow

```
FreelancerDetails3
  └── GigsSection
        useQuery(getByFreelancerWithPackages, { freelancerId })
        └── GigPackageTable (per gig)
              └── Contact button → /dashboard/messages?recipientId=...&subject=...
```

---

## Technical Notes

- `freelancerProfileId` = the `_id` from `freelancerProfiles` (same as URL param `id`)
- `recipientUserId` = `convexData.userId` (Convex user ID, already available)
- No new tables or schema changes needed
- Currency: use `package.currency || "EUR"` with `toLocaleString` formatting
- Packages without `features` array: skip the features rows
- Mobile: table scrolls horizontally (Bootstrap `table-responsive`)
