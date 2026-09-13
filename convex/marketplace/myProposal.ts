import { v } from "convex/values";
import { query } from "../_generated/server";
import { getOptionalAuthUser, getProviderProfile } from "../lib/authHelpers";
import { bidStatusValidator } from "../lib/marketplaceState";

export const get = query({
  args: { projectId: v.id("projects") },
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("bids"),
      amount: v.number(),
      currency: v.string(),
      deliveryDays: v.number(),
      pitch: v.string(),
      status: bidStatusValidator,
      orderId: v.union(v.id("orders"), v.null()),
    }),
  ),
  handler: async (ctx, { projectId }) => {
    const user = await getOptionalAuthUser(ctx);
    if (!user) return null;
    const project = await ctx.db.get(projectId);
    if (!project || project.tenantId !== user.tenantId) return null;
    const profile = await getProviderProfile(ctx, user._id, "freelancer");
    if (!profile || profile.userId !== user._id) return null;
    const bid = await ctx.db
      .query("bids")
      .withIndex("by_project_freelancer", (q) =>
        q.eq("projectId", projectId).eq("freelancerId", profile._id),
      )
      .unique();
    if (!bid) return null;
    const order = await ctx.db
      .query("orders")
      .withIndex("by_bid", (q) => q.eq("bidId", bid._id))
      .first();
    return {
      _id: bid._id,
      amount: bid.amount,
      currency: bid.currency ?? project.currency ?? "EUR",
      deliveryDays: bid.deliveryDays,
      pitch: bid.pitch,
      status: bid.status,
      orderId:
        order?.freelancerId === profile._id && order.tenantId === user.tenantId
          ? order._id
          : null,
    };
  },
});
