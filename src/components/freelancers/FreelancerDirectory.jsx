"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Filter,
  Grid2X2,
  Headphones,
  Heart,
  List,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  WalletCards,
  X,
} from "lucide-react";
import useConvexFreelancers from "@/hook/useConvexFreelancers";
import styles from "./FreelancerDirectory.module.css";

const demoProfessionals = [
  { id: "demo-1", name: "Adaeze Okafor", profession: "Social media strategist", title: "I build thoughtful campaigns that turn attention into measurable growth.", rating: 5, reviews: 56, price: 72, location: "London, United Kingdom", tags: ["Strategy", "Content", "Meta Ads"], level: "top-rated", language: "English", isAvailable: true, img: "/images/skilllinkup-home/professional-adaeze-v1.png", featured: true },
  { id: "demo-2", name: "Yuki Tanaka", profession: "Full-stack developer", title: "Scalable web products with clean code, fast interfaces, and reliable delivery.", rating: 4.9, reviews: 38, price: 86, location: "Tokyo, Japan", tags: ["React", "Next.js", "Node.js"], level: "top-rated", language: "English", isAvailable: true, img: "/images/skilllinkup-home/professional-yuki-v1.png" },
  { id: "demo-3", name: "Lucas Ferreira", profession: "Product designer", title: "Human-centred product design from early discovery to a polished design system.", rating: 5, reviews: 46, price: 78, location: "São Paulo, Brazil", tags: ["Figma", "UX/UI", "Research"], level: "top-rated", language: "Portuguese", isAvailable: false, img: "/images/skilllinkup-home/professional-lucas-v1.png" },
  { id: "demo-4", name: "Sarah Johnson", profession: "Brand copywriter", title: "Clear, memorable brand language for websites, campaigns, and product launches.", rating: 4.9, reviews: 29, price: 64, location: "Remote", tags: ["Copywriting", "Brand voice", "SEO"], level: "pro", language: "English", isAvailable: true, img: "/images/skilllinkup-home/professional-sarah-v1.png" },
  { id: "demo-5", name: "Maya Collins", profession: "Business consultant", title: "Practical strategy and positioning for founders ready to reach their next stage.", rating: 4.9, reviews: 31, price: 92, location: "Lisbon, Portugal", tags: ["Strategy", "Growth", "Workshops"], level: "pro", language: "English", isAvailable: true, img: "/images/skilllinkup-home/testimonial-maya-v2.png" },
  { id: "demo-6", name: "Daniel Weber", profession: "Webflow developer", title: "Fast, accessible marketing sites with smooth interactions and a clean handover.", rating: 4.8, reviews: 24, price: 68, location: "Berlin, Germany", tags: ["Webflow", "GSAP", "CMS"], level: "rising", language: "German", isAvailable: false, img: "/images/skilllinkup-home/testimonial-daniel-v2.png" },
  { id: "demo-7", name: "Amara Mensah", profession: "Product marketer", title: "Go-to-market plans that connect strong products with the people who need them.", rating: 5, reviews: 27, price: 74, location: "Accra, Ghana", tags: ["Positioning", "Research", "Launches"], level: "top-rated", language: "English", isAvailable: true, img: "/images/skilllinkup-home/testimonial-amara-v2.png" },
];

const ratingOptions = [5, 4, 3];

function normalizeProfessional(person, index) {
  const isPreview = person.id?.toString().startsWith("demo-") || false;
  return {
    ...person,
    id: person._id || person.id || `professional-${index}`,
    name: person.name || "Skilllinkup professional",
    profession: person.profession || person.skill || "Independent professional",
    title: person.title || "Experienced professional ready to help with your next project.",
    rating: Number(person.rating || 0),
    reviews: Number(person.reviews || 0),
    price: Number(person.price || 0),
    location: person.location || "Remote",
    language: person.language || "English",
    tags: person.tags || [],
    img: person.img || "/images/team/default-avatar.svg",
    isPreview,
    verified: !isPreview && Boolean(person.isVerified),
    profileHref: isPreview ? "/online/freelancer/demo" : `/online/freelancer/${person.slug || person._id || person.id}`,
  };
}

