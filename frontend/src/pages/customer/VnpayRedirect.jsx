import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function VnpayRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const responseCode = params.get("vnp_ResponseCode");
    if (responseCode === "00") {
      toast.success("Thanh toán VNPay thành công!");
      // Đổi trạng thái hóa đơn sang paid
      const orderId = localStorage.getItem("lastOrderId");
      if (orderId) {
        const backendURL = import.meta.env.VITE_BACKEND_URL;
        const token = localStorage.getItem("token");
        axios
          .post(
            `${backendURL}/api/orders/paid`,
            { orderId: parseInt(orderId) },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            // Xóa orderId khỏi localStorage sau khi cập nhật
            localStorage.removeItem("lastOrderId");
          })
          .catch(() => {
            toast.error("Không thể cập nhật trạng thái hóa đơn!");
          });
      }
    } else {
      toast.error("Thanh toán VNPay thất bại!");
    }
    setTimeout(() => navigate("/"), 3000);
  }, [location, navigate]);

  return <div>Đang xử lý kết quả thanh toán VNPay...</div>;
}

export default VnpayRedirect;
