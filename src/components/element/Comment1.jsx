"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Comment1() {
  const path = usePathname();

  return (
    <>
      <div className="product_single_content mb50">
        <div className="mbp_pagination_comments">
          <div className="row">
            <div className="col-lg-12">
              <div
                className={`total_review flex items-center justify-between mb20  ${
                  path !== "/shop-single" ? "mt60" : ""
                }`}
              >
                <h4 className="mb15">80 Reviews</h4>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mbp_first relative flex items-center justify-start mb30-sm">
                <Image
                  height={60}
                  width={60}
                  src="/images/blog/comments-2.png"
                  className="mr-3 object-fit-contain"
                  alt="comments-2.png"
                />
                <div className="ml20">
                  <h6 className="mt-0 mb-0">Bessie Cooper</h6>
                  <div>
                    <span className="fz14">12 March 2022</span>
                  </div>
                </div>
              </div>
              <p className="text mt20 mb20">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.
              </p>
              <div className="review_cansel_btns flex">
                <a>
                  <i className="fas fa-thumbs-up" />
                  Helpful
                </a>
                <a>
                  <i className="fas fa-thumbs-down" />
                  Not helpful
                </a>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mbp_first relative flex items-center justify-start mt30 mb30-sm">
                <Image
                  height={60}
                  width={60}
                  src="/images/blog/comments-2.png"
                  className="mr-3 object-fit-contain"
                  alt="comments-2.png"
                />
                <div className="ml20">
                  <h6 className="mt-0 mb-0">Darrell Steward</h6>
                  <div>
                    <span className="fz14">12 March 2022</span>
                  </div>
                </div>
              </div>
              <p className="text mt20 mb20">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text.
              </p>
              <div className="review_cansel_btns flex pb30">
                <a>
                  <i className="fas fa-thumbs-up" />
                  Helpful
                </a>
                <a>
                  <i className="fas fa-thumbs-down" />
                  Not helpful
                </a>
              </div>
            </div>
            <div className="col-md-12">
              <div className="relative bdrb1 pb50">
                <Link href="/services" className="ud-btn btn-light-thm">
                  See More
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
