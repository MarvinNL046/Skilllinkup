"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import {
  LayoutDashboard, FileText, MessageSquare, Star, Wallet,
  FileSpreadsheet, Receipt, LogOut, Globe, MapPin, Briefcase,
  Image as ImageIcon, ClipboardList, FilePlus2, Bookmark,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { dashboardNavigation } from "@/data/dashboard";
import useConvexUser from "@/hook/useConvexUser";
import { api } from "../../../../convex/_generated/api";
import dashboardSidebarStore from "@/store/dashboardSidebarStore";

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

function NavLink({ item, active, collapsed }) {
  const Icon = iconFor(item.icon);
  return (
    <Link
      href={item.path}
      title={collapsed ? item.name : undefined}
      aria-label={collapsed ? item.name : undefined}
      style={{
        display: "flex",
        alignItems: collapsed ? "center" : "flex-start",
        justifyContent: collapsed ? "center" : "flex-start",
        gap: collapsed ? 0 : "var(--space-3)",
        padding: collapsed ? "10px" : "var(--space-3) var(--space-4)",
        borderRadius: "var(--radius-md)",
        textDecoration: "none",
        color: active ? "var(--primary-700)" : "var(--text-primary)",
        background: active ? "var(--primary-50)" : "transparent",
        fontSize: "var(--text-body-sm)",
        fontWeight: active ? 600 : 500,
        transition: "background 140ms var(--ease-standard, ease-out)",
      }}
    >
      <Icon size={16} style={{ marginTop: collapsed ? 0 : 2, flexShrink: 0 }} />
      {!collapsed && (
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
      )}
    </Link>
  );
}

function SectionLabel({ children, collapsed }) {
  if (collapsed) {
    return (
      <div
        aria-hidden="true"
        style={{
          margin: "var(--space-3) auto 4px",
          width: 24,
          height: 1,
          background: "var(--border-subtle)",
        }}
      />
    );
  }
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
 * Dashboard sidebar on the SkillLinkup Design System. Renders inside
 * the app-shell sidebar slot — sticky pinned to the left viewport edge
 * by the parent. Supports collapsed (icon-rail) state on tablet
 * widths or when the user manually folds it via dashboardSidebarStore.
 */
export default function DashboardSidebar() {
  const path = usePathname();
  const { convexUser } = useConvexUser();
  const { signOut } = useClerk();
  const setPreferredWorld = useMutation(api.users.setPreferredWorld);
  const collapsed = dashboardSidebarStore((s) => s.collapsed);
  const toggleCollapsed = dashboardSidebarStore((s) => s.toggleCollapsed);

  const role = convexUser?.userType === "freelancer" ? "freelancer" : "client";
  const world = convexUser?.preferredWorld || "online";

  const sections =
    dashboardNavigation[role]?.[world] ||
    dashboardNavigation[role]?.online ||
    { start: [], organize: [], account: [] };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: collapsed ? "var(--space-3) 8px" : "var(--space-3)",
      }}
    >
      {/* Collapse / expand toggle (lg+) */}
      <button
        type="button"
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="hidden lg:inline-flex"
        style={{
          alignSelf: collapsed ? "center" : "flex-end",
          width: 28,
          height: 28,
          border: "1px solid var(--border-subtle)",
          background: "var(--bg-elevated)",
          borderRadius: "var(--radius-sm)",
          color: "var(--text-secondary)",
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          marginBottom: "var(--space-2)",
        }}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* World switcher */}
      {!collapsed && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 4,
            padding: "0 var(--space-2)",
            marginBottom: "var(--space-3)",
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
                  fontFamily: "inherit",
                }}
              >
                <Icon size={12} />
                {label}
              </button>
            );
          })}
        </div>
      )}

      <SectionLabel collapsed={collapsed}>Start</SectionLabel>
      <div style={{ display: "grid", gap: 2 }}>
        {sections.start.map((item, i) => (
          <NavLink key={i} item={item} active={path === item.path} collapsed={collapsed} />
        ))}
      </div>

      <SectionLabel collapsed={collapsed}>Organize &amp; manage</SectionLabel>
      <div style={{ display: "grid", gap: 2 }}>
        {sections.organize.map((item, i) => (
          <NavLink key={i} item={item} active={path === item.path} collapsed={collapsed} />
        ))}
      </div>

      <SectionLabel collapsed={collapsed}>Account</SectionLabel>
      <div style={{ display: "grid", gap: 2 }}>
        {sections.account.map((item, i) => (
          <NavLink key={i} item={item} active={path === item.path} collapsed={collapsed} />
        ))}
        <button
          type="button"
          onClick={() => signOut({ redirectUrl: "/" })}
          title={collapsed ? "Logout" : undefined}
          aria-label="Logout"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: collapsed ? 0 : "var(--space-3)",
            padding: collapsed ? "10px" : "var(--space-3) var(--space-4)",
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
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
