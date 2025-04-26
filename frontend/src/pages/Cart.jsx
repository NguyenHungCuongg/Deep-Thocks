import React from "react";
import CartItem from "../components/CartItem";
import BuyNowForm from "../components/BuyNowForm";

function Cart() {
  return (
    <div class="max-w-5xl max-lg:max-w-2xl mx-auto px-8 py-12 md:px-12 md:py-[4%]">
      <h1 class="text-xl font-semibold text-slate-900">Giỏ hàng của bạn</h1>
      <div class="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8 mt-6">
        <div class="lg:col-span-2 space-y-6">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>

        <BuyNowForm class="lg:col-span-1" />
      </div>
    </div>
  );
}

export default Cart;
