"use client";

import TagInput from "@/components/forms/TagInput";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function FreelancerVerification() {
  const linkedinUrl = useOnboardingStore((state) => state.linkedinUrl);
  const websiteUrl = useOnboardingStore((state) => state.websiteUrl);
  const certificates = useOnboardingStore((state) => state.certificates);
  const updateField = useOnboardingStore((state) => state.updateField);

  return (
    <div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">LinkedIn URL</label>
        <input
          type="text"
          className="form-control"
          value={linkedinUrl}
          placeholder="https://linkedin.com/in/username"
          onChange={(event) => updateField("linkedinUrl", event.target.value)}
        />
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">Website URL</label>
        <input
          type="text"
          className="form-control"
          value={websiteUrl}
          placeholder="https://yourportfolio.com"
          onChange={(event) => updateField("websiteUrl", event.target.value)}
        />
      </div>
      <TagInput
        label="Certificates (optional)"
        value={certificates}
        placeholder="Add a certificate"
        onChange={(value) => updateField("certificates", value)}
      />
    </div>
  );
}
