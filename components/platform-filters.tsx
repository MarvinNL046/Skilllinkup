'use client';

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useTranslations } from 'next-intl';

interface Platform {
 id: string;
 name: string;
 slug: string;
 category: string;
 rating: number;
 difficulty: string;
 fees: string | null;
 featured: boolean;
 work_type: string;
 countries: string[];
}

interface PlatformCategory {
 category: string;
 count: number;
}

interface PlatformFiltersProps {
 platforms: Platform[];
 categories: PlatformCategory[];
}

export function PlatformFilters({ platforms, categories }: PlatformFiltersProps) {
 const router = useRouter();
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const t = useTranslations('platformFilters');

 // Get current filters from URL
 const selectedCategory = searchParams.get('category') || 'All Platforms';
 const selectedDifficulties = searchParams.get('difficulty')?.split(',').filter(Boolean) || [];
 const selectedRatings = searchParams.get('rating')?.split(',').filter(Boolean) || [];
 const searchQuery = searchParams.get('search') || '';
 const sortBy = searchParams.get('sort') || 'rating';
 const selectedWorkType = searchParams.get('work_type') || 'all';
 const selectedCountry = searchParams.get('country') || 'all';

 // Create URL with new params
 const createQueryString = useCallback(
 (updates: Record<string, string | null>) =>{
 const params = new URLSearchParams(searchParams.toString());

 Object.entries(updates).forEach(([name, value]) =>{
 if (value === null || value === '') {
 params.delete(name);
 } else {
 params.set(name, value);
 }
 });

 return params.toString();
 },
 [searchParams]
 );

 // Filter and sort platforms
 const filteredPlatforms = useMemo(() =>{
 let filtered = platforms;

 // Category filter
 if (selectedCategory && selectedCategory !== 'All Platforms') {
 filtered = filtered.filter(p =>p.category === selectedCategory);
 }

 // Difficulty filter
 if (selectedDifficulties.length >0) {
 filtered = filtered.filter(p =>selectedDifficulties.includes(p.difficulty));
 }

 // Rating filter
 if (selectedRatings.length >0) {
 filtered = filtered.filter(p =>{
 return selectedRatings.some(rating =>{
 if (rating === '4.5') return p.rating >= 4.5;
 if (rating === '4.0') return p.rating >= 4.0 && p.rating < 4.5;
 if (rating === '3.5') return p.rating >= 3.5 && p.rating < 4.0;
 return false;
 });
 });
 }

 // Work type filter
 if (selectedWorkType !== 'all') {
 filtered = filtered.filter(p =>p.work_type === selectedWorkType);
 }

 // Country filter (check if country is in the countries array or is Worldwide)
 if (selectedCountry !== 'all') {
 filtered = filtered.filter(p =>{
 if (!p.countries || !Array.isArray(p.countries)) return false;
 return p.countries.includes(selectedCountry) || p.countries.includes('Worldwide');
 });
 }

 // Search filter
 if (searchQuery) {
 const query = searchQuery.toLowerCase();
 filtered = filtered.filter(p =>
 p.name.toLowerCase().includes(query) ||
 p.category.toLowerCase().includes(query)
 );
 }

 // Sort
 switch (sortBy) {
 case 'rating':
 filtered = [...filtered].sort((a, b) =>b.rating - a.rating);
 break;
 case 'name':
 filtered = [...filtered].sort((a, b) =>a.name.localeCompare(b.name));
 break;
 case 'difficulty':
 const difficultyOrder: Record<string, number>= { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
 filtered = [...filtered].sort((a, b) =>
 (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0)
 );
 break;
 }

 return filtered;
 }, [platforms, selectedCategory, selectedDifficulties, selectedRatings, searchQuery, sortBy, selectedWorkType, selectedCountry]);

 // Handle category change
 const handleCategoryChange = (category: string) =>{
 const query = createQueryString({
 category: category === 'All Platforms' ? null : category,
 });
 router.push(`${pathname}?${query}`);
 };

 // Handle difficulty toggle
 const handleDifficultyToggle = (difficulty: string) =>{
 const newDifficulties = selectedDifficulties.includes(difficulty)
 ? selectedDifficulties.filter(d =>d !== difficulty)
 : [...selectedDifficulties, difficulty];

 const query = createQueryString({
 difficulty: newDifficulties.length >0 ? newDifficulties.join(',') : null,
 });
 router.push(`${pathname}?${query}`);
 };

 // Handle rating toggle
 const handleRatingToggle = (rating: string) =>{
 const newRatings = selectedRatings.includes(rating)
 ? selectedRatings.filter(r =>r !== rating)
 : [...selectedRatings, rating];

 const query = createQueryString({
 rating: newRatings.length >0 ? newRatings.join(',') : null,
 });
 router.push(`${pathname}?${query}`);
 };

 // Handle search
 const handleSearch = (value: string) =>{
 const query = createQueryString({
 search: value || null,
 });
 router.push(`${pathname}?${query}`);
 };

 // Handle sort
 const handleSort = (value: string) =>{
 const query = createQueryString({
 sort: value,
 });
 router.push(`${pathname}?${query}`);
 };

 // Handle work type change
 const handleWorkTypeChange = (workType: string) =>{
 const query = createQueryString({
 work_type: workType === 'all' ? null : workType,
 });
 router.push(`${pathname}?${query}`);
 };

 // Handle country change
 const handleCountryChange = (country: string) =>{
 const query = createQueryString({
 country: country === 'all' ? null : country,
 });
 router.push(`${pathname}?${query}`);
 };

 const getDifficultyBadgeClass = (difficulty: string) =>{
 switch (difficulty) {
 case 'Easy':
 return 'badge-success';
 case 'Medium':
 return 'badge-warning';
 case 'Hard':
 return 'badge-danger';
 default:
 return 'badge-secondary';
 }
 };

 return (
 <>
 {/* Search Bar */}
 <div className="row mb30">
 <div className="col-lg-8 offset-lg-2">
 <div className="position-relative">
 <input
 type="text"
 placeholder={t('searchPlaceholder')}
 value={searchQuery}
 onChange={(e) =>handleSearch(e.target.value)}
 className="form-control bdrs12 py15 px50"
 style={{ paddingLeft: '48px', height: '56px', fontSize: '15px' }}
 />
 <svg
 style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#6c757d' }}
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
 />
 </svg>
 </div>
 </div>
 </div>

 <div className="row">
 {/* Sidebar Filters */}
 <div className="col-lg-3">
 <div className="ps-widget bgc-white bdrs12 bdr1 p30" style={{ position: 'sticky', top: '16px' }}>
 {/* Categories */}
 <h6 className="fw600 mb20">{t('categories')}</h6>
 <ul className="list-unstyled mb0">
 {categories.map((cat) => (
 <li key={cat.category} className="mb5">
 <button
 onClick={() =>handleCategoryChange(cat.category)}
 className={`w-100 d-flex align-items-center justify-content-between px15 py10 bdrs8 text-start border-0 ${
 selectedCategory === cat.category
 ? 'bgc-thm text-white'
 : 'bg-transparent body-color'
 }`}
 style={{ transition: 'all 0.2s' }}
 >
 <span className="fw500">{cat.category}</span>
 <span className={`fz12 ${selectedCategory === cat.category ? 'text-white' : 'text-muted'}`}>
 {cat.count}
 </span>
 </button>
 </li>
 ))}
 </ul>

 <hr className="my20" />

 {/* Difficulty */}
 <h6 className="fw600 mb15">{t('difficulty')}</h6>
 <div>
 {[
 { value: 'Easy', label: t('easy') },
 { value: 'Medium', label: t('medium') },
 { value: 'Hard', label: t('hard') }
 ].map((level) => (
 <label key={level.value} className="d-flex align-items-center mb10" style={{ cursor: 'pointer', gap: '8px' }}>
 <input
 type="checkbox"
 checked={selectedDifficulties.includes(level.value)}
 onChange={() =>handleDifficultyToggle(level.value)}
 className="form-check-input"
 style={{ width: '16px', height: '16px', flexShrink: 0 }}
 />
 <span className="fz14 body-color">{level.label}</span>
 </label>
 ))}
 </div>

 <hr className="my20" />

 {/* Rating */}
 <h6 className="fw600 mb15">{t('rating')}</h6>
 <div>
 {[
 { label: t('rating45Plus'), value: '4.5' },
 { label: t('rating40To44'), value: '4.0' },
 { label: t('rating35To39'), value: '3.5' },
 ].map((rating) => (
 <label key={rating.value} className="d-flex align-items-center mb10" style={{ cursor: 'pointer', gap: '8px' }}>
 <input
 type="checkbox"
 checked={selectedRatings.includes(rating.value)}
 onChange={() =>handleRatingToggle(rating.value)}
 className="form-check-input"
 style={{ width: '16px', height: '16px', flexShrink: 0 }}
 />
 <span className="fz14 body-color">{rating.label}</span>
 </label>
 ))}
 </div>

 <hr className="my20" />

 {/* Work Type */}
 <h6 className="fw600 mb15">{t('workType')}</h6>
 <select
 value={selectedWorkType}
 onChange={(e) =>handleWorkTypeChange(e.target.value)}
 className="form-select bdrs8 fz14"
 >
 <option value="all">{t('allWorkTypes')}</option>
 <option value="remote">{t('remoteOnly')}</option>
 <option value="local">{t('localOnly')}</option>
 <option value="hybrid">{t('hybrid')}</option>
 </select>

 <hr className="my20" />

 {/* Country */}
 <h6 className="fw600 mb15">{t('country')}</h6>
 <select
 value={selectedCountry}
 onChange={(e) =>handleCountryChange(e.target.value)}
 className="form-select bdrs8 fz14"
 >
 <option value="all">{t('allCountries')}</option>
 <option value="Worldwide">{t('worldwide')}</option>
 <option value="NL">{t('netherlands')}</option>
 <option value="BE">{t('belgium')}</option>
 <option value="DE">{t('germany')}</option>
 <option value="FR">{t('france')}</option>
 <option value="US">{t('unitedStates')}</option>
 </select>
 </div>
 </div>

 {/* Platforms Grid */}
 <div className="col-lg-9">
 {/* Sort & Count bar */}
 <div className="d-flex align-items-center justify-content-between mb20">
 <p className="fz14 body-color mb0">
 {filteredPlatforms.length === 1
 ? t('showingCountSingular', { count: filteredPlatforms.length })
 : t('showingCount', { count: filteredPlatforms.length, plural: 's' })
 }
 </p>
 <select
 value={sortBy}
 onChange={(e) =>handleSort(e.target.value)}
 className="form-select bdrs8 fz14 w-auto"
 >
 <option value="rating">{t('sortByRating')}</option>
 <option value="name">{t('sortByName')}</option>
 <option value="difficulty">{t('sortByDifficulty')}</option>
 </select>
 </div>

 {filteredPlatforms.length === 0 ? (
 <div className="ps-widget bgc-white bdrs12 bdr1 p30 text-center">
 <p className="fz16 body-color mb20">{t('noPlatformsFound')}</p>
 <button
 onClick={() =>router.push('/platforms')}
 className="ud-btn btn-thm2"
 >
 {t('clearAllFilters')}
 </button>
 </div>
 ) : (
 <div className="row">
 {filteredPlatforms.map((platform) => (
 <div key={platform.id} className="col-sm-6 col-xl-4">
 <div className="freelancer-style1 bdrs12 bdr1 hover-box-shadow mb25 p30 position-relative">
 {/* Featured Badge */}
 {platform.featured && (
 <div className="position-absolute" style={{ top: '12px', right: '12px' }}>
 <span className="ud-btn btn-thm bdrs4" style={{ padding: '2px 10px', fontSize: '11px' }}>
 ★
 </span>
 </div>
 )}

 {/* Platform Name */}
 <a href={`/platforms/${platform.slug}`}>
 <h5 className="fw600 mb10">{platform.name}</h5>
 </a>

 {/* Rating */}
 <div className="d-flex align-items-center mb15" style={{ gap: '6px' }}>
 <div className="d-flex" style={{ gap: '2px' }}>
 {[...Array(5)].map((_, i) => (
 <svg
 key={i}
 width="14"
 height="14"
 fill={i < Math.floor(platform.rating) ? '#f5a623' : '#e0e0e0'}
 viewBox="0 0 20 20"
 >
 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
 </svg>
 ))}
 </div>
 <span className="fz14 fw600">{Number(platform.rating).toFixed(1)}</span>
 </div>

 {/* Details */}
 <div className="mb20">
 <div className="d-flex align-items-center justify-content-between mb8 fz13">
 <span className="body-color">{t('categoryLabel')}</span>
 <span className="fw600 text-thm">{platform.category}</span>
 </div>
 {platform.fees && (
 <div className="d-flex align-items-center justify-content-between mb8 fz13">
 <span className="body-color">{t('feesLabel')}</span>
 <span className="fw600">{platform.fees}</span>
 </div>
 )}
 <div className="d-flex align-items-center justify-content-between fz13">
 <span className="body-color">{t('difficultyLabel')}</span>
 <span className={`badge ${getDifficultyBadgeClass(platform.difficulty)} bdrs4`}>
 {platform.difficulty}
 </span>
 </div>
 </div>

 {/* CTA */}
 <a
 href={`/platforms/${platform.slug}`}
 className="ud-btn btn-thm2 w-100 text-center"
 >
 {t('readReview')}
 </a>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>
 </>
 );
}
