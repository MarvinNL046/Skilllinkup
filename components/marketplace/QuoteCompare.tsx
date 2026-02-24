'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUpDown, Star, Clock, DollarSign, MessageSquare } from 'lucide-react';
import { QuoteCard, QuoteData } from './QuoteCard';

type SortKey = 'price' | 'rating' | 'delivery';

interface QuoteCompareProps {
 quotes: QuoteData[];
 quoteRequestId: string;
 isOwner: boolean;
}

export function QuoteCompare({
 quotes: initialQuotes,
 quoteRequestId,
 isOwner,
}: QuoteCompareProps) {
 const t = useTranslations('quotes');
 const [quotes, setQuotes] = useState<QuoteData[]>(initialQuotes);
 const [sortKey, setSortKey] = useState<SortKey>('price');

 const handleAccepted = (acceptedQuoteId: string) =>{
 setQuotes((prev) =>
 prev.map((q) =>
 q.id === acceptedQuoteId
 ? { ...q, status: 'accepted' }
 : q.status === 'pending'
 ? { ...q, status: 'rejected' }
 : q
 )
 );
 };

 const sorted = [...quotes].sort((a, b) =>{
 if (sortKey === 'price') {
 return Number(a.amount) - Number(b.amount);
 }
 if (sortKey === 'rating') {
 return Number(b.freelancer_rating) - Number(a.freelancer_rating);
 }
 if (sortKey === 'delivery') {
 const aDays = a.estimated_days ?? 999;
 const bDays = b.estimated_days ?? 999;
 return aDays - bDays;
 }
 return 0;
 });

 const SORT_OPTIONS: { key: SortKey; labelKey: 'sortByPrice' | 'sortByRating' | 'sortByDelivery'; icon: React.ReactNode }[] = [
 { key: 'price', labelKey: 'sortByPrice', icon: <DollarSign className="w-3.5 h-3.5" />},
 { key: 'rating', labelKey: 'sortByRating', icon: <Star className="w-3.5 h-3.5" />},
 { key: 'delivery', labelKey: 'sortByDelivery', icon: <Clock className="w-3.5 h-3.5" />},
 ];

 if (quotes.length === 0) {
 return (
 <div className="flex flex-col items-center justify-center py-16 text-center">
 <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
 <MessageSquare className="w-7 h-7 text-gray-400 dark:text-gray-500" />
 </div>
 <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
 {t('noQuotes')}
 </h3>
 <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
 {t('noQuotesDesc')}
 </p>
 </div>
 );
 }

 return (
 <div>
 {/* Sort controls */}
 <div className="flex items-center gap-2 mb-6 flex-wrap">
 <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
 <ArrowUpDown className="w-4 h-4" />
 <span className="font-medium">Sort:</span>
 </div>
 {SORT_OPTIONS.map((opt) =>(
 <button
 key={opt.key}
 onClick={() =>setSortKey(opt.key)}
 className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
 sortKey === opt.key
 ? 'bg-primary text-white'
 : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
 }`}
 >
 {opt.icon}
 {t(opt.labelKey)}
 </button>
 ))}

 <span className="ml-auto text-sm text-gray-400 dark:text-gray-500">
 {quotes.length} {t('quotesReceived')}
 </span>
 </div>

 {/* Quote grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {sorted.map((quote) =>(
 <QuoteCard
 key={quote.id}
 quote={quote}
 isOwner={isOwner}
 quoteRequestId={quoteRequestId}
 onAccepted={handleAccepted}
 />
 ))}
 </div>
 </div>
 );
}
