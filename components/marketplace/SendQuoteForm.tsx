'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SendQuoteFormProps {
  quoteRequestId: string;
  quoteRequestTitle: string;
}

export function SendQuoteForm({
  quoteRequestId,
  quoteRequestTitle,
}: SendQuoteFormProps) {
  const t = useTranslations('quotes');

  const [expanded, setExpanded] = useState(false);
  const [amount, setAmount] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('');
  const [description, setDescription] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum <= 0) {
      setError('Please enter a valid quote amount.');
      setLoading(false);
      return;
    }

    if (description.trim().length < 10) {
      setError('Description must be at least 10 characters.');
      setLoading(false);
      return;
    }

    const estimatedDaysNum = estimatedDays ? parseInt(estimatedDays, 10) : null;

    try {
      const res = await fetch(
        `/api/marketplace/quote-request/${quoteRequestId}/respond`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amountNum,
            currency: 'EUR',
            description: description.trim(),
            estimated_days: estimatedDaysNum,
            valid_until: validUntil || null,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to submit quote. Please try again.');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center gap-2 py-3 px-4 rounded-lg bg-accent/10 border border-accent/20">
        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
        <p className="text-sm font-medium text-accent">
          Quote submitted successfully!
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-100 dark:border-gray-700 mt-4 pt-4">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
      >
        {expanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
        {t('sendQuote')}
      </button>

      {expanded && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Amount */}
          <div>
            <label
              htmlFor={`amount-${quoteRequestId}`}
              className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t('quoteAmount')} <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
                €
              </span>
              <input
                id={`amount-${quoteRequestId}`}
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="250"
                required
                className="w-full pl-7 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Estimated days */}
          <div>
            <label
              htmlFor={`days-${quoteRequestId}`}
              className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t('estimatedDays')}
            </label>
            <input
              id={`days-${quoteRequestId}`}
              type="number"
              min="1"
              max="365"
              step="1"
              value={estimatedDays}
              onChange={(e) => setEstimatedDays(e.target.value)}
              placeholder="3"
              className="w-full px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor={`desc-${quoteRequestId}`}
              className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t('quoteDescription')} <span className="text-primary">*</span>
            </label>
            <textarea
              id={`desc-${quoteRequestId}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your approach and why you're the right choice..."
              rows={3}
              required
              className="w-full px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
            />
          </div>

          {/* Valid until */}
          <div>
            <label
              htmlFor={`valid-${quoteRequestId}`}
              className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t('validUntil')}
            </label>
            <input
              id={`valid-${quoteRequestId}`}
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('submitting')}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t('submitQuote')}
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
