'use client';

import Link from "next/link";
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function Hero() {
 const params = useParams();
 const locale = params.locale as string;
 const t = useTranslations('homepage.hero');

 return (
 <section className="relative bg-gradient-to-b from-background-light to-white dark:from-gray-900 dark:to-gray-800 py-16 sm:py-20">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="mx-auto max-w-3xl text-center">
 {/* Badge */}
 <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 dark:bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent dark:text-accent">
 
 {t('badge')}
 </div>

 {/* Headline */}
 <h1 className="mb-6 text-4xl font-heading font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
 {t('title')}{" "}
 <span className="text-primary">
 {t('titleHighlight')}
 </span>
 </h1>

 {/* Subheadline */}
 <p className="mb-8 text-lg text-text-secondary sm:text-xl">
 {t('subtitle')}
 </p>

 {/* CTA Buttons */}
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-8 py-3 text-base font-heading font-semibold text-white shadow-lg transition-all hover:shadow-xl"
 >
 {t('browsePlatforms')}
 <svg className="ml-2" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
 </svg>
 </Link>
 <Link
 href={`/${locale}/comparisons`}
 className="inline-flex items-center justify-center rounded-lg border-2 border-secondary bg-white dark:bg-gray-800 hover:bg-background-light dark:hover:bg-gray-700 px-8 py-3 text-base font-heading font-semibold text-secondary dark:text-white transition-all"
 >
 {t('compare')}
 </Link>
 </div>

 {/* Trust Indicators */}
 <div className="mt-12 flex items-center justify-center gap-8 text-sm">
 <div className="flex flex-col items-center gap-1">
 <span className="font-heading font-bold text-2xl text-text-primary dark:text-white">25+</span>
 <span className="text-text-muted dark:text-gray-400">{t('reviewsCount')}</span>
 </div>
 <div className="h-8 w-px bg-background-gray dark:bg-gray-700"></div>
 <div className="flex flex-col items-center gap-1">
 <span className="font-heading font-bold text-2xl text-text-primary dark:text-white">{t('freeValue')}</span>
 <span className="text-text-muted dark:text-gray-400">{t('ratedLabel')}</span>
 </div>
 <div className="h-8 w-px bg-background-gray dark:bg-gray-700"></div>
 <div className="flex flex-col items-center gap-1">
 <span className="font-heading font-bold text-2xl text-text-primary dark:text-white">24/7</span>
 <span className="text-text-muted dark:text-gray-400">{t('helpedCount')}</span>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
