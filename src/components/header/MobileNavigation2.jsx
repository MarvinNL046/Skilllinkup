"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import WaitlistButton from "@/components/ui/WaitlistButton";

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
                    height={40}
                    width={172}
                    src="/images/logo/skilllinkup-transparant-rozepunt.webp"
                    alt="Header Logo"
                  />
                </Link>
                <div className="right-side d-flex align-items-center gap-2">
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
                    <>
                      <Link
                        href="/login"
                        className="ud-btn btn-white btn-sm py-1 px-3 bdrs8"
                        style={{ fontSize: 13, border: "1px solid #ddd" }}
                      >
                        Sign in
                      </Link>
                      <WaitlistButton className="ud-btn btn-thm btn-sm py-1 px-3 bdrs8 text-white" />
                    </>
                  )}
                  <a
                    className="menubar ml10"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample"
                    aria-controls="offcanvasExample"
                  >
                    <Image
                      height={20}
                      width={20}
                      src="/images/mobile-dark-nav-icon.svg"
                      alt="icon"
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
