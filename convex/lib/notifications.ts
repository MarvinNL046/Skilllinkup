import { MutationCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { internal } from "../_generated/api";
import type { EmailPreference, EmailTemplate } from "./emailState";

type NotificationMetadata = Record<string, string | number | boolean | null>;

function metadataString(metadata: NotificationMetadata | undefined, key: string) {
  const value = metadata?.[key];
  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : null;
}

function lifecycleEmail(args: {
  type: string;
  metadata?: NotificationMetadata;
}) : {
  eventKey: string;
  template: EmailTemplate;
  preference: EmailPreference;
} | null {
  const applicationId = metadataString(args.metadata, "applicationId");
  const quoteId = metadataString(args.metadata, "quoteId");
  const orderId = metadataString(args.metadata, "orderId");
  const appointmentId = metadataString(args.metadata, "appointmentId");
  const status = metadataString(args.metadata, "status");

  switch (args.type) {
    case "job_application_received":
      return applicationId
        ? {
            eventKey: `job-application-received:${applicationId}`,
            template: "jobApplicationReceived",
            preference: "orderUpdate",
          }
        : null;
    case "job_application_status":
      return applicationId && status
        ? {
            eventKey: `job-application-status:${applicationId}:${status}`,
            template: "jobApplicationStatus",
            preference: "orderUpdate",
          }
        : null;
    case "local_quote_received":
      return quoteId
        ? {
            eventKey: `local-quote-received:${quoteId}`,
            template: "localQuoteReceived",
            preference: "orderUpdate",
          }
        : null;
    case "local_quote_accepted":
      return orderId
        ? {
            eventKey: `local-quote-accepted:${orderId}`,
            template: "localQuoteAccepted",
            preference: "orderUpdate",
          }
        : null;
    case "local_appointment_status":
      return appointmentId && status
        ? {
            eventKey: `local-appointment-status:${appointmentId}:${status}`,
            template: "localAppointmentStatus",
            preference: "orderUpdate",
          }
        : null;
    default:
      return null;
  }
}

export async function notifyUser(
  ctx: MutationCtx,
  args: {
    userId: Id<"users">;
    type: string;
    title: string;
    body?: string;
    link?: string;
    metadata?: NotificationMetadata;
  }
) {
  const notificationId = await ctx.db.insert("notifications", {
    ...args,
    isRead: false,
    createdAt: Date.now(),
  });
  const email = lifecycleEmail(args);
  if (email && args.body && args.link) {
    await ctx.scheduler.runAfter(0, internal.lib.email.sendLifecycleNotification, {
      userId: args.userId,
      eventKey: email.eventKey,
      template: email.template,
      title: args.title,
      body: args.body,
      actionHref: args.link,
      preference: email.preference,
    });
  }
  return notificationId;
}
