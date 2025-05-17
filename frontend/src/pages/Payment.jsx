import React from "react";
import PaymentInputForm from "../components/PaymentInputForm";
import PaymentPriceSection from "../components/PaymentPriceSection";

const Payment = () => {
  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-8xl">
          <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">Form thanh toán</h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            <div className="flex-[3] w-full">
              <PaymentInputForm />
            </div>
            <div className="flex-[2] w-full">
              <PaymentPriceSection />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
