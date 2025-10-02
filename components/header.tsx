"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              SkillLinkup
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/platforms"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Platforms
            </Link>
            <Link
              href="/reviews"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="/comparisons"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Comparisons
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/newsletter"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-md p-2 text-foreground/60 hover:text-foreground hover:bg-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/platforms"
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Platforms
              </Link>
              <Link
                href="/reviews"
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/comparisons"
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Comparisons
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/newsletter"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                onClick={() => setMobileMenuOpen(false)}
              >
                Subscribe
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
