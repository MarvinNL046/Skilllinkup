"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Grid2X2,
  Heart,
  LayoutList,
  LockKeyhole,
  MapPin,
  Megaphone,
  MessageSquareMore,
  Monitor,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  UsersRound,
} from "lucide-react";
import useConvexProjects from "@/hook/useConvexProjects";
import styles from "./ProjectsOverview.module.css";

const EMPTY_PROJECTS = [];

const categories = [
  { title: "Web Design", count: 72, Icon: Monitor },
  { title: "Marketing", count: 61, Icon: Megaphone },
  { title: "Photography", count: 34, Icon: Camera },
  { title: "Administration", count: 28, Icon: FileText },
  { title: "Coaching", count: 19, Icon: UserRound },
  { title: "Graphic Design", count: 27, Icon: Sparkles },
];

function CheckboxList({ options, selected, onToggle }) {
  return <div className={styles.checkList}>{options.map(([label,count]) => <label key={label}><input type="checkbox" checked={selected.includes(label)} onChange={() => onToggle(label)} /><span>{label}</span><small>{count}</small></label>)}</div>;
}

function FilterGroup({ title, children }) {
  return <section className={styles.filterGroup}><h3>{title}<ChevronDown size={15} /></h3>{children}</section>;
}

function ProjectCard({ project }) {
  const href = project.slug ? `/online/project/${project.slug}` : "/projects";
  return <article className={`${styles.projectCard} ${project.featured ? styles.featuredCard : ""}`}>
    <Link className={`${styles.projectImage} ${styles[project.image]}`} href={href} aria-label={`View ${project.title}`} />
    <div className={styles.projectBody}>
      <div className={styles.badges}>{project.featured ? <span>Featured</span> : null}{project.fresh ? <span>New</span> : null}</div>
      <Link href={href}><h3>{project.title}</h3></Link>
      <div className={styles.company}>{project.company}{project.verified ? <><BadgeCheck size={14} /><small>Email verified</small></> : null}</div>
      <p>{project.copy}</p>
      <div className={styles.tags}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </div>
    <aside className={styles.projectMeta}>
      <button type="button" aria-label={`Save ${project.title}`}><Heart size={18} /></button>
      <strong>{project.budget}</strong>
      <span><MapPin size={13} />{project.location}</span>
      <span><Clock3 size={13} />{project.duration}</span>
      <span><BriefcaseBusiness size={13} />Posted {project.posted}</span>
      <span><UsersRound size={13} />{project.proposals} proposals</span>
      {project.quick ? <em>Quick response</em> : null}
    </aside>
  </article>;
}

