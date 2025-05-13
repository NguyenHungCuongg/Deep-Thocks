import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Menubar from "./Menubar";
import SearchBarOverlay from "./SearchBarOverlay";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function Navbar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { authState, logout } = useContext(AuthContext);

  return (
    <div>
      <SearchBarOverlay isOpen={showSearchBar} onClose={() => setShowSearchBar(false)} />
      <nav className="bg-[var(--dark-black)] navbar text-[var(--primary-color)] w-full z-20 top-0 start-0">
        <div className="max-w-screen-xl lg:grid lg:grid-cols-3 flex justify-between items-center mx-auto px-2 py-6">
          <div className="flex tracking-widest font-title justify-start">
            <p className="hidden md:block font-semibold py-2 px-3 text-[var(--primary-color)] rounded-sm md:p-0">
              Hotline tư vấn: <span className="font-bold">0987547235</span>
            </p>
          </div>
          <div className="flex items-center justify-center">
            <a
              href="/"
              className="text-3xl sm:text-4xl font-bold whitespace-nowrap text-[var(--primary-color)] font-title"
            >
              DEEP THOCKS
            </a>
          </div>
          <div className="flex items-right justify-end gap-2 md:gap-4">
            <a
              onClick={() => setShowSearchBar(true)}
              className="flex md:gap-2 items-center font-semibold py-2 px-2 text-[var(--primary-color)] rounded-sm hover:bg-transparent hover:text-[var(--light-primary-color)] md:p-0"
            >
              <SearchOutlinedIcon sx={{ fontSize: 30 }} />
              <span className="hidden md:block">Tìm kiếm</span>
            </a>
            <a
              href="/cart"
              className="flex md:gap-2 items-center font-semibold py-2 px-2 text-[var(--primary-color)] rounded-sm hover:bg-transparent hover:text-[var(--light-primary-color)] md:p-0"
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
              <span className="hidden md:block">Giỏ hàng</span>
            </a>
            {authState.isAuthenticated ? (
              <button
                onClick={logout}
                className="flex md:gap-2 items-center font-semibold py-2 px-2 text-[var(--primary-color)] rounded-sm hover:bg-transparent hover:text-[var(--light-primary-color)] md:p-0"
              >
                <PersonOutlineIcon sx={{ fontSize: 30 }} />
                <span className="hidden md:block">{authState.user}</span>
              </button>
            ) : (
              <a
                href="/account/login"
                className="flex md:gap-2 items-center font-semibold py-2 px-2 text-[var(--primary-color)] rounded-sm hover:bg-transparent hover:text-[var(--light-primary-color)] md:p-0"
              >
                <PersonOutlineIcon sx={{ fontSize: 30 }} />
                <span className="hidden md:block">Đăng nhập</span>
              </a>
            )}
          </div>
        </div>
        <Menubar />
      </nav>
    </div>
  );
}

export default Navbar;
