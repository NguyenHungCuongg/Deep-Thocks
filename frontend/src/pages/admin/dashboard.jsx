import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
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
          <div className="text-4xl text-[#2f2f2f]">{icon}</div>
        </div>
      </div>
    </Link>
  );

  const recentActivities = [
    {
      text: "Đơn hàng #1234 đã được đặt",
      time: "5 phút trước",
      icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 28 }} className="text-green-600" />,
    },
    {
      text: "Sản phẩm mới đã được thêm",
      time: "1 giờ trước",
      icon: <Inventory2OutlinedIcon sx={{ fontSize: 28 }} className="text-blue-600" />,
    },
    {
      text: "Người dùng mới đã đăng ký",
      time: "2 giờ trước",
      icon: <PersonAddAlt1OutlinedIcon sx={{ fontSize: 28 }} className="text-purple-600" />,
    },
    {
      text: "Đơn hàng #1230 đã hoàn thành",
      time: "3 giờ trước",
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 28 }} className="text-emerald-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#f4f1ec] via-[#e0be8c] to-[#c3a07e] rounded-xl shadow-lg p-6 text-[var(--light-black)]">
        <h1 className="text-3xl font-bold mb-2">Chào mừng đến với Dashboard</h1>
        <p className="text-lg opacity-90">Quản lý cửa hàng bàn phím của bạn một cách dễ dàng và hiệu quả</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng sản phẩm"
          value={stats.totalProducts}
          icon={<Inventory2Icon sx={{ fontSize: 38 }} />}
          color="border-blue-500"
          link="/admin/products"
        />
        <StatCard
          title="Đơn hàng"
          value={stats.totalOrders}
          icon={<ShoppingCartIcon sx={{ fontSize: 38 }} />}
          color="border-green-500"
          link="/admin/orders"
        />
        <StatCard
          title="Người dùng"
          value={stats.totalUsers}
          icon={<PeopleIcon sx={{ fontSize: 38 }} />}
          color="border-purple-500"
          link="/admin/users"
        />
        <StatCard
          title="Doanh thu"
          value={`${stats.totalRevenue.toLocaleString("vi-VN")}₫`}
          icon={<AttachMoneyIcon sx={{ fontSize: 38 }} />}
          color="border-yellow-500"
          link="/admin/revenue"
        />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <AddCircleOutlineIcon sx={{ fontSize: 30 }} className="text-blue-700" />
            <div>
              <p className="font-semibold text-gray-800">Thêm sản phẩm</p>
              <p className="text-sm text-gray-600">Thêm sản phẩm mới vào cửa hàng</p>
            </div>
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <ReceiptLongIcon sx={{ fontSize: 30 }} className="text-green-700" />
            <div>
              <p className="font-semibold text-gray-800">Xem đơn hàng</p>
              <p className="text-sm text-gray-600">Quản lý đơn hàng của khách</p>
            </div>
          </Link>
          <Link
            to="/admin/revenue"
            className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <BarChartIcon sx={{ fontSize: 30 }} className="text-yellow-700" />
            <div>
              <p className="font-semibold text-gray-800">Báo cáo doanh thu</p>
              <p className="text-sm text-gray-600">Xem thống kê và báo cáo</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Hoạt động gần đây</h2>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span>{activity.icon}</span>
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
