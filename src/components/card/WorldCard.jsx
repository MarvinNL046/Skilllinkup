"use client";

import Link from "next/link";

export default function WorldCard({ icon, title, description, href, count, color }) {
  return (
    <div className="col-sm-6 col-lg-4">
      <Link href={href} className="text-decoration-none">
        <div
          className="listing-style1 bdrs8 p30 position-relative overflow-hidden"
          style={{ minHeight: 220, cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
        >
          <div className="text-center">
            <div
              className="d-inline-flex align-items-center justify-content-center mb15"
              style={{ width: 64, height: 64, borderRadius: "50%", background: color || "#f0f0f0", fontSize: 28 }}
            >
              <i className={icon} style={{ color: "#fff" }} />
            </div>
            <h4 className="list-title mb-2">{title}</h4>
            <p className="body-color fz14 mb10">{description}</p>
            {count !== undefined && (
              <span className="fz13 fw500" style={{ color: color || "#ef2b70" }}>
                {count.toLocaleString()}+ listings
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
