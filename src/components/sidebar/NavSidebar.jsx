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
import navStore from "@/store/navStore";

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

/**
 * Mobile navigation offcanvas on the SkillLinkup Design System.
 * Replaces Bootstrap's data-bs-toggle="offcanvas" pattern with a
 * controlled React panel + backdrop. Closes on ESC, backdrop click,
 * and route changes.
 */
export default function NavSidebar() {
  const path = usePathname();
  const { isSignedIn } = useUser();
  const isOpen = navStore((s) => s.isNavOpen);
  const closeNav = navStore((s) => s.closeNav);
  const closeBtnRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === "Escape") closeNav();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeNav]);

  // Close on route change
  useEffect(() => {
    closeNav();
  }, [path, closeNav]);

  // Lock body scroll while open + move focus to close button
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeNav}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "oklch(0% 0 0 / 0.4)",
          backdropFilter: "blur(2px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 200ms var(--ease-standard, ease-out)",
          zIndex: 1040,
        }}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: "min(88vw, 360px)",
          background: "var(--bg-elevated)",
          borderRight: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-3)",
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 240ms var(--ease-standard, ease-out)",
          zIndex: 1050,
          display: "flex",
          flexDirection: "column",
        }}
      >
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
              src="/images/logo/skilllinkup-transparant-rozepunt.webp"
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
              Dashboard
              <ArrowRight size={16} />
            </Link>
          ) : (
            <WaitlistButton
              className="btn btn--primary"
              style={{ width: "100%", justifyContent: "center" }}
            />
          )}
        </footer>
      </aside>
    </>
  );
}
