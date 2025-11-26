import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPlatformBySlug, getPublishedPlatforms, getReviewsByPlatform } from "@/lib/queries";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Newsletter } from "@/components/newsletter";
import { AffiliateButton } from "@/components/affiliate-button";
import { PlatformReviews } from "@/components/PlatformReviews";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface PlatformPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PlatformPageProps) {
  try {
    const { slug, locale } = await params;
    const platform = await getPlatformBySlug(slug, locale);

    if (!platform) {
      return {
        title: "Platform Not Found - SkillLinkup",
      };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
    const platformUrl = `${siteUrl}/${locale}/platforms/${platform.slug}`;
    const imageUrl = platform.logo_url?.startsWith('http')
      ? platform.logo_url
      : `${siteUrl}${platform.logo_url}`;

    // Get translations for metadata
    const t = await getTranslations({ locale, namespace: 'platformDetail' });

    // Extract plain text from HTML description for meta tags
    const plainDescription = platform.description
      ? platform.description.replace(/<[^>]*>/g, '').substring(0, 160)
      : t('metaDescription', { name: platform.name });

    const metaTitle = t('metaTitle', { name: platform.name });

    return {
      title: metaTitle,
      description: plainDescription,

      // Keywords
      keywords: `${platform.name}, ${platform.name} review, ${platform.name} fees, freelance platform, ${platform.category}, ${platform.difficulty}`,

      // Canonical URL with language alternates
      alternates: {
        canonical: platformUrl,
        languages: {
          'en': `${siteUrl}/en/platforms/${slug}`,
          'nl': `${siteUrl}/nl/platforms/${slug}`,
        },
      },

      // Open Graph (Facebook, LinkedIn, etc.)
      openGraph: {
        title: metaTitle,
        description: plainDescription,
        url: platformUrl,
        siteName: 'SkillLinkup',
        images: platform.logo_url ? [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${platform.name} logo`,
          }
        ] : [],
        locale: locale === 'nl' ? 'nl_NL' : 'en_US',
        type: 'website',
      },

      // Twitter Card
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: plainDescription,
        images: platform.logo_url ? [imageUrl] : [],
        creator: '@SkillLinkup',
        site: '@SkillLinkup',
      },

      // Robots
      robots: {
        index: platform.status === 'published',
        follow: platform.status === 'published',
        googleBot: {
          index: platform.status === 'published',
          follow: platform.status === 'published',
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    return {
      title: "Platform Not Found - SkillLinkup",
    };
  }
}

export default async function PlatformPage({ params }: PlatformPageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations('platformDetail');
  let platform;
  let relatedPlatforms: Awaited<ReturnType<typeof getPublishedPlatforms>> = [];
  let platformReviews: Awaited<ReturnType<typeof getReviewsByPlatform>> = [];

  try {
    platform = await getPlatformBySlug(slug, locale);

    if (!platform) {
      notFound();
    }

    // Get related platforms from same category
    const allPlatforms = await getPublishedPlatforms(50, locale);
    relatedPlatforms = allPlatforms
      .filter((p) => p.category === platform.category && p.id !== platform.id)
      .slice(0, 3);

    // Get reviews for this platform (filtered by locale)
    platformReviews = await getReviewsByPlatform(platform.id, 20, locale);
  } catch (error) {
    console.error('Error fetching platform:', error);
    notFound();
  }

  // Schema.org structured data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const platformUrl = `${siteUrl}/${locale}/platforms/${platform.slug}`;
  const imageUrl = platform.logo_url?.startsWith('http')
    ? platform.logo_url
    : `${siteUrl}${platform.logo_url}`;

  // Product/Service Schema with aggregateRating
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: platform.name,
    description: platform.description ? platform.description.replace(/<[^>]*>/g, '') : `${platform.name} freelance platform`,
    image: platform.logo_url ? imageUrl : undefined,
    brand: {
      '@type': 'Brand',
      name: platform.name,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      price: '0',
      description: platform.fees || 'Free to join',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: platform.rating,
      bestRating: '5',
      worstRating: '1',
      ratingCount: '1',
    },
    category: platform.category,
    url: platformUrl,
  };

  // BreadcrumbList Schema
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
        name: 'Platforms',
        item: `${siteUrl}/${locale}/platforms`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: platform.name,
        item: platformUrl,
      },
    ],
  };

  // Helper function for difficulty badge color with dark mode support
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Helper function to translate difficulty values
  const getDifficultyText = (difficulty: string) => {
    const key = `difficulty${difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()}`;
    return t(key as any);
  };

  return (
    <>
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />
      <main className="flex-1">
        {/* Platform Header */}
        <article>
          <header className="bg-gradient-to-b from-background-light to-white dark:from-gray-900 dark:to-gray-900 py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="mb-6">
                  <ol className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>
                      <Link href={`/${locale}`} className="hover:text-primary dark:hover:text-accent-light transition-colors">
                        {t('home')}
                      </Link>
                    </li>
                    <li>/</li>
                    <li>
                      <Link href={`/${locale}/platforms`} className="hover:text-primary dark:hover:text-accent-light transition-colors">
                        {t('platforms')}
                      </Link>
                    </li>
                    <li>/</li>
                    <li className="text-gray-900 dark:text-white font-medium line-clamp-1">
                      {platform.name}
                    </li>
                  </ol>
                </nav>

                {/* Category & Featured Badge */}
                <div className="mb-4 flex items-center gap-2">
                  <Link
                    href={`/${locale}/platforms?category=${platform.category.toLowerCase()}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent-light text-sm font-heading font-semibold uppercase tracking-wide hover:bg-accent/20 dark:hover:bg-accent/30 transition-colors"
                  >
                    {platform.category}
                  </Link>
                  {platform.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 text-sm font-heading font-semibold">
                      ★ {t('featured')}
                    </span>
                  )}
                </div>

                {/* Platform Name */}
                <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white sm:text-5xl mb-4 leading-tight">
                  {platform.name}
                </h1>

                {/* Quick Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${
                            star <= platform.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">{Number(platform.rating).toFixed(1)}</span>
                  </div>

                  {/* Difficulty */}
                  {platform.difficulty && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">{t('difficulty')}:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(platform.difficulty)}`}>
                        {getDifficultyText(platform.difficulty)}
                      </span>
                    </div>
                  )}

                  {/* Fees */}
                  {platform.fees && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">{t('fees')}:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{platform.fees}</span>
                    </div>
                  )}

                  {/* Website Link */}
                  {(platform.affiliate_link || platform.website_url) && (
                    <AffiliateButton
                      platformId={platform.id}
                      platformName={platform.name}
                      affiliateLink={platform.affiliate_link}
                      websiteUrl={platform.website_url}
                      variant="secondary"
                    >
                      {t('visitWebsite')}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </AffiliateButton>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {platform.logo_url && (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src={platform.logo_url}
                    alt={platform.name}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          )}

          {/* Platform Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-12 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                  {/* Description */}
                  {platform.description && (
                    <section id="description">
                      <div
                        className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: platform.description }}
                      />
                    </section>
                  )}

                  {/* Features Section */}
                  {platform.features && platform.features.length > 0 && (
                    <section id="features">
                      <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                        {t('keyFeatures')}
                      </h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {platform.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                          >
                            <svg className="w-5 h-5 text-primary dark:text-accent-light flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Pros & Cons Section */}
                  {((platform.pros && platform.pros.length > 0) || (platform.cons && platform.cons.length > 0)) && (
                    <section id="pros-cons">
                      <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                        {t('prosAndCons')}
                      </h2>
                      <div className="grid gap-6 sm:grid-cols-2">
                        {/* Pros */}
                        {platform.pros && platform.pros.length > 0 && (
                          <div className="bg-green-50 dark:bg-green-900/10 border-2 border-green-200 dark:border-green-800 rounded-lg p-6">
                            <h3 className="text-lg font-heading font-bold text-green-900 dark:text-green-400 mb-4 flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                              </svg>
                              {t('pros')}
                            </h3>
                            <ul className="space-y-3">
                              {platform.pros.map((pro, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-green-900 dark:text-green-300">{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Cons */}
                        {platform.cons && platform.cons.length > 0 && (
                          <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-800 rounded-lg p-6">
                            <h3 className="text-lg font-heading font-bold text-red-900 dark:text-red-400 mb-4 flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                              </svg>
                              {t('cons')}
                            </h3>
                            <ul className="space-y-3">
                              {platform.cons.map((con, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  <span className="text-red-900 dark:text-red-300">{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  {/* CTA Section */}
                  {(platform.affiliate_link || platform.website_url) && (
                    <section className="bg-gradient-to-r from-primary to-primary-dark dark:from-accent dark:to-accent-dark rounded-lg p-8 text-center text-white shadow-xl">
                      <h2 className="text-2xl font-heading font-bold mb-3 text-white">
                        {t('readyToGetStarted', { name: platform.name })}
                      </h2>
                      <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                        {t('joinThousands')}
                      </p>
                      <AffiliateButton
                        platformId={platform.id}
                        platformName={platform.name}
                        affiliateLink={platform.affiliate_link}
                        websiteUrl={platform.website_url}
                        variant="primary"
                      >
                        {t('visitPlatform')}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </AffiliateButton>
                      <p className="mt-4 text-xs text-white/60">
                        {platform.affiliate_link && '* Affiliate link'}
                      </p>
                    </section>
                  )}

                  {/* User Reviews Section */}
                  <PlatformReviews
                    platformId={platform.id}
                    platformName={platform.name}
                    locale={locale}
                    reviews={platformReviews.map(r => ({
                      id: r.id,
                      user_name: r.user_name,
                      user_avatar: r.user_avatar,
                      user_role: r.user_role,
                      title: r.title,
                      content: r.content,
                      overall_rating: Number(r.overall_rating),
                      ease_of_use_rating: Number(r.ease_of_use_rating),
                      support_rating: Number(r.support_rating),
                      value_rating: Number(r.value_rating),
                      pros: r.pros || [],
                      cons: r.cons || [],
                      project_type: r.project_type,
                      earnings_range: r.earnings_range,
                      years_experience: r.years_experience,
                      verified: r.verified,
                      helpful_count: r.helpful_count,
                      created_at: r.created_at ? r.created_at.toISOString() : new Date().toISOString(),
                    }))}
                  />
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                  <div className="sticky top-4 space-y-8">
                    {/* Quick Info Card */}
                    <div className="bg-primary/5 dark:bg-accent/10 border-2 border-primary/20 dark:border-accent/30 rounded-lg p-6">
                      <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-4">
                        {t('quickInfo')}
                      </h3>
                      <dl className="space-y-4 text-sm">
                        <div>
                          <dt className="text-gray-600 dark:text-gray-400 mb-1">{t('category')}</dt>
                          <dd className="font-semibold text-gray-900 dark:text-white">{platform.category}</dd>
                        </div>
                        {platform.fees && (
                          <div>
                            <dt className="text-gray-600 dark:text-gray-400 mb-1">{t('feeStructure')}</dt>
                            <dd className="font-semibold text-gray-900 dark:text-white">{platform.fees}</dd>
                          </div>
                        )}
                        <div>
                          <dt className="text-gray-600 dark:text-gray-400 mb-1">{t('difficultyLevel')}</dt>
                          <dd>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(platform.difficulty)}`}>
                              {getDifficultyText(platform.difficulty)}
                            </span>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-gray-600 dark:text-gray-400 mb-1">{t('rating')}</dt>
                          <dd className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{Number(platform.rating).toFixed(1)}</span>
                            <span className="text-gray-600 dark:text-gray-400">/ 5.0</span>
                          </dd>
                        </div>
                      </dl>
                      {(platform.affiliate_link || platform.website_url) && (
                        <div className="mt-6">
                          <AffiliateButton
                            platformId={platform.id}
                            platformName={platform.name}
                            affiliateLink={platform.affiliate_link}
                            websiteUrl={platform.website_url}
                            variant="sidebar"
                          >
                            {t('visitPlatform')}
                          </AffiliateButton>
                        </div>
                      )}
                    </div>

                    {/* Compare Platforms Link */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3">
                        {t('comparePlatforms')}
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        {t('notSure', { name: platform.name })}
                      </p>
                      <Link
                        href={`/${locale}/platforms`}
                        className="inline-flex items-center justify-center w-full rounded-lg bg-white dark:bg-gray-900 border-2 border-primary dark:border-accent text-primary dark:text-accent-light hover:bg-primary hover:text-white dark:hover:bg-accent dark:hover:text-white px-4 py-2.5 text-sm font-heading font-semibold transition-all"
                      >
                        {t('viewAllPlatforms')}
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </article>

        {/* Related Platforms */}
        {relatedPlatforms.length > 0 && (
          <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8">
                {t('similar', { category: platform.category })}
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPlatforms.map((relatedPlatform) => (
                  <article key={relatedPlatform.id} className="group bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200 dark:border-slate-700">
                    <Link href={`/${locale}/platforms/${relatedPlatform.slug}`} className="block">
                      <div className="flex items-start gap-4 mb-4">
                        {relatedPlatform.logo_url && (
                          <Image
                            src={relatedPlatform.logo_url}
                            alt={`${relatedPlatform.name} logo`}
                            width={48}
                            height={48}
                            className="rounded-lg shadow-sm object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-accent-light transition-colors mb-1">
                            {relatedPlatform.name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm">
                            <span className="text-yellow-400">★</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{Number(relatedPlatform.rating).toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      {relatedPlatform.description && (
                        <div
                          className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-3 prose prose-sm dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: relatedPlatform.description }}
                        />
                      )}
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2 py-1 rounded-full font-semibold ${getDifficultyColor(relatedPlatform.difficulty)}`}>
                          {getDifficultyText(relatedPlatform.difficulty)}
                        </span>
                        {relatedPlatform.fees && (
                          <span className="text-gray-600 dark:text-gray-400">{relatedPlatform.fees}</span>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
