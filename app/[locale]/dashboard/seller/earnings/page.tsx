import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs/server';
import { EarningsOverview, MonthlyDataPoint } from '@/components/dashboard/EarningsOverview';
import { TransactionList, Transaction } from '@/components/dashboard/TransactionList';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SellerEarningsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('dashboard.earnings');

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

  let pendingBalance = 0;
  let availableBalance = 0;
  let totalEarned = 0;
  let thisMonth = 0;
  let monthlyData: MonthlyDataPoint[] = [];
  let transactions: Transaction[] = [];

  if (convexUser) {
    // Fetch freelancer profile
    const profile = await fetchQuery(
      api.marketplace.freelancers.getByUserId,
      { userId: convexUser._id },
      { token: token ?? undefined }
    );

    if (profile) {
      // Use totalEarnings from the profile document
      totalEarned = profile.totalEarnings ?? 0;

      // Fetch all orders for this freelancer to compute balances
      const allOrders = await fetchQuery(
        api.marketplace.orders.getByUser,
        { userId: convexUser._id, role: 'freelancer', limit: 500 },
        { token: token ?? undefined }
      );

      // Pending balance: escrow held for in-progress orders
      pendingBalance = allOrders
        .filter(
          (o) =>
            ['active', 'delivered', 'revision_requested'].includes(o.status) &&
            o.escrowStatus === 'held'
        )
        .reduce((sum, o) => sum + (o.freelancerEarnings ?? 0), 0);

      // Available balance: released escrow from completed orders
      availableBalance = allOrders
        .filter((o) => o.status === 'completed' && o.escrowStatus === 'released')
        .reduce((sum, o) => sum + (o.freelancerEarnings ?? 0), 0);

      // This month earnings
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      const startOfMonthMs = startOfMonth.getTime();

      thisMonth = allOrders
        .filter(
          (o) =>
            o.status === 'completed' &&
            o.completedAt !== undefined &&
            o.completedAt !== null &&
            (o.completedAt as number) >= startOfMonthMs
        )
        .reduce((sum, o) => sum + (o.freelancerEarnings ?? 0), 0);

      // Monthly chart: last 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
      sixMonthsAgo.setDate(1);
      sixMonthsAgo.setHours(0, 0, 0, 0);
      const sixMonthsAgoMs = sixMonthsAgo.getTime();

      const completedOrders = allOrders.filter(
        (o) =>
          o.status === 'completed' &&
          o.completedAt !== undefined &&
          o.completedAt !== null &&
          (o.completedAt as number) >= sixMonthsAgoMs
      );

      // Aggregate by month
      const monthMap = new Map<string, { label: string; total: number }>();
      for (const order of completedOrders) {
        const date = new Date(order.completedAt as number);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const key = `${year}-${month}`;
        const label = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        const existing = monthMap.get(key);
        if (existing) {
          existing.total += order.freelancerEarnings ?? 0;
        } else {
          monthMap.set(key, { label, total: order.freelancerEarnings ?? 0 });
        }
      }

      monthlyData = Array.from(monthMap.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([month, { label, total }]) => ({
          month,
          monthLabel: label,
          total,
        }));

      // Build transactions from completed orders (no dedicated transactions table query yet)
      transactions = allOrders
        .slice(0, 50)
        .map((order) => ({
          id: order._id as string,
          orderId: order._id as string,
          orderNumber: order.orderNumber,
          orderTitle: order.title,
          amount: order.amount,
          platformFee: order.platformFee,
          transactionType: 'payment',
          status: order.status === 'completed' ? 'completed' : 'pending',
          createdAt: new Date(order.createdAt).toISOString(),
        }));
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto w-full">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
          {t('title')}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t('overview')}
        </p>
      </div>

      {/* Earnings stats and chart */}
      <div className="mb-8">
        <EarningsOverview
          pendingBalance={pendingBalance}
          availableBalance={availableBalance}
          totalEarned={totalEarned}
          thisMonth={thisMonth}
          monthlyData={monthlyData}
        />
      </div>

      {/* Transaction history */}
      <TransactionList transactions={transactions} />
    </div>
  );
}