export default function FreelancerDirectory() {
  const convexProfessionals = useConvexFreelancers();
  const [showDevelopmentProfiles, setShowDevelopmentProfiles] = useState(false);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All services");
  const [maxRate, setMaxRate] = useState(150);
  const [minimumRating, setMinimumRating] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [level, setLevel] = useState("All levels");
  const [language, setLanguage] = useState("All languages");
  const [sort, setSort] = useState("best-match");
  const [view, setView] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [saved, setSaved] = useState(() => new Set());

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return undefined;
    if (convexProfessionals?.length === 0) {
      setShowDevelopmentProfiles(true);
      return undefined;
    }
    if (convexProfessionals !== undefined) return undefined;
    const timer = window.setTimeout(() => setShowDevelopmentProfiles(true), 1200);
    return () => window.clearTimeout(timer);
  }, [convexProfessionals]);

  const isLoading = convexProfessionals === undefined && !showDevelopmentProfiles;
  const isDevelopmentPreview = process.env.NODE_ENV === "development" && showDevelopmentProfiles && !convexProfessionals?.length;
  const professionals = useMemo(() => {
    const source = convexProfessionals !== undefined && convexProfessionals.length > 0
      ? convexProfessionals
      : process.env.NODE_ENV === "development" && showDevelopmentProfiles
        ? demoProfessionals
        : [];
    return source.map(normalizeProfessional);
  }, [convexProfessionals, showDevelopmentProfiles]);

  const categories = useMemo(() => ["All services", ...new Set(professionals.map((item) => item.profession).filter(Boolean))], [professionals]);
  const languages = useMemo(() => ["All languages", ...new Set(professionals.map((item) => item.language).filter(Boolean))], [professionals]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const place = location.trim().toLowerCase();
    const result = professionals.filter((item) => {
      const searchable = `${item.name} ${item.profession} ${item.title} ${item.tags.join(" ")}`.toLowerCase();
      return (!term || searchable.includes(term))
        && (!place || item.location.toLowerCase().includes(place))
        && (category === "All services" || item.profession === category)
        && (!item.price || item.price <= maxRate)
        && (!minimumRating || item.rating >= minimumRating)
        && (!availableOnly || item.isAvailable)
        && (!verifiedOnly || item.verified)
        && (level === "All levels" || item.level === level)
        && (language === "All languages" || item.language === language);
    });

    return result.sort((a, b) => {
      if (sort === "rate-low") return a.price - b.price;
      if (sort === "rate-high") return b.price - a.price;
      if (sort === "most-reviewed") return b.reviews - a.reviews;
      return (Number(Boolean(b.featured)) - Number(Boolean(a.featured))) || (b.rating - a.rating) || (b.reviews - a.reviews);
    });
  }, [professionals, query, location, category, maxRate, minimumRating, availableOnly, verifiedOnly, level, language, sort]);

  const clearFilters = () => {
    setCategory("All services");
    setMaxRate(150);
    setMinimumRating(0);
    setAvailableOnly(false);
    setVerifiedOnly(false);
    setLevel("All levels");
    setLanguage("All languages");
  };

  const toggleSaved = (id) => {
    setSaved((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <main className={styles.page}>
      <section className={styles.intro}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><strong>Freelancers</strong></nav>
          <span className={styles.eyebrow}>Worldwide professional network</span>
          <h1>Find the right freelancer</h1>
          <p>Search verified professionals for remote projects or expertise near you.</p>

          <form className={styles.searchBar} onSubmit={(event) => event.preventDefault()}>
            <label><Search size={19} /><span className="sr-only">Search expertise</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What expertise do you need?" /></label>
            <label><MapPin size={19} /><span className="sr-only">Location</span><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City, country or remote" /></label>
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      <section className={styles.resultsSection}>
        <div className={`${styles.container} ${styles.resultsLayout}`}>
          <aside className={`${styles.filters} ${filtersOpen ? styles.filtersOpen : ""}`}>
            <div className={styles.filtersTitle}><div><SlidersHorizontal size={19} /><h2>Filters</h2></div><button type="button" className={styles.mobileFilterClose} onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X size={19} /></button></div>

            <FilterSelect label="Service" value={category} onChange={setCategory} options={categories} />
            <FilterSelect label="Experience level" value={level} onChange={setLevel} options={["All levels", "top-rated", "pro", "rising", "new"]} />
            <FilterSelect label="Language" value={language} onChange={setLanguage} options={languages} />

            <div className={styles.filterGroup}>
              <div className={styles.filterLabel}><span>Hourly rate</span><strong>Up to €{maxRate}</strong></div>
              <input className={styles.range} type="range" min="20" max="150" value={maxRate} onChange={(event) => setMaxRate(Number(event.target.value))} aria-label="Maximum hourly rate" aria-valuetext={`Up to €${maxRate} per hour`} />
              <div className={styles.rangeValues}><span>€20</span><span>€150+</span></div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterHeading}>Minimum rating</span>
              <div className={styles.ratingFilters}>
                {ratingOptions.map((rating) => <button type="button" className={minimumRating === rating ? styles.ratingActive : ""} onClick={() => setMinimumRating(minimumRating === rating ? 0 : rating)} key={rating}><Star size={14} fill="currentColor" />{rating}.0 & up</button>)}
              </div>
            </div>

            <div className={styles.switchRows}>
              <SwitchRow label="Available now" checked={availableOnly} onChange={setAvailableOnly} />
              <SwitchRow label="Verified profiles" checked={verifiedOnly} onChange={setVerifiedOnly} />
            </div>

            <button className={styles.clearButton} type="button" onClick={clearFilters}>Clear all filters</button>
          </aside>

          <div className={styles.resultsMain}>
            <div className={styles.resultsToolbar}>
              <div><button type="button" className={styles.mobileFilterButton} onClick={() => setFiltersOpen(true)}><Filter size={17} />Filters</button><h2>{isLoading ? "Finding professionals…" : `${filtered.length} professionals found`}</h2><p>{isDevelopmentPreview ? "Illustrative development profiles — not live professionals." : "Live profiles matched to your search and filters."}</p></div>
              <div className={styles.toolbarActions}>
                <label className={styles.sortSelect}><span className="sr-only">Sort results</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="best-match">Best match</option><option value="most-reviewed">Most reviewed</option><option value="rate-low">Rate: low to high</option><option value="rate-high">Rate: high to low</option></select><ChevronDown size={15} /></label>
                <div className={styles.viewToggle}><button type="button" className={view === "grid" ? styles.viewActive : ""} onClick={() => setView("grid")} aria-label="Grid view"><Grid2X2 size={17} /></button><button type="button" className={view === "list" ? styles.viewActive : ""} onClick={() => setView("list")} aria-label="List view"><List size={18} /></button></div>
              </div>
            </div>

            {isLoading ? <DirectorySkeleton /> : filtered.length === 0 ? <EmptyResults clearFilters={clearFilters} /> : (
              <div className={`${styles.cardGrid} ${view === "list" ? styles.listView : ""}`}>
                {filtered.map((person) => <ProfessionalCard person={person} saved={saved.has(person.id)} onSave={() => toggleSaved(person.id)} key={person.id} />)}
              </div>
            )}

            {!isLoading && filtered.length > 0 && <nav className={styles.pagination} aria-label="Results pagination"><button type="button" disabled>Previous</button><button type="button" className={styles.currentPage}>1</button><button type="button">2</button><button type="button">3</button><span>…</span><button type="button">Next</button></nav>}
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.trustStrip}`} aria-label="Skilllinkup benefits">
        <TrustItem Icon={ShieldCheck} title="Clear agreements" text="Keep scope and approvals together." />
        <TrustItem Icon={BadgeCheck} title="Verified professionals" text="Clear trust signals on every profile." />
        <TrustItem Icon={Headphones} title="Human support" text="Practical help when you need it." />
      </section>

      <section className={`${styles.container} ${styles.postProject}`}>
        <div><span>Can’t find exactly what you need?</span><h2>Post your project and let the right professionals come to you.</h2><p>Describe the work once and receive relevant proposals from the Skilllinkup network.</p></div>
        <div><Link href="/create-projects">Post a project for free <ArrowRight size={16} /></Link><Link href="/help">Learn how it works</Link></div>
      </section>
    </main>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return <label className={styles.filterGroup}><span className={styles.filterHeading}>{label}</span><span className={styles.selectControl}><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option value={option} key={option}>{option.replaceAll("-", " ")}</option>)}</select><ChevronDown size={15} /></span></label>;
}

function SwitchRow({ label, checked, onChange }) {
  return <label className={styles.switchRow}><span>{label}</span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><i aria-hidden="true" /></label>;
}

function ProfessionalCard({ person, saved, onSave }) {
  return (
    <article className={`${styles.professionalCard} ${person.featured ? styles.featuredCard : ""}`}>
      {person.isPreview ? <span className={styles.featuredBadge}>Example profile</span> : person.featured && <span className={styles.featuredBadge}>Featured</span>}
      <div className={styles.portrait}><Image src={person.img} alt={person.name} fill unoptimized sizes="(max-width: 760px) 100vw, 180px" /></div>
      <div className={styles.cardContent}>
        <div className={styles.cardTop}><div>{person.verified && <span className={styles.verified}><BadgeCheck size={13} />Verified</span>}<h3>{person.name}</h3><span className={styles.profession}>{person.profession}</span></div><button type="button" className={saved ? styles.saved : ""} onClick={onSave} aria-label={saved ? `Remove ${person.name} from saved` : `Save ${person.name}`}><Heart size={20} fill={saved ? "currentColor" : "none"} /></button></div>
        <div className={styles.meta}><span><Star size={13} fill="currentColor" />{person.rating || "New"} <small>({person.reviews})</small></span><span><MapPin size={13} />{person.location}</span>{person.isAvailable && <span className={styles.available}>Available</span>}</div>
        <p className={styles.bio}>{person.title}</p>
        <div className={styles.tags}>{person.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className={styles.cardFooter}><strong>{person.price ? `€${person.price}` : "On request"}<small>{person.price ? "/hour" : ""}</small></strong><Link href={person.profileHref}>View profile <ArrowRight size={15} /></Link></div>
      </div>
    </article>
  );
}

function DirectorySkeleton() {
  return <div className={styles.cardGrid}>{Array.from({ length: 4 }, (_, index) => <div className={styles.skeleton} key={index}><span /><div><i /><i /><i /></div></div>)}</div>;
}

function EmptyResults({ clearFilters }) {
  return <div className={styles.empty}><Search size={30} /><h3>No professionals found</h3><p>Try a broader search or remove some filters.</p><button type="button" onClick={clearFilters}>Clear filters</button></div>;
}

function TrustItem({ Icon, title, text }) {
  return <article><span><Icon size={25} /></span><div><h3>{title}</h3><p>{text}</p></div></article>;
}
