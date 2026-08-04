import { v } from "convex/values";
import { internalMutation, internalQuery, QueryCtx } from "../_generated/server";
import { Doc } from "../_generated/dataModel";
import {
  emailDeliveryStatusValidator,
  emailPreferenceValidator,
  emailTemplateValidator,
  type EmailPreference,
} from "./emailState";

const recipientValidator = v.object({
  userId: v.union(v.id("users"), v.null()),
  email: v.string(),
  name: v.string(),
  enabled: v.boolean(),
});

function isPreferenceEnabled(
  settings: Doc<"userNotificationSettings"> | null,
  preference?: EmailPreference,
) {
  if (!preference || !settings) return true;
  return settings[preference] !== false;
}

async function getSettings(
  ctx: QueryCtx,
  userId: Doc<"users">["_id"],
) {
  return await ctx.db
    .query("userNotificationSettings")
    .withIndex("by_user", (q) => q.eq("userId", userId))
    .unique();
}

export const resolveRecipientByUser = internalQuery({
  args: {
    userId: v.id("users"),
    preference: v.optional(emailPreferenceValidator),
  },
  returns: v.union(recipientValidator, v.null()),
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user?.email) return null;
    const settings = await getSettings(ctx, user._id);
    return {
      userId: user._id,
      email: user.email,
      name: user.name || "Skilllinkup member",
      enabled: isPreferenceEnabled(settings, args.preference),
    };
  },
});

export const resolveRecipientByEmail = internalQuery({
  args: {
    email: v.string(),
    preference: v.optional(emailPreferenceValidator),
  },
  returns: recipientValidator,
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (!user) {
      return {
        userId: null,
        email: args.email,
        name: "Skilllinkup member",
        enabled: true,
      };
    }
    const settings = await getSettings(ctx, user._id);
    return {
      userId: user._id,
      email: user.email,
      name: user.name || "Skilllinkup member",
      enabled: isPreferenceEnabled(settings, args.preference),
    };
  },
});

export const beginDelivery = internalMutation({
  args: {
    eventKey: v.string(),
    userId: v.optional(v.id("users")),
    template: emailTemplateValidator,
    recipientEmail: v.string(),
    subject: v.string(),
  },
  returns: v.object({
    deliveryId: v.id("emailDeliveries"),
    shouldSend: v.boolean(),
    status: emailDeliveryStatusValidator,
  }),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("emailDeliveries")
      .withIndex("by_eventKey", (q) => q.eq("eventKey", args.eventKey))
      .unique();
    const now = Date.now();
    if (existing) {
      if (existing.status === "failed" && existing.attempts < 3) {
        await ctx.db.patch(existing._id, {
          status: "sending",
          attempts: existing.attempts + 1,
          lastError: undefined,
          updatedAt: now,
        });
        return {
          deliveryId: existing._id,
          shouldSend: true,
          status: "sending" as const,
        };
      }
      return {
        deliveryId: existing._id,
        shouldSend: false,
        status: existing.status,
      };
    }

    const deliveryId = await ctx.db.insert("emailDeliveries", {
      eventKey: args.eventKey,
      userId: args.userId,
      template: args.template,
      recipientEmail: args.recipientEmail,
      subject: args.subject,
      status: "sending",
      attempts: 1,
      createdAt: now,
      updatedAt: now,
    });
    return { deliveryId, shouldSend: true, status: "sending" as const };
  },
});

export const markSent = internalMutation({
  args: {
    deliveryId: v.id("emailDeliveries"),
    providerMessageId: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const now = Date.now();
    await ctx.db.patch(args.deliveryId, {
      status: "sent",
      providerMessageId: args.providerMessageId,
      lastError: undefined,
      sentAt: now,
      updatedAt: now,
    });
    return null;
  },
});

export const markFailed = internalMutation({
  args: {
    deliveryId: v.id("emailDeliveries"),
    error: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.deliveryId, {
      status: "failed",
      lastError: args.error.slice(0, 1000),
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const markSkipped = internalMutation({
  args: {
    deliveryId: v.id("emailDeliveries"),
    reason: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.deliveryId, {
      status: "skipped",
      lastError: args.reason.slice(0, 1000),
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const listRecentFailures = internalQuery({
  args: { limit: v.optional(v.number()) },
  returns: v.array(
    v.object({
      _id: v.id("emailDeliveries"),
      eventKey: v.string(),
      template: emailTemplateValidator,
      recipientEmail: v.string(),
      attempts: v.number(),
      lastError: v.union(v.string(), v.null()),
      updatedAt: v.number(),
    }),
  ),
  handler: async (ctx, args) => {
    const limit = Math.min(Math.max(args.limit ?? 50, 1), 100);
    const rows = await ctx.db
      .query("emailDeliveries")
      .withIndex("by_status_updatedAt", (q) => q.eq("status", "failed"))
      .order("desc")
      .take(limit);
    return rows.map((row) => ({
      _id: row._id,
      eventKey: row.eventKey,
      template: row.template,
      recipientEmail: row.recipientEmail,
      attempts: row.attempts,
      lastError: row.lastError ?? null,
      updatedAt: row.updatedAt,
    }));
  },
});
