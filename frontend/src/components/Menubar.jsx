import React, { useState } from "react";
import ProductsDropDown from "./ProductsDropDown";

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

  return (
    <div className="relative">
      <div id="hamburger-menu-section" class="flex justify-end p-2">
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex p-2 w-10 h-10 justify-center text-sm text-[var(--primary-color)] rounded-lg md:hidden hover:bg-[var(--light-black)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          aria-controls="navbar-sticky"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5 text-[var(--primary-color)]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div id="menubar-content-section" class="flex flex-wrap items-center justify-center">
        <div
          class={`items-center justify-between ${isMenuOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul class="flex gap-5 flex-col p-4 md:p-0 mt-4 font-medium rounded-lg bg-[var(--dark-black)] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:bg-[var(--dark-black)]">
            <li>
              <a
                href="/"
                class="nav-link nav-link-ltr block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm md:hover:bg-transparent md:hover:text-[var(--lighter-primary-color)] md:p-0"
              >
                Trang chủ
              </a>
            </li>
            <li>
              <a
                id="mega-menu-full-dropdown-button"
                data-collapse-toggle="mega-menu-full-dropdown"
                class="nav-link nav-link-ltr cursor-pointer select-none flex justify-between md:justify-center font-semibold items-center py-2 px-3 text-[var(--primary-color)] rounded-sm md:hover:bg-transparent md:hover:text-[var(--lighter-primary-color)] md:p-0"
                onClick={toggleProductsDropDown}
              >
                Sản phẩm
                <svg
                  class={`w-2.5 h-2.5 ms-2.5 ${isProductsDropDownOpen ? "transform scale-y-[-1]" : ""}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="/about"
                class="nav-link nav-link-ltr block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm md:hover:bg-transparent md:hover:text-[var(--lighter-primary-color)] md:p-0 "
              >
                Giới thiệu
              </a>
            </li>
            <li>
              <a
                href="/contact"
                class="nav-link nav-link-ltr block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm md:hover:bg-transparent md:hover:text-[var(--lighter-primary-color)] md:p-0"
              >
                Liên hệ
              </a>
            </li>
          </ul>
        </div>
      </div>
      {isProductsDropDownOpen ? <ProductsDropDown /> : null}
    </div>
  );
}

export default Menubar;
