'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AlertTriangle, Plus, Trash2, Link as LinkIcon, FileText } from 'lucide-react';

interface EvidenceItem {
  type: 'text' | 'url';
  content: string;
}

interface DisputeFormProps {
  orderId: string;
  locale: string;
}

export function DisputeForm({ orderId, locale }: DisputeFormProps) {
  const t = useTranslations('disputes');
  const router = useRouter();

  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const reasons = [
    { value: 'not_delivered', label: t('notDelivered') },
    { value: 'poor_quality', label: t('poorQuality') },
    { value: 'not_as_described', label: t('notAsDescribed') },
    { value: 'communication', label: t('communication') },
    { value: 'other', label: t('other') },
  ];

  function addEvidence(type: 'text' | 'url') {
    setEvidence((prev) => [...prev, { type, content: '' }]);
  }

  function updateEvidence(index: number, content: string) {
    setEvidence((prev) =>
      prev.map((item, i) => (i === index ? { ...item, content } : item))
    );
  }

  function removeEvidence(index: number) {
    setEvidence((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reason || !description.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      const validEvidence = evidence.filter((item) => item.content.trim().length > 0);

      const res = await fetch(`/api/marketplace/orders/${orderId}/dispute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason,
          description: description.trim(),
          evidence: validEvidence,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to submit dispute');
      } else {
        setSuccess(true);
        router.refresh();
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-3">
          <AlertTriangle size={22} className="text-green-600 dark:text-green-400" />
        </div>
        <p className="text-green-700 dark:text-green-400 font-medium">{t('submitted')}</p>
        <button
          onClick={() => router.push(`/${locale}/dashboard/orders/${orderId}`)}
          className="mt-4 text-sm text-green-700 dark:text-green-400 underline underline-offset-2 hover:no-underline"
        >
          Back to order
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Warning banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800">
        <AlertTriangle
          size={18}
          className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5"
        />
        <p className="text-sm text-yellow-700 dark:text-yellow-400">{t('warning')}</p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Reason */}
      <div>
        <label
          htmlFor="dispute-reason"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('reason')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          id="dispute-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          <option value="">{t('selectReason')}</option>
          {reasons.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="dispute-description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('description')}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <textarea
          id="dispute-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('descriptionPlaceholder')}
          required
          rows={5}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
        />
      </div>

      {/* Evidence */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('evidence')}
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => addEvidence('text')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <FileText size={13} />
              {t('evidenceText')}
            </button>
            <button
              type="button"
              onClick={() => addEvidence('url')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <LinkIcon size={13} />
              {t('evidenceUrl')}
            </button>
          </div>
        </div>

        {evidence.length === 0 && (
          <p className="text-xs text-gray-400 dark:text-gray-500 italic py-2">
            {t('addEvidence')} — optional
          </p>
        )}

        <div className="space-y-3">
          {evidence.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  {item.type === 'url' ? (
                    <LinkIcon size={13} className="text-gray-400 dark:text-gray-500" />
                  ) : (
                    <FileText size={13} className="text-gray-400 dark:text-gray-500" />
                  )}
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {item.type === 'url' ? t('evidenceUrl') : t('evidenceText')}
                  </span>
                </div>
                {item.type === 'url' ? (
                  <input
                    type="url"
                    value={item.content}
                    onChange={(e) => updateEvidence(index, e.target.value)}
                    placeholder="https://"
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                ) : (
                  <textarea
                    value={item.content}
                    onChange={(e) => updateEvidence(index, e.target.value)}
                    placeholder="Describe this piece of evidence..."
                    rows={2}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => removeEvidence(index)}
                className="mt-5 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                aria-label="Remove evidence"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        {evidence.length < 5 && (
          <button
            type="button"
            onClick={() => addEvidence('text')}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            <Plus size={13} />
            {t('addEvidence')}
          </button>
        )}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting || !reason || !description.trim()}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? t('submitting') : t('submit')}
        </button>
      </div>
    </form>
  );
}
