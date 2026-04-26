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

  // Determine base URL for success / cancel redirects.
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: verifiedEmail,

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

      // Funds land on the platform account (Separate Charges + Manual
      // Transfers). The transfer to the freelancer happens later via
      // releaseToFreelancer in convex/marketplace/escrow.ts. The platform fee
      // is the difference between amount and transfer (implicit, not declared
      // as application_fee_amount — that field requires Direct/Destination
      // charges, not Separate Charges).

      // Metadata is stored on the Checkout Session for webhook reference.
      // NOTE: freelancerStripeAccountId here is a convenience passthrough only.
      // The actual Stripe transfer always reads the account ID from Convex DB
      // (via the releaseToFreelancer internal action) — never trusts this value blindly.
      metadata: {
        gigId,
        packageId,
        amountCents: String(amountCents),
        currency: currency.toLowerCase(),
        freelancerStripeAccountId: freelancerStripeAccountId || "",
      },

      // Where Stripe redirects after checkout.
      success_url: `${baseUrl}/orders?success=true&session_id={CHECKOUT_SESSION_ID}`,
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
