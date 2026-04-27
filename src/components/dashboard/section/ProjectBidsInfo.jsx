"use client";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "../header/DashboardNavigation";
import BidList from "@/components/element/BidList";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, FolderOpen, Wallet } from "lucide-react";

function PageShell({ children }) {
  return (
    <div className="dashboard__content hover-bgc-color">
      <DashboardNavigation />
      {children}
    </div>
  );
}

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
      <PageShell>
        <Card>
          <CardContent className="p-12 flex justify-center">
            <div
              role="status"
              aria-label="Loading"
              className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
            />
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  if (project === null) {
    return (
      <PageShell>
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-[var(--text-secondary)] mb-4">{t("projectNotFound")}</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/manage-projects">
                <ArrowLeft className="mr-1 h-4 w-4" />
                {t("backToMyProjects")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </PageShell>
    );
  }

  const STATUS_BADGES = {
    open: { variant: "success", label: t("statusOpen") },
    in_progress: { variant: "warning", label: t("statusInProgress") },
    completed: { variant: "info", label: t("statusCompleted") },
    cancelled: { variant: "destructive", label: t("statusCancelled") },
    closed: { variant: "muted", label: t("statusClosed") },
  };

  const status = project?.status ?? "open";
  const statusInfo = STATUS_BADGES[status] ?? { variant: "muted", label: status };
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
    <PageShell>
      <div className="dashboard_title_area mb-6">
        <h2>{t("title")}</h2>
        <p className="text-[var(--text-secondary)]">{t("pageDescription")}</p>
      </div>

      {project === undefined ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div
              role="status"
              aria-label={t("loadingProject")}
              className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary mx-auto"
            />
            <p className="mt-3 text-sm text-[var(--text-secondary)]">{t("loadingProject")}</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-start flex-wrap gap-3 pb-5 mb-5 border-b border-[var(--border-subtle)]">
                <div className="min-w-0">
                  <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
                    {project.categoryName && (
                      <span className="inline-flex items-center gap-1">
                        <FolderOpen className="h-4 w-4 text-primary" />
                        {project.categoryName}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Wallet className="h-4 w-4 text-primary" />
                      {budgetDisplay}
                    </span>
                    <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold">{project.bidCount ?? 0}</div>
                  <p className="text-xs text-[var(--text-secondary)] mb-0">
                    {(project.bidCount ?? 0) !== 1
                      ? t("bidsReceivedPlural")
                      : t("bidsReceived")}
                  </p>
                </div>
              </div>

              <BidList projectId={projectId} isOwner={isOwner} />
            </CardContent>
          </Card>

          <div className="flex gap-3 flex-wrap">
            <Button asChild variant="outline" size="sm">
              <Link href="/manage-projects">
                <ArrowLeft className="mr-1 h-4 w-4" />
                {t("backToMyProjects")}
              </Link>
            </Button>
            {project.slug && (
              <Button asChild variant="ghost" size="sm">
                <Link href={`/project/${project.slug}`} target="_blank">
                  {t("viewPublicPage")}
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </>
      )}
    </PageShell>
  );
}
