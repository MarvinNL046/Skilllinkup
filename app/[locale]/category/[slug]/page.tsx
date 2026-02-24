import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

export const dynamic = 'force-dynamic';

interface PageProps {
 params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { slug, locale } = await params;
 const raw = await fetchQuery(api.categories.getBySlug, { slug, locale });
 const t = await getTranslations({ locale, namespace: 'categoryPage' });

 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/category/${slug}`;

 if (!raw) {
 return {
 title: t('notFound'),
 };
 }

 const postCount = (raw as any).postCount ?? 0;
 const title = `${raw.name} - Freelance Artikelen | SkillLinkup`;
 const description = raw.description || (locale === 'nl'
 ? `Bekijk alle ${postCount} artikelen in de categorie ${raw.name}. Tips en guides voor freelancers.`
 : `Browse all ${postCount} articles in the ${raw.name} category. Tips and guides for freelancers.`);

 return {
 title,
 description,
 keywords: `${raw.name}, freelance ${raw.name.toLowerCase()}, ${locale === 'nl' ? 'freelance tips, zzp artikelen' : 'freelance tips, freelancer articles'}`,
 openGraph: {
 title,
 description,
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/blog-og.png`, width: 1200, height: 630, alt: `${raw.name} - SkillLinkup` }],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'website',
 },
 twitter: {
 card: 'summary_large_image',
 title,
 description,
 images: [`${siteUrl}/images/og/blog-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/category/${slug}`,
 'nl': `${siteUrl}/nl/category/${slug}`,
 },
 },
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 'max-video-preview': -1,
 'max-image-preview': 'large',
 'max-snippet': -1,
 },
 },
 };
}

export default async function CategoryPage({ params }: PageProps) {
 const { slug, locale } = await params;

 // Fetch category and posts
 const rawCategory = await fetchQuery(api.categories.getBySlug, { slug, locale });

 if (!rawCategory) {
 notFound();
 }

 const rawPosts = await fetchQuery(api.posts.getByCategory, { categorySlug: slug, locale, limit: 50 });
 const t = await getTranslations({ locale, namespace: 'categoryPage' });

 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 const category = {
   name: rawCategory.name,
   description: rawCategory.description ?? null,
   color: (rawCategory as any).color ?? null,
   post_count: (rawCategory as any).postCount ?? 0,
 };

 const posts = rawPosts.map((post) => ({
   id: post._id,
   title: post.title,
   slug: post.slug,
   excerpt: post.excerpt ?? null,
   feature_img: post.featureImg ?? null,
   read_time: post.readTime ?? null,
   views: post.views ?? null,
   published_at: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
   category_name: post.category?.name ?? null,
   created_at: post.createdAt,
 }));

 // Structured data for SEO
 const categorySchema = {
 '@context': 'https://schema.org',
 '@type': 'CollectionPage',
 name: category.name,
 description: category.description || `Articles in the ${category.name} category`,
 url: `${siteUrl}/${locale}/category/${slug}`,
 mainEntity: {
 '@type': 'ItemList',
 numberOfItems: posts.length,
 itemListElement: posts.slice(0, 10).map((post: any, index: number) =>({
 '@type': 'ListItem',
 position: index + 1,
 item: {
 '@type': 'BlogPosting',
 headline: post.title,
 description: post.excerpt,
 url: `${siteUrl}/${locale}/post/${post.slug}`,
 datePublished: post.published_at ? new Date(post.published_at).toISOString() : undefined,
 image: post.feature_img ? `${siteUrl}${post.feature_img}` : undefined,
 },
 })),
 },
 };

 const breadcrumbSchema = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 {
 '@type': 'ListItem',
 position: 1,
 name: 'Home',
 item: `${siteUrl}/${locale}`,
 },
 {
 '@type': 'ListItem',
 position: 2,
 name: 'Blog',
 item: `${siteUrl}/${locale}/blog`,
 },
 {
 '@type': 'ListItem',
 position: 3,
 name: category.name,
 item: `${siteUrl}/${locale}/category/${slug}`,
 },
 ],
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
 />
 <Header />
 <main className="flex-1">
 {/* Page Header */}
 <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 sm:py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center max-w-3xl mx-auto">
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: category.color || '#9333ea' }}>
 <span className="text-3xl text-white font-bold">
 {category.name.charAt(0)}
 </span>
 </div>

 <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white sm:text-5xl mb-4">
 {category.name}
 </h1>

 {category.description && (
 <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
 {category.description}
 </p>
 )}

 <p className="text-sm text-gray-500 dark:text-gray-400">
 {category.post_count} {category.post_count === 1 ? t('postCount.singular') : t('postCount.plural')}
 </p>
 </div>
 </div>
 </section>

 {/* Posts Grid */}
 <section className="py-12 bg-white dark:bg-gray-800">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 {posts.length === 0 ? (
 <div className="text-center py-12">
 <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
 {t('emptyState.message')}
 </p>
 <Link
 href={`/${locale}/blog`}
 className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-8 py-3 text-base font-heading font-semibold text-white transition-colors shadow-lg"
 >
 {t('emptyState.button')}
 </Link>
 </div>
 ) : (
 <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
 {posts.map((post) =>(
 <article key={post.id} className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden transition-all hover:border-accent hover:shadow-xl">
 <Link href={`/${locale}/post/${post.slug}`} className="block">
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
 </div>
 )}

 {/* Content */}
 <div className="p-6">
 {/* Category & Read Time */}
 <div className="mb-2 flex items-center justify-between text-xs">
 {post.category_name && (
 <span className="font-heading font-semibold text-accent uppercase tracking-wide">
 {post.category_name}
 </span>
 )}
 {post.read_time && (
 <span className="text-gray-500 dark:text-gray-400">
 {post.read_time} {t('minRead')}
 </span>
 )}
 </div>

 {/* Title */}
 <h2 className="mb-2 text-xl font-heading font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
 {post.title}
 </h2>

 {/* Excerpt */}
 {post.excerpt && (
 <p className="mb-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
 {post.excerpt}
 </p>
 )}

 {/* Meta */}
 <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
 {post.published_at && (
 <time dateTime={new Date(post.published_at).toISOString()}>
 {new Date(post.published_at).toLocaleDateString("en-US", {
 month: "short",
 day: "numeric",
 year: "numeric",
 })}
 </time>
 )}
 {post.views && (
 <>
 <span>·</span>
 <span>{post.views} {t('views')}</span>
 </>
 )}
 </div>
 </div>
 </Link>
 </article>
 ))}
 </div>
 )}
 </div>
 </section>
 </main>
 <Footer />
 </>
 );
}
