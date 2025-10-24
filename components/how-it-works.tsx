export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Browse Platforms",
      description: "Explore our comprehensive reviews of 25+ freelance platforms, each analyzed for features, fees, and user experience.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      number: "2",
      title: "Compare Options",
      description: "Use our side-by-side comparisons to evaluate platforms based on your skills, experience level, and work preferences.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Make Your Choice",
      description: "Sign up for your chosen platform with confidence, armed with expert insights and real user experiences.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background-light to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-heading font-bold text-text-primary dark:text-white sm:text-4xl mb-3">
            How It Works
          </h2>
          <p className="text-base text-text-secondary dark:text-gray-300 max-w-2xl mx-auto">
            Find your perfect freelance platform in three simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-3 mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connection Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-accent to-transparent -z-10" />
              )}

              {/* Step Card */}
              <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <span className="text-white font-heading font-bold text-xl">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-4 ml-8 text-accent">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-heading font-bold text-text-primary dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-secondary to-secondary-dark rounded-lg p-8 text-center">
          <h3 className="text-2xl font-heading font-bold text-white mb-3">
            Ready to Find Your Platform?
          </h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Join 1,000+ freelancers who found their perfect platform through our reviews
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/platforms"
              className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-8 py-3 text-base font-heading font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              Browse Platforms
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/comparisons"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent hover:bg-white/10 px-8 py-3 text-base font-heading font-semibold text-white transition-all"
            >
              Compare Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
