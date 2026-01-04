import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  // Giả lập việc lấy dữ liệu từ API
  useEffect(() => {
    // Trong thực tế, bạn sẽ gọi API ở đây
    setStats({
      totalProducts: 156,
      totalOrders: 342,
      totalUsers: 1234,
      totalRevenue: 45678000,
    });
  }, []);

  const StatCard = ({ title, value, icon, color, link }) => (
    <Link to={link}>
      <div
        className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${color} hover:shadow-lg transition-all duration-200 cursor-pointer`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
          </div>
          <div className="text-4xl">{icon}</div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-[#f4f1ec] via-[#e0be8c] to-[#c3a07e] rounded-xl shadow-lg p-6 text-[var(--light-black)]">
        <h1 className="text-3xl font-bold mb-2">Chào mừng đến với Dashboard</h1>
        <p className="text-lg opacity-90">Quản lý cửa hàng bàn phím của bạn một cách dễ dàng và hiệu quả</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng sản phẩm"
          value={stats.totalProducts}
          icon="📦"
          color="border-blue-500"
          link="/admin/products"
        />
        <StatCard title="Đơn hàng" value={stats.totalOrders} icon="🛒" color="border-green-500" link="/admin/orders" />
        <StatCard title="Người dùng" value={stats.totalUsers} icon="👥" color="border-purple-500" link="/admin/users" />
        <StatCard
          title="Doanh thu"
          value={`${stats.totalRevenue.toLocaleString("vi-VN")}₫`}
          icon="💰"
          color="border-yellow-500"
          link="/admin/revenue"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <span className="text-2xl">➕</span>
            <div>
              <p className="font-semibold text-gray-800">Thêm sản phẩm</p>
              <p className="text-sm text-gray-600">Thêm sản phẩm mới vào cửa hàng</p>
            </div>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-semibold text-gray-800">Xem đơn hàng</p>
              <p className="text-sm text-gray-600">Quản lý đơn hàng của khách</p>
            </div>
          </Link>
          <Link
            to="/admin/revenue"
            className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <span className="text-2xl">📊</span>
            <div>
              <p className="font-semibold text-gray-800">Báo cáo doanh thu</p>
              <p className="text-sm text-gray-600">Xem thống kê và báo cáo</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Hoạt động gần đây</h2>
        <div className="space-y-3">
          {[
            { text: "Đơn hàng #1234 đã được đặt", time: "5 phút trước", icon: "🛒" },
            { text: "Sản phẩm mới đã được thêm", time: "1 giờ trước", icon: "📦" },
            { text: "Người dùng mới đã đăng ký", time: "2 giờ trước", icon: "👤" },
            { text: "Đơn hàng #1230 đã hoàn thành", time: "3 giờ trước", icon: "✅" },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl">{activity.icon}</span>
              <div className="flex-1">
                <p className="text-gray-800">{activity.text}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
