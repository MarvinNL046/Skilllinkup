'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AdWidget = ({ adImage, adLink }) => {
  // Don't render if no ad is configured
  if (!adImage || !adLink) {
    return null;
  }

  return (
    <div className="widget-ad mb--50">
      <div className="ad-container">
        <Link
          href={adLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="ad-link"
        >
          <div className="ad-image-wrapper">
            <Image
              src={adImage}
              alt="Advertisement"
              width={400}
              height={400}
              className="ad-image"
              priority={false}
            />
          </div>
        </Link>
      </div>

      <style jsx>{`
        .widget-ad {
          margin-bottom: 50px;
        }

        .ad-container {
          background: #f8f9fa;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e9ecef;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .ad-container:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .ad-link {
          display: block;
          text-decoration: none;
        }

        .ad-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
        }

        .ad-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 768px) {
          .widget-ad {
            margin-bottom: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdWidget;
