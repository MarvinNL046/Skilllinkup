"use client";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useMutation, usePaginatedQuery } from "convex/react";
import { ArrowLeft, ExternalLink, FileText, LoaderCircle, Mail, UserRound } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import styles from "./EmployerApplications.module.css";
import ContextMessageButton from "@/components/ui/ContextMessageButton";

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
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};
const messageableStatuses = new Set(["screening", "interview", "offer", "hired"]);

export default function EmployerApplications({ jobId }) {
  const { isAuthenticated } = useConvexUser();
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState(null);
  const updatingRef = useRef(false);
  const { results: applications, status: pageStatus, loadMore } = usePaginatedQuery(
    api.marketplace.jobApplications.listForJobPage,
    isAuthenticated && jobId ? { jobId, status: filter === "all" ? undefined : filter } : "skip",
    { initialNumItems: 25 }
  );
  const updateStatus = useMutation(api.marketplace.jobApplications.updateStatus);

  async function changeStatus(application, status) {
    if (!status || updatingRef.current) return;
    updatingRef.current = true;
    setUpdating(application._id);
    try {
      await updateStatus({ applicationId: application._id, status, expectedUpdatedAt: application.updatedAt });
      toast.success(`Application moved to ${statusLabels[status] || status}.`);
    } catch (error) {
      toast.error(error?.message || "The application stage could not be changed.");
    } finally {
      updatingRef.current = false;
      setUpdating(null);
    }
  }

  return (
    <div className={styles.page}>
      <DashboardNavigation />
      <header className={styles.header}><div><Link href="/manage-jobs"><ArrowLeft size={16} /> Back to vacancies</Link><h1>Review applicants</h1><p>Move candidates through a clear, auditable hiring process.</p></div><label>Stage<select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All applicants</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></header>
      {pageStatus === "LoadingFirstPage" ? <div className={styles.loading}><LoaderCircle /> Loading applicants…</div> : applications.length === 0 && pageStatus === "Exhausted" ? <section className={styles.empty}><UserRound /><h2>No applicants in this stage</h2><p>New candidates will appear here as soon as they apply.</p></section> : (
        <section className={styles.list}>
          {applications.map(({ application, candidate, resumeUrl }) => (
            <article key={application._id}>
              <div className={styles.avatar}>{candidate.image ? <Image src={candidate.image} alt="" width={52} height={52} unoptimized /> : <UserRound />}</div>
              <div className={styles.identity}><span data-status={application.status}>{statusLabels[application.status] || application.status}</span><h2>{candidate.name}</h2><a href={`mailto:${candidate.email}`}><Mail size={13} />{candidate.email}</a></div>
              <div className={styles.links}>{application.portfolioUrl ? <a href={application.portfolioUrl} target="_blank" rel="noreferrer"><ExternalLink /> Portfolio</a> : null}{resumeUrl ? <a href={resumeUrl} target="_blank" rel="noreferrer"><FileText /> CV</a> : null}</div>
              <p className={styles.letter}>{application.coverLetter}</p>
              <div className={styles.stage}>
                {messageableStatuses.has(application.status) ? <ContextMessageButton context={{ type: "job_application", applicationId: application._id }} label="Message candidate" /> : null}
                <label>Move to<select value="" disabled={updating !== null || !nextStatuses[application.status]?.length} onChange={(event) => changeStatus(application, event.target.value)}><option value="" disabled>{updating === application._id ? "Updating…" : "Choose stage"}</option>{(nextStatuses[application.status] || []).map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></label>
              </div>
            </article>
          ))}
        </section>
      )}
      {pageStatus !== "LoadingFirstPage" && <div className={styles.pagination}>
        <p role="status">{applications.length} applicants loaded{pageStatus === "Exhausted" ? " · All loaded" : ""}</p>
        {pageStatus !== "Exhausted" && <Button variant="secondary" type="button" disabled={pageStatus !== "CanLoadMore"} onClick={() => loadMore(25)}>{pageStatus === "LoadingMore" ? "Loading…" : "Load more"}</Button>}
      </div>}
    </div>
  );
}
