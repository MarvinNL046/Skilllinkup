import { getTranslations } from 'next-intl/server';
import {
 MapPin,
 Wrench,
 Palette,
 Camera,
 BookOpen,
 Code,
 Music,
 Truck,
 Home,
} from 'lucide-react';
import { LocationSearch } from '@/components/marketplace/LocationSearch';

export const dynamic = 'force-dynamic';

interface LocalPageProps {
 params: Promise<{ locale: string }>;
}

// Popular local service categories (physical / in-person services)
const LOCAL_CATEGORIES = [
 { icon: Wrench, label: 'Handyman & Repairs', color: 'bg-orange-50 text-orange-600' },
 { icon: Palette, label: 'Design & Creative', color: 'bg-purple-50 text-purple-600' },
 { icon: Camera, label: 'Photography', color: 'bg-blue-50 text-blue-600' },
 { icon: BookOpen, label: 'Tutoring & Coaching', color: 'bg-green-50 text-green-600' },
 { icon: Code, label: 'IT & Tech Support', color: 'bg-indigo-50 text-indigo-600' },
 { icon: Music, label: 'Music & Events', color: 'bg-pink-50 text-pink-600' },
 { icon: Truck, label: 'Moving & Delivery', color: 'bg-yellow-50 text-yellow-600' },
 { icon: Home, label: 'Cleaning & Home', color: 'bg-teal-50 text-teal-600' },
];

export default async function LocalMarketplacePage({ params }: LocalPageProps) {
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'localServices' });

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-secondary to-secondary-medium text-white py-16 sm:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-3xl mx-auto text-center">
 {/* Badge */}
 <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
 <MapPin className="w-4 h-4" />
 {t('title')}
 </div>

 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight">
 {t('heroTitle')}
 </h1>
 <p className="text-lg sm:text-xl text-gray-300 mb-0">
 {t('heroSubtitle')}
 </p>
 </div>
 </div>
 </section>

 {/* Search Section */}
 <section className="py-10 -mt-8 relative z-10">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-5xl mx-auto">
 <LocationSearch />
 </div>
 </div>
 </section>

 {/* Popular Local Categories */}
 <section className="py-12 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 text-center">
 {t('popularCategories')}
 </h2>
 <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 max-w-5xl mx-auto">
 {LOCAL_CATEGORIES.map(({ icon: Icon, label, color }) =>(
 <div
 key={label}
 className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary/30 hover:bg-primary/5 dark:hover:bg-gray-700 transition-all cursor-pointer group text-center"
 >
 <div
 className={`w-12 h-12 rounded-full flex items-center justify-center ${color} dark:bg-gray-600`}
 >
 <Icon className="w-5 h-5" />
 </div>
 <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors leading-snug">
 {label}
 </span>
 </div>
 ))}
 </div>
 </div>
 </section>
 </div>
 );
}
