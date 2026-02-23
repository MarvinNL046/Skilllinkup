'use client';

import { Clock, Wallet, TrendingUp, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface MonthlyDataPoint {
  month: string;
  monthLabel: string;
  total: number;
}

interface EarningsOverviewProps {
  pendingBalance: number;
  availableBalance: number;
  totalEarned: number;
  thisMonth: number;
  monthlyData: MonthlyDataPoint[];
}

function formatEUR(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function EarningsOverview({
  pendingBalance,
  availableBalance,
  totalEarned,
  thisMonth,
  monthlyData,
}: EarningsOverviewProps) {
  const t = useTranslations('dashboard.earnings');

  const stats = [
    {
      label: t('pendingBalance'),
      description: t('pendingDesc'),
      value: formatEUR(pendingBalance),
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-100 dark:border-amber-800/30',
    },
    {
      label: t('availableBalance'),
      description: t('availableDesc'),
      value: formatEUR(availableBalance),
      icon: Wallet,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-100 dark:border-green-800/30',
    },
    {
      label: t('totalEarned'),
      description: t('totalEarnedDesc'),
      value: formatEUR(totalEarned),
      icon: TrendingUp,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-100 dark:border-blue-800/30',
    },
    {
      label: t('thisMonth'),
      description: t('thisMonthDesc'),
      value: formatEUR(thisMonth),
      icon: Calendar,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-100 dark:border-purple-800/30',
    },
  ];

  // Compute max for bar chart scaling
  const maxValue = monthlyData.length > 0
    ? Math.max(...monthlyData.map((d) => d.total), 1)
    : 1;

  return (
    <div>
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`bg-white dark:bg-gray-900 rounded-xl border ${stat.border} border-gray-200 dark:border-gray-800 p-5`}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.bg} mb-3`}>
                <Icon size={20} className={stat.color} />
              </div>
              <p className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
                {stat.label}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Monthly earnings chart */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-heading font-semibold text-gray-900 dark:text-white">
              {t('earningsChart')}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {t('last6Months')}
            </p>
          </div>
        </div>

        {monthlyData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <TrendingUp size={32} className="text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('noData')}
            </p>
          </div>
        ) : (
          <div className="flex items-end gap-3 h-40">
            {monthlyData.map((dataPoint) => {
              const heightPercent = maxValue > 0
                ? Math.max((dataPoint.total / maxValue) * 100, dataPoint.total > 0 ? 4 : 0)
                : 0;

              return (
                <div
                  key={dataPoint.month}
                  className="flex-1 flex flex-col items-center gap-2 group"
                >
                  {/* Tooltip on hover */}
                  <div className="relative w-full flex flex-col items-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none z-10">
                      {formatEUR(dataPoint.total)}
                    </div>
                    <div className="w-full flex items-end justify-center" style={{ height: '8rem' }}>
                      <div
                        className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-colors cursor-default"
                        style={{ height: `${heightPercent}%` }}
                        title={formatEUR(dataPoint.total)}
                      />
                    </div>
                  </div>
                  {/* Month label */}
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate w-full text-center">
                    {dataPoint.monthLabel}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
