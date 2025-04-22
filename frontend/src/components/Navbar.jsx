import React, { useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ProductsDropDown from "./ProductsDropDown";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    //Nếu menu đang mở thì đóng lại, nếu không thì mở ra
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <nav class="bg-[var(--dark-black)] navbar text-[var(--primary-color)] fixed w-full z-20 top-0 start-0 border-b">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 pb-1 pt-2">
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-bold whitespace-nowrap text-[var(--primary-color)] font-title">
              DEEP THOCKS
            </span>
          </a>
          <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex md:gap-2 items-center">
              <PersonOutlineIcon />
              <a
                href="/login"
                class="block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm hover:bg-transparent hover:text-[var(--lighter-primary-color)] md:p-0"
              >
                Login / Register
              </a>
            </div>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[var(--primary-color)] rounded-lg md:hidden hover:bg-[var(--light-black)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
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
          <div
            class={`items-center justify-between ${
              isMenuOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul class="flex gap-5 flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg bg-[var(--dark-black)] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[var(--dark-black)]">
              <li>
                <a
                  href="/"
                  class="nav-link nav-link-ltr block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm hover:text-white hover:bg-[var(--primary-color)] md:hover:bg-transparent md:hover:text-[var(--lighter-primary-color)] md:p-0"
                >
                  Home
                </a>
              </li>
              <li>
                <button
                  id="mega-menu-full-dropdown-button"
                  data-collapse-toggle="mega-menu-full-dropdown"
                  class="nav-link nav-link-ltr flex justify-between md:justify-center font-semibold items-center py-2 px-3 text-[var(--primary-color)] rounded-sm hover:text-white hover:bg-[var(--primary-color)] md:hover:bg-transparent md:hover:text-[var(--lighter-primary-color)] md:p-0"
                >
                  Products
                  <svg
                    class="w-2.5 h-2.5 ms-2.5"
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
                </button>
              </li>
              <li>
                <a
                  href="/about"
                  class="nav-link nav-link-ltr block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm hover:text-white hover:bg-[var(--primary-color)] md:hover:bg-transparent md:hover:text-[var(--lighter-primary-color)] md:p-0 "
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  class="nav-link nav-link-ltr block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm hover:text-white hover:bg-[var(--primary-color)] md:hover:bg-transparent md:hover:text-[var(--lighter-primary-color)] md:p-0"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ProductsDropDown />
      </nav>
    </div>
  );
}

export default Navbar;