export default function ProjectsOverview() {
  const liveProjects = useConvexProjects();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [locationsFilter, setLocationsFilter] = useState([]);
  const [mode, setMode] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState("newest");

  const toggleValue = (setter) => (value) => setter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  const resetFilters = () => { setQuery(""); setLocation("all"); setCategoriesFilter([]); setLocationsFilter([]); setMode("all"); setVerifiedOnly(false); };

  const isLoading = liveProjects === undefined;
  const projects = liveProjects || EMPTY_PROJECTS;
  const categoryOptions = useMemo(() => [...new Set(projects.map((project) => project.category))].map((category) => [category, projects.filter((project) => project.category === category).length]), [projects]);
  const locationOptions = useMemo(() => [...new Set(projects.filter((project) => project.location !== "Online").map((project) => project.location))].map((place) => [place, projects.filter((project) => project.location === place).length]), [projects]);

  const filteredProjects = useMemo(() => {
    const matches = projects.filter((project) => {
    const searchText = `${project.title} ${project.company} ${project.category} ${project.tags.join(" ")}`.toLowerCase();
    return (!query || searchText.includes(query.toLowerCase()))
      && (location === "all" || project.location === location || (location === "online" && project.mode === "online"))
      && (!categoriesFilter.length || categoriesFilter.includes(project.category))
      && (!locationsFilter.length || locationsFilter.includes(project.location))
      && (mode === "all" || project.mode === mode)
      && (!verifiedOnly || project.verified);
    });
    if (sort === "match") return matches.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    if (sort === "budget") return matches.sort((a, b) => Number(b.budget.replace(/\D/g, "")) - Number(a.budget.replace(/\D/g, "")));
    return matches;
  }, [categoriesFilter, location, locationsFilter, mode, projects, query, sort, verifiedOnly]);

  return <main className={styles.page}>
    <section className={styles.hero}><div className={styles.container}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Projects</span></nav>
      <div className={styles.heroTitle}><div><span className={styles.eyebrow}>Live private-beta inventory</span><h1>Find projects that fit you.</h1><p>Every result below comes from a published Skilllinkup project.</p></div><Link className={styles.savedSearch} href="/saved"><Bell size={18} />Saved searches</Link></div>
      <div className={styles.searchBar}><label><Search size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by keyword, skill or role" aria-label="Search projects" /></label><label><MapPin size={20} /><select value={location} onChange={(event) => setLocation(event.target.value)} aria-label="Project location"><option value="all">Location or online</option><option value="online">Online worldwide</option>{locationOptions.map(([city]) => <option key={city}>{city}</option>)}</select></label><button type="button">Search</button></div>
    </div></section>

    <section className={`${styles.container} ${styles.browseLayout}`}>
      <aside className={styles.filters}><header><h2>Filters</h2><button type="button" onClick={resetFilters}>Reset</button></header>
        <FilterGroup title="Category"><CheckboxList options={categoryOptions} selected={categoriesFilter} onToggle={toggleValue(setCategoriesFilter)} /></FilterGroup>
        <FilterGroup title="Location"><CheckboxList options={locationOptions} selected={locationsFilter} onToggle={toggleValue(setLocationsFilter)} /></FilterGroup>
        <FilterGroup title="Online or on-site"><div className={styles.radioList}>{[["all","All projects"],["online","Online"],["local","On-site"]].map(([value,label]) => <label key={value}><input type="radio" name="mode" value={value} checked={mode===value} onChange={() => setMode(value)} />{label}</label>)}</div></FilterGroup>
        <FilterGroup title="Total budget"><div className={styles.rangeFields}><select aria-label="Minimum budget"><option>Min.</option><option>€500</option><option>€1,000</option></select><span>to</span><select aria-label="Maximum budget"><option>Max.</option><option>€2,500</option><option>€5,000+</option></select></div><div className={styles.simpleChecks}>{["Under €500","€500 – €1,000","€1,000 – €2,500","€2,500 – €5,000","€5,000+"].map((label) => <label key={label}><input type="checkbox" />{label}</label>)}</div></FilterGroup>
        <FilterGroup title="Project type"><div className={styles.simpleChecks}>{["Fixed project","Ongoing / long-term"].map((label) => <label key={label}><input type="checkbox" />{label}</label>)}</div></FilterGroup>
        <FilterGroup title="Experience level"><div className={styles.simpleChecks}>{["Starter","Experienced","Expert"].map((label) => <label key={label}><input type="checkbox" />{label}</label>)}</div></FilterGroup>
        <FilterGroup title="Duration"><select className={styles.fullSelect} aria-label="Project duration"><option>Any duration</option><option>Under 1 month</option><option>1–3 months</option><option>3+ months</option></select></FilterGroup>
        <label className={styles.switchRow}><span><strong>Email-verified clients only</strong><small>Show projects from clients with a verified email address.</small></span><input type="checkbox" checked={verifiedOnly} onChange={(event) => setVerifiedOnly(event.target.checked)} /></label>
        <button className={styles.resetButton} type="button" onClick={resetFilters}><RotateCcw size={15} />Reset filters</button>
      </aside>

      <div className={styles.results}>
        <header className={styles.resultsHeader}><h2>{isLoading ? "Loading live projects…" : `${filteredProjects.length} ${filteredProjects.length === 1 ? "project" : "projects"} found`}</h2><div><label>Sort by:<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest first</option><option value="match">Best match</option><option value="budget">Highest budget</option></select></label><button type="button" aria-label="List view"><LayoutList size={18} /></button><button type="button" aria-label="Grid view"><Grid2X2 size={17} /></button></div></header>
        <article className={styles.matchBanner}><span><Star size={21} fill="currentColor" /></span><div><strong>Private beta</strong><p>Live matching uses your selected role, product world and profile skills.</p></div><Link href="/onboarding">Complete your profile<ArrowRight size={15} /></Link></article>
        <div className={styles.projectList}>{isLoading ? <div className={styles.empty}><Search size={30} /><h3>Loading published projects</h3><p>Checking the live marketplace inventory.</p></div> : filteredProjects.length ? filteredProjects.map((project) => <ProjectCard project={project} key={project.id} />) : <div className={styles.empty}><Search size={30} /><h3>No published projects match</h3><p>{projects.length ? "Try removing one or more filters." : "The private beta has no open projects yet. Be the first client to publish one."}</p>{projects.length ? <button type="button" onClick={resetFilters}>Clear filters</button> : <Link href="/create-projects">Post the first project</Link>}</div>}</div>
      </div>
    </section>

    {projects.length > 0 && <section className={`${styles.container} ${styles.categorySection}`}><header className={styles.sectionHeader}><h2>Open project categories</h2><Link href="/services">View all services<ArrowRight size={15} /></Link></header><div>{categoryOptions.slice(0, 6).map(([title, count], index) => { const Icon = categories[index % categories.length].Icon; return <Link href={`/projects?category=${encodeURIComponent(title)}`} key={title}><Icon /><span><strong>{title}</strong><small>{count} {count === 1 ? "project" : "projects"}</small></span></Link>; })}</div></section>}

    <section className={`${styles.container} ${styles.alertCta}`}><span className={styles.alertIcon}><Bell /></span><div><h2>Never miss the right project</h2><p>Get relevant opportunities matched to your skills and preferences in your inbox.</p></div><form action="/register"><input type="email" name="email" placeholder="Your email address" aria-label="Email address" /><button type="submit">Create alert</button></form></section>

    <section className={`${styles.container} ${styles.successSection}`}><div className={styles.centerTitle}><span className={styles.eyebrow}>Practical guidance</span><h2>Win projects with confidence.</h2></div><div className={styles.successGrid}><article><CheckCircle2 /><strong>Complete your profile</strong><p>Show relevant skills, work and availability.</p><Link href="/my-profile">Improve profile<ArrowRight /></Link></article><article><Sparkles /><strong>Respond personally</strong><p>Write clear proposals that address the real brief.</p><Link href="/help">View tips<ArrowRight /></Link></article><article><Star /><strong>Show work and reviews</strong><p>Build trust with strong examples and client feedback.</p><Link href="/reviews">Collect reviews<ArrowRight /></Link></article><article><MessageSquareMore /><strong>Communicate clearly</strong><p>Make expectations and updates easy to follow.</p><Link href="/help">More tips<ArrowRight /></Link></article></div></section>

    <section className={`${styles.container} ${styles.trustStrip}`} aria-label="Skilllinkup guarantees"><article><ShieldCheck /><span><strong>Clear milestones</strong><small>Delivery and approval recorded.</small></span></article><article><UsersRound /><span><strong>Visible client signals</strong><small>Email status is shown without overstating verification.</small></span></article><article><MessageSquareMore /><span><strong>Chat in one place</strong><small>Keep project communication together.</small></span></article><article><LockKeyhole /><span><strong>Your data stays yours</strong><small>Privacy by design.</small></span></article></section>
  </main>;
}
