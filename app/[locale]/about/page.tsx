'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function AboutPage() {
 const t = useTranslations('aboutPage');
 const params = useParams();
 const locale = params.locale as string;

 return (
 <>
 <Header />
 <main className="flex-1">
 {/* Hero Section */}
 <section className="bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 sm:py-20">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-3xl mx-auto text-center">
 <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white sm:text-5xl mb-6">
 {t('hero.title')}
 </h1>
 <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
 {t('hero.subtitle')}
 </p>
 </div>
 </div>
 </section>

 {/* Mission Section */}
 <section className="py-16 bg-white dark:bg-gray-900">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">
 <div className="grid gap-12 md:grid-cols-2">
 <div>
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {t('mission.title')}
 </h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 {t('mission.paragraph1')}
 </p>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
 {t('mission.paragraph2')}
 </p>
 </div>
 <div className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 border border-transparent dark:border-gray-600">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 {t('whatWeDo.title')}
 </h3>
 <ul className="space-y-4">
 <li className="flex items-start gap-3">
 <span className="mt-1 text-accent dark:text-accent-light">✓</span>
 <span className="text-gray-700 dark:text-gray-300">
 {t('whatWeDo.item1')}
 </span>
 </li>
 <li className="flex items-start gap-3">
 <span className="mt-1 text-accent dark:text-accent-light">✓</span>
 <span className="text-gray-700 dark:text-gray-300">
 {t('whatWeDo.item2')}
 </span>
 </li>
 <li className="flex items-start gap-3">
 <span className="mt-1 text-accent dark:text-accent-light">✓</span>
 <span className="text-gray-700 dark:text-gray-300">
 {t('whatWeDo.item3')}
 </span>
 </li>
 <li className="flex items-start gap-3">
 <span className="mt-1 text-accent dark:text-accent-light">✓</span>
 <span className="text-gray-700 dark:text-gray-300">
 {t('whatWeDo.item4')}
 </span>
 </li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Values Section */}
 <section className="py-16 bg-gray-50 dark:bg-gray-800">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white text-center mb-12">
 {t('values.title')}
 </h2>
 <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
 {/* Honest Reviews */}
 <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-600">
 <div className="w-12 h-12 rounded-lg bg-primary dark:bg-accent flex items-center justify-center text-white text-2xl mb-4">
 </div>
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {t('values.honest.title')}
 </h3>
 <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
 {t('values.honest.description')}
 </p>
 </div>

 {/* Data-Driven */}
 <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-600">
 <div className="w-12 h-12 rounded-lg bg-primary dark:bg-accent flex items-center justify-center text-white text-2xl mb-4">
 </div>
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {t('values.data.title')}
 </h3>
 <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
 {t('values.data.description')}
 </p>
 </div>

 {/* Community First */}
 <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-600">
 <div className="w-12 h-12 rounded-lg bg-primary dark:bg-accent flex items-center justify-center text-white text-2xl mb-4">
 </div>
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {t('values.community.title')}
 </h3>
 <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
 {t('values.community.description')}
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Stats Section */}
 <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
 <div className="text-center">
 <div className="text-4xl font-heading font-bold text-white mb-2">
 25+
 </div>
 <div className="text-sm text-white/90">
 {t('stats.platforms')}
 </div>
 </div>
 <div className="text-center">
 <div className="text-4xl font-heading font-bold text-white mb-2">
 1,000+
 </div>
 <div className="text-sm text-white/90">
 {t('stats.freelancers')}
 </div>
 </div>
 <div className="text-center">
 <div className="text-4xl font-heading font-bold text-white mb-2">
 4.9★
 </div>
 <div className="text-sm text-white/90">
 {t('stats.rating')}
 </div>
 </div>
 <div className="text-center">
 <div className="text-4xl font-heading font-bold text-white mb-2">
 100%
 </div>
 <div className="text-sm text-white/90">
 {t('stats.unbiased')}
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Team Section */}
 <section className="py-16 bg-white dark:bg-gray-900">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-3xl mx-auto text-center">
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 {t('team.title')}
 </h2>
 <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
 {t('team.description')}
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent/90 px-8 py-3 text-base font-heading font-semibold text-white shadow-lg transition-all hover:shadow-xl"
 >
 {t('team.ctaBrowse')}
 </Link>
 <Link
 href={`/${locale}/contact`}
 className="inline-flex items-center justify-center rounded-lg border-2 border-secondary dark:border-accent bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-3 text-base font-heading font-semibold text-secondary dark:text-accent transition-all"
 >
 {t('team.ctaContact')}
 </Link>
 </div>
 </div>
 </div>
 </section>
 </main>
 <Footer />
 </>
 );
}
