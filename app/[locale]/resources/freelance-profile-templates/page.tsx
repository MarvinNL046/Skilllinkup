import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;

  return {
    title: "Winning Freelance Profile: Templates & Examples That Get Hired",
    description: "Copy-paste profile templates and real examples that attract clients. Professional bio formulas, headline strategies, and portfolio tips for freelancers.",
    openGraph: {
      title: "Winning Freelance Profile: Templates & Examples That Get Hired",
      description: "Copy-paste profile templates and real examples that attract clients. Professional bio formulas, headline strategies, and portfolio tips for freelancers.",
      type: "article",
    },
  };
}

export default async function FreelanceProfileTemplatesPage({ params }: PageProps) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Creating a Winning Freelance Profile: Templates and Examples",
    "description": "Step-by-step guide with templates and real examples for creating freelance profiles that attract premium clients.",
    "totalTime": "PT2H",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Choose Professional Photo",
        "text": "Select a clear, friendly headshot with good lighting and professional attire."
      },
      {
        "@type": "HowToStep",
        "name": "Write Compelling Headline",
        "text": "Create value-focused headline that showcases your unique selling proposition."
      },
      {
        "@type": "HowToStep",
        "name": "Craft Results-Oriented Bio",
        "text": "Write 200-300 word bio focusing on client benefits and proven results."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-accent/10 via-white to-primary/10 dark:from-secondary dark:via-gray-900 dark:to-gray-800 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 dark:bg-accent/30 text-accent dark:text-accent text-sm font-semibold mb-6">
                <span className="text-xl">✨</span>
                <span>Profile Templates & Examples</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                Creating a Winning Freelance Profile: Templates and Examples
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Your profile is your digital storefront. Use these proven templates, real examples, and expert strategies to create a profile that attracts premium clients and stands out from the competition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-accent text-white font-heading font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
                >
                  Browse Platforms
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-primary mb-1">87%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Clients view profiles first</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-accent mb-1">3.5x</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">More invites with photo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-secondary mb-1">40%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Higher rates with portfolio</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">

              {/* Profile Photo */}
              <div className="mb-12">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">📸</span>
                  Your Profile Photo: First Impressions Matter
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Before clients read a single word, they see your photo. Profiles with professional photos receive 40% more views and 3.5x more client invitations than profiles without photos. Here&apos;s how to get it right:
                </p>

                <div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-2xl p-8 border border-accent/20 dark:border-accent/30 mb-6">
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Photo Checklist:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-accent text-2xl mt-1">✓</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">Clear headshot:</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Face takes up 60-70% of frame, shoulders visible</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent text-2xl mt-1">✓</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">Good lighting:</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Natural light from window or professional setup, no harsh shadows</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent text-2xl mt-1">✓</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">Genuine smile:</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Warm, approachable expression (not too serious or silly)</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent text-2xl mt-1">✓</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">Professional attire:</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Business casual minimum, match your niche (creative vs. corporate)</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent text-2xl mt-1">✓</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">Clean background:</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Solid color or neutral workspace, no distractions</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-accent text-2xl mt-1">✓</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">Recent photo:</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Taken within last 12 months, represents current appearance</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-6 my-6 rounded-r-xl">
                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">❌ Avoid These Photo Mistakes:</p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Group photos (clients need to identify you)</li>
                    <li>• Sunglasses or hats (hide your face)</li>
                    <li>• Overly filtered or edited photos (looks unprofessional)</li>
                    <li>• Selfies with visible arm/poor angle</li>
                    <li>• Photos with pets, food, or at parties</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-6 my-6 rounded-r-xl">
                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">💡 Budget-Friendly Photo Solutions:</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Can&apos;t afford a professional photographer? No problem:
                  </p>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Ask a friend to take photos with your smartphone near a window</li>
                    <li>• Use a tripod ($15-30) with timer mode for self-shots</li>
                    <li>• Visit a local college—photography students often offer free sessions for portfolio work</li>
                    <li>• Use AI background removers (remove.bg) to clean up backgrounds</li>
                  </ul>
                </div>
              </div>

              {/* Profile Headline */}
              <div className="mb-12">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">🎯</span>
                  Crafting Your Headline: The Hook That Stops Scrolling
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Your headline appears everywhere—search results, proposals, messages. It&apos;s your elevator pitch in 10 words or less. A great headline focuses on the value you provide, not just your job title.
                </p>

                <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl p-6 my-6 border border-primary/20 dark:border-primary/30">
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">The Value-Focused Headline Formula:</h3>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 mb-4 border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 font-mono text-sm">
                      [Result You Deliver] + [Who You Help] + [Your Approach]
                    </p>
                  </div>

                  <div className="space-y-4 mt-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500 font-bold">❌ Weak:</span>
                        <span className="text-gray-600 dark:text-gray-400">&quot;Freelance Writer&quot;</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-bold">✓ Strong:</span>
                        <span className="text-gray-900 dark:text-white font-semibold">&quot;I Help SaaS Companies Turn Blog Readers Into Paying Customers&quot;</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500 font-bold">❌ Weak:</span>
                        <span className="text-gray-600 dark:text-gray-400">&quot;Graphic Designer&quot;</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-bold">✓ Strong:</span>
                        <span className="text-gray-900 dark:text-white font-semibold">&quot;Brand Designer Who Makes Small Businesses Look Like Industry Leaders&quot;</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500 font-bold">❌ Weak:</span>
                        <span className="text-gray-600 dark:text-gray-400">&quot;Virtual Assistant&quot;</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-bold">✓ Strong:</span>
                        <span className="text-gray-900 dark:text-white font-semibold">&quot;Virtual Assistant Giving Entrepreneurs 20+ Hours Back Every Week&quot;</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-500 font-bold">❌ Weak:</span>
                        <span className="text-gray-600 dark:text-gray-400">&quot;Web Developer&quot;</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-bold">✓ Strong:</span>
                        <span className="text-gray-900 dark:text-white font-semibold">&quot;I Build Lightning-Fast Websites That Rank #1 on Google&quot;</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-6 my-6 rounded-r-xl">
                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">💡 Pro Tip:</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Test different headlines! Most platforms let you change your headline anytime. Try 3-4 variations over a few weeks and see which gets the most profile views and client messages.
                  </p>
                </div>
              </div>

              {/* CTA 1 */}
              <div className="my-12 bg-gradient-to-r from-accent via-accent/90 to-primary rounded-2xl p-8 text-center shadow-xl">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  Ready to Set Up Your Profile?
                </h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Compare beginner-friendly platforms and find the perfect place to showcase your new profile.
                </p>
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-accent font-heading font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  Browse Platforms
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>

              {/* Bio Templates */}
              <div className="mb-12">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">📝</span>
                  Your Bio: The Story That Sells
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Your bio is where you build trust, showcase expertise, and convince clients you&apos;re the right choice. Most freelancers write boring, self-focused bios. You&apos;re going to write a client-focused story that sells results.
                </p>

                <div className="bg-gradient-to-br from-secondary/5 to-primary/5 dark:from-secondary/10 dark:to-primary/10 rounded-2xl p-8 border border-secondary/20 dark:border-secondary/30 mb-6">
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">The 3-Part Bio Structure:</h3>

                  <div className="space-y-6">
                    <div className="border-l-4 border-primary pl-6">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Part 1: The Hook (2-3 sentences)</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        Start with a client pain point or bold statement. Make it about them, not you.
                      </p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 italic">
                          &quot;Your website loads in 8 seconds. That means 53% of mobile visitors leave before even seeing your content. I fix that. I build lightning-fast WordPress sites that load in under 2 seconds and turn more visitors into customers.&quot;
                        </p>
                      </div>
                    </div>

                    <div className="border-l-4 border-accent pl-6">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Part 2: Proof & Experience (4-5 sentences)</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        Showcase credentials, experience, and results. Use numbers whenever possible.
                      </p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 italic">
                          &quot;I&apos;ve been building WordPress sites for 5+ years, completing 127 projects for clients in e-commerce, SaaS, and consulting. My sites average a 40% higher conversion rate than industry benchmarks. I specialize in WooCommerce stores, membership sites, and high-traffic blogs. Every site includes mobile optimization, SEO setup, and performance testing.&quot;
                        </p>
                      </div>
                    </div>

                    <div className="border-l-4 border-secondary pl-6">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Part 3: The Invitation (2-3 sentences)</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        End with a clear call-to-action and make it easy to take the next step.
                      </p>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 italic">
                          &quot;If you need a WordPress site that&apos;s fast, beautiful, and actually converts visitors into customers, let&apos;s talk. Check out my portfolio below and send me a message with your project details. I typically respond within 2 hours.&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-2xl p-8 border border-accent/20 dark:border-accent/30">
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Complete Bio Template (Copy & Customize):</h3>
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-primary/20 dark:border-primary/30">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line font-mono text-sm">
{`[Pain Point/Bold Statement about client's problem]

I [what you do] for [target audience]. I specialize in [your main skills/services].

I've [years/projects completed], helping [types of clients] achieve [specific results]. My work has [impressive outcome with numbers]. I'm experienced in [key skills/tools], and I [your unique approach or guarantee].

[Notable credential/certification/achievement]. [Another proof point with numbers].

If you need [service] that [desired outcome], let's talk. [Clear next step]. I [response time promise or guarantee].`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Real Examples */}
              <div className="mb-12">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">⭐</span>
                  Real Profile Examples That Got Hired
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Let&apos;s look at real profiles from successful freelancers across different niches. Study these examples to understand what makes them effective:
                </p>

                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-primary/20 dark:border-primary/30 shadow-md">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                        SC
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Sarah Chen</h3>
                        <p className="text-primary font-semibold">Content Writer • $120/hr • 98% Job Success</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      &quot;I Turn Your Blog Into Your #1 Sales Channel With SEO Content That Actually Converts&quot;
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Your blog posts get traffic but no sales. I fix that. I write SEO-optimized content that ranks on Google AND turns readers into paying customers.
                      <br/><br/>
                      I&apos;ve written 500+ blog posts for SaaS companies, helping them generate $2M+ in revenue from organic traffic. My articles average 3,500 words, rank in the top 3 for target keywords, and include strategic CTAs that convert at 8-12%. I specialize in long-form guides, comparison posts, and thought leadership content.
                      <br/><br/>
                      If you need blog content that drives actual business results (not just traffic), let&apos;s talk. Check my portfolio for samples and client testimonials. I respond within 4 hours.
                    </p>
                    <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-4 border-l-4 border-accent">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Why This Works:</p>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Opens with client pain point</li>
                        <li>• Uses specific numbers ($2M revenue, 8-12% conversion)</li>
                        <li>• Specializes instead of being generic</li>
                        <li>• Ends with clear call-to-action</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 border-accent/20 dark:border-accent/30 shadow-md">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-white text-2xl font-bold">
                        MP
                      </div>
                      <div>
                        <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Marcus Patterson</h3>
                        <p className="text-accent font-semibold">Video Editor • $85/hr • Top Rated Plus</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      &quot;Your YouTube Videos Deserve Better Than Template Edits—I Create Thumb-Stopping Content&quot;
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Generic editing kills viewer retention. I edit YouTube videos that keep audiences watching until the end—because that&apos;s what the algorithm rewards.
                      <br/><br/>
                      I&apos;ve edited 300+ YouTube videos for creators with 10K-500K subscribers, helping them increase average view duration by 35%. I specialize in fast-paced edits with motion graphics, dynamic captions, and retention-focused pacing. Tools: Premiere Pro, After Effects, DaVinci Resolve.
                      <br/><br/>
                      Need an editor who understands the YouTube algorithm AND creative storytelling? Send me your channel link and project details. I deliver within 48-72 hours with unlimited revisions until you love it.
                    </p>
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 border-l-4 border-primary">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Why This Works:</p>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Strong headline that differentiates</li>
                        <li>• Focuses on results (35% increase in view duration)</li>
                        <li>• Shows platform expertise (YouTube algorithm)</li>
                        <li>• Includes guarantee (unlimited revisions)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-500 p-6 rounded-r-xl">
                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">💡 Pattern Recognition:</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Notice how both profiles: (1) Start with a problem, (2) Use specific numbers, (3) Specialize in a niche, (4) Include clear next steps. This formula works across all freelance categories.
                  </p>
                </div>
              </div>

              {/* Portfolio Section */}
              <div className="mb-12">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">🎨</span>
                  Building Your Portfolio (Even as a Beginner)
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  &quot;But I don&apos;t have any client work yet!&quot; No problem. Every successful freelancer started with zero clients. Here&apos;s how to create a portfolio that proves your skills:
                </p>

                <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl p-8 border border-primary/20 dark:border-primary/30 mb-6">
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Portfolio Strategies by Skill:</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="text-primary">▸</span>
                        For Writers:
                      </h4>
                      <ul className="ml-8 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>• Write 3-5 blog posts for fictional companies in your target niche</li>
                        <li>• Create comparison articles about real products/services</li>
                        <li>• Publish on Medium or your own blog to show writing samples</li>
                        <li>• Rewrite bad product descriptions or website copy (before/after)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="text-accent">▸</span>
                        For Designers:
                      </h4>
                      <ul className="ml-8 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>• Create logos for fictional businesses in different industries</li>
                        <li>• Redesign existing brands with before/after presentations</li>
                        <li>• Design social media templates or infographics</li>
                        <li>• Create a full brand identity mockup (logo, colors, typography)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="text-secondary">▸</span>
                        For Developers:
                      </h4>
                      <ul className="ml-8 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>• Build 2-3 demo websites or web apps showcasing your skills</li>
                        <li>• Contribute to open-source projects on GitHub</li>
                        <li>• Create CodePen demos of interactive components</li>
                        <li>• Rebuild popular website landing pages from scratch</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="text-primary">▸</span>
                        For Virtual Assistants:
                      </h4>
                      <ul className="ml-8 space-y-2 text-gray-700 dark:text-gray-300">
                        <li>• Create sample email management systems or SOPs</li>
                        <li>• Build example spreadsheets for common business tasks</li>
                        <li>• Document your organizational systems with screenshots</li>
                        <li>• Offer one free project to a small business for testimonial</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-500 p-6 my-6 rounded-r-xl">
                  <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">💡 Pro Tip:</p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Quality over quantity! Three excellent portfolio pieces are infinitely better than ten mediocre ones. Spend time making each sample the absolute best work you can produce.
                  </p>
                </div>
              </div>

              {/* CTA 2 */}
              <div className="my-12 bg-gradient-to-r from-secondary via-primary to-accent rounded-2xl p-8 text-center shadow-xl">
                <h3 className="text-2xl font-heading font-bold text-white mb-4">
                  See Real Freelancer Success Stories
                </h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Read how other beginners built winning profiles and landed their first clients using these exact strategies.
                </p>
                <Link
                  href={`/${locale}/reviews`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-secondary font-heading font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  Read Success Stories
                  <span className="text-xl">✨</span>
                </Link>
              </div>

              {/* Optimization Tips */}
              <div className="mb-12">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">🔧</span>
                  Profile Optimization Checklist
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Your profile is never &quot;done.&quot; The most successful freelancers continuously optimize based on results. Use this checklist to ensure your profile is working as hard as possible:
                </p>

                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors">
                    <div className="flex items-start gap-4">
                      <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Keywords in Your Title & Bio</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          Include skills clients actually search for. For writers: &quot;SEO&quot;, &quot;blog posts&quot;, &quot;content marketing&quot;. Check competitor profiles for common terms.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors">
                    <div className="flex items-start gap-4">
                      <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Skill Tests & Certifications</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          Take platform skill tests to earn badges. Add free certifications from Google, HubSpot, Facebook Blueprint. These build instant credibility.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors">
                    <div className="flex items-start gap-4">
                      <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Availability & Response Time</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          Set availability to &quot;Available Now&quot; or &quot;Full Time&quot; as a beginner. Mention your fast response time in bio (&quot;I respond within 2 hours&quot;).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors">
                    <div className="flex items-start gap-4">
                      <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Hourly Rate Strategy</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          Start 20-30% below market rate for first 5 clients. Increase by $5-10/hr after each set of positive reviews. Test higher rates—you can always adjust.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors">
                    <div className="flex items-start gap-4">
                      <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Portfolio Descriptions</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          Don&apos;t just upload samples—write descriptions! Explain the challenge, your solution, and results achieved. Use 100-150 words per portfolio piece.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors">
                    <div className="flex items-start gap-4">
                      <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Profile Video (Optional but Powerful)</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          30-60 second video introducing yourself increases trust by 40%. Use your phone, keep it simple, focus on what you do and who you help.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors">
                    <div className="flex items-start gap-4">
                      <input type="checkbox" className="mt-1 w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Regular Updates</h4>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          Update portfolio monthly with new work. Refresh bio every 3 months. Test new headlines quarterly. Profiles that show activity get more visibility.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="mb-12">
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-4xl">🎯</span>
                  Your Profile Creation Action Plan
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Don&apos;t let perfectionism stop you. Here&apos;s your step-by-step action plan to create your profile today:
                </p>

                <div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-2xl p-8 border border-accent/20 dark:border-accent/30">
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">2-Hour Profile Setup:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">Get Your Photo (20 min):</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Set up near window, ask friend to take 10+ shots, pick best one</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">Write Your Headline (15 min):</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Use value formula above, write 3 versions, pick strongest</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">Draft Your Bio (45 min):</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Follow 3-part structure, use bio template, customize for your niche</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">Add Skills & Tests (20 min):</strong>
                        <span className="text-gray-700 dark:text-gray-300"> List 10-15 relevant skills, take 2-3 platform skill tests</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">Upload 1 Portfolio Piece (20 min):</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Start with your best sample, add detailed description</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-white dark:bg-gray-900 rounded-xl border border-primary/20 dark:border-primary/30">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-primary">Remember:</strong> Done is better than perfect. Launch with 80% complete profile, improve as you get feedback from clients.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </article>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-primary via-accent to-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-6">
                Ready to Create Your Winning Profile?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Choose the right platform and set up your professional profile today. Compare features, fees, and find your perfect match.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-heading font-semibold hover:bg-gray-100 transition-all shadow-lg"
                >
                  Compare Platforms
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/newsletter`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-secondary text-white font-heading font-semibold hover:bg-secondary/90 transition-all shadow-lg"
                >
                  Get Weekly Tips
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                Continue Your Freelance Journey
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  href={`/${locale}/seo/freelance-beginners-guide`}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
                >
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    Complete Freelance Beginner&apos;s Guide
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Start from zero and land your first client in 30 days with this comprehensive step-by-step guide.
                  </p>
                </Link>
                <Link
                  href={`/${locale}/seo/first-freelance-proposal`}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
                >
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    Writing Your First Freelance Proposal
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Master the art of proposal writing with templates and examples that consistently get hired.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
