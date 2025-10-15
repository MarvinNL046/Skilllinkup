'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ImageUpload from '../../../../../components/ImageUpload';

const RichTextEditor = dynamic(() => import('../../../../../components/RichTextEditor'), {
  ssr: false,
  loading: () => <p className="p-4 text-text-muted">Editor laden...</p>,
});

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditPlatformPage({ params }: PageProps) {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    logo_url: '',
    website_url: '',
    rating: 0,
    category: 'General',
    fees: '',
    difficulty: 'Easy',
    color: '#3B82F6',
    featured: false,
    pros: [''],
    cons: [''],
    features: [''],
    status: 'draft',
  });

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
      fetchPlatform(resolvedParams.id);
    });
  }, [params]);

  const fetchPlatform = async (platformId: string) => {
    try {
      const response = await fetch(`/api/platforms/${platformId}`);
      const data = await response.json();

      if (data.success) {
        const platform = data.data;
        setFormData({
          name: platform.name || '',
          slug: platform.slug || '',
          description: platform.description || '',
          logo_url: platform.logo_url || '',
          website_url: platform.website_url || '',
          rating: platform.rating || 0,
          category: platform.category || 'General',
          fees: platform.fees || '',
          difficulty: platform.difficulty || 'Easy',
          color: platform.color || '#3B82F6',
          featured: platform.featured || false,
          pros: platform.pros && platform.pros.length > 0 ? platform.pros : [''],
          cons: platform.cons && platform.cons.length > 0 ? platform.cons : [''],
          features: platform.features && platform.features.length > 0 ? platform.features : [''],
          status: platform.status || 'draft',
        });
      }
    } catch (error) {
      console.error('Error fetching platform:', error);
      setError('Fout bij laden van platform');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleArrayChange = (
    field: 'pros' | 'cons' | 'features',
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'pros' | 'cons' | 'features') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field: 'pros' | 'cons' | 'features', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Filter out empty strings from arrays
      const cleanData = {
        ...formData,
        pros: formData.pros.filter((p) => p.trim() !== ''),
        cons: formData.cons.filter((c) => c.trim() !== ''),
        features: formData.features.filter((f) => f.trim() !== ''),
      };

      const response = await fetch(`/api/platforms/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Fout bij opslaan');
      }

      router.push('/platforms');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis bij het opslaan');
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <main className="p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Platform laden...</p>
        </div>
      </main>
    );
  }

  if (error && !formData.name) {
    return (
      <main className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
        <Link href="/platforms" className="mt-4 inline-block text-primary hover:underline">
          ← Terug naar overzicht
        </Link>
      </main>
    );
  }

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
          Platform Bewerken
        </h1>
        <p className="text-text-secondary">
          Bewerk "{formData.name}"
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Platform Name */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <label htmlFor="name" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                Platform Naam *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
                <span className="text-sm text-text-muted">skilllinkup.com/platforms/</span>
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

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                Beschrijving
              </label>
              <RichTextEditor
                content={formData.description}
                onChange={(html) => setFormData({ ...formData, description: html })}
                placeholder="Schrijf een uitgebreide beschrijving van dit platform..."
              />
            </div>

            {/* Website URL */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <label htmlFor="website_url" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                Website URL
              </label>
              <input
                type="url"
                id="website_url"
                name="website_url"
                value={formData.website_url}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Pros */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <h3 className="text-sm font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
                ✅ Voordelen (Pros)
              </h3>
              {formData.pros.map((pro, index) => (
                <div key={index} className="mb-3 flex gap-2">
                  <input
                    type="text"
                    value={pro}
                    onChange={(e) => handleArrayChange('pros', index, e.target.value)}
                    placeholder="Voeg een voordeel toe..."
                    className="flex-1 px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('pros', index)}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-heading font-semibold"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('pros')}
                className="w-full px-4 py-2 rounded-lg border-2 border-dashed border-background-gray text-sm font-heading font-semibold text-primary hover:border-primary hover:bg-primary/5 transition-colors"
              >
                + Voordeel toevoegen
              </button>
            </div>

            {/* Cons */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <h3 className="text-sm font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
                ❌ Nadelen (Cons)
              </h3>
              {formData.cons.map((con, index) => (
                <div key={index} className="mb-3 flex gap-2">
                  <input
                    type="text"
                    value={con}
                    onChange={(e) => handleArrayChange('cons', index, e.target.value)}
                    placeholder="Voeg een nadeel toe..."
                    className="flex-1 px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('cons', index)}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-heading font-semibold"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('cons')}
                className="w-full px-4 py-2 rounded-lg border-2 border-dashed border-background-gray text-sm font-heading font-semibold text-primary hover:border-primary hover:bg-primary/5 transition-colors"
              >
                + Nadeel toevoegen
              </button>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <h3 className="text-sm font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
                ⚡ Features
              </h3>
              {formData.features.map((feature, index) => (
                <div key={index} className="mb-3 flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleArrayChange('features', index, e.target.value)}
                    placeholder="Voeg een feature toe..."
                    className="flex-1 px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('features', index)}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-heading font-semibold"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('features')}
                className="w-full px-4 py-2 rounded-lg border-2 border-dashed border-background-gray text-sm font-heading font-semibold text-primary hover:border-primary hover:bg-primary/5 transition-colors"
              >
                + Feature toevoegen
              </button>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6 pb-32">
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
                    <option value="archived">📦 Gearchiveerd</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-background-gray text-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <label htmlFor="featured" className="text-sm font-heading font-semibold text-text-primary">
                    ⭐ Featured platform
                  </label>
                </div>
              </div>
            </div>

            {/* Classification */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <h3 className="text-sm font-heading font-semibold text-text-primary mb-4">
                Classificatie
              </h3>
              <div className="space-y-4">
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
                    <option value="General">General</option>
                    <option value="Premium">Premium</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="Writing">Writing</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Remote Jobs">Remote Jobs</option>
                    <option value="Local Services">Local Services</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="difficulty" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                    Moeilijkheidsgraad *
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="Easy">🟢 Easy</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Hard">🔴 Hard</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="rating" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="fees" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                    Kosten/Fees
                  </label>
                  <input
                    type="text"
                    id="fees"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    placeholder="bijv. 10-20%, Free"
                    className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="color" className="block text-sm font-heading font-semibold text-text-primary mb-2">
                    Brand Kleur
                  </label>
                  <input
                    type="color"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full h-10 rounded-lg border border-background-gray cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div className="bg-white rounded-lg shadow-sm border border-background-gray p-6">
              <ImageUpload
                value={formData.logo_url}
                onChange={(url) => setFormData(prev => ({ ...prev, logo_url: url }))}
                label="Platform Logo"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Action Buttons - Fixed at bottom of screen */}
            <div className="fixed bottom-0 right-0 lg:w-[calc((100%-2rem)/3)] bg-white pt-4 pb-4 px-6 border-t border-background-gray space-y-3 shadow-lg z-10">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-heading font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
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
                href="/platforms"
                className="block w-full px-6 py-3 rounded-lg bg-background-gray hover:bg-background-gray/80 text-text-primary font-heading font-semibold transition-colors text-center"
              >
                Annuleren
              </Link>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
