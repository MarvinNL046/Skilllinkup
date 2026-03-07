"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function MobileNavigation2() {
  const { isSignedIn, user } = useUser();

  return (
    <>
      <div className="mobilie_header_nav stylehome1">
        <div className="mobile-menu">
          <div className="header bdrb1">
            <div className="menu_and_widgets">
              <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
                <Link className="mobile_logo" href="/">
                  <Image
                    height={36}
                    width={150}
                    src="/images/logo/skilllinkup-transparant-rozepunt.webp"
                    alt="Header Logo"
                  />
                </Link>
                <div className="d-flex align-items-center gap-3">
                  {isSignedIn ? (
                    <Link href="/dashboard" className="d-flex align-items-center">
                      <Image
                        width={32}
                        height={32}
                        src={user?.imageUrl || "/images/team/default-avatar.svg"}
                        alt={user?.fullName || "User"}
                        className="rounded-circle"
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#222",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Sign in
                    </Link>
                  )}
                  <a
                    className="menubar"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample"
                  >
                    <Image
                      height={20}
                      width={20}
                      src="/images/mobile-dark-nav-icon.svg"
                      alt="Menu"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="posr">
              <div className="mobile_menu_close_btn">
                <span className="far fa-times" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
