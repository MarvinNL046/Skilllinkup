'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import type { FreelancerProfile } from '@/types/marketplace';

interface FreelancerCardProps {
 freelancer: FreelancerProfile;
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
 const locale = useLocale();
 const t = useTranslations('freelancers');

 const displayName = freelancer.display_name ?? 'Unknown';
 const tagline = freelancer.tagline ?? '';
 const avatarUrl = freelancer.avatar_url ?? '';
 const skills = Array.isArray(freelancer.skills) ? freelancer.skills : [];
 const rating = Number(freelancer.rating_average ?? 0);
 const ratingCount = Number(freelancer.rating_count ?? 0);
 const hourlyRate = freelancer.hourly_rate ? Number(freelancer.hourly_rate) : null;
 const locationCity = freelancer.location_city ?? '';
 const locationCountry = freelancer.location_country ?? '';
 const locationText = [locationCity, locationCountry].filter(Boolean).join(', ');
 const completionRate = freelancer.completion_rate ? Number(freelancer.completion_rate) : null;

 const profileUrl = `/${locale}/freelancers/${freelancer.user_id}`;

 return (
 <div className="freelancer-style1 text-center bdr1 hover-box-shadow">
 <div className="thumb w90 mb25 mx-auto position-relative rounded-circle">
 <Image
 height={90}
 width={90}
 className="rounded-circle mx-auto"
 src={avatarUrl || '/images/resource/user.png'}
 alt={displayName}
 />
 {freelancer.is_verified && <span className="online" />}
 </div>
 <div className="details">
 <h5 className="title mb-1">{displayName}</h5>
 <p className="mb-0">{tagline || t('taglineFallback')}</p>
 <div className="review">
 <p>
 <i className="fas fa-star fz10 review-color pr10" />
 <span className="dark-color fw500">{rating.toFixed(1)}</span>({ratingCount} reviews)
 </p>
 </div>
 <div className="skill-tags d-flex align-items-center justify-content-center mb5">
 {skills.slice(0, 3).map((skill) => (
 <span key={skill} className="tag">
 {skill}
 </span>
 ))}
 </div>
 <hr className="opacity-100 mt20 mb15" />
 <div className="fl-meta d-flex align-items-center justify-content-between">
 <span className="meta fw500 text-start">
 Location
 <br />
 <span className="fz14 fw400">{locationText || t('locationFallback')}</span>
 </span>
 <span className="meta fw500 text-start">
 Rate
 <br />
 <span className="fz14 fw400">{hourlyRate ? `€${hourlyRate} / hr` : '—'}</span>
 </span>
 <span className="meta fw500 text-start">
 Job Success
 <br />
 <span className="fz14 fw400">{completionRate ? `${completionRate}%` : '—'}</span>
 </span>
 </div>
 <div className="d-grid mt15">
 <Link href={profileUrl} className="ud-btn btn-light-thm">
 {t('viewProfile')}
 <i className="fal fa-arrow-right-long" />
 </Link>
 </div>
 </div>
 </div>
 );
}
