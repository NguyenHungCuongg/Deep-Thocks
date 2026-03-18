import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Menubar from "./Menubar";
import SearchBarOverlay from "./SearchBarOverlay";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Badge from "@mui/material/Badge";
import ConfirmDialog from "./ConfirmDialog";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  useEffect(() => {
    const fetchCartCount = async () => {
      if (!authState.isAuthenticated) {
        setCartCount(0);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${backendUrl}/api/carts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const totalQuantity = Array.isArray(response.data)
          ? response.data.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
          : 0;
        setCartCount(totalQuantity);
      } catch (error) {
        setCartCount(0);
      }
    };

    fetchCartCount();
  }, [authState.isAuthenticated, authState.user]);

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
            {authState.isAuthenticated ? (
              <a
                href="/cart"
                className="flex md:gap-2 items-center font-semibold py-2 px-2 text-[var(--primary-color)] rounded-sm hover:bg-transparent hover:text-[var(--light-primary-color)] md:p-0"
              >
                <Badge badgeContent={cartCount} color="error" max={99}>
                  <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
                </Badge>
                <span className="hidden md:block">Giỏ hàng</span>
              </a>
            ) : (
              <div>
                <button
                  onClick={() => setShowConfirmDialog(true)}
                  className="flex md:gap-2 items-center font-semibold py-2 px-2 text-[var(--primary-color)] rounded-sm hover:bg-transparent hover:text-[var(--light-primary-color)] md:p-0"
                >
                  <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
                  <span className="hidden md:block">Giỏ hàng</span>
                </button>
                <ConfirmDialog
                  title="Xác nhận đăng nhập"
                  content="Bạn cần đăng nhập để xem giỏ hàng cá nhân của mình!"
                  open={showConfirmDialog}
                  onClose={() => setShowConfirmDialog(false)}
                  onConfirm={() => {
                    navigate("/account/login");
                    setShowConfirmDialog(false);
                  }}
                />
              </div>
            )}

            {authState.isAuthenticated ? (
              <div>
                <button className="flex md:gap-2 gap-4 items-center font-semibold py-2 px-2 text-[var(--primary-color)] rounded-sm hover:bg-transparent hover:text-[var(--light-primary-color)] md:p-0">
                  <a href="/profile">
                    <PersonOutlineIcon sx={{ fontSize: 30 }} />
                  </a>
                  <a className="hidden md:block" href="/profile">
                    {authState.user}
                  </a>
                  <LogoutOutlinedIcon onClick={() => setShowConfirmDialog(true)} sx={{ fontSize: 30 }} />
                </button>
                <ConfirmDialog
                  title="Xác nhận đăng xuất"
                  content="Bạn có chắc chắn muốn đăng xuất không?"
                  open={showConfirmDialog}
                  onClose={() => setShowConfirmDialog(false)}
                  onConfirm={() => {
                    logout();
                    setShowConfirmDialog(false);
                  }}
                />
              </div>
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
