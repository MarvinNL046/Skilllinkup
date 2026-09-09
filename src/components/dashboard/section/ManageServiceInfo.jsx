"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import DashboardNavigation from "../header/DashboardNavigation";
import DashboardTabs from "../element/DashboardTabs";
import { useState } from "react";
import ServiceEditor from "./ServiceEditor";
import ManageServiceCard1 from "../card/ManageServiceCard1";
import useConvexMyGigs from "@/hook/useConvexMyGigs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Briefcase } from "lucide-react";

const STATUS_MAP = {
  0: "active",
  1: "draft",
  2: "paused",
  3: "pending",
  4: "rejected",
};

function mapGigToCard(gig, t) {
  return {
    ...gig,
    _id: gig._id,
    id: gig._id,
    img: gig.firstImage?.imageUrl || "/images/listings/g-1.jpg",
    title: gig.title || t("untitledService"),
    category: gig.category?.name || t("uncategorized"),
    cost: gig.minPrice || 0,
    status: gig.status,
    list: [],
  };
}

function GigTable({ gigs, removeGig, onEdit, t }) {
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
    <div className="packages_table table-responsive manage-services-table">
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
            <ManageServiceCard1 key={item._id || i} data={item} removeGig={removeGig} onEdit={() => onEdit(item)} />
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
    </div>
  );
}

export default function ManageServiceInfo() {
  const t = useTranslations("manageServices");
  const [selectedTab, setSelectedTab] = useState(0);
  const { gigs, removeGig, updateGig } = useConvexMyGigs();
  const [editing, setEditing] = useState(null);

  const tabs = [
    t("activeServices"),
    "Drafts",
    "Paused",
    t("pendingServices"),
    "Needs changes",
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
            <h1>{t("title")}</h1>
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
            {gigs === undefined ? <p role="status">Loading your services…</p> : <GigTable gigs={filteredGigs} removeGig={removeGig} onEdit={setEditing} t={t} />}
          </CardContent>
        </Card>
      </div>
      {editing ? <ServiceEditor key={editing._id} gig={editing} updateGig={updateGig} onClose={() => setEditing(null)} /> : null}
    </>
  );
}
