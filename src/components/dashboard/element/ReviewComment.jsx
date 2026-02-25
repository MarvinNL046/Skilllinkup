import Image from "next/image";
import Link from "next/link";

export default function ReviewComment({ review, i, lenght }) {
  // Support both dynamic review data and legacy index-based usage
  const reviewerName = review?.reviewerName ?? "Anonymous";
  const reviewerAvatar = review?.reviewerAvatar ?? "/images/blog/comments-2.png";
  const rating = review?.overallRating ?? 5;
  const content = review?.content ?? "";
  const orderTitle = review?.orderTitle ?? null;
  const isLast = i + 1 === lenght;

  // Format relative date
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const diff = Date.now() - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months === 1) return "1 month ago";
    if (months < 12) return `${months} months ago`;
    return `${Math.floor(months / 12)} year(s) ago`;
  };

  return (
    <>
      <div className={`pb20 ${!isLast ? "bdrb1" : ""}`}>
        <div className="mbp_first position-relative d-sm-flex align-items-center justify-content-start mb30-sm mt30">
          <Image
            height={60}
            width={60}
            src={reviewerAvatar}
            className="mr-3"
            alt={reviewerName}
            onError={(e) => {
              e.currentTarget.src = "/images/blog/comments-2.png";
            }}
          />
          <div className="ml20 ml0-xs mt20-xs">
            <div className="del-edit">
              <span className="flaticon-flag" />
            </div>
            <h6 className="mt-0 mb-1">{reviewerName}</h6>
            <div className="d-flex align-items-center">
              <div>
                <i className="fas fa-star vam fz10 review-color me-2" />
                <span className="fz15 fw500">{rating.toFixed(1)}</span>
              </div>
              {review?.createdAt && (
                <div className="ms-3">
                  <span className="fz14 text">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
              )}
              {orderTitle && (
                <div className="ms-3">
                  <span className="fz14 text fst-italic">{orderTitle}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {content && (
          <p className="text mt20 mb20">{content}</p>
        )}
      </div>
    </>
  );
}
