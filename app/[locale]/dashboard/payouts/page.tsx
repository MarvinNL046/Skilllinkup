'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useLocale } from 'next-intl';
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

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    completed: { label: 'Completed', cls: 'text-success' },
    pending: { label: 'Pending', cls: 'text-warning' },
    in_progress: { label: 'In Progress', cls: 'text-info' },
    delivered: { label: 'Delivered', cls: 'text-primary' },
    cancelled: { label: 'Cancelled', cls: 'text-danger' },
  };
  const resolved = map[status] ?? { label: status, cls: 'text-muted' };
  return (
    <span className={`fz13 fw500 ${resolved.cls}`}>{resolved.label}</span>
  );
}

export default function PayoutsPage() {
  const { user: clerkUser, isLoaded } = useUser();
  const locale = useLocale();

  const convexUser = useQuery(
    api.users.getByClerkId,
    isLoaded && clerkUser ? { clerkId: clerkUser.id } : 'skip'
  );

  const freelancerOrders = useQuery(
    api.marketplace.orders.getByUser,
    convexUser?._id
      ? { userId: convexUser._id as Id<'users'>, role: 'freelancer', limit: 200 }
      : 'skip'
  );

  const loading =
    !isLoaded || convexUser === undefined || freelancerOrders === undefined;

  // Calculate earnings breakdown
  const totalEarned = (freelancerOrders ?? [])
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + (o.freelancerEarnings ?? 0), 0);

  const pendingEarnings = (freelancerOrders ?? [])
    .filter(
      (o) =>
        ['in_progress', 'active', 'delivered', 'revision_requested'].includes(
          o.status
        ) && o.escrowStatus === 'held'
    )
    .reduce((sum, o) => sum + (o.freelancerEarnings ?? 0), 0);

  const availableBalance = (freelancerOrders ?? [])
    .filter((o) => o.status === 'completed' && o.escrowStatus === 'released')
    .reduce((sum, o) => sum + (o.freelancerEarnings ?? 0), 0);

  // Show completed orders as payout history
  const completedOrders = (freelancerOrders ?? [])
    .filter((o) => o.status === 'completed')
    .slice(0, 50);

  return (
    <div className="dashboard__main pl0-md">
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Payouts</h2>
              <p className="text">Track your earnings and payout status</p>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="row">
          <StatCard
            label="Total Earned"
            value={loading ? '—' : formatCurrency(totalEarned)}
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
            value={loading ? '—' : formatCurrency(pendingEarnings)}
            icon="flaticon-processing"
            color="bgc-dark-light2 text-white"
          />
          <StatCard
            label="Withdrawn"
            value="€0.00"
            icon="flaticon-upload"
            color="bgc-purple text-white"
          />
        </div>

        {/* Stripe Connect CTA */}
        <div className="row">
          <div className="col-lg-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="d-sm-flex align-items-center justify-content-between">
                <div>
                  <h5 className="mb5 fw600">Connect Stripe to Receive Payouts</h5>
                  <p className="mb0 fz14 text-muted">
                    Connect your Stripe account to withdraw your available balance.
                    Payouts are processed within 2-5 business days.
                  </p>
                </div>
                <div className="mt15 mt-sm-0">
                  <Link
                    href={`/${locale}/dashboard/seller/stripe`}
                    className="ud-btn btn-thm2 bdrs4 white-version"
                  >
                    <i className="flaticon-dollar mr10" />
                    Setup Stripe Connect
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payout history */}
        <div className="row">
          <div className="col-lg-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <h4 className="mb25 fw600">Earnings History</h4>

              {loading && (
                <div className="text-center py30">
                  <div className="spinner-border text-thm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {!loading && completedOrders.length === 0 && (
                <div className="text-center py30">
                  <span className="flaticon-dollar fz60 text-muted mb15 d-block" />
                  <h5>No completed orders yet</h5>
                  <p className="fz14 text-muted">
                    Completed orders will appear here as your earning history.
                  </p>
                </div>
              )}

              {!loading && completedOrders.length > 0 && (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Order</th>
                        <th scope="col">Title</th>
                        <th scope="col">Completed</th>
                        <th scope="col">Order Amount</th>
                        <th scope="col">Platform Fee</th>
                        <th scope="col">You Earned</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {completedOrders.map((order) => (
                        <tr key={order._id}>
                          <td>
                            <span className="fw600 fz13">{order.orderNumber}</span>
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
                              {order.title}
                            </span>
                          </td>
                          <td>
                            <span className="fz13 text-muted">
                              {order.completedAt
                                ? formatDate(order.completedAt as number)
                                : formatDate(order.createdAt)}
                            </span>
                          </td>
                          <td>
                            <span className="fz14">
                              {formatCurrency(
                                order.amount,
                                order.currency ?? 'EUR'
                              )}
                            </span>
                          </td>
                          <td>
                            <span className="fz13 text-danger">
                              -{formatCurrency(
                                order.platformFee,
                                order.currency ?? 'EUR'
                              )}
                            </span>
                          </td>
                          <td>
                            <span className="fw700 fz14 text-success">
                              {formatCurrency(
                                order.freelancerEarnings ?? 0,
                                order.currency ?? 'EUR'
                              )}
                            </span>
                          </td>
                          <td>
                            <StatusBadge status={order.escrowStatus ?? order.status} />
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
