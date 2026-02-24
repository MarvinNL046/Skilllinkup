'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
 LayoutDashboard,
 User,
 Briefcase,
 ShoppingBag,
 DollarSign,
 MessageSquare,
 BarChart2,
} from 'lucide-react';

interface SellerSidebarProps {
 locale: string;
}

export function SellerSidebar({ locale }: SellerSidebarProps) {
 const t = useTranslations('dashboard.seller');
 const pathname = usePathname();

 const navItems = [
 {
 label: t('overview'),
 href: `/${locale}/dashboard/seller`,
 icon: LayoutDashboard,
 exact: true,
 },
 {
 label: t('profile'),
 href: `/${locale}/dashboard/seller/profile`,
 icon: User,
 },
 {
 label: t('gigs'),
 href: `/${locale}/dashboard/seller/gigs`,
 icon: Briefcase,
 },
 {
 label: t('orders'),
 href: `/${locale}/dashboard/seller/orders`,
 icon: ShoppingBag,
 },
 {
 label: t('earnings'),
 href: `/${locale}/dashboard/seller/earnings`,
 icon: DollarSign,
 },
 {
 label: t('messages'),
 href: `/${locale}/dashboard/seller/messages`,
 icon: MessageSquare,
 },
 {
 label: t('analytics'),
 href: `/${locale}/dashboard/seller/analytics`,
 icon: BarChart2,
 },
 ];

 function isActive(href: string, exact?: boolean): boolean {
 if (exact) {
 return pathname === href;
 }
 return pathname.startsWith(href);
 }

 return (
 <aside className="w-60 flex-shrink-0 hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-full">
 {/* Sidebar header */}
 <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
 <span className="text-sm font-heading font-bold text-secondary dark:text-white">
 {t('title')}
 </span>
 </div>

 {/* Navigation */}
 <nav className="flex-1 py-4 px-3">
 <ul className="space-y-1">
 {navItems.map((item) =>{
 const Icon = item.icon;
 const active = isActive(item.href, item.exact);

 return (
 <li key={item.href}>
 <Link
 href={item.href}
 className={[
 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
 active
 ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary'
 : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white',
 ].join(' ')}
 >
 <Icon
 size={18}
 className={active ? 'text-primary' : 'text-gray-400 dark:text-gray-500'}
 />
 {item.label}
 </Link>
 </li>
 );
 })}
 </ul>
 </nav>
 </aside>
 );
}
