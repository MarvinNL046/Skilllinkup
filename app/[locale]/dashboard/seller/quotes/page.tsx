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
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { SendQuoteForm } from '@/components/marketplace/SendQuoteForm';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const BUDGET_LABELS: Record<string, string> = {
  under_100: 'Under \u20ac100',
  '100_500': '\u20ac100 \u2013 \u20ac500',
  '500_1000': '\u20ac500 \u2013 \u20ac1,000',
  '1000_5000': '\u20ac1,000 \u2013 \u20ac5,000',
  over_5000: '\u20ac5,000+',
};

function formatDate(ms: number | string): string {
  try {
    const date = typeof ms === 'number' ? new Date(ms) : new Date(ms);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return String(ms);
  }
}

export default async function SellerQuotesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('quotes');

  const { getToken, userId: clerkId } = await auth();
  if (!clerkId) {
    redirect('/sign-in');
  }

  const token = await getToken({ template: 'convex' });

  // Fetch Convex user by Clerk ID
  const convexUser = await fetchQuery(
    api.users.getByClerkId,
    { clerkId },
    { token: token ?? undefined }
  );

  // Fetch freelancer profile
  let profile: any = null;
  if (convexUser) {
    profile = await fetchQuery(
      api.marketplace.freelancers.getByUserId,
      { userId: convexUser._id },
      { token: token ?? undefined }
    );
  }

  const hasProfile = profile !== null && profile.status === 'active';

  // Fetch open quote requests
  const rawRequests = hasProfile
    ? await fetchQuery(
        api.marketplace.quotes.listRequests,
        { limit: 50 },
        { token: token ?? undefined }
      )
    : [];

  // Filter out own requests and apply country filter if available
  const freelancerCountry = profile?.locationCountry ?? null;
  const filteredRequests = rawRequests.filter((req) => {
    // Exclude requests from the current user
    if (convexUser && req.clientId === convexUser._id) return false;
    // If freelancer has a country set, filter by matching country
    if (freelancerCountry && req.locationCountry) {
      return req.locationCountry === freelancerCountry;
    }
    return true;
  });

  // Map to component-friendly shape
  const requests = filteredRequests.map((req) => ({
    id: req._id as string,
    client_id: req.clientId as string,
    client_name: req.clientName ?? 'Client',
    category_id: req.categoryId as string,
    category_name: req.categoryName ?? 'Uncategorized',
    title: req.title,
    description: req.description,
    location_city: req.locationCity ?? null,
    location_postcode: req.locationPostcode ?? null,
    location_country: req.locationCountry ?? '',
    budget_indication: req.budgetIndication ?? null,
    preferred_date: req.preferredDate ? req.preferredDate : null,
    status: req.status,
    quote_count: req.quoteCount ?? 0,
    created_at: req.createdAt,
    already_quoted: false, // Convex listRequests does not include this; a dedicated query could be added later
  }));

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
                            {BUDGET_LABELS[req.budget_indication] ?? req.budget_indication}
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
