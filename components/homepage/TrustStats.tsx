'use client';

import { Users, Briefcase, ThumbsUp, ShoppingCart } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface TrustStatsProps {
  freelancerCount: number;
  serviceCount: number;
  satisfactionRate: number;
  orderCount: number;
}

export function TrustStats({ freelancerCount, serviceCount, satisfactionRate, orderCount }: TrustStatsProps) {
  const t = useTranslations('homepage.trustStats');

  function formatNumber(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
    return String(n);
  }

  const stats = [
    {
      icon: Users,
      value: freelancerCount > 0 ? formatNumber(freelancerCount) + '+' : '500+',
      label: t('freelancers'),
    },
    {
      icon: Briefcase,
      value: serviceCount > 0 ? formatNumber(serviceCount) + '+' : '1,000+',
      label: t('services'),
    },
    {
      icon: ThumbsUp,
      value: satisfactionRate > 0 ? `${satisfactionRate}%` : '98%',
      label: t('satisfaction'),
    },
    {
      icon: ShoppingCart,
      value: orderCount > 0 ? formatNumber(orderCount) + '+' : '2,500+',
      label: t('orders'),
    },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-r from-secondary via-secondary-medium to-secondary overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-3">
                  <Icon className="w-6 h-6 text-primary-light" />
                </div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
