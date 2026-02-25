"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

interface MenuItem {
  name: string;
  path?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { name: "Home", path: "/" },
  {
    name: "Services",
    children: [
      { name: "Browse Services", path: "/services" },
      { name: "Browse Projects", path: "/projects" },
    ],
  },
  {
    name: "Freelancers",
    children: [
      { name: "Find Freelancers", path: "/freelancers" },
      { name: "Become a Seller", path: "/become-freelancer" },
    ],
  },
  {
    name: "Pages",
    children: [
      { name: "Platforms", path: "/platforms" },
      { name: "Tools", path: "/tools" },
      { name: "Blog", path: "/blog" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
  },
];

export default function Navigation() {
  const path = usePathname();
  const locale = useLocale();

  const localePath = (p: string) => `/${locale}${p}`;

  return (
    <ul className="ace-responsive-menu ui-navigation">
      {menuItems.map((item, i) => (
        <li key={i} className="visible_list menu-active">
          {item.children ? (
            <a
              className={`list-item ${
                item.children.some((c) => path === localePath(c.path!))
                  ? "ui-active"
                  : ""
              }`}
            >
              <span className="title">{item.name}</span>
              <span className="arrow"></span>
            </a>
          ) : (
            <Link
              href={localePath(item.path!)}
              className={`list-item ${
                path === localePath(item.path!) ? "ui-active" : ""
              }`}
            >
              <span className="title">{item.name}</span>
            </Link>
          )}
          {item.children && (
            <ul className="sub-menu">
              {item.children.map((child, j) => (
                <li
                  key={j}
                  className={
                    path === localePath(child.path!) ? "ui-child-active" : ""
                  }
                >
                  <Link href={localePath(child.path!)}>
                    <span className="title">{child.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
