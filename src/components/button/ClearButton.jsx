"use client";

import listingStore from "@/store/listingStore";
import priceStore from "@/store/priceStore";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ClearButton() {
  // set handlers
  const setDeliveryTime = listingStore((state) => state.setDeliveryTime);
  const setLevel = listingStore((state) => state.setLevel);
  const setLocation = listingStore((state) => state.setLocation);
  const setBestSeller = listingStore((state) => state.setBestSeller);
  const setDesginTool = listingStore((state) => state.setDesginTool);
  const setSpeak = listingStore((state) => state.setSpeak);
  const setPriceRange = priceStore((state) => state.priceRangeHandler);
  const setSearch = listingStore((state) => state.setSearch);
  const setCategory = listingStore((state) => state.setCategory);
  const setProjectType = listingStore((state) => state.setProjectType);
  const setEnglishLevel = listingStore((state) => state.setEnglishLevel);
  const setJobType = listingStore((state) => state.setJobType);
  const setNoOfEmployee = listingStore((state) => state.setNoOfEmployee);

  // get state
  const getDeliveryTime = listingStore((state) => state.getDeliveryTime);
  const getLevel = listingStore((state) => state.getLevel);
  const getLocation = listingStore((state) => state.getLocation);
  const getBestSeller = listingStore((state) => state.getBestSeller);
  const getDesginTool = listingStore((state) => state.getDesginTool);
  const getSpeak = listingStore((state) => state.getSpeak);
  const getPriceRange = priceStore((state) => state.priceRange);
  const getSearch = listingStore((state) => state.getSearch);
  const getCategory = listingStore((state) => state.getCategory);
  const getProjectType = listingStore((state) => state.getProjectType);
  const getEnglishLevel = listingStore((state) => state.getEnglishLevel);
  const getJobType = listingStore((state) => state.getJobType);
  const getNoOfEmployee = listingStore((state) => state.getNoOfEmployee);

  // clear handler
  const clearHandler = () => {
    setDeliveryTime("");
    setLevel([]);
    setLocation([]);
    setBestSeller("best-seller");
    setDesginTool([]);
    setSpeak([]);
    setPriceRange(0, 100000);
    setSearch("");
    setCategory([]);
    setProjectType([]);
    setEnglishLevel([]);
    setJobType([]);
    setNoOfEmployee([]);
  };

  return (
    <>
      {getDeliveryTime !== "" ||
      getLevel?.length !== 0 ||
      getLocation?.length !== 0 ||
      getSearch !== "" ||
      getBestSeller !== "best-seller" ||
      getDesginTool?.length !== 0 ||
      getSpeak?.length !== 0 ||
      getPriceRange.min !== 0 ||
      getPriceRange.max !== 100000 ||
      getCategory?.length !== 0 ||
      getProjectType?.length !== 0 ||
      getEnglishLevel?.length !== 0 ||
      getJobType?.length !== 0 ||
      getNoOfEmployee?.length !== 0 ? (
        <Button onClick={clearHandler} className="w-full mt-4">
          Clear
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      ) : null}
    </>
  );
}
