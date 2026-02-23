'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Calendar, Clock, ArrowRight, DollarSign } from 'lucide-react';

export interface OrderCardProps {
  order: {
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
  };
  role: 'client' | 'seller';
  locale: string;
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400',
  active: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
  delivered: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
  revision: 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400',
  completed: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
  cancelled: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
  disputed: 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400',
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatCurrency(amount: number, currency: string): string {
  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
  return `${symbol}${Number(amount).toFixed(2)}`;
}

export function OrderCard({ order, role, locale }: OrderCardProps) {
  const t = useTranslations('orders');

  const statusKey = `status${order.status.charAt(0).toUpperCase()}${order.status.slice(1)}` as keyof typeof STATUS_STYLES;
  const statusLabel = t(statusKey as Parameters<typeof t>[0]);
  const statusStyle = STATUS_STYLES[order.status] ?? STATUS_STYLES.pending;

  const detailHref =
    role === 'client'
      ? `/${locale}/dashboard/orders/${order.id}`
      : `/${locale}/dashboard/seller/orders/${order.id}`;

  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:border-primary/40 transition-colors">
      {/* Order info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                {t('orderNumber')} #{order.order_number}
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle}`}
              >
                {statusLabel}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {order.title}
            </h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {role === 'client'
                ? `${t('freelancer')}: ${order.freelancer_name}`
                : `${t('client')}: ${order.client_name}`}
            </p>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <DollarSign size={12} />
            <span>{formatCurrency(order.amount, order.currency)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Calendar size={12} />
            <span>
              {t('placed')}: {formatDate(order.created_at)}
            </span>
          </div>
          {order.delivery_deadline && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <Clock size={12} />
              <span>
                {t('deadline')}: {formatDate(order.delivery_deadline)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* View button */}
      <div className="flex-shrink-0">
        <Link
          href={detailHref}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-colors"
        >
          {t('viewDetails')}
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
