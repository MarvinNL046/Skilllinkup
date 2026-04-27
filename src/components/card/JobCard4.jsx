import Image from "next/image";
import Link from "next/link";

export default function JobCard4({ data }) {
  return (
    <>
      <div className="job-list-style1 bdr1">
        <div className="icon flex items-center mb-5">
          <Image
            height={60}
            width={60}
            className="wa"
            src={data.img}
            alt="img"
          />
          <h6 className="mb-0 text-thm ml-5">{data.server}</h6>
          <span className="fav-icon flaticon-star" />
        </div>
        <div className="details">
          <h5 className="mb-5">
            <Link href={`/job/${data.slug || data.id}`}>{data.title}</Link>
          </h5>
          {data.benefits.map((item, index) => (
            <p
              key={index}
              className={`list-inline-item c ${
                index !== 0 ? "bdrl1 pl-2.5" : ""
              }`}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
