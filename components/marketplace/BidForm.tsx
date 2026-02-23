'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { AuthGate } from '@/components/AuthGate';

interface BidFormProps {
  projectId: string;
  currency?: string;
}

export function BidForm({ projectId, currency = 'EUR' }: BidFormProps) {
  const t = useTranslations('projects');

  const [amount, setAmount] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('');
  const [pitch, setPitch] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const amountNum = parseFloat(amount);
    const deliveryNum = parseInt(deliveryDays, 10);

    if (!amountNum || amountNum <= 0) {
      setError('Please enter a valid bid amount.');
      setLoading(false);
      return;
    }
    if (!deliveryNum || deliveryNum <= 0) {
      setError('Please enter a valid delivery time.');
      setLoading(false);
      return;
    }
    if (!pitch.trim() || pitch.trim().length < 20) {
      setError('Your pitch must be at least 20 characters.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/marketplace/projects/${projectId}/bid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountNum,
          currency,
          delivery_days: deliveryNum,
          pitch: pitch.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to submit bid. Please try again.');
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
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <CheckCircle className="w-12 h-12 text-accent mb-3" />
        <p className="text-base font-semibold text-gray-900 dark:text-white">
          {t('bidSubmitted')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          The client will be notified and may reach out to you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Bid amount */}
      <div>
        <label
          htmlFor="bid-amount"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {t('bidAmount')}
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
            {currency === 'EUR' ? '€' : currency === 'USD' ? '$' : currency}
          </span>
          <input
            id="bid-amount"
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="500"
            required
            className="w-full pl-8 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Delivery days */}
      <div>
        <label
          htmlFor="delivery-days"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {t('deliveryDays')}
        </label>
        <input
          id="delivery-days"
          type="number"
          min="1"
          max="365"
          step="1"
          value={deliveryDays}
          onChange={(e) => setDeliveryDays(e.target.value)}
          placeholder="7"
          required
          className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Pitch */}
      <div>
        <label
          htmlFor="bid-pitch"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >
          {t('pitch')}
        </label>
        <textarea
          id="bid-pitch"
          value={pitch}
          onChange={(e) => setPitch(e.target.value)}
          placeholder={t('pitchPlaceholder')}
          rows={4}
          required
          className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        />
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {pitch.length} characters (min 20)
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Submit */}
      <AuthGate>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {t('submitBid')}
            </>
          )}
        </button>
      </AuthGate>
    </form>
  );
}
