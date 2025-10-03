import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-background-light to-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
            Updated Daily
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-heading font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            Find Your Perfect{" "}
            <span className="text-primary">
              Freelance Platform
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-lg text-text-secondary sm:text-xl">
            Compare Upwork, Fiverr, Toptal, and 20+ platforms. Honest reviews to help you succeed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/platforms"
              className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-8 py-3 text-base font-heading font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              Browse Platforms
              <svg className="ml-2" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/comparisons"
              className="inline-flex items-center justify-center rounded-lg border-2 border-secondary bg-white hover:bg-background-light px-8 py-3 text-base font-heading font-semibold text-secondary transition-all"
            >
              Compare
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm">
            <div className="flex flex-col items-center gap-1">
              <span className="font-heading font-bold text-2xl text-text-primary">25+</span>
              <span className="text-text-muted">Reviews</span>
            </div>
            <div className="h-8 w-px bg-background-gray"></div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-heading font-bold text-2xl text-text-primary">4.9★</span>
              <span className="text-text-muted">Rated</span>
            </div>
            <div className="h-8 w-px bg-background-gray"></div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-heading font-bold text-2xl text-text-primary">1000+</span>
              <span className="text-text-muted">Helped</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
