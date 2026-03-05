import Link from "next/link";

export default function ResourceCTA() {
  return (
    <section className="pt60 pb80 bgc-thm3">
      <div className="container text-center">
        <h2 className="fz28 fw700 mb15">Find top freelancers on SkillLinkup</h2>
        <p className="fz16 text-muted mb30">
          Compare talent, read reviews, and hire with confidence — no hidden fees.
        </p>
        <Link href="/online" className="ud-btn btn-thm bdrs8 px40 py15 fz16">
          Browse Freelancers
          <i className="fal fa-arrow-right-long ms-2" />
        </Link>
      </div>
    </section>
  );
}
