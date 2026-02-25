"use client";

import { useOnboardingStore } from "@/store/onboardingStore";

export default function ClientBasics() {
  const clientName = useOnboardingStore((state) => state.clientName);
  const companyName = useOnboardingStore((state) => state.companyName);
  const companyWebsite = useOnboardingStore((state) => state.companyWebsite);
  const updateField = useOnboardingStore((state) => state.updateField);

  return (
    <div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">Your name</label>
        <input
          type="text"
          className="form-control"
          value={clientName}
          placeholder="Your name"
          onChange={(event) => updateField("clientName", event.target.value)}
        />
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">Company name</label>
        <input
          type="text"
          className="form-control"
          value={companyName}
          placeholder="Company or team name"
          onChange={(event) => updateField("companyName", event.target.value)}
        />
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">Company website</label>
        <input
          type="text"
          className="form-control"
          value={companyWebsite}
          placeholder="https://"
          onChange={(event) => updateField("companyWebsite", event.target.value)}
        />
      </div>
    </div>
  );
}
