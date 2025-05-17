import React from "react";
import { assets } from "../assets/assets";

function BuyNowForm(props) {
  return (
    <div className="bg-white rounded-md px-4 py-6 h-max shadow border">
      <ul className="text-slate-500 font-medium space-y-4">
        <li className="flex flex-wrap gap-4 text-sm">
          Số lượng đơn hàng <span className="ml-auto font-semibold text-slate-900">{props.totalQuantity}</span>
        </li>
        <hr className="border-slate-300" />
        <li className="flex flex-wrap gap-4 text-sm font-semibold text-slate-900">
          Tổng tiền <span className="ml-auto">{props.totalPrice.toLocaleString()} VND</span>
        </li>
      </ul>

      <div className="mt-8 space-y-4">
        <button
          type="button"
          className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-[var(--primary-color)] hover:bg-[var(--light-primary-color)] active:scale-98 transition-all duration-100 text-white rounded-md"
        >
          Mua ngay
        </button>
        <button
          type="button"
          className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-50 hover:bg-slate-100 active:scale-98 transition-all duration-100 text-slate-900 border rounded-md"
        >
          <a href="/products">Tiếp tục mua hàng</a>
        </button>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-4">
        <img src={assets.momo_icon} alt="card1" className="w-10 object-contain" />
        <img src={assets.napas_icon} alt="card2" className="w-10 object-contain border rounded" />
      </div>
    </div>
  );
}

export default BuyNowForm;
