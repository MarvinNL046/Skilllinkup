"use node";
import { internalAction } from "../_generated/server";
import { v } from "convex/values";

const EMAIL_API_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`
  : "http://localhost:3000/api/email/send";

const INTERNAL_EMAIL_SECRET = process.env.INTERNAL_EMAIL_SECRET || "dev-secret";

async function sendEmail(template: string, to: string, subject: string, props: Record<string, any>) {
  try {
    const response = await fetch(EMAIL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${INTERNAL_EMAIL_SECRET}`,
      },
      body: JSON.stringify({ template, to, subject, props }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(`Email send failed (${template}):`, err);
    }
  } catch (err) {
    // Don't throw - email failures shouldn't break mutations
    console.error(`Email send error (${template}):`, err);
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
    orderId: v.string(),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await sendEmail("orderConfirmation", args.clientEmail, `Order Confirmed: ${args.orderTitle}`, {
      clientName: args.clientName,
      orderNumber: args.orderNumber,
      orderTitle: args.orderTitle,
      amount: args.amount,
      currency: args.currency,
      deliveryDays: args.deliveryDays,
      orderId: args.orderId,
      locale: args.locale || "en",
    });
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
    orderId: v.string(),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await sendEmail("newOrder", args.freelancerEmail, `New Order: ${args.orderTitle}`, {
      freelancerName: args.freelancerName,
      orderNumber: args.orderNumber,
      orderTitle: args.orderTitle,
      amount: args.amount,
      currency: args.currency,
      deliveryDays: args.deliveryDays,
      orderId: args.orderId,
      locale: args.locale || "en",
    });
  },
});

export const sendOrderDelivered = internalAction({
  args: {
    clientEmail: v.string(),
    clientName: v.string(),
    orderNumber: v.string(),
    orderTitle: v.string(),
    orderId: v.string(),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await sendEmail("orderDelivered", args.clientEmail, `Delivery Received: ${args.orderTitle}`, {
      clientName: args.clientName,
      orderNumber: args.orderNumber,
      orderTitle: args.orderTitle,
      orderId: args.orderId,
      locale: args.locale || "en",
    });
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
    orderId: v.string(),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await sendEmail("orderCompleted", args.freelancerEmail, `Payment Released: ${args.orderTitle}`, {
      freelancerName: args.freelancerName,
      orderNumber: args.orderNumber,
      orderTitle: args.orderTitle,
      amount: args.amount,
      currency: args.currency,
      orderId: args.orderId,
      locale: args.locale || "en",
    });
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
    projectId: v.string(),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await sendEmail("newBid", args.clientEmail, `New Bid on ${args.projectTitle}`, {
      clientName: args.clientName,
      projectTitle: args.projectTitle,
      bidAmount: args.bidAmount,
      currency: args.currency,
      deliveryDays: args.deliveryDays,
      freelancerName: args.freelancerName,
      projectId: args.projectId,
      locale: args.locale || "en",
    });
  },
});

export const sendBidAccepted = internalAction({
  args: {
    freelancerEmail: v.string(),
    freelancerName: v.string(),
    projectTitle: v.string(),
    amount: v.number(),
    currency: v.string(),
    orderId: v.optional(v.string()),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await sendEmail("bidAccepted", args.freelancerEmail, `Bid Accepted: ${args.projectTitle}`, {
      freelancerName: args.freelancerName,
      projectTitle: args.projectTitle,
      amount: args.amount,
      currency: args.currency,
      orderId: args.orderId,
      locale: args.locale || "en",
    });
  },
});

export const sendBidRejected = internalAction({
  args: {
    freelancerEmail: v.string(),
    freelancerName: v.string(),
    projectTitle: v.string(),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await sendEmail("bidRejected", args.freelancerEmail, `Bid Update: ${args.projectTitle}`, {
      freelancerName: args.freelancerName,
      projectTitle: args.projectTitle,
      locale: args.locale || "en",
    });
  },
});

export const sendNewMessage = internalAction({
  args: {
    recipientEmail: v.string(),
    recipientName: v.string(),
    senderName: v.string(),
    messagePreview: v.string(),
    conversationId: v.string(),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await sendEmail("newMessage", args.recipientEmail, `New message from ${args.senderName}`, {
      recipientName: args.recipientName,
      senderName: args.senderName,
      messagePreview: args.messagePreview,
      conversationId: args.conversationId,
      locale: args.locale || "en",
    });
  },
});

export const sendReviewReceived = internalAction({
  args: {
    userEmail: v.string(),
    userName: v.string(),
    orderTitle: v.string(),
    rating: v.number(),
    orderId: v.string(),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await sendEmail("reviewReceived", args.userEmail, "New Review Received", {
      userName: args.userName,
      orderTitle: args.orderTitle,
      rating: args.rating,
      orderId: args.orderId,
      locale: args.locale || "en",
    });
  },
});
