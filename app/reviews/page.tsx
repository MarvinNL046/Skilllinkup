import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { getApprovedReviews } from "../../lib/queries";

export const metadata = {
  title: "Platform Reviews - SkillLinkup",
  description: "Read authentic reviews from freelancers about their experiences on various platforms.",
};

export default async function ReviewsPage() {
  let reviews: Awaited<ReturnType<typeof getApprovedReviews>> = [];

  try {
    reviews = await getApprovedReviews(50, 0);
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + Number(r.overall_rating), 0) / reviews.length
    : 0;
  const verifiedCount = reviews.filter(r => r.verified).length;

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-background-light to-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-heading font-bold text-text-primary sm:text-5xl mb-4">
                Platform Reviews
              </h1>
              <p className="text-lg text-text-secondary mb-6">
                Read {totalReviews}+ authentic reviews from freelancers around the world
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-3xl font-heading font-bold text-primary">
                    {totalReviews}
                  </div>
                  <div className="text-xs text-text-muted mt-1">Total Reviews</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-3xl font-heading font-bold text-accent flex items-center justify-center gap-1">
                    <span className="text-yellow-400">★</span>
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="text-xs text-text-muted mt-1">Avg Rating</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="text-3xl font-heading font-bold text-secondary">
                    {verifiedCount}
                  </div>
                  <div className="text-xs text-text-muted mt-1">Verified</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
                  No reviews yet
                </h3>
                <p className="text-text-secondary">
                  Be the first to share your experience!
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="bg-white rounded-lg border border-background-gray hover:shadow-lg transition-all p-6"
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {review.user_avatar && (
                          <img
                            src={review.user_avatar}
                            alt={review.user_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-heading font-semibold text-text-primary">
                              {review.user_name}
                            </h3>
                            {review.verified && (
                              <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                                ✓
                              </span>
                            )}
                          </div>
                          {review.user_role && (
                            <p className="text-xs text-text-muted">{review.user_role}</p>
                          )}
                        </div>
                      </div>
                      {/* Rating */}
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-heading font-semibold text-text-primary">
                          {Number(review.overall_rating).toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Platform Badge */}
                    {review.platform_name && (
                      <Link
                        href={`/platforms/${review.platform_slug}`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3 hover:bg-primary/20 transition-colors"
                      >
                        <span>🏢</span>
                        {review.platform_name}
                      </Link>
                    )}

                    {/* Review Title */}
                    <h4 className="font-heading font-bold text-text-primary mb-2 text-lg">
                      {review.title}
                    </h4>

                    {/* Review Content */}
                    <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                      {review.content}
                    </p>

                    {/* Pros and Cons */}
                    {(review.pros.length > 0 || review.cons.length > 0) && (
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {review.pros.length > 0 && (
                          <div>
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-green-500">✓</span>
                              <span className="text-xs font-heading font-semibold text-text-secondary uppercase">
                                Pros
                              </span>
                            </div>
                            <ul className="space-y-1">
                              {review.pros.slice(0, 2).map((pro, index) => (
                                <li
                                  key={index}
                                  className="text-xs text-text-muted line-clamp-1"
                                >
                                  • {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {review.cons.length > 0 && (
                          <div>
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-red-500">✗</span>
                              <span className="text-xs font-heading font-semibold text-text-secondary uppercase">
                                Cons
                              </span>
                            </div>
                            <ul className="space-y-1">
                              {review.cons.slice(0, 2).map((con, index) => (
                                <li
                                  key={index}
                                  className="text-xs text-text-muted line-clamp-1"
                                >
                                  • {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-xs text-text-muted border-t border-background-gray pt-3">
                      <div className="flex items-center gap-4">
                        {review.years_experience && (
                          <span>{review.years_experience}y exp</span>
                        )}
                        {review.earnings_range && (
                          <span>{review.earnings_range}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span>👍</span>
                        <span>{review.helpful_count}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-background-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
                Share Your Experience
              </h2>
              <p className="text-text-secondary mb-6">
                Help other freelancers by sharing your honest review of the platforms you've used
              </p>
              <Link
                href="/platforms"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-heading font-semibold hover:bg-primary-dark transition-colors shadow-md"
              >
                Browse Platforms
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
