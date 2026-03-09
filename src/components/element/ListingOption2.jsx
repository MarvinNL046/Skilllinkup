"use client";
import toggleStore from "@/store/toggleStore";
import listingStore from "@/store/listingStore";
import SortOption1 from "../option/SortOption1";
import ClearButton from "../button/ClearButton";
import Image from "next/image";

export default function ListingOption2({
  itemLength,
  itemLabel = "services",
}) {
  const listingToggle = toggleStore((state) => state.listingToggleHandler);
  const viewMode = listingStore((state) => state.getViewMode);
  const setViewMode = listingStore((state) => state.setViewMode);

  return (
    <>
      <div className="row align-items-center mb20">
        <div className="col-md-6">
          <div className="text-center text-md-start">
            <p className="text mb-0 mb10-sm">
              <span className="fw500">{itemLength}</span> {itemLabel} available
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="page_control_shorting d-md-flex align-items-center justify-content-center justify-content-md-end">
            <div className="dropdown-lists d-block d-lg-none me-2 mb10-sm">
              <ul className="p-0 mb-0 text-center text-md-start">
                <li>
                  <button
                    onClick={listingToggle}
                    type="button"
                    className="open-btn filter-btn-left"
                  >
                    <Image
                      height={18}
                      width={18}
                      className="me-2"
                      src="/images/icon/all-filter-icon.svg"
                      alt="icon"
                    />
                    All Filter
                  </button>
                </li>
              </ul>
            </div>
            {/* Grid / List toggle */}
            <div className="d-none d-md-flex align-items-center gap-2 me-3">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  color: viewMode === "grid" ? "#ef2b70" : "#999",
                  fontSize: 16,
                }}
                title="Grid view"
              >
                <i className="fa fa-th-large" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  color: viewMode === "list" ? "#ef2b70" : "#999",
                  fontSize: 16,
                }}
                title="List view"
              >
                <i className="fa fa-list-ul" />
              </button>
            </div>
            <SortOption1 />
          </div>
        </div>
      </div>
    </>
  );
}
