import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Star, BadgeCheck, MapPin, ChevronRight, Package, Clock } from 'lucide-react';
import { getGigBySlug, type GigDetail } from '@/lib/marketplace-queries';
import { safeImage, safeText, safeArray } from '@/lib/safe';
import { GigImageGallery } from '@/components/marketplace/GigImageGallery';
import { GigPackageSelector } from '@/components/marketplace/GigPackageSelector';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
 params: Promise<{ locale: string; slug: string }>;
}

export default async function GigDetailPage({ params }: PageProps) {
 const { locale, slug } = await params;
 const t = await getTranslations('marketplace');

 let gig: GigDetail | null = null;
 try {
 gig = await getGigBySlug(slug, locale);
 } catch (error) {
 console.error('Error fetching gig:', error);
 }

 if (!gig) {
 notFound();
 }

 // ----------------------------------------------------------------
 // Serialize all data before passing to client components
 // ----------------------------------------------------------------
 const safeTitle = safeText(gig.title, 'Untitled Service');
 const safeDescription = safeText(gig.description, '');
 const safeFreelancerName = safeText(gig.freelancer_name, 'Freelancer');
 const safeFreelancerAvatar = safeImage(gig.freelancer_avatar, '/images/placeholder-avatar.webp');
 const safeFreelancerBio = safeText(gig.freelancer_bio, '');
 const safeCategoryName = safeText(gig.category_name, 'Uncategorized');
 const safeCategorySlug = safeText(gig.category_slug, '');

 const ratingAverage = Number(gig.rating_average) || 0;
 const ratingCount = Number(gig.rating_count) || 0;
 const orderCount = Number(gig.order_count) || 0;
 const freelancerTotalOrders = Number(gig.freelancer_total_orders) || 0;
 const freelancerVerified = Boolean(gig.freelancer_verified);

 const locationParts = [gig.freelancer_city, gig.freelancer_country].filter(Boolean);
 const locationText = locationParts.join(', ');

 const createdAt = gig.created_at ? String(gig.created_at) : '';
 const memberSinceYear = createdAt
 ? new Date(createdAt).getFullYear().toString()
 : '';

 // Serialize images for the gallery
 const serializedImages = safeArray<{ url: string; alt: string }>(gig.all_images).map((img) =>({
 url: safeImage(img.url, '/images/placeholder-gig.webp'),
 alt: safeText(img.alt, safeTitle),
 }));

 // Serialize packages for the selector
 const serializedPackages = safeArray(gig.packages).map((pkg) =>({
 id: String(pkg.id),
 tier: safeText(pkg.tier, 'basic'),
 title: safeText(pkg.title, ''),
 description: safeText(pkg.description, ''),
 price: Number(pkg.price) || 0,
 currency: safeText(pkg.currency, 'USD'),
 delivery_days: Number(pkg.delivery_days) || 1,
 revision_count: Number(pkg.revision_count) || 0,
 features: safeArray<string>(pkg.features).map((f) =>safeText(f, '')).filter(Boolean),
 }));

 return (
 <section className="py-8 sm:py-10">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
 {/* Breadcrumb */}
 <nav className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-6" aria-label="Breadcrumb">
 <Link
 href={`/${locale}/marketplace`}
 className="hover:text-primary transition-colors"
 >
 Marketplace
 </Link>
 <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
 {safeCategorySlug ? (
 <Link
 href={`/${locale}/marketplace/gigs?category=${safeCategorySlug}`}
 className="hover:text-primary transition-colors"
 >
 {safeCategoryName}
 </Link>
 ) : (
 <span>{safeCategoryName}</span>
 )}
 <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
 <span className="text-gray-700 dark:text-gray-200 line-clamp-1 max-w-xs">
 {safeTitle}
 </span>
 </nav>

 {/* Two-column layout */}
 <div className="lg:grid lg:grid-cols-3 lg:gap-10">
 {/* ---- Left column (content) ---- */}
 <div className="lg:col-span-2 space-y-8">
 {/* Image gallery */}
 <GigImageGallery images={serializedImages} title={safeTitle} />

 {/* Title */}
 <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white leading-tight">
 {safeTitle}
 </h1>

 {/* Freelancer info bar */}
 <div className="flex flex-wrap items-center gap-4 py-4 border-y border-gray-200 dark:border-gray-700">
 <div className="relative w-10 h-10 flex-shrink-0">
 <Image
 src={safeFreelancerAvatar}
 alt={safeFreelancerName}
 fill
 sizes="40px"
 className="rounded-full object-cover"
 />
 </div>
 <div className="flex flex-col min-w-0">
 <div className="flex items-center gap-1.5">
 <span className="font-semibold text-gray-900 dark:text-white text-sm">
 {safeFreelancerName}
 </span>
 {freelancerVerified && (
 <BadgeCheck className="w-4 h-4 text-accent flex-shrink-0" aria-label="Verified" />
 )}
 </div>
 {locationText && (
 <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
 <MapPin className="w-3 h-3 flex-shrink-0" />
 <span>{locationText}</span>
 </div>
 )}
 </div>

 {/* Rating */}
 {ratingAverage >0 && (
 <div className="flex items-center gap-1 ml-auto">
 <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
 <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
 {ratingAverage.toFixed(1)}
 </span>
 {ratingCount >0 && (
 <span className="text-xs text-gray-500 dark:text-gray-400">
 ({ratingCount} {t('gigDetail.reviews').toLowerCase()})
 </span>
 )}
 </div>
 )}

 {/* Order count */}
 {orderCount >0 && (
 <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
 <Package className="w-4 h-4 flex-shrink-0" />
 <span>
 {orderCount} {t('orders')}
 </span>
 </div>
 )}
 </div>

 {/* Description */}
 <div>
 <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3">
 {t('gigDetail.description')}
 </h2>
 {safeDescription ? (
 <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line text-sm sm:text-base">
 {safeDescription}
 </p>
 ) : (
 <p className="text-gray-400 dark:text-gray-600 italic text-sm">
 No description provided.
 </p>
 )}
 </div>

 {/* About the seller */}
 <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 space-y-5">
 <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white">
 {t('gigDetail.aboutSeller')}
 </h2>

 {/* Avatar + name */}
 <div className="flex items-center gap-4">
 <div className="relative w-14 h-14 flex-shrink-0">
 <Image
 src={safeFreelancerAvatar}
 alt={safeFreelancerName}
 fill
 sizes="56px"
 className="rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
 />
 </div>
 <div>
 <div className="flex items-center gap-1.5">
 <span className="font-semibold text-gray-900 dark:text-white">
 {safeFreelancerName}
 </span>
 {freelancerVerified && (
 <BadgeCheck className="w-4 h-4 text-accent" aria-label="Verified" />
 )}
 </div>
 {locationText && (
 <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
 <MapPin className="w-3 h-3" />
 {locationText}
 </p>
 )}
 </div>
 </div>

 {/* Stats row */}
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
 {freelancerTotalOrders >0 && (
 <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
 <p className="text-xl font-bold text-gray-900 dark:text-white">
 {freelancerTotalOrders}
 </p>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
 {t('gigDetail.completedOrders')}
 </p>
 </div>
 )}
 {memberSinceYear && (
 <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
 <p className="text-xl font-bold text-gray-900 dark:text-white">
 {memberSinceYear}
 </p>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
 {t('gigDetail.memberSince')}
 </p>
 </div>
 )}
 {gig.freelancer_id && (
 <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 col-span-2 sm:col-span-1">
 <div className="flex items-center justify-center gap-1">
 <Clock className="w-4 h-4 text-gray-400" />
 <p className="text-sm font-semibold text-gray-900 dark:text-white">
 &lt; 24 {t('gigDetail.hours')}
 </p>
 </div>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
 {t('gigDetail.responseTime')}
 </p>
 </div>
 )}
 </div>

 {/* Bio */}
 {safeFreelancerBio && (
 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
 {safeFreelancerBio}
 </p>
 )}
 </div>

 {/* Reviews placeholder */}
 <div>
 <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3">
 {t('gigDetail.reviews')}
 </h2>
 {ratingCount === 0 ? (
 <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 text-center">
 <p className="text-gray-400 dark:text-gray-500 text-sm">
 {t('gigDetail.noReviews')}
 </p>
 </div>
 ) : (
 <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
 <div className="flex items-center gap-1.5">
 <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
 <span className="text-2xl font-bold text-gray-900 dark:text-white">
 {ratingAverage.toFixed(1)}
 </span>
 </div>
 <p className="text-sm text-gray-500 dark:text-gray-400">
 {ratingCount} {t('gigDetail.reviews').toLowerCase()}
 </p>
 </div>
 )}
 </div>
 </div>

 {/* ---- Right column (sticky package selector) ---- */}
 <div className="mt-8 lg:mt-0">
 <div className="sticky top-24">
 <GigPackageSelector
 packages={serializedPackages}
 gigSlug={slug}
 locale={locale}
 freelancerId={String(gig.freelancer_id)}
 />
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
