"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import listingStore from "@/store/listingStore";
import ListingOption2 from "../element/ListingOption2";
import ListingSidebar5 from "../sidebar/ListingSidebar5";
import Pagination1 from "./Pagination1";
import priceStore from "@/store/priceStore";
import useConvexFreelancers from "@/hook/useConvexFreelancers";
import FreelancerCard2 from "../card/FreelancerCard2";
import FreelancerCardList from "../card/FreelancerCardList";
import ListingSidebarModal5 from "../modal/ListingSidebarModal5";
import EmptyState from "@/components/ui/EmptyState";

export default function Listing14() {
  const t = useTranslations("listing");
  const searchParams = useSearchParams();
  const setSearch = listingStore((state) => state.setSearch);
  const getCategory = listingStore((state) => state.getCategory);
  const priceRange = priceStore((state) => state.priceRange);
  const getLocation = listingStore((state) => state.getLocation);
  const getSearch = listingStore((state) => state.getSearch);
  const getLevel = listingStore((state) => state.getLevel);
  const getSpeak = listingStore((state) => state.getSpeak);
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const getAvailableOnly = listingStore((state) => state.getAvailableOnly);
  const getViewMode = listingStore((state) => state.getViewMode);

  // Sync URL search params to Zustand store on mount
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams, setSearch]);

  // category filter
  const categoryFilter = (item) =>
    getCategory?.length !== 0 ? getCategory.includes(item.skill) : true;

  // salary filter
  const priceFilter = (item) =>
    priceRange.min <= item.price && priceRange.max >= item.price;

  // location filter
  const locationFilter = (item) =>
    getLocation?.length !== 0
      ? getLocation.includes(item.location.split(" ").join("-").toLowerCase())
      : item;

  const searchFilter = (item) =>
    getSearch !== ""
      ? (item.name || "").toLowerCase().includes(getSearch.toLowerCase()) ||
        (item.skill || "").toLowerCase().includes(getSearch.toLowerCase()) ||
        (item.location || "").toLowerCase().includes(getSearch.toLowerCase())
      : true;

  // level filter
  const levelFilter = (item) =>
    getLevel?.length !== 0 ? getLevel.includes(item.level) : true;

  // speak filter
  const languageFilter = (item) =>
    getSpeak?.length !== 0
      ? getSpeak.includes(item.language.toLowerCase())
      : item;

  // availability filter
  const availabilityFilter = (item) =>
    getAvailableOnly ? item.isAvailable : true;

  // sort comparator based on selected option
  const sortComparator = (a, b) => {
    if (getBestSeller === "recommended") {
      return (b.ratingAverage ?? 0) - (a.ratingAverage ?? 0);
    }
    if (getBestSeller === "new-arrivals") {
      return (b.createdAt ?? 0) - (a.createdAt ?? 0);
    }
    // "best-seller" — sort by total orders/earnings
    return (b.totalOrders ?? 0) - (a.totalOrders ?? 0);
  };

  const freelancer1 = useConvexFreelancers();

  if (freelancer1 === undefined) {
    return (
      <section style={{ padding: "var(--space-14) 0" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-3)",
              padding: "var(--space-12) 0",
              color: "var(--text-secondary)",
            }}
          >
            <div
              role="status"
              aria-label={t("loading")}
              style={{
                width: 28,
                height: 28,
                border: "3px solid var(--border-subtle)",
                borderTopColor: "var(--primary-600)",
                borderRadius: "999px",
                animation: "spin 0.9s linear infinite",
              }}
            />
          </div>
        </div>
      </section>
    );
  }

  const filtered = freelancer1
    .slice(0, 9)
    .filter(categoryFilter)
    .filter(priceFilter)
    .filter(locationFilter)
    .filter(searchFilter)
    .filter(levelFilter)
    .filter(languageFilter)
    .filter(availabilityFilter)
    .sort(sortComparator);

  const isList = getViewMode === "list";
  const gridStyle = isList
    ? { display: "grid", gap: "var(--space-4)" }
    : {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "var(--space-5)",
      };

  return (
    <>
      <section style={{ padding: "var(--space-10) 0 var(--space-16)" }}>
        <div className="container">
          <div
            className="listing-layout"
            style={{
              display: "grid",
              gap: "var(--space-8)",
              alignItems: "start",
            }}
          >
            <aside style={{ minWidth: 0 }}>
              <ListingSidebar5 />
            </aside>
            <div style={{ minWidth: 0 }}>
              <ListingOption2 itemLength={filtered.length} itemLabel={t("freelancers")} />
              {filtered.length === 0 ? (
                <EmptyState
                  icon="👤"
                  title={t("noFreelancersTitle")}
                  description={t("noFreelancersDescription")}
                  actionLabel={t("noFreelancersAction")}
                  actionHref="/register"
                />
              ) : (
                <div style={gridStyle}>
                  {filtered.map((item, i) =>
                    isList ? (
                      <FreelancerCardList key={i} data={item} />
                    ) : (
                      <FreelancerCard2 key={i} data={item} />
                    )
                  )}
                </div>
              )}
              <div style={{ marginTop: "var(--space-8)" }}>
                <Pagination1 itemCount={filtered.length} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal5 />
    </>
  );
}
