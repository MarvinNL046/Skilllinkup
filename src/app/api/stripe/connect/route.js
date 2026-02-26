import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

// ---------------------------------------------------------------------------
// POST /api/stripe/connect
//
// Creates a Stripe Express account for a freelancer and returns the
// onboarding URL. The frontend should redirect the user there immediately.
//
// Body (JSON):
//   email              – Freelancer's email address (pre-fills the Stripe form)
//   freelancerUserId   – The Convex users._id for this freelancer
//
// Returns:
//   { url }  – Stripe Connect onboarding URL; redirect the user here.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// REQUIRED ENV VARS
// Add these to .env.local once you have your Stripe keys:
//
//   STRIPE_SECRET_KEY=sk_test_...
//
// The return_url and refresh_url below use NEXT_PUBLIC_SITE_URL, which should
// already be set in your env. No extra config needed for that.
// ---------------------------------------------------------------------------

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

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

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email, freelancerUserId } = body;

  if (!email || !freelancerUserId) {
    return NextResponse.json(
      { error: "Missing required fields: email, freelancerUserId" },
      { status: 400 }
    );
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    // 1. Create a Stripe Express account for the freelancer.
    //    Express accounts are the recommended type for marketplace payouts:
    //    they handle compliance & identity verification with minimal UX friction.
    const account = await stripe.accounts.create({
      type: "express",
      email,
      capabilities: {
        // Enable card payments so the freelancer can receive transfers.
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      // Pre-fill metadata to help track which Convex user owns this account.
      metadata: {
        convexUserId: freelancerUserId,
      },
    });

    // 2. Persist the new Stripe account ID in Convex immediately so it is
    //    available even if the user doesn't complete onboarding in one session.
    await convex.mutation(api.marketplace.freelancers.updateStripeAccount, {
      userId: freelancerUserId,
      stripeAccountId: account.id,
    });

    // 3. Create a one-time onboarding link for this account.
    //    - refresh_url: shown if the link expires or is already used
    //    - return_url: shown after the user finishes (or skips) onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${baseUrl}/api/stripe/connect/callback?account_id=${account.id}&refresh=true`,
      return_url: `${baseUrl}/api/stripe/connect/callback?account_id=${account.id}`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (err) {
    console.error("[stripe/connect] Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create Stripe Connect account" },
      { status: 500 }
    );
  }
}
