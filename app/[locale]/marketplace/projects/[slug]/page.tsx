import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
 Calendar,
 Users,
 MapPin,
 Tag,
 ChevronRight,
 Briefcase,
 DollarSign,
} from 'lucide-react';
import { sql } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-helpers';
import { safeText } from '@/lib/safe';
import { BidForm } from '@/components/marketplace/BidForm';
import { BidCard } from '@/components/marketplace/BidCard';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
 params: Promise<{ locale: string; slug: string }>;
}

interface ProjectDetail {
 id: string;
 client_id: string;
 client_name: string;
 title: string;
 slug: string;
 description: string;
 category_id: string | null;
 category_name: string;
 required_skills: string[];
 budget_min: number | null;
 budget_max: number | null;
 currency: string;
 deadline: string | null;
 work_type: string;
 location_city: string | null;
 location_country: string | null;
 location_postcode: string | null;
 bid_count: number;
 views: number;
 status: string;
 selected_freelancer_id: string | null;
 created_at: string;
}

interface BidWithFreelancer {
 id: string;
 freelancer_id: string;
 freelancer_name: string;
 freelancer_avatar: string | null;
 freelancer_rating: number;
 freelancer_verified: boolean;
 amount: number;
 currency: string;
 delivery_days: number;
 pitch: string;
 status: string;
 created_at: string;
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
 month: 'long',
 day: 'numeric',
 year: 'numeric',
 }).format(new Date(dateStr));
 } catch {
 return dateStr;
 }
}

