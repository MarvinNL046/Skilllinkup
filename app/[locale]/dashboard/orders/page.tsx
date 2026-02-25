import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ShoppingBag } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth-helpers';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { OrderCard } from '@/components/dashboard/OrderCard';

export const dynamic = 'force-dynamic';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export default async function ClientOrdersPage({ params }: PageProps) {
 const { locale } = await params;
 const t = await getTranslations('orders');

 const user = await getCurrentUser();
 if (!user) {
  redirect('/sign-in');
 }

 const { getToken } = await auth();
 const token = await getToken({ template: 'convex' });

 // Resolve the Convex user record from the Clerk ID
 const convexUser = await fetchQuery(
  api.users.getByClerkId,
  { clerkId: user.id },
  { token: token ?? undefined }
 );

 let orders: {
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
 }[] = [];

 if (convexUser) {
  const rawOrders = await fetchQuery(
   api.marketplace.orders.getByUser,
   { userId: convexUser._id, role: 'client' },
   { token: token ?? undefined }
  );

  // Map Convex camelCase fields to snake_case for OrderCard
  orders = rawOrders.map((o) => ({
   id: o._id,
   order_number: o.orderNumber ?? '',
   title: o.title ?? '',
   status: o.status ?? 'pending',
   amount: o.amount ?? 0,
   currency: o.currency ?? 'EUR',
   created_at: o.createdAt ? new Date(o.createdAt).toISOString() : '',
   delivery_deadline: o.deliveryDeadline
    ? new Date(o.deliveryDeadline).toISOString()
    : null,
   client_name: o.clientName ?? '',
   freelancer_name: o.freelancerName ?? '',
  }));
 }

 return (
  <div className="max-w-5xl mx-auto px-4 py-8">
   {/* Page header */}
   <div className="mb-8">
    <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
     {t('title')}
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
     <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
      {t('noOrdersClient')}
     </p>
     <Link
      href={`/${locale}/marketplace`}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
     >
      {t('browseGigs')}
     </Link>
    </div>
   )}

   {/* Orders list */}
   {orders.length > 0 && (
    <div className="space-y-3">
     {orders.map((order) => (
      <OrderCard
       key={order.id}
       order={order}
       role="client"
       locale={locale}
      />
     ))}
    </div>
   )}
  </div>
 );
}
