import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { getOpenProjects, getMarketplaceCategories } from '@/lib/marketplace-queries';
import { ProjectFilters } from '@/components/marketplace/ProjectFilters';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface ProjectsPageProps {
 params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
 const { locale } = await params;
 const t = await getTranslations('projects');

 let projects: Awaited<ReturnType<typeof getOpenProjects>>= [];
 let categories: Awaited<ReturnType<typeof getMarketplaceCategories>>= [];

 try {
 [projects, categories] = await Promise.all([
 getOpenProjects(100, 0, locale),
 getMarketplaceCategories(locale),
 ]);
 } catch (error) {
 console.error('Error fetching projects:', error);
 }

 // Serialize projects to plain objects (no Date, etc.)
 const serializableProjects = projects.map((p) =>({
 id: p.id,
 client_id: p.client_id,
 client_name: p.client_name,
 title: p.title,
 slug: p.slug,
 description: p.description,
 category_name: p.category_name,
 required_skills: Array.isArray(p.required_skills) ? p.required_skills : [],
 budget_min: p.budget_min !== null ? Number(p.budget_min) : null,
 budget_max: p.budget_max !== null ? Number(p.budget_max) : null,
 currency: p.currency,
 deadline: p.deadline ? String(p.deadline) : null,
 work_type: p.work_type,
 location_city: p.location_city,
 location_country: p.location_country,
 bid_count: Number(p.bid_count),
 views: Number(p.views),
 status: p.status,
 created_at: String(p.created_at),
 }));

 // Serialize categories (flat list for filter dropdown)
 const serializableCategories = categories
 .filter((c) =>!c.parent_id)
 .map((cat) =>({
 id: cat.id,
 name: cat.name,
 slug: cat.slug,
 }));

 return (
 <section className="py-10">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 {/* Page header */}
 <div className="mb-8">
 <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
 {t('browseProjects')}
 </h1>
 <p className="text-gray-500 dark:text-gray-400">
 Find projects that match your skills and bid to win the work.
 </p>
 </div>

 {/* Filters + project grid (client component) */}
 <Suspense
 fallback={
 <div className="flex items-center justify-center py-20">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
 </div>
 }
 >
 <ProjectFilters
 projects={serializableProjects}
 categories={serializableCategories}
 />
 </Suspense>
 </div>
 </section>
 );
}
