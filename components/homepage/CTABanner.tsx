'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export function CTABanner() {
  const locale = useLocale();
  const t = useTranslations('homepage.ctaBanner');

  return (
    <section className="py-16 md:py-20 bg-background-light dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-lg bg-gradient-to-br from-secondary to-secondary-dark overflow-hidden px-6 py-14 sm:px-12 sm:py-16 text-center">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-base sm:text-lg text-white/75 mb-8 max-w-xl mx-auto">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${locale}/auth/signup`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-heading font-semibold rounded-lg transition-colors shadow-lg"
              >
                {t('signUp')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/marketplace/gigs`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-heading font-semibold rounded-lg border border-white/20 transition-colors backdrop-blur-sm"
              >
                {t('browseServices')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
