/**
 * Safe utility functions for handling potentially unsafe data
 * Prevents crashes from empty strings, null, undefined, and invalid types
 */

import { DEFAULTS } from './defaults';

/**
 * Safely handle image URLs with fallback for empty/invalid values
 * Handles: undefined, null, empty strings, whitespace-only strings
 */
export function safeImage(src?: unknown, fallback: string = DEFAULTS.featureImg): string {
 if (typeof src !== 'string') return fallback;
 const trimmed = src.trim();
 return trimmed ? trimmed : fallback;
}

/**
 * Safely convert any value to an array, filtering out falsy values
 * Ensures components always receive a valid array to map over
 */
export function safeArray<T = any>(val: unknown): T[] {
 if (!Array.isArray(val)) return [];
 return val.filter(Boolean) as T[];
}

/**
 * Safely handle text with fallback for empty/invalid values
 * Handles: undefined, null, empty strings, whitespace-only strings
 */
export function safeText(v: unknown, fallback = ''): string {
 if (typeof v !== 'string') return fallback;
 const trimmed = v.trim();
 return trimmed ? trimmed : fallback;
}

/**
 * Safely handle numbers with fallback for invalid values
 */
export function safeNumber(v: unknown, fallback = 0): number {
 const num = Number(v);
 return isNaN(num) ? fallback : num;
}

/**
 * Safely handle booleans with fallback for invalid values
 */
export function safeBoolean(v: unknown, fallback = false): boolean {
 if (typeof v === 'boolean') return v;
 return fallback;
}
