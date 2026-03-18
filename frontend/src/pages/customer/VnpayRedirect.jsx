import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosClient from "@/api/axiosClient";

function VnpayRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    axiosClient
      .get(`/api/payment/vnpay-return${location.search}`)
      .then((response) => {
        if (response.data?.success) {
          toast.success(response.data.message || "Thanh toán VNPay thành công!");
        } else {
          toast.error(response.data?.message || "Thanh toán VNPay thất bại!");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Không thể xác thực kết quả thanh toán VNPay!");
      })
      .finally(() => {
        localStorage.removeItem("lastOrderId");
        setTimeout(() => navigate("/"), 3000);
      });
  }, [location.search, navigate]);

  return <div>Đang xử lý kết quả thanh toán VNPay...</div>;
}

export default VnpayRedirect;
