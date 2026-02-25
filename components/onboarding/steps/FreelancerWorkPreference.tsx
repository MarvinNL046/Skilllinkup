"use client";

import SelectInput from "@/components/forms/SelectInput";
import TagInput from "@/components/forms/TagInput";
import { useOnboardingStore } from "@/store/onboardingStore";

const workTypeOptions = [
  { label: "Remote", value: "remote" },
  { label: "Local", value: "local" },
  { label: "Hybrid", value: "hybrid" },
];

export default function FreelancerWorkPreference() {
  const workType = useOnboardingStore((state) => state.workType);
  const countries = useOnboardingStore((state) => state.countries);
  const city = useOnboardingStore((state) => state.city);
  const languages = useOnboardingStore((state) => state.languages);
  const updateField = useOnboardingStore((state) => state.updateField);

  return (
    <div>
      <SelectInput
        label="Work type"
        value={workType}
        options={workTypeOptions}
        onChange={(value) => updateField("workType", value as typeof workType)}
      />
      <TagInput
        label="Countries you can work with"
        value={countries}
        placeholder="Add a country"
        onChange={(value) => updateField("countries", value)}
      />
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">City</label>
        <input
          type="text"
          className="form-control"
          value={city}
          placeholder="e.g. Amsterdam"
          onChange={(event) => updateField("city", event.target.value)}
        />
      </div>
      <TagInput
        label="Languages"
        value={languages}
        placeholder="Add a language"
        onChange={(value) => updateField("languages", value)}
      />
    </div>
  );
}
