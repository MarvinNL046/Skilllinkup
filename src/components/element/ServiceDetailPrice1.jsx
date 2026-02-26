"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function ServiceDetailPrice1({ packages = [], gigId }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const { isSignedIn } = useUser();

  // Fall back to static dummy data when no real packages are available yet
  const hasPackages = packages && packages.length > 0;

  const staticPackages = [
    {
      tier: "Basic",
      title: "Basic Package",
      description:
        "I will redesign your current landing page or create one for you (upto 4 sections)",
      price: 50,
      currency: "EUR",
      deliveryDays: 3,
      revisionCount: 2,
      features: [],
    },
    {
      tier: "Standard",
      title: "Standard Package",
      description:
        "I will redesign your current landing page or create one for you (upto 4 sections)",
      price: 29,
      currency: "EUR",
      deliveryDays: 3,
      revisionCount: 2,
      features: [],
    },
    {
      tier: "Premium",
      title: "Premium Package",
      description:
        "I will redesign your current landing page or create one for you (upto 4 sections)",
      price: 250,
      currency: "EUR",
      deliveryDays: 3,
      revisionCount: 2,
      features: [],
    },
  ];

  const displayPackages = hasPackages ? packages : staticPackages;

  // Clamp selectedTab in case the number of packages differs from 3
  const activeIndex = Math.min(selectedTab, displayPackages.length - 1);
  const activePackage = displayPackages[activeIndex];

  const currencySymbol =
    activePackage?.currency === "USD"
      ? "$"
      : activePackage?.currency === "GBP"
      ? "£"
      : "€";

  function handleOrder() {
    if (!hasPackages) {
      // Static dummy — nothing to order yet
      return;
    }

    if (!isSignedIn) {
      // Redirect to login and come back to this page
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "/";
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    // Logged-in user: redirect to orders dashboard (Stripe not set up yet)
    router.push("/dashboard/orders");
  }

  return (
    <div className="price-widget">
      <div className="navtab-style1">
        <nav>
          <div className="nav nav-tabs mb20">
            {displayPackages.map((pkg, i) => (
              <button
                key={pkg._id || i}
                onClick={() => setSelectedTab(i)}
                className={`nav-link fw500 ${activeIndex === i ? "active" : ""}`}
              >
                {pkg.tier || pkg.title}
              </button>
            ))}
          </div>
        </nav>

        <div className="tab-content" id="nav-tabContent">
          <div className="price-content">
            <div className="price">
              {currencySymbol}
              {activePackage?.price}
            </div>
            <div className="h5 mb-2">{activePackage?.title}</div>
            <p className="text fz14">{activePackage?.description}</p>

            <hr className="opacity-100 mb20" />

            <ul className="p-0 mb15 d-sm-flex align-items-center">
              <li className="fz14 fw500 dark-color">
                <i className="flaticon-sandclock fz20 text-thm2 me-2 vam" />
                {activePackage?.deliveryDays} Days Delivery
              </li>
              <li className="fz14 fw500 dark-color ml20 ml0-xs">
                <i className="flaticon-recycle fz20 text-thm2 me-2 vam" />
                {activePackage?.revisionCount != null
                  ? activePackage.revisionCount === 0
                    ? "Unlimited"
                    : activePackage.revisionCount
                  : "Unlimited"}{" "}
                Revisions
              </li>
            </ul>

            {activePackage?.features && activePackage.features.length > 0 && (
              <div className="list-style1">
                <ul>
                  {activePackage.features.map((feature, fi) => (
                    <li key={fi} className="mb15">
                      <i className="far fa-check text-thm3 bgc-thm3-light" />
                      {typeof feature === "string" ? feature : feature?.label || feature?.name || ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="d-grid mt20">
              <button
                className="ud-btn btn-thm"
                onClick={handleOrder}
                disabled={!hasPackages}
                title={!hasPackages ? "No packages configured yet" : undefined}
              >
                Continue ({currencySymbol}
                {activePackage?.price})
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
