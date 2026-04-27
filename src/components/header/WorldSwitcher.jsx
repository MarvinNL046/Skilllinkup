"use client";
import Link from "next/link";
import { Globe, MapPin, Briefcase } from "lucide-react";
import { useWorld } from "@/context/WorldContext";
import { cn } from "@/lib/utils";

const worlds = [
  { key: "online", label: "Online", href: "/online", Icon: Globe },
  { key: "local", label: "Local", href: "/local", Icon: MapPin },
  { key: "jobs", label: "Jobs", href: "/jobs", Icon: Briefcase },
];

export default function WorldSwitcher() {
  const activeWorld = useWorld();

  return (
    <div
      role="tablist"
      aria-label="Marketplace"
      className="inline-flex gap-0.5 p-1 bg-[var(--surface-2)] rounded-md"
    >
      {worlds.map(({ key, label, href, Icon }) => {
        const active = activeWorld === key;
        return (
          <Link
            key={key}
            href={href}
            role="tab"
            aria-selected={active}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-sm transition-colors",
              active
                ? "bg-[var(--bg-elevated)] text-primary font-semibold shadow-sm"
                : "text-[var(--text-secondary)] font-medium hover:text-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
