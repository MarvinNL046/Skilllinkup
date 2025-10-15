'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PostCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  post_count: number;
}

interface PlatformCategory {
  category: string;
  count: number;
}

export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'platforms'>('posts');
  const [postCategories, setPostCategories] = useState<PostCategory[]>([]);
  const [platformCategories, setPlatformCategories] = useState<PlatformCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setPostCategories(data.postCategories || []);
      setPlatformCategories(data.platformCategories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPostsCount = postCategories.reduce((sum, cat) => sum + cat.post_count, 0);
  const totalPlatformsCount = platformCategories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <main className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categorieën</h1>
          <p className="mt-2 text-sm text-gray-600">
            Beheer je blog en platform categorieën
          </p>
        </div>
        {activeTab === 'posts' && (
          <Link
            href="/categories/new"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            + Nieuwe Categorie
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('posts')}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
              activeTab === 'posts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Post Categories ({postCategories.length})
          </button>
          <button
            onClick={() => setActiveTab('platforms')}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
              activeTab === 'platforms'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Platform Categories ({platformCategories.length})
          </button>
        </nav>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="text-gray-600">Loading...</div>
        </div>
      ) : (
        <>
          {/* Post Categories Tab */}
          {activeTab === 'posts' && (
            <>
              {/* Stats */}
              <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <div className="text-sm font-medium text-gray-500">Totaal Categorieën</div>
                  <div className="mt-2 text-3xl font-bold text-gray-900">
                    {postCategories.length}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <div className="text-sm font-medium text-gray-500">Totaal Posts</div>
                  <div className="mt-2 text-3xl font-bold text-blue-600">
                    {totalPostsCount}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <div className="text-sm font-medium text-gray-500">Gem. per Categorie</div>
                  <div className="mt-2 text-3xl font-bold text-green-600">
                    {postCategories.length > 0 ? (totalPostsCount / postCategories.length).toFixed(1) : 0}
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
                    {postCategories.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                          Geen categorieën gevonden. Klik op "Nieuwe Categorie" om er een aan te maken.
                        </td>
                      </tr>
                    ) : (
                      postCategories.map((category) => (
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
            </>
          )}

          {/* Platform Categories Tab */}
          {activeTab === 'platforms' && (
            <>
              {/* Stats */}
              <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <div className="text-sm font-medium text-gray-500">Unieke Categorieën</div>
                  <div className="mt-2 text-3xl font-bold text-gray-900">
                    {platformCategories.length}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <div className="text-sm font-medium text-gray-500">Totaal Platforms</div>
                  <div className="mt-2 text-3xl font-bold text-blue-600">
                    {totalPlatformsCount}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <div className="text-sm font-medium text-gray-500">Gem. per Categorie</div>
                  <div className="mt-2 text-3xl font-bold text-green-600">
                    {platformCategories.length > 0 ? (totalPlatformsCount / platformCategories.length).toFixed(1) : 0}
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Platform categorieën worden automatisch gegenereerd
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      Deze categorieën worden automatisch aangemaakt op basis van de platforms.
                      Bewerk een platform om de categorie te wijzigen.
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {platformCategories.map((category) => (
                  <div
                    key={category.category}
                    className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.category}
                      </h3>
                      <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                        {category.count}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {category.count} {category.count === 1 ? 'platform' : 'platforms'}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}
