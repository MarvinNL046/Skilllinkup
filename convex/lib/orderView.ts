import { v } from "convex/values";
import { escrowStatusValidator, orderStatusValidator, orderTypeValidator } from "./marketplaceState";

export const orderViewValidator = v.object({
  _id: v.id("orders"), _creationTime: v.number(), tenantId: v.id("tenants"), orderNumber: v.string(), orderType: orderTypeValidator,
  clientId: v.id("users"), freelancerId: v.optional(v.id("freelancerProfiles")), gigId: v.optional(v.id("gigs")), gigPackageId: v.optional(v.id("gigPackages")),
  projectId: v.optional(v.id("projects")), bidId: v.optional(v.id("bids")), quoteRequestId: v.optional(v.id("quoteRequests")), quoteId: v.optional(v.id("quotes")),
  clientRequestId: v.optional(v.string()), title: v.string(), description: v.optional(v.string()), requirements: v.optional(v.string()),
  amount: v.number(), platformFee: v.number(), freelancerEarnings: v.number(), currency: v.optional(v.string()), deliveryDeadline: v.optional(v.number()),
  revisionCount: v.optional(v.number()), revisionsUsed: v.optional(v.number()), deliveryVersion: v.number(), remainingRevisions: v.union(v.number(), v.null()),
  status: orderStatusValidator, escrowStatus: v.optional(escrowStatusValidator), stripePaymentIntentId: v.optional(v.string()), stripeTransferId: v.optional(v.string()),
  creditAppliedCents: v.optional(v.number()), autoReleaseJobId: v.optional(v.id("_scheduled_functions")),
  completedAt: v.optional(v.number()), cancelledAt: v.optional(v.number()), createdAt: v.number(), updatedAt: v.number(),
  clientName: v.union(v.string(), v.null()), freelancerName: v.union(v.string(), v.null()), freelancerUserId: v.union(v.id("users"), v.null()),
});
