import React, { useContext } from "react";
import { ReceipeContext } from "../context/ReceipeContext";

function Pagination({ totalItems }) {
  const { pageAt, setPageAt, pageSize } = useContext(ReceipeContext);

  const totalPages = Math.ceil(totalItems / pageSize);
  const siblingCount = 2; // pages on each side of current

  const goToPage = (page) => {
    setPageAt(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalPages <= 1) return null;

  const getPaginationRange = () => {
    const range = [];

    const start = Math.max(1, pageAt + 1 - siblingCount);
    const end = Math.min(totalPages, pageAt + 1 + siblingCount);

    // Always show first page
    if (start > 1) {
      range.push(1);
      if (start > 2) range.push("...");
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Always show last page
    if (end < totalPages) {
      if (end < totalPages - 1) range.push("...");
      range.push(totalPages);
    }

    return range;
  };

  const pages = getPaginationRange();

  return (
    <div className="paginationContainer">
      <button
        className="arrows"
        disabled={pageAt === 0}
        onClick={() => goToPage(pageAt - 1)}
      >
        &laquo;
      </button>

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
