"use client";

import { useId, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import useConvexCategories from "@/hook/useConvexCategories";
import styles from "./MarketplaceMegaMenu.module.css";

const browseGroups = [
  { title: "Find work", links: [["Freelance projects", "/projects"], ["Company jobs", "/jobs/browse"], ["Local requests", "/local/quote-requests"]] },
  { title: "Find someone", links: [["Online freelancers", "/online/freelancers"], ["Local professionals", "/local/craftsmen"], ["Hire for your company", "/jobs/companies"]] },
  { title: "Plan your next step", links: [["Browse services", "/services"], ["Compare platforms", "/platforms"], ["Help center", "/help"]] },
];

export default function MarketplaceMegaMenu({ label = "Categories", kind = "categories", serviceType }) {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);
  const id = useId();
  const categories = useConvexCategories("en", serviceType);
  const sorted = [...(categories || [])].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  useEffect(() => {
    if (!open) return;
    const dismiss = (event) => { if (!root.current?.contains(event.target)) setOpen(false); };
    const escape = (event) => {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, [open]);

  return <div ref={root} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <Button ref={trigger} variant="ghost" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)}>
      {label}<ChevronDown aria-hidden="true" />
    </Button>
    {open && <nav id={id} aria-label={`${label} menu`} className={styles.panel} onClick={event => { if (event.target.closest("a")) setOpen(false); }}>
      {kind === "categories" ? <>
        <div className={styles.heading}><div><strong>Explore services by category</strong><p>Start with the skill your project needs.</p></div><Link href="/services">Browse all services →</Link></div>
        <div className={styles.categories}>
          {sorted.map(category => <Link key={category._id} href={`/services/${category.slug}`}>{category.name}</Link>)}
        </div>
        {!sorted.length && <p role="status">Categories are loading. You can still browse all services.</p>}
      </> : <div className={styles.groups}>
        {browseGroups.map(group => <section key={group.title}><h2>{group.title}</h2>{group.links.map(([name, href]) => <Link key={href} href={href}>{name}</Link>)}</section>)}
      </div>}
    </nav>}
  </div>;
}
