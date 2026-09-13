import CompanyHiringLanding from "@/components/jobs/CompanyHiringLanding";

export const metadata = { title: "Post Company Jobs and Manage Applicants", description: "Learn how invited employers set up a company, publish vacancies and review applications in the Skilllinkup Jobs world.", alternates: { canonical: "/jobs/companies" } };

export default function CompaniesPage() {
  return <CompanyHiringLanding />;
}
