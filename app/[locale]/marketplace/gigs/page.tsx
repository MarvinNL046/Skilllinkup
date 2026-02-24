import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { getPublishedGigs, getMarketplaceCategories } from '@/lib/marketplace-queries';
import { GigFilters } from '@/components/marketplace/GigFilters';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface GigsPageProps {
 params: Promise<{ locale: string }>;
}

export default async function GigsPage({ params }: GigsPageProps) {
 const { locale } = await params;
 const t = await getTranslations('marketplace');

 let gigs: Awaited<ReturnType<typeof getPublishedGigs>>= [];
 let categories: Awaited<ReturnType<typeof getMarketplaceCategories>>= [];

 try {
 [gigs, categories] = await Promise.all([
 getPublishedGigs(100, 0, locale),
 getMarketplaceCategories(locale),
 ]);
 } catch (error) {
 console.error('Error fetching gigs:', error);
 }

 // Serialize gigs: ensure all values are primitives (no Date objects)
 const serializableGigs = gigs.map((gig) =>({
 id: gig.id,
 freelancer_id: gig.freelancer_id,
 freelancer_name: gig.freelancer_name,
 freelancer_avatar: gig.freelancer_avatar,
 freelancer_rating: Number(gig.freelancer_rating),
 freelancer_verified: Boolean(gig.freelancer_verified),
 title: gig.title,
 slug: gig.slug,
 description: gig.description,
 category_id: gig.category_id,
 category_name: gig.category_name,
 category_slug: gig.category_slug,
 tags: Array.isArray(gig.tags) ? gig.tags : [],
 work_type: gig.work_type,
 location_city: gig.location_city,
 location_country: gig.location_country,
 price_from: Number(gig.price_from),
 currency: gig.currency,
 views: Number(gig.views),
 order_count: Number(gig.order_count),
 rating_average: Number(gig.rating_average),
 rating_count: Number(gig.rating_count),
 is_featured: Boolean(gig.is_featured),
 status: gig.status,
 images: Array.isArray(gig.images) ? gig.images : [],
 created_at: String(gig.created_at),
 }));

 // Serialize categories
 const serializableCategories = categories.map((cat) =>({
 id: cat.id,
 name: cat.name,
 slug: cat.slug,
 description: cat.description,
 icon: cat.icon,
 image_url: cat.image_url,
 parent_id: cat.parent_id,
 service_type: cat.service_type,
 gig_count: Number(cat.gig_count),
 children: (cat.children || []).map((child) =>({
 id: child.id,
 name: child.name,
 slug: child.slug,
 description: child.description,
 icon: child.icon,
 image_url: child.image_url,
 parent_id: child.parent_id,
 service_type: child.service_type,
 gig_count: Number(child.gig_count),
 })),
 }));

 return (
 <section className="py-10">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 {/* Page header */}
 <div className="mb-8">
 <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
 {t('featuredGigs')}
 </h1>
 <p className="text-gray-500 dark:text-gray-400">
 {t('heroSubtitle')}
 </p>
 </div>

 {/* Filters + gig grid (client component) */}
 <Suspense fallback={
 <div className="flex items-center justify-center py-20">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
 </div>
 }>
 <GigFilters
 gigs={serializableGigs}
 categories={serializableCategories}
 />
 </Suspense>
 </div>
 </section>
 );
}
