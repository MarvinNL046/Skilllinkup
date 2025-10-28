'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { safeImage } from '@/lib/safe';
import { DEFAULTS } from '@/lib/defaults';

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url: string;
  placement: string;
}

interface AdWidgetProps {
  placement: 'tools_listing' | 'tools_detail' | 'blog_sidebar';
  adImage?: string | null; // Legacy prop support
  adLink?: string | null;   // Legacy prop support
}

export function AdWidget({ placement, adImage, adLink }: AdWidgetProps) {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If legacy props are provided, use them directly
    if (adImage && adLink) {
      const safeAdImage = safeImage(adImage, '');
      const safeAdLink = adLink?.trim() || '';

      if (safeAdImage && safeAdLink) {
        setAd({
          id: 'legacy',
          title: 'Advertisement',
          image_url: safeAdImage,
          link_url: safeAdLink,
          placement: placement,
        });
        setLoading(false);
        return;
      }
    }

    // Otherwise fetch from database
    async function fetchAd() {
      try {
        const response = await fetch(`/api/ads/active?placement=${placement}`);

        if (!response.ok) {
          throw new Error('Failed to fetch ads');
        }

        const data = await response.json();

        // Select random ad from active ads
        if (data.ads && data.ads.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.ads.length);
          setAd(data.ads[randomIndex]);
        } else {
          setAd(null);
        }
      } catch (err) {
        console.error('Error fetching ad:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchAd();
  }, [placement, adImage, adLink]);

  // Don't render if no ad is available
  if (loading) {
    return null; // Or return a skeleton loader
  }

  if (error || !ad) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-gray-900/50">
        <Link
          href={ad.link_url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block"
        >
          <div className="relative w-full aspect-square">
            <Image
              src={ad.image_url}
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
