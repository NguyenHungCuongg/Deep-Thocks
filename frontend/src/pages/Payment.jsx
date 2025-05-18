import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentInputForm from "../components/PaymentInputForm";
import PaymentPriceSection from "../components/PaymentPriceSection";

const Payment = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [street, setStreet] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-8xl">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">Form thanh toán</h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            <div className="flex-[3] w-full">
              <PaymentInputForm
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                selectedWard={selectedWard}
                setSelectedWard={setSelectedWard}
                street={street}
                setStreet={setStreet}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </div>
            <div className="flex-[2] w-full">
              <PaymentPriceSection
                cartItems={cartItems}
                subTotal={totalPrice}
                shippingFee={selectedCity === "" || selectedCity === "Đà Nẵng" ? 0 : 34000}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
