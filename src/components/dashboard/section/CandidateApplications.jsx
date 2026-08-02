"use client";

import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { ArrowRight, BriefcaseBusiness, Building2, CalendarDays, LoaderCircle, MapPin } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import styles from "./CandidateApplications.module.css";

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

export default function CandidateApplications() {
  const { isAuthenticated } = useConvexUser();
  const applications = useQuery(api.marketplace.jobApplications.listMine, isAuthenticated ? { limit: 50 } : "skip");
  const withdraw = useMutation(api.marketplace.jobApplications.withdraw);

  async function handleWithdraw(id) {
    try {
      await withdraw({ applicationId: id });
      toast.success("Application withdrawn.");
    } catch (error) {
      toast.error(error?.message || "The application could not be withdrawn.");
    }
  }

  return (
    <div className={styles.page}>
      <DashboardNavigation />
      <header className={styles.header}><div><p>Jobs · Candidate workspace</p><h1>My applications</h1><span>Follow every application from first submission to final decision.</span></div><Link href="/jobs/browse">Browse jobs <ArrowRight size={17} /></Link></header>
      {applications === undefined ? <div className={styles.loading}><LoaderCircle /> Loading applications…</div> : applications.length === 0 ? (
        <section className={styles.empty}><i><BriefcaseBusiness /></i><h2>Your next role starts here</h2><p>You have not applied to a vacancy yet. Explore transparent roles from verified companies.</p><Link href="/jobs/browse">Find verified jobs <ArrowRight size={17} /></Link></section>
      ) : (
        <section className={styles.list} aria-label="Your job applications">
          {applications.map(({ application, job }) => (
            <article key={application._id}>
              <div className={styles.companyIcon}><Building2 /></div>
              <div className={styles.details}><span className={styles.status} data-status={application.status}>{labels[application.status] || application.status}</span><h2><Link href={`/jobs/job/${job.slug}`}>{job.title}</Link></h2><p>{job.company || "Company not provided"}</p><div><span><MapPin />{job.workType === "remote" ? "Remote" : job.locationCity || job.workType || "Flexible"}</span><span><CalendarDays />Updated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(application.statusUpdatedAt)}</span></div></div>
              <div className={styles.actions}><Link href={`/jobs/job/${job.slug}`}>View vacancy</Link>{withdrawable.has(application.status) ? <button type="button" onClick={() => handleWithdraw(application._id)}>Withdraw</button> : null}</div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
