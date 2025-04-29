import React, { useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Menubar from "./Menubar";
import SearchBarOverlay from "./SearchBarOverlay";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function Navbar() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div>
      <SearchBarOverlay isOpen={showSearchBar} onClose={() => setShowSearchBar(false)} />
      <nav class="bg-[var(--dark-black)] navbar text-[var(--primary-color)] w-full z-20 top-0 start-0">
        <div class="max-w-screen-xl lg:grid lg:grid-cols-3 flex justify-between items-center mx-auto px-2 py-6">
          <div class="flex tracking-widest font-title justify-start">
            <p class="hidden md:block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm md:p-0">
              Hotline tư vấn: <span class="font-bold">0987547235</span>
            </p>
          </div>
          <div class="flex items-center justify-center">
            <a href="/" class="text-3xl sm:text-4xl font-bold whitespace-nowrap text-[var(--primary-color)] font-title">
              DEEP THOCKS
            </a>
          </div>
          <div class="flex items-right justify-end gap-2 md:gap-4">
            <a
              onClick={() => setShowSearchBar(true)}
              class="flex md:gap-2 items-center font-semibold py-2 px-2 text-[var(--primary-color)] rounded-sm hover:bg-transparent hover:text-[var(--light-primary-color)] md:p-0"
            >
              <SearchOutlinedIcon sx={{ fontSize: 30 }} />
              <span class="hidden md:block">Tìm kiếm</span>
            </a>
            <a
              href="/cart"
              class="flex md:gap-2 items-center font-semibold py-2 px-2 text-[var(--primary-color)] rounded-sm hover:bg-transparent hover:text-[var(--light-primary-color)] md:p-0"
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
              <span class="hidden md:block">Giỏ hàng</span>
            </a>
            <a
              href="/account/login"
              class="flex md:gap-2 items-center font-semibold py-2 px-2 text-[var(--primary-color)] rounded-sm hover:bg-transparent hover:text-[var(--light-primary-color)] md:p-0"
            >
              <PersonOutlineIcon sx={{ fontSize: 30 }} />
              <span class="hidden md:block">Đăng nhập</span>
            </a>
          </div>
        </div>
        <Menubar />
      </nav>
    </div>
  );
}

export default Navbar;
