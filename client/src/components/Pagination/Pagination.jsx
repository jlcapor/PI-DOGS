import React from 'react';
import  './pagination.styles.css';

const Pagination = ({ itemsPerPage, totalItems, paginateHandler, currentPage }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="pagination-container">
			<ul className="pagination">
				{pageNumbers && pageNumbers.map(number =>(
					<li key={number} className={currentPage === number ? 'active' : ''}>
						 <button onClick={() => paginateHandler(number)}>{number}</button>
					</li>
				))}
			</ul>
		</div>
	);
};


export default Pagination;