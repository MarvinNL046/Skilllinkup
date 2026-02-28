"use client";
import Link from "next/link";
import { useWorld } from "@/context/WorldContext";

const worlds = [
  { key: "online", label: "Online", href: "/online", icon: "flaticon-web" },
  { key: "local", label: "Local", href: "/local", icon: "flaticon-location" },
  { key: "jobs", label: "Jobs", href: "/jobs", icon: "flaticon-briefcase" },
];

export default function WorldSwitcher() {
  const activeWorld = useWorld();

  return (
    <div className="d-flex align-items-center gap-2">
      {worlds.map((w) => (
        <Link
          key={w.key}
          href={w.href}
          className={`ud-btn btn-sm bdrs4 fz14 ${
            activeWorld === w.key ? "btn-thm" : "btn-white"
          }`}
          style={{ padding: "6px 14px", textDecoration: "none" }}
        >
          <i className={`${w.icon} me-1`} />
          {w.label}
        </Link>
      ))}
    </div>
  );
}
