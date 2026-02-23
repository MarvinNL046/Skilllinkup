import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import {
  FileText,
  MapPin,
  Wallet,
  Calendar,
  Tag,
  ChevronRight,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth-helpers';
import { sql } from '@/lib/db';
import { SendQuoteForm } from '@/components/marketplace/SendQuoteForm';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string }>;
}

interface QuoteRequestRow {
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
  already_quoted: boolean;
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
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default async function SellerQuotesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('quotes');

  const user = await getCurrentUser();
  if (!user) {
    redirect(`/${locale}/auth/signin`);
  }

  // Get freelancer profile (if any)
  let freelancerProfileId: string | null = null;
  let freelancerCategoryId: string | null = null;
  let freelancerCity: string | null = null;
  let freelancerCountry: string | null = null;

  try {
    const profileRows = await sql`
      SELECT id, location_city, location_country
      FROM freelancer_profiles
      WHERE user_id = ${user.id}
        AND status = 'active'
      LIMIT 1
    `;
    if (profileRows.length > 0) {
      freelancerProfileId = String(profileRows[0].id);
      freelancerCity = profileRows[0].location_city
        ? String(profileRows[0].location_city)
        : null;
      freelancerCountry = profileRows[0].location_country
        ? String(profileRows[0].location_country)
        : null;
    }
  } catch (error) {
    console.error('Error fetching freelancer profile:', error);
  }

  // Fetch open quote requests matching the freelancer's location/category
  let requests: QuoteRequestRow[] = [];
  try {
    if (freelancerProfileId) {
      // Match by country if available; otherwise fetch all open requests
      let rows;
      if (freelancerCountry) {
        rows = await sql`
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
            qr.created_at,
            EXISTS (
              SELECT 1 FROM quotes q
              WHERE q.quote_request_id = qr.id
                AND q.freelancer_id = ${freelancerProfileId}
            ) AS already_quoted
          FROM quote_requests qr
          LEFT JOIN users u ON qr.client_id = u.id
          LEFT JOIN marketplace_categories mc ON qr.category_id = mc.id
          WHERE qr.status = 'open'
            AND qr.client_id != ${user.id}
            AND qr.location_country = ${freelancerCountry}
          ORDER BY qr.created_at DESC
          LIMIT 50
        `;
      } else {
        rows = await sql`
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
            qr.created_at,
            EXISTS (
              SELECT 1 FROM quotes q
              WHERE q.quote_request_id = qr.id
                AND q.freelancer_id = ${freelancerProfileId}
            ) AS already_quoted
          FROM quote_requests qr
          LEFT JOIN users u ON qr.client_id = u.id
          LEFT JOIN marketplace_categories mc ON qr.category_id = mc.id
          WHERE qr.status = 'open'
            AND qr.client_id != ${user.id}
          ORDER BY qr.created_at DESC
          LIMIT 50
        `;
      }

      requests = rows.map((row) => ({
        id: String(row.id),
        client_id: String(row.client_id),
        client_name: String(row.client_name),
        category_id: String(row.category_id),
        category_name: String(row.category_name),
        title: String(row.title),
        description: String(row.description),
        location_city: row.location_city ? String(row.location_city) : null,
        location_postcode: row.location_postcode
          ? String(row.location_postcode)
          : null,
        location_country: String(row.location_country),
        budget_indication: row.budget_indication
          ? String(row.budget_indication)
          : null,
        preferred_date: row.preferred_date ? String(row.preferred_date) : null,
        status: String(row.status),
        quote_count: Number(row.quote_count),
        created_at: String(row.created_at),
        already_quoted: Boolean(row.already_quoted),
      }));
    }
  } catch (error) {
    console.error('Error fetching quote requests:', error);
  }

  const hasProfile = freelancerProfileId !== null;

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto w-full">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
          {t('incomingRequests')}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {hasProfile
            ? `${requests.length} open request${requests.length !== 1 ? 's' : ''} matching your profile`
            : 'Set up your freelancer profile to see matching quote requests'}
        </p>
      </div>

      {/* No profile notice */}
      {!hasProfile && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 text-center">
          <FileText className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
            No Freelancer Profile
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            You need an active freelancer profile to respond to quote requests.
          </p>
          <Link
            href={`/${locale}/dashboard/seller/profile`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Set Up Profile
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* No requests */}
      {hasProfile && requests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <FileText size={28} className="text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t('noRequests')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
            New quote requests will appear here when clients post requests
            {freelancerCountry ? ` in ${freelancerCountry}` : ''}.
          </p>
        </div>
      )}

      {/* Quote requests list */}
      {hasProfile && requests.length > 0 && (
        <div className="space-y-4">
          {requests.map((req) => {
            const locationParts = [
              req.location_city,
              req.location_postcode,
              req.location_country,
            ].filter(Boolean);
            const locationText = locationParts.join(', ');

            return (
              <div
                key={req.id}
                className={`bg-white dark:bg-gray-800 rounded-xl border p-5 transition-colors ${
                  req.already_quoted
                    ? 'border-accent/30 bg-accent/5 dark:bg-accent/5'
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Header row */}
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                        {req.category_name}
                      </span>
                      {req.already_quoted && (
                        <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                          Quote Sent
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <Link
                      href={`/${locale}/marketplace/quote-request/${req.id}`}
                      className="block group"
                    >
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1">
                        {req.title}
                      </h3>
                    </Link>

                    {/* Description excerpt */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {req.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-400 dark:text-gray-500">
                      {locationText && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          <span>{locationText}</span>
                        </div>
                      )}
                      {req.budget_indication && (
                        <div className="flex items-center gap-1">
                          <Wallet className="w-3.5 h-3.5 text-primary" />
                          <span>
                            {BUDGET_LABELS[req.budget_indication] ??
                              req.budget_indication}
                          </span>
                        </div>
                      )}
                      {req.preferred_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>{formatDate(req.preferred_date)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        <span>
                          {req.quote_count} {t('quotesReceived')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {formatDate(req.created_at)}
                    </p>
                    <Link
                      href={`/${locale}/marketplace/quote-request/${req.id}`}
                      className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      View
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Send quote form (inline) */}
                {!req.already_quoted && req.status === 'open' && (
                  <SendQuoteForm
                    quoteRequestId={req.id}
                    quoteRequestTitle={req.title}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
