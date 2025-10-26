'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Mail, Check, ArrowLeft, Sparkles, TrendingUp, Award, Users } from 'lucide-react';

export default function NewsletterPage() {
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
      setMessage('An error occurred. Please try again later.');
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
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>→</span>
              <span className="text-gray-900 dark:text-white font-semibold">Newsletter</span>
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
                Get Freelance Insights Delivered Weekly
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Join thousands of freelancers who receive exclusive tips, platform reviews,
                and actionable advice to grow their business.
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
                  Subscribe to Our Newsletter
                </h2>

                {status === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      You're all set!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Check your inbox for a welcome email. Don't forget to check your spam folder!
                    </p>
                    <button
                      onClick={() => {
                        setStatus('idle');
                        setMessage('');
                      }}
                      className="mt-6 text-primary font-semibold hover:underline"
                    >
                      Subscribe another email
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="you@example.com"
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
                      {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
                    </button>

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      By subscribing, you agree to receive our weekly newsletter.
                      Unsubscribe anytime with one click.
                    </p>
                  </form>
                )}
              </div>

              {/* Privacy Note */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>We respect your privacy.</strong> Your email will never be shared,
                  and you can unsubscribe at any time.
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                What You'll Get
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Weekly Platform Reviews
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      In-depth analysis of freelance platforms, comparing features, fees,
                      and opportunities to help you choose the best fit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Expert Freelancing Tips
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Practical advice on pricing, client management, productivity,
                      and building a sustainable freelance business.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Exclusive Insights
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Access to tools, templates, and resources not available on our website.
                      Subscriber-only content and early access to new features.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Success Stories
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Learn from other freelancers who've built successful careers.
                      Real strategies and lessons from the field.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-accent/10 dark:bg-accent/20 rounded-lg">
                  <p className="text-3xl font-bold text-accent">12K+</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Subscribers</p>
                </div>
                <div className="text-center p-4 bg-primary/10 dark:bg-primary/20 rounded-lg">
                  <p className="text-3xl font-bold text-primary">98%</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Satisfaction</p>
                </div>
                <div className="text-center p-4 bg-secondary/10 dark:bg-secondary/20 rounded-lg">
                  <p className="text-3xl font-bold text-secondary">52</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Weeks/Year</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-white dark:bg-slate-800 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              What Subscribers Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "The weekly newsletter has been invaluable for finding the right platforms
                  and staying up-to-date with freelancing trends."
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">Sarah K.</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Graphic Designer</p>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "I increased my rates by 30% after reading the pricing guides.
                  The actionable advice is worth its weight in gold!"
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">Michael R.</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Web Developer</p>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  "Best freelance newsletter I've subscribed to. Concise, relevant,
                  and always delivers value. Highly recommended!"
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">Emma L.</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Content Writer</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                How often will I receive emails?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We send one email per week, typically on Monday mornings.
                No spam, no daily bombardment - just valuable weekly insights.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Can I unsubscribe anytime?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Absolutely! Every email includes an unsubscribe link.
                One click and you're off the list - no questions asked.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Is my email shared with third parties?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Never. We respect your privacy and will never sell, rent,
                or share your email address with anyone.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                What if I don't see the welcome email?
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Check your spam or promotions folder. If you still can't find it,
                contact us and we'll help you get set up.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
