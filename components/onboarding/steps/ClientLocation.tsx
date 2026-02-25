"use client";

import { useOnboardingStore } from "@/store/onboardingStore";

export default function ClientLocation() {
  const clientCountry = useOnboardingStore((state) => state.clientCountry);
  const clientCity = useOnboardingStore((state) => state.clientCity);
  const updateField = useOnboardingStore((state) => state.updateField);

  return (
    <div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">Country</label>
        <input
          type="text"
          className="form-control"
          value={clientCountry}
          placeholder="Country"
          onChange={(event) => updateField("clientCountry", event.target.value)}
        />
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">City</label>
        <input
          type="text"
          className="form-control"
          value={clientCity}
          placeholder="City"
          onChange={(event) => updateField("clientCity", event.target.value)}
        />
      </div>
    </div>
  );
}
