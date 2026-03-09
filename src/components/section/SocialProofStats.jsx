"use client";

import CountUp from "react-countup";
import { useTranslations } from "next-intl";

const stats = [
  { end: 500, suffix: "+", labelKey: "freelancers" },
  { end: 1200, suffix: "+", labelKey: "services" },
  { end: 98, suffix: "%", labelKey: "satisfaction" },
  { end: 50, suffix: "+", labelKey: "categoriesLabel" },
];

export default function SocialProofStats() {
  const t = useTranslations("stats");

  return (
    <section className="pt60 pb60">
      <div className="container">
        <div className="row">
          {stats.map((stat, index) => (
            <div key={stat.labelKey} className="col-6 col-md-3">
              <div
                className="text-center py-4"
                style={{
                  borderRight:
                    index < stats.length - 1 ? "1px solid #e8e8e8" : "none",
                }}
              >
                <div
                  className="mb-1"
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: "#ef2b70",
                  }}
                >
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    duration={2.5}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <p
                  className="mb-0"
                  style={{
                    fontSize: "0.95rem",
                    color: "#1e1541",
                    fontWeight: 500,
                  }}
                >
                  {t(stat.labelKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
