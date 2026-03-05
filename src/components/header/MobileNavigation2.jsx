"use client";
import Image from "next/image";
import Link from "next/link";
import WaitlistButton from "@/components/ui/WaitlistButton";

export default function MobileNavigation2() {
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
                <div className="right-side text-end">
                  <WaitlistButton className="ud-btn btn-thm btn-sm py-1 px-3 bdrs8 text-white" />
                  <a
                    className="menubar ml30"
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
