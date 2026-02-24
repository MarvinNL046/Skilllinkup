'use client';

import { useUser } from '@stackframe/stack';
import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';

interface AuthGateProps {
 children: React.ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
 const user = useUser();
 const [showModal, setShowModal] = useState(false);
 const t = useTranslations('authGate');
 const params = useParams();
 const locale = (params?.locale as string) || 'en';

 const handleClick = useCallback(
 (e: React.MouseEvent) =>{
 if (!user) {
 e.preventDefault();
 e.stopPropagation();
 setShowModal(true);
 }
 },
 [user],
 );

 const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';

 return (
 <>
 {/* Wrap children with a click interceptor when not authenticated */}
 <div onClick={handleClick} className="contents">
 {children}
 </div>

 {/* Auth modal */}
 {showModal && (
 <div
 className="fixed inset-0 z-50 flex items-center justify-center p-4"
 onClick={() =>setShowModal(false)}
 >
 {/* Backdrop */}
 <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

 {/* Modal */}
 <div
 className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6"
 onClick={(e) =>e.stopPropagation()}
 >
 {/* Close button */}
 <button
 onClick={() =>setShowModal(false)}
 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
 aria-label="Close"
 >
 <X className="w-5 h-5" />
 </button>

 {/* Content */}
 <div className="text-center">
 <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
 <svg
 className="w-7 h-7 text-primary"
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 strokeWidth={2}
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
 />
 </svg>
 </div>

 <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
 {t('title')}
 </h2>
 <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
 {t('description')}
 </p>

 <div className="space-y-3">
 <Link
 href={`/handler/sign-up${currentUrl ? `?after_auth_return_to=${encodeURIComponent(currentUrl)}` : ''}`}
 className="block w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors text-sm text-center"
 onClick={() =>setShowModal(false)}
 >
 {t('signUp')}
 </Link>
 <Link
 href={`/handler/sign-in${currentUrl ? `?after_auth_return_to=${encodeURIComponent(currentUrl)}` : ''}`}
 className="block w-full py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary font-medium rounded-lg transition-colors text-sm text-center"
 onClick={() =>setShowModal(false)}
 >
 {t('signIn')}
 </Link>
 </div>
 </div>
 </div>
 </div>
 )}
 </>
 );
}
