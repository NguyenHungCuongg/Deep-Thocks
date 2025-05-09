import React from "react";
import QuantityInputSpinner from "./QuantityInputSpinner";
import { assets } from "../assets/assets";

function ProductView() {
  return (
    <div className="md:px-[12%] px-10 py-12 flex flex-col items-center">
      <div className="grid items-start grid-cols-1 lg:grid-cols-5">
        <div className="col-span-3 top-0 gap-0.5">
          <img
            src={assets.hero_banner_image}
            alt="Background Image"
            className="object-cover object-center w-full h-full"
          />
        </div>

        <div className="col-span-2 py-6 px-8 max-lg:max-w-2xl">
          <div>
            <h2 className="text-3xl font-bold text-[var(--dark-black)]">Tên Sản phẩm</h2>
            <p className="text-sm text-slate-500 mt-2">TÊN THỂ LOẠI</p>
          </div>

          <div className="mt-8">
            <div className="flex flex-col flex-wrap gap-2">
              <p className="text-[var(--dark-black)] md:text-4xl text-2xl font-semibold">800.000 VND</p>
              <p className="text-gray-500 text-sm">
                Giá thị trường: <strike>1.000.000 VND</strike>
              </p>
              <p className="text-[var(--dark-black)] font-semibold mt-8">
                Tiết kiệm được thêm: <span className="text-gray-500 font-medium">200.000 VND</span>
              </p>
              <p className="text-[var(--dark-black)] font-semibold">
                Còn lại: <span className="font-medium text-[var(--primary-color)]">829</span>
              </p>
              <div className="space-y-4 flex items-center justify-start gap-4 text-[var(--dark-black)] font-semibold">
                Chọn số lượng:
                <QuantityInputSpinner />
              </div>
            </div>
          </div>
          <div className="mt-12 space-y-4">
            <button
              type="button"
              className="w-full px-4 py-2.5 cursor-pointer border border-slate-800 bg-transparent hover:bg-slate-50 active:bg-gray-200 text-[var(--dark-black)] text-sm font-medium rounded-md"
            >
              Thêm vào giỏ hàng
            </button>
            <button
              type="button"
              className="w-full px-4 py-2.5 cursor-pointer border border-slate-800 bg-[var(--light-black)] hover:bg-[var(--dark-black)] text-[var(--primary-color)] active:bg-[var(--light-black)] text-sm font-medium rounded-md"
            >
              Mua ngay
            </button>
          </div>

          <div className="mt-8">
            <div>
              <h3 className="text-xl font-semibold text-[var(--dark-black)]">Mô tả sản phẩm</h3>
              <p className="text-sm text-slate-500 mt-4">
                Elevate your casual style with our premium men's t-shirt. Crafted for comfort and designed with a modern
                fit, this versatile shirt is an essential addition to your wardrobe. The soft and breathable fabric
                ensures all-day comfort, making it perfect for everyday wear. Its classNameic crew neck and short
                sleeves offer a timeless look.
              </p>
            </div>

            <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-slate-500">
              <li>A t-shirt is a wardrobe essential because it is so versatile.</li>
              <li>
                Available in a wide range of sizes, from extra small to extra large, and even in tall and petite sizes.
              </li>
              <li>This is easy to care for. They can usually be machine-washed and dried on low heat.</li>
              <li>You can add your own designs, paintings, or embroidery to make it your own.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
