"use client";

import TagInput from "@/components/forms/TagInput";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useTranslations } from "next-intl";

export default function FreelancerVerification() {
  const t = useTranslations("onboarding");
  const linkedinUrl = useOnboardingStore((state) => state.linkedinUrl);
  const websiteUrl = useOnboardingStore((state) => state.websiteUrl);
  const certificates = useOnboardingStore((state) => state.certificates);
  const updateField = useOnboardingStore((state) => state.updateField);

  return (
    <div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.linkedinUrl")}
        </label>
        <input
          type="text"
          className="form-control"
          value={linkedinUrl}
          placeholder={t("placeholders.linkedinUrl")}
          onChange={(event) => updateField("linkedinUrl", event.target.value)}
        />
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.websiteUrl")}
        </label>
        <input
          type="text"
          className="form-control"
          value={websiteUrl}
          placeholder={t("placeholders.websiteUrl")}
          onChange={(event) => updateField("websiteUrl", event.target.value)}
        />
      </div>
      <TagInput
        label={t("fields.certificates")}
        value={certificates}
        placeholder={t("placeholders.certificates")}
        onChange={(value) => updateField("certificates", value)}
        addLabel={t("buttons.add")}
      />
    </div>
  );
}
