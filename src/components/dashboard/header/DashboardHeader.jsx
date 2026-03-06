"use client";
import { useState, useRef, useEffect } from "react";
import toggleStore from "@/store/toggleStore";
import Image from "next/image";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import NotificationBell from "@/components/header/NotificationBell";
import SearchBarWithDropdown from "@/components/ui/SearchBarWithDropdown";

export default function DashboardHeader() {
  const toggle = toggleStore((state) => state.dashboardSlidebarToggleHandler);
  const { user } = useUser();
  const { signOut } = useClerk();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="header-nav nav-innerpage-style menu-home4 dashboard_header main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                    <Link href="/" className="logo">
                      <Image
                        height={40}
                        width={172}
                        src="/images/logo/skilllinkup-transparant-rozepunt.webp"
                        alt="logo"
                      />
                    </Link>
                  </div>
                  <div className="fz20 ml90">
                    <a
                      onClick={toggle}
                      className="dashboard_sidebar_toggle_icon vam"
                    >
                      <Image
                        height={18}
                        width={20}
                        src="/images/dashboard-navicon.svg"
                        alt="navicon"
                      />
                    </a>
                  </div>
                  <a
                    className="login-info d-block d-xl-none ml40 vam"
                    data-bs-toggle="modal"
                    href="#exampleModalToggle"
                  >
                    <span className="flaticon-loupe" />
                  </a>
                  <div className="ml40 d-none d-xl-block" style={{ minWidth: 320 }}>
                    <SearchBarWithDropdown />
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="dashboard_dd_menu_list d-flex align-items-center justify-content-center justify-content-sm-end mb-0 p-0">
                    <li className="d-none d-sm-block">
                      <NotificationBell />
                    </li>
                    <li className="d-none d-sm-block">
                      <a
                        className="text-center mr5 text-thm2 dropdown-toggle fz20"
                        type="button"
                        data-bs-toggle="dropdown"
                      >
                        <span className="flaticon-mail" />
                      </a>
                      <div className="dropdown-menu">
                        <div className="dboard_notific_dd px30 pt20 pb15">
                          <div className="text-center py-3">
                            <p className="text mb-2">Your messages will appear here.</p>
                          </div>
                          <div className="d-grid">
                            <Link
                              href="/message"
                              className="ud-btn btn-thm w-100"
                            >
                              View All Messages
                              <i className="fal fa-arrow-right-long" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* Saved — standalone icon link (from main) */}
                    <li className="d-none d-sm-block">
                      <Link
                        href="/saved"
                        className="text-center mr5 text-thm2 fz20"
                      >
                        <span className="flaticon-like" />
                      </Link>
                    </li>
                    <li ref={dropdownRef} style={{ position: "relative", listStyle: "none" }}>
                      <button
                        onClick={() => setDropdownOpen((o) => !o)}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center" }}
                      >
                        <Image
                          height={36}
                          width={36}
                          src={user?.imageUrl || "/images/resource/user.png"}
                          alt={user?.fullName || "user"}
                          className="rounded-circle"
                          style={{ objectFit: "cover" }}
                        />
                      </button>
                      {dropdownOpen && (
                        <div style={{
                          position: "absolute",
                          top: "calc(100% + 10px)",
                          right: 0,
                          minWidth: "220px",
                          background: "#ffffff",
                          borderRadius: "12px",
                          border: "1px solid rgba(0,0,0,0.08)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                          padding: "8px",
                          zIndex: 9999,
                        }}>
                          <div style={{ padding: "8px 12px 10px", borderBottom: "1px solid rgba(0,0,0,0.06)", marginBottom: "4px" }}>
                            <p style={{ fontWeight: 600, fontSize: "14px", margin: 0, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {user?.fullName || "Account"}
                            </p>
                            <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {user?.primaryEmailAddress?.emailAddress}
                            </p>
                          </div>
                          <Link
                            href="/my-profile"
                            onClick={() => setDropdownOpen(false)}
                            style={{ display: "flex", alignItems: "center", padding: "8px 12px", fontSize: "14px", color: "#374151", borderRadius: "8px", textDecoration: "none", gap: "8px" }}
                            onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                          >
                            <i className="flaticon-photo" />
                            My Profile
                          </Link>
                          <hr style={{ margin: "4px 0", borderColor: "rgba(0,0,0,0.06)" }} />
                          <button
                            onClick={() => signOut({ redirectUrl: "/" })}
                            style={{ display: "flex", alignItems: "center", width: "100%", padding: "8px 12px", fontSize: "14px", color: "#ef4444", background: "none", border: "none", borderRadius: "8px", cursor: "pointer", gap: "8px", textAlign: "left" }}
                            onMouseEnter={e => e.currentTarget.style.background = "#fff1f2"}
                            onMouseLeave={e => e.currentTarget.style.background = "none"}
                          >
                            <i className="flaticon-logout" />
                            Logout
                          </button>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
