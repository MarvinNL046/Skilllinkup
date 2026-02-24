'use client';

import { useState, KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import { X, Plus } from 'lucide-react';

interface ProfileData {
 id?: string;
 display_name: string;
 tagline: string;
 bio: string;
 hourly_rate: string;
 work_type: 'remote' | 'local' | 'hybrid';
 location_city: string;
 location_country: string;
 location_postcode: string;
 service_radius_km: string;
 skills: string[];
 languages: string[];
 website_url: string;
 linkedin_url: string;
}

interface ProfileFormProps {
 initialData?: Partial<ProfileData>| null;
}

const DEFAULT_FORM: ProfileData = {
 display_name: '',
 tagline: '',
 bio: '',
 hourly_rate: '',
 work_type: 'remote',
 location_city: '',
 location_country: '',
 location_postcode: '',
 service_radius_km: '',
 skills: [],
 languages: [],
 website_url: '',
 linkedin_url: '',
};

export function ProfileForm({ initialData }: ProfileFormProps) {
 const t = useTranslations('dashboard.profileForm');

 const [form, setForm] = useState<ProfileData>({
 ...DEFAULT_FORM,
 ...(initialData
 ? {
 id: initialData.id,
 display_name: initialData.display_name ?? '',
 tagline: initialData.tagline ?? '',
 bio: initialData.bio ?? '',
 hourly_rate: initialData.hourly_rate ? String(initialData.hourly_rate) : '',
 work_type: (initialData.work_type as ProfileData['work_type']) ?? 'remote',
 location_city: initialData.location_city ?? '',
 location_country: initialData.location_country ?? '',
 location_postcode: initialData.location_postcode ?? '',
 service_radius_km: initialData.service_radius_km ? String(initialData.service_radius_km) : '',
 skills: Array.isArray(initialData.skills) ? initialData.skills : [],
 languages: Array.isArray(initialData.languages) ? initialData.languages : [],
 website_url: initialData.website_url ?? '',
 linkedin_url: initialData.linkedin_url ?? '',
 }
 : {}),
 });

 const [skillInput, setSkillInput] = useState('');
 const [languageInput, setLanguageInput] = useState('');
 const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
 const [errorMessage, setErrorMessage] = useState('');

 function updateField<K extends keyof ProfileData>(key: K, value: ProfileData[K]) {
 setForm((prev) =>({ ...prev, [key]: value }));
 }

 function handleTagKeyDown(
 e: KeyboardEvent<HTMLInputElement>,
 inputValue: string,
 field: 'skills' | 'languages',
 setInput: (v: string) =>void
 ) {
 if (e.key === 'Enter' && inputValue.trim()) {
 e.preventDefault();
 const trimmed = inputValue.trim();
 if (!form[field].includes(trimmed)) {
 updateField(field, [...form[field], trimmed]);
 }
 setInput('');
 }
 }

 function removeTag(field: 'skills' | 'languages', tag: string) {
 updateField(field, form[field].filter((t) =>t !== tag));
 }

 async function handleSubmit(e: React.FormEvent) {
 e.preventDefault();
 setStatus('saving');
 setErrorMessage('');

 const method = form.id ? 'PUT' : 'POST';
 const payload = {
 display_name: form.display_name.trim(),
 tagline: form.tagline.trim() || null,
 bio: form.bio.trim() || null,
 hourly_rate: form.hourly_rate ? parseFloat(form.hourly_rate) : null,
 work_type: form.work_type,
 location_city: form.location_city.trim() || null,
 location_country: form.location_country.trim() || null,
 location_postcode: form.location_postcode.trim() || null,
 service_radius_km: form.service_radius_km ? parseInt(form.service_radius_km, 10) : null,
 skills: form.skills,
 languages: form.languages,
 website_url: form.website_url.trim() || null,
 linkedin_url: form.linkedin_url.trim() || null,
 };

 try {
 const res = await fetch('/api/marketplace/seller/profile', {
 method,
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(payload),
 });

 if (!res.ok) {
 const data = await res.json().catch(() =>({}));
 throw new Error(data.error ?? 'Request failed');
 }

 const saved = await res.json();
 // Update id in form if newly created
 if (saved.id && !form.id) {
 setForm((prev) =>({ ...prev, id: saved.id }));
 }

 setStatus('saved');
 setTimeout(() =>setStatus('idle'), 3000);
 } catch (err) {
 setStatus('error');
 setErrorMessage(err instanceof Error ? err.message : t('error'));
 }
 }

 const showLocationFields = form.work_type === 'local' || form.work_type === 'hybrid';

 return (
 <form onSubmit={handleSubmit} className="space-y-8">
 {/* Basic info */}
 <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
 <h2 className="text-base font-heading font-semibold text-gray-900 dark:text-white mb-5">
 Basic Information
 </h2>

 <div className="grid grid-cols-1 gap-5">
 {/* Display Name */}
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('displayName')} <span className="text-primary">*</span>
 </label>
 <input
 type="text"
 required
 value={form.display_name}
 onChange={(e) =>updateField('display_name', e.target.value)}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
 />
 </div>

 {/* Tagline */}
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('tagline')}
 </label>
 <input
 type="text"
 placeholder={t('taglinePlaceholder')}
 value={form.tagline}
 onChange={(e) =>updateField('tagline', e.target.value)}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
 />
 </div>

 {/* Bio */}
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('bio')}
 </label>
 <textarea
 rows={5}
 placeholder={t('bioPlaceholder')}
 value={form.bio}
 onChange={(e) =>updateField('bio', e.target.value)}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition resize-y"
 />
 </div>

 {/* Hourly Rate */}
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('hourlyRate')}
 </label>
 <div className="relative">
 <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm">
 €
 </span>
 <input
 type="number"
 min="0"
 step="0.01"
 value={form.hourly_rate}
 onChange={(e) =>updateField('hourly_rate', e.target.value)}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 pl-8 pr-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
 />
 </div>
 </div>
 </div>
 </section>

 {/* Work type & Location */}
 <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
 <h2 className="text-base font-heading font-semibold text-gray-900 dark:text-white mb-5">
 Work Type & Location
 </h2>

 {/* Work type */}
 <div className="mb-5">
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
 {t('workType')}
 </label>
 <div className="flex flex-wrap gap-3">
 {(['remote', 'local', 'hybrid'] as const).map((wt) =>(
 <label
 key={wt}
 className={[
 'flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition',
 form.work_type === wt
 ? 'border-primary bg-primary/5 text-primary dark:bg-primary/10'
 : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-600',
 ].join(' ')}
 >
 <input
 type="radio"
 name="work_type"
 value={wt}
 checked={form.work_type === wt}
 onChange={() =>updateField('work_type', wt)}
 className="sr-only"
 />
 {t(wt)}
 </label>
 ))}
 </div>
 </div>

 {/* Location fields - shown for local/hybrid */}
 {showLocationFields && (
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('city')}
 </label>
 <input
 type="text"
 value={form.location_city}
 onChange={(e) =>updateField('location_city', e.target.value)}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
 />
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('country')}
 </label>
 <input
 type="text"
 placeholder="NL"
 value={form.location_country}
 onChange={(e) =>updateField('location_country', e.target.value)}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
 />
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('postcode')}
 </label>
 <input
 type="text"
 value={form.location_postcode}
 onChange={(e) =>updateField('location_postcode', e.target.value)}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
 />
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('serviceRadius')}
 </label>
 <input
 type="number"
 min="0"
 value={form.service_radius_km}
 onChange={(e) =>updateField('service_radius_km', e.target.value)}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
 />
 </div>
 </div>
 )}
 </section>

 {/* Skills & Languages */}
 <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
 <h2 className="text-base font-heading font-semibold text-gray-900 dark:text-white mb-5">
 Skills & Languages
 </h2>

 {/* Skills */}
 <div className="mb-5">
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('skills')}
 </label>
 <div className="flex flex-wrap gap-2 mb-2">
 {form.skills.map((skill) =>(
 <span
 key={skill}
 className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-white rounded-full text-sm font-medium"
 >
 {skill}
 <button
 type="button"
 onClick={() =>removeTag('skills', skill)}
 className="hover:text-primary transition-colors"
 aria-label={`Remove ${skill}`}
 >
 <X size={13} />
 </button>
 </span>
 ))}
 </div>
 <div className="flex gap-2">
 <input
 type="text"
 placeholder={t('skillsPlaceholder')}
 value={skillInput}
 onChange={(e) =>setSkillInput(e.target.value)}
 onKeyDown={(e) =>handleTagKeyDown(e, skillInput, 'skills', setSkillInput)}
 className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
 />
 <button
 type="button"
 onClick={() =>{
 if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
 updateField('skills', [...form.skills, skillInput.trim()]);
 setSkillInput('');
 }
 }}
 className="px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary transition"
 aria-label="Add skill"
 >
 <Plus size={18} />
 </button>
 </div>
 </div>

 {/* Languages */}
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('languages')}
 </label>
 <div className="flex flex-wrap gap-2 mb-2">
 {form.languages.map((lang) =>(
 <span
 key={lang}
 className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 dark:bg-accent/20 text-accent rounded-full text-sm font-medium"
 >
 {lang}
 <button
 type="button"
 onClick={() =>removeTag('languages', lang)}
 className="hover:opacity-70 transition-opacity"
 aria-label={`Remove ${lang}`}
 >
 <X size={13} />
 </button>
 </span>
 ))}
 </div>
 <div className="flex gap-2">
 <input
 type="text"
 placeholder="English, Dutch..."
 value={languageInput}
 onChange={(e) =>setLanguageInput(e.target.value)}
 onKeyDown={(e) =>handleTagKeyDown(e, languageInput, 'languages', setLanguageInput)}
 className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
 />
 <button
 type="button"
 onClick={() =>{
 if (languageInput.trim() && !form.languages.includes(languageInput.trim())) {
 updateField('languages', [...form.languages, languageInput.trim()]);
 setLanguageInput('');
 }
 }}
 className="px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary hover:text-primary transition"
 aria-label="Add language"
 >
 <Plus size={18} />
 </button>
 </div>
 </div>
 </section>

 {/* Links */}
 <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
 <h2 className="text-base font-heading font-semibold text-gray-900 dark:text-white mb-5">
 Online Presence
 </h2>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('websiteUrl')}
 </label>
 <input
 type="url"
 placeholder="https://yourwebsite.com"
 value={form.website_url}
 onChange={(e) =>updateField('website_url', e.target.value)}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
 />
 </div>

 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('linkedinUrl')}
 </label>
 <input
 type="url"
 placeholder="https://linkedin.com/in/yourprofile"
 value={form.linkedin_url}
 onChange={(e) =>updateField('linkedin_url', e.target.value)}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
 />
 </div>
 </div>
 </section>

 {/* Status messages */}
 {status === 'saved' && (
 <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-700 dark:text-green-400">
 {t('saved')}
 </div>
 )}
 {status === 'error' && (
 <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-400">
 {errorMessage || t('error')}
 </div>
 )}

 {/* Submit */}
 <div className="flex justify-end">
 <button
 type="submit"
 disabled={status === 'saving'}
 className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed px-6 py-2.5 text-sm font-heading font-semibold text-white transition shadow-sm"
 >
 {status === 'saving' ? t('saving') : t('saveProfile')}
 </button>
 </div>
 </form>
 );
}
