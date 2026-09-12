"use client";
import { useId } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { SlidersHorizontal } from "lucide-react";

export function DiscoveryFilterPanel({ children, reset }) {
  const content = <><div className="mb-5 flex items-center justify-between gap-4"><h2 className="text-lg font-semibold">Filters</h2><button type="button" className="text-sm underline" onClick={reset}>Clear filters</button></div><div className="grid gap-5">{children}</div></>;
  return <><aside className="hidden rounded-xl border bg-white p-5 lg:block">{content}</aside><div className="lg:hidden"><Dialog><DialogTrigger asChild><button type="button" className="btn btn--secondary"><SlidersHorizontal size={16} />Filters</button></DialogTrigger><DialogContent className="max-h-[90dvh] overflow-y-auto"><DialogTitle className="sr-only">Search filters</DialogTitle><DialogDescription className="sr-only">Results update as you change filters. Close this dialog to view them.</DialogDescription>{content}</DialogContent></Dialog></div></>;
}
export function DiscoverySelect({ label, value = "", onChange, options }) {
  return <label className="grid gap-2 text-sm font-medium"><span>{label}</span><select className="min-w-0 rounded-lg border bg-white px-3 py-2" value={value} onChange={(event) => onChange(event.target.value)}><option value="">Any</option>{options.map((option) => { const [key, text] = Array.isArray(option) ? option : [option, option.replaceAll("-", " ")]; return <option key={key} value={key}>{text}</option>; })}</select></label>;
}
export function DiscoveryNumber({ label, value = "", onChange }) {
  return <label className="grid gap-2 text-sm font-medium"><span>{label}</span><input type="number" min="0" step="any" value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 rounded-lg border px-3 py-2" /></label>;
}
export function DiscoveryLoadMore({ status, loadMore }) {
  if (status === "Exhausted" || status === "LoadingFirstPage") return null;
  return <div className="mt-7 text-center"><button type="button" className="btn btn--secondary" disabled={status === "LoadingMore"} onClick={() => loadMore(24)}>{status === "LoadingMore" ? "Loading…" : "Load more results"}</button></div>;
}

export function DiscoverySuggest({ label, value = "", onChange, options }) {
  const id = useId();
  return <label className="grid gap-2 text-sm font-medium"><span>{label}</span><input list={id} value={value} onChange={(event) => onChange(event.target.value)} placeholder="Any — type to filter" className="min-w-0 rounded-lg border px-3 py-2" /><datalist id={id}>{options.map((option) => <option key={option} value={option} />)}</datalist></label>;
}
