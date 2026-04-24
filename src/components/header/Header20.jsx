"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import MobileNavigation2 from "./MobileNavigation2";
import NotificationBell from "./NotificationBell";
import { useUser, useClerk } from "@clerk/nextjs";
import WaitlistButton from "@/components/ui/WaitlistButton";

export default function Header20() {
    const path = usePathname();
    const { user, isSignedIn } = useUser();
    const { signOut } = useClerk();

    return (
        <>
            <header className="header-nav nav-innerpage-style at-home20 main-menu border-0">
                <nav className="posr">
                    <div className="container-fluid custom-container custom-container2 posr">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-auto px-0 px-xl-3">
                                <div className="d-flex align-items-center">
                                    <div className="logos">
                                        <Link className="header-logo logo1" href="/">
                                            <Image
                                                height={40}
                                                width={172}
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
                            <div className="col-auto pe-0">
                                <div className="d-flex align-items-center">
                                    <a
                                        className="login-info"
                                        data-bs-toggle="modal"
                                        href="#exampleModalToggle"
                                    >
                                        <span className="flaticon-loupe" />
                                    </a>
                                    {isSignedIn ? (
                                        <>
                                            <Link
                                                className="login-info ml15"
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
                                                className="ud-btn add-joining home20-join-btn bdrs12 text-white"
                                                onClick={() => signOut({ redirectUrl: "/" })}
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        // Pre-launch: single CTA only. "Become a Seller" and "Sign in"
                                        // are removed from public nav — /login and /register remain
                                        // reachable via URL for admin/existing accounts.
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
