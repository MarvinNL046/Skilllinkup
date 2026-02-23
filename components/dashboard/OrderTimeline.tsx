'use client';

import { useTranslations } from 'next-intl';
import { Check, Circle, Clock } from 'lucide-react';

interface OrderTimelineProps {
  status: string;
  createdAt: string;
  completedAt: string | null;
  deliveryDeadline: string | null;
}

type StepStatus = 'done' | 'current' | 'upcoming';

interface TimelineStep {
  key: string;
  labelKey: string;
  status: StepStatus;
  date?: string;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Determine timeline steps and their statuses based on the order's current status.
 *
 * Order lifecycle:
 *   pending -> active -> delivered -> completed
 *                          |
 *                          v
 *                       revision -> delivered -> completed
 */
function buildSteps(
  status: string,
  createdAt: string,
  completedAt: string | null,
  deliveryDeadline: string | null
): TimelineStep[] {
  // Map order status to which step index is "current"
  const STATUS_STEP: Record<string, number> = {
    pending: 0,
    active: 1,
    delivered: 2,
    revision: 2,
    completed: 3,
    cancelled: -1,
    disputed: 2,
  };

  const currentStep = STATUS_STEP[status] ?? 0;

  const steps: Array<{ key: string; labelKey: string; date?: string }> = [
    { key: 'created', labelKey: 'orderCreated', date: createdAt },
    { key: 'payment', labelKey: 'paymentReceived', date: createdAt },
    {
      key: 'inprogress',
      labelKey: status === 'revision' ? 'revisionRequested' : status === 'delivered' ? 'delivered' : 'inProgress',
      date: status === 'delivered' || status === 'revision' || status === 'completed' ? deliveryDeadline ?? undefined : undefined,
    },
    {
      key: 'completed',
      labelKey: 'completed',
      date: completedAt ?? undefined,
    },
  ];

  return steps.map((step, index) => {
    let stepStatus: StepStatus;
    if (status === 'cancelled') {
      stepStatus = index === 0 ? 'done' : 'upcoming';
    } else if (index < currentStep) {
      stepStatus = 'done';
    } else if (index === currentStep) {
      stepStatus = 'current';
    } else {
      stepStatus = 'upcoming';
    }
    return { ...step, status: stepStatus };
  });
}

export function OrderTimeline({
  status,
  createdAt,
  completedAt,
  deliveryDeadline,
}: OrderTimelineProps) {
  const t = useTranslations('orders');
  const steps = buildSteps(status, createdAt, completedAt, deliveryDeadline);

  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
        <Circle size={16} className="text-red-500" />
        <span className="text-sm font-medium text-red-700 dark:text-red-400">
          {t('cancelled')}
        </span>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="space-y-0">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <div key={step.key} className="flex gap-4">
              {/* Icon column */}
              <div className="flex flex-col items-center">
                <div
                  className={[
                    'flex items-center justify-center w-8 h-8 rounded-full border-2 flex-shrink-0 transition-colors',
                    step.status === 'done'
                      ? 'bg-green-500 border-green-500'
                      : step.status === 'current'
                      ? 'bg-primary border-primary'
                      : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600',
                  ].join(' ')}
                >
                  {step.status === 'done' ? (
                    <Check size={14} className="text-white" />
                  ) : step.status === 'current' ? (
                    <Clock size={14} className="text-white" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                  )}
                </div>
                {!isLast && (
                  <div
                    className={[
                      'w-0.5 flex-1 my-1',
                      step.status === 'done'
                        ? 'bg-green-400 dark:bg-green-600'
                        : 'bg-gray-200 dark:bg-gray-700',
                    ].join(' ')}
                    style={{ minHeight: '2rem' }}
                  />
                )}
              </div>

              {/* Content column */}
              <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
                <p
                  className={[
                    'text-sm font-medium leading-8',
                    step.status === 'done'
                      ? 'text-gray-900 dark:text-white'
                      : step.status === 'current'
                      ? 'text-primary font-semibold'
                      : 'text-gray-400 dark:text-gray-500',
                  ].join(' ')}
                >
                  {t(step.labelKey as Parameters<typeof t>[0])}
                </p>
                {step.date && step.status !== 'upcoming' && (
                  <p className="text-xs text-gray-400 dark:text-gray-500 -mt-1">
                    {formatDate(step.date)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
