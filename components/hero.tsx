import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm font-medium">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
            Updated Daily with New Platform Reviews
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Find the Perfect{" "}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Freelance Platform
            </span>{" "}
            for Your Skills
          </h1>

          {/* Subheadline */}
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl md:text-2xl">
            Honest reviews, detailed comparisons, and expert insights to help you
            succeed as a freelancer. Compare Upwork, Fiverr, Toptal, and 20+ more
            platforms.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/platforms"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
            >
              Browse All Platforms
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/comparisons"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-all"
            >
              Compare Platforms
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground">Platforms Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Freelancers Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Expert Guides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">4.9★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary to-blue-600 opacity-10"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
