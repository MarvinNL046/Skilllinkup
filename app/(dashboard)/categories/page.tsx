import { redirect } from "next/navigation";
import { stackServerApp } from "../../../stack/server";
import Link from "next/link";
import { sql } from "../../../lib/queries";

export const metadata = {
  title: 'Categorieën - SkillLinkup Admin',
  description: 'Beheer je blog categorieën',
}

export default async function CategoriesPage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/sign-in");
  }

  // Haal categorieën op uit database
  const categories = await sql`
    SELECT
      c.id,
      c.name,
      c.slug,
      c.description,
      c.color,
      c.created_at,
      c.updated_at,
      COUNT(p.id)::int as post_count
    FROM categories c
    LEFT JOIN posts p ON c.id = p.category_id
    GROUP BY c.id, c.name, c.slug, c.description, c.color, c.created_at, c.updated_at
    ORDER BY c.name ASC
  `;

  const totalPosts = categories.reduce((sum: number, cat: any) => sum + cat.post_count, 0);

  return (
    <main className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categorieën</h1>
          <p className="mt-2 text-sm text-gray-600">
            Beheer je blog categorieën
          </p>
        </div>
        <Link
          href="/categories/new"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          + Nieuwe Categorie
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-sm font-medium text-gray-500">Totaal Categorieën</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">
            {categories.length}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-sm font-medium text-gray-500">Totaal Posts</div>
          <div className="mt-2 text-3xl font-bold text-blue-600">
            {totalPosts}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="text-sm font-medium text-gray-500">Gem. per Categorie</div>
          <div className="mt-2 text-3xl font-bold text-green-600">
            {categories.length > 0 ? (totalPosts / categories.length).toFixed(1) : 0}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Naam
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Posts
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Kleur
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Acties
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  Geen categorieën gevonden. Klik op "Nieuwe Categorie" om er een aan te maken.
                </td>
              </tr>
            ) : (
              categories.map((category: any) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    {category.description && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {category.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{category.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                      {category.post_count} posts
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.color && (
                      <div className="flex items-center gap-2">
                        <div
                          className="h-6 w-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm text-gray-500">{category.color}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/categories/${category.id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Bewerken
                      </Link>
                      <button className="text-red-600 hover:text-red-900">
                        Verwijderen
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
