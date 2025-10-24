import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-background-gray dark:border-gray-800 bg-background-light dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo/skilllinkup-transparant-rozepunt.webp"
                alt="SkillLinkup"
                width={150}
                height={50}
                className="object-contain h-10"
              />
            </Link>
            <p className="mt-4 text-sm text-text-secondary dark:text-gray-400 leading-relaxed">
              Your trusted guide to finding the perfect freelance platform for your skills.
            </p>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="font-heading font-bold mb-4 text-text-primary dark:text-white">Platforms</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/platforms" className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  All Platforms
                </Link>
              </li>
              <li>
                <Link href="/platforms/upwork" className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  Upwork Review
                </Link>
              </li>
              <li>
                <Link href="/platforms/fiverr" className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  Fiverr Review
                </Link>
              </li>
              <li>
                <Link href="/comparisons" className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  Platform Comparisons
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-bold mb-4 text-text-primary dark:text-white">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/guides" className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  Guides & Tutorials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  Freelance Tools
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-bold mb-4 text-text-primary dark:text-white">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="text-text-secondary hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-background-gray dark:border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <p className="text-sm text-text-secondary dark:text-gray-400">
              © {currentYear} SkillLinkup. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
