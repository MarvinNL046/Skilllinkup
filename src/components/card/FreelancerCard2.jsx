import Image from "next/image";
import Link from "next/link";

const LEVEL_CONFIG = {
  top_rated: { label: "Top Rated", color: "#1a73e8", textColor: "#fff" },
  pro:       { label: "Pro",       color: "#ef2b70", textColor: "#fff" },
  rising:    { label: "Rising",    color: "#22c55e", textColor: "#fff" },
  new:       { label: "New",       color: "#9ca3af", textColor: "#fff" },
};

export function LevelBadge({ level }) {
  const config = LEVEL_CONFIG[level] || LEVEL_CONFIG.new;
  return (
    <span
      className="badge fz11 fw500 px-2 py-1"
      style={{ backgroundColor: config.color, color: config.textColor, borderRadius: 12 }}
    >
      {config.label}
    </span>
  );
}

export default function FreelancerCard2({ data }) {
  const tags = data.tags || [];
  const visibleTags = tags.slice(0, 3);
  const overflow = tags.length - 3;

  return (
    <>
      <div className="freelancer-style1 bdr1 hover-box-shadow" style={{ textAlign: "center", overflow: "hidden" }}>
        {data.portfolioImg && (
          <div style={{ width: "100%", height: 120, position: "relative", borderRadius: "8px 8px 0 0", overflow: "hidden" }}>
            <Image
              src={data.portfolioImg}
              alt={`${data.name} portfolio`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div className="thumb w90 mb15 mx-auto position-relative rounded-circle" style={{ marginTop: data.portfolioImg ? 16 : 0 }}>
          <Image
            height={90}
            width={90}
            className="rounded-circle mx-auto"
            src={data.img}
            alt="thumb"
          />
          <span className="online" />
        </div>
        <div className="details">
          <h5 className="title mb-1">{data.name}</h5>
          <p className="mb-0">{data.profession}</p>
          {data.isAvailable && (
            <span
              style={{
                display: "inline-block",
                background: "#f0fdf4",
                color: "#166534",
                fontSize: 12,
                padding: "2px 10px",
                borderRadius: 999,
                marginTop: 4,
                marginBottom: 4,
                fontWeight: 500,
              }}
            >
              Available Now
            </span>
          )}
          {data.title && (
            <p
              className="fz13 text-muted mb-0"
              style={{
                lineHeight: 1.4,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginTop: 4,
              }}
            >
              {data.title}
            </p>
          )}
          <div className="review">
            <p>
              <i className="fas fa-star fz10 review-color pr10" />
              <span className="dark-color fw500">{data.rating || "New"}</span>
              {data.reviews > 0 && ` (${data.reviews} reviews)`}
            </p>
          </div>
          {visibleTags.length > 0 && (
            <div className="skill-tags d-flex align-items-center justify-content-center mb5 flex-wrap gap-1">
              {visibleTags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
              {overflow > 0 && (
                <span
                  className="tag"
                  style={{ background: "#f3f4f6", color: "#6b7280" }}
                >
                  +{overflow}
                </span>
              )}
            </div>
          )}
          {(data.totalOrders > 0 || data.completionRate) && (
            <p className="fz13 text-muted mb-0 mt5">
              {data.totalOrders > 0 && <>{data.totalOrders} jobs</>}
              {data.totalOrders > 0 && data.completionRate && " · "}
              {data.completionRate && <>{data.completionRate}% success</>}
            </p>
          )}
          <hr className="opacity-100 mt15 mb15" />
          <div className="fl-meta d-flex align-items-center justify-content-between">
            <a className="meta fw500 text-start">
              Location
              <br />
              <span className="fz14 fw400">{data.location || "Remote"}</span>
            </a>
            <a className="meta fw500 text-start">
              Rate
              <br />
              <span className="fz14 fw400">{data.price ? `€${data.price}/hr` : "On request"}</span>
            </a>
            <a className="meta fw500 text-start">
              Level
              <br />
              <LevelBadge level={data.level} />
            </a>
          </div>
          <div className="d-grid mt15">
            <Link
              href={`/online/freelancer/${data.slug || data._id || data.id}`}
              className="ud-btn btn-light-thm"
            >
              View Profile
              <i className="fal fa-arrow-right-long" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
