import Link from "next/link";

export function PlatformComparison() {
  const platforms = [
    {
      name: "Upwork",
      rating: 4.5,
      features: {
        fees: "5-20%",
        paymentProtection: true,
        skillTests: true,
        activeJobs: "1M+",
      },
      pros: ["Largest marketplace", "Payment protection", "Skill tests"],
      cons: ["High competition", "Service fees"],
      color: "primary",
    },
    {
      name: "Fiverr",
      rating: 4.3,
      features: {
        fees: "5-20%",
        paymentProtection: true,
        skillTests: false,
        activeJobs: "500K+",
      },
      pros: ["Easy to start", "Fixed-price gigs", "Fast payments"],
      cons: ["Price competition", "Limited customization"],
      color: "secondary",
    },
    {
      name: "Toptal",
      rating: 4.7,
      features: {
        fees: "0%",
        paymentProtection: true,
        skillTests: true,
        activeJobs: "50K+",
      },
      pros: ["Premium clients", "No fees", "Top 3% talent"],
      cons: ["Strict screening", "Limited availability"],
      color: "accent",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-heading font-bold text-text-primary sm:text-4xl">
            Compare Top Platforms
          </h2>
          <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">
            Side-by-side comparison of the most popular freelance marketplaces
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className="group relative overflow-hidden rounded-lg border-2 border-background-gray bg-background-light p-6 transition-all hover:border-accent hover:shadow-xl"
            >
              {/* Platform Name & Rating */}
              <div className="mb-4">
                <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
                  {platform.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(platform.rating)
                            ? "text-accent"
                            : "text-background-gray"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-text-primary">
                    {platform.rating}
                  </span>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Service Fees</span>
                  <span className="font-semibold text-text-primary">
                    {platform.features.fees}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Active Jobs</span>
                  <span className="font-semibold text-text-primary">
                    {platform.features.activeJobs}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Payment Protection</span>
                  <span className="font-semibold text-accent">
                    {platform.features.paymentProtection ? "✓" : "✗"}
                  </span>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="mb-4 space-y-3">
                <div>
                  <h4 className="text-xs font-heading font-semibold text-text-primary uppercase mb-2">
                    Pros
                  </h4>
                  <ul className="space-y-1">
                    {platform.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-accent mt-0.5">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-heading font-semibold text-text-primary uppercase mb-2">
                    Cons
                  </h4>
                  <ul className="space-y-1">
                    {platform.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-primary mt-0.5">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/platforms/${platform.name.toLowerCase()}`}
                className="inline-flex items-center justify-center w-full rounded-lg bg-primary hover:bg-primary-dark px-4 py-2.5 text-sm font-heading font-semibold text-white transition-all shadow-md hover:shadow-lg"
              >
                Read Full Review
              </Link>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-10 text-center">
          <Link
            href="/comparisons"
            className="inline-flex items-center gap-2 text-base font-heading font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            View All Comparisons
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
