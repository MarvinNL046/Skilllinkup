import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { getMarketplaceCategories } from '@/lib/marketplace-queries';
import type { MarketplaceCategory } from '@/lib/marketplace-queries';
import { NewProjectForm } from '@/components/dashboard/NewProjectForm';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface SerializableCategory {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
}

function flattenCategories(cats: MarketplaceCategory[]): SerializableCategory[] {
  const result: SerializableCategory[] = [];
  for (const cat of cats) {
    result.push({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      parent_id: cat.parent_id,
    });
    if (cat.children && cat.children.length > 0) {
      result.push(...flattenCategories(cat.children));
    }
  }
  return result;
}

export default async function NewProjectPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('projects');

  const user = await getCurrentUser();
  if (!user) {
    redirect('/handler/sign-in');
  }

  let categories: SerializableCategory[] = [];
  try {
    const rawCategories = await getMarketplaceCategories(locale);
    categories = flattenCategories(rawCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
          {t('createProject')}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Describe your project clearly to attract the right freelancers.
        </p>
      </div>

      <NewProjectForm categories={categories} locale={locale} />
    </div>
  );
}
