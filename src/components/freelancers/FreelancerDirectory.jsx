"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck, Grid2X2, List, MapPin, Search, Star } from "lucide-react";
import { useOnlineDiscovery } from "@/hook/useConvexFreelancers";
import useDiscoveryFilters from "@/hook/useDiscoveryFilters";
import SavedItemButton from "@/components/ui/SavedItemButton";
import DiscoveryEmptyState from "@/components/marketplace/DiscoveryEmptyState";
import { DiscoveryFilterPanel, DiscoverySuggest, DiscoverySelect, DiscoveryNumber, DiscoveryLoadMore } from "@/components/marketplace/DiscoveryControls";
import styles from "./FreelancerDirectory.module.css";

export default function FreelancerDirectory() {
  const { filters, update, reset } = useDiscoveryFilters();
  const { items: professionals, status, loadMore } = useOnlineDiscovery(filters);
  const skills = [...new Set([filters.skill, ...professionals.flatMap((person) => person.tags)].filter(Boolean))].sort();
  const languages = [...new Set([filters.language, ...professionals.flatMap((person) => person.languages || [])].filter(Boolean))].sort();
  const view = filters.view === "list" ? "list" : "grid";
  return <main className={styles.page}>
    <section className={styles.intro}><div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><strong>Freelancers</strong></nav>
      <span className={styles.eyebrow}>Worldwide professional network</span><h1>Find the right freelancer</h1><p>Compare expertise, previous work and availability for your next online project.</p>
      <form className={styles.searchBar} onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); update({ q: data.get("q").trim(), location: data.get("location").trim() }); }}>
        <label><Search size={19} /><span className="sr-only">Search expertise</span><input name="q" defaultValue={filters.q || ""} key={filters.q || ""} maxLength={200} placeholder="What expertise do you need?" /></label>
        <label><MapPin size={19} /><span className="sr-only">Location</span><input name="location" defaultValue={filters.location || ""} key={filters.location || ""} maxLength={120} placeholder="City or country" /></label><Button type="submit">Search <ArrowRight size={17} /></Button>
      </form>
    </div></section>
    <section className={styles.resultsSection}><div className={styles.container}><div className="grid items-start gap-7 lg:grid-cols-[250px_minmax(0,1fr)]">
      <DiscoveryFilterPanel reset={reset}>
        <DiscoverySuggest label="Skill" value={filters.skill} options={skills} onChange={(skill) => update({ skill })} />
        <DiscoverySelect label="Profile level" value={filters.level} options={[["new", "New"], ["rising", "Rising"], ["pro", "Pro"], ["top_rated", "Top rated"]]} onChange={(level) => update({ level })} />
        <DiscoverySuggest label="Language" value={filters.language} options={languages} onChange={(language) => update({ language })} />
        <DiscoveryNumber label="Maximum hourly rate (€)" value={filters.maxRate} onChange={(maxRate) => update({ maxRate })} />
        <DiscoverySelect label="Minimum rating" value={filters.minRating} options={[["3", "3 stars and up"], ["4", "4 stars and up"], ["5", "5 stars"]]} onChange={(minRating) => update({ minRating })} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={filters.available === "1"} onChange={(event) => update({ available: event.target.checked ? "1" : "" })} />Available for work</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={filters.verified === "1"} onChange={(event) => update({ verified: event.target.checked ? "1" : "" })} />Verified profiles</label>
      </DiscoveryFilterPanel>
      <div className="min-w-0"><div className={styles.resultsToolbar}><div><h2 role="status">{status === "LoadingFirstPage" ? "Finding professionals…" : professionals.length + (status === "Exhausted" ? " professionals found" : " matching professionals loaded")}</h2><p>Live profiles matched to your search and filters.</p></div><div className={styles.toolbarActions}>
        <label className={styles.sortSelect}><span className="sr-only">Sort results</span><select value={filters.sort || "rating"} onChange={(event) => update({ sort: event.target.value })}><option value="rating">Highest rating</option><option value="rate">Lowest hourly rate</option><option value="newest">Newest profiles</option></select></label>
        <div className={styles.viewToggle}><button type="button" aria-pressed={view === "grid"} className={view === "grid" ? styles.viewActive : ""} onClick={() => update({ view: "grid" })} aria-label="Grid view"><Grid2X2 size={17} /></button><button type="button" aria-pressed={view === "list"} className={view === "list" ? styles.viewActive : ""} onClick={() => update({ view: "list" })} aria-label="List view"><List size={18} /></button></div>
      </div></div>
      {status === "LoadingFirstPage" ? <p role="status">Loading profiles…</p> : professionals.length ? <div className={styles.cardGrid + (view === "list" ? " " + styles.listView : "")}>
        {professionals.map((person) => <ProfessionalCard person={person} key={person.id} />)}
      </div> : status === "Exhausted" ? <DiscoveryEmptyState kind="freelancers" filters={filters} reset={reset} /> : <p role="status">Searching the remaining profiles…</p>}
      <DiscoveryLoadMore status={status} loadMore={loadMore} />
      </div>
    </div></div></section>
    <section className={styles.container + " " + styles.postProject}><div><span>Can’t find exactly what you need?</span><h2>Describe your project and compare proposals.</h2><p>Agree on scope, delivery and approval together in a private workspace.</p></div><div><Button asChild><Link href="/create-projects">Post a project <ArrowRight size={16} /></Link></Button><Link href="/help">Learn how it works</Link></div></section>
  </main>;
}
function ProfessionalCard({ person }) {
  const href = "/online/freelancer/" + person.slug;
  return <article className={styles.professionalCard}>
    <div className={styles.portrait}><Image src={person.img} alt={person.name} fill sizes="(max-width: 760px) 100vw, 180px" /></div>
    <div className={styles.cardContent}><div className={styles.cardTop}><div>{person.isVerified && <span className={styles.verified}><BadgeCheck size={13} />Verified</span>}<h3><Link href={href}>{person.name}</Link></h3><span className={styles.profession}>{person.profession}</span></div><SavedItemButton itemType="freelancer" itemId={person.id} title={person.name} image={person.img} href={href} /></div>
      <div className={styles.meta}><span><Star size={13} />{person.reviews ? person.rating.toFixed(1) : "New"} <small>({person.reviews} reviews)</small></span><span><MapPin size={13} />{person.location}</span>{person.isAvailable && <span className={styles.available}>Available</span>}</div>
      <p className={styles.bio}>{person.title}</p><div className={styles.tags}>{person.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div><div className={styles.cardFooter}><strong>{person.price != null ? "€" + person.price : "On request"}<small>{person.price != null ? "/hour" : ""}</small></strong><Link href={href}>View profile <ArrowRight size={15} /></Link></div>
    </div>
  </article>;
}
