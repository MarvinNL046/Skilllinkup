'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle, Clock, AlertTriangle, Link as LinkIcon, FileText } from 'lucide-react';

interface EvidenceItem {
  type: 'text' | 'url';
  content: string;
}

interface Dispute {
  id: string;
  order_id: string;
  opened_by: string;
  reason: string;
  description: string;
  evidence: EvidenceItem[];
  resolution: string | null;
  resolution_note: string | null;
  resolved_by: string | null;
  status: string;
  opened_at: string;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

interface DisputeTimelineProps {
  dispute: Dispute;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    open: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    under_review:
      'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    resolved:
      'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  };

  const t = useTranslations('disputes');

  const labels: Record<string, string> = {
    open: t('open'),
    under_review: t('underReview'),
    resolved: t('resolved'),
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
        styles[status] ?? styles.open
      }`}
    >
      {labels[status] ?? status}
    </span>
  );
}

function ResolutionLabel({ resolution }: { resolution: string }) {
  const t = useTranslations('disputes');

  const labels: Record<string, string> = {
    full_refund: t('fullRefund'),
    partial_refund: t('partialRefund'),
    release_to_freelancer: t('releaseToFreelancer'),
    mutual_cancellation: t('mutualCancellation'),
  };

  return (
    <span className="font-medium text-gray-900 dark:text-white">
      {labels[resolution] ?? resolution}
    </span>
  );
}

const STEP_ORDER = ['open', 'under_review', 'resolved'] as const;

function getStepIndex(status: string): number {
  const idx = STEP_ORDER.indexOf(status as (typeof STEP_ORDER)[number]);
  return idx === -1 ? 0 : idx;
}

export function DisputeTimeline({ dispute }: DisputeTimelineProps) {
  const t = useTranslations('disputes');
  const currentStep = getStepIndex(dispute.status);

  const steps = [
    { key: 'open', label: t('open'), icon: AlertTriangle },
    { key: 'under_review', label: t('underReview'), icon: Clock },
    { key: 'resolved', label: t('resolved'), icon: CheckCircle },
  ];

  const reasonLabels: Record<string, string> = {
    not_delivered: t('notDelivered'),
    poor_quality: t('poorQuality'),
    not_as_described: t('notAsDescribed'),
    communication: t('communication'),
    other: t('other'),
  };

  return (
    <div className="space-y-6">
      {/* Status header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{t('status')}</p>
          <StatusBadge status={dispute.status} />
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 dark:text-gray-500">{t('openedOn')}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {formatDate(dispute.opened_at)}
          </p>
        </div>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-0">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div key={step.key} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                  }`}
                >
                  <Icon size={15} />
                </div>
                <span
                  className={`mt-1.5 text-xs font-medium ${
                    isCompleted || isCurrent
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 mb-4 transition-colors ${
                    idx < currentStep
                      ? 'bg-green-400'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Dispute details */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{t('reason')}</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {reasonLabels[dispute.reason] ?? dispute.reason}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{t('description')}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {dispute.description}
          </p>
        </div>
      </div>

      {/* Evidence */}
      {dispute.evidence && dispute.evidence.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            {t('evidence')}
          </p>
          <div className="space-y-2">
            {dispute.evidence.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
              >
                {item.type === 'url' ? (
                  <LinkIcon size={15} className="text-primary flex-shrink-0 mt-0.5" />
                ) : (
                  <FileText size={15} className="text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                )}
                {item.type === 'url' ? (
                  <a
                    href={item.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline break-all"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {item.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resolution */}
      {dispute.status === 'resolved' && dispute.resolution && (
        <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            {t('resolution')}
          </p>
          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle size={15} className="text-green-500 flex-shrink-0" />
              <ResolutionLabel resolution={dispute.resolution} />
            </div>
            {dispute.resolution_note && (
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                  {t('resolutionNote')}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {dispute.resolution_note}
                </p>
              </div>
            )}
            {dispute.resolved_at && (
              <p className="text-xs text-gray-400 dark:text-gray-500">
                {t('resolvedOn')} {formatDate(dispute.resolved_at)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
