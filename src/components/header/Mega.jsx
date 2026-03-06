"use client";
import Link from "next/link";
import useConvexCategories from "@/hook/useConvexCategories";
import { sortMarketplaceCategories } from "@/lib/marketplaceCategories";

export default function Mega({ staticMenuClass }) {
  const categories = useConvexCategories("en");

  // Split children into columns of roughly equal size (max 3 columns)
  function splitIntoColumns(children) {
    if (!children || children.length === 0) return [];
    const sorted = sortMarketplaceCategories(children);
    const perCol = Math.ceil(sorted.length / 3);
    const cols = [];
    for (let i = 0; i < sorted.length; i += perCol) {
      cols.push(sorted.slice(i, i + perCol));
    }
    return cols;
  }

  // Sort parent categories by sortOrder
  const sortedCategories = categories
    ? sortMarketplaceCategories(categories)
    : [];

  return (
    <>
      <div id="mega-menu">
        <a
          className={`btn-mega fw500 ${staticMenuClass || ""}`}
        >
          <span
            className={`pl30 pl10-xl pr5 fz15 vam flaticon-menu ${staticMenuClass || ""}`}
          />
          Categories
        </a>
        <ul className="menu ps-0">
          {sortedCategories.length === 0 ? (
            <li>
              <a>
                <span className="menu-title">Loading...</span>
              </a>
            </li>
          ) : (
            sortedCategories.map((cat) => (
              <li key={cat._id}>
                <a className="dropdown">
                  {cat.icon && (
                    <span className={`menu-icn ${cat.icon}`} />
                  )}
                  <span className="menu-title">{cat.name}</span>
                </a>
                <div className="drop-menu d-flex justify-content-between">
                  {cat.children && cat.children.length > 0 ? (
                    splitIntoColumns(cat.children).map((col, colIndex) => (
                      <div key={colIndex} className="one-third">
                        <ul className="ps-0 mb-0">
                          {col.map((child) => (
                            <li key={child._id}>
                              <Link href={`/services?category=${child.slug}`}>
                                {child.name}
                                {child.gigCount > 0 && (
                                  <span className="body-light-color fz13 ml5">
                                    ({child.gigCount})
                                  </span>
                                )}
                              </Link>
                              {child.children?.length > 0 && (
                                <ul className="ps-3 mt-1 mb-2">
                                  {sortMarketplaceCategories(child.children).map((grandchild) => (
                                    <li key={grandchild._id}>
                                      <Link href={`/services?category=${grandchild.slug}`}>
                                        {grandchild.name}
                                        {grandchild.gigCount > 0 && (
                                          <span className="body-light-color fz13 ml5">
                                            ({grandchild.gigCount})
                                          </span>
                                        )}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className="one-third">
                      <ul className="ps-0 mb-0">
                        <li>
                          <Link href={`/services?category=${cat.slug}`}>
                            Browse all {cat.name}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}
