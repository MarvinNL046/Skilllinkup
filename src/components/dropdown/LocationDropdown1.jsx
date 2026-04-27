"use client";

import { location } from "@/data/listing";
import listingStore from "@/store/listingStore";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function LocationDropdown1() {
  const [getLocation, setLocation] = useState([]);
  const getOurLocation = listingStore((state) => state.getLocation);
  const setOurLocation = listingStore((state) => state.setLocation);

  const locationHandler = (data) => {
    const isExist = getLocation.includes(data);
    if (!isExist) {
      return setLocation((item) => [...item, data]);
    }
    const deleted = getLocation.filter((item) => item !== data);
    setLocation(deleted);
  };

  useEffect(() => {
    setLocation(getOurLocation);
  }, [getOurLocation]);

  return (
    <>
      <div className="px-5 pb-6 space-y-2">
        {location.map((item, i) => (
          <label
            key={i}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <Checkbox
              checked={getLocation.includes(item.value)}
              onCheckedChange={() => locationHandler(item.value)}
            />
            {item.title}
          </label>
        ))}
      </div>
      <Button
        onClick={() => {
          setOurLocation([]);
          getLocation.forEach((item) => {
            setOurLocation(item);
          });
        }}
      >
        Apply
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </>
  );
}
