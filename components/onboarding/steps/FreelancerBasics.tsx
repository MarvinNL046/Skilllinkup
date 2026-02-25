"use client";

import ImageUpload from "@/components/forms/ImageUpload";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function FreelancerBasics() {
  const name = useOnboardingStore((state) => state.name);
  const profilePhoto = useOnboardingStore((state) => state.profilePhoto);
  const tagline = useOnboardingStore((state) => state.tagline);
  const bio = useOnboardingStore((state) => state.bio);
  const updateField = useOnboardingStore((state) => state.updateField);

  return (
    <div>
      <ImageUpload
        label="Profile photo"
        value={profilePhoto}
        onChange={(value) => updateField("profilePhoto", value)}
        helperText="Use a clear headshot with good lighting."
      />
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">Display name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          placeholder="Your name"
          onChange={(event) => updateField("name", event.target.value)}
        />
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">Tagline</label>
        <input
          type="text"
          className="form-control"
          value={tagline}
          placeholder="e.g. Product designer for SaaS teams"
          onChange={(event) => updateField("tagline", event.target.value)}
        />
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">Bio</label>
        <textarea
          className="form-control"
          rows={5}
          value={bio}
          placeholder="Tell clients about your experience and results."
          onChange={(event) => updateField("bio", event.target.value)}
        />
      </div>
    </div>
  );
}
