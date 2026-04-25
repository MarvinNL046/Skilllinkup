"use client";

import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function PayoutForm() {
  const t = useTranslations("payouts");

  function handleSave(e) {
    e.preventDefault();
    toast.success(t("payoutSaved"));
  }

  return (
    <>
      <form className="form-style1" onSubmit={handleSave}>
        <div className="row">
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                {t("bankName")}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={t("bankNamePlaceholder")}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                {t("bankAccountNumber")}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={t("bankAccountPlaceholder")}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                {t("accountHolderName")}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={t("accountHolderPlaceholder")}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                {t("routingNumber")}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={t("routingPlaceholder")}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                {t("bankIBAN")}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={t("ibanPlaceholder")}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                {t("swiftCode")}
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={t("swiftPlaceholder")}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="text-left">
              <button type="submit" className="ud-btn btn-thm">
                {t("saveDetail")}
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
