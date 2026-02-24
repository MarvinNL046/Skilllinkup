'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { BadgeCheck, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { safeImage, safeText } from '@/lib/safe';

interface BidCardProps {
 bid: {
 id: string;
 freelancer_id: string;
 freelancer_name: string;
 freelancer_avatar: string | null;
 freelancer_rating: number;
 freelancer_verified: boolean;
 amount: number;
 currency: string;
 delivery_days: number;
 pitch: string;
 status: string;
 created_at: string;
 };
 isOwner?: boolean;
 projectId: string;
 onSelected?: (bidId: string) =>void;
}

function formatCurrency(amount: number, currency: string): string {
 try {
 return new Intl.NumberFormat('en-US', {
 style: 'currency',
 currency,
 minimumFractionDigits: 0,
 maximumFractionDigits: 0,
 }).format(amount);
 } catch {
 return `${currency} ${amount}`;
 }
}

export function BidCard({ bid, isOwner = false, projectId, onSelected }: BidCardProps) {
 const t = useTranslations('projects');
 const [selecting, setSelecting] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const freelancerName = safeText(bid.freelancer_name, 'Freelancer');
 const avatarSrc = safeImage(bid.freelancer_avatar, '');
 const rating = Number(bid.freelancer_rating) || 0;
 const isAccepted = bid.status === 'accepted';
 const isRejected = bid.status === 'rejected';

 const handleSelect = async () =>{
 if (selecting) return;
 setSelecting(true);
 setError(null);

 try {
 const res = await fetch(`/api/marketplace/projects/${projectId}/select`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ bid_id: bid.id }),
 });

 const data = await res.json();

 if (!res.ok) {
 setError(data.error ?? 'Failed to select freelancer. Please try again.');
 return;
 }

 onSelected?.(bid.id);
 } catch {
 setError('Network error. Please try again.');
 } finally {
 setSelecting(false);
 }
 };

 return (
 <div
 className={`bg-white dark:bg-gray-800 rounded-xl border p-5 transition-colors ${
 isAccepted
 ? 'border-accent/50 bg-accent/5 dark:bg-accent/10'
 : isRejected
 ? 'border-gray-200 dark:border-gray-700 opacity-60'
 : 'border-gray-200 dark:border-gray-700 hover:border-primary/30'
 }`}
 >
 {/* Freelancer info */}
 <div className="flex items-start gap-3 mb-3">
 <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
 {avatarSrc ? (
 <Image
 src={avatarSrc}
 alt={freelancerName}
 fill
 sizes="40px"
 className="rounded-full object-cover"
 />
 ) : (
 <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-semibold text-sm">
 {freelancerName.charAt(0).toUpperCase()}
 </div>
 )}
 </div>
 <div className="flex-1 min-w-0">
 <div className="flex items-center gap-1.5 flex-wrap">
 <span className="text-sm font-semibold text-gray-900 dark:text-white">
 {freelancerName}
 </span>
 {bid.freelancer_verified && (
 <BadgeCheck className="w-4 h-4 text-accent flex-shrink-0" aria-label="Verified" />
 )}
 {isAccepted && (
 <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
 <CheckCircle className="w-3 h-3" />
 {t('selected')}
 </span>
 )}
 </div>
 {rating >0 && (
 <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
 {rating.toFixed(1)} rating
 </p>
 )}
 </div>

 {/* Bid amount + delivery */}
 <div className="text-right flex-shrink-0">
 <p className="text-base font-bold text-primary">
 {formatCurrency(bid.amount, bid.currency)}
 </p>
 <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 justify-end mt-0.5">
 <Clock className="w-3 h-3" />
 <span>{bid.delivery_days}d</span>
 </div>
 </div>
 </div>

 {/* Pitch */}
 <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
 {bid.pitch}
 </p>

 {/* Select button (owner only, pending bids only) */}
 {isOwner && !isAccepted && !isRejected && (
 <div className="mt-4">
 {error && (
 <p className="text-xs text-red-500 dark:text-red-400 mb-2">{error}</p>
 )}
 <button
 onClick={handleSelect}
 disabled={selecting}
 className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
 >
 {selecting ? (
 <>
 <Loader2 className="w-4 h-4 animate-spin" />
 Selecting...
 </>
 ) : (
 <>
 <CheckCircle className="w-4 h-4" />
 {t('selectFreelancer')}
 </>
 )}
 </button>
 </div>
 )}
 </div>
 );
}
