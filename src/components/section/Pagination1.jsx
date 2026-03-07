"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Pagination1({ itemCount = 0, pageSize = 12, onPageChange }) {
  const path = usePathname();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(itemCount / pageSize);

  // Hide pagination when everything fits on one page
  if (totalPages <= 1) return null;

  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  }

  // Build visible page numbers
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

  return (
    <div
      className={`mbp_pagination text-center ${
        path === "/blog" ? "mb40-md" : ""
      } ${path === "/shop-list" ? "mt30" : ""}`}
    >
      <ul className="page_navigation">
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => goToPage(currentPage - 1)}
            style={{ cursor: currentPage === 1 ? "default" : "pointer", opacity: currentPage === 1 ? 0.4 : 1 }}
          >
            <span className="fas fa-angle-left" />
          </a>
        </li>
        {getPageNumbers().map((page, i) =>
          page === "..." ? (
            <li key={`dots-${i}`} className="page-item">
              <span className="page-link">...</span>
            </li>
          ) : (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <a
                className="page-link"
                onClick={() => goToPage(page)}
                style={{ cursor: "pointer" }}
              >
                {page}
              </a>
            </li>
          )
        )}
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => goToPage(currentPage + 1)}
            style={{ cursor: currentPage === totalPages ? "default" : "pointer", opacity: currentPage === totalPages ? 0.4 : 1 }}
          >
            <span className="fas fa-angle-right" />
          </a>
        </li>
      </ul>
      <p className="mt10 mb-0 pagination_page_count text-center">
        Showing {Math.min((currentPage - 1) * pageSize + 1, itemCount)}-{Math.min(currentPage * pageSize, itemCount)} of {itemCount} results
      </p>
    </div>
  );
}
