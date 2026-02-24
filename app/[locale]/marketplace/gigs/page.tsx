import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { GigFilters } from '@/components/marketplace/GigFilters';

export const dynamic = 'force-dynamic';

interface GigsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function GigsPage({ params }: GigsPageProps) {
  const { locale } = await params;
  const t = await getTranslations('marketplace');

  type ConvexGig = Awaited<ReturnType<typeof fetchQuery<typeof api.marketplace.gigs.list>>>[number];
  type ConvexCategory = Awaited<ReturnType<typeof fetchQuery<typeof api.marketplace.categories.list>>>[number];

  let rawGigs: ConvexGig[] = [];
  let rawCategories: ConvexCategory[] = [];

  try {
    [rawGigs, rawCategories] = await Promise.all([
      fetchQuery(api.marketplace.gigs.list, { locale, limit: 100 }),
      fetchQuery(api.marketplace.categories.list, { locale }),
    ]);
  } catch (error) {
    console.error('Error fetching gigs:', error);
  }

  // Map Convex camelCase to the snake_case shapes the JSX expects
  const serializableGigs = rawGigs.map((gig) => ({
    id: gig._id,
    freelancer_id: gig.freelancerId,
    freelancer_name: gig.freelancerProfile
      ? (gig.freelancerProfile as { displayName?: string }).displayName ?? 'Unknown'
      : 'Unknown',
    freelancer_avatar: gig.freelancerProfile
      ? (gig.freelancerProfile as { avatarUrl?: string | null }).avatarUrl ?? null
      : null,
    freelancer_rating: Number(
      gig.freelancerProfile
        ? (gig.freelancerProfile as { ratingAverage?: number | null }).ratingAverage ?? 0
        : 0
    ),
    freelancer_verified: Boolean(
      gig.freelancerProfile
        ? (gig.freelancerProfile as { isVerified?: boolean | null }).isVerified
        : false
    ),
    title: gig.title,
    slug: gig.slug,
    description: gig.description,
    category_id: (gig.categoryId ?? '') as string,
    category_name: gig.category
      ? (gig.category as { name?: string }).name ?? 'Uncategorized'
      : 'Uncategorized',
    category_slug: gig.category
      ? (gig.category as { slug?: string }).slug ?? ''
      : '',
    tags: Array.isArray(gig.tags) ? gig.tags : [],
    work_type: gig.workType ?? 'remote',
    location_city: gig.locationCity ?? null,
    location_country: gig.locationCountry ?? null,
    price_from: Number(gig.minPrice ?? 0),
    currency: gig.firstImage
      ? 'EUR'
      : 'EUR',
    views: Number(gig.views ?? 0),
    order_count: Number(gig.orderCount ?? 0),
    rating_average: Number(gig.ratingAverage ?? 0),
    rating_count: Number(gig.ratingCount ?? 0),
    is_featured: Boolean(gig.isFeatured),
    status: gig.status,
    images: gig.firstImage
      ? [(gig.firstImage as { imageUrl?: string }).imageUrl ?? ''].filter(Boolean)
      : [],
    created_at: String(gig.createdAt),
  }));

  // Map Convex categories (tree with gigCount and children)
  const serializableCategories = rawCategories.map((cat) => ({
    id: cat._id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description ?? null,
    icon: cat.icon ?? null,
    image_url: cat.imageUrl ?? null,
    parent_id: cat.parentId ?? null,
    service_type: cat.serviceType ?? 'digital',
    gig_count: Number(cat.gigCount ?? 0),
    children: (cat.children ?? []).map((child: any) => ({
      id: child._id,
      name: child.name,
      slug: child.slug,
      description: child.description ?? null,
      icon: child.icon ?? null,
      image_url: child.imageUrl ?? null,
      parent_id: child.parentId ?? null,
      service_type: child.serviceType ?? 'digital',
      gig_count: Number(child.gigCount ?? 0),
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
