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

  const activeStyle = {
    fontWeight: 600,
    borderBottom: "2px solid currentColor",
    paddingBottom: "2px",
  };

  return (
    <ul className="ace-responsive-menu" style={{ display: "flex", gap: 0, listStyle: "none", margin: 0, padding: 0 }}>
      {worldItems.map((item) => {
        const isActive = path.startsWith(item.path);
        return (
          <li key={item.id} className={isActive ? "ui-active" : ""}>
            <Link className="list-item" href={item.path} style={isActive ? activeStyle : undefined}>
              <span className="title">{item.name}</span>
            </Link>
          </li>
        );
      })}
      {sharedItems.map((item) => {
        const isActive = path === item.path;
        return (
          <li key={item.id} className={isActive ? "ui-active" : ""}>
            <Link className="list-item" href={item.path} style={isActive ? activeStyle : undefined}>
              <span className="title">{item.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
