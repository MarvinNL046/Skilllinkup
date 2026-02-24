import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { getFreelancerProfile } from '@/lib/marketplace-queries';
import { ProfileForm } from '@/components/dashboard/ProfileForm';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SellerProfilePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('dashboard.seller');

  const user = await getCurrentUser();
  if (!user) {
    redirect('/handler/sign-in');
  }

  const profile = await getFreelancerProfile(user.id, locale);

  // Serialize profile to plain object (no Date objects)
  const serializedProfile = profile
    ? {
        id: profile.id,
        display_name: profile.display_name ?? '',
        tagline: profile.tagline ?? '',
        bio: profile.bio ?? '',
        hourly_rate: profile.hourly_rate ? String(profile.hourly_rate) : '',
        work_type: (profile.work_type as 'remote' | 'local' | 'hybrid') ?? 'remote',
        location_city: profile.location_city ?? '',
        location_country: profile.location_country ?? '',
        location_postcode: '',
        service_radius_km: '',
        skills: Array.isArray(profile.skills) ? profile.skills : [],
        languages: Array.isArray(profile.languages) ? profile.languages : [],
        website_url: '',
        linkedin_url: '',
      }
    : null;

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
          {t('profile')}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {profile ? t('profileComplete') : t('profileSetup')}
        </p>
      </div>

      <ProfileForm initialData={serializedProfile} />
    </div>
  );
}
