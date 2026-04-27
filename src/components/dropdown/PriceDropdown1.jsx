"use client";
import priceStore from "@/store/priceStore";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Minus } from "lucide-react";

export default function PriceDropdown1() {
  const [getPrice, setPrice] = useState({ min: 0, max: 100000 });
  const priceRange = priceStore((state) => state.priceRange);
  const setPriceRange = priceStore((state) => state.priceRangeHandler);

  const priceHandler = (data) => {
    setPrice({ min: data[0], max: data[1] });
  };

  useEffect(() => {
    setPrice(priceRange);
  }, [priceRange]);

  return (
    <>
      <div className="px-5 pb-6 mb-0">
        <Slider
          className="horizontal-slider"
          value={[getPrice.min, getPrice.max]}
          min={0}
          range
          max={100000}
          onChange={priceHandler}
        />
        <div className="flex gap-2 items-center pt-4">
          <Input
            type="number"
            placeholder="$20"
            min={0}
            value={getPrice.min}
            onChange={(e) =>
              setPrice({ ...getPrice, min: Number(e.target.value) })
            }
          />
          <Minus className="h-4 w-4 text-foreground flex-shrink-0" />
          <Input
            type="number"
            placeholder="$100000"
            min={0}
            max={100000}
            value={getPrice.max}
            onChange={(e) =>
              setPrice({ ...getPrice, max: Number(e.target.value) })
            }
          />
        </div>
      </div>
      <Button onClick={() => setPriceRange(getPrice.min, getPrice.max)}>
        Apply
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </>
  );
}
