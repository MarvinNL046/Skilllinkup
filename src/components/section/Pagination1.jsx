"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pagination1({ itemCount = 0, pageSize = 12, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(itemCount / pageSize);
  if (totalPages <= 1) return null;

  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  }

  function getPageNumbers() {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }

  const baseBtn =
    "inline-flex items-center justify-center min-h-[40px] min-w-[40px] px-3 rounded-md text-sm font-medium transition-colors";

  return (
    <div className="text-center">
      <ul className="inline-flex flex-wrap gap-1 list-none p-0 m-0">
        <li>
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className={cn(
              baseBtn,
              "text-foreground hover:bg-[var(--surface-2)] disabled:opacity-40 disabled:cursor-default"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </li>
        {getPageNumbers().map((page, i) =>
          page === "..." ? (
            <li key={`dots-${i}`}>
              <span
                className={cn(
                  baseBtn,
                  "text-[var(--text-tertiary)] cursor-default"
                )}
                aria-hidden="true"
              >
                ...
              </span>
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                onClick={() => goToPage(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={cn(
                  baseBtn,
                  page === currentPage
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-[var(--surface-2)]"
                )}
              >
                {page}
              </button>
            </li>
          )
        )}
        <li>
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className={cn(
              baseBtn,
              "text-foreground hover:bg-[var(--surface-2)] disabled:opacity-40 disabled:cursor-default"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </li>
      </ul>
      <p className="mt-3 mb-0 text-sm text-[var(--text-secondary)]">
        Showing {Math.min((currentPage - 1) * pageSize + 1, itemCount)}-
        {Math.min(currentPage * pageSize, itemCount)} of {itemCount} results
      </p>
    </div>
  );
}
