'use client';

import { useEffect } from 'react';

interface ViewTrackerProps {
 slug: string;
}

export function ViewTracker({ slug }: ViewTrackerProps) {
 useEffect(() =>{
 // Track view after component mounts
 const trackView = async () =>{
 try {
 await fetch(`/api/posts/${slug}/views`, {
 method: 'POST',
 });
 } catch (error) {
 // Silently fail - view tracking shouldn't break the page
 console.error('Failed to track view:', error);
 }
 };

 // Small delay to avoid counting bots and accidental page loads
 const timer = setTimeout(trackView, 2000);

 return () =>clearTimeout(timer);
 }, [slug]);

 return null; // This component doesn't render anything
}
