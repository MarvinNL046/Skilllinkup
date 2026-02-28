import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import EmptyState from "@/components/ui/EmptyState";

export const metadata = {
  title: "Companies — SkillLinkup",
  description: "Browse companies hiring on SkillLinkup. Find employers looking for talent.",
};

export default function CompaniesPage() {
  return (
    <>
      <Breadcumb1
        title="Companies"
        brief="Discover companies hiring on SkillLinkup and find your next opportunity."
        isBtnActive={false}
      />
      <section className="pt30 pb90">
        <div className="container">
          <EmptyState
            icon="🏢"
            title="Company directory coming soon"
            description="We're building a company directory so you can discover employers on SkillLinkup."
            actionLabel="Browse Jobs"
            actionHref="/jobs/browse"
          />
        </div>
      </section>
    </>
  );
}
