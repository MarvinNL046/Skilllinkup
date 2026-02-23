import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { sql } from '@/lib/db';
import { EarningsOverview, MonthlyDataPoint } from '@/components/dashboard/EarningsOverview';
import { TransactionList, Transaction } from '@/components/dashboard/TransactionList';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SellerEarningsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations('dashboard.earnings');

  const user = await getCurrentUser();
  if (!user) {
    redirect(`/${locale}/auth/signin`);
  }

  // Get freelancer profile
  const profileRows = await sql`
    SELECT id, total_earnings
    FROM freelancer_profiles
    WHERE user_id = ${user.id}
    LIMIT 1
  `;

  // Default empty data when no profile exists
  let pendingBalance = 0;
  let availableBalance = 0;
  let totalEarned = 0;
  let thisMonth = 0;
  let monthlyData: MonthlyDataPoint[] = [];
  let transactions: Transaction[] = [];

  if (profileRows && profileRows.length > 0) {
    const profile = profileRows[0];
    const profileId = profile.id as string;

    // Pending balance: escrow held for in-progress orders
    const pendingRows = await sql`
      SELECT COALESCE(SUM(freelancer_earnings), 0) AS total
      FROM orders
      WHERE freelancer_id = ${profileId}
        AND status IN ('active', 'delivered', 'revision')
        AND escrow_status = 'held'
    `;
    pendingBalance = Number(pendingRows[0]?.total ?? 0);

    // Available balance: released escrow from completed orders
    const availableRows = await sql`
      SELECT COALESCE(SUM(freelancer_earnings), 0) AS total
      FROM orders
      WHERE freelancer_id = ${profileId}
        AND status = 'completed'
        AND escrow_status = 'released'
    `;
    availableBalance = Number(availableRows[0]?.total ?? 0);

    // Total lifetime earnings from profile
    totalEarned = Number(profile.total_earnings ?? 0);

    // This month
    const thisMonthRows = await sql`
      SELECT COALESCE(SUM(freelancer_earnings), 0) AS total
      FROM orders
      WHERE freelancer_id = ${profileId}
        AND status = 'completed'
        AND completed_at >= DATE_TRUNC('month', NOW())
    `;
    thisMonth = Number(thisMonthRows[0]?.total ?? 0);

    // Monthly chart: last 6 months
    const monthlyRows = await sql`
      SELECT
        TO_CHAR(DATE_TRUNC('month', completed_at), 'YYYY-MM') AS month,
        TO_CHAR(DATE_TRUNC('month', completed_at), 'Mon YYYY') AS month_label,
        COALESCE(SUM(freelancer_earnings), 0) AS total
      FROM orders
      WHERE freelancer_id = ${profileId}
        AND status = 'completed'
        AND completed_at >= DATE_TRUNC('month', NOW()) - INTERVAL '5 months'
      GROUP BY DATE_TRUNC('month', completed_at)
      ORDER BY DATE_TRUNC('month', completed_at) ASC
    `;

    monthlyData = monthlyRows.map((row) => ({
      month: String(row.month ?? ''),
      monthLabel: String(row.month_label ?? ''),
      total: Number(row.total ?? 0),
    }));

    // Recent transactions
    const transactionRows = await sql`
      SELECT
        t.id,
        t.order_id,
        t.amount,
        t.platform_fee,
        t.transaction_type,
        t.status,
        t.created_at,
        COALESCE(o.order_number, '') AS order_number,
        COALESCE(o.title, '') AS order_title
      FROM transactions t
      LEFT JOIN orders o ON t.order_id = o.id
      WHERE t.payee_id = ${user.id}
      ORDER BY t.created_at DESC
      LIMIT 50
    `;

    transactions = transactionRows.map((row) => ({
      id: String(row.id ?? ''),
      orderId: row.order_id ? String(row.order_id) : null,
      orderNumber: String(row.order_number ?? ''),
      orderTitle: String(row.order_title ?? ''),
      amount: Number(row.amount ?? 0),
      platformFee: Number(row.platform_fee ?? 0),
      transactionType: String(row.transaction_type ?? 'payment'),
      status: String(row.status ?? 'completed'),
      createdAt: row.created_at
        ? new Date(row.created_at as string).toISOString()
        : new Date().toISOString(),
    }));
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
