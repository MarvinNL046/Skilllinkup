"use client";

import SelectInput from "@/components/forms/SelectInput";
import TagInput from "@/components/forms/TagInput";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useTranslations } from "next-intl";

interface ClientNeedsProps {
  showErrors?: boolean;
}

export default function ClientNeeds({ showErrors }: ClientNeedsProps) {
  const t = useTranslations("onboarding");

  const projectTypeOptions = [
    { label: t("options.projectType.build"), value: "build" },
    { label: t("options.projectType.design"), value: "design" },
    { label: t("options.projectType.marketing"), value: "marketing" },
    { label: t("options.projectType.writing"), value: "writing" },
    { label: t("options.projectType.other"), value: "other" },
  ];

  const budgetOptions = [
    { label: t("options.budget.low"), value: "500-1000" },
    { label: t("options.budget.mid"), value: "1000-5000" },
    { label: t("options.budget.high"), value: "5000-10000" },
    { label: t("options.budget.enterprise"), value: "10000+" },
  ];
  const projectType = useOnboardingStore((state) => state.projectType);
  const budgetRange = useOnboardingStore((state) => state.budgetRange);
  const timeline = useOnboardingStore((state) => state.timeline);
  const projectDescription = useOnboardingStore((state) => state.projectDescription);
  const requiredSkills = useOnboardingStore((state) => state.requiredSkills);
  const updateField = useOnboardingStore((state) => state.updateField);

  const projectTypeError = showErrors && !projectType;
  const budgetError = showErrors && !budgetRange;
  const descriptionError = showErrors && !projectDescription.trim();

  return (
    <div>
      <SelectInput
        label={t("fields.projectType")}
        value={projectType}
        options={projectTypeOptions}
        placeholder={t("placeholders.projectType")}
        onChange={(value) => updateField("projectType", value)}
        isInvalid={projectTypeError}
        errorMessage={t("errors.required")}
      />
      <SelectInput
        label={t("fields.budgetRange")}
        value={budgetRange}
        options={budgetOptions}
        placeholder={t("placeholders.budgetRange")}
        onChange={(value) => updateField("budgetRange", value)}
        isInvalid={budgetError}
        errorMessage={t("errors.required")}
      />
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.timeline")}
        </label>
        <input
          type="text"
          className="form-control"
          value={timeline}
          placeholder={t("placeholders.timeline")}
          onChange={(event) => updateField("timeline", event.target.value)}
        />
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.projectSummary")}
        </label>
        <textarea
          className={`form-control ${descriptionError ? "is-invalid" : ""}`}
          rows={4}
          value={projectDescription}
          placeholder={t("placeholders.projectSummary")}
          onChange={(event) => updateField("projectDescription", event.target.value)}
        />
        {descriptionError && (
          <div className="invalid-feedback d-block">
            {t("errors.required")}
          </div>
        )}
      </div>
      <TagInput
        label={t("fields.requiredSkills")}
        value={requiredSkills}
        placeholder={t("placeholders.requiredSkills")}
        onChange={(value) => updateField("requiredSkills", value)}
        addLabel={t("buttons.add")}
      />
    </div>
  );
}
