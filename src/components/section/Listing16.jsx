"use client";
import Link from "next/link";
import { Grid2X2, List, Search } from "lucide-react";
import { useJobDiscovery } from "@/hook/useConvexJobs";
import useDiscoveryFilters from "@/hook/useDiscoveryFilters";
import DiscoveryEmptyState from "@/components/marketplace/DiscoveryEmptyState";
import SavedItemButton from "@/components/ui/SavedItemButton";
import { DiscoveryFilterPanel, DiscoverySuggest, DiscoverySelect, DiscoveryNumber, DiscoveryLoadMore } from "@/components/marketplace/DiscoveryControls";

export default function Listing16() {
  const { filters, update, reset } = useDiscoveryFilters();
  const { items: jobs, status, loadMore } = useJobDiscovery(filters);
  const unique = (key) => [...new Set([filters[key], ...jobs.map((job) => job[key])].filter(Boolean))];
  const pricingChange = (key, value) => update({ [key]: value, currency: filters.currency || "EUR" });
  return <main className="container py-10">
    <div className="mb-8"><p className="mb-2 text-sm text-[var(--text-secondary)]">Company jobs · Remote and local</p><h1 className="text-3xl font-semibold">Find your next role</h1><p className="mt-3">Search published vacancies from verified companies.</p></div>
    <form className="mb-8 grid gap-3 rounded-xl border bg-white p-4 sm:grid-cols-[1fr_1fr_auto]" key={filters.q + ":" + filters.location} onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); update({ q: data.get("q"), location: data.get("location") }); }}>
      <label><span className="sr-only">Role, skill or company</span><input className="input w-full" name="q" defaultValue={filters.q || ""} placeholder="Role, skill or company" maxLength={200} /></label>
      <label><span className="sr-only">Location</span><input className="input w-full" name="location" defaultValue={filters.location || ""} placeholder="Remote, city or country" maxLength={120} /></label>
      <button className="btn btn--primary" type="submit"><Search size={16} />Search jobs</button>
    </form>
    <div className="grid items-start gap-7 lg:grid-cols-[260px_minmax(0,1fr)]">
      <DiscoveryFilterPanel reset={reset}>
        <DiscoverySuggest label="Category" value={filters.category} onChange={(category) => update({ category })} options={unique("category")} />
        <DiscoverySelect label="Employment type" value={filters.jobType} onChange={(jobType) => update({ jobType })} options={["full-time", "part-time", "contract", "freelance", "internship"]} />
        <DiscoverySelect label="Experience" value={filters.level} onChange={(level) => update({ level })} options={[["junior", "Junior"], ["mid", "Mid-level"], ["senior", "Senior"], ["lead", "Lead"]]} />
        <DiscoverySelect label="Work model" value={filters.workType} onChange={(workType) => update({ workType })} options={[["remote", "Remote"], ["hybrid", "Hybrid"], ["local", "On-site"]]} />
        <DiscoverySelect label="Salary currency" value={filters.currency} onChange={(currency) => update({ currency, minSalary: "", maxSalary: "", sort: "newest" })} options={["EUR", "USD", "GBP"]} />
        <DiscoveryNumber label={"Minimum salary (" + (filters.currency || "EUR") + ")"} value={filters.minSalary} onChange={(value) => pricingChange("minSalary", value)} />
        <DiscoveryNumber label={"Maximum salary (" + (filters.currency || "EUR") + ")"} value={filters.maxSalary} onChange={(value) => pricingChange("maxSalary", value)} />
      </DiscoveryFilterPanel>
      <section aria-label="Job results" className="min-w-0"><header className="mb-5 flex flex-wrap items-center justify-between gap-3"><p role="status">{status === "LoadingFirstPage" ? "Finding jobs…" : jobs.length + (status === "Exhausted" ? " jobs found" : " matching jobs loaded")}</p><div className="flex items-center gap-3"><label className="text-sm">Sort <select value={filters.sort || "newest"} onChange={(event) => update({ sort: event.target.value, currency: event.target.value === "salary" ? filters.currency || "EUR" : filters.currency })} className="rounded-lg border p-2"><option value="newest">Newest first</option><option value="salary">Highest salary</option></select></label><button type="button" aria-label="Grid view" aria-pressed={filters.view !== "list"} onClick={() => update({ view: "grid" })}><Grid2X2 size={19} /></button><button type="button" aria-label="List view" aria-pressed={filters.view === "list"} onClick={() => update({ view: "list" })}><List size={19} /></button></div></header>
        {status === "LoadingFirstPage" ? <p role="status">Loading published jobs…</p> : jobs.length ? <div className={filters.view === "list" ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>{jobs.map((job) => <article className="flex flex-col rounded-xl border bg-white p-6" key={job.id}><div className="flex items-start justify-between gap-3"><p className="text-sm text-[var(--text-secondary)]">{job.company}</p><SavedItemButton itemType="job" itemId={job.id} title={job.title} href={"/jobs/job/" + job.slug} /></div><h2 className="mt-3 text-xl font-semibold"><Link href={"/jobs/job/" + job.slug}>{job.title}</Link></h2><p className="mt-3 text-sm">{[job.location, job.workType].filter(Boolean).join(" · ")}</p><div className="my-4 flex flex-wrap gap-2">{job.benefits.map((benefit) => <span key={benefit} className="rounded-md bg-slate-50 px-2 py-1 text-sm">{benefit}</span>)}</div><Link className="mt-auto text-primary" href={"/jobs/job/" + job.slug}>View role →</Link></article>)}</div> : status !== "Exhausted" ? <p role="status">Searching the remaining listings…</p> : <DiscoveryEmptyState kind="jobs" filters={filters} reset={reset} />}
        <DiscoveryLoadMore status={status} loadMore={loadMore} />
      </section>
    </div>
  </main>;
}
