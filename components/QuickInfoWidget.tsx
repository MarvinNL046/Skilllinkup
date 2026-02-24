'use client';

import React from 'react';
import Link from 'next/link';

interface QuickInfoWidgetProps {
 platformType?: string | null;
 feeStructure?: string | null;
 difficultyLevel?: string | null;
 bestFor?: string | null;
}

export function QuickInfoWidget({
 platformType,
 feeStructure,
 difficultyLevel,
 bestFor
}: QuickInfoWidgetProps) {
 // Don't render if no Quick Info data is configured
 if (!platformType && !feeStructure && !difficultyLevel && !bestFor) {
 return null;
 }

 // Color mapping for difficulty levels (dark mode compatible)
 const difficultyColors: Record<string, string>= {
 'Beginner': 'text-green-600 dark:text-green-400',
 'Easy': 'text-green-600 dark:text-green-400',
 'Medium': 'text-accent dark:text-accent-light',
 'Advanced': 'text-red-600 dark:text-red-400',
 'Hard': 'text-red-600 dark:text-red-400',
 };

 return (
 <div className="mb-8">
 <div className="bg-accent/5 dark:bg-accent/10 border-2 border-accent/20 dark:border-accent/30 rounded-lg p-6">
 <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-4">
 Quick Info
 </h3>

 <dl className="space-y-3 mb-6">
 {platformType && (
 <div>
 <dt className="text-sm text-gray-600 dark:text-gray-400 mb-1">
 Platform Type
 </dt>
 <dd className="text-sm font-semibold text-gray-900 dark:text-white">
 {platformType}
 </dd>
 </div>
 )}

 {feeStructure && (
 <div>
 <dt className="text-sm text-gray-600 dark:text-gray-400 mb-1">
 Fee Structure
 </dt>
 <dd className="text-sm font-semibold text-gray-900 dark:text-white">
 {feeStructure}
 </dd>
 </div>
 )}

 {difficultyLevel && (
 <div>
 <dt className="text-sm text-gray-600 dark:text-gray-400 mb-1">
 Difficulty Level
 </dt>
 <dd className={`text-sm font-semibold ${difficultyColors[difficultyLevel] || 'text-gray-900 dark:text-white'}`}>
 {difficultyLevel}
 </dd>
 </div>
 )}

 {bestFor && (
 <div>
 <dt className="text-sm text-gray-600 dark:text-gray-400 mb-1">
 Best For
 </dt>
 <dd className="text-sm font-semibold text-gray-900 dark:text-white">
 {bestFor}
 </dd>
 </div>
 )}
 </dl>

 <Link
 href="/platforms"
 className="flex items-center justify-center w-full rounded-lg bg-accent hover:bg-accent-dark dark:bg-accent dark:hover:bg-accent-light px-4 py-2.5 text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
 >
 Compare Platforms
 </Link>
 </div>
 </div>
 );
}
