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

const resend = new Resend(process.env.RESEND_API_KEY);

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
};

export async function POST(request: NextRequest) {
  // Verify internal secret to prevent unauthorized access
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.INTERNAL_EMAIL_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { template, to, subject, props } = await request.json();

    const templateFn = templates[template];
    if (!templateFn) {
      return NextResponse.json({ error: `Unknown template: ${template}` }, { status: 400 });
    }

    const emailComponent = templateFn(props);
    const html = await render(emailComponent);

    const { error } = await resend.emails.send({
      from: "SkillLinkup <noreply@skilllinkup.com>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
