import React from "react";
import { useNavigate } from "react-router-dom";
import AddressOptionForm from "./AddressOptionForm";
import { cities, districts, wards } from "../data/locacations";
import { assets } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

function PaymentInputForm(props) {
  const {
    selectedCity,
    setSelectedCity,
    selectedDistrict,
    setSelectedDistrict,
    selectedWard,
    setSelectedWard,
    street,
    setStreet,
    paymentMethod,
    setPaymentMethod,
  } = props;
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedWard("");
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const orderRequestDTO = {
      city: selectedCity,
      district: selectedDistrict,
      ward: selectedWard,
      street: street,
      paymentMethod: paymentMethod,
      discountCode: "",
    };
    const paymentRequestDTO = {
      amount: props.subTotal + props.shippingFee,
    };
    if (paymentMethod === "vnpay") {
      try {
        // Tạo hóa đơn trước
        const orderResponse = await axios.post(`${backendURL}/api/orders`, orderRequestDTO, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (orderResponse.status === 200 && orderResponse.data?.orderId) {
          // Lưu orderId để xử lý sau khi thanh toán thành công
          localStorage.setItem("lastOrderId", orderResponse.data.orderId);
          // Sau khi tạo hóa đơn, gọi sang VNPay
          const response = await axios.post(`${backendURL}/api/payment/vnpay`, paymentRequestDTO, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (
            response.status === 200 &&
            typeof response.data?.data === "string" &&
            response.data.data.startsWith("https://")
          ) {
            window.location.href = response.data.data; // Redirect to VNPay
          } else {
            toast.error("Không nhận được URL thanh toán hợp lệ từ VNPay.");
            console.error("VNPay response:", response.data);
          }
        } else {
          toast.error("Đặt hàng thất bại, vui lòng thử lại");
        }
      } catch (error) {
        toast.error("Không thể kết nối tới VNPay hoặc tạo hóa đơn. Vui lòng thử lại sau.");
        console.error(error);
      }
    } else {
      try {
        const response = await axios.post(`${backendURL}/api/orders`, orderRequestDTO, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success("Đặt hàng thành công");
          navigate("/");
        } else {
          toast.error("Đặt hàng thất bại, vui lòng thử lại");
        }
      } catch (error) {
        console.error("Error creating order:", error);
        toast.error("Đã xảy ra lỗi khi đặt hàng, vui lòng thử lại");
      }
    }
  };

  return (
    <form
      onSubmit={handleCreateOrder}
      className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6 lg:p-8"
    >
      <h3 className="mb-8 text-xl font-semibold font-title text-[var-(--dark-black)]">Địa chỉ giao hàng</h3>
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="col-span-3 sm:col-span-1">
          <AddressOptionForm
            label="Chọn tỉnh/thành phố"
            options={cities}
            value={selectedCity}
            onChange={handleCityChange}
          />
        </div>
        <div className="col-span-3 sm:col-span-1">
          <AddressOptionForm
            label="Chọn quận/huyện"
            options={selectedCity ? districts[selectedCity] : []}
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={!selectedCity}
          />
        </div>
        <div className="col-span-3 sm:col-span-1">
          <AddressOptionForm
            label="Chọn xã"
            options={selectedDistrict ? wards[selectedDistrict] : []}
            value={selectedWard}
            onChange={handleWardChange}
            disabled={!selectedDistrict}
          />
        </div>
        <div className="col-span-3 lg:col-span-3">
          <label className="mb-2 block text-sm font-medium text-[var-(--dark-black)]">Đường, số nhà</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-[var-(--dark-black)] focus:border-primary-500 focus:ring-primary-500  "
            placeholder="Nhập số nhà, tên đường của bạn"
            required
          />
        </div>
      </div>
      <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
      <h3 className="mb-8 text-xl font-semibold font-title text-[var-(--dark-black)]">Phương thức thanh toán</h3>
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="col-span-3 lg:col-span-3">
          <label className="mb-2 block text-sm font-medium text-gray-500 ">Mã giảm giá (nếu có)</label>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-500 focus:border-primary-500 focus:ring-primary-500  "
            placeholder="Nhập mã giảm giá"
          />
        </div>
        <label for="card-number-input" className="mb-2 block text-sm font-medium text-gray-500 ">
          Phương thức thanh toán
        </label>
        <div className="col-span-3 lg:col-span-3 flex w-full">
          <button
            onClick={() => handlePaymentMethodSelect("cod")}
            type="button"
            class="flex-1 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-2 focus:outline-none focus:ring-[var(--primary-color)] font-medium rounded-lg text-sm px-5 py-5 text-left inline-flex items-center me-2 mb-2"
          >
            <p className="mx-2">Thanh toán khi nhận hàng</p>
            <img src={assets.cod_icon} alt="cod" className="hidden sm:block w-10 object-contain" />
          </button>
          <button
            onClick={() => handlePaymentMethodSelect("vnpay")}
            type="button"
            class="flex-1 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-2 focus:outline-none focus:ring-[var(--primary-color)] font-medium rounded-lg text-sm px-5 py-5 text-left inline-flex items-center me-2 mb-2"
          >
            <p className="mx-2">Thanh toán bằng VNPay</p>
            <img src={assets.vnpay_icon} alt="vnpay" className="hidden sm:block w-10 object-contain" />
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center rounded-lg bg-[var(--primary-color)] px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300"
      >
        Đặt hàng
      </button>
    </form>
  );
}

export default PaymentInputForm;
