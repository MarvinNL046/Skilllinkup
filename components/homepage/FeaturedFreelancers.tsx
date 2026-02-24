'use client';

import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FreelancerCard } from '@/components/marketplace/FreelancerCard';
import type { FreelancerProfile } from '@/lib/marketplace-queries';

interface FeaturedFreelancersProps {
 freelancers: FreelancerProfile[];
}

export function FeaturedFreelancers({ freelancers }: FeaturedFreelancersProps) {
 const locale = useLocale();
 const t = useTranslations('homepage.featuredFreelancers');

 return (
 <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 {/* Section header */}
 <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
 <div>
 <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary dark:text-white mb-2">
 {t('title')}
 </h2>
 <p className="text-base text-text-secondary dark:text-gray-400">
 {t('subtitle')}
 </p>
 </div>
 <Link
 href={`/${locale}/marketplace/freelancers`}
 className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex-shrink-0"
 >
 {t('viewAll')}
 <ArrowRight className="w-4 h-4" />
 </Link>
 </div>

 {freelancers.length >0 ? (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {freelancers.map((freelancer) =>(
 <FreelancerCard key={freelancer.id} freelancer={freelancer} />
 ))}
 </div>
 ) : (
 <div className="text-center py-12 rounded-lg bg-background-light dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-700">
 <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
 <p className="text-text-secondary dark:text-gray-400 mb-6 max-w-md mx-auto">
 {t('noFreelancersYet')}
 </p>
 <Link
 href={`/${locale}/marketplace/freelancers`}
 className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
 >
 {t('exploreFreelancers')}
 <ArrowRight className="w-4 h-4" />
 </Link>
 </div>
 )}
 </div>
 </section>
 );
}
