import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Button from "@mui/material/Button";
import StatusIndicator from "../../components/StatusIndicator";
import OrderDetailDialog from "../../components/OrderDetailDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";

function BillManagementForm() {
  const [orders, setOrders] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [orderDetail, setOrderDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const itemsPerPage = 6;
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
  const fileterOrders = orders.filter((order) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      order.fullname.toLowerCase().includes(keyword) ||
      order.status.toLowerCase().includes(keyword) ||
      String(order.orderId).includes(keyword)
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

  const handleOrderStatusChange = async (orderId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${backendURL}/api/orders/paid`,
        { orderId: orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Cập nhật trạng thái hóa đơn thành công");
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order.orderId === orderId ? { ...order, status: "paid" } : order))
        );
      } else {
        toast.error("Cập nhật trạng thái hóa đơn thất bại");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi trong quá trình cập nhật trạng thái hóa đơn:", error);
      toast.error("Đã xảy ra lỗi trong quá trình cập nhật trạng thái hóa đơn");
    }
  };

  return (
    <div className="bg-[var(--light-white)] h-full rounded-2xl border border-gray-300 pb-5 pt-5 sm:px-6 sm:pt-5 flex flex-col">
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
                Phuương thức thanh toán
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
                  <td class="px-4 py-4 text-sm text-slate-600 font-medium">{order.paymentMethod.toUpperCase()}</td>
                  <td class="px-4 py-4 text-sm text-slate-600 font-medium">
                    {order.status === "pending" ? (
                      <button
                        onClick={() => {
                          setSelectedOrderId(order.orderId);
                          setShowConfirmDialog(true);
                        }}
                        className="cursor-pointer text-white px-3 py-1.5 rounded text-xs font-medium bg-orange-500 hover:bg-orange-600"
                      >
                        Chưa thanh toán
                      </button>
                    ) : (
                      <StatusIndicator type="success" content={order.status} />
                    )}
                  </td>
                  <td class="px-4 py-4 text-sm text-slate-600 font-medium">{order.totalAmount.toLocaleString()} VND</td>
                  <td class="px-4 py-4 text-sm text-slate-600 font-medium flex justify-center">
                    <Button onClick={() => setOrderDetail(order)}>
                      <RemoveRedEyeOutlinedIcon />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-16 text-center text-gray-500">
                  Không có hóa đơn nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <OrderDetailDialog
          order={orderDetail}
          open={!!orderDetail}
          onClose={() => setOrderDetail(null)}
          onConfirm={() => setOrderDetail(null)}
        />
        <ConfirmDialog
          title="Xác nhận thanh toán"
          content="Bạn có muốn xác nhận hóa đơn này đã được thanh toán không?"
          open={showConfirmDialog}
          onClose={() => {
            setShowConfirmDialog(false);
            setSelectedOrderId(null);
          }}
          onConfirm={() => {
            if (selectedOrderId) {
              handleOrderStatusChange(selectedOrderId);
            }
            setShowConfirmDialog(false);
            setSelectedOrderId(null);
          }}
        />
      </div>

      <div className="flex justify-center mt-4 px-5">
        <Pagination
          totalItems={fileterOrders.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default BillManagementForm;
