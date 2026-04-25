"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

const categoryKeys = [
  "allCategories",
  "graphicsDesign",
  "digitalMarketing",
  "writingTranslation",
  "videoAnimation",
  "musicAudio",
  "programmingTech",
  "business",
  "lifestyle",
  "trendingTab",
];

export default function TabSection1() {
  const t = useTranslations("gigDetail");
  const [currentTab, setCurrentTab] = useState("allCategories");

  const path = usePathname();

  return (
    <>
      <section
        className={`categories_list_section overflow-hidden ${
          path === "/home-3" ? "bgc-thm5" : ""
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="listings_category_nav_list_menu">
                <ul className="mb0 flex ps-0">
                  {categoryKeys.map((key, index) => (
                    <li key={index}>
                      <a
                        onClick={() => setCurrentTab(key)}
                        className={currentTab === key ? "active" : ""}
                      >
                        {t(key)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
