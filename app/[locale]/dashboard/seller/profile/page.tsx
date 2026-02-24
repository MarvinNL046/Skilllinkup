import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { ProfileForm } from '@/components/dashboard/ProfileForm';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SellerProfilePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('dashboard.seller');

  const { getToken, userId: clerkId } = await auth();
  if (!clerkId) {
    redirect('/sign-in');
  }

  const token = await getToken({ template: 'convex' });

  // Fetch Convex user by Clerk ID
  const convexUser = await fetchQuery(
    api.users.getByClerkId,
    { clerkId },
    { token: token ?? undefined }
  );

  let profile: any = null;
  if (convexUser) {
    profile = await fetchQuery(
      api.marketplace.freelancers.getByUserId,
      { userId: convexUser._id },
      { token: token ?? undefined }
    );
  }

  // Serialize profile to plain object (no complex Convex types)
  const serializedProfile = profile
    ? {
        id: profile._id as string,
        display_name: profile.displayName ?? '',
        tagline: profile.tagline ?? '',
        bio: profile.bio ?? '',
        hourly_rate: profile.hourlyRate ? String(profile.hourlyRate) : '',
        work_type: (profile.workType as 'remote' | 'local' | 'hybrid') ?? 'remote',
        location_city: profile.locationCity ?? '',
        location_country: profile.locationCountry ?? '',
        location_postcode: profile.locationPostcode ?? '',
        service_radius_km: profile.serviceRadiusKm ? String(profile.serviceRadiusKm) : '',
        skills: Array.isArray(profile.skills) ? profile.skills : [],
        languages: Array.isArray(profile.languages) ? profile.languages : [],
        website_url: profile.websiteUrl ?? '',
        linkedin_url: profile.linkedinUrl ?? '',
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
