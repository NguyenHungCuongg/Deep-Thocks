import React, { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import axios from "axios";
import toast from "react-hot-toast";

function OrderHistoryList(props) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

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
        props.setOrders((prevOrders) =>
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
    <div className="overflow-x-auto md:max-w-4xl max-w-lg mx-auto">
      <div className="flex flex-col justify-between items-start py-12">
        <h1 className="text-2xl font-bold text-gray-800">Lịch sử hóa đơn</h1>
        <p className="mt-1 text-gray-500">Quản lí tài khoản của bạn tại đây</p>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Mã đơn hàng
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Thời điểm tạo hóa đơn
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Tổng thanh toán
            </th>

            <th className="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Trạng thái
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
          {props.orders.map((order, index) => (
            <tr key={index}>
              <td className="px-4 py-4 text-sm text-slate-900 font-medium">{order.orderId}</td>
              <td className="px-4 py-4 text-sm text-slate-600 font-medium">
                {new Date(order.createdAt).toLocaleString("vi-VN")}
              </td>
              <td className="px-4 py-4 text-sm text-slate-600 font-medium">{order.totalAmount.toLocaleString()} VND</td>
              <td className="px-4 py-4 text-sm">
                {order.status === "pending" ? (
                  <div>
                    <button
                      onClick={() => setShowConfirmDialog(true)}
                      className="cursor-pointer text-[var(--light-white)] p-2 shadow rounded bg-[var(--primary-color)] font-medium"
                    >
                      Chưa thanh toán
                    </button>
                    <ConfirmDialog
                      title="Xác nhận hóa đơn"
                      content="Bạn có muốn xác nhận đã thanh toán hóa đơn này không?"
                      open={showConfirmDialog}
                      onClose={() => setShowConfirmDialog(false)}
                      onConfirm={() => {
                        handleOrderStatusChange(order.orderId);
                        setShowConfirmDialog(false);
                      }}
                    />
                  </div>
                ) : (
                  <p className="text-green-600 font-medium">Đã thanh toán</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistoryList;
