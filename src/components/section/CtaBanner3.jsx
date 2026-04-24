import Image from "next/image";
import { BadgeCheck, DollarSign, ShieldCheck } from "lucide-react";

/**
 * "Why SkillLinkup" feature list on the /about page. Rebuilt on the
 * design system — 3-column icon/title/body block on the left, illustrated
 * image on the right.
 */
export default function CtaBanner3() {
  const features = [
    {
      icon: BadgeCheck,
      title: "Proof of quality",
      body: "Check any pro's work samples, client reviews, and identity verification.",
    },
    {
      icon: DollarSign,
      title: "No cost until you hire",
      body: "Interview potential fits for your job, negotiate rates, and only pay for work you approve.",
    },
    {
      icon: ShieldCheck,
      title: "Safe and secure",
      body: "Focus on your work knowing we help protect your data and privacy. We're here with 24/7 support if you need it.",
    },
  ];

  return (
    <section style={{ padding: "var(--space-14) 0" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "var(--space-10)",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h2)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                marginBottom: "var(--space-7)",
              }}
            >
              A whole world of freelance talent at your fingertips
            </h2>
            <div style={{ display: "grid", gap: "var(--space-6)" }}>
              {features.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-4)" }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-md)",
                      background: "var(--primary-50)",
                      color: "var(--primary-600)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "var(--text-h5)",
                        fontWeight: 500,
                        marginBottom: 4,
                      }}
                    >
                      {title}
                    </div>
                    <p className="body-md" style={{ color: "var(--text-secondary)", margin: 0 }}>
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Image
              height={700}
              width={700}
              style={{ width: "100%", height: "auto", borderRadius: "var(--radius-2xl)" }}
              src="/images/about/about-6.png"
              alt="Diverse freelancers collaborating remotely on laptops and screens"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
