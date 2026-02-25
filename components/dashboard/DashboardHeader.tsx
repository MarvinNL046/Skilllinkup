"use client";
import { useToggleStore } from "@/store/toggleStore";
import { dashboardNavigation, navigationSections } from "@/data/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useUser } from "@clerk/nextjs";

export default function DashboardHeader() {
  const toggle = useToggleStore((state) => state.dashboardSidebarToggleHandler);
  const path = usePathname();
  const locale = useLocale();
  const { user } = useUser();

  const localePath = (p: string) => `/${locale}${p}`;

  return (
    <header className="header-nav nav-innerpage-style menu-home4 dashboard_header main-menu">
      <nav className="posr">
        <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
          <div className="row align-items-center justify-content-between">
            <div className="col-6 col-lg-auto">
              <div className="text-center text-lg-start d-flex align-items-center">
                <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                  <Link href={localePath("/")} className="logo">
                    <Image height={40} width={133} src="/images/header-logo-dark2.svg" alt="SkillLinkup" />
                  </Link>
                </div>
                <div className="fz20 ml90">
                  <a onClick={toggle} className="dashboard_sidebar_toggle_icon vam" style={{ cursor: "pointer" }}>
                    <Image height={18} width={20} src="/images/dashboard-navicon.svg" alt="menu" />
                  </a>
                </div>
                <div className="ml40 d-none d-xl-block">
                  <div className="search_area dashboard-style">
                    <input type="text" className="form-control border-0" placeholder="What service are you looking for today?" />
                    <label><span className="flaticon-loupe" /></label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-lg-auto">
              <div className="text-center text-lg-end header_right_widgets">
                <ul className="dashboard_dd_menu_list d-flex align-items-center justify-content-center justify-content-sm-end mb-0 p-0">
                  <li className="d-none d-sm-block">
                    <a className="text-center mr5 text-thm2 dropdown-toggle fz20" type="button" data-bs-toggle="dropdown">
                      <span className="flaticon-notification" />
                    </a>
                    <div className="dropdown-menu">
                      <div className="dboard_notific_dd px30 pt10 pb15">
                        <p className="text mb-0">No new notifications</p>
                      </div>
                    </div>
                  </li>
                  <li className="d-none d-sm-block">
                    <Link href={localePath("/dashboard/messages")} className="text-center mr5 text-thm2 fz20">
                      <span className="flaticon-mail" />
                    </Link>
                  </li>
                  <li className="user_setting">
                    <div className="dropdown">
                      <a className="btn" data-bs-toggle="dropdown">
                        {user?.imageUrl ? (
                          <Image height={50} width={50} src={user.imageUrl} alt="profile" className="rounded-circle" />
                        ) : (
                          <Image height={50} width={50} src="/images/resource/user.png" alt="user" />
                        )}
                      </a>
                      <div className="dropdown-menu">
                        <div className="user_setting_content">
                          {navigationSections.map((section) => (
                            <div key={section.title}>
                              <p className="fz15 fw400 ff-heading mt10 pl30">{section.title}</p>
                              {section.items.map((itemId) => {
                                const item = dashboardNavigation.find(n => n.id === itemId);
                                if (!item) return null;
                                return (
                                  <Link key={item.id} className={`dropdown-item ${path === localePath(item.href) ? "active" : ""}`} href={localePath(item.href)}>
                                    <i className={`${item.icon} mr10`} />{item.label}
                                  </Link>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
