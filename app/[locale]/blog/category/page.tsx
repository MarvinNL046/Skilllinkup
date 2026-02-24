import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getCategories } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;

 return {
 title: locale === 'nl' ? 'Categorieën | SkillLinkup' : 'Categories | SkillLinkup',
 description: locale === 'nl'
 ? 'Verken alle blog categorieën en vind artikelen over freelancing, remote werk, AI tools en meer.'
 : 'Browse all blog categories and find articles about freelancing, remote work, AI tools, and more.',
 };
}

export default async function CategoriesPage({ params }: PageProps) {
 const { locale } = await params;
 const categories = await getCategories(locale);

 return (
 <>
 <Header />
 <main className="flex-1">
 {/* Page Header */}
 <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 sm:py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center max-w-3xl mx-auto">
 {/* Breadcrumb */}
 <nav className="mb-6">
 <ol className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
 <li>
 <Link href={`/${locale}`} className="hover:text-primary dark:hover:text-accent transition-colors">
 {locale === 'nl' ? 'Home' : 'Home'}
 </Link>
 </li>
 <li>/</li>
 <li>
 <Link href={`/${locale}/blog`} className="hover:text-primary dark:hover:text-accent transition-colors">
 Blog
 </Link>
 </li>
 <li>/</li>
 <li className="text-gray-900 dark:text-white font-medium">
 {locale === 'nl' ? 'Categorieën' : 'Categories'}
 </li>
 </ol>
 </nav>

 <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white sm:text-5xl mb-4">
 {locale === 'nl' ? 'Blog Categorieën' : 'Blog Categories'}
 </h1>

 <p className="text-lg text-gray-600 dark:text-gray-300">
 {locale === 'nl'
 ? 'Ontdek artikelen gesorteerd op onderwerp'
 : 'Discover articles organized by topic'
 }
 </p>
 </div>
 </div>
 </section>

 {/* Categories Grid */}
 <section className="py-12 bg-white dark:bg-gray-800">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 {categories.length === 0 ? (
 <div className="text-center py-12">
 <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
 {locale === 'nl'
 ? 'Er zijn nog geen categorieën beschikbaar.'
 : 'No categories available yet.'}
 </p>
 <Link
 href={`/${locale}/blog`}
 className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-8 py-3 text-base font-heading font-semibold text-white transition-colors shadow-lg"
 >
 {locale === 'nl' ? 'Naar Blog' : 'View Blog'}
 </Link>
 </div>
 ) : (
 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
 {categories.map((category) =>(
 <Link
 key={category.id}
 href={`/${locale}/blog/category/${category.slug}`}
 className="group"
 >
 <article className="h-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-6 transition-all hover:border-accent hover:shadow-xl dark:hover:shadow-accent/20">
 {/* Icon */}
 <div
 className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 transition-transform group-hover:scale-110"
 style={{ backgroundColor: category.color || '#9333ea' }}
 >
 <span className="text-2xl text-white font-bold">
 {category.name.charAt(0)}
 </span>
 </div>

 {/* Title */}
 <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-accent transition-colors">
 {category.name}
 </h2>

 {/* Description */}
 {category.description && (
 <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
 {category.description}
 </p>
 )}

 {/* Post Count */}
 <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
 {category.post_count} {category.post_count === 1
 ? (locale === 'nl' ? 'artikel' : 'post')
 : (locale === 'nl' ? 'artikelen' : 'posts')
 }
 </p>
 </article>
 </Link>
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
