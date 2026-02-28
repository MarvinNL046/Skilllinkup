"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

export default function QuoteRequestListing() {
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
          <i className="flaticon-clipboard fz40 text mb20 d-block" />
          <h4>No Quote Requests Yet</h4>
          <p className="body-color">Check back soon for local service requests.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt30 pb90">
      <div className="container">
        <div className="row">
          {requests.map((req) => (
            <div key={req._id} className="col-sm-6 col-lg-4 mb20">
              <div className="listing-style1 bdrs8 p20">
                <h5 className="list-title mb-1">{req.title || req.description?.slice(0, 50) || "Quote Request"}</h5>
                <p className="body-color fz13 mb10">{req.categoryName || "General"}</p>
                <p className="body-color fz14 mb15">
                  {req.description?.length > 120
                    ? req.description.slice(0, 120) + "..."
                    : req.description}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fz13 body-color">
                    {req.budget ? `Budget: €${req.budget}` : "Budget: Flexible"}
                  </span>
                  <Link
                    href={`/local/quote-request/${req._id}`}
                    className="ud-btn btn-thm2 bdrs4"
                    style={{ fontSize: "0.8rem", padding: "6px 14px" }}
                  >
                    View <i className="fal fa-arrow-right-long ms-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
