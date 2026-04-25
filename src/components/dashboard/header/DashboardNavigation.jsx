"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import {
  Menu, ChevronDown, LayoutDashboard, FileText, ShoppingBag, MessageSquare,
  Star, Wallet, FileSpreadsheet, Receipt, User, LogOut, Globe, MapPin,
  Briefcase, Image as ImageIcon, ClipboardList, FilePlus2, Bookmark,
} from "lucide-react";
import { dashboardNavigation } from "@/data/dashboard";
import useConvexUser from "@/hook/useConvexUser";
import { api } from "../../../../convex/_generated/api";

const ICON_MAP = {
  "flaticon-home":         LayoutDashboard,
  "flaticon-presentation": FileText,
  "flaticon-document":     FileText,
  "flaticon-content":      FilePlus2,
  "flaticon-receipt":      Receipt,
  "flaticon-chat":         MessageSquare,
  "flaticon-chat-1":       MessageSquare,
  "flaticon-review-1":     Star,
  "flaticon-star":         Star,
  "flaticon-dollar":       Wallet,
  "flaticon-web":          FileSpreadsheet,
  "flaticon-photo":        ImageIcon,
  "flaticon-logout":       LogOut,
  "flaticon-place":        MapPin,
  "flaticon-briefcase":    Briefcase,
  "flaticon-wifi":         Globe,
  "flaticon-like":         Bookmark,
};

function iconFor(name) {
  return ICON_MAP[name] || ClipboardList;
}

const WORLDS = [
  { key: "online", labelKey: "worldOnline", Icon: Globe },
  { key: "local",  labelKey: "worldLocal",  Icon: MapPin },
  { key: "jobs",   labelKey: "worldJobs",   Icon: Briefcase },
];

function MobileNavLink({ item, active, onNavigate }) {
  const Icon = iconFor(item.icon);
  return (
    <Link
      href={item.path}
      onClick={onNavigate}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-5)",
        color: active ? "var(--primary-700)" : "var(--text-primary)",
        background: active ? "var(--primary-50)" : "transparent",
        textDecoration: "none",
        fontSize: "var(--text-body-sm)",
        fontWeight: active ? 600 : 500,
      }}
    >
      <Icon size={16} style={{ flexShrink: 0 }} />
      <span>{item.name}</span>
    </Link>
  );
}

/**
 * Mobile-only collapsible nav inserted at the top of dashboard pages
 * (lg:hidden). Lets users reach every sidebar destination without the
 * full desktop sidebar showing. Fully DS + controlled — no Bootstrap JS.
 */
export default function DashboardNavigation() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { convexUser } = useConvexUser();
  const { signOut } = useClerk();
  const t = useTranslations("dashboard");
  const tn = useTranslations("nav");
  const setPreferredWorld = useMutation(api.users.setPreferredWorld);

  const panelRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    function onDoc(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const role = convexUser?.userType === "freelancer" ? "freelancer" : "client";
  const world = convexUser?.preferredWorld || "online";
  const sections =
    dashboardNavigation[role]?.[world] ||
    dashboardNavigation[role]?.online ||
    { start: [], organize: [], account: [] };

  const closeOnClick = () => setOpen(false);

  return (
    <div ref={panelRef} className="block lg:hidden" style={{ marginBottom: "var(--space-6)" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="btn btn--secondary"
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)" }}>
          <Menu size={16} />
          {t("navigation")}
        </span>
        <ChevronDown
          size={16}
          style={{
            transition: "transform 160ms var(--ease-standard, ease-out)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {open && (
        <div
          className="card"
          style={{ padding: "var(--space-3) 0", marginTop: "var(--space-2)" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 4,
              padding: "0 var(--space-3) var(--space-3)",
              borderBottom: "1px solid var(--border-subtle)",
              marginBottom: "var(--space-2)",
            }}
          >
            {WORLDS.map(({ key, labelKey, Icon }) => {
              const active = world === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => key !== world && setPreferredWorld({ preferredWorld: key })}
                  aria-pressed={active}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                    padding: "6px 8px",
                    border: "none",
                    borderRadius: "var(--radius-sm)",
                    cursor: active ? "default" : "pointer",
                    fontSize: 12,
                    fontWeight: active ? 600 : 500,
                    background: active ? "var(--primary-600)" : "var(--surface-2)",
                    color: active ? "var(--neutral-0)" : "var(--text-secondary)",
                  }}
                >
                  <Icon size={12} />
                  {t(labelKey)}
                </button>
              );
            })}
          </div>

          <div
            className="overline"
            style={{
              color: "var(--text-tertiary)",
              padding: "var(--space-3) var(--space-5) var(--space-2)",
            }}
          >
            {t("sectionStart")}
          </div>
          {sections.start.map((item, i) => (
            <MobileNavLink
              key={i}
              item={item}
              active={path === item.path}
              onNavigate={closeOnClick}
            />
          ))}

          <div
            className="overline"
            style={{
              color: "var(--text-tertiary)",
              padding: "var(--space-4) var(--space-5) var(--space-2)",
            }}
          >
            {t("sectionOrganize")}
          </div>
          {sections.organize.map((item, i) => (
            <MobileNavLink
              key={i}
              item={item}
              active={path === item.path}
              onNavigate={closeOnClick}
            />
          ))}

          <div
            className="overline"
            style={{
              color: "var(--text-tertiary)",
              padding: "var(--space-4) var(--space-5) var(--space-2)",
            }}
          >
            {t("sectionAccount")}
          </div>
          {sections.account.map((item, i) => (
            <MobileNavLink
              key={i}
              item={item}
              active={path === item.path}
              onNavigate={closeOnClick}
            />
          ))}

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              signOut({ redirectUrl: "/" });
            }}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "var(--space-3)",
              padding: "var(--space-3) var(--space-5)",
              marginTop: "var(--space-2)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "var(--text-body-sm)",
              fontWeight: 500,
              color: "var(--error-700, oklch(42% 0.18 25))",
              textAlign: "left",
              fontFamily: "inherit",
            }}
          >
            <LogOut size={16} />
            {tn("logout")}
          </button>
        </div>
      )}
    </div>
  );
}
