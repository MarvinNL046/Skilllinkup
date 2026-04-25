"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser, useClerk } from "@clerk/nextjs";
import { Menu, Search, MessageSquare, Bookmark, LogOut, User } from "lucide-react";
import toggleStore from "@/store/toggleStore";
import NotificationBell from "@/components/header/NotificationBell";

/**
 * Dashboard header on the SkillLinkup Design System.
 *
 * Left: logo + sidebar toggle + desktop search (links to marketplace).
 * Right: NotificationBell (DS-native popover), messages link, saved link,
 * controlled avatar dropdown with outside-click + ESC dismiss. No
 * Bootstrap data-bs-* attributes — runs without Bootstrap JS.
 */
export default function DashboardHeader() {
  const toggleSidebar = toggleStore((s) => s.dashboardSlidebarToggleHandler);
  const { user } = useUser();
  const { signOut } = useClerk();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function onDoc(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropdownOpen]);

  return (
    <header
      className="nav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        padding: "var(--space-3) var(--space-6)",
        gap: "var(--space-4)",
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
            height={32}
            width={140}
            src="/images/logo/skilllinkup-transparant-rozepunt.webp"
            alt="SkillLinkup"
            priority
          />
        </Link>

        <button
          type="button"
          onClick={toggleSidebar}
          className="btn btn--ghost btn--icon btn--sm"
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          <Menu size={18} />
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexShrink: 0 }}>
        <Link
          href="/online/services"
          className="btn btn--ghost btn--icon btn--sm hidden md:inline-flex"
          aria-label="Search marketplace"
          title="Search"
        >
          <Search size={18} />
        </Link>

        <span className="hidden sm:inline-flex">
          <NotificationBell />
        </span>

        <Link
          href="/message"
          className="btn btn--ghost btn--icon btn--sm hidden sm:inline-flex"
          aria-label="Messages"
          title="Messages"
        >
          <MessageSquare size={18} />
        </Link>

        <Link
          href="/saved"
          className="btn btn--ghost btn--icon btn--sm hidden sm:inline-flex"
          aria-label="Saved"
          title="Saved"
        >
          <Bookmark size={18} />
        </Link>

        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            aria-label="Account menu"
            className="avatar"
            style={{ cursor: "pointer", border: "none", padding: 0, flexShrink: 0 }}
          >
            {user?.imageUrl ? (
              <Image
                height={36}
                width={36}
                src={user.imageUrl}
                alt={user?.fullName || "User"}
              />
            ) : (
              <span>{(user?.firstName || "U").slice(0, 1)}</span>
            )}
          </button>
          {dropdownOpen && (
            <div
              role="menu"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                minWidth: 240,
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-3)",
                padding: "var(--space-2)",
                zIndex: 60,
              }}
            >
              <div
                style={{
                  padding: "var(--space-2) var(--space-3) var(--space-3)",
                  borderBottom: "1px solid var(--border-subtle)",
                  marginBottom: "var(--space-1)",
                }}
              >
                <div
                  className="body-sm"
                  style={{
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user?.fullName || "Account"}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-tertiary)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user?.primaryEmailAddress?.emailAddress}
                </div>
              </div>
              <Link
                href="/my-profile"
                onClick={() => setDropdownOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  padding: "var(--space-2) var(--space-3)",
                  fontSize: "var(--text-body-sm)",
                  color: "var(--text-primary)",
                  borderRadius: "var(--radius-md)",
                  textDecoration: "none",
                }}
              >
                <User size={15} />
                My Profile
              </Link>
              <button
                type="button"
                onClick={() => signOut({ redirectUrl: "/" })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "var(--space-3)",
                  padding: "var(--space-2) var(--space-3)",
                  fontSize: "var(--text-body-sm)",
                  color: "var(--error-700, oklch(42% 0.18 25))",
                  background: "transparent",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                <LogOut size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
