"use node";

import { v } from "convex/values";
import { internal } from "../_generated/api";
import { ActionCtx, internalAction } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import {
  emailPreferenceValidator,
  emailTemplateValidator,
  type EmailPreference,
  type EmailTemplate,
} from "./emailState";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const INTERNAL_EMAIL_SECRET = process.env.INTERNAL_EMAIL_SECRET;

type SendEmailArgs = {
  template: EmailTemplate;
  to: string;
  subject: string;
  props: Record<string, unknown>;
  eventKey: string;
  preference?: EmailPreference;
  userId?: Id<"users">;
};

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

async function sendEmail(ctx: ActionCtx, args: SendEmailArgs) {
  const recipient = args.userId
    ? await ctx.runQuery(internal.lib.emailDeliveryState.resolveRecipientByUser, {
        userId: args.userId,
        preference: args.preference,
      })
    : await ctx.runQuery(internal.lib.emailDeliveryState.resolveRecipientByEmail, {
        email: args.to,
        preference: args.preference,
      });
  if (!recipient) {
    console.error(`Email send skipped (${args.template}): recipient no longer exists.`);
    return;
  }

  const delivery = await ctx.runMutation(
    internal.lib.emailDeliveryState.beginDelivery,
    {
      eventKey: args.eventKey,
      userId: recipient.userId ?? undefined,
      template: args.template,
      recipientEmail: recipient.email,
      subject: args.subject,
    },
  );
  if (!delivery.shouldSend) return;

  if (!recipient.enabled) {
    await ctx.runMutation(internal.lib.emailDeliveryState.markSkipped, {
      deliveryId: delivery.deliveryId,
      reason: `Disabled by ${args.preference ?? "email"} preference.`,
    });
    return;
  }

  if (!SITE_URL || !INTERNAL_EMAIL_SECRET) {
    const message = "Server URL or internal email secret is not configured.";
    await ctx.runMutation(internal.lib.emailDeliveryState.markFailed, {
      deliveryId: delivery.deliveryId,
      error: message,
    });
    console.error(`Email send failed (${args.template}): ${message}`);
    return;
  }

  try {
    const response = await fetch(new URL("/api/email/send", SITE_URL), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${INTERNAL_EMAIL_SECRET}`,
      },
      body: JSON.stringify({
        template: args.template,
        to: recipient.email,
        subject: args.subject,
        props: args.props,
        idempotencyKey: args.eventKey,
      }),
    });
    const result: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      const detail =
        typeof result === "object" && result !== null && "error" in result
          ? String(result.error)
          : `HTTP ${response.status}`;
      throw new Error(detail);
    }
    const providerMessageId =
      typeof result === "object" && result !== null && "id" in result && typeof result.id === "string"
        ? result.id
        : undefined;
    await ctx.runMutation(internal.lib.emailDeliveryState.markSent, {
      deliveryId: delivery.deliveryId,
      providerMessageId,
    });
  } catch (error) {
    const message = errorMessage(error);
    await ctx.runMutation(internal.lib.emailDeliveryState.markFailed, {
      deliveryId: delivery.deliveryId,
      error: message,
    });
    console.error(`Email send failed (${args.template}):`, message);
  }
}

export const sendOrderConfirmation = internalAction({
  args: {
    clientEmail: v.string(),
    clientName: v.string(),
    orderNumber: v.string(),
    orderTitle: v.string(),
    amount: v.number(),
    currency: v.string(),
    deliveryDays: v.number(),
    orderId: v.id("orders"),
    locale: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await sendEmail(ctx, {
      template: "orderConfirmation",
      to: args.clientEmail,
      subject: `Order confirmed: ${args.orderTitle}`,
      eventKey: `order-confirmation:${args.orderId}`,
      preference: "orderUpdate",
      props: { ...args, locale: args.locale || "en" },
    });
    return null;
  },
});

export const sendNewOrderNotification = internalAction({
  args: {
    freelancerEmail: v.string(),
    freelancerName: v.string(),
    orderNumber: v.string(),
    orderTitle: v.string(),
    amount: v.number(),
    currency: v.string(),
    deliveryDays: v.number(),
    orderId: v.id("orders"),
    locale: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await sendEmail(ctx, {
      template: "newOrder",
      to: args.freelancerEmail,
      subject: `New order: ${args.orderTitle}`,
      eventKey: `new-order:${args.orderId}`,
      preference: "orderUpdate",
      props: { ...args, locale: args.locale || "en" },
    });
    return null;
  },
});

export const sendOrderDelivered = internalAction({
  args: {
    clientEmail: v.string(),
    clientName: v.string(),
    orderNumber: v.string(),
    orderTitle: v.string(),
    orderId: v.id("orders"),
    locale: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await sendEmail(ctx, {
      template: "orderDelivered",
      to: args.clientEmail,
      subject: `Delivery received: ${args.orderTitle}`,
      eventKey: `order-delivered:${args.orderId}`,
      preference: "orderUpdate",
      props: { ...args, locale: args.locale || "en" },
    });
    return null;
  },
});

export const sendOrderCompleted = internalAction({
  args: {
    freelancerEmail: v.string(),
    freelancerName: v.string(),
    orderNumber: v.string(),
    orderTitle: v.string(),
    amount: v.number(),
    currency: v.string(),
    orderId: v.id("orders"),
    locale: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await sendEmail(ctx, {
      template: "orderCompleted",
      to: args.freelancerEmail,
      subject: `Order completed: ${args.orderTitle}`,
      eventKey: `order-completed:${args.orderId}`,
      preference: "orderUpdate",
      props: { ...args, locale: args.locale || "en" },
    });
    return null;
  },
});

export const sendNewBid = internalAction({
  args: {
    clientEmail: v.string(),
    clientName: v.string(),
    projectTitle: v.string(),
    bidAmount: v.number(),
    currency: v.string(),
    deliveryDays: v.number(),
    freelancerName: v.string(),
    bidId: v.id("bids"),
    projectId: v.id("projects"),
    locale: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await sendEmail(ctx, {
      template: "newBid",
      to: args.clientEmail,
      subject: `New proposal on ${args.projectTitle}`,
      eventKey: `new-bid:${args.bidId}`,
      preference: "orderUpdate",
      props: { ...args, locale: args.locale || "en" },
    });
    return null;
  },
});

export const sendBidAccepted = internalAction({
  args: {
    freelancerEmail: v.string(),
    freelancerName: v.string(),
    projectTitle: v.string(),
    amount: v.number(),
    currency: v.string(),
    orderId: v.id("orders"),
    locale: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await sendEmail(ctx, {
      template: "bidAccepted",
      to: args.freelancerEmail,
      subject: `Proposal accepted: ${args.projectTitle}`,
      eventKey: `bid-accepted:${args.orderId}`,
      preference: "orderUpdate",
      props: { ...args, locale: args.locale || "en" },
    });
    return null;
  },
});

export const sendBidRejected = internalAction({
  args: {
    freelancerEmail: v.string(),
    freelancerName: v.string(),
    projectTitle: v.string(),
    locale: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await sendEmail(ctx, {
      template: "bidRejected",
      to: args.freelancerEmail,
      subject: `Proposal update: ${args.projectTitle}`,
      eventKey: `bid-rejected:${args.projectTitle}:${args.freelancerEmail}`,
      preference: "orderUpdate",
      props: { ...args, locale: args.locale || "en" },
    });
    return null;
  },
});

export const sendNewMessage = internalAction({
  args: {
    recipientEmail: v.string(),
    recipientName: v.string(),
    senderName: v.string(),
    messagePreview: v.string(),
    conversationId: v.id("conversations"),
    messageId: v.id("messages"),
    locale: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await sendEmail(ctx, {
      template: "newMessage",
      to: args.recipientEmail,
      subject: `New message from ${args.senderName}`,
      eventKey: `new-message:${args.messageId}`,
      preference: "newMessage",
      props: { ...args, locale: args.locale || "en" },
    });
    return null;
  },
});

export const sendReviewReceived = internalAction({
  args: {
    userEmail: v.string(),
    userName: v.string(),
    orderTitle: v.string(),
    rating: v.number(),
    orderId: v.id("orders"),
    locale: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await sendEmail(ctx, {
      template: "reviewReceived",
      to: args.userEmail,
      subject: "New review received",
      eventKey: `review-received:${args.orderId}:${args.userEmail}`,
      preference: "reviewReceived",
      props: { ...args, locale: args.locale || "en" },
    });
    return null;
  },
});

export const sendWaitlistWelcome = internalAction({
  args: {
    to: v.string(),
    name: v.optional(v.string()),
    skill: v.optional(v.string()),
    userType: v.optional(v.string()),
    locale: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const locale = args.locale === "nl" ? "nl" : "en";
    await sendEmail(ctx, {
      template: "waitlistWelcome",
      to: args.to,
      subject:
        locale === "nl"
          ? "Je staat op de Skilllinkup-wachtlijst"
          : "You're on the Skilllinkup waitlist",
      eventKey: `waitlist-welcome:${args.to.toLowerCase()}`,
      props: { ...args, locale },
    });
    return null;
  },
});

export const sendLifecycleNotification = internalAction({
  args: {
    userId: v.id("users"),
    eventKey: v.string(),
    template: emailTemplateValidator,
    title: v.string(),
    body: v.string(),
    actionHref: v.string(),
    preference: emailPreferenceValidator,
    locale: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const recipient = await ctx.runQuery(
      internal.lib.emailDeliveryState.resolveRecipientByUser,
      { userId: args.userId, preference: args.preference },
    );
    if (!recipient) return null;
    await sendEmail(ctx, {
      template: args.template,
      to: recipient.email,
      subject: args.title,
      eventKey: args.eventKey,
      preference: args.preference,
      userId: args.userId,
      props: {
        recipientName: recipient.name,
        title: args.title,
        message: args.body,
        actionHref: args.actionHref,
        locale: args.locale === "nl" ? "nl" : "en",
      },
    });
    return null;
  },
});
