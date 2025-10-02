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
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Top Rated Platforms
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our highest-rated freelance marketplaces based on features, fees, and user experience
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.slug}`}
              className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-lg"
            >
              {/* Image */}
              {post.feature_img && (
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.feature_img}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {/* Featured Badge */}
                  <div className="absolute right-3 top-3">
                    <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      ★ Featured
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                {post.category_name && (
                  <div className="mb-3">
                    <span className="text-sm font-medium text-primary">
                      {post.category_name}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    {post.author_name && (
                      <span>By {post.author_name}</span>
                    )}
                  </div>
                  {post.read_time && (
                    <span>{post.read_time} min read</span>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  Read Review
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/platforms"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-all"
          >
            View All Platform Reviews
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
