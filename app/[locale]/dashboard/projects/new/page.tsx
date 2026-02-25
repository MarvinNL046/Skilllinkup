import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { NewProjectForm } from '@/components/dashboard/NewProjectForm';

export const dynamic = 'force-dynamic';

interface PageProps {
 params: Promise<{ locale: string }>;
}

interface SerializableCategory {
 id: string;
 name: string;
 slug: string;
 parent_id: string | null;
}

export default async function NewProjectPage({ params }: PageProps) {
 const { locale } = await params;
 const t = await getTranslations('projects');

 const user = await getCurrentUser();
 if (!user) {
  redirect('/sign-in');
 }

 const { getToken } = await auth();
 const token = await getToken({ template: 'convex' });

 let categories: SerializableCategory[] = [];
 try {
  const rawCategories = await fetchQuery(
   api.marketplace.categories.list,
   { locale },
   { token: token ?? undefined }
  );

  // Flatten tree into a flat list for the form select
  function flattenCategories(
   cats: typeof rawCategories
  ): SerializableCategory[] {
   const result: SerializableCategory[] = [];
   for (const cat of cats) {
    result.push({
     id: cat._id,
     name: cat.name ?? '',
     slug: cat.slug ?? '',
     parent_id: cat.parentId ?? null,
    });
    if (cat.children && cat.children.length > 0) {
     result.push(...flattenCategories(cat.children as typeof rawCategories));
    }
   }
   return result;
  }

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
