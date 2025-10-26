import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | SkillLinkup",
  description: "Sorry, the page you are looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16 bg-background-light">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-[150px] md:text-[200px] font-heading font-bold leading-none text-primary">
              404
            </h1>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-lg text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          {/* CTA Button */}
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-6 py-3 text-base font-heading font-semibold text-white transition-colors shadow-lg"
          >
            Back to Home
          </Link>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-background-gray">
            <p className="text-sm text-text-secondary mb-4">
              You might be looking for:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/platforms"
                className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
              >
                Browse Platforms
              </Link>
              <span className="text-text-muted">•</span>
              <Link
                href="/blog"
                className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
              >
                Read Blog
              </Link>
              <span className="text-text-muted">•</span>
              <Link
                href="/comparisons"
                className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
              >
                Compare Platforms
              </Link>
              <span className="text-text-muted">•</span>
              <Link
                href="/contact"
                className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
