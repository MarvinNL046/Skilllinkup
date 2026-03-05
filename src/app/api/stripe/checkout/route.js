import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

// ---------------------------------------------------------------------------
// POST /api/stripe/checkout
//
// Creates a Stripe Checkout Session for a gig package purchase.
//
// Body (JSON):
//   gigId                    – Convex gig ID (string)
//   packageId                – Convex gigPackage ID (string)
//   gigTitle                 – Display title for the gig
//   packageTitle             – Display title for the package (basic/standard/premium)
//   price                    – Amount in the same currency unit, e.g. 49.99
//   currency                 – ISO 4217 code, e.g. "eur" or "usd"
//   freelancerStripeAccountId – The freelancer's Stripe Express account ID (acct_xxx)
//
// Returns:
//   { url }  – Redirect the client to this Stripe-hosted checkout URL.
// ---------------------------------------------------------------------------

/**
 * Calculate the platform fee in cents based on the order amount.
 *
 * IMPORTANT: Fee tiers must match convex/marketplace/orders.ts:calculatePlatformFee
 * Tiers: <$50 → 15%, $50-500 → 12%, >$500 → 10%
 */
function calculateApplicationFeeAmountCents(amountCents) {
  const amount = amountCents / 100;
  let feeRate;
  if (amount < 50) {
    feeRate = 0.15;
  } else if (amount <= 500) {
    feeRate = 0.12;
  } else {
    feeRate = 0.10;
  }
  // Round to avoid floating-point surprises; Stripe expects an integer in cents.
  return Math.round(amountCents * feeRate);
}

export async function POST(request) {
  // Guard: Stripe not configured yet.
  if (!stripe) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Add STRIPE_SECRET_KEY to your .env.local file.",
      },
      { status: 503 }
    );
  }

  // Verify the caller is authenticated via Clerk — only authenticated users
  // may initiate a checkout session.
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const verifiedEmail = clerkUser.emailAddresses[0]?.emailAddress;
  if (!verifiedEmail) {
    return NextResponse.json(
      { error: "No verified email on account" },
      { status: 401 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const {
    gigId,
    packageId,
    gigTitle,
    packageTitle,
    price,
    currency = "eur",
    freelancerStripeAccountId,
  } = body;

  // Validate remaining required fields.
  if (!gigId || !packageId || !gigTitle || !price) {
    return NextResponse.json(
      { error: "Missing required fields: gigId, packageId, gigTitle, price" },
      { status: 400 }
    );
  }

  // Convert price (e.g. 49.99) to cents (4999) as Stripe expects.
  const amountCents = Math.round(Number(price) * 100);
  if (!amountCents || amountCents <= 0) {
    return NextResponse.json(
      { error: "Price must be a positive number" },
      { status: 400 }
    );
  }

  const applicationFeeAmountCents = calculateApplicationFeeAmountCents(amountCents);

  // Determine base URL for success / cancel redirects.
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            unit_amount: amountCents,
            product_data: {
              name: gigTitle,
              description: packageTitle
                ? `Package: ${packageTitle}`
                : undefined,
            },
          },
          quantity: 1,
        },
      ],

      // Funds land on the platform account (escrow). The transfer to the
      // freelancer happens later via the webhook after order completion.
      payment_intent_data: {
        // SkillLinkup platform fee (retained by the platform account).
        application_fee_amount: applicationFeeAmountCents,
      },

      // Attach metadata so the webhook can link back to Convex records.
      // freelancerStripeAccountId is stored here so the webhook can create
      // the transfer to the freelancer once the order is completed.
      metadata: {
        gigId,
        packageId,
        amountCents,
        currency: currency.toLowerCase(),
        freelancerStripeAccountId: freelancerStripeAccountId || "",
      },

      // Where Stripe redirects after checkout.
      success_url: `${baseUrl}/dashboard/orders?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: request.headers.get("referer") || `${baseUrl}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[stripe/checkout] Stripe error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
