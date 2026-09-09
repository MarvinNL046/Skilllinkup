"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ServiceSearchResults({ query }) {
  const results = useQuery(api.marketplace.gigs.search, query.trim() ? { query: query.trim(), locale: "en" } : "skip");
  return <main className="mx-auto w-full max-w-6xl px-5 py-12">
    <Link href="/services" className="text-sm text-[var(--text-secondary)]">All service categories</Link>
    <h1 className="mt-5 text-3xl font-semibold">Find a service</h1>
    <form action="/services" className="my-6 flex gap-3">
      <label className="flex-1"><span className="sr-only">Search services</span><input name="q" defaultValue={query} key={query} maxLength={200} placeholder="What do you need help with?" className="w-full rounded-lg border px-4 py-3" /></label>
      <button className="rounded-lg bg-primary px-5 py-3 text-white" type="submit">Search</button>
    </form>
    {!query.trim() ? <p>Enter a service or skill to start searching.</p> : results === undefined ? <p role="status">Searching services…</p> : <>
      <p className="mb-6 text-[var(--text-secondary)]" role="status">{results.length === 50 ? "Showing the first 50 matches" : `${results.length} services found`} for “{query}”</p>
      {results.length === 0 ? <div className="rounded-xl border p-8"><h2 className="text-lg font-medium">No matching services yet</h2><p className="mt-2">Try another skill or browse the service categories.</p></div> :
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{results.map((gig) => <article key={gig._id} className="flex flex-col rounded-xl border bg-white p-6">
          <p className="text-sm text-[var(--text-secondary)]">{gig.category?.name || "Service"}</p>
          <h2 className="mt-2 text-lg font-semibold"><Link href={`/online/service/${gig.slug}`}>{gig.title}</Link></h2>
          <p className="mt-3 text-sm">{gig.freelancerProfile?.displayName || "Independent professional"}</p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-6"><span>{gig.minPrice != null ? `From ${new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(gig.minPrice)}` : "On request"}</span><Link className="text-primary" href={`/online/service/${gig.slug}`}>View service</Link></div>
        </article>)}</div>}
    </>}
  </main>;
}
