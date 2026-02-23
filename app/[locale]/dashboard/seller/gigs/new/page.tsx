import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { getMarketplaceCategories } from '@/lib/marketplace-queries';
import { GigWizard, SerializableCategory } from '@/components/dashboard/GigWizard';
import type { MarketplaceCategory } from '@/lib/marketplace-queries';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string }>;
}

/**
 * Recursively serialize a category tree into plain objects
 * so they can be safely passed from Server → Client Component.
 */
function serializeCategory(cat: MarketplaceCategory): SerializableCategory {
  return {
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    parent_id: cat.parent_id,
    children: cat.children ? cat.children.map(serializeCategory) : [],
  };
}

export default async function NewGigPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('dashboard.gigWizard');

  const user = await getCurrentUser();
  if (!user) {
    redirect(`/${locale}/auth/signin`);
  }

  const categories = await getMarketplaceCategories(locale);
  const serializedCategories = categories.map(serializeCategory);

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto w-full">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
          {t('createGig')}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Complete all steps to publish your service listing
        </p>
      </div>

      <GigWizard categories={serializedCategories} locale={locale} />
    </div>
  );
}
