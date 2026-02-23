'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  ArrowLeft,
  Send,
  Clock,
  DollarSign,
  User,
  Calendar,
  Package,
} from 'lucide-react';
import { OrderTimeline } from '@/components/dashboard/OrderTimeline';
import type { OrderSummary } from '@/lib/marketplace-queries';

interface ExtendedOrder extends OrderSummary {
  revision_count?: number;
  revisions_used?: number;
  requirements?: string | null;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatCurrency(amount: number, currency: string): string {
  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
  return `${symbol}${Number(amount).toFixed(2)}`;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400',
    active: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    delivered: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
    revision: 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400',
    completed: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
    cancelled: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    disputed: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
  };

  const labels: Record<string, string> = {
    pending: 'Pending',
    active: 'Active',
    delivered: 'Delivered',
    revision: 'Revision',
    completed: 'Completed',
    cancelled: 'Cancelled',
    disputed: 'Disputed',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        styles[status] ?? styles.pending
      }`}
    >
      {labels[status] ?? status}
    </span>
  );
}

interface SellerOrderDetailClientProps {
  order: ExtendedOrder;
  locale: string;
}

export function SellerOrderDetailClient({ order, locale }: SellerOrderDetailClientProps) {
  const t = useTranslations('orders');
  const router = useRouter();
  const [delivering, setDelivering] = useState(false);
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const canDeliver = order.status === 'active' || order.status === 'revision';

  async function handleDeliver() {
    if (!deliveryMessage.trim()) return;
    setDelivering(true);
    setError('');
    try {
      const res = await fetch(`/api/marketplace/orders/${order.id}/deliver`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: deliveryMessage.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Failed to deliver order');
      } else {
        setSuccess(t('deliverySuccess'));
        setShowDeliveryForm(false);
        setDeliveryMessage('');
        router.refresh();
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setDelivering(false);
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto w-full">
      {/* Back link */}
      <Link
        href={`/${locale}/dashboard/seller/orders`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        {t('sellerOrders')}
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono text-gray-400 dark:text-gray-500">
              {t('orderNumber')} #{order.order_number}
            </span>
            <StatusBadge status={order.status} />
          </div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
            {order.title}
          </h1>
        </div>
      </div>

      {/* Success/Error banners */}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: timeline + actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-base font-heading font-semibold text-gray-900 dark:text-white mb-5">
              {t('timeline')}
            </h2>
            <OrderTimeline
              status={order.status}
              createdAt={order.created_at}
              completedAt={order.completed_at}
              deliveryDeadline={order.delivery_deadline}
            />
          </div>

          {/* Deliver action */}
          {canDeliver && !success && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-base font-heading font-semibold text-gray-900 dark:text-white mb-4">
                {t('actions')}
              </h2>

              {order.status === 'revision' && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 mb-4">
                  <Clock size={14} className="text-orange-500 flex-shrink-0" />
                  <p className="text-xs text-orange-700 dark:text-orange-400">
                    The client has requested a revision. Review their feedback and re-deliver.
                  </p>
                </div>
              )}

              {!showDeliveryForm ? (
                <button
                  onClick={() => setShowDeliveryForm(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Send size={16} />
                  {t('deliver')}
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('deliveryMessage')}
                    </label>
                    <textarea
                      value={deliveryMessage}
                      onChange={(e) => setDeliveryMessage(e.target.value)}
                      placeholder={t('deliveryPlaceholder')}
                      rows={5}
                      className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleDeliver}
                      disabled={delivering || !deliveryMessage.trim()}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send size={16} />
                      {delivering ? t('delivering') : t('deliver')}
                    </button>
                    <button
                      onClick={() => {
                        setShowDeliveryForm(false);
                        setDeliveryMessage('');
                      }}
                      className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Waiting for client approval */}
          {order.status === 'delivered' && !success && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800">
              <Clock size={16} className="text-purple-500 flex-shrink-0" />
              <p className="text-sm text-purple-700 dark:text-purple-400">
                Your delivery has been submitted. Waiting for client approval.
              </p>
            </div>
          )}

          {/* Requirements from client */}
          {order.requirements && (
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-base font-heading font-semibold text-gray-900 dark:text-white mb-3">
                {t('requirements')}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {order.requirements}
              </p>
            </div>
          )}
        </div>

        {/* Right column: order details */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 space-y-4">
            <h2 className="text-sm font-heading font-semibold text-gray-900 dark:text-white">
              Order Details
            </h2>

            {/* Earnings */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                <DollarSign size={15} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Your Earnings</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(order.freelancer_earnings, order.currency)}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  of {formatCurrency(order.amount, order.currency)} total
                </p>
              </div>
            </div>

            {/* Escrow */}
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  order.escrow_status === 'released'
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-yellow-50 dark:bg-yellow-900/20'
                }`}
              >
                <Package
                  size={15}
                  className={
                    order.escrow_status === 'released'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-yellow-600 dark:text-yellow-400'
                  }
                />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">Payment</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {order.escrow_status === 'released' ? t('escrowReleased') : t('escrowHeld')}
                </p>
              </div>
            </div>

            {/* Client */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <User size={15} className="text-secondary dark:text-gray-300" />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">{t('client')}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {order.client_name}
                </p>
              </div>
            </div>

            {/* Placed date */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Calendar size={15} className="text-gray-500 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500">{t('placed')}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatDate(order.created_at)}
                </p>
              </div>
            </div>

            {/* Deadline */}
            {order.delivery_deadline && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <Clock size={15} className="text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{t('deadline')}</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatDate(order.delivery_deadline)}
                  </p>
                </div>
              </div>
            )}

            {/* Revisions */}
            {(order.revision_count ?? 0) > 0 && (
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{t('revisions')}</p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {order.revisions_used ?? 0} {t('revisionsUsed')} / {order.revision_count}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
