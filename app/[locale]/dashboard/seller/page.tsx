import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { getFreelancerProfile } from '@/lib/marketplace-queries';
import { DollarSign, ShoppingBag, Star, TrendingUp, User, Briefcase, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export default async function SellerDashboardPage({ params }: PageProps) {
 const { locale } = await params;
 const t = await getTranslations('dashboard.seller');

 const user = await getCurrentUser();
 if (!user) {
 redirect('/handler/sign-in');
 }

 const profile = await getFreelancerProfile(user.id, locale);

 // Calculate profile completion percentage
 const profileFields = [
 profile?.display_name,
 profile?.tagline,
 profile?.bio,
 profile?.avatar_url,
 profile?.hourly_rate,
 profile?.skills && profile.skills.length >0,
 profile?.languages && profile.languages.length >0,
 ];
 const completedFields = profileFields.filter(Boolean).length;
 const profileCompletion = Math.round((completedFields / profileFields.length) * 100);

 const stats = [
 {
 label: t('totalEarnings'),
 value: `€0`,
 icon: DollarSign,
 color: 'text-green-600 dark:text-green-400',
 bg: 'bg-green-50 dark:bg-green-900/20',
 },
 {
 label: t('activeOrders'),
 value: String(profile?.total_orders ?? 0),
 icon: ShoppingBag,
 color: 'text-blue-600 dark:text-blue-400',
 bg: 'bg-blue-50 dark:bg-blue-900/20',
 },
 {
 label: t('completionRate'),
 value: `${profile?.completion_rate ?? 0}%`,
 icon: TrendingUp,
 color: 'text-purple-600 dark:text-purple-400',
 bg: 'bg-purple-50 dark:bg-purple-900/20',
 },
 {
 label: t('avgRating'),
 value: profile?.rating_average ? profile.rating_average.toFixed(1) : '—',
 icon: Star,
 color: 'text-yellow-600 dark:text-yellow-400',
 bg: 'bg-yellow-50 dark:bg-yellow-900/20',
 },
 ];

 const quickActions = [
 {
 label: t('profile'),
 href: `/${locale}/dashboard/seller/profile`,
 icon: User,
 description: profile ? t('profileComplete') : t('profileSetup'),
 },
 {
 label: t('gigs'),
 href: `/${locale}/dashboard/seller/gigs`,
 icon: Briefcase,
 description: 'Manage your service offerings',
 },
 ];

 return (
 <div className="p-6 lg:p-8 max-w-6xl mx-auto w-full">
 {/* Welcome header */}
 <div className="mb-8">
 <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
 {t('welcome')}, {user.name ?? user.email}!
 </h1>
 {!profile && (
 <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
 {t('profileSetup')}
 </p>
 )}
 </div>

 {/* Profile completion banner */}
 {profileCompletion < 100 && (
 <div className="mb-8 rounded-xl bg-primary/5 border border-primary/20 p-5">
 <div className="flex items-center justify-between mb-3">
 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
 {t('profileSetup')} — {profileCompletion}%
 </span>
 <Link
 href={`/${locale}/dashboard/seller/profile`}
 className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
 >
 Complete now
 <ArrowRight size={14} />
 </Link>
 </div>
 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
 <div
 className="bg-primary rounded-full h-2 transition-all duration-500"
 style={{ width: `${profileCompletion}%` }}
 />
 </div>
 </div>
 )}

 {/* Stats grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
 {stats.map((stat) =>{
 const Icon = stat.icon;
 return (
 <div
 key={stat.label}
 className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
 >
 <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.bg} mb-3`}>
 <Icon size={20} className={stat.color} />
 </div>
 <p className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
 {stat.value}
 </p>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
 {stat.label}
 </p>
 </div>
 );
 })}
 </div>

 {/* Quick actions */}
 <h2 className="text-lg font-heading font-semibold text-gray-900 dark:text-white mb-4">
 Quick Actions
 </h2>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {quickActions.map((action) =>{
 const Icon = action.icon;
 return (
 <Link
 key={action.href}
 href={action.href}
 className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:border-primary/40 hover:shadow-sm transition-all group"
 >
 <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center">
 <Icon size={20} className="text-secondary dark:text-white" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
 {action.label}
 </p>
 <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
 {action.description}
 </p>
 </div>
 <ArrowRight size={16} className="text-gray-400 group-hover:text-primary transition-colors flex-shrink-0" />
 </Link>
 );
 })}
 </div>
 </div>
 );
}
