import React from "react";
import ProfileInformationSection from "../components/ProfileInformationSection";
import OrderHistoryList from "../components/OrderHistoryList";

function Profile() {
  const user = {
    fullName: "Nguyen Van A",
    email: "nguyenvana@example.com",
    phoneNumber: "0123 456 789",
    createdAt: "15/03/2022",
  };

  const orderHistory = [
    {
      orderId: "123456",
      createdAt: "15/03/2022",
      totalAmount: "1.000.000 VND",
      status: "Đang giao hàng",
    },
    {
      orderId: "123456",
      createdAt: "15/03/2022",
      totalAmount: "1.000.000 VND",
      status: "Đang giao hàng",
    },
    {
      orderId: "123456",
      createdAt: "15/03/2022",
      totalAmount: "1.000.000 VND",
      status: "Đang giao hàng",
    },
  ];

  return (
    <div className="py-12 px-6 sm:px-6 lg:px-8">
      <ProfileInformationSection user={user} />
      <OrderHistoryList orders={orderHistory} />
    </div>
  );
}

export default Profile;
