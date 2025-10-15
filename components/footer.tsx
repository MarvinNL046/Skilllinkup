import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-background-gray bg-background-light">
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
            <p className="mt-4 text-sm text-text-secondary leading-relaxed">
              Your trusted guide to finding the perfect freelance platform for your skills.
            </p>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="font-heading font-bold mb-4 text-text-primary">Platforms</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/platforms" className="text-text-secondary hover:text-accent transition-colors">
                  All Platforms
                </Link>
              </li>
              <li>
                <Link href="/platforms/upwork" className="text-text-secondary hover:text-accent transition-colors">
                  Upwork Review
                </Link>
              </li>
              <li>
                <Link href="/platforms/fiverr" className="text-text-secondary hover:text-accent transition-colors">
                  Fiverr Review
                </Link>
              </li>
              <li>
                <Link href="/comparisons" className="text-text-secondary hover:text-accent transition-colors">
                  Platform Comparisons
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-bold mb-4 text-text-primary">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/guides" className="text-text-secondary hover:text-accent transition-colors">
                  Guides & Tutorials
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-secondary hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-text-secondary hover:text-accent transition-colors">
                  Freelance Tools
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-text-secondary hover:text-accent transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-bold mb-4 text-text-primary">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-secondary hover:text-accent transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="text-text-secondary hover:text-accent transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-background-gray pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-text-secondary">
              © {currentYear} SkillLinkup. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-text-secondary hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-text-secondary hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
