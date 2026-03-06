"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "./Navigation";
import MobileNavigation2 from "./MobileNavigation2";
import NotificationBell from "./NotificationBell";
import { useUser, useClerk } from "@clerk/nextjs";
import WaitlistButton from "@/components/ui/WaitlistButton";

export default function Header19() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

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
              <div className="col-auto pe-0 ">
                <div className="d-flex align-items-center">
                  {isSignedIn ? (
                    <>
                      <Link className="login-info" href="/dashboard">
                        Dashboard
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
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link className="login-info" href="/become-seller">
                        <span className="d-none d-xl-inline-block">Become a</span>{" "}
                        Seller
                      </Link>
                      <Link
                        className="login-info mr10 home18-sign-btn px30 py-1 bdrs12 ml30 bdr1-dark"
                        href="/login"
                      >
                        Sign in
                      </Link>
                      <WaitlistButton className="ud-btn add-joining home20-join-btn bdrs12 text-white" />
                    </>
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
