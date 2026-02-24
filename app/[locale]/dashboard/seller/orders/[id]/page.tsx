import { redirect } from 'next/navigation';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import type { Id } from '@/convex/_generated/dataModel';
import { SellerOrderDetailClient } from './SellerOrderDetailClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function SellerOrderDetailPage({ params }: PageProps) {
  const { locale, id } = await params;

  const { getToken, userId: clerkId } = await auth();
  if (!clerkId) {
    redirect('/sign-in');
  }

  const token = await getToken({ template: 'convex' });

  let order: any = null;
  try {
    const rawOrder = await fetchQuery(
      api.marketplace.orders.getById,
      { orderId: id as Id<'orders'> },
      { token: token ?? undefined }
    );

    if (rawOrder) {
      // Map Convex camelCase to snake_case expected by SellerOrderDetailClient
      order = {
        id: rawOrder._id,
        order_number: rawOrder.orderNumber,
        order_type: rawOrder.orderType,
        title: rawOrder.title,
        amount: rawOrder.amount,
        platform_fee: rawOrder.platformFee,
        freelancer_earnings: rawOrder.freelancerEarnings,
        currency: rawOrder.currency ?? 'EUR',
        status: rawOrder.status,
        escrow_status: rawOrder.escrowStatus ?? 'held',
        delivery_deadline: rawOrder.deliveryDeadline
          ? new Date(rawOrder.deliveryDeadline).toISOString()
          : null,
        client_name: rawOrder.clientName ?? 'Client',
        freelancer_name: rawOrder.freelancerName ?? 'Freelancer',
        created_at: new Date(rawOrder.createdAt).toISOString(),
        completed_at: rawOrder.completedAt
          ? new Date(rawOrder.completedAt).toISOString()
          : null,
        revision_count: rawOrder.revisionCount ?? 0,
        revisions_used: rawOrder.revisionsUsed ?? 0,
        requirements: rawOrder.requirements ?? null,
      };
    }
  } catch {
    // Access denied or not found — redirect back to orders list
    redirect(`/${locale}/dashboard/seller/orders`);
  }

  if (!order) {
    redirect(`/${locale}/dashboard/seller/orders`);
  }

  return <SellerOrderDetailClient order={order} locale={locale} />;
}
