import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import BuyNowForm from "../components/BuyNowForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { authState } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleBuyNow = () => {
    navigate("/payment", { state: { cartItems, totalPrice } });
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendUrl}/api/carts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setCartItems(response.data);
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi trong quá trình lấy Cart Items:", error);
      }
    };
    if (authState.isAuthenticated) fetchCartItems();
  }, [authState.isAuthenticated]);

  useEffect(() => {
    let countQuantity = 0;
    let countPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      countQuantity += cartItems[i].quantity;
      countPrice += cartItems[i].quantity * cartItems[i].price;
    }
    setTotalQuantity(countQuantity);
    setTotalPrice(countPrice);
  }, [cartItems]);

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

        <BuyNowForm
          class="lg:col-span-1"
          totalQuantity={totalQuantity}
          totalPrice={totalPrice}
          onBuyNow={handleBuyNow}
        />
      </div>
    </div>
  );
}

export default Cart;
