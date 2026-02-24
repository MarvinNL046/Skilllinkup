'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { ProjectCard } from './ProjectCard';

interface SerializableProject {
 id: string;
 client_id: string;
 client_name: string;
 title: string;
 slug: string;
 description: string;
 category_name: string;
 required_skills: string[];
 budget_min: number | null;
 budget_max: number | null;
 currency: string;
 deadline: string | null;
 work_type: string;
 location_city: string | null;
 location_country: string | null;
 bid_count: number;
 views: number;
 status: string;
 created_at: string;
}

interface SerializableCategory {
 id: string;
 name: string;
 slug: string;
}

interface ProjectFiltersProps {
 projects: SerializableProject[];
 categories: SerializableCategory[];
}

export function ProjectFilters({ projects, categories }: ProjectFiltersProps) {
 const router = useRouter();
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const t = useTranslations('projects');

 const [searchInput, setSearchInput] = useState(
 searchParams.get('search') || ''
 );

 const selectedCategory = searchParams.get('category') || 'all';
 const selectedWorkType = searchParams.get('work_type') || 'all';
 const sortBy = searchParams.get('sort') || 'newest';
 const searchQuery = searchParams.get('search') || '';

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

 const updateFilter = useCallback(
 (updates: Record<string, string | null>) =>{
 const qs = createQueryString(updates);
 router.push(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
 },
 [router, pathname, createQueryString]
 );

 const handleSearch = useCallback(() =>{
 updateFilter({ search: searchInput || null });
 }, [searchInput, updateFilter]);

 const handleKeyDown = useCallback(
 (e: React.KeyboardEvent<HTMLInputElement>) =>{
 if (e.key === 'Enter') {
 handleSearch();
 }
 },
 [handleSearch]
 );

 const clearFilters = useCallback(() =>{
 setSearchInput('');
 router.push(pathname, { scroll: false });
 }, [router, pathname]);

 const hasActiveFilters =
 selectedCategory !== 'all' ||
 selectedWorkType !== 'all' ||
 sortBy !== 'newest' ||
 searchQuery !== '';

 const filteredProjects = useMemo(() =>{
 let filtered = projects;

 if (searchQuery.trim()) {
 const q = searchQuery.toLowerCase();
 filtered = filtered.filter(
 (p) =>
 p.title.toLowerCase().includes(q) ||
 p.description.toLowerCase().includes(q) ||
 p.category_name.toLowerCase().includes(q) ||
 p.required_skills.some((s) =>s.toLowerCase().includes(q))
 );
 }

 if (selectedCategory !== 'all') {
 filtered = filtered.filter(
 (p) =>p.category_name.toLowerCase() === selectedCategory.toLowerCase()
 );
 }

 if (selectedWorkType !== 'all') {
 filtered = filtered.filter((p) =>p.work_type === selectedWorkType);
 }

 if (sortBy === 'newest') {
 filtered = [...filtered].sort(
 (a, b) =>
 new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
 );
 } else if (sortBy === 'bids') {
 filtered = [...filtered].sort((a, b) =>b.bid_count - a.bid_count);
 } else if (sortBy === 'budget_high') {
 filtered = [...filtered].sort(
 (a, b) =>(b.budget_max ?? 0) - (a.budget_max ?? 0)
 );
 } else if (sortBy === 'budget_low') {
 filtered = [...filtered].sort(
 (a, b) =>(a.budget_min ?? 0) - (b.budget_min ?? 0)
 );
 }

 return filtered;
 }, [projects, searchQuery, selectedCategory, selectedWorkType, sortBy]);

 return (
 <div>
 {/* Filter bar */}
 <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-4 mb-6 shadow-sm">
 <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
 {/* Search */}
 <div className="flex-1 flex gap-2 min-w-[200px]">
 <div className="relative flex-1">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
 <input
 type="text"
 value={searchInput}
 onChange={(e) =>setSearchInput(e.target.value)}
 onKeyDown={handleKeyDown}
 placeholder="Search projects..."
 className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 <button
 onClick={handleSearch}
 className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shrink-0"
 >
 Search
 </button>
 </div>

 {/* Category filter */}
 <div className="relative">
 <select
 value={selectedCategory}
 onChange={(e) =>
 updateFilter({
 category: e.target.value === 'all' ? null : e.target.value,
 })
 }
 className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
 >
 <option value="all">All Categories</option>
 {categories.map((cat) =>(
 <option key={cat.id} value={cat.slug}>
 {cat.name}
 </option>
 ))}
 </select>
 <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
 </div>

 {/* Work type filter */}
 <div className="relative">
 <select
 value={selectedWorkType}
 onChange={(e) =>
 updateFilter({
 work_type: e.target.value === 'all' ? null : e.target.value,
 })
 }
 className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
 >
 <option value="all">All Types</option>
 <option value="remote">{t('remote')}</option>
 <option value="local">{t('local')}</option>
 <option value="hybrid">{t('hybrid')}</option>
 </select>
 <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
 </div>

 {/* Sort */}
 <div className="relative">
 <select
 value={sortBy}
 onChange={(e) =>
 updateFilter({
 sort: e.target.value === 'newest' ? null : e.target.value,
 })
 }
 className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
 >
 <option value="newest">Newest First</option>
 <option value="bids">Most Bids</option>
 <option value="budget_high">Highest Budget</option>
 <option value="budget_low">Lowest Budget</option>
 </select>
 <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
 </div>

 {/* Clear filters */}
 {hasActiveFilters && (
 <button
 onClick={clearFilters}
 className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary border border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary transition-colors shrink-0"
 >
 <X className="w-4 h-4" />
 Clear
 </button>
 )}
 </div>
 </div>

 {/* Results count */}
 <div className="flex items-center justify-between mb-4">
 <p className="text-sm text-gray-500 dark:text-gray-400">
 <Filter className="inline w-4 h-4 mr-1 -mt-0.5" />
 {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
 </p>
 </div>

 {/* Projects grid */}
 {filteredProjects.length >0 ? (
 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
 {filteredProjects.map((project) =>(
 <ProjectCard
 key={project.id}
 id={project.id}
 slug={project.slug}
 title={project.title}
 description={project.description}
 category_name={project.category_name}
 required_skills={project.required_skills}
 budget_min={project.budget_min}
 budget_max={project.budget_max}
 currency={project.currency}
 deadline={project.deadline}
 work_type={project.work_type}
 location_city={project.location_city}
 location_country={project.location_country}
 bid_count={project.bid_count}
 client_name={project.client_name}
 status={project.status}
 created_at={project.created_at}
 />
 ))}
 </div>
 ) : (
 <div className="flex flex-col items-center justify-center py-20 text-center">
 <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
 <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
 No projects found
 </p>
 {hasActiveFilters && (
 <button
 onClick={clearFilters}
 className="mt-4 text-sm text-primary hover:underline"
 >
 Clear filters
 </button>
 )}
 </div>
 )}
 </div>
 );
}
