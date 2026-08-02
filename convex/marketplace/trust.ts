import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { requireAdmin, requireAuthUser } from "../lib/authHelpers";
import { notifyUser } from "../lib/notifications";
import {
  reportReasonValidator,
  reportStatusValidator,
  reportTargetTypeValidator,
  supportCategoryValidator,
  supportPriorityValidator,
  supportStatusValidator,
} from "../lib/trustState";
import { rateLimiter } from "../lib/rateLimits";

const reportValidator = v.object({
  _id: v.id("moderationReports"),
  _creationTime: v.number(),
  tenantId: v.id("tenants"),
  reporterId: v.id("users"),
  reporterName: v.string(),
  reporterEmail: v.string(),
  targetType: reportTargetTypeValidator,
  targetId: v.string(),
  targetLabel: v.optional(v.string()),
  targetUrl: v.optional(v.string()),
  reason: reportReasonValidator,
  details: v.string(),
  status: reportStatusValidator,
  resolutionNote: v.optional(v.string()),
  assignedTo: v.optional(v.id("users")),
  resolvedAt: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const ticketValidator = v.object({
  _id: v.id("supportTickets"),
  _creationTime: v.number(),
  tenantId: v.id("tenants"),
  userId: v.id("users"),
  userName: v.optional(v.string()),
  userEmail: v.optional(v.string()),
  category: supportCategoryValidator,
  subject: v.string(),
  description: v.string(),
  priority: supportPriorityValidator,
  status: supportStatusValidator,
  relatedUrl: v.optional(v.string()),
  relatedOrderId: v.optional(v.id("orders")),
  assignedTo: v.optional(v.id("users")),
  adminNote: v.optional(v.string()),
  resolvedAt: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const auditEventValidator = v.object({
  _id: v.id("moderationAuditEvents"),
  _creationTime: v.number(),
  tenantId: v.id("tenants"),
  actorId: v.id("users"),
  actorName: v.string(),
  action: v.string(),
  targetType: v.string(),
  targetId: v.string(),
  fromStatus: v.optional(v.string()),
  toStatus: v.optional(v.string()),
  note: v.optional(v.string()),
  createdAt: v.number(),
});

function cleanText(value: string, label: string, min: number, max: number) {
  const cleaned = value.trim();
  if (cleaned.length < min || cleaned.length > max) {
    throw new Error(`${label} must be between ${min} and ${max} characters.`);
  }
  return cleaned;
}

function cleanRelativeUrl(value?: string) {
  if (!value) return undefined;
  const cleaned = value.trim();
  if (!cleaned.startsWith("/") || cleaned.startsWith("//") || cleaned.length > 500) {
    throw new Error("Use a valid Skilllinkup page path.");
  }
  return cleaned;
}

export const createReport = mutation({
  args: {
    targetType: reportTargetTypeValidator,
    targetId: v.string(),
    targetLabel: v.optional(v.string()),
    targetUrl: v.optional(v.string()),
    reason: reportReasonValidator,
    details: v.string(),
  },
  returns: v.object({ reportId: v.id("moderationReports") }),
  handler: async (ctx, args) => {
    const reporter = await requireAuthUser(ctx);
    await rateLimiter.limit(ctx, "trustReport", { key: reporter._id, throws: true });
    const targetId = cleanText(args.targetId, "Target", 1, 200);
    const details = cleanText(args.details, "Report details", 20, 3000);
    const targetLabel = args.targetLabel
      ? cleanText(args.targetLabel, "Target label", 1, 160)
      : undefined;
    const targetUrl = cleanRelativeUrl(args.targetUrl);

    const existing = await ctx.db
      .query("moderationReports")
      .withIndex("by_reporter_target", (q) =>
        q
          .eq("reporterId", reporter._id)
          .eq("targetType", args.targetType)
          .eq("targetId", targetId)
      )
      .order("desc")
      .take(5);
    if (existing.some((report) => report.status === "open" || report.status === "reviewing")) {
      throw new Error("You already have an active report for this item.");
    }

    const now = Date.now();
    const reportId = await ctx.db.insert("moderationReports", {
      tenantId: reporter.tenantId,
      reporterId: reporter._id,
      targetType: args.targetType,
      targetId,
      targetLabel,
      targetUrl,
      reason: args.reason,
      details,
      status: "open",
      createdAt: now,
      updatedAt: now,
    });
    return { reportId };
  },
});

export const listReportsForAdmin = query({
  args: {
    status: v.optional(reportStatusValidator),
    limit: v.optional(v.number()),
  },
  returns: v.array(reportValidator),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const limit = Math.max(1, Math.min(args.limit ?? 50, 100));
    const reports = args.status
      ? await ctx.db
          .query("moderationReports")
          .withIndex("by_status", (q) => q.eq("status", args.status!))
          .order("desc")
          .take(limit)
      : await ctx.db.query("moderationReports").order("desc").take(limit);
    const reporters = await Promise.all(reports.map((report) => ctx.db.get(report.reporterId)));
    return reports.map((report, index) => ({
      ...report,
      reporterName: reporters[index]?.name ?? "Unknown user",
      reporterEmail: reporters[index]?.email ?? "Unknown email",
    }));
  },
});

export const updateReport = mutation({
  args: {
    reportId: v.id("moderationReports"),
    status: reportStatusValidator,
    resolutionNote: v.optional(v.string()),
  },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx);
    const report = await ctx.db.get(args.reportId);
    if (!report) throw new Error("Report not found.");
    const resolutionNote = args.resolutionNote
      ? cleanText(args.resolutionNote, "Resolution note", 10, 3000)
      : undefined;
    if ((args.status === "resolved" || args.status === "dismissed") && !resolutionNote) {
      throw new Error("Add a resolution note before closing the report.");
    }
    const now = Date.now();
    await ctx.db.patch(report._id, {
      status: args.status,
      resolutionNote,
      assignedTo: admin._id,
      resolvedAt:
        args.status === "resolved" || args.status === "dismissed" ? now : undefined,
      updatedAt: now,
    });
    await ctx.db.insert("moderationAuditEvents", {
      tenantId: report.tenantId,
      actorId: admin._id,
      action: "moderation_report_status_changed",
      targetType: "moderation_report",
      targetId: report._id,
      fromStatus: report.status,
      toStatus: args.status,
      note: resolutionNote,
      createdAt: now,
    });
    if (args.status === "resolved" || args.status === "dismissed") {
      await notifyUser(ctx, {
        userId: report.reporterId,
        type: "moderation_report_updated",
        title: "Your safety report was reviewed",
        body: resolutionNote,
        link: "/help",
        metadata: { reportId: report._id, status: args.status },
      });
    }
    return { success: true };
  },
});

export const createSupportTicket = mutation({
  args: {
    category: supportCategoryValidator,
    subject: v.string(),
    description: v.string(),
    priority: v.optional(supportPriorityValidator),
    relatedUrl: v.optional(v.string()),
    relatedOrderId: v.optional(v.id("orders")),
  },
  returns: v.object({ ticketId: v.id("supportTickets") }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    await rateLimiter.limit(ctx, "supportTicket", { key: user._id, throws: true });
    if (args.relatedOrderId) {
      const order = await ctx.db.get(args.relatedOrderId);
      if (!order) throw new Error("Related order not found.");
      const profile = order.freelancerId ? await ctx.db.get(order.freelancerId) : null;
      if (order.clientId !== user._id && profile?.userId !== user._id) {
        throw new Error("You cannot link this order.");
      }
    }
    const now = Date.now();
    const ticketId = await ctx.db.insert("supportTickets", {
      tenantId: user.tenantId,
      userId: user._id,
      category: args.category,
      subject: cleanText(args.subject, "Subject", 5, 160),
      description: cleanText(args.description, "Description", 20, 5000),
      priority: args.priority ?? "normal",
      status: "open",
      relatedUrl: cleanRelativeUrl(args.relatedUrl),
      relatedOrderId: args.relatedOrderId,
      createdAt: now,
      updatedAt: now,
    });
    return { ticketId };
  },
});

export const listMySupportTickets = query({
  args: { limit: v.optional(v.number()) },
  returns: v.array(ticketValidator),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const limit = Math.max(1, Math.min(args.limit ?? 25, 50));
    const tickets = await ctx.db
      .query("supportTickets")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(limit);
    return tickets.map((ticket) => ({
      ...ticket,
      userName: user.name,
      userEmail: user.email,
    }));
  },
});

