'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { safeImage } from '@/lib/safe';

interface AdWidgetProps {
 placement: 'tools_listing' | 'tools_detail' | 'blog_sidebar';
 adImage?: string | null; // Legacy prop support
 adLink?: string | null; // Legacy prop support
}

export function AdWidget({ placement, adImage, adLink }: AdWidgetProps) {
 // Legacy props take precedence
 const safeAdImage = adImage ? safeImage(adImage, '') : '';
 const safeAdLink = adLink?.trim() || '';
 const hasLegacyAd = !!(safeAdImage && safeAdLink);

 // Only query Convex if no legacy props
 const ads = useQuery(
   api.ads.getActive,
   hasLegacyAd ? 'skip' : { placement }
 );

 // Pick a random ad (stable per render)
 const ad = useMemo(() => {
   if (hasLegacyAd) {
     return {
       title: 'Advertisement',
       imageUrl: safeAdImage,
       linkUrl: safeAdLink,
     };
   }
   if (!ads || ads.length === 0) return null;
   const randomIndex = Math.floor(Math.random() * ads.length);
   return ads[randomIndex];
 }, [hasLegacyAd, safeAdImage, safeAdLink, ads]);

 // Don't render if loading or no ad
 if (ads === undefined && !hasLegacyAd) return null;
 if (!ad) return null;

 return (
   <div className="mb30">
     <div className="ps-widget bgc-white bdrs12 bdr1 hover-box-shadow overflow-hidden">
       <Link
         href={ad.linkUrl}
         target="_blank"
         rel="noopener noreferrer sponsored"
         className="d-block"
       >
         <div style={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
           <Image
             src={ad.imageUrl}
             alt={ad.title}
             fill
             sizes="(max-width: 768px) 100vw, 400px"
             className="object-cover"
             priority={false}
           />
         </div>
       </Link>
     </div>
   </div>
 );
}
