'use client';

import { useState } from 'react';
import {
 BadgeCheck,
 Award,
 Sparkles,
 Shield,
 Trophy,
 LucideIcon,
} from 'lucide-react';
import { calculateBadges, type Badge } from '@/lib/badges';

// Map icon name strings to actual Lucide components
const ICON_MAP: Record<string, LucideIcon>= {
 BadgeCheck,
 Award,
 Sparkles,
 Shield,
 Trophy,
};

interface BadgeProfile {
 is_verified: boolean;
 rating_average: number;
 rating_count: number;
 total_orders: number;
 completion_rate: number;
 created_at: string;
}

interface FreelancerBadgesProps {
 profile: BadgeProfile;
 locale?: string;
 layout?: 'inline' | 'list';
}

function BadgePill({
 badge,
 locale,
 layout,
}: {
 badge: Badge;
 locale: string;
 layout: 'inline' | 'list';
}) {
 const [tooltipVisible, setTooltipVisible] = useState(false);

 const IconComponent = ICON_MAP[badge.icon] ?? BadgeCheck;
 const displayName = locale === 'nl' ? badge.nameNl : badge.name;
 const displayDescription = locale === 'nl' ? badge.descriptionNl : badge.description;

 if (layout === 'list') {
 return (
 <div className="relative flex items-center gap-2">
 <div
 className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 cursor-default select-none`}
 onMouseEnter={() =>setTooltipVisible(true)}
 onMouseLeave={() =>setTooltipVisible(false)}
 onFocus={() =>setTooltipVisible(true)}
 onBlur={() =>setTooltipVisible(false)}
 tabIndex={0}
 aria-label={`${displayName}: ${displayDescription}`}
 >
 <IconComponent className={`w-3.5 h-3.5 flex-shrink-0 ${badge.color}`} />
 <span className={`text-xs font-medium ${badge.color}`}>{displayName}</span>
 </div>

 {tooltipVisible && (
 <div
 className="absolute left-full ml-2 z-20 px-2.5 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs whitespace-nowrap shadow-lg pointer-events-none"
 role="tooltip"
 >
 {displayDescription}
 <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700" />
 </div>
 )}
 </div>
 );
 }

 // inline layout (default)
 return (
 <div className="relative inline-flex">
 <div
 className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 cursor-default select-none`}
 onMouseEnter={() =>setTooltipVisible(true)}
 onMouseLeave={() =>setTooltipVisible(false)}
 onFocus={() =>setTooltipVisible(true)}
 onBlur={() =>setTooltipVisible(false)}
 tabIndex={0}
 aria-label={`${displayName}: ${displayDescription}`}
 >
 <IconComponent className={`w-3 h-3 flex-shrink-0 ${badge.color}`} />
 <span className={`text-xs font-medium ${badge.color}`}>{displayName}</span>
 </div>

 {tooltipVisible && (
 <div
 className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 px-2.5 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs whitespace-nowrap shadow-lg pointer-events-none"
 role="tooltip"
 >
 {displayDescription}
 <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
 </div>
 )}
 </div>
 );
}

export function FreelancerBadges({
 profile,
 locale = 'en',
 layout = 'inline',
}: FreelancerBadgesProps) {
 const badges = calculateBadges(profile);

 if (badges.length === 0) return null;

 if (layout === 'list') {
 return (
 <div className="flex flex-col gap-1.5">
 {badges.map((badge) =>(
 <BadgePill key={badge.id} badge={badge} locale={locale} layout="list" />
 ))}
 </div>
 );
 }

 return (
 <div className="flex flex-wrap gap-1.5">
 {badges.map((badge) =>(
 <BadgePill key={badge.id} badge={badge} locale={locale} layout="inline" />
 ))}
 </div>
 );
}
