import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getCategories } from '@/lib/queries';
import { FolderOpen, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export const metadata: Metadata = {
 title: 'Browse Categories | SkillLinkup',
 description: 'Explore all content categories on SkillLinkup. Find articles, guides, and resources organized by topic.',
};

export default async function CategoriesPage() {
 const categories = await getCategories();

 return (
 <>
 <Header />
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-white dark:bg-slate-800 py-16 sm:py-20 border-b border-gray-200 dark:border-slate-700">
 <div className="container mx-auto px-4">
 <div className="max-w-3xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
 <FolderOpen className="w-7 h-7 text-white" />
 </div>
 </div>

 <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
 Browse Categories
 </h1>

 <p className="text-xl text-gray-700 dark:text-gray-300">
 Explore our content organized by topic. Find articles, guides, and resources that match your interests.
 </p>

 <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-6">
 <FolderOpen className="w-4 h-4" />
 <span>{categories.length} {categories.length === 1 ? 'category' : 'categories'} available</span>
 </div>
 </div>
 </div>
 </section>

 {/* Categories Grid */}
 <section className="container mx-auto px-4 py-12">
 {categories.length === 0 ? (
 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-12 text-center border border-gray-200 dark:border-slate-700">
 <FolderOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
 No categories found
 </h3>
 <p className="text-gray-600 dark:text-gray-300 mb-6">
 We're working on organizing our content. Check back soon!
 </p>
 <Link
 href="/blog"
 className="inline-flex items-center px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold transition-colors"
 >
 Browse All Posts
 </Link>
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {categories.map((category: any) =>(
 <Link
 key={category.id}
 href={`/category/${category.slug}`}
 className="group block"
 >
 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden h-full border border-gray-200 dark:border-slate-700">
 {/* Icon Header */}
 <div className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 p-8 flex items-center justify-center">
 <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-lg">
 <FolderOpen className="w-8 h-8 text-primary" />
 </div>
 </div>

 {/* Content */}
 <div className="p-6">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
 {category.name}
 </h3>

 {category.description && (
 <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
 {category.description}
 </p>
 )}

 {/* Post Count */}
 <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
 <span className="text-sm text-gray-500 dark:text-gray-400">
 {category.post_count} {category.post_count === 1 ? 'post' : 'posts'}
 </span>
 <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
 View
 <ArrowRight className="w-4 h-4" />
 </span>
 </div>
 </div>
 </div>
 </Link>
 ))}
 </div>
 )}
 </section>
 </main>
 <Footer />
 </>
 );
}
