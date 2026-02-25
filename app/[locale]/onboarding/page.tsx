'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { Briefcase, Users } from 'lucide-react';

type UserType = 'client' | 'freelancer';

export default function OnboardingPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<UserType | null>(null);

  const handleContinue = async () => {
    if (!selected) return;
    setLoading(true);

    try {
      const res = await fetch('/api/auth/set-user-type', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userType: selected }),
      });

      if (!res.ok) {
        setLoading(false);
        return;
      }

      if (selected === 'freelancer') {
        router.push(`/${locale}/become-freelancer`);
      } else {
        router.push(`/${locale}/become-client`);
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="bgc-thm4 min-vh-100">
      <section className="our-register">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="main-title text-center">
                <h2 className="title">{t('signUpAs')}</h2>
                <p className="paragraph">{t('onboardingSubtitle')}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-7 mx-auto">
              <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                <div className="row g-4 mb30">
                  <div className="col-md-6">
                    <button
                      type="button"
                      onClick={() => setSelected('client')}
                      className={`default-box-shadow1 bdrs12 p30 text-start w-100 ${
                        selected === 'client' ? 'border border-thm' : ''
                      }`}
                    >
                      <div className="d-flex align-items-center mb15">
                        <span className={`icon text-thm me-3 ${selected === 'client' ? 'text-thm' : 'text-muted'}`}>
                          <Users size={26} />
                        </span>
                        <h5 className="mb0">{t('client')}</h5>
                      </div>
                      <p className="text mb0">{t('clientDesc')}</p>
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      onClick={() => setSelected('freelancer')}
                      className={`default-box-shadow1 bdrs12 p30 text-start w-100 ${
                        selected === 'freelancer' ? 'border border-thm' : ''
                      }`}
                    >
                      <div className="d-flex align-items-center mb15">
                        <span className={`icon text-thm me-3 ${selected === 'freelancer' ? 'text-thm' : 'text-muted'}`}>
                          <Briefcase size={26} />
                        </span>
                        <h5 className="mb0">{t('freelancer')}</h5>
                      </div>
                      <p className="text mb0">{t('freelancerDesc')}</p>
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleContinue}
                  disabled={!selected || loading}
                  className="ud-btn btn-thm w-100"
                >
                  {loading ? t('loading') : t('continue')}
                  <i className="fal fa-arrow-right-long ms-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
