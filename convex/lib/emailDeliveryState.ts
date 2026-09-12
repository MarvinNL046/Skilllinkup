import { v } from "convex/values";
import { internalMutation, internalQuery, QueryCtx } from "../_generated/server";
import { Doc } from "../_generated/dataModel";
import { internal } from "../_generated/api";
import { EMAIL_LEASE_MS, EMAIL_MAX_ATTEMPTS, emailRetryDelay } from "./emailRetryPolicy";
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
const payloadValidator = v.object({ to: v.string(), props: v.any(), preference: v.optional(emailPreferenceValidator) });

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
    payload: v.optional(payloadValidator),
  },
  returns: v.object({
    deliveryId: v.id("emailDeliveries"),
    shouldSend: v.boolean(),
    status: emailDeliveryStatusValidator,
    leaseVersion: v.number(),
  }),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("emailDeliveries")
      .withIndex("by_eventKey", (q) => q.eq("eventKey", args.eventKey))
      .unique();
    const now = Date.now();
    if (existing) {
      const dueFailure = existing.status === "failed" && existing.retryable !== false && (existing.nextAttemptAt ?? 0) <= now;
      const expiredLease = existing.status === "sending" && (existing.leaseExpiresAt ?? existing.updatedAt + EMAIL_LEASE_MS) <= now;
      if ((dueFailure || expiredLease) && existing.attempts < EMAIL_MAX_ATTEMPTS) {
        const leaseVersion = (existing.leaseVersion ?? 0) + 1;
        await ctx.db.patch(existing._id, {
          status: "sending",
          attempts: existing.attempts + 1,
          lastError: undefined,
          updatedAt: now,
          payload: existing.payload ?? args.payload,
          leaseVersion,
          leaseExpiresAt: now + EMAIL_LEASE_MS,
          nextAttemptAt: undefined,
        });
        return {
          deliveryId: existing._id,
          shouldSend: true,
          status: "sending" as const,
          leaseVersion,
        };
      }
      return {
        deliveryId: existing._id,
        shouldSend: false,
        status: existing.status,
        leaseVersion: existing.leaseVersion ?? 0,
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
      payload: args.payload,
      retryable: true,
      leaseVersion: 1,
      leaseExpiresAt: now + EMAIL_LEASE_MS,
    });
    return { deliveryId, shouldSend: true, status: "sending" as const, leaseVersion: 1 };
  },
});

export const markSent = internalMutation({
  args: {
    deliveryId: v.id("emailDeliveries"),
    providerMessageId: v.optional(v.string()),
    leaseVersion: v.optional(v.number()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const delivery = await ctx.db.get(args.deliveryId);
    if (!delivery || delivery.status !== "sending" || (delivery.leaseVersion ?? 0) !== (args.leaseVersion ?? 0)) return null;
    const now = Date.now();
    await ctx.db.patch(args.deliveryId, {
      status: "sent",
      providerMessageId: args.providerMessageId,
      lastError: undefined,
      sentAt: now,
      updatedAt: now,
      leaseExpiresAt: undefined,
      nextAttemptAt: undefined,
      payload: undefined,
    });
    return null;
  },
});

export const markFailed = internalMutation({
  args: {
    deliveryId: v.id("emailDeliveries"),
    error: v.string(),
    leaseVersion: v.optional(v.number()),
    retryable: v.optional(v.boolean()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const delivery = await ctx.db.get(args.deliveryId);
    if (!delivery || delivery.status !== "sending" || (delivery.leaseVersion ?? 0) !== (args.leaseVersion ?? 0)) return null;
    const retryable = args.retryable !== false;
    const delay = emailRetryDelay(delivery.attempts);
    const retry = retryable && !!delivery.payload && delivery.attempts < EMAIL_MAX_ATTEMPTS;
    await ctx.db.patch(args.deliveryId, {
      status: "failed",
      lastError: args.error.slice(0, 1000),
      updatedAt: Date.now(),
      retryable,
      leaseExpiresAt: undefined,
      nextAttemptAt: retry ? Date.now() + delay : undefined,
    });
    if (retry) await ctx.scheduler.runAfter(delay, internal.lib.email.retryDelivery, { deliveryId: delivery._id });
    return null;
  },
});

export const markSkipped = internalMutation({
  args: {
    deliveryId: v.id("emailDeliveries"),
    reason: v.string(),
    leaseVersion: v.optional(v.number()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const delivery = await ctx.db.get(args.deliveryId);
    if (!delivery || delivery.status !== "sending" || (delivery.leaseVersion ?? 0) !== (args.leaseVersion ?? 0)) return null;
    await ctx.db.patch(args.deliveryId, {
      status: "skipped",
      lastError: args.reason.slice(0, 1000),
      updatedAt: Date.now(),
      leaseExpiresAt: undefined,
      nextAttemptAt: undefined,
      payload: undefined,
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

export const getRetryPayload = internalQuery({
  args: { deliveryId: v.id("emailDeliveries") },
  returns: v.union(v.null(), v.object({
    eventKey: v.string(), template: emailTemplateValidator, subject: v.string(),
    userId: v.optional(v.id("users")), to: v.string(), props: v.any(), preference: v.optional(emailPreferenceValidator),
  })),
  handler: async (ctx, args) => {
    const row = await ctx.db.get(args.deliveryId);
    if (!row?.payload || !["sending", "failed"].includes(row.status) || row.retryable === false || row.attempts >= EMAIL_MAX_ATTEMPTS) return null;
    return { eventKey: row.eventKey, template: row.template, subject: row.subject, userId: row.userId, ...row.payload };
  },
});

// Fallback when an action terminates before acknowledging its leased delivery.
// Indexed due-time scans stay bounded; each retry atomically acquires a new lease.
export const recoverDueDeliveries = internalMutation({
  args: {},
  returns: v.object({ scheduled: v.number(), exhausted: v.number() }),
  handler: async (ctx) => {
    const now = Date.now();
    const [sending, failed, legacySending] = await Promise.all([
      ctx.db.query("emailDeliveries").withIndex("by_status_and_leaseExpiresAt", q => q.eq("status", "sending").gt("leaseExpiresAt", 0).lte("leaseExpiresAt", now)).take(25),
      ctx.db.query("emailDeliveries").withIndex("by_status_and_nextAttemptAt", q => q.eq("status", "failed").gt("nextAttemptAt", 0).lte("nextAttemptAt", now)).take(25),
      ctx.db.query("emailDeliveries").withIndex("by_status_updatedAt", q => q.eq("status", "sending").lt("updatedAt", now - EMAIL_LEASE_MS)).take(25),
    ]);
    let scheduled = 0, exhausted = 0;
    const rows = [...new Map([...sending, ...failed, ...legacySending].map(row => [row._id, row])).values()];
    for (const row of rows) {
      if (row.userId && !(await ctx.db.get(row.userId))) {
        await ctx.db.patch(row._id, { status: "skipped", lastError: "Recipient account no longer exists.", payload: undefined, leaseExpiresAt: undefined, nextAttemptAt: undefined, updatedAt: now });
        continue;
      }
      if (!row.payload || row.retryable === false || row.attempts >= EMAIL_MAX_ATTEMPTS) {
        await ctx.db.patch(row._id, { status: "failed", lastError: row.lastError ?? "Delivery lease expired after the last retry.", leaseExpiresAt: undefined, nextAttemptAt: undefined, updatedAt: now });
        exhausted++;
      } else {
        await ctx.scheduler.runAfter(0, internal.lib.email.retryDelivery, { deliveryId: row._id });
        scheduled++;
      }
    }
    return { scheduled, exhausted };
  },
});
