import Image from "next/image";
import Link from "next/link";

export default function MostViewServiceCard1({ data }) {
  return (
    <>
      <div className="listing-style1 list-style block xl:flex items-center border-0 mb10">
        <div className="list-thumb shrink-0 bdrs4">
          <Image
            height={91}
            width={122}
            className="w-full h-auto"
            src={data.img}
            alt="thumb"
          />
        </div>
        <div className="list-content grow pt10 pb10 pl15 pl0-lg">
          <h6 className="list-title mb-2">
            <Link href="/services">{data.title}</Link>
          </h6>
          <div className="list-meta flex justify-between items-center">
            <div className="review-meta flex items-center">
              <i className="fas fa-star fz10 review-color me-2" />
              <p className="mb-0 body-color fz14">
                <span className="dark-color me-2">{data.rating}</span>
              </p>
            </div>
            <div className="budget">
              <p className="mb-0 body-color">
                Starting at
                <span className="fz17 fw500 dark-color ms-1">
                  ${data.price}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
