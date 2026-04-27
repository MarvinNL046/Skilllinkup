"use client";
import { category } from "@/data/listing";
import listingStore from "@/store/listingStore";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CategoryDropdown2() {
  const [getCategory, setCategory] = useState([]);

  const setCategoryState = listingStore((state) => state.setCategory);
  const getCategoryState = listingStore((state) => state.getCategory);

  const categoryHandler = (data) => {
    if (!getCategory.includes(data)) {
      return setCategory([...getCategory, data]);
    }
    const deleted = getCategory.filter((item) => item !== data);
    setCategory(deleted);
  };

  const categorySumitHandler = () => {
    setCategoryState([]);
    getCategory.forEach((item) => {
      setCategoryState(item);
    });
  };

  useEffect(() => {
    setCategory(getCategoryState);
  }, [getCategoryState]);

  return (
    <>
      <div className="px-5 pb-6 space-y-2">
        {category.map((item, i) => (
          <label
            key={i}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <Checkbox
              checked={getCategory.includes(item.title)}
              onCheckedChange={() => categoryHandler(item.title)}
            />
            <span className="flex-1">{item.title}</span>
            <span className="text-xs text-[var(--text-tertiary)]">
              ({item.total})
            </span>
          </label>
        ))}
      </div>
      <Button onClick={categorySumitHandler}>
        Apply
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </>
  );
}
