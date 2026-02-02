import React, { useContext } from "react";
import { ReceipeContext } from "../context/ReceipeContext";

function Pagination({ totalItems }) {
  const { pageAt, setPageAt, pageSize } = useContext(ReceipeContext);

  const totalPages = Math.ceil(totalItems / pageSize);
  const siblingCount = 2; // pages shown on each side

  const goToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goToPage = (page) => {
    if (page < 0 || page >= totalPages) return;
    setPageAt(page);
    goToTop();
  };

  if (!totalItems || totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    const current = pageAt + 1;

    const start = Math.max(2, current - siblingCount);
    const end = Math.min(totalPages - 1, current + siblingCount);

    // First page
    pages.push(1);

    // Left dots
    if (start > 2) pages.push("...");

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Right dots
    if (end < totalPages - 1) pages.push("...");

    // Last page
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="paginationContainer">
      {/* Previous */}
      <button
        className="arrows"
        disabled={pageAt === 0}
        onClick={() => goToPage(pageAt - 1)}
      >
        &laquo;
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="paginationEllipsis">
            …
          </span>
        ) : (
          <button
            key={page}
            className={`pageNumber ${pageAt === page - 1 ? "active" : ""}`}
            onClick={() => goToPage(page - 1)}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        className="arrows"
        disabled={pageAt === totalPages - 1}
        onClick={() => goToPage(pageAt + 1)}
      >
        &raquo;
      </button>
    </div>
  );
}

export default Pagination;
