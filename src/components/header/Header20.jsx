"use client";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import MobileNavigation2 from "./MobileNavigation2";
import NotificationBell from "./NotificationBell";
import { useUser, useClerk } from "@clerk/nextjs";
import WaitlistButton from "@/components/ui/WaitlistButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTranslations } from "next-intl";
import { Search, LogOut } from "lucide-react";

/**
 * Header20 — primary header used across all /service, /employee, /auth,
 * /dashboard and similar routes. Redesigned 2026-04-24 against the
 * SkillLinkup Design System — same visual language as Header19 but kept
 * as a separate component so page-specific imports don't break.
 */
export default function Header20() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const t = useTranslations("nav");

  return (
    <>
      <header
        className="nav"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "var(--space-3) var(--space-6)",
          gap: "var(--space-6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)", minWidth: 0 }}>
          <Link
            href="/"
            className="nav__brand"
            style={{ flexShrink: 0 }}
            aria-label="SkillLinkup home"
          >
            <Image
              width={156}
              height={36}
              src="/images/logo/skilllinkup-transparant-rozepunt.webp"
              alt="SkillLinkup"
              priority
            />
          </Link>

          <div className="d-none d-xl-block" style={{ minWidth: 0 }}>
            <Navigation />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexShrink: 0 }}>
          <button
            type="button"
            className="btn btn--ghost btn--icon btn--sm d-none d-md-inline-flex"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalToggle"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          <span className="d-none d-md-inline-flex">
            <LanguageSwitcher />
          </span>
          <ThemeToggle />

          {isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                className="btn btn--ghost btn--sm d-none d-md-inline-flex"
              >
                {t("dashboard")}
              </Link>
              <span className="d-inline-flex align-items-center position-relative">
                <NotificationBell />
              </span>
              <Link
                href="/dashboard"
                className="avatar"
                style={{ flexShrink: 0 }}
                aria-label={user?.fullName || "Dashboard"}
              >
                {user?.imageUrl ? (
                  <Image
                    width={36}
                    height={36}
                    src={user.imageUrl}
                    alt={user.fullName || "User"}
                  />
                ) : (
                  <span>{(user?.firstName || "U").slice(0, 1)}</span>
                )}
              </Link>
              <button
                type="button"
                className="btn btn--secondary btn--icon btn--sm"
                onClick={() => signOut({ redirectUrl: "/" })}
                aria-label={t("logout")}
                title={t("logout")}
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <WaitlistButton className="btn btn--primary" />
          )}
        </div>
      </header>
      <MobileNavigation2 />
    </>
  );
}
