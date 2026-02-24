'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Briefcase, Users } from 'lucide-react';

type UserType = 'client' | 'freelancer';

export default function OnboardingPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<UserType | null>(null);

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);

    try {
      const res = await fetch('/api/auth/set-user-type', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userType: selected }),
      });

      if (!res.ok) {
        setLoading(false);
        return;
      }

      if (selected === 'freelancer') {
        router.push('/dashboard/seller');
      } else {
        router.push('/dashboard/projects');
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-lg">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-sm">
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2 text-center">
            {t('signUpAs')}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-8">
            {t('onboardingSubtitle')}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {/* Client / Buyer card */}
            <button
              type="button"
              onClick={() => setSelected('client')}
              className={`p-6 border-2 rounded-xl text-center transition-all ${
                selected === 'client'
                  ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                selected === 'client'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              }`}>
                <Users size={24} />
              </div>
              <span className="block font-semibold text-gray-900 dark:text-white mb-1">
                {t('client')}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                {t('clientDesc')}
              </p>
            </button>

            {/* Freelancer / Seller card */}
            <button
              type="button"
              onClick={() => setSelected('freelancer')}
              className={`p-6 border-2 rounded-xl text-center transition-all ${
                selected === 'freelancer'
                  ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className={`mx-auto w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                selected === 'freelancer'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              }`}>
                <Briefcase size={24} />
              </div>
              <span className="block font-semibold text-gray-900 dark:text-white mb-1">
                {t('freelancer')}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                {t('freelancerDesc')}
              </p>
            </button>
          </div>

          <button
            onClick={handleContinue}
            disabled={!selected || loading}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('loading')}
              </span>
            ) : (
              t('continue')
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
