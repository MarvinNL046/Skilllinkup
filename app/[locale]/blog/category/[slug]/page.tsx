import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

export const dynamic = 'force-dynamic';

interface PageProps {
 params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { slug, locale } = await params;
 const raw = await fetchQuery(api.categories.getBySlug, { slug, locale });

 if (!raw) {
 return {
 title: 'Category Not Found | SkillLinkup',
 };
 }

 const category = {
   name: raw.name,
   description: raw.description ?? null,
   post_count: (raw as any).postCount ?? 0,
 };

 return {
 title: `${category.name} | SkillLinkup`,
 description: category.description || `Browse all posts in ${category.name} category`,
 };
}

export default async function CategoryPage({ params }: PageProps) {
 const { slug, locale } = await params;

 // Fetch category and posts
 const rawCategory = await fetchQuery(api.categories.getBySlug, { slug, locale });

 if (!rawCategory) {
 notFound();
 }

 const category = {
   name: rawCategory.name,
   description: rawCategory.description ?? null,
   color: (rawCategory as any).color ?? null,
   post_count: (rawCategory as any).postCount ?? 0,
 };

 const rawPosts = await fetchQuery(api.posts.getByCategory, { categorySlug: slug, locale, limit: 50 });

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

 return (
 <>
 <main>
 {/* Page Header / Breadcrumb */}
 <section className="breadcumb-section">
 <div className="container">
 <div className="row">
 <div className="col-lg-12">
 <div className="breadcumb-style1 text-center">
 <div
 className="d-flex align-items-center justify-content-center text-white fw600 bdrs50 mx-auto mb15"
 style={{ backgroundColor: category.color || '#9333ea', width: 60, height: 60 }}
 >
 <span style={{ fontSize: '1.5rem' }}>{category.name.charAt(0)}</span>
 </div>
 <h2 className="title">{category.name}</h2>
 {category.description && (
 <p className="text fz17 mt10">{category.description}</p>
 )}
 <p className="fz14 text-muted mt5">
 {category.post_count} {category.post_count === 1 ? 'post' : 'posts'}
 </p>
 <div className="breadcumb-list mt15">
 <Link href={`/${locale}`}>Home</Link>
 <span className="mx10">/</span>
 <Link href={`/${locale}/blog`}>Blog</Link>
 <span className="mx10">/</span>
 <span className="active">{category.name}</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Posts Grid */}
 <section className="pt50 pb90">
 <div className="container">
 {posts.length === 0 ? (
 <div className="row">
 <div className="col-12 text-center py50">
 <p className="fz17 body-color mb30">
 We&apos;re working on adding content to this category. Check back soon!
 </p>
 <Link
 href={`/${locale}/blog`}
 className="ud-btn btn-thm"
 >
 Browse All Posts
 </Link>
 </div>
 </div>
 ) : (
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
 {post.read_time} min read
 </span>
 )}
 </div>
 <Link href={`/${locale}/post/${post.slug}`}>
 <h5 className="fw600 mb10">{post.title}</h5>
 </Link>
 {post.excerpt && (
 <p className="fz14 body-color mb15">{post.excerpt}</p>
 )}
 <div className="d-flex align-items-center fz13 text-muted">
 {post.published_at && (
 <time dateTime={new Date(post.published_at).toISOString()}>
 {new Date(post.published_at).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US', {
 month: 'short',
 day: 'numeric',
 year: 'numeric',
 })}
 </time>
 )}
 {post.views ? (
 <>
 <span className="mx10">·</span>
 <span>{post.views} views</span>
 </>
 ) : null}
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 </section>
 </main>
 </>
 );
}
