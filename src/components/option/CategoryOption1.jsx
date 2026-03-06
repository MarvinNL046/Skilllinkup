"use client";
import useConvexCategories from "@/hook/useConvexCategories";
import listingStore from "@/store/listingStore";
import { flattenLeafMarketplaceCategories } from "@/lib/marketplaceCategories";

export default function CategoryOption1() {
  const getCategory = listingStore((state) => state.getCategory);
  const setCategory = listingStore((state) => state.setCategory);
  const categories = useConvexCategories("en");

  // handler
  const categoryHandler = (data) => {
    setCategory(data);
  };

  if (!categories) {
    return <div className="text-muted fz14">Loading...</div>;
  }

  const sorted = flattenLeafMarketplaceCategories(categories).slice(0, 10);

  return (
    <>
      <div className="checkbox-style1 mb15">
        {sorted.map((cat) => (
          <label key={cat._id} className="custom_checkbox">
            {cat.label}
            <input
              type="checkbox"
              onChange={() => categoryHandler(cat.name)}
              checked={getCategory.includes(cat.name)}
            />
            <span className="checkmark" />
          </label>
        ))}
      </div>
    </>
  );
}
