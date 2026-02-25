'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import type { Id } from '@/convex/_generated/dataModel';

export const dynamic = 'force-dynamic';

function StarRating({ rating }: { rating: number }) {
  return (
    <ul className="mb0 d-flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <li key={star} className="list-inline-item mr5">
          <i
            className={`fas fa-star fz10 ${
              star <= rating ? 'vam text-thm' : 'vam text-muted'
            }`}
          />
        </li>
      ))}
    </ul>
  );
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function ReviewerAvatar({
  name,
  image,
}: {
  name: string;
  image: string | null | undefined;
}) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="rounded-circle"
        style={{ width: 50, height: 50, objectFit: 'cover' }}
      />
    );
  }

  return (
    <div
      className="rounded-circle d-flex align-items-center justify-content-center bg-light"
      style={{ width: 50, height: 50, flexShrink: 0 }}
    >
      <span className="fz14 fw600">{initials}</span>
    </div>
  );
}

export default function ReviewsPage() {
  const { user: clerkUser, isLoaded } = useUser();

  const convexUser = useQuery(
    api.users.getByClerkId,
    isLoaded && clerkUser ? { clerkId: clerkUser.id } : 'skip'
  );

  const reviews = useQuery(
    api.marketplace.reviews.getByUserId,
    convexUser?._id ? { userId: convexUser._id as Id<'users'>, limit: 50 } : 'skip'
  );

  const loading = !isLoaded || convexUser === undefined || reviews === undefined;

  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length
      : 0;

  return (
    <div className="dashboard__main pl0-md">
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>My Reviews</h2>
              <p className="text">
                {loading
                  ? 'Loading...'
                  : `${reviews?.length ?? 0} review${(reviews?.length ?? 0) !== 1 ? 's' : ''} received`}
              </p>
            </div>
          </div>
        </div>

        {/* Summary stats */}
        {!loading && reviews && reviews.length > 0 && (
          <div className="row mb30">
            <div className="col-lg-4">
              <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
                <div className="d-flex align-items-center">
                  <div className="mr20">
                    <h2 className="mb0 fz30 fw700 text-thm">
                      {averageRating.toFixed(1)}
                    </h2>
                    <StarRating rating={Math.round(averageRating)} />
                  </div>
                  <div>
                    <p className="mb0 fz15 fw500">Average Rating</p>
                    <p className="mb0 fz13 text-muted">
                      Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="row">
            <div className="col-lg-12">
              <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
                <div className="spinner-border text-thm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt20 mb0 fz15">Loading your reviews...</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && reviews && reviews.length === 0 && (
          <div className="row">
            <div className="col-lg-12">
              <div className="ps-widget bgc-white bdrs4 p30 mb30 text-center">
                <span className="flaticon-review-1 fz60 text-muted mb20 d-block" />
                <h4>No Reviews Yet</h4>
                <p className="text">
                  Complete orders and encourage clients to leave reviews. Reviews
                  are revealed only when both parties submit one (blind review system).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Reviews list */}
        {!loading && reviews && reviews.length > 0 && (
          <div className="row">
            <div className="col-lg-12">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative"
                >
                  <div className="d-sm-flex align-items-start">
                    <ReviewerAvatar
                      name={review.reviewerName}
                      image={review.reviewerAvatar}
                    />
                    <div className="ml20 mt10 mt-sm-0 flex-grow-1">
                      <div className="d-flex align-items-center justify-content-between mb5">
                        <h6 className="mb0 fw600">{review.reviewerName}</h6>
                        <small className="text-muted">
                          {formatDate(review.createdAt)}
                        </small>
                      </div>

                      <div className="d-flex align-items-center mb10">
                        <StarRating rating={review.overallRating} />
                        <span className="fz13 ml10 text-muted">
                          {review.overallRating}/5
                        </span>
                        {review.isPublic === false && (
                          <span className="badge bg-warning text-dark ml15 fz10">
                            Pending (awaiting your review)
                          </span>
                        )}
                      </div>

                      {review.orderTitle && (
                        <p className="mb5 fz13 text-muted">
                          <i className="flaticon-receipt mr5" />
                          Order: {review.orderTitle}
                        </p>
                      )}

                      {review.content ? (
                        <p className="mb0 fz15">{review.content}</p>
                      ) : (
                        <p className="mb0 fz14 text-muted fst-italic">
                          No written review provided.
                        </p>
                      )}

                      {/* Sub-ratings */}
                      {(review.communicationRating ||
                        review.qualityRating ||
                        review.timelinessRating ||
                        review.valueRating) && (
                        <div className="row mt15">
                          {review.communicationRating && (
                            <div className="col-sm-3 col-6 mb10">
                              <p className="mb2 fz12 text-muted">Communication</p>
                              <StarRating rating={review.communicationRating} />
                            </div>
                          )}
                          {review.qualityRating && (
                            <div className="col-sm-3 col-6 mb10">
                              <p className="mb2 fz12 text-muted">Quality</p>
                              <StarRating rating={review.qualityRating} />
                            </div>
                          )}
                          {review.timelinessRating && (
                            <div className="col-sm-3 col-6 mb10">
                              <p className="mb2 fz12 text-muted">Timeliness</p>
                              <StarRating rating={review.timelinessRating} />
                            </div>
                          )}
                          {review.valueRating && (
                            <div className="col-sm-3 col-6 mb10">
                              <p className="mb2 fz12 text-muted">Value</p>
                              <StarRating rating={review.valueRating} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
