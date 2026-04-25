"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

export default function QuoteRequestListing() {
  const t = useTranslations("localHub");
  const requests = useQuery(api.marketplace.quotes.listRequests, { limit: 20 });

  if (requests === undefined) {
    return (
      <section className="pt30 pb90">
        <div className="container text-center py-5">
          <div className="spinner-border text-thm" role="status" />
        </div>
      </section>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <section className="pt30 pb90">
        <div className="container text-center py-5">
          <i className="flaticon-clipboard fz40 text mb20 block" />
          <h4>{t("noQuoteRequests")}</h4>
          <p className="body-color">{t("checkBackSoon")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt30 pb90">
      <div className="container">
        <div className="row">
          {requests.map((req) => {
            const claimedSlots = req.claimedSlots ?? 0;
            const maxSlots = req.isExclusive ? 1 : (req.maxSlots ?? 3);
            const slotsRemaining = Math.max(0, maxSlots - claimedSlots);
            const isFull = slotsRemaining === 0;

            return (
              <div key={req._id} className="col-sm-6 col-lg-4 mb20">
                <div className={`listing-style1 bdrs8 p20 ${isFull ? "opacity-50" : ""}`}>
                  <div className="flex justify-between items-start mb10">
                    <h5 className="list-title mb-1">
                      {req.title || req.description?.slice(0, 50) || t("quoteRequest")}
                    </h5>
                    {req.isExclusive && (
                      <span className="badge bg-warning fz11">{t("exclusive")}</span>
                    )}
                  </div>
                  <p className="body-color fz13 mb10">{req.categoryName || t("general")}</p>
                  <p className="body-color fz14 mb15">
                    {req.description?.length > 120
                      ? req.description.slice(0, 120) + "..."
                      : req.description}
                  </p>
                  <div className="flex justify-between items-center mb10">
                    <span className="fz13 body-color">
                      {req.budgetIndication || t("flexible")}
                    </span>
                    <span className="fz13 body-color">
                      {slotsRemaining}/{maxSlots} {t("slots")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    {req.locationCity && (
                      <span className="fz13 body-color">
                        <i className="flaticon-place me-1" />{req.locationCity}
                      </span>
                    )}
                    <Link
                      href={`/local/quote-request/${req._id}`}
                      className={`ud-btn ${isFull ? "btn-white" : "btn-thm2"} bdrs4`}
                      style={{ fontSize: "0.8rem", padding: "6px 14px" }}
                    >
                      {isFull ? t("full") : t("view")} <i className="fal fa-arrow-right-long ms-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
