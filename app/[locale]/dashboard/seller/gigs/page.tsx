import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { sql } from '@/lib/db';
import { Plus, Eye, ShoppingBag, Star, Briefcase } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface SellerGig {
  id: string;
  title: string;
  slug: string;
  status: string;
  views: number;
  order_count: number;
  rating_average: number;
  rating_count: number;
  price_from: number;
  currency: string;
  category_name: string;
  created_at: string;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
    pending: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400',
    paused: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
    draft: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    rejected: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
  };

  const labels: Record<string, string> = {
    active: 'Active',
    pending: 'Pending Review',
    paused: 'Paused',
    draft: 'Draft',
    rejected: 'Rejected',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        styles[status] ?? styles.draft
      }`}
    >
      {labels[status] ?? status}
    </span>
  );
}

export default async function SellerGigsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('dashboard');

  const user = await getCurrentUser();
  if (!user) {
    redirect('/handler/sign-in');
  }

  // Get the freelancer profile for this user
  const profileRows = await sql`
    SELECT id FROM freelancer_profiles WHERE user_id = ${user.id} LIMIT 1
  `;

  let gigs: SellerGig[] = [];

  if (profileRows.length > 0) {
    const profileId = profileRows[0].id as string;

    const rows = await sql`
      SELECT
        g.id,
        g.title,
        g.slug,
        g.status,
        COALESCE(g.views, 0) AS views,
        COALESCE(g.order_count, 0) AS order_count,
        COALESCE(g.rating_average, 0) AS rating_average,
        COALESCE(g.rating_count, 0) AS rating_count,
        COALESCE(
          (
            SELECT MIN(gp.price)
            FROM gig_packages gp
            WHERE gp.gig_id = g.id
          ),
          0
        ) AS price_from,
        COALESCE(
          (
            SELECT gp.currency
            FROM gig_packages gp
            WHERE gp.gig_id = g.id
            ORDER BY gp.price ASC
            LIMIT 1
          ),
          'EUR'
        ) AS currency,
        COALESCE(mc.name, 'Uncategorized') AS category_name,
        g.created_at
      FROM gigs g
      LEFT JOIN marketplace_categories mc ON g.category_id = mc.id
      WHERE g.freelancer_id = ${profileId}
      ORDER BY g.created_at DESC
    `;

    gigs = rows as SellerGig[];
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
            {t('gigWizard.myGigs')}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {gigs.length} gig{gigs.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href={`/${locale}/dashboard/seller/gigs/new`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus size={16} />
          {t('gigWizard.createGig')}
        </Link>
      </div>

      {/* Empty state */}
      {gigs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <Briefcase size={28} className="text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t('gigWizard.noGigs')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
            Start by creating your first gig to showcase your services to potential clients.
          </p>
          <Link
            href={`/${locale}/dashboard/seller/gigs/new`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Plus size={16} />
            {t('gigWizard.createFirst')}
          </Link>
        </div>
      )}

      {/* Gigs list */}
      {gigs.length > 0 && (
        <div className="space-y-3">
          {gigs.map((gig) => (
            <div
              key={gig.id}
              className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:border-primary/40 transition-colors"
            >
              {/* Gig info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {gig.title}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {gig.category_name}
                    </p>
                  </div>
                  <StatusBadge status={gig.status} />
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <Eye size={12} />
                    <span>{gig.views} {t('gigWizard.views')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <ShoppingBag size={12} />
                    <span>{gig.order_count} {t('gigWizard.orders')}</span>
                  </div>
                  {gig.rating_count > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <Star size={12} className="text-yellow-500" />
                      <span>{Number(gig.rating_average).toFixed(1)} ({gig.rating_count})</span>
                    </div>
                  )}
                  {Number(gig.price_from) > 0 && (
                    <div className="text-xs font-semibold text-primary">
                      From {gig.currency === 'EUR' ? '€' : gig.currency}{Number(gig.price_from).toFixed(0)}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0 flex items-center gap-2">
                <Link
                  href={`/${locale}/marketplace/gigs/${gig.slug}`}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
