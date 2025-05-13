import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      //giải mã Jwt Token để lấy thông tin người dùng
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      //decodedToken có các thuộc tính thông tin từ token như username, roles, exp, iat,...
      console.log("Decoded token: ", decodedToken);
      const currentTime = Date.now() / 1000; // Thời gian hiện tại tính bằng giây
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token"); // Xóa token nếu đã hết hạn
        setAuthState({ isAuthenticated: false, user: null, loading: false });
      } else {
        setAuthState({ isAuthenticated: true, user: decodedToken.username, loading: false });
      }
    } else {
      setAuthState({ isAuthenticated: false, user: null, loading: false });
    }
  }, []);

  // Hàm đăng nhập (có thể gọi từ các component khác -> sẽ được dùng trong trang Login.jsx để lưu token vào localStorage)
  const login = (username, token) => {
    localStorage.setItem("token", token); // Lưu token vào localStorage
    setAuthState({ isAuthenticated: true, user: username, loading: false });
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    setAuthState({ isAuthenticated: false, user: null, loading: false });
    toast.success("Đăng xuất thành công!");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {authState.loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
