'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Users,
  Check,
  FileText,
  Calculator,
  BarChart3,
  Mail,
  Phone,
  Building,
  Globe,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Star,
} from 'lucide-react';

export default function ClientManagerPage() {
  const t = useTranslations('clientManager');
  const params = useParams();
  const locale = params.locale as string;

  const features = [
    {
      icon: FileText,
      title: t('features.invoicing.title'),
      description: t('features.invoicing.description'),
    },
    {
      icon: Calculator,
      title: t('features.quotes.title'),
      description: t('features.quotes.description'),
    },
    {
      icon: Users,
      title: t('features.contacts.title'),
      description: t('features.contacts.description'),
    },
    {
      icon: BarChart3,
      title: t('features.reports.title'),
      description: t('features.reports.description'),
    },
    {
      icon: Clock,
      title: t('features.timeTracking.title'),
      description: t('features.timeTracking.description'),
    },
    {
      icon: Globe,
      title: t('features.multiCurrency.title'),
      description: t('features.multiCurrency.description'),
    },
  ];

  const upcomingFeatures = [
    {
      icon: Mail,
      title: t('features.emailMarketing.title'),
      description: t('features.emailMarketing.description'),
    },
    {
      icon: Zap,
      title: t('features.automation.title'),
      description: t('features.automation.description'),
    },
  ];

  const benefits = [
    t('benefits.item1'),
    t('benefits.item2'),
    t('benefits.item3'),
    t('benefits.item4'),
    t('benefits.item5'),
    t('benefits.item6'),
  ];

  // Sample client data for preview
  const sampleClients = [
    { name: 'TechStart B.V.', email: 'info@techstart.nl', phone: '+31 20 123 4567', projects: 5, status: 'active' },
    { name: 'Design Studio XYZ', email: 'contact@designxyz.com', phone: '+31 10 987 6543', projects: 3, status: 'active' },
    { name: 'Marketing Pro', email: 'hello@marketingpro.nl', phone: '+31 30 456 7890', projects: 2, status: 'pending' },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Breadcrumb */}
        <section className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Link href={`/${locale}`} className="hover:text-primary transition-colors">
                {t('breadcrumb.home')}
              </Link>
              <span>/</span>
              <Link href={`/${locale}/tools`} className="hover:text-primary transition-colors">
                {t('breadcrumb.tools')}
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-semibold">{t('breadcrumb.clientManager')}</span>
            </div>
          </div>
        </section>

        {/* Hero Section - Clean design with MoneyBii branding */}
        <section className="bg-white dark:bg-slate-800 py-16 sm:py-20 border-b border-gray-200 dark:border-slate-700">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* MoneyBii Logo - Extra Large and Prominent */}
              <div className="flex items-center justify-center mb-10">
                <Image
                  src="/images/logo/logo-moneybii/moneybii-purple-yellow-transparentbg.png"
                  alt="MoneyBii"
                  width={500}
                  height={150}
                  className="h-40 w-auto"
                  priority
                />
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="https://go.skilllinkup.com/moneybii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  {t('hero.ctaButton')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-8 mt-10 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>{t('moneybii.badges.secure')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  <span>{t('moneybii.badges.rating')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{t('moneybii.badges.users')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Section - Shows what a CRM could look like */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('preview.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('preview.subtitle')}
              </p>
            </div>

            {/* Mock CRM Interface */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700">
              {/* Mock Header with MoneyBii logo */}
              <div className="bg-gray-100 dark:bg-slate-900 px-6 py-5 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src="/images/logo/logo-moneybii/moneybii-purple-yellow-transparentbg.png"
                    alt="MoneyBii"
                    width={220}
                    height={65}
                    className="h-14 w-auto"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-semibold rounded-full">
                    {t('preview.demoLabel')}
                  </span>
                </div>
              </div>

              {/* Mock Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-slate-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('preview.table.client')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('preview.table.email')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('preview.table.phone')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('preview.table.projects')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t('preview.table.status')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {sampleClients.map((client, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                              <Building className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-semibold text-gray-900 dark:text-white">{client.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {client.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {client.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {client.projects}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            client.status === 'active'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                          }`}>
                            {client.status === 'active' ? t('preview.statusActive') : t('preview.statusPending')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mock Footer with CTA */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-800 via-white/80 dark:via-slate-800/80 to-transparent pointer-events-none" />
                <div className="relative px-6 py-8 text-center">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('preview.unlockMessage')}
                  </p>
                  <Link
                    href="https://go.skilllinkup.com/moneybii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {t('preview.unlockButton')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-white dark:bg-slate-800 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              {/* MoneyBii logo above features */}
              <div className="flex items-center justify-center mb-8">
                <Image
                  src="/images/logo/logo-moneybii/moneybii-purple-yellow-transparentbg.png"
                  alt="MoneyBii"
                  width={360}
                  height={100}
                  className="h-28 w-auto"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('featuresSection.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('featuresSection.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-slate-900 rounded-lg p-6 hover:shadow-lg transition-all"
                  >
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Coming Soon Features */}
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-sm font-semibold rounded-full mb-4">
                  {t('featuresSection.comingSoonBadge')}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('featuresSection.comingSoonTitle')}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-slate-900 rounded-lg p-6 border-2 border-dashed border-gray-300 dark:border-slate-700"
                    >
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* MoneyBii CTA Section - Clean, no gradient */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gray-900 dark:bg-slate-950 rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <Image
                    src="/images/logo/logo-moneybii/moneybii-full-yellow-transparentbg.png"
                    alt="MoneyBii"
                    width={400}
                    height={120}
                    className="h-32 w-auto"
                  />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {t('moneybii.title')}
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  {t('moneybii.description')}
                </p>

                <ul className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-200">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="https://go.skilllinkup.com/moneybii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    {t('moneybii.ctaButton')}
                    <Zap className="w-5 h-5" />
                  </Link>
                </div>

                <p className="text-gray-400 text-sm mt-4">
                  {t('moneybii.freeTrialNote')}
                </p>
              </div>

              {/* Stats/Trust Badges */}
              <div className="hidden lg:block p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-800 dark:bg-slate-900 rounded-lg p-6 text-center">
                    <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
                    <p className="text-white font-semibold">{t('moneybii.badges.secure')}</p>
                  </div>
                  <div className="bg-gray-800 dark:bg-slate-900 rounded-lg p-6 text-center">
                    <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
                    <p className="text-white font-semibold">{t('moneybii.badges.support')}</p>
                  </div>
                  <div className="bg-gray-800 dark:bg-slate-900 rounded-lg p-6 text-center">
                    <Star className="w-10 h-10 text-primary mx-auto mb-3" />
                    <p className="text-white font-semibold">{t('moneybii.badges.rating')}</p>
                  </div>
                  <div className="bg-gray-800 dark:bg-slate-900 rounded-lg p-6 text-center">
                    <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                    <p className="text-white font-semibold">{t('moneybii.badges.users')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Tools */}
        <section className="container mx-auto px-4 py-8 text-center">
          <Link
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors"
          >
            ← {t('backToTools')}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
