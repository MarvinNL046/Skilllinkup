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
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { getCurrentUser } from '@/lib/auth-helpers';
import { safeText } from '@/lib/safe';
import { BidForm } from '@/components/marketplace/BidForm';
import { BidCard } from '@/components/marketplace/BidCard';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
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
    in_progress:
      'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    completed:
      'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
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

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations('projects');

  const user = await getCurrentUser();

  // Fetch project via Convex
  type ConvexProject = Awaited<ReturnType<typeof fetchQuery<typeof api.marketplace.projects.getBySlug>>>;
  let project: ConvexProject = null;

  try {
    project = await fetchQuery(api.marketplace.projects.getBySlug, { slug, locale });
  } catch (error) {
    console.error('Error fetching project:', error);
  }

  if (!project) {
    notFound();
  }

  // Determine if the current user is the project owner
  // project.clientId is a Convex users document ID
  // user.id is the Stack Auth user ID - we need to match via the Convex user
  // We use a best-effort string comparison since both should be Convex IDs in the new system
  const isOwner = user?.id === String(project.clientId);

  // Fetch bids (only for owner)
  type ConvexBid = Awaited<ReturnType<typeof fetchQuery<typeof api.marketplace.projects.getBids>>>[number];
  let bids: ConvexBid[] = [];
  let userHasBid = false;

  if (isOwner) {
    try {
      bids = await fetchQuery(api.marketplace.projects.getBids, {
        projectId: project._id as Id<'projects'>,
      });
    } catch (error) {
      console.error('Error fetching bids:', error);
    }
  } else if (user) {
    // Check if current user already bid by looking through all bids
    try {
      const allBids = await fetchQuery(api.marketplace.projects.getBids, {
        projectId: project._id as Id<'projects'>,
      });
      // Check if any bid belongs to this user's freelancer profile
      // freelancerName may match or we compare by user association
      userHasBid = allBids.some(
        (b) => String(b.freelancerId) === String(user.id)
      );
    } catch {
      // ignore
    }
  }

  const safeTitle = safeText(project.title, 'Untitled Project');
  const safeDescription = safeText(project.description, '');
  const skills = Array.isArray(project.requiredSkills)
    ? project.requiredSkills
    : [];

  const currency = project.currency ?? 'EUR';
  const budgetMin = project.budgetMin ?? null;
  const budgetMax = project.budgetMax ?? null;

  const budgetText =
    budgetMin && budgetMax
      ? `${formatCurrency(budgetMin, currency)} – ${formatCurrency(budgetMax, currency)}`
      : budgetMin
      ? `From ${formatCurrency(budgetMin, currency)}`
      : budgetMax
      ? `Up to ${formatCurrency(budgetMax, currency)}`
      : 'Budget not specified';

  const workType = project.workType ?? 'remote';
  const showLocation = workType === 'local' || workType === 'hybrid';
  const locationText = [project.locationCity, project.locationCountry]
    .filter(Boolean)
    .join(', ');

  // Deadline: Convex stores as ms timestamp number
  const deadlineStr = project.deadline != null
    ? new Date(project.deadline).toISOString()
    : null;

  const bidCount = project.bidCount ?? 0;

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
                  {project.categoryName ?? 'Uncategorized'}
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
                    {safeText(project.clientName ?? '', 'Client')}
                  </span>
                </span>
              </div>
              {deadlineStr && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {t('deadline')}:{' '}
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {formatDate(deadlineStr)}
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
                  {bidCount} {t('bids').toLowerCase()}
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
            {skills.length > 0 && (
              <div>
                <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3">
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
                    {bids.map((bid) => (
                      <BidCard
                        key={bid._id}
                        bid={{
                          id: String(bid._id),
                          freelancer_id: String(bid.freelancerId),
                          freelancer_name: String(bid.freelancerName ?? 'Unknown'),
                          freelancer_avatar: bid.freelancerAvatar
                            ? String(bid.freelancerAvatar)
                            : null,
                          freelancer_rating: Number(bid.freelancerRating ?? 0),
                          freelancer_verified: Boolean(bid.freelancerVerified),
                          amount: Number(bid.amount),
                          currency: String(bid.currency ?? 'EUR'),
                          delivery_days: Number(bid.deliveryDays),
                          pitch: String(bid.pitch),
                          status: String(bid.status),
                          created_at: String(bid.createdAt),
                        }}
                        isOwner={true}
                        projectId={String(project._id)}
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
                  {workType === 'remote'
                    ? t('remote')
                    : workType === 'local'
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
                      projectId={String(project._id)}
                      currency={currency}
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
