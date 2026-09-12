"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ChevronDown, X, ArrowRight } from "lucide-react";
import navigation from "@/data/navigation";
import { isActiveNavigation } from "@/utils/isActiveNavigation";
import WaitlistButton from "@/components/ui/WaitlistButton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import navStore from "@/store/navStore";
import { useTranslations } from "next-intl";
import PublicSignInLink from "@/components/header/PublicSignInLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function NavLinkItem({ item, path, onNavigate, depth = 0 }) {
  const active = item.path === path;
  return (
    <Link
      href={item.path}
      onClick={onNavigate}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `var(--space-3) calc(var(--space-5) + ${depth * 12}px)`,
        color: active ? "var(--primary-600)" : "var(--text-primary)",
        background: active ? "var(--primary-50)" : "transparent",
        fontSize: "var(--text-body-md)",
        fontWeight: active ? 600 : 500,
        borderRadius: "var(--radius-md)",
        textDecoration: "none",
      }}
    >
      {item.name}
    </Link>
  );
}

function NavGroup({ item, path, onNavigate, depth = 0 }) {
  const groupActive = isActiveNavigation(path, item);
  const [open, setOpen] = useState(groupActive);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: `var(--space-3) calc(var(--space-5) + ${depth * 12}px)`,
          background: groupActive ? "var(--primary-50)" : "transparent",
          color: groupActive ? "var(--primary-700)" : "var(--text-primary)",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontSize: "var(--text-body-md)",
          fontWeight: groupActive ? 600 : 500,
          borderRadius: "var(--radius-md)",
          fontFamily: "inherit",
        }}
      >
        {item.name}
        <ChevronDown
          size={16}
          style={{
            transition: "transform 160ms var(--ease-standard, ease-out)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: "var(--text-tertiary)",
          }}
        />
      </button>
      {open && (
        <div style={{ display: "grid", gap: 2, marginTop: 2, marginBottom: "var(--space-2)" }}>
          {item.children.map((child, i) =>
            child?.children ? (
              <NavGroup
                key={i}
                item={child}
                path={path}
                onNavigate={onNavigate}
                depth={depth + 1}
              />
            ) : (
              <NavLinkItem
                key={i}
                item={child}
                path={path}
                onNavigate={onNavigate}
                depth={depth + 1}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function NavSidebar() {
  const t = useTranslations("nav");
  const path = usePathname();
  const { isSignedIn } = useUser();
  const isOpen = navStore((s) => s.isNavOpen);
  const closeNav = navStore((s) => s.closeNav);
  const closeBtnRef = useRef(null);
  const openerRef = useRef(null);

  // Close on route change
  useEffect(() => {
    closeNav();
  }, [path, closeNav]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closeNav(); }}>
      <DialogContent showCloseButton={false} aria-describedby={undefined}
        onOpenAutoFocus={(event) => { openerRef.current = document.activeElement; event.preventDefault(); closeBtnRef.current?.focus(); }}
        onCloseAutoFocus={(event) => { event.preventDefault(); openerRef.current?.focus(); }}
        style={{ left: 0, top: 0, bottom: 0, transform: "none", width: "min(88vw, 360px)", maxWidth: "none", height: "100dvh", display: "flex", flexDirection: "column", padding: 0, gap: 0, borderRadius: 0 }}
      >
        <DialogTitle className="sr-only">Mobile navigation</DialogTitle>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "var(--space-5) var(--space-6)",
            borderBottom: "1px solid var(--border-subtle)",
            flexShrink: 0,
          }}
        >
          <Link href="/" onClick={closeNav} style={{ display: "inline-flex" }}>
            <Image
              alt="SkillLinkup"
              width={148}
              height={34}
              src="/images/logo/skilllinkup-brand.png"
            />
          </Link>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeNav}
            className="btn btn--ghost btn--icon btn--sm"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </header>

        <div className="flex justify-end border-b px-6 py-3 sm:hidden"><LanguageSwitcher /></div>
        <nav
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "var(--space-4) var(--space-3)",
          }}
        >
          <div style={{ display: "grid", gap: 2 }}>
            {navigation.map((item, i) =>
              item?.children ? (
                <NavGroup
                  key={i}
                  item={item}
                  path={path}
                  onNavigate={closeNav}
                />
              ) : (
                <NavLinkItem
                  key={i}
                  item={item}
                  path={path}
                  onNavigate={closeNav}
                />
              )
            )}
          </div>
        </nav>

        <footer
          style={{
            padding: "var(--space-5) var(--space-6)",
            borderTop: "1px solid var(--border-subtle)",
            flexShrink: 0,
          }}
        >
          {isSignedIn ? (
            <Link
              href="/dashboard"
              onClick={closeNav}
              className="btn btn--primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {t("dashboard")}
              <ArrowRight size={16} />
            </Link>
          ) : (
            <div className="grid gap-3">
              <PublicSignInLink onClick={closeNav} />
              <WaitlistButton className="skl-action-primary" />
            </div>
          )}
        </footer>
      </DialogContent>
    </Dialog>
  );
}
