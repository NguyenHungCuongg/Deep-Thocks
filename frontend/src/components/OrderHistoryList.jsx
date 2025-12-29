import React from "react";

function OrderHistoryList(props) {
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
                  <span className="inline-block px-3 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded-full">
                    Chưa thanh toán
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                    Đã thanh toán
                  </span>
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
