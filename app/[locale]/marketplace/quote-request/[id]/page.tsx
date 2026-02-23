import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
  ChevronRight,
  MapPin,
  Calendar,
  Tag,
  Wallet,
  MessageSquare,
} from 'lucide-react';
import { sql } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-helpers';
import { safeText } from '@/lib/safe';
import { QuoteCompare } from '@/components/marketplace/QuoteCompare';
import type { QuoteData } from '@/components/marketplace/QuoteCard';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

interface QuoteRequestDetail {
  id: string;
  client_id: string;
  client_name: string;
  category_id: string;
  category_name: string;
  title: string;
  description: string;
  location_city: string | null;
  location_postcode: string | null;
  location_country: string;
  budget_indication: string | null;
  preferred_date: string | null;
  status: string;
  quote_count: number;
  created_at: string;
}

const BUDGET_LABELS: Record<string, string> = {
  under_100: 'Under \u20ac100',
  '100_500': '\u20ac100 \u2013 \u20ac500',
  '500_1000': '\u20ac500 \u2013 \u20ac1,000',
  '1000_5000': '\u20ac1,000 \u2013 \u20ac5,000',
  over_5000: '\u20ac5,000+',
};

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
    accepted: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    closed: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
  };
  const labels: Record<string, string> = {
    open: 'Open',
    accepted: 'Accepted',
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

export default async function QuoteRequestDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  const t = await getTranslations('quotes');

  const user = await getCurrentUser();

  // Fetch the quote request
  let quoteRequest: QuoteRequestDetail | null = null;
  try {
    const rows = await sql`
      SELECT
        qr.id,
        qr.client_id,
        COALESCE(u.name, u.email, 'Client') AS client_name,
        qr.category_id,
        COALESCE(mc.name, 'Uncategorized') AS category_name,
        qr.title,
        qr.description,
        qr.location_city,
        qr.location_postcode,
        qr.location_country,
        qr.budget_indication,
        qr.preferred_date,
        qr.status,
        COALESCE(qr.quote_count, 0) AS quote_count,
        qr.created_at
      FROM quote_requests qr
      LEFT JOIN users u ON qr.client_id = u.id
      LEFT JOIN marketplace_categories mc ON qr.category_id = mc.id
      WHERE qr.id = ${id}
      LIMIT 1
    `;
    if (rows.length > 0) {
      quoteRequest = rows[0] as QuoteRequestDetail;
    }
  } catch (error) {
    console.error('Error fetching quote request:', error);
  }

  if (!quoteRequest) {
    notFound();
  }

  const isOwner = user?.id === quoteRequest.client_id;

  // Fetch quotes for this request
  let quotes: QuoteData[] = [];
  try {
    const rows = await sql`
      SELECT
        q.id,
        q.quote_request_id,
        q.freelancer_id,
        COALESCE(fp.display_name, 'Unknown') AS freelancer_name,
        fp.avatar_url AS freelancer_avatar,
        COALESCE(fp.rating_average, 0) AS freelancer_rating,
        COALESCE(fp.rating_count, 0) AS freelancer_rating_count,
        COALESCE(fp.is_verified, false) AS freelancer_verified,
        fp.location_city AS freelancer_city,
        fp.location_country AS freelancer_country,
        COALESCE(q.amount, 0) AS amount,
        COALESCE(q.currency, 'EUR') AS currency,
        COALESCE(q.description, '') AS description,
        q.estimated_days,
        q.valid_until,
        COALESCE(q.status, 'pending') AS status,
        q.created_at
      FROM quotes q
      JOIN freelancer_profiles fp ON q.freelancer_id = fp.id
      WHERE q.quote_request_id = ${id}
      ORDER BY
        CASE q.status WHEN 'accepted' THEN 0 ELSE 1 END,
        q.amount ASC,
        q.created_at ASC
    `;

    quotes = rows.map((row) => ({
      id: String(row.id),
      quote_request_id: String(row.quote_request_id),
      freelancer_id: String(row.freelancer_id),
      freelancer_name: String(row.freelancer_name),
      freelancer_avatar: row.freelancer_avatar ? String(row.freelancer_avatar) : null,
      freelancer_rating: Number(row.freelancer_rating),
      freelancer_rating_count: Number(row.freelancer_rating_count),
      freelancer_verified: Boolean(row.freelancer_verified),
      freelancer_city: row.freelancer_city ? String(row.freelancer_city) : null,
      freelancer_country: row.freelancer_country ? String(row.freelancer_country) : null,
      amount: Number(row.amount),
      currency: String(row.currency),
      description: String(row.description),
      estimated_days: row.estimated_days ? Number(row.estimated_days) : null,
      valid_until: row.valid_until ? String(row.valid_until) : null,
      status: String(row.status),
      created_at: String(row.created_at),
    }));
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }

  const safeTitle = safeText(quoteRequest.title, 'Quote Request');
  const locationParts = [
    quoteRequest.location_city,
    quoteRequest.location_postcode,
    quoteRequest.location_country,
  ].filter(Boolean);
  const locationText = locationParts.join(', ');

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
            href={`/${locale}/marketplace/quote-request`}
            className="hover:text-primary transition-colors"
          >
            {t('title')}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-200 truncate max-w-xs">
            {safeTitle}
          </span>
        </nav>

        {/* Two-column layout */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Left: request details */}
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
                {/* Status + category */}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <StatusBadge status={quoteRequest.status} />
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {quoteRequest.category_name}
                  </span>
                </div>

                <h1 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {safeTitle}
                </h1>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                  {safeText(quoteRequest.description, '')}
                </p>

                {/* Meta details */}
                <div className="space-y-2.5 text-sm">
                  {locationText && (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span>{locationText}</span>
                    </div>
                  )}
                  {quoteRequest.budget_indication && (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Wallet className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span>
                        {BUDGET_LABELS[quoteRequest.budget_indication] ??
                          quoteRequest.budget_indication}
                      </span>
                    </div>
                  )}
                  {quoteRequest.preferred_date && (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span>{formatDate(quoteRequest.preferred_date)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <Tag className="w-4 h-4 flex-shrink-0 text-primary" />
                    <span>
                      {Number(quoteRequest.quote_count)} {t('quotesReceived')}
                    </span>
                  </div>
                </div>

                {/* Posted by */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Posted by{' '}
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {safeText(quoteRequest.client_name, 'Client')}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {formatDate(quoteRequest.created_at)}
                  </p>
                </div>
              </div>

              {/* CTA for freelancers */}
              {!isOwner && user && quoteRequest.status === 'open' && (
                <div className="bg-secondary/5 dark:bg-secondary/20 rounded-xl border border-secondary/20 p-4 text-center">
                  <MessageSquare className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Are you a professional who can help with this request?
                  </p>
                  <Link
                    href={`/${locale}/dashboard/seller/quotes`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-secondary text-white text-xs font-semibold hover:bg-secondary/90 transition-colors"
                  >
                    {t('sendQuote')}
                  </Link>
                </div>
              )}

              {!user && (
                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20 p-4 text-center">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    Sign in to submit a quote for this request.
                  </p>
                  <Link
                    href={`/${locale}/auth/signin`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right: compare quotes */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              {t('compareQuotes')}
              {quotes.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-400 dark:text-gray-500">
                  ({quotes.length})
                </span>
              )}
            </h2>

            <QuoteCompare
              quotes={quotes}
              quoteRequestId={id}
              isOwner={isOwner}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
