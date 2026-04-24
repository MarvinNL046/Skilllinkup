import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard shadcn-style `cn` helper. Merges Tailwind classes intelligently —
 * later classes override earlier ones even when they target the same CSS
 * property.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
