'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  Circle,
  Dot,
  Clock,
  CheckCircle2,
  PlusCircle,
  Trash2,
  ChevronRight,
} from 'lucide-react';

// ============================================================
// Types
// ============================================================

export interface Milestone {
  id: string;
  order_id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  due_date: string | null;
  status: 'pending' | 'active' | 'delivered' | 'approved';
  stripe_payment_intent_id: string | null;
  delivered_at: string | null;
  approved_at: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface MilestoneFormRow {
  title: string;
  description: string;
  amount: string;
  due_date: string;
}

interface MilestoneTrackerProps {
  orderId: string;
  orderAmount: number;
  currency: string;
  /** 'client' or 'freelancer' - controls which action buttons are shown */
  role: 'client' | 'freelancer';
}

// ============================================================
// Helpers
// ============================================================

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// ============================================================
// Status icon
// ============================================================

function StatusIcon({ status }: { status: Milestone['status'] }) {
  switch (status) {
    case 'pending':
      return <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />;
    case 'active':
      return <Dot className="w-5 h-5 text-blue-500 flex-shrink-0" />;
    case 'delivered':
      return <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0" />;
    case 'approved':
      return <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />;
    default:
      return <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />;
  }
}

// ============================================================
// Status badge
// ============================================================

function StatusBadge({ status, t }: { status: Milestone['status']; t: (k: string) => string }) {
  const styleMap: Record<Milestone['status'], string> = {
    pending: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
    active: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    delivered: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    approved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styleMap[status]}`}
    >
      {t(status)}
    </span>
  );
}

// ============================================================
// Main component
// ============================================================

export function MilestoneTracker({
  orderId,
  orderAmount,
  currency,
  role,
}: MilestoneTrackerProps) {
  const t = useTranslations('milestones');

  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Create milestones form state
  const [showForm, setShowForm] = useState(false);
  const [formRows, setFormRows] = useState<MilestoneFormRow[]>([
    { title: '', description: '', amount: '', due_date: '' },
  ]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // --------------------------------------------------------
  // Fetch milestones
  // --------------------------------------------------------

  const fetchMilestones = useCallback(async () => {
    try {
      const res = await fetch(`/api/marketplace/orders/${orderId}/milestones`, {
        cache: 'no-store',
      });
      if (!res.ok) return;
      const data = (await res.json()) as { milestones: Milestone[] };
      setMilestones(data.milestones ?? []);
    } catch {
      // silently ignore fetch errors
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchMilestones();
  }, [fetchMilestones]);

  // --------------------------------------------------------
  // Action: freelancer delivers a milestone
  // --------------------------------------------------------

  const handleDeliver = async (milestoneId: string) => {
    setActionLoading(milestoneId);
    setError(null);
    try {
      const res = await fetch(
        `/api/marketplace/orders/${orderId}/milestones/${milestoneId}/deliver`,
        { method: 'POST' }
      );
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? 'Failed to deliver milestone');
        return;
      }
      await fetchMilestones();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  // --------------------------------------------------------
  // Action: client approves a milestone
  // --------------------------------------------------------

  const handleApprove = async (milestoneId: string) => {
    setActionLoading(milestoneId);
    setError(null);
    try {
      const res = await fetch(
        `/api/marketplace/orders/${orderId}/milestones/${milestoneId}/approve`,
        { method: 'POST' }
      );
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? 'Failed to approve milestone');
        return;
      }
      await fetchMilestones();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  // --------------------------------------------------------
  // Form helpers
  // --------------------------------------------------------

  const addFormRow = () => {
    setFormRows((prev) => [...prev, { title: '', description: '', amount: '', due_date: '' }]);
  };

  const removeFormRow = (index: number) => {
    setFormRows((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFormRow = (index: number, field: keyof MilestoneFormRow, value: string) => {
    setFormRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  // --------------------------------------------------------
  // Computed totals for the form
  // --------------------------------------------------------

  const formTotal = formRows.reduce((sum, row) => {
    const parsed = parseFloat(row.amount);
    return sum + (isNaN(parsed) ? 0 : parsed);
  }, 0);

  const remaining = Math.round((orderAmount - formTotal) * 100) / 100;
  const amountMatches = Math.abs(remaining) < 0.01;

  // --------------------------------------------------------
  // Save milestones
  // --------------------------------------------------------

  const handleSave = async () => {
    setFormError(null);

    // Validate
    for (const row of formRows) {
      if (!row.title.trim()) {
        setFormError('Each milestone must have a title.');
        return;
      }
      const parsed = parseFloat(row.amount);
      if (isNaN(parsed) || parsed <= 0) {
        setFormError('Each milestone must have a positive amount.');
        return;
      }
    }

    if (!amountMatches) {
      setFormError(t('amountMismatch'));
      return;
    }

    setSaving(true);
    try {
      const body = {
        milestones: formRows.map((row) => ({
          title: row.title.trim(),
          description: row.description.trim() || undefined,
          amount: parseFloat(row.amount),
          due_date: row.due_date || undefined,
        })),
      };

      const res = await fetch(`/api/marketplace/orders/${orderId}/milestones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setFormError(data.error ?? 'Failed to save milestones');
        return;
      }

