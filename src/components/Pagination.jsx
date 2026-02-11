import React, { useContext } from "react";
import { ReceipeContext } from "../context/ReceipeContext";
import { ConfirmDialog } from "primereact/confirmdialog";

function Pagination({ totalItems }) {
  const { pageAt, setPageAt, pageSize } = useContext(ReceipeContext);
  const noOfPages = Math.ceil(totalItems / pageSize);

  const goToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handlePageChange = (n) => {
    setPageAt(n);
    goToTop();
  };

  const goToNextPage = () => {
    if (pageAt < noOfPages - 1) {
      setPageAt(pageAt + 1);
    }
    goToTop();
  };

  const goToPrevPage = () => {
    if (pageAt > 0) {
      setPageAt(pageAt - 1);
    }
    goToTop();
  };

  return totalItems ? (
    <div className="paginationContainer">
      <button disabled={pageAt === 0} className="arrows" onClick={goToPrevPage}>
        &laquo;
      </button>

      {(() => {
        const maxVisible = 1;
        const pages = [];

        if (noOfPages <= 7) {
          for (let i = 0; i < noOfPages; i++) pages.push(i);
        } else {
          pages.push(0);
          if (pageAt > maxVisible + 2) pages.push("...");
          
          let start = Math.max(1, pageAt - maxVisible);
          let end = Math.min(noOfPages - 2, pageAt + maxVisible);
          
          if (pageAt < 2) end = 4; // Ensure visible pages at start
          if (pageAt > noOfPages - 3) start = noOfPages - 5; // Ensure visible pages at end

          for (let i = start; i <= end; i++) {
            if (i > 0 && i < noOfPages - 1) pages.push(i);
          }

          if (pageAt < noOfPages - maxVisible - 3) pages.push("...");
          pages.push(noOfPages - 1);
        }

        return pages.map((n, index) => (
          n === "..." ? (
            <span key={`dots-${index}`} className="dots" style={{padding: '0 0.5rem', color: '#888', fontSize: '1.2rem'}}>...</span>
          ) : (
            <button
              key={n}
              className={`pageNumber ${n === pageAt ? "active" : ""}`}
              onClick={() => handlePageChange(n)}
            >
              {n + 1}
            </button>
          )
        ));
      })()}

      <button
        disabled={pageAt === noOfPages - 1}
        className="arrows"
        onClick={goToNextPage}
      >
        &raquo;
      </button>
    </div>
  ) : (
    <></>
  );
}

export default Pagination;
