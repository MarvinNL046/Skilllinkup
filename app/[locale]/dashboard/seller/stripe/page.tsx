import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { stripe } from '@/lib/stripe';
import { StripeConnect } from '@/components/dashboard/StripeConnect';
import Link from 'next/link';

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
    <div className="container py40">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          {/* Breadcrumb */}
          <div className="breadcumb-list mb30">
            <Link href={`/${locale}/dashboard`}>Dashboard</Link>
            <span className="mx10">/</span>
            <Link href={`/${locale}/dashboard/seller`}>Seller</Link>
            <span className="mx10">/</span>
            <span className="active">{t('title')}</span>
          </div>

          {/* Page header */}
          <div className="ps-widget bgc-white bdrs12 bdr1 p30 mb30">
            <h4 className="fw600 mb5">{t('title')}</h4>
            <p className="fz14 body-color mb0">{t('description')}</p>
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
      </div>
    </div>
  );
}
