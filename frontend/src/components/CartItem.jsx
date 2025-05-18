import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import QuantityInputSpinner from "./QuantityInputSpinner";
import axios from "axios";
import toast from "react-hot-toast";

function CartItem(props) {
  const backendUrl = "http://localhost:8080";

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${backendUrl}/api/carts/${props.productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        if (props.onDelete) {
          props.onDelete();
        }
        toast.success(response.data);
      } else {
        console.error(response.data);
        toast.error(response.data);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi trong quá trình xóa Cart item: ", error);
    }
  };

  return (
    <div class="flex gap-4 bg-white px-4 py-6 rounded-md shadow border justify-between items-center">
      <div class="flex gap-6 sm:gap-4 max-sm:flex-col">
        <div class="w-24 h-24 max-sm:w-24 max-sm:h-24 shrink-0">
          <a href={`/products/${props.productId}`} class="cursor-pointer">
            <img src={backendUrl + props.thumbnailUrl} class="w-full h-full object-contain" />
          </a>
        </div>
        <div class="flex flex-col gap-4">
          <div>
            <a href={`/products/${props.productId}`} class="cursor-pointer">
              <h3 class="text-sm sm:text-base font-semibold text-slate-900 hover:text-[var(--primary-color)] hover:underline">
                {props.name}
              </h3>
            </a>
            <p class="text-[13px] font-medium text-slate-500 mt-2 flex items-center gap-2">From DeepThocks</p>
          </div>
          <div class="mt-auto">
            <h3 class="text-sm font-semibold text-slate-900">{props.price.toLocaleString()} VND</h3>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-end justify-between md:h-24 h-48">
        <DeleteOutlineOutlinedIcon
          onClick={handleDelete}
          sx={{ fontSize: 24 }}
          className="hover:text-[var(--primary-color)] hover:scale-110 active:scale-98 cursor-pointer transition-colors duration-200 ease-in-out"
        />
        <QuantityInputSpinner quantity={props.quantity} />
      </div>
    </div>
  );
}

export default CartItem;
