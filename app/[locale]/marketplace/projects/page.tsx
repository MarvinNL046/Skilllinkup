import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { ProjectFilters } from '@/components/marketplace/ProjectFilters';

export const dynamic = 'force-dynamic';

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations('projects');

  type ConvexProject = Awaited<ReturnType<typeof fetchQuery<typeof api.marketplace.projects.list>>>[number];
  type ConvexCategory = Awaited<ReturnType<typeof fetchQuery<typeof api.marketplace.categories.list>>>[number];

  let rawProjects: ConvexProject[] = [];
  let rawCategories: ConvexCategory[] = [];

  try {
    [rawProjects, rawCategories] = await Promise.all([
      fetchQuery(api.marketplace.projects.list, { locale, limit: 100 }),
      fetchQuery(api.marketplace.categories.list, { locale }),
    ]);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  // Map Convex camelCase to the snake_case shapes the JSX expects
  const serializableProjects = rawProjects.map((p) => ({
    id: p._id,
    client_id: p.clientId,
    client_name: p.clientName ?? 'Unknown',
    title: p.title,
    slug: p.slug,
    description: p.description,
    category_name: p.categoryName ?? 'Uncategorized',
    required_skills: Array.isArray(p.requiredSkills) ? p.requiredSkills : [],
    budget_min: p.budgetMin != null ? Number(p.budgetMin) : null,
    budget_max: p.budgetMax != null ? Number(p.budgetMax) : null,
    currency: p.currency ?? 'EUR',
    deadline: p.deadline != null ? String(p.deadline) : null,
    work_type: p.workType ?? 'remote',
    location_city: p.locationCity ?? null,
    location_country: p.locationCountry ?? null,
    bid_count: Number(p.bidCount ?? 0),
    views: Number(p.views ?? 0),
    status: p.status,
    created_at: String(p.createdAt),
  }));

  // Serialize categories (flat list for filter dropdown, top-level only)
  const serializableCategories = rawCategories
    .filter((c) => !c.parentId)
    .map((cat) => ({
      id: cat._id,
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
