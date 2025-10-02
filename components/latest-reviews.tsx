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
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Latest Reviews & Guides
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay updated with our newest platform reviews and freelancing tips
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
            >
              <Link href={`/post/${post.slug}`}>
                {/* Image */}
                {post.feature_img && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.feature_img}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Category & Read Time */}
                  <div className="mb-3 flex items-center justify-between text-sm">
                    {post.category_name && (
                      <span className="font-medium text-primary">
                        {post.category_name}
                      </span>
                    )}
                    {post.read_time && (
                      <span className="text-muted-foreground">
                        {post.read_time} min read
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Author & Date */}
                  <div className="flex items-center space-x-3">
                    {post.author_avatar && (
                      <div className="relative h-8 w-8 rounded-full overflow-hidden">
                        <Image
                          src={post.author_avatar}
                          alt={post.author_name || "Author"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 text-sm">
                      {post.author_name && (
                        <div className="font-medium">{post.author_name}</div>
                      )}
                      {post.published_at && (
                        <div className="text-muted-foreground">
                          {new Date(post.published_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-all"
          >
            Browse All Reviews
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
