import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireFreelancer } from '@/lib/auth-helpers';
import { stripe } from '@/lib/stripe';

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

    // Fetch the stored Stripe account ID
    const profileRows = await sql`
      SELECT stripe_account_id
      FROM freelancer_profiles
      WHERE user_id = ${user.id}
      LIMIT 1
    `;

    const stripeAccountId = profileRows[0]?.stripe_account_id as
      | string
      | null;

    if (!stripeAccountId) {
      return NextResponse.redirect(dashboardUrl);
    }

    // Retrieve the account to check onboarding completion
    const account = await stripe.accounts.retrieve(stripeAccountId);

    const isComplete =
      account.charges_enabled === true && account.payouts_enabled === true;

    if (isComplete) {
      await sql`
        UPDATE freelancer_profiles
        SET
          stripe_onboarding_complete = true,
          updated_at = NOW()
        WHERE user_id = ${user.id}
      `;
    }

    return NextResponse.redirect(dashboardUrl);
  } catch (err) {
    if (
      err instanceof Error &&
      (err.message === 'Unauthorized' ||
        err.message === 'No active freelancer profile')
    ) {
      return NextResponse.redirect(`${siteUrl}/handler/sign-in`);
    }
    console.error('GET /api/stripe/connect/return error:', err);
    return NextResponse.redirect(dashboardUrl);
  }
}
