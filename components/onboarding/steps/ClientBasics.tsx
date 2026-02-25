"use client";

import { useOnboardingStore } from "@/store/onboardingStore";
import { useTranslations } from "next-intl";

interface ClientBasicsProps {
  showErrors?: boolean;
}

export default function ClientBasics({ showErrors }: ClientBasicsProps) {
  const t = useTranslations("onboarding");
  const clientName = useOnboardingStore((state) => state.clientName);
  const companyName = useOnboardingStore((state) => state.companyName);
  const companyWebsite = useOnboardingStore((state) => state.companyWebsite);
  const updateField = useOnboardingStore((state) => state.updateField);

  const clientNameError = showErrors && !clientName.trim();
  const companyNameError = showErrors && !companyName.trim();

  return (
    <div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.clientName")}
        </label>
        <input
          type="text"
          className={`form-control ${clientNameError ? "is-invalid" : ""}`}
          value={clientName}
          placeholder={t("placeholders.clientName")}
          onChange={(event) => updateField("clientName", event.target.value)}
        />
        {clientNameError && (
          <div className="invalid-feedback d-block">
            {t("errors.required")}
          </div>
        )}
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.companyName")}
        </label>
        <input
          type="text"
          className={`form-control ${companyNameError ? "is-invalid" : ""}`}
          value={companyName}
          placeholder={t("placeholders.companyName")}
          onChange={(event) => updateField("companyName", event.target.value)}
        />
        {companyNameError && (
          <div className="invalid-feedback d-block">
            {t("errors.required")}
          </div>
        )}
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.companyWebsite")}
        </label>
        <input
          type="text"
          className="form-control"
          value={companyWebsite}
          placeholder={t("placeholders.companyWebsite")}
          onChange={(event) => updateField("companyWebsite", event.target.value)}
        />
      </div>
    </div>
  );
}
