'use client';

import { useState, KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
 ChevronRight,
 ChevronLeft,
 Check,
 Plus,
 X,
 Tag,
 Image as ImageIcon,
 Package,
 FileText,
 Eye,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SerializableCategory {
 id: string;
 name: string;
 slug: string;
 parent_id: string | null;
 children?: SerializableCategory[];
}

interface PackageData {
 tier: 'basic' | 'standard' | 'premium';
 title: string;
 description: string;
 price: string;
 currency: string;
 delivery_days: string;
 revision_count: string;
 features: string[];
}

interface ImageEntry {
 image_url: string;
 alt_text: string;
 sort_order: number;
}

interface GigFormData {
 category_id: string;
 subcategory_id: string;
 title: string;
 work_type: 'remote' | 'local' | 'hybrid';
 location_city: string;
 location_country: string;
 service_radius_km: string;
 description: string;
 tags: string[];
 packages: {
 basic: PackageData;
 standard: PackageData;
 premium: PackageData;
 };
 images: ImageEntry[];
}

interface GigWizardProps {
 categories: SerializableCategory[];
 locale: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STEPS = 5;

const DEFAULT_PACKAGE = (tier: 'basic' | 'standard' | 'premium'): PackageData =>({
 tier,
 title: '',
 description: '',
 price: '',
 currency: 'EUR',
 delivery_days: '7',
 revision_count: '1',
 features: [],
});

const DEFAULT_FORM: GigFormData = {
 category_id: '',
 subcategory_id: '',
 title: '',
 work_type: 'remote',
 location_city: '',
 location_country: '',
 service_radius_km: '',
 description: '',
 tags: [],
 packages: {
 basic: DEFAULT_PACKAGE('basic'),
 standard: DEFAULT_PACKAGE('standard'),
 premium: DEFAULT_PACKAGE('premium'),
 },
 images: Array.from({ length: 5 }, (_, i) =>({
 image_url: '',
 alt_text: '',
 sort_order: i,
 })),
};

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------

function StepIndicator({
 currentStep,
 totalSteps,
 stepTitles,
}: {
 currentStep: number;
 totalSteps: number;
 stepTitles: string[];
}) {
 return (
 <div className="flex items-center justify-center gap-0 mb-8 overflow-x-auto">
 {stepTitles.map((title, index) =>{
 const stepNum = index + 1;
 const isCompleted = stepNum < currentStep;
 const isActive = stepNum === currentStep;
 const isLast = index === totalSteps - 1;

 return (
 <div key={stepNum} className="flex items-center">
 <div className="flex flex-col items-center min-w-[70px]">
 <div
 className={`
 w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all
 ${isCompleted ? 'bg-accent text-white' : ''}
 ${isActive ? 'bg-primary text-white ring-4 ring-primary/20' : ''}
 ${!isCompleted && !isActive ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400' : ''}
 `}
 >
 {isCompleted ? <Check size={16} />: stepNum}
 </div>
 <span
 className={`text-xs mt-1 text-center leading-tight max-w-[68px] ${
 isActive
 ? 'text-primary font-medium'
 : isCompleted
 ? 'text-accent font-medium'
 : 'text-gray-400 dark:text-gray-500'
 }`}
 >
 {title}
 </span>
 </div>
 {!isLast && (
 <div
 className={`w-8 h-0.5 mx-1 mb-4 flex-shrink-0 transition-all ${
 isCompleted ? 'bg-accent' : 'bg-gray-200 dark:bg-gray-700'
 }`}
 />
 )}
 </div>
 );
 })}
 </div>
 );
}

// ---------------------------------------------------------------------------
// Step 1: Category & Title
// ---------------------------------------------------------------------------

function Step1({
 form,
 categories,
 onChange,
 t,
}: {
 form: GigFormData;
 categories: SerializableCategory[];
 onChange: (updates: Partial<GigFormData>) =>void;
 t: ReturnType<typeof useTranslations>;
}) {
 const parentCategories = categories.filter((c) =>!c.parent_id);
 const selectedParent = categories.find(
 (c) =>c.id === form.category_id && !c.parent_id
 );
 const subcategories = selectedParent?.children ?? [];

 const showLocation = form.work_type === 'local' || form.work_type === 'hybrid';

 return (
 <div className="space-y-6">
 {/* Category */}
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('gigWizard.selectCategory')} <span className="text-primary">*</span>
 </label>
 <select
 value={form.category_id}
 onChange={(e) =>onChange({ category_id: e.target.value, subcategory_id: '' })}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 >
 <option value="">{t('gigWizard.selectCategory')}</option>
 {parentCategories.map((cat) =>(
 <option key={cat.id} value={cat.id}>
 {cat.name}
 </option>
 ))}
 </select>
 </div>

 {/* Subcategory */}
 {subcategories.length >0 && (
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('gigWizard.selectSubcategory')}
 </label>
 <select
 value={form.subcategory_id}
 onChange={(e) =>onChange({ subcategory_id: e.target.value })}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 >
 <option value="">{t('gigWizard.selectSubcategory')}</option>
 {subcategories.map((sub) =>(
 <option key={sub.id} value={sub.id}>
 {sub.name}
 </option>
 ))}
 </select>
 </div>
 )}

 {/* Gig Title */}
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('gigWizard.gigTitle')} <span className="text-primary">*</span>
 </label>
 <input
 type="text"
 value={form.title}
 onChange={(e) =>onChange({ title: e.target.value })}
 placeholder={t('gigWizard.gigTitlePlaceholder')}
 maxLength={120}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
 {form.title.length}/120 &mdash; minimum 10 characters
 </p>
 </div>

 {/* Work Type */}
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
 {t('gigWizard.workType')}
 </label>
 <div className="flex gap-3">
 {(['remote', 'local', 'hybrid'] as const).map((type) =>(
 <label
 key={type}
 className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer text-sm font-medium transition-all ${
 form.work_type === type
 ? 'border-primary bg-primary/5 text-primary'
 : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400'
 }`}
 >
 <input
 type="radio"
 name="work_type"
 value={type}
 checked={form.work_type === type}
 onChange={() =>onChange({ work_type: type })}
 className="sr-only"
 />
 {t(`gigWizard.${type}`)}
 </label>
 ))}
 </div>
 </div>

 {/* Location fields (conditional) */}
 {showLocation && (
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('gigWizard.city')}
 </label>
 <input
 type="text"
 value={form.location_city}
 onChange={(e) =>onChange({ location_city: e.target.value })}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('gigWizard.country')}
 </label>
 <input
 type="text"
 value={form.location_country}
 onChange={(e) =>onChange({ location_country: e.target.value })}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 <div className="sm:col-span-2">
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('gigWizard.serviceRadius')}
 </label>
 <input
 type="number"
 min="0"
 value={form.service_radius_km}
 onChange={(e) =>onChange({ service_radius_km: e.target.value })}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 </div>
 )}
 </div>
 );
}

// ---------------------------------------------------------------------------
// Step 2: Description & Tags
// ---------------------------------------------------------------------------

function Step2({
 form,
 onChange,
 t,
}: {
 form: GigFormData;
 onChange: (updates: Partial<GigFormData>) =>void;
 t: ReturnType<typeof useTranslations>;
}) {
 const [tagInput, setTagInput] = useState('');

 function handleTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
 if (e.key === 'Enter' || e.key === ',') {
 e.preventDefault();
 const value = tagInput.trim().toLowerCase();
 if (value && !form.tags.includes(value) && form.tags.length < 10) {
 onChange({ tags: [...form.tags, value] });
 }
 setTagInput('');
 }
 }

 function removeTag(tag: string) {
 onChange({ tags: form.tags.filter((t) =>t !== tag) });
 }

 return (
 <div className="space-y-6">
 {/* Description */}
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('gigWizard.description')} <span className="text-primary">*</span>
 </label>
 <textarea
 value={form.description}
 onChange={(e) =>onChange({ description: e.target.value })}
 placeholder={t('gigWizard.descriptionPlaceholder')}
 rows={8}
 maxLength={5000}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
 />
 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
 {form.description.length}/5000 &mdash; minimum 50 characters
 </p>
 </div>

 {/* Tags */}
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
 {t('gigWizard.tags')}
 </label>
 {form.tags.length >0 && (
 <div className="flex flex-wrap gap-2 mb-2">
 {form.tags.map((tag) =>(
 <span
 key={tag}
 className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
 >
 <Tag size={10} />
 {tag}
 <button
 type="button"
 onClick={() =>removeTag(tag)}
 className="ml-0.5 hover:text-primary/60 transition-colors"
 >
 <X size={12} />
 </button>
 </span>
 ))}
 </div>
 )}
 <input
 type="text"
 value={tagInput}
 onChange={(e) =>setTagInput(e.target.value)}
 onKeyDown={handleTagKeyDown}
 placeholder={t('gigWizard.tagsPlaceholder')}
 disabled={form.tags.length >= 10}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
 />
 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
 {form.tags.length}/10 tags
 </p>
 </div>
 </div>
 );
}

// ---------------------------------------------------------------------------
// Package form (reusable for each tier)
// ---------------------------------------------------------------------------

function PackageForm({
 pkg,
 tierLabel,
 isRequired,
 onChange,
 t,
}: {
 pkg: PackageData;
 tierLabel: string;
 isRequired: boolean;
 onChange: (updates: Partial<PackageData>) =>void;
 t: ReturnType<typeof useTranslations>;
}) {
 const [featureInput, setFeatureInput] = useState('');

 function addFeature() {
 const value = featureInput.trim();
 if (value && !pkg.features.includes(value)) {
 onChange({ features: [...pkg.features, value] });
 }
 setFeatureInput('');
 }

 function handleFeatureKeyDown(e: KeyboardEvent<HTMLInputElement>) {
 if (e.key === 'Enter') {
 e.preventDefault();
 addFeature();
 }
 }

 function removeFeature(feat: string) {
 onChange({ features: pkg.features.filter((f) =>f !== feat) });
 }

 const tierColors = {
 basic: 'border-gray-300 dark:border-gray-600',
 standard: 'border-blue-400 dark:border-blue-500',
 premium: 'border-yellow-400 dark:border-yellow-500',
 };

 const tierBadgeColors = {
 basic: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
 standard: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
 premium: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
 };

 return (
 <div className={`rounded-xl border-2 ${tierColors[pkg.tier]} p-5 space-y-4`}>
 {/* Tier header */}
 <div className="flex items-center justify-between">
 <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide ${tierBadgeColors[pkg.tier]}`}>
 {tierLabel}
 </span>
 {!isRequired && (
 <span className="text-xs text-gray-400 dark:text-gray-500">Optional</span>
 )}
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {/* Package Title */}
 <div className="sm:col-span-2">
 <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
 {t('gigWizard.packageTitle')} {isRequired && <span className="text-primary">*</span>}
 </label>
 <input
 type="text"
 value={pkg.title}
 onChange={(e) =>onChange({ title: e.target.value })}
 placeholder={`${tierLabel} package title`}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>

 {/* Package Description */}
 <div className="sm:col-span-2">
 <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
 {t('gigWizard.packageDescription')}
 </label>
 <textarea
 value={pkg.description}
 onChange={(e) =>onChange({ description: e.target.value })}
 placeholder={t('gigWizard.packageDescription')}
 rows={2}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
 />
 </div>

 {/* Price */}
 <div>
 <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
 {t('gigWizard.packagePrice')} {isRequired && <span className="text-primary">*</span>}
 </label>
 <div className="relative">
 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
 <input
 type="number"
 min="1"
 step="0.01"
 value={pkg.price}
 onChange={(e) =>onChange({ price: e.target.value })}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 </div>

 {/* Delivery days */}
 <div>
 <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
 {t('gigWizard.packageDelivery')}
 </label>
 <input
 type="number"
 min="1"
 value={pkg.delivery_days}
 onChange={(e) =>onChange({ delivery_days: e.target.value })}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>

 {/* Revisions */}
 <div>
 <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
 {t('gigWizard.packageRevisions')}
 </label>
 <input
 type="number"
 min="0"
 value={pkg.revision_count}
 onChange={(e) =>onChange({ revision_count: e.target.value })}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 </div>

 {/* Features */}
 <div>
 <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
 {t('gigWizard.packageFeatures')}
 </label>
 {pkg.features.length >0 && (
 <ul className="space-y-1 mb-2">
 {pkg.features.map((feat) =>(
 <li
 key={feat}
 className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
 >
 <Check size={12} className="text-accent flex-shrink-0" />
 <span className="flex-1">{feat}</span>
 <button
 type="button"
 onClick={() =>removeFeature(feat)}
 className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
 >
 <X size={14} />
 </button>
 </li>
 ))}
 </ul>
 )}
 <div className="flex gap-2">
 <input
 type="text"
 value={featureInput}
 onChange={(e) =>setFeatureInput(e.target.value)}
 onKeyDown={handleFeatureKeyDown}
 placeholder={t('gigWizard.addFeature')}
 className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 <button
 type="button"
 onClick={addFeature}
 className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
 >
 <Plus size={16} />
 </button>
 </div>
 </div>
 </div>
 );
}

// ---------------------------------------------------------------------------
// Step 3: Pricing Packages
// ---------------------------------------------------------------------------

function Step3({
 form,
 onChange,
 t,
}: {
 form: GigFormData;
 onChange: (updates: Partial<GigFormData>) =>void;
 t: ReturnType<typeof useTranslations>;
}) {
 function updatePackage(tier: 'basic' | 'standard' | 'premium', updates: Partial<PackageData>) {
 onChange({
 packages: {
 ...form.packages,
 [tier]: { ...form.packages[tier], ...updates },
 },
 });
 }

 return (
 <div className="space-y-6">
 <PackageForm
 pkg={form.packages.basic}
 tierLabel={t('gigWizard.basic')}
 isRequired={true}
 onChange={(updates) =>updatePackage('basic', updates)}
 t={t}
 />
 <PackageForm
 pkg={form.packages.standard}
 tierLabel={t('gigWizard.standard')}
 isRequired={false}
 onChange={(updates) =>updatePackage('standard', updates)}
 t={t}
 />
 <PackageForm
 pkg={form.packages.premium}
 tierLabel={t('gigWizard.premium')}
 isRequired={false}
 onChange={(updates) =>updatePackage('premium', updates)}
 t={t}
 />
 </div>
 );
}

// ---------------------------------------------------------------------------
// Step 4: Gallery Images
// ---------------------------------------------------------------------------

function Step4({
 form,
 onChange,
 t,
}: {
 form: GigFormData;
 onChange: (updates: Partial<GigFormData>) =>void;
 t: ReturnType<typeof useTranslations>;
}) {
 function updateImage(index: number, field: keyof ImageEntry, value: string | number) {
 const newImages = form.images.map((img, i) =>
 i === index ? { ...img, [field]: value } : img
 );
 onChange({ images: newImages });
 }

 return (
 <div className="space-y-4">
 <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 text-center">
 <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
 <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
 {t('gigWizard.dragDrop')}
 </p>
 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
 {t('gigWizard.maxImages')}
 </p>
 </div>

 <div className="space-y-3">
 {form.images.map((img, index) =>(
 <div key={index} className="flex gap-3 items-start">
 <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-semibold text-gray-500 dark:text-gray-400">
 {index + 1}
 </div>
 <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
 <input
 type="url"
 value={img.image_url}
 onChange={(e) =>updateImage(index, 'image_url', e.target.value)}
 placeholder={`Image URL ${index + 1}`}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 <input
 type="text"
 value={img.alt_text}
 onChange={(e) =>updateImage(index, 'alt_text', e.target.value)}
 placeholder="Alt text (accessibility)"
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}

// ---------------------------------------------------------------------------
// Step 5: Review & Publish
// ---------------------------------------------------------------------------

function Step5({
 form,
 categories,
 t,
}: {
 form: GigFormData;
 categories: SerializableCategory[];
 t: ReturnType<typeof useTranslations>;
}) {
 const allCats = flattenCategories(categories);
 const selectedCat = allCats.find((c) =>c.id === (form.subcategory_id || form.category_id));
 const filledImages = form.images.filter((img) =>img.image_url.trim() !== '');
 const filledPackages = (['basic', 'standard', 'premium'] as const).filter(
 (tier) =>Number(form.packages[tier].price) >0
 );

 return (
 <div className="space-y-6">
 <div className="rounded-xl bg-accent/5 border border-accent/20 p-4 flex items-center gap-3">
 <Check size={20} className="text-accent flex-shrink-0" />
 <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
 {t('gigWizard.looksGood')}
 </span>
 </div>

 {/* Summary sections */}
 <div className="space-y-4">
 {/* Title & Category */}
 <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4">
 <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-3">
 {t('gigWizard.step1Title')}
 </h3>
 <p className="font-semibold text-gray-900 dark:text-white">{form.title || '—'}</p>
 {selectedCat && (
 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{selectedCat.name}</p>
 )}
 <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 capitalize">
 {t(`gigWizard.${form.work_type}`)}
 {form.location_city && ` · ${form.location_city}`}
 {form.location_country && `, ${form.location_country}`}
 </p>
 </div>

 {/* Description */}
 <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4">
 <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-3">
 {t('gigWizard.step2Title')}
 </h3>
 <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
 {form.description || '—'}
 </p>
 {form.tags.length >0 && (
 <div className="flex flex-wrap gap-1.5 mt-3">
 {form.tags.map((tag) =>(
 <span
 key={tag}
 className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs"
 >
 {tag}
 </span>
 ))}
 </div>
 )}
 </div>

 {/* Packages */}
 <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4">
 <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-3">
 {t('gigWizard.step3Title')}
 </h3>
 {filledPackages.length === 0 ? (
 <p className="text-sm text-gray-500 dark:text-gray-400">—</p>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 {filledPackages.map((tier) =>{
 const pkg = form.packages[tier];
 return (
 <div key={tier} className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
 <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
 {t(`gigWizard.${tier}`)}
 </p>
 <p className="font-semibold text-gray-900 dark:text-white text-sm">
 {pkg.title || '—'}
 </p>
 <p className="text-primary font-bold mt-1">€{pkg.price}</p>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
 {pkg.delivery_days} days &middot; {pkg.revision_count} revisions
 </p>
 </div>
 );
 })}
 </div>
 )}
 </div>

 {/* Images */}
 <div className="rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4">
 <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-3">
 {t('gigWizard.step4Title')}
 </h3>
 {filledImages.length === 0 ? (
 <p className="text-sm text-gray-500 dark:text-gray-400">No images added</p>
 ) : (
 <p className="text-sm text-gray-700 dark:text-gray-300">
 {filledImages.length} image{filledImages.length !== 1 ? 's' : ''} added
 </p>
 )}
 </div>
 </div>
 </div>
 );
}

// ---------------------------------------------------------------------------
// Utility: flatten category tree
// ---------------------------------------------------------------------------

function flattenCategories(categories: SerializableCategory[]): SerializableCategory[] {
 const result: SerializableCategory[] = [];
 for (const cat of categories) {
 result.push(cat);
 if (cat.children && cat.children.length >0) {
 result.push(...flattenCategories(cat.children));
 }
 }
 return result;
}

// ---------------------------------------------------------------------------
// Validation per step
// ---------------------------------------------------------------------------

function validateStep(step: number, form: GigFormData): string | null {
 if (step === 1) {
 if (!form.category_id) return 'Please select a category.';
 if (form.title.trim().length < 10) return 'Gig title must be at least 10 characters.';
 }
 if (step === 2) {
 if (form.description.trim().length < 50) return 'Description must be at least 50 characters.';
 }
 if (step === 3) {
 const basicPrice = Number(form.packages.basic.price);
 if (!basicPrice || basicPrice <= 0) return 'The Basic package must have a price greater than 0.';
 }
 return null;
}

// ---------------------------------------------------------------------------
// Main GigWizard component
// ---------------------------------------------------------------------------

export function GigWizard({ categories, locale }: GigWizardProps) {
 const t = useTranslations('dashboard');
 const router = useRouter();

 const [step, setStep] = useState(1);
 const [form, setForm] = useState<GigFormData>(DEFAULT_FORM);
 const [validationError, setValidationError] = useState<string | null>(null);
 const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
 const [submitError, setSubmitError] = useState('');

 const stepTitles = [
 t('gigWizard.step1Title'),
 t('gigWizard.step2Title'),
 t('gigWizard.step3Title'),
 t('gigWizard.step4Title'),
 t('gigWizard.step5Title'),
 ];

 function updateForm(updates: Partial<GigFormData>) {
 setForm((prev) =>({ ...prev, ...updates }));
 setValidationError(null);
 }

 function goNext() {
 const error = validateStep(step, form);
 if (error) {
 setValidationError(error);
 return;
 }
 setValidationError(null);
 setStep((s) =>Math.min(s + 1, STEPS));
 }

 function goPrev() {
 setValidationError(null);
 setStep((s) =>Math.max(s - 1, 1));
 }

 async function handleSubmit(status: 'pending' | 'draft') {
 const error = validateStep(step, form);
 if (error) {
 setValidationError(error);
 return;
 }

 setSubmitStatus('submitting');
 setSubmitError('');

 // Determine final category_id (prefer subcategory if selected)
 const categoryId = form.subcategory_id || form.category_id;

 // Build packages array (only filled packages)
 const packagesPayload = (['basic', 'standard', 'premium'] as const)
 .filter((tier) =>Number(form.packages[tier].price) >0)
 .map((tier) =>{
 const pkg = form.packages[tier];
 return {
 tier,
 title: pkg.title,
 description: pkg.description,
 price: Number(pkg.price),
 currency: pkg.currency,
 delivery_days: Number(pkg.delivery_days) || 7,
 revision_count: Number(pkg.revision_count) || 0,
 features: pkg.features,
 };
 });

 // Build images array (only filled)
 const imagesPayload = form.images
 .filter((img) =>img.image_url.trim() !== '')
 .map((img, i) =>({
 image_url: img.image_url.trim(),
 alt_text: img.alt_text.trim(),
 sort_order: i,
 }));

 const payload = {
 title: form.title.trim(),
 description: form.description.trim(),
 category_id: categoryId,
 tags: form.tags,
 work_type: form.work_type,
 location_city: form.location_city.trim() || undefined,
 location_country: form.location_country.trim() || undefined,
 service_radius_km: form.service_radius_km ? Number(form.service_radius_km) : undefined,
 status,
 locale,
 packages: packagesPayload,
 images: imagesPayload,
 };

 try {
 const res = await fetch('/api/marketplace/seller/gigs', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(payload),
 });

 if (!res.ok) {
 const data = await res.json().catch(() =>({}));
 throw new Error(data.error ?? 'Failed to create gig');
 }

 router.push(`/${locale}/dashboard/seller/gigs`);
 router.refresh();
 } catch (err) {
 setSubmitStatus('error');
 setSubmitError(err instanceof Error ? err.message : 'An unexpected error occurred');
 }
 }

 // Step icon map
 const stepIcons = [FileText, FileText, Package, ImageIcon, Eye];
 const StepIcon = stepIcons[step - 1];

 return (
 <div className="max-w-3xl mx-auto w-full">
 {/* Step indicator */}
 <StepIndicator
 currentStep={step}
 totalSteps={STEPS}
 stepTitles={stepTitles}
 />

 {/* Card */}
 <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
 {/* Card header */}
 <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
 <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
 <StepIcon size={16} className="text-primary" />
 </div>
 <div>
 <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
 {t('gigWizard.step')} {step} {t('gigWizard.of')} {STEPS}
 </p>
 <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
 {stepTitles[step - 1]}
 </h2>
 </div>
 </div>

 {/* Card body */}
 <div className="p-6">
 {step === 1 && (
 <Step1 form={form} categories={categories} onChange={updateForm} t={t} />
 )}
 {step === 2 && (
 <Step2 form={form} onChange={updateForm} t={t} />
 )}
 {step === 3 && (
 <Step3 form={form} onChange={updateForm} t={t} />
 )}
 {step === 4 && (
 <Step4 form={form} onChange={updateForm} t={t} />
 )}
 {step === 5 && (
 <Step5 form={form} categories={categories} t={t} />
 )}

 {/* Validation error */}
 {validationError && (
 <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
 {validationError}
 </div>
 )}

 {/* Submit error */}
 {submitStatus === 'error' && submitError && (
 <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400">
 {submitError}
 </div>
 )}
 </div>

 {/* Card footer / Navigation */}
 <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
 <button
 type="button"
 onClick={goPrev}
 disabled={step === 1}
 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
 >
 <ChevronLeft size={16} />
 {t('gigWizard.previous')}
 </button>

 <div className="flex items-center gap-2">
 {step < STEPS ? (
 <button
 type="button"
 onClick={goNext}
 className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
 >
 {t('gigWizard.next')}
 <ChevronRight size={16} />
 </button>
 ) : (
 <>
 <button
 type="button"
 onClick={() =>handleSubmit('draft')}
 disabled={submitStatus === 'submitting'}
 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
 >
 {submitStatus === 'submitting' ? '...' : t('gigWizard.saveDraft')}
 </button>
 <button
 type="button"
 onClick={() =>handleSubmit('pending')}
 disabled={submitStatus === 'submitting'}
 className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
 >
 {submitStatus === 'submitting' ? '...' : t('gigWizard.publish')}
 </button>
 </>
 )}
 </div>
 </div>
 </div>
 </div>
 );
}
