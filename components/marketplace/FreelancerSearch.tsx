'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { FreelancerCard } from './FreelancerCard';
import type { FreelancerProfile } from '@/lib/marketplace-queries';

interface FreelancerSearchProps {
 freelancers: FreelancerProfile[];
 searchPlaceholder: string;
 noFreelancersText: string;
}

export function FreelancerSearch({
 freelancers,
 searchPlaceholder,
 noFreelancersText,
}: FreelancerSearchProps) {
 const [searchQuery, setSearchQuery] = useState('');

 const filteredFreelancers = useMemo(() =>{
 if (!searchQuery.trim()) {
 return freelancers;
 }

 const query = searchQuery.toLowerCase().trim();

 return freelancers.filter((freelancer) =>{
 const name = (freelancer.display_name || '').toLowerCase();
 const tagline = (freelancer.tagline || '').toLowerCase();
 const bio = (freelancer.bio || '').toLowerCase();
 const skills = Array.isArray(freelancer.skills)
 ? freelancer.skills.join(' ').toLowerCase()
 : '';
 const location = [freelancer.location_city, freelancer.location_country]
 .filter(Boolean)
 .join(' ')
 .toLowerCase();

 return (
 name.includes(query) ||
 tagline.includes(query) ||
 bio.includes(query) ||
 skills.includes(query) ||
 location.includes(query)
 );
 });
 }, [freelancers, searchQuery]);

 return (
 <>
 {/* Search Bar */}
 <div className="mb-8 max-w-xl mx-auto">
 <div className="relative">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
 <input
 type="text"
 value={searchQuery}
 onChange={(e) =>setSearchQuery(e.target.value)}
 placeholder={searchPlaceholder}
 className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ef2b70] focus:border-transparent transition"
 />
 </div>
 </div>

 {/* Results Count */}
 {searchQuery.trim() && (
 <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
 {filteredFreelancers.length} result{filteredFreelancers.length !== 1 ? 's' : ''} found
 </p>
 )}

 {/* Freelancer Grid */}
 {filteredFreelancers.length === 0 ? (
 <div className="text-center py-16">
 <p className="text-gray-500 dark:text-gray-400 text-lg">{noFreelancersText}</p>
 </div>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
 {filteredFreelancers.map((freelancer) =>(
 <FreelancerCard key={freelancer.id} freelancer={freelancer} />
 ))}
 </div>
 )}
 </>
 );
}
