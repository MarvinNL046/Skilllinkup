import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPlatformBySlug, getPublishedPlatforms } from "../../../lib/queries";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import { Newsletter } from "../../../components/newsletter";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface PlatformPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PlatformPageProps) {
  try {
    const { slug } = await params;
    const platform = await getPlatformBySlug(slug);

    if (!platform) {
      return {
        title: "Platform Not Found - SkillLinkup",
      };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
    const platformUrl = `${siteUrl}/platforms/${platform.slug}`;
    const imageUrl = platform.logo_url?.startsWith('http')
      ? platform.logo_url
      : `${siteUrl}${platform.logo_url}`;

    // Extract plain text from HTML description for meta tags
    const plainDescription = platform.description
      ? platform.description.replace(/<[^>]*>/g, '').substring(0, 160)
      : `Comprehensive review of ${platform.name} freelance platform. Rating: ${platform.rating}/5. ${platform.difficulty} to use. ${platform.fees || 'Learn about fees'}.`;

    const metaTitle = `${platform.name} Review 2025: Fees, Features & Pros/Cons - SkillLinkup`;

    return {
      title: metaTitle,
      description: plainDescription,

      // Keywords
      keywords: `${platform.name}, ${platform.name} review, ${platform.name} fees, freelance platform, ${platform.category}, ${platform.difficulty}`,

      // Canonical URL
      alternates: {
        canonical: platformUrl,
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
        locale: 'en_US',
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
  const { slug } = await params;
  let platform;
  let relatedPlatforms: Awaited<ReturnType<typeof getPublishedPlatforms>> = [];

  try {
    platform = await getPlatformBySlug(slug);

    if (!platform) {
      notFound();
    }

    // Get related platforms from same category
    const allPlatforms = await getPublishedPlatforms(50);
    relatedPlatforms = allPlatforms
      .filter((p) => p.category === platform.category && p.id !== platform.id)
      .slice(0, 3);
  } catch (error) {
    console.error('Error fetching platform:', error);
    notFound();
  }

  // Schema.org structured data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const platformUrl = `${siteUrl}/platforms/${platform.slug}`;
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
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Platforms',
        item: `${siteUrl}/platforms`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: platform.name,
        item: platformUrl,
      },
    ],
  };

  // Helper function for difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
          <header className="bg-gradient-to-b from-background-light to-white py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="mb-6">
                  <ol className="flex items-center gap-2 text-sm text-text-muted">
                    <li>
                      <Link href="/" className="hover:text-primary transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>/</li>
                    <li>
                      <Link href="/platforms" className="hover:text-primary transition-colors">
                        Platforms
                      </Link>
                    </li>
                    <li>/</li>
                    <li className="text-text-primary font-medium line-clamp-1">
                      {platform.name}
                    </li>
                  </ol>
                </nav>

                {/* Category & Featured Badge */}
                <div className="mb-4 flex items-center gap-2">
                  <Link
                    href={`/platforms?category=${platform.category.toLowerCase()}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-heading font-semibold uppercase tracking-wide hover:bg-accent/20 transition-colors"
                  >
                    {platform.category}
                  </Link>
                  {platform.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-sm font-heading font-semibold">
                      ★ Featured
                    </span>
                  )}
                </div>

                {/* Platform Name */}
                <h1 className="text-4xl font-heading font-bold text-text-primary sm:text-5xl mb-4 leading-tight">
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
                            star <= platform.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
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
                    <span className="font-semibold text-text-primary">{Number(platform.rating).toFixed(1)}</span>
                  </div>

                  {/* Difficulty */}
                  {platform.difficulty && (
                    <div className="flex items-center gap-2">
                      <span className="text-text-muted">Difficulty:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(platform.difficulty)}`}>
                        {platform.difficulty}
                      </span>
                    </div>
                  )}

                  {/* Fees */}
                  {platform.fees && (
                    <div className="flex items-center gap-2">
                      <span className="text-text-muted">Fees:</span>
                      <span className="font-semibold text-text-primary">{platform.fees}</span>
                    </div>
                  )}

                  {/* Website Link */}
                  {platform.website_url && (
                    <a
                      href={platform.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:text-primary-dark font-semibold transition-colors"
                    >
                      Visit Website
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
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
                        className="prose prose-lg max-w-none text-text-secondary leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: platform.description }}
                      />
                    </section>
                  )}

                  {/* Features Section */}
                  {platform.features && platform.features.length > 0 && (
                    <section id="features">
                      <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">
                        Key Features
                      </h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {platform.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-4 rounded-lg bg-background-light border border-background-gray"
                          >
                            <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-text-secondary">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Pros & Cons Section */}
                  {((platform.pros && platform.pros.length > 0) || (platform.cons && platform.cons.length > 0)) && (
                    <section id="pros-cons">
                      <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">
                        Pros & Cons
                      </h2>
                      <div className="grid gap-6 sm:grid-cols-2">
                        {/* Pros */}
                        {platform.pros && platform.pros.length > 0 && (
                          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                            <h3 className="text-lg font-heading font-bold text-green-900 mb-4 flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                              </svg>
                              Pros
                            </h3>
                            <ul className="space-y-3">
                              {platform.pros.map((pro, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-green-900">{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Cons */}
                        {platform.cons && platform.cons.length > 0 && (
                          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                            <h3 className="text-lg font-heading font-bold text-red-900 mb-4 flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                              </svg>
                              Cons
                            </h3>
                            <ul className="space-y-3">
                              {platform.cons.map((con, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  <span className="text-red-900">{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  {/* CTA Section */}
                  {platform.website_url && (
                    <section className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-8 text-center text-white shadow-xl">
                      <h2 className="text-2xl font-heading font-bold mb-3">
                        Ready to get started with {platform.name}?
                      </h2>
                      <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                        Join thousands of freelancers already using this platform to grow their business.
                      </p>
                      <a
                        href={platform.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-white hover:bg-gray-100 px-8 py-3 font-heading font-semibold text-primary transition-all shadow-lg"
                      >
                        Visit {platform.name}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </section>
                  )}
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                  <div className="sticky top-4 space-y-8">
                    {/* Quick Info Card */}
                    <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6">
                      <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
                        Quick Info
                      </h3>
                      <dl className="space-y-4 text-sm">
                        <div>
                          <dt className="text-text-muted mb-1">Category</dt>
                          <dd className="font-semibold text-text-primary">{platform.category}</dd>
                        </div>
                        {platform.fees && (
                          <div>
                            <dt className="text-text-muted mb-1">Fee Structure</dt>
                            <dd className="font-semibold text-text-primary">{platform.fees}</dd>
                          </div>
                        )}
                        <div>
                          <dt className="text-text-muted mb-1">Difficulty Level</dt>
                          <dd>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(platform.difficulty)}`}>
                              {platform.difficulty}
                            </span>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-text-muted mb-1">Rating</dt>
                          <dd className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="font-semibold text-text-primary">{Number(platform.rating).toFixed(1)}</span>
                            <span className="text-text-muted">/ 5.0</span>
                          </dd>
                        </div>
                      </dl>
                      {platform.website_url && (
                        <a
                          href={platform.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center justify-center w-full rounded-lg bg-primary hover:bg-primary-dark px-4 py-2.5 text-sm font-heading font-semibold text-white transition-all shadow-md"
                        >
                          Visit Platform
                        </a>
                      )}
                    </div>

                    {/* Compare Platforms Link */}
                    <div className="bg-background-light rounded-lg p-6">
                      <h3 className="text-lg font-heading font-bold text-text-primary mb-3">
                        Compare Platforms
                      </h3>
                      <p className="text-sm text-text-secondary mb-4">
                        Not sure if {platform.name} is right for you? Compare with other platforms.
                      </p>
                      <Link
                        href="/platforms"
                        className="inline-flex items-center justify-center w-full rounded-lg bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-4 py-2.5 text-sm font-heading font-semibold transition-all"
                      >
                        View All Platforms
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
          <section className="py-16 bg-background-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-8">
                Similar {platform.category} Platforms
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPlatforms.map((relatedPlatform) => (
                  <article key={relatedPlatform.id} className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6">
                    <Link href={`/platforms/${relatedPlatform.slug}`} className="block">
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
                          <h3 className="text-lg font-heading font-bold text-text-primary group-hover:text-primary transition-colors mb-1">
                            {relatedPlatform.name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm">
                            <span className="text-yellow-400">★</span>
                            <span className="font-semibold text-text-primary">{Number(relatedPlatform.rating).toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      {relatedPlatform.description && (
                        <div
                          className="text-sm text-text-secondary line-clamp-2 mb-3 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: relatedPlatform.description }}
                        />
                      )}
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2 py-1 rounded-full font-semibold ${getDifficultyColor(relatedPlatform.difficulty)}`}>
                          {relatedPlatform.difficulty}
                        </span>
                        {relatedPlatform.fees && (
                          <span className="text-text-muted">{relatedPlatform.fees}</span>
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
