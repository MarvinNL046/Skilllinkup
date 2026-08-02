"use client";

import Image from "next/image";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { LogOut } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SearchBarWithDropdown from "@/components/ui/SearchBarWithDropdown";
import MobileNavigation2 from "./MobileNavigation2";

const NAV_ITEMS = [
  { label: "Online Services", href: "/services" },
  { label: "Local Services", href: "/local" },
  { label: "Jobs", href: "/jobs" },
  { label: "For businesses", href: "/jobs/companies" },
];

export default function Header19() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const t = useTranslations("nav");

  return (
    <>
      <header
        className="hidden xl:flex"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 72,
          alignItems: "center",
          background: "rgba(255,255,255,.96)",
          borderBottom: "1px solid #eef0f2",
          backdropFilter: "blur(14px)",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1472,
            margin: "0 auto",
            padding: "0 40px",
            display: "grid",
            gridTemplateColumns: "190px minmax(390px, 1fr) auto",
            alignItems: "center",
            gap: 24,
          }}
        >
          <Link href="/" aria-label="Skilllinkup home" style={{ display: "inline-flex", width: 174 }}>
            <Image
              width={736}
              height={168}
              src="/images/logo/skilllinkup-template-logo-v2.png"
              alt="Skilllinkup"
              priority
              style={{ width: 174, height: "auto" }}
            />
          </Link>

          <nav aria-label="Primary navigation" style={{ display: "flex", justifyContent: "center", gap: "clamp(22px, 2.4vw, 40px)" }}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: "#10213f",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 14 }}>
            <div style={{ width: 300 }}>
              <SearchBarWithDropdown placeholder={t("searchPlaceholder")} navbar />
            </div>
            <LanguageSwitcher navbar />
            {isSignedIn ? (
              <>
                <Link href="/dashboard" style={{ color: "#10213f", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                  Dashboard
                </Link>
                <Link href="/dashboard" aria-label={user?.fullName || "Account"} style={{ display: "inline-flex" }}>
                  {user?.imageUrl ? (
                    <Image width={38} height={38} src={user.imageUrl} alt={user.fullName || "Account"} style={{ borderRadius: "50%" }} />
                  ) : (
                    <span className="avatar">{(user?.firstName || "U").slice(0, 1)}</span>
                  )}
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ redirectUrl: "/" })}
                  aria-label="Log out"
                  style={{ border: 0, background: "transparent", color: "#10213f", cursor: "pointer", padding: 6 }}
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link href="/login" style={{ color: "#10213f", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                  Log in
                </Link>
                <Link
                  href="/register"
                  style={{
                    minWidth: 126,
                    height: 44,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 9,
                    backgroundColor: "#ff4f2e",
                    backgroundImage: "url('/images/skilllinkup-patterns/coral-tiger-print-v1.png')",
                    backgroundPosition: "center",
                    backgroundSize: "165px 93px",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: "none",
                    border: "1px solid #e9482b",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,.36), 0 9px 20px rgba(255,75,43,.22)",
                  }}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <MobileNavigation2 />
    </>
  );
}
