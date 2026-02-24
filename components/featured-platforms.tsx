'use client';

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from 'next-intl';
interface Post {
 id: string;
 title: string;
 slug: string;
 excerpt: string | null;
 feature_img: string | null;
 category_name: string | null;
 published_at: Date | null;
 views: number;
 read_time: number | null;
 tags?: string[];
}

interface FeaturedPlatformsProps {
 posts: Post[];
}

export function FeaturedPlatforms({ posts }: FeaturedPlatformsProps) {
 const locale = useLocale();
 const t = useTranslations('homepage.featuredPlatforms');
 const tc = useTranslations('common');

 if (!posts || posts.length === 0) {
 return null;
 }

 return (
 <section className="py-16 bg-background-light dark:bg-gray-900">
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

 {/* Featured Posts Grid */}
 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
 {posts.slice(0, 3).map((post) =>(
 <Link
 key={post.id}
 href={`/${locale}/post/${post.slug}`}
 className="group relative overflow-hidden rounded-lg border border-background-gray dark:border-gray-700 bg-white dark:bg-gray-800 transition-all hover:shadow-xl hover:border-accent"
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
 <div className="absolute right-3 top-3">
 <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-heading font-semibold text-white shadow-lg">
 ★ {t('featuredBadge')}
 </span>
 </div>
 </div>
 )}

 {/* Content */}
 <div className="p-5">
 {/* Category */}
 {post.category_name && (
 <div className="mb-2">
 <span className="text-xs font-heading font-semibold text-accent uppercase tracking-wide">
 {post.category_name}
 </span>
 </div>
 )}

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
 <div className="flex items-center justify-between text-xs text-text-muted dark:text-gray-400">
 {post.read_time && (
 <span>{post.read_time} {tc('minRead')}</span>
 )}
 {post.views && (
 <span>{post.views} {tc('views')}</span>
 )}
 </div>
 </div>
 </Link>
 ))}
 </div>

 {/* View All Link */}
 <div className="mt-10 text-center">
 <Link
 href={`/${locale}/blog`}
 className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary-dark px-6 py-3 text-base font-heading font-semibold text-white transition-all shadow-lg hover:shadow-xl"
 >
 {t('viewAllPosts')}
 <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
 </svg>
 </Link>
 </div>
 </div>
 </section>
 );
}
