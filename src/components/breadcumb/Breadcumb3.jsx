/**
 * Simple breadcrumb strip on the SkillLinkup Design System — used on
 * service/gig detail pages where the share/save affordance isn't needed.
 */
export default function Breadcumb3({ path }) {
  return (
    <section
      style={{
        borderBottom: "1px solid var(--border-subtle)",
        background: "var(--bg)",
        padding: "var(--space-6) 0",
      }}
    >
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol
            style={{
              display: "flex",
              gap: "var(--space-2)",
              flexWrap: "wrap",
              alignItems: "center",
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: "var(--text-body-sm)",
              color: "var(--text-secondary)",
            }}
          >
            {path?.map((item, i) => (
              <li
                key={i}
                style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)" }}
              >
                {i > 0 && <span style={{ color: "var(--text-tertiary)" }}>/</span>}
                <span
                  style={
                    i === path.length - 1
                      ? { color: "var(--text-primary)", fontWeight: 500 }
                      : undefined
                  }
                >
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
