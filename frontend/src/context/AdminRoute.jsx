import React from "react";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AdminRoute({ children }) {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  if (!authState.isAuthenticated) {
    toast.error("Bạn cần đăng nhập để truy cập trang này.");
    navigate("/account/login");
    return null;
  }

  if (!authState.role || !authState.role.includes("ADMIN")) {
    toast.error("Bạn không có quyền truy cập vào trang này.");
    navigate("/");
    return null;
  }

  return children;
}

export default AdminRoute;
