'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import type { Id } from '@/convex/_generated/dataModel';

export const dynamic = 'force-dynamic';

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    completed: { label: 'Paid', cls: 'text-success bg-success-light' },
    pending: { label: 'Pending', cls: 'text-warning bg-warning-light' },
    in_progress: { label: 'In Progress', cls: 'text-info bg-info-light' },
    delivered: { label: 'Delivered', cls: 'text-primary bg-primary-light' },
    revision_requested: { label: 'Revision', cls: 'text-warning bg-warning-light' },
    cancelled: { label: 'Cancelled', cls: 'text-danger bg-danger-light' },
    disputed: { label: 'Disputed', cls: 'text-danger bg-danger-light' },
  };

  const resolved = map[status] ?? { label: status, cls: 'text-muted' };

  return (
    <span
      className={`badge fz12 fw500 px10 py5 bdrs4 ${resolved.cls}`}
      style={{ textTransform: 'capitalize' }}
    >
      {resolved.label}
    </span>
  );
}

export default function InvoicePage() {
  const { user: clerkUser, isLoaded } = useUser();
  const locale = useLocale();

  const convexUser = useQuery(
    api.users.getByClerkId,
    isLoaded && clerkUser ? { clerkId: clerkUser.id } : 'skip'
  );

  // Fetch orders for both roles
  const clientOrders = useQuery(
    api.marketplace.orders.getByUser,
    convexUser?._id
      ? { userId: convexUser._id as Id<'users'>, role: 'client', limit: 100 }
      : 'skip'
  );

  const freelancerOrders = useQuery(
    api.marketplace.orders.getByUser,
    convexUser?._id
      ? { userId: convexUser._id as Id<'users'>, role: 'freelancer', limit: 100 }
      : 'skip'
  );

  const loading =
    !isLoaded ||
    convexUser === undefined ||
    clientOrders === undefined ||
    freelancerOrders === undefined;

  // Merge and deduplicate orders
  const allOrders = (() => {
    if (loading) return [];
    const seen = new Set<string>();
    const merged = [...(clientOrders ?? []), ...(freelancerOrders ?? [])].filter(
      (o) => {
        if (seen.has(o._id)) return false;
        seen.add(o._id);
        return true;
      }
    );
    return merged.sort((a, b) => b.createdAt - a.createdAt);
  })();

  return (
    <div className="dashboard__main pl0-md">
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Invoices</h2>
              <p className="text">
                {loading
                  ? 'Loading...'
                  : `${allOrders.length} invoice${allOrders.length !== 1 ? 's' : ''} found`}
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">

              {/* Loading state */}
              {loading && (
                <div className="text-center py40">
                  <div className="spinner-border text-thm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt20 mb0 fz15">Loading invoices...</p>
                </div>
              )}

              {/* Empty state */}
              {!loading && allOrders.length === 0 && (
                <div className="text-center py40">
                  <span className="flaticon-receipt fz60 text-muted mb20 d-block" />
                  <h4>No Invoices Yet</h4>
                  <p className="text mb30">
                    Your invoice history will appear here once you have completed orders.
                  </p>
                  <Link
                    href={`/${locale}/marketplace`}
                    className="ud-btn btn-thm2 bdrs4"
                  >
                    Browse Services
                  </Link>
                </div>
              )}

              {/* Invoice table */}
              {!loading && allOrders.length > 0 && (
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Invoice #</th>
                        <th scope="col">Title</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Platform Fee</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {allOrders.map((order) => (
                        <tr key={order._id}>
                          <td>
                            <span className="fw600 fz14">{order.orderNumber}</span>
                          </td>
                          <td>
                            <span
                              className="fz14"
                              title={order.title}
                              style={{
                                maxWidth: 200,
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
                            <span className="fz14 text-muted">
                              {formatDate(order.createdAt)}
                            </span>
                          </td>
                          <td>
                            <span className="fw600 fz14">
                              {formatCurrency(order.amount, order.currency ?? 'EUR')}
                            </span>
                          </td>
                          <td>
                            <span className="fz14 text-muted">
                              {formatCurrency(
                                order.platformFee,
                                order.currency ?? 'EUR'
                              )}
                            </span>
                          </td>
                          <td>
                            <StatusBadge status={order.status} />
                          </td>
                          <td>
                            <Link
                              href={`/${locale}/dashboard/orders/${order._id}`}
                              className="text-thm fz14 fw500"
                            >
                              View <i className="fal fa-arrow-right-long ml5" />
                            </Link>
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
