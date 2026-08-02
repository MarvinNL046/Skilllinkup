import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import ProjectsOverview from "@/components/projects/ProjectsOverview";

export const metadata = {
  title: "Find Freelance Projects",
  description: "Browse verified online and local freelance projects from clients worldwide.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return <><Header20 /><ProjectsOverview /><Footer14 /></>;
}
