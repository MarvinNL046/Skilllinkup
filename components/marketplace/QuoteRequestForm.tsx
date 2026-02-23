'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MapPin,
  Calendar,
  Tag,
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface QuoteRequestFormProps {
  categories: Category[];
  locale: string;
}

const BUDGET_OPTIONS = [
  { value: 'under_100', labelKey: 'under100' },
  { value: '100_500', labelKey: 'range100_500' },
  { value: '500_1000', labelKey: 'range500_1000' },
  { value: '1000_5000', labelKey: 'range1000_5000' },
  { value: 'over_5000', labelKey: 'over5000' },
] as const;

export function QuoteRequestForm({ categories, locale }: QuoteRequestFormProps) {
  const t = useTranslations('quotes');
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationPostcode, setLocationPostcode] = useState('');
  const [budgetIndication, setBudgetIndication] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (title.trim().length < 5) {
      setError('Title must be at least 5 characters.');
      setLoading(false);
      return;
    }

    if (description.trim().length < 10) {
      setError('Description must be at least 10 characters.');
      setLoading(false);
      return;
    }

    if (!categoryId) {
      setError('Please select a service category.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/marketplace/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          category_id: categoryId,
          location_city: locationCity.trim() || null,
          location_postcode: locationPostcode.trim() || null,
          location_country: 'NL',
          budget_indication: budgetIndication || null,
          preferred_date: preferredDate || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to submit quote request. Please try again.');
        return;
      }

      setCreatedId(data.quoteRequest?.id ?? null);
      setSuccess(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
          {t('submitted')}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
          {t('heroSubtitle')}
        </p>
        {createdId && (
          <button
            onClick={() => router.push(`/${locale}/marketplace/quote-request/${createdId}`)}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            {t('compareQuotes')}
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label
          htmlFor="qr-title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {t('requestTitle')} <span className="text-primary">*</span>
        </label>
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            id="qr-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('requestTitlePlaceholder')}
            required
            maxLength={255}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="qr-category"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {t('category')} <span className="text-primary">*</span>
        </label>
        <select
          id="qr-category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">{t('selectCategory')}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="qr-description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {t('description')} <span className="text-primary">*</span>
        </label>
        <textarea
          id="qr-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('descriptionPlaceholder')}
          rows={5}
          required
          className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        />
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {description.length} characters (min 10)
        </p>
      </div>

      {/* Location */}
      <div>
        <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('location')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              id="qr-city"
              type="text"
              value={locationCity}
              onChange={(e) => setLocationCity(e.target.value)}
              placeholder={t('city')}
              maxLength={255}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <input
            id="qr-postcode"
            type="text"
            value={locationPostcode}
            onChange={(e) => setLocationPostcode(e.target.value)}
            placeholder={t('postcode')}
            maxLength={20}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Budget Indication */}
      <div>
        <label
          htmlFor="qr-budget"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {t('budgetIndication')}
        </label>
        <select
          id="qr-budget"
          value={budgetIndication}
          onChange={(e) => setBudgetIndication(e.target.value)}
          className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">{t('selectBudget')}</option>
          {BUDGET_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {t(opt.labelKey)}
            </option>
          ))}
        </select>
      </div>

      {/* Preferred Date */}
      <div>
        <label
          htmlFor="qr-date"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {t('preferredDate')}
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            id="qr-date"
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t('submitting')}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {t('submitRequest')}
          </>
        )}
      </button>
    </form>
  );
}
