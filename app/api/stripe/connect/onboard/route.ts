import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireFreelancer } from '@/lib/auth-helpers';
import { stripe } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/stripe/connect/onboard
// Creates or retrieves a Stripe Express account and returns an onboarding link URL.
export async function POST() {
  try {
    const { user, profile } = await requireFreelancer();

    // Determine if this profile already has a Stripe account ID
    const profileRows = await sql`
      SELECT stripe_account_id
      FROM freelancer_profiles
      WHERE user_id = ${user.id}
      LIMIT 1
    `;

    let stripeAccountId: string | null =
      (profileRows[0]?.stripe_account_id as string | null) ?? null;

    // Create a new Express account if none exists yet
    if (!stripeAccountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        metadata: {
          user_id: user.id,
          freelancer_profile_id: profile.id,
        },
      });

      stripeAccountId = account.id;

      // Persist the new account ID
      await sql`
        UPDATE freelancer_profiles
        SET
          stripe_account_id = ${stripeAccountId},
          updated_at = NOW()
        WHERE user_id = ${user.id}
      `;
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
