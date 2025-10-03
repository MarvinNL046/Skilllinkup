import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPlatforms } from '@/lib/queries';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Platform Vergelijkingen | SkillLinkup',
  description: 'Vergelijk de beste freelance platforms en vind het perfecte platform voor jouw vaardigheden.',
};

export default async function ComparisonsPage() {
  const platforms = await getPublishedPlatforms(100);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                Vergelijk Freelance Platforms
              </h1>
              <p className="text-xl text-text-secondary">
                Vind het perfecte platform voor jouw vaardigheden. Vergelijk fees, specialisaties en reviews.
              </p>
            </div>
          </div>
        </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Platform
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Commissie
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Reviews
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Specialisatie
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    Actie
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {platforms.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Nog geen platforms beschikbaar voor vergelijking.
                    </td>
                  </tr>
                ) : (
                  platforms.map((platform: any) => (
                    <tr key={platform.id} className="hover:bg-gray-50 transition-colors">
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
                            <div className="font-semibold text-gray-900">{platform.name}</div>
                            <div className="text-sm text-gray-500">{platform.tagline}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {platform.commission_rate}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <span className="text-yellow-400">★</span>
                            <span className="ml-1 font-semibold text-gray-900">
                              {Number(platform.rating).toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {platform.review_count || 0} reviews
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {platform.categories && platform.categories.length > 0 ? (
                            platform.categories.slice(0, 2).map((cat: string, idx: number) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {cat}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/platforms/${platform.slug}`}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            Bekijk
                          </Link>
                          {platform.website_url && (
                            <a
                              href={platform.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                            >
                              Bezoek →
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
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Totaal Platforms
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {platforms.length}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Gemiddelde Commissie
              </div>
              <div className="text-3xl font-bold text-green-600">
                {(
                  platforms.reduce((sum: number, p: any) => sum + Number(p.commission_rate || 0), 0) /
                  platforms.length
                ).toFixed(1)}
                %
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-sm font-medium text-gray-500 mb-2">
                Gemiddelde Rating
              </div>
              <div className="text-3xl font-bold text-yellow-600">
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
            Weet je nog niet welk platform bij je past?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Lees onze uitgebreide reviews en platform analyses om het perfecte platform voor jouw vaardigheden te vinden.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/platforms"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
            >
              Bekijk Alle Platforms
            </Link>
            <Link
              href="/reviews"
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Lees Reviews
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
