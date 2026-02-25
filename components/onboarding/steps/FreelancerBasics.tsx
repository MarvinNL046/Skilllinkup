"use client";

import ImageUpload from "@/components/forms/ImageUpload";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useTranslations } from "next-intl";

interface FreelancerBasicsProps {
  showErrors?: boolean;
}

export default function FreelancerBasics({ showErrors }: FreelancerBasicsProps) {
  const t = useTranslations("onboarding");
  const name = useOnboardingStore((state) => state.name);
  const profilePhoto = useOnboardingStore((state) => state.profilePhoto);
  const tagline = useOnboardingStore((state) => state.tagline);
  const bio = useOnboardingStore((state) => state.bio);
  const updateField = useOnboardingStore((state) => state.updateField);

  const nameError = showErrors && !name.trim();
  const taglineError = showErrors && !tagline.trim();
  const bioError = showErrors && !bio.trim();

  return (
    <div>
      <ImageUpload
        label={t("fields.profilePhoto")}
        value={profilePhoto}
        onChange={(value) => updateField("profilePhoto", value)}
        helperText={t("help.profilePhoto")}
      />
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.displayName")}
        </label>
        <input
          type="text"
          className={`form-control ${nameError ? "is-invalid" : ""}`}
          value={name}
          placeholder={t("placeholders.displayName")}
          onChange={(event) => updateField("name", event.target.value)}
        />
        {nameError && (
          <div className="invalid-feedback d-block">
            {t("errors.required")}
          </div>
        )}
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.tagline")}
        </label>
        <input
          type="text"
          className={`form-control ${taglineError ? "is-invalid" : ""}`}
          value={tagline}
          placeholder={t("placeholders.tagline")}
          onChange={(event) => updateField("tagline", event.target.value)}
        />
        {taglineError && (
          <div className="invalid-feedback d-block">
            {t("errors.required")}
          </div>
        )}
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.bio")}
        </label>
        <textarea
          className={`form-control ${bioError ? "is-invalid" : ""}`}
          rows={5}
          value={bio}
          placeholder={t("placeholders.bio")}
          onChange={(event) => updateField("bio", event.target.value)}
        />
        {bioError && (
          <div className="invalid-feedback d-block">
            {t("errors.required")}
          </div>
        )}
      </div>
    </div>
  );
}
