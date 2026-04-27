"use client";
import { deliveryTime } from "@/data/listing";
import toggleStore from "@/store/toggleStore";
import Image from "next/image";
import listingStore from "@/store/listingStore";
import { useEffect, useState } from "react";
import priceStore from "@/store/priceStore";

import ClearButton from "../button/ClearButton";
import SortOption1 from "../option/SortOption1";
import PriceDropdown1 from "../dropdown/PriceDropdown1";
import LevelDropdown1 from "../dropdown/LevelDropdown1";
import LocationDropdown1 from "../dropdown/LocationDropdown1";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronDown, ArrowRight, Filter } from "lucide-react";

function FilterDropdown({ label, children }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          {label}
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-0" align="start">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function ListingOption1() {
  const [getDelivery, SetDelivery] = useState("");
  const [getPrice, setPrice] = useState({ min: 0, max: 100000 });
  const [getLevel, setLevel] = useState([]);
  const [getLocation, setLocation] = useState([]);

  const priceRange = priceStore((state) => state.priceRange);
  const listingToggle = toggleStore((state) => state.listingToggleHandler);
  const setOurDeliveryTime = listingStore((state) => state.setDeliveryTime);
  const getDeliveryTime = listingStore((state) => state.getDeliveryTime);
  const getOurLevel = listingStore((state) => state.getLevel);
  const getOurLocation = listingStore((state) => state.getLocation);

  useEffect(() => {
    SetDelivery(getDeliveryTime);
  }, [getDeliveryTime]);

  useEffect(() => {
    setPrice(priceRange);
  }, [priceRange]);

  useEffect(() => {
    setLevel(getOurLevel);
  }, [getOurLevel]);

  useEffect(() => {
    setLocation(getOurLocation);
  }, [getOurLocation]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          onClick={listingToggle}
          type="button"
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          All Filter
        </Button>

        <div className="hidden xl:flex flex-wrap gap-2">
          <FilterDropdown label="Delivery Time">
            <div className="px-5 py-4">
              <RadioGroup
                value={getDelivery}
                onValueChange={(val) => SetDelivery(val)}
              >
                {deliveryTime.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <RadioGroupItem
                      id={`delivery-${item.id}`}
                      value={item.value}
                    />
                    <Label
                      htmlFor={`delivery-${item.id}`}
                      className="cursor-pointer text-sm"
                    >
                      {item.title}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="px-5 pb-4">
              <Button
                onClick={() => setOurDeliveryTime(getDelivery)}
                className="w-full"
              >
                Apply
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </FilterDropdown>

          <FilterDropdown label="Budget">
            <PriceDropdown1 />
          </FilterDropdown>

          <FilterDropdown label="Level">
            <LevelDropdown1 />
          </FilterDropdown>

          <FilterDropdown label="Location">
            <LocationDropdown1 />
          </FilterDropdown>

          <ClearButton />
        </div>
      </div>

      <div className="flex items-center justify-center sm:justify-end">
        <SortOption1 />
      </div>
    </div>
  );
}
