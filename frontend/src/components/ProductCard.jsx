import React from "react";
import { assets } from "../assets/assets";

function ProductCard() {
  return (
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col gap-4">
      <a href="#">
        <img class="p-8 rounded-t-lg" src={assets.about_mission_image} alt="product image" />
      </a>
      <div class="px-5 pb-5 flex flex-col items-between justify-between gap-4">
        <h5 class="text-xl font-semibold tracking-tight text-[var(--dark-black)]">
          <a className="cursor-pointer hover:text-[var(--primary-color)] hover:underline">
            Phím cơ GMMK PRO 75% (Gateron G Pro Brown Switch) - Hàng chính hãng
          </a>
        </h5>
        <span class="text-2xl font-semibold text-[var(--primary-color)] tracking-tight">1.000.000 VND</span>
        <a
          class="cursor-pointer text-white bg-[var(--dark-black)] hover:bg-[var(--light-black)] active:bg-[var(--dark-black)] 
          active:scale-98 transition-all 
          duration-100 
          ease-in-out
          transform
          focus:ring-2 
          focus:ring-[var(--light-black)] 
          focus:ring-opacity-50  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Thêm vào giỏ hàng
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
