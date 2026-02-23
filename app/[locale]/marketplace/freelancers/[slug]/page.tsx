import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Star, MapPin, Clock, CheckCircle, Globe, Briefcase } from 'lucide-react';
import { getFreelancerProfile, getGigsByFreelancer, type FreelancerProfile } from '@/lib/marketplace-queries';
import { GigCard } from '@/components/marketplace/GigCard';
import { safeImage, safeText, safeArray, safeNumber } from '@/lib/safe';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function FreelancerProfilePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'freelancers' });

  // slug is the user_id
  let profileOrNull: FreelancerProfile | null = null;
  try {
    profileOrNull = await getFreelancerProfile(slug, locale);
  } catch (error) {
    console.error('Error fetching freelancer profile:', error);
  }

  if (!profileOrNull) {
    notFound();
  }

  const profile = profileOrNull as FreelancerProfile;

  // Fetch gigs by this freelancer
  let gigs: Awaited<ReturnType<typeof getGigsByFreelancer>> = [];
  try {
    gigs = await getGigsByFreelancer(profile.id, locale);
  } catch (error) {
    console.error('Error fetching freelancer gigs:', error);
  }

  // Safe data extraction
  const displayName = safeText(profile.display_name, 'Unknown');
  const tagline = safeText(profile.tagline, '');
  const bio = safeText(profile.bio, '');
  const avatarUrl = safeImage(profile.avatar_url, '/images/placeholder-avatar.webp');
  const skills = safeArray<string>(profile.skills);
  const languages = safeArray<string>(profile.languages);
  const rating = safeNumber(profile.rating_average, 0);
  const ratingCount = safeNumber(profile.rating_count, 0);
  const totalOrders = safeNumber(profile.total_orders, 0);
  const completionRate = safeNumber(profile.completion_rate, 0);
  const responseTimeHours = profile.response_time_hours
    ? safeNumber(profile.response_time_hours, 0)
    : null;
  const hourlyRate = profile.hourly_rate ? safeNumber(profile.hourly_rate, 0) : null;
  const locationCity = safeText(profile.location_city, '');
  const locationCountry = safeText(profile.location_country, '');
  const workType = safeText(profile.work_type, 'remote');
  const showLocation =
    (workType === 'local' || workType === 'hybrid') && (locationCity || locationCountry);
  const locationText = [locationCity, locationCountry].filter(Boolean).join(', ');

  // Member since
  const memberSince = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US', {
        year: 'numeric',
        month: 'long',
      })
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ============================================================
              LEFT SIDEBAR
          ============================================================ */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
              {/* Avatar Section */}
              <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-gray-100 dark:border-gray-700">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 ring-4 ring-white dark:ring-gray-800">
                    <Image
                      src={avatarUrl}
                      alt={displayName}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {profile.is_verified && (
                    <div className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-1 ring-2 ring-white dark:ring-gray-800">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>

                <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                  {displayName}
                </h1>

                {profile.is_verified && (
                  <span className="mt-1 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                    {t('verified')}
                  </span>
                )}

                {tagline && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                    {tagline}
                  </p>
                )}

                {/* Star Rating */}
                {rating > 0 && (
                  <div className="flex items-center gap-1.5 mt-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.round(rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({ratingCount})
                    </span>
                  </div>
                )}

                {/* Location */}
                {showLocation && (
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{locationText}</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 dark:divide-gray-700">
                {/* Hourly Rate */}
                {hourlyRate !== null && hourlyRate > 0 && (
                  <div className="p-4 text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      ${hourlyRate}
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                        {t('perHour')}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {t('hourlyRate')}
                    </div>
                  </div>
                )}

                {/* Completion Rate */}
                {completionRate > 0 && (
                  <div className="p-4 text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {completionRate}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {t('completionRate')}
                    </div>
                  </div>
                )}

                {/* Orders Completed */}
                {totalOrders > 0 && (
                  <div className="p-4 text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {totalOrders}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {t('ordersCompleted')}
                    </div>
                  </div>
                )}

                {/* Response Time */}
                {responseTimeHours !== null && (
                  <div className="p-4 text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {responseTimeHours}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {t('responseTime')} ({t('hours')})
                    </div>
                  </div>
                )}

                {/* Member Since */}
                {memberSince && (
                  <div className="p-4 text-center col-span-2">
                    <div className="flex items-center justify-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>
                        {t('memberSince')} {memberSince}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Button */}
              <div className="p-4 pt-0">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 bg-[#ef2b70] hover:bg-[#d4235f] text-white rounded-xl font-medium text-sm transition-colors"
                >
                  {t('contactFreelancer')}
                </button>
              </div>

              {/* Languages */}
              {languages.length > 0 && (
                <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('languages')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {languages.map((lang) => (
                      <span
                        key={lang}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* ============================================================
              RIGHT CONTENT
          ============================================================ */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* About Me */}
            {bio && (
              <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span>{t('aboutMe')}</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {bio}
                </p>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <span>{t('skills')}</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm bg-[#ef2b70]/10 text-[#ef2b70] dark:bg-[#ef2b70]/20 px-3 py-1 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* My Services / Gigs */}
            {gigs.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span>{t('myServices')}</span>
                  <span className="text-sm text-gray-400 font-normal">({gigs.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {gigs.map((gig) => (
                    <GigCard
                      key={gig.id}
                      id={gig.id}
                      slug={gig.slug}
                      title={gig.title}
                      description={gig.description}
                      images={Array.isArray(gig.images) ? gig.images : []}
                      freelancer_name={gig.freelancer_name}
                      freelancer_avatar={gig.freelancer_avatar}
                      freelancer_verified={gig.freelancer_verified}
                      rating_average={Number(gig.rating_average) || 0}
                      rating_count={Number(gig.rating_count) || 0}
                      order_count={Number(gig.order_count) || 0}
                      price_from={Number(gig.price_from) || 0}
                      currency={gig.currency}
                      work_type={gig.work_type}
                      location_city={gig.location_city}
                      location_country={gig.location_country}
                      category_name={gig.category_name}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Empty state if no gigs and no bio */}
            {gigs.length === 0 && !bio && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-10 text-center shadow-sm">
                <p className="text-gray-400 dark:text-gray-500">{t('noFreelancers')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
