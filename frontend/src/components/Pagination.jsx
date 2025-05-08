import React from "react";

function Pagination(props) {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="join flex">
      {pageNumbers.map((number) => (
        <button
          onClick={() => props.setCurrentPage(number)}
          key={number}
          type="button"
          className="min-h-9.5 min-w-9.5 flex justify-center items-center bg-white text-gray-800 border border-[var(--grey)] py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-hidden focus:bg-[var(--primary-color)] disabled:opacity-50 disabled:pointer-events-none "
          aria-current="page"
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
