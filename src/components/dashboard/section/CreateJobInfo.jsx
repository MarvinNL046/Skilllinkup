"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  Globe2,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { flattenLeafMarketplaceCategories } from "@/lib/marketplaceCategories";
import useConvexUser from "@/hook/useConvexUser";
import {
  EMPTY_JOB_FORM,
  jobDraftKey,
  restoreJobDraft,
} from "@/lib/jobDraft.mjs";
import { Button } from "@/components/ui/button";
import { validatePublishingForm } from "@/lib/publishingValidation.mjs";
import styles from "./CreateJobInfo.module.css";

const jobTypes = [
  ["full-time", "Full-time"],
  ["part-time", "Part-time"],
  ["contract", "Contract"],
  ["freelance", "Freelance"],
  ["internship", "Internship"],
];

function slugify(value) {
  return `${value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 75)}-${Date.now().toString(36)}`;
}

function Field({ label, hint, children, full = false }) {
  return (
    <label className={full ? styles.full : ""}>
      <span>{label}</span>
      {hint ? <small>{hint}</small> : null}
      {children}
    </label>
  );
}

export default function CreateJobInfo() {
  const router = useRouter();
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const createJob = useMutation(api.marketplace.jobs.create);
  const submitVerification = useMutation(
    api.marketplace.companyVerifications.submit,
  );
  const canLoadVerification = Boolean(
    convexUser?.role === "admin" ||
    (convexUser?.activeRole === "company" &&
      convexUser?.preferredWorld === "jobs"),
  );
  const verificationRequest = useQuery(
    api.marketplace.companyVerifications.getMine,
    canLoadVerification && convexUser?.role !== "admin" ? {} : "skip",
  );
  const categories = useQuery(api.marketplace.categories.list, {
    locale: "en",
    serviceType: "digital",
  });
  const categoryOptions = useMemo(
    () => (categories ? flattenLeafMarketplaceCategories(categories) : []),
    [categories],
  );
  const [busy, setBusy] = useState(false);
  const publishing = useRef(false);
  const [submitError, setSubmitError] = useState("");
  const [verificationBusy, setVerificationBusy] = useState(false);
  const [verification, setVerification] = useState({
    companyName: "",
    website: "",
    registrationNumber: "",
    country: "Netherlands",
    evidence: "",
  });
  const [form, setForm] = useState(EMPTY_JOB_FORM);
  const draftKey = jobDraftKey(convexUser?._id);
  const [draftReady, setDraftReady] = useState(false);
  const [draftRestored, setDraftRestored] = useState(false);
  useEffect(() => {
    setForm(EMPTY_JOB_FORM);
    setDraftReady(false);
    setDraftRestored(false);
    if (!draftKey) return;
    try {
      const draft = restoreJobDraft(localStorage.getItem(draftKey));
      if (draft) {
        setForm(draft);
        setDraftRestored(true);
      }
    } catch {
      /* The form remains usable if browser storage is unavailable. */
    }
    setDraftReady(true);
  }, [draftKey]);
  function saveForLater() {
    if (!draftKey || busy) return;
    try {
      localStorage.setItem(draftKey, JSON.stringify({ version: 1, form }));
      toast.success("Vacancy draft saved on this device.");
      router.push("/manage-jobs");
    } catch {
      toast.error(
        "Your browser could not save this draft. Keep this page open to preserve your work.",
      );
    }
  }
  const set = (name, value) =>
    setForm((current) => ({ ...current, [name]: value }));
  const setVerificationField = (name, value) =>
    setVerification((current) => ({ ...current, [name]: value }));

  async function requestVerification(event) {
    event.preventDefault();
    setVerificationBusy(true);
    try {
      await submitVerification({
        ...verification,
        companyName:
          verification.companyName.trim() || convexUser?.companyName || "",
      });
      toast.success("Your verification request has been submitted.");
    } catch (error) {
      toast.error(
        error?.message || "The verification request could not be submitted.",
      );
    } finally {
      setVerificationBusy(false);
    }
  }

  async function submit(event) {
    event.preventDefault();
    if (publishing.current) return;
    const error = validatePublishingForm(form, "job");
    if (error) { setSubmitError(error); return; }
    publishing.current = true;
    setSubmitError("");
    setBusy(true);
    try {
      const jobId = await createJob({
        title: form.title.trim(),
        slug: slugify(form.title),
        description: form.description.trim(),
        categoryId: form.categoryId || undefined,
        company:
          form.company.trim() || convexUser?.name || "Private-beta company",
        requiredSkills: form.requiredSkills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined,
        currency: form.currency,
        jobType: form.jobType,
        experienceLevel: form.experienceLevel,
        workType: form.workType,
        locationCity: form.locationCity.trim() || undefined,
        locationCountry: form.locationCountry.trim() || undefined,
        benefits: form.benefits
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        expiresAt: form.expiresAt
          ? new Date(`${form.expiresAt}T23:59:59`).getTime()
          : undefined,
        locale: "en",
      });
      toast.success("Your vacancy is live.");
      try {
        localStorage.removeItem(draftKey);
      } catch {
        /* Publication has already succeeded. */
      }
      router.push(`/manage-jobs/${jobId}/applications`);
    } catch (error) {
      setSubmitError(error?.message || "The vacancy could not be published.");
    } finally {
      publishing.current = false;
      setBusy(false);
    }
  }

  const completed = [
    form.title,
    form.company,
    form.description,
    form.jobType,
    form.workType,
  ].filter(Boolean).length;
  const verificationStatus =
    convexUser?.role === "admin"
      ? "verified"
      : verificationRequest?.status ||
        convexUser?.companyVerificationStatus ||
        "unverified";
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Button type="button" variant="ghost" disabled={busy || verificationBusy} onClick={() => router.back()}>
          <ArrowLeft /> Back
        </Button>
        <div>
          <span>Jobs · Company workspace</span>
          <h1>Publish a verified vacancy</h1>
          <p>
            Share the role, expectations and compensation clearly. Candidates
            apply directly inside Skilllinkup.
          </p>
        </div>
      </header>
      {!isLoaded ||
      !convexUser ||
      (convexUser.role !== "admin" &&
        (!canLoadVerification || verificationRequest === undefined)) ? (
        <section className={styles.verificationLoading}>
          <ShieldCheck />
          <div>
            <strong>Checking company verification</strong>
            <p>
              We are confirming whether this workspace may publish vacancies.
            </p>
          </div>
        </section>
      ) : verificationStatus === "pending" ? (
        <section className={styles.verificationState}>
          <i>
            <Clock3 />
          </i>
          <div>
            <span>Verification in review</span>
            <h2>
              We are checking{" "}
              {verificationRequest?.companyName ||
                convexUser?.companyName ||
                "your company"}
            </h2>
            <p>
              Your evidence was submitted on{" "}
              {verificationRequest
                ? new Date(verificationRequest.submittedAt).toLocaleDateString(
                    "en-GB",
                  )
                : "a recent date"}
              . You can prepare your vacancy after approval; publishing stays
              locked until then.
            </p>
          </div>
        </section>
      ) : verificationStatus !== "verified" ? (
        <form
          className={styles.verificationForm}
          onSubmit={requestVerification}
        >
          <div className={styles.verificationIntro}>
            <i>
              <Building2 />
            </i>
            <div>
              <span>Required before publishing</span>
              <h2>Verify the hiring organisation</h2>
              <p>
                We manually check the business identity, website and authority
                to hire. Candidates will only see vacancies from approved
                companies.
              </p>
            </div>
          </div>
          {verificationRequest?.status === "rejected" ? (
            <div className={styles.rejection}>
              <strong>Previous request needs attention</strong>
              <p>{verificationRequest.adminNote}</p>
            </div>
          ) : null}
          <div className={styles.verificationFields}>
            <Field label="Registered company name">
              <input disabled={busy}
                value={verification.companyName}
                onChange={(e) =>
                  setVerificationField("companyName", e.target.value)
                }
                placeholder={convexUser?.companyName || "Skilllinkup B.V."}
                required={!convexUser?.companyName}
              />
            </Field>
            <Field label="Company website">
              <input disabled={busy}
                type="url"
                value={verification.website}
                onChange={(e) =>
                  setVerificationField("website", e.target.value)
                }
                placeholder="https://company.com"
                required
              />
            </Field>
            <Field label="Registration number">
              <input disabled={busy}
                value={verification.registrationNumber}
                onChange={(e) =>
                  setVerificationField("registrationNumber", e.target.value)
                }
                placeholder="Chamber of Commerce / company number"
                minLength={4}
                maxLength={50}
                required
              />
            </Field>
            <Field label="Country">
              <input disabled={busy}
                value={verification.country}
                onChange={(e) =>
                  setVerificationField("country", e.target.value)
                }
                required
              />
            </Field>
            <Field
              full
              label="Proof and hiring context"
              hint="40–2,000 characters"
            >
              <textarea disabled={busy}
                value={verification.evidence}
                onChange={(e) =>
                  setVerificationField("evidence", e.target.value)
                }
                rows={5}
                minLength={40}
                maxLength={2000}
                placeholder="Explain your role at the company, what you are hiring for, and where our team can verify the organisation."
                required
              />
            </Field>
          </div>
          <footer>
            <p>
              <ShieldCheck /> Your evidence is visible only to authorised
              Skilllinkup administrators.
            </p>
            <Button type="submit"  disabled={verificationBusy}>
              {verificationBusy ? "Submitting…" : "Request verification"}
              <ArrowRight />
            </Button>
          </footer>
        </form>
      ) : (
        <div className={styles.layout}>
          <form className={styles.form} onSubmit={submit} aria-busy={busy}>
            {draftRestored ? (
              <p role="status">Your saved vacancy draft has been restored.</p>
            ) : null}
            <section>
              <div className={styles.sectionHead}>
                <i>
                  <BriefcaseBusiness />
                </i>
                <div>
                  <h2>Role basics</h2>
                  <p>Start with the information candidates scan first.</p>
                </div>
              </div>
              <div className={styles.fields}>
                <Field label="Job title">
                  <input disabled={busy}
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    placeholder="Senior Product Designer"
                    minLength={8}
                    maxLength={120}
                    required
                  />
                </Field>
                <Field label="Company">
                  <input disabled={busy}
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    placeholder={convexUser?.name || "Company name"}
                    required
                  />
                </Field>
                <Field label="Category">
                  <select disabled={busy}
                    value={form.categoryId}
                    onChange={(e) => set("categoryId", e.target.value)}
                  >
                    <option value="">Choose a category</option>
                    {categoryOptions.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Employment type">
                  <select disabled={busy}
                    value={form.jobType}
                    onChange={(e) => set("jobType", e.target.value)}
                  >
                    {jobTypes.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field
                  full
                  label="Role description"
                  hint={`${form.description.length}/10,000`}
                >
                  <textarea disabled={busy}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={9}
                    minLength={80}
                    maxLength={10000}
                    placeholder="Describe the mission, responsibilities, team and what success looks like…"
                    required
                  />
                </Field>
                <Field full label="Required skills" hint="Comma separated">
                  <input disabled={busy}
                    value={form.requiredSkills}
                    onChange={(e) => set("requiredSkills", e.target.value)}
                    placeholder="Product strategy, Figma, Research"
                  />
                </Field>
              </div>
            </section>
            <section>
              <div className={styles.sectionHead}>
                <i>
                  <Globe2 />
                </i>
                <div>
                  <h2>Work setup & compensation</h2>
                  <p>Transparent details lead to stronger applications.</p>
                </div>
              </div>
              <div className={styles.fields}>
                <Field label="Work setup">
                  <select disabled={busy}
                    value={form.workType}
                    onChange={(e) => set("workType", e.target.value)}
                  >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="local">On-site</option>
                  </select>
                </Field>
                <Field label="Experience">
                  <select disabled={busy}
                    value={form.experienceLevel}
                    onChange={(e) => set("experienceLevel", e.target.value)}
                  >
                    <option value="junior">Junior</option>
                    <option value="mid">Mid-level</option>
                    <option value="senior">Senior</option>
                    <option value="lead">Lead</option>
                  </select>
                </Field>
                <Field label="City">
                  <input disabled={busy}
                    value={form.locationCity}
                    onChange={(e) => set("locationCity", e.target.value)}
                    placeholder="Rotterdam"
                    required={form.workType !== "remote"}
                  />
                </Field>
                <Field
                  label={
                    form.workType === "remote" ? "Applicant country" : "Country"
                  }
                >
                  <input disabled={busy}
                    value={form.locationCountry}
                    onChange={(e) => set("locationCountry", e.target.value)}
                    required
                  />
                </Field>
                <Field label="Salary from">
                  <input disabled={busy}
                    type="number"
                    min="0"
                    value={form.salaryMin}
                    onChange={(e) => set("salaryMin", e.target.value)}
                    placeholder="55000"
                  />
                </Field>
                <Field label="Salary to">
                  <input disabled={busy}
                    type="number"
                    min="0"
                    value={form.salaryMax}
                    onChange={(e) => set("salaryMax", e.target.value)}
                    placeholder="75000"
                  />
                </Field>
                <Field label="Currency">
                  <select disabled={busy}
                    value={form.currency}
                    onChange={(e) => set("currency", e.target.value)}
                  >
                    <option>EUR</option>
                    <option>USD</option>
                    <option>GBP</option>
                  </select>
                </Field>
                <Field label="Application deadline">
                  <input disabled={busy}
                    type="date"
                    value={form.expiresAt}
                    onChange={(e) => set("expiresAt", e.target.value)}
                  />
                </Field>
                <Field full label="Benefits" hint="Comma separated">
                  <input disabled={busy}
                    value={form.benefits}
                    onChange={(e) => set("benefits", e.target.value)}
                  />
                </Field>
              </div>
            </section>
            <p role="alert" aria-live="polite">{submitError}</p>
            <footer>
              <Button
                type="button"
                variant="outline"
                onClick={saveForLater}
                disabled={busy || !draftReady}
              >
                Save for later
              </Button>
              <Button

                type="submit"
                disabled={busy || !draftReady || !isLoaded || !isAuthenticated}
              >
                {busy ? "Publishing…" : "Publish vacancy"}
                <ArrowRight />
              </Button>
            </footer>
          </form>
          <aside>
            <div className={styles.progress}>
              <span>Listing readiness</span>
              <strong>{Math.round((completed / 5) * 100)}%</strong>
              <div>
                <i style={{ width: `${(completed / 5) * 100}%` }} />
              </div>
            </div>
            <div className={styles.preview}>
              <span>
                Live preview
              </span>
              <h2>{form.title || "Your vacancy title"}</h2>
              <p className={styles.company}>
                {form.company || convexUser?.name || "Your company"}
              </p>
              <div>
                <em>
                  <Globe2 />
                  {form.workType}
                </em>
                <em>
                  <MapPin />
                  {form.locationCity || "Flexible location"}
                </em>
              </div>
              <p>
                {form.description ||
                  "Your role description will appear here as candidates browse verified opportunities."}
              </p>
            </div>
            <div className={styles.trust}>
              <CheckCircle2 />
              <div>
                <strong>Private beta publishing</strong>
                <p>
                  No listing fee while the beta is free. Skilllinkup still
                  applies ownership and role checks.
                </p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
