export interface Badge {
 id: string;
 name: string;
 nameNl: string;
 icon: string; // lucide icon name
 color: string; // tailwind color class
 description: string;
 descriptionNl: string;
}

export function calculateBadges(profile: {
 is_verified: boolean;
 rating_average: number;
 rating_count: number;
 total_orders: number;
 completion_rate: number;
 created_at: string;
}): Badge[] {
 const badges: Badge[] = [];

 // Verified - ID verified by admin
 if (profile.is_verified) {
 badges.push({
 id: 'verified',
 name: 'Verified',
 nameNl: 'Geverifieerd',
 icon: 'BadgeCheck',
 color: 'text-blue-500',
 description: 'Identity verified',
 descriptionNl: 'Identiteit geverifieerd',
 });
 }

 // Top Rated - rating >= 4.8 with 10+ reviews
 if (profile.rating_average >= 4.8 && profile.rating_count >= 10) {
 badges.push({
 id: 'top_rated',
 name: 'Top Rated',
 nameNl: 'Topbeoordeeld',
 icon: 'Award',
 color: 'text-yellow-500',
 description: 'Exceptional ratings from clients',
 descriptionNl: 'Uitzonderlijke beoordelingen van klanten',
 });
 }

 // Rising Star - new freelancer (< 6 months) with 5+ orders and 4.5+ rating
 const sixMonthsAgo = new Date();
 sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
 const createdAt = new Date(profile.created_at);
 if (createdAt >sixMonthsAgo && profile.total_orders >= 5 && profile.rating_average >= 4.5) {
 badges.push({
 id: 'rising_star',
 name: 'Rising Star',
 nameNl: 'Rijzende Ster',
 icon: 'Sparkles',
 color: 'text-purple-500',
 description: 'Promising new freelancer',
 descriptionNl: 'Veelbelovende nieuwe freelancer',
 });
 }

 // Reliable - 95%+ completion rate with 10+ orders
 if (profile.completion_rate >= 95 && profile.total_orders >= 10) {
 badges.push({
 id: 'reliable',
 name: 'Reliable',
 nameNl: 'Betrouwbaar',
 icon: 'Shield',
 color: 'text-green-500',
 description: '95%+ completion rate',
 descriptionNl: '95%+ voltooiingspercentage',
 });
 }

 // Experienced - 50+ orders
 if (profile.total_orders >= 50) {
 badges.push({
 id: 'experienced',
 name: 'Experienced',
 nameNl: 'Ervaren',
 icon: 'Trophy',
 color: 'text-orange-500',
 description: '50+ completed orders',
 descriptionNl: '50+ afgeronde bestellingen',
 });
 }

 return badges;
}
