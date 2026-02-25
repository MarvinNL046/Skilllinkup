'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import type { Id } from '@/convex/_generated/dataModel';

export const dynamic = 'force-dynamic';

function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: string;
  color: string;
}) {
  return (
    <div className="col-sm-6 col-xl-3">
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p className="fz14 text-muted mb5">{label}</p>
            <h4 className="mb0 fw700 fz22">{value}</h4>
          </div>
          <div
            className={`icon rounded-circle d-flex align-items-center justify-content-center ${color}`}
            style={{ width: 50, height: 50 }}
          >
            <i className={`${icon} fz20`} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TransactionTypeBadge({ type }: { type: 'income' | 'fee' | 'refund' }) {
  const map = {
    income: { label: 'Income', cls: 'text-success' },
    fee: { label: 'Platform Fee', cls: 'text-danger' },
    refund: { label: 'Refund', cls: 'text-warning' },
  };
  const { label, cls } = map[type];
  return <span className={`fz13 fw500 ${cls}`}>{label}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    completed: 'text-success',
    pending: 'text-warning',
    cancelled: 'text-danger',
    in_progress: 'text-info',
  };
  const cls = map[status] ?? 'text-muted';
  return (
    <span className={`fz13 fw500 ${cls}`} style={{ textTransform: 'capitalize' }}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

type StatementRow = {
  id: string;
  orderNumber: string;
  title: string;
  date: number;
  gross: number;
  platformFee: number;
  net: number;
  currency: string;
  status: string;
  role: 'client' | 'freelancer';
};

export default function StatementsPage() {
  const { user: clerkUser, isLoaded } = useUser();

  const convexUser = useQuery(
    api.users.getByClerkId,
    isLoaded && clerkUser ? { clerkId: clerkUser.id } : 'skip'
  );

  const clientOrders = useQuery(
    api.marketplace.orders.getByUser,
    convexUser?._id
      ? { userId: convexUser._id as Id<'users'>, role: 'client', limit: 200 }
      : 'skip'
  );

  const freelancerOrders = useQuery(
    api.marketplace.orders.getByUser,
    convexUser?._id
      ? { userId: convexUser._id as Id<'users'>, role: 'freelancer', limit: 200 }
      : 'skip'
  );

  const loading =
    !isLoaded ||
    convexUser === undefined ||
    clientOrders === undefined ||
    freelancerOrders === undefined;

  // Build unified statement rows
  const rows: StatementRow[] = (() => {
    if (loading) return [];

    const seen = new Set<string>();
    const result: StatementRow[] = [];

    // Client purchases
    for (const o of clientOrders ?? []) {
      if (seen.has(o._id)) continue;
      seen.add(o._id);
      result.push({
        id: o._id,
        orderNumber: o.orderNumber,
        title: o.title,
        date: o.createdAt,
        gross: o.amount,
        platformFee: o.platformFee,
        net: o.amount,
        currency: o.currency ?? 'EUR',
        status: o.status,
        role: 'client',
      });
    }

    // Freelancer earnings
    for (const o of freelancerOrders ?? []) {
      if (seen.has(o._id)) continue;
      seen.add(o._id);
      result.push({
        id: o._id,
        orderNumber: o.orderNumber,
        title: o.title,
        date: o.createdAt,
        gross: o.amount,
        platformFee: o.platformFee,
        net: o.freelancerEarnings ?? 0,
        currency: o.currency ?? 'EUR',
        status: o.status,
        role: 'freelancer',
      });
    }

    return result.sort((a, b) => b.date - a.date);
  })();

  // Summary stats
  const netIncome = rows
    .filter((r) => r.role === 'freelancer' && r.status === 'completed')
    .reduce((sum, r) => sum + r.net, 0);

  const totalFees = rows
    .filter((r) => r.role === 'freelancer')
    .reduce((sum, r) => sum + r.platformFee, 0);

  const pendingClearance = rows
    .filter(
      (r) =>
        r.role === 'freelancer' &&
        ['in_progress', 'active', 'delivered', 'revision_requested'].includes(r.status)
    )
    .reduce((sum, r) => sum + r.net, 0);

  const availableBalance = rows
    .filter((r) => r.role === 'freelancer' && r.status === 'completed')
    .reduce((sum, r) => sum + r.net, 0);

  return (
    <div className="dashboard__main pl0-md">
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Statements</h2>
              <p className="text">Your complete financial transaction history</p>
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="row">
          <StatCard
            label="Net Income"
            value={loading ? '—' : formatCurrency(netIncome)}
            icon="flaticon-dollar"
            color="bgc-thm text-white"
          />
          <StatCard
            label="Available Balance"
            value={loading ? '—' : formatCurrency(availableBalance)}
            icon="flaticon-wallet"
            color="bgc-green text-white"
          />
          <StatCard
            label="Pending Clearance"
            value={loading ? '—' : formatCurrency(pendingClearance)}
            icon="flaticon-processing"
            color="bgc-dark-light2 text-white"
          />
          <StatCard
            label="Platform Fees"
            value={loading ? '—' : formatCurrency(totalFees)}
            icon="flaticon-web"
            color="bgc-purple text-white"
          />
        </div>

        {/* Transactions table */}
        <div className="row">
          <div className="col-lg-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <h4 className="mb25 fw600">All Transactions</h4>

              {loading && (
                <div className="text-center py30">
                  <div className="spinner-border text-thm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {!loading && rows.length === 0 && (
                <div className="text-center py30">
                  <span className="flaticon-web fz60 text-muted mb15 d-block" />
                  <h5>No transactions yet</h5>
                  <p className="fz14 text-muted">
                    Your financial transactions will appear here as you buy and sell services.
                  </p>
                </div>
              )}

              {!loading && rows.length > 0 && (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Order #</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date</th>
                        <th scope="col">Role</th>
                        <th scope="col">Gross</th>
                        <th scope="col">Fee</th>
                        <th scope="col">Net</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {rows.map((row) => (
                        <tr key={row.id}>
                          <td>
                            <span className="fw600 fz13">{row.orderNumber}</span>
                          </td>
                          <td>
                            <span
                              className="fz14"
                              style={{
                                maxWidth: 180,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                display: 'inline-block',
                              }}
                            >
                              {row.title}
                            </span>
                          </td>
                          <td>
                            <span className="fz13 text-muted">
                              {formatDate(row.date)}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`fz13 fw500 ${row.role === 'freelancer' ? 'text-thm' : 'text-info'}`}
                            >
                              {row.role === 'freelancer' ? 'Seller' : 'Buyer'}
                            </span>
                          </td>
                          <td>
                            <span className="fz14">
                              {formatCurrency(row.gross, row.currency)}
                            </span>
                          </td>
                          <td>
                            <span className="fz13 text-danger">
                              -{formatCurrency(row.platformFee, row.currency)}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`fw700 fz14 ${row.role === 'freelancer' ? 'text-success' : 'text-dark'}`}
                            >
                              {formatCurrency(row.net, row.currency)}
                            </span>
                          </td>
                          <td>
                            <StatusBadge status={row.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
