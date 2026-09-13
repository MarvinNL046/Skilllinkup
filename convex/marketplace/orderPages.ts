import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { query } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";
import { orderViewValidator } from "../lib/orderView";
import { remainingRevisions } from "../lib/orderLifecycle";

export const profiles = query({
  args: {},
  returns: v.array(
    v.object({ id: v.id("freelancerProfiles"), label: v.string() }),
  ),
  handler: async (ctx) => {
    const user = await requireAuthUser(ctx);
    const rows = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .take(101);
    if (rows.length > 100)
      throw new Error(
        "Too many provider profiles. Contact support to access your orders.",
      );
    return rows
      .filter((p) => p.tenantId === user.tenantId)
      .map((p) => ({
        id: p._id,
        label:
          (p.displayName || "Professional") +
          " · " +
          (p.providerRole === "local_professional" ? "Local" : "Online"),
      }));
  },
});

export const list = query({
  args: {
    role: v.union(v.literal("client"), v.literal("freelancer")),
    profileId: v.optional(v.id("freelancerProfiles")),
    paginationOpts: paginationOptsValidator,
  },
  returns: v.object({
    page: v.array(orderViewValidator),
    isDone: v.boolean(),
    continueCursor: v.string(),
    splitCursor: v.optional(v.union(v.string(), v.null())),
    pageStatus: v.optional(
      v.union(
        v.literal("SplitRecommended"),
        v.literal("SplitRequired"),
        v.null(),
      ),
    ),
  }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    if (args.role === "freelancer") {
      const profile = args.profileId ? await ctx.db.get(args.profileId) : null;
      if (
        !profile ||
        profile.userId !== user._id ||
        profile.tenantId !== user.tenantId
      )
        throw new Error("Unauthorized provider profile.");
    }
    const query =
      args.role === "client"
        ? ctx.db
            .query("orders")
            .withIndex("by_client", (q) => q.eq("clientId", user._id))
        : ctx.db
            .query("orders")
            .withIndex("by_freelancer", (q) =>
              q.eq("freelancerId", args.profileId),
            );
    const result = await query
      .order("desc")
      .paginate({
        ...args.paginationOpts,
        numItems: Math.min(50, Math.max(1, args.paginationOpts.numItems)),
      });
    const page = await Promise.all(
      result.page
        .filter((o) => o.tenantId === user.tenantId)
        .map(async (order) => {
          const client = await ctx.db.get(order.clientId);
          const profile = order.freelancerId
            ? await ctx.db.get(order.freelancerId)
            : null;
          const provider = profile ? await ctx.db.get(profile.userId) : null;
          return {
            ...order,
            remainingRevisions: remainingRevisions(order),
            deliveryVersion: order.deliveryVersion ?? 0,
            clientName: client?.name ?? null,
            freelancerName: profile?.displayName ?? provider?.name ?? null,
            freelancerUserId: profile?.userId ?? null,
          };
        }),
    );
    return { ...result, page };
  },
});
