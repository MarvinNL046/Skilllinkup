import { getTranslations } from 'next-intl/server';
import { searchFreelancers } from '@/lib/marketplace-queries';
import { FreelancerCard } from '@/components/marketplace/FreelancerCard';
import { FreelancerSearch } from '@/components/marketplace/FreelancerSearch';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface FreelancersPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FreelancersPage({ params }: FreelancersPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'freelancers' });

  let freelancers: Awaited<ReturnType<typeof searchFreelancers>> = [];

  try {
    freelancers = await searchFreelancers(50, 0, locale);
  } catch (error) {
    console.error('Error fetching freelancers:', error);
  }

  // Serialize to avoid Date object issues
  const serializedFreelancers = freelancers.map((f) => ({
    id: f.id,
    user_id: f.user_id,
    display_name: f.display_name,
    tagline: f.tagline,
    bio: f.bio,
    avatar_url: f.avatar_url,
    hourly_rate: f.hourly_rate,
    work_type: f.work_type,
    location_city: f.location_city,
    location_country: f.location_country,
    skills: Array.isArray(f.skills) ? f.skills : [],
    languages: Array.isArray(f.languages) ? f.languages : [],
    is_verified: f.is_verified,
    rating_average: Number(f.rating_average) || 0,
    rating_count: Number(f.rating_count) || 0,
    total_orders: Number(f.total_orders) || 0,
    completion_rate: Number(f.completion_rate) || 0,
    response_time_hours: f.response_time_hours,
    status: f.status,
    created_at: typeof f.created_at === 'string' ? f.created_at : String(f.created_at),
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
