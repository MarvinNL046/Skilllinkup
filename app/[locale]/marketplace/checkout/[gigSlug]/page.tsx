import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ChevronRight } from 'lucide-react';
import { getGigBySlug, type GigDetail, type GigPackage } from '@/lib/marketplace-queries';
import { safeText, safeArray } from '@/lib/safe';
import { CheckoutForm } from '@/components/marketplace/CheckoutForm';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

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

function serializeGig(gig: GigDetail): SerializableGig {
  return {
    id: String(gig.id),
    freelancer_id: String(gig.freelancer_id),
    freelancer_name: safeText(gig.freelancer_name, 'Freelancer'),
    title: safeText(gig.title, 'Untitled Service'),
    slug: safeText(gig.slug, ''),
    currency: safeText(gig.currency, 'USD'),
    status: safeText(gig.status, 'active'),
    packages: safeArray<GigPackage>(gig.packages).map((pkg) => ({
      id: String(pkg.id),
      tier: safeText(pkg.tier, 'basic'),
      title: safeText(pkg.title, ''),
      description: safeText(pkg.description, ''),
      price: Number(pkg.price) || 0,
      currency: safeText(pkg.currency, 'USD'),
      delivery_days: Number(pkg.delivery_days) || 1,
      revision_count: Number(pkg.revision_count) || 0,
      features: safeArray<string>(pkg.features)
        .map((f) => safeText(f, ''))
        .filter(Boolean),
    })),
  };
}

export default async function CheckoutPage({ params, searchParams }: PageProps) {
  const { locale, gigSlug } = await params;
  const { package: preselectedPackageId } = await searchParams;
  const t = await getTranslations('checkout');

  let gig: GigDetail | null = null;
  try {
    gig = await getGigBySlug(gigSlug, locale);
  } catch (error) {
    console.error('Error fetching gig for checkout:', error);
  }

  if (!gig) {
    notFound();
  }

  const serializedGig = serializeGig(gig);

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
