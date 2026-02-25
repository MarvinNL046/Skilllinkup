"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  const locale = useLocale();

  return (
    <>
      <header className="header-nav nav-innerpage-style at-home20 main-menu border-0">
        <nav className="posr">
          <div className="container-fluid custom-container custom-container2 posr">
            <div className="row align-items-center justify-content-between">
              {/* Logo */}
              <div className="col-auto px-0 px-xl-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos">
                    <Link className="header-logo logo1" href={`/${locale}`}>
                      <Image
                        width={133}
                        height={40}
                        src="/images/header-logo-dark2.svg"
                        alt="SkillLinkup"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              {/* Desktop Navigation */}
              <div className="col-auto px-0 px-xl-3">
                <Navigation />
              </div>
              {/* Right side: Auth buttons */}
              <div className="col-auto pe-0">
                <div className="d-flex align-items-center">
                  <SignedOut>
                    <Link
                      className="login-info mr10 home18-sign-btn px30 py-1 bdrs12 ml30 bdr1-dark"
                      href={`/${locale}/sign-in`}
                    >
                      Sign in
                    </Link>
                    <Link
                      className="ud-btn add-joining home20-join-btn bdrs12 text-white"
                      href={`/${locale}/sign-up`}
                    >
                      Join
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link className="login-info mr10" href={`/${locale}/dashboard`}>
                      Dashboard
                    </Link>
                    <UserButton afterSignOutUrl={`/${locale}`} />
                  </SignedIn>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* Search Modal */}
      <div className="search-modal">
        <div
          className="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex={-1}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel"></h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fal fa-xmark"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="popup-search-field search_area">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="What service are you looking for today?"
                  />
                  <label>
                    <span className="far fa-magnifying-glass"></span>
                  </label>
                  <button className="ud-btn btn-thm" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileNavigation />
    </>
  );
}
