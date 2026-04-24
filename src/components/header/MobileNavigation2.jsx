"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import WaitlistButton from "@/components/ui/WaitlistButton";
import navStore from "@/store/navStore";

/**
 * Compact mobile header strip — shown only below lg. Lg+ uses the
 * full desktop Header19/20/WorldHeader. The hamburger opens the
 * DS-native NavSidebar panel via navStore (no Bootstrap JS).
 */
export default function MobileNavigation2() {
  const { isSignedIn, user } = useUser();
  const t = useTranslations("nav");
  const openNav = navStore((s) => s.openNav);

  return (
    <div
      className="d-xl-none"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "var(--bg-elevated)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-3) 0",
          gap: "var(--space-3)",
        }}
      >
        <Link href="/" aria-label="SkillLinkup home" style={{ flexShrink: 0 }}>
          <Image
            height={32}
            width={140}
            src="/images/logo/skilllinkup-transparant-rozepunt.webp"
            alt="SkillLinkup"
          />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <LanguageSwitcher />
          {isSignedIn ? (
            <Link href="/dashboard" className="avatar" aria-label={t("dashboard")}>
              {user?.imageUrl ? (
                <Image
                  width={32}
                  height={32}
                  src={user.imageUrl}
                  alt={user.fullName || "User"}
                />
              ) : (
                <span>{(user?.firstName || "U").slice(0, 1)}</span>
              )}
            </Link>
          ) : (
            <WaitlistButton className="btn btn--primary btn--sm" />
          )}
          <button
            type="button"
            onClick={openNav}
            aria-label="Open navigation"
            aria-haspopup="dialog"
            className="btn btn--ghost btn--icon btn--sm"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
