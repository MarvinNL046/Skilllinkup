'use client';

import React, { useEffect, useState } from 'react';

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (!content) return;

    // Extract H2 and H3 headings from HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    const headingElements = tempDiv.querySelectorAll('h2, h3');
    const extractedHeadings = Array.from(headingElements).map((heading, index) => {
      const text = heading.textContent || '';
      const level = heading.tagName.toLowerCase();

      // Generate slug from text
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      return {
        id: id || `heading-${index}`,
        text,
        level,
      };
    });

    setHeadings(extractedHeadings);

    // Add ID's to actual headings in the DOM for anchor links to work
    const actualHeadings = document.querySelectorAll('.prose h2, .prose h3');
    actualHeadings.forEach((heading, index) => {
      const text = heading.textContent || '';
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      heading.id = id || `heading-${index}`;
      // Add scroll margin to account for sticky navbar (adjust the value as needed)
      heading.style.scrollMarginTop = '100px';
    });
  }, [content]);

  // Don't render if no headings found
  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="table-of-contents-widget">
      <div className="toc-container">
        <h3 className="toc-title">Table of Contents</h3>
        <nav>
          <ul className="toc-list">
            {headings.map((heading, index) => (
              <li
                key={index}
                className={`toc-item toc-${heading.level}`}
              >
                <a
                  href={`#${heading.id}`}
                  className="toc-link"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(heading.id);
                    if (element) {
                      const navbarHeight = 100; // Adjust based on your navbar height
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <style jsx>{`
        .table-of-contents-widget {
          margin-bottom: 32px;
        }

        .toc-container {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 24px;
        }

        .toc-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .toc-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .toc-item {
          font-size: 0.875rem;
        }

        .toc-h2 {
          font-weight: 500;
        }

        .toc-h3 {
          padding-left: 16px;
          font-weight: 400;
        }

        .toc-link {
          color: #6c757d;
          text-decoration: none;
          transition: color 0.3s ease;
          display: block;
        }

        .toc-link:hover {
          color: #ff6b35;
        }

        @media (max-width: 768px) {
          .table-of-contents-widget {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default TableOfContents;
