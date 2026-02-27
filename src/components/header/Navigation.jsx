"use client";
import navigation from "@/data/navigation";
import { isActiveNavigation } from "@/utils/isActiveNavigation";
import useConvexCategories from "@/hook/useConvexCategories";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();
  const categories = useConvexCategories("en");

  // Sort parent categories by sortOrder
  const sortedCategories = categories
    ? [...categories].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    : [];

  // Split array into chunks of N
  function chunk(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  return (
    <>
      <ul
        className={`ace-responsive-menu ui-navigation ${
          path === "/home-3" || path === "/home-4" || path === "/home-10"
            ? "menu-without-paddingy"
            : ""
        } `}
      >
        {/* Home */}
        <li className="visible_list home-menu-parent">
          <Link
            href="/"
            className={`list-item ${path === "/" ? "ui-active" : ""}`}
          >
            <span className="title">Home</span>
          </Link>
        </li>

        {/* Categories - Mega Menu */}
        <li className="visible_list megamenu_style">
          <a
            className={`list-item ${
              path.startsWith("/services") ? "ui-active" : ""
            }`}
          >
            <span className="title">Categories</span>
            <span className="arrow"></span>
          </a>
          <ul className="dropdown-megamenu">
            {sortedCategories.length === 0 ? (
              <li className="mega_menu_list">
                <ul className="sub-menu">
                  <li>
                    <a>Loading categories...</a>
                  </li>
                </ul>
              </li>
            ) : (
              chunk(sortedCategories, 3).map((group, gi) => (
                <li key={gi} className="mega_menu_list">
                  <ul className="sub-menu">
                    {group.map((cat) => (
                      <li key={cat._id}>
                        <Link href={`/services/${cat.slug}`}>
                          {cat.icon && (
                            <span className={`${cat.icon} mr5`} />
                          )}
                          <span className="fw500">{cat.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            )}
          </ul>
        </li>

        {/* Browse - Mega Menu */}
        <li className="visible_list megamenu_style">
          <a
            className={`list-item ${
              ["/projects", "/jobs", "/freelancers", "/platforms"].some((p) =>
                path.startsWith(p)
              )
                ? "ui-active"
                : ""
            }`}
          >
            <span className="title">Browse</span>
            <span className="arrow"></span>
          </a>
          <ul className="dropdown-megamenu">
            <li className="mega_menu_list">
              <ul className="sub-menu">
                <li>
                  <Link href="/services">
                    <span className="flaticon-developer mr5" />
                    All Services
                  </Link>
                </li>
                <li>
                  <Link href="/projects">
                    <span className="flaticon-document mr5" />
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/jobs">
                    <span className="flaticon-briefcase mr5" />
                    Jobs
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mega_menu_list">
              <ul className="sub-menu">
                <li>
                  <Link href="/freelancers">
                    <span className="flaticon-user mr5" />
                    Freelancers
                  </Link>
                </li>
                <li>
                  <Link href="/platforms">
                    <span className="flaticon-web-design-1 mr5" />
                    Platforms
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        {/* About - Mega Menu */}
        <li className="visible_list megamenu_style">
          <a
            className={`list-item ${
              ["/about", "/pricing", "/faq", "/help", "/blog"].some((p) =>
                path.startsWith(p)
              )
                ? "ui-active"
                : ""
            }`}
          >
            <span className="title">About</span>
            <span className="arrow"></span>
          </a>
          <ul className="dropdown-megamenu">
            <li className="mega_menu_list">
              <ul className="sub-menu">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </li>
            <li className="mega_menu_list">
              <ul className="sub-menu">
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/help">Help</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        {/* Contact */}
        <li className="visible_list">
          <Link
            href="/contact"
            className={`list-item ${path === "/contact" ? "ui-active" : ""}`}
          >
            <span className="title">Contact</span>
          </Link>
        </li>
      </ul>
    </>
  );
}
