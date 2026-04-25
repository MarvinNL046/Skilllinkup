"use client";
import Link from "next/link";
import { Globe, MapPin, Briefcase } from "lucide-react";
import { useWorld } from "@/context/WorldContext";

/**
 * Compact world switcher inserted between brand and nav on world routes
 * (/online, /local, /jobs). Visual treatment is subtler than the previous
 * full pills — segmented control on a surface-2 track, primary-tinted
 * active state. Aligns with the dashboard sidebar's switcher.
 */
const worlds = [
  { key: "online", label: "Online", href: "/online", Icon: Globe },
  { key: "local",  label: "Local",  href: "/local",  Icon: MapPin },
  { key: "jobs",   label: "Jobs",   href: "/jobs",   Icon: Briefcase },
];

export default function WorldSwitcher() {
  const activeWorld = useWorld();

  return (
    <div
      role="tablist"
      aria-label="Marketplace"
      style={{
        display: "inline-flex",
        gap: 2,
        padding: 3,
        background: "var(--surface-2)",
        borderRadius: "var(--radius-md)",
      }}
    >
      {worlds.map(({ key, label, href, Icon }) => {
        const active = activeWorld === key;
        return (
          <Link
            key={key}
            href={href}
            role="tab"
            aria-selected={active}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 12px",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--text-body-sm)",
              fontWeight: active ? 600 : 500,
              textDecoration: "none",
              background: active ? "var(--bg-elevated)" : "transparent",
              color: active ? "var(--primary-700)" : "var(--text-secondary)",
              boxShadow: active ? "var(--shadow-1)" : "none",
              transition: "background 140ms var(--ease-standard, ease-out)",
            }}
          >
            <Icon size={13} />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
