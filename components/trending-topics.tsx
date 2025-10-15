import Link from "next/link";

interface TrendingPost {
  id: string;
  title: string;
  slug: string;
  views: number;
  category_name: string | null;
}

interface TrendingTopicsProps {
  posts: TrendingPost[];
}

export function TrendingTopics({ posts }: TrendingTopicsProps) {
  // Default icon for all posts
  const defaultIcon = (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  // Format views number (e.g., 1500 -> 1.5K)
  const formatViews = (views: number): string => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  // Determine trend badge based on views
  const getTrendBadge = (views: number, index: number) => {
    if (index === 0 && views > 1000) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-heading font-semibold">
          🔥 Hot
        </span>
      );
    } else if (views > 500) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-heading font-semibold">
          ↗ Trending
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-heading font-semibold">
          ✨ New
        </span>
      );
    }
  };

  return (
    <section className="py-16 bg-background-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-heading font-bold text-text-primary sm:text-4xl mb-2">
            Trending Topics
          </h2>
          <p className="text-base text-text-secondary">
            What freelancers are reading right now
          </p>
        </div>

        {/* View All Link - Now separate */}
        <div className="mb-6 text-center">
          <Link
            href="/post"
            className="inline-flex items-center gap-2 text-base font-heading font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            View All
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Topics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Link
              key={post.id}
              href={`/post/${post.slug}`}
              className="group relative overflow-hidden rounded-lg border border-background-gray bg-white p-5 transition-all hover:border-accent hover:shadow-xl"
            >
              {/* Icon & Badge */}
              <div className="mb-3 flex items-start justify-between">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                  {defaultIcon}
                </div>
                {getTrendBadge(post.views, index)}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-heading font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-accent font-semibold uppercase tracking-wide">
                    {post.category_name || 'Uncategorized'}
                  </span>
                  <div className="flex items-center gap-1 text-text-muted">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{formatViews(post.views)}</span>
                  </div>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-5 right-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/post"
            className="inline-flex items-center gap-2 text-base font-heading font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            View All Topics
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
