'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import ImageUpload from '../../../../../components/ImageUpload';
import CategoryQuickAdd from '../../../../../components/CategoryQuickAdd';

const RichTextEditor = dynamic(() => import('../../../../../components/RichTextEditor'), {
  ssr: false,
  loading: () => <p className="p-4 text-text-muted">Editor laden...</p>,
});

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    status: 'draft',
    excerpt: '',
    content: '',
    featuredImage: '',
    tags: '',
    metaTitle: '',
    metaDescription: '',
    featured: false,
  });

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  // Fetch post data
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (response.ok) {
          const data = await response.json();
          const post = data.post;

          setFormData({
            title: post.title || '',
            slug: post.slug || '',
            category: post.category_id || '',
            status: post.status || 'draft',
            excerpt: post.excerpt || '',
            content: post.content || '',
            featuredImage: post.feature_img || '',
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
            metaTitle: post.meta_title || '',
            metaDescription: post.meta_description || '',
            featured: post.featured || false,
          });
        } else {
          setError('Post niet gevonden');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Fout bij laden van post');
      } finally {
        setIsLoading(false);
      }
    }

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          feature_img: formData.featuredImage,
          status: formData.status,
          category_id: formData.category,
          tags: formData.tags,
          meta_title: formData.metaTitle,
          meta_description: formData.metaDescription,
          featured: formData.featured,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij opslaan');
      }

      router.push('/posts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis bij het opslaan');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryAdded = (newCategory: Category) => {
    setCategories(prev => [...prev, newCategory]);
    setFormData(prev => ({ ...prev, category: newCategory.id.toString() }));
  };

  if (isLoading) {
    return (
      <main className="p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Post laden...</p>
        </div>
      </main>
    );
  }

  if (error && !formData.title) {
    return (
      <main className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
        <Link href="/posts" className="mt-4 inline-block text-primary hover:underline">
          ← Terug naar overzicht
        </Link>
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Post Bewerken
        </h1>
        <p className="text-text-secondary">
          Bewerk "{formData.title}"
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <label htmlFor="title" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                Titel *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-lg rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Slug */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <label htmlFor="slug" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                URL Slug *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-muted">skilllinkup.com/blog/</span>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <label htmlFor="excerpt" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                Samenvatting
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            {/* SEO Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <h3 className="text-sm font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
                🔍 SEO Instellingen
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="metaTitle" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    maxLength={60}
                    className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <div className="flex justify-end mt-1">
                    <span className={`text-xs ${formData.metaTitle.length > 60 ? 'text-red-500' : 'text-text-muted'}`}>
                      {formData.metaTitle.length}/60
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="metaDescription" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    maxLength={160}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                  <div className="flex justify-end mt-1">
                    <span className={`text-xs ${formData.metaDescription.length > 160 ? 'text-red-500' : 'text-text-muted'}`}>
                      {formData.metaDescription.length}/160
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <label htmlFor="content" className="block text-sm font-heading font-semibold text-text-primary mb-4">
                Inhoud (Rich Text Editor) *
              </label>
              <RichTextEditor
                content={formData.content}
                onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                placeholder="Start met typen of gebruik de toolbar..."
              />
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            {/* Publish Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <h3 className="text-sm font-heading font-semibold text-text-primary mb-4">
                Publicatie Instellingen
              </h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="draft">📄 Concept</option>
                    <option value="published">✅ Gepubliceerd</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                    Categorie *
                  </label>
                  <div className="space-y-2">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      disabled={loadingCategories}
                      className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50"
                    >
                      <option value="">
                        {loadingCategories ? "Categorieën laden..." : "Selecteer categorie"}
                      </option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      className="w-full px-4 py-2 rounded-lg border-2 border-dashed border-background-gray text-sm font-heading font-semibold text-primary hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      + Nieuwe categorie
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="freelance, upwork, tips"
                    className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <p className="text-xs text-text-muted mt-1">
                    Gescheiden door komma's
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 rounded border-background-gray text-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <label htmlFor="featured" className="text-sm font-heading font-semibold text-text-primary">
                    ⭐ Featured post
                  </label>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <ImageUpload
                value={formData.featuredImage}
                onChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
                label="Uitgelichte Afbeelding"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-heading font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Opslaan...
                </span>
              ) : (
                '💾 Wijzigingen opslaan'
              )}
            </button>

            <Link
              href="/posts"
              className="block w-full px-6 py-3 rounded-lg bg-background-gray hover:bg-background-gray/80 text-text-primary font-heading font-semibold transition-colors text-center"
            >
              Annuleren
            </Link>
          </div>
        </div>
      </form>

      {/* Category Quick Add Modal */}
      <CategoryQuickAdd
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onCategoryAdded={handleCategoryAdded}
      />
    </main>
  );
}
