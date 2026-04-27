import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ResourceCTA() {
  return (
    <section className="pt-16 pb-20 bg-primary/5">
      <div className="container text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Find top freelancers on SkillLinkup
        </h2>
        <p className="text-base text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
          Compare talent, read reviews, and hire with confidence — no hidden fees.
        </p>
        <Button asChild size="lg">
          <Link href="/online">
            Browse Freelancers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
