import WorldCard from "@/components/card/WorldCard";

const worlds = [
  {
    icon: "flaticon-web",
    title: "Online Marketplace",
    description: "Find digital freelancers for remote projects — design, development, marketing and more.",
    href: "/online",
    color: "#ef2b70",
  },
  {
    icon: "flaticon-location",
    title: "Local Marketplace",
    description: "Connect with skilled craftsmen in your area for home improvement, repairs and services.",
    href: "/local",
    color: "#1e1541",
  },
  {
    icon: "flaticon-briefcase",
    title: "Jobs",
    description: "Browse job openings or post vacancies to find the right candidates for your team.",
    href: "/jobs",
    color: "#22c55e",
  },
];

export default function HomepageHero() {
  return (
    <section className="hero-home13 at-home20 overflow-hidden pt60 pb40">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb40">
            <h1 className="hero-title animate-up-1 mb15">
              Find the Right Talent, <span style={{ color: "#ef2b70" }}>Anywhere</span>
            </h1>
            <p className="hero-text fz17 animate-up-2">
              Whether you need a remote freelancer, a local craftsman, or your next hire — SkillLinkup connects you.
            </p>
          </div>
        </div>
        <div className="row animate-up-3">
          {worlds.map((w) => (
            <WorldCard key={w.href} {...w} />
          ))}
        </div>
      </div>
    </section>
  );
}
