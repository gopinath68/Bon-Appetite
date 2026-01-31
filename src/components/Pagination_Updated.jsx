import React, { useContext } from "react";
import { ReceipeContext } from "../context/ReceipeContext";
import { ConfirmDialog } from "primereact/confirmdialog";

function Pagination({ totalItems }) {
  const { pageAt, setPageAt, pageSize } = useContext(ReceipeContext);
  const noOfPages = Math.ceil(totalItems / pageSize);
  const maxPagesToShow = 5; // Show maximum 5 page buttons

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

  // Calculate which pages to show
  let startPage = Math.max(0, pageAt - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(noOfPages, startPage + maxPagesToShow);

  if (endPage - startPage < maxPagesToShow) {
    startPage = Math.max(0, endPage - maxPagesToShow);
  }

  const pagesToShow = [...Array(endPage - startPage).keys()].map(
    (i) => startPage + i,
  );

  return totalItems ? (
    <div className="paginationContainer">
      <button disabled={pageAt === 0} className="arrows" onClick={goToPrevPage}>
        &laquo;
      </button>

      {startPage > 0 && (
        <>
          <button className="pageNumber" onClick={() => handlePageChange(0)}>
            1
          </button>
          {startPage > 1 && <span className="paginationEllipsis">...</span>}
        </>
      )}

      {pagesToShow.map((n) => (
        <button
          key={n}
          className={`pageNumber ${n === pageAt ? "active" : ""}`}
          onClick={() => handlePageChange(n)}
        >
          {n + 1}
        </button>
      ))}

      {endPage < noOfPages && (
        <>
          {endPage < noOfPages - 1 && (
            <span className="paginationEllipsis">...</span>
          )}
          <button
            className="pageNumber"
            onClick={() => handlePageChange(noOfPages - 1)}
          >
            {noOfPages}
          </button>
        </>
      )}

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
