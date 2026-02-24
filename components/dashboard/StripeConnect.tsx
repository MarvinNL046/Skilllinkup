'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
 CreditCard,
 CheckCircle,
 AlertCircle,
 ExternalLink,
 Loader2,
} from 'lucide-react';

export interface StripeConnectProps {
 stripeAccountId: string | null;
 onboardingComplete: boolean;
 chargesEnabled: boolean;
 payoutsEnabled: boolean;
 loginLinkUrl: string | null;
}

export function StripeConnect({
 stripeAccountId,
 onboardingComplete,
 chargesEnabled,
 payoutsEnabled,
 loginLinkUrl,
}: StripeConnectProps) {
 const t = useTranslations('dashboard.stripe');
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 async function handleConnect() {
 setIsLoading(true);
 setError(null);
 try {
 const res = await fetch('/api/stripe/connect/onboard', {
 method: 'POST',
 });
 const data = await res.json();
 if (!res.ok || !data.url) {
 throw new Error(data.error ?? 'Failed to start onboarding');
 }
 window.location.href = data.url;
 } catch (err) {
 setError(err instanceof Error ? err.message : t('error'));
 setIsLoading(false);
 }
 }

 // Mask most of the account ID for display (show last 6 chars only)
 function maskAccountId(accountId: string): string {
 if (accountId.length <= 10) return accountId;
 return `acct_${'*'.repeat(accountId.length - 11)}${accountId.slice(-6)}`;
 }

 // Not connected at all
 if (!stripeAccountId) {
 return (
 <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
 <div className="flex items-start gap-4">
 <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
 <CreditCard size={24} className="text-gray-400" />
 </div>
 <div className="flex-1">
 <h3 className="text-base font-semibold text-gray-900 dark:text-white">
 {t('notConnected')}
 </h3>
 <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
 {t('notConnectedDesc')}
 </p>
 </div>
 </div>

 {error && (
 <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3">
 <AlertCircle size={16} className="text-red-600 dark:text-red-400 flex-shrink-0" />
 <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
 </div>
 )}

 <div className="mt-6">
 <button
 onClick={handleConnect}
 disabled={isLoading}
 className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
 >
 {isLoading ? (
 <>
 <Loader2 size={16} className="animate-spin" />
 {t('connecting')}
 </>
 ) : (
 <>
 <CreditCard size={16} />
 {t('connectAccount')}
 </>
 )}
 </button>
 </div>
 </div>
 );
 }

 // Account exists but onboarding not complete
 if (!onboardingComplete) {
 return (
 <div className="bg-white dark:bg-gray-900 rounded-xl border border-amber-200 dark:border-amber-800 p-6">
 <div className="flex items-start gap-4">
 <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
 <AlertCircle size={24} className="text-amber-500" />
 </div>
 <div className="flex-1">
 <h3 className="text-base font-semibold text-gray-900 dark:text-white">
 {t('pendingSetup')}
 </h3>
 <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
 {t('pendingSetupDesc')}
 </p>
 </div>
 </div>

 {error && (
 <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3">
 <AlertCircle size={16} className="text-red-600 dark:text-red-400 flex-shrink-0" />
 <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
 </div>
 )}

 <div className="mt-6">
 <button
 onClick={handleConnect}
 disabled={isLoading}
 className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
 >
 {isLoading ? (
 <>
 <Loader2 size={16} className="animate-spin" />
 {t('connecting')}
 </>
 ) : (
 <>
 <CreditCard size={16} />
 {t('completeSetup')}
 </>
 )}
 </button>
 </div>
 </div>
 );
 }

 // Fully connected and onboarding complete
 return (
 <div className="bg-white dark:bg-gray-900 rounded-xl border border-green-200 dark:border-green-800 p-6">
 <div className="flex items-start gap-4">
 <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
 <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
 </div>
 <div className="flex-1">
 <h3 className="text-base font-semibold text-gray-900 dark:text-white">
 {t('connected')}
 </h3>
 <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
 {t('connectedDesc')}
 </p>
 </div>
 </div>

 {/* Account details */}
 <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-3">
 <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
 {t('accountId')}
 </p>
 <p className="text-sm font-mono text-gray-900 dark:text-white">
 {maskAccountId(stripeAccountId)}
 </p>
 </div>

 <div className="rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-3">
 <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
 {t('status')}
 </p>
 <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 dark:text-green-400">
 <span className="w-2 h-2 rounded-full bg-green-500" />
 {t('active')}
 </span>
 </div>

 <div className="rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-3">
 <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
 {t('payoutsEnabled')}
 </p>
 <p className={`text-sm font-medium ${payoutsEnabled ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
 {payoutsEnabled ? t('yes') : t('no')}
 </p>
 </div>

 <div className="rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-3">
 <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
 {t('chargesEnabled')}
 </p>
 <p className={`text-sm font-medium ${chargesEnabled ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
 {chargesEnabled ? t('yes') : t('no')}
 </p>
 </div>
 </div>

 {/* Link to Stripe Express dashboard */}
 {loginLinkUrl && (
 <div className="mt-6">
 <a
 href={loginLinkUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
 >
 <ExternalLink size={16} />
 {t('viewDashboard')}
 </a>
 </div>
 )}
 </div>
 );
}
