import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth-helpers';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { ClientOrderDetailClient } from './ClientOrderDetailClient';
import type { Id } from '@/convex/_generated/dataModel';

export const dynamic = 'force-dynamic';

interface PageProps {
 params: Promise<{ locale: string; id: string }>;
}

export default async function ClientOrderDetailPage({ params }: PageProps) {
 const { locale, id } = await params;

 const user = await getCurrentUser();
 if (!user) {
  redirect('/sign-in');
 }

 const { getToken } = await auth();
 const token = await getToken({ template: 'convex' });

 let order: any = null;
 try {
  const raw = await fetchQuery(
   api.marketplace.orders.getById,
   { orderId: id as Id<'orders'> },
   { token: token ?? undefined }
  );

  if (raw) {
   // Map Convex camelCase to snake_case for ClientOrderDetailClient
   order = {
    id: raw._id,
    order_number: raw.orderNumber ?? '',
    order_type: raw.orderType ?? 'gig',
    title: raw.title ?? '',
    amount: raw.amount ?? 0,
    platform_fee: raw.platformFee ?? 0,
    freelancer_earnings: raw.freelancerEarnings ?? 0,
    currency: raw.currency ?? 'EUR',
    status: raw.status ?? 'pending',
    escrow_status: raw.escrowStatus ?? 'held',
    delivery_deadline: raw.deliveryDeadline
     ? new Date(raw.deliveryDeadline).toISOString()
     : null,
    client_name: raw.clientName ?? '',
    freelancer_name: raw.freelancerName ?? '',
    created_at: raw.createdAt ? new Date(raw.createdAt).toISOString() : '',
    completed_at: raw.completedAt
     ? new Date(raw.completedAt).toISOString()
     : null,
    revision_count: raw.revisionCount ?? 0,
    revisions_used: raw.revisionsUsed ?? 0,
    requirements: null,
   };
  }
 } catch {
  // Access denied or order not found — redirect to list
 }

 if (!order) {
  redirect(`/${locale}/dashboard/orders`);
 }

 return <ClientOrderDetailClient order={order} locale={locale} />;
}
