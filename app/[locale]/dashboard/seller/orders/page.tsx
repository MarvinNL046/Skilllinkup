import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ShoppingBag } from 'lucide-react';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { OrderCard } from '@/components/dashboard/OrderCard';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SellerOrdersPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('orders');

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

  // Fetch orders as freelancer
  let orders: Array<{
    id: string;
    order_number: string;
    title: string;
    status: string;
    amount: number;
    currency: string;
    created_at: string;
    delivery_deadline: string | null;
    client_name: string;
    freelancer_name: string;
  }> = [];

  if (convexUser) {
    const rawOrders = await fetchQuery(
      api.marketplace.orders.getByUser,
      { userId: convexUser._id, role: 'freelancer' },
      { token: token ?? undefined }
    );

    // Map Convex camelCase to snake_case expected by OrderCard
    orders = rawOrders.map((order) => ({
      id: order._id,
      order_number: order.orderNumber,
      title: order.title,
      status: order.status,
      amount: order.amount,
      currency: order.currency ?? 'EUR',
      created_at: new Date(order.createdAt).toISOString(),
      delivery_deadline: order.deliveryDeadline
        ? new Date(order.deliveryDeadline).toISOString()
        : null,
      client_name: order.clientName ?? 'Client',
      freelancer_name: order.freelancerName ?? 'Freelancer',
    }));
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto w-full">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
          {t('sellerOrders')}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {orders.length} order{orders.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Empty state */}
      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <ShoppingBag size={28} className="text-gray-400 dark:text-gray-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t('noOrders')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
            {t('noOrdersDesc')}
          </p>
        </div>
      )}

      {/* Orders list */}
      {orders.length > 0 && (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              role="seller"
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
}
