import React from "react";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

function AdminRoute({ children }) {
  const { authState } = useContext(AuthContext);

  // Nếu chưa đăng nhập, chuyển đến trang admin login
  if (!authState.isAuthenticated) {
    toast.error("Vui lòng đăng nhập để truy cập trang quản trị.");
    return <Navigate to="/admin/login" replace />;
  }

  // Nếu không có quyền admin, chuyển về trang chủ
  if (!authState.role || !authState.role.includes("ADMIN")) {
    toast.error("Bạn không có quyền truy cập vào trang quản trị.");
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
