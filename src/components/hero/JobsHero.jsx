"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobsHero() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    router.push(`/jobs/browse?${params.toString()}`);
  };

  return (
    <section className="hero-home13 at-home20 overflow-hidden pt60 pb40" style={{ background: "linear-gradient(135deg, #0f6b3a 0%, #22c55e 100%)" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb30">
            <h1 className="hero-title text-white mb15">
              Find Your Next Opportunity
            </h1>
            <p className="hero-text text-white-50 fz17">
              Browse job openings from top companies or post a vacancy to find the right talent.
            </p>
          </div>
          <div className="col-lg-6">
            <form onSubmit={handleSearch} className="d-flex gap-2 justify-content-center">
              <input
                type="text"
                className="form-control bdrs4"
                placeholder="Job title, skill, or company"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: 400 }}
              />
              <button type="submit" className="ud-btn btn-white bdrs4" style={{ color: "#22c55e" }}>
                Search <i className="fal fa-search ms-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
