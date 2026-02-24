import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth-helpers';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { DisputeForm } from '@/components/marketplace/DisputeForm';
import { DisputeTimeline } from '@/components/marketplace/DisputeTimeline';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import type { Id } from '@/convex/_generated/dataModel';

export const dynamic = 'force-dynamic';

interface PageProps {
 params: Promise<{ locale: string; id: string }>;
}

function formatCurrency(amount: number, currency: string): string {
 const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
 return `${symbol}${Number(amount).toFixed(2)}`;
}

export default async function DisputePage({ params }: PageProps) {
 const { locale, id: orderId } = await params;

 const user = await getCurrentUser();
 if (!user) {
  redirect('/handler/sign-in');
 }

 const { getToken } = await auth();
 const token = await getToken({ template: 'convex' });

 // Fetch order via Convex
 let order: {
  id: string;
  order_number: string;
  title: string;
  amount: number;
  currency: string;
  status: string;
  freelancer_name: string;
  client_name: string;
 } | null = null;

 try {
  const raw = await fetchQuery(
   api.marketplace.orders.getById,
   { orderId: orderId as Id<'orders'> },
   { token: token ?? undefined }
  );

  if (raw) {
   order = {
    id: raw._id,
    order_number: raw.orderNumber ?? '',
    title: raw.title ?? '',
    amount: raw.amount ?? 0,
    currency: raw.currency ?? 'EUR',
    status: raw.status ?? 'pending',
    freelancer_name: raw.freelancerName ?? '',
    client_name: raw.clientName ?? '',
   };
  }
 } catch {
  // Access denied or not found
 }

 if (!order) {
  redirect(`/${locale}/dashboard/orders`);
 }

 // Fetch existing dispute via Convex
 let existingDispute: {
  id: string;
  order_id: string;
  opened_by: string;
  reason: string;
  description: string;
  evidence: { type: 'text' | 'url'; content: string }[];
  resolution: string | null;
  resolution_note: string | null;
  resolved_by: string | null;
  status: string;
  opened_at: string;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
 } | null = null;

 try {
  const raw = await fetchQuery(
   api.marketplace.disputes.getByOrder,
   { orderId: orderId as Id<'orders'> },
   { token: token ?? undefined }
  );

  if (raw) {
   existingDispute = {
    id: raw._id,
    order_id: String(raw.orderId),
    opened_by: String(raw.openedBy),
    reason: raw.reason ?? '',
    description: raw.description ?? '',
    evidence: (raw.evidence ?? []) as { type: 'text' | 'url'; content: string }[],
    resolution: raw.resolution ?? null,
    resolution_note: raw.resolutionNote ?? null,
    resolved_by: raw.resolvedBy ? String(raw.resolvedBy) : null,
    status: raw.status ?? 'open',
    opened_at: raw.openedAt ? new Date(raw.openedAt).toISOString() : '',
    resolved_at: raw.resolvedAt ? new Date(raw.resolvedAt).toISOString() : null,
    created_at: raw.createdAt ? new Date(raw.createdAt).toISOString() : '',
    updated_at: raw.updatedAt ? new Date(raw.updatedAt).toISOString() : '',
   };
  }
 } catch {
  // Proceed without dispute data
 }

 // Determine if the user can open a new dispute
 const canOpenDispute =
  !existingDispute &&
  (order.status === 'delivered' || order.status === 'active');

 return (
  <div className="max-w-3xl mx-auto px-4 py-8">
   {/* Back link */}
   <Link
    href={`/${locale}/dashboard/orders/${orderId}`}
    className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-6"
   >
    <ArrowLeft size={16} />
    Back to order
   </Link>

   {/* Page header */}
   <div className="flex items-center gap-3 mb-8">
    <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
     <AlertTriangle size={20} className="text-red-500" />
    </div>
    <div>
     <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
      {existingDispute ? 'Dispute Details' : 'Open Dispute'}
     </h1>
     <p className="text-sm text-gray-500 dark:text-gray-400">
      Order #{order.order_number}
     </p>
    </div>
   </div>

   {/* Order summary card */}
   <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 mb-6">
    <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
     Order Summary
    </h2>
    <div className="flex items-start justify-between gap-4 flex-wrap">
     <div>
      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
       {order.title}
      </p>
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
       <span>Freelancer: {order.freelancer_name}</span>
       <span>•</span>
       <span>Client: {order.client_name}</span>
      </div>
     </div>
     <div className="text-right">
      <p className="text-base font-bold text-gray-900 dark:text-white">
       {formatCurrency(order.amount, order.currency)}
      </p>
      <span
       className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
        order.status === 'disputed'
         ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
         : order.status === 'delivered'
         ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
         : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
       }`}
      >
       {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
      </span>
     </div>
    </div>
   </div>

   {/* Dispute content */}
   <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
    {existingDispute ? (
     <>
      <h2 className="text-base font-heading font-semibold text-gray-900 dark:text-white mb-5">
       Dispute Status
      </h2>
      <DisputeTimeline dispute={existingDispute} />
     </>
    ) : canOpenDispute ? (
     <>
      <h2 className="text-base font-heading font-semibold text-gray-900 dark:text-white mb-5">
       Open Dispute
      </h2>
      <DisputeForm orderId={orderId} locale={locale} />
     </>
    ) : (
     <div className="text-center py-8">
      <AlertTriangle
       size={32}
       className="text-gray-300 dark:text-gray-700 mx-auto mb-3"
      />
      <p className="text-sm text-gray-500 dark:text-gray-400">
       {order.status === 'completed'
        ? 'This order has been completed. Disputes can only be opened for active or delivered orders.'
        : order.status === 'cancelled'
        ? 'This order has been cancelled. No dispute can be opened.'
        : `Disputes cannot be opened for orders with status: ${order.status}`}
      </p>
      <Link
       href={`/${locale}/dashboard/orders/${orderId}`}
       className="mt-4 inline-block text-sm text-primary hover:underline"
      >
       Return to order
      </Link>
     </div>
    )}
   </div>
  </div>
 );
}
