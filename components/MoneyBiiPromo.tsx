'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Clock, Zap } from 'lucide-react';

interface MoneyBiiPromoProps {
  variant?: 'subtle' | 'banner' | 'sidebar';
  className?: string;
}

// MoneyBii promo - temporarily showing "coming soon" instead of links
// until MoneyBii product is ready for launch
export function MoneyBiiPromo({ variant = 'subtle', className = '' }: MoneyBiiPromoProps) {
  const t = useTranslations('moneyBiiPromo');

  if (variant === 'subtle') {
    return (
      <div className={`bg-gradient-to-r from-purple-50 to-yellow-50 dark:from-purple-900/20 dark:to-yellow-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800/30 ${className}`}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-shrink-0">
            <Image
              src="/images/logo/logo-moneybii/moneybii-purple-yellow-transparentbg.png"
              alt="MoneyBii"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t('subtle.text')}
            </p>
          </div>
          <div
            className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap cursor-not-allowed"
          >
            <Clock className="w-4 h-4" />
            {t('comingSoon')}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`bg-gray-900 dark:bg-slate-950 rounded-xl p-6 ${className}`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <Image
              src="/images/logo/logo-moneybii/moneybii-full-yellow-transparentbg.png"
              alt="MoneyBii"
              width={180}
              height={50}
              className="h-14 w-auto"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-1">
              {t('banner.title')}
            </h3>
            <p className="text-gray-400 text-sm">
              {t('banner.text')}
            </p>
          </div>
          <div
            className="inline-flex items-center gap-2 bg-yellow-500/50 text-gray-700 px-6 py-3 rounded-lg font-bold whitespace-nowrap cursor-not-allowed"
          >
            <Clock className="w-5 h-5" />
            {t('comingSoon')}
          </div>
        </div>
      </div>
    );
  }

  // sidebar variant
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg p-5 border border-gray-200 dark:border-slate-700 ${className}`}>
      <div className="flex items-center justify-center mb-4">
        <Image
          src="/images/logo/logo-moneybii/moneybii-purple-yellow-transparentbg.png"
          alt="MoneyBii"
          width={120}
          height={35}
          className="h-9 w-auto"
        />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
        {t('sidebar.text')}
      </p>
      <div
        className="block w-full text-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-lg text-sm font-semibold cursor-not-allowed"
      >
        <Clock className="w-4 h-4 inline mr-2" />
        {t('comingSoon')}
      </div>
    </div>
  );
}
