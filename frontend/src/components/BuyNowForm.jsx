import React from "react";
import { assets } from "../assets/assets";

function BuyNowForm() {
  return (
    <div class="bg-white rounded-md px-4 py-6 h-max shadow border">
      <ul class="text-slate-500 font-medium space-y-4">
        <li class="flex flex-wrap gap-4 text-sm">
          Giá trị đơn hàng <span class="ml-auto font-semibold text-slate-900">$200.00</span>
        </li>
        <li class="flex flex-wrap gap-4 text-sm">
          Phí vận chuyển <span class="ml-auto font-semibold text-slate-900">$2.00</span>
        </li>
        <li class="flex flex-wrap gap-4 text-sm">
          Voucher giảm giá <span class="ml-auto font-semibold text-slate-900">$0.00</span>
        </li>
        <hr class="border-slate-300" />
        <li class="flex flex-wrap gap-4 text-sm font-semibold text-slate-900">
          Tổng tiền <span class="ml-auto">$206.00</span>
        </li>
      </ul>

      <div class="mt-8 space-y-4">
        <button
          type="button"
          class="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-[var(--primary-color)] hover:bg-[var(--light-primary-color)] active:scale-98 transition-all duration-100 text-white rounded-md"
        >
          Mua ngay
        </button>
        <button
          type="button"
          class="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-slate-50 hover:bg-slate-100 active:scale-98 transition-all duration-100 text-slate-900 border rounded-md"
        >
          <a href="/products">Tiếp tục mua hàng</a>
        </button>
      </div>

      <div class="mt-5 flex flex-wrap justify-center gap-4">
        <img src={assets.momo_icon} alt="card1" class="w-10 object-contain" />
        <img src={assets.napas_icon} alt="card2" class="w-10 object-contain border rounded" />
      </div>
    </div>
  );
}

export default BuyNowForm;
