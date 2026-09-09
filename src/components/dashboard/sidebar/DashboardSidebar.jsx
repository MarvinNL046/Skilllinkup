"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import {
  Bookmark, BriefcaseBusiness, ChevronLeft, ChevronRight,
  ClipboardList, FileText, Globe2, House, LogOut, MapPin, MessageSquare,
  ReceiptText, Star, UserRound, WalletCards,
} from "lucide-react";
import { dashboardNavigation } from "@/data/dashboard";
import useConvexUser from "@/hook/useConvexUser";
import { getActiveRole } from "@/lib/accountContext.mjs";
import dashboardSidebarStore, { useHydratedSidebarCollapsed } from "@/store/dashboardSidebarStore";
import AccountContextSwitcher from "@/components/dashboard/AccountContextSwitcher";
import BrandLogo from "@/components/brand/BrandLogo";
import styles from "./DashboardSidebar.module.css";

const ICONS = {
  "flaticon-home": House,
  "flaticon-presentation": BriefcaseBusiness,
  "flaticon-document": FileText,
  "flaticon-content": ClipboardList,
  "flaticon-receipt": ReceiptText,
  "flaticon-chat": MessageSquare,
  "flaticon-chat-1": MessageSquare,
  "flaticon-review-1": Star,
  "flaticon-star": Star,
  "flaticon-dollar": WalletCards,
  "flaticon-web": ReceiptText,
  "flaticon-photo": UserRound,
  "flaticon-place": MapPin,
  "flaticon-briefcase": BriefcaseBusiness,
  "flaticon-wifi": Globe2,
  "flaticon-like": Bookmark,
};

function NavItem({ item, active, collapsed, onNavigate }) {
  const Icon = ICONS[item.icon] || ClipboardList;
  return <Link href={item.path} onClick={onNavigate} className={`${styles.navItem} ${active ? styles.active : ""}`} title={collapsed ? item.name : undefined} aria-label={collapsed ? item.name : undefined}><Icon size={19} />{collapsed ? null : <span>{item.name}</span>}</Link>;
}

export default function DashboardSidebar() {
  const path = usePathname();
  const { signOut } = useClerk();
  const { convexUser } = useConvexUser();
  const collapsed = useHydratedSidebarCollapsed();
  const toggleCollapsed = dashboardSidebarStore((state) => state.toggleCollapsed);
  const closeMobile = dashboardSidebarStore((state) => state.closeMobile);
  const role = getActiveRole(convexUser);
  const world = convexUser?.preferredWorld || "online";
  const sections = dashboardNavigation[role]?.[world] || dashboardNavigation.client.online;
  const policyPaths = ["/payouts", "/statements", "/invoice"];
  const supportPaths = ["/dashboard/support", "/dashboard/feedback"];
  const groups = [
    { label: "Work", items: [...sections.start, ...sections.organize].filter((item) => !policyPaths.includes(item.path) && item.path !== "/add-services") },
    { label: "Account", items: sections.account.filter((item) => !supportPaths.includes(item.path)) },
    { label: "Support", items: sections.account.filter((item) => supportPaths.includes(item.path)) },
  ];
  const policies = sections.organize.filter((item) => policyPaths.includes(item.path));

  return (
    <div className={styles.sidebar} data-collapsed={collapsed ? "true" : "false"}>
      <div className={styles.brandRow}>
        <Link href="/" className={styles.brand} aria-label="Skilllinkup home">
          <BrandLogo
            className={styles.fullLogo}
            priority
          />
        </Link>
        <button
          type="button"
          className={styles.collapse}
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {collapsed ? null : <div className={styles.context}><AccountContextSwitcher dark /></div>}

      <nav className={styles.navigation} aria-label="Dashboard navigation">
        {groups.map((group) => <div className={styles.navGroup} key={group.label}>
          {collapsed ? null : <p className={styles.groupLabel}>{group.label}</p>}
          {group.items.map((item) => <NavItem key={item.id} item={item} active={path === item.path} collapsed={collapsed} onNavigate={closeMobile} />)}
        </div>)}
        {policies.length > 0 && !collapsed ? <details className={styles.policies} open={policyPaths.includes(path) || undefined}>
          <summary>Policies &amp; records</summary>
          {policies.map((item) => <NavItem key={item.id} item={item} active={path === item.path} collapsed={false} onNavigate={closeMobile} />)}
        </details> : null}
      </nav>

      <div className={styles.sidebarBottom}>
        <button type="button" className={styles.logout} aria-label={collapsed ? "Log out" : undefined} onClick={() => signOut({ redirectUrl: "/" })}><LogOut size={18} />{collapsed ? null : <span>Log out</span>}</button>
      </div>
    </div>
  );
}
