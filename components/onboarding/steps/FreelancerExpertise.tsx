"use client";

import SelectInput from "@/components/forms/SelectInput";
import TagInput from "@/components/forms/TagInput";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useTranslations } from "next-intl";

interface FreelancerExpertiseProps {
  showErrors?: boolean;
}

export default function FreelancerExpertise({ showErrors }: FreelancerExpertiseProps) {
  const t = useTranslations("onboarding");

  const categoryOptions = [
    { label: t("options.category.design"), value: "design" },
    { label: t("options.category.development"), value: "development" },
    { label: t("options.category.marketing"), value: "marketing" },
    { label: t("options.category.writing"), value: "writing" },
    { label: t("options.category.video"), value: "video" },
  ];

  const experienceOptions = [
    { label: t("options.experience.junior"), value: "junior" },
    { label: t("options.experience.mid"), value: "mid" },
    { label: t("options.experience.senior"), value: "senior" },
  ];
  const category = useOnboardingStore((state) => state.category);
  const skills = useOnboardingStore((state) => state.skills);
  const experienceLevel = useOnboardingStore((state) => state.experienceLevel);
  const hourlyRate = useOnboardingStore((state) => state.hourlyRate);
  const updateField = useOnboardingStore((state) => state.updateField);

  const categoryError = showErrors && !category;
  const skillsError = showErrors && skills.length === 0;
  const experienceError = showErrors && !experienceLevel;
  const rateError = showErrors && hourlyRate <= 0;

  return (
    <div>
      <SelectInput
        label={t("fields.category")}
        value={category}
        options={categoryOptions}
        placeholder={t("placeholders.category")}
        onChange={(value) => updateField("category", value)}
        isInvalid={categoryError}
        errorMessage={t("errors.required")}
      />
      <TagInput
        label={t("fields.skills")}
        value={skills}
        placeholder={t("placeholders.skills")}
        onChange={(value) => updateField("skills", value)}
        addLabel={t("buttons.add")}
        isInvalid={skillsError}
        errorMessage={t("errors.required")}
      />
      <SelectInput
        label={t("fields.experienceLevel")}
        value={experienceLevel}
        options={experienceOptions}
        placeholder={t("placeholders.experienceLevel")}
        onChange={(value) => updateField("experienceLevel", value)}
        isInvalid={experienceError}
        errorMessage={t("errors.required")}
      />
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.hourlyRate")}
        </label>
        <input
          type="number"
          className={`form-control ${rateError ? "is-invalid" : ""}`}
          value={hourlyRate || ""}
          placeholder={t("placeholders.hourlyRate")}
          onChange={(event) =>
            updateField("hourlyRate", Number(event.target.value || 0))
          }
        />
        {rateError && (
          <div className="invalid-feedback d-block">
            {t("errors.required")}
          </div>
        )}
      </div>
    </div>
  );
}
