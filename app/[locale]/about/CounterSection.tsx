"use client";

import CountUp from "react-countup";

interface Stat {
  icon: string;
  end: number;
  suffix?: string;
  label: string;
}

interface CounterSectionProps {
  stats: Stat[];
}

export default function CounterSection({ stats }: CounterSectionProps) {
  return (
    <section className="our-funfact bgc-dark pt60 pb60">
      <div className="container">
        <div className="row">
          {stats.map((stat, index) => (
            <div key={index} className="col-sm-6 col-xl-3">
              <div className="funfact-style1 d-flex align-items-center mb30-sm">
                <div className="icon flex-shrink-0">
                  <i className={`${stat.icon} fz30 text-thm`} />
                </div>
                <div className="details ms-4">
                  <p className="title mb-0 text-white">
                    <CountUp end={stat.end} duration={2} separator="," />
                    {stat.suffix && (
                      <span className="text-thm">{stat.suffix}</span>
                    )}
                  </p>
                  <p className="mb-0 text-white fz14">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
