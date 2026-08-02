"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CheckCircle2, Globe2, MapPin, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { flattenLeafMarketplaceCategories } from "@/lib/marketplaceCategories";
import useConvexUser from "@/hook/useConvexUser";
import styles from "./CreateJobInfo.module.css";

const jobTypes = [
  ["full-time", "Full-time"], ["part-time", "Part-time"], ["contract", "Contract"],
  ["freelance", "Freelance"], ["internship", "Internship"],
];

function slugify(value) {
  return `${value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 75)}-${Date.now().toString(36)}`;
}

function Field({ label, hint, children, full = false }) {
  return <label className={full ? styles.full : ""}><span>{label}</span>{hint ? <small>{hint}</small> : null}{children}</label>;
}

export default function CreateJobInfo() {
  const router = useRouter();
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const createJob = useMutation(api.marketplace.jobs.create);
  const categories = useQuery(api.marketplace.categories.list, { locale: "en", serviceType: "digital" });
  const categoryOptions = useMemo(() => categories ? flattenLeafMarketplaceCategories(categories) : [], [categories]);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: "", company: "", categoryId: "", description: "", requiredSkills: "",
    salaryMin: "", salaryMax: "", currency: "EUR", jobType: "full-time",
    experienceLevel: "mid", workType: "remote", locationCity: "", locationCountry: "Netherlands",
    benefits: "Flexible hours, Learning budget", expiresAt: "",
  });
  const set = (name, value) => setForm((current) => ({ ...current, [name]: value }));

  async function submit(event) {
    event.preventDefault();
    if (!form.title.trim() || form.description.trim().length < 80) {
      toast.error("Add a clear title and a description of at least 80 characters.");
      return;
    }
    setBusy(true);
    try {
      const jobId = await createJob({
        title: form.title.trim(),
        slug: slugify(form.title),
        description: form.description.trim(),
        categoryId: form.categoryId || undefined,
        company: form.company.trim() || convexUser?.name || "Verified company",
        requiredSkills: form.requiredSkills.split(",").map((item) => item.trim()).filter(Boolean),
        salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined,
        currency: form.currency,
        jobType: form.jobType,
        experienceLevel: form.experienceLevel,
        workType: form.workType,
        locationCity: form.locationCity.trim() || undefined,
        locationCountry: form.locationCountry.trim() || undefined,
        benefits: form.benefits.split(",").map((item) => item.trim()).filter(Boolean),
        expiresAt: form.expiresAt ? new Date(`${form.expiresAt}T23:59:59`).getTime() : undefined,
        locale: "en",
      });
      toast.success("Your vacancy is live.");
      router.push(`/manage-jobs/${jobId}/applications`);
    } catch (error) {
      toast.error(error?.message || "The vacancy could not be published.");
    } finally { setBusy(false); }
  }

  const completed = [form.title, form.company, form.description, form.jobType, form.workType].filter(Boolean).length;
  return <div className={styles.page}>
    <header className={styles.header}><button type="button" onClick={() => router.back()}><ArrowLeft /> Back</button><div><span>Jobs · Company workspace</span><h1>Publish a verified vacancy</h1><p>Share the role, expectations and compensation clearly. Candidates apply directly inside Skilllinkup.</p></div></header>
    <div className={styles.layout}>
      <form className={styles.form} onSubmit={submit}>
        <section><div className={styles.sectionHead}><i><BriefcaseBusiness /></i><div><h2>Role basics</h2><p>Start with the information candidates scan first.</p></div></div><div className={styles.fields}>
          <Field label="Job title"><input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Senior Product Designer" minLength={8} maxLength={120} required /></Field>
          <Field label="Company"><input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder={convexUser?.name || "Company name"} /></Field>
          <Field label="Category"><select value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}><option value="">Choose a category</option>{categoryOptions.map((item) => <option key={item._id} value={item._id}>{item.label}</option>)}</select></Field>
          <Field label="Employment type"><select value={form.jobType} onChange={(e) => set("jobType", e.target.value)}>{jobTypes.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></Field>
          <Field full label="Role description" hint={`${form.description.length}/10,000`}><textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={9} minLength={80} maxLength={10000} placeholder="Describe the mission, responsibilities, team and what success looks like…" required /></Field>
          <Field full label="Required skills" hint="Comma separated"><input value={form.requiredSkills} onChange={(e) => set("requiredSkills", e.target.value)} placeholder="Product strategy, Figma, Research" /></Field>
        </div></section>
        <section><div className={styles.sectionHead}><i><Globe2 /></i><div><h2>Work setup & compensation</h2><p>Transparent details lead to stronger applications.</p></div></div><div className={styles.fields}>
          <Field label="Work setup"><select value={form.workType} onChange={(e) => set("workType", e.target.value)}><option value="remote">Remote</option><option value="hybrid">Hybrid</option><option value="local">On-site</option></select></Field>
          <Field label="Experience"><select value={form.experienceLevel} onChange={(e) => set("experienceLevel", e.target.value)}><option value="junior">Junior</option><option value="mid">Mid-level</option><option value="senior">Senior</option><option value="lead">Lead</option></select></Field>
          <Field label="City"><input value={form.locationCity} onChange={(e) => set("locationCity", e.target.value)} placeholder="Rotterdam or Remote" /></Field>
          <Field label="Country"><input value={form.locationCountry} onChange={(e) => set("locationCountry", e.target.value)} /></Field>
          <Field label="Salary from"><input type="number" min="0" value={form.salaryMin} onChange={(e) => set("salaryMin", e.target.value)} placeholder="55000" /></Field>
          <Field label="Salary to"><input type="number" min="0" value={form.salaryMax} onChange={(e) => set("salaryMax", e.target.value)} placeholder="75000" /></Field>
          <Field label="Currency"><select value={form.currency} onChange={(e) => set("currency", e.target.value)}><option>EUR</option><option>USD</option><option>GBP</option></select></Field>
          <Field label="Application deadline"><input type="date" value={form.expiresAt} onChange={(e) => set("expiresAt", e.target.value)} /></Field>
          <Field full label="Benefits" hint="Comma separated"><input value={form.benefits} onChange={(e) => set("benefits", e.target.value)} /></Field>
        </div></section>
        <footer><button type="button" className={styles.secondary} onClick={() => router.push("/manage-jobs")}>Save for later</button><button type="submit" disabled={busy || !isLoaded || !isAuthenticated}>{busy ? "Publishing…" : "Publish vacancy"}<ArrowRight /></button></footer>
      </form>
      <aside><div className={styles.progress}><span>Listing readiness</span><strong>{Math.round(completed / 5 * 100)}%</strong><div><i style={{ width: `${completed / 5 * 100}%` }} /></div></div><div className={styles.preview}><span><Sparkles /> Live preview</span><h2>{form.title || "Your vacancy title"}</h2><p className={styles.company}>{form.company || convexUser?.name || "Your company"}</p><div><em><Globe2 />{form.workType}</em><em><MapPin />{form.locationCity || "Flexible location"}</em></div><p>{form.description || "Your role description will appear here as candidates browse verified opportunities."}</p></div><div className={styles.trust}><CheckCircle2 /><div><strong>Private beta publishing</strong><p>No listing fee while the beta is free. Skilllinkup still applies ownership and role checks.</p></div></div></aside>
    </div>
  </div>;
}
