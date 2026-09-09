// Reconciled with the existing development deployment (2026-09-07).
import { classifyLegacyOnlineProviderProfile } from "../lib/onlineMarketplace";
import { mutation } from "../_generated/server";
import { requireAdmin } from "../lib/authHelpers";
import { requireServerSecret } from "../lib/authHelpers";
import { v } from "convex/values";
var b = v.union(v.literal("explicit_online_work_type"), v.literal("legacy_online_account_context")),
  g = v.union(v.literal("already_classified"), v.literal("local_or_hybrid_work_type"), v.literal("profile_user_mismatch"), v.literal("tenant_mismatch"), v.literal("local_account_context"), v.literal("local_profile_signals"), v.literal("insufficient_online_evidence")),
  w = v.object({
    profileId: v.id("freelancerProfiles"),
    workTypeBefore: v.union(v.string(), v.null()),
    workTypeAfter: v.union(v.literal("remote"), v.literal("online")),
    evidence: b
  }),
  k = v.object({
    reason: g,
    count: v.number()
  }),
  backfillLegacyOnlineProviderRoles = mutation({
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
      candidates: v.array(w),
      skipped: v.array(k)
    }),
    handler: async (ctx, args) => {
      args.serverSecret ? requireServerSecret(args.serverSecret) : await requireAdmin(ctx);
      let y = Math.min(Math.max(args.batchSize ?? 100, 1), 250),
        o = await ctx.db.query("freelancerProfiles").paginate({
          cursor: args.cursor ?? null,
          numItems: y
        }),
        l = [],
        a = new Map(),
        s = 0,
        m = Date.now();
      for (let n of o.page) {
        let c = await ctx.db.get(n.userId),
          r = classifyLegacyOnlineProviderProfile(n, c);
        if (r.eligible === !1) {
          a.set(r.reason, (a.get(r.reason) ?? 0) + 1);
          continue;
        }
        l.push({
          profileId: n._id,
          workTypeBefore: n.workType ?? null,
          workTypeAfter: r.workType,
          evidence: r.evidence
        }), args.dryRun || (await ctx.db.patch(n._id, {
          providerRole: r.providerRole,
          workType: r.workType,
          updatedAt: m
        }), s += 1);
      }
      return {
        dryRun: args.dryRun,
        scanned: o.page.length,
        eligible: l.length,
        updated: s,
        isDone: o.isDone,
        nextCursor: o.isDone ? null : o.continueCursor,
        candidates: l,
        skipped: [...a.entries()].map(([n, c]) => ({
          reason: n,
          count: c
        }))
      };
    }
  });
export { backfillLegacyOnlineProviderRoles };
