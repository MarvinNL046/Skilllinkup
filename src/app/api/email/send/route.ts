import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";

// Import all email templates
import { OrderConfirmationEmail } from "../../../../../emails/order-confirmation";
import { NewOrderEmail } from "../../../../../emails/new-order";
import { OrderDeliveredEmail } from "../../../../../emails/order-delivered";
import { OrderCompletedEmail } from "../../../../../emails/order-completed";
import { PaymentFailedEmail } from "../../../../../emails/payment-failed";
import { NewBidEmail } from "../../../../../emails/new-bid";
import { BidAcceptedEmail } from "../../../../../emails/bid-accepted";
import { BidRejectedEmail } from "../../../../../emails/bid-rejected";
import { NewMessageEmail } from "../../../../../emails/new-message";
import { ReviewReceivedEmail } from "../../../../../emails/review-received";
import { WaitlistWelcomeEmail } from "../../../../../emails/waitlist-welcome";
import {
  JobApplicationReceivedEmail,
  JobApplicationStatusEmail,
  LocalAppointmentStatusEmail,
  LocalQuoteAcceptedEmail,
  LocalQuoteReceivedEmail,
} from "../../../../../emails/lifecycle-notifications";

// Map template names to React components
const templates: Record<string, (props: any) => React.ReactElement> = {
  orderConfirmation: (props) => OrderConfirmationEmail(props),
  newOrder: (props) => NewOrderEmail(props),
  orderDelivered: (props) => OrderDeliveredEmail(props),
  orderCompleted: (props) => OrderCompletedEmail(props),
  paymentFailed: (props) => PaymentFailedEmail(props),
  newBid: (props) => NewBidEmail(props),
  bidAccepted: (props) => BidAcceptedEmail(props),
  bidRejected: (props) => BidRejectedEmail(props),
  newMessage: (props) => NewMessageEmail(props),
  reviewReceived: (props) => ReviewReceivedEmail(props),
  waitlistWelcome: (props) => WaitlistWelcomeEmail(props),
  jobApplicationReceived: (props) => JobApplicationReceivedEmail(props),
  jobApplicationStatus: (props) => JobApplicationStatusEmail(props),
  localQuoteReceived: (props) => LocalQuoteReceivedEmail(props),
  localQuoteAccepted: (props) => LocalQuoteAcceptedEmail(props),
  localAppointmentStatus: (props) => LocalAppointmentStatusEmail(props),
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: NextRequest) {
  const internalSecret = process.env.INTERNAL_EMAIL_SECRET;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!internalSecret || !resendApiKey) {
    console.error(
      "[email/send] INTERNAL_EMAIL_SECRET or RESEND_API_KEY is not configured.",
    );
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 503 },
    );
  }

  // Verify internal secret to prevent unauthorized access
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${internalSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload: unknown = await request.json();
    if (!isRecord(payload)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    const { template, to, subject, props, idempotencyKey } = payload;
    if (
      typeof template !== "string" ||
      typeof to !== "string" ||
      !to.includes("@") ||
      typeof subject !== "string" ||
      subject.length < 1 ||
      subject.length > 200 ||
      !isRecord(props) ||
      typeof idempotencyKey !== "string" ||
      idempotencyKey.length < 8 ||
      idempotencyKey.length > 256
    ) {
      return NextResponse.json({ error: "Invalid email payload" }, { status: 400 });
    }

    const templateFn = templates[template];
    if (!templateFn) {
      return NextResponse.json({ error: `Unknown template: ${template}` }, { status: 400 });
    }

    const emailComponent = templateFn(props);
    const html = await render(emailComponent);
    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send(
      {
        from: "Skilllinkup <noreply@skilllinkup.com>",
        to,
        subject,
        html,
      },
      { idempotencyKey },
    );

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id ?? null });
  } catch (err: unknown) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Email send failed" },
      { status: 500 },
    );
  }
}
