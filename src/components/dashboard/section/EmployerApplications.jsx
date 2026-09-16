"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation, usePaginatedQuery } from "convex/react";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  LoaderCircle,
  Mail,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import styles from "./EmployerApplications.module.css";
import ContextMessageButton from "@/components/ui/ContextMessageButton";
import HiringOverview from "./HiringOverview";

const nextStatuses = {
  submitted: ["screening", "rejected"],
  screening: ["interview", "offer", "rejected"],
  interview: ["interview", "offer", "rejected"],
  offer: ["hired", "rejected"],
};

const statusLabels = {
  submitted: "Submitted",
  screening: "In review",
  interview: "Interview",
  offer: "Offer",
  hired: "Hired",
  rejected: "Closed",
  withdrawn: "Withdrawn",
};
const messageableStatuses = new Set([
  "screening",
  "interview",
  "offer",
  "hired",
]);
const stageGuidance = {
  submitted:
    "Review the candidate’s application and any attached CV. Move it to In review to open messaging, or close it if you will not take it further.",
  screening:
    "The candidate sees In review and can message you. Review their experience, ask questions and choose the next stage when you are ready.",
  interview:
    "The candidate sees Interview. Use messaging to agree on a time, format and preparation; changing this status does not schedule an interview.",
  offer:
    "The candidate sees Offer. Discuss the terms and next steps in messages. This status does not mean the candidate has accepted; mark Hired once you have agreed to proceed.",
  hired:
    "The candidate sees Hired. Message them to confirm their start date and onboarding arrangements. No further application stage changes are available here.",
  rejected:
    "The candidate sees Closed. This application is no longer progressing, and you cannot reopen it or start a conversation from this application here.",
  withdrawn:
    "The candidate has withdrawn their application. You cannot change its stage or start a conversation from this application here.",
};

