import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getToolBySlug, getToolsByCategory } from '@/lib/queries';
import { Calculator, FileText, BarChart3, Clock, DollarSign, Users, Zap, Wrench, Eye, ArrowLeft, ExternalLink } from 'lucide-react';

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

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool niet gevonden | SkillLinkup',
    };
  }

  return {
    title: `${tool.name} | SkillLinkup`,
    description: tool.description || `Ontdek ${tool.name} - een handige tool voor freelancers`,
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  // Get related tools from same category
  const relatedTools = await getToolsByCategory(tool.category);
  const filteredRelated = relatedTools.filter(t => t.id !== tool.id).slice(0, 3);

  const Icon = tool.icon && iconMap[tool.icon] ? iconMap[tool.icon] : Wrench;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>→</span>
              <Link href="/tools" className="hover:text-primary transition-colors">
                Tools
              </Link>
              <span>→</span>
              <span className="text-gray-900 font-semibold">{tool.name}</span>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar tools
            </Link>

            <div className="flex items-start gap-6">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: tool.color }}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl md:text-5xl font-bold">{tool.name}</h1>
                  {!tool.is_available && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white">
                      Binnenkort beschikbaar
                    </span>
                  )}
                </div>

                {tool.description && (
                  <p className="text-xl text-white/90 max-w-3xl mb-4">
                    {tool.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{tool.views} views</span>
                  </div>
                  <span>•</span>
                  <span className="capitalize">{tool.category}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                {tool.is_available ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Over deze tool
                    </h2>
                    <div className="prose max-w-none">
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {tool.description}
                      </p>

                      {tool.tool_url && (
                        <div className="mt-8">
                          <a
                            href={tool.tool_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                          >
                            Open tool
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Binnenkort beschikbaar
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Deze tool is momenteel in ontwikkeling. We werken hard om deze tool zo snel mogelijk beschikbaar te maken.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Blijf op de hoogte
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Wil je een melding ontvangen wanneer deze tool beschikbaar is? Schrijf je in voor onze nieuwsbrief.
                      </p>
                      <Link
                        href="/#newsletter"
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
                      >
                        Schrijf je in
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Tool Info Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Tool informatie</h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-gray-600">Categorie</dt>
                    <dd className="font-semibold text-gray-900 capitalize">{tool.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Status</dt>
                    <dd className="font-semibold text-gray-900">
                      {tool.is_available ? (
                        <span className="text-green-600">Beschikbaar</span>
                      ) : (
                        <span className="text-gray-600">In ontwikkeling</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-600">Views</dt>
                    <dd className="font-semibold text-gray-900">{tool.views}</dd>
                  </div>
                </dl>
              </div>

              {/* Related Tools */}
              {filteredRelated.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Gerelateerde tools</h3>
                  <div className="space-y-4">
                    {filteredRelated.map((relatedTool) => {
                      const RelatedIcon = relatedTool.icon && iconMap[relatedTool.icon] ? iconMap[relatedTool.icon] : Wrench;
                      return (
                        <Link
                          key={relatedTool.id}
                          href={`/tools/${relatedTool.slug}`}
                          className="flex items-start gap-3 group"
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: relatedTool.color }}
                          >
                            <RelatedIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm">
                              {relatedTool.name}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {relatedTool.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    href="/tools"
                    className="mt-4 inline-flex items-center text-sm text-primary font-semibold hover:underline"
                  >
                    Bekijk alle tools →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ontdek meer tools voor freelancers
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              We hebben nog veel meer handige tools en resources om je freelance business te laten groeien.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/tools"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
              >
                Bekijk alle tools
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Lees onze guides
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
