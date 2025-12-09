import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'data-science-freelancing';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/niche-gidsen/${slug}`;

  return {
    title: "Data Science Freelancing in 2026: Best Platforms & High-Paying Gigs",
    description: "Complete guide to freelance data science. Top platforms, pricing strategies ($80-$250/hr), and how to land $5,000-$20,000 projects. From Kaggle to Toptal.",
    keywords: "freelance data science, data science platforms 2026, machine learning freelance, data analyst jobs, AI consultant rates",
    openGraph: {
      title: "Data Science Freelancing in 2026: Best Platforms & High-Paying Gigs",
      description: "Complete guide to freelance data science. Top platforms, pricing strategies ($80-$250/hr), and how to land $5,000-$20,000 projects. From Kaggle to Toptal.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [
        {
          url: `${siteUrl}/images/og/gids-og.png`,
          width: 1200,
          height: 630,
          alt: 'Data Science Freelancing 2026 - SkillLinkup',
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Data Science Freelancing in 2026: Best Platforms & High-Paying Gigs",
      description: "Complete guide to freelance data science. Top platforms, pricing strategies ($80-$250/hr), and how to land $5,000-$20,000 projects. From Kaggle to Toptal.",
      images: [`${siteUrl}/images/og/gids-og.png`],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function DataSciencePage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f8f9fb]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#1e1541] via-[#2a1f5e] to-[#1e1541] text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                Data Science Freelancing: Where to Find High-Paying Gigs in 2026
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                You know Python, TensorFlow, and SQL. You've built ML models that actually work. But how do you find clients who pay $150-250/hour for your skills? This guide reveals where data scientists earn $100K-300K annually as freelancers.
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Compare Platforms →
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">

          {/* Section 1: Platform Comparison */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Best Platforms for Data Science Freelancers (2026)
            </h2>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1e1541] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-heading font-semibold">Platform</th>
                      <th className="px-6 py-4 text-left font-heading font-semibold">Rate Range</th>
                      <th className="px-6 py-4 text-left font-heading font-semibold">Commission</th>
                      <th className="px-6 py-4 text-left font-heading font-semibold">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">Toptal</td>
                      <td className="px-6 py-4 text-[#64607d]">$120-250/hr</td>
                      <td className="px-6 py-4 text-[#22c55e] font-semibold">0% (fixed rate)</td>
                      <td className="px-6 py-4 text-[#64607d]">Senior ML engineers</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">Turing</td>
                      <td className="px-6 py-4 text-[#64607d]">$80-180/hr</td>
                      <td className="px-6 py-4 text-[#64607d]">15%</td>
                      <td className="px-6 py-4 text-[#64607d]">Full-time remote</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">Upwork</td>
                      <td className="px-6 py-4 text-[#64607d]">$40-200/hr</td>
                      <td className="px-6 py-4 text-[#64607d]">5-20%</td>
                      <td className="px-6 py-4 text-[#64607d]">All experience levels</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">Kolabtree</td>
                      <td className="px-6 py-4 text-[#64607d]">$2,000-20,000/project</td>
                      <td className="px-6 py-4 text-[#64607d]">15-20%</td>
                      <td className="px-6 py-4 text-[#64607d]">PhD-level projects</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">Kaggle</td>
                      <td className="px-6 py-4 text-[#64607d]">$5,000-100,000/competition</td>
                      <td className="px-6 py-4 text-[#22c55e] font-semibold">0% (prize money)</td>
                      <td className="px-6 py-4 text-[#64607d]">Competition-based</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">Expert360</td>
                      <td className="px-6 py-4 text-[#64607d]">$150-300/hr</td>
                      <td className="px-6 py-4 text-[#64607d]">18%</td>
                      <td className="px-6 py-4 text-[#64607d]">Enterprise consulting</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-[#1e1541]">DataCamp</td>
                      <td className="px-6 py-4 text-[#64607d]">$5,000-15,000/course</td>
                      <td className="px-6 py-4 text-[#64607d]">Variable</td>
                      <td className="px-6 py-4 text-[#64607d]">Course creation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 2: Platform Deep Dives */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Platform-by-Platform Breakdown
            </h2>

            {/* Toptal */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-heading font-bold text-2xl text-[#1e1541]">
                  1. Toptal - Elite Data Science Network
                </h3>
                <span className="bg-[#22c55e] text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  Highest Rates
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ✅ Pros
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Premium rates ($120-250/hr)</li>
                    <li>• Zero platform fees</li>
                    <li>• Fortune 500 clients</li>
                    <li>• Long-term engagements (3-12 months)</li>
                    <li>• Dedicated account managers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ❌ Cons
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Extremely competitive (97% rejection)</li>
                    <li>• Requires 5+ years ML/AI experience</li>
                    <li>• Lengthy vetting (3-5 weeks)</li>
                    <li>• Must pass coding + algorithm tests</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 Perfect If:
                </p>
                <p className="text-[#64607d]">
                  You have senior ML/AI expertise with production experience. You've built models that solved real business problems. You can discuss trade-offs between accuracy, latency, and cost.
                </p>
              </div>
            </div>

            {/* Turing */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-4">
                2. Turing - Remote Data Science Jobs
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ✅ Pros
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Competitive rates ($80-180/hr)</li>
                    <li>• Long-term stability (6+ months)</li>
                    <li>• US companies, global remote work</li>
                    <li>• AI-powered matching</li>
                    <li>• Benefits support (healthcare stipends)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ❌ Cons
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• 15% platform commission</li>
                    <li>• Full-time commitment (40 hrs/week)</li>
                    <li>• US timezone overlap required</li>
                    <li>• Less flexibility than project work</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 Perfect If:
                </p>
                <p className="text-[#64607d]">
                  You want remote employment with US tech companies. You prefer stability over project variety. You're comfortable with full-time hours and team collaboration.
                </p>
              </div>
            </div>

            {/* Upwork */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-heading font-bold text-2xl text-[#1e1541]">
                  3. Upwork - Largest Data Science Marketplace
                </h3>
                <span className="bg-[#ef2b70] text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  Most Projects
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ✅ Pros
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Hundreds of data science jobs daily</li>
                    <li>• All specializations (ML, analytics, NLP, CV)</li>
                    <li>• Beginner to expert opportunities</li>
                    <li>• Escrow payment protection</li>
                    <li>• Build long-term client base</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ❌ Cons
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• High competition (50-100 bids/job)</li>
                    <li>• 20% fee on first $500</li>
                    <li>• Connect costs ($0.15-0.45/bid)</li>
                    <li>• Quality varies (scams exist)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 Perfect If:
                </p>
                <p className="text-[#64607d]">
                  You're building your portfolio or testing different niches. You want project variety. You can write technical proposals that demonstrate expertise. You're patient with client education.
                </p>
              </div>
            </div>

            {/* Kolabtree */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-4">
                4. Kolabtree - Scientific & Research Projects
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ✅ Pros
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• PhD-level projects ($2,000-20,000)</li>
                    <li>• Academic and biotech clients</li>
                    <li>• Research-focused work</li>
                    <li>• Publication opportunities</li>
                    <li>• Specialized expertise valued</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ❌ Cons
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• 15-20% commission</li>
                    <li>• Requires PhD or equivalent</li>
                    <li>• Slower project pace</li>
                    <li>• Academic budgets can be limited</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 Perfect If:
                </p>
                <p className="text-[#64607d]">
                  You have a PhD in statistics, CS, or related field. You enjoy research-oriented work. You want to work on cutting-edge scientific problems with academic or biotech companies.
                </p>
              </div>
            </div>

            {/* Kaggle */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="font-heading font-bold text-2xl text-[#1e1541] mb-4">
                5. Kaggle - Competitive Data Science
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ✅ Pros
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• High prize pools ($5,000-$100,000+)</li>
                    <li>• Portfolio building (Grandmaster status)</li>
                    <li>• Real business problems</li>
                    <li>• Learn from top performers</li>
                    <li>• Direct path to job offers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1e1541] mb-3">
                    ❌ Cons
                  </h4>
                  <ul className="space-y-2 text-[#64607d]">
                    <li>• Highly competitive (1000s of entries)</li>
                    <li>• No guaranteed income</li>
                    <li>• Time-intensive (weeks per competition)</li>
                    <li>• Winner-takes-all structure</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#f8f9fb] rounded-lg p-6">
                <p className="text-[#1e1541] font-semibold mb-2">
                  💡 Perfect If:
                </p>
                <p className="text-[#64607d]">
                  You're early in your data science career and need portfolio pieces. You enjoy competitive problem-solving. You have time to invest in competitions for potential big payouts and recognition.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#ef2b70] to-[#d91a5f] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Compare All Data Science Platforms
              </h3>
              <p className="text-xl mb-6 text-white/90">
                See detailed comparisons of fees, project types, and client quality
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                View Full Comparison →
              </Link>
            </div>
          </section>

          {/* Section 3: Pricing & Specializations */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              High-Paying Data Science Specializations in 2026
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  1. Machine Learning Engineering ($120-250/hr)
                </h3>
                <p className="text-[#64607d] mb-4">
                  Building production ML systems that scale. Not just model training—deployment, monitoring, retraining pipelines. Requires MLOps knowledge, cloud platforms (AWS SageMaker, GCP Vertex AI), and software engineering skills.
                </p>
                <div className="bg-[#f8f9fb] rounded-lg p-4">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Key skills:</strong> PyTorch/TensorFlow, Docker, Kubernetes, CI/CD for ML, model versioning
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  2. Computer Vision Engineering ($100-200/hr)
                </h3>
                <p className="text-[#64607d] mb-4">
                  Object detection, image segmentation, facial recognition for security, retail, healthcare. Hot demand in autonomous vehicles, medical imaging, and retail analytics. YOLO, Detectron2, and custom architectures.
                </p>
                <div className="bg-[#f8f9fb] rounded-lg p-4">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Top clients:</strong> E-commerce (visual search), healthcare (radiology AI), security companies
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  3. NLP & LLM Fine-Tuning ($90-180/hr)
                </h3>
                <p className="text-[#64607d] mb-4">
                  Custom chatbots, sentiment analysis, document classification using GPT-4, BERT, or custom transformers. Huge demand post-ChatGPT for businesses wanting private LLM solutions.
                </p>
                <div className="bg-[#f8f9fb] rounded-lg p-4">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Hot niche:</strong> RAG (Retrieval-Augmented Generation) for enterprise knowledge bases
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  4. Data Engineering & Pipelines ($80-150/hr)
                </h3>
                <p className="text-[#64607d] mb-4">
                  Building ETL pipelines, data warehouses, real-time data processing. Less "sexy" than ML but consistent demand. Companies need data infrastructure before they can do ML.
                </p>
                <div className="bg-[#f8f9fb] rounded-lg p-4">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Tech stack:</strong> Airflow, dbt, Spark, Kafka, Snowflake, BigQuery
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  5. Business Analytics & BI ($60-120/hr)
                </h3>
                <p className="text-[#64607d] mb-4">
                  SQL, Tableau/PowerBI dashboards, A/B testing, cohort analysis. Lower barrier to entry but high volume of work. Perfect for consultants who can translate data into business insights.
                </p>
                <div className="bg-[#f8f9fb] rounded-lg p-4">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Best for:</strong> Mid-level analysts who want consulting flexibility without deep ML expertise
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Success Strategies */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              5 Keys to Landing High-Paying Data Science Projects
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  1. Build a Public Portfolio That Shows Business Impact
                </h3>
                <p className="text-[#64607d] mb-3">
                  Don't just show model accuracy. Show business outcomes:
                </p>
                <ul className="space-y-2 text-[#64607d] ml-6 mb-4">
                  <li>• "Reduced customer churn by 23% using XGBoost classification"</li>
                  <li>• "Increased recommendation CTR by 47% with collaborative filtering"</li>
                  <li>• "Automated invoice processing, saving 200 hours/month"</li>
                </ul>
                <div className="bg-[#f8f9fb] rounded-lg p-4">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Portfolio platforms:</strong> GitHub (code + notebooks), Medium (write-ups), personal website (case studies)
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  2. Achieve Kaggle Grandmaster or Equivalent Status
                </h3>
                <p className="text-[#64607d] mb-4">
                  Kaggle Grandmaster = instant credibility. Alternative credentials: Published papers, conference talks, open-source contributions (Hugging Face, PyTorch). These signal expertise better than any certificate.
                </p>
                <div className="bg-[#f8f9fb] rounded-lg p-4">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">ROI:</strong> 3-6 months investment → 50-100% rate increase
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  3. Specialize in Industry-Specific Problems
                </h3>
                <p className="text-[#64607d] mb-4">
                  Generalists compete on price. Specialists command premium rates. Top-paying industries:
                </p>
                <ul className="space-y-2 text-[#64607d] ml-6">
                  <li>• <strong className="text-[#1e1541]">Finance:</strong> Fraud detection, algorithmic trading, credit scoring</li>
                  <li>• <strong className="text-[#1e1541]">Healthcare:</strong> Medical imaging, drug discovery, patient outcome prediction</li>
                  <li>• <strong className="text-[#1e1541]">E-commerce:</strong> Recommendation engines, dynamic pricing, inventory optimization</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  4. Master the Consulting Skills (Not Just Technical)
                </h3>
                <p className="text-[#64607d] mb-4">
                  80% of data science projects fail not because of bad models, but bad communication. Learn to:
                </p>
                <ul className="space-y-2 text-[#64607d] ml-6">
                  <li>• Translate business problems into ML problems</li>
                  <li>• Present findings to non-technical stakeholders</li>
                  <li>• Set realistic expectations (ML isn't magic)</li>
                  <li>• Build trust through transparent methodology</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-3">
                  5. Offer End-to-End Solutions, Not Just Models
                </h3>
                <p className="text-[#64607d] mb-4">
                  Clients don't want a .pkl file—they want a deployed solution. Expand your offering to include:
                </p>
                <ul className="space-y-2 text-[#64607d] ml-6 mb-4">
                  <li>• Data pipeline setup</li>
                  <li>• Model deployment (API, web app, dashboard)</li>
                  <li>• Monitoring and retraining systems</li>
                  <li>• Documentation and training</li>
                </ul>
                <div className="bg-[#f8f9fb] rounded-lg p-4">
                  <p className="text-sm text-[#64607d]">
                    <strong className="text-[#1e1541]">Rate multiplier:</strong> Model-only = $80/hr. Full deployment = $150-200/hr.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 2 */}
          <section className="mb-16">
            <div className="bg-[#1e1541] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Calculate Your Data Science Rate
              </h3>
              <p className="text-xl mb-6 text-gray-300">
                Free calculator shows what to charge based on experience and specialization
              </p>
              <Link
                href={`/${locale}/tools/rate-calculator`}
                className="inline-block rounded-lg bg-[#22c55e] hover:bg-[#16a34a] px-8 py-4 text-white font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Calculate Your Rate →
              </Link>
            </div>
          </section>

          {/* Section 5: Getting Started */}
          <section className="mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1e1541] mb-6">
              Your 6-Month Data Science Freelancing Launch Plan
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Months 1-2: Build Portfolio & Credentials
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Complete 3-5 Kaggle competitions (aim for top 10% finishes). Create 2-3 end-to-end projects solving real business problems. Document everything on GitHub with clear READMEs.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Months 3-4: Apply to Premium Platforms
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Apply to Toptal (expect rejection, reapply after improvement). Join Upwork and land first 3 projects at $50-80/hr. Build testimonials and case studies. Join Turing for stable income.
                  </p>
                  <Link
                    href={`/${locale}/platforms`}
                    className="text-[#ef2b70] hover:text-[#d91a5f] font-semibold inline-flex items-center"
                  >
                    Compare platforms →
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
                <div className="bg-[#ef2b70] text-white font-heading font-bold rounded-full w-12 h-12 flex items-center justify-center text-xl mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-xl text-[#1e1541] mb-2">
                    Months 5-6: Specialize & Scale Rates
                  </h3>
                  <p className="text-[#64607d] mb-3">
                    Choose one specialization (CV, NLP, or industry). Become the go-to expert. Raise rates to $100-150/hr. Land 1-2 long-term retainer clients. Aim for $8,000-15,000/month income.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg shadow-xl p-8 text-center text-white">
              <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Explore More Tech Freelancing Guides
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Find specialized guides for developers, designers, and other tech professionals
              </p>
              <Link
                href={`/${locale}/gids/niche-gidsen`}
                className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#22c55e] font-heading font-semibold shadow-lg transition-all text-lg"
              >
                Browse All Niche Guides →
              </Link>
            </div>
          </section>

        </article>

        {/* Schema.org Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Data Science Freelancing in 2026: Best Platforms & High-Paying Gigs",
              "description": "Complete guide to freelance data science. Top platforms, pricing strategies ($80-$250/hr), and how to land $5,000-$20,000 projects. From Kaggle to Toptal.",
              "author": {
                "@type": "Organization",
                "name": "SkillLinkup"
              },
              "publisher": {
                "@type": "Organization",
                "name": "SkillLinkup",
                "logo": {
                  "@type": "ImageObject",
                  "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/images/logo.png`
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/niche-gidsen/data-science-freelancing`
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}`
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Guides",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids`
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Niche Guides",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/niche-gidsen`
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Data Science Freelancing",
                  "item": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com'}/${locale}/gids/niche-gidsen/data-science-freelancing`
                }
              ]
            })
          }}
        />
      </main>

      <Footer />
    </>
  );
}