      // Refresh and hide form
      await fetchMilestones();
      setShowForm(false);
    } catch {
      setFormError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------------
  // Progress calculation
  // --------------------------------------------------------

  const approvedCount = milestones.filter((m) => m.status === 'approved').length;
  const totalCount = milestones.length;
  const progressPercent = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;

  // --------------------------------------------------------
  // Render
  // --------------------------------------------------------

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-6 h-6 border-2 border-[#ef2b70] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const hasMilestones = milestones.length > 0;

  return (
    <div className="space-y-6">
      {/* Header + progress bar */}
      {hasMilestones && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-heading font-semibold text-gray-900 dark:text-white">
              {t('progress')}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {approvedCount}/{totalCount}
            </span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#22c55e] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Global action error */}
      {error && (
        <div className="px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Milestones list */}
      {hasMilestones ? (
        <ol className="space-y-3">
          {milestones.map((milestone, index) => {
            const isActionLoading = actionLoading === milestone.id;

            return (
              <li
                key={milestone.id}
                className={[
                  'relative flex gap-4 rounded-xl border p-4 transition-colors',
                  milestone.status === 'active'
                    ? 'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/10'
                    : milestone.status === 'approved'
                    ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10'
                    : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800/50',
                ].join(' ')}
              >
                {/* Step number + connector line */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    {index + 1}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 min-h-[16px]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Title row */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <StatusIcon status={milestone.status} />
                      <span className="font-medium text-gray-900 dark:text-white truncate">
                        {milestone.title}
                      </span>
                    </div>
                    <StatusBadge status={milestone.status} t={t} />
                  </div>

                  {/* Description */}
                  {milestone.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {milestone.description}
                    </p>
                  )}

                  {/* Amount + due date row */}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <span className="font-semibold text-[#ef2b70]">
                      {formatCurrency(milestone.amount, milestone.currency)}
                    </span>
                    {milestone.due_date && (
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <ChevronRight className="w-3.5 h-3.5" />
                        {formatDate(milestone.due_date)}
                      </span>
                    )}
                    {milestone.approved_at && (
                      <span className="text-green-600 dark:text-green-400 text-xs">
                        Approved {formatDate(milestone.approved_at)}
                      </span>
                    )}
                    {milestone.delivered_at && milestone.status === 'delivered' && (
                      <span className="text-yellow-600 dark:text-yellow-400 text-xs">
                        Delivered {formatDate(milestone.delivered_at)}
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-1">
                    {/* Freelancer: mark active milestone as delivered */}
                    {role === 'freelancer' && milestone.status === 'active' && (
                      <button
                        onClick={() => handleDeliver(milestone.id)}
                        disabled={isActionLoading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ef2b70] hover:bg-[#d4235f] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-medium transition-colors"
                      >
                        {isActionLoading ? (
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {t('markDelivered')}
                      </button>
                    )}

                    {/* Client: approve a delivered milestone */}
                    {role === 'client' && milestone.status === 'delivered' && (
                      <button
                        onClick={() => handleApprove(milestone.id)}
                        disabled={isActionLoading}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-medium transition-colors"
                      >
                        {isActionLoading ? (
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                        {t('approve')}
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        /* No milestones yet */
        <div className="flex flex-col items-center justify-center py-10 text-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 gap-3">
          <Circle className="w-10 h-10 text-gray-300 dark:text-gray-600" />
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {t('noMilestones')}
          </p>
          {role === 'client' && !showForm && (
            <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs">
              {t('clientCreatePrompt')}
            </p>
          )}
        </div>
      )}

      {/* Create milestones form (client only, when no milestones exist) */}
      {role === 'client' && !hasMilestones && (
        <div className="space-y-4">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-[#ef2b70]/40 hover:border-[#ef2b70] text-[#ef2b70] hover:bg-[#ef2b70]/5 transition-colors text-sm font-medium"
            >
              <PlusCircle className="w-4 h-4" />
              {t('createMilestones')}
            </button>
          ) : (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Form header */}
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-heading font-semibold text-sm text-gray-900 dark:text-white">
                  {t('createMilestones')}
                </h4>
              </div>

              {/* Milestone rows */}
              <div className="p-4 space-y-4">
                {formError && (
                  <div className="px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
                    {formError}
                  </div>
                )}

                {formRows.map((row, index) => (
                  <div
                    key={index}
                    className="space-y-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                  >
                    {/* Row header */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Milestone {index + 1}
                      </span>
                      {formRows.length > 1 && (
                        <button
                          onClick={() => removeFormRow(index)}
                          className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          {t('removeMilestone')}
                        </button>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {t('milestoneTitle')} *
                      </label>
                      <input
                        type="text"
                        value={row.title}
                        onChange={(e) => updateFormRow(index, 'title', e.target.value)}
                        placeholder="e.g. Initial Design Draft"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ef2b70]/30 focus:border-[#ef2b70] transition-colors"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {t('description')}
                      </label>
                      <textarea
                        value={row.description}
                        onChange={(e) => updateFormRow(index, 'description', e.target.value)}
                        placeholder="Describe what will be delivered..."
                        rows={2}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ef2b70]/30 focus:border-[#ef2b70] transition-colors resize-none"
                      />
                    </div>

                    {/* Amount + Due date row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {t('amount')} *
                        </label>
                        <input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={row.amount}
                          onChange={(e) => updateFormRow(index, 'amount', e.target.value)}
                          placeholder="0.00"
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ef2b70]/30 focus:border-[#ef2b70] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {t('dueDate')}
                        </label>
                        <input
                          type="date"
                          value={row.due_date}
                          onChange={(e) => updateFormRow(index, 'due_date', e.target.value)}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ef2b70]/30 focus:border-[#ef2b70] transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add milestone button */}
                <button
                  onClick={addFormRow}
                  className="flex items-center gap-2 text-sm text-[#ef2b70] hover:text-[#d4235f] font-medium transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  {t('addMilestone')}
                </button>

                {/* Running total */}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{t('totalAmount')}</span>
                    <span
                      className={`font-semibold ${
                        amountMatches
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {formatCurrency(formTotal, currency)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {t('remainingAmount')}
                    </span>
                    <span
                      className={`font-semibold ${
                        remaining === 0
                          ? 'text-green-600 dark:text-green-400'
                          : remaining < 0
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {formatCurrency(remaining < 0 ? Math.abs(remaining) : remaining, currency)}
                      {remaining < 0 && ' (over)'}
                    </span>
                  </div>
                  {!amountMatches && formTotal > 0 && (
                    <p className="text-xs text-red-500 dark:text-red-400">
                      {t('amountMismatch')}: {formatCurrency(orderAmount, currency)}
                    </p>
                  )}
                </div>

                {/* Form actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={saving || !amountMatches}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#ef2b70] hover:bg-[#d4235f] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
                  >
                    {saving ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t('saving')}
                      </>
                    ) : (
                      t('saveMilestones')
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setFormError(null);
                    }}
                    disabled={saving}
                    className="px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium transition-colors disabled:opacity-60"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
