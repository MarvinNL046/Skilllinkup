'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

interface FAQItem {
 question: string;
 answer: string;
 category: string;
}

export default function FAQPage() {
 const t = useTranslations('faqPage');
 const params = useParams();
 const locale = params.locale as string;

 const [openIndex, setOpenIndex] = useState<number | null>(null);
 const [selectedCategory, setSelectedCategory] = useState<string>('all');
 const [searchQuery, setSearchQuery] = useState('');

 const toggleAccordion = (index: number) =>{
 setOpenIndex(openIndex === index ? null : index);
 };

 // Build FAQ data from translations
 const categoryKeys = ['gettingStarted', 'platformReviews', 'accountTools', 'platformSelection', 'paymentsEarnings', 'supportCommunity'];

 const faqData: FAQItem[] = useMemo(() =>{
 const data: FAQItem[] = [];

 categoryKeys.forEach(categoryKey =>{
 const categoryTitle = t(`categories.${categoryKey}.title`);
 const items = t.raw(`categories.${categoryKey}.items`) as Array<{ question: string; answer: string }>;

 items.forEach(item =>{
 data.push({
 category: categoryTitle,
 question: item.question,
 answer: item.answer
 });
 });
 });

 return data;
 }, [t, categoryKeys]);

 const categories = useMemo(() =>
 Array.from(new Set(faqData.map(item =>item.category))),
 [faqData]
 );

 const filteredFAQs = faqData.filter(item =>{
 const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
 const matchesSearch = searchQuery === '' ||
 item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
 item.answer.toLowerCase().includes(searchQuery.toLowerCase());
 return matchesCategory && matchesSearch;
 });

 return (
 <>
 
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Breadcrumb */}
 <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
 <div className="container mx-auto px-4 py-4">
 <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
 <Link href={`/${locale}/`} className="hover:text-primary dark:hover:text-accent transition-colors">
 {t('breadcrumb.home')}
 </Link>
 <span>→</span>
 <span className="text-gray-900 dark:text-white font-semibold">
 {t('breadcrumb.faq')}
 </span>
 </div>
 </div>
 </section>

 {/* Hero Section */}
 <section className="bg-white dark:bg-gray-800 py-16 sm:py-20">
 <div className="container mx-auto px-4">
 <div className="max-w-3xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-accent dark:bg-accent/90 rounded-lg flex items-center justify-center">
 <HelpCircle className="w-7 h-7 text-white" />
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

 {/* Search & Filter Section */}
 <section className="container mx-auto px-4 py-8">
 <div className="max-w-4xl mx-auto">
 {/* Search Bar */}
 <div className="mb-6">
 <div className="relative">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
 <input
 type="text"
 placeholder={t('search.placeholder')}
 value={searchQuery}
 onChange={(e) =>setSearchQuery(e.target.value)}
 className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-accent dark:focus:ring-accent/80 focus:border-transparent"
 />
 </div>
 </div>

 {/* Category Filter */}
 <div className="flex flex-wrap gap-2">
 <button
 onClick={() =>setSelectedCategory('all')}
 className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
 selectedCategory === 'all'
 ? 'bg-accent text-white'
 : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
 }`}
 >
 {t('filters.allQuestions')}
 </button>
 {categories.map((category) =>(
 <button
 key={category}
 onClick={() =>setSelectedCategory(category)}
 className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
 selectedCategory === category
 ? 'bg-accent text-white'
 : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
 }`}
 >
 {category}
 </button>
 ))}
 </div>
 </div>
 </section>

 {/* FAQ Accordion */}
 <section className="container mx-auto px-4 pb-16">
 <div className="max-w-4xl mx-auto">
 {filteredFAQs.length === 0 ? (
 <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
 <p className="text-gray-600 dark:text-gray-400 text-lg">
 {t('search.noResults')}
 </p>
 </div>
 ) : (
 <div className="space-y-4">
 {filteredFAQs.map((item, index) =>(
 <div
 key={index}
 className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
 >
 <button
 onClick={() =>toggleAccordion(index)}
 className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
 >
 <div className="flex-1 pr-4">
 <span className="text-xs font-semibold text-accent dark:text-accent-light mb-1 block">
 {item.category}
 </span>
 <span className="text-lg font-bold text-gray-900 dark:text-white">
 {item.question}
 </span>
 </div>
 <ChevronDown
 className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
 openIndex === index ? 'rotate-180' : ''
 }`}
 />
 </button>
 {openIndex === index && (
 <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
 {item.answer}
 </p>
 </div>
 )}
 </div>
 ))}
 </div>
 )}
 </div>
 </section>

 {/* Still Have Questions Section */}
 <section className="bg-white dark:bg-gray-800 py-16">
 <div className="container mx-auto px-4">
 <div className="max-w-3xl mx-auto text-center">
 <div className="w-16 h-16 bg-primary/10 dark:bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
 <HelpCircle className="w-8 h-8 text-primary dark:text-accent" />
 </div>
 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
 {t('stillHaveQuestions.title')}
 </h2>
 <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
 {t('stillHaveQuestions.description')}
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/contact`}
 className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary dark:bg-accent text-white font-semibold hover:bg-primary/90 dark:hover:bg-accent/90 transition-colors"
 >
 {t('stillHaveQuestions.contactSupport')}
 </Link>
 <Link
 href={`/${locale}/blog`}
 className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
 >
 {t('stillHaveQuestions.browseGuides')}
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Quick Links */}
 <section className="bg-accent/10 dark:bg-gray-900 py-16">
 <div className="container mx-auto px-4">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
 {t('popularResources.title')}
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
 <Link
 href={`/${locale}/reviews`}
 className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all text-center group border border-gray-200 dark:border-gray-700"
 >
 <div className="w-12 h-12 bg-accent dark:bg-accent/90 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
 
 </div>
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">
 {t('popularResources.platformReviews.title')}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 {t('popularResources.platformReviews.description')}
 </p>
 </Link>

 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all text-center group border border-gray-200 dark:border-gray-700"
 >
 <div className="w-12 h-12 bg-primary dark:bg-accent rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
 
 </div>
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">
 {t('popularResources.rateCalculator.title')}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 {t('popularResources.rateCalculator.description')}
 </p>
 </Link>

 <Link
 href={`/${locale}/newsletter`}
 className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all text-center group border border-gray-200 dark:border-gray-700"
 >
 <div className="w-12 h-12 bg-secondary dark:bg-accent rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
 
 </div>
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">
 {t('popularResources.newsletter.title')}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 {t('popularResources.newsletter.description')}
 </p>
 </Link>
 </div>
 </div>
 </section>
 </main>
 
 </>
 );
}
