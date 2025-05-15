import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import BuyNowForm from "../components/BuyNowForm";
import axios from "axios";

function Cart() {
  const { authState } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setCartItems(response.data);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
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
                  name={item.productName}
                  price={item.price}
                  quantity={item.quantity}
                  thumbnailUrl={item.productThumbnail}
                />
              ))
            : null}
        </div>

        <BuyNowForm class="lg:col-span-1" />
      </div>
    </div>
  );
}

export default Cart;
