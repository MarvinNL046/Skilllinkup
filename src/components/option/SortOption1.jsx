"use client";

import listingStore from "@/store/listingStore";
import { useTranslations } from "next-intl";

const sortOptions = [
  { key: "bestSeller", value: "best-seller" },
  { key: "recommended", value: "recommended" },
  { key: "newArrivals", value: "new-arrivals" },
];

export default function SortOption1() {
  const t = useTranslations("listing");
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const setBestSeller = listingStore((state) => state.setBestSeller);

  const selectedOption = sortOptions.find((item) => item.value === getBestSeller) || sortOptions[0];

  return (
    <>
      <div className="pcs_dropdown dark-color pr10 pr0-xs text-center">
        <span>{t("sortBy")}</span>
        <div className="dropdown bootstrap-select show-tick">
          <button
            type="button"
            className="btn dropdown-toggle btn-light"
            data-bs-toggle="dropdown"
          >
            <div className="filter-option">
              <div className="filter-option-inner">
                <div className="filter-option-inner-inner">
                  {t(selectedOption.key)}
                </div>
              </div>
            </div>
          </button>
          <div className="dropdown-menu">
            <div className="inner show">
              <ul className="dropdown-menu inner show">
                {sortOptions.map((item, i) => (
                  <li key={i}>
                    <a
                      onClick={() => setBestSeller(item.value)}
                      className={`dropdown-item ${
                        item.value === getBestSeller ? "active selected" : ""
                      }`}
                    >
                      <span className="bs-ok-default check-mark" />
                      <span className="text">{t(item.key)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
