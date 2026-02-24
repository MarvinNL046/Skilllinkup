import { getTranslations } from 'next-intl/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { FreelancerCard } from '@/components/marketplace/FreelancerCard';
import { FreelancerSearch } from '@/components/marketplace/FreelancerSearch';

export const dynamic = 'force-dynamic';

interface FreelancersPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FreelancersPage({ params }: FreelancersPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'freelancers' });

  type ConvexProfile = Awaited<ReturnType<typeof fetchQuery<typeof api.marketplace.freelancers.list>>>[number];
  let rawFreelancers: ConvexProfile[] = [];

  try {
    rawFreelancers = await fetchQuery(api.marketplace.freelancers.list, { locale, limit: 50 });
  } catch (error) {
    console.error('Error fetching freelancers:', error);
  }

  // Map Convex camelCase to the snake_case shapes the JSX expects
  const serializedFreelancers = rawFreelancers.map((f) => ({
    id: f._id,
    user_id: f.userId,
    display_name: f.displayName ?? 'Unknown',
    tagline: f.tagline ?? null,
    bio: f.bio ?? null,
    avatar_url: f.avatarUrl ?? null,
    hourly_rate: f.hourlyRate ?? null,
    work_type: f.workType ?? 'remote',
    location_city: f.locationCity ?? null,
    location_country: f.locationCountry ?? null,
    skills: Array.isArray(f.skills) ? f.skills : [],
    languages: Array.isArray(f.languages) ? f.languages : [],
    is_verified: Boolean(f.isVerified),
    rating_average: Number(f.ratingAverage ?? 0),
    rating_count: Number(f.ratingCount ?? 0),
    total_orders: Number(f.totalOrders ?? 0),
    completion_rate: Number(f.completionRate ?? 0),
    response_time_hours: f.responseTimeHours ?? null,
    status: f.status,
    created_at: String(f.createdAt),
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 py-12 sm:py-16 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FreelancerSearch
            freelancers={serializedFreelancers}
            searchPlaceholder={t('searchPlaceholder')}
            noFreelancersText={t('noFreelancers')}
          />
        </div>
      </section>
    </div>
  );
}
