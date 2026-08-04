import { v } from "convex/values";

export const emailPreferenceValidator = v.union(
  v.literal("newMessage"),
  v.literal("orderUpdate"),
  v.literal("reviewReceived"),
  v.literal("marketingEmails"),
);

export const emailDeliveryStatusValidator = v.union(
  v.literal("sending"),
  v.literal("sent"),
  v.literal("failed"),
  v.literal("skipped"),
);

export const emailTemplateValidator = v.union(
  v.literal("orderConfirmation"),
  v.literal("newOrder"),
  v.literal("orderDelivered"),
  v.literal("orderCompleted"),
  v.literal("paymentFailed"),
  v.literal("newBid"),
  v.literal("bidAccepted"),
  v.literal("bidRejected"),
  v.literal("newMessage"),
  v.literal("reviewReceived"),
  v.literal("waitlistWelcome"),
  v.literal("jobApplicationReceived"),
  v.literal("jobApplicationStatus"),
  v.literal("localQuoteReceived"),
  v.literal("localQuoteAccepted"),
  v.literal("localAppointmentStatus"),
);

export type EmailPreference =
  | "newMessage"
  | "orderUpdate"
  | "reviewReceived"
  | "marketingEmails";

export type EmailTemplate =
  | "orderConfirmation"
  | "newOrder"
  | "orderDelivered"
  | "orderCompleted"
  | "paymentFailed"
  | "newBid"
  | "bidAccepted"
  | "bidRejected"
  | "newMessage"
  | "reviewReceived"
  | "waitlistWelcome"
  | "jobApplicationReceived"
  | "jobApplicationStatus"
  | "localQuoteReceived"
  | "localQuoteAccepted"
  | "localAppointmentStatus";
