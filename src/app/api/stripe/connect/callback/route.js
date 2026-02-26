import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../../convex/_generated/api";

// ---------------------------------------------------------------------------
// GET /api/stripe/connect/callback?account_id=acct_xxx[&refresh=true]
//
// Stripe redirects the freelancer here after completing (or exiting) the
// Express onboarding flow.
//
// Query params:
//   account_id  – The Stripe account ID (acct_xxx) from the onboarding link.
//   refresh     – Present when the onboarding link expired and was refreshed.
//
// Behaviour:
//   1. Retrieve the account from Stripe and check its status.
//   2. If fully onboarded (charges_enabled), mark the profile in Convex as
//      onboarding-complete and redirect to the dashboard with success=true.
//   3. If onboarding is not yet complete, redirect back to the dashboard so
//      the freelancer can restart it via the StripeConnectButton.
// ---------------------------------------------------------------------------

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("account_id");
  const isRefresh = searchParams.has("refresh");

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // If the link was refreshed, generate a new onboarding link and redirect.
  if (isRefresh && accountId) {
    if (!stripe) {
      return NextResponse.redirect(
        `${baseUrl}/dashboard/payouts?stripe_error=not_configured`
      );
    }

    try {
      // Re-create an account link so the freelancer can continue.
      const accountLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: `${baseUrl}/api/stripe/connect/callback?account_id=${accountId}&refresh=true`,
        return_url: `${baseUrl}/api/stripe/connect/callback?account_id=${accountId}`,
        type: "account_onboarding",
      });

      return NextResponse.redirect(accountLink.url);
    } catch (err) {
      console.error("[stripe/connect/callback] Failed to refresh link:", err);
      return NextResponse.redirect(
        `${baseUrl}/dashboard/payouts?stripe_error=refresh_failed`
      );
    }
  }

  if (!accountId) {
    return NextResponse.redirect(
      `${baseUrl}/dashboard/payouts?stripe_error=missing_account`
    );
  }

  if (!stripe) {
    return NextResponse.redirect(
      `${baseUrl}/dashboard/payouts?stripe_error=not_configured`
    );
  }

  try {
    // Retrieve the account from Stripe to check its current status.
    const account = await stripe.accounts.retrieve(accountId);

    if (account.charges_enabled) {
      // The freelancer has completed onboarding and can accept payments.
      // Pull the Convex user ID from the account metadata set during creation.
      const convexUserId = account.metadata?.convexUserId;

      if (convexUserId) {
        try {
          await convex.mutation(api.marketplace.freelancers.setOnboardingComplete, {
            userId: convexUserId,
          });
        } catch (convexErr) {
          // Log but don't block – the Stripe account is already connected.
          console.error(
            "[stripe/connect/callback] Failed to update Convex onboarding status:",
            convexErr
          );
        }
      }

      return NextResponse.redirect(
        `${baseUrl}/dashboard/payouts?stripe_connected=true`
      );
    } else {
      // Onboarding was started but not completed (user exited early).
      // Redirect to payouts page where the StripeConnectButton lets them retry.
      return NextResponse.redirect(
        `${baseUrl}/dashboard/payouts?stripe_pending=true`
      );
    }
  } catch (err) {
    console.error("[stripe/connect/callback] Stripe error:", err);
    return NextResponse.redirect(
      `${baseUrl}/dashboard/payouts?stripe_error=verification_failed`
    );
  }
}