export const listSupportTicketsForAdmin = query({
  args: {
    status: v.optional(supportStatusValidator),
    limit: v.optional(v.number()),
  },
  returns: v.array(ticketValidator),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const limit = Math.max(1, Math.min(args.limit ?? 50, 100));
    const tickets = args.status
      ? await ctx.db
          .query("supportTickets")
          .withIndex("by_status", (q) => q.eq("status", args.status!))
          .order("desc")
          .take(limit)
      : await ctx.db.query("supportTickets").order("desc").take(limit);
    const users = await Promise.all(tickets.map((ticket) => ctx.db.get(ticket.userId)));
    return tickets.map((ticket, index) => ({
      ...ticket,
      userName: users[index]?.name,
      userEmail: users[index]?.email,
    }));
  },
});

export const listAuditEventsForAdmin = query({
  args: { limit: v.optional(v.number()) },
  returns: v.array(auditEventValidator),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const events = await ctx.db
      .query("moderationAuditEvents")
      .withIndex("by_createdAt")
      .order("desc")
      .take(Math.max(1, Math.min(args.limit ?? 25, 100)));
    const actors = await Promise.all(events.map((event) => ctx.db.get(event.actorId)));
    return events.map((event, index) => ({
      ...event,
      actorName: actors[index]?.name ?? "Unknown admin",
    }));
  },
});

export const updateSupportTicket = mutation({
  args: {
    ticketId: v.id("supportTickets"),
    status: supportStatusValidator,
    adminNote: v.optional(v.string()),
  },
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx);
    const ticket = await ctx.db.get(args.ticketId);
    if (!ticket) throw new Error("Support ticket not found.");
    const adminNote = args.adminNote
      ? cleanText(args.adminNote, "Support note", 5, 3000)
      : undefined;
    if ((args.status === "resolved" || args.status === "closed") && !adminNote) {
      throw new Error("Add a support note before closing the ticket.");
    }
    const now = Date.now();
    await ctx.db.patch(ticket._id, {
      status: args.status,
      adminNote,
      assignedTo: admin._id,
      resolvedAt: args.status === "resolved" || args.status === "closed" ? now : undefined,
      updatedAt: now,
    });
    await ctx.db.insert("moderationAuditEvents", {
      tenantId: ticket.tenantId,
      actorId: admin._id,
      action: "support_ticket_status_changed",
      targetType: "support_ticket",
      targetId: ticket._id,
      fromStatus: ticket.status,
      toStatus: args.status,
      note: adminNote,
      createdAt: now,
    });
    await notifyUser(ctx, {
      userId: ticket.userId,
      type: "support_ticket_updated",
      title: `Support ticket ${args.status.replace(/_/g, " ")}`,
      body: adminNote,
      link: "/dashboard/support",
      metadata: { ticketId: ticket._id, status: args.status },
    });
    return { success: true };
  },
});
