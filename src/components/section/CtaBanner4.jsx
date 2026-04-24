import { Grid3x3, UserPlus, ShieldCheck } from "lucide-react";

/**
 * "How it works" 3-step grid on /about. Mirrors the NeedSomething2
 * component used on the homepage but with about-page copy.
 */
export default function CtaBanner4() {
  const steps = [
    {
      icon: Grid3x3,
      title: "Compare platforms",
      body: "Browse our reviews of 19+ freelance platforms. Find the one that matches your skills and goals.",
    },
    {
      icon: UserPlus,
      title: "Create your profile",
      body: "Sign up, showcase your portfolio, and list your services. Let clients discover what you can do.",
    },
    {
      icon: ShieldCheck,
      title: "Get paid securely",
      body: "Work with confidence. Our escrow system ensures you get paid for every completed project.",
    },
  ];

  return (
    <section style={{ padding: "var(--space-14) 0" }}>
      <div className="container">
        <div style={{ marginBottom: "var(--space-10)", maxWidth: 640 }}>
          <span className="overline" style={{ color: "var(--primary-600)" }}>
            How it works
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h2)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              margin: "var(--space-2) 0 var(--space-3)",
            }}
          >
            Get started in three simple steps
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--space-5)",
          }}
        >
          {steps.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className="card"
              style={{ padding: "var(--space-7)", position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "var(--space-5)",
                  right: "var(--space-6)",
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-display-sm, 2.25rem)",
                  color: "var(--surface-2)",
                  fontWeight: 500,
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                0{i + 1}
              </div>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "var(--radius-md)",
                  background: "var(--primary-50)",
                  color: "var(--primary-600)",
                  display: "grid",
                  placeItems: "center",
                  marginBottom: "var(--space-5)",
                }}
              >
                <Icon size={24} />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-h4)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  marginBottom: "var(--space-3)",
                }}
              >
                {title}
              </div>
              <p className="body-md" style={{ color: "var(--text-secondary)", margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