export default function EmployerApplications({ jobId, applicationId }) {
  const { isAuthenticated } = useConvexUser();
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("applications");
  // Sent-invitation and notification links open one application directly.
  const [focusedApplication, setFocusedApplication] = useState(
    applicationId ?? null,
  );
  const [updating, setUpdating] = useState(null);
  const updatingRef = useRef(false);
  const [decision, setDecision] = useState(null);
  const [decisionError, setDecisionError] = useState("");
  const cancelRef = useRef(null);
  const decisionTriggerRef = useRef(null);
  const headingRef = useRef(null);
  const {
    results: applications,
    status: pageStatus,
    loadMore,
  } = usePaginatedQuery(
    api.marketplace.jobApplications.listForJobPage,
    isAuthenticated && jobId && view === "applications"
      ? {
          jobId,
          status: filter === "all" ? undefined : filter,
          ...(focusedApplication ? { applicationId: focusedApplication } : {}),
        }
      : "skip",
    { initialNumItems: 25 },
  );
  const updateStatus = useMutation(
    api.marketplace.jobApplications.updateStatus,
  );

  const reviewedApplication = applications.find(
    ({ application }) => application._id === decision?.application._id,
  )?.application;
  const decisionIsCurrent =
    !!decision &&
    !!reviewedApplication &&
    reviewedApplication.updatedAt === decision.application.updatedAt &&
    nextStatuses[reviewedApplication.status]?.includes(decision.status);

  function closeDecision() {
    if (updatingRef.current) return;
    setDecision(null);
    setDecisionError("");
  }

  function chooseStage(application, candidate, event) {
    const status = event.target.value;
    if (!status || updatingRef.current) return;
    if (["hired", "rejected"].includes(status)) {
      decisionTriggerRef.current = event.currentTarget;
      setDecisionError("");
      setDecision({
        application: { ...application },
        name: candidate.name,
        status,
      });
    } else {
      return changeStatus(application, status);
    }
  }

  async function changeStatus(application, status) {
    if (!status || updatingRef.current) return;
    updatingRef.current = true;
    setDecisionError("");
    setUpdating(application._id);
    try {
      await updateStatus({
        applicationId: application._id,
        status,
        expectedUpdatedAt: application.updatedAt,
      });
      toast.success(`Application moved to ${statusLabels[status] || status}.`);
      setDecision(null);
    } catch (error) {
      const message =
        error?.message ||
        "The application stage could not be changed. Please try again.";
      setDecisionError(message);
      toast.error(message);
    } finally {
      updatingRef.current = false;
      setUpdating(null);
    }
  }

  return (
    <div className={styles.page}>
      <DashboardNavigation />
      <Dialog
        open={decision !== null}
        onOpenChange={(open) => {
          if (!open) closeDecision();
        }}
      >
        <DialogContent
          className="max-w-[calc(100vw-2rem)] sm:max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-lg data-[state=closed]:invisible"
          showCloseButton={updating === null}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            cancelRef.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const trigger = decisionTriggerRef.current;
            if (trigger?.isConnected && !trigger.disabled) trigger.focus();
            else headingRef.current?.focus();
          }}
        >
          <DialogHeader>
            <DialogTitle>
              {decision?.status === "hired"
                ? "Mark this candidate as hired?"
                : "Close this application?"}
            </DialogTitle>
            <DialogDescription>
              {decision?.status === "hired"
                ? `You are marking ${decision.name} as Hired. Confirm only after you and the candidate have agreed to proceed. The candidate will be notified. You cannot change the application stage again here; messaging remains available.`
                : `You are closing ${decision?.name || "this candidate"}’s application. The candidate will see Closed and receive a notification. You cannot reopen the application or start a conversation from it here.`}
            </DialogDescription>
          </DialogHeader>
          {decision && !decisionIsCurrent && (
            <p role="status">
              This application has changed. Cancel and review its latest status
              before making a decision.
            </p>
          )}
          {decisionError && <p role="alert">{decisionError}</p>}
          <DialogFooter className="gap-2">
            <Button
              ref={cancelRef}
              type="button"
              variant="outline"
              disabled={updating !== null}
              onClick={closeDecision}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant={decision?.status === "hired" ? "default" : "destructive"}
              disabled={updating !== null || !decisionIsCurrent}
              onClick={() => {
                if (decisionIsCurrent)
                  return changeStatus(decision.application, decision.status);
              }}
            >
              {updating !== null
                ? "Saving…"
                : decision?.status === "hired"
                  ? "Confirm hired"
                  : "Close application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <header className={styles.header}>
        <div>
          <Link href="/manage-jobs">
            <ArrowLeft size={16} /> Back to vacancies
          </Link>
          <h1 ref={headingRef} tabIndex={-1}>
            Hiring overview
          </h1>
          <p>Follow invitations, interest and applications for this vacancy.</p>
        </div>
        {view === "applications" && (
          <label>
            Application stage
            <select
              value={filter}
              onChange={(event) => {
                setFocusedApplication(null);
                setFilter(event.target.value);
              }}
            >
              <option value="all">All applicants</option>
              {Object.entries(statusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        )}
      </header>
      {isAuthenticated && jobId && (
        <HiringOverview
          jobId={jobId}
          view={view}
          onView={(value) => {
            setFocusedApplication(null);
            setView(value);
          }}
          onApplication={(id) => {
            setFilter("all");
            setFocusedApplication(id);
            setView("applications");
          }}
        />
      )}
      {view === "applications" && (
        <>
          {focusedApplication && (
            <div>
              <p>Showing the selected application for this vacancy.</p>
              <Button
                variant="outline"
                onClick={() => setFocusedApplication(null)}
              >
                Show all applications
              </Button>
            </div>
          )}
          {pageStatus === "LoadingFirstPage" ? (
            <div className={styles.loading}>
              <LoaderCircle /> Loading applicants…
            </div>
          ) : applications.length === 0 && pageStatus === "Exhausted" ? (
            <section className={styles.empty}>
              <UserRound />
              <h2>
                {focusedApplication
                  ? "Application not available"
                  : "No applicants in this stage"}
              </h2>
              <p>
                {focusedApplication
                  ? "This application may have been removed or belong to another vacancy. Show all applications to continue."
                  : "New candidates will appear here as soon as they apply."}
              </p>
            </section>
          ) : (
            <section className={styles.list}>
              {applications.map(({ application, candidate, resumeUrl }) => (
                <article key={application._id}>
                  <div className={styles.avatar}>
                    {candidate.image ? (
                      <Image
                        src={candidate.image}
                        alt=""
                        width={52}
                        height={52}
                        unoptimized
                      />
                    ) : (
                      <UserRound />
                    )}
                  </div>
                  <div className={styles.identity}>
                    <span data-status={application.status}>
                      {statusLabels[application.status] || application.status}
                    </span>
                    <h2>{candidate.name}</h2>
                    {candidate.email && (
                      <a href={`mailto:${candidate.email}`}>
                        <Mail size={13} />
                        {candidate.email}
                      </a>
                    )}
                  </div>
                  <div className={styles.links}>
                    {application.portfolioUrl ? (
                      <a
                        href={application.portfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink /> Portfolio
                      </a>
                    ) : null}
                    {resumeUrl ? (
                      <a href={resumeUrl} download rel="noreferrer">
                        <FileText /> CV
                      </a>
                    ) : null}
                  </div>
                  {application.coverLetter && (
                    <p className={styles.letter}>{application.coverLetter}</p>
                  )}
                  <section
                    className={styles.guidance}
                    aria-label="Application stage guidance"
                  >
                    <h3>Your next step</h3>
                    <p>
                      {stageGuidance[application.status] ||
                        "Review the current application status before choosing your next step."}
                    </p>
                  </section>
                  <div className={styles.stage}>
                    {messageableStatuses.has(application.status) ? (
                      <ContextMessageButton
                        context={{
                          type: "job_application",
                          applicationId: application._id,
                        }}
                        label="Message candidate"
                        size="default"
                      />
                    ) : null}
                    {nextStatuses[application.status]?.length > 0 && (
                      <label>
                        Move to
                        <select
                          aria-describedby={`stage-notice-${application._id}`}
                          value=""
                          disabled={
                            updating !== null ||
                            !nextStatuses[application.status]?.length
                          }
                          onChange={(event) =>
                            chooseStage(application, candidate, event)
                          }
                        >
                          <option value="" disabled>
                            {updating === application._id
                              ? "Updating…"
                              : "Choose stage"}
                          </option>
                          {(nextStatuses[application.status] || []).map(
                            (status) => (
                              <option key={status} value={status}>
                                {statusLabels[status]}
                              </option>
                            ),
                          )}
                        </select>
                      </label>
                    )}
                    {nextStatuses[application.status]?.length > 0 && (
                      <p
                        id={`stage-notice-${application._id}`}
                        className={styles.stageNotice}
                      >
                        Closed and Hired require confirmation. Other stages save
                        immediately. Each saved stage change notifies the
                        candidate.
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </section>
          )}
          {pageStatus !== "LoadingFirstPage" && (
            <div className={styles.pagination}>
              <p role="status">
                {applications.length} applicants loaded
                {pageStatus === "Exhausted" ? " · All loaded" : ""}
              </p>
              {pageStatus !== "Exhausted" && (
                <Button
                  variant="secondary"
                  type="button"
                  disabled={pageStatus !== "CanLoadMore"}
                  onClick={() => loadMore(25)}
                >
                  {pageStatus === "LoadingMore" ? "Loading…" : "Load more"}
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
