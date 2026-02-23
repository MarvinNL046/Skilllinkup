'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Clock, RefreshCw, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface GigPackage {
  id: string;
  tier: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  delivery_days: number;
  revision_count: number;
  features: string[];
}

interface GigPackageSelectorProps {
  packages: GigPackage[];
  gigSlug: string;
  locale: string;
  freelancerId: string;
}

function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

const TIER_ORDER = ['basic', 'standard', 'premium'];

function getTierLabel(tier: string, t: ReturnType<typeof useTranslations<'marketplace'>>): string {
  if (tier === 'basic') return t('gigDetail.basic');
  if (tier === 'standard') return t('gigDetail.standard');
  if (tier === 'premium') return t('gigDetail.premium');
  return tier.charAt(0).toUpperCase() + tier.slice(1);
}

export function GigPackageSelector({
  packages,
  gigSlug,
  locale,
  freelancerId,
}: GigPackageSelectorProps) {
  const t = useTranslations('marketplace');

  // Sort packages by tier order, unknown tiers go to end
  const sortedPackages = [...packages].sort((a, b) => {
    const aIdx = TIER_ORDER.indexOf(a.tier.toLowerCase());
    const bIdx = TIER_ORDER.indexOf(b.tier.toLowerCase());
    const aNorm = aIdx === -1 ? 99 : aIdx;
    const bNorm = bIdx === -1 ? 99 : bIdx;
    return aNorm - bNorm;
  });

  const [activeIndex, setActiveIndex] = useState(0);

  if (!sortedPackages || sortedPackages.length === 0) {
    return null;
  }

  const hasTabs = sortedPackages.length > 1;
  const activePackage = sortedPackages[activeIndex] || sortedPackages[0];
  const features = Array.isArray(activePackage.features) ? activePackage.features : [];

  const checkoutHref = `/${locale}/marketplace/checkout/${gigSlug}?package=${activePackage.id}`;
  const contactHref = `/${locale}/marketplace/messages/${freelancerId}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md overflow-hidden">
      {/* Tab headers — only when multiple packages */}
      {hasTabs && (
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {sortedPackages.map((pkg, index) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors focus:outline-none ${
                activeIndex === index
                  ? 'text-primary border-b-2 border-primary bg-primary/5 dark:bg-primary/10'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
              aria-selected={activeIndex === index}
              role="tab"
            >
              {getTierLabel(pkg.tier, t)}
            </button>
          ))}
        </div>
      )}

      {/* Package details */}
      <div className="p-5 space-y-4">
        {/* Title and price */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
            {getTierLabel(activePackage.tier, t)}
          </p>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
              {activePackage.title}
            </h3>
            <span className="text-xl font-extrabold text-primary shrink-0">
              {formatCurrency(activePackage.price, activePackage.currency)}
            </span>
          </div>
        </div>

        {/* Description */}
        {activePackage.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {activePackage.description}
          </p>
        )}

        {/* Delivery and revisions */}
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
            <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="font-medium">{activePackage.delivery_days}</span>
            <span className="text-gray-500 dark:text-gray-400">{t('gigDetail.days')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
            <RefreshCw className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="font-medium">{activePackage.revision_count}</span>
            <span className="text-gray-500 dark:text-gray-400">{t('gigDetail.revisions')}</span>
          </div>
        </div>

        {/* Features list */}
        {features.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
              {t('gigDetail.features')}
            </p>
            <ul className="space-y-1.5">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA buttons */}
        <div className="space-y-2 pt-2">
          <Link
            href={checkoutHref}
            className="block w-full text-center py-3 px-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors duration-200 text-sm"
          >
            {t('gigDetail.orderNow')} — {formatCurrency(activePackage.price, activePackage.currency)}
          </Link>
          <Link
            href={contactHref}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary font-medium rounded-lg transition-colors duration-200 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            {t('gigDetail.contactSeller')}
          </Link>
        </div>
      </div>
    </div>
  );
}
