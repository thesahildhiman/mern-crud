import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const handlePageChange = (pageNumber) => {
		onPageChange(pageNumber);
	};
	console.log('---totoalPages----', totalPages);
	const renderPageNumbers = () => {
		const pageNumbers = [];

		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<li
					style={{ listStyleType: 'none', margin: 10 }}
					key={i}
					className={i === currentPage ? 'active' : ''}>
					<a
						style={{ color: i === currentPage ? 'red' : '' }}
						href='#'
						onClick={() => handlePageChange(i)}>
						{i}
					</a>
				</li>
			);
		}

		return pageNumbers;
	};

	return (
		<div className='pagination'>
			<ul style={{ display: 'flex' }}>{renderPageNumbers()}</ul>
		</div>
	);
};

export default Pagination;
