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
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { getCurrentUser } from '@/lib/auth-helpers';
import { safeText } from '@/lib/safe';
import { QuoteCompare } from '@/components/marketplace/QuoteCompare';
import type { QuoteData } from '@/components/marketplace/QuoteCard';
import type { Id } from '@/convex/_generated/dataModel';

export const dynamic = 'force-dynamic';

interface PageProps {
 params: Promise<{ locale: string; id: string }>;
}

const BUDGET_LABELS: Record<string, string> = {
 under_100: 'Under \u20ac100',
 '100_500': '\u20ac100 \u2013 \u20ac500',
 '500_1000': '\u20ac500 \u2013 \u20ac1,000',
 '1000_5000': '\u20ac1,000 \u2013 \u20ac5,000',
 over_5000: '\u20ac5,000+',
};

function formatDate(dateVal: string | number): string {
 try {
 return new Intl.DateTimeFormat('en-US', {
 month: 'long',
 day: 'numeric',
 year: 'numeric',
 }).format(new Date(typeof dateVal === 'number' ? dateVal : dateVal));
 } catch {
 return String(dateVal);
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

 // Fetch the quote request via Convex
 let quoteRequestData: Awaited<ReturnType<typeof fetchQuery<typeof api.marketplace.quotes.getRequestById>>> = null;
 try {
 quoteRequestData = await fetchQuery(api.marketplace.quotes.getRequestById, {
 requestId: id as Id<'quoteRequests'>,
 });
 } catch (error) {
 console.error('Error fetching quote request:', error);
 }

 if (!quoteRequestData) {
 notFound();
 }

 const isOwner = user?.id === quoteRequestData.clientId;

 // Map Convex quotes to QuoteData shape expected by QuoteCompare
 const quotes: QuoteData[] = (quoteRequestData.quotes ?? []).map((q) => ({
 id: q._id,
 quote_request_id: quoteRequestData!._id,
 freelancer_id: q.freelancerId,
 freelancer_name: q.freelancerProfile?.displayName ?? 'Unknown',
 freelancer_avatar: q.freelancerProfile?.avatarUrl ?? null,
 freelancer_rating: Number(q.freelancerProfile?.ratingAverage ?? 0),
 freelancer_rating_count: Number(q.freelancerProfile?.ratingCount ?? 0),
 freelancer_verified: q.freelancerProfile?.isVerified ?? false,
 freelancer_city: null,
 freelancer_country: null,
 amount: Number(q.amount),
 currency: q.currency ?? 'EUR',
 description: q.description,
 estimated_days: q.estimatedDays ?? null,
 valid_until: q.validUntil ? new Date(q.validUntil).toISOString() : null,
 status: q.status,
 created_at: new Date(q.createdAt).toISOString(),
 }));

 const safeTitle = safeText(quoteRequestData.title, 'Quote Request');
 const locationParts = [
 quoteRequestData.locationCity,
 quoteRequestData.locationPostcode,
 quoteRequestData.locationCountry,
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
 <StatusBadge status={quoteRequestData.status} />
 <span className="text-xs text-gray-400 dark:text-gray-500">
 {quoteRequestData.categoryName}
 </span>
 </div>

 <h1 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 leading-tight">
 {safeTitle}
 </h1>

 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
 {safeText(quoteRequestData.description, '')}
 </p>

 {/* Meta details */}
 <div className="space-y-2.5 text-sm">
 {locationText && (
 <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
 <MapPin className="w-4 h-4 flex-shrink-0 text-primary" />
 <span>{locationText}</span>
 </div>
 )}
 {quoteRequestData.budgetIndication && (
 <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
 <Wallet className="w-4 h-4 flex-shrink-0 text-primary" />
 <span>
 {BUDGET_LABELS[quoteRequestData.budgetIndication] ??
 quoteRequestData.budgetIndication}
 </span>
 </div>
 )}
 {quoteRequestData.preferredDate && (
 <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
 <Calendar className="w-4 h-4 flex-shrink-0 text-primary" />
 <span>{formatDate(quoteRequestData.preferredDate)}</span>
 </div>
 )}
 <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
 <Tag className="w-4 h-4 flex-shrink-0 text-primary" />
 <span>
 {Number(quoteRequestData.quoteCount ?? 0)} {t('quotesReceived')}
 </span>
 </div>
 </div>

 {/* Posted by */}
 <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
 <p className="text-xs text-gray-400 dark:text-gray-500">
 Posted by{' '}
 <span className="font-medium text-gray-700 dark:text-gray-300">
 {safeText(quoteRequestData.clientName ?? null, 'Client')}
 </span>
 </p>
 <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
 {formatDate(quoteRequestData.createdAt)}
 </p>
 </div>
 </div>

 {/* CTA for freelancers */}
 {!isOwner && user && quoteRequestData.status === 'open' && (
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
 href="/handler/sign-in"
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
