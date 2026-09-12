"use client";
import Link from "next/link";
import { useEffect } from "react";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { servicePriceLabel } from "@/lib/marketplaceDiscovery.mjs";
import { DiscoveryLoadMore } from "@/components/marketplace/DiscoveryControls";
import SavedItemButton from "@/components/ui/SavedItemButton";
export default function ServiceSearchResults({ query = "", location = "", category = "", categoryName = "" }) {
  const { results, status, loadMore } = usePaginatedQuery(api.marketplace.discovery.services, { locale: "en", query: query.trim() || undefined, location: location.trim() || undefined, category: category || undefined }, { initialNumItems: 24 });
  useEffect(() => { if (status === "CanLoadMore" && results.length === 0) loadMore(24); }, [status, results.length, loadMore]);
  return <main className="mx-auto w-full max-w-6xl px-5 py-12">
    <Link href="/services" className="text-sm text-[var(--text-secondary)]">All service categories</Link><h1 className="mt-5 text-3xl font-semibold">{categoryName || "Find a service"}</h1>
    <form action="/services" className="my-6 flex flex-wrap gap-3">{category && <input type="hidden" name="category" value={category} />}<label className="min-w-44 flex-1"><span className="sr-only">Search services</span><input name="q" defaultValue={query} key={query} maxLength={200} placeholder="What do you need help with?" className="w-full rounded-lg border px-4 py-3" /></label><label><span className="sr-only">Professional location</span><input name="location" defaultValue={location} key={location} maxLength={120} placeholder="City or country (optional)" className="w-full rounded-lg border px-4 py-3" /></label><button className="btn btn--primary" type="submit">Search</button></form>
    {status === "LoadingFirstPage" ? <p role="status">Searching services…</p> : <>
      <p className="mb-6 text-[var(--text-secondary)]" role="status">{results.length + (status === "Exhausted" ? " services found" : " matching services loaded")} {query ? "for “" + query + "”" : "in the online marketplace"}</p>
      {results.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{results.map((gig) => <article key={gig._id} className="flex flex-col rounded-xl border bg-white p-6"><div className="flex items-center justify-between gap-3"><p className="text-sm text-[var(--text-secondary)]">{gig.category?.name || "Service"}</p><SavedItemButton itemType="gig" itemId={gig._id} title={gig.title} href={"/online/service/" + gig.slug} /></div><h2 className="mt-2 text-lg font-semibold"><Link href={"/online/service/" + gig.slug}>{gig.title}</Link></h2><p className="mt-3 text-sm">{gig.freelancerProfile.displayName}</p><div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6"><span>{servicePriceLabel(gig)}</span><Link className="text-primary" href={"/online/service/" + gig.slug}>View service</Link></div></article>)}</div> : status === "Exhausted" ? <div className="rounded-xl border p-8"><h2 className="text-lg font-medium">No matching services yet</h2><p className="mt-2">Try another skill or browse the service categories.</p></div> : <p role="status">Searching the remaining services…</p>}
      <DiscoveryLoadMore status={status} loadMore={loadMore} />
    </>}
  </main>;
}
