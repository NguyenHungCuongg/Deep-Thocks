import React from "react";
import QuantityInputSpinner from "./QuantityInputSpinner";

function ProductInformation(props) {
  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold text-[var(--dark-black)]">{props.currentProduct.productName}</h2>
        <p className="text-sm text-slate-500 mt-2">TÊN THỂ LOẠI</p>
      </div>
      <div className="mt-8">
        <div className="flex flex-col flex-wrap gap-2">
          <p className="text-[var(--dark-black)] md:text-4xl text-2xl font-semibold">
            {props.currentProduct.salePrice
              ? props.currentProduct.salePrice.toLocaleString() + " VND"
              : "Đang cập nhật"}
            VND
          </p>
          <p className="text-gray-500 text-sm">
            Giá thị trường:{" "}
            <strike>
              {props.currentProduct.basePrice
                ? props.currentProduct.basePrice.toLocaleString() + " VND"
                : "Đang cập nhật"}
            </strike>
          </p>
          <p className="text-[var(--dark-black)] font-semibold mt-8">
            Tiết kiệm được thêm:{" "}
            <span className="text-gray-500 font-medium">
              {props.currentProduct.basePrice && props.currentProduct.salePrice
                ? (props.currentProduct.basePrice - props.currentProduct.salePrice).toLocaleString() + " VND"
                : "0 VND"}
            </span>
          </p>
          <p className="text-[var(--dark-black)] font-semibold">
            Còn lại:{" "}
            <span className="font-medium text-[var(--primary-color)]">
              {props.currentProduct.stockQuantity !== undefined
                ? props.currentProduct.stockQuantity.toLocaleString()
                : "0"}
            </span>
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
          <p className="text-sm text-gray-500  mt-4">
            {props.currentProduct.productDescription ? props.currentProduct.productDescription : "Đang cập nhật"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductInformation;
