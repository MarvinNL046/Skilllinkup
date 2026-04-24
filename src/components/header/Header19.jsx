"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "./Navigation";
import MobileNavigation2 from "./MobileNavigation2";
import NotificationBell from "./NotificationBell";
import { useUser, useClerk } from "@clerk/nextjs";
import WaitlistButton from "@/components/ui/WaitlistButton";
import SearchBarWithDropdown from "@/components/ui/SearchBarWithDropdown";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header19() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const t = useTranslations("nav");

  return (
    <>
      <header className="header-nav nav-innerpage-style at-home20 main-menu border-0 ">
        <nav className="posr">
          <div className="container-fluid custom-container custom-container2 posr">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto px-0 px-xl-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos">
                    <Link className="header-logo logo1" href="/">
                      <Image
                        width={172}
                        height={40}
                        src="/images/logo/skilllinkup-transparant-rozepunt.webp"
                        alt="Header Logo"
                        priority
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-auto px-0 px-xl-3">
                <Navigation />
              </div>
              <div className="col-auto d-none d-lg-block">
                <div style={{ maxWidth: 320 }}>
                  <SearchBarWithDropdown placeholder={t("searchPlaceholder")} />
                </div>
              </div>
              <div className="col-auto pe-0 ">
                <div className="d-flex align-items-center">
                  <span className="d-none d-lg-inline-flex mr15">
                    <LanguageSwitcher />
                  </span>
                  {isSignedIn ? (
                    <>
                      <Link className="login-info" href="/dashboard">
                        {t("dashboard")}
                      </Link>
                      <span className="ml15 mr5 position-relative d-inline-flex align-items-center">
                        <NotificationBell />
                      </span>
                      <Link
                        className="login-info mr10 ml15"
                        href="/dashboard"
                      >
                        {user?.imageUrl ? (
                          <Image
                            width={36}
                            height={36}
                            src={user.imageUrl}
                            alt={user.fullName || "User"}
                            className="rounded-circle"
                          />
                        ) : (
                          <span>{user?.firstName || "User"}</span>
                        )}
                      </Link>
                      <button
                        className="ud-btn add-joining home20-join-btn bdrs12 text-white"
                        onClick={() => signOut({ redirectUrl: "/" })}
                      >
                        {t("logout")}
                      </button>
                    </>
                  ) : (
                    // Pre-launch: single CTA. "Become a Seller" and "Sign in"
                    // removed from public nav; Clerk routes still reachable via URL.
                    <WaitlistButton className="ud-btn add-joining home20-join-btn bdrs12 text-white ml15" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MobileNavigation2 />
    </>
  );
}
