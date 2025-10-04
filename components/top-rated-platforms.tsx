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

export function TopRatedPlatforms({ platforms }: TopRatedPlatformsProps) {
  // Show only first 6 platforms
  const displayPlatforms = platforms.slice(0, 6);

  if (displayPlatforms.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Rated Platforms
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
              <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Platform Logo */}
                <div className="relative h-48 bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
                  {platform.logo_url ? (
                    <Image
                      src={platform.logo_url}
                      alt={platform.name}
                      width={200}
                      height={100}
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-6xl font-bold text-gray-300">
                      {platform.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Platform Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Platform Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {platform.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold text-gray-900">
                        {Number(platform.rating).toFixed(1)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">• {platform.category}</span>
                  </div>

                  {/* Description */}
                  {platform.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                      {platform.description}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-medium">
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
