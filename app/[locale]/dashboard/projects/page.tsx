import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Plus, Briefcase, Users, Eye, Calendar } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth-helpers';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
 params: Promise<{ locale: string }>;
}

interface ClientProject {
 id: string;
 title: string;
 slug: string;
 status: string;
 bid_count: number;
 views: number;
 budget_min: number | null;
 budget_max: number | null;
 currency: string;
 deadline: string | null;
 category_name: string;
 created_at: string;
}

function StatusBadge({ status }: { status: string }) {
 const styles: Record<string, string>= {
 open: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
 in_progress: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
 completed: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
 closed: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
 };

 const labels: Record<string, string>= {
 open: 'Open',
 in_progress: 'In Progress',
 completed: 'Completed',
 closed: 'Closed',
 };

 return (
 <span
 className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
 styles[status] ?? styles.open
 }`}
 >
 {labels[status] ?? status}
 </span>
 );
}

function formatCurrency(amount: number, currency: string): string {
 try {
 return new Intl.NumberFormat('en-US', {
 style: 'currency',
 currency,
 minimumFractionDigits: 0,
 maximumFractionDigits: 0,
 }).format(amount);
 } catch {
 return `${currency} ${amount}`;
 }
}

function formatDate(dateStr: string): string {
 try {
 return new Intl.DateTimeFormat('en-US', {
 month: 'short',
 day: 'numeric',
 year: 'numeric',
 }).format(new Date(dateStr));
 } catch {
 return dateStr;
 }
}

export default async function ClientProjectsPage({ params }: PageProps) {
 const { locale } = await params;
 const t = await getTranslations('projects');

 const user = await getCurrentUser();
 if (!user) {
 redirect('/handler/sign-in');
 }

 let projects: ClientProject[] = [];

 try {
 const rows = await sql`
 SELECT
 p.id,
 COALESCE(p.title, '') AS title,
 COALESCE(p.slug, '') AS slug,
 COALESCE(p.status, 'open') AS status,
 COALESCE(
 (SELECT COUNT(*)::int FROM bids b WHERE b.project_id = p.id),
 0
 ) AS bid_count,
 COALESCE(p.views, 0) AS views,
 p.budget_min,
 p.budget_max,
 COALESCE(p.currency, 'EUR') AS currency,
 p.deadline,
 COALESCE(mc.name, 'Uncategorized') AS category_name,
 p.created_at
 FROM projects p
 LEFT JOIN marketplace_categories mc ON p.category_id = mc.id
 WHERE p.client_id = ${user.id}
 ORDER BY p.created_at DESC
 `;
 projects = rows as ClientProject[];
 } catch (error) {
 console.error('Error fetching client projects:', error);
 }

 return (
 <div className="max-w-5xl mx-auto px-4 py-8">
 {/* Header */}
 <div className="flex items-center justify-between mb-8">
 <div>
 <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
 {t('myProjects')}
 </h1>
 <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
 {projects.length} project{projects.length !== 1 ? 's' : ''}
 </p>
 </div>
 <Link
 href={`/${locale}/dashboard/projects/new`}
 className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
 >
 <Plus size={16} />
 {t('postProject')}
 </Link>
 </div>

 {/* Empty state */}
 {projects.length === 0 && (
 <div className="flex flex-col items-center justify-center py-20 text-center">
 <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
 <Briefcase size={28} className="text-gray-400 dark:text-gray-500" />
 </div>
 <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
 {t('noProjects')}
 </h2>
 <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
 {t('noProjectsDesc')}
 </p>
 <Link
 href={`/${locale}/dashboard/projects/new`}
 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
 >
 <Plus size={16} />
 {t('postProject')}
 </Link>
 </div>
 )}

 {/* Projects list */}
 {projects.length >0 && (
 <div className="space-y-3">
 {projects.map((project) =>(
 <Link
 key={project.id}
 href={`/${locale}/dashboard/projects/${project.id}`}
 className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:border-primary/40 transition-colors group"
 >
 {/* Project info */}
 <div className="flex-1 min-w-0">
 <div className="flex items-start gap-3 flex-wrap">
 <div className="flex-1 min-w-0">
 <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors">
 {project.title}
 </h3>
 <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
 {project.category_name}
 </p>
 </div>
 <StatusBadge status={project.status} />
 </div>

 {/* Stats row */}
 <div className="flex items-center gap-4 mt-3 flex-wrap">
 <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
 <Users size={12} />
 <span>
 {project.bid_count} bid{project.bid_count !== 1 ? 's' : ''}
 </span>
 </div>
 <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
 <Eye size={12} />
 <span>{project.views} views</span>
 </div>
 {project.deadline && (
 <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
 <Calendar size={12} />
 <span>{formatDate(project.deadline)}</span>
 </div>
 )}
 {(project.budget_min || project.budget_max) && (
 <div className="text-xs font-semibold text-primary">
 {project.budget_min && project.budget_max
 ? `${formatCurrency(project.budget_min, project.currency)} – ${formatCurrency(project.budget_max, project.currency)}`
 : project.budget_min
 ? `From ${formatCurrency(project.budget_min, project.currency)}`
 : `Up to ${formatCurrency(project.budget_max!, project.currency)}`}
 </div>
 )}
 </div>
 </div>
 </Link>
 ))}
 </div>
 )}
 </div>
 );
}
