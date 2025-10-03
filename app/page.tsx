import { redirect } from "next/navigation";
import { stackServerApp } from "../stack/server";
import { AdminNav } from "../components/AdminNav";
import { sql } from "../lib/queries";
import Link from "next/link";

export const metadata = {
  title: 'Admin Dashboard - SkillLinkup',
  description: 'Manage your blog posts and content',
}

export default async function DashboardPage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/sign-in");
  }

  // Fetch real data from database
  const stats = await sql`
    SELECT
      COUNT(DISTINCT p.id)::int as total_posts,
      COUNT(DISTINCT p.id) FILTER (WHERE p.status = 'published')::int as published_posts,
      COUNT(DISTINCT p.id) FILTER (WHERE p.status = 'draft')::int as draft_posts,
      COUNT(DISTINCT pl.id)::int as total_platforms,
      COUNT(DISTINCT r.id)::int as total_reviews,
      COUNT(DISTINCT c.id)::int as total_categories
    FROM posts p
    FULL OUTER JOIN platforms pl ON true
    FULL OUTER JOIN reviews r ON true
    FULL OUTER JOIN categories c ON true
  `;

  const recentPosts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.status,
      p.created_at,
      c.name as category_name
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.created_at DESC
    LIMIT 5
  `;

  const totalPosts = stats[0]?.total_posts || 0;
  const publishedPosts = stats[0]?.published_posts || 0;
  const draftPosts = stats[0]?.draft_posts || 0;
  const totalPlatforms = stats[0]?.total_platforms || 0;
  const totalReviews = stats[0]?.total_reviews || 0;
  const totalCategories = stats[0]?.total_categories || 0;

  return (
    <div className="min-h-screen bg-background-light">
      <AdminNav userEmail={user.primaryEmail} />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">
            Welkom terug! 👋
          </h2>
          <p className="text-text-secondary">
            Hier is een overzicht van je blog statistieken
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Total Posts */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white text-2xl">
                📝
              </div>
            </div>
            <h3 className="text-3xl font-heading font-bold text-text-primary mb-1">
              {totalPosts}
            </h3>
            <p className="text-sm text-text-secondary">Totaal Posts</p>
          </div>

          {/* Published */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-white text-2xl">
                ✅
              </div>
            </div>
            <h3 className="text-3xl font-heading font-bold text-text-primary mb-1">
              {publishedPosts}
            </h3>
            <p className="text-sm text-text-secondary">Gepubliceerd</p>
          </div>

          {/* Drafts */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-white text-2xl">
                📄
              </div>
            </div>
            <h3 className="text-3xl font-heading font-bold text-text-primary mb-1">
              {draftPosts}
            </h3>
            <p className="text-sm text-text-secondary">Concepten</p>
          </div>

          {/* Platforms */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white text-2xl">
                🏢
              </div>
            </div>
            <h3 className="text-3xl font-heading font-bold text-text-primary mb-1">
              {totalPlatforms}
            </h3>
            <p className="text-sm text-text-secondary">Platforms</p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white text-2xl">
                ⭐
              </div>
            </div>
            <h3 className="text-3xl font-heading font-bold text-text-primary mb-1">
              {totalReviews}
            </h3>
            <p className="text-sm text-text-secondary">Reviews</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center text-white text-2xl">
                🏷️
              </div>
            </div>
            <h3 className="text-3xl font-heading font-bold text-text-primary mb-1">
              {totalCategories}
            </h3>
            <p className="text-sm text-text-secondary">Categorieën</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray mb-8">
          <h3 className="text-xl font-heading font-bold text-text-primary mb-4">
            Snelle Acties
          </h3>
          <div className="grid gap-4 md:grid-cols-4">
            <Link
              href="/posts/new"
              className="flex items-center gap-3 p-4 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                ➕
              </div>
              <div>
                <p className="font-heading font-semibold">Nieuwe Post</p>
                <p className="text-xs text-white/80">Maak een nieuwe blog post</p>
              </div>
            </Link>

            <Link
              href="/platforms/new"
              className="flex items-center gap-3 p-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                ➕
              </div>
              <div>
                <p className="font-heading font-semibold">Nieuw Platform</p>
                <p className="text-xs text-white/80">Platform toevoegen</p>
              </div>
            </Link>

            <Link
              href="/posts"
              className="flex items-center gap-3 p-4 rounded-lg bg-secondary hover:bg-secondary-dark text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                📋
              </div>
              <div>
                <p className="font-heading font-semibold">Alle Posts</p>
                <p className="text-xs text-white/80">Bekijk en bewerk posts</p>
              </div>
            </Link>

            <Link
              href="/categories"
              className="flex items-center gap-3 p-4 rounded-lg bg-accent hover:bg-accent-dark text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                🏷️
              </div>
              <div>
                <p className="font-heading font-semibold">Categorieën</p>
                <p className="text-xs text-white/80">Beheer categorieën</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow-sm border border-background-gray overflow-hidden">
          <div className="p-6 border-b border-background-gray">
            <h3 className="text-xl font-heading font-bold text-text-primary">
              Recente Posts
            </h3>
          </div>
          <div className="overflow-x-auto">
            {recentPosts.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <p className="mb-4">Nog geen posts aangemaakt.</p>
                <Link
                  href="/posts/new"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                  ➕ Maak je eerste post
                </Link>
              </div>
            ) : (
              <>
                <table className="w-full">
                  <thead className="bg-background-light">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-heading font-semibold text-text-secondary uppercase tracking-wide">
                        Titel
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-heading font-semibold text-text-secondary uppercase tracking-wide">
                        Categorie
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-heading font-semibold text-text-secondary uppercase tracking-wide">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-heading font-semibold text-text-secondary uppercase tracking-wide">
                        Datum
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-heading font-semibold text-text-secondary uppercase tracking-wide">
                        Acties
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-background-gray">
                    {recentPosts.map((post: any) => (
                      <tr key={post.id} className="hover:bg-background-light transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-heading font-semibold text-text-primary">
                            {post.title}
                          </p>
                          <p className="text-xs text-text-muted mt-1">
                            /{post.slug}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          {post.category_name ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-heading font-semibold bg-accent/10 text-accent">
                              {post.category_name}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {post.status === "published" ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-heading font-semibold bg-accent/10 text-accent">
                              ✅ Gepubliceerd
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-heading font-semibold bg-text-muted/10 text-text-muted">
                              📄 Concept
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-text-secondary">
                            {new Date(post.created_at).toLocaleDateString('nl-NL', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/posts/${post.id}/edit`}
                            className="text-sm font-heading font-semibold text-primary hover:text-primary-dark transition-colors"
                          >
                            Bewerken
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="p-6 border-t border-background-gray">
                  <Link
                    href="/posts"
                    className="text-sm font-heading font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    Bekijk alle posts →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
