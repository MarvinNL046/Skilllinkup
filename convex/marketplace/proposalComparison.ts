import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";

export const get = query({
  args: { projectId: v.id("projects") },
  returns: v.array(v.id("bids")),
  handler: async (ctx, { projectId }) => {
    const user = await requireAuthUser(ctx);
    const project = await ctx.db.get(projectId);
    if (!project || project.clientId !== user._id || project.tenantId !== user.tenantId) throw new Error("Unauthorized.");
    const bids = await Promise.all((project.comparedBidIds ?? []).map(id => ctx.db.get(id)));
    return bids.filter(bid => bid?.projectId === projectId).map(bid => bid!._id);
  },
});

export const update = mutation({
  args: { projectId: v.id("projects"), operation: v.union(v.literal("add"), v.literal("remove"), v.literal("clear")), bidId: v.optional(v.id("bids")) },
  returns: v.null(),
  handler: async (ctx, { projectId, operation, bidId }) => {
    const user = await requireAuthUser(ctx);
    const project = await ctx.db.get(projectId);
    if (!project || project.clientId !== user._id || project.tenantId !== user.tenantId) throw new Error("Unauthorized.");
    const bids = await Promise.all((project.comparedBidIds ?? []).map(id => ctx.db.get(id)));
    let ids = bids.filter(bid => bid?.projectId === projectId).map(bid => bid!._id);
    if (operation === "clear") ids = [];
    else {
      if (!bidId) throw new Error("Choose a proposal.");
      if (operation === "remove") ids = ids.filter(id => id !== bidId);
      else {
        const bid = await ctx.db.get(bidId);
        if (!bid || bid.projectId !== projectId) throw new Error("Proposal does not belong to this project.");
        if (!ids.includes(bidId)) {
          if (ids.length >= 3) throw new Error("Compare up to three proposals. Remove one first.");
          ids.push(bidId);
        }
      }
    }
    await ctx.db.patch(projectId, { comparedBidIds: ids });
    return null;
  },
});
