"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorld } from "@/context/WorldContext";
import worldNavigation from "@/data/worldNavigation";

export default function WorldNavigation() {
  const world = useWorld();
  const path = usePathname();

  const worldItems = worldNavigation[world] || [];
  const sharedItems = worldNavigation.shared;

  return (
    <ul className="ace-responsive-menu" style={{ display: "flex", gap: 0, listStyle: "none", margin: 0, padding: 0 }}>
      {worldItems.map((item) => (
        <li key={item.id} className={path.startsWith(item.path) ? "ui-active" : ""}>
          <Link className="list-item" href={item.path}>
            <span className="title">{item.name}</span>
          </Link>
        </li>
      ))}
      {sharedItems.map((item) => (
        <li key={item.id} className={path === item.path ? "ui-active" : ""}>
          <Link className="list-item" href={item.path}>
            <span className="title">{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
