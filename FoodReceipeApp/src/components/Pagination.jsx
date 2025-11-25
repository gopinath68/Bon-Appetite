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

      {[...Array(noOfPages).keys()].map((n) => (
        <button
          key={n}
          className={`pageNumber ${n === pageAt ? "active" : ""}`}
          onClick={() => handlePageChange(n)}
        >
          {n + 1}
        </button>
      ))}

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
