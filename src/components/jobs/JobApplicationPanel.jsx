"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  LoaderCircle,
  Send,
  UploadCloud,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import styles from "./JobApplicationPanel.module.css";

const statusCopy = {
  draft: ["Draft", "Finish your application when you are ready."],
  submitted: ["Application sent", "The company can now review your application."],
  screening: ["In review", "The company is reviewing your experience."],
  interview: ["Interview stage", "You have progressed to the interview stage."],
  offer: ["Offer stage", "The company has moved your application to the offer stage."],
  hired: ["Hired", "Congratulations — this application resulted in a hire."],
  rejected: ["Application closed", "The company continued with another candidate."],
  withdrawn: ["Withdrawn", "You withdrew this application."],
};

const withdrawableStatuses = new Set(["submitted", "screening", "interview", "offer"]);

export default function JobApplicationPanel({ jobId, ownerId }) {
  const pathname = usePathname();
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const [coverLetter, setCoverLetter] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const application = useQuery(
    api.marketplace.jobApplications.getMineForJob,
    isAuthenticated && jobId ? { jobId } : "skip"
  );
  const generateUploadUrl = useMutation(
    api.marketplace.jobApplications.generateResumeUploadUrl
  );
  const submitApplication = useMutation(api.marketplace.jobApplications.submit);
  const withdrawApplication = useMutation(api.marketplace.jobApplications.withdraw);

  const isOwner = Boolean(convexUser?._id && ownerId && convexUser._id === ownerId);
  const characterCount = coverLetter.trim().length;
  const canSubmit = characterCount >= 80 && characterCount <= 5000 && !isSubmitting;
  const loginHref = useMemo(
    () => `/login?redirect_url=${encodeURIComponent(pathname || "/jobs")}`,
    [pathname]
  );

  async function uploadResume() {
    if (!resume) return undefined;
    if (resume.size > 10 * 1024 * 1024) {
      throw new Error("Your CV must be smaller than 10 MB.");
    }
    const allowedTypes = new Set([
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);
    if (!allowedTypes.has(resume.type)) {
      throw new Error("Upload your CV as a PDF, DOC or DOCX file.");
    }

    const uploadUrl = await generateUploadUrl({});
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": resume.type },
      body: resume,
    });
    if (!response.ok) throw new Error("Your CV could not be uploaded.");
    const { storageId } = await response.json();
    return storageId;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit || !jobId) return;
    setIsSubmitting(true);
    try {
      const resumeStorageId = await uploadResume();
      await submitApplication({
        jobId,
        coverLetter: coverLetter.trim(),
        portfolioUrl: portfolioUrl.trim() || undefined,
        resumeStorageId,
      });
      toast.success("Your application has been sent.");
      setCoverLetter("");
      setPortfolioUrl("");
      setResume(null);
    } catch (error) {
      toast.error(error?.message || "Your application could not be sent.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleWithdraw() {
    if (!application?._id) return;
    setIsWithdrawing(true);
    try {
      await withdrawApplication({ applicationId: application._id });
      toast.success("Your application has been withdrawn.");
    } catch (error) {
      toast.error(error?.message || "The application could not be withdrawn.");
    } finally {
      setIsWithdrawing(false);
    }
  }

  if (!isLoaded) {
    return (
      <aside className={styles.panel} aria-label="Loading application options">
        <LoaderCircle className={styles.spinner} aria-hidden="true" />
      </aside>
    );
  }

  if (!isAuthenticated) {
    return (
      <aside className={styles.panel}>
        <span className={styles.icon}><BriefcaseBusiness /></span>
        <div>
          <p className={styles.eyebrow}>Ready to take the next step?</p>
          <h2>Apply with your Skilllinkup profile</h2>
          <p>Sign in to send your application securely and track every next step.</p>
        </div>
        <Link className={styles.primaryButton} href={loginHref}>
          Sign in to apply <ArrowRight size={18} />
        </Link>
      </aside>
    );
  }

  if (isOwner) {
    return (
      <aside className={styles.panel}>
        <span className={styles.icon}><BriefcaseBusiness /></span>
        <div>
          <p className={styles.eyebrow}>Your vacancy</p>
          <h2>Manage applicants from your dashboard</h2>
          <p>Review candidates, update their stage and keep your hiring process organised.</p>
        </div>
        <Link className={styles.secondaryButton} href="/manage-jobs">
          Manage this vacancy <ArrowRight size={18} />
        </Link>
      </aside>
    );
  }

  if (application === undefined) {
    return (
      <aside className={styles.panel} aria-label="Loading your application">
        <LoaderCircle className={styles.spinner} aria-hidden="true" />
      </aside>
    );
  }

  if (application) {
    const [label, description] = statusCopy[application.status] || [application.status, "Your application is being processed."];
    return (
      <aside className={`${styles.panel} ${styles.statusPanel}`}>
        <span className={styles.successIcon}><CheckCircle2 /></span>
        <div>
          <p className={styles.eyebrow}>Your application</p>
          <h2>{label}</h2>
          <p>{description}</p>
          {application.submittedAt ? (
            <small>Submitted {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(application.submittedAt)}</small>
          ) : null}
        </div>
        {withdrawableStatuses.has(application.status) ? (
          <button className={styles.textButton} type="button" onClick={handleWithdraw} disabled={isWithdrawing}>
            {isWithdrawing ? "Withdrawing…" : "Withdraw application"}
          </button>
        ) : null}
      </aside>
    );
  }

  return (
    <aside className={styles.panel}>
      <div>
        <p className={styles.eyebrow}>Apply through Skilllinkup</p>
        <h2>Show why this role fits you</h2>
        <p>Your application stays private between you and the verified company.</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span>Application message</span>
          <textarea
            value={coverLetter}
            onChange={(event) => setCoverLetter(event.target.value)}
            placeholder="Introduce yourself, connect your experience to the role and explain why you are interested."
            minLength={80}
            maxLength={5000}
            rows={7}
            required
          />
          <small className={characterCount >= 80 ? styles.validCount : undefined}>
            {characterCount} / 5,000 · minimum 80 characters
          </small>
        </label>
        <label>
          <span>Portfolio or LinkedIn <em>optional</em></span>
          <input
            type="url"
            inputMode="url"
            value={portfolioUrl}
            onChange={(event) => setPortfolioUrl(event.target.value)}
            placeholder="https://"
          />
        </label>
        <label className={styles.fileField}>
          <UploadCloud size={21} />
          <span>{resume ? resume.name : "Add your CV (PDF, DOC or DOCX)"}</span>
          <small>Optional · maximum 10 MB</small>
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(event) => setResume(event.target.files?.[0] || null)}
          />
        </label>
        <button className={styles.primaryButton} type="submit" disabled={!canSubmit}>
          {isSubmitting ? <LoaderCircle className={styles.spinnerInline} /> : <Send size={18} />}
          {isSubmitting ? "Sending application…" : "Send application"}
        </button>
        <p className={styles.privacy}><FileText size={14} /> Only this company can view your application details.</p>
      </form>
    </aside>
  );
}
