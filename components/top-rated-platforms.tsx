import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';

interface Platform {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  rating: number;
  category: string;
  fees: string | null;
  difficulty: string;
}

interface TopRatedPlatformsProps {
  platforms: Platform[];
}

// Helper function to strip HTML tags from text
function stripHtml(html: string | null): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

export function TopRatedPlatforms({ platforms }: TopRatedPlatformsProps) {
  // Show only first 6 platforms
  const displayPlatforms = platforms.slice(0, 6);

  if (displayPlatforms.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Top Rated Platforms
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our highest-rated freelance marketplaces based on user reviews and ratings
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayPlatforms.map((platform) => (
            <Link
              key={platform.id}
              href={`/platforms/${platform.slug}`}
              className="group block"
            >
              <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-200 dark:border-gray-700">
                {/* Platform Screenshot/Logo */}
                <div className="relative w-full bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 overflow-hidden">
                  {platform.logo_url ? (
                    <Image
                      src={platform.logo_url}
                      alt={platform.name}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-48 flex items-center justify-center">
                      <div className="text-6xl font-bold text-gray-300 dark:text-gray-600">
                        {platform.name.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Platform Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Platform Name */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {platform.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        {Number(platform.rating).toFixed(1)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">• {platform.category}</span>
                  </div>

                  {/* Description */}
                  {platform.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                      {stripHtml(platform.description)}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">
                        {platform.difficulty}
                      </span>
                    </div>
                    {platform.fees && (
                      <span className="text-xs">{platform.fees}</span>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/platforms"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            View All Platforms
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
