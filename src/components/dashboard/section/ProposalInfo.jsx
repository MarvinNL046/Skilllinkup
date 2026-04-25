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

export default function ProposalInfo() {
  const t = useTranslations("proposals");
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const { profile } = useConvexProfile();

  const bids = useQuery(
    api.marketplace.projects.getMyBids,
    profile?._id ? { freelancerId: profile._id } : "skip"
  );

  const isLoading = isAuthenticated && (
    convexUser === undefined ||
    (convexUser?._id && profile === undefined) ||
    (profile?._id && bids === undefined)
  );
  const noProfile = isAuthenticated && convexUser !== undefined && convexUser !== null && profile === null;
  const hasBids = bids && bids.length > 0;

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>{t("title")}</h2>
              <p className="text">{t("pageDescription")}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
              <div className="packages_table table-responsive">
                {isAuthenticated && convexUser === undefined ? (
                  <div className="text-center py-4">
                    <div className="spinner-border spinner-border-sm text-success" role="status" />
                  </div>
                ) : isAuthenticated && convexUser === null ? (
                  <div className="text-center py-4">
                    <p className="text mb-0">{t("settingUpAccount")}</p>
                  </div>
                ) : isLoaded && !isAuthenticated ? (
                  <div className="text-center py-5">
                    <p className="text mb-0">{t("signInPrompt")}</p>
                  </div>
                ) : noProfile ? (
                  <div className="text-center py-5">
                    <p className="text mb-0">
                      {t("noProfile")}{" "}
                      <Link href="/onboarding" className="text-thm">{t("completeProfile")}</Link>
                    </p>
                  </div>
                ) : isLoading ? (
                  <div className="text-center py30">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">{t("loading")}</span>
                    </div>
                    <p className="mt10 fz14 text-muted">{t("loadingProposals")}</p>
                  </div>
                ) : !hasBids ? (
                  <div className="text-center py-4">
                    <p className="text mb-0">{t("noProposalsYet")}</p>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
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
