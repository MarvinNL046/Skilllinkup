'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
 CreditCard,
 CheckCircle,
 AlertCircle,
 ExternalLink,
 Loader2,
} from 'lucide-react';

export interface StripeConnectProps {
 stripeAccountId: string | null;
 onboardingComplete: boolean;
 chargesEnabled: boolean;
 payoutsEnabled: boolean;
 loginLinkUrl: string | null;
}

export function StripeConnect({
 stripeAccountId,
 onboardingComplete,
 chargesEnabled,
 payoutsEnabled,
 loginLinkUrl,
}: StripeConnectProps) {
 const t = useTranslations('dashboard.stripe');
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 async function handleConnect() {
 setIsLoading(true);
 setError(null);
 try {
 const res = await fetch('/api/stripe/connect/onboard', {
 method: 'POST',
 });
 const data = await res.json();
 if (!res.ok || !data.url) {
 throw new Error(data.error ?? 'Failed to start onboarding');
 }
 window.location.href = data.url;
 } catch (err) {
 setError(err instanceof Error ? err.message : t('error'));
 setIsLoading(false);
 }
 }

 // Mask most of the account ID for display (show last 6 chars only)
 function maskAccountId(accountId: string): string {
 if (accountId.length <= 10) return accountId;
 return `acct_${'*'.repeat(accountId.length - 11)}${accountId.slice(-6)}`;
 }

 // Not connected at all
 if (!stripeAccountId) {
 return (
 <div className="ps-widget bgc-white bdrs12 bdr1 p30">
 <div className="d-flex align-items-start" style={{ gap: '16px' }}>
 <div
 className="d-flex align-items-center justify-content-center bdrs12 bgc-f7 flex-shrink-0"
 style={{ width: 52, height: 52 }}
 >
 <CreditCard size={24} color="#6c757d" />
 </div>
 <div>
 <h5 className="fw600 mb5">{t('notConnected')}</h5>
 <p className="fz14 body-color mb0">{t('notConnectedDesc')}</p>
 </div>
 </div>

 {error && (
 <div className="d-flex align-items-center bdrs8 bdr1 px20 py15 mt20" style={{ background: '#fff5f5', borderColor: '#fca5a5', gap: '8px' }}>
 <AlertCircle size={16} color="#dc2626" style={{ flexShrink: 0 }} />
 <p className="fz14 mb0" style={{ color: '#b91c1c' }}>{error}</p>
 </div>
 )}

 <div className="mt25">
 <button
 onClick={handleConnect}
 disabled={isLoading}
 className="ud-btn btn-thm"
 style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
 >
 <span className="d-flex align-items-center" style={{ gap: '8px' }}>
 {isLoading ? (
 <>
 <Loader2 size={16} className="animate-spin" />
 {t('connecting')}
 </>
 ) : (
 <>
 <CreditCard size={16} />
 {t('connectAccount')}
 </>
 )}
 </span>
 </button>
 </div>
 </div>
 );
 }

 // Account exists but onboarding not complete
 if (!onboardingComplete) {
 return (
 <div className="ps-widget bgc-white bdrs12 p30" style={{ border: '1px solid #fcd34d' }}>
 <div className="d-flex align-items-start" style={{ gap: '16px' }}>
 <div
 className="d-flex align-items-center justify-content-center bdrs12 flex-shrink-0"
 style={{ width: 52, height: 52, background: '#fffbeb' }}
 >
 <AlertCircle size={24} color="#f59e0b" />
 </div>
 <div>
 <h5 className="fw600 mb5">{t('pendingSetup')}</h5>
 <p className="fz14 body-color mb0">{t('pendingSetupDesc')}</p>
 </div>
 </div>

 {error && (
 <div className="d-flex align-items-center bdrs8 bdr1 px20 py15 mt20" style={{ background: '#fff5f5', borderColor: '#fca5a5', gap: '8px' }}>
 <AlertCircle size={16} color="#dc2626" style={{ flexShrink: 0 }} />
 <p className="fz14 mb0" style={{ color: '#b91c1c' }}>{error}</p>
 </div>
 )}

 <div className="mt25">
 <button
 onClick={handleConnect}
 disabled={isLoading}
 className="ud-btn"
 style={{
 background: '#f59e0b',
 color: '#fff',
 border: 'none',
 opacity: isLoading ? 0.7 : 1,
 cursor: isLoading ? 'not-allowed' : 'pointer',
 }}
 >
 <span className="d-flex align-items-center" style={{ gap: '8px' }}>
 {isLoading ? (
 <>
 <Loader2 size={16} className="animate-spin" />
 {t('connecting')}
 </>
 ) : (
 <>
 <CreditCard size={16} />
 {t('completeSetup')}
 </>
 )}
 </span>
 </button>
 </div>
 </div>
 );
 }

 // Fully connected and onboarding complete
 return (
 <div className="ps-widget bgc-white bdrs12 p30" style={{ border: '1px solid #86efac' }}>
 <div className="d-flex align-items-start" style={{ gap: '16px' }}>
 <div
 className="d-flex align-items-center justify-content-center bdrs12 flex-shrink-0"
 style={{ width: 52, height: 52, background: '#f0fdf4' }}
 >
 <CheckCircle size={24} color="#16a34a" />
 </div>
 <div>
 <h5 className="fw600 mb5">{t('connected')}</h5>
 <p className="fz14 body-color mb0">{t('connectedDesc')}</p>
 </div>
 </div>

 {/* Account details */}
 <div className="row mt25">
 <div className="col-sm-6">
 <div className="bgc-f7 bdrs8 px20 py15 mb15">
 <p className="fz12 text-muted mb5">{t('accountId')}</p>
 <p className="fz14 fw500 mb0" style={{ fontFamily: 'monospace' }}>
 {maskAccountId(stripeAccountId)}
 </p>
 </div>
 </div>

 <div className="col-sm-6">
 <div className="bgc-f7 bdrs8 px20 py15 mb15">
 <p className="fz12 text-muted mb5">{t('status')}</p>
 <div className="d-flex align-items-center" style={{ gap: '6px' }}>
 <span
 className="bdrs50 d-inline-block"
 style={{ width: 8, height: 8, background: '#22c55e' }}
 />
 <span className="fz14 fw500" style={{ color: '#15803d' }}>{t('active')}</span>
 </div>
 </div>
 </div>

 <div className="col-sm-6">
 <div className="bgc-f7 bdrs8 px20 py15 mb15">
 <p className="fz12 text-muted mb5">{t('payoutsEnabled')}</p>
 <p className={`fz14 fw500 mb0 ${payoutsEnabled ? '' : ''}`} style={{ color: payoutsEnabled ? '#15803d' : '#dc2626' }}>
 {payoutsEnabled ? t('yes') : t('no')}
 </p>
 </div>
 </div>

 <div className="col-sm-6">
 <div className="bgc-f7 bdrs8 px20 py15 mb15">
 <p className="fz12 text-muted mb5">{t('chargesEnabled')}</p>
 <p className="fz14 fw500 mb0" style={{ color: chargesEnabled ? '#15803d' : '#dc2626' }}>
 {chargesEnabled ? t('yes') : t('no')}
 </p>
 </div>
 </div>
 </div>

 {/* Link to Stripe Express dashboard */}
 {loginLinkUrl && (
 <div className="mt20">
 <a
 href={loginLinkUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="ud-btn btn-white2 d-inline-flex align-items-center"
 style={{ gap: '8px' }}
 >
 <ExternalLink size={16} />
 {t('viewDashboard')}
 </a>
 </div>
 )}
 </div>
 );
}
