"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useConvexJobs from "@/hook/useConvexJobs";
import ListingOption2 from "../element/ListingOption2";
import ListingSidebar3 from "../sidebar/ListingSidebar3";
import Pagination1 from "./Pagination1";
import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import ListingSidebarModal3 from "../modal/ListingSidebarModal3";
import JobCard4 from "../card/JobCard4";
import EmptyState from "@/components/ui/EmptyState";

export default function Listing16() {
  const searchParams = useSearchParams();
  const setSearch = listingStore((state) => state.setSearch);
  const getSearch = listingStore((state) => state.getSearch);
  const getCategory = listingStore((state) => state.getCategory);
  const priceRange = priceStore((state) => state.priceRange);
  const getJobType = listingStore((state) => state.getJobType);
  const getLevel = listingStore((state) => state.getLevel);
  const getBestSeller = listingStore((state) => state.getBestSeller);

  // Sync URL search params to Zustand store on mount
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams, setSearch]);

  // category filter
  const categoryFilter = (item) =>
    getCategory?.length !== 0 ? getCategory.includes(item.category) : true;

  // salary filter
  const salaryFilter = (item) =>
    priceRange.min <= item.salary && priceRange.max >= item.salary;

  // job type filter
  const jobTypeFilter = (item) =>
    getJobType?.length !== 0 ? getJobType.includes(item.jobType) : true;

  // level filter
  const levelFilter = (item) =>
    getLevel?.length !== 0 ? getLevel.includes(item.level) : true;

  // text search filter
  const searchFilter = (item) =>
    getSearch !== ""
      ? (item.title || "").toLowerCase().includes(getSearch.toLowerCase()) ||
        (item.category || "").toLowerCase().includes(getSearch.toLowerCase()) ||
        (item.company || "").toLowerCase().includes(getSearch.toLowerCase())
      : true;

  // sort by filter
  const sortByFilter = (item) =>
    getBestSeller === "best-seller" ? true : item.sort === getBestSeller;

  const job1 = useConvexJobs();

  // Show spinner while Convex data is loading
  if (job1 === undefined) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  let content = job1
    .slice(0, 12)
    .filter(categoryFilter)
    .filter(salaryFilter)
    .filter(jobTypeFilter)
    .filter(levelFilter)
    .filter(searchFilter)
    .filter(sortByFilter)
    .map((item, i) => (
      <div key={i} className="col-sm-6 col-xl-4">
        <JobCard4 data={item} />
      </div>
    ));

  return (
    <>
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <ListingSidebar3 />
            </div>
            <div className="col-lg-9">
              <ListingOption2 itemLength={content?.length} />
              {content.length === 0 ? (
                <EmptyState
                  icon="💼"
                  title="No jobs posted yet"
                  description="Post a job to find the perfect freelancer"
                  actionLabel="Post a Job"
                  actionHref="/dashboard/manage-jobs"
                />
              ) : (
                <div className="row">{content}</div>
              )}
              <div className="row mt30">
                <Pagination1 />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ListingSidebarModal3 />
    </>
  );
}
