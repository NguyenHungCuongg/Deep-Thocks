import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import BuyNowForm from "../components/BuyNowForm";
import axios from "axios";

function Cart() {
  const { authState } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const backendUrl = "http://localhost:8080";

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendUrl}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          let countQuantity = 0;
          let countPrice = 0;
          for (let i = 0; i < response.data.length; i++) {
            countQuantity += response.data[i].quantity;
            countPrice += response.data[i].quantity * response.data[i].price;
          }
          setTotalQuantity(countQuantity);
          setTotalPrice(countPrice);
          setCartItems(response.data);
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi trong quá trình lấy Cart Items:", error);
      }
    };
    if (authState.isAuthenticated) fetchCartItems();
  }, [authState.isAuthenticated]);

  return (
    <div class="max-w-5xl max-lg:max-w-2xl mx-auto px-8 py-12 md:px-12 md:py-[4%]">
      <h1 class="text-xl font-semibold text-slate-900">Giỏ hàng của bạn</h1>
      <div class="grid lg:grid-cols-3 lg:gap-x-8 gap-x-6 gap-y-8 mt-6">
        <div class="lg:col-span-2 space-y-6">
          {Array.isArray(cartItems) && cartItems.length > 0
            ? cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  productId={item.productId}
                  name={item.productName}
                  price={item.price}
                  quantity={item.quantity}
                  thumbnailUrl={item.productThumbnail}
                  onDelete={() => setCartItems(cartItems.filter((ci) => ci.productId !== item.productId))}
                />
              ))
            : null}
        </div>

        <BuyNowForm class="lg:col-span-1" totalQuantity={totalQuantity} totalPrice={totalPrice} />
      </div>
    </div>
  );
}

export default Cart;
