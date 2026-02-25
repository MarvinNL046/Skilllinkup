"use client";

import { useMemo } from "react";
import JobCard, { type JobCardData } from "@/components/marketplace/JobCard";
import FilterSidebar from "@/components/marketplace/FilterSidebar";
import { useListingStore } from "@/store/listingStore";
import { usePriceStore } from "@/store/priceStore";

interface JobsClientProps {
  jobs: JobCardData[];
  categories: { name: string; slug: string }[];
}

export default function JobsClient({ jobs, categories }: JobsClientProps) {
  const selectedCategories = useListingStore((state) => state.category);
  const selectedLocations = useListingStore((state) => state.location);
  const search = useListingStore((state) => state.search);
  const priceRange = usePriceStore((state) => state.priceRange);

  const locations = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((job) => {
      if (job.locationCountry) set.add(job.locationCountry);
    });
    return Array.from(set);
  }, [jobs]);

  const maxPrice = useMemo(
    () => jobs.reduce((max, j) => Math.max(max, j.salaryMax ?? j.salaryMin ?? 0), 0),
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          job.title.toLowerCase().includes(q) ||
          job.category.toLowerCase().includes(q) ||
          (job.company ?? "").toLowerCase().includes(q) ||
          job.requiredSkills.some((s) => s.toLowerCase().includes(q))
        );
      })
      .filter((job) =>
        selectedCategories.length === 0
          ? true
          : selectedCategories.includes(job.categorySlug)
      )
      .filter((job) => {
        const salary = job.salaryMax ?? job.salaryMin ?? 0;
        return salary >= priceRange[0] && salary <= priceRange[1];
      })
      .filter((job) =>
        selectedLocations.length === 0
          ? true
          : Boolean(job.locationCountry) &&
            selectedLocations.includes(job.locationCountry!)
      );
  }, [jobs, search, selectedCategories, priceRange, selectedLocations]);

  return (
    <section className="pt30 pb90">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-xl-3">
            <FilterSidebar
              categories={categories}
              locations={locations}
              maxPrice={maxPrice}
            />
          </div>
          <div className="col-lg-8 col-xl-9">
            <div className="row align-items-center mb20">
              <div className="col-sm-6">
                <h4 className="mb0">{filteredJobs.length} Jobs</h4>
              </div>
            </div>
            <div className="row">
              {filteredJobs.map((job) => (
                <div key={job.slug} className="col-sm-6 col-xl-4 mb30">
                  <JobCard data={job} />
                </div>
              ))}
              {filteredJobs.length === 0 && (
                <div className="col-12 text-center py-5">
                  <i className="flaticon-briefcase fz60 body-color mb20 d-block" />
                  <h4 className="title mb10">No jobs found</h4>
                  <p className="body-color">Try adjusting your filters or check back later.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
