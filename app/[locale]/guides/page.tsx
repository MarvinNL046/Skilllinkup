import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getPublishedPosts } from '@/lib/queries';
import { Calendar, User, ArrowRight, BookOpen, Clock } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guidesPage.metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function GuidesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'guidesPage' });

  // Fetch all posts with category "Guides"
  const allPosts = await getPublishedPosts(100, 0);
  const guidePosts = allPosts.filter((post: any) =>
    post.category_name?.toLowerCase().includes('guide')
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-white dark:bg-slate-800 py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-accent rounded-lg flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('categories.gettingStarted.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {t('categories.gettingStarted.description')}
              </p>
              <Link href="#beginners" className="text-primary font-semibold text-sm hover:underline">
                {t('categories.gettingStarted.linkText')}
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('categories.pricingEarning.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {t('categories.pricingEarning.description')}
              </p>
              <Link href="#pricing" className="text-primary font-semibold text-sm hover:underline">
                {t('categories.pricingEarning.linkText')}
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border border-gray-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t('categories.growthMarketing.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {t('categories.growthMarketing.description')}
              </p>
              <Link href="#growth" className="text-primary font-semibold text-sm hover:underline">
                {t('categories.growthMarketing.linkText')}
              </Link>
            </div>
          </div>

          {/* Featured Guide */}
          {guidePosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('featured.sectionTitle')}</h2>
              <Link href={`/${locale}/post/${guidePosts[0].slug}`} className="block group">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-200 dark:border-slate-700">
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/2 relative h-64 md:h-auto">
                      {guidePosts[0].feature_img ? (
                        <Image
                          src={guidePosts[0].feature_img}
                          alt={guidePosts[0].title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-8xl">📚</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="md:w-1/2 p-8">
                      {guidePosts[0].category_name && (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-4 bg-primary">
                          {guidePosts[0].category_name}
                        </span>
                      )}

                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                        {guidePosts[0].title}
                      </h3>

                      {guidePosts[0].excerpt && (
                        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                          {guidePosts[0].excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{guidePosts[0].author_name || t('meta.authorFallback')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(guidePosts[0].created_at).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>5 {t('featured.minRead')}</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                          {t('featured.readGuide')}
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* All Guides Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('allGuides.sectionTitle')}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <BookOpen className="w-4 h-4" />
                <span>{guidePosts.length} {t('allGuides.guidesAvailable')}</span>
              </div>
            </div>

            {guidePosts.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-12 text-center border border-gray-200 dark:border-slate-700">
                <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('allGuides.noGuidesTitle')}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('allGuides.noGuidesDescription')}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guidePosts.slice(1).map((post: any) => (
                  <Link
                    key={post.id}
                    href={`/${locale}/post/${post.slug}`}
                    className="group block"
                  >
                    <article className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden h-full flex flex-col border border-gray-200 dark:border-slate-700">
                      {/* Featured Image */}
                      {post.feature_img ? (
                        <div className="relative h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                          <Image
                            src={post.feature_img}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-6xl">📚</span>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {post.category_name && (
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3 self-start bg-primary">
                            {post.category_name}
                          </span>
                        )}

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>
                        )}

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-slate-700">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author_name || t('meta.authorFallback')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(post.created_at).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="bg-primary rounded-lg shadow-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {t('cta.heading')}
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
              >
                {t('cta.viewAllButton')}
              </Link>
              <Link
                href={`/${locale}#newsletter`}
                className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                {t('cta.subscribeButton')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
