import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { sql } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { StripeConnect } from '@/components/dashboard/StripeConnect';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export default async function SellerStripePage({ params }: PageProps) {
 const { locale } = await params;
 const t = await getTranslations('dashboard.stripe');

 const user = await getCurrentUser();
 if (!user) {
 redirect('/handler/sign-in');
 }

 // Fetch the freelancer profile including Stripe fields
 const profileRows = await sql`
 SELECT
 id,
 stripe_account_id,
 stripe_onboarding_complete
 FROM freelancer_profiles
 WHERE user_id = ${user.id}
 LIMIT 1
 `;

 const profile = profileRows[0] ?? null;
 const stripeAccountId = (profile?.stripe_account_id as string | null) ?? null;
 const onboardingComplete =
 Boolean(profile?.stripe_onboarding_complete) ?? false;

 // If an account exists, retrieve live status and create a login link
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
