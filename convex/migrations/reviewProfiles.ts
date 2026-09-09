// Reconciled with the existing development deployment (2026-09-07).
import { mutation } from "../_generated/server";
import { requireAdmin } from "../lib/authHelpers";
import { requireServerSecret } from "../lib/authHelpers";
import { v } from "convex/values";
var _ = v.union(v.literal("already_attributed"), v.literal("review_targets_client"), v.literal("missing_order"), v.literal("missing_profile"), v.literal("reviewee_mismatch"), v.literal("tenant_mismatch")),
  g = v.object({
    reviewId: v.id("marketplaceReviews"),
    profileId: v.id("freelancerProfiles"),
    orderId: v.id("orders")
  }),
  backfillRevieweeProfileIds = mutation({
    args: {
      dryRun: v.boolean(),
      cursor: v.optional(v.union(v.string(), v.null())),
      batchSize: v.optional(v.number()),
      serverSecret: v.optional(v.string())
    },
    returns: v.object({
      dryRun: v.boolean(),
      scanned: v.number(),
      eligible: v.number(),
      updated: v.number(),
      isDone: v.boolean(),
      nextCursor: v.union(v.string(), v.null()),
      candidates: v.array(g),
      skipped: v.array(v.object({
        reason: _,
        count: v.number()
      }))
    }),
    handler: async (ctx, args) => {
      args.serverSecret ? requireServerSecret(args.serverSecret) : await requireAdmin(ctx);
      let b = Math.min(Math.max(args.batchSize ?? 100, 1), 250),
        o = await ctx.db.query("marketplaceReviews").paginate({
          cursor: args.cursor ?? null,
          numItems: b
        }),
        l = [],
        s = new Map(),
        t = r => {
          s.set(r, (s.get(r) ?? 0) + 1);
        },
        c = 0;
      for (let r of o.page) {
        if (r.revieweeProfileId) {
          t("already_attributed");
          continue;
        }
        if (r.reviewerRole !== "client") {
          t("review_targets_client");
          continue;
        }
        if (!r.orderId) {
          t("missing_order");
          continue;
        }
        let i = await ctx.db.get(r.orderId);
        if (!i) {
          t("missing_order");
          continue;
        }
        let d = i.freelancerId ? await ctx.db.get(i.freelancerId) : null;
        if (!d) {
          t("missing_profile");
          continue;
        }
        if (r.revieweeId !== d.userId) {
          t("reviewee_mismatch");
          continue;
        }
        if (r.tenantId !== i.tenantId || d.tenantId !== i.tenantId) {
          t("tenant_mismatch");
          continue;
        }
        l.push({
          reviewId: r._id,
          profileId: d._id,
          orderId: i._id
        }), args.dryRun || (await ctx.db.patch(r._id, {
          revieweeProfileId: d._id
        }), c += 1);
      }
      return {
        dryRun: args.dryRun,
        scanned: o.page.length,
        eligible: l.length,
        updated: c,
        isDone: o.isDone,
        nextCursor: o.isDone ? null : o.continueCursor,
        candidates: l,
        skipped: [...s.entries()].map(([r, i]) => ({
          reason: r,
          count: i
        }))
      };
    }
  });
export { backfillRevieweeProfileIds };
