import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { StripeConnect } from '@/components/dashboard/StripeConnect';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SellerStripePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('dashboard.stripe');

  const { getToken, userId: clerkId } = await auth();
  if (!clerkId) {
    redirect('/sign-in');
  }

  const token = await getToken({ template: 'convex' });

  // Fetch Convex user by Clerk ID
  const convexUser = await fetchQuery(
    api.users.getByClerkId,
    { clerkId },
    { token: token ?? undefined }
  );

  let stripeAccountId: string | null = null;
  let onboardingComplete = false;

  if (convexUser) {
    const profile = await fetchQuery(
      api.marketplace.freelancers.getByUserId,
      { userId: convexUser._id },
      { token: token ?? undefined }
    );

    if (profile) {
      stripeAccountId = profile.stripeAccountId ?? null;
      onboardingComplete = profile.stripeOnboardingComplete ?? false;
    }
  }

  // Retrieve live Stripe account status and create login link
  let chargesEnabled = false;
  let payoutsEnabled = false;
  let loginLinkUrl: string | null = null;

  if (stripeAccountId) {
    try {
      const account = await stripe.accounts.retrieve(stripeAccountId);
      chargesEnabled = account.charges_enabled ?? false;
      payoutsEnabled = account.payouts_enabled ?? false;

      // Only create a login link when onboarding is complete
      if (onboardingComplete) {
        const loginLink = await stripe.accounts.createLoginLink(stripeAccountId);
        loginLinkUrl = loginLink.url;
      }
    } catch (err) {
      // If Stripe throws (e.g. account deleted), treat as not connected
      console.error('Stripe account retrieve error:', err);
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto w-full">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
          {t('title')}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t('description')}
        </p>
      </div>

      {/* Stripe Connect status card */}
      <StripeConnect
        stripeAccountId={stripeAccountId}
        onboardingComplete={onboardingComplete}
        chargesEnabled={chargesEnabled}
        payoutsEnabled={payoutsEnabled}
        loginLinkUrl={loginLinkUrl}
      />
    </div>
  );
}
