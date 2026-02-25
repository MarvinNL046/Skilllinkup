import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
 ArrowLeft,
 Calendar,
 Users,
 Eye,
 MapPin,
 Tag,
 DollarSign,
 ExternalLink,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth-helpers';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { safeText } from '@/lib/safe';
import { BidCard } from '@/components/marketplace/BidCard';
import type { Id } from '@/convex/_generated/dataModel';

export const dynamic = 'force-dynamic';

interface PageProps {
 params: Promise<{ locale: string; id: string }>;
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
 const styles: Record<string, string> = {
  open: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
  in_progress: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
  completed: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
  closed: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
 };

 const labels: Record<string, string> = {
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

export default async function OwnerProjectDetailPage({ params }: PageProps) {
 const { locale, id } = await params;
 const t = await getTranslations('projects');

 const user = await getCurrentUser();
 if (!user) {
  redirect('/sign-in');
 }

 const { getToken } = await auth();
 const token = await getToken({ template: 'convex' });

 // Fetch project by Convex ID
 let project: {
  id: string;
  client_id: string;
  title: string;
  slug: string;
  description: string;
  category_name: string;
  required_skills: string[];
  budget_min: number | null;
  budget_max: number | null;
  currency: string;
  deadline: string | null;
  work_type: string;
  location_city: string | null;
  location_country: string | null;
  bid_count: number;
  views: number;
  status: string;
  selected_freelancer_id: string | null;
  created_at: string;
 } | null = null;

 try {
  const raw = await fetchQuery(
   api.marketplace.projects.getById,
   { projectId: id as Id<'projects'> },
   { token: token ?? undefined }
  );

  if (raw) {
   project = {
    id: raw._id,
    client_id: String(raw.clientId),
    title: raw.title ?? '',
    slug: raw.slug ?? '',
    description: raw.description ?? '',
    category_name: raw.categoryName ?? 'Uncategorized',
    required_skills: raw.requiredSkills ?? [],
    budget_min: raw.budgetMin ?? null,
    budget_max: raw.budgetMax ?? null,
    currency: raw.currency ?? 'EUR',
    deadline: raw.deadline ? new Date(raw.deadline).toISOString() : null,
    work_type: raw.workType ?? 'remote',
    location_city: raw.locationCity ?? null,
    location_country: raw.locationCountry ?? null,
    bid_count: raw.bidCount ?? 0,
    views: raw.views ?? 0,
    status: raw.status ?? 'open',
    selected_freelancer_id: raw.selectedFreelancerId
     ? String(raw.selectedFreelancerId)
     : null,
    created_at: raw.createdAt ? new Date(raw.createdAt).toISOString() : '',
   };
  }
 } catch (error) {
  console.error('Error fetching project:', error);
 }

 if (!project) {
  notFound();
 }

 // Ownership check: resolve current user's Convex _id
 const convexUser = await fetchQuery(
  api.users.getByClerkId,
  { clerkId: user.id },
  { token: token ?? undefined }
 );

 if (!convexUser || project.client_id !== convexUser._id) {
  redirect(`/${locale}/dashboard/projects`);
 }

 // Fetch bids
 let bids: {
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
 }[] = [];

 try {
  const rawBids = await fetchQuery(
   api.marketplace.projects.getBids,
   { projectId: id as Id<'projects'> },
   { token: token ?? undefined }
  );

  bids = rawBids.map((b) => ({
   id: b._id,
   freelancer_id: String(b.freelancerId),
   freelancer_name: b.freelancerName ?? 'Unknown',
   freelancer_avatar: b.freelancerAvatar ?? null,
   freelancer_rating: b.freelancerRating ?? 0,
   freelancer_verified: b.freelancerVerified ?? false,
   amount: b.amount ?? 0,
   currency: b.currency ?? 'EUR',
   delivery_days: b.deliveryDays ?? 7,
   pitch: b.pitch ?? '',
   status: b.status ?? 'pending',
   created_at: b.createdAt ? new Date(b.createdAt).toISOString() : '',
  }));
 } catch (error) {
  console.error('Error fetching bids:', error);
 }

 const safeTitle = safeText(project.title, 'Untitled Project');
 const skills = Array.isArray(project.required_skills) ? project.required_skills : [];

 const showLocation =
  project.work_type === 'local' || project.work_type === 'hybrid';
 const locationText = [project.location_city, project.location_country]
  .filter(Boolean)
  .join(', ');

 return (
  <div className="max-w-5xl mx-auto px-4 py-8">
   {/* Back link */}
   <Link
    href={`/${locale}/dashboard/projects`}
    className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-6"
   >
    <ArrowLeft className="w-4 h-4" />
    Back to My Projects
   </Link>

   {/* Header */}
   <div className="flex items-start justify-between gap-4 mb-6">
    <div>
     <div className="flex items-center gap-3 flex-wrap mb-2">
      <StatusBadge status={project.status} />
      <span className="text-xs text-gray-400 dark:text-gray-500">
       {project.category_name}
      </span>
     </div>
     <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
      {safeTitle}
     </h1>
    </div>
    <Link
     href={`/${locale}/marketplace/projects/${project.slug}`}
     target="_blank"
     className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-primary/40 hover:text-primary transition-colors flex-shrink-0"
    >
     <ExternalLink className="w-3.5 h-3.5" />
     Public View
    </Link>
   </div>

   {/* Stats row */}
   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
     <div className="flex items-center justify-center mb-1">
      <Users className="w-5 h-5 text-primary" />
     </div>
     <p className="text-2xl font-bold text-gray-900 dark:text-white">
      {project.bid_count}
     </p>
     <p className="text-xs text-gray-400 dark:text-gray-500">{t('bids')}</p>
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
     <div className="flex items-center justify-center mb-1">
      <Eye className="w-5 h-5 text-blue-500" />
     </div>
     <p className="text-2xl font-bold text-gray-900 dark:text-white">
      {project.views}
     </p>
     <p className="text-xs text-gray-400 dark:text-gray-500">Views</p>
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
     <div className="flex items-center justify-center mb-1">
      <DollarSign className="w-5 h-5 text-accent" />
     </div>
     <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
      {project.budget_min && project.budget_max
       ? `${formatCurrency(project.budget_min, project.currency)}–${formatCurrency(project.budget_max, project.currency)}`
       : project.budget_min
       ? `From ${formatCurrency(project.budget_min, project.currency)}`
       : project.budget_max
       ? `Up to ${formatCurrency(project.budget_max!, project.currency)}`
       : '—'}
     </p>
     <p className="text-xs text-gray-400 dark:text-gray-500">{t('budget')}</p>
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
     <div className="flex items-center justify-center mb-1">
      <Calendar className="w-5 h-5 text-orange-500" />
     </div>
     <p className="text-sm font-bold text-gray-900 dark:text-white">
      {project.deadline ? formatDate(project.deadline) : '—'}
     </p>
     <p className="text-xs text-gray-400 dark:text-gray-500">{t('deadline')}</p>
    </div>
   </div>

   {/* Two-column layout */}
   <div className="lg:grid lg:grid-cols-3 lg:gap-8">
    {/* Description + skills */}
    <div className="lg:col-span-2 space-y-6">
     {/* Description */}
     <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
       {t('description')}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
       {safeText(project.description, 'No description provided.')}
      </p>
     </div>

     {/* Skills */}
     {skills.length > 0 && (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
       <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
        {t('skills')}
       </h2>
       <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
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
    </div>

    {/* Project details sidebar */}
    <div className="mt-6 lg:mt-0 space-y-4">
     <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-3">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
       {t('projectDetails')}
      </h3>
      <div className="space-y-2 text-sm">
       <div className="flex items-center justify-between">
        <span className="text-gray-500 dark:text-gray-400">{t('workType')}</span>
        <span className="font-medium text-gray-800 dark:text-gray-200 capitalize">
         {project.work_type}
        </span>
       </div>
       {showLocation && locationText && (
        <div className="flex items-center justify-between">
         <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          Location
         </span>
         <span className="font-medium text-gray-800 dark:text-gray-200">
          {locationText}
         </span>
        </div>
       )}
       <div className="flex items-center justify-between">
        <span className="text-gray-500 dark:text-gray-400">Posted</span>
        <span className="font-medium text-gray-800 dark:text-gray-200">
         {formatDate(project.created_at)}
        </span>
       </div>
      </div>
     </div>
    </div>
   </div>

   {/* Bids section */}
   <div className="mt-8">
    <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-5">
     {t('allBids')} ({bids.length})
    </h2>

    {bids.length === 0 ? (
     <div className="flex flex-col items-center justify-center py-16 text-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
      <p className="text-gray-500 dark:text-gray-400 font-medium">
       {t('noBids')}
      </p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
       Share your project link to attract freelancers.
      </p>
     </div>
    ) : (
     <div className="space-y-4">
      {bids.map((bid) => (
       <BidCard
        key={bid.id}
        bid={{
         id: bid.id,
         freelancer_id: bid.freelancer_id,
         freelancer_name: bid.freelancer_name,
         freelancer_avatar: bid.freelancer_avatar,
         freelancer_rating: bid.freelancer_rating,
         freelancer_verified: bid.freelancer_verified,
         amount: bid.amount,
         currency: bid.currency,
         delivery_days: bid.delivery_days,
         pitch: bid.pitch,
         status: bid.status,
         created_at: bid.created_at,
        }}
        isOwner={true}
        projectId={project.id}
       />
      ))}
     </div>
    )}
   </div>
  </div>
 );
}
