import React from 'react';
import './pagination.styles.css';

const Pagination = ({ currentPage, setCurrentPage, totalDogs, dogPerPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalDogs / dogPerPage);
  const pagesToShow = 4;

  const halfPages = Math.floor(pagesToShow / 2);
  let startPage, endPage;

  if (totalPages <= pagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= halfPages) {
      startPage = 1;
      endPage = pagesToShow;
    } else if (currentPage + halfPages >= totalPages) {
      startPage = totalPages - pagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfPages;
      endPage = currentPage + halfPages;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <ul className="pagination-container">
      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
        <a className="page-link" onClick={firstPage}>
          &laquo;&laquo;
        </a>
      </li>
      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
        <a className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
          &laquo;
        </a>
      </li>
      {pageNumbers.map((page) => (
        <li key={page} className={`page-item ${page === currentPage && 'active'}`}>
          <a className="page-link" onClick={() => setCurrentPage(page)}>
            <span className={`page-circle ${page === currentPage && 'active-circle'}`}></span>
            {page}
          </a>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
        <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
          &raquo;
        </a>
      </li>
      <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
        <a className="page-link" onClick={lastPage}>
          &raquo;&raquo;
        </a>
      </li>
    </ul>
  );
};

export default Pagination;
