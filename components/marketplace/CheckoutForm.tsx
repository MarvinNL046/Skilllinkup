'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Shield, Lock, CheckCircle, Clock, RefreshCw, AlertCircle } from 'lucide-react';
import { getStripe } from '@/lib/stripe-client';
import type { SerializableGig, SerializablePackage } from '@/app/[locale]/marketplace/checkout/[gigSlug]/page';

// ============================================================
// Types
// ============================================================

interface CheckoutFormProps {
  gig: SerializableGig;
  selectedPackageId: string;
  locale: string;
}

type CheckoutState = 'idle' | 'loading' | 'paying' | 'success' | 'error';

// ============================================================
// Helpers
// ============================================================

function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

function calculateServiceFee(price: number): number {
  // Mirror calculatePlatformFee from marketplace-queries
  if (price < 50) {
    return Math.round(price * 0.15 * 100) / 100;
  } else if (price <= 500) {
    return Math.round(price * 0.12 * 100) / 100;
  } else {
    return Math.round(price * 0.10 * 100) / 100;
  }
}

// ============================================================
// Inner form (uses useStripe / useElements hooks — must be inside <Elements>)
// ============================================================

interface CheckoutFormInnerProps extends CheckoutFormProps {
  selectedPackage: SerializablePackage;
}

function CheckoutFormInner({
  gig,
  selectedPackage,
  locale,
}: CheckoutFormInnerProps) {
  const t = useTranslations('checkout');
  const stripe = useStripe();
  const elements = useElements();

  const [requirements, setRequirements] = useState('');
  const [checkoutState, setCheckoutState] = useState<CheckoutState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [orderId, setOrderId] = useState<string | null>(null);

  const serviceFee = calculateServiceFee(selectedPackage.price);
  const total = selectedPackage.price; // Total charged to client (platform fee deducted server-side via application_fee)

  const isProcessing = checkoutState === 'loading' || checkoutState === 'paying';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe hasn't loaded yet
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setCheckoutState('loading');
    setErrorMessage('');

    try {
      // Step 1: Create PaymentIntent on the server
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gigSlug: gig.slug,
          packageId: selectedPackage.id,
          locale,
          requirements: requirements.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error?: string };
        throw new Error(errorData.error || 'Failed to create payment');
      }

      const data = (await response.json()) as {
        clientSecret: string;
        paymentIntentId: string;
      };

      setCheckoutState('paying');

      // Step 2: Confirm the card payment with Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        throw new Error(result.error.message || t('error'));
      }

      if (result.paymentIntent?.status === 'succeeded') {
        // Payment confirmed — webhook will create the order asynchronously
        // Store the paymentIntentId so we can show a "View Order" link later
        setOrderId(result.paymentIntent.id);
        setCheckoutState('success');
      } else {
        throw new Error(t('error'));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : t('error');
      setErrorMessage(message);
      setCheckoutState('error');
    }
  }

  // ---- Success state ----
  if (checkoutState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
          {t('success')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {t('successDesc')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {orderId && (
            <Link
              href={`/${locale}/orders`}
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors text-sm"
            >
              {t('viewOrder')}
            </Link>
          )}
          <Link
            href={`/${locale}/marketplace/gigs/${gig.slug}`}
            className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary font-medium rounded-lg transition-colors text-sm"
          >
            {t('backToGig')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ---- Left column: Order summary + requirements ---- */}
        <div className="lg:col-span-3 space-y-6">
          {/* Order summary card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-5">
            <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white">
              {t('orderSummary')}
            </h2>

            {/* Gig title */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                {t('package')}
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {gig.title}
              </p>
              {selectedPackage.title && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {selectedPackage.tier.charAt(0).toUpperCase() + selectedPackage.tier.slice(1)}:{' '}
                  {selectedPackage.title}
                </p>
              )}
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Package description */}
            {selectedPackage.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {selectedPackage.description}
              </p>
            )}

            {/* Delivery and revisions */}
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="font-medium">{selectedPackage.delivery_days}</span>
                <span className="text-gray-500 dark:text-gray-400">{t('days')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <RefreshCw className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="font-medium">{selectedPackage.revision_count}</span>
                <span className="text-gray-500 dark:text-gray-400">{t('revisions')}</span>
              </div>
            </div>

            {/* Escrow info */}
            <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                  {t('escrowInfo')}
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5 leading-relaxed">
                  {t('escrowDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Requirements textarea */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-3">
            <label
              htmlFor="requirements"
              className="block text-base font-semibold text-gray-900 dark:text-white"
            >
              {t('requirements')}
            </label>
            <textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder={t('requirementsPlaceholder')}
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none transition"
              disabled={isProcessing}
            />
          </div>
        </div>

        {/* ---- Right column: Payment summary + card input ---- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white">
              {t('orderSummary')}
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                <span>{t('subtotal')}</span>
                <span>{formatCurrency(selectedPackage.price, selectedPackage.currency)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                <span>{t('serviceFee')}</span>
                <span>{formatCurrency(serviceFee, selectedPackage.currency)}</span>
              </div>
              <hr className="border-gray-200 dark:border-gray-700" />
              <div className="flex justify-between items-center font-bold text-gray-900 dark:text-white text-base">
                <span>{t('total')}</span>
                <span className="text-primary text-lg">
                  {formatCurrency(total, selectedPackage.currency)}
                </span>
              </div>
            </div>

            {/* Stripe card input */}
            <div className="space-y-2 pt-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Card Details
              </label>
              <div className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '14px',
                        color: '#374151',
                        fontFamily: 'inherit',
                        '::placeholder': {
                          color: '#9ca3af',
                        },
                      },
                      invalid: {
                        color: '#ef4444',
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* Error message */}
            {checkoutState === 'error' && errorMessage && (
              <div className="flex items-start gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Pay button */}
            <button
              type="submit"
              disabled={isProcessing || !stripe}
              className="w-full py-3.5 px-4 bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('processing')}
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 flex-shrink-0" />
                  {t('payNow')} — {formatCurrency(total, selectedPackage.currency)}
                </>
              )}
            </button>

            {/* Secure payment note */}
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
              {t('paymentSecure')}
            </p>
          </div>

          {/* Back to gig link */}
          <div className="text-center">
            <Link
              href={`/${locale}/marketplace/gigs/${gig.slug}`}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              ← {t('backToGig')}
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

// ============================================================
// Outer wrapper — provides Stripe Elements context
// ============================================================

export function CheckoutForm({ gig, selectedPackageId, locale }: CheckoutFormProps) {
  const t = useTranslations('checkout');

  // Find the selected package, fall back to first
  const selectedPackage =
    gig.packages.find((p) => p.id === selectedPackageId) ?? gig.packages[0];

  if (!selectedPackage) {
    return (
      <div className="flex items-center justify-center py-12 text-center">
        <div className="space-y-3">
          <AlertCircle className="w-10 h-10 text-yellow-500 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400">{t('selectPackage')}</p>
          <Link
            href={`/${locale}/marketplace/gigs/${gig.slug}`}
            className="inline-block text-sm text-primary hover:text-primary/80 transition-colors"
          >
            ← {t('backToGig')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={getStripe()}>
      <CheckoutFormInner
        gig={gig}
        selectedPackage={selectedPackage}
        selectedPackageId={selectedPackageId}
        locale={locale}
      />
    </Elements>
  );
}
