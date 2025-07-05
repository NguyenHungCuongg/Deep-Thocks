import React, { useState } from "react";
import ProductsDropDown from "./ProductsDropDown";

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

function Menubar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsDropDownOpen, setIsProductsDropDownOpen] = useState(false);

  const toggleMenu = () => {
    //Nếu menu đang mở thì đóng lại, nếu không thì mở ra
    setIsMenuOpen((prev) => !prev);
  };

  const toggleProductsDropDown = () => {
    //Nếu dropdown đang mở thì đóng lại, nếu không thì mở ra
    setIsProductsDropDownOpen((prev) => !prev);
  };

  // Lấy token từ localStorage
  const token = localStorage.getItem("token");
  const payload = parseJwt(token);
  let userRole = null;
  if (payload?.role) {
    userRole = typeof payload.role === "string" ? payload.role.toLowerCase() : payload.role;
  } else if (payload?.roles) {
    userRole = Array.isArray(payload.roles)
      ? payload.roles.map((r) => r.toLowerCase())
      : typeof payload.roles === "string"
      ? payload.roles.toLowerCase()
      : payload.roles;
  }

  return (
    <div className="relative">
      <div id="hamburger-menu-section" className="flex justify-end p-2">
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          className="inline-flex p-2 w-10 h-10 justify-center text-sm text-[var(--primary-color)] rounded-lg md:hidden hover:bg-[var(--light-black)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          aria-controls="navbar-sticky"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5 text-[var(--primary-color)]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div id="menubar-content-section" className="flex flex-wrap items-center justify-center">
        <div
          className={`items-center justify-between ${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex gap-5 flex-col p-4 md:p-0 mt-4 font-medium rounded-lg bg-[var(--dark-black)] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:bg-[var(--dark-black)]">
            <li>
              <a
                href="/"
                className="nav-link nav-link-ltr block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm md:hover:bg-transparent md:hover:text-[var(--lighter-primary-color)] md:p-0"
              >
                Trang chủ
              </a>
            </li>
            <li>
              <a
                id="mega-menu-full-dropdown-button"
                data-collapse-toggle="mega-menu-full-dropdown"
                className="nav-link nav-link-ltr cursor-pointer select-none flex justify-between md:justify-center font-semibold items-center py-2 px-3 text-[var(--primary-color)] rounded-sm md:hover:bg-transparent md:hover:text-[var(--lighter-primary-color)] md:p-0"
              >
                <a href="/products">Sản phẩm</a>
                <svg
                  className={`w-2.5 h-2.5 ms-2.5 ${isProductsDropDownOpen ? "transform scale-y-[-1]" : ""}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                  onClick={toggleProductsDropDown}
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="nav-link nav-link-ltr block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm md:hover:bg-transparent md:hover:text-[var(--lighter-primary-color)] md:p-0 "
              >
                Giới thiệu
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="nav-link nav-link-ltr block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm md:hover:bg-transparent md:hover:text-[var(--lighter-primary-color)] md:p-0"
              >
                Liên hệ
              </a>
            </li>
            {/* Thêm mục Dashboard nếu là admin */}
            {(userRole === "admin" || (Array.isArray(userRole) && userRole.includes("admin"))) && (
              <li>
                <a
                  href="http://localhost:5173/admin/dashboard"
                  className="nav-link nav-link-ltr block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm md:hover:bg-transparent md:hover:text-[var(--lighter-primary-color)] md:p-0"
                >
                  Quản lý
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      {isProductsDropDownOpen ? <ProductsDropDown /> : null}
    </div>
  );
}

export default Menubar;
