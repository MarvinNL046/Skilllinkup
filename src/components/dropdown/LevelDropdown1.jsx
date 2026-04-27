"use client";

import { level } from "@/data/listing";
import listingStore from "@/store/listingStore";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function LevelDropdown1() {
  const [getLevel, setLevel] = useState([]);

  const setOurLevel = listingStore((state) => state.setLevel);
  const getOurLevel = listingStore((state) => state.getLevel);

  const levelHandler = (data) => {
    const isExist = getLevel.includes(data);
    if (!isExist) {
      return setLevel((item) => [...item, data]);
    }
    const deleted = getLevel.filter((item) => item !== data);
    setLevel(deleted);
  };

  useEffect(() => {
    setLevel(getOurLevel);
  }, [getOurLevel]);

  return (
    <>
      <div className="px-5 pb-6 space-y-2">
        {level.map((item, i) => (
          <label
            key={i}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <Checkbox
              checked={getLevel.includes(item.value)}
              onCheckedChange={() => levelHandler(item.value)}
            />
            {item.title}
          </label>
        ))}
      </div>
      <Button
        onClick={() => {
          setOurLevel([]);
          getLevel.forEach((item) => {
            setOurLevel(item);
          });
        }}
      >
        Apply
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </>
  );
}
