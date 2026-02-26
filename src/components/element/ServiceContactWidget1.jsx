import Image from "next/image";
import Link from "next/link";

export default function ServiceContactWidget1({ freelancer }) {
  const name = freelancer?.displayName || "Freelancer";
  const avatar = freelancer?.avatarUrl || "/images/team/fl-1.png";
  const rating = freelancer?.ratingAverage ?? null;
  const reviewCount = freelancer?.ratingCount ?? null;
  const location =
    freelancer?.locationCity
      ? `${freelancer.locationCity}${freelancer.locationCountry ? `, ${freelancer.locationCountry}` : ""}`
      : freelancer?.locationCountry || "Remote";
  const hourlyRate = freelancer?.hourlyRate ?? null;
  const jobSuccess = freelancer?.jobSuccessRate ?? null;
  const freelancerId = freelancer?._id || null;

  return (
    <div className="freelancer-style1 service-single mb-0">
      <div className="wrapper d-flex align-items-center">
        <div className="thumb position-relative mb25">
          <Image
            height={90}
            width={90}
            className="rounded-circle mx-auto"
            src={avatar}
            alt={`${name} photo`}
          />
          <span className="online" />
        </div>
        <div className="ml20">
          <h5 className="title mb-1">{name}</h5>
          {freelancer?.tagline && (
            <p className="mb-0">{freelancer.tagline}</p>
          )}
          {rating !== null && (
            <div className="review">
              <p>
                <i className="fas fa-star fz10 review-color pr10" />
                <span className="dark-color">{rating.toFixed(1)}</span>
                {reviewCount !== null && ` (${reviewCount} reviews)`}
              </p>
            </div>
          )}
        </div>
      </div>
      <hr className="opacity-100" />
      <div className="details">
        <div className="fl-meta d-flex align-items-center justify-content-between">
          <a className="meta fw500 text-start">
            Location
            <br />
            <span className="fz14 fw400">{location}</span>
          </a>
          {hourlyRate !== null && (
            <a className="meta fw500 text-start">
              Rate
              <br />
              <span className="fz14 fw400">€{hourlyRate} / hr</span>
            </a>
          )}
          {jobSuccess !== null && (
            <a className="meta fw500 text-start">
              Job Success
              <br />
              <span className="fz14 fw400">{jobSuccess}%</span>
            </a>
          )}
        </div>
      </div>
      <div className="d-grid mt30">
        <Link
          href={freelancerId ? `/freelancers/${freelancerId}` : "/freelancers"}
          className="ud-btn btn-thm-border"
        >
          Contact Me
          <i className="fal fa-arrow-right-long" />
        </Link>
      </div>
    </div>
  );
}
