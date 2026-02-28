"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const popular = ["Designer", "Developer", "Web", "WordPress", "Marketing", "SEO"];

export default function Hero20() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e?.preventDefault?.();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    router.push(`/online/services${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <section className="hero-home13 at-home20 overflow-hidden">
      <div className="home20-hero-imgs-left d-none d-lg-block">
        <Image
          width={94}
          height={94}
          src="/images/about/home20-hero-1.png"
          alt="Freelancer"
          className="img-1 bounce-y"
        />
        <Image
          width={66}
          height={66}
          src="/images/about/home20-hero-2.png"
          alt="Freelancer"
          className="img-2 bounce-y"
        />
        <Image
          width={68}
          height={67}
          src="/images/about/home20-hero-3.png"
          alt="Freelancer"
          className="img-3 bounce-y"
        />
        <Image
          width={93}
          height={94}
          src="/images/about/home20-hero-4.png"
          alt="Freelancer"
          className="img-4 bounce-y"
        />
      </div>
      <div className="home20-hero-imgs-right d-none d-lg-block">
        <Image
          width={65}
          height={66}
          src="/images/about/home20-hero-5.png"
          alt="Freelancer"
          className="img-1 bounce-y"
        />
        <Image
          width={69}
          height={68}
          src="/images/about/home20-hero-6.png"
          alt="Freelancer"
          className="img-2 bounce-y"
        />
        <Image
          width={94}
          height={94}
          src="/images/about/home20-hero-7.png"
          alt="Freelancer"
          className="img-3 bounce-y"
        />
        <Image
          width={94}
          height={94}
          src="/images/about/home20-hero-8.png"
          alt="Freelancer"
          className="img-4 bounce-y"
        />
      </div>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-7">
            <div className="home20-hero-content text-center">
              <h1 className="animate-up-1 mb25 title">
                Find Freelance Services <br className="d-none d-xl-block" />
                For Your Business
              </h1>
              <p className="text mb30 animate-up-2">
                Work with talented freelancers at competitive prices to get
                the most <br className="d-none d-lg-block" />
                out of your time and budget
              </p>
              <div className="advance-search-tab bgc-white bdr1-dark bdrs60 p10 bdrs4-sm banner-btn position-relative zi9 animate-up-3">
                <form onSubmit={handleSearch} className="row">
                  <div className="col-md-8 col-lg-9">
                    <div className="advance-search-field mb10-sm">
                      <div className="form-search position-relative">
                        <div className="box-search">
                          <span className="icon far fa-magnifying-glass" />
                          <input
                            className="form-control"
                            type="text"
                            name="search"
                            placeholder="What service are you looking for?"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="text-center text-xl-start">
                      <button
                        className="ud-btn btn-thm default-box-shadow2 bdrs60 bdrs4-sm w-100"
                        type="submit"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="d-block d-md-flex justify-content-center mt30 text-center animate-up-4">
                <p className="hero-text fz15 me-2 mb-0">Popular:</p>
                {popular.map((term, i) => (
                  <a
                    key={i}
                    className="text"
                    style={{ marginRight: "5px", cursor: "pointer" }}
                    onClick={() => {
                      setSearch(term);
                      const params = new URLSearchParams({ q: term });
                      router.push(`/online/services?${params}`);
                    }}
                  >
                    {`${term}${i !== popular.length - 1 ? "," : ""} `}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
