"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useConvexGigs from "@/hook/useConvexGigs";
import ListingOption2 from "../element/ListingOption2";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import ListingSidebar1 from "../sidebar/ListingSidebar1";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import PopularServiceSlideCard1 from "../card/PopularServiceSlideCard1";
import TrendingServiceCard1 from "../card/TrendingServiceCard1";
import EmptyState from "@/components/ui/EmptyState";
import Link from "next/link";

export default function Listing6() {
  const searchParams = useSearchParams();
  const setSearch = listingStore((state) => state.setSearch);
  const getDeliveryTime = listingStore((state) => state.getDeliveryTime);
  const getPriceRange = priceStore((state) => state.priceRange);
  const getLevel = listingStore((state) => state.getLevel);
  const getLocation = listingStore((state) => state.getLocation);
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const getDesginTool = listingStore((state) => state.getDesginTool);
  const getSpeak = listingStore((state) => state.getSpeak);
  const getSearch = listingStore((state) => state.getSearch);

  // Sync URL search params to Zustand store on mount
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams, setSearch]);

  const product1 = useConvexGigs();

  // Show spinner while Convex data is loading
  if (product1 === undefined) {
    return (
      <section className="pt30 pb90">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-thm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="body-color mt-3">Loading services...</p>
          </div>
        </div>
      </section>
    );
  }

  // Handle empty state within the normal layout (sidebar stays visible)

  // Filter functions
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
  const searchFilter = (item) =>
    getSearch !== ""
      ? (item.title || "").toLowerCase().includes(getSearch.toLowerCase()) ||
        (item.category || "").toLowerCase().includes(getSearch.toLowerCase()) ||
        (item.location || "").toLowerCase().includes(getSearch.toLowerCase())
      : true;
  const sortByFilter = (item) =>
    getBestSeller === "best-seller" ? true : item.sort === getBestSeller;
  const designToolFilter = (item) =>
    getDesginTool?.length !== 0 ? getDesginTool.includes(item.tool) : item;
  const speakFilter = (item) =>
    getSpeak?.length !== 0 ? getSpeak.includes(item.language) : true;

  let content = product1
    .slice(0, 9)
    .filter(deliveryFilter)
    .filter(priceFilter)
    .filter(levelFilter)
    .filter(locationFilter)
    .filter(searchFilter)
    .filter(sortByFilter)
    .filter(designToolFilter)
    .filter(speakFilter)
    .map((item, i) => (
      <div key={i} className="col-sm-6 col-xl-4">
        {item?.gallery ? (
          <PopularServiceSlideCard1 data={item} />
        ) : (
          <TrendingServiceCard1 data={item} />
        )}
      </div>
    ));

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ListingSidebar1 />
            </div>
            <div className="col-lg-9">
              <ListingOption2 itemLength={content?.length} />
              {product1.length === 0 ? (
                <EmptyState
                  icon="🎨"
                  title="No services yet"
                  description="Be the first to offer your services on SkillLinkup"
                  actionLabel="Become a Seller"
                  actionHref="/become-seller"
                />
              ) : content.length === 0 ? (
                <EmptyState
                  icon="🔍"
                  title="No matching services"
                  description="Try adjusting your filters"
                />
              ) : (
                <div className="row">{content}</div>
              )}
              {content.length > 0 && <Pagination1 />}
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal1 />
    </>
  );
}
