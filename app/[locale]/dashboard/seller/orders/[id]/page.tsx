import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth-helpers';
import { getOrderById } from '@/lib/marketplace-queries';
import { SellerOrderDetailClient } from './SellerOrderDetailClient';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
 params: Promise<{ locale: string; id: string }>;
}

export default async function SellerOrderDetailPage({ params }: PageProps) {
 const { locale, id } = await params;

 const user = await getCurrentUser();
 if (!user) {
 redirect('/handler/sign-in');
 }

 const order = await getOrderById(id, user.id);
 if (!order) {
 redirect(`/${locale}/dashboard/seller/orders`);
 }

 return <SellerOrderDetailClient order={order} locale={locale} />;
}
