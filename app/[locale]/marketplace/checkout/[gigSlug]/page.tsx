import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ChevronRight } from 'lucide-react';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { safeText, safeArray } from '@/lib/safe';
import { CheckoutForm } from '@/components/marketplace/CheckoutForm';

export const dynamic = 'force-dynamic';

interface PageProps {
 params: Promise<{ locale: string; gigSlug: string }>;
 searchParams: Promise<{ package?: string }>;
}

// Serializable subset of GigDetail for passing to the client component
export interface SerializableGig {
 id: string;
 freelancer_id: string;
 freelancer_name: string;
 title: string;
 slug: string;
 currency: string;
 status: string;
 packages: SerializablePackage[];
}

export interface SerializablePackage {
 id: string;
 tier: string;
 title: string;
 description: string;
 price: number;
 currency: string;
 delivery_days: number;
 revision_count: number;
 features: string[];
}

export default async function CheckoutPage({ params, searchParams }: PageProps) {
 const { locale, gigSlug } = await params;
 const { package: preselectedPackageId } = await searchParams;
 const t = await getTranslations('checkout');

 let gigData: Awaited<ReturnType<typeof fetchQuery<typeof api.marketplace.gigs.getBySlug>>> = null;
 try {
 gigData = await fetchQuery(api.marketplace.gigs.getBySlug, { slug: gigSlug, locale });
 } catch (error) {
 console.error('Error fetching gig for checkout:', error);
 }

 if (!gigData) {
 notFound();
 }

 // Map Convex camelCase to SerializableGig shape
 const rawPackages = safeArray(gigData.packages);
 const packages: SerializablePackage[] = rawPackages.map((pkg) => ({
 id: String(pkg._id),
 tier: safeText(pkg.tier, 'basic'),
 title: safeText(pkg.title, ''),
 description: safeText(pkg.description, ''),
 price: Number(pkg.price) || 0,
 currency: safeText(pkg.currency, 'USD'),
 delivery_days: Number(pkg.deliveryDays) || 1,
 revision_count: Number(pkg.revisionCount) || 0,
 features: safeArray<string>(pkg.features as any)
 .map((f) => safeText(f, ''))
 .filter(Boolean),
 }));

 const freelancerProfile = gigData.freelancerProfile as any;

 const serializedGig: SerializableGig = {
 id: String(gigData._id),
 freelancer_id: String(gigData.freelancerId),
 freelancer_name: safeText(freelancerProfile?.displayName, 'Freelancer'),
 title: safeText(gigData.title, 'Untitled Service'),
 slug: safeText(gigData.slug, ''),
 currency: safeText((gigData as any).currency, 'USD'),
 status: safeText(gigData.status, 'active'),
 packages,
 };

 // Determine the package to pre-select: URL param first, otherwise first package
 const selectedPackageId =
 preselectedPackageId && serializedGig.packages.some((p) => p.id === preselectedPackageId)
 ? preselectedPackageId
 : (serializedGig.packages[0]?.id ?? '');

 return (
 <section className="py-8 sm:py-10">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
 {/* Breadcrumb */}
 <nav
 className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-6"
 aria-label="Breadcrumb"
 >
 <Link
 href={`/${locale}/marketplace`}
 className="hover:text-primary transition-colors"
 >
 Marketplace
 </Link>
 <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
 <Link
 href={`/${locale}/marketplace/gigs/${gigSlug}`}
 className="hover:text-primary transition-colors line-clamp-1 max-w-xs"
 >
 {serializedGig.title}
 </Link>
 <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
 <span className="text-gray-700 dark:text-gray-200">{t('title')}</span>
 </nav>

 {/* Page heading */}
 <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">
 {t('title')}
 </h1>

 {/* CheckoutForm client component */}
 <CheckoutForm
 gig={serializedGig}
 selectedPackageId={selectedPackageId}
 locale={locale}
 />
 </div>
 </section>
 );
}
