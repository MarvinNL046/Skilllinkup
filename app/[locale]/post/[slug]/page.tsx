import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Newsletter } from "@/components/newsletter";
import { ViewTracker } from "@/components/ViewTracker";
import { CommentSection } from "@/components/CommentSection";
import { TableOfContents } from "@/components/TableOfContents";
import { AdWidget } from "@/components/AdWidget";
import { QuickInfoWidget } from "@/components/QuickInfoWidget";

export const dynamic = 'force-dynamic';

interface PostPageProps {
 params: Promise<{
 locale: string;
 slug: string;
 }>;
}

export async function generateMetadata({ params }: PostPageProps) {
 try {
 const { slug, locale } = await params;
 const raw = await fetchQuery(api.posts.getBySlug, { slug, locale });

 if (!raw) {
 return {
 title: "Post Not Found - SkillLinkup",
 };
 }

 // Map Convex camelCase fields to snake_case shape expected by JSX
 const post = {
 ...raw,
 id: raw._id,
 feature_img: raw.featureImg ?? null,
 published_at: raw.publishedAt ? new Date(raw.publishedAt).toISOString() : null,
 read_time: raw.readTime ?? null,
 meta_title: raw.metaTitle ?? null,
 meta_description: raw.metaDescription ?? null,
 author_name: raw.authorName ?? raw.author?.name ?? null,
 category_name: raw.category?.name ?? null,
 category_slug: raw.category?.slug ?? null,
 };

 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const postUrl = `${siteUrl}/post/${post.slug}`;

 // Use custom meta title/description if available, otherwise fallback to defaults
 const metaTitle = post.meta_title || `${post.title} - SkillLinkup`;
 const metaDescription = post.meta_description || post.excerpt || post.title;
 const imageUrl = post.feature_img?.startsWith('http')
 ? post.feature_img
 : `${siteUrl}${post.feature_img}`;

 return {
 title: metaTitle,
 description: metaDescription,

 // Keywords (optional, but can help)
 keywords: post.tags?.join(', '),

 // Authors
 authors: post.author_name ? [{ name: post.author_name }] : [],

 // Canonical URL
 alternates: {
 canonical: postUrl,
 },

 // Open Graph (Facebook, LinkedIn, etc.)
 openGraph: {
 title: metaTitle,
 description: metaDescription,
 url: postUrl,
 siteName: 'SkillLinkup',
 images: post.feature_img ? [
 {
 url: imageUrl,
 width: 1200,
 height: 630,
 alt: post.title,
 }
 ] : [],
 locale: 'en_US',
 type: 'article',
 publishedTime: post.published_at || undefined,
 authors: post.author_name ? [post.author_name] : [],
 tags: post.tags || [],
 },

 // Twitter Card
 twitter: {
 card: 'summary_large_image',
 title: metaTitle,
 description: metaDescription,
 images: post.feature_img ? [imageUrl] : [],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },

 // Robots
 robots: {
 index: post.status === 'published',
 follow: post.status === 'published',
 googleBot: {
 index: post.status === 'published',
 follow: post.status === 'published',
 },
 },
 };
 } catch (error) {
 return {
 title: "Post Not Found - SkillLinkup",
 };
 }
}

