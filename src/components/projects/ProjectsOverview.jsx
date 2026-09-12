"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Clock3, Grid2X2, LayoutList, MapPin, Search, UsersRound } from "lucide-react";
import { useProjectDiscovery } from "@/hook/useConvexProjects";
import useDiscoveryFilters from "@/hook/useDiscoveryFilters";
import SavedItemButton from "@/components/ui/SavedItemButton";
import { DiscoveryFilterPanel, DiscoverySuggest, DiscoverySelect, DiscoveryNumber, DiscoveryLoadMore } from "@/components/marketplace/DiscoveryControls";
import styles from "./ProjectsOverview.module.css";

function ProjectCard({ project }) {
  const href = "/online/project/" + project.slug;
  return <article className={styles.projectCard}><Link className={styles.projectImage} href={href} aria-label={"View " + project.title} style={{ display: "grid", placeItems: "center", background: "#f0f6f4", color: "#238269" }}><BriefcaseBusiness size={34} /></Link><div className={styles.projectBody}><Link href={href}><h3>{project.title}</h3></Link><div className={styles.company}>{project.company}{project.verified ? <><BadgeCheck size={14} /><small>Email verified</small></> : null}</div><p>{project.copy}</p><div className={styles.tags}>{project.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}</div></div><aside className={styles.projectMeta}><SavedItemButton itemType="project" itemId={project.id} title={project.title} href={href} /><strong>{project.budget}</strong><span><MapPin size={13} />{project.location}</span><span><Clock3 size={13} />{project.duration}</span><span><BriefcaseBusiness size={13} />Posted {project.posted}</span><span><UsersRound size={13} />{project.proposals} proposals</span></aside></article>;
}

export default function ProjectsOverview() {
  const { filters, update, reset } = useDiscoveryFilters();
  const { items: projects, status, loadMore } = useProjectDiscovery(filters);
  const categories = [...new Set([filters.category, ...projects.map((project) => project.category)].filter(Boolean))];
  const budgetChange = (key, value) => update({ [key]: value, currency: filters.currency || "EUR" });
  return <main className={styles.page}>
    <section className={styles.hero}><div className={styles.container}><nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Projects</span></nav><div className={styles.heroTitle}><div><span className={styles.eyebrow}>Live private-beta inventory</span><h1>Find projects that fit you.</h1><p>Browse published projects and agree the scope before starting work.</p></div><Link className={styles.savedSearch} href="/saved">Saved projects</Link></div>
      <form className={styles.searchBar} key={filters.q + ":" + filters.location} onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); update({ q: data.get("q"), location: data.get("location") }); }}><label><Search size={20} /><input name="q" defaultValue={filters.q || ""} placeholder="Keyword, skill or client" aria-label="Search projects" maxLength={200} /></label><label><MapPin size={20} /><input name="location" defaultValue={filters.location || ""} placeholder="City, country or online" aria-label="Project location" maxLength={120} /></label><Button type="submit">Search</Button></form>
    </div></section>
    <section className={styles.container + " grid items-start gap-7 pb-14 lg:grid-cols-[260px_minmax(0,1fr)]"}>
      <DiscoveryFilterPanel reset={reset}>
        <DiscoverySuggest label="Category" value={filters.category} onChange={(category) => update({ category })} options={categories} />
        <DiscoverySelect label="Budget currency" value={filters.currency} onChange={(currency) => update({ currency, minBudget: "", maxBudget: "", sort: "newest" })} options={["EUR", "USD", "GBP"]} />
        <DiscoveryNumber label={"Minimum budget (" + (filters.currency || "EUR") + ")"} value={filters.minBudget} onChange={(value) => budgetChange("minBudget", value)} />
        <DiscoveryNumber label={"Maximum budget (" + (filters.currency || "EUR") + ")"} value={filters.maxBudget} onChange={(value) => budgetChange("maxBudget", value)} />
        <DiscoverySelect label="Upcoming deadline" value={filters.deadlineDays} onChange={(deadlineDays) => update({ deadlineDays })} options={[["30", "Within 30 days"], ["90", "Within 90 days"], ["180", "Within 180 days"]]} />
        <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={filters.verified === "1"} onChange={(event) => update({ verified: event.target.checked ? "1" : "" })} />Email-verified clients only</label>
      </DiscoveryFilterPanel>
      <div className={styles.results}><header className={styles.resultsHeader}><h2 role="status">{status === "LoadingFirstPage" ? "Loading projects…" : projects.length + (status === "Exhausted" ? " projects found" : " matching projects loaded")}</h2><div><label>Sort by:<select value={filters.sort || "newest"} onChange={(event) => update({ sort: event.target.value, currency: event.target.value === "budget" ? filters.currency || "EUR" : filters.currency })}><option value="newest">Newest first</option><option value="budget">Highest budget</option></select></label><button type="button" aria-label="List view" aria-pressed={filters.view !== "grid"} onClick={() => update({ view: "list" })}><LayoutList size={18} /></button><button type="button" aria-label="Grid view" aria-pressed={filters.view === "grid"} onClick={() => update({ view: "grid" })}><Grid2X2 size={17} /></button></div></header>
        <div className={filters.view === "grid" ? styles.projectGrid : styles.projectList}>{status === "LoadingFirstPage" ? <p role="status">Loading published projects…</p> : projects.length ? projects.map((project) => <ProjectCard project={project} key={project.id} />) : status !== "Exhausted" ? <p role="status">Searching the remaining projects…</p> : <div className={styles.empty}><Search size={30} /><h3>No published projects match</h3><p>Try a broader search or remove one or more filters.</p><Button type="button" onClick={reset}>Clear filters</Button></div>}</div>
        <DiscoveryLoadMore status={status} loadMore={loadMore} />
      </div>
    </section>
    <section className={styles.container + " mb-12 rounded-xl border bg-white p-7"}><h2 className="text-xl font-semibold">Have a project in mind?</h2><p className="my-3">Describe the work and compare relevant proposals in your client workspace.</p><Button asChild><Link href="/create-projects">Post a project<ArrowRight size={16} /></Link></Button></section>
  </main>;
}
