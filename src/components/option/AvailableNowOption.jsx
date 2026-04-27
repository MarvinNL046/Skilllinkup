"use client";
import listingStore from "@/store/listingStore";
import { useTranslations } from "next-intl";

export default function AvailableNowOption() {
  const t = useTranslations("filters");
  const getAvailableOnly = listingStore((state) => state.getAvailableOnly);
  const setAvailableOnly = listingStore((state) => state.setAvailableOnly);

  return (
    <div className="card mb-5 pb-2.5">
      <div className="card-body px-0 pt-0">
        <div className="form-check form-switch flex items-center">
          <input
            className="form-check-input"
            type="checkbox"
            id="availableNow"
            checked={getAvailableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
          />
          <label className="form-check-label ms-2 font-medium" htmlFor="availableNow">
            {t("availableNow")}
          </label>
        </div>
      </div>
    </div>
  );
}
