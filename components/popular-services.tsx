'use client';

import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { GigCard } from '@/components/marketplace/GigCard';

interface GigSummary {
 id: string;
 slug: string;
 title: string;
 description: string;
 images: string[];
 freelancer_name: string;
 freelancer_avatar: string | null;
 freelancer_verified: boolean;
 rating_average: number;
 rating_count: number;
 order_count: number;
 price_from: number;
 currency: string;
 work_type: string;
 location_city: string | null;
 location_country: string | null;
 category_name: string;
 category_slug: string;
 category_id: string;
}

interface CategorySummary {
 id: string;
 name: string;
 slug: string;
 icon: string | null;
 gig_count: number;
}

interface PopularServicesProps {
 gigs: GigSummary[];
 categories: CategorySummary[];
}

export function PopularServices({ gigs, categories }: PopularServicesProps) {
 const params = useParams();
 const locale = params.locale as string;
 const t = useTranslations('homepage.marketplace');

 const hasGigs = gigs.length >0;
 const topCategories = categories.slice(0, 8);

 return (
 <section className="py-16 bg-white dark:bg-gray-950">
 <div className="container mx-auto px-4">
 {/* Section Header */}
 <div className="mb-12 text-center">
 <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 dark:text-white mb-4">
 {t('title')}
 </h2>
 <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
 {t('subtitle')}
 </p>
 </div>

 {hasGigs ? (
 <>
 {/* Gig Cards Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
 {gigs.map((gig) =>(
 <GigCard
 key={gig.id}
 id={gig.id}
 slug={gig.slug}
 title={gig.title}
 description={gig.description}
 images={gig.images}
 freelancer_name={gig.freelancer_name}
 freelancer_avatar={gig.freelancer_avatar}
 freelancer_verified={gig.freelancer_verified}
 rating_average={gig.rating_average}
 rating_count={gig.rating_count}
 order_count={gig.order_count}
 price_from={gig.price_from}
 currency={gig.currency}
 work_type={gig.work_type}
 location_city={gig.location_city}
 location_country={gig.location_country}
 category_name={gig.category_name}
 />
 ))}
 </div>

 {/* Browse All CTA */}
 <div className="text-center mb-12">
 <Link
 href={`/${locale}/marketplace/gigs`}
 className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
 >
 {t('browseAll')}
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </>
 ) : (
 /* Fallback: no gigs yet */
 <div className="text-center mb-12 py-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-dashed border-gray-200 dark:border-gray-700">
 <Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
 <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
 {t('noGigsYet')}
 </p>
 <Link
 href={`/${locale}/marketplace/gigs`}
 className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
 >
 {t('startHiring')}
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 )}

 {/* Top Categories */}
 {topCategories.length >0 && (
 <div>
 <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-5 text-center">
 {t('topCategories')}
 </h3>
 <div className="flex flex-wrap justify-center gap-3">
 {topCategories.map((cat) =>(
 <Link
 key={cat.id}
 href={`/${locale}/marketplace/gigs?category=${cat.slug}`}
 className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors"
 >
 {cat.icon && (
 <span className="text-base" aria-hidden="true">
 {cat.icon}
 </span>
 )}
 {cat.name}
 {cat.gig_count >0 && (
 <span className="text-xs text-gray-400 dark:text-gray-500">
 ({cat.gig_count})
 </span>
 )}
 </Link>
 ))}
 </div>
 </div>
 )}
 </div>
 </section>
 );
}
