import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import QuantityInputSpinner from "./QuantityInputSpinner";

function CartItem() {
  return (
    <div class="flex gap-4 bg-white px-4 py-6 rounded-md shadow border justify-between items-center">
      <div class="flex gap-6 sm:gap-4 max-sm:flex-col">
        <div class="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
          <img src="https://readymadeui.com/images/watch1.webp" class="w-full h-full object-contain" />
        </div>
        <div class="flex flex-col gap-4">
          <div>
            <h3 class="text-sm sm:text-base font-semibold text-slate-900">Stylish Golden Watch</h3>
            <p class="text-[13px] font-medium text-slate-500 mt-2 flex items-center gap-2">
              Color: <span class="inline-block w-4 h-4 rounded bg-[#ac7f48]"></span>
            </p>
          </div>
          <div class="mt-auto">
            <h3 class="text-sm font-semibold text-slate-900">$120.00</h3>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-end justify-between md:h-24 h-48">
        <DeleteOutlineOutlinedIcon
          sx={{ fontSize: 24 }}
          className="hover:text-[var(--primary-color)] hover:scale-110 cursor-pointer transition-colors duration-200 ease-in-out"
        />
        <QuantityInputSpinner />
      </div>
    </div>
  );
}

export default CartItem;
