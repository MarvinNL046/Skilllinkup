"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LocalHero() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [postcode, setPostcode] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (postcode) params.set("location", postcode);
    router.push(`/local/craftsmen?${params.toString()}`);
  };

  return (
    <section className="hero-home13 at-home20 overflow-hidden pt60 pb40" style={{ background: "linear-gradient(135deg, #1e1541 0%, #2d1f5e 100%)" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb30">
            <h1 className="hero-title text-white mb15">
              Find Trusted Local Craftsmen
            </h1>
            <p className="hero-text text-white-50 fz17">
              From plumbers to painters — get quotes from skilled professionals near you.
            </p>
          </div>
          <div className="col-lg-8">
            <form onSubmit={handleSearch} className="d-flex gap-2 justify-content-center">
              <input
                type="text"
                className="form-control bdrs4"
                placeholder="What do you need? (e.g. plumber, painter)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: 300 }}
              />
              <input
                type="text"
                className="form-control bdrs4"
                placeholder="Postcode or city"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                style={{ maxWidth: 200 }}
              />
              <button type="submit" className="ud-btn btn-thm bdrs4">
                Search <i className="fal fa-search ms-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
