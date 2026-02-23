'use client';

import { ReceiptText } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface Transaction {
  id: string;
  orderId: string | null;
  orderNumber: string;
  orderTitle: string;
  amount: number;
  platformFee: number;
  transactionType: string;
  status: string;
  createdAt: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

function formatEUR(amount: number, signed = false): string {
  const formatted = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  if (!signed) return formatted;

  if (amount < 0) return `- ${formatted}`;
  return `+ ${formatted}`;
}

function formatDate(isoString: string): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

export function TransactionList({ transactions }: TransactionListProps) {
  const t = useTranslations('dashboard.earnings');

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'payment':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {t('payment')}
          </span>
        );
      case 'payout':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            {t('payout')}
          </span>
        );
      case 'refund':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            {t('refund')}
          </span>
        );
      case 'fee':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            {t('fee')}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            {type}
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            {t('completed')}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            {t('pending')}
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            {t('failed')}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            {status}
          </span>
        );
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'text-green-600 dark:text-green-400';
      case 'payout':
        return 'text-blue-600 dark:text-blue-400';
      case 'refund':
        return 'text-red-600 dark:text-red-400';
      case 'fee':
        return 'text-gray-500 dark:text-gray-400';
      default:
        return 'text-gray-900 dark:text-white';
    }
  };

  const getAmountPrefix = (type: string, amount: number): string => {
    if (type === 'refund' || type === 'fee') {
      return `- ${formatEUR(amount)}`;
    }
    return `+ ${formatEUR(amount)}`;
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-base font-heading font-semibold text-gray-900 dark:text-white mb-6">
          {t('transactions')}
        </h3>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
            <ReceiptText size={28} className="text-gray-400 dark:text-gray-500" />
          </div>
          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
            {t('noTransactions')}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
            {t('noTransactionsDesc')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-base font-heading font-semibold text-gray-900 dark:text-white">
          {t('transactions')}
        </h3>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('date')}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('type')}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('description')}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('orderRef')}
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('amount')}
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {t('status')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {formatDate(tx.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getTypeBadge(tx.transactionType)}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-white max-w-xs truncate">
                  {tx.orderTitle || '—'}
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 whitespace-nowrap font-mono text-xs">
                  {tx.orderNumber || '—'}
                </td>
                <td className={`px-6 py-4 text-right font-semibold whitespace-nowrap ${getAmountColor(tx.transactionType)}`}>
                  {getAmountPrefix(tx.transactionType, tx.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(tx.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-800">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getTypeBadge(tx.transactionType)}
                {getStatusBadge(tx.status)}
              </div>
              <span className={`font-semibold text-sm ${getAmountColor(tx.transactionType)}`}>
                {getAmountPrefix(tx.transactionType, tx.amount)}
              </span>
            </div>
            <p className="text-sm text-gray-900 dark:text-white truncate">
              {tx.orderTitle || '—'}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{formatDate(tx.createdAt)}</span>
              {tx.orderNumber && (
                <span className="font-mono">{tx.orderNumber}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
