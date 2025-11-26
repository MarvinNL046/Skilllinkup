'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ReviewFormProps {
  platformId: string;
  platformName: string;
  locale: string;
  onSubmitSuccess?: () => void;
}

export function ReviewForm({ platformId, platformName, locale, onSubmitSuccess }: ReviewFormProps) {
  const t = useTranslations('reviewForm');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    userName: '',
    userRole: '',
    title: '',
    content: '',
    overallRating: 5,
    easeOfUseRating: 5,
    supportRating: 5,
    valueRating: 5,
    pros: ['', '', ''],
    cons: ['', '', ''],
    projectType: '',
    earningsRange: '',
    yearsExperience: '',
  });

  const handleRatingChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProConChange = (type: 'pros' | 'cons', index: number, value: string) => {
    setFormData(prev => {
      const updated = [...prev[type]];
      updated[index] = value;
      return { ...prev, [type]: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platformId,
          locale,
          userName: formData.userName,
          userRole: formData.userRole || null,
          title: formData.title,
          content: formData.content,
          overallRating: formData.overallRating,
          easeOfUseRating: formData.easeOfUseRating,
          supportRating: formData.supportRating,
          valueRating: formData.valueRating,
          pros: formData.pros.filter(p => p.trim() !== ''),
          cons: formData.cons.filter(c => c.trim() !== ''),
          projectType: formData.projectType || null,
          earningsRange: formData.earningsRange || null,
          yearsExperience: formData.yearsExperience ? parseInt(formData.yearsExperience) : null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit review');
      }

      setIsSubmitted(true);
      onSubmitSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Star rating component
  const StarRating = ({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <svg
              className={`w-8 h-8 ${star <= value ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
              fill={star <= value ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 self-center">
          {value}/5
        </span>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-heading font-bold text-green-800 dark:text-green-300 mb-2">
          {t('thankYou')}
        </h3>
        <p className="text-green-700 dark:text-green-400">
          {t('reviewSubmitted')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-800 dark:text-red-300">
          {error}
        </div>
      )}

      {/* User Info */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('yourName')} *
          </label>
          <input
            type="text"
            id="userName"
            required
            value={formData.userName}
            onChange={(e) => handleInputChange('userName', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder={t('namePlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="userRole" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('yourRole')}
          </label>
          <input
            type="text"
            id="userRole"
            value={formData.userRole}
            onChange={(e) => handleInputChange('userRole', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder={t('rolePlaceholder')}
          />
        </div>
      </div>

      {/* Ratings */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
        <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">{t('ratings')}</h4>
        <div className="grid gap-6 sm:grid-cols-2">
          <StarRating
            label={t('overallRating')}
            value={formData.overallRating}
            onChange={(v) => handleRatingChange('overallRating', v)}
          />
          <StarRating
            label={t('easeOfUse')}
            value={formData.easeOfUseRating}
            onChange={(v) => handleRatingChange('easeOfUseRating', v)}
          />
          <StarRating
            label={t('support')}
            value={formData.supportRating}
            onChange={(v) => handleRatingChange('supportRating', v)}
          />
          <StarRating
            label={t('valueForMoney')}
            value={formData.valueRating}
            onChange={(v) => handleRatingChange('valueRating', v)}
          />
        </div>
      </div>

      {/* Review Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('reviewTitle')} *
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder={t('titlePlaceholder', { platform: platformName })}
        />
      </div>

      {/* Review Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('yourReview')} *
        </label>
        <textarea
          id="content"
          required
          rows={5}
          value={formData.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          placeholder={t('contentPlaceholder')}
        />
      </div>

      {/* Pros and Cons */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-green-700 dark:text-green-400 mb-2">
            {t('pros')}
          </label>
          {formData.pros.map((pro, index) => (
            <input
              key={index}
              type="text"
              value={pro}
              onChange={(e) => handleProConChange('pros', index, e.target.value)}
              className="w-full px-4 py-2 mb-2 border border-green-200 dark:border-green-800 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder={`${t('pro')} ${index + 1}`}
            />
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-red-700 dark:text-red-400 mb-2">
            {t('cons')}
          </label>
          {formData.cons.map((con, index) => (
            <input
              key={index}
              type="text"
              value={con}
              onChange={(e) => handleProConChange('cons', index, e.target.value)}
              className="w-full px-4 py-2 mb-2 border border-red-200 dark:border-red-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder={`${t('con')} ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('projectType')}
          </label>
          <select
            id="projectType"
            value={formData.projectType}
            onChange={(e) => handleInputChange('projectType', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">{t('selectProjectType')}</option>
            <option value="web-development">{t('projectTypes.webDev')}</option>
            <option value="design">{t('projectTypes.design')}</option>
            <option value="writing">{t('projectTypes.writing')}</option>
            <option value="marketing">{t('projectTypes.marketing')}</option>
            <option value="virtual-assistant">{t('projectTypes.va')}</option>
            <option value="other">{t('projectTypes.other')}</option>
          </select>
        </div>
        <div>
          <label htmlFor="earningsRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('earningsRange')}
          </label>
          <select
            id="earningsRange"
            value={formData.earningsRange}
            onChange={(e) => handleInputChange('earningsRange', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">{t('selectEarnings')}</option>
            <option value="0-1000">$0 - $1,000</option>
            <option value="1000-5000">$1,000 - $5,000</option>
            <option value="5000-10000">$5,000 - $10,000</option>
            <option value="10000-50000">$10,000 - $50,000</option>
            <option value="50000+">$50,000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('yearsExperience')}
          </label>
          <select
            id="yearsExperience"
            value={formData.yearsExperience}
            onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">{t('selectYears')}</option>
            <option value="1">1 {t('year')}</option>
            <option value="2">2 {t('years')}</option>
            <option value="3">3 {t('years')}</option>
            <option value="5">5+ {t('years')}</option>
            <option value="10">10+ {t('years')}</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent-dark text-white font-heading font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {t('submitting')}
          </>
        ) : (
          t('submitReview')
        )}
      </button>
    </form>
  );
}
