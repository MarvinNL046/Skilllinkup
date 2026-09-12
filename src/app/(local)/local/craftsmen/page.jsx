import { Suspense } from "react";
import Listing14 from "@/components/section/Listing14";
export const metadata = { title: "Find local professionals", description: "Browse local trades and find professionals in your service area.", alternates: { canonical: "/local/craftsmen" } };
export default function CraftsmenPage() { return <Suspense fallback={<p role="status" className="container py-12">Loading local search…</p>}><Listing14 /></Suspense>; }
