"use client";

import { useOnboardingStore } from "@/store/onboardingStore";
import { useTranslations } from "next-intl";

interface ClientLocationProps {
  showErrors?: boolean;
}

export default function ClientLocation({ showErrors }: ClientLocationProps) {
  const t = useTranslations("onboarding");
  const clientCountry = useOnboardingStore((state) => state.clientCountry);
  const clientCity = useOnboardingStore((state) => state.clientCity);
  const updateField = useOnboardingStore((state) => state.updateField);

  const countryError = showErrors && !clientCountry.trim();

  return (
    <div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.country")}
        </label>
        <input
          type="text"
          className={`form-control ${countryError ? "is-invalid" : ""}`}
          value={clientCountry}
          placeholder={t("placeholders.country")}
          onChange={(event) => updateField("clientCountry", event.target.value)}
        />
        {countryError && (
          <div className="invalid-feedback d-block">
            {t("errors.required")}
          </div>
        )}
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.city")}
        </label>
        <input
          type="text"
          className="form-control"
          value={clientCity}
          placeholder={t("placeholders.city")}
          onChange={(event) => updateField("clientCity", event.target.value)}
        />
      </div>
    </div>
  );
}
