"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import {
  LayoutDashboard, FileText, ShoppingBag, MessageSquare, Star, Wallet,
  FileSpreadsheet, Receipt, User, LogOut, Globe, MapPin, Briefcase,
  Image as ImageIcon, ClipboardList, FilePlus2, Bookmark, Gift, Sparkles,
} from "lucide-react";
import { dashboardNavigation } from "@/data/dashboard";
import useConvexUser from "@/hook/useConvexUser";
import { api } from "../../../../convex/_generated/api";

/**
 * Map legacy flaticon class names to lucide icon components so data/dashboard.js
 * stays unchanged while the sidebar fully adopts the DS icon set.
 */
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
  { key: "online", label: "Online", Icon: Globe },
  { key: "local",  label: "Local",  Icon: MapPin },
  { key: "jobs",   label: "Jobs",   Icon: Briefcase },
];

function NavLink({ item, active }) {
  const Icon = iconFor(item.icon);
  return (
    <Link
      href={item.path}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        padding: "var(--space-3) var(--space-4)",
        borderRadius: "var(--radius-md)",
        textDecoration: "none",
        color: active ? "var(--primary-700)" : "var(--text-primary)",
        background: active ? "var(--primary-50)" : "transparent",
        fontSize: "var(--text-body-sm)",
        fontWeight: active ? 600 : 500,
        transition: "background 140ms var(--ease-standard, ease-out)",
      }}
    >
      <Icon size={16} style={{ marginTop: 2, flexShrink: 0 }} />
      <span style={{ minWidth: 0 }}>
        {item.name}
        {item.subtitle && (
          <span
            className="body-sm"
            style={{
              display: "block",
              color: "var(--text-tertiary)",
              fontWeight: 400,
              marginTop: 2,
            }}
          >
            {item.subtitle}
          </span>
        )}
      </span>
    </Link>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      className="overline"
      style={{
        color: "var(--text-tertiary)",
        padding: "var(--space-4) var(--space-4) var(--space-2)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Dashboard sidebar on the SkillLinkup Design System. Replaces legacy
 * template classes (.dashboard__sidebar, .sidebar_list_item, -is-active)
 * with tokens + DS .card wrapping. Icons are lucide.
 */
export default function DashboardSidebar() {
  const path = usePathname();
  const { convexUser } = useConvexUser();
  const { signOut } = useClerk();
  const setPreferredWorld = useMutation(api.users.setPreferredWorld);

  const role = convexUser?.userType === "freelancer" ? "freelancer" : "client";
  const world = convexUser?.preferredWorld || "online";

  const sections =
    dashboardNavigation[role]?.[world] ||
    dashboardNavigation[role]?.online ||
    { start: [], organize: [], account: [] };

  return (
    <aside
      className="hidden lg:block"
      style={{
        minWidth: 0,
        padding: "var(--space-6) var(--space-4) var(--space-6) 0",
      }}
    >
      <div
        className="card"
        style={{
          padding: "var(--space-3) 0",
          position: "sticky",
          top: "calc(var(--space-3) + 60px)",
        }}
      >
        {/* World switcher */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 4,
            padding: "var(--space-3) var(--space-3)",
            marginBottom: "var(--space-2)",
          }}
        >
          {WORLDS.map(({ key, label, Icon }) => {
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
                  transition: "background 140ms var(--ease-standard, ease-out)",
                }}
              >
                <Icon size={12} />
                {label}
              </button>
            );
          })}
        </div>

        <SectionLabel>Start</SectionLabel>
        <div style={{ display: "grid", gap: 2, padding: "0 var(--space-2)" }}>
          {sections.start.map((item, i) => (
            <NavLink key={i} item={item} active={path === item.path} />
          ))}
        </div>

        <SectionLabel>Organize &amp; manage</SectionLabel>
        <div style={{ display: "grid", gap: 2, padding: "0 var(--space-2)" }}>
          {sections.organize.map((item, i) => (
            <NavLink key={i} item={item} active={path === item.path} />
          ))}
        </div>

        <SectionLabel>Account</SectionLabel>
        <div style={{ display: "grid", gap: 2, padding: "0 var(--space-2)" }}>
          {sections.account.map((item, i) => (
            <NavLink key={i} item={item} active={path === item.path} />
          ))}

          <button
            type="button"
            onClick={() => signOut({ redirectUrl: "/" })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              width: "100%",
              padding: "var(--space-3) var(--space-4)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              borderRadius: "var(--radius-md)",
              fontSize: "var(--text-body-sm)",
              fontWeight: 500,
              color: "var(--error-700, oklch(42% 0.18 25))",
              textAlign: "left",
              fontFamily: "inherit",
              marginTop: "var(--space-2)",
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
