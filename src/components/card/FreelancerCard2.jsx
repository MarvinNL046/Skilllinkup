import Image from "next/image";
import Link from "next/link";

export default function FreelancerCard2({ data }) {
  return (
    <>
      <div className="freelancer-style1 text-center bdr1 hover-box-shadow">
        <div className="thumb w90 mb25 mx-auto position-relative rounded-circle">
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
          <div className="review">
            <p>
              <i className="fas fa-star fz10 review-color pr10" />
              <span className="dark-color fw500">{data.rating || "New"}</span>
              {data.reviews > 0 && ` (${data.reviews} reviews)`}
            </p>
          </div>
          {data.tags && data.tags.length > 0 && (
            <div className="skill-tags d-flex align-items-center justify-content-center mb5 flex-wrap gap-1">
              {data.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          )}
          <hr className="opacity-100 mt20 mb15" />
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
              <span className="fz14 fw400">{data.level === "top-rated" ? "Top Rated" : "New"}</span>
            </a>
          </div>
          <div className="d-grid mt15">
            <Link
              href={`/online/freelancer/${data._id || data.id}`}
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
