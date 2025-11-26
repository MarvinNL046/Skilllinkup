import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ReviewAvatar } from "@/components/ReviewAvatar";
import { getApprovedReviews } from "@/lib/queries";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'reviewsPage.metadata' });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/reviews`;

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/reviews-og.png`, width: 1200, height: 630, alt: t('ogImageAlt') }],
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: [`${siteUrl}/images/og/reviews-og.png`],
      creator: '@SkillLinkup',
      site: '@SkillLinkup',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'en': `${siteUrl}/en/reviews`,
        'nl': `${siteUrl}/nl/reviews`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ReviewsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'reviewsPage' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

  let reviews: Awaited<ReturnType<typeof getApprovedReviews>> = [];

  try {
    reviews = await getApprovedReviews(50, 0);
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + Number(r.overall_rating), 0) / reviews.length
    : 0;
  const verifiedCount = reviews.filter(r => r.verified).length;

  // Structured data for SEO
  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: locale === 'nl' ? 'Freelance Platform Reviews' : 'Freelance Platform Reviews',
    description: locale === 'nl'
      ? 'Lees authentieke reviews van freelancers over hun ervaringen op verschillende freelance platforms.'
      : 'Read authentic reviews from freelancers about their experiences on various freelance platforms.',
    url: `${siteUrl}/${locale}/reviews`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: reviews.slice(0, 10).map((review, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: review.user_name,
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: Number(review.overall_rating),
            bestRating: 5,
            worstRating: 1,
          },
          reviewBody: review.content,
          itemReviewed: {
            '@type': 'Product',
            name: review.platform_name || 'Freelance Platform',
          },
        },
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'nl' ? 'Reviews' : 'Reviews',
        item: `${siteUrl}/${locale}/reviews`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-gray-50 dark:from-gray-900 to-white dark:to-slate-800 py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white sm:text-5xl mb-4">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {t('hero.descriptionTemplate', { count: totalReviews })}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-slate-700">
                  <div className="text-3xl font-heading font-bold text-primary">
                    {totalReviews}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('stats.totalReviews')}</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-slate-700">
                  <div className="text-3xl font-heading font-bold text-accent flex items-center justify-center gap-1">
                    <span className="text-yellow-400">★</span>
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('stats.avgRating')}</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-slate-700">
                  <div className="text-3xl font-heading font-bold text-secondary">
                    {verifiedCount}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('stats.verified')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-12 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                  {t('emptyState.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('emptyState.description')}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all p-6"
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <ReviewAvatar
                          userAvatar={review.user_avatar}
                          userName={review.user_name}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-heading font-semibold text-gray-900 dark:text-white">
                              {review.user_name}
                            </h3>
                            {review.verified && (
                              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-200">
                                ✓
                              </span>
                            )}
                          </div>
                          {review.user_role && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">{review.user_role}</p>
                          )}
                        </div>
                      </div>
                      {/* Rating */}
                      <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-heading font-semibold text-gray-900 dark:text-white">
                          {Number(review.overall_rating).toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Platform Badge */}
                    {review.platform_name && (
                      <Link
                        href={`/${locale}/platforms/${review.platform_slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent text-sm font-medium mb-3 hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
                      >
                        <span>🏢</span>
                        {review.platform_name}
                      </Link>
                    )}

                    {/* Review Title */}
                    <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-2 text-lg">
                      {review.title}
                    </h4>

                    {/* Review Content */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {review.content}
                    </p>

                    {/* Pros and Cons */}
                    {(review.pros.length > 0 || review.cons.length > 0) && (
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {review.pros.length > 0 && (
                          <div>
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-green-500">✓</span>
                              <span className="text-xs font-heading font-semibold text-gray-700 dark:text-gray-300 uppercase">
                                {t('reviewCard.pros')}
                              </span>
                            </div>
                            <ul className="space-y-1">
                              {review.pros.slice(0, 2).map((pro, index) => (
                                <li
                                  key={index}
                                  className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1"
                                >
                                  • {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {review.cons.length > 0 && (
                          <div>
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-red-500">✗</span>
                              <span className="text-xs font-heading font-semibold text-gray-700 dark:text-gray-300 uppercase">
                                {t('reviewCard.cons')}
                              </span>
                            </div>
                            <ul className="space-y-1">
                              {review.cons.slice(0, 2).map((con, index) => (
                                <li
                                  key={index}
                                  className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1"
                                >
                                  • {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-slate-700 pt-3">
                      <div className="flex items-center gap-4">
                        {review.years_experience && (
                          <span>{review.years_experience}{t('reviewCard.yearsExperience')}</span>
                        )}
                        {review.earnings_range && (
                          <span>{review.earnings_range}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span>👍</span>
                        <span>{review.helpful_count}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                {t('cta.heading')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('cta.description')}
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-heading font-semibold hover:bg-primary-dark transition-colors shadow-md"
              >
                {t('cta.browseButton')}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
