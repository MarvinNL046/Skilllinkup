import type { Doc } from "../_generated/dataModel";
import type { MutationCtx, QueryCtx } from "../_generated/server";
import { requireMarketplaceContext } from "./authHelpers";
import { requireLivePaymentsEnabled } from "./paymentPolicy";

export function remainingRevisions(order: Pick<Doc<"orders">, "revisionCount" | "revisionsUsed">) {
  // An omitted package limit is the explicit legacy/unlimited contract.
  if (order.revisionCount === undefined) return null;
  if (!Number.isInteger(order.revisionCount) || order.revisionCount < 0) return 0;
  return Math.max(0, order.revisionCount - (order.revisionsUsed ?? 0));
}

export function requireOrderContext(user: Doc<"users">, order: Doc<"orders">, side: "client" | "provider") {
  if (order.tenantId !== user.tenantId) throw new Error("This order belongs to another workspace.");
  const local = order.orderType === "local" || order.orderType === "local_quote";
  requireMarketplaceContext(user, side === "client" ? "client" : local ? "local_professional" : "freelancer", local ? "local" : "online", "updating an order");
}

export async function assertOrderNotDisputed(ctx: QueryCtx | MutationCtx, order: Doc<"orders">) {
  const dispute = await ctx.db.query("disputes").withIndex("by_order", q => q.eq("orderId", order._id)).first();
  if (order.status === "disputed" || dispute && !["resolved", "closed"].includes(dispute.status)) {
    throw new Error("This order has an open dispute. Support must resolve it before work can change.");
  }
}

export function requireBetaOrder(order: Doc<"orders">) {
  if (order.escrowStatus !== "beta_no_payment") requireLivePaymentsEnabled("Changing a paid order");
}

/** Keep all records representing the same commitment in one transaction. */
export async function finishLinkedWork(
  ctx: MutationCtx,
  order: Doc<"orders">,
  status: "completed" | "cancelled",
  now: number,
  options: { disputeResolution?: boolean } = {},
) {
  if (order.projectId) {
    const project = await ctx.db.get(order.projectId);
    if (!project || project.tenantId !== order.tenantId || project.clientId !== order.clientId || project.selectedFreelancerId !== order.freelancerId) {
      throw new Error("Linked project does not match this order.");
    }
    if (project.status !== status) {
      if (!options.disputeResolution && project.status !== "in_progress") throw new Error("Linked project is not in progress.");
      await ctx.db.patch(project._id, { status, updatedAt: now });
    }
  }
  if (order.quoteRequestId) {
    const request = await ctx.db.get(order.quoteRequestId);
    const appointment = await ctx.db.query("localAppointments").withIndex("by_order", q => q.eq("orderId", order._id)).unique();
    if (!request || request.tenantId !== order.tenantId || request.clientId !== order.clientId || !appointment || appointment.quoteRequestId !== request._id || appointment.clientId !== order.clientId || appointment.professionalId !== order.freelancerId || appointment.tenantId !== order.tenantId) {
      throw new Error("Linked local appointment does not match this order.");
    }
    if (!options.disputeResolution && ["completed", "cancelled"].includes(request.status) && request.status !== status) throw new Error("The local request is already closed.");
    await ctx.db.patch(request._id, { status, updatedAt: now });
    await ctx.db.patch(appointment._id, {
      status,
      completedAt: status === "completed" ? now : undefined,
      cancelledAt: status === "cancelled" ? now : undefined,
      updatedAt: now,
    });
  }
}
