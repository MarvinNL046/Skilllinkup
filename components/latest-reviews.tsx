'use client';

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';
import type { Post } from "../lib/queries";

interface LatestReviewsProps {
  posts: Post[];
}

export function LatestReviews({ posts }: LatestReviewsProps) {
  const locale = useLocale();
  const t = useTranslations('homepage.latestReviews');
  const tc = useTranslations('common');
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-heading font-bold text-text-primary dark:text-white sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-base text-text-secondary dark:text-gray-300">
            {t('description')}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post) => (
            <article key={post.id} className="group">
              <Link href={`/${locale}/post/${post.slug}`} className="block">
                {/* Image */}
                {post.feature_img && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4 shadow-md group-hover:shadow-lg transition-shadow">
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
                      <span className="font-heading font-semibold text-accent uppercase tracking-wide">
                        {post.category_name}
                      </span>
                    )}
                    {post.read_time && (
                      <span className="text-text-muted dark:text-gray-400">
                        {post.read_time} min
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg font-heading font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="mb-3 text-sm text-text-secondary dark:text-gray-300 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-2 text-xs text-text-muted dark:text-gray-400">
                    {post.author_name && (
                      <>
                        <span className="font-semibold text-text-primary dark:text-white">
                          {post.author_name}
                        </span>
                        <span>·</span>
                      </>
                    )}
                    {post.published_at && (
                      <time dateTime={new Date(post.published_at).toISOString()}>
                        {new Date(post.published_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    )}
                    {post.read_time && (
                      <>
                        <span>·</span>
                        <span>{post.read_time} {tc('minRead')}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/guides`}
            className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-dark px-6 py-3 text-base font-heading font-semibold text-white shadow-lg transition-all hover:shadow-xl"
          >
            {t('browseAllGuides')}
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
