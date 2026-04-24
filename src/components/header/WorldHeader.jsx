"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import WorldNavigation from "./WorldNavigation";
import WorldSwitcher from "./WorldSwitcher";
import MobileNavigation2 from "./MobileNavigation2";
import NotificationBell from "./NotificationBell";
import SearchBarWithDropdown from "@/components/ui/SearchBarWithDropdown";
import WaitlistButton from "@/components/ui/WaitlistButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useUser, useClerk } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { LogOut } from "lucide-react";

/**
 * Header for /online, /local, /jobs world sections. Same design-system
 * language as Header19/20, with a WorldSwitcher between the brand and
 * nav so visitors can jump between the three marketplaces.
 */
export default function WorldHeader() {
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
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", minWidth: 0 }}>
          <Link
            href="/"
            className="nav__brand"
            style={{ flexShrink: 0 }}
            aria-label="SkillLinkup home"
          >
            <Image
              width={140}
              height={32}
              src="/images/logo/skilllinkup-transparant-rozepunt.webp"
              alt="SkillLinkup"
              priority
            />
          </Link>
          <WorldSwitcher />
          <div className="d-none d-xl-block" style={{ minWidth: 0 }}>
            <WorldNavigation />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexShrink: 0 }}>
          <div className="d-none d-lg-block" style={{ width: 260 }}>
            <SearchBarWithDropdown />
          </div>

          <span className="d-none d-md-inline-flex">
            <LanguageSwitcher />
          </span>

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
