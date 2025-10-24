import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPlatforms } from '@/lib/queries';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Platform Comparisons | SkillLinkup',
  description: 'Compare the best freelance platforms and find the perfect platform for your skills.',
};

export default async function ComparisonsPage() {
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
                Compare Freelance Platforms
              </h1>
              <p className="text-xl text-text-secondary">
                Find the perfect platform for your skills. Compare fees, specializations, and reviews.
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
                    Platform
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Commission
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Reviews
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Specialization
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {platforms.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      No platforms available for comparison yet.
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
                          {platform.review_count || 0} reviews
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
                            <span className="text-sm text-gray-400 dark:text-gray-500">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/platforms/${platform.slug}`}
                            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                          >
                            View
                          </Link>
                          {(platform.affiliate_link || platform.website_url) && (
                            <a
                              href={platform.affiliate_link || platform.website_url}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                            >
                              Visit →
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
                Total Platforms
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {platforms.length}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Average Commission
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
                Average Rating
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
            Not sure which platform is right for you?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Read our comprehensive reviews and platform analyses to find the perfect platform for your skills.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/platforms"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
            >
              View All Platforms
            </Link>
            <Link
              href="/reviews"
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Read Reviews
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
