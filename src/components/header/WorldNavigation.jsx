"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorld } from "@/context/WorldContext";
import worldNavigation from "@/data/worldNavigation";
import { cn } from "@/lib/utils";

export default function WorldNavigation() {
  const world = useWorld();
  const path = usePathname();

  const worldItems = worldNavigation[world] || [];
  const sharedItems = worldNavigation.shared;

  const renderLink = (item, isActive) => (
    <Link
      href={item.path}
      className={cn(
        "inline-flex items-center px-3 py-2 text-sm transition-colors hover:text-primary",
        isActive
          ? "text-primary font-semibold border-b-2 border-current pb-1"
          : "text-[var(--text-secondary)] font-medium"
      )}
    >
      {item.name}
    </Link>
  );

  return (
    <ul className="flex gap-0 list-none m-0 p-0">
      {worldItems.map((item) => {
        const isActive = path.startsWith(item.path);
        return <li key={item.id}>{renderLink(item, isActive)}</li>;
      })}
      {sharedItems.map((item) => {
        const isActive = path === item.path;
        return <li key={item.id}>{renderLink(item, isActive)}</li>;
      })}
    </ul>
  );
}
