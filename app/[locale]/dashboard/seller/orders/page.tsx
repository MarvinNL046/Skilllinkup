import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ShoppingBag } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth-helpers';
import { getOrdersByUser } from '@/lib/marketplace-queries';
import { OrderCard } from '@/components/dashboard/OrderCard';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SellerOrdersPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('orders');

  const user = await getCurrentUser();
  if (!user) {
    redirect('/handler/sign-in');
  }

  const orders = await getOrdersByUser(user.id, 'freelancer');

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
