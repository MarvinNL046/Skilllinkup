"use client";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useListingStore } from "@/store/listingStore";
import { usePriceStore } from "@/store/priceStore";

interface FilterSidebarProps {
  categories: { name: string; slug: string }[];
  locations: string[];
  maxPrice: number;
}

export default function FilterSidebar({
  categories,
  locations,
  maxPrice,
}: FilterSidebarProps) {
  const selectedCategories = useListingStore((state) => state.category);
  const selectedLocations = useListingStore((state) => state.location);
  const ratingMin = useListingStore((state) => state.ratingMin);
  const search = useListingStore((state) => state.search);
  const setCategory = useListingStore((state) => state.setCategory);
  const setLocation = useListingStore((state) => state.setLocation);
  const setRatingMin = useListingStore((state) => state.setRatingMin);
  const setSearch = useListingStore((state) => state.setSearch);
  const resetFilters = useListingStore((state) => state.resetFilters);

  const priceRange = usePriceStore((state) => state.priceRange);
  const setPriceRange = usePriceStore((state) => state.setPriceRange);

  const toggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      setCategory(selectedCategories.filter((c) => c !== slug));
    } else {
      setCategory([...selectedCategories, slug]);
    }
  };

  const toggleLocation = (loc: string) => {
    if (selectedLocations.includes(loc)) {
      setLocation(selectedLocations.filter((c) => c !== loc));
    } else {
      setLocation([...selectedLocations, loc]);
    }
  };

  return (
    <div className="sidebar-widget">
      <div className="widget-wrapper">
        <h4 className="list-title">All filters</h4>

        <div className="form-style1 mb20">
          <label className="heading-color ff-heading fw500 mb10">Search</label>
          <input
            type="text"
            className="form-control"
            value={search}
            placeholder="Search services"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="mb30">
          <h5 className="mb15">Categories</h5>
          {categories.map((cat) => (
            <div key={cat.slug} className="form-check d-flex align-items-center mb10">
              <input
                className="form-check-input"
                type="checkbox"
                id={`cat-${cat.slug}`}
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => toggleCategory(cat.slug)}
              />
              <label className="form-check-label" htmlFor={`cat-${cat.slug}`}>
                {cat.name}
              </label>
            </div>
          ))}
        </div>

        <div className="mb30">
          <h5 className="mb15">Price range</h5>
          <Slider
            range
            min={0}
            max={Math.max(maxPrice, 100)}
            value={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
          />
          <div className="d-flex justify-content-between mt10">
            <span>€{priceRange[0]}</span>
            <span>€{priceRange[1]}</span>
          </div>
        </div>

        <div className="mb30">
          <h5 className="mb15">Location</h5>
          {locations.map((loc) => (
            <div key={loc} className="form-check d-flex align-items-center mb10">
              <input
                className="form-check-input"
                type="checkbox"
                id={`loc-${loc}`}
                checked={selectedLocations.includes(loc)}
                onChange={() => toggleLocation(loc)}
              />
              <label className="form-check-label" htmlFor={`loc-${loc}`}>
                {loc}
              </label>
            </div>
          ))}
        </div>

        <div className="mb30">
          <h5 className="mb15">Rating</h5>
          {[5, 4, 3].map((rating) => (
            <div key={rating} className="form-check d-flex align-items-center mb10">
              <input
                className="form-check-input"
                type="radio"
                id={`rating-${rating}`}
                checked={ratingMin === rating}
                onChange={() => setRatingMin(rating)}
              />
              <label className="form-check-label" htmlFor={`rating-${rating}`}>
                {rating}+ stars
              </label>
            </div>
          ))}
          <div className="form-check d-flex align-items-center mb10">
            <input
              className="form-check-input"
              type="radio"
              id="rating-any"
              checked={ratingMin === 0}
              onChange={() => setRatingMin(0)}
            />
            <label className="form-check-label" htmlFor="rating-any">
              Any rating
            </label>
          </div>
        </div>

        <button className="ud-btn btn-white2 w-100" type="button" onClick={resetFilters}>
          Clear filters
        </button>
      </div>
    </div>
  );
}
