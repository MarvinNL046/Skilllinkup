import Link from "next/link";
import Image from "next/image";
import { Metadata } from 'next';
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface BlogPageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata>{
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'blogPage.metadata' });

 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/blog`;

 return {
 title: t('title'),
 description: t('description'),
 keywords: t('keywords'),
 openGraph: {
 title: t('ogTitle'),
 description: t('ogDescription'),
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/blog-og.png`, width: 1200, height: 630, alt: t('ogImageAlt') }],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'website',
 },
 twitter: {
 card: 'summary_large_image',
 title: t('twitterTitle'),
 description: t('twitterDescription'),
 images: [`${siteUrl}/images/og/blog-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/blog`,
 'nl': `${siteUrl}/nl/blog`,
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

export default async function BlogPage({ params }: BlogPageProps) {
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'blogPage' });

 let posts: any[] = [];
 let categories: any[] = [];

 try {
 const postsResult = await fetchQuery(api.posts.list, { locale, limit: 12 });
 posts = postsResult.map((post: any) => ({
 id: post._id,
 title: post.title,
 slug: post.slug,
 excerpt: post.excerpt ?? '',
 feature_img: post.featureImg ?? null,
 published_at: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
 views: post.views ?? 0,
 read_time: post.readTime ?? null,
 category_name: post.category?.name ?? null,
 category_slug: post.category?.slug ?? null,
 category_color: post.category?.color ?? '#666',
 }));

 const categoriesResult = await fetchQuery(api.categories.list, { locale });
 categories = categoriesResult.map((cat: any) => ({
 id: cat._id,
 name: cat.name,
 slug: cat.slug,
 color: cat.color ?? '#666',
 post_count: cat.postCount ?? 0,
 }));
 } catch (error) {
 console.error('Error fetching data:', error);
 }

 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 // Structured data for SEO
 const blogSchema = {
 '@context': 'https://schema.org',
 '@type': 'Blog',
 name: locale === 'nl' ? 'SkillLinkup Blog - Freelance Tips & Guides' : 'SkillLinkup Blog - Freelance Tips & Guides',
 description: locale === 'nl'
 ? 'Tips, handleidingen en inzichten voor freelancers. Leer hoe je succesvol freelancet.'
 : 'Tips, guides and insights for freelancers. Learn how to freelance successfully.',
 url: `${siteUrl}/${locale}/blog`,
 publisher: {
 '@type': 'Organization',
 name: 'SkillLinkup',
 url: siteUrl,
 },
 blogPost: posts.slice(0, 10).map((post: any) =>({
 '@type': 'BlogPosting',
 headline: post.title,
 description: post.excerpt,
 url: `${siteUrl}/${locale}/post/${post.slug}`,
 datePublished: post.published_at ? new Date(post.published_at).toISOString() : undefined,
 image: post.feature_img ? `${siteUrl}${post.feature_img}` : undefined,
 })),
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
 ],
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
 />

 <main>
 {/* Page Header / Breadcrumb */}
 <section className="breadcumb-section">
 <div className="container">
 <div className="row">
 <div className="col-lg-12">
 <div className="breadcumb-style1 text-center">
 <h2 className="title">{t('hero.title')}</h2>
 <p className="text fz17 mt10">{t('hero.subtitle')}</p>
 <div className="breadcumb-list mt15">
 <Link href={`/${locale}`}>Home</Link>
 <span className="mx10">/</span>
 <span className="active">Blog</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Blog Grid */}
 <section className="pt50 pb90">
 <div className="container">
 {posts.length > 0 ? (
 <>
 <div className="row">
 {posts.map((post) => (
 <div key={post.id} className="col-sm-6 col-lg-4">
 <div className="blog-style1 bdrs12 bdr1 hover-box-shadow mb30 overflow-hidden">
 <Link href={`/${locale}/post/${post.slug}`} className="blog-img d-block">
 {post.feature_img ? (
 <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden' }}>
 <Image
 src={post.feature_img}
 alt={post.title}
 fill
 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
 className="object-cover"
 />
 </div>
 ) : (
 <div style={{ height: '200px', background: '#f5f5f5' }} />
 )}
 </Link>
 <div className="blog-content p30">
 <div className="d-flex align-items-center justify-content-between mb10">
 {post.category_name && (
 <span className="fz13 fw500 text-thm">
 {post.category_name}
 </span>
 )}
 {post.read_time && (
 <span className="fz13 text-muted">
 {post.read_time} {t('postCard.minRead')}
 </span>
 )}
 </div>
 <Link href={`/${locale}/post/${post.slug}`}>
 <h5 className="fw600 mb10">
 {post.title}
 </h5>
 </Link>
 {post.excerpt && (
 <p className="fz14 body-color mb15">
 {post.excerpt}
 </p>
 )}
 <div className="d-flex align-items-center fz13 text-muted">
 {post.published_at && (
 <time dateTime={new Date(post.published_at).toISOString()}>
 {new Date(post.published_at).toLocaleDateString(locale, {
 month: 'short',
 day: 'numeric',
 year: 'numeric',
 })}
 </time>
 )}
 {post.views ? (
 <>
 <span className="mx10">·</span>
 <span>{post.views} {t('postCard.views')}</span>
 </>
 ) : null}
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>

 {/* Load More */}
 {posts.length >= 12 && (
 <div className="row mt20">
 <div className="col-12 text-center">
 <button className="ud-btn btn-white2">
 {t('loadMore.button')}
 </button>
 </div>
 </div>
 )}
 </>
 ) : (
 <div className="row">
 <div className="col-12 text-center py50">
 <p className="fz17 body-color">{t('emptyState.message')}</p>
 </div>
 </div>
 )}
 </div>
 </section>

 {/* Categories Section */}
 {categories.length > 0 && (
 <section className="pt0 pb90 bgc-f7">
 <div className="container">
 <div className="row mb40">
 <div className="col-12 text-center">
 <h3 className="title">{t('categories.heading')}</h3>
 </div>
 </div>
 <div className="row">
 {categories.map((category) => (
 <div key={category.id} className="col-sm-6 col-md-4 col-lg-3">
 <Link
 href={`/${locale}/category/${category.slug}`}
 className="d-block ps-widget bgc-white bdrs12 bdr1 hover-box-shadow p20 mb20"
 >
 <div className="d-flex align-items-center" style={{ gap: '12px' }}>
 <div
 className="d-flex align-items-center justify-content-center text-white fw600 bdrs50"
 style={{ backgroundColor: category.color, width: 40, height: 40, flexShrink: 0 }}
 >
 {category.name.charAt(0)}
 </div>
 <div>
 <h6 className="mb0 fw600">{category.name}</h6>
 <p className="fz13 text-muted mb0">
 {t('categories.postCount', { count: category.post_count || 0 })}
 </p>
 </div>
 </div>
 </Link>
 </div>
 ))}
 </div>
 </div>
 </section>
 )}
 </main>
 </>
 );
}
