import Image from "next/image";
import Link from "next/link";

export default function EmployeeCard1({ data }) {
  const profileHref = `/employee-single/${data._id || data.id}`;

  return (
    <>
      <div className="job-list-style1 bdr1 pb-2.5">
        <div className="icon flex items-center mb-5">
          <Image
            height={60}
            width={60}
            className="wa"
            src={data.img}
            alt="icon"
          />
          <h6 className="mb-0 ml-5">
            <Link href={profileHref}>{data.server}</Link>
          </h6>
          <span className="fav-icon flaticon-star" />
        </div>
        <div className="details">
          {data.review > 0 ? (
            <p>
              <i className="fas fa-star text-xs review-color pr-2.5" />
              <span className="dark-color">{data.rating}</span> ({data.review}
              reviews)
            </p>
          ) : (
            <p className="mb-2 body-color text-sm">New on SkillLinkup</p>
          )}
          <p className="list-inline-item mb-3">{data.location}</p>
          {data.jobs > 0 && (
            <p className="list-inline-item mb-3 bdrl1 pl-4">
              Open {data.jobs} Jobs
            </p>
          )}
        </div>
      </div>
    </>
  );
}
