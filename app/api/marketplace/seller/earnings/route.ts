import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/marketplace/seller/earnings
export async function GET() {
 try {
 const user = await requireAuth();

 // Get freelancer profile for this user
 const profileRows = await sql`
 SELECT id, total_earnings
 FROM freelancer_profiles
 WHERE user_id = ${user.id}
 LIMIT 1
 `;

 if (!profileRows || profileRows.length === 0) {
 return NextResponse.json({
 pendingBalance: 0,
 availableBalance: 0,
 totalEarned: 0,
 thisMonth: 0,
 monthlyData: [],
 transactions: [],
 });
 }

 const profile = profileRows[0];
 const profileId = profile.id as string;

 // Pending balance: money in escrow waiting for delivery approval
 const pendingRows = await sql`
 SELECT COALESCE(SUM(freelancer_earnings), 0) AS total
 FROM orders
 WHERE freelancer_id = ${profileId}
 AND status IN ('active', 'delivered', 'revision')
 AND escrow_status = 'held'
 `;

 // Available balance: completed orders with released escrow
 const availableRows = await sql`
 SELECT COALESCE(SUM(freelancer_earnings), 0) AS total
 FROM orders
 WHERE freelancer_id = ${profileId}
 AND status = 'completed'
 AND escrow_status = 'released'
 `;

 // This month earnings
 const thisMonthRows = await sql`
 SELECT COALESCE(SUM(freelancer_earnings), 0) AS total
 FROM orders
 WHERE freelancer_id = ${profileId}
 AND status = 'completed'
 AND completed_at >= DATE_TRUNC('month', NOW())
 `;

 // Monthly chart data: last 6 months of completed order earnings
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

 return NextResponse.json({
 pendingBalance: Number(pendingRows[0]?.total ?? 0),
 availableBalance: Number(availableRows[0]?.total ?? 0),
 totalEarned: Number(profile.total_earnings ?? 0),
 thisMonth: Number(thisMonthRows[0]?.total ?? 0),
 monthlyData: monthlyRows.map((row) =>({
 month: String(row.month ?? ''),
 monthLabel: String(row.month_label ?? ''),
 total: Number(row.total ?? 0),
 })),
 transactions: transactionRows.map((row) =>({
 id: String(row.id ?? ''),
 orderId: row.order_id ? String(row.order_id) : null,
 orderNumber: String(row.order_number ?? ''),
 orderTitle: String(row.order_title ?? ''),
 amount: Number(row.amount ?? 0),
 platformFee: Number(row.platform_fee ?? 0),
 transactionType: String(row.transaction_type ?? 'payment'),
 status: String(row.status ?? 'completed'),
 createdAt: row.created_at ? new Date(row.created_at as string).toISOString() : new Date().toISOString(),
 })),
 });
 } catch (err) {
 if (err instanceof Error && err.message === 'Unauthorized') {
 return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 }
 console.error('GET /api/marketplace/seller/earnings error:', err);
 return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}
