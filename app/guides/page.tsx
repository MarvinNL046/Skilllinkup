import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getPublishedPosts } from '@/lib/queries';
import { Calendar, User, ArrowRight, BookOpen, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Freelance Guides | SkillLinkup',
  description: 'Ontdek onze uitgebreide guides en tutorials voor freelancers. Leer alles over platforms, pricing, marketing en meer.',
};

export default async function GuidesPage() {
  // Haal alle posts op met category "Guides"
  const allPosts = await getPublishedPosts(100, 0);
  const guidePosts = allPosts.filter((post: any) =>
    post.category_name?.toLowerCase().includes('guide')
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-accent rounded-lg flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                Freelance Guides & Tutorials
              </h1>
              <p className="text-xl text-text-secondary">
                Uitgebreide handleidingen om je te helpen succesvol te worden als freelancer.
                Van beginners tips tot geavanceerde strategieën.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Getting Started</h3>
              <p className="text-gray-600 text-sm mb-4">
                Begin je freelance carrière met onze beginnersguides
              </p>
              <Link href="#beginners" className="text-primary font-semibold text-sm hover:underline">
                Lees meer →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Pricing & Earning</h3>
              <p className="text-gray-600 text-sm mb-4">
                Optimaliseer je tarieven en verdien meer
              </p>
              <Link href="#pricing" className="text-primary font-semibold text-sm hover:underline">
                Lees meer →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Growth & Marketing</h3>
              <p className="text-gray-600 text-sm mb-4">
                Groei je business en vind meer klanten
              </p>
              <Link href="#growth" className="text-primary font-semibold text-sm hover:underline">
                Lees meer →
              </Link>
            </div>
          </div>

          {/* Featured Guide */}
          {guidePosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Guide</h2>
              <Link href={`/blog/${guidePosts[0].slug}`} className="block group">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all">
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

                      <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                        {guidePosts[0].title}
                      </h3>

                      {guidePosts[0].excerpt && (
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {guidePosts[0].excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{guidePosts[0].author_name || 'SkillLinkup'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(guidePosts[0].created_at).toLocaleDateString('nl-NL', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>5 min leestijd</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                          Lees guide
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
              <h2 className="text-2xl font-bold text-gray-900">Alle Guides</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span>{guidePosts.length} guides beschikbaar</span>
              </div>
            </div>

            {guidePosts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Geen guides gevonden</h3>
                <p className="text-gray-600">
                  We zijn bezig met het toevoegen van nieuwe guides. Check binnenkort terug!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guidePosts.slice(1).map((post: any) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden h-full flex flex-col">
                      {/* Featured Image */}
                      {post.feature_img ? (
                        <div className="relative h-48 bg-gray-200 overflow-hidden">
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

                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {post.excerpt && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>
                        )}

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{post.author_name || 'SkillLinkup'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(post.created_at).toLocaleDateString('nl-NL', {
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
              Mis geen enkele guide meer!
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Schrijf je in voor onze nieuwsbrief en ontvang de nieuwste guides, tips en tutorials direct in je inbox.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
              >
                Bekijk Alle Posts
              </Link>
              <Link
                href="/#newsletter"
                className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Schrijf je in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
