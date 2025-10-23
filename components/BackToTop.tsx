"use client";

import { useState, useEffect } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const toggleVisibility = () => {
      // Clear existing timeout to debounce
      clearTimeout(timeoutId);

      // Debounce scroll event for performance
      timeoutId = setTimeout(() => {
        if (window.scrollY > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }, 100);
    };

    // Add scroll event listener
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-8 z-50
        w-12 h-12 rounded-full
        bg-primary hover:bg-primary-dark
        text-white shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
}
