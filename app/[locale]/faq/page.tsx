'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChevronDown, HelpCircle, Search, ArrowLeft } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    category: 'Getting Started',
    question: 'What is SkillLinkup and how does it work?',
    answer: 'SkillLinkup is a comprehensive platform that helps freelancers discover and compare the best freelance platforms. We provide detailed reviews, comparisons, and insights to help you find the platform that best matches your skills and goals.',
  },
  {
    category: 'Getting Started',
    question: 'Is SkillLinkup free to use?',
    answer: 'Yes! SkillLinkup is completely free to use. You can read all our reviews, comparisons, and use our tools without any subscription or payment required.',
  },
  {
    category: 'Getting Started',
    question: 'How do I find the right platform for me?',
    answer: 'Start by browsing our platform reviews filtered by your skills or industry. Read our detailed comparisons, check the pros and cons, and use our tools like the Rate Calculator to understand your potential earnings on each platform.',
  },

  // Platform Reviews
  {
    category: 'Platform Reviews',
    question: 'How are platform reviews created?',
    answer: 'Our reviews are based on extensive research, real user experiences, official platform data, and hands-on testing. We evaluate factors like fees, payment methods, client quality, approval process, and user satisfaction.',
  },
  {
    category: 'Platform Reviews',
    question: 'How often are reviews updated?',
    answer: 'We update our reviews regularly, especially when platforms make significant changes to their fees, features, or terms of service. Major reviews are updated at least quarterly.',
  },
  {
    category: 'Platform Reviews',
    question: 'Are your reviews biased?',
    answer: 'No. We maintain complete independence from the platforms we review. Our reviews are based on factual data and real user feedback, not sponsored content or affiliate relationships that might influence our opinions.',
  },
  {
    category: 'Platform Reviews',
    question: 'Can I suggest a platform to review?',
    answer: 'Absolutely! We\'re always looking to expand our coverage. Contact us with your suggestion and we\'ll add it to our review queue.',
  },

  // Account & Tools
  {
    category: 'Account & Tools',
    question: 'Do I need an account to use SkillLinkup?',
    answer: 'No account is required to read reviews and use our basic tools. However, creating a free account allows you to save your favorite platforms, bookmark articles, and access personalized recommendations.',
  },
  {
    category: 'Account & Tools',
    question: 'What tools do you offer?',
    answer: 'We offer several free tools including a Rate Calculator (to determine your hourly rate), comparison tools, and resource guides. More tools are being added regularly based on user feedback.',
  },
  {
    category: 'Account & Tools',
    question: 'How does the Rate Calculator work?',
    answer: 'Our Rate Calculator helps you determine your ideal hourly, daily, and project rates. Input your desired annual income, expected working hours, business expenses, and tax rate. The calculator will show you what you need to charge to meet your financial goals.',
  },

  // Platform Selection
  {
    category: 'Platform Selection',
    question: 'Can I work on multiple platforms at once?',
    answer: 'Yes! Many successful freelancers work on multiple platforms simultaneously to diversify their income and access different types of clients. Just make sure to check each platform\'s terms of service for any exclusivity requirements.',
  },
  {
    category: 'Platform Selection',
    question: 'Which platform is best for beginners?',
    answer: 'Platforms like Fiverr and Upwork are often recommended for beginners due to their large client base and lower barriers to entry. However, the "best" platform depends on your specific skills, industry, and career goals.',
  },
  {
    category: 'Platform Selection',
    question: 'What are platform fees and how do they work?',
    answer: 'Platform fees are percentages that freelance platforms deduct from your earnings. They typically range from 5% to 20%. Some platforms use tiered systems where fees decrease as you earn more with a client.',
  },

  // Payments & Earnings
  {
    category: 'Payments & Earnings',
    question: 'How do payment methods differ between platforms?',
    answer: 'Payment methods vary by platform. Common options include PayPal, direct bank transfer, Payoneer, and wire transfer. Processing times can range from instant to 14 days depending on the platform and payment method.',
  },
  {
    category: 'Payments & Earnings',
    question: 'What is a realistic income for freelancers?',
    answer: 'Freelance income varies widely based on skills, experience, platform choice, and time invested. Beginners might earn $15-30/hour while experienced specialists can charge $75-200+/hour. Use our Rate Calculator to set realistic income goals.',
  },

  // Support & Community
  {
    category: 'Support & Community',
    question: 'How can I contact SkillLinkup?',
    answer: 'You can reach us through our contact form, email us directly, or connect with us on social media. We typically respond within 24-48 hours.',
  },
  {
    category: 'Support & Community',
    question: 'Do you offer freelancing advice or coaching?',
    answer: 'While we don\'t offer one-on-one coaching, our blog contains extensive guides, tips, and strategies for freelance success. We also send weekly tips via our newsletter.',
  },
  {
    category: 'Support & Community',
    question: 'Can I contribute content to SkillLinkup?',
    answer: 'We welcome guest contributions from experienced freelancers! If you have insights or experiences to share, please reach out through our contact page with your proposal.',
  },
];

const categories = Array.from(new Set(faqData.map(item => item.category)));

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Breadcrumb */}
        <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/" className="hover:text-primary dark:hover:text-accent transition-colors">
                Home
              </Link>
              <span>→</span>
              <span className="text-gray-900 dark:text-white font-semibold">FAQ</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-800 py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-accent dark:bg-accent/90 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Find answers to common questions about SkillLinkup, platform reviews,
                and freelancing success.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-accent dark:focus:ring-accent/80 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-accent text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                All Questions
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedCategory === category
                      ? 'bg-accent text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No questions found matching your search.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex-1 pr-4">
                        <span className="text-xs font-semibold text-accent dark:text-accent-light mb-1 block">
                          {item.category}
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {item.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                          openIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openIndex === index && (
                      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Still Have Questions Section */}
        <section className="bg-white dark:bg-gray-800 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-primary/10 dark:bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-primary dark:text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary dark:bg-accent text-white font-semibold hover:bg-primary/90 dark:hover:bg-accent/90 transition-colors"
                >
                  Contact Support
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Browse Guides
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="bg-accent/10 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Popular Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                href="/reviews"
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all text-center group border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-accent dark:bg-accent/90 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Platform Reviews</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Read detailed reviews of 25+ freelance platforms
                </p>
              </Link>

              <Link
                href="/tools/rate-calculator"
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all text-center group border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-primary dark:bg-accent rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🧮</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Rate Calculator</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Calculate your ideal hourly and project rates
                </p>
              </Link>

              <Link
                href="/newsletter"
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all text-center group border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-secondary dark:bg-accent rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Newsletter</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get weekly tips and insights delivered to your inbox
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
