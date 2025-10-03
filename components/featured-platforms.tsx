import Link from "next/link";
import Image from "next/image";
import type { Post } from "../lib/queries";

interface FeaturedPlatformsProps {
  posts: Post[];
}

export function FeaturedPlatforms({ posts }: FeaturedPlatformsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Top Rated Platforms
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Our highest-rated freelance marketplaces
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.slug}`}
              className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all hover:shadow-lg hover:border-blue-500"
            >
              {/* Image */}
              {post.feature_img && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.feature_img}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {/* Featured Badge */}
                  <div className="absolute right-2 top-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                      ★ Featured
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                {/* Category */}
                {post.category_name && (
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                      {post.category_name}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                  {post.read_time && (
                    <span>{post.read_time} min read</span>
                  )}
                  {post.views && (
                    <span>{post.views} views</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-8 text-center">
          <Link
            href="/platforms"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            View All Reviews
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
