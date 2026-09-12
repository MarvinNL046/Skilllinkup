"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { helpFaqs } from "@/data/helpFaqs";

export default function OurFaqSection1() {
  const [search, setSearch] = useState("");
  const terms = search.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const answers = helpFaqs.filter((item) =>
    terms.every((term) => `${item.q} ${item.a}`.toLowerCase().includes(term))
  );

  return (
    <>
      <section style={{ padding: "var(--space-16) 0 var(--space-12)", background: "var(--surface-1, #fff)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <span className="overline" style={{ color: "var(--primary-600)" }}>Help</span>
            <h1 className="display-lg" style={{ fontWeight: 500, margin: "var(--space-2) 0 var(--space-3)" }}>How can we help you?</h1>
            <p className="body-lg" style={{ color: "var(--text-secondary)", marginBottom: "var(--space-6)" }}>Find answers about the private beta, existing accounts and the public launch waitlist.</p>
            <div role="search" style={{ maxWidth: 520, margin: "0 auto", position: "relative" }}>
              <Search aria-hidden="true" size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)", pointerEvents: "none" }} />
              <input type="search" className="input" aria-label="Search help answers" placeholder="Search help answers" value={search} onChange={(event) => setSearch(event.target.value)} style={{ paddingLeft: 42, width: "100%" }} />
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: "var(--space-12) 0" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)", marginBottom: "var(--space-8)" }}>
            <Link className="btn btn--secondary" href="/online/freelancers">Online freelancers</Link>
            <Link className="btn btn--secondary" href="/local/craftsmen">Local professionals</Link>
            <Link className="btn btn--secondary" href="/jobs/browse">Browse jobs</Link>
            <Link className="btn btn--secondary" href="/dashboard">My dashboard</Link>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500 }}>Common questions</h2>
          <p role="status" style={{ color: "var(--text-secondary)", marginBottom: "var(--space-5)" }}>
            {terms.length ? `${answers.length} ${answers.length === 1 ? "answer" : "answers"} found` : "Start here for the basics of using SkillLinkup."}
          </p>
          {answers.length ? <FaqAccordion key={terms.join(" ")} items={answers} /> : (
            <div className="card" style={{ padding: "var(--space-6)", marginBottom: "var(--space-8)" }}>
              <p>No answers match your search. Try a topic such as payments, quotes or jobs.</p>
              <button type="button" className="btn btn--secondary" onClick={() => setSearch("")}>Clear search</button>
            </div>
          )}
          <div className="card" style={{ padding: "var(--space-6)" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h4)", fontWeight: 500 }}>Still need help?</h2>
            <p style={{ color: "var(--text-secondary)" }}>Tell us what you need help with and include the relevant page or order reference.</p>
            <Link className="btn btn--primary" href="/contact">Contact support</Link>
          </div>
        </div>
      </section>
    </>
  );
}
