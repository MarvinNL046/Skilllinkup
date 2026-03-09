"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "../header/DashboardNavigation";
import BidList from "@/components/element/BidList";
import Link from "next/link";

export default function ProjectBidsInfo({ projectId }) {
  const t = useTranslations("projectBids");
  const { convexUser, isLoaded } = useConvexUser();

  const project = useQuery(
    api.marketplace.projects.getById,
    projectId ? { projectId } : "skip"
  );

  const isOwner = !!(convexUser && project && project.clientId === convexUser._id);

  if (!isLoaded) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12"><DashboardNavigation /></div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center py-5">
              <div className="spinner-border spinner-border-sm text-thm" role="status" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project === null) {
    return (
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12"><DashboardNavigation /></div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
              <p className="text mb10">{t("projectNotFound")}</p>
              <Link href="/manage-projects" className="ud-btn btn-thm-border btn-sm">
                {t("backToMyProjects")} <i className="fal fa-arrow-left ms-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const STATUS_LABELS = {
    open: { label: t("statusOpen"), className: "text-success" },
    in_progress: { label: t("statusInProgress"), className: "text-warning" },
    completed: { label: t("statusCompleted"), className: "text-primary" },
    cancelled: { label: t("statusCancelled"), className: "text-danger" },
    closed: { label: t("statusClosed"), className: "text-secondary" },
  };

  const status = project?.status ?? "open";
  const statusInfo = STATUS_LABELS[status] ?? { label: status, className: "text-secondary" };
  const budgetMin = project?.budgetMin;
  const budgetMax = project?.budgetMax;
  const currency = project?.currency ?? "EUR";
  const budgetDisplay =
    budgetMin != null && budgetMax != null
      ? `${currency} ${budgetMin} - ${budgetMax}`
      : budgetMin != null
      ? `${currency} ${budgetMin}+`
      : t("budgetTBD");

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>{t("title")}</h2>
            <p className="text">
              {t("pageDescription")}
            </p>
          </div>
        </div>
      </div>

      {project === undefined ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center py-5">
              <div className="spinner-border spinner-border-sm text-thm" role="status" />
              <p className="text mt-2 mb-0">{t("loadingProject")}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-12">
            {/* Project summary header */}
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 bdrb1 pb20 mb20">
                <div>
                  <h4 className="title mb5">{project.title}</h4>
                  <p className="text fz14 mb-0">
                    {project.categoryName && (
                      <span className="me-3">
                        <i className="flaticon-menu fz14 vam text-thm2 me-1" />
                        {project.categoryName}
                      </span>
                    )}
                    <span className="me-3">
                      <i className="flaticon-dollar fz14 vam text-thm2 me-1" />
                      {budgetDisplay}
                    </span>
                    <span className={statusInfo.className}>
                      <i className="fas fa-circle fz8 vam me-1" />
                      {statusInfo.label}
                    </span>
                  </p>
                </div>
                <div className="text-end">
                  <span className="fz20 fw600 dark-color">{project.bidCount ?? 0}</span>
                  <p className="text fz13 mb-0">{(project.bidCount ?? 0) !== 1 ? t("bidsReceivedPlural") : t("bidsReceived")}</p>
                </div>
              </div>

              {/* Bid list */}
              <BidList projectId={projectId} isOwner={isOwner} />
            </div>

            {/* Action links */}
            <div className="d-flex gap-3 flex-wrap">
              <Link href="/manage-projects" className="ud-btn btn-thm-border btn-sm">
                <i className="fal fa-arrow-left me-1" />
                {t("backToMyProjects")}
              </Link>
              {project.slug && (
                <Link
                  href={`/project/${project.slug}`}
                  className="ud-btn btn-light-thm btn-sm"
                  target="_blank"
                >
                  {t("viewPublicPage")}
                  <i className="fal fa-external-link ms-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
