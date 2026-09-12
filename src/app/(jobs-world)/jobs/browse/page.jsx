import { Suspense } from "react";
import Listing16 from "@/components/section/Listing16";
export const metadata = { title: "Browse company jobs", description: "Find verified company vacancies by role, location and employment type.", alternates: { canonical: "/jobs/browse" } };
export default function BrowseJobsPage() { return <Suspense fallback={<p role="status" className="container py-12">Loading job search…</p>}><Listing16 /></Suspense>; }
