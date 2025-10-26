import Link from "next/link";
import Image from "next/image";
import { getPublishedPosts, getCategories } from "@/lib/queries";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getTranslations } from 'next-intl/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blogPage.metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blogPage' });

  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = [];
  let categories: Awaited<ReturnType<typeof getCategories>> = [];

  try {
    posts = await getPublishedPosts(12, 0, locale);
    categories = await getCategories(locale);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white sm:text-5xl mb-4">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length > 0 ? (
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
                              {post.read_time} {t('postCard.minRead')}
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
                              {new Date(post.published_at).toLocaleDateString(locale, {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </time>
                          )}
                          {post.views && (
                            <>
                              <span>·</span>
                              <span>{post.views} {t('postCard.views')}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {t('emptyState.message')}
                </p>
              </div>
            )}

            {/* Load More (for future pagination) */}
            {posts.length >= 12 && (
              <div className="mt-12 text-center">
                <button className="inline-flex items-center justify-center rounded-lg border-2 border-primary bg-white dark:bg-gray-800 hover:bg-primary px-8 py-3 text-base font-heading font-semibold text-primary hover:text-white dark:text-accent dark:hover:text-white transition-all">
                  {t('loadMore.button')}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        {categories.length > 0 && (
          <section className="py-12 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 text-center">
                {t('categories.heading')}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/${locale}/category/${category.slug}`}
                    className="group bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 hover:border-accent hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t('categories.postCount', { count: category.post_count || 0 })}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-accent transition-colors"
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
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
