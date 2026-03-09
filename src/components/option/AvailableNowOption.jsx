"use client";
import listingStore from "@/store/listingStore";

export default function AvailableNowOption() {
  const getAvailableOnly = listingStore((state) => state.getAvailableOnly);
  const setAvailableOnly = listingStore((state) => state.setAvailableOnly);

  return (
    <div className="card mb20 pb10">
      <div className="card-body px-0 pt-0">
        <div className="form-check form-switch d-flex align-items-center">
          <input
            className="form-check-input"
            type="checkbox"
            id="availableNow"
            checked={getAvailableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
          />
          <label className="form-check-label ms-2 fw500" htmlFor="availableNow">
            Available Now
          </label>
        </div>
      </div>
    </div>
  );
}
