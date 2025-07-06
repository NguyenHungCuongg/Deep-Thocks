import React from "react";

function RevenueTable({ revenueData, loading, error }) {
  // console.log("RevenueTable data:", revenueData);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-[var(--dark-black)] bg-[var(--light-white)] border-y border-[var(--grey)]">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tháng
            </th>
            <th scope="col" className="px-6 py-3">
              Doanh thu
            </th>
            <th scope="col" className="px-6 py-3">
              Chi phí
            </th>
            <th scope="col" className="px-6 py-3">
              Lợi nhuận
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center py-8 text-gray-500">
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={4} className="text-center py-8 text-red-500">
                {error}
              </td>
            </tr>
          ) : Array.isArray(revenueData) && revenueData.length > 0 ? (
            revenueData.map((item, idx) => {
              const month = item.revenueMonth ?? "";
              const income = Number(item.income ?? 0);
              const outcome = Number(item.outcome ?? 0);
              const profit = income - outcome;
              return (
                <tr key={idx}>
                  <td className="px-4 py-4 text-sm text-slate-900 font-medium">{month}</td>
                  <td className="px-4 py-4 text-sm text-[var(--dark-purple-color)] font-medium">
                    {income.toLocaleString()} VND
                  </td>
                  <td className="px-4 py-4 text-sm text-[var(--dark-blue-color)] font-medium">
                    {outcome.toLocaleString()} VND
                  </td>
                  <td className="px-4 py-4 text-sm text-[var(--dark-green-color)] font-medium">
                    {profit.toLocaleString()} VND
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-8 text-gray-500">
                Không có dữ liệu doanh thu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RevenueTable;
