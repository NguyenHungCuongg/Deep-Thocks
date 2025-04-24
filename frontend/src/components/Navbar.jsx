import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Menubar from "./Menubar";

function Navbar() {
  return (
    <div>
      <nav class="bg-[var(--dark-black)] navbar text-[var(--primary-color)] w-full z-20 top-0 start-0">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-5">
          <div id="left-navbar-section" className="hidden md:flex tracking-widest font-title">
            <p href="/login" class="block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm md:p-0">
              Hotline tư vấn: <span className="font-bold">0987547235</span>
            </p>
          </div>
          <div id="middle-navbar-section" className="tracking-widest font-title flex items-center justify-center">
            <a
              id="logo-navbar-section"
              href="/"
              class="flex justify-self-center items-center space-x-3 rtl:space-x-reverse text-2xl md:text-3xl font-bold whitespace-nowrap text-[var(--primary-color)] font-title"
            >
              DEEP THOCKS
            </a>
          </div>
          <div
            id="right-navbar-section"
            className="tracking-widest font-title flex items-center justify-end gap-2 md:gap-4"
          >
            <a
              href="/cart"
              class="flex md:gap-2 items-center font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm hover:bg-transparent hover:text-[var(--light-primary-color)] md:p-0"
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
              <span className="hidden md:block">Giỏ hàng</span>
            </a>
            <a
              href="/login"
              class="flex md:gap-2 items-center font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm hover:bg-transparent hover:text-[var(--light-primary-color)] md:p-0"
            >
              <PersonOutlineIcon sx={{ fontSize: 30 }} className="hover:" />
              <span className="hidden md:block">Đăng nhập</span>
            </a>
          </div>
        </div>
        <Menubar />
      </nav>
    </div>
  );
}

export default Navbar;
