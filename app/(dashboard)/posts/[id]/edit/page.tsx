'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category_id: '',
    status: 'draft',
    featured: false,
    feature_img: '',
  });

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.post.title || '',
          slug: data.post.slug || '',
          excerpt: data.post.excerpt || '',
          content: data.post.content || '',
          category_id: data.post.category_id || '',
          status: data.post.status || 'draft',
          featured: data.post.featured || false,
          feature_img: data.post.feature_img || '',
        });
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/posts');
      } else {
        alert('Er ging iets mis bij het opslaan');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Er ging iets mis bij het opslaan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Post laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white border-b border-background-gray sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-2xl font-heading font-bold text-text-primary">
                SkillLinkup <span className="text-primary">Admin</span>
              </Link>
              <nav className="hidden md:flex items-center gap-4">
                <Link
                  href="/"
                  className="text-sm font-heading font-semibold text-text-secondary hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/posts"
                  className="text-sm font-heading font-semibold text-primary"
                >
                  Posts
                </Link>
                <Link
                  href="/categories"
                  className="text-sm font-heading font-semibold text-text-secondary hover:text-primary transition-colors"
                >
                  Categorieën
                </Link>
              </nav>
            </div>
            <Link
              href="/posts"
              className="text-sm font-heading font-semibold text-text-secondary hover:text-primary transition-colors"
            >
              ← Terug naar overzicht
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Page Header */}
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                  Post Bewerken
                </h1>
                <p className="text-text-secondary">
                  Bewerk je blog post
                </p>
              </div>

              {/* Title */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray">
                <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                  Titel *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Bijv. Top 10 Freelance Platforms in 2025"
                  className="w-full px-4 py-3 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg"
                />
              </div>

              {/* Slug */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray">
                <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                  URL Slug *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-muted">skilllinkup.com/post/</span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="top-10-freelance-platforms-2025"
                    className="flex-1 px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray">
                <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                  Samenvatting
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Korte beschrijving van de post"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              {/* Content */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray">
                <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                  Inhoud *
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Schrijf hier de volledige inhoud van je post..."
                  rows={20}
                  className="w-full px-4 py-3 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none font-mono text-sm"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray">
                <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
                  Publicatie
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="draft">📄 Concept</option>
                      <option value="published">✅ Gepubliceerd</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded border-background-gray text-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <label htmlFor="featured" className="text-sm font-heading font-semibold text-text-primary">
                      ⭐ Featured post
                    </label>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray">
                <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
                  Categorie
                </h3>

                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Selecteer categorie</option>
                  <option value="1">Platforms</option>
                  <option value="2">Guides</option>
                  <option value="3">Tips</option>
                  <option value="4">Comparisons</option>
                </select>
              </div>

              {/* Featured Image */}
              <div className="bg-white rounded-lg p-6 shadow-sm border border-background-gray">
                <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
                  Featured Image
                </h3>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.feature_img}
                    onChange={(e) => setFormData({ ...formData, feature_img: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  />

                  {formData.feature_img && (
                    <div className="aspect-video rounded-lg overflow-hidden bg-background-gray">
                      <img
                        src={formData.feature_img}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-heading font-semibold transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Opslaan...' : '💾 Wijzigingen opslaan'}
                </button>

                <Link
                  href="/posts"
                  className="block w-full px-6 py-3 rounded-lg bg-background-gray hover:bg-background-gray/80 text-text-primary font-heading font-semibold transition-colors text-center"
                >
                  Annuleren
                </Link>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
