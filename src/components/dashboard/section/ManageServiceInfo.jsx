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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Briefcase } from "lucide-react";

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
      <div className="text-center py-12">
        <Briefcase className="h-10 w-10 text-[var(--text-tertiary)] mx-auto mb-3" />
        <p className="font-medium mb-1">{t("noServicesYet")}</p>
        <p className="text-sm text-[var(--text-secondary)] mb-5">{t("noServicesHint")}</p>
        <Button asChild>
          <Link href="/add-services">
            {t("createFirstGig")}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
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
      <div className="mt-5 mb-3">
        <Link
          href="/add-services"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Plus className="h-4 w-4" />
          {t("addAnotherGig")}
        </Link>
      </div>
      <div className="mt-5">
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
        <DashboardNavigation />
        <div className="dashboard_title_area mb-6">
          <div>
            <h2>{t("title")}</h2>
            <p className="text-[var(--text-secondary)]">{t("pageDescription")}</p>
          </div>
          <Button asChild>
            <Link href="/add-services">
              {t("newGig")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-5">
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
          </CardContent>
        </Card>
      </div>
      <ProposalModal1 />
      <DeleteModal />
    </>
  );
}
