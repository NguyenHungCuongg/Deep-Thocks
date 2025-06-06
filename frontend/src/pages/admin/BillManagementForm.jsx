import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";

function BillManagementForm() {
  const [orders, setOrders] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
  const fileterOrders = orders.filter((order) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      order.fullname.toLowerCase().includes(keyword) ||
      order.status.toLowerCase().includes(keyword) ||
      order.orderId.toLowerCase().includes(keyword)
    );
  });
  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const currentOrderListPage = fileterOrders.slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${backendURL}/api/orders/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Order API response:", response.data);
        setOrders(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div className="bg-[var(--light-white)] rounded-xl h-full flex flex-col">
      <div
        id="table-header"
        className="flex gap-2 px-5 py-4 mb-4 flex-col md:flex-row md:items-center md:justify-between md:px-6"
      >
        <h3 class="text-lg font-title font-semibold text-gray-800">Danh sách người dùng</h3>
        <div className="flex gap-2 md:flex-row flex-col">
          <input
            placeholder="Tìm kiếm..."
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setCurrentPage(1);
            }}
            className="block w-full px-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm"
          />
          <button
            type="button"
            onClick={() => setSearchKeyword("")}
            class="flex-shrink-0 shadow-sm px-4 py-2 rounded-lg cursor-pointer text-[var(--dark-black)] text-sm tracking-wider font-medium bg-[var(--grey)] hover:bg-[var(--dark-white)] hover:ring-1 active:bg-[var(--grey)]"
          >
            Xem tất cả
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-[var(--dark-black)] bg-[var(--light-white)] border-y border-[var(--grey)]">
            <tr>
              <th scope="col" class="px-16 py-3">
                Mã hóa đơn
              </th>
              <th scope="col" class="px-6 py-3">
                Tên khách hàng
              </th>
              <th scope="col" class="px-6 py-3">
                Thời điểm tạo hóa đơn
              </th>
              <th scope="col" class="px-6 py-3">
                Trạng thái
              </th>
              <th scope="col" class="px-6 py-3">
                Tổng tiền
              </th>
              <th scope="col" class="px-6 py-3">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200 whitespace-nowrap">
            {currentOrderListPage && currentOrderListPage.length > 0 ? (
              currentOrderListPage.map((order, index) => (
                <tr key={index}>
                  <td class="px-4 py-4 text-sm text-slate-900 font-medium">{order.orderId}</td>
                  <td class="px-4 py-4 text-sm text-slate-600 font-medium">{order.fullname}</td>
                  <td class="px-4 py-4 text-sm text-slate-600 font-medium">
                    {order.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
                  </td>
                  <td class="px-4 py-4 text-sm text-slate-600 font-medium">{order.status}</td>
                  <td class="px-4 py-4 text-sm text-slate-600 font-medium">{order.totalAmount.toLocaleString()} VND</td>
                </tr>
              ))
            ) : (
              <div className="flex justify-center items-center h-64 w-full text-gray-500">Không có hóa đơn nào</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BillManagementForm;
