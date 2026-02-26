"use client";
import useConvexProjects from "@/hook/useConvexProjects";
import ListingOption2 from "../element/ListingOption2";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import ListingSidebarModal2 from "../modal/ListingSidebarModal2";
import ProjectCard3 from "../card/ProjectCard3";
import ListingSidebar6 from "../sidebar/ListingSidebar6";
import EmptyState from "@/components/ui/EmptyState";

export default function Listing19() {
  const getCategory = listingStore((state) => state.getCategory);
  const getProjectType = listingStore((state) => state.getProjectType);
  const getPrice = priceStore((state) => state.priceRange);
  const getDesginTool = listingStore((state) => state.getDesginTool);
  const getLocation = listingStore((state) => state.getLocation);
  const getSearch = listingStore((state) => state.getSearch);
  const getSpeak = listingStore((state) => state.getSpeak);
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const getEnglishLevel = listingStore((state) => state.getEnglishLevel);

  // category filter
  const categoryFilter = (item) =>
    getCategory?.length !== 0 ? getCategory.includes(item.category) : true;

  // project-type filter
  const projectTypeFilter = (item) =>
    getProjectType?.length !== 0
      ? getProjectType.includes(item.projectType)
      : item;

  // price filter
  const priceFilter = (item) =>
    getPrice.min <= item.price.min && getPrice.max >= item.price.max;

  // skill filter
  const skillFilter = (item) =>
    getDesginTool?.length !== 0
      ? getDesginTool.includes(item.skills?.split(" ").join("-").toLowerCase())
      : item;

  // location filter
  const locationFilter = (item) =>
    getLocation?.length !== 0
      ? getLocation.includes(item.location.split(" ").join("-").toLowerCase())
      : item;

  // search filter
  const searchFilter = (item) =>
    getSearch !== ""
      ? item.location
          .split("-")
          .join(" ")
          .toLowerCase()
          .includes(getSearch.toLowerCase())
      : item;

  // speak filter
  const speakFilter = (item) =>
    getSpeak?.length !== 0
      ? getSpeak.includes(item.language?.split(" ").join("-").toLowerCase())
      : item;

  // english level filter
  const englishLevelFilter = (item) =>
    getEnglishLevel?.length !== 0
      ? getEnglishLevel.includes(item.englishLevel)
      : item;

  // sort by filter
  const sortByFilter = (item) =>
    getBestSeller === "best-seller" ? true : item.sort === getBestSeller;

  const project1 = useConvexProjects();

  // Show spinner while Convex data is loading
  if (project1 === undefined) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // content
  let content = project1
    .slice(0, 8)
    .filter(categoryFilter)
    .filter(projectTypeFilter)
    .filter(priceFilter)
    .filter(skillFilter)
    .filter(locationFilter)
    .filter(searchFilter)
    .filter(speakFilter)
    .filter(englishLevelFilter)
    .filter(sortByFilter)
    .map((item, i) => (
      <div key={i} className="col-md-6 col-xl-12">
        <ProjectCard3 data={item} />
      </div>
    ));

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ListingSidebar6 />
            </div>
            <div className="col-lg-9">
              <ListingOption2 itemLength={content?.length} />
              {content.length === 0 ? (
                <EmptyState
                  icon="📋"
                  title="No projects yet"
                  description="Post a project and receive bids from freelancers"
                  actionLabel="Post a Project"
                  actionHref="/dashboard/create-projects"
                />
              ) : (
                <div className="row">{content}</div>
              )}
              <div className="mt30">
                <Pagination1 />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal2 />
    </>
  );
}
