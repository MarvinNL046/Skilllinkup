'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminNavProps {
  userEmail?: string | null;
}

export function AdminNav({ userEmail }: AdminNavProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/posts', label: 'Posts' },
    { href: '/platforms', label: 'Platforms' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/categories', label: 'Categories' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b border-background-gray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-heading font-bold text-text-primary">
              SkillLinkup <span className="text-primary">Admin</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-heading font-semibold transition-colors ${
                    isActive(item.href)
                      ? 'text-primary hover:text-primary-dark'
                      : 'text-text-secondary hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {userEmail && (
              <span className="text-sm text-text-secondary">
                {userEmail}
              </span>
            )}
            <form action="/handler/sign-out" method="POST">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-secondary text-white hover:bg-secondary-dark transition-colors text-sm font-heading font-semibold"
              >
                Uitloggen
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
