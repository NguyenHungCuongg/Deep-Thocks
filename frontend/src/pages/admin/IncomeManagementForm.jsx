import React from "react";

function IncomeManagementForm() {
  return (
    <div className="bg-[var(--light-white)] rounded-xl h-full flex flex-col">
      <div
        id="table-header"
        className="flex gap-2 px-5 py-4 mb-4 flex-col md:flex-row md:items-center md:justify-between md:px-6"
      >
        <h3 class="text-lg font-title font-semibold text-gray-800">Quản lí doanh thu</h3>
        <div className="flex gap-2 md:flex-row flex-col">
          <button
            type="button"
            class="flex-shrink-0 shadow-sm px-4 py-2 rounded-lg cursor-pointer text-white text-sm tracking-wider font-medium outline-none bg-[var(--primary-color)] hover:ring-1 hover:bg-[var(--light-primary-color)] active:bg-[var(--primary-color)]"
          >
            Thêm chi phí
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncomeManagementForm;
