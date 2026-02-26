"use client";
import useConvexGigs from "@/hook/useConvexGigs";
import ListingOption2 from "../element/ListingOption2";
import ListingSidebarModal1 from "../modal/ListingSidebarModal1";
import ListingSidebar1 from "../sidebar/ListingSidebar1";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import ClearButton from "../button/ClearButton";
import PopularServiceSlideCard1 from "../card/PopularServiceSlideCard1";
import TrendingServiceCard1 from "../card/TrendingServiceCard1";
import BestService2 from "./BestService2";
import EmptyState from "@/components/ui/EmptyState";

export default function Listing6() {
  const getDeliveryTime = listingStore((state) => state.getDeliveryTime);
  const getPriceRange = priceStore((state) => state.priceRange);
  const getLevel = listingStore((state) => state.getLevel);
  const getLocation = listingStore((state) => state.getLocation);
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const getDesginTool = listingStore((state) => state.getDesginTool);
  const getSpeak = listingStore((state) => state.getSpeak);
  const getSearch = listingStore((state) => state.getSearch);

  // delivery filter
  const deliveryFilter = (item) =>
    getDeliveryTime === "" || getDeliveryTime === "anytime"
      ? item
      : item.deliveryTime === getDeliveryTime;

  // price filter
  const priceFilter = (item) =>
    getPriceRange.min <= item.price && getPriceRange.max >= item.price;

  // level filter
  const levelFilter = (item) =>
    getLevel?.length !== 0 ? getLevel.includes(item.level) : item;

  // location filter
  const locationFilter = (item) =>
    getLocation?.length !== 0 ? getLocation.includes(item.location) : item;

  const searchFilter = (item) =>
    getSearch !== ""
      ? item.location.split("-").join(" ").includes(getSearch.toLowerCase())
      : item;

  // sort by filter
  const sortByFilter = (item) =>
    getBestSeller === "best-seller" ? item : item.sort === getBestSeller;

  // design tool filter
  const designToolFilter = (item) =>
    getDesginTool?.length !== 0 ? getDesginTool.includes(item.tool) : item;

  // speak filter
  const speakFilter = (item) =>
    getSpeak?.length !== 0 ? getSpeak.includes(item.language) : item;

  const product1 = useConvexGigs();

  // Show spinner while Convex data is loading
  if (product1 === undefined) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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
          <BestService2 />
          <div className="row mt30">
            <div className="col-lg-3">
              <ListingSidebar1 />
            </div>
            <div className="col-lg-9">
              <ListingOption2 itemLength={content?.length} />
              {content.length === 0 ? (
                <EmptyState
                  icon="🎨"
                  title="No services yet"
                  description="Be the first to offer a service"
                  actionLabel="Create a Service"
                  actionHref="/dashboard/add-services"
                />
              ) : (
                <div className="row">{content}</div>
              )}
              <Pagination1 />
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal1 />
    </>
  );
}
