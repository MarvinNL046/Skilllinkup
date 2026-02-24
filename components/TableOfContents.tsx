'use client';

import React, { useEffect, useState } from 'react';

interface Heading {
 id: string;
 text: string;
 level: 'h2' | 'h3';
}

interface TableOfContentsProps {
 content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
 const [headings, setHeadings] = useState<Heading[]>([]);

 useEffect(() =>{
 if (!content) return;

 // Extract H2 and H3 headings from HTML content
 const tempDiv = document.createElement('div');
 tempDiv.innerHTML = content;

 const headingElements = tempDiv.querySelectorAll('h2, h3');
 const extractedHeadings = Array.from(headingElements).map((heading, index) =>{
 const text = heading.textContent || '';
 const level = heading.tagName.toLowerCase() as 'h2' | 'h3';

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
 actualHeadings.forEach((heading, index) =>{
 const text = heading.textContent || '';
 const id = text
 .toLowerCase()
 .replace(/[^a-z0-9]+/g, '-')
 .replace(/^-|-$/g, '');
 heading.id = id || `heading-${index}`;
 // Add scroll margin to account for sticky navbar
 (heading as HTMLElement).style.scrollMarginTop = '100px';
 });
 }, [content]);

 // Don't render if no headings found
 if (headings.length === 0) {
 return null;
 }

 return (
 <div className="mb-8">
 <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
 <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-4">
 Table of Contents
 </h3>
 <nav>
 <ul className="space-y-2">
 {headings.map((heading, index) =>(
 <li
 key={index}
 className={heading.level === 'h3' ? 'pl-4' : ''}
 >
 <a
 href={`#${heading.id}`}
 className={`block text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-accent transition-colors ${
 heading.level === 'h2' ? 'font-medium' : 'font-normal'
 }`}
 onClick={(e) =>{
 e.preventDefault();
 const element = document.getElementById(heading.id);
 if (element) {
 const navbarHeight = 100;
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
 </div>
 );
}
