import { NextResponse } from 'next/server';
import { requireFreelancer } from '@/lib/auth-helpers';
import { stripe } from '@/lib/stripe';
import { fetchQuery, fetchMutation } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/stripe/connect/onboard
// Creates or retrieves a Stripe Express account and returns an onboarding link URL.
export async function POST() {
  try {
    const { user } = await requireFreelancer();

    // Look up the Convex user document by Clerk/Stack Auth ID
    const convexUser = await fetchQuery(api.users.getByStackAuthId, {
      stackAuthId: user.id,
    });

    if (!convexUser) {
      return NextResponse.json(
        { error: 'User profile not found. Please sign in again.' },
        { status: 401 }
      );
    }

    const convexUserId = convexUser._id as Id<'users'>;

    // Fetch the freelancer profile from Convex to check for existing Stripe account
    const profile = await fetchQuery(api.marketplace.freelancers.getByUserId, {
      userId: convexUserId,
    });

    if (!profile) {
      return NextResponse.json(
        { error: 'No active freelancer profile' },
        { status: 401 }
      );
    }

    let stripeAccountId: string | null = profile.stripeAccountId ?? null;

    // Create a new Express account if none exists yet
    if (!stripeAccountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        metadata: {
          user_id: user.id,
          convex_user_id: String(convexUserId),
          freelancer_profile_id: String(profile._id),
        },
      });

      stripeAccountId = account.id;

      // Persist the new Stripe account ID to the Convex freelancer profile
      await fetchMutation(api.marketplace.freelancers.updateStripeAccount, {
        userId: convexUserId,
        stripeAccountId,
      });
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://skilllinkup.com';

    // Build the account link for the onboarding flow
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${siteUrl}/en/dashboard/seller/stripe`,
      return_url: `${siteUrl}/api/stripe/connect/return`,
      type: 'account_onboarding',
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (err) {
    if (
      err instanceof Error &&
      (err.message === 'Unauthorized' ||
        err.message === 'No active freelancer profile')
    ) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    console.error('POST /api/stripe/connect/onboard error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
