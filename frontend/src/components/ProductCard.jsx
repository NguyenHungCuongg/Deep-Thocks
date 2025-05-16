import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ProductCard(props) {
  const backendUrl = "http://localhost:8080";
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backendUrl}/api/cart/add`,
        {
          productId: props.product.productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        toast.success("Thêm sản phẩm vào giỏ hàng thành công");
      } else {
        toast.error("Thêm sản phẩm vào giỏ hàng thất bại");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng, vui lòng thử lại");
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col gap-4">
      <a href={`/products/${props.product.productId}`}>
        <img
          className="p-8 rounded-t-lg object-cover overflow-hidden h-72 w-full"
          src={props.product.thumbnailUrl}
          alt="product image"
        />
      </a>
      <div className="px-5 pb-5 flex flex-col flex-1 items-between justify-between">
        <h5 className="text-xl font-semibold tracking-tight text-[var(--dark-black)] pb-4">
          <a
            href={`/products/${props.product.productId}`}
            className="cursor-pointer hover:text-[var(--primary-color)] hover:underline"
          >
            {props.product.productName}
          </a>
        </h5>
        <div className="flex flex-col gap-0 pb-4">
          <span className="text-sm font-medium text-gray-400 line-through">
            {props.product.basePrice != props.product.salePrice ? props.product.basePrice.toLocaleString() + "VND" : ""}
          </span>
          <span className="text-xl font-semibold text-[var(--primary-color)] tracking-tight">
            {props.product.salePrice.toLocaleString()} VND
          </span>
        </div>

        <a
          className="cursor-pointer text-white bg-[var(--dark-black)] hover:bg-[var(--light-black)] active:bg-[var(--dark-black)] 
          active:scale-98 transition-all 
          duration-100 
          ease-in-out
          transform
          focus:ring-2 
          focus:ring-[var(--light-black)] 
          focus:ring-opacity-50  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          onClick={handleAddToCart}
        >
          Thêm vào giỏ hàng
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
