'use client';

import React from 'react';
import Link from 'next/link';

const QuickInfoWidget = ({ platformType, feeStructure, difficultyLevel, bestFor }) => {
  // Don't render if no Quick Info data is configured
  if (!platformType && !feeStructure && !difficultyLevel && !bestFor) {
    return null;
  }

  // Color mapping for difficulty levels
  const difficultyColors = {
    'Beginner': 'text-green-600',
    'Medium': 'text-accent',
    'Advanced': 'text-red-600',
  };

  return (
    <div className="quick-info-widget">
      <div className="quick-info-container">
        <h3 className="quick-info-title">Quick Info</h3>

        <dl className="quick-info-list">
          {platformType && (
            <div className="quick-info-item">
              <dt className="quick-info-label">Platform Type</dt>
              <dd className="quick-info-value">{platformType}</dd>
            </div>
          )}

          {feeStructure && (
            <div className="quick-info-item">
              <dt className="quick-info-label">Fee Structure</dt>
              <dd className="quick-info-value">{feeStructure}</dd>
            </div>
          )}

          {difficultyLevel && (
            <div className="quick-info-item">
              <dt className="quick-info-label">Difficulty Level</dt>
              <dd className={`quick-info-value ${difficultyColors[difficultyLevel] || 'text-text-primary'}`}>
                {difficultyLevel}
              </dd>
            </div>
          )}

          {bestFor && (
            <div className="quick-info-item">
              <dt className="quick-info-label">Best For</dt>
              <dd className="quick-info-value">{bestFor}</dd>
            </div>
          )}
        </dl>

        <Link
          href="/platforms"
          className="compare-platforms-button"
        >
          Compare Platforms
        </Link>
      </div>

      <style jsx>{`
        .quick-info-widget {
          margin-bottom: 32px;
        }

        .quick-info-container {
          background: rgba(255, 107, 53, 0.05);
          border: 2px solid rgba(255, 107, 53, 0.2);
          border-radius: 8px;
          padding: 24px;
        }

        .quick-info-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .quick-info-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .quick-info-item {
          display: flex;
          flex-direction: column;
        }

        .quick-info-label {
          font-size: 0.875rem;
          color: #6c757d;
          margin-bottom: 4px;
        }

        .quick-info-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1a1a1a;
        }

        .compare-platforms-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          border-radius: 8px;
          background: #ff6b35;
          padding: 10px 16px;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-decoration: none;
        }

        .compare-platforms-button:hover {
          background: #e85a2a;
          transform: translateY(-1px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .quick-info-widget {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default QuickInfoWidget;
