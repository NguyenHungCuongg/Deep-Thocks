import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import RevenueIcon from "@mui/icons-material/AttachMoney";
import ExpenseIcon from "@mui/icons-material/MoneyOff";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <BarChartIcon />,
      path: "/admin/dashboard",
      description: "Tổng quan",
    },
    {
      name: "Sản phẩm",
      icon: <KeyboardIcon />,
      path: "/admin/products",
      description: "Quản lý sản phẩm",
    },
    {
      name: "Đơn hàng",
      icon: <ShoppingCartIcon />,
      path: "/admin/orders",
      description: "Quản lý đơn hàng",
    },
    {
      name: "Người dùng",
      icon: <PeopleIcon />,
      path: "/admin/users",
      description: "Quản lý người dùng",
    },
    {
      name: "Doanh thu",
      icon: <RevenueIcon />,
      path: "/admin/revenue",
      description: "Quản lý doanh thu",
    },
    {
      name: "Chi phí",
      icon: <ExpenseIcon />,
      path: "/admin/expenses",
      description: "Quản lý chi phí",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-[var(--dark-black)] text-[var(--primary-color)] flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Logo & Toggle */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && <h1 className="text-xl font-bold text-[var(--lighter-primary-color)]">Admin Panel</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-[#2f2f2f] transition-colors"
        >
          <MenuIcon />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--lighter-primary-color)] text-[var(--primary-color)] font-semibold"
                      : "hover:bg-[#2f2f2f] hover:text-[var(--lighter-primary-color)]"
                  }`
                }
                title={isCollapsed ? item.name : ""}
              >
                <span className="text-2xl">{item.icon}</span>
                {!isCollapsed && (
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs opacity-75">{item.description}</span>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#2f2f2f] hover:text-white transition-all duration-200"
          title={isCollapsed ? "Đăng xuất" : ""}
        >
          <span className="text-2xl">
            <LogoutIcon />
          </span>
          {!isCollapsed && <span className="font-medium">Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
