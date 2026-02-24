'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';

interface Category {
 id: string;
 name: string;
 slug: string;
 icon: string | null;
 gig_count: number;
}

interface CategoryGridProps {
 categories: Category[];
}

const fallbackIcons: Record<number, string>= {
 0: '\u{1F3A8}',
 1: '\u{1F4BB}',
 2: '\u{1F4DD}',
 3: '\u{1F4F1}',
 4: '\u{1F4CA}',
 5: '\u{1F3AC}',
 6: '\u{1F4E3}',
 7: '\u{1F680}',
};

export function CategoryGrid({ categories }: CategoryGridProps) {
 const locale = useLocale();
 const t = useTranslations('homepage.categoryGrid');

 if (categories.length === 0) return null;

 return (
 <section className="py-16 md:py-20 bg-background-light dark:bg-gray-900">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 {/* Section header */}
 <div className="text-center mb-12">
 <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary dark:text-white mb-3">
 {t('title')}
 </h2>
 <p className="text-base text-text-secondary dark:text-gray-400 max-w-2xl mx-auto">
 {t('subtitle')}
 </p>
 </div>

 {/* Grid */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
 {categories.map((cat, index) =>(
 <Link
 key={cat.id}
 href={`/${locale}/marketplace/gigs?category=${cat.slug}`}
 className="group relative bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-lg transition-all duration-200 text-center"
 >
 {/* Icon */}
 <div className="text-4xl mb-3">{cat.icon || fallbackIcons[index] || '\u{2728}'}</div>

 {/* Name */}
 <h3 className="font-heading font-semibold text-sm md:text-base text-text-primary dark:text-white mb-1 group-hover:text-primary transition-colors">
 {cat.name}
 </h3>

 {/* Count */}
 {cat.gig_count >0 && (
 <p className="text-xs text-text-muted dark:text-gray-500">
 {cat.gig_count} {t('services')}
 </p>
 )}

 {/* Hover arrow */}
 <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
 <ArrowRight className="w-4 h-4 text-primary" />
 </div>
 </Link>
 ))}
 </div>
 </div>
 </section>
 );
}
