"use client";

import { useMemo } from "react";
import ServiceCard, { ServiceCardData } from "@/components/marketplace/ServiceCard";
import FilterSidebar from "@/components/marketplace/FilterSidebar";
import { useListingStore } from "@/store/listingStore";
import { usePriceStore } from "@/store/priceStore";

interface ServicesClientProps {
  services: ServiceCardData[];
  categories: { name: string; slug: string }[];
}

export default function ServicesClient({ services, categories }: ServicesClientProps) {
  const selectedCategories = useListingStore((state) => state.category);
  const selectedLocations = useListingStore((state) => state.location);
  const ratingMin = useListingStore((state) => state.ratingMin);
  const search = useListingStore((state) => state.search);
  const priceRange = usePriceStore((state) => state.priceRange);

  const locations = useMemo(() => {
    const set = new Set<string>();
    services.forEach((service) => {
      if (service.locationCountry) {
        set.add(service.locationCountry);
      }
    });
    return Array.from(set);
  }, [services]);

  const maxPrice = useMemo(
    () => services.reduce((max, s) => Math.max(max, s.priceFrom), 0),
    [services]
  );

  const filteredServices = useMemo(() => {
    return services
      .filter((service) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          service.title.toLowerCase().includes(q) ||
          service.category.toLowerCase().includes(q) ||
          service.freelancerName.toLowerCase().includes(q)
        );
      })
      .filter((service) =>
        selectedCategories.length === 0
          ? true
          : selectedCategories.includes(service.categorySlug)
      )
      .filter((service) =>
        ratingMin > 0 ? service.rating >= ratingMin : true
      )
      .filter(
        (service) =>
          service.priceFrom >= priceRange[0] && service.priceFrom <= priceRange[1]
      )
      .filter((service) =>
        selectedLocations.length === 0
          ? true
          : Boolean(service.locationCountry) &&
            selectedLocations.includes(service.locationCountry!)
      );
  }, [services, search, selectedCategories, ratingMin, priceRange, selectedLocations]);

  return (
    <section className="pt30 pb90">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-xl-3">
            <FilterSidebar categories={categories} locations={locations} maxPrice={maxPrice} />
          </div>
          <div className="col-lg-8 col-xl-9">
            <div className="row align-items-center mb20">
              <div className="col-sm-6">
                <h4 className="mb0">{filteredServices.length} Services</h4>
              </div>
            </div>
            <div className="row">
              {filteredServices.map((service) => (
                <div key={service.slug} className="col-sm-6 col-xl-4">
                  <ServiceCard data={service} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
