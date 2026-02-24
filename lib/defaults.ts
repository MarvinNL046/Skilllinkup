/**
 * Default values for safe rendering across the application
 * Single source of truth for fallback data
 */

export const DEFAULTS = {
 // Images
 featureImg: '/images/posts/lifestyle-post-01.webp',
 authorImg: '/images/posts/author/author-image-1.png',
 ogImg: '/images/posts/lifestyle-post-01.webp',
 categoryImg: '/images/post-images/category-image-01.jpg',

 // Author data
 authorName: 'Anonymous',
 authorSocial: [] as Array<{ icon: string; url: string; label?: string }>,

 // Post data
 title: 'Untitled',
 excerpt: '',
 content: '',
 category: 'Uncategorized',
 postFormat: 'standard' as const,

 // Metadata
 views: 0,
 readTime: 5,
} as const;

export type PostDefaults = typeof DEFAULTS;
