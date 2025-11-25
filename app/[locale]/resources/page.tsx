import Link from "next/link";
import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SEO_NAVIGATION } from "@/lib/seo-navigation-data";

interface SeoIndexPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: SeoIndexPageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Complete Freelance Platform Guides - 50+ Expert Resources | SkillLinkup",
    description: "Browse our complete library of 50+ expert freelance guides. Platform selection, pricing strategies, success tips, and platform-specific tutorials to help you thrive as a freelancer.",
    keywords: "freelance guides, platform selection, freelance tips, upwork guide, fiverr guide, freelance success, pricing strategies, freelance tools, platform comparisons",
    openGraph: {
      title: "Complete Freelance Platform Guides - 50+ Expert Resources",
      description: "Browse our complete library of 50+ expert freelance guides covering everything from platform selection to success strategies.",
      type: "website",
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
      title: "Complete Freelance Platform Guides - 50+ Expert Resources",
      description: "Browse our complete library of 50+ expert freelance guides.",
    },
    alternates: {
      canonical: `https://skilllinkup.com/${locale}/resources`,
      languages: {
        en: "https://skilllinkup.com/en/resources",
        nl: "https://skilllinkup.com/nl/resources",
      },
    },
  };
}

export default async function SeoIndexPage({ params }: SeoIndexPageProps) {
  const { locale } = await params;

  // Schema.org JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Complete Freelance Platform Guides",
    description: "Comprehensive library of 50+ expert freelance guides covering platform selection, pricing, success strategies, and more.",
    url: `https://skilllinkup.com/${locale}/resources`,
    publisher: {
      "@type": "Organization",
      name: "SkillLinkup",
      logo: {
        "@type": "ImageObject",
        url: "https://skilllinkup.com/images/logo/skilllinkup-transparant-rozepunt.webp",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: 50,
      itemListElement: SEO_NAVIGATION.flatMap((pillar, pillarIndex) =>
        pillar.subPillars.map((sub, subIndex) => ({
          "@type": "ListItem",
          position: pillarIndex * 5 + subIndex + 1,
          item: {
            "@type": "Article",
            name: sub.name,
            url: `https://skilllinkup.com${sub.slug}`,
            description: sub.description,
          },
        }))
      ),
    },
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background-white to-accent/5 dark:from-primary/5 dark:via-gray-900 dark:to-accent/5 py-20 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent-light text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                50+ Expert Guides
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary dark:text-white mb-6">
                Complete Freelance Platform{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Guides Library
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-text-secondary dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Everything you need to succeed as a freelancer. From choosing the right platform to scaling your business, we've got you covered.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#guides"
                  className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-8 py-3 text-base font-heading font-semibold text-white transition-colors shadow-lg"
                >
                  Browse All Guides
                </Link>
                <Link
                  href="/platforms"
                  className="inline-flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 hover:bg-background-light dark:hover:bg-gray-700 px-8 py-3 text-base font-heading font-semibold text-text-primary dark:text-white border border-background-gray dark:border-gray-700 transition-colors"
                >
                  Compare Platforms
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white dark:bg-gray-900 border-y border-background-gray dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-primary dark:text-primary-light mb-2">50+</div>
                <div className="text-sm text-text-secondary dark:text-gray-400">Expert Guides</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-accent dark:text-accent-light mb-2">10</div>
                <div className="text-sm text-text-secondary dark:text-gray-400">Topic Categories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-primary dark:text-primary-light mb-2">20+</div>
                <div className="text-sm text-text-secondary dark:text-gray-400">Platforms Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-accent dark:text-accent-light mb-2">100%</div>
                <div className="text-sm text-text-secondary dark:text-gray-400">Free Content</div>
              </div>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section id="guides" className="py-20 bg-background-light dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {SEO_NAVIGATION.map((pillar) => (
                <div key={pillar.id}>
                  {/* Pillar Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-5xl">{pillar.icon}</span>
                    <div>
                      <h2 className="text-3xl font-heading font-bold text-text-primary dark:text-white">
                        {pillar.name}
                      </h2>
                      <p className="text-text-secondary dark:text-gray-400 mt-1">
                        {pillar.subPillars.length} comprehensive guides
                      </p>
                    </div>
                  </div>

                  {/* Subpillar Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pillar.subPillars.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={sub.slug}
                        className="group block bg-white dark:bg-gray-900 rounded-lg border border-background-gray dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all hover:shadow-lg p-6"
                      >
                        <h3 className="text-lg font-heading font-semibold text-text-primary dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors mb-2">
                          {sub.name}
                        </h3>
                        <p className="text-sm text-text-secondary dark:text-gray-400 mb-4">
                          {sub.description}
                        </p>
                        <div className="flex items-center text-primary dark:text-primary-light text-sm font-medium">
                          Read Guide
                          <svg
                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary-dark dark:from-primary-dark dark:to-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
                Get Weekly Freelance Tips
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Join 10,000+ freelancers receiving expert tips, platform updates, and success strategies every week.
              </p>
              <Link
                href="/newsletter"
                className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-background-light px-8 py-3 text-base font-heading font-semibold text-primary transition-colors shadow-lg"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
