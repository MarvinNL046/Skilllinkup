import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getCategoryBySlug, getPostsByCategory } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const category = await getCategoryBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: 'categoryPage' });

  if (!category) {
    return {
      title: t('notFound'),
    };
  }

  return {
    title: `${category.name} | SkillLinkup`,
    description: category.description || `Browse all posts in ${category.name} category`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug, locale } = await params;

  // Fetch category and posts
  const category = await getCategoryBySlug(slug, locale);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(slug, 50, locale);
  const t = await getTranslations({ locale, namespace: 'categoryPage' });

  return (
    <>
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
                {posts.map((post) => (
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
