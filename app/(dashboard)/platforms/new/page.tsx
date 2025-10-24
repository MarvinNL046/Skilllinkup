'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ImageUpload from '../../../../components/ImageUpload';

const RichTextEditor = dynamic(() => import('../../../../components/RichTextEditor'), {
  ssr: false,
  loading: () => <p className="p-4 text-text-muted">Editor laden...</p>,
});

export default function NewPlatformPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    // Affiliate fields
    affiliate_link: '',
    commission_type: 'fixed',
    commission_value: '',
    cookie_duration: 30,
    avg_affiliate_earnings: 0,
    unique_benefits: [''],
    automation_status: 'pending',
  });

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

    // Auto-generate slug from name
    if (name === 'name') {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
      }));
    }
  };

  const handleArrayChange = (
    field: 'pros' | 'cons' | 'features' | 'unique_benefits',
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'pros' | 'cons' | 'features' | 'unique_benefits') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field: 'pros' | 'cons' | 'features' | 'unique_benefits', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Filter out empty strings from arrays
      const cleanData = {
        ...formData,
        pros: formData.pros.filter((p) => p.trim() !== ''),
        cons: formData.cons.filter((c) => c.trim() !== ''),
        features: formData.features.filter((f) => f.trim() !== ''),
        unique_benefits: formData.unique_benefits.filter((b) => b.trim() !== ''),
      };

      const response = await fetch('/api/platforms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanData),
      });

      if (response.ok) {
        alert('Platform created successfully!');
        router.push('/platforms');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to create platform'}`);
      }
    } catch (error) {
      console.error('Error creating platform:', error);
      alert('Error creating platform');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/platforms"
          className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to Platforms
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Platform</h1>
        <p className="mt-2 text-sm text-gray-600">
          Fill in the details below to add a new freelance platform
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Basic Information</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Platform Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Upwork"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., upwork"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <RichTextEditor
                content={formData.description}
                onChange={(html) => setFormData({ ...formData, description: html })}
                placeholder="Schrijf een uitgebreide beschrijving van dit platform..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Website URL
              </label>
              <input
                type="url"
                name="website_url"
                value={formData.website_url}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Classification</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
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
              <label className="block text-sm font-medium text-gray-700">
                Difficulty *
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rating (0-5)
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fees
              </label>
              <input
                type="text"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., 5-20%"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brand Color
              </label>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="mt-1 block h-10 w-full rounded-lg border border-gray-300"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">
                Featured Platform
              </label>
            </div>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Platform Logo</h2>
          <ImageUpload
            value={formData.logo_url}
            onChange={(url) => setFormData(prev => ({ ...prev, logo_url: url }))}
            label="Upload Platform Logo"
          />
          {formData.logo_url && (
            <p className="mt-2 text-sm text-gray-600">
              Preview: <span className="font-mono text-xs">{formData.logo_url}</span>
            </p>
          )}
        </div>

        {/* Pros */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Pros</h2>
          {formData.pros.map((pro, index) => (
            <div key={index} className="mb-3 flex gap-2">
              <input
                type="text"
                value={pro}
                onChange={(e) => handleArrayChange('pros', index, e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter a pro"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('pros', index)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('pros')}
            className="mt-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            + Add Pro
          </button>
        </div>

        {/* Cons */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Cons</h2>
          {formData.cons.map((con, index) => (
            <div key={index} className="mb-3 flex gap-2">
              <input
                type="text"
                value={con}
                onChange={(e) => handleArrayChange('cons', index, e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter a con"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('cons', index)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('cons')}
            className="mt-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            + Add Con
          </button>
        </div>

        {/* Features */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Features</h2>
          {formData.features.map((feature, index) => (
            <div key={index} className="mb-3 flex gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleArrayChange('features', index, e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter a feature"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('features', index)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('features')}
            className="mt-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            + Add Feature
          </button>
        </div>

        {/* Affiliate Settings */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">💰 Affiliate Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Affiliate Link (Short.io)</label>
              <input
                type="url"
                name="affiliate_link"
                value={formData.affiliate_link}
                onChange={handleChange}
                placeholder="https://go.skilllinkup.com/upwork"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Commission Type</label>
                <select
                  name="commission_type"
                  value={formData.commission_type}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="fixed">💵 Fixed</option>
                  <option value="percentage">📊 Percentage</option>
                  <option value="recurring">🔄 Recurring</option>
                  <option value="cpa">🎯 CPA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Commission Value</label>
                <input
                  type="text"
                  name="commission_value"
                  value={formData.commission_value}
                  onChange={handleChange}
                  placeholder="$150, 30%, etc."
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cookie Duration (days)</label>
                <input
                  type="number"
                  name="cookie_duration"
                  value={formData.cookie_duration}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Avg. Earnings/Year ($)</label>
                <input
                  type="number"
                  name="avg_affiliate_earnings"
                  value={formData.avg_affiliate_earnings}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="1200.00"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Unique Benefits */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">⭐ Unique Benefits (USPs)</h2>
          {formData.unique_benefits.map((benefit, index) => (
            <div key={index} className="mb-3 flex gap-2">
              <input
                type="text"
                value={benefit}
                onChange={(e) => handleArrayChange('unique_benefits', index, e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Dedicated account manager"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('unique_benefits', index)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('unique_benefits')}
            className="mt-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            + Add Benefit
          </button>
        </div>

        {/* Publishing */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Publishing</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500 md:w-1/3"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <Link
            href="/platforms"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Platform'}
          </button>
        </div>
      </form>
    </div>
  );
}
