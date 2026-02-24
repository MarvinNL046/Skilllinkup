'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GigImage {
 url: string;
 alt: string;
}

interface GigImageGalleryProps {
 images: GigImage[];
 title: string;
}

const PLACEHOLDER = '/images/placeholder-gig.webp';

export function GigImageGallery({ images, title }: GigImageGalleryProps) {
 const hasImages = images && images.length >0;
 const [activeIndex, setActiveIndex] = useState(0);

 const mainImage = hasImages ? images[activeIndex] : null;
 const mainSrc = mainImage?.url || PLACEHOLDER;
 const mainAlt = mainImage?.alt || title || 'Gig image';

 return (
 <div className="space-y-3">
 {/* Main image */}
 <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm">
 <Image
 src={mainSrc}
 alt={mainAlt}
 fill
 sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 50vw"
 className="object-cover"
 priority
 />
 </div>

 {/* Thumbnails — only show when there are multiple images */}
 {hasImages && images.length >1 && (
 <div className="flex gap-2 overflow-x-auto pb-1">
 {images.map((img, index) =>(
 <button
 key={index}
 type="button"
 onClick={() =>setActiveIndex(index)}
 className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
 activeIndex === index
 ? 'border-primary shadow-md scale-105'
 : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 opacity-70 hover:opacity-100'
 }`}
 aria-label={`View image ${index + 1}`}
 aria-pressed={activeIndex === index}
 >
 <Image
 src={img.url || PLACEHOLDER}
 alt={img.alt || `${title} image ${index + 1}`}
 fill
 sizes="80px"
 className="object-cover"
 />
 </button>
 ))}
 </div>
 )}
 </div>
 );
}
