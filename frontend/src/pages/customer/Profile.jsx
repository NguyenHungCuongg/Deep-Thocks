import ProfileInformationSection from "../../components/ProfileInformationSection";
import OrderHistoryList from "../../components/OrderHistoryList";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const { authState } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendURL}/api/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log("Thông tin người dùng:", response.data);
          setUser(response.data);
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi trong quá trình lấy thông tin người dùng:", error);
      }
    };
    if (authState.isAuthenticated) fetchUser();
  }, [authState.isAuthenticated]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendURL}/api/orders?username=${user.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setOrderHistory(response.data);
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi trong quá trình lấy thông tin hóa đơn của người dùng:", error);
      }
    };
    if (authState.isAuthenticated) fetchOrderHistory();
  }, [authState.isAuthenticated]);

  return (
    <div className="py-12 px-6 sm:px-6 lg:px-8">
      <ProfileInformationSection user={user} />
      <OrderHistoryList orders={orderHistory} setOrders={setOrderHistory} />
    </div>
  );
}

export default Profile;
