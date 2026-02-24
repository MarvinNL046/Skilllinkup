'use client';

import Link from 'next/link';
import { Search, GitCompare, Handshake } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export function MarketplaceHowItWorks() {
 const locale = useLocale();
 const t = useTranslations('homepage.marketplaceHowItWorks');

 const steps = [
 {
 icon: Search,
 number: '01',
 title: t('step1Title'),
 description: t('step1Description'),
 },
 {
 icon: GitCompare,
 number: '02',
 title: t('step2Title'),
 description: t('step2Description'),
 },
 {
 icon: Handshake,
 number: '03',
 title: t('step3Title'),
 description: t('step3Description'),
 },
 ];

 return (
 <section className="py-16 md:py-20 bg-background-light dark:bg-gray-900">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 {/* Section header */}
 <div className="text-center mb-14">
 <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary dark:text-white mb-3">
 {t('title')}
 </h2>
 <p className="text-base text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
 {t('subtitle')}
 </p>
 </div>

 {/* Steps */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 max-w-4xl mx-auto mb-14">
 {steps.map((step, index) =>{
 const Icon = step.icon;
 return (
 <div key={index} className="relative text-center">
 {/* Connector line (desktop only) */}
 {index < steps.length - 1 && (
 <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px border-t-2 border-dashed border-gray-200 dark:border-gray-700" />
 )}

 {/* Icon circle */}
 <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 mb-5">
 <Icon className="w-8 h-8 text-primary" />
 <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center">
 {step.number}
 </span>
 </div>

 <h3 className="font-heading font-bold text-lg text-text-primary dark:text-white mb-2">
 {step.title}
 </h3>
 <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
 {step.description}
 </p>
 </div>
 );
 })}
 </div>

 {/* CTAs */}
 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
 <Link
 href={`/${locale}/marketplace/gigs`}
 className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-heading font-semibold rounded-lg transition-colors shadow-lg"
 >
 {t('browseServices')}
 </Link>
 <Link
 href={`/${locale}/marketplace/projects/new`}
 className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 border-2 border-secondary dark:border-gray-600 text-secondary dark:text-white font-heading font-semibold rounded-lg hover:bg-secondary hover:text-white dark:hover:bg-gray-700 transition-colors"
 >
 {t('postProject')}
 </Link>
 </div>
 </div>
 </section>
 );
}
