"use client";
import useConvexGigs from "@/hook/useConvexGigs";
import PopularServiceCard1 from "../card/PopularServiceCard1";
import PopularServiceSlideCard1 from "../card/PopularServiceSlideCard1";
import EmptyState from "@/components/ui/EmptyState";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  "All",
  "Development & IT",
  "Design & Creative",
  "Digital Marketing",
  "Music & Audio",
  "Video & Animation",
];

export default function TrendingService14() {
  const product1 = useConvexGigs();
  const [getCurrentCategory, setCurrentCategory] = useState("All");

  // tab handler
  const tabHandler = (select) => {
    setCurrentCategory(select);
  };

  const path = usePathname();

  const isLoading = product1 === undefined;
  const gigs = product1 ?? [];

  const filteredGigs = gigs
    .filter((item) =>
      getCurrentCategory === "All"
        ? item
        : item.tag === getCurrentCategory && item,
    )
    .slice(0, 4);

  return (
    <>
      <section className={`pt-0 ${path === "/home-9" ? "pb0" : "pb100"}`}>
        <div className="container">
          <div className="row align-items-center wow fadeInUp">
            <div className="col-xl-3">
              <div className="main-title mb30-lg">
                <h2 className="title">Trending Services</h2>
                <p className="paragraph">
                  Most viewed and all-time top-selling services
                </p>
              </div>
            </div>
            <div className="col-xl-9">
              <div className="navpill-style2 at-home9 mb50-lg">
                <ul
                  className="nav nav-pills mb20 justify-content-xl-end"
                  id="pills-tab"
                >
                  {categories.map((item, index) => (
                    <li key={index} className="nav-item">
                      <button
                        onClick={() => tabHandler(item)}
                        className={`nav-link fw500 dark-color ${
                          getCurrentCategory === item ? "active" : ""
                        }`}
                      >
                        {item}
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
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : filteredGigs.length === 0 ? (
                <EmptyState
                  icon="🚀"
                  title="Services coming soon"
                  description="Be the first to offer your services on SkillLinkup"
                  actionLabel="Become a Seller"
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
