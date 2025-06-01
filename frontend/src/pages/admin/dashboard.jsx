import React from "react";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
  return (
    <div className="bg-[var(--dark-white)] flex">
      <Sidebar />
      <div className="bg-[var(--dark-white)]">
        <h1>Dashboard</h1>
        {/* Thêm nội dung dashboard tại đây */}
        <p>Chào mừng bạn đến với trang quản trị!</p>
      </div>
    </div>
  );
}

export default Dashboard;
