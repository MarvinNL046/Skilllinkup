"use client";
import listingStore from "@/store/listingStore";
import ListingOption2 from "../element/ListingOption2";
import ListingSidebar5 from "../sidebar/ListingSidebar5";
import Pagination1 from "./Pagination1";
import priceStore from "@/store/priceStore";
import useConvexFreelancers from "@/hook/useConvexFreelancers";
import FreelancerCard2 from "../card/FreelancerCard2";
import ListingSidebarModal5 from "../modal/ListingSidebarModal5";
import EmptyState from "@/components/ui/EmptyState";

export default function Listing14() {
  const getCategory = listingStore((state) => state.getCategory);
  const priceRange = priceStore((state) => state.priceRange);
  const getLocation = listingStore((state) => state.getLocation);
  const getSearch = listingStore((state) => state.getSearch);
  const getLevel = listingStore((state) => state.getLevel);
  const getSpeak = listingStore((state) => state.getSpeak);
  const getBestSeller = listingStore((state) => state.getBestSeller);

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
      ? item.location.split("-").join(" ").includes(getSearch.toLowerCase())
      : item;

  // level filter
  const levelFilter = (item) =>
    getLevel?.length !== 0 ? getLevel.includes(item.level) : true;

  // speak filter
  const languageFilter = (item) =>
    getSpeak?.length !== 0
      ? getSpeak.includes(item.language.toLowerCase())
      : item;

  // sort by filter
  const sortByFilter = (item) =>
    getBestSeller === "best-seller" ? true : item.sort === getBestSeller;

  const freelancer1 = useConvexFreelancers();

  // Show spinner while Convex data is loading
  if (freelancer1 === undefined) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const content = freelancer1
    .slice(0, 9)
    .filter(categoryFilter)
    .filter(priceFilter)
    .filter(locationFilter)
    .filter(searchFilter)
    .filter(levelFilter)
    .filter(languageFilter)
    .filter(sortByFilter)
    .map((item, i) => (
      <div key={i} className="col-sm-6 col-xl-4">
        <FreelancerCard2 data={item} />
      </div>
    ));

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ListingSidebar5 />
            </div>
            <div className="col-lg-9">
              <ListingOption2 itemLength={content?.length} />
              <div className="row">
                {content.length === 0 ? (
                  <EmptyState
                    icon="👤"
                    title="No freelancers yet"
                    description="Join as a freelancer to get started"
                    actionLabel="Become a Freelancer"
                    actionHref="/register"
                  />
                ) : (
                  content
                )}
              </div>
              <div className="row mt30">
                <Pagination1 />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal5 />
    </>
  );
}
