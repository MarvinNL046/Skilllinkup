"use client";

import SelectInput from "@/components/forms/SelectInput";
import TagInput from "@/components/forms/TagInput";
import { useOnboardingStore } from "@/store/onboardingStore";

const categoryOptions = [
  { label: "Design", value: "design" },
  { label: "Development", value: "development" },
  { label: "Marketing", value: "marketing" },
  { label: "Writing", value: "writing" },
  { label: "Video & Animation", value: "video" },
];

const experienceOptions = [
  { label: "Junior (0-2 years)", value: "junior" },
  { label: "Mid (3-5 years)", value: "mid" },
  { label: "Senior (6+ years)", value: "senior" },
];

export default function FreelancerExpertise() {
  const category = useOnboardingStore((state) => state.category);
  const skills = useOnboardingStore((state) => state.skills);
  const experienceLevel = useOnboardingStore((state) => state.experienceLevel);
  const hourlyRate = useOnboardingStore((state) => state.hourlyRate);
  const updateField = useOnboardingStore((state) => state.updateField);

  return (
    <div>
      <SelectInput
        label="Primary category"
        value={category}
        options={categoryOptions}
        placeholder="Select a category"
        onChange={(value) => updateField("category", value)}
      />
      <TagInput
        label="Skills"
        value={skills}
        placeholder="Add a skill (e.g. Figma)"
        onChange={(value) => updateField("skills", value)}
      />
      <SelectInput
        label="Experience level"
        value={experienceLevel}
        options={experienceOptions}
        placeholder="Select experience level"
        onChange={(value) => updateField("experienceLevel", value)}
      />
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">Hourly rate (USD)</label>
        <input
          type="number"
          className="form-control"
          value={hourlyRate || ""}
          placeholder="e.g. 50"
          onChange={(event) =>
            updateField("hourlyRate", Number(event.target.value || 0))
          }
        />
      </div>
    </div>
  );
}
