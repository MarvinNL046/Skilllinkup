import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getToolsByCategory } from '@/lib/queries';
import { Wrench, Calculator, FileText, BarChart3, Clock, DollarSign, Users, Zap } from 'lucide-react';
import * as Icons from 'lucide-react';

export const metadata: Metadata = {
  title: 'Freelance Tools & Resources | SkillLinkup',
  description: 'Discover useful tools and calculators for freelancers. Calculate your rates, track your time and more.',
};

// Icon mapping for lucide-react
const iconMap: { [key: string]: any } = {
  Calculator,
  FileText,
  BarChart3,
  Clock,
  DollarSign,
  Users,
  Zap,
};

export default async function ToolsPage() {
  let tools: Awaited<ReturnType<typeof getToolsByCategory>> = [];
  let resources: Awaited<ReturnType<typeof getToolsByCategory>> = [];

  try {
    tools = await getToolsByCategory('tool');
    resources = await getToolsByCategory('resource');
  } catch (error) {
    console.error('Error fetching tools:', error);
  }

  // Add hardcoded tools if database is empty
  const hardcodedTools = [
    {
      id: 'time-tracker-temp',
      owner_id: 'system',
      name: 'Time Tracker',
      slug: 'time-tracker',
      description: 'Track your billable hours and generate reports for your clients',
      category: 'tool',
      icon: 'Clock',
      color: '#3B82F6',
      tool_url: '/tools/time-tracker',
      is_available: true,
      featured: true,
      sort_order: 1,
      views: 0,
      status: 'published',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'rate-calculator-temp',
      owner_id: 'system',
      name: 'Rate Calculator',
      slug: 'rate-calculator',
      description: 'Calculate your ideal hourly rate based on your costs and goals',
      category: 'tool',
      icon: 'Calculator',
      color: '#10B981',
      tool_url: '/tools/rate-calculator',
      is_available: true,
      featured: true,
      sort_order: 2,
      views: 0,
      status: 'published',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 'invoice-generator-temp',
      owner_id: 'system',
      name: 'Invoice Generator',
      slug: 'invoice-generator',
      description: 'Create professional invoices with real-time preview, save, print and download as PDF',
      category: 'tool',
      icon: 'FileText',
      color: '#8B5CF6',
      tool_url: '/tools/invoice-generator',
      is_available: true,
      featured: true,
      sort_order: 3,
      views: 0,
      status: 'published',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  // Use hardcoded tools if database is empty
  if (tools.length === 0) {
    tools = hardcodedTools as any;
  } else {
    // Check if time-tracker exists in database
    const hasTimeTracker = tools.some(t => t.slug === 'time-tracker');
    if (!hasTimeTracker) {
      // Add time tracker to beginning of array
      tools = [hardcodedTools[0] as any, ...tools];
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-white dark:bg-slate-800 py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                  <Wrench className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Freelance Tools & Resources
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Useful tools and calculators to better manage your freelance business.
                From rate calculations to time tracking.
              </p>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Free Freelance Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
              Use our tools to calculate your rates, track your time and organize your business.
            </p>
          </div>

          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {tools.map((tool) => {
                const Icon = tool.icon && iconMap[tool.icon] ? iconMap[tool.icon] : Wrench;
                return (
                  <div
                    key={tool.id}
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200 dark:border-slate-700"
                  >
                    <div className="p-6">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                        style={{ backgroundColor: tool.color }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {tool.description}
                      </p>
                      {tool.is_available ? (
                        <Link
                          href={`/tools/${tool.slug}`}
                          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                        >
                          Start tool →
                        </Link>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            Coming soon
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 mb-16">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                No tools found. Check back soon!
              </p>
            </div>
          )}

          {/* Resources Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Downloads & Resources
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
              Useful templates and guides to help you get started.
            </p>
          </div>

          {resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {resources.map((resource) => {
                const Icon = resource.icon && iconMap[resource.icon] ? iconMap[resource.icon] : FileText;
                return (
                  <div
                    key={resource.id}
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-all border border-gray-200 dark:border-slate-700"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: resource.color }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {resource.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {resource.description}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 mb-16">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                No resources found. Check back soon!
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-primary rounded-lg shadow-lg p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Don't miss new tools!
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              We're constantly working on new tools to make your freelance life easier.
              Sign up for updates.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
              >
                Read our guides
              </Link>
              <Link
                href="/#newsletter"
                className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Stay updated
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
