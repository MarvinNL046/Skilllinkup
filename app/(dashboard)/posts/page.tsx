import { redirect } from "next/navigation";
import { stackServerApp } from "../../../stack/server";
import Link from "next/link";
import { sql } from "../../../lib/queries";

export const metadata = {
  title: 'Alle Posts - SkillLinkup Admin',
  description: 'Beheer je blog posts',
}

export default async function PostsPage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/sign-in");
  }

  // Haal posts op uit database
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.status,
      p.views,
      p.created_at,
      c.name as category_name
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.created_at DESC
  `;

  return (
    <div className="min-h-screen bg-background-light">
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              Alle Posts
            </h1>
            <p className="text-text-secondary">
              Beheer en bewerk je blog posts
            </p>
          </div>
          <Link
            href="/posts/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-heading font-semibold"
          >
            <span className="text-xl">➕</span>
            Nieuwe Post
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-background-gray p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Zoek posts..."
                className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <select className="px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option>Alle statussen</option>
              <option>Gepubliceerd</option>
              <option>Concepten</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option>Alle categorieën</option>
              <option>Platforms</option>
              <option>Guides</option>
              <option>Comparisons</option>
            </select>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-lg shadow-sm border border-background-gray overflow-hidden">
          <div className="overflow-x-auto">
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
                    Weergaven
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
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-background-light transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-heading font-semibold text-text-primary">
                          {post.title}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          /{post.slug}
                        </p>
                      </div>
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
                      <p className="text-sm text-text-secondary">{post.views?.toLocaleString() || '0'}</p>
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
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/posts/${post.id}/edit`}
                          className="text-sm font-heading font-semibold text-primary hover:text-primary-dark transition-colors"
                        >
                          Bewerken
                        </Link>
                        <button className="text-sm font-heading font-semibold text-red-500 hover:text-red-600 transition-colors">
                          Verwijderen
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {posts.length > 0 && (
            <div className="px-6 py-4 border-t border-background-gray flex items-center justify-between">
              <p className="text-sm text-text-secondary">
                Toont <span className="font-heading font-semibold text-text-primary">{posts.length}</span> posts
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
