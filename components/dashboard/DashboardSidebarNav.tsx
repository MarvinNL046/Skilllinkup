"use client";
import { dashboardNavigation, navigationSections } from "@/data/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export default function DashboardSidebarNav() {
  const path = usePathname();
  const locale = useLocale();
  const localePath = (p: string) => `/${locale}${p}`;

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {navigationSections.map((section) => (
          <div key={section.title}>
            <p className="fz15 fw400 ff-heading pl30 mt30">{section.title}</p>
            {section.items.map((itemId) => {
              const item = dashboardNavigation.find(n => n.id === itemId);
              if (!item) return null;
              return (
                <div key={item.id} className="sidebar_list_item mb-1">
                  <Link href={localePath(item.href)} className={`items-center ${path === localePath(item.href) ? "-is-active" : ""}`}>
                    <i className={`${item.icon} mr15`} />{item.label}
                  </Link>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
