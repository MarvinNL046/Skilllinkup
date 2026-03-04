# Services on Public Profile — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Show a freelancer's active gigs with a Basic/Standard/Premium package comparison table on their public profile page.

**Architecture:** Add one new Convex query (`getByFreelancerWithPackages`) that returns gigs enriched with all their packages. Add a `GigsSection` + `GigPackageTable` component inline in `FreelancerDetails3.jsx` — no new files needed. The Contact button links to the messaging page with the gig+tier pre-filled as subject.

**Tech Stack:** Next.js 15, React 19, Convex, Bootstrap table classes, existing `flaticon` icon set.

**Design doc:** `docs/plans/2026-03-04-services-on-profile-design.md`

---

## Task 1: Add `getByFreelancerWithPackages` Convex query

**Files:**
- Modify: `convex/marketplace/gigs.ts` (append at end of file)

**Context:** The existing `getByFreelancer` query returns gigs with only the cheapest package price. We need all packages per gig so we can render the full comparison table. The `gigPackages` table has an index `by_gig` on `gigId`. We don't filter by locale here — on the profile page we show all active gigs regardless of locale.

**Step 1: Append query to `convex/marketplace/gigs.ts`**

After the last export in the file, add:

```typescript
/**
 * Get all active gigs for a freelancer, each enriched with all their packages.
 * Used on the public freelancer profile page.
 */
export const getByFreelancerWithPackages = query({
  args: {
    freelancerId: v.id("freelancerProfiles"),
  },
  handler: async (ctx, args) => {
    const gigs = await ctx.db
      .query("gigs")
      .withIndex("by_freelancer", (q) => q.eq("freelancerId", args.freelancerId))
      .filter((q) => q.eq(q.field("status"), "active"))
      .collect();

    const enriched = await Promise.all(
      gigs.map(async (gig) => {
        const packages = await ctx.db
          .query("gigPackages")
          .withIndex("by_gig", (q) => q.eq("gigId", gig._id))
          .collect();

        // Sort packages: basic → standard → premium
        const tierOrder = { basic: 0, standard: 1, premium: 2 };
        packages.sort((a, b) => (tierOrder[a.tier] ?? 99) - (tierOrder[b.tier] ?? 99));

        return { ...gig, packages };
      })
    );

    // Only return gigs that have at least one package
    return enriched.filter((g) => g.packages.length > 0);
  },
});
```

**Step 2: Push to Convex dev**

```bash
npx convex dev --once
```

Expected output: `✔ Convex functions ready!` — no errors.

**Step 3: Commit**

```bash
git add convex/marketplace/gigs.ts
git commit -m "feat: add getByFreelancerWithPackages Convex query"
```

---

## Task 2: Add GigsSection to the public profile page

**Files:**
- Modify: `src/components/section/FreelancerDetails3.jsx`

**Context:** `FreelancerDetails3.jsx` already imports `api` and `useQuery`. The component has `convexData` (the freelancer profile) available, which gives us `convexData._id` (the freelancerProfiles doc ID) and `convexData.userId` (for the contact link). We insert a `GigsSection` between the bio and the `<PortfolioSection>`.

The Contact button links to `/dashboard/messages` with two query params:
- `recipientId` = `convexData.userId`
- `subject` = URL-encoded `"[Gig title] — [Tier label]"`

**Step 1: Add `GigPackageTable` component (insert before `PortfolioSection` function)**

In `FreelancerDetails3.jsx`, before the `function PortfolioSection` definition, insert:

