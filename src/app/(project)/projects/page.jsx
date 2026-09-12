import { Suspense } from "react";
import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import ProjectsOverview from "@/components/projects/ProjectsOverview";

export const metadata = {
  title: "Find Freelance Projects",
  description: "Browse online freelance projects, compare budgets and required skills, and submit proposals to clients worldwide.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <><Header20 /><Suspense fallback={<p className="container py-12" role="status">Loading projects…</p>}><ProjectsOverview /></Suspense><Footer14 /></>;
}
