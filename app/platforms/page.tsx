import Link from "next/link";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { getPublishedPlatforms, getPlatformCategories } from "../../lib/queries";

export const metadata = {
  title: "All Platforms - SkillLinkup",
  description: "Browse all freelance platform reviews, comparisons, and ratings.",
};

export default async function PlatformsPage() {
  let platforms: Awaited<ReturnType<typeof getPublishedPlatforms>> = [];
  let platformCategories: Awaited<ReturnType<typeof getPlatformCategories>> = [];

  try {
    platforms = await getPublishedPlatforms(50);
    platformCategories = await getPlatformCategories();
  } catch (error) {
    console.error('Error fetching platforms:', error);
  }

  // Add "All Platforms" category
  const categories = [
    { category: "All Platforms", count: platforms.length },
    ...platformCategories,
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-accent bg-accent/10";
      case "Medium":
        return "text-primary bg-primary/10";
      case "Hard":
        return "text-secondary bg-secondary/10";
      default:
        return "text-text-muted bg-background-gray";
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-background-light to-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-heading font-bold text-text-primary sm:text-5xl mb-4">
                All Freelance Platforms
              </h1>
              <p className="text-lg text-text-secondary mb-6">
                Compare {platforms.length}+ platforms to find the perfect match for your skills and goals
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search platforms..."
                    className="w-full rounded-lg border border-background-gray bg-white px-6 py-4 pl-12 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-md"
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-4">
              {/* Sidebar Filters */}
              <aside className="lg:col-span-1">
                <div className="bg-background-light rounded-lg p-6 sticky top-4">
                  <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
                    Categories
                  </h3>
                  <ul className="space-y-2">
                    {categories.map((cat) => (
                      <li key={cat.category}>
                        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-text-secondary hover:bg-white hover:text-primary transition-all">
                          <span className="font-medium">{cat.category}</span>
                          <span className="text-xs text-text-muted">
                            {cat.count}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  <hr className="my-6 border-background-gray" />

                  <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
                    Difficulty
                  </h3>
                  <div className="space-y-2">
                    {["Easy", "Medium", "Hard"].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-background-gray text-primary focus:ring-primary/50"
                        />
                        <span className="text-sm text-text-secondary">{level}</span>
                      </label>
                    ))}
                  </div>

                  <hr className="my-6 border-background-gray" />

                  <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
                    Rating
                  </h3>
                  <div className="space-y-2">
                    {["4.5+ Stars", "4.0+ Stars", "3.5+ Stars"].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-background-gray text-primary focus:ring-primary/50"
                        />
                        <span className="text-sm text-text-secondary">{rating}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Platforms Grid */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-text-secondary">
                    Showing {platforms.length} platforms
                  </p>
                  <select className="rounded-lg border border-background-gray bg-white px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option>Sort by: Rating</option>
                    <option>Sort by: Name</option>
                    <option>Sort by: Difficulty</option>
                  </select>
                </div>

                {platforms.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-text-secondary">No platforms found. Please add some in the admin panel.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {platforms.map((platform) => (
                      <Link
                        key={platform.id}
                        href={`/platforms/${platform.slug}`}
                        className="group relative overflow-hidden rounded-lg border-2 border-background-gray bg-white p-6 transition-all hover:border-accent hover:shadow-xl"
                      >
                        {/* Featured Badge */}
                        {platform.featured && (
                          <div className="absolute right-3 top-3">
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-heading font-semibold text-white">
                              ★
                            </span>
                          </div>
                        )}

                        {/* Platform Name */}
                        <h3 className="text-xl font-heading font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                          {platform.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(platform.rating)
                                    ? "text-accent"
                                    : "text-background-gray"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-text-primary">
                            {Number(platform.rating).toFixed(1)}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-text-secondary">Category</span>
                            <span className="font-semibold text-accent">
                              {platform.category}
                            </span>
                          </div>
                          {platform.fees && (
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-text-secondary">Fees</span>
                              <span className="font-semibold text-text-primary">
                                {platform.fees}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-text-secondary">Difficulty</span>
                            <span
                              className={`font-semibold text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(
                                platform.difficulty
                              )}`}
                            >
                              {platform.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between text-sm font-heading font-semibold text-primary group-hover:text-primary-dark transition-colors">
                          <span>Read Review</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
