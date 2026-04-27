import Image from "next/image";

export default function BlogRecentCard1({ data, index }) {
  return (
    <>
      <div
        className={`list-news-style flex items-center ${
          index.firstIndex === data.id ? "mt-8" : ""
        } ${index.lastIndex === data.id ? "mb0" : "mb-5"}`}
      >
        <div className="news-img shrink-0">
          <Image
            height={70}
            width={70}
            className="object-fit-cover"
            src={data.img}
            alt="recent post"
          />
        </div>
        <div className="news-content shrink ms-3">
          <h6 className="new-text mb0">{data.title}</h6>
          <a className="body-light-color">{data.date}</a>
        </div>
      </div>
    </>
  );
}
