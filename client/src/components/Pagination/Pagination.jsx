import React, { useState } from 'react';

const Pagination = ({ allDepartmentData }) => {
  const [page, setPage] = useState(0);

  // Number of items per page
  const itemsPerPage = 3;
  // Calculate the total number of pages
  const totalPages = Math.ceil(allDepartmentData?.length / itemsPerPage);

  // Handle page change
  const handleSelectPage = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  // Slice data for the current page
  const sliceDataForPagination = allDepartmentData?.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  // Check if the length is valid
  const pageArrayLength = Number.isFinite(totalPages) ? totalPages : 0;

  return (
    <div>
      {/*--------------------------------- pagination start--------------------------- */}
      <div className="border flex items-center justify-center gap-1 p-1">
        <span
          className={page > 0 ? 'cursor-pointer px-2 py-1 border-2 hover:bg-green-300' : 'disabled cursor-pointer px-2 py-1 border-2  '}
          onClick={() => handleSelectPage(page - 1)}
        >
          Prev
        </span>
        {[...Array(pageArrayLength)].map((_, i) => (
          <span
            key={i}
            className={page === i ? 'cursor-pointer px-2 bg-green-300 py-1 border-2' : 'cursor-pointer px-2 py-1 border-2 hover:bg-green-300'}
            onClick={() => handleSelectPage(i)}
          >
            {i + 1}
          </span>
        ))}
        <span
          className={page < totalPages - 1 ? 'cursor-pointer px-2 py-1 border-2 hover:bg-green-300' : 'disabled cursor-pointer px-2 py-1 border-2 '}
          onClick={() => handleSelectPage(page + 1)}
        >
          Next
        </span>
      </div>
      {/*--------------------------------- pagination End--------------------------- */}
    </div>
  );
};

export default Pagination;
