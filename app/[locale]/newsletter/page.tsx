'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Mail, Check, TrendingUp, Award, Sparkles, Users } from 'lucide-react';

export default function NewsletterPage() {
  const t = useTranslations('newsletterPage');
  const params = useParams();
  const locale = params.locale as string;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage(t('errorMessage'));
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Breadcrumb */}
        <section className="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Link href={`/${locale}`} className="hover:text-primary transition-colors">
                {t('breadcrumb.home')}
              </Link>
              <span>→</span>
              <span className="text-gray-900 dark:text-white font-semibold">
                {t('breadcrumb.newsletter')}
              </span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-white dark:bg-slate-800 py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                  <Mail className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Subscribe Form */}
            <div>
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('form.heading')}
                </h2>

                {status === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {t('success.heading')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t('success.instruction')}
                    </p>
                    <button
                      onClick={() => {
                        setStatus('idle');
                        setMessage('');
                      }}
                      className="mt-6 text-primary font-semibold hover:underline"
                    >
                      {t('success.resetButton')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        {t('form.emailLabel')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder={t('form.emailPlaceholder')}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          disabled={status === 'loading'}
                        />
                      </div>
                    </div>

                    {status === 'error' && message && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-sm text-red-800 dark:text-red-300">{message}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? t('form.submittingButton') : t('form.submitButton')}
                    </button>

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      {t('form.terms')}
                    </p>
                  </form>
                )}
              </div>

              {/* Privacy Note */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>{t('form.privacyNotice')}</strong> {t('form.privacyDetails')}
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('benefits.heading')}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {t('benefits.weeklyReviews.title')}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t('benefits.weeklyReviews.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {t('benefits.expertTips.title')}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t('benefits.expertTips.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {t('benefits.exclusiveInsights.title')}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t('benefits.exclusiveInsights.description')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {t('benefits.successStories.title')}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t('benefits.successStories.description')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-accent/10 dark:bg-accent/20 rounded-lg">
                  <p className="text-3xl font-bold text-accent">{t('stats.subscribersCount')}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {t('stats.subscribersLabel')}
                  </p>
                </div>
                <div className="text-center p-4 bg-primary/10 dark:bg-primary/20 rounded-lg">
                  <p className="text-3xl font-bold text-primary">{t('stats.satisfactionCount')}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {t('stats.satisfactionLabel')}
                  </p>
                </div>
                <div className="text-center p-4 bg-secondary/10 dark:bg-secondary/20 rounded-lg">
                  <p className="text-3xl font-bold text-secondary">{t('stats.weeksCount')}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    {t('stats.weeksLabel')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-white dark:bg-slate-800 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t('testimonials.heading')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "{t('testimonials.testimonial1.quote')}"
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {t('testimonials.testimonial1.name')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('testimonials.testimonial1.role')}
                </p>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "{t('testimonials.testimonial2.quote')}"
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {t('testimonials.testimonial2.name')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('testimonials.testimonial2.role')}
                </p>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "{t('testimonials.testimonial3.quote')}"
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {t('testimonials.testimonial3.name')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('testimonials.testimonial3.role')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('faq.heading')}
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {t('faq.frequency.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('faq.frequency.answer')}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {t('faq.unsubscribe.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('faq.unsubscribe.answer')}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {t('faq.privacy.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('faq.privacy.answer')}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {t('faq.welcome.question')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('faq.welcome.answer')}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
