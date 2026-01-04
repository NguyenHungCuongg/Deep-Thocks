import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Hàm decode JWT để lấy payload
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
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Invalid token format", err);
    return null;
  }
}

function AdminHeader() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: "Admin", email: "" });
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = parseJwt(token);
      if (payload) {
        setUserInfo({
          name: payload.name || payload.sub || "Admin",
          email: payload.email || "",
        });
      }
    }
  }, []);

  const handleViewSite = () => {
    window.open("/", "_blank");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Breadcrumb or Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Bảng điều khiển quản trị</h2>
          <p className="text-sm text-gray-500 mt-1">Chào mừng trở lại, {userInfo.name}</p>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-4">
          {/* View Site Button */}
          <button
            onClick={handleViewSite}
            className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color)] transition-colors font-medium"
          >
            Xem trang web
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-[var(--light-primary-color)] rounded-full flex items-center justify-center text-white font-bold">
                {userInfo.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold text-gray-800">{userInfo.name}</p>
                {userInfo.email && <p className="text-xs text-gray-500">{userInfo.email}</p>}
              </div>
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform ${showProfileMenu ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Thông tin cá nhân
                </button>
                <button
                  onClick={() => {
                    navigate("/admin/settings");
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cài đặt
                </button>
                <hr className="my-2" />
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/admin/login");
                  }}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
