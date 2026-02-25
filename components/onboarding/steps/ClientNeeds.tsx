"use client";

import SelectInput from "@/components/forms/SelectInput";
import TagInput from "@/components/forms/TagInput";
import { useOnboardingStore } from "@/store/onboardingStore";

const projectTypeOptions = [
  { label: "Website / App build", value: "build" },
  { label: "Design / Branding", value: "design" },
  { label: "Marketing / Growth", value: "marketing" },
  { label: "Content / Writing", value: "writing" },
  { label: "Other", value: "other" },
];

const budgetOptions = [
  { label: "$500 - $1,000", value: "500-1000" },
  { label: "$1,000 - $5,000", value: "1000-5000" },
  { label: "$5,000 - $10,000", value: "5000-10000" },
  { label: "$10,000+", value: "10000+" },
];

export default function ClientNeeds() {
  const projectType = useOnboardingStore((state) => state.projectType);
  const budgetRange = useOnboardingStore((state) => state.budgetRange);
  const timeline = useOnboardingStore((state) => state.timeline);
  const projectDescription = useOnboardingStore((state) => state.projectDescription);
  const requiredSkills = useOnboardingStore((state) => state.requiredSkills);
  const updateField = useOnboardingStore((state) => state.updateField);

  return (
    <div>
      <SelectInput
        label="Project type"
        value={projectType}
        options={projectTypeOptions}
        placeholder="Select project type"
        onChange={(value) => updateField("projectType", value)}
      />
      <SelectInput
        label="Budget range"
        value={budgetRange}
        options={budgetOptions}
        placeholder="Select budget range"
        onChange={(value) => updateField("budgetRange", value)}
      />
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">Timeline</label>
        <input
          type="text"
          className="form-control"
          value={timeline}
          placeholder="e.g. 4-6 weeks"
          onChange={(event) => updateField("timeline", event.target.value)}
        />
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">Project summary</label>
        <textarea
          className="form-control"
          rows={4}
          value={projectDescription}
          placeholder="What do you need help with?"
          onChange={(event) => updateField("projectDescription", event.target.value)}
        />
      </div>
      <TagInput
        label="Key skills"
        value={requiredSkills}
        placeholder="Add a skill"
        onChange={(value) => updateField("requiredSkills", value)}
      />
    </div>
  );
}
