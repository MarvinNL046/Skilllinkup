"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNavigation2 from "./MobileNavigation2";
import NotificationBell from "./NotificationBell";
import { useUser, useClerk } from "@clerk/nextjs";
import WaitlistButton from "@/components/ui/WaitlistButton";
import SearchBarWithDropdown from "@/components/ui/SearchBarWithDropdown";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Navigation from "./Navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { LogOut } from "lucide-react";

/**
 * Header — redesigned 2026-04-24 against the SkillLinkup Design System.
 * Uses the `.nav` component class (warm neutral bg with backdrop blur,
 * subtle border, token-driven spacing). Keeps Clerk sign-in logic for
 * admin/existing users; public visitors see a single WaitlistButton CTA.
 */
export default function Header19() {
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
        {/* Brand + primary nav */}
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

        {/* Right side: search + language + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexShrink: 0 }}>
          <div className="d-none d-lg-block" style={{ width: 280 }}>
            <SearchBarWithDropdown placeholder={t("searchPlaceholder")} />
          </div>

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
            // Pre-launch: single CTA — Clerk routes still reachable via URL.
            <WaitlistButton className="btn btn--primary" />
          )}
        </div>
      </header>
      <MobileNavigation2 />
    </>
  );
}
