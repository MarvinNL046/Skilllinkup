import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            Updated Daily
          </div>

          {/* Headline */}
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Find Your Perfect{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Freelance Platform
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mb-6 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
            Compare Upwork, Fiverr, Toptal, and 20+ platforms. Honest reviews to help you succeed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/platforms"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              Browse Platforms
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/comparisons"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Compare
            </Link>
          </div>

          {/* Trust Indicators - Compact */}
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-900 dark:text-white">25+</span> Reviews
            </div>
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-900 dark:text-white">4.9★</span> Rated
            </div>
            <div className="h-1 w-1 rounded-full bg-gray-400"></div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-900 dark:text-white">1000+</span> Helped
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
