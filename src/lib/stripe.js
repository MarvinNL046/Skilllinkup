import Stripe from "stripe";

// -----------------------------------------------------------------------
// STRIPE_SECRET_KEY must be added to .env.local before payments work.
// Get your keys from: https://dashboard.stripe.com/apikeys
//
// Add to .env.local:
//   STRIPE_SECRET_KEY=sk_test_...          (test key)
//   STRIPE_PUBLISHABLE_KEY=pk_test_...     (for frontend, if needed)
//   STRIPE_WEBHOOK_SECRET=whsec_...        (from Stripe webhook dashboard)
// -----------------------------------------------------------------------

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn(
    "[SkillLinkup] STRIPE_SECRET_KEY is not set – payments will not work. " +
    "Add it to your .env.local file."
  );
}

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      // Pin the API version so upgrades are intentional and never silent.
      apiVersion: "2024-06-20",
    })
  : null;
