import React from "react";
import { assets } from "../assets/assets";

function PaymentPriceSection(props) {
  return (
    <div className="mt-6 grow sm:mt-8 lg:mt-0">
      <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 ">
        <div className="flex flex-col gap-4 border-b border-gray-700 pb-4">
          {props.cartItems.map((item, index) => (
            <dl key={index} className="flex items-center justify-between gap-4">
              <dt className="text-base font-semibold text-gray-500 ">{item.productName}</dt>
              <dd className="text-base font-medium text-gray-900 ">
                {item.quantity} x {item.price.toLocaleString()} VND
              </dd>
            </dl>
          ))}
        </div>

        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Tổng tiền hàng</dt>
            <dd className="text-base font-medium text-gray-900 ">{props.subTotal.toLocaleString()} VND</dd>
          </dl>
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Phí ship</dt>
            <dd className="text-base font-medium text-gray-900 ">{props.shippingFee} VND</dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-500">Giảm giá</dt>
            <dd className="text-base font-medium text-gray-900">0 VND</dd>
          </dl>
        </div>

        <dl className="flex items-center justify-between gap-4 border-t border-gray-700 pt-2 ">
          <dt className="text-base font-bold text-gray-900 ">Tổng thanh toán</dt>
          <dd className="text-base font-bold text-gray-900 ">
            {(props.subTotal + props.shippingFee).toLocaleString()} VND
          </dd>
        </dl>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <img src={assets.cod_icon} alt="card1" className="w-10 object-contain" />
        <img src={assets.vnpay_icon} alt="card2" className="w-10 object-contain border rounded p-1" />
      </div>
    </div>
  );
}

export default PaymentPriceSection;
