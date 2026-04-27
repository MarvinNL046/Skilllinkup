"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import ProposalCard1 from "../card/ProposalCard1";
import DashboardNavigation from "../header/DashboardNavigation";
import DeleteModal from "../modal/DeleteModal";
import ProposalModal1 from "../modal/ProposalModal1";
import useConvexProfile from "@/hook/useConvexProfile";
import useConvexUser from "@/hook/useConvexUser";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function ProposalInfo() {
  const t = useTranslations("proposals");
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const { profile } = useConvexProfile();

  const bids = useQuery(
    api.marketplace.projects.getMyBids,
    profile?._id ? { freelancerId: profile._id } : "skip"
  );

  const isLoading =
    isAuthenticated &&
    (convexUser === undefined ||
      (convexUser?._id && profile === undefined) ||
      (profile?._id && bids === undefined));
  const noProfile =
    isAuthenticated && convexUser !== undefined && convexUser !== null && profile === null;
  const hasBids = bids && bids.length > 0;

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <DashboardNavigation />
        <div className="dashboard_title_area mb-6">
          <h2>{t("title")}</h2>
          <p className="text-[var(--text-secondary)]">{t("pageDescription")}</p>
        </div>
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="packages_table table-responsive">
              {isAuthenticated && convexUser === undefined ? (
                <div className="flex justify-center py-8">
                  <div
                    role="status"
                    aria-label="Loading"
                    className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
                  />
                </div>
              ) : isAuthenticated && convexUser === null ? (
                <p className="text-center text-[var(--text-secondary)] py-8">
                  {t("settingUpAccount")}
                </p>
              ) : isLoaded && !isAuthenticated ? (
                <p className="text-center text-[var(--text-secondary)] py-12">
                  {t("signInPrompt")}
                </p>
              ) : noProfile ? (
                <p className="text-center text-[var(--text-secondary)] py-12">
                  {t("noProfile")}{" "}
                  <Link href="/onboarding" className="text-primary hover:underline">
                    {t("completeProfile")}
                  </Link>
                </p>
              ) : isLoading ? (
                <div className="text-center py-8">
                  <div
                    role="status"
                    aria-label={t("loading")}
                    className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary mx-auto"
                  />
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    {t("loadingProposals")}
                  </p>
                </div>
              ) : !hasBids ? (
                <p className="text-center text-[var(--text-secondary)] py-8">
                  {t("noProposalsYet")}
                </p>
              ) : (
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">{t("columnProject")}</th>
                      <th scope="col">{t("columnBidAmount")}</th>
                      <th scope="col">{t("columnAction")}</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {bids.map((bid) => (
                      <ProposalCard1 key={bid._id} bid={bid} />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <ProposalModal1 />
      <DeleteModal />
    </>
  );
}
