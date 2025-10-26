'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { safeImage } from '@/lib/safe';
import { DEFAULTS } from '@/lib/defaults';

interface AdWidgetProps {
  adImage?: string | null;
  adLink?: string | null;
}

export function AdWidget({ adImage, adLink }: AdWidgetProps) {
  // Use safe helpers to handle null/undefined/empty values
  const safeAdImage = safeImage(adImage, '');
  const safeAdLink = adLink?.trim() || '';

  // Don't render if no ad is configured
  if (!safeAdImage || !safeAdLink) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-gray-900/50">
        <Link
          href={safeAdLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block"
        >
          <div className="relative w-full aspect-square">
            <Image
              src={safeAdImage}
              alt="Advertisement"
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
