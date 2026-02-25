"use client";

import SelectInput from "@/components/forms/SelectInput";
import TagInput from "@/components/forms/TagInput";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useTranslations } from "next-intl";

interface FreelancerWorkPreferenceProps {
  showErrors?: boolean;
}

export default function FreelancerWorkPreference({
  showErrors,
}: FreelancerWorkPreferenceProps) {
  const t = useTranslations("onboarding");

  const workTypeOptions = [
    { label: t("options.workType.remote"), value: "remote" },
    { label: t("options.workType.local"), value: "local" },
    { label: t("options.workType.hybrid"), value: "hybrid" },
  ];
  const workType = useOnboardingStore((state) => state.workType);
  const countries = useOnboardingStore((state) => state.countries);
  const city = useOnboardingStore((state) => state.city);
  const languages = useOnboardingStore((state) => state.languages);
  const updateField = useOnboardingStore((state) => state.updateField);

  const cityError = showErrors && !city.trim();
  const languagesError = showErrors && languages.length === 0;

  return (
    <div>
      <SelectInput
        label={t("fields.workType")}
        value={workType}
        options={workTypeOptions}
        onChange={(value) => updateField("workType", value as typeof workType)}
      />
      <TagInput
        label={t("fields.countries")}
        value={countries}
        placeholder={t("placeholders.countries")}
        onChange={(value) => updateField("countries", value)}
        addLabel={t("buttons.add")}
      />
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.city")}
        </label>
        <input
          type="text"
          className={`form-control ${cityError ? "is-invalid" : ""}`}
          value={city}
          placeholder={t("placeholders.city")}
          onChange={(event) => updateField("city", event.target.value)}
        />
        {cityError && (
          <div className="invalid-feedback d-block">
            {t("errors.required")}
          </div>
        )}
      </div>
      <TagInput
        label={t("fields.languages")}
        value={languages}
        placeholder={t("placeholders.languages")}
        onChange={(value) => updateField("languages", value)}
        addLabel={t("buttons.add")}
        isInvalid={languagesError}
        errorMessage={t("errors.required")}
      />
    </div>
  );
}