export default async function PostPage({ params }: PostPageProps) {
 const { slug, locale } = await params;

 let post: {
  id: string;
  _id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content: string;
  feature_img: string | null;
  published_at: string | null;
  read_time: number | null;
  meta_title: string | null;
  meta_description: string | null;
  author_name: string | null;
  category_name: string | null;
  category_slug: string | null;
  tags?: string[] | null;
  views?: number | null;
  status: string;
  updated_at?: string | null;
  ad_image?: string | null;
  ad_link?: string | null;
  platform_type?: string | null;
  fee_structure?: string | null;
  difficulty_level?: string | null;
  best_for?: string | null;
 } | null = null;

 let relatedPosts: Array<{
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  feature_img: string | null;
 }> = [];

 let comments: Array<{
  _id: string;
  postId: string;
  authorName: string;
  authorEmail: string;
  authorWebsite?: string;
  content: string;
  status: string;
  createdAt: number;
  id: string;
  author_name: string;
  created_at: Date;
 }> = [];

 try {
 const raw = await fetchQuery(api.posts.getBySlug, { slug, locale });

 if (!raw) {
 notFound();
 }

 // Map Convex camelCase fields to snake_case shape expected by JSX
 post = {
 ...raw,
 id: raw._id as string,
 feature_img: raw.featureImg ?? null,
 published_at: raw.publishedAt ? new Date(raw.publishedAt).toISOString() : null,
 updated_at: raw.updatedAt ? new Date(raw.updatedAt).toISOString() : null,
 read_time: raw.readTime ?? null,
 meta_title: raw.metaTitle ?? null,
 meta_description: raw.metaDescription ?? null,
 author_name: raw.authorName ?? (raw.author as any)?.name ?? null,
 category_name: (raw.category as any)?.name ?? null,
 category_slug: (raw.category as any)?.slug ?? null,
 ad_image: raw.adImage ?? null,
 ad_link: raw.adLink ?? null,
 // Fields not in schema but may be used by JSX widgets:
 platform_type: null,
 fee_structure: null,
 difficulty_level: null,
 best_for: null,
 };

 // Get related posts from same category
 const rawRelated = await fetchQuery(api.posts.list, { locale, limit: 3 });
 relatedPosts = rawRelated
 .filter((p) => p._id !== raw._id)
 .slice(0, 3)
 .map((p) => ({
 id: p._id as string,
 slug: p.slug,
 title: p.title,
 excerpt: p.excerpt ?? null,
 feature_img: p.featureImg ?? null,
 }));

 // Get comments for this post
 const rawComments = await fetchQuery(api.comments.getByPost, {
 postId: raw._id as any,
 });
 comments = rawComments.map((c) => ({
 _id: c._id as string,
 postId: c.postId as string,
 authorName: c.authorName,
 authorEmail: c.authorEmail,
 authorWebsite: c.authorWebsite,
 content: c.content,
 status: c.status,
 createdAt: c.createdAt,
 // Fields expected by CommentSection component
 id: c._id as string,
 author_name: c.authorName,
 created_at: new Date(c.createdAt),
 }));
 } catch (error) {
 console.error('Error fetching post:', error);
 notFound();
 }

 if (!post) {
 notFound();
 }

 // Schema.org JSON-LD for Rich Results
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const postUrl = `${siteUrl}/post/${post.slug}`;
 const imageUrl = post.feature_img?.startsWith('http')
 ? post.feature_img
 : `${siteUrl}${post.feature_img}`;

 // BlogPosting Schema
 const blogPostingSchema = {
 '@context': 'https://schema.org',
 '@type': 'BlogPosting',
 headline: post.title,
 description: post.excerpt || post.title,
 image: post.feature_img ? imageUrl : undefined,
 author: post.author_name ? {
 '@type': 'Person',
 name: post.author_name,
 } : undefined,
 publisher: {
 '@type': 'Organization',
 name: 'SkillLinkup',
 logo: {
 '@type': 'ImageObject',
 url: `${siteUrl}/images/logo/skilllinkup-transparant-rozepunt.webp`,
 },
 },
 datePublished: post.published_at,
 dateModified: post.updated_at || post.published_at,
 mainEntityOfPage: {
 '@type': 'WebPage',
 '@id': postUrl,
 },
 keywords: post.tags?.join(', '),
 articleSection: post.category_name,
 wordCount: post.content ? post.content.split(/\s+/).length : undefined,
 timeRequired: post.read_time ? `PT${post.read_time}M` : undefined,
 };

 // BreadcrumbList Schema
 const breadcrumbSchema = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 {
 '@type': 'ListItem',
 position: 1,
 name: 'Home',
 item: siteUrl,
 },
 {
 '@type': 'ListItem',
 position: 2,
 name: 'Blog',
 item: `${siteUrl}/blog`,
 },
 {
 '@type': 'ListItem',
 position: 3,
 name: post.title,
 item: postUrl,
 },
 ],
 };

 return (
 <>
 {/* BlogPosting Schema */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
 />

 {/* Breadcrumb Schema */}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
 />

 {/* View Tracker - Increments view count after 2 seconds */}
 <ViewTracker slug={post.slug} />

 <main>
 {/* Post Header / Breadcrumb */}
 <section className="breadcumb-section">
 <div className="container">
 <div className="row">
 <div className="col-lg-12">
 <div className="breadcumb-style1">
 <div className="breadcumb-list">
 <Link href={`/${locale}`}>Home</Link>
 <span className="mx10">/</span>
 <Link href={`/${locale}/blog`}>Blog</Link>
 {post.category_name && post.category_slug && (
 <>
 <span className="mx10">/</span>
 <Link href={`/${locale}/blog/category/${post.category_slug}`}>
 {post.category_name}
 </Link>
 </>
 )}
 <span className="mx10">/</span>
 <span className="active" style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block', verticalAlign: 'bottom' }}>
 {post.title}
 </span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Post Content */}
 <section className="pt30 pb90">
 <div className="container">
 <div className="row">
 {/* Main Content */}
 <div className="col-lg-8">
 {/* Post Header */}
 <div className="ps-widget bgc-white bdrs12 bdr1 p30 mb30">
 {/* Category Badge */}
 {post.category_name && post.category_slug && (
 <div className="mb15">
 <Link
 href={`/${locale}/blog/category/${post.category_slug}`}
 className="ud-btn btn-thm2 bdrs4"
 style={{ padding: '4px 14px', fontSize: '12px' }}
 >
 {post.category_name}
 </Link>
 </div>
 )}

 {/* Title */}
 <h1 className="title mb20">{post.title}</h1>

 {/* Meta Info */}
 <div className="d-flex flex-wrap align-items-center mb20" style={{ gap: '16px' }}>
 {post.author_name && (
 <div className="d-flex align-items-center fz14 body-color" style={{ gap: '6px' }}>
 <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
 </svg>
 <span className="fw500">{post.author_name}</span>
 </div>
 )}
 {post.published_at && (
 <div className="d-flex align-items-center fz14 body-color" style={{ gap: '6px' }}>
 <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
 </svg>
 <time dateTime={post.published_at}>
 {new Date(post.published_at).toLocaleDateString("en-US", {
 month: "long",
 day: "numeric",
 year: "numeric",
 })}
 </time>
 </div>
 )}
 {post.read_time && (
 <div className="d-flex align-items-center fz14 body-color" style={{ gap: '6px' }}>
 <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 <span>{post.read_time} min read</span>
 </div>
 )}
 {post.views ? (
 <div className="d-flex align-items-center fz14 body-color" style={{ gap: '6px' }}>
 <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
 </svg>
 <span>{post.views} views</span>
 </div>
 ) : null}
 </div>

 {/* Featured Image */}
 {post.feature_img && (
 <div className="bdrs12 overflow-hidden mb20" style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
 <Image
 src={post.feature_img}
 alt={post.title}
 fill
 sizes="(max-width: 1200px) 100vw, 1200px"
 className="object-cover"
 priority
 />
 </div>
 )}

 {/* Excerpt */}
 {post.excerpt && (
 <div className="mb20 fz17 body-color" style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '20px', paddingTop: '8px', paddingBottom: '8px', fontWeight: 500 }}>
 {post.excerpt}
 </div>
 )}

 {/* Post Body */}
 <div
 className="blog-post-content"
 dangerouslySetInnerHTML={{ __html: post.content || '' }}
 />

 {/* Tags */}
 {post.tags && post.tags.length > 0 && (
 <div className="mt30 pt20 bdr1-top">
 <h6 className="fw600 mb15">Tags</h6>
 <div className="d-flex flex-wrap" style={{ gap: '8px' }}>
 {post.tags.map((tag: string) => (
 <Link
 key={tag}
 href={`/blog/tag/${tag.toLowerCase()}`}
 className="bdrs4 fz14 px15 py5 bgc-f7 body-color"
 >
 #{tag}
 </Link>
 ))}
 </div>
 </div>
 )}

 {/* Share Buttons */}
 <div className="mt30 pt20 bdr1-top">
 <h6 className="fw600 mb15">Share this post</h6>
 <div className="d-flex" style={{ gap: '10px' }}>
 <button className="ud-btn btn-thm bdrs8" style={{ width: 40, height: 40, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
 <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
 </svg>
 </button>
 <button className="ud-btn btn-dark bdrs8" style={{ width: 40, height: 40, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
 <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
 </svg>
 </button>
 <button className="ud-btn btn-thm2 bdrs8" style={{ width: 40, height: 40, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
 </svg>
 </button>
 </div>
 </div>
 </div>

 {/* Comments Section */}
 <CommentSection postId={post.id} comments={comments} />
 </div>

 {/* Sidebar */}
 <div className="col-lg-4">
 <div className="position-sticky" style={{ top: '24px' }}>
 {/* Table of Contents */}
 <div className="ps-widget bgc-white bdrs12 bdr1 p30 mb30">
 <TableOfContents content={post.content || ''} />
 </div>

 {/* Quick Info */}
 <div className="ps-widget bgc-white bdrs12 bdr1 p30 mb30">
 <QuickInfoWidget
 platformType={post.platform_type}
 feeStructure={post.fee_structure}
 difficultyLevel={post.difficulty_level}
 bestFor={post.best_for}
 />
 </div>

 {/* Advertisement */}
 <AdWidget placement="blog_sidebar" adImage={post.ad_image} adLink={post.ad_link} />
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Related Posts */}
 {relatedPosts.length > 0 && (
 <section className="pt0 pb90 bgc-f7">
 <div className="container">
 <div className="row mb40">
 <div className="col-12">
 <h3 className="title">Related Articles</h3>
 </div>
 </div>
 <div className="row">
 {relatedPosts.map((relatedPost) => (
 <div key={relatedPost.id} className="col-sm-6 col-lg-4">
 <div className="blog-style1 bdrs12 bdr1 hover-box-shadow mb30 overflow-hidden">
 <Link href={`/post/${relatedPost.slug}`} className="blog-img d-block">
 {relatedPost.feature_img ? (
 <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', overflow: 'hidden' }}>
 <Image
 src={relatedPost.feature_img}
 alt={relatedPost.title}
 fill
 sizes="(max-width: 768px) 100vw, 33vw"
 className="object-cover"
 />
 </div>
 ) : (
 <div style={{ height: '200px', background: '#f5f5f5' }} />
 )}
 </Link>
 <div className="blog-content p30">
 <Link href={`/post/${relatedPost.slug}`}>
 <h5 className="fw600 mb10">{relatedPost.title}</h5>
 </Link>
 {relatedPost.excerpt && (
 <p className="fz14 body-color mb0">{relatedPost.excerpt}</p>
 )}
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 )}

 {/* Newsletter */}
 <Newsletter />
 </main>
 </>
 );
}
