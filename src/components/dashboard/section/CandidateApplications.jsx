"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, usePaginatedQuery } from "convex/react";
import { ArrowRight, BriefcaseBusiness, Building2, CalendarDays, LoaderCircle, MapPin } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import styles from "./CandidateApplications.module.css";
import ContextMessageButton from "@/components/ui/ContextMessageButton";

const labels = {
  draft: "Draft",
  submitted: "Submitted",
  screening: "In review",
  interview: "Interview",
  offer: "Offer",
  hired: "Hired",
  rejected: "Closed",
  withdrawn: "Withdrawn",
};
const withdrawable = new Set(["submitted", "screening", "interview", "offer"]);
const messageable = new Set(["screening", "interview", "offer", "hired"]);

export default function CandidateApplications() {
  const { isAuthenticated } = useConvexUser();
  const { results: applications, status: pageStatus, loadMore } = usePaginatedQuery(api.marketplace.jobApplications.listMinePage, isAuthenticated ? {} : "skip", { initialNumItems: 25 });
  const withdraw = useMutation(api.marketplace.jobApplications.withdraw);
  const withdrawingRef = useRef(false);
  const [withdrawing, setWithdrawing] = useState(null);

  async function handleWithdraw(application) {
    if (withdrawingRef.current) return;
    withdrawingRef.current = true;
    setWithdrawing(application._id);
    try {
      await withdraw({ applicationId: application._id, expectedUpdatedAt: application.updatedAt });
      toast.success("Application withdrawn.");
    } catch (error) {
      toast.error(error?.message || "The application could not be withdrawn.");
    } finally {
      withdrawingRef.current = false;
      setWithdrawing(null);
    }
  }

  return (
    <div className={styles.page}>
      <DashboardNavigation />
      <header className={styles.header}><div><p>Jobs · Candidate workspace</p><h1>My applications</h1><span>Follow every application from first submission to final decision.</span></div><Button asChild><Link href="/jobs/browse">Browse jobs <ArrowRight size={17} /></Link></Button></header>
      {pageStatus === "LoadingFirstPage" ? <div className={styles.loading}><LoaderCircle /> Loading applications…</div> : applications.length === 0 && pageStatus === "Exhausted" ? (
        <section className={styles.empty}><i><BriefcaseBusiness /></i><h2>Your next role starts here</h2><p>You have not applied to a vacancy yet. Explore transparent roles from verified companies.</p><Button asChild><Link href="/jobs/browse">Find verified jobs <ArrowRight size={17} /></Link></Button></section>
      ) : (
        <section className={styles.list} aria-label="Your job applications">
          {applications.map(({ application, job }) => (
            <article key={application._id}>
              <div className={styles.companyIcon}><Building2 /></div>
              <div className={styles.details}><span className={styles.status} data-status={application.status}>{labels[application.status] || application.status}</span><h2><Link href={`/jobs/job/${job.slug}`}>{job.title}</Link></h2><p>{job.company || "Company not provided"}</p><div><span><MapPin />{job.workType === "remote" ? "Remote" : job.locationCity || job.workType || "Flexible"}</span><span><CalendarDays />Updated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(application.statusUpdatedAt)}</span></div></div>
              <div className={styles.actions}>
                <Button asChild variant="secondary"><Link href={`/jobs/job/${job.slug}`}>View vacancy</Link></Button>
                {messageable.has(application.status) ? <ContextMessageButton context={{ type: "job_application", applicationId: application._id }} label="Message company" /> : null}
                {withdrawable.has(application.status) ? <Button variant="destructive" type="button" disabled={withdrawing !== null} onClick={() => handleWithdraw(application)}>{withdrawing === application._id ? "Withdrawing…" : "Withdraw"}</Button> : null}
              </div>
            </article>
          ))}
        </section>
      )}
      {pageStatus !== "LoadingFirstPage" && <div className={styles.pagination}>
        <p role="status">{applications.length} applications loaded{pageStatus === "Exhausted" ? " · All loaded" : ""}</p>
        {pageStatus !== "Exhausted" && <Button variant="secondary" type="button" disabled={pageStatus !== "CanLoadMore"} onClick={() => loadMore(25)}>{pageStatus === "LoadingMore" ? "Loading…" : "Load more"}</Button>}
      </div>}
    </div>
  );
}
