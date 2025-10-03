"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("../../../../components/RichTextEditor"), {
  ssr: false,
  loading: () => <p className="p-4 text-text-muted">Editor laden...</p>,
});

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    status: "draft",
    excerpt: "",
    content: "",
    featuredImage: "",
    tags: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Save to database
    console.log("Form data:", formData);
    
    // For now, just redirect back to posts
    alert("Post opgeslagen! (Mock - nog geen database connectie)");
    router.push("/posts");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-generate slug from title
    if (name === "title" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  return (
    <main className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
            Nieuwe Post
          </h1>
          <p className="text-text-secondary">
            Maak een nieuwe blog post aan
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
                  placeholder="Bijv: Top 10 Freelance Platforms in 2025"
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
                    placeholder="top-10-freelance-platforms-2025"
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
                  placeholder="Korte samenvatting van de post (wordt getoond in listings)"
                  className="w-full px-4 py-3 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              {/* Content */}
              <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
                <label htmlFor="content" className="block text-sm font-heading font-semibold text-text-primary mb-4">
                  Inhoud (Rich Text Editor) *
                </label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                  placeholder="Start met typen of gebruik de toolbar om tekst op te maken, afbeeldingen toe te voegen..."
                />
                <p className="text-xs text-text-muted mt-2">
                  💡 Tip: Klik op 🖼️ Afbeelding om inline afbeeldingen toe te voegen
                </p>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
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
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="">Selecteer categorie</option>
                      <option value="Platforms">Platforms</option>
                      <option value="Guides">Guides</option>
                      <option value="Comparisons">Comparisons</option>
                      <option value="Career">Career</option>
                      <option value="Business">Business</option>
                    </select>
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
                </div>
              </div>

              {/* Featured Image */}
              <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
                <h3 className="text-sm font-heading font-semibold text-text-primary mb-4">
                  Uitgelichte Afbeelding
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    id="featuredImage"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleChange}
                    placeholder="/images/post-image.jpg"
                    className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <button
                    type="button"
                    className="w-full px-4 py-2 rounded-lg border-2 border-dashed border-background-gray text-sm font-heading font-semibold text-text-secondary hover:border-primary hover:text-primary transition-colors"
                  >
                    📁 Upload Afbeelding
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-heading font-semibold shadow-lg"
              >
                {formData.status === 'published' ? '✅ Publiceren' : '📄 Opslaan als Concept'}
              </button>
            </div>
          </div>
        </form>
      </main>
  );
}
