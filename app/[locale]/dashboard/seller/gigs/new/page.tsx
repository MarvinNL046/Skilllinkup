import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { GigWizard, SerializableCategory } from '@/components/dashboard/GigWizard';
import type { MarketplaceCategory } from '@/types/marketplace';

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
 redirect('/sign-in');
 }

 const rawCategories = await fetchQuery(api.marketplace.categories.list, { locale });
 // Map Convex camelCase to snake_case expected by MarketplaceCategory type
 const categories: MarketplaceCategory[] = rawCategories.map((cat: any) => ({
 id: cat._id,
 name: cat.name,
 slug: cat.slug,
 description: cat.description ?? null,
 icon: cat.icon ?? null,
 image_url: cat.imageUrl ?? null,
 parent_id: cat.parentId ?? null,
 service_type: cat.serviceType ?? 'gig',
 gig_count: 0,
 children: cat.children?.map((child: any) => ({
 id: child._id,
 name: child.name,
 slug: child.slug,
 description: child.description ?? null,
 icon: child.icon ?? null,
 image_url: child.imageUrl ?? null,
 parent_id: child.parentId ?? null,
 service_type: child.serviceType ?? 'gig',
 gig_count: 0,
 })),
 }));
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
