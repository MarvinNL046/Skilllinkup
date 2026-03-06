"use client";
import Image from "next/image";
import SearchBarWithDropdown from "@/components/ui/SearchBarWithDropdown";

export default function Hero20() {

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
              <div className="advance-search-tab animate-up-3">
                <SearchBarWithDropdown
                  placeholder="What service are you looking for?"
                  className="w-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