```jsx
const TIER_LABELS = { basic: "Basic", standard: "Standard", premium: "Premium" };

function GigPackageTable({ gig, recipientUserId }) {
  const packages = gig.packages;

  return (
    <div className="mb30">
      <h5 className="mb5">{gig.title}</h5>
      {gig.description && (
        <p className="text fz14 mb15" style={{ maxWidth: 680 }}>
          {gig.description.length > 200 ? gig.description.slice(0, 200) + "…" : gig.description}
        </p>
      )}
      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center mb-0" style={{ minWidth: 480 }}>
          <thead className="bgc-thm-light">
            <tr>
              {packages.map((pkg) => (
                <th key={pkg._id} className="fz15 fw600 p20">
                  {TIER_LABELS[pkg.tier] || pkg.tier}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Package title */}
            <tr>
              {packages.map((pkg) => (
                <td key={pkg._id} className="fz14 fw500 p15">{pkg.title}</td>
              ))}
            </tr>
            {/* Price */}
            <tr className="bgc-light">
              {packages.map((pkg) => (
                <td key={pkg._id} className="fz20 fw700 p15 dark-color">
                  {(pkg.price).toLocaleString("nl-NL", {
                    style: "currency",
                    currency: pkg.currency || "EUR",
                    maximumFractionDigits: 0,
                  })}
                </td>
              ))}
            </tr>
            {/* Delivery */}
            <tr>
              {packages.map((pkg) => (
                <td key={pkg._id} className="fz13 text p15">
                  <i className="flaticon-clock me-1" />
                  {pkg.deliveryDays} {pkg.deliveryDays === 1 ? "day" : "days"} delivery
                </td>
              ))}
            </tr>
            {/* Revisions */}
            {packages.some((p) => p.revisionCount != null) && (
              <tr>
                {packages.map((pkg) => (
                  <td key={pkg._id} className="fz13 text p15">
                    <i className="flaticon-cycle me-1" />
                    {pkg.revisionCount != null ? `${pkg.revisionCount} revision${pkg.revisionCount !== 1 ? "s" : ""}` : "—"}
                  </td>
                ))}
              </tr>
            )}
            {/* Features */}
            {packages.some((p) => p.features && p.features.length > 0) && (
              <tr>
                {packages.map((pkg) => (
                  <td key={pkg._id} className="fz13 text p15" style={{ verticalAlign: "top" }}>
                    {(pkg.features || []).map((f, i) => (
                      <div key={i} className="d-flex align-items-center justify-content-center gap-1 mb5">
                        <i className="flaticon-check text-success fz12" />
                        <span>{String(f)}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            )}
            {/* CTA row */}
            <tr>
              {packages.map((pkg) => {
                const subject = encodeURIComponent(`${gig.title} — ${TIER_LABELS[pkg.tier] || pkg.tier}`);
                const href = recipientUserId
                  ? `/dashboard/messages?recipientId=${recipientUserId}&subject=${subject}`
                  : "#";
                return (
                  <td key={pkg._id} className="p15">
                    <a href={href} className="ud-btn btn-thm btn-sm w-100">
                      Contact
                      <i className="fal fa-arrow-right-long ms-1" />
                    </a>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GigsSection({ freelancerProfileId, recipientUserId }) {
  const gigs = useQuery(
    api.marketplace.gigs.getByFreelancerWithPackages,
    freelancerProfileId ? { freelancerId: freelancerProfileId } : "skip"
  );

  if (!gigs || gigs.length === 0) return null;

  return (
    <div className="px30 pt30 pb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1 mb30">
      <h4 className="mb25">Services</h4>
      {gigs.map((gig, idx) => (
        <div key={gig._id}>
          {idx > 0 && <hr className="my30" />}
          <GigPackageTable gig={gig} recipientUserId={recipientUserId} />
        </div>
      ))}
    </div>
  );
}
```

**Step 2: Wire `GigsSection` into the main component**

In `FreelancerDetails3.jsx`, find the section where `<PortfolioSection>` is rendered:

```jsx
{/* Portfolio */}
<PortfolioSection userId={convexData.userId} />
```

Replace it with:

```jsx
{/* Services */}
<GigsSection freelancerProfileId={id} recipientUserId={convexData.userId} />

{/* Portfolio */}
<PortfolioSection userId={convexData.userId} />
```

Note: `id` is already available from `const { id } = useParams();` at the top of the component.

**Step 3: Verify visually**

1. Go to `http://localhost:3000/freelancer/k17dvbqycgsw5dz2tvzz9bh7pd8208q6` (Sophie demo profile).
2. If Sophie has no gigs yet: no Services section appears (correct — it's conditional).
3. Create a test gig via `/add-services` (log in as Sophie's account), add packages. The Services section should appear with the package comparison table.
4. Verify: price formatted as `€800`, delivery days, revisions shown, Contact button links to `/dashboard/messages?recipientId=...&subject=...`.

**Step 4: Commit**

```bash
git add src/components/section/FreelancerDetails3.jsx
git commit -m "feat: show services with package comparison table on public profile"
```
