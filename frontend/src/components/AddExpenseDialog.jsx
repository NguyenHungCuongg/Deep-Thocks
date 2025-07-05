import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import axios from "axios";

function AddExpenseDialog(props) {
  const customCancelButtonStyle = {
    color: "#2f2f2f",
    "&.MuiButton-text": {
      color: "#c3a07e",
    },
  };

  const customConfirmButtonStyle = {
    backgroundColor: "var(--dark-black)",
    color: "var(--light-white)",
    "&:hover": {
      backgroundColor: "var(--light-black)",
      color: "var(--light-white)",
    },
  };

  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  // State cho các input tiền tệ
  const [costOfGoods, setCostOfGoods] = useState("");
  const [platformCost, setPlatformCost] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [operatingCost, setOperatingCost] = useState("");
  const [legalCost, setLegalCost] = useState("");
  const [otherCost, setOtherCost] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  // State cho tháng/năm
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Hàm định dạng số với dấu chấm
  const formatNumber = (value) => {
    // Loại bỏ ký tự không phải số
    const onlyNums = value.replace(/\D/g, "");
    // Định dạng lại với dấu chấm
    return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Hàm chuyển giá trị có dấu chấm về số
  const parseNumber = (value) => Number(value.replace(/\./g, "") || 0);

  // Cập nhật tổng chi phí mỗi khi các trường thay đổi
  useEffect(() => {
    const total =
      parseNumber(costOfGoods) +
      parseNumber(platformCost) +
      parseNumber(shippingCost) +
      parseNumber(operatingCost) +
      parseNumber(legalCost) +
      parseNumber(otherCost);
    setTotalCost(total);
  }, [costOfGoods, platformCost, shippingCost, operatingCost, legalCost, otherCost]);

  // Hàm reset tất cả các trường về rỗng
  const resetFields = () => {
    setCostOfGoods("");
    setPlatformCost("");
    setShippingCost("");
    setOperatingCost("");
    setLegalCost("");
    setOtherCost("");
    setTotalCost(0);
    setMonth("");
    setYear("");
  };

  // Khi nhấn Hủy, reset các trường và gọi props.onClose
  const handleCancel = () => {
    resetFields();
    if (props.onClose) props.onClose();
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (
      !month ||
      !year ||
      !costOfGoods ||
      !platformCost ||
      !shippingCost ||
      !operatingCost ||
      !legalCost ||
      !otherCost
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (isNaN(Number(month)) || isNaN(Number(year))) {
      toast.error("Tháng và năm phải là số!");
      return;
    }
    if (Number(month) < 1 || Number(month) > 12) {
      toast.error("Tháng phải từ 1 đến 12!");
      return;
    }
    if (Number(year) < 2000) {
      toast.error("Năm không hợp lệ!");
      return;
    }

    try {
      await axios.post(
        `${backendURL}/api/expenses`,
        {
          expenseMonth: Number(month),
          expenseYear: Number(year),
          expenseAmount: totalCost,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Thêm chi phí thành công!");
      resetFields();
      if (props.onClose) props.onClose();
      if (props.onExpenseAdded) props.onExpenseAdded();
    } catch (err) {
      toast.error("Thêm chi phí thất bại: " + err.message);
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Thêm chi phí</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--dark-black)]">Thời gian</label>
              <div className="flex gap-4">
                <input
                  id="month"
                  className="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  placeholder="Tháng"
                  required
                  value={month}
                  onChange={(e) => setMonth(e.target.value.replace(/\D/g, ""))}
                  inputMode="numeric"
                  autoComplete="off"
                />
                <input
                  id="year"
                  className="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  placeholder="Năm"
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))}
                  inputMode="numeric"
                  autoComplete="off"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--dark-black)]">Các khoản chi phí</label>
              <div className="flex gap-4">
                <input
                  id="cost-of-goods"
                  className="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  placeholder="Chi phí nhập hàng (VNĐ)"
                  required
                  value={costOfGoods}
                  onChange={(e) => setCostOfGoods(formatNumber(e.target.value))}
                  inputMode="numeric"
                  autoComplete="off"
                />
                <input
                  id="platform-cost"
                  className="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  placeholder="Chi phí nền tảng (VNĐ)"
                  required
                  value={platformCost}
                  onChange={(e) => setPlatformCost(formatNumber(e.target.value))}
                  inputMode="numeric"
                  autoComplete="off"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <input
                  id="shipping-cost"
                  className="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  placeholder="Chi phí vận chuyển (VNĐ)"
                  required
                  value={shippingCost}
                  onChange={(e) => setShippingCost(formatNumber(e.target.value))}
                  inputMode="numeric"
                  autoComplete="off"
                />
                <input
                  id="operating-cost"
                  className="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  placeholder="Chi phí vận hành và nhân sự (VNĐ)"
                  required
                  value={operatingCost}
                  onChange={(e) => setOperatingCost(formatNumber(e.target.value))}
                  inputMode="numeric"
                  autoComplete="off"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <input
                  id="legal-cost"
                  className="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  placeholder="Chi phí pháp lý và thuế (VNĐ)"
                  required
                  value={legalCost}
                  onChange={(e) => setLegalCost(formatNumber(e.target.value))}
                  inputMode="numeric"
                  autoComplete="off"
                />
                <input
                  id="other-cost"
                  className="bg-gray-50 border border-gray-300 text-[var(--dark-black)] text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] block w-full p-2.5"
                  placeholder="Chi phí khác (VNĐ)"
                  required
                  value={otherCost}
                  onChange={(e) => setOtherCost(formatNumber(e.target.value))}
                  inputMode="numeric"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <hr className="border-t border-gray-300 my-8" />
          <div className="mt-6 flex justify-between">
            <p className="font-semibold text-xl text-[var(--dark-black)]">Tổng chi phí:</p>
            <p className="font-semibold text-xl text-[var(--primary-color)]">{totalCost.toLocaleString()} VND</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button sx={customCancelButtonStyle} onClick={handleCancel}>
            Hủy
          </Button>
          <Button type="submit" sx={customConfirmButtonStyle} autoFocus>
            Thêm chi phí
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddExpenseDialog;
