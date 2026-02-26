"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Mega from "./Mega";
import Navigation from "./Navigation";
import MobileNavigation2 from "./MobileNavigation2";
import NotificationBell from "./NotificationBell";
import { useUser, useClerk } from "@clerk/nextjs";

export default function Header20() {
    const path = usePathname();
    const { user, isSignedIn } = useUser();
    const { signOut } = useClerk();

    return (
        <>
            <header className="header-nav nav-innerpage-style main-menu  ">
                <nav className="posr">
                    <div className="container-fluid posr menu_bdrt1">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-auto pe-0">
                                <div className="d-flex align-items-center">
                                    <Link
                                        className="header-logo bdrr1 pr30 pr5-xl"
                                        href="/"
                                    >
                                        <Image
                                            height={40}
                                            width={172}
                                            className="w-100 h-100 object-fit-contain"
                                            src="/images/logo/skilllinkup-transparant-rozepunt.webp"
                                            alt="Header Logo"
                                            priority
                                        />
                                    </Link>
                                    <div className="home1_style">
                                        <Mega />
                                    </div>
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="d-flex align-items-center">
                                    <Navigation />
                                    <a
                                        className="login-info bdrl1 pl15-lg pl30"
                                        data-bs-toggle="modal"
                                        href="#exampleModalToggle"
                                    >
                                        <span className="flaticon-loupe" />
                                    </a>
                                    {isSignedIn ? (
                                        <>
                                            <Link
                                                className="login-info mx15-lg mx30"
                                                href="/dashboard"
                                            >
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
                                                className="ud-btn btn-thm add-joining"
                                                onClick={() => signOut({ redirectUrl: "/" })}
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                className={`login-info mx15-lg mx30 ${
                                                    path === "/become-seller"
                                                        ? "ui-active"
                                                        : ""
                                                }`}
                                                href="/become-seller"
                                            >
                                                <span className="d-none d-xl-inline-block">
                                                    Become a
                                                </span>{" "}
                                                Seller
                                            </Link>
                                            <Link
                                                className={`login-info mr15-lg mr30 ${
                                                    path === "/login" ? "ui-active" : ""
                                                }`}
                                                href="/login"
                                            >
                                                Sign in
                                            </Link>
                                            <Link
                                                className="ud-btn btn-thm add-joining"
                                                href="/register"
                                            >
                                                Join
                                            </Link>
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
