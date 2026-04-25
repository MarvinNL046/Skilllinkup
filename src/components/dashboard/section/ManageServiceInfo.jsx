"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import DashboardNavigation from "../header/DashboardNavigation";
import DashboardTabs from "../element/DashboardTabs";
import { useState } from "react";
import Pagination1 from "@/components/section/Pagination1";
import ManageServiceCard1 from "../card/ManageServiceCard1";
import ProposalModal1 from "../modal/ProposalModal1";
import DeleteModal from "../modal/DeleteModal";
import useConvexMyGigs from "@/hook/useConvexMyGigs";

const STATUS_MAP = {
  0: "active",
  1: "pending",
  2: "ongoing",
  3: "completed",
  4: "cancelled",
};

function mapGigToCard(gig, t) {
  return {
    _id: gig._id,
    id: gig._id,
    img: gig.firstImage?.url || "/images/listings/g-1.jpg",
    title: gig.title || t("untitledService"),
    category: gig.category?.name || t("uncategorized"),
    cost: gig.minPrice || 0,
    status: gig.status,
    list: [],
  };
}

function GigTable({ gigs, removeGig, t }) {
  if (gigs.length === 0) {
    return (
      <div className="text-center py-5">
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
        <p className="fw500 dark-color mb-1">{t("noServicesYet")}</p>
        <p className="text fz14 mb20">
          {t("noServicesHint")}
        </p>
        <Link href="/add-services" className="ud-btn btn-thm bdrs8">
          {t("createFirstGig")} <i className="fal fa-arrow-right-long" />
        </Link>
      </div>
    );
  }

  return (
    <div className="packages_table table-responsive">
      <table className="table-style3 table at-savesearch">
        <thead className="t-head">
          <tr>
            <th scope="col">{t("columnTitle")}</th>
            <th scope="col">{t("columnCategory")}</th>
            <th scope="col">{t("columnTypeCost")}</th>
            <th scope="col">{t("columnActions")}</th>
          </tr>
        </thead>
        <tbody className="t-body">
          {gigs.map((item, i) => (
            <ManageServiceCard1 key={item._id || i} data={item} removeGig={removeGig} />
          ))}
        </tbody>
      </table>
      <div className="mt20 mb10">
        <Link
          href="/add-services"
          className="flex items-center gap-2 fz14 fw500"
          style={{ color: "#ef2b70", textDecoration: "none" }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>
          {t("addAnotherGig")}
        </Link>
      </div>
      <div className="mt20">
        <Pagination1 />
      </div>
    </div>
  );
}

export default function ManageServiceInfo() {
  const t = useTranslations("manageServices");
  const [selectedTab, setSelectedTab] = useState(0);
  const { gigs, removeGig } = useConvexMyGigs();

  const tabs = [
    t("activeServices"),
    t("pendingServices"),
    t("ongoingServices"),
    t("completedServices"),
    t("canceledServices"),
  ];

  const currentStatus = STATUS_MAP[selectedTab];
  const filteredGigs = Array.isArray(gigs)
    ? gigs.filter((g) => g.status === currentStatus).map((g) => mapGigToCard(g, t))
    : [];

  const tabCounts = Array.isArray(gigs)
    ? Object.fromEntries(
        Object.entries(STATUS_MAP).map(([idx, status]) => [
          idx,
          gigs.filter((g) => g.status === status).length,
        ])
      )
    : {};

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>{t("title")}</h2>
              <p className="text">
                {t("pageDescription")}
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <Link
                href="/add-services"
                className="ud-btn btn-thm default-box-shadow2"
              >
                {t("newGig")}
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
              <div className="navtab-style1">
                <div style={{ marginBottom: "var(--space-5)" }}>
                  <DashboardTabs
                    value={selectedTab}
                    onChange={setSelectedTab}
                    ariaLabel={t("title")}
                    options={tabs.map((label, i) => ({
                      value: i,
                      label,
                      count: Array.isArray(gigs) ? tabCounts[i] ?? 0 : undefined,
                    }))}
                  />
                </div>
                <GigTable gigs={filteredGigs} removeGig={removeGig} t={t} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProposalModal1 />
      <DeleteModal />
    </>
  );
}
