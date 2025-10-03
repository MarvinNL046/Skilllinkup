import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export const metadata = {
  title: "About Us - SkillLinkup",
  description: "Learn about SkillLinkup's mission to help freelancers find the perfect platform for their skills.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background-light to-white py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-heading font-bold text-text-primary sm:text-5xl mb-6">
                Helping Freelancers Find Their{" "}
                <span className="text-primary">Perfect Platform</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                We believe every freelancer deserves to work on a platform that matches their skills,
                experience level, and career goals. That's why we created SkillLinkup.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-12 md:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
                    Our Mission
                  </h2>
                  <p className="text-text-secondary leading-relaxed mb-4">
                    The freelance economy is booming, with hundreds of platforms competing for your attention.
                    Each platform has different fee structures, client types, and approval processes.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    SkillLinkup cuts through the noise with honest, data-driven reviews and comparisons.
                    We help you make informed decisions so you can focus on what you do best: your work.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8">
                  <h3 className="text-2xl font-heading font-bold text-text-primary mb-6">
                    What We Do
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-accent">✓</span>
                      <span className="text-text-secondary">
                        Review 25+ freelance platforms with real data
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-accent">✓</span>
                      <span className="text-text-secondary">
                        Provide side-by-side platform comparisons
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-accent">✓</span>
                      <span className="text-text-secondary">
                        Share expert tips and success strategies
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-accent">✓</span>
                      <span className="text-text-secondary">
                        Keep you updated on platform changes
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-background-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-heading font-bold text-text-primary text-center mb-12">
              Our Values
            </h2>
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white text-2xl mb-4">
                  🎯
                </div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                  Honest Reviews
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  We provide unbiased, data-driven reviews with real pros and cons.
                  No sugar-coating, just honest insights.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white text-2xl mb-4">
                  📊
                </div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                  Data-Driven
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Every review is backed by real data: fee structures, approval rates,
                  average earnings, and user satisfaction.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white text-2xl mb-4">
                  🤝
                </div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                  Community First
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  We're built by freelancers, for freelancers. Your success is our success,
                  and we're here to support your journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-white mb-2">
                  25+
                </div>
                <div className="text-sm text-white/90">
                  Platforms Reviewed
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-white mb-2">
                  1,000+
                </div>
                <div className="text-sm text-white/90">
                  Freelancers Helped
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-white mb-2">
                  4.9★
                </div>
                <div className="text-sm text-white/90">
                  Average Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-heading font-bold text-white mb-2">
                  100%
                </div>
                <div className="text-sm text-white/90">
                  Unbiased Reviews
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-6">
                Built by Freelancers, For Freelancers
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                Our team consists of experienced freelancers who have worked across multiple platforms.
                We know the challenges you face because we've faced them ourselves.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/platforms"
                  className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-8 py-3 text-base font-heading font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                >
                  Browse Platforms
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-secondary bg-white hover:bg-background-light px-8 py-3 text-base font-heading font-semibold text-secondary transition-all"
                >
                  Get in Touch
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
