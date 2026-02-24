'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { X, Plus, Loader2, CheckCircle } from 'lucide-react';

interface SerializableCategory {
 id: string;
 name: string;
 slug: string;
 parent_id: string | null;
}

interface NewProjectFormProps {
 categories: SerializableCategory[];
 locale: string;
}

export function NewProjectForm({ categories, locale }: NewProjectFormProps) {
 const t = useTranslations('projects');
 const router = useRouter();

 const [title, setTitle] = useState('');
 const [categoryId, setCategoryId] = useState('');
 const [description, setDescription] = useState('');
 const [skills, setSkills] = useState<string[]>([]);
 const [skillInput, setSkillInput] = useState('');
 const [budgetMin, setBudgetMin] = useState('');
 const [budgetMax, setBudgetMax] = useState('');
 const [currency] = useState('EUR');
 const [deadline, setDeadline] = useState('');
 const [workType, setWorkType] = useState('remote');
 const [locationCity, setLocationCity] = useState('');
 const [locationCountry, setLocationCountry] = useState('');
 const [locationPostcode, setLocationPostcode] = useState('');

 const [loading, setLoading] = useState(false);
 const [success, setSuccess] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const addSkill = () =>{
 const skill = skillInput.trim();
 if (skill && !skills.includes(skill) && skills.length < 10) {
 setSkills([...skills, skill]);
 setSkillInput('');
 }
 };

 const removeSkill = (skill: string) =>{
 setSkills(skills.filter((s) =>s !== skill));
 };

 const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{
 if (e.key === 'Enter' || e.key === ',') {
 e.preventDefault();
 addSkill();
 }
 };

 const handleSubmit = async (e: React.FormEvent) =>{
 e.preventDefault();
 setLoading(true);
 setError(null);

 if (!title.trim() || title.trim().length < 5) {
 setError('Title must be at least 5 characters.');
 setLoading(false);
 return;
 }

 if (!description.trim() || description.trim().length < 20) {
 setError('Description must be at least 20 characters.');
 setLoading(false);
 return;
 }

 const budgetMinNum = budgetMin ? parseFloat(budgetMin) : null;
 const budgetMaxNum = budgetMax ? parseFloat(budgetMax) : null;

 if (budgetMinNum !== null && budgetMinNum <= 0) {
 setError('Min budget must be a positive number.');
 setLoading(false);
 return;
 }
 if (budgetMaxNum !== null && budgetMaxNum <= 0) {
 setError('Max budget must be a positive number.');
 setLoading(false);
 return;
 }
 if (budgetMinNum && budgetMaxNum && budgetMinNum >budgetMaxNum) {
 setError('Min budget cannot be greater than max budget.');
 setLoading(false);
 return;
 }

 try {
 const res = await fetch('/api/marketplace/projects', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 title: title.trim(),
 category_id: categoryId || null,
 description: description.trim(),
 required_skills: skills,
 budget_min: budgetMinNum,
 budget_max: budgetMaxNum,
 currency,
 deadline: deadline || null,
 work_type: workType,
 location_city: locationCity.trim() || null,
 location_country: locationCountry.trim() || null,
 location_postcode: locationPostcode.trim() || null,
 locale,
 }),
 });

 const data = await res.json();

 if (!res.ok) {
 setError(data.error ?? 'Failed to create project. Please try again.');
 return;
 }

 setSuccess(true);
 // Navigate to project detail after short delay
 setTimeout(() =>{
 router.push(`/${locale}/dashboard/projects/${data.project.id}`);
 }, 1500);
 } catch {
 setError('Network error. Please try again.');
 } finally {
 setLoading(false);
 }
 };

 if (success) {
 return (
 <div className="flex flex-col items-center justify-center py-16 text-center">
 <CheckCircle className="w-14 h-14 text-accent mb-3" />
 <p className="text-lg font-semibold text-gray-900 dark:text-white">
 {t('published')}
 </p>
 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
 Redirecting to your project...
 </p>
 </div>
 );
 }

 const showLocationFields = workType === 'local' || workType === 'hybrid';

 return (
 <form onSubmit={handleSubmit} className="space-y-6">
 {/* Title */}
 <div>
 <label
 htmlFor="project-title"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 {t('projectTitle')} <span className="text-red-500">*</span>
 </label>
 <input
 id="project-title"
 type="text"
 value={title}
 onChange={(e) =>setTitle(e.target.value)}
 placeholder={t('projectTitlePlaceholder')}
 required
 maxLength={120}
 className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>

 {/* Category */}
 <div>
 <label
 htmlFor="project-category"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 {t('category')}
 </label>
 <select
 id="project-category"
 value={categoryId}
 onChange={(e) =>setCategoryId(e.target.value)}
 className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
 >
 <option value="">{t('selectCategory')}</option>
 {categories
 .filter((c) =>!c.parent_id)
 .map((cat) =>(
 <option key={cat.id} value={cat.id}>
 {cat.name}
 </option>
 ))}
 </select>
 </div>

 {/* Description */}
 <div>
 <label
 htmlFor="project-description"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 {t('description')} <span className="text-red-500">*</span>
 </label>
 <textarea
 id="project-description"
 value={description}
 onChange={(e) =>setDescription(e.target.value)}
 placeholder={t('descriptionPlaceholder')}
 rows={6}
 required
 className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
 />
 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
 {description.length} characters
 </p>
 </div>

 {/* Required skills */}
 <div>
 <label
 htmlFor="project-skills"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 {t('skills')}
 </label>
 <div className="flex gap-2">
 <input
 id="project-skills"
 type="text"
 value={skillInput}
 onChange={(e) =>setSkillInput(e.target.value)}
 onKeyDown={handleSkillKeyDown}
 placeholder={t('addSkill')}
 maxLength={50}
 className="flex-1 px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 <button
 type="button"
 onClick={addSkill}
 disabled={!skillInput.trim() || skills.length >= 10}
 className="px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
 >
 <Plus className="w-4 h-4" />
 </button>
 </div>
 {skills.length >0 && (
 <div className="flex flex-wrap gap-2 mt-2">
 {skills.map((skill) =>(
 <span
 key={skill}
 className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-primary/10 text-primary"
 >
 {skill}
 <button
 type="button"
 onClick={() =>removeSkill(skill)}
 className="hover:text-primary/60 transition-colors"
 aria-label={`Remove ${skill}`}
 >
 <X className="w-3 h-3" />
 </button>
 </span>
 ))}
 </div>
 )}
 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
 {skills.length}/10 skills. Press Enter or comma to add.
 </p>
 </div>

 {/* Budget */}
 <div className="grid grid-cols-2 gap-4">
 <div>
 <label
 htmlFor="budget-min"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 {t('budgetMin')}
 </label>
 <input
 id="budget-min"
 type="number"
 min="1"
 step="1"
 value={budgetMin}
 onChange={(e) =>setBudgetMin(e.target.value)}
 placeholder="100"
 className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 <div>
 <label
 htmlFor="budget-max"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 {t('budgetMax')}
 </label>
 <input
 id="budget-max"
 type="number"
 min="1"
 step="1"
 value={budgetMax}
 onChange={(e) =>setBudgetMax(e.target.value)}
 placeholder="500"
 className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 </div>

 {/* Deadline */}
 <div>
 <label
 htmlFor="project-deadline"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 {t('deadline')}
 </label>
 <input
 id="project-deadline"
 type="date"
 value={deadline}
 onChange={(e) =>setDeadline(e.target.value)}
 min={new Date().toISOString().split('T')[0]}
 className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>

 {/* Work type */}
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('workType')}
 </label>
 <div className="grid grid-cols-3 gap-3">
 {(['remote', 'hybrid', 'local'] as const).map((type) =>(
 <button
 key={type}
 type="button"
 onClick={() =>setWorkType(type)}
 className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
 workType === type
 ? 'bg-primary text-white border-primary'
 : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-primary/50'
 }`}
 >
 {type === 'remote'
 ? t('remote')
 : type === 'hybrid'
 ? t('hybrid')
 : t('local')}
 </button>
 ))}
 </div>
 </div>

 {/* Location fields (only for local/hybrid) */}
 {showLocationFields && (
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 <div>
 <label
 htmlFor="location-city"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 City
 </label>
 <input
 id="location-city"
 type="text"
 value={locationCity}
 onChange={(e) =>setLocationCity(e.target.value)}
 placeholder="Amsterdam"
 className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 <div>
 <label
 htmlFor="location-country"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 Country
 </label>
 <input
 id="location-country"
 type="text"
 value={locationCountry}
 onChange={(e) =>setLocationCountry(e.target.value)}
 placeholder="Netherlands"
 className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 <div>
 <label
 htmlFor="location-postcode"
 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
 >
 Postcode
 </label>
 <input
 id="location-postcode"
 type="text"
 value={locationPostcode}
 onChange={(e) =>setLocationPostcode(e.target.value)}
 placeholder="1011 AB"
 className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 </div>
 )}

 {/* Error */}
 {error && (
 <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
 <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
 </div>
 )}

 {/* Submit */}
 <div className="flex gap-3 pt-2">
 <button
 type="submit"
 disabled={loading}
 className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
 >
 {loading ? (
 <>
 <Loader2 className="w-4 h-4 animate-spin" />
 {t('publishing')}
 </>
 ) : (
 t('createProject')
 )}
 </button>
 </div>
 </form>
 );
}
