import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function OrderDetailDialog(props) {
  const customCancelButtonStyle = {
    color: "#2f2f2f",
    "&.MuiButton-text": {
      color: "#c3a07e",
    },
  };

  if (!props.open) {
    return null;
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Chi tiết hóa đơn (mã hóa đơn: {props.order.orderId})</DialogTitle>

      <DialogContent>
        <div className="flex flex-col gap-4 px-4">
          <div className="mt-6">
            <h1 className="font-semibold text-xl text-[var(--primary-color)] flex justify-center">
              Thông tin khách hàng
            </h1>
            <label class="block mb-2 text-sm font-medium text-[var(--dark-black)] mt-4">Tên đầy đủ</label>
            <input
              id="fullname"
              class="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
              value={props.order.fullname || ""}
              disabled
              required
            />
            <div className="flex gap-4 mt-4">
              <div className="w-1/3">
                <label class="block mb-2 text-sm font-medium text-[var(--dark-black)]">Tên đăng nhập</label>
                <input
                  id="username"
                  class="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  value={props.order.username || ""}
                  disabled
                  required
                />
              </div>
              <div className="w-1/3">
                <label class="block mb-2 text-sm font-medium text-[var(--dark-black)]">Email</label>
                <input
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  value={props.order.email || ""}
                  disabled
                  required
                />
              </div>
              <div className="w-1/3">
                <label class="block mb-2 text-sm font-medium text-[var(--dark-black)]">Số điện thoại</label>
                <input
                  id="phone"
                  class="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  value={props.order.phone || ""}
                  disabled
                  required
                />
              </div>
            </div>
          </div>
          <hr class="border-t border-gray-300 my-8" />
          <div className="mt-6">
            <h1 className="font-semibold text-xl text-[var(--primary-color)] flex justify-center">Địa chỉ giao hàng</h1>
            <div className="flex gap-4 mt-4">
              <div className="w-1/3">
                <label class="block mb-2 text-sm font-medium text-[var(--dark-black)]">Tỉnh/thành phố</label>
                <input
                  id="city"
                  class="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  value={props.order.city || ""}
                  disabled
                  required
                />
              </div>
              <div className="w-1/3">
                <label class="block mb-2 text-sm font-medium text-[var(--dark-black)]">Quận/huyện</label>
                <input
                  id="district"
                  class="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  value={props.order.district || ""}
                  disabled
                  required
                />
              </div>
              <div className="w-1/3">
                <label class="block mb-2 text-sm font-medium text-[var(--dark-black)]">Xã/phường</label>
                <input
                  id="ward"
                  class="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  value={props.order.ward || ""}
                  disabled
                  required
                />
              </div>
            </div>
            <label class="block mb-2 text-sm font-medium text-[var(--dark-black)] mt-4">Địa chỉ</label>
            <input
              id="street"
              class="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
              value={props.order.street || ""}
              disabled
              required
            />
          </div>
          <hr class="border-t border-gray-300 my-8" />
          <div className="mt-6">
            <h1 className="font-semibold text-xl text-[var(--primary-color)] flex justify-center">
              Danh sách các đơn hàng
            </h1>
            <div class="overflow-x-auto mt-4">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-100 whitespace-nowrap">
                  <tr>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Mã sản phẩm
                    </th>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Tên sản phẩm
                    </th>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th class="px-4 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Đơn giá
                    </th>
                  </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200 whitespace-nowrap">
                  {props.order.orderItemList && props.order.orderItemList.length > 0 ? (
                    props.order.orderItemList.map((items, index) => (
                      <tr key={index}>
                        <td class="px-4 py-4 text-sm text-slate-900 font-medium">{items.orderItemId}</td>
                        <td class="px-4 py-4 text-sm text-slate-600 font-medium">{items.productName}</td>
                        <td class="px-4 py-4 text-sm text-slate-600 font-medium">{items.quantity}</td>
                        <td class="px-4 py-4 text-sm text-slate-600 font-medium">
                          {items.unitPrice.toLocaleString()} VND
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className="flex justify-center items-center h-64 w-full text-gray-500">
                      Không có đơn hàng nào
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <hr class="border-t border-gray-300 my-8" />
          <div className="mt-6 flex justify-between">
            <p className="font-semibold text-xl text-[var(--dark-black)]">Tổng tiền:</p>
            <p className="font-semibold text-xl text-[var(--primary-color)]">
              {props.order.totalAmount.toLocaleString()} VND
            </p>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button sx={customCancelButtonStyle} onClick={props.onClose}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderDetailDialog;
