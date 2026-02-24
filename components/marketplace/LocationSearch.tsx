'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import {
 Search,
 MapPin,
 Navigation,
 Star,
 CheckCircle,
 AlertCircle,
 Loader2,
} from 'lucide-react';
import { DUTCH_CITIES } from '@/lib/geocoding';
import { safeImage, safeText, safeNumber, safeArray } from '@/lib/safe';

interface NearbyFreelancer {
 id: string;
 user_id: string;
 display_name: string | null;
 tagline: string | null;
 avatar_url: string | null;
 hourly_rate: number | null;
 work_type: string;
 location_city: string | null;
 location_country: string | null;
 skills: string[];
 is_verified: boolean;
 rating_average: number;
 rating_count: number;
 distance_km: number;
}

const RADIUS_OPTIONS = [5, 10, 25, 50, 100];

export function LocationSearch() {
 const locale = useLocale();
 const t = useTranslations('localServices');

 const [query, setQuery] = useState('');
 const [radius, setRadius] = useState(25);
 const [freelancers, setFreelancers] = useState<NearbyFreelancer[]>([]);
 const [loading, setLoading] = useState(false);
 const [searched, setSearched] = useState(false);
 const [error, setError] = useState<string | null>(null);
 const [currentLocation, setCurrentLocation] = useState<{
 lat: number;
 lon: number;
 label: string;
 } | null>(null);

 const searchNearby = useCallback(
 async (lat: number, lon: number) =>{
 setLoading(true);
 setError(null);
 try {
 const params = new URLSearchParams({
 lat: String(lat),
 lon: String(lon),
 radius: String(radius),
 limit: '20',
 });
 const res = await fetch(`/api/marketplace/freelancers/nearby?${params.toString()}`);
 if (!res.ok) {
 throw new Error(`HTTP ${res.status}`);
 }
 const data = await res.json();
 setFreelancers(data.freelancers ?? []);
 setSearched(true);
 } catch {
 setError('Failed to search. Please try again.');
 setFreelancers([]);
 } finally {
 setLoading(false);
 }
 },
 [radius]
 );

 const handleSearch = useCallback(async () =>{
 if (!query.trim()) return;

 setLoading(true);
 setError(null);

 // Check local Dutch cities lookup first (instant, no network)
 const normalizedQuery = query.trim().toLowerCase();
 const localCoords = DUTCH_CITIES[normalizedQuery];

 if (localCoords) {
 setCurrentLocation({ lat: localCoords.lat, lon: localCoords.lon, label: query.trim() });
 await searchNearby(localCoords.lat, localCoords.lon);
 return;
 }

 // Fall back to Nominatim geocoding
 try {
 const res = await fetch(
 `/api/geocode?q=${encodeURIComponent(query.trim())}`
 );
 if (res.ok) {
 const data = await res.json();
 if (data.lat && data.lon) {
 setCurrentLocation({ lat: data.lat, lon: data.lon, label: query.trim() });
 await searchNearby(data.lat, data.lon);
 return;
 }
 }
 } catch {
 // Nominatim unavailable, continue
 }

 setError('Location not found. Try a different city or postcode.');
 setLoading(false);
 }, [query, searchNearby]);

 const handleUseMyLocation = useCallback(() =>{
 if (!navigator.geolocation) {
 setError('Geolocation is not supported by your browser.');
 return;
 }
 setLoading(true);
 setError(null);
 navigator.geolocation.getCurrentPosition(
 async (position) =>{
 const lat = position.coords.latitude;
 const lon = position.coords.longitude;
 setCurrentLocation({ lat, lon, label: 'My Location' });
 await searchNearby(lat, lon);
 },
 () =>{
 setError('Could not get your location. Please enter a city manually.');
 setLoading(false);
 },
 { timeout: 10000 }
 );
 }, [searchNearby]);

 const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{
 if (e.key === 'Enter') {
 handleSearch();
 }
 };

 return (
 <div className="w-full">
 {/* Search Controls */}
 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
 <div className="flex flex-col sm:flex-row gap-3 mb-5">
 {/* City / Postcode input */}
 <div className="relative flex-1">
 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
 <input
 type="text"
 value={query}
 onChange={(e) =>setQuery(e.target.value)}
 onKeyDown={handleKeyDown}
 placeholder={t('searchPlaceholder')}
 className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base transition-colors"
 />
 </div>

 {/* Search button */}
 <button
 onClick={handleSearch}
 disabled={loading || !query.trim()}
 className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
 >
 {loading ? (
 <Loader2 className="w-4 h-4 animate-spin" />
 ) : (
 <Search className="w-4 h-4" />
 )}
 {loading ? t('searching') : t('useMyLocation').replace('Use my location', 'Search')}
 </button>

 {/* Use my location button */}
 <button
 onClick={handleUseMyLocation}
 disabled={loading}
 className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-lg transition-colors whitespace-nowrap"
 >
 <Navigation className="w-4 h-4" />
 <span className="hidden sm:inline">{t('useMyLocation')}</span>
 </button>
 </div>

 {/* Radius slider */}
 <div className="flex flex-col sm:flex-row sm:items-center gap-3">
 <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
 {t('radius')}:
 </span>
 <div className="flex items-center gap-2 flex-wrap">
 {RADIUS_OPTIONS.map((r) =>(
 <button
 key={r}
 onClick={() =>setRadius(r)}
 className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
 radius === r
 ? 'bg-primary text-white'
 : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
 }`}
 >
 {r} {t('km')}
 </button>
 ))}
 </div>
 </div>
 </div>

 {/* Error message */}
 {error && (
 <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
 <AlertCircle className="w-5 h-5 flex-shrink-0" />
 <span className="text-sm">{error}</span>
 </div>
 )}

 {/* Results */}
 {searched && !loading && (
 <div>
 {/* Results count */}
 <div className="flex items-center justify-between mb-5">
 <p className="text-sm text-gray-600 dark:text-gray-400">
 {freelancers.length >0 ? (
 <>
 <span className="font-semibold text-gray-900 dark:text-white">
 {freelancers.length}
 </span>{' '}
 {t('results')}
 {currentLocation && (
 <span>
 {' '}
 near{' '}
 <span className="font-medium text-primary">{currentLocation.label}</span>
 </span>
 )}
 </>
 ) : (
 t('noResults')
 )}
 </p>
 {currentLocation && (
 <span className="text-xs text-gray-400 dark:text-gray-500">
 within {radius} {t('km')}
 </span>
 )}
 </div>

 {freelancers.length >0 ? (
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
 {freelancers.map((freelancer) =>(
 <LocalFreelancerCard
 key={freelancer.id}
 freelancer={freelancer}
 locale={locale}
 kmAwayLabel={t('kmAway')}
 />
 ))}
 </div>
 ) : (
 <div className="text-center py-16 text-gray-400 dark:text-gray-500">
 <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
 <p className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">
 {t('noResults')}
 </p>
 <p className="text-sm">{t('tryLargerRadius')}</p>
 </div>
 )}
 </div>
 )}
 </div>
 );
}

// --- Inner card component (not exported) ---

interface LocalFreelancerCardProps {
 freelancer: NearbyFreelancer;
 locale: string;
 kmAwayLabel: string;
}

function LocalFreelancerCard({ freelancer, locale, kmAwayLabel }: LocalFreelancerCardProps) {
 const displayName = safeText(freelancer.display_name, 'Unknown');
 const tagline = safeText(freelancer.tagline, '');
 const avatarUrl = safeImage(freelancer.avatar_url, '');
 const skills = safeArray<string>(freelancer.skills);
 const rating = safeNumber(freelancer.rating_average, 0);
 const ratingCount = safeNumber(freelancer.rating_count, 0);
 const hourlyRate = freelancer.hourly_rate ? safeNumber(freelancer.hourly_rate, 0) : null;
 const distanceKm = safeNumber(freelancer.distance_km, 0);
 const locationCity = safeText(freelancer.location_city, '');
 const locationCountry = safeText(freelancer.location_country, '');

 const locationText = [locationCity, locationCountry].filter(Boolean).join(', ');
 const visibleSkills = skills.slice(0, 3);
 const remainingSkills = skills.length >3 ? skills.length - 3 : 0;
 const profileUrl = `/${locale}/marketplace/freelancers/${freelancer.user_id}`;

 return (
 <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col">
 <div className="p-5 flex-1">
 {/* Distance badge */}
 <div className="flex items-center justify-between mb-3">
 <span className="inline-flex items-center gap-1 text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
 <MapPin className="w-3 h-3" />
 {distanceKm.toFixed(1)} {kmAwayLabel}
 </span>
 {freelancer.is_verified && (
 <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">
 <CheckCircle className="w-3 h-3" />
 Verified
 </span>
 )}
 </div>

 {/* Avatar + Name */}
 <div className="flex items-start gap-3 mb-3">
 <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
 {avatarUrl ? (
 <Image
 src={avatarUrl}
 alt={displayName}
 width={48}
 height={48}
 className="object-cover w-full h-full"
 onError={(e) =>{
 (e.target as HTMLImageElement).style.display = 'none';
 }}
 />
 ) : (
 <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-semibold text-base">
 {displayName.charAt(0).toUpperCase()}
 </div>
 )}
 </div>
 <div className="flex-1 min-w-0">
 <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
 {displayName}
 </h3>
 {tagline && (
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
 {tagline}
 </p>
 )}
 </div>
 </div>

 {/* Rating */}
 <div className="flex items-center gap-3 mb-3">
 {rating >0 ? (
 <div className="flex items-center gap-1">
 <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
 <span className="text-sm font-semibold text-gray-900 dark:text-white">
 {rating.toFixed(1)}
 </span>
 <span className="text-xs text-gray-400">({ratingCount})</span>
 </div>
 ) : (
 <span className="text-xs text-gray-400 dark:text-gray-500">New</span>
 )}
 {locationText && (
 <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
 {locationText}
 </span>
 )}
 </div>

 {/* Skills */}
 {visibleSkills.length >0 && (
 <div className="flex flex-wrap gap-1.5">
 {visibleSkills.map((skill) =>(
 <span
 key={skill}
 className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full"
 >
 {skill}
 </span>
 ))}
 {remainingSkills >0 && (
 <span className="text-xs text-gray-400 px-1 py-0.5">+{remainingSkills}</span>
 )}
 </div>
 )}
 </div>

 {/* Footer */}
 <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
 {hourlyRate !== null && hourlyRate >0 ? (
 <div className="text-sm">
 <span className="font-bold text-gray-900 dark:text-white">€{hourlyRate}</span>
 <span className="text-gray-500 dark:text-gray-400 text-xs">/hr</span>
 </div>
 ) : (
 <div className="text-xs text-gray-400 dark:text-gray-500">Rate on request</div>
 )}
 <Link
 href={profileUrl}
 className="text-xs font-medium text-primary hover:text-primary-dark transition-colors"
 >
 View Profile &rarr;
 </Link>
 </div>
 </div>
 );
}
