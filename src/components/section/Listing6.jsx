"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import useConvexSearch from "@/hook/useConvexSearch";
import ListingOption2 from "../element/ListingOption2";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import ListingSidebar1 from "../sidebar/ListingSidebar1";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import PopularServiceSlideCard1 from "../card/PopularServiceSlideCard1";
import TrendingServiceCard1 from "../card/TrendingServiceCard1";
import EmptyState from "@/components/ui/EmptyState";
import CategoryPills from "@/components/ui/CategoryPills";

export default function Listing6() {
  const t = useTranslations("services");
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const setSearch = listingStore((state) => state.setSearch);
  const getDeliveryTime = listingStore((state) => state.getDeliveryTime);
  const getPriceRange = priceStore((state) => state.priceRange);
  const getLevel = listingStore((state) => state.getLevel);
  const getLocation = listingStore((state) => state.getLocation);
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const getDesginTool = listingStore((state) => state.getDesginTool);
  const getSpeak = listingStore((state) => state.getSpeak);

  // Sync URL search params to Zustand store on mount
  useEffect(() => {
    if (q) setSearch(q);
  }, [q, setSearch]);

  const product1 = useConvexSearch(q);

  if (product1 === undefined) {
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
            <p className="body-sm" style={{ margin: 0 }}>{t("loadingServices")}</p>
          </div>
        </div>
      </section>
    );
  }

  const deliveryFilter = (item) =>
    getDeliveryTime === "" || getDeliveryTime === "anytime"
      ? item
      : item.deliveryTime === getDeliveryTime;
  const priceFilter = (item) =>
    getPriceRange.min <= item.price && getPriceRange.max >= item.price;
  const levelFilter = (item) =>
    getLevel?.length !== 0 ? getLevel.includes(item.level) : true;
  const locationFilter = (item) =>
    getLocation?.length !== 0 ? getLocation.includes(item.location) : true;
  const sortByFilter = (item) =>
    getBestSeller === "best-seller" ? true : item.sort === getBestSeller;
  const designToolFilter = (item) =>
    getDesginTool?.length !== 0 ? getDesginTool.includes(item.tool) : item;
  const speakFilter = (item) =>
    getSpeak?.length !== 0 ? getSpeak.includes(item.language) : true;

  // Filters EERST, slice DAARNA (was omgekeerd — dat was de bug)
  const filtered = product1
    .filter(deliveryFilter)
    .filter(priceFilter)
    .filter(levelFilter)
    .filter(locationFilter)
    .filter(sortByFilter)
    .filter(designToolFilter)
    .filter(speakFilter)
    .slice(0, 9);

  return (
    <>
      <section style={{ padding: "var(--space-10) 0 var(--space-16)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(240px, 280px) 1fr",
              gap: "var(--space-8)",
              alignItems: "start",
            }}
            className="listing-layout"
          >
            <aside style={{ minWidth: 0 }}>
              <ListingSidebar1 />
            </aside>
            <div style={{ minWidth: 0 }}>
              <CategoryPills />
              <ListingOption2 itemLength={filtered.length} />
              {product1.length === 0 ? (
                <EmptyState
                  icon="🎨"
                  title={t("noServicesTitle")}
                  description={t("noServicesDescription")}
                  actionLabel={t("noServicesAction")}
                  actionHref="/become-seller"
                />
              ) : filtered.length === 0 ? (
                <EmptyState
                  icon="🔍"
                  title={t("noMatchTitle")}
                  description={t("noMatchDescription")}
                />
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "var(--space-5)",
                  }}
                >
                  {filtered.map((item) =>
                    item?.gallery ? (
                      <PopularServiceSlideCard1 key={item._id} data={item} />
                    ) : (
                      <TrendingServiceCard1 key={item._id} data={item} />
                    )
                  )}
                </div>
              )}
              {filtered.length > 0 && <Pagination1 />}
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal1 />
    </>
  );
}
