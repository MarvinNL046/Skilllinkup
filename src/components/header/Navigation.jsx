"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MarketplaceMegaMenu from "./MarketplaceMegaMenu";

export default function Navigation() {
  const path = usePathname();
  return <nav aria-label="Main navigation">
    <ul className="flex items-center gap-1 list-none m-0 p-0">
      <li><Link href="/" aria-current={path === "/" ? "page" : undefined} className="inline-flex items-center px-3 py-2 text-sm">Home</Link></li>
      <li><MarketplaceMegaMenu /></li>
      <li><MarketplaceMegaMenu label="Browse" kind="browse" /></li>
    </ul>
  </nav>;
}
