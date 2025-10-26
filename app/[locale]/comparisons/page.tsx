import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getPublishedPlatforms } from '@/lib/queries';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'comparisonsPage.metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ComparisonsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'comparisonsPage' });

  const platforms = await getPublishedPlatforms(100);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-900 py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-text-secondary">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 py-12 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {t('table.headers.platform')}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {t('table.headers.commission')}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {t('table.headers.rating')}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {t('table.headers.reviews')}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {t('table.headers.specialization')}
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {t('table.headers.action')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {platforms.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      {t('table.emptyState')}
                    </td>
                  </tr>
                ) : (
                  platforms.map((platform: any) => (
                    <tr key={platform.id} className="hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {platform.logo_url && (
                            <img
                              src={platform.logo_url}
                              alt={platform.name}
                              className="w-10 h-10 rounded object-contain"
                            />
                          )}
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{platform.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{platform.tagline}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          {platform.commission_rate}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <span className="text-yellow-400">★</span>
                            <span className="ml-1 font-semibold text-gray-900 dark:text-white">
                              {Number(platform.rating).toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {platform.review_count || 0} {t('table.reviewsLabel')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {platform.category ? (
                            <span
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                            >
                              {platform.category}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400 dark:text-gray-500">{t('table.emptyCategory')}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/${locale}/platforms/${platform.slug}`}
                            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                          >
                            {t('table.viewButton')}
                          </Link>
                          {(platform.affiliate_link || platform.website_url) && (
                            <a
                              href={platform.affiliate_link || platform.website_url}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-md"
                            >
                              {t('table.visitButton')}
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Section */}
        {platforms.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {t('stats.totalPlatforms')}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {platforms.length}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {t('stats.averageCommission')}
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {(
                  platforms.reduce((sum: number, p: any) => sum + Number(p.commission_rate || 0), 0) /
                  platforms.length
                ).toFixed(1)}
                %
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {t('stats.averageRating')}
              </div>
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {(
                  platforms.reduce((sum: number, p: any) => sum + Number(p.rating || 0), 0) /
                  platforms.length
                ).toFixed(1)}
                <span className="text-lg ml-1">★</span>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-primary rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            {t('cta.heading')}
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href={`/${locale}/platforms`}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('cta.viewAllButton')}
            </Link>
            <Link
              href={`/${locale}/reviews`}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors shadow-md"
            >
              {t('cta.readReviewsButton')}
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