function StatusBadge({ status }: { status: string }) {
 const styles: Record<string, string>= {
 open: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
 in_progress:
 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
 completed:
 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
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

export default async function ProjectDetailPage({ params }: PageProps) {
 const { locale, slug } = await params;
 const t = await getTranslations('projects');

 const user = await getCurrentUser();

 // Fetch project
 let project: ProjectDetail | null = null;
 try {
 const rows = await sql`
 SELECT
 p.id,
 p.client_id,
 COALESCE(
 (
 SELECT fp.display_name
 FROM freelancer_profiles fp
 WHERE fp.user_id = p.client_id
 LIMIT 1
 ),
 'Unknown Client'
 ) AS client_name,
 COALESCE(p.title, '') AS title,
 COALESCE(p.slug, '') AS slug,
 COALESCE(p.description, '') AS description,
 p.category_id,
 COALESCE(mc.name, 'Uncategorized') AS category_name,
 COALESCE(p.required_skills, '{}') AS required_skills,
 p.budget_min,
 p.budget_max,
 COALESCE(p.currency, 'EUR') AS currency,
 p.deadline,
 COALESCE(p.work_type, 'remote') AS work_type,
 p.location_city,
 p.location_country,
 p.location_postcode,
 COALESCE(
 (SELECT COUNT(*)::int FROM bids b WHERE b.project_id = p.id),
 0
 ) AS bid_count,
 COALESCE(p.views, 0) AS views,
 COALESCE(p.status, 'open') AS status,
 p.selected_freelancer_id,
 p.created_at
 FROM projects p
 LEFT JOIN marketplace_categories mc ON p.category_id = mc.id
 WHERE p.slug = ${slug}
 AND p.locale = ${locale}
 LIMIT 1
 `;

 if (rows.length >0) {
 project = rows[0] as ProjectDetail;
 }
 } catch (error) {
 console.error('Error fetching project:', error);
 }

 if (!project) {
 notFound();
 }

 const isOwner = user?.id === project.client_id;

 // Increment view count (fire-and-forget)
 sql`UPDATE projects SET views = views + 1 WHERE id = ${project.id}`.catch(
 () =>{}
 );

 // Fetch bids (only for owner, or show count for others)
 let bids: BidWithFreelancer[] = [];
 let userHasBid = false;

 if (isOwner) {
 try {
 const rows = await sql`
 SELECT
 b.id,
 b.freelancer_id,
 COALESCE(fp.display_name, 'Unknown') AS freelancer_name,
 fp.avatar_url AS freelancer_avatar,
 COALESCE(fp.rating_average, 0) AS freelancer_rating,
 COALESCE(fp.is_verified, false) AS freelancer_verified,
 COALESCE(b.amount, 0) AS amount,
 COALESCE(b.currency, 'EUR') AS currency,
 COALESCE(b.delivery_days, 7) AS delivery_days,
 COALESCE(b.pitch, '') AS pitch,
 COALESCE(b.status, 'pending') AS status,
 b.created_at
 FROM bids b
 JOIN freelancer_profiles fp ON b.freelancer_id = fp.id
 WHERE b.project_id = ${project.id}
 ORDER BY
 CASE b.status WHEN 'accepted' THEN 0 ELSE 1 END,
 b.created_at ASC
 `;
 bids = rows as BidWithFreelancer[];
 } catch (error) {
 console.error('Error fetching bids:', error);
 }
 } else if (user) {
 // Check if this user already bid
 try {
 const profileRows = await sql`
 SELECT fp.id FROM freelancer_profiles fp
 WHERE fp.user_id = ${user.id}
 LIMIT 1
 `;
 if (profileRows.length >0) {
 const existingBid = await sql`
 SELECT id FROM bids
 WHERE project_id = ${project.id}
 AND freelancer_id = ${profileRows[0].id}
 LIMIT 1
 `;
 userHasBid = existingBid.length >0;
 }
 } catch {
 // ignore
 }
 }

 const safeTitle = safeText(project.title, 'Untitled Project');
 const safeDescription = safeText(project.description, '');
 const skills = Array.isArray(project.required_skills)
 ? project.required_skills
 : [];

 const budgetText =
 project.budget_min && project.budget_max
 ? `${formatCurrency(project.budget_min, project.currency)} – ${formatCurrency(project.budget_max, project.currency)}`
 : project.budget_min
 ? `From ${formatCurrency(project.budget_min, project.currency)}`
 : project.budget_max
 ? `Up to ${formatCurrency(project.budget_max, project.currency)}`
 : 'Budget not specified';

 const showLocation =
 project.work_type === 'local' || project.work_type === 'hybrid';
 const locationText = [project.location_city, project.location_country]
 .filter(Boolean)
 .join(', ');

 const canBid =
 !isOwner &&
 project.status === 'open' &&
 user !== null &&
 !userHasBid;

 return (
 <section className="py-8 sm:py-10">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
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
 href={`/${locale}/marketplace/projects`}
 className="hover:text-primary transition-colors"
 >
 {t('title')}
 </Link>
 <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
 <span className="text-gray-700 dark:text-gray-200 line-clamp-1 max-w-xs">
 {safeTitle}
 </span>
 </nav>

 {/* Two-column layout */}
 <div className="lg:grid lg:grid-cols-3 lg:gap-10">
 {/* ---- Left column (content) ---- */}
 <div className="lg:col-span-2 space-y-6">
 {/* Title + status */}
 <div>
 <div className="flex items-center gap-3 flex-wrap mb-2">
 <StatusBadge status={project.status} />
 <span className="text-xs text-gray-400 dark:text-gray-500">
 {project.category_name}
 </span>
 </div>
 <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white leading-tight">
 {safeTitle}
 </h1>
 </div>

 {/* Meta row */}
 <div className="flex flex-wrap items-center gap-4 py-4 border-y border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
 <div className="flex items-center gap-1.5">
 <Briefcase className="w-4 h-4 flex-shrink-0" />
 <span>
 {t('postedBy')}{' '}
 <span className="font-medium text-gray-700 dark:text-gray-300">
 {safeText(project.client_name, 'Client')}
 </span>
 </span>
 </div>
 {project.deadline && (
 <div className="flex items-center gap-1.5">
 <Calendar className="w-4 h-4 flex-shrink-0" />
 <span>
 {t('deadline')}:{' '}
 <span className="font-medium text-gray-700 dark:text-gray-300">
 {formatDate(project.deadline)}
 </span>
 </span>
 </div>
 )}
 {showLocation && locationText && (
 <div className="flex items-center gap-1.5">
 <MapPin className="w-4 h-4 flex-shrink-0" />
 <span>{locationText}</span>
 </div>
 )}
 <div className="flex items-center gap-1.5">
 <Users className="w-4 h-4 flex-shrink-0" />
 <span>
 {project.bid_count} {t('bids').toLowerCase()}
 </span>
 </div>
 </div>

 {/* Description */}
 <div>
 <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3">
 {t('projectDetails')}
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

 {/* Required skills */}
 {skills.length >0 && (
 <div>
 <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3">
 {t('skills')}
 </h2>
 <div className="flex flex-wrap gap-2">
 {skills.map((skill) =>(
 <span
 key={skill}
 className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
 >
 <Tag className="w-3.5 h-3.5" />
 {skill}
 </span>
 ))}
 </div>
 </div>
 )}

 {/* Bids section (owner only) */}
 {isOwner && (
 <div>
 <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-4">
 {t('allBids')} ({bids.length})
 </h2>

 {bids.length === 0 ? (
 <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 text-center">
 <Users className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
 <p className="text-gray-400 dark:text-gray-500 text-sm">
 {t('noBids')}
 </p>
 </div>
 ) : (
 <div className="space-y-4">
 {bids.map((bid) =>(
 <BidCard
 key={bid.id}
 bid={{
 id: bid.id,
 freelancer_id: String(bid.freelancer_id),
 freelancer_name: String(bid.freelancer_name),
 freelancer_avatar: bid.freelancer_avatar
 ? String(bid.freelancer_avatar)
 : null,
 freelancer_rating: Number(bid.freelancer_rating),
 freelancer_verified: Boolean(bid.freelancer_verified),
 amount: Number(bid.amount),
 currency: String(bid.currency),
 delivery_days: Number(bid.delivery_days),
 pitch: String(bid.pitch),
 status: String(bid.status),
 created_at: String(bid.created_at),
 }}
 isOwner={true}
 projectId={project.id}
 />
 ))}
 </div>
 )}
 </div>
 )}
 </div>

 {/* ---- Right column (sticky sidebar) ---- */}
 <div className="mt-8 lg:mt-0">
 <div className="sticky top-24 space-y-4">
 {/* Budget card */}
 <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
 <div className="flex items-center gap-2 mb-3">
 <DollarSign className="w-5 h-5 text-primary" />
 <h3 className="text-base font-semibold text-gray-900 dark:text-white">
 {t('budget')}
 </h3>
 </div>
 <p className="text-2xl font-bold text-primary mb-1">
 {budgetText}
 </p>
 <p className="text-xs text-gray-400 dark:text-gray-500">
 {project.work_type === 'remote'
 ? t('remote')
 : project.work_type === 'local'
 ? t('local')
 : t('hybrid')}
 </p>
 </div>

 {/* Bid form / auth prompt */}
 {project.status === 'open' && (
 <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
 <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
 {t('placeBid')}
 </h3>

 {isOwner ? (
 <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
 This is your project.
 </p>
 ) : userHasBid ? (
 <div className="text-center py-4">
 <p className="text-sm text-accent font-medium">
 You have already placed a bid on this project.
 </p>
 </div>
 ) : !user ? (
 <div className="text-center py-4 space-y-3">
 <p className="text-sm text-gray-500 dark:text-gray-400">
 Sign in to place a bid on this project.
 </p>
 <Link
 href="/handler/sign-in"
 className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
 >
 Sign In
 </Link>
 </div>
 ) : canBid ? (
 <BidForm
 projectId={project.id}
 currency={project.currency}
 />
 ) : null}
 </div>
 )}

 {/* Post a project CTA (for visitors) */}
 {!user && (
 <div className="bg-secondary/5 dark:bg-secondary/20 rounded-xl border border-secondary/20 p-5 text-center">
 <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
 Have a project?
 </h4>
 <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
 Post your project and receive bids from skilled freelancers.
 </p>
 <Link
 href={`/${locale}/dashboard/projects/new`}
 className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-secondary text-white text-sm font-semibold hover:bg-secondary/90 transition-colors"
 >
 {t('postProject')}
 </Link>
 </div>
 )}
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
