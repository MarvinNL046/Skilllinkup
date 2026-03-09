"use client";
import useConvexGigs from "@/hook/useConvexGigs";
import PopularServiceCard1 from "../card/PopularServiceCard1";
import PopularServiceSlideCard1 from "../card/PopularServiceSlideCard1";
import EmptyState from "@/components/ui/EmptyState";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const categoryKeys = [
  { key: "all", tag: "All" },
  { key: "developmentIt", tag: "Development & IT" },
  { key: "designCreative", tag: "Design & Creative" },
  { key: "digitalMarketing", tag: "Digital Marketing" },
  { key: "musicAudio", tag: "Music & Audio" },
  { key: "videoAnimation", tag: "Video & Animation" },
];

export default function TrendingService14() {
  const product1 = useConvexGigs();
  const [currentTag, setCurrentTag] = useState("All");
  const t = useTranslations("trending");

  const path = usePathname();

  const isLoading = product1 === undefined;
  const gigs = product1 ?? [];

  const filteredGigs = gigs
    .filter((item) =>
      currentTag === "All"
        ? item
        : item.tag === currentTag && item,
    )
    .slice(0, 4);

  return (
    <>
      <section className={`pt-0 ${path === "/home-9" ? "pb0" : "pb100"}`}>
        <div className="container">
          <div className="row align-items-center wow fadeInUp">
            <div className="col-xl-3">
              <div className="main-title mb30-lg">
                <h2 className="title">{t("title")}</h2>
                <p className="paragraph">
                  {t("subtitle")}
                </p>
              </div>
            </div>
            <div className="col-xl-9">
              <div className="navpill-style2 at-home9 mb50-lg">
                <ul
                  className="nav nav-pills mb20 justify-content-xl-end"
                  id="pills-tab"
                >
                  {categoryKeys.map((item, index) => (
                    <li key={index} className="nav-item">
                      <button
                        onClick={() => setCurrentTag(item.tag)}
                        className={`nav-link fw500 dark-color ${
                          currentTag === item.tag ? "active" : ""
                        }`}
                      >
                        {t(item.key)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">{t("loading")}</span>
                  </div>
                </div>
              ) : filteredGigs.length === 0 ? (
                <EmptyState
                  icon="🚀"
                  title={t("emptyTitle")}
                  description={t("emptyDescription")}
                  actionLabel={t("emptyAction")}
                  actionHref="/become-seller"
                />
              ) : (
                <div className="row">
                  {filteredGigs.map((item, i) => (
                    <div key={i} className="col-sm-6 col-xl-3">
                      {item.gallery ? (
                        <PopularServiceSlideCard1 data={item} />
                      ) : (
                        <PopularServiceCard1 data={item} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
