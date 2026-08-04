import { v } from "convex/values";
import { query } from "../_generated/server";
import { requireAdmin } from "../lib/authHelpers";
import {
  emailDeliveryStatusValidator,
  emailTemplateValidator,
} from "../lib/emailState";

const deliverySummaryValidator = v.object({
  _id: v.id("emailDeliveries"),
  eventKey: v.string(),
  userId: v.union(v.id("users"), v.null()),
  template: emailTemplateValidator,
  recipientEmail: v.string(),
  subject: v.string(),
  status: emailDeliveryStatusValidator,
  attempts: v.number(),
  providerMessageId: v.union(v.string(), v.null()),
  lastError: v.union(v.string(), v.null()),
  sentAt: v.union(v.number(), v.null()),
  createdAt: v.number(),
  updatedAt: v.number(),
});

export const listRecent = query({
  args: {
    status: v.optional(emailDeliveryStatusValidator),
    limit: v.optional(v.number()),
  },
  returns: v.array(deliverySummaryValidator),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const limit = Math.min(Math.max(args.limit ?? 50, 1), 100);
    const rows = args.status
      ? await ctx.db
          .query("emailDeliveries")
          .withIndex("by_status_updatedAt", (q) => q.eq("status", args.status!))
          .order("desc")
          .take(limit)
      : await ctx.db
          .query("emailDeliveries")
          .withIndex("by_updatedAt")
          .order("desc")
          .take(limit);
    return rows.map((row) => ({
      _id: row._id,
      eventKey: row.eventKey,
      userId: row.userId ?? null,
      template: row.template,
      recipientEmail: row.recipientEmail,
      subject: row.subject,
      status: row.status,
      attempts: row.attempts,
      providerMessageId: row.providerMessageId ?? null,
      lastError: row.lastError ?? null,
      sentAt: row.sentAt ?? null,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  },
});
