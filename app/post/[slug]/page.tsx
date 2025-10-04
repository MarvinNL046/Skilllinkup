import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "../../../lib/queries";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import { Newsletter } from "../../../components/newsletter";
import AdWidget from "../../../src/common/components/sidebar/AdWidget";
import QuickInfoWidget from "../../../src/common/components/sidebar/QuickInfoWidget";
import TableOfContents from "../../../src/common/components/sidebar/TableOfContents";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return {
        title: "Post Not Found - SkillLinkup",
      };
    }

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
  const { slug } = await params;
  let post;
  let relatedPosts: Awaited<ReturnType<typeof getPublishedPosts>> = [];

  try {
    post = await getPostBySlug(slug);

    if (!post) {
      notFound();
    }

    // Get related posts from same category
    relatedPosts = await getPublishedPosts(3, 0);
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }

  // Schema.org JSON-LD for Rich Results
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const postUrl = `${siteUrl}/post/${post.slug}`;
  const imageUrl = post.feature_img?.startsWith('http')
    ? post.feature_img
    : `${siteUrl}${post.feature_img}`;

  const jsonLd = {
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
        url: `${siteUrl}/images/logo/logo.png`,
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

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <main className="flex-1">
        {/* Post Header */}
        <article>
          <header className="bg-gradient-to-b from-background-light to-white py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="mb-6">
                  <ol className="flex items-center gap-2 text-sm text-text-muted">
                    <li>
                      <Link href="/" className="hover:text-primary transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>/</li>
                    <li>
                      <Link href="/blog" className="hover:text-primary transition-colors">
                        Blog
                      </Link>
                    </li>
                    <li>/</li>
                    <li className="text-text-primary font-medium line-clamp-1">
                      {post.title}
                    </li>
                  </ol>
                </nav>

                {/* Category */}
                {post.category_name && (
                  <div className="mb-4">
                    <Link
                      href={`/blog/category/${post.category_name.toLowerCase()}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-heading font-semibold uppercase tracking-wide hover:bg-accent/20 transition-colors"
                    >
                      {post.category_name}
                    </Link>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-4xl font-heading font-bold text-text-primary sm:text-5xl mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                  {post.author_name && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="font-semibold text-text-primary">{post.author_name}</span>
                    </div>
                  )}
                  {post.published_at && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{post.read_time} min read</span>
                    </div>
                  )}
                  {post.views && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{post.views} views</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.feature_img && (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src={post.feature_img}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          )}

          {/* Post Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-12 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {/* Excerpt */}
                  {post.excerpt && (
                    <div className="mb-8 text-xl text-text-secondary leading-relaxed font-medium border-l-4 border-primary pl-6 py-2">
                      {post.excerpt}
                    </div>
                  )}

                  {/* Post Body */}
                  <div className="prose prose-lg max-w-none">
                    <div
                      className="text-text-secondary leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: post.content || '' }}
                    />
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-background-gray">
                      <h3 className="text-sm font-heading font-semibold text-text-primary mb-3 uppercase tracking-wide">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string) => (
                          <Link
                            key={tag}
                            href={`/blog/tag/${tag.toLowerCase()}`}
                            className="px-3 py-1.5 rounded-lg bg-background-light text-text-secondary text-sm hover:bg-accent/10 hover:text-accent transition-colors"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Share Buttons */}
                  <div className="mt-8 pt-8 border-t border-background-gray">
                    <h3 className="text-sm font-heading font-semibold text-text-primary mb-4 uppercase tracking-wide">
                      Share this post
                    </h3>
                    <div className="flex gap-3">
                      <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </button>
                      <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary hover:bg-secondary-dark text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </button>
                      <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent hover:bg-accent-dark text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                  <div className="sticky top-24 space-y-8">
                    {/* Table of Contents - Automatically generated from H2/H3 */}
                    <TableOfContents content={post.content} />

                    {/* Quick Info - Only shows if data is filled in */}
                    <QuickInfoWidget
                      platformType={post.platform_type}
                      feeStructure={post.fee_structure}
                      difficultyLevel={post.difficulty_level}
                      bestFor={post.best_for}
                    />

                    {/* Advertisement - Only shows if configured */}
                    <AdWidget adImage={post.ad_image} adLink={post.ad_link} />
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-background-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-heading font-bold text-text-primary mb-8">
                Related Articles
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="group">
                    <Link href={`/post/${relatedPost.slug}`} className="block">
                      {relatedPost.feature_img && (
                        <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4 shadow-md group-hover:shadow-xl transition-shadow">
                          <Image
                            src={relatedPost.feature_img}
                            alt={relatedPost.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      )}
                      <h3 className="text-lg font-heading font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      {relatedPost.excerpt && (
                        <p className="text-sm text-text-secondary line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      )}
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
