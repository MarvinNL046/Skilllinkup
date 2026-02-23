'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface SignUpFormProps {
  locale: string;
}

type UserType = 'client' | 'freelancer';

export function SignUpForm({ locale }: SignUpFormProps) {
  const t = useTranslations('auth');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('freelancer');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError('');
    try {
      await signIn('google', { callbackUrl: `/${locale}/dashboard` });
    } catch {
      setError(t('invalidCredentials'));
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          userType,
        }),
      });

      if (response.status === 409) {
        setError(t('emailExists'));
        setLoading(false);
        return;
      }

      if (response.status === 400) {
        const data = await response.json();
        setError(data.error || t('invalidCredentials'));
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setError(t('invalidCredentials'));
        setLoading(false);
        return;
      }

      setSuccess(t('signUpSuccess'));
      setLoading(false);

      // Redirect to sign-in after short delay
      setTimeout(() => {
        window.location.href = `/${locale}/auth/signin`;
      }, 1500);
    } catch {
      setError(t('invalidCredentials'));
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-sm">
        <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 text-center">
          {t('signUp')}
        </h1>

        {/* Google Sign Up */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {t('continueWithGoogle')}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-sm text-gray-500 dark:text-gray-400">{t('or')}</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-sm text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="mb-4 px-4 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-sm text-sm text-green-600 dark:text-green-400">
            {success}
          </div>
        )}

        {/* Sign-up form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t('fullName')}
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-secondary-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
              placeholder="Jan de Vries"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t('email')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-secondary-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t('password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-secondary-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t('confirmPassword')}
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-secondary-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* User type selector */}
          <div>
            <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('signUpAs')}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* Client card */}
              <button
                type="button"
                onClick={() => setUserType('client')}
                className={`p-4 border-2 rounded-sm text-left transition-colors ${
                  userType === 'client'
                    ? 'border-primary bg-primary/5 dark:bg-primary/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      userType === 'client'
                        ? 'border-primary'
                        : 'border-gray-400 dark:border-gray-500'
                    }`}
                  >
                    {userType === 'client' && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="font-medium text-sm text-gray-900 dark:text-white">
                    {t('client')}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                  {t('clientDesc')}
                </p>
              </button>

              {/* Freelancer card */}
              <button
                type="button"
                onClick={() => setUserType('freelancer')}
                className={`p-4 border-2 rounded-sm text-left transition-colors ${
                  userType === 'freelancer'
                    ? 'border-primary bg-primary/5 dark:bg-primary/10'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      userType === 'freelancer'
                        ? 'border-primary'
                        : 'border-gray-400 dark:border-gray-500'
                    }`}
                  >
                    {userType === 'freelancer' && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="font-medium text-sm text-gray-900 dark:text-white">
                    {t('freelancer')}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                  {t('freelancerDesc')}
                </p>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('signUp')}
              </span>
            ) : (
              t('signUp')
            )}
          </button>
        </form>

        {/* Link to sign-in */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          {t('hasAccount')}{' '}
          <Link
            href={`/${locale}/auth/signin`}
            className="text-primary hover:underline font-medium"
          >
            {t('signIn')}
          </Link>
        </p>
      </div>
    </div>
  );
}
