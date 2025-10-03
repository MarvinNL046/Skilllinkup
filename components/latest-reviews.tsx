import Link from "next/link";
import Image from "next/image";
import type { Post } from "../lib/queries";

interface LatestReviewsProps {
  posts: Post[];
}

export function LatestReviews({ posts }: LatestReviewsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Latest Reviews & Guides
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Stay updated with our newest platform reviews
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post) => (
            <article key={post.id} className="group">
              <Link href={`/post/${post.slug}`} className="block">
                {/* Image */}
                {post.feature_img && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-3">
                    <Image
                      src={post.feature_img}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Content */}
                <div>
                  {/* Category & Read Time */}
                  <div className="mb-2 flex items-center justify-between text-xs">
                    {post.category_name && (
                      <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                        {post.category_name}
                      </span>
                    )}
                    {post.read_time && (
                      <span className="text-gray-500">
                        {post.read_time} min
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {post.published_at && (
                      <time dateTime={post.published_at}>
                        {new Date(post.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    )}
                    {post.views && (
                      <>
                        <span>·</span>
                        <span>{post.views} views</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-8 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Browse All Reviews
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
