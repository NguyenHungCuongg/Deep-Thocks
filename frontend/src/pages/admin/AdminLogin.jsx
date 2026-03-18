import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosClient from "@/api/axiosClient";
import toast from "react-hot-toast";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosClient.post("/api/auth/login", { username, password }, { responseType: "text" });

      const jwtToken = typeof response.data === "string" ? response.data : response.data?.token;

      if (!jwtToken) {
        toast.error("Không nhận được token hợp lệ từ máy chủ.");
        return;
      }

      const payload = parseJwt(jwtToken);
      const rawRoles = payload?.roles ?? payload?.role ?? payload?.authorities ?? [];
      const roles = Array.isArray(rawRoles) ? rawRoles : [rawRoles];
      const isAdmin = roles.some((role) => {
        const normalizedRole = String(role || "").toUpperCase();
        return normalizedRole === "ADMIN" || normalizedRole === "ROLE_ADMIN";
      });

      if (!isAdmin) {
        toast.error("Bạn không có quyền truy cập trang quản trị!");
        return;
      }

      login(username, jwtToken);
      toast.success("Đăng nhập thành công!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        typeof error?.response?.data === "string"
          ? error.response.data
          : error?.response?.data?.message || "Tên đăng nhập hoặc mật khẩu không chính xác!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm decode JWT
  function parseJwt(token) {
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(""),
      );
      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error("Invalid token format", err);
      return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-[var(--lighter-primary-color)] rounded-full mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400">Đăng nhập vào bảng điều khiển quản trị</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Tên đăng nhập
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--lighter-primary-color)] focus:border-transparent outline-none transition-all"
                placeholder="Nhập tên đăng nhập"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--lighter-primary-color)] focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[var(--lighter-primary-color)] border-gray-300 rounded focus:ring-[var(--lighter-primary-color)]"
                />
                <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-sm text-[var(--lighter-primary-color)] hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--primary-color)",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--light-primary-color)")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--primary-color)")}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang đăng nhập...
                </span>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>

          {/* Back to Site */}
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-600 hover:text-[var(--lighter-primary-color)] transition-colors">
              ← Quay lại trang chủ
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-400 text-sm">© 2026 DeepThocks. All rights reserved.</div>
      </div>
    </div>
  );
}

export default AdminLogin;
