import { NextRequest, NextResponse } from 'next/server';
import { requireFreelancer } from '@/lib/auth-helpers';
import { stripe } from '@/lib/stripe';
import { fetchQuery, fetchMutation } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/stripe/connect/return
// Called by Stripe after the user completes (or leaves) the onboarding flow.
// Checks account status and updates stripe_onboarding_complete if ready.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') ?? 'en';
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://skilllinkup.com';
  const dashboardUrl = `${siteUrl}/${locale}/dashboard/seller/stripe`;

  try {
    const { user } = await requireFreelancer();

    // Look up the Convex user document by Clerk/Stack Auth ID
    const convexUser = await fetchQuery(api.users.getByStackAuthId, {
      stackAuthId: user.id,
    });

    if (!convexUser) {
      return NextResponse.redirect(`${siteUrl}/sign-in`);
    }

    const convexUserId = convexUser._id as Id<'users'>;

    // Fetch the freelancer profile to get the stored Stripe account ID
    const profile = await fetchQuery(api.marketplace.freelancers.getByUserId, {
      userId: convexUserId,
    });

    const stripeAccountId = profile?.stripeAccountId ?? null;

    if (!stripeAccountId) {
      return NextResponse.redirect(dashboardUrl);
    }

    // Retrieve the Stripe account to check onboarding completion
    const account = await stripe.accounts.retrieve(stripeAccountId);

    const isComplete =
      account.charges_enabled === true && account.payouts_enabled === true;

    if (isComplete) {
      // Mark onboarding as complete in Convex
      await fetchMutation(api.marketplace.freelancers.setOnboardingComplete, {
        userId: convexUserId,
      });
    }

    return NextResponse.redirect(dashboardUrl);
  } catch (err) {
    if (
      err instanceof Error &&
      (err.message === 'Unauthorized' ||
        err.message === 'No active freelancer profile')
    ) {
      return NextResponse.redirect(`${siteUrl}/sign-in`);
    }
    console.error('GET /api/stripe/connect/return error:', err);
    return NextResponse.redirect(dashboardUrl);
  }
}
